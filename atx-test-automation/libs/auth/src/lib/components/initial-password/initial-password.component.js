import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
var InitialPasswordComponent = /** @class */ (function () {
    function InitialPasswordComponent() {
        this.faEnvelope = faEnvelope;
        this.faLock = faLock;
        this.submitted = new EventEmitter();
        this.cancelled = new EventEmitter();
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
            password2: new FormControl(''),
            rememberMe: new FormControl(true),
            name: new FormControl('', [Validators.required])
        }, this.validate);
    }
    InitialPasswordComponent.prototype.ngOnInit = function () {
        this.form.setValue({
            name: this.name,
            email: this.email,
            password1: '',
            password2: '',
            rememberMe: true
        });
    };
    InitialPasswordComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.submitted.emit({
                username: this.form.value.email,
                password: this.form.value.password1,
                name: this.form.value.name,
                rememberMe: this.form.value.rememberMe
            });
        }
    };
    InitialPasswordComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    InitialPasswordComponent.prototype.validate = function (g) {
        return g.get('password1').value === g.get('password2').value ? null : { mismatch: true };
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], InitialPasswordComponent.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], InitialPasswordComponent.prototype, "message", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], InitialPasswordComponent.prototype, "email", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], InitialPasswordComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], InitialPasswordComponent.prototype, "submitted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], InitialPasswordComponent.prototype, "cancelled", void 0);
    InitialPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-initial-password',
            templateUrl: './initial-password.component.html',
            styleUrls: ['../login-page.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], InitialPasswordComponent);
    return InitialPasswordComponent;
}());
export { InitialPasswordComponent };
//# sourceMappingURL=initial-password.component.js.map