import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'atx-layout',
  template: `
    <mat-sidenav-container fullscreen> <ng-content></ng-content> </mat-sidenav-container>
  `,
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  @Input() open = false;

  constructor() {}

  ngOnInit() {}
}
