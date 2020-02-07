import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { WorkflowFormState } from '../../../model/form-edit-state';
var AllowableNextStatusesComponent = /** @class */ (function () {
    function AllowableNextStatusesComponent() {
        this.WorkflowFormStateType = WorkflowFormState;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AllowableNextStatusesComponent.prototype, "statusNames", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormArray)
    ], AllowableNextStatusesComponent.prototype, "allowedNextStatuses", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AllowableNextStatusesComponent.prototype, "myIndex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AllowableNextStatusesComponent.prototype, "formState", void 0);
    AllowableNextStatusesComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-allowable-next-statuses',
            templateUrl: './allowable-next-statuses.component.html',
            styleUrls: ['./allowable-next-statuses.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AllowableNextStatusesComponent);
    return AllowableNextStatusesComponent;
}());
export { AllowableNextStatusesComponent };
//# sourceMappingURL=allowable-next-statuses.component.js.map