import * as tslib_1 from "tslib";
import { Store, select } from '@ngrx/store';
import { tabViewQuery } from './tab-view.selector';
import { AssetViewFromId, AssetViewFromIdFailure } from './tab-view.actions';
import { Injectable } from '@angular/core';
var TabViewFacade = /** @class */ (function () {
    function TabViewFacade(store) {
        this.store = store;
        this.tabViewErrorMessage$ = this.store.pipe(select(tabViewQuery.tabViewErrorMessage));
        this.assetViews$ = this.store.pipe(select(tabViewQuery.getAssetViews));
        this.defaultView$ = this.store.pipe(select(tabViewQuery.getDefaultView));
        this.tabViewPending$ = this.store.pipe(select(tabViewQuery.getTabViewPending));
    }
    TabViewFacade.prototype.getAssetViews = function (assetID, appContextID) {
        this.store.dispatch(new AssetViewFromId({ assetID: assetID, appContextID: appContextID }));
    };
    TabViewFacade.prototype.setAssetError = function (parameters) {
        this.store.dispatch(new AssetViewFromIdFailure(parameters));
    };
    TabViewFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], TabViewFacade);
    return TabViewFacade;
}());
export { TabViewFacade };
//# sourceMappingURL=tab-view.facade.js.map