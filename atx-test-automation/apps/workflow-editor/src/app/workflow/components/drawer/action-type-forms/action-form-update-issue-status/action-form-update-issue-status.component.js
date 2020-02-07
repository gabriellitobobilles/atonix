import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var UpdateIssueStatusDetailsInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormUpdateIssueStatusComponent = /** @class */ (function () {
    function ActionFormUpdateIssueStatusComponent() {
    }
    ActionFormUpdateIssueStatusComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormUpdateIssueStatusComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateIssueStatusComponent.prototype, "errors", void 0);
    ActionFormUpdateIssueStatusComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-update-issue-status',
            templateUrl: './action-form-update-issue-status.component.html',
            styleUrls: ['./action-form-update-issue-status.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormUpdateIssueStatusComponent);
    return ActionFormUpdateIssueStatusComponent;
}());
export { ActionFormUpdateIssueStatusComponent };
//# sourceMappingURL=action-form-update-issue-status.component.js.map