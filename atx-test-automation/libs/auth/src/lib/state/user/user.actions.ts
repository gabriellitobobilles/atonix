import { Action } from '@ngrx/store';
import { IAccountModelUser } from '../../models/iaccount-model-user';
import { IAppContext } from '@AtonixWebSites/api';
import { AuthConfig } from '../../models/auth-config';

export enum UserActionTypes {
  LoadUserInfo = '[User] Load User Info',
  UserInfoLoaded = '[User] User Info Loaded',
  UserInfoFail = '[User] User Info Fail',
  LoadAppContext = '[User] Load App Context',
  AppContextLoaded = '[User] App Context Loaded',
  AppContextFail = '[User] App Context Fail',
  ClearUser = '[User] Clear User',
  SetInitialAppContext = '[User] Set Initial App Context',
  SetAppContext = '[User] Set App Context',
  SetAppContextSuccess = '[User] Set App Context Success',
  NavigateToNewApp = '[User] Navigate to New App',
  SetAppContextsForApp = '[User] Set App Contexts For App'
}

export class LoadUserInfo implements Action {
  readonly type = UserActionTypes.LoadUserInfo;
  constructor() {}
}

export class UserInfoLoaded implements Action {
  readonly type = UserActionTypes.UserInfoLoaded;
  constructor(public payload: IAccountModelUser) {}
}

export class UserInfoFail implements Action {
  readonly type = UserActionTypes.UserInfoFail;
  constructor(public payload: string) {}
}

export class LoadAppContext implements Action {
  readonly type = UserActionTypes.LoadAppContext;
  constructor() {}
}

export class AppContextLoaded implements Action {
  readonly type = UserActionTypes.AppContextLoaded;
  constructor(public payload: IAppContext[]) {}
}

export class AppContextFail implements Action {
  readonly type = UserActionTypes.AppContextFail;
  constructor(public payload: string) {}
}

export class ClearUser implements Action {
  readonly type = UserActionTypes.ClearUser;
  constructor() {}
}

export class SetAppContext implements Action {
  readonly type = UserActionTypes.SetAppContext;
  constructor(public payload: number) {}
}

export class SetAppContextSuccess implements Action {
  readonly type = UserActionTypes.SetAppContextSuccess;
  constructor(public payload: number | string) {}
}

export class SetInitialAppContext implements Action {
  readonly type = UserActionTypes.SetInitialAppContext;
  constructor(public payload: AuthConfig) {}
}

export class NavigateToNewApp implements Action {
  readonly type = UserActionTypes.NavigateToNewApp;
  constructor(public payload: IAppContext) {}
}

export type UserActions =
  | LoadUserInfo
  | UserInfoLoaded
  | UserInfoFail
  | LoadAppContext
  | AppContextLoaded
  | AppContextFail
  | ClearUser
  | SetAppContext
  | SetAppContextSuccess
  | SetInitialAppContext
  | NavigateToNewApp;
