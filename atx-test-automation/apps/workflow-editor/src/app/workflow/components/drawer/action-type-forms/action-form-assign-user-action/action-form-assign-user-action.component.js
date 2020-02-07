import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var AssignUserActionDetailsFormInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormAssignUserActionComponent = /** @class */ (function () {
    function ActionFormAssignUserActionComponent() {
    }
    ActionFormAssignUserActionComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormAssignUserActionComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormAssignUserActionComponent.prototype, "errors", void 0);
    ActionFormAssignUserActionComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-assign-user-action',
            templateUrl: './action-form-assign-user-action.component.html',
            styleUrls: ['./action-form-assign-user-action.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormAssignUserActionComponent);
    return ActionFormAssignUserActionComponent;
}());
export { ActionFormAssignUserActionComponent };
//# sourceMappingURL=action-form-assign-user-action.component.js.map