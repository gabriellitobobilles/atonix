import { TimeRangeSelectorActions, TimeRangeSelectorActionTypes } from './time-range-selector.actions';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ICriteria } from '@AtonixWebSites/api';

export interface TimeRangeSelectorState {
  startDate: Date;
  endDate: Date;
  indicator: Date;
  rangeStart: Date;
  rangeEnd: Date;
  nowMarker: Date;
  stepIncrement: 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'quarters' | 'years';
  live: boolean;
  liveTimeout: number;
  popupOpened: boolean;
  jumpToList: ICriteria[];
  defaultJumpToList: ICriteria[];
}

const initialState: TimeRangeSelectorState = {
  startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()),
  endDate: new Date(),
  indicator: null,
  rangeStart: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
  rangeEnd: new Date(),
  nowMarker: new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate()),
  stepIncrement: 'weeks',
  live: false,
  liveTimeout: 300,
  popupOpened: false,
  jumpToList: null,
  defaultJumpToList: null
};

function fixRange(
  startDate: Date,
  endDate: Date,
  indicator: Date,
  rangeStart: Date,
  rangeEnd: Date
): { rangeStart: Date; rangeEnd: Date } {
  const result = { rangeStart, rangeEnd };

  if (startDate && endDate) {
    if (startDate < rangeStart) {
      result.rangeStart = startDate;
    }
    if (endDate > rangeEnd) {
      result.rangeEnd = endDate;
    }
  } else if (indicator) {
    if (indicator < rangeStart) {
      result.rangeStart = indicator;
    }
    if (indicator > rangeEnd) {
      result.rangeEnd = indicator;
    }
  }

  return result;
}

