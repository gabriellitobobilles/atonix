import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { timeRangeSelectorQuery } from './time-range-selector.selectors';
import * as actions from './time-range-selector.actions';
var TimeRangeSelectorFacade = /** @class */ (function () {
    function TimeRangeSelectorFacade(store) {
        this.store = store;
        this.startDate$ = this.store.pipe(select(timeRangeSelectorQuery.getStartDate));
        this.endDate$ = this.store.pipe(select(timeRangeSelectorQuery.getEndDate));
        this.indicator$ = this.store.pipe(select(timeRangeSelectorQuery.getIndicator));
        this.nowMarker$ = this.store.pipe(select(timeRangeSelectorQuery.getNowMarker));
        this.rangeStart$ = this.store.pipe(select(timeRangeSelectorQuery.getRangeStart));
        this.rangeEnd$ = this.store.pipe(select(timeRangeSelectorQuery.getRangeEnd));
        this.showIndicator$ = this.store.pipe(select(timeRangeSelectorQuery.getShowIndicator));
        this.showSelection$ = this.store.pipe(select(timeRangeSelectorQuery.getShowSelection));
        this.showNowMarker$ = this.store.pipe(select(timeRangeSelectorQuery.getShowNowMarker));
        this.stepIncrement$ = this.store.pipe(select(timeRangeSelectorQuery.getStepIncrement));
        this.popupOpened$ = this.store.pipe(select(timeRangeSelectorQuery.getPopupOpened));
        this.isLive$ = this.store.pipe(select(timeRangeSelectorQuery.getLive));
        this.liveTimeout$ = this.store.pipe(select(timeRangeSelectorQuery.getLiveTimeout));
        this.jumpToList$ = this.store.pipe(select(timeRangeSelectorQuery.getJumpToList));
        this.selection$ = this.store.pipe(select(timeRangeSelectorQuery.getSelection));
    }
    TimeRangeSelectorFacade.prototype.configureTimeRangeSelector = function (startDate, endDate, indicator, nowMarker, rangeStart, rangeEnd) {
        this.store.dispatch(new actions.SetTimeRangeSelector({
            startDate: startDate,
            endDate: endDate,
            indicator: indicator,
            rangeStart: rangeStart,
            rangeEnd: rangeEnd,
            nowMarker: nowMarker
        }));
    };
    TimeRangeSelectorFacade.prototype.moveRange = function (direction) {
        this.store.dispatch(new actions.MoveRange(direction));
    };
    TimeRangeSelectorFacade.prototype.zoomRange = function (direction) {
        this.store.dispatch(new actions.ZoomRange(direction));
    };
    TimeRangeSelectorFacade.prototype.step = function (direction) {
        this.store.dispatch(new actions.Step(direction));
    };
    TimeRangeSelectorFacade.prototype.stepIncrement = function (timePeriod) {
        this.store.dispatch(new actions.StepIncrement(timePeriod));
    };
    TimeRangeSelectorFacade.prototype.liveToggle = function () {
        this.store.dispatch(new actions.LiveToggle());
    };
    TimeRangeSelectorFacade.prototype.goToNow = function () {
        this.store.dispatch(new actions.GoToNow());
    };
    TimeRangeSelectorFacade.prototype.openPopup = function () {
        this.store.dispatch(new actions.Popup(true));
    };
    TimeRangeSelectorFacade.prototype.closePopup = function () {
        this.store.dispatch(new actions.Popup(false));
    };
    TimeRangeSelectorFacade.prototype.centerOn = function (timePeriod) {
        this.store.dispatch(new actions.CenterOn(timePeriod));
    };
    TimeRangeSelectorFacade.prototype.ChooseTimeSelection = function (timePeriod) {
        this.store.dispatch(new actions.ChooseTimeSelection(timePeriod));
    };
    TimeRangeSelectorFacade.prototype.GetDefaultJumpToList = function () {
        this.store.dispatch(new actions.GetDefaultJumpTo());
    };
    TimeRangeSelectorFacade.prototype.SelectJumpToListItem = function (criteriaObject) {
        this.store.dispatch(new actions.GetSelectedJumpToDates(criteriaObject.CoDFID));
    };
    TimeRangeSelectorFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], TimeRangeSelectorFacade);
    return TimeRangeSelectorFacade;
}());
export { TimeRangeSelectorFacade };
//# sourceMappingURL=time-range-selector.facade.js.map