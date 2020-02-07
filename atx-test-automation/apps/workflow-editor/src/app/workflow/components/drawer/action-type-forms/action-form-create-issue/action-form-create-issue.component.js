import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var CreateIssueDetailsInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormCreateIssueComponent = /** @class */ (function () {
    function ActionFormCreateIssueComponent() {
    }
    ActionFormCreateIssueComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormCreateIssueComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormCreateIssueComponent.prototype, "errors", void 0);
    ActionFormCreateIssueComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-create-issue',
            templateUrl: './action-form-create-issue.component.html',
            styleUrls: ['./action-form-create-issue.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormCreateIssueComponent);
    return ActionFormCreateIssueComponent;
}());
export { ActionFormCreateIssueComponent };
//# sourceMappingURL=action-form-create-issue.component.js.map