export function reducer(state: TimeRangeSelectorState = initialState, action: TimeRangeSelectorActions): TimeRangeSelectorState {
  switch (action.type) {
    case TimeRangeSelectorActionTypes.SetTimeRangeSelector: {
      let startDate: Date = state.startDate;
      if (action.payload.startDate !== undefined) {
        startDate = action.payload.startDate;
      }

      let endDate: Date = state.endDate;
      if (action.payload.endDate !== undefined) {
        endDate = action.payload.endDate;
      }

      let indicator: Date = state.indicator;
      if (action.payload.indicator !== undefined) {
        indicator = action.payload.indicator;
      }

      let nowMarker: Date = state.nowMarker;
      if (action.payload.nowMarker !== undefined) {
        nowMarker = action.payload.nowMarker;
      }

      let rangeStart: Date = state.rangeStart;
      if (action.payload.rangeStart !== undefined) {
        rangeStart = action.payload.rangeStart;
      }

      let rangeEnd: Date = state.rangeEnd;
      if (action.payload.rangeEnd !== undefined) {
        rangeEnd = action.payload.rangeEnd;
      }

      const fixedRange = fixRange(startDate, endDate, indicator, rangeStart, rangeEnd);

      return {
        ...state,
        startDate,
        endDate,
        indicator,
        nowMarker,
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.MoveRange: {
      let newRangeStart = state.rangeStart;
      let newRangeEnd = state.rangeEnd;
      const diff = newRangeEnd.getTime() - newRangeStart.getTime();

      let myStart: number = null;
      let myEnd: number = null;
      if (!_.isNil(state.indicator)) {
        myStart = state.indicator.getTime();
        myEnd = state.indicator.getTime();
      }
      if (!_.isNil(state.startDate)) {
        if (myStart === null || myStart > state.startDate.getTime()) {
          myStart = state.startDate.getTime();
        }
      }
      if (!_.isNil(state.endDate)) {
        if (myEnd === null || myEnd < state.endDate.getTime()) {
          myEnd = state.endDate.getTime();
        }
      }

      if (action.payload === 'left') {
        newRangeEnd = new Date(newRangeEnd.getTime() - diff / 5);
        newRangeStart = new Date(newRangeEnd.getTime() - diff);
      } else {
        newRangeEnd = new Date(newRangeEnd.getTime() + diff / 5);
        newRangeStart = new Date(newRangeEnd.getTime() - diff);
      }

      if (myStart !== null && newRangeStart.getTime() > myStart) {
        newRangeStart = new Date(myStart);
        newRangeEnd = new Date(myStart + diff);
      }
      if (myEnd !== null && newRangeEnd.getTime() < myEnd) {
        newRangeEnd = new Date(myEnd);
        newRangeStart = new Date(myEnd - diff);
      }

      return {
        ...state,
        rangeStart: newRangeStart,
        rangeEnd: newRangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.ZoomRange: {
      let newRangeStart = state.rangeStart;
      let newRangeEnd = state.rangeEnd;
      let diff = newRangeEnd.getTime() - newRangeStart.getTime();

      let myStart: number = null;
      let myEnd: number = null;
      if (!_.isNil(state.indicator)) {
        myStart = state.indicator.getTime();
        myEnd = state.indicator.getTime();
      }
      if (!_.isNil(state.startDate)) {
        if (myStart === null || myStart > state.startDate.getTime()) {
          myStart = state.startDate.getTime();
        }
      }
      if (!_.isNil(state.endDate)) {
        if (myEnd === null || myEnd < state.endDate.getTime()) {
          myEnd = state.endDate.getTime();
        }
      }

      diff = action.payload === 'in' ? diff * 0.8 : diff * 1.2;

      // Make sure the range doesn't get smaller than the selected area.
      if (myStart !== null && myEnd !== null) {
        diff = Math.max(diff, myEnd - myStart);
      }

      const middle = (newRangeEnd.getTime() - newRangeStart.getTime()) / 2 + newRangeStart.getTime();
      newRangeEnd = new Date(middle + diff / 2);
      newRangeStart = new Date(middle - diff / 2);

      if (myStart !== null && newRangeStart.getTime() > myStart) {
        newRangeStart = new Date(myStart);
        newRangeEnd = new Date(myStart + diff);
      }
      if (myEnd !== null && newRangeEnd.getTime() < myEnd) {
        newRangeEnd = new Date(myEnd);
        newRangeStart = new Date(myEnd - diff);
      }

      return {
        ...state,
        rangeStart: newRangeStart,
        rangeEnd: newRangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.Step: {
      let direction = 1;
      if (action.payload === 'left') {
        direction = -1;
      }

      let indicator = state.indicator;
      let startDate = state.startDate;
      let endDate = state.endDate;
      if (!_.isNil(state.startDate) && !_.isNil(state.endDate)) {
        const myStart = moment(startDate);
        myStart.add(direction, state.stepIncrement);
        startDate = myStart.toDate();

        const myEnd = moment(endDate);
        myEnd.add(direction, state.stepIncrement);
        endDate = myEnd.toDate();
      } else if (!_.isNil(state.indicator)) {
        const myInd = moment(indicator);
        myInd.add(direction, state.stepIncrement);
        indicator = myInd.toDate();
      }

      const fixedRange = fixRange(startDate, endDate, indicator, state.rangeStart, state.rangeEnd);

      return {
        ...state,
        indicator,
        startDate,
        endDate,
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.LiveToggle:
      return {
        ...state,
        live: !state.live
      };

    case TimeRangeSelectorActionTypes.GoToNow: {
      let indicator = state.indicator;
      let startDate = state.startDate;
      let endDate = state.endDate;
      const myNow = new Date();
      if (!_.isNil(state.startDate) && !_.isNil(state.endDate)) {
        const diff = state.endDate.getTime() - state.startDate.getTime();
        endDate = myNow;
        startDate = new Date(endDate.getTime() - diff);
      } else if (!_.isNil(state.indicator)) {
        indicator = myNow;
      }

      const fixedRange = fixRange(startDate, endDate, indicator, state.rangeStart, state.rangeEnd);

      return {
        ...state,
        indicator,
        startDate,
        endDate,
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.Popup: {
      return {
        ...state,
        popupOpened: action.payload
      };
    }

    case TimeRangeSelectorActionTypes.CenterOn: {
      let myStart = state.startDate;
      let myEnd = state.endDate;

      const interval = myEnd.getTime() - myStart.getTime();

      const today = new Date().getTime();
      if (action.payload === 'past') {
        myStart = new Date(today - interval);
        myEnd = new Date(today);
      } else if (action.payload === 'present') {
        myStart = new Date(today - interval / 2);
        myEnd = new Date(today + interval / 2);
      } else if (action.payload === 'future') {
        myStart = new Date(today);
        myEnd = new Date(today + interval);
      }

      const fixedRange = fixRange(myStart, myEnd, state.indicator, state.rangeStart, state.rangeEnd);

      return {
        ...state,
        startDate: myStart,
        endDate: myEnd,
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.StepIncrement: {
      return {
        ...state,
        stepIncrement: action.payload
      };
    }

    case TimeRangeSelectorActionTypes.ChooseTimeSelection: {
      const myStart = moment(state.endDate);

      myStart.add(-1, action.payload);

      const fixedRange = fixRange(myStart.toDate(), state.endDate, state.indicator, state.rangeStart, state.rangeEnd);

      return {
        ...state,
        stepIncrement: action.payload,
        startDate: myStart.toDate(),
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    case TimeRangeSelectorActionTypes.DefaultJumpToRetrieved: {
      return {
        ...state,
        defaultJumpToList: action.payload
      };
    }

    case TimeRangeSelectorActionTypes.SelectedJumpToDatesRetrieved: {
      let newStart = state.startDate;
      let newEnd = state.endDate;
      let newIndicator = state.indicator;
      if (state.rangeStart === null && state.rangeEnd === null) {
        newIndicator = action.payload.StartDate;
      } else {
        newStart = action.payload.StartDate;
        newEnd = action.payload.EndDate;
      }

      const fixedRange = fixRange(newStart, newEnd, newIndicator, state.rangeStart, state.rangeEnd);

      return {
        ...state,
        startDate: newStart,
        endDate: newEnd,
        indicator: newIndicator,
        rangeStart: fixedRange.rangeStart,
        rangeEnd: fixedRange.rangeEnd
      };
    }

    default:
      return state;
  }
}
