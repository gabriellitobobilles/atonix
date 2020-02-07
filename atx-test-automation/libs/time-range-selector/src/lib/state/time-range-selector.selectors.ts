import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimeRangeSelectorState } from './time-range-selector.reducer';
import { ITimeRangeSelection } from '../model/itime-range-selection';

const getTimeRangeSelectorState = createFeatureSelector<TimeRangeSelectorState>('time-range-selector');
export const getStartDate = createSelector(
  getTimeRangeSelectorState,
  state => state.startDate
);
export const getEndDate = createSelector(
  getTimeRangeSelectorState,
  state => state.endDate
);
export const getIndicator = createSelector(
  getTimeRangeSelectorState,
  state => state.indicator
);
export const getNowMarker = createSelector(
  getTimeRangeSelectorState,
  state => state.nowMarker
);
export const getRangeStart = createSelector(
  getTimeRangeSelectorState,
  state => state.rangeStart
);
export const getRangeEnd = createSelector(
  getTimeRangeSelectorState,
  state => state.rangeEnd
);
export const getStepIncrement = createSelector(
  getTimeRangeSelectorState,
  state => state.stepIncrement
);
export const getLive = createSelector(
  getTimeRangeSelectorState,
  state => state.live
);
export const getLiveTimeout = createSelector(
  getTimeRangeSelectorState,
  state => state.liveTimeout
);
export const getPopupOpened = createSelector(
  getTimeRangeSelectorState,
  state => state.popupOpened
);
export const getSelection = createSelector(
  getTimeRangeSelectorState,
  state => {
    const result: ITimeRangeSelection = {
      startDate: state.startDate,
      endDate: state.endDate,
      indicator: state.indicator
    };
    return result;
  }
);
export const getShowSelection = createSelector(
  getTimeRangeSelectorState,
  state => {
    return !_.isNil(state.startDate) && !_.isNil(state.endDate);
  }
);

export const getShowIndicator = createSelector(
  getTimeRangeSelectorState,
  state => {
    return !_.isNil(state.indicator);
  }
);

export const getShowNowMarker = createSelector(
  getTimeRangeSelectorState,
  state => {
    return !_.isNil(state.nowMarker);
  }
);

export const getJumpToList = createSelector(
  getTimeRangeSelectorState,
  state => {
    if (state.jumpToList && state.jumpToList.length > 0) {
      return state.jumpToList;
    } else {
      return state.defaultJumpToList;
    }
  }
);

export const timeRangeSelectorQuery = {
  getStartDate,
  getEndDate,
  getIndicator,
  getNowMarker,
  getRangeStart,
  getRangeEnd,
  getStepIncrement,
  getLive,
  getLiveTimeout,
  getPopupOpened,
  getSelection,
  getShowSelection,
  getShowIndicator,
  getShowNowMarker,
  getJumpToList
};
