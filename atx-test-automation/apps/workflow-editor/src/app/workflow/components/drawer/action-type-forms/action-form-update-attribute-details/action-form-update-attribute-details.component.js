import * as tslib_1 from "tslib";
import { FormGroup } from '@angular/forms';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowFormState } from '../../../../model/form-edit-state';
var ActionFormUpdateAttributeDetailsComponent = /** @class */ (function () {
    function ActionFormUpdateAttributeDetailsComponent() {
        this.WorkflowFormStateType = WorkflowFormState;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormUpdateAttributeDetailsComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ActionFormUpdateAttributeDetailsComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateAttributeDetailsComponent.prototype, "errors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ActionFormUpdateAttributeDetailsComponent.prototype, "formState", void 0);
    ActionFormUpdateAttributeDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-update-attribute-details',
            styleUrls: ['./action-form-update-attribute-details.component.scss'],
            templateUrl: './action-form-update-attribute-details.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ActionFormUpdateAttributeDetailsComponent);
    return ActionFormUpdateAttributeDetailsComponent;
}());
export { ActionFormUpdateAttributeDetailsComponent };
//# sourceMappingURL=action-form-update-attribute-details.component.js.map