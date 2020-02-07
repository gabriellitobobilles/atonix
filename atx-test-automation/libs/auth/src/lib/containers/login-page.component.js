import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthFacade } from '../state/auth/auth.facade';
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(facade) {
        this.facade = facade;
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authState$ = this.facade.authState$;
        this.message$ = this.facade.message$;
        this.error$ = this.facade.errorMessage$;
        this.isSoftwareToken$ = this.facade.isSoftwareToken$;
        this.email$ = this.facade.email$;
        this.name$ = this.facade.name$;
        this.facade.getCognitoSettings();
        this.facade.loggedIn$.subscribe(function (n) {
            if (n) {
                _this.facade.loginSuccessRedirect();
            }
        });
    };
    LoginPageComponent.prototype.onLogin = function ($event) {
        this.facade.login($event.username, $event.password, $event.rememberMe);
    };
    LoginPageComponent.prototype.onMfa = function ($event) {
        this.facade.sendMfa($event);
    };
    LoginPageComponent.prototype.onForgotPassword = function ($event) {
        this.facade.forgotPassword($event.username);
    };
    LoginPageComponent.prototype.onRequestPassword = function ($event) {
        this.facade.requestPassword($event);
    };
    LoginPageComponent.prototype.onRequestPasswordCancelled = function () {
        this.facade.requestPasswordCancelled();
    };
    LoginPageComponent.prototype.onShowCodeForm = function ($event) {
        this.facade.requestPasswordComplete($event.username);
    };
    LoginPageComponent.prototype.onChangePassword = function ($event) {
        this.facade.changePassword($event);
    };
    LoginPageComponent.prototype.onChangePasswordCancelled = function () {
        this.facade.changePasswordCancelled();
    };
    LoginPageComponent.prototype.onInitialPassword = function ($event) {
        this.facade.initialPassword($event);
    };
    LoginPageComponent.prototype.onInitialPasswordCancelled = function () {
        this.facade.initialPasswordCancelled();
    };
    LoginPageComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-login-page',
            templateUrl: './login-page.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [AuthFacade])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
export { LoginPageComponent };
//# sourceMappingURL=login-page.component.js.map