import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getRouterState } from './router.interfaces';
import { GotoRoute } from './router.actions';
var RouterFacade = /** @class */ (function () {
    function RouterFacade(store) {
        this.store = store;
        this.routerState$ = this.store.pipe(select(getRouterState));
    }
    RouterFacade.prototype.gotoRoute = function (routerParameters) {
        this.store.dispatch(new GotoRoute(routerParameters));
    };
    RouterFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], RouterFacade);
    return RouterFacade;
}());
export { RouterFacade };
//# sourceMappingURL=router.facade.js.map