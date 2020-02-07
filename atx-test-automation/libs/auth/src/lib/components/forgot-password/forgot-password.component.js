import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent() {
        this.faEnvelope = faEnvelope;
        this.submitted = new EventEmitter();
        this.cancelled = new EventEmitter();
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.form.setValue({ email: this.email });
    };
    ForgotPasswordComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.submitted.emit(this.form.value.email);
        }
    };
    ForgotPasswordComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ForgotPasswordComponent.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ForgotPasswordComponent.prototype, "email", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ForgotPasswordComponent.prototype, "submitted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ForgotPasswordComponent.prototype, "cancelled", void 0);
    ForgotPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['../login-page.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map