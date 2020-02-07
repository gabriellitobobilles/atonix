import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope, faLock, faCode } from '@fortawesome/free-solid-svg-icons';
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
            password2: new FormControl(''),
            code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
            rememberMe: new FormControl(true)
        }, this.validate);
        this.faEnvelope = faEnvelope;
        this.faLock = faLock;
        this.faCode = faCode;
        this.submitted = new EventEmitter();
        this.cancelled = new EventEmitter();
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.form.patchValue({ email: this.email });
    };
    ChangePasswordComponent.prototype.validate = function (g) {
        return g.get('password1').value === g.get('password2').value ? null : { mismatch: true };
    };
    ChangePasswordComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.submitted.emit({
                email: this.form.value.email,
                password: this.form.value.password1,
                code: this.form.value.code,
                rememberMe: this.form.value.rememberMe
            });
        }
    };
    ChangePasswordComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ChangePasswordComponent.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ChangePasswordComponent.prototype, "email", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ChangePasswordComponent.prototype, "submitted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ChangePasswordComponent.prototype, "cancelled", void 0);
    ChangePasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['../login-page.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map