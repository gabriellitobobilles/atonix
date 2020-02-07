import { Action } from '@ngrx/store';

export enum RootActionTypes {
  LOGOUT = '[Auth] LOGOUT'
}
export class LOGOUT implements Action {
  readonly type = RootActionTypes.LOGOUT;
  constructor() {}
}
export type RootActions = LOGOUT;

export function clearAllState(reducer) {
  return (state, action) => {
    if (action.type === RootActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
