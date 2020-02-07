import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { CONTAINER_DATA } from './asset-info-tray-injector';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AssetInfoTrayComponent } from './asset-info-tray/asset-info-tray.component';
var AssetInfoTrayService = /** @class */ (function () {
    function AssetInfoTrayService(overlay, injector) {
        this.overlay = overlay;
        this.injector = injector;
    }
    AssetInfoTrayService.prototype.show = function (id) {
        var _this = this;
        this.close();
        this.popupOverlayRef = this.overlay.create({
            height: 'calc(100% - 120px)',
            width: '300px',
            positionStrategy: this.overlay
                .position()
                .global()
                .bottom('80px')
                .right('10px'),
            scrollStrategy: this.overlay.scrollStrategies.block(),
            hasBackdrop: false,
            backdropClass: 'dark-backdrop',
            panelClass: 'apps-panel'
        });
        var injectorTokens = new WeakMap();
        var containerData = { id: id };
        injectorTokens.set(CONTAINER_DATA, containerData);
        var injector = new PortalInjector(this.injector, injectorTokens);
        var myPortal = new ComponentPortal(AssetInfoTrayComponent, null, injector);
        this.popupOverlayRef.attach(myPortal);
        this.popupOverlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    AssetInfoTrayService.prototype.close = function () {
        if (this.popupOverlayRef) {
            this.popupOverlayRef.dispose();
            this.popupOverlayRef = null;
        }
    };
    AssetInfoTrayService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Overlay, Injector])
    ], AssetInfoTrayService);
    return AssetInfoTrayService;
}());
export { AssetInfoTrayService };
//# sourceMappingURL=asset-info-tray.service.js.map