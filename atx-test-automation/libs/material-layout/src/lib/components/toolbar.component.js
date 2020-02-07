import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@AtonixWebSites/material';
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(themeService) {
        this.themeService = themeService;
        this.toggleAssetNavigator = new EventEmitter();
        this.logOut = new EventEmitter();
        this.loggedIn = false;
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        this.useDarkTheme = this.themeService.useLightTheme;
    };
    ToolbarComponent.prototype.toggleDarkTheme = function (useDarkTheme) {
        this.themeService.setDarkTheme(useDarkTheme);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarComponent.prototype, "toggleAssetNavigator", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarComponent.prototype, "logOut", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ToolbarComponent.prototype, "loggedIn", void 0);
    ToolbarComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-toolbar',
            template: "\n    <mat-toolbar id=\"toolbar\" color=\"primary\">\n      <span *ngIf=\"loggedIn\">\n        <button class=\"toolbar-button asset-tree-button\" title=\"Toggle Asset Navigator\" (click)=\"toggleAssetNavigator.emit()\">\n          <img class=\"asset-tree-image\" width=\"20\" height=\"20\" src=\"./assets/icons/nav-tree.png\" />\n        </button>\n      </span>\n      <img class=\"logo\" src=\"./assets/images/atonix-logo-rev.png\" />\n      <span class=\"headline d-none d-sm-block\">Workflow Management</span> <span class=\"right-justify\"></span>\n    </mat-toolbar>\n  ",
            styleUrls: ['./toolbar.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [ThemeService])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map