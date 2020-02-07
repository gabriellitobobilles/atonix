import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
