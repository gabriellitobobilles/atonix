import { Action } from '@ngrx/store';
import { Authenticate } from '../../models/authenticate';
import { PasswordChange } from '../../models/password-change';
import { IAccountSetup } from '../../models/account-setup';

export enum AuthActionTypes {
  GetSettings = '[Auth] Get Settings',
  GetSettingsComplete = '[Auth] Get Settings Complete',
  InitialAuthAction = '[Auth] Initial Auth Action',
  Login = '[Auth] Login',
  LoginStarted = '[Auth] Login Started',
  LoginSuccess = '[Auth] Login Success',
  SendMfa = '[Auth] Send Mfa',
  LoginSuccessRedirect = '[Auth] Login Success Redirect',
  MFARequired = '[Auth] MFA Requred',
  PasswordChangeRequired = '[Auth] Password Change Required',
  InitialPasswordRequired = '[Auth] Initial Password Required',
  InitialPasswordChangeRequired = '[Auth] Initial Password Change Required',
  InitialPassword = '[Auth] Initial Password',
  InitialPasswordCancelled = '[Auth] Initial Password Cancelled',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Logout = '[Auth] Logout',
  LogoutRedirect = '[Auth] Logout Redirect',
  LogoutComplete = '[Auth] Logout Complete',
  ForgotPassword = '[Auth] Forgot Password',
  RequestPassword = '[Auth] Request Password',
  RequestPasswordCancelled = '[Auth] Request Password Cancelled',
  RequestPasswordComplete = '[Auth] Request Password Complete',
  ChangePassword = '[Auth] Change Password',
  ChangePasswordCancelled = '[Auth] Change Password Cancelled',
  ChangePasswordComplete = '[Auth] Change Password Complete',
  InitializeUser = '[Auth] Initialize User',
  UserAuthenticated = '[Auth] User Authenticated',
  GetTimeout = '[Auth] Get Timeout Setting',
  GetTimeoutSettingError = '[Auth] Get Timeout Setting Error',
  GetTimeoutSettingComplete = '[Auth] Get Timeout Setting Complete',
  StartInactivityService = '[Auth] Start Inactivity Service'
}

export class GetSettings implements Action {
  readonly type = AuthActionTypes.GetSettings;
  constructor(public payload?: any) {}
}

export class GetSettingsComplete implements Action {
  readonly type = AuthActionTypes.GetSettingsComplete;
  constructor(public payload: { ClientID: string; PoolID: string }) {}
}

export class InitialAuthAction implements Action {
  readonly type = AuthActionTypes.InitialAuthAction;
  constructor(public payload: boolean) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Authenticate) {}
}

export class LoginStarted implements Action {
  readonly type = AuthActionTypes.LoginStarted;
  constructor(public payload?: string) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor() {}
}

export class SendMfa implements Action {
  readonly type = AuthActionTypes.SendMfa;
  constructor(public code: string) {}
}

export class LoginSuccessRedirect implements Action {
  readonly type = AuthActionTypes.LoginSuccessRedirect;
  constructor() {}
}

export class MFARequired implements Action {
  readonly type = AuthActionTypes.MFARequired;
  constructor(public challenge: string) {}
}

export class PasswordChangeRequired implements Action {
  readonly type = AuthActionTypes.PasswordChangeRequired;
  constructor(public payload: string) {}
}

export class InitialPasswordRequired implements Action {
  readonly type = AuthActionTypes.InitialPasswordRequired;
  constructor(public email: string, public result: any) {}
}

export class InitialPasswordChangeRequired implements Action {
  readonly type = AuthActionTypes.InitialPasswordChangeRequired;
  constructor(public attributes: any) {}
}

export class InitialPassword implements Action {
  readonly type = AuthActionTypes.InitialPassword;
  constructor(public payload: IAccountSetup) {}
}

export class InitialPasswordCancelled implements Action {
  readonly type = AuthActionTypes.InitialPasswordCancelled;
  constructor(public payload?: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload?: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.ForgotPassword;
  constructor(public email: string) {}
}

export class RequestPassword implements Action {
  readonly type = AuthActionTypes.RequestPassword;
  constructor(public email: string) {}
}

export class RequestPasswordCancelled implements Action {
  readonly type = AuthActionTypes.RequestPasswordCancelled;
  constructor(public payload?: any) {}
}

export class RequestPasswordComplete implements Action {
  readonly type = AuthActionTypes.RequestPasswordComplete;
  constructor(public payload: string) {}
}

export class ChangePassword implements Action {
  readonly type = AuthActionTypes.ChangePassword;
  constructor(public payload: PasswordChange) {}
}

export class ChangePasswordCancelled implements Action {
  readonly type = AuthActionTypes.ChangePasswordCancelled;
  constructor(public payload?: any) {}
}

export class ChangePasswordComplete implements Action {
  readonly type = AuthActionTypes.ChangePasswordComplete;
  constructor(public payload?: any) {}
}

export class InitializeUser implements Action {
  readonly type = AuthActionTypes.InitializeUser;
  constructor(public payload: string) {}
}

export class LogoutRedirect implements Action {
  readonly type = AuthActionTypes.LogoutRedirect;
  constructor() {}
}

export class UserAuthenticated implements Action {
  readonly type = AuthActionTypes.UserAuthenticated;
  constructor() {}
}

export class GetTimeoutAction implements Action {
  readonly type = AuthActionTypes.GetTimeout;
  constructor() {}
}

export class GetTimeoutSettingError implements Action {
  readonly type = AuthActionTypes.GetTimeoutSettingError;
  constructor(public payload: string) {}
}

export class GetTimeoutSettingComplete implements Action {
  readonly type = AuthActionTypes.GetTimeoutSettingComplete;
  constructor(public payload: number) {}
}

export class StartInactivityService implements Action {
  readonly type = AuthActionTypes.StartInactivityService;
  constructor(public payload: number) {}
}

export type AuthActions =
  | GetSettings
  | GetSettingsComplete
  | InitialAuthAction
  | Login
  | LoginStarted
  | LoginSuccess
  | SendMfa
  | LoginSuccessRedirect
  | MFARequired
  | PasswordChangeRequired
  | InitialPasswordRequired
  | InitialPasswordChangeRequired
  | InitialPassword
  | InitialPasswordCancelled
  | LoginFailure
  | LoginRedirect
  | Logout
  | LogoutRedirect
  | LogoutComplete
  | ForgotPassword
  | RequestPassword
  | RequestPasswordCancelled
  | RequestPasswordComplete
  | ChangePassword
  | ChangePasswordCancelled
  | ChangePasswordComplete
  | InitializeUser
  | UserAuthenticated
  | GetTimeoutAction
  | GetTimeoutSettingComplete
  | GetTimeoutSettingError
  | StartInactivityService;
