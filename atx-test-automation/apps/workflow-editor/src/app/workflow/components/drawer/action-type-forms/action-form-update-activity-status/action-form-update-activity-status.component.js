import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var UpdateActivityStatusDetailsInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormUpdateActivityStatusComponent = /** @class */ (function () {
    function ActionFormUpdateActivityStatusComponent() {
    }
    ActionFormUpdateActivityStatusComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormUpdateActivityStatusComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateActivityStatusComponent.prototype, "errors", void 0);
    ActionFormUpdateActivityStatusComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-update-activity-status',
            templateUrl: './action-form-update-activity-status.component.html',
            styleUrls: ['./action-form-update-activity-status.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormUpdateActivityStatusComponent);
    return ActionFormUpdateActivityStatusComponent;
}());
export { ActionFormUpdateActivityStatusComponent };
//# sourceMappingURL=action-form-update-activity-status.component.js.map