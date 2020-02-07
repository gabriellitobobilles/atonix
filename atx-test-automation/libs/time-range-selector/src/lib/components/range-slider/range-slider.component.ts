import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'atx-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, OnChanges {
  Ball = 0;

  // Precalculated for efficiency,  These should probably be in a library somewhere.
  private hourTicks = 1000 * 60 * 60;
  private dayTicks = this.hourTicks * 24;

  @Output() MoveRange = new EventEmitter<'left' | 'right'>();
  @Output() ZoomRange = new EventEmitter<'in' | 'out'>();

  @Input() RangeStart: Date;
  @Input() RangeEnd: Date;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.calcZoomBall();
  }

  // This determines where the ball should be based on the currently visible range.

  private calcZoomBall() {
    let days = Math.floor((this.RangeEnd.getTime() - this.RangeStart.getTime()) / this.dayTicks);

    if (isNaN(days)) {
      days = 723 / 2;
    }

    if (days < 7) {
      days = 0;
    }
    if (days > 723) {
      days = 723;
    }
    days = 723 - days;
    this.Ball = 100 * (days / 723);
    this.Ball = Math.max(0, this.Ball);
    this.Ball = Math.min(100, this.Ball);
  }

  InnerMoveRange(direction: 'left' | 'right') {
    this.MoveRange.emit(direction);
  }

  InnerZoom(direction: 'in' | 'out') {
    this.ZoomRange.emit(direction);
  }
}
