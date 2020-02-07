import { Injectable, Injector, ComponentRef } from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  PositionStrategy,
  CdkOverlayOrigin,
  OverlayRef,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AppOverlayComponent } from './app-overlay.component';
import { AppOverlayRef } from './app-overlay-ref';

interface AppOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  height?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  positionStrategy?: PositionStrategy;
}

@Injectable()
export class AppOverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(position: CdkOverlayOrigin = null) {
    const overlayConfig: AppOverlayConfig = {
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'apps-panel',
      height: 500,
      width: 440,
      minHeight: 500,
      maxHeight: 500
    };
    if (position !== null) {
      const positions = [
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
      ];
      overlayConfig.positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(position.elementRef)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true);
    } else {
      overlayConfig.positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
    }
    const overlayRef = this.createOverlay(overlayConfig);
    const appOverlayRef = new AppOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(overlayRef, overlayConfig, appOverlayRef);
    appOverlayRef.componentInstance = overlayComponent;
    overlayRef.backdropClick().subscribe(_ => {
      appOverlayRef.close();
    });
    appOverlayRef.componentInstance.cancel.subscribe(_ => {
      appOverlayRef.close();
    });
    return appOverlayRef;
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: AppOverlayConfig, appOverlayRef: AppOverlayRef) {
    const injector = this.createInjector(config, appOverlayRef);
    const containerPortal = new ComponentPortal(AppOverlayComponent, null, injector);
    const containerRef: ComponentRef<AppOverlayComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createInjector(config: AppOverlayConfig, dialogRef: AppOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(AppOverlayRef, dialogRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private createOverlay(config: AppOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: AppOverlayConfig): OverlayConfig {
    const overlayConfig = new OverlayConfig({
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
  }
}
