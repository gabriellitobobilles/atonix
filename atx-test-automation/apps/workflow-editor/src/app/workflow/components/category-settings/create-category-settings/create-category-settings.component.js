import * as tslib_1 from "tslib";
import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
var CreateCategorySettingsComponent = /** @class */ (function () {
    function CreateCategorySettingsComponent() {
        this.assetClassTypesChanged = new EventEmitter();
    }
    CreateCategorySettingsComponent.prototype.ngOnInit = function () { };
    CreateCategorySettingsComponent.prototype.assetClassSelectionChanged = function (event, assetClassTypeID) {
        if (event.isUserInput) {
            this.assetClassTypesChanged.emit(assetClassTypeID);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], CreateCategorySettingsComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CreateCategorySettingsComponent.prototype, "issueClasses", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CreateCategorySettingsComponent.prototype, "assetClassTypes", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CreateCategorySettingsComponent.prototype, "validationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CreateCategorySettingsComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CreateCategorySettingsComponent.prototype, "assetClassTypesChanged", void 0);
    CreateCategorySettingsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-create-category-settings',
            templateUrl: './create-category-settings.component.html',
            styleUrls: ['./create-category-settings.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CreateCategorySettingsComponent);
    return CreateCategorySettingsComponent;
}());
export { CreateCategorySettingsComponent };
//# sourceMappingURL=create-category-settings.component.js.map