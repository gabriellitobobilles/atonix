import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { Component, Input, Output, LOCALE_ID, Inject, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
var TimeSliderComponent = /** @class */ (function () {
    function TimeSliderComponent(localeId) {
        this.localeId = localeId;
        this.SelectionChanged = new EventEmitter();
        this.ShowPopup = new EventEmitter();
        // Used for deciding how many divisions to draw
        this.divisionFactor = 0.5;
        // These will be used to calculate the number of divisions to show
        this.hourTicks = 1000 * 60 * 60;
        this.shiftTicks = this.hourTicks * 8;
        this.dayTicks = this.hourTicks * 24;
        this.weekTicks = this.dayTicks * 7;
        this.monthTicks = this.dayTicks * 30;
        this.quarterTicks = this.dayTicks * 90;
        this.yearTicks = this.dayTicks * 365;
        this.Width = 100;
        this.Height = 100;
        this.Left = 0;
        // When these are not null the system knows that the user is dragging something.
        this.dragStart = null;
        this.dragEnd = null;
        this.dragSelected = null;
        this.dragIndicator = null;
        this.clickInfo = null;
        this.mouseUpEventHolder = function (ev) {
            try {
                var myEvent = new MouseEvent('mouseup', {
                    clientX: ev.clientX,
                    clientY: ev.clientY
                });
                document.querySelector('#navContainer').dispatchEvent(myEvent);
            }
            catch (e) {
                console.error('Error in mouse up:' + JSON.stringify(e));
            }
        };
        this.mouseMoveEventHolder = function (ev) {
            try {
                var myEvent = new MouseEvent('mousemove', {
                    clientX: ev.clientX,
                    clientY: ev.clientY
                });
                document.querySelector('#navContainer').dispatchEvent(myEvent);
            }
            catch (e) {
                console.error('Error in mouse move:' + JSON.stringify(e));
            }
        };
    }
    TimeSliderComponent.prototype.ngOnInit = function () { };
    TimeSliderComponent.prototype.ngOnChanges = function (changes) {
        this.Redraw();
    };
    TimeSliderComponent.prototype.SizeChanged = function ($event) {
        this.Width = $event.width;
        this.Height = $event.height;
        this.Left = $event.left;
        this.Redraw();
    };
    TimeSliderComponent.prototype.getRangeStart = function () {
        var result = this.RangeStart;
        // Make sure the range is set to something.
        if (_.isNil(this.RangeStart)) {
            if (this.SelectionStart) {
                result = this.SelectionStart;
            }
            else if (this.Indicator) {
                result = this.Indicator;
                result.setMonth(result.getMonth() - 1);
            }
            else {
                var d = new Date();
                d.setMonth(d.getMonth() - 1);
                result = d;
            }
        }
        return result;
    };
    TimeSliderComponent.prototype.getRangeEnd = function () {
        var result = this.RangeEnd;
        if (_.isNil(this.RangeEnd)) {
            if (this.SelectionEnd) {
                result = this.SelectionEnd;
            }
            else if (this.Indicator) {
                result = this.Indicator;
            }
            else {
                result = new Date();
            }
        }
        return result;
    };
    // Translate screen coordinates to a date.
    TimeSliderComponent.prototype.getCoordinateFromDate = function (myDate) {
        // Requires myDate, rangeStart, rangeEnd and width to be set.  If any of these are falsy return 0
        var position = 0;
        if (myDate && this.Width) {
            var d1 = myDate.getTime();
            var r1 = this.getRangeStart().getTime();
            var r2 = this.getRangeEnd().getTime();
            position = ((d1 - r1) / (r2 - r1)) * this.Width;
            position = Math.max(position, 0);
            position = Math.min(position, this.Width);
        }
        return position;
    };
    TimeSliderComponent.prototype.Redraw = function () {
        var myRangeStart = this.getRangeStart();
        var myRangeEnd = this.getRangeEnd();
        this.dragStart = null;
        this.dragEnd = null;
        this.dragSelected = null;
        this.dragIndicator = null;
        this.clickInfo = null;
        this.BarTop = Math.min(20, this.Height);
        this.BarHeight = this.Height - this.BarTop;
        var rangeWidth = myRangeEnd.getTime() - myRangeStart.getTime();
        if (rangeWidth <= 0) {
            rangeWidth = 1;
        }
        this.SelectionStartPosition = this.getCoordinateFromDate(this.SelectionStart);
        this.SelectionEndPosition = this.getCoordinateFromDate(this.SelectionEnd);
        this.SelectionWidth = this.SelectionEndPosition - this.SelectionStartPosition;
        if (this.SelectionEndPosition < this.SelectionStartPosition) {
            var t = this.SelectionEndPosition;
            this.SelectionEndPosition = this.SelectionStartPosition;
            this.SelectionStartPosition = t;
        }
        this.IndicatorPosition = this.Indicator ? this.getCoordinateFromDate(this.Indicator) : null;
        this.NowMarkerPosition = this.NowMarker ? this.getCoordinateFromDate(this.NowMarker) : null;
        // I am currently targeting about 10 divisions.  If there are less then 2 divisions
        // or more than 10 divisions it should use a different time range.
        this.Divisions = [];
        var fullTicks = myRangeEnd.getTime() - myRangeStart.getTime();
        if (fullTicks < this.hourTicks * 10) {
            // hour divisions
            var startTrimmedToHour = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate(), myRangeStart.getHours());
            if (startTrimmedToHour.getTime() + this.hourTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmedToHour.setHours(startTrimmedToHour.getHours() + 1);
            }
            while (startTrimmedToHour.getTime() < myRangeEnd.getTime()) {
                var nextHour = new Date(startTrimmedToHour.getTime());
                nextHour.setHours(nextHour.getHours() + 1);
                var text = formatDate(startTrimmedToHour, 'MM/dd ha', this.localeId);
                var shortText = formatDate(startTrimmedToHour, 'ha', this.localeId);
                if (nextHour.getTime() - this.hourTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: Math.max(0, this.getCoordinateFromDate(startTrimmedToHour)),
                    end: Math.min(this.Width, this.getCoordinateFromDate(nextHour))
                });
                startTrimmedToHour = nextHour;
            }
        }
        else if (fullTicks < this.shiftTicks * 10) {
            // 8 hour divisions
            var startTrimmedToHour = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate(), myRangeStart.getHours() - (myRangeStart.getHours() % 8));
            if (startTrimmedToHour.getTime() + this.hourTicks * 8 * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmedToHour.setHours(startTrimmedToHour.getHours() + 8);
            }
            while (startTrimmedToHour.getTime() < myRangeEnd.getTime()) {
                var nextHour = new Date(startTrimmedToHour.getTime());
                nextHour.setHours(nextHour.getHours() + 8);
                var text = formatDate(startTrimmedToHour, 'MM/dd ha-', this.localeId) + formatDate(nextHour, 'ha', this.localeId);
                var shortText = formatDate(startTrimmedToHour, 'ha', this.localeId);
                if (nextHour.getTime() - this.hourTicks * 8 * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmedToHour),
                    end: Math.min(this.Width, this.getCoordinateFromDate(nextHour))
                });
                startTrimmedToHour = nextHour;
            }
        }
        else if (fullTicks < this.dayTicks * 10) {
            // day divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate());
            if (startTrimmed.getTime() + this.dayTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setDate(startTrimmed.getDate() + 1);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setDate(next.getDate() + 1);
                var text = formatDate(startTrimmed, 'MM/dd', this.localeId);
                var shortText = formatDate(startTrimmed, 'dd', this.localeId);
                if (next.getTime() - this.dayTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else if (fullTicks < this.dayTicks * 35) {
            // 3 day divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate());
            if (startTrimmed.getTime() + this.dayTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setDate(startTrimmed.getDate() + 1);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setDate(next.getDate() + 3);
                var text = formatDate(startTrimmed, 'MM/dd-', this.localeId) + formatDate(next, 'MM/dd', this.localeId);
                var shortText = formatDate(startTrimmed, 'dd', this.localeId);
                if (next.getTime() - this.dayTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else if (fullTicks < this.weekTicks * 10) {
            // week divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate() - myRangeStart.getDay());
            if (startTrimmed.getTime() + this.weekTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setDate(startTrimmed.getDate() + 7);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setDate(next.getDate() + 7);
                var text = 'Week ' + formatDate(startTrimmed, 'w MM/dd-', this.localeId) + formatDate(next, 'MM/dd', this.localeId);
                var shortText = formatDate(startTrimmed, 'MM/dd', this.localeId);
                if (next.getTime() - this.weekTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else if (fullTicks < this.monthTicks * 10) {
            // month divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), 1);
            if (startTrimmed.getTime() + this.monthTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setMonth(startTrimmed.getMonth() + 1);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setMonth(next.getMonth() + 1);
                var text = formatDate(startTrimmed, 'MMM yyyy', this.localeId);
                var shortText = formatDate(startTrimmed, 'MMM', this.localeId);
                if (next.getTime() - this.monthTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else if (fullTicks < this.quarterTicks * 10) {
            // quarter divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth() - (myRangeStart.getMonth() % 3), 1);
            if (startTrimmed.getTime() + this.quarterTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setMonth(startTrimmed.getMonth() + 3);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setMonth(next.getMonth() + 3);
                var text = 'Q' + (Math.floor(startTrimmed.getMonth() / 3) + 1) + formatDate(startTrimmed, ' yyyy', this.localeId);
                var shortText = 'Q' + (Math.floor(startTrimmed.getMonth() / 3) + 1);
                if (next.getTime() - this.quarterTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else if (fullTicks < this.yearTicks * 20) {
            // Year divisions
            var startTrimmed = new Date(myRangeStart.getFullYear(), 0, 1);
            if (startTrimmed.getTime() + this.yearTicks * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setFullYear(startTrimmed.getFullYear() + 1);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setFullYear(next.getFullYear() + 1);
                var text = formatDate(startTrimmed, 'yyyy', this.localeId);
                var shortText = formatDate(startTrimmed, "'yy", this.localeId);
                if (next.getTime() - this.yearTicks * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
        else {
            // Decade divisions
            var startTrimmed = new Date(myRangeStart.getFullYear() - (myRangeStart.getFullYear() % 10), 0, 1);
            if (startTrimmed.getTime() + this.yearTicks * 10 * this.divisionFactor < myRangeStart.getTime()) {
                startTrimmed.setFullYear(startTrimmed.getFullYear() + 10);
            }
            while (startTrimmed.getTime() < myRangeEnd.getTime()) {
                var next = new Date(startTrimmed.getTime());
                next.setFullYear(next.getFullYear() + 10);
                var text = formatDate(startTrimmed, 'yyyy', this.localeId);
                var shortText = formatDate(startTrimmed, "'yy", this.localeId);
                if (next.getTime() - this.yearTicks * 10 * this.divisionFactor > myRangeEnd.getTime()) {
                    text = '';
                    shortText = '';
                }
                this.Divisions.push({
                    text: text,
                    shortText: shortText,
                    start: this.getCoordinateFromDate(startTrimmed),
                    end: Math.min(this.Width, this.getCoordinateFromDate(next))
                });
                startTrimmed = next;
            }
        }
    };
    TimeSliderComponent.prototype.SelectDivision = function ($event, division) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.ShowSelection) {
            this.SelectionChanged.emit({
                SelectionStart: this.GetDateFromCoordinate(division.start),
                SelectionEnd: this.GetDateFromCoordinate(division.end)
            });
        }
        else if (this.ShowIndicator) {
            this.SelectionChanged.emit({ Indicator: this.GetDateFromCoordinate(division.start) });
        }
        this.clickInfo = null;
    };
    TimeSliderComponent.prototype.GetDateFromCoordinate = function (coord) {
        var result = new Date();
        if (this.RangeStart && this.RangeEnd && this.Width) {
            var rmin = this.getRangeStart();
            var rmax = this.getRangeEnd();
            if (!isNaN(rmin.getTime()) && !isNaN(rmax.getTime())) {
                result = new Date(rmin.getTime() + (coord / this.Width) * (rmax.getTime() - rmin.getTime()));
            }
            if (isNaN(result.getTime())) {
                result = new Date();
            }
        }
        return result;
    };
    TimeSliderComponent.prototype.Nudge = function (val) {
        if (isNaN(val)) {
            return 0;
        }
        else if (val < 0) {
            return 0;
        }
        else if (val > this.Width) {
            return this.Width;
        }
        return val;
    };
    TimeSliderComponent.prototype.GetTransform = function (value, value2) {
        var result = '';
        if (_.isNil(value) || isNaN(value)) {
            value = 0;
        }
        if (_.isNil(value2)) {
            result = 'translate(' + String(this.Nudge(value)) + ')';
        }
        else {
            if (isNaN(value2)) {
                value2 = 0;
            }
            result = 'translate(' + String(this.Nudge(value)) + ',' + String(value2) + ')';
        }
        return result;
    };
    // Translate a screen coordinates to a date.
    TimeSliderComponent.prototype.getDateFromCoordinate = function (coord) {
        var result = new Date();
        if (this.RangeStart && this.RangeEnd && this.Width) {
            var rmin = this.RangeStart;
            var rmax = this.RangeEnd;
            if (!isNaN(rmin.getTime()) && !isNaN(rmax.getTime())) {
                result = new Date(rmin.getTime() + (coord / this.Width) * (rmax.getTime() - rmin.getTime()));
            }
            if (isNaN(result.getTime())) {
                result = new Date();
            }
        }
        return result;
    };
    TimeSliderComponent.prototype.getClientY = function ($event) {
        var result = 0;
        if ($event.clientY !== undefined) {
            result = $event.clientY;
        }
        else {
            var e = $event;
            if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                result = e.originalEvent.targetTouches[0].clientY || 0;
            }
        }
        return result;
    };
    TimeSliderComponent.prototype.getClientX = function ($event) {
        var result = 0;
        if ($event.clientX !== undefined) {
            result = $event.clientX;
        }
        else {
            var e = $event;
            if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                result = e.originalEvent.targetTouches[0].clientX || 0;
            }
        }
        return result;
    };
    // This should initiate a drag operation.
    TimeSliderComponent.prototype.Mousedown = function ($event, selection) {
        window.addEventListener('mouseup', this.mouseUpEventHolder);
        window.addEventListener('mousemove', this.mouseMoveEventHolder);
        $event.preventDefault();
        $event.stopPropagation();
        this.clickInfo = $event;
        var boundingRect = { height: this.Height, width: this.Width, left: this.Left };
        if (selection === 'bar') {
            var clicked = this.getClientX($event) - this.Left;
            this.dragSelected = {
                left: this.Left,
                width: this.Width,
                start: clicked - this.SelectionStartPosition,
                end: this.SelectionEndPosition - clicked
            };
        }
        else if (selection === 'start') {
            this.dragStart = boundingRect;
        }
        else if (selection === 'end') {
            this.dragEnd = boundingRect;
        }
        else if (selection === 'indicator') {
            this.dragIndicator = boundingRect;
        }
    };
    // This should cause something to move if a drag operation is in progress.
    TimeSliderComponent.prototype.Mousemove = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.dragSelected) {
            var newStart = this.getClientX($event) - this.dragSelected.left - this.dragSelected.start;
            var newEnd = this.getClientX($event) - this.dragSelected.left + this.dragSelected.end;
            if (newStart <= 0) {
                this.SelectionStartPosition = 0;
                this.SelectionEndPosition = this.dragSelected.start + this.dragSelected.end;
            }
            else if (newEnd >= this.dragSelected.width) {
                this.SelectionStartPosition = this.dragSelected.width - (this.dragSelected.start + this.dragSelected.end);
                this.SelectionEndPosition = this.dragSelected.width;
            }
            else {
                this.SelectionStartPosition = newStart;
                this.SelectionEndPosition = newEnd;
            }
        }
        else if (this.dragStart) {
            this.SelectionStartPosition = this.getClientX($event) - this.dragStart.left;
            this.SelectionStartPosition = Math.max(0, this.SelectionStartPosition);
            this.SelectionStartPosition = Math.min(this.dragStart.width, this.SelectionStartPosition);
            if (this.SelectionStartPosition > this.SelectionEndPosition) {
                var t = this.SelectionStartPosition;
                this.SelectionStartPosition = this.SelectionEndPosition;
                this.SelectionEndPosition = t;
                this.dragEnd = this.dragStart;
                this.dragStart = null;
            }
        }
        else if (this.dragEnd) {
            this.SelectionEndPosition = this.getClientX($event) - this.dragEnd.left;
            this.SelectionEndPosition = Math.max(0, this.SelectionEndPosition);
            this.SelectionEndPosition = Math.min(this.dragEnd.width, this.SelectionEndPosition);
            if (this.SelectionStartPosition > this.SelectionEndPosition) {
                var t = this.SelectionStartPosition;
                this.SelectionStartPosition = this.SelectionEndPosition;
                this.SelectionEndPosition = t;
                this.dragStart = this.dragEnd;
                this.dragEnd = null;
            }
        }
        else if (this.dragIndicator) {
            this.IndicatorPosition = this.getClientX($event) - this.dragIndicator.left;
            this.IndicatorPosition = Math.max(0, this.IndicatorPosition);
            this.IndicatorPosition = Math.min(this.dragIndicator.width, this.IndicatorPosition);
        }
    };
    // The completion of a drag operation.
    TimeSliderComponent.prototype.Mouseup = function ($event) {
        window.removeEventListener('mouseup', this.mouseUpEventHolder);
        window.removeEventListener('mousemove', this.mouseMoveEventHolder);
        $event.preventDefault();
        $event.stopPropagation();
        if (this.clickInfo &&
            this.getClientX(this.clickInfo) === this.getClientX($event) &&
            this.getClientY(this.clickInfo) === this.getClientY($event)) {
            this.ShowPopup.emit();
        }
        else if (this.dragIndicator) {
            this.SelectionChanged.emit({ Indicator: this.getDateFromCoordinate(this.IndicatorPosition) });
        }
        else {
            this.SelectionChanged.emit({
                SelectionStart: this.getDateFromCoordinate(this.SelectionStartPosition),
                SelectionEnd: this.getDateFromCoordinate(this.SelectionEndPosition)
            });
        }
        this.dragSelected = null;
        this.dragStart = null;
        this.dragEnd = null;
        this.dragIndicator = null;
        this.clickInfo = null;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "RangeStart", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "RangeEnd", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "SelectionStart", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "SelectionEnd", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "Indicator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], TimeSliderComponent.prototype, "NowMarker", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimeSliderComponent.prototype, "ShowSelection", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimeSliderComponent.prototype, "ShowIndicator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimeSliderComponent.prototype, "ShowNowMarker", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimeSliderComponent.prototype, "SelectionChanged", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimeSliderComponent.prototype, "ShowPopup", void 0);
    TimeSliderComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-time-slider',
            templateUrl: './time-slider.component.html',
            styleUrls: ['./time-slider.component.scss']
        }),
        tslib_1.__param(0, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TimeSliderComponent);
    return TimeSliderComponent;
}());
export { TimeSliderComponent };
//# sourceMappingURL=time-slider.component.js.map