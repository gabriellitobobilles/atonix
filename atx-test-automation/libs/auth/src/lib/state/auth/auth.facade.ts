import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { take } from 'rxjs/operators';
import {
  Login,
  Logout,
  InitialAuthAction,
  LoginRedirect,
  LoginSuccessRedirect,
  SendMfa,
  ForgotPassword,
  RequestPassword,
  RequestPasswordCancelled,
  RequestPasswordComplete,
  ChangePassword,
  ChangePasswordCancelled,
  InitialPassword,
  InitialPasswordCancelled,
  GetSettings,
  GetTimeoutAction,
  StartInactivityService
} from './auth.actions';
import { Authenticate } from '../../models/authenticate';
import { PasswordChange } from '../../models/password-change';
import { IAccountSetup } from '../../models/account-setup';

@Injectable()
export class AuthFacade {
  constructor(private store: Store<AuthState>) {}
  loggedIn$ = this.store.pipe(select(authQuery.getLoggedIn));
  authUser$ = this.store.pipe(select(authQuery.getAuthUser));
  message$ = this.store.pipe(select(authQuery.getMessage));
  isSoftwareToken$ = this.store.pipe(select(authQuery.getIsSoftwareToken));
  errorMessage$ = this.store.pipe(select(authQuery.getErrorMessage));
  authState$ = this.store.pipe(select(authQuery.getAuthState));
  email$ = this.store.pipe(select(authQuery.getEmail));
  name$ = this.store.pipe(select(authQuery.getName));
  getTimeoutInSeconds$ = this.store.pipe(select(authQuery.getTimeoutInSeconds));

  // Initiates the authentication flow.  Will update the state to say something is happening and
  // send a message to the authentication server with the username and password.
  login(username: string, password: string, rememberMe: boolean) {
    this.store.dispatch(new Login({ username, password, rememberMe }));
  }

  sendMfa(code: string) {
    this.store.dispatch(new SendMfa(code));
  }

  getTimeout() {
    this.store.dispatch(new GetTimeoutAction());
  }

  startInactivityService(inactivityTimeInMinutes: number) {
    this.store.dispatch(new StartInactivityService(inactivityTimeInMinutes));
  }

  initialAuthAction(isAuthenticated: boolean) {
    this.store.dispatch(new InitialAuthAction(isAuthenticated));
  }

  loginSuccessRedirect() {
    this.store.dispatch(new LoginSuccessRedirect());
  }

  loginRedirect() {
    this.store.dispatch(new LoginRedirect());
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  forgotPassword(email: string) {
    this.store.dispatch(new ForgotPassword(email));
  }

  requestPassword(email: string) {
    this.store.dispatch(new RequestPassword(email));
  }

  requestPasswordCancelled() {
    this.store.dispatch(new RequestPasswordCancelled());
  }

  requestPasswordComplete(email: string) {
    this.store.dispatch(new RequestPasswordComplete(email));
  }

  changePassword(passwordChange: PasswordChange) {
    this.store.dispatch(new ChangePassword(passwordChange));
  }

  changePasswordCancelled() {
    this.store.dispatch(new ChangePasswordCancelled());
  }

  initialPassword(settings: IAccountSetup) {
    this.store.dispatch(new InitialPassword(settings));
  }

  initialPasswordCancelled() {
    this.store.dispatch(new InitialPasswordCancelled());
  }

  getCognitoSettings() {
    this.store.dispatch(new GetSettings());
  }
}
