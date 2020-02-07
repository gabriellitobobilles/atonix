import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { timer } from 'rxjs';
var LiveButtonComponent = /** @class */ (function () {
    function LiveButtonComponent(facade) {
        var _this = this;
        this.facade = facade;
        this.liveTimeout = 300;
        this.IsLive$ = facade.isLive$;
        this.isLiveSubscription = this.IsLive$.subscribe(function (newVal) {
            if (newVal) {
                _this.startTimer();
            }
            else {
                _this.stopTimer();
            }
        });
        this.liveSubscription = this.facade.liveTimeout$.subscribe(function (newVal) {
            _this.liveTimeout = newVal;
        });
    }
    LiveButtonComponent.prototype.ngOnInit = function () { };
    LiveButtonComponent.prototype.LiveToggle = function () {
        this.facade.liveToggle();
    };
    LiveButtonComponent.prototype.startTimer = function () {
        var _this = this;
        this.stopTimer();
        this.myTimer = timer(0, this.liveTimeout * 1000).subscribe(function () {
            _this.facade.goToNow();
        });
    };
    LiveButtonComponent.prototype.stopTimer = function () {
        if (this.myTimer) {
            this.myTimer.unsubscribe();
            this.myTimer = null;
        }
    };
    LiveButtonComponent.prototype.ngOnDestroy = function () {
        this.stopTimer();
        this.isLiveSubscription.unsubscribe();
        this.liveSubscription.unsubscribe();
    };
    LiveButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-live-button',
            templateUrl: './live-button.component.html',
            styleUrls: ['./live-button.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TimeRangeSelectorFacade])
    ], LiveButtonComponent);
    return LiveButtonComponent;
}());
export { LiveButtonComponent };
//# sourceMappingURL=live-button.component.js.map