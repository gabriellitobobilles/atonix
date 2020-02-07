import { OverlayRef } from '@angular/cdk/overlay';
import { AppOverlayComponent } from './app-overlay.component';

export class AppOverlayRef {
  componentInstance: AppOverlayComponent;

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
