import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
var ViewCategorySettingsComponent = /** @class */ (function () {
    function ViewCategorySettingsComponent() {
        this.closeSettingsClick = new EventEmitter();
        this.faTimes = faTimes;
    }
    ViewCategorySettingsComponent.prototype.ngOnInit = function () { };
    ViewCategorySettingsComponent.prototype.closeSettings = function () {
        this.closeSettingsClick.emit();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ViewCategorySettingsComponent.prototype, "categoryDesc", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ViewCategorySettingsComponent.prototype, "issueClassDesc", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ViewCategorySettingsComponent.prototype, "selectedAssetClassTypes", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ViewCategorySettingsComponent.prototype, "closeSettingsClick", void 0);
    ViewCategorySettingsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-view-category-settings',
            templateUrl: './view-category-settings.component.html',
            styleUrls: ['./view-category-settings.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ViewCategorySettingsComponent);
    return ViewCategorySettingsComponent;
}());
export { ViewCategorySettingsComponent };
//# sourceMappingURL=view-category-settings.component.js.map