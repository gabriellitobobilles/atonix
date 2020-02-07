import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';
import { AuthService, AtonixAuthenticationConstants } from '../../services/auth.service';
import { AccountModelService } from '@AtonixWebSites/api';
import { Store, select } from '@ngrx/store';
import { LoginSuccess, AuthActionTypes, Login, LoginFailure, LoginStarted, LogoutComplete, MFARequired, PasswordChangeRequired, InitialPasswordRequired, InitialPasswordChangeRequired, RequestPasswordComplete, InitializeUser, LogoutRedirect, GetSettingsComplete, UserAuthenticated, GetTimeoutSettingComplete } from './auth.actions';
import { of as observableOf, of } from 'rxjs';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
import { authQuery } from './auth.selectors';
import { LOGOUT } from '../root';
// See GrantResourceOwnerCredentials
var AuthEffects = /** @class */ (function () {
    function AuthEffects(actions$, authService, accountModelService, router, routerFacade, store) {
        var _this = this;
        this.actions$ = actions$;
        this.authService = authService;
        this.accountModelService = accountModelService;
        this.router = router;
        this.routerFacade = routerFacade;
        this.store = store;
        this.timeoutSettings$ = this.actions$.pipe(ofType(AuthActionTypes.GetTimeout), switchMap(function (_) {
            return _this.authService.TimeoutSetting().pipe(map(function (response) {
                return new GetTimeoutSettingComplete(response);
            }));
        }));
        this.getSettings$ = this.actions$.pipe(ofType(AuthActionTypes.GetSettings), switchMap(function (action) {
            return _this.authService.GetPoolInfo().pipe(map(function (response) {
                return new GetSettingsComplete({ ClientID: response.client, PoolID: response.pool });
            }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
        }));
        this.login$ = this.actions$.pipe(ofType(AuthActionTypes.Login), tap(function (d) {
            _this.store.dispatch(new LoginStarted(d.payload.username));
        }), map(function (action) { return action.payload; }), switchMap(function (auth) {
            return _this.authService.Login(auth.username, auth.password, auth.rememberMe).pipe(map(function (response) {
                if (response.Status === AtonixAuthenticationConstants.LoginSuccessful) {
                    return new UserAuthenticated();
                }
                else if (response.Status === AtonixAuthenticationConstants.PasswordChangeRequired) {
                    return new PasswordChangeRequired(auth.username);
                }
                else if (response.Status === AtonixAuthenticationConstants.MFARequired) {
                    return new MFARequired(response.Challenge);
                }
                else if (response.Status === AtonixAuthenticationConstants.TotpRequired) {
                    return new MFARequired(response.Challenge);
                }
                else if (response.Status === AtonixAuthenticationConstants.InitialPasswordRequired) {
                    return new InitialPasswordChangeRequired(response.UserAttributes);
                }
                else {
                    return new LoginFailure('Could not authenticate.');
                }
            }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
        }));
        this.initialPW$ = this.actions$.pipe(ofType(AuthActionTypes.InitialPassword), map(function (action) { return action.payload; }), switchMap(function (params) {
            return _this.authService.CompleteInitialPassword(params.password, { name: params.name }).pipe(map(function (response) {
                if (response.Status === AtonixAuthenticationConstants.LoginSuccessful) {
                    return new UserAuthenticated();
                }
                else if (response.Status === AtonixAuthenticationConstants.MFARequired) {
                    return new MFARequired(response.Challenge);
                }
            }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
        }));
        this.changePassword$ = this.actions$.pipe(ofType(AuthActionTypes.ChangePassword), tap(function (d) {
            _this.store.dispatch(new LoginStarted(d.payload.email));
        }), map(function (action) { return action.payload; }), switchMap(function (action) {
            return _this.authService.ConfirmPassword(action.email, action.password, action.code).pipe(map(function (response) {
                return new Login({
                    username: action.email,
                    password: action.password,
                    rememberMe: action.rememberMe
                });
            }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
        }));
        this.requestPassword$ = this.actions$.pipe(ofType(AuthActionTypes.RequestPassword), tap(function (d) {
            _this.store.dispatch(new LoginStarted(d.email));
        }), map(function (action) { return action.email; }), switchMap(function (email) {
            return _this.authService.ForgotPassword(email).pipe(map(function (response) { return new RequestPasswordComplete(email); }), catchError(function (error) {
                var result = null;
                // tslint:disable-next-line:prefer-conditional-expression
                if (error && error.code === 'UserNotFoundException') {
                    result = observableOf(new InitializeUser(email));
                }
                else {
                    result = observableOf(new LoginFailure(error));
                }
                return result;
            }));
        }));
        this.sendMfa = this.actions$.pipe(ofType(AuthActionTypes.SendMfa), tap(function (d) {
            _this.store.dispatch(new LoginStarted());
        }), map(function (action) { return action.code; }), withLatestFrom(this.store.pipe(select(authQuery.getIsSoftwareToken))), switchMap(function (_a) {
            var code = _a[0], isSoftwareToken = _a[1];
            if (isSoftwareToken) {
                return _this.authService.FinishLoginSoftwareToken(code).pipe(map(function (response) { return new UserAuthenticated(); }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
            }
            else {
                return _this.authService.FinishLoginSMS(code).pipe(map(function (response) { return new UserAuthenticated(); }), catchError(function (error) { return observableOf(new LoginFailure(error)); }));
            }
        }));
        this.initializeUser = this.actions$.pipe(ofType(AuthActionTypes.InitializeUser), map(function (action) { return action.payload; }), switchMap(function (email) {
            return _this.authService.InitializeUser(email).pipe(map(function (response) { return new InitialPasswordRequired(email, response); }), catchError(function (error) {
                return observableOf(new LoginFailure(error));
            }));
        }));
        this.setInactivityService$ = this.actions$.pipe(ofType(AuthActionTypes.StartInactivityService), map(function (action) { return action.payload; }), switchMap(function (inactivityTimeInMinutes) { return of(_this.authService.startTimeout(inactivityTimeInMinutes)); }));
        this.logout$ = this.actions$.pipe(ofType(AuthActionTypes.Logout), switchMap(function () { return [new LogoutComplete(), new LOGOUT(), new LogoutRedirect()]; }));
        this.logoutRedirect$ = this.actions$.pipe(ofType(AuthActionTypes.LogoutRedirect), map(function () {
            _this.authService.stopTimeout();
            _this.authService.LogOut();
            _this.router.navigate(['/login']);
        }));
        this.loginSuccessRedirect$ = this.actions$.pipe(ofType(AuthActionTypes.LoginSuccessRedirect), withLatestFrom(this.routerFacade.routerState$), concatMap(function (_a) {
            var _ = _a[0], router = _a[1];
            return _this.router.navigate(['/'], { queryParams: router.state.queryParams });
        }));
        this.loginRedirect$ = this.actions$.pipe(ofType(AuthActionTypes.LoginRedirect), withLatestFrom(this.routerFacade.routerState$), concatMap(function (_a) {
            var _ = _a[0], router = _a[1];
            return _this.router.navigate(['/login'], { queryParams: router.state.queryParams });
        }));
        this.userAuthenticated$ = this.actions$.pipe(ofType(AuthActionTypes.UserAuthenticated), switchMap(function () {
            return _this.accountModelService.userAuthenticated().pipe(map(function (result) {
                return new LoginSuccess();
            }), catchError(function (error) {
                return observableOf(new LoginFailure(error));
            }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "timeoutSettings$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "getSettings$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "login$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "initialPW$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "changePassword$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "requestPassword$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "sendMfa", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "initializeUser", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "setInactivityService$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "logout$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "logoutRedirect$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "loginSuccessRedirect$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "loginRedirect$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AuthEffects.prototype, "userAuthenticated$", void 0);
    AuthEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            AuthService,
            AccountModelService,
            Router,
            RouterFacade,
            Store])
    ], AuthEffects);
    return AuthEffects;
}());
export { AuthEffects };
//# sourceMappingURL=auth.effects.js.map