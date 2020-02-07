import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimeRangeSelectorFacade } from '@AtonixWebSites/time-range-selector';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { AssetInfoTrayService } from '@AtonixWebSites/asset-info-tray';
import { takeWhile } from 'rxjs/operators';
var MapComponent = /** @class */ (function () {
    function MapComponent(timeRangeFacade, assetTreeFacadeFactory, assetInfoTrayService) {
        this.timeRangeFacade = timeRangeFacade;
        this.assetInfoTrayService = assetInfoTrayService;
        this.killer = true;
        this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade('maptab');
        this.appAssetTreeFacade = assetTreeFacadeFactory.CreateFacade();
        this.startDate$ = timeRangeFacade.startDate$;
        this.endDate$ = timeRangeFacade.endDate$;
        this.indicator$ = timeRangeFacade.indicator$;
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assetTreeFacade.initialize({});
        this.selectedAssetGuid$ = this.assetTreeFacade.selectedAssetGuid$;
        this.selectedAssetID$ = this.assetTreeFacade.selectedAssetID$;
        this.selectedAssetID$
            .pipe(takeWhile(function () {
            return _this.killer;
        }))
            .subscribe(function (n) {
            _this.selectedAsset = String(n);
        });
    };
    MapComponent.prototype.ngOnDestroy = function () {
        this.killer = false;
    };
    MapComponent.prototype.Indicator = function (newState) {
        if (newState) {
            this.timeRangeFacade.configureTimeRangeSelector(undefined, undefined, new Date());
        }
        else {
            this.timeRangeFacade.configureTimeRangeSelector(undefined, undefined, null);
        }
    };
    MapComponent.prototype.Range = function (newState) {
        if (newState) {
            this.timeRangeFacade.configureTimeRangeSelector(new Date(2018, 6, 1), new Date(2018, 7, 1));
        }
        else {
            this.timeRangeFacade.configureTimeRangeSelector(null, null);
        }
    };
    MapComponent.prototype.SetAsset = function () {
        this.appAssetTreeFacade.selectAssetByGUID(this.selectedAsset);
    };
    MapComponent.prototype.NodeSelected = function (newNode) {
        if (newNode && newNode.Asset) {
            this.appAssetTreeFacade.selectAssetByGUID(newNode.Asset.GlobalId);
        }
    };
    MapComponent.prototype.AssetInfoTray = function (asset) {
        this.assetInfoTrayService.show(asset);
    };
    MapComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-map',
            templateUrl: './map.component.html',
            styleUrls: ['./map.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [TimeRangeSelectorFacade,
            AssetTreeFacadeFactory,
            AssetInfoTrayService])
    ], MapComponent);
    return MapComponent;
}());
export { MapComponent };
//# sourceMappingURL=map.component.js.map