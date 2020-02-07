import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AppOverlayComponent } from './app-overlay.component';
import { AppOverlayRef } from './app-overlay-ref';
var AppOverlayService = /** @class */ (function () {
    function AppOverlayService(overlay, injector) {
        this.overlay = overlay;
        this.injector = injector;
    }
    AppOverlayService.prototype.open = function (position) {
        if (position === void 0) { position = null; }
        var overlayConfig = {
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            panelClass: 'apps-panel',
            height: 500,
            width: 440,
            minHeight: 500,
            maxHeight: 500
        };
        if (position !== null) {
            var positions = [
                new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
                new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            ];
            overlayConfig.positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(position.elementRef)
                .withPositions(positions)
                .withFlexibleDimensions(false)
                .withPush(true);
        }
        else {
            overlayConfig.positionStrategy = this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically();
        }
        var overlayRef = this.createOverlay(overlayConfig);
        var appOverlayRef = new AppOverlayRef(overlayRef);
        var overlayComponent = this.attachDialogContainer(overlayRef, overlayConfig, appOverlayRef);
        appOverlayRef.componentInstance = overlayComponent;
        overlayRef.backdropClick().subscribe(function (_) {
            appOverlayRef.close();
        });
        appOverlayRef.componentInstance.cancel.subscribe(function (_) {
            appOverlayRef.close();
        });
        return appOverlayRef;
    };
    AppOverlayService.prototype.attachDialogContainer = function (overlayRef, config, appOverlayRef) {
        var injector = this.createInjector(config, appOverlayRef);
        var containerPortal = new ComponentPortal(AppOverlayComponent, null, injector);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    AppOverlayService.prototype.createInjector = function (config, dialogRef) {
        var injectionTokens = new WeakMap();
        injectionTokens.set(AppOverlayRef, dialogRef);
        return new PortalInjector(this.injector, injectionTokens);
    };
    AppOverlayService.prototype.createOverlay = function (config) {
        var overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    };
    AppOverlayService.prototype.getOverlayConfig = function (config) {
        var overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            width: config.width,
            height: config.height,
            maxHeight: config.maxHeight,
            minHeight: config.minHeight,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: config.positionStrategy
        });
        return overlayConfig;
    };
    AppOverlayService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Overlay, Injector])
    ], AppOverlayService);
    return AppOverlayService;
}());
export { AppOverlayService };
//# sourceMappingURL=app-overlay-service.js.map