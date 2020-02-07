import * as tslib_1 from "tslib";
import * as moment from 'moment';
import { Component } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { faCalendar, faCaretLeft, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
var SelectionPopupComponent = /** @class */ (function () {
    function SelectionPopupComponent(facade) {
        this.facade = facade;
        this.faCaretRight = faCaretRight;
        this.faCaretLeft = faCaretLeft;
        this.faCalendar = faCalendar;
        this.faTimesCircle = faTimesCircle;
        this.form = new FormGroup({
            startDate: new FormControl('', [Validators.required]),
            startTime: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            endTime: new FormControl('', [Validators.required])
        });
    }
    SelectionPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facade.startDate$.subscribe(function (newVal) {
            if (newVal) {
                var myDate = moment(newVal);
                _this.form.patchValue({
                    startDate: myDate.toDate(),
                    startTime: myDate.format('HH:mm:ss.SSS')
                });
            }
        });
        this.facade.endDate$.subscribe(function (newVal) {
            if (newVal) {
                var myDate = moment(newVal);
                _this.form.patchValue({
                    endDate: myDate.toDate(),
                    endTime: myDate.format('HH:mm:ss.SSS')
                });
            }
        });
    };
    SelectionPopupComponent.prototype.ApplyPopup = function () {
        if (this.IsRangeValid()) {
            this.facade.configureTimeRangeSelector(this.getStart(), this.getEnd());
        }
    };
    SelectionPopupComponent.prototype.SavePopup = function () {
        this.ApplyPopup();
        this.facade.closePopup();
    };
    SelectionPopupComponent.prototype.CancelPopup = function () {
        this.facade.closePopup();
    };
    SelectionPopupComponent.prototype.Step = function (direction) {
        this.facade.step(direction);
    };
    SelectionPopupComponent.prototype.ChooseTimeRange = function (timePeriod) {
        this.facade.ChooseTimeSelection(timePeriod);
    };
    SelectionPopupComponent.prototype.CenterOn = function (timePeriod) {
        this.facade.centerOn(timePeriod);
    };
    SelectionPopupComponent.prototype.combineTime = function (myDate, myTime) {
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
    SelectionPopupComponent.prototype.getStart = function () {
        return this.combineTime(this.form.value.startDate, this.form.value.startTime);
    };
    SelectionPopupComponent.prototype.getEnd = function () {
        return this.combineTime(this.form.value.endDate, this.form.value.endTime);
    };
    SelectionPopupComponent.prototype.IsRangeValid = function () {
        var result = false;
        this.ErrorMessage = '';
        if (this.form.valid) {
            var startDate = this.getStart();
            var endDate = this.getEnd();
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate.getTime() < endDate.getTime()) {
                result = true;
            }
            else {
                this.ErrorMessage = 'End date cannot be earlier than start date.';
            }
        }
        else {
            this.ErrorMessage = 'Dates are not valid.';
        }
        return result;
    };
    SelectionPopupComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-selection-popup',
            templateUrl: './selection-popup.component.html',
            styleUrls: ['./selection-popup.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TimeRangeSelectorFacade])
    ], SelectionPopupComponent);
    return SelectionPopupComponent;
}());
export { SelectionPopupComponent };
//# sourceMappingURL=selection-popup.component.js.map