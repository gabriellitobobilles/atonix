import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { Observable } from 'rxjs';

import { faCalendar, faCaretLeft, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'atx-selection-popup',
  templateUrl: './selection-popup.component.html',
  styleUrls: ['./selection-popup.component.scss']
})
export class SelectionPopupComponent implements OnInit {
  constructor(private facade: TimeRangeSelectorFacade) {}

  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faCalendar = faCalendar;
  faTimesCircle = faTimesCircle;

  ErrorMessage: string;

  public form = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.facade.startDate$.subscribe(newVal => {
      if (newVal) {
        const myDate = moment(newVal);
        this.form.patchValue({
          startDate: myDate.toDate(),
          startTime: myDate.format('HH:mm:ss.SSS')
        });
      }
    });

    this.facade.endDate$.subscribe(newVal => {
      if (newVal) {
        const myDate = moment(newVal);
        this.form.patchValue({
          endDate: myDate.toDate(),
          endTime: myDate.format('HH:mm:ss.SSS')
        });
      }
    });
  }

  ApplyPopup() {
    if (this.IsRangeValid()) {
      this.facade.configureTimeRangeSelector(this.getStart(), this.getEnd());
    }
  }

  SavePopup() {
    this.ApplyPopup();
    this.facade.closePopup();
  }

  CancelPopup() {
    this.facade.closePopup();
  }

  Step(direction: 'left' | 'right') {
    this.facade.step(direction);
  }

  ChooseTimeRange(timePeriod: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {
    this.facade.ChooseTimeSelection(timePeriod);
  }

  CenterOn(timePeriod: 'future' | 'present' | 'past') {
    this.facade.centerOn(timePeriod);
  }

  private combineTime(myDate: Date, myTime: string) {
    const newTime = moment(myTime, 'HH:mm:ss.SSSS');
    if (newTime.isValid) {
      const newVal = moment(myDate)
        .hour(newTime.hour())
        .minute(newTime.minute())
        .second(newTime.second())
        .millisecond(newTime.millisecond());
      return newVal.toDate();
    }
    return new Date(NaN);
  }

  private getStart() {
    return this.combineTime(this.form.value.startDate, this.form.value.startTime);
  }

  private getEnd() {
    return this.combineTime(this.form.value.endDate, this.form.value.endTime);
  }

  IsRangeValid(): boolean {
    let result = false;

    this.ErrorMessage = '';

    if (this.form.valid) {
      const startDate = this.getStart();
      const endDate = this.getEnd();

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate.getTime() < endDate.getTime()) {
        result = true;
      } else {
        this.ErrorMessage = 'End date cannot be earlier than start date.';
      }
    } else {
      this.ErrorMessage = 'Dates are not valid.';
    }

    return result;
  }
}
