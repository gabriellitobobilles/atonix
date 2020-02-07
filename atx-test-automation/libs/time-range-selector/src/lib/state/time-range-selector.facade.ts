import { Injectable, ElementRef } from '@angular/core';
import { TimeRangeSelectorState } from './time-range-selector.reducer';
import { Store, select } from '@ngrx/store';
import { timeRangeSelectorQuery } from './time-range-selector.selectors';
import * as actions from './time-range-selector.actions';
import { ICriteria } from '@AtonixWebSites/api';

@Injectable()
export class TimeRangeSelectorFacade {
  constructor(private store: Store<TimeRangeSelectorState>) {}

  configureTimeRangeSelector(
    startDate?: Date,
    endDate?: Date,
    indicator?: Date,
    nowMarker?: Date,
    rangeStart?: Date,
    rangeEnd?: Date
  ) {
    this.store.dispatch(
      new actions.SetTimeRangeSelector({
        startDate,
        endDate,
        indicator,
        rangeStart,
        rangeEnd,
        nowMarker
      })
    );
  }

  moveRange(direction: 'left' | 'right') {
    this.store.dispatch(new actions.MoveRange(direction));
  }

  zoomRange(direction: 'in' | 'out') {
    this.store.dispatch(new actions.ZoomRange(direction));
  }

  step(direction: 'left' | 'right') {
    this.store.dispatch(new actions.Step(direction));
  }

  stepIncrement(timePeriod: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {
    this.store.dispatch(new actions.StepIncrement(timePeriod));
  }

  liveToggle() {
    this.store.dispatch(new actions.LiveToggle());
  }

  goToNow() {
    this.store.dispatch(new actions.GoToNow());
  }

  openPopup() {
    this.store.dispatch(new actions.Popup(true));
  }

  closePopup() {
    this.store.dispatch(new actions.Popup(false));
  }

  centerOn(timePeriod: 'future' | 'present' | 'past') {
    this.store.dispatch(new actions.CenterOn(timePeriod));
  }

  ChooseTimeSelection(timePeriod: 'days' | 'weeks' | 'months' | 'quarters' | 'years') {
    this.store.dispatch(new actions.ChooseTimeSelection(timePeriod));
  }

  GetDefaultJumpToList() {
    this.store.dispatch(new actions.GetDefaultJumpTo());
  }

  SelectJumpToListItem(criteriaObject: ICriteria) {
    this.store.dispatch(new actions.GetSelectedJumpToDates(criteriaObject.CoDFID));
  }

  startDate$ = this.store.pipe(select(timeRangeSelectorQuery.getStartDate));
  endDate$ = this.store.pipe(select(timeRangeSelectorQuery.getEndDate));
  indicator$ = this.store.pipe(select(timeRangeSelectorQuery.getIndicator));
  nowMarker$ = this.store.pipe(select(timeRangeSelectorQuery.getNowMarker));
  rangeStart$ = this.store.pipe(select(timeRangeSelectorQuery.getRangeStart));
  rangeEnd$ = this.store.pipe(select(timeRangeSelectorQuery.getRangeEnd));
  showIndicator$ = this.store.pipe(select(timeRangeSelectorQuery.getShowIndicator));
  showSelection$ = this.store.pipe(select(timeRangeSelectorQuery.getShowSelection));
  showNowMarker$ = this.store.pipe(select(timeRangeSelectorQuery.getShowNowMarker));
  stepIncrement$ = this.store.pipe(select(timeRangeSelectorQuery.getStepIncrement));
  popupOpened$ = this.store.pipe(select(timeRangeSelectorQuery.getPopupOpened));
  isLive$ = this.store.pipe(select(timeRangeSelectorQuery.getLive));
  liveTimeout$ = this.store.pipe(select(timeRangeSelectorQuery.getLiveTimeout));
  jumpToList$ = this.store.pipe(select(timeRangeSelectorQuery.getJumpToList));
  selection$ = this.store.pipe(select(timeRangeSelectorQuery.getSelection));
}
