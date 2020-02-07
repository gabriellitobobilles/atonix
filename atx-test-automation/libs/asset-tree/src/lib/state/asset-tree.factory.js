import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AssetTreeFacade } from './asset-tree.facade';
import { Store } from '@ngrx/store';
var AssetTreeFacadeFactory = /** @class */ (function () {
    function AssetTreeFacadeFactory(store) {
        this.store = store;
    }
    AssetTreeFacadeFactory.prototype.CreateFacade = function (componentID) {
        if (componentID === void 0) { componentID = null; }
        return new AssetTreeFacade(this.store, componentID);
    };
    AssetTreeFacadeFactory = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], AssetTreeFacadeFactory);
    return AssetTreeFacadeFactory;
}());
export { AssetTreeFacadeFactory };
//# sourceMappingURL=asset-tree.factory.js.map