import { Directive, Output, EventEmitter, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[atxWatchElementSize]'
})
export class WatchElementSizeDirective implements OnDestroy {
  private changes: MutationObserver;
  private element: any;

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.calculateChanges();
  }

  @Output() atxWatchElementSize = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    console.log('Element size watcher started.');
    this.element = elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      this.calculateChanges();
    });

    this.changes.observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    });

    this.calculateChanges();
  }

  calculateChanges() {
    const bounds = this.element.getBoundingClientRect();

    this.atxWatchElementSize.emit({ height: bounds.height, width: bounds.width, left: bounds.left });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
