import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faCalendar, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'atx-time-incrementer',
  templateUrl: './time-incrementer.component.html',
  styleUrls: ['./time-incrementer.component.scss']
})
export class TimeIncrementerComponent implements OnInit {
  faCalendar = faCalendar;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;

  @Input() ShowSelection: boolean;

  @Output() ShowPopup = new EventEmitter();
  @Output() Step = new EventEmitter<'left' | 'right'>();

  constructor() {}

  ngOnInit() {}

  InternalShowPopup() {
    this.ShowPopup.emit();
  }

  InternalStepLeft() {
    this.Step.emit('left');
  }

  InternalStepRight() {
    this.Step.emit('right');
  }
}
