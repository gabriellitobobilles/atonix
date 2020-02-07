import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'atx-sidenav',
  template: `
    <mat-sidenav
      [style.width.px]="width"
      mode="push"
      autosize
      mwlResizable
      [resizeEdges]="{ right: true }"
      (resizeEnd)="onResizeEnd($event)"
      class="mat-elevation-z1 scrollcontainer mat-typography"
      [opened]="open"
    >
      <ng-content></ng-content>
    </mat-sidenav>
  `,
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  @Input() open = false;

  @Input() width: number;

  @Output() resizeSideNav = new EventEmitter();

  onResizeEnd(event: ResizeEvent): void {
    if (event.rectangle) {
      this.resizeSideNav.emit({ resizeWidth: Number(event.rectangle.right) });
    }
  }
  constructor() {}

  ngOnInit() {}
}
