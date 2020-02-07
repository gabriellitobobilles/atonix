import * as tslib_1 from "tslib";
import { FormGroup } from '@angular/forms';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowFormState } from '../../../../model/form-edit-state';
var ActionFormEmailDetailsComponent = /** @class */ (function () {
    function ActionFormEmailDetailsComponent() {
        this.WorkflowFormStateType = WorkflowFormState;
    }
    ActionFormEmailDetailsComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormEmailDetailsComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormEmailDetailsComponent.prototype, "errors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ActionFormEmailDetailsComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ActionFormEmailDetailsComponent.prototype, "formState", void 0);
    ActionFormEmailDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-email-details',
            styleUrls: ['./action-form-email-details.component.scss'],
            templateUrl: './action-form-email-details.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ActionFormEmailDetailsComponent);
    return ActionFormEmailDetailsComponent;
}());
export { ActionFormEmailDetailsComponent };
//# sourceMappingURL=action-form-email-details.component.js.map