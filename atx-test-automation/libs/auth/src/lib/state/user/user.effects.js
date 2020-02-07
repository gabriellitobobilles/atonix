import * as tslib_1 from "tslib";
import { UserInfoService } from '../../services/user-info.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActionTypes, UserInfoLoaded, UserInfoFail, AppContextLoaded, AppContextFail, SetAppContextSuccess, NavigateToNewApp, SetInitialAppContext } from './user.actions';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of, Observable, defer } from 'rxjs';
import { AssetsModelService } from '@AtonixWebSites/api';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getAppContexts, getAppContextsForApp, getSelectedAppContext } from './user.selectors';
import { InitialStateService } from '../../services/initial-state.service';
var UserEffects = /** @class */ (function () {
    function UserEffects(actions$, assetsModelService, userInfoService, router, routerFacade, store$, initialStateService) {
        var _this = this;
        this.actions$ = actions$;
        this.assetsModelService = assetsModelService;
        this.userInfoService = userInfoService;
        this.router = router;
        this.routerFacade = routerFacade;
        this.store$ = store$;
        this.initialStateService = initialStateService;
        this.loadUserInfo = this.actions$.pipe(ofType(UserActionTypes.LoadUserInfo), mergeMap(function (action) {
            return _this.userInfoService.userInfo().pipe(map(function (userInfo) { return new UserInfoLoaded(userInfo); }), catchError(function (err) { return of(new UserInfoFail(err)); }));
        }));
        this.loadAppContext = this.actions$.pipe(ofType(UserActionTypes.LoadAppContext), mergeMap(function (action) {
            return _this.assetsModelService.getAppContexts().pipe(map(function (appContexts) { return new AppContextLoaded(appContexts); }), catchError(function (err) { return of(new AppContextFail(err)); }));
        }));
        this.setAppContext = this.actions$.pipe(ofType(UserActionTypes.SetAppContext), map(function (action) { return action.payload; }), withLatestFrom(this.store$.pipe(select(getSelectedAppContext)), this.store$.pipe(select(getAppContexts)), this.store$.pipe(select(getAppContextsForApp)), this.routerFacade.routerState$), map(function (_a) {
            var selectedAppID = _a[0], selectedAppContext = _a[1], appContexts = _a[2], appContextsForApp = _a[3], router = _a[4];
            var reroute = true;
            // First we check to make sure we haven't already selected this app.
            // If the newly clicked app is also the selected app we shouldn't do anything.
            if (selectedAppContext && selectedAppID === selectedAppContext.AppContextID) {
                reroute = false;
                // Then we check to see if the newly selected app is in the list of apps that the
                // current application says it can handle.  If it is then we shouldn't try to route.
                // Just let the app do its thing.
            }
            else if (appContextsForApp && appContextsForApp.indexOf(selectedAppID) >= 0) {
                reroute = false;
            }
            // Finally we want to get the newly selected app from the list of loaded app contexts.
            // If we don't have this new app in the list of apps then we can't route if we wanted to.
            var ac = appContexts.find(function (n) { return n.AppContextID === selectedAppID; });
            if (!ac) {
                reroute = false;
            }
            if (reroute) {
                return new NavigateToNewApp(ac);
            }
            return new SetAppContextSuccess(selectedAppID);
        }));
        this.navigateToNewApp = this.actions$.pipe(ofType(UserActionTypes.NavigateToNewApp), map(function (action) { return action.payload; }), withLatestFrom(this.routerFacade.routerState$), map(function (_a) {
            var action = _a[0], router = _a[1];
            var path = action.Path;
            if (path[0] !== '/') {
                path = '/' + path;
            }
            var url = window.location.host + path;
            if (action.OpenInNew) {
                window.open(url, '_blank');
            }
            else {
                url = 'https://' + url;
                _this.router.navigate(['/externalRedirect', { externalUrl: url }], {
                    queryParams: router.state.queryParams
                });
            }
        }));
        this.init$ = defer(function () {
            return of(new SetInitialAppContext(_this.initialStateService.getAppContext()));
        });
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], UserEffects.prototype, "loadUserInfo", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], UserEffects.prototype, "loadAppContext", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], UserEffects.prototype, "setAppContext", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Observable)
    ], UserEffects.prototype, "navigateToNewApp", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], UserEffects.prototype, "init$", void 0);
    UserEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            AssetsModelService,
            UserInfoService,
            Router,
            RouterFacade,
            Store,
            InitialStateService])
    ], UserEffects);
    return UserEffects;
}());
export { UserEffects };
//# sourceMappingURL=user.effects.js.map