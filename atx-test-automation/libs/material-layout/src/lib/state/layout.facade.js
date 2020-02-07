import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { layoutQuery } from './layout.selectors';
import { SetSidenavWidth, OpenSidenav, ToggleAssetNavigator, CloseSidenav } from './layout.actions';
var LayoutFacade = /** @class */ (function () {
    function LayoutFacade(store) {
        this.store = store;
        this.showSideNav$ = this.store.pipe(select(layoutQuery.getShowSideNav));
        this.sidenavWidth$ = this.store.pipe(select(layoutQuery.getSidenavWidth));
    }
    LayoutFacade.prototype.setSideNavWidth = function (width) {
        this.store.dispatch(new SetSidenavWidth(width));
    };
    LayoutFacade.prototype.openSidenav = function () {
        this.store.dispatch(new OpenSidenav());
    };
    LayoutFacade.prototype.toggleAssetNavigator = function () {
        this.store.dispatch(new ToggleAssetNavigator());
    };
    LayoutFacade.prototype.closeSideNav = function () {
        this.store.dispatch(new CloseSidenav());
    };
    LayoutFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], LayoutFacade);
    return LayoutFacade;
}());
export { LayoutFacade };
//# sourceMappingURL=layout.facade.js.map