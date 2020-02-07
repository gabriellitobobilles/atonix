import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
var RangeSliderComponent = /** @class */ (function () {
    function RangeSliderComponent() {
        this.Ball = 0;
        // Precalculated for efficiency,  These should probably be in a library somewhere.
        this.hourTicks = 1000 * 60 * 60;
        this.dayTicks = this.hourTicks * 24;
        this.MoveRange = new EventEmitter();
        this.ZoomRange = new EventEmitter();
    }
    RangeSliderComponent.prototype.ngOnInit = function () { };
    RangeSliderComponent.prototype.ngOnChanges = function (changes) {
        this.calcZoomBall();
    };
    // This determines where the ball should be based on the currently visible range.
    RangeSliderComponent.prototype.calcZoomBall = function () {
        var days = Math.floor((this.RangeEnd.getTime() - this.RangeStart.getTime()) / this.dayTicks);
        if (isNaN(days)) {
            days = 723 / 2;
        }
        if (days < 7) {
            days = 0;
        }
        if (days > 723) {
            days = 723;
        }
        days = 723 - days;
        this.Ball = 100 * (days / 723);
        this.Ball = Math.max(0, this.Ball);
        this.Ball = Math.min(100, this.Ball);
    };
    RangeSliderComponent.prototype.InnerMoveRange = function (direction) {
        this.MoveRange.emit(direction);
    };
    RangeSliderComponent.prototype.InnerZoom = function (direction) {
        this.ZoomRange.emit(direction);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], RangeSliderComponent.prototype, "MoveRange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], RangeSliderComponent.prototype, "ZoomRange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], RangeSliderComponent.prototype, "RangeStart", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], RangeSliderComponent.prototype, "RangeEnd", void 0);
    RangeSliderComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-range-slider',
            templateUrl: './range-slider.component.html',
            styleUrls: ['./range-slider.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RangeSliderComponent);
    return RangeSliderComponent;
}());
export { RangeSliderComponent };
//# sourceMappingURL=range-slider.component.js.map