import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
var getTimeRangeSelectorState = createFeatureSelector('time-range-selector');
export var getStartDate = createSelector(getTimeRangeSelectorState, function (state) { return state.startDate; });
export var getEndDate = createSelector(getTimeRangeSelectorState, function (state) { return state.endDate; });
export var getIndicator = createSelector(getTimeRangeSelectorState, function (state) { return state.indicator; });
export var getNowMarker = createSelector(getTimeRangeSelectorState, function (state) { return state.nowMarker; });
export var getRangeStart = createSelector(getTimeRangeSelectorState, function (state) { return state.rangeStart; });
export var getRangeEnd = createSelector(getTimeRangeSelectorState, function (state) { return state.rangeEnd; });
export var getStepIncrement = createSelector(getTimeRangeSelectorState, function (state) { return state.stepIncrement; });
export var getLive = createSelector(getTimeRangeSelectorState, function (state) { return state.live; });
export var getLiveTimeout = createSelector(getTimeRangeSelectorState, function (state) { return state.liveTimeout; });
export var getPopupOpened = createSelector(getTimeRangeSelectorState, function (state) { return state.popupOpened; });
export var getSelection = createSelector(getTimeRangeSelectorState, function (state) {
    var result = {
        startDate: state.startDate,
        endDate: state.endDate,
        indicator: state.indicator
    };
    return result;
});
export var getShowSelection = createSelector(getTimeRangeSelectorState, function (state) {
    return !_.isNil(state.startDate) && !_.isNil(state.endDate);
});
export var getShowIndicator = createSelector(getTimeRangeSelectorState, function (state) {
    return !_.isNil(state.indicator);
});
export var getShowNowMarker = createSelector(getTimeRangeSelectorState, function (state) {
    return !_.isNil(state.nowMarker);
});
export var getJumpToList = createSelector(getTimeRangeSelectorState, function (state) {
    if (state.jumpToList && state.jumpToList.length > 0) {
        return state.jumpToList;
    }
    else {
        return state.defaultJumpToList;
    }
});
export var timeRangeSelectorQuery = {
    getStartDate: getStartDate,
    getEndDate: getEndDate,
    getIndicator: getIndicator,
    getNowMarker: getNowMarker,
    getRangeStart: getRangeStart,
    getRangeEnd: getRangeEnd,
    getStepIncrement: getStepIncrement,
    getLive: getLive,
    getLiveTimeout: getLiveTimeout,
    getPopupOpened: getPopupOpened,
    getSelection: getSelection,
    getShowSelection: getShowSelection,
    getShowIndicator: getShowIndicator,
    getShowNowMarker: getShowNowMarker,
    getJumpToList: getJumpToList
};
//# sourceMappingURL=time-range-selector.selectors.js.map