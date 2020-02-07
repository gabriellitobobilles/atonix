import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faCode } from '@fortawesome/free-solid-svg-icons';
var MfaFormComponent = /** @class */ (function () {
    function MfaFormComponent() {
        this.faCode = faCode;
        this.submitted = new EventEmitter();
        this.form = new FormGroup({ code: new FormControl('') });
    }
    MfaFormComponent.prototype.ngOnInit = function () { };
    MfaFormComponent.prototype.submit = function () {
        if (this.form.valid) {
            this.submitted.emit(this.form.value.code);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MfaFormComponent.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], MfaFormComponent.prototype, "isSoftwareToken", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], MfaFormComponent.prototype, "submitted", void 0);
    MfaFormComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-mfa-form',
            templateUrl: './mfa-form.component.html',
            styleUrls: ['../login-page.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MfaFormComponent);
    return MfaFormComponent;
}());
export { MfaFormComponent };
//# sourceMappingURL=mfa-form.component.js.map