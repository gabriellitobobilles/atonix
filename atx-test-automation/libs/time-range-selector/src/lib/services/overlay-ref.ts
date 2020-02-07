import { OverlayRef } from '@angular/cdk/overlay';

export class AtonixOverlayRef<T> {
  componentInstance: T;

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
