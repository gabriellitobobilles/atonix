import * as _ from 'lodash';
import { UserInfoService } from '../../services/user-info.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  UserActionTypes,
  UserInfoLoaded,
  UserInfoFail,
  AppContextLoaded,
  AppContextFail,
  SetAppContextSuccess,
  NavigateToNewApp,
  SetAppContext,
  SetInitialAppContext
} from './user.actions';

import { map, mergeMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';
import { of, Observable, defer } from 'rxjs';
import { AssetsModelService } from '@AtonixWebSites/api';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
import { Router } from '@angular/router';
import { Store, Action, select } from '@ngrx/store';
import { UserState } from './user.reducer';
import { getAppContexts, getSelectedAppContextID, getAppContextsForApp, getSelectedAppContext } from './user.selectors';
import { environment } from '@env/environment';
import { InitialStateService } from '../../services/initial-state.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private assetsModelService: AssetsModelService,
    private userInfoService: UserInfoService,
    private router: Router,
    private routerFacade: RouterFacade,
    private store$: Store<UserState>,
    private initialStateService: InitialStateService
  ) {}

  @Effect()
  loadUserInfo: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserInfo),
    mergeMap(action =>
      this.userInfoService.userInfo().pipe(
        map(userInfo => new UserInfoLoaded(userInfo)),
        catchError(err => of(new UserInfoFail(err)))
      )
    )
  );

  @Effect()
  loadAppContext: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.LoadAppContext),
    mergeMap(action =>
      this.assetsModelService.getAppContexts().pipe(
        map(appContexts => new AppContextLoaded(appContexts)),
        catchError(err => of(new AppContextFail(err)))
      )
    )
  );

  @Effect()
  setAppContext: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.SetAppContext),
    map((action: SetAppContext) => action.payload),
    withLatestFrom(
      this.store$.pipe(select(getSelectedAppContext)),
      this.store$.pipe(select(getAppContexts)),
      this.store$.pipe(select(getAppContextsForApp)),
      this.routerFacade.routerState$
    ),
    map(([selectedAppID, selectedAppContext, appContexts, appContextsForApp, router]) => {
      let reroute = true;
      // First we check to make sure we haven't already selected this app.
      // If the newly clicked app is also the selected app we shouldn't do anything.
      if (selectedAppContext && selectedAppID === selectedAppContext.AppContextID) {
        reroute = false;
        // Then we check to see if the newly selected app is in the list of apps that the
        // current application says it can handle.  If it is then we shouldn't try to route.
        // Just let the app do its thing.
      } else if (appContextsForApp && appContextsForApp.indexOf(selectedAppID) >= 0) {
        reroute = false;
      }
      // Finally we want to get the newly selected app from the list of loaded app contexts.
      // If we don't have this new app in the list of apps then we can't route if we wanted to.
      const ac = appContexts.find(n => n.AppContextID === selectedAppID);
      if (!ac) {
        reroute = false;
      }

      if (reroute) {
        return new NavigateToNewApp(ac);
      }
      return new SetAppContextSuccess(selectedAppID);
    })
  );

  @Effect({ dispatch: false })
  navigateToNewApp: Observable<void> = this.actions$.pipe(
    ofType(UserActionTypes.NavigateToNewApp),
    map((action: NavigateToNewApp) => action.payload),
    withLatestFrom(this.routerFacade.routerState$),
    map(([action, router]) => {
      let path = action.Path;
      if (path[0] !== '/') {
        path = '/' + path;
      }
      let url = window.location.host + path;
      if (action.OpenInNew) {
        window.open(url, '_blank');
      } else {
        url = 'https://' + url;
        this.router.navigate(['/externalRedirect', { externalUrl: url }], {
          queryParams: router.state.queryParams
        });
      }
    })
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new SetInitialAppContext(this.initialStateService.getAppContext()));
  });
}
