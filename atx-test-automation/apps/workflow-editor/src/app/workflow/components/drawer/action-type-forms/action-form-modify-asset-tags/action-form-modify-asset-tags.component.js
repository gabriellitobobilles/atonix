import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
export var ModifyAssetTagsFormInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormModifyAssetTagsComponent = /** @class */ (function () {
    function ActionFormModifyAssetTagsComponent() {
    }
    ActionFormModifyAssetTagsComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormModifyAssetTagsComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormModifyAssetTagsComponent.prototype, "errors", void 0);
    ActionFormModifyAssetTagsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-modify-asset-tags',
            templateUrl: './action-form-modify-asset-tags.component.html',
            styleUrls: ['./action-form-modify-asset-tags.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormModifyAssetTagsComponent);
    return ActionFormModifyAssetTagsComponent;
}());
export { ActionFormModifyAssetTagsComponent };
//# sourceMappingURL=action-form-modify-asset-tags.component.js.map