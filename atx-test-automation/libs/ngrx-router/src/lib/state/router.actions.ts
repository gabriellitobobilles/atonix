import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';
import { RouterParameters } from '../models/router-parameters';

export enum RouterActionTypes {
  GoToRoute = '[NGRX-Router] Go To Route',
  GoBack = '[NGRX-Router] Go Back',
  GoForward = '[NGRX-Router] Go Forward'
}

export class GotoRoute implements Action {
  readonly type = RouterActionTypes.GoToRoute;
  constructor(public payload: RouterParameters) {}
}

export class GoBack implements Action {
  readonly type = RouterActionTypes.GoBack;
  constructor() {}
}

export class GoForward implements Action {
  readonly type = RouterActionTypes.GoForward;
  constructor() {}
}

export type RouterActions = GoForward | GoBack | GotoRoute;
