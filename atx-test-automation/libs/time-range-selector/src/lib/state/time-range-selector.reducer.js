import * as tslib_1 from "tslib";
import { TimeRangeSelectorActionTypes } from './time-range-selector.actions';
import * as _ from 'lodash';
import * as moment from 'moment';
var initialState = {
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
function fixRange(startDate, endDate, indicator, rangeStart, rangeEnd) {
    var result = { rangeStart: rangeStart, rangeEnd: rangeEnd };
    if (startDate && endDate) {
        if (startDate < rangeStart) {
            result.rangeStart = startDate;
        }
        if (endDate > rangeEnd) {
            result.rangeEnd = endDate;
        }
    }
    else if (indicator) {
        if (indicator < rangeStart) {
            result.rangeStart = indicator;
        }
        if (indicator > rangeEnd) {
            result.rangeEnd = indicator;
        }
    }
    return result;
}
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case TimeRangeSelectorActionTypes.SetTimeRangeSelector: {
            var startDate = state.startDate;
            if (action.payload.startDate !== undefined) {
                startDate = action.payload.startDate;
            }
            var endDate = state.endDate;
            if (action.payload.endDate !== undefined) {
                endDate = action.payload.endDate;
            }
            var indicator = state.indicator;
            if (action.payload.indicator !== undefined) {
                indicator = action.payload.indicator;
            }
            var nowMarker = state.nowMarker;
            if (action.payload.nowMarker !== undefined) {
                nowMarker = action.payload.nowMarker;
            }
            var rangeStart = state.rangeStart;
            if (action.payload.rangeStart !== undefined) {
                rangeStart = action.payload.rangeStart;
            }
            var rangeEnd = state.rangeEnd;
            if (action.payload.rangeEnd !== undefined) {
                rangeEnd = action.payload.rangeEnd;
            }
            var fixedRange = fixRange(startDate, endDate, indicator, rangeStart, rangeEnd);
            return tslib_1.__assign({}, state, { startDate: startDate,
                endDate: endDate,
                indicator: indicator,
                nowMarker: nowMarker, rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        case TimeRangeSelectorActionTypes.MoveRange: {
            var newRangeStart = state.rangeStart;
            var newRangeEnd = state.rangeEnd;
            var diff = newRangeEnd.getTime() - newRangeStart.getTime();
            var myStart = null;
            var myEnd = null;
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
            }
            else {
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
            return tslib_1.__assign({}, state, { rangeStart: newRangeStart, rangeEnd: newRangeEnd });
        }
        case TimeRangeSelectorActionTypes.ZoomRange: {
            var newRangeStart = state.rangeStart;
            var newRangeEnd = state.rangeEnd;
            var diff = newRangeEnd.getTime() - newRangeStart.getTime();
            var myStart = null;
            var myEnd = null;
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
            var middle = (newRangeEnd.getTime() - newRangeStart.getTime()) / 2 + newRangeStart.getTime();
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
            return tslib_1.__assign({}, state, { rangeStart: newRangeStart, rangeEnd: newRangeEnd });
        }
        case TimeRangeSelectorActionTypes.Step: {
            var direction = 1;
            if (action.payload === 'left') {
                direction = -1;
            }
            var indicator = state.indicator;
            var startDate = state.startDate;
            var endDate = state.endDate;
            if (!_.isNil(state.startDate) && !_.isNil(state.endDate)) {
                var myStart = moment(startDate);
                myStart.add(direction, state.stepIncrement);
                startDate = myStart.toDate();
                var myEnd = moment(endDate);
                myEnd.add(direction, state.stepIncrement);
                endDate = myEnd.toDate();
            }
            else if (!_.isNil(state.indicator)) {
                var myInd = moment(indicator);
                myInd.add(direction, state.stepIncrement);
                indicator = myInd.toDate();
            }
            var fixedRange = fixRange(startDate, endDate, indicator, state.rangeStart, state.rangeEnd);
            return tslib_1.__assign({}, state, { indicator: indicator,
                startDate: startDate,
                endDate: endDate, rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        case TimeRangeSelectorActionTypes.LiveToggle:
            return tslib_1.__assign({}, state, { live: !state.live });
        case TimeRangeSelectorActionTypes.GoToNow: {
            var indicator = state.indicator;
            var startDate = state.startDate;
            var endDate = state.endDate;
            var myNow = new Date();
            if (!_.isNil(state.startDate) && !_.isNil(state.endDate)) {
                var diff = state.endDate.getTime() - state.startDate.getTime();
                endDate = myNow;
                startDate = new Date(endDate.getTime() - diff);
            }
            else if (!_.isNil(state.indicator)) {
                indicator = myNow;
            }
            var fixedRange = fixRange(startDate, endDate, indicator, state.rangeStart, state.rangeEnd);
            return tslib_1.__assign({}, state, { indicator: indicator,
                startDate: startDate,
                endDate: endDate, rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        case TimeRangeSelectorActionTypes.Popup: {
            return tslib_1.__assign({}, state, { popupOpened: action.payload });
        }
        case TimeRangeSelectorActionTypes.CenterOn: {
            var myStart = state.startDate;
            var myEnd = state.endDate;
            var interval = myEnd.getTime() - myStart.getTime();
            var today = new Date().getTime();
            if (action.payload === 'past') {
                myStart = new Date(today - interval);
                myEnd = new Date(today);
            }
            else if (action.payload === 'present') {
                myStart = new Date(today - interval / 2);
                myEnd = new Date(today + interval / 2);
            }
            else if (action.payload === 'future') {
                myStart = new Date(today);
                myEnd = new Date(today + interval);
            }
            var fixedRange = fixRange(myStart, myEnd, state.indicator, state.rangeStart, state.rangeEnd);
            return tslib_1.__assign({}, state, { startDate: myStart, endDate: myEnd, rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        case TimeRangeSelectorActionTypes.StepIncrement: {
            return tslib_1.__assign({}, state, { stepIncrement: action.payload });
        }
        case TimeRangeSelectorActionTypes.ChooseTimeSelection: {
            var myStart = moment(state.endDate);
            myStart.add(-1, action.payload);
            var fixedRange = fixRange(myStart.toDate(), state.endDate, state.indicator, state.rangeStart, state.rangeEnd);
            return tslib_1.__assign({}, state, { stepIncrement: action.payload, startDate: myStart.toDate(), rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        case TimeRangeSelectorActionTypes.DefaultJumpToRetrieved: {
            return tslib_1.__assign({}, state, { defaultJumpToList: action.payload });
        }
        case TimeRangeSelectorActionTypes.SelectedJumpToDatesRetrieved: {
            var newStart = state.startDate;
            var newEnd = state.endDate;
            var newIndicator = state.indicator;
            if (state.rangeStart === null && state.rangeEnd === null) {
                newIndicator = action.payload.StartDate;
            }
            else {
                newStart = action.payload.StartDate;
                newEnd = action.payload.EndDate;
            }
            var fixedRange = fixRange(newStart, newEnd, newIndicator, state.rangeStart, state.rangeEnd);
            return tslib_1.__assign({}, state, { startDate: newStart, endDate: newEnd, indicator: newIndicator, rangeStart: fixedRange.rangeStart, rangeEnd: fixedRange.rangeEnd });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=time-range-selector.reducer.js.map