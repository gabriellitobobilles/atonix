import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { CONTAINER_DATA } from '../asset-info-tray-injector';
import { AssetsModelService } from '@AtonixWebSites/api';
import { AssetInfoTrayService } from '../asset-info-tray.service';
import { take } from 'rxjs/operators';
import { faWindowClose, faRecycle } from '@fortawesome/free-solid-svg-icons';
var AssetInfoTrayComponent = /** @class */ (function () {
    function AssetInfoTrayComponent(data, assetsModel, service) {
        this.data = data;
        this.assetsModel = assetsModel;
        this.service = service;
        this.faClose = faWindowClose;
        this.faRefresh = faRecycle;
        this.showRefreshButton = true;
        this.showCloseButton = true;
        this.issuesCount = 0;
        this.attributes = [];
        this.attachments = [];
        this.ReasonsWhyOnTheFlyTrendsAreHid = true;
    }
    AssetInfoTrayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assetID = this.data.id;
        this.assetsModel
            .getAssetAndAttributes(this.data.id, true)
            .pipe(take(1))
            .subscribe(function (a) {
            _this.assetAndAttributes = a;
        });
    };
    AssetInfoTrayComponent.prototype.refresh = function () { };
    AssetInfoTrayComponent.prototype.close = function () {
        this.service.close();
    };
    AssetInfoTrayComponent.prototype.popupAttachment = function (attachment) { };
    AssetInfoTrayComponent.prototype.carousel = function () { };
    AssetInfoTrayComponent.prototype.imageCaption = function () {
        return 'caption';
    };
    AssetInfoTrayComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-asset-info-tray',
            templateUrl: './asset-info-tray.component.html',
            styleUrls: ['./asset-info-tray.component.scss']
        }),
        tslib_1.__param(0, Inject(CONTAINER_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object, AssetsModelService,
            AssetInfoTrayService])
    ], AssetInfoTrayComponent);
    return AssetInfoTrayComponent;
}());
export { AssetInfoTrayComponent };
//# sourceMappingURL=asset-info-tray.component.js.map