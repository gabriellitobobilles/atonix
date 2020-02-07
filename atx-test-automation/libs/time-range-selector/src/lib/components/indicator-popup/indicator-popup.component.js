import * as tslib_1 from "tslib";
import * as moment from 'moment';
import { Component } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { faCalendar, faCaretLeft, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
var IndicatorPopupComponent = /** @class */ (function () {
    function IndicatorPopupComponent(facade) {
        this.facade = facade;
        this.faCaretRight = faCaretRight;
        this.faCaretLeft = faCaretLeft;
        this.faCalendar = faCalendar;
        this.faTimesCircle = faTimesCircle;
        this.form = new FormGroup({
            indicatorDate: new FormControl('', [Validators.required]),
            indicatorTime: new FormControl('', [Validators.required])
        });
        this.stepIncrement$ = facade.stepIncrement$;
    }
    IndicatorPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facade.indicator$.subscribe(function (newVal) {
            if (newVal) {
                var myDate = moment(newVal);
                _this.form.patchValue({
                    indicatorDate: myDate.toDate(),
                    indicatorTime: myDate.format('HH:mm:ss.SSS')
                });
            }
        });
    };
    IndicatorPopupComponent.prototype.ApplyPopup = function () {
        if (this.IsRangeValid()) {
            this.facade.configureTimeRangeSelector(undefined, undefined, this.getIndicator());
        }
    };
    IndicatorPopupComponent.prototype.SavePopup = function () {
        this.ApplyPopup();
        this.facade.closePopup();
    };
    IndicatorPopupComponent.prototype.CancelPopup = function () {
        this.facade.closePopup();
    };
    IndicatorPopupComponent.prototype.ChooseTimeRange = function (timePeriod) {
        this.facade.stepIncrement(timePeriod);
    };
    IndicatorPopupComponent.prototype.Step = function (direction) {
        this.facade.step(direction);
    };
    IndicatorPopupComponent.prototype.combineTime = function (myDate, myTime) {
        var newTime = moment(myTime, 'HH:mm:ss.SSSS');
        if (newTime.isValid) {
            var newVal = moment(myDate)
                .hour(newTime.hour())
                .minute(newTime.minute())
                .second(newTime.second())
                .millisecond(newTime.millisecond());
            return newVal.toDate();
        }
        return new Date(NaN);
    };
    IndicatorPopupComponent.prototype.getIndicator = function () {
        return this.combineTime(this.form.value.indicatorDate, this.form.value.indicatorTime);
    };
    IndicatorPopupComponent.prototype.IsRangeValid = function () {
        var result = false;
        this.ErrorMessage = '';
        if (this.form.valid) {
            var indicatorDate = this.getIndicator();
            if (!isNaN(indicatorDate.getTime())) {
                result = true;
            }
            else {
                this.ErrorMessage = 'Date is not valid';
            }
        }
        else {
            this.ErrorMessage = 'Date is not valid.';
        }
        return result;
    };
    IndicatorPopupComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-indicator-popup',
            templateUrl: './indicator-popup.component.html',
            styleUrls: ['./indicator-popup.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TimeRangeSelectorFacade])
    ], IndicatorPopupComponent);
    return IndicatorPopupComponent;
}());
export { IndicatorPopupComponent };
//# sourceMappingURL=indicator-popup.component.js.map