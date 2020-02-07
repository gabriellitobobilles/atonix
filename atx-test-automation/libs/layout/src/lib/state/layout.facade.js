import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { layoutQuery } from './layout.selectors';
import * as actions from './layout.actions';
var LayoutFacade = /** @class */ (function () {
    function LayoutFacade(store) {
        this.store = store;
        this.isAssetNavigatorOpened$ = this.store.pipe(select(layoutQuery.getIsAssetNavigatorOpen));
        this.currentAssetNavigatorWidth$ = this.store.pipe(select(layoutQuery.getCurrentAssetNavigatorWidth));
        this.isTimeSelectorOpened$ = this.store.pipe(select(layoutQuery.getIsTimeSelectorOpen));
        this.timeSelectorHeight$ = this.store.pipe(select(layoutQuery.getTimeSelectorHeight));
        this.getMainPanelBottom$ = this.store.pipe(select(layoutQuery.getMainPanelBottom));
    }
    LayoutFacade.prototype.setAssetNavigatorWidth = function (width) {
        this.store.dispatch(new actions.SetAssetNavigatorWidth(width));
    };
    LayoutFacade.prototype.setTimeSelectorHeight = function (height) {
        this.store.dispatch(new actions.SetTimeSelectorHeight(height));
    };
    LayoutFacade.prototype.openAssetNavigator = function () {
        this.store.dispatch(new actions.OpenAssetNavigator());
    };
    LayoutFacade.prototype.openTimeSelector = function () {
        this.store.dispatch(new actions.OpenTimeSelector());
    };
    LayoutFacade.prototype.toggleAssetNavigator = function () {
        this.store.dispatch(new actions.ToggleAssetNavigator());
    };
    LayoutFacade.prototype.toggleTimeSelector = function () {
        this.store.dispatch(new actions.ToggleTimeSelector());
    };
    LayoutFacade.prototype.closeAssetNavigator = function () {
        this.store.dispatch(new actions.CloseAssetNavigator());
    };
    LayoutFacade.prototype.closeTimeSelector = function () {
        this.store.dispatch(new actions.CloseTimeSelector());
    };
    LayoutFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], LayoutFacade);
    return LayoutFacade;
}());
export { LayoutFacade };
//# sourceMappingURL=layout.facade.js.map