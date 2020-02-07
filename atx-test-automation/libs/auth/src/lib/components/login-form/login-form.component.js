import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent() {
        this.faEnvelope = faEnvelope;
        this.faLock = faLock;
        this.submitted = new EventEmitter();
        this.showForgotPassword = new EventEmitter();
        this.showCodeForm = new EventEmitter();
        this.form = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
            rememberMe: new FormControl(true)
        });
    }
    LoginFormComponent.prototype.ngOnInit = function () { };
    LoginFormComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.submitted.emit({
                username: this.form.value.username,
                password: this.form.value.password,
                rememberMe: this.form.value.rememberMe
            });
        }
    };
    LoginFormComponent.prototype.forgotPassword = function () {
        this.showForgotPassword.emit({
            username: this.form.value.username,
            password: this.form.value.password,
            rememberMe: this.form.value.rememberMe
        });
    };
    LoginFormComponent.prototype.showCode = function () {
        this.showCodeForm.emit({
            username: this.form.value.username,
            password: this.form.value.password,
            rememberMe: this.form.value.rememberMe
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LoginFormComponent.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LoginFormComponent.prototype, "message", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LoginFormComponent.prototype, "submitted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LoginFormComponent.prototype, "showForgotPassword", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LoginFormComponent.prototype, "showCodeForm", void 0);
    LoginFormComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['../login-page.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map