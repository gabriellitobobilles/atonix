import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { authQuery } from './auth.selectors';
import { Login, Logout, InitialAuthAction, LoginRedirect, LoginSuccessRedirect, SendMfa, ForgotPassword, RequestPassword, RequestPasswordCancelled, RequestPasswordComplete, ChangePassword, ChangePasswordCancelled, InitialPassword, InitialPasswordCancelled, GetSettings, GetTimeoutAction, StartInactivityService } from './auth.actions';
var AuthFacade = /** @class */ (function () {
    function AuthFacade(store) {
        this.store = store;
        this.loggedIn$ = this.store.pipe(select(authQuery.getLoggedIn));
        this.authUser$ = this.store.pipe(select(authQuery.getAuthUser));
        this.message$ = this.store.pipe(select(authQuery.getMessage));
        this.isSoftwareToken$ = this.store.pipe(select(authQuery.getIsSoftwareToken));
        this.errorMessage$ = this.store.pipe(select(authQuery.getErrorMessage));
        this.authState$ = this.store.pipe(select(authQuery.getAuthState));
        this.email$ = this.store.pipe(select(authQuery.getEmail));
        this.name$ = this.store.pipe(select(authQuery.getName));
        this.getTimeoutInSeconds$ = this.store.pipe(select(authQuery.getTimeoutInSeconds));
    }
    // Initiates the authentication flow.  Will update the state to say something is happening and
    // send a message to the authentication server with the username and password.
    AuthFacade.prototype.login = function (username, password, rememberMe) {
        this.store.dispatch(new Login({ username: username, password: password, rememberMe: rememberMe }));
    };
    AuthFacade.prototype.sendMfa = function (code) {
        this.store.dispatch(new SendMfa(code));
    };
    AuthFacade.prototype.getTimeout = function () {
        this.store.dispatch(new GetTimeoutAction());
    };
    AuthFacade.prototype.startInactivityService = function (inactivityTimeInMinutes) {
        this.store.dispatch(new StartInactivityService(inactivityTimeInMinutes));
    };
    AuthFacade.prototype.initialAuthAction = function (isAuthenticated) {
        this.store.dispatch(new InitialAuthAction(isAuthenticated));
    };
    AuthFacade.prototype.loginSuccessRedirect = function () {
        this.store.dispatch(new LoginSuccessRedirect());
    };
    AuthFacade.prototype.loginRedirect = function () {
        this.store.dispatch(new LoginRedirect());
    };
    AuthFacade.prototype.logout = function () {
        this.store.dispatch(new Logout());
    };
    AuthFacade.prototype.forgotPassword = function (email) {
        this.store.dispatch(new ForgotPassword(email));
    };
    AuthFacade.prototype.requestPassword = function (email) {
        this.store.dispatch(new RequestPassword(email));
    };
    AuthFacade.prototype.requestPasswordCancelled = function () {
        this.store.dispatch(new RequestPasswordCancelled());
    };
    AuthFacade.prototype.requestPasswordComplete = function (email) {
        this.store.dispatch(new RequestPasswordComplete(email));
    };
    AuthFacade.prototype.changePassword = function (passwordChange) {
        this.store.dispatch(new ChangePassword(passwordChange));
    };
    AuthFacade.prototype.changePasswordCancelled = function () {
        this.store.dispatch(new ChangePasswordCancelled());
    };
    AuthFacade.prototype.initialPassword = function (settings) {
        this.store.dispatch(new InitialPassword(settings));
    };
    AuthFacade.prototype.initialPasswordCancelled = function () {
        this.store.dispatch(new InitialPasswordCancelled());
    };
    AuthFacade.prototype.getCognitoSettings = function () {
        this.store.dispatch(new GetSettings());
    };
    AuthFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], AuthFacade);
    return AuthFacade;
}());
export { AuthFacade };
//# sourceMappingURL=auth.facade.js.map