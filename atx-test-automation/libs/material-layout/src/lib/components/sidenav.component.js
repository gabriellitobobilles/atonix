import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent() {
        this.open = false;
        this.resizeSideNav = new EventEmitter();
    }
    SidenavComponent.prototype.onResizeEnd = function (event) {
        if (event.rectangle) {
            this.resizeSideNav.emit({ resizeWidth: Number(event.rectangle.right) });
        }
    };
    SidenavComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SidenavComponent.prototype, "open", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], SidenavComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SidenavComponent.prototype, "resizeSideNav", void 0);
    SidenavComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-sidenav',
            template: "\n    <mat-sidenav\n      [style.width.px]=\"width\"\n      mode=\"push\"\n      autosize\n      mwlResizable\n      [resizeEdges]=\"{ right: true }\"\n      (resizeEnd)=\"onResizeEnd($event)\"\n      class=\"mat-elevation-z1 scrollcontainer mat-typography\"\n      [opened]=\"open\"\n    >\n      <ng-content></ng-content>\n    </mat-sidenav>\n  ",
            styleUrls: ['./sidenav.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SidenavComponent);
    return SidenavComponent;
}());
export { SidenavComponent };
//# sourceMappingURL=sidenav.component.js.map