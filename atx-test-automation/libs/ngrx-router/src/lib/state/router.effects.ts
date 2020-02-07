import { GoBack, GoForward, GotoRoute, RouterActionTypes } from './router.actions';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.action$.pipe(
    ofType(RouterActionTypes.GoToRoute),
    pipe(
      map((action: GotoRoute) => action.payload),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      })
    )
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$.pipe(
    ofType(RouterActionTypes.GoBack),
    pipe(tap(() => this.location.back()))
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.action$.pipe(
    ofType(RouterActionTypes.GoForward),
    pipe(tap(() => this.location.forward()))
  );

  constructor(private action$: Actions, private router: Router, private location: Location) {}
}
