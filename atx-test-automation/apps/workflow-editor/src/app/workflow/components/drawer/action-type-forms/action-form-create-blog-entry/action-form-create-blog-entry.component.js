import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var CreateBlogEntryDetailsInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormCreateBlogEntryComponent = /** @class */ (function () {
    function ActionFormCreateBlogEntryComponent() {
    }
    ActionFormCreateBlogEntryComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormCreateBlogEntryComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormCreateBlogEntryComponent.prototype, "errors", void 0);
    ActionFormCreateBlogEntryComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-create-blog-entry',
            templateUrl: './action-form-create-blog-entry.component.html',
            styleUrls: ['./action-form-create-blog-entry.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormCreateBlogEntryComponent);
    return ActionFormCreateBlogEntryComponent;
}());
export { ActionFormCreateBlogEntryComponent };
//# sourceMappingURL=action-form-create-blog-entry.component.js.map