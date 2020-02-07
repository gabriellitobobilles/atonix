import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
        this.open = false;
    }
    LayoutComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LayoutComponent.prototype, "open", void 0);
    LayoutComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-layout',
            template: "\n    <mat-sidenav-container fullscreen> <ng-content></ng-content> </mat-sidenav-container>\n  ",
            styleUrls: ['./layout.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LayoutComponent);
    return LayoutComponent;
}());
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map