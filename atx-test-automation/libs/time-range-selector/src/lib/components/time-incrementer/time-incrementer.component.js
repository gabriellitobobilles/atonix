import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faCalendar, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
var TimeIncrementerComponent = /** @class */ (function () {
    function TimeIncrementerComponent() {
        this.faCalendar = faCalendar;
        this.faCaretLeft = faCaretLeft;
        this.faCaretRight = faCaretRight;
        this.ShowPopup = new EventEmitter();
        this.Step = new EventEmitter();
    }
    TimeIncrementerComponent.prototype.ngOnInit = function () { };
    TimeIncrementerComponent.prototype.InternalShowPopup = function () {
        this.ShowPopup.emit();
    };
    TimeIncrementerComponent.prototype.InternalStepLeft = function () {
        this.Step.emit('left');
    };
    TimeIncrementerComponent.prototype.InternalStepRight = function () {
        this.Step.emit('right');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimeIncrementerComponent.prototype, "ShowSelection", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimeIncrementerComponent.prototype, "ShowPopup", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimeIncrementerComponent.prototype, "Step", void 0);
    TimeIncrementerComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-time-incrementer',
            templateUrl: './time-incrementer.component.html',
            styleUrls: ['./time-incrementer.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TimeIncrementerComponent);
    return TimeIncrementerComponent;
}());
export { TimeIncrementerComponent };
//# sourceMappingURL=time-incrementer.component.js.map