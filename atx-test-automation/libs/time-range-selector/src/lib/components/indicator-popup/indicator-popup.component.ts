import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { Observable } from 'rxjs';

import { faCalendar, faCaretLeft, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'atx-indicator-popup',
  templateUrl: './indicator-popup.component.html',
  styleUrls: ['./indicator-popup.component.scss']
})
export class IndicatorPopupComponent implements OnInit {
  stepIncrement$: Observable<string>;

  constructor(private facade: TimeRangeSelectorFacade) {
    this.stepIncrement$ = facade.stepIncrement$;
  }

  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faCalendar = faCalendar;
  faTimesCircle = faTimesCircle;

  ErrorMessage: string;

  public form = new FormGroup({
    indicatorDate: new FormControl('', [Validators.required]),
    indicatorTime: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.facade.indicator$.subscribe(newVal => {
      if (newVal) {
        const myDate = moment(newVal);
        this.form.patchValue({
          indicatorDate: myDate.toDate(),
          indicatorTime: myDate.format('HH:mm:ss.SSS')
        });
      }
    });
  }

  ApplyPopup() {
    if (this.IsRangeValid()) {
      this.facade.configureTimeRangeSelector(undefined, undefined, this.getIndicator());
    }
  }

  SavePopup() {
    this.ApplyPopup();
    this.facade.closePopup();
  }

  CancelPopup() {
    this.facade.closePopup();
  }

  ChooseTimeRange(timePeriod: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {
    this.facade.stepIncrement(timePeriod);
  }

  Step(direction: 'left' | 'right') {
    this.facade.step(direction);
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

  private getIndicator() {
    return this.combineTime(this.form.value.indicatorDate, this.form.value.indicatorTime);
  }

  IsRangeValid(): boolean {
    let result = false;

    this.ErrorMessage = '';

    if (this.form.valid) {
      const indicatorDate = this.getIndicator();

      if (!isNaN(indicatorDate.getTime())) {
        result = true;
      } else {
        this.ErrorMessage = 'Date is not valid';
      }
    } else {
      this.ErrorMessage = 'Date is not valid.';
    }

    return result;
  }
}
