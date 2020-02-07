import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';
import { AuthService, AtonixAuthenticationConstants } from '../../services/auth.service';
import { AccountModelService } from '@AtonixWebSites/api';
import { Store, select, Action } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import {
  LoginSuccess,
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginStarted,
  LogoutComplete,
  MFARequired,
  SendMfa,
  PasswordChangeRequired,
  InitialPasswordRequired,
  InitialPasswordChangeRequired,
  RequestPassword,
  RequestPasswordComplete,
  ChangePassword,
  InitializeUser,
  InitialPassword,
  LoginRedirect,
  LoginSuccessRedirect,
  LogoutRedirect,
  GetSettings,
  GetSettingsComplete,
  UserAuthenticated,
  GetTimeoutAction,
  GetTimeoutSettingComplete,
  GetTimeoutSettingError,
  StartInactivityService
} from './auth.actions';
import { of as observableOf, Observable, empty, of } from 'rxjs';
import { Authenticate } from '../../models/authenticate';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
import { authQuery } from './auth.selectors';
import { PasswordChange } from '../../models/password-change';
import { IAccountSetup } from '../../models/account-setup';
import { LOGOUT } from '../root';

// See GrantResourceOwnerCredentials
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private accountModelService: AccountModelService,
    private router: Router,
    private routerFacade: RouterFacade,
    private store: Store<AuthState>
  ) {}

  @Effect()
  timeoutSettings$ = this.actions$.pipe(
    ofType(AuthActionTypes.GetTimeout),
    switchMap(_ => {
      return this.authService.TimeoutSetting().pipe(
        map(response => {
          return new GetTimeoutSettingComplete(response);
        })
      );
    })
  );

  @Effect()
  getSettings$ = this.actions$.pipe(
    ofType(AuthActionTypes.GetSettings),
    switchMap((action: GetSettings) => {
      return this.authService.GetPoolInfo().pipe(
        map(response => {
          return new GetSettingsComplete({ ClientID: response.client, PoolID: response.pool });
        }),
        catchError(error => observableOf(new LoginFailure(error)))
      );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    tap((d: Login) => {
      this.store.dispatch(new LoginStarted(d.payload.username));
    }),
    map((action: Login) => action.payload),
    switchMap((auth: Authenticate) => {
      return this.authService.Login(auth.username, auth.password, auth.rememberMe).pipe(
        map(response => {
          if (response.Status === AtonixAuthenticationConstants.LoginSuccessful) {
            return new UserAuthenticated();
          } else if (response.Status === AtonixAuthenticationConstants.PasswordChangeRequired) {
            return new PasswordChangeRequired(auth.username);
          } else if (response.Status === AtonixAuthenticationConstants.MFARequired) {
            return new MFARequired(response.Challenge);
          } else if (response.Status === AtonixAuthenticationConstants.TotpRequired) {
            return new MFARequired(response.Challenge);
          } else if (response.Status === AtonixAuthenticationConstants.InitialPasswordRequired) {
            return new InitialPasswordChangeRequired(response.UserAttributes);
          } else {
            return new LoginFailure('Could not authenticate.');
          }
        }),
        catchError(error => observableOf(new LoginFailure(error)))
      );
    })
  );

  @Effect()
  initialPW$ = this.actions$.pipe(
    ofType(AuthActionTypes.InitialPassword),
    map((action: InitialPassword) => action.payload),
    switchMap((params: IAccountSetup) => {
      return this.authService.CompleteInitialPassword(params.password, { name: params.name }).pipe(
        map(response => {
          if (response.Status === AtonixAuthenticationConstants.LoginSuccessful) {
            return new UserAuthenticated();
          } else if (response.Status === AtonixAuthenticationConstants.MFARequired) {
            return new MFARequired(response.Challenge);
          }
        }),
        catchError(error => observableOf(new LoginFailure(error)))
      );
    })
  );

  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType(AuthActionTypes.ChangePassword),
    tap((d: ChangePassword) => {
      this.store.dispatch(new LoginStarted(d.payload.email));
    }),
    map((action: ChangePassword) => action.payload),
    switchMap((action: PasswordChange) => {
      return this.authService.ConfirmPassword(action.email, action.password, action.code).pipe(
        map(response => {
          return new Login({
            username: action.email,
            password: action.password,
            rememberMe: action.rememberMe
          });
        }),
        catchError(error => observableOf(new LoginFailure(error)))
      );
    })
  );

  @Effect()
  requestPassword$ = this.actions$.pipe(
    ofType(AuthActionTypes.RequestPassword),
    tap((d: RequestPassword) => {
      this.store.dispatch(new LoginStarted(d.email));
    }),
    map((action: RequestPassword) => action.email),
    switchMap((email: string) => {
      return this.authService.ForgotPassword(email).pipe(
        map(response => new RequestPasswordComplete(email)),
        catchError(error => {
          let result: Observable<Action> = null;
          // tslint:disable-next-line:prefer-conditional-expression
          if (error && error.code === 'UserNotFoundException') {
            result = observableOf(new InitializeUser(email));
          } else {
            result = observableOf(new LoginFailure(error));
          }
          return result;
        })
      );
    })
  );

  @Effect()
  sendMfa = this.actions$.pipe(
    ofType(AuthActionTypes.SendMfa),
    tap((d: SendMfa) => {
      this.store.dispatch(new LoginStarted());
    }),
    map((action: SendMfa) => action.code),
    withLatestFrom(this.store.pipe(select(authQuery.getIsSoftwareToken))),
    switchMap(([code, isSoftwareToken]) => {
      if (isSoftwareToken) {
        return this.authService.FinishLoginSoftwareToken(code).pipe(
          map(response => new UserAuthenticated()),
          catchError(error => observableOf(new LoginFailure(error)))
        );
      } else {
        return this.authService.FinishLoginSMS(code).pipe(
          map(response => new UserAuthenticated()),
          catchError(error => observableOf(new LoginFailure(error)))
        );
      }
    })
  );

  @Effect()
  initializeUser = this.actions$.pipe(
    ofType(AuthActionTypes.InitializeUser),
    map((action: InitializeUser) => action.payload),
    switchMap(email =>
      this.authService.InitializeUser(email).pipe(
        map(response => new InitialPasswordRequired(email, response)),
        catchError(error => {
          return observableOf(new LoginFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  setInactivityService$ = this.actions$.pipe(
    ofType(AuthActionTypes.StartInactivityService),
    map((action: StartInactivityService) => action.payload),
    switchMap(inactivityTimeInMinutes => of(this.authService.startTimeout(inactivityTimeInMinutes)))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    switchMap(() => [new LogoutComplete(), new LOGOUT(), new LogoutRedirect()])
  );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutRedirect),
    map(() => {
      this.authService.stopTimeout();
      this.authService.LogOut();
      this.router.navigate(['/login']);
    })
  );
  @Effect({ dispatch: false })
  loginSuccessRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccessRedirect),
    withLatestFrom(this.routerFacade.routerState$),
    concatMap(([_, router]) => this.router.navigate(['/'], { queryParams: router.state.queryParams }))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    withLatestFrom(this.routerFacade.routerState$),
    concatMap(([_, router]) => this.router.navigate(['/login'], { queryParams: router.state.queryParams }))
  );

  @Effect()
  userAuthenticated$ = this.actions$.pipe(
    ofType(AuthActionTypes.UserAuthenticated),
    switchMap(() =>
      this.accountModelService.userAuthenticated().pipe(
        map(result => {
          return new LoginSuccess();
        }),
        catchError(error => {
          return observableOf(new LoginFailure(error));
        })
      )
    )
  );
}
