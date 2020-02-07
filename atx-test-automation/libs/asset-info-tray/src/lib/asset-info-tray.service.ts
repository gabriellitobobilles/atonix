import { Injectable, Injector } from '@angular/core';
import { CONTAINER_DATA, IContainerData } from './asset-info-tray-injector';
import {
  Overlay,
  OverlayRef,
  CdkOverlayOrigin,
  HorizontalConnectionPos,
  VerticalConnectionPos,
  ConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AssetInfoTrayComponent } from './asset-info-tray/asset-info-tray.component';

@Injectable({
  providedIn: 'root'
})
export class AssetInfoTrayService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  private popupOverlayRef: OverlayRef;

  show(id: string) {
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

    const injectorTokens = new WeakMap();
    const containerData: IContainerData = { id };
    injectorTokens.set(CONTAINER_DATA, containerData);
    const injector = new PortalInjector(this.injector, injectorTokens);

    const myPortal = new ComponentPortal(AssetInfoTrayComponent, null, injector);
    this.popupOverlayRef.attach(myPortal);

    this.popupOverlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  close() {
    if (this.popupOverlayRef) {
      this.popupOverlayRef.dispose();
      this.popupOverlayRef = null;
    }
  }
}
