import * as tslib_1 from "tslib";
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { EventSourceSubscriber } from '../models/inactivity/event-source-subscriber';
import { InactivityLocalStorageService } from './inactivity-local-storage.service';
import { DomEventSource } from '../models/inactivity/sources/dom-event-source';
import { StorageEventSource } from '../models/inactivity/sources/storage-event-source';
import * as _ from 'lodash';
var InactivityService = /** @class */ (function () {
    function InactivityService(localStorageExpiration, zone) {
        this.localStorageExpiration = localStorageExpiration;
        this.zone = zone;
        this.inactivityTimeInSeconds = 5;
        this.countdownTimeInSeconds = 5;
        this.eventSourceSubscribers = new Array();
        this.running = false;
        this.startCountdownModal = new EventEmitter();
        this.stopCountdownModal = new EventEmitter();
        this.countDownTimerValue = new EventEmitter();
        this.logoutUser = new EventEmitter();
        this.inactivityTimer = null;
        this.countdownTimer = null;
        this.setCountdownStarted(false);
    }
    InactivityService.prototype.initializeEventSources = function (inactivityTimeInSeconds, countdownTimeInSeconds) {
        var _this = this;
        this.countdownTimeInSeconds = countdownTimeInSeconds;
        this.inactivityTimeInSeconds = inactivityTimeInSeconds;
        this.clearEventSources();
        var sources = [new DomEventSource(), new StorageEventSource()];
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            var eventSource = new EventSourceSubscriber(source);
            eventSource.subscribe(function () {
                if (!_this.running) {
                    return;
                }
                if (_this.countdownTimeInSeconds && _this.localStorageExpiration.isExpired()) {
                    _this.startCountdownTimer();
                    return;
                }
                _this.startInactivityTimer();
            });
            this.eventSourceSubscribers.push(eventSource);
        }
    };
    InactivityService.prototype.clearEventSources = function () {
        for (var _i = 0, _a = this.eventSourceSubscribers; _i < _a.length; _i++) {
            var eventSourceSubscriber = _a[_i];
            eventSourceSubscriber.pause();
            eventSourceSubscriber.unsubscribe();
        }
        this.eventSourceSubscribers.length = 0;
    };
    InactivityService.prototype.startInactivityTimer = function () {
        var _this = this;
        this.stopInactivityTimer();
        this.stopCountDownTimer();
        var value = new Date(new Date().getTime() + (this.inactivityTimeInSeconds + this.countdownTimeInSeconds) * 1000);
        this.localStorageExpiration.setExpirationTime(value);
        if (this.countDownStarted) {
            this.toggleState();
        }
        if (!this.running) {
            this.toggleEventSources(true);
        }
        this.running = true;
        var timingCallback = function () {
            _this.zone.run(function () {
                var now = new Date();
                var last = _this.localStorageExpiration.getExpirationTime() || now;
                var remainingTimeInCountdown = last.getTime() - now.getTime() - _this.countdownTimeInSeconds * 1000;
                if (remainingTimeInCountdown > 0) {
                    _this.stopInactivityTimer();
                    _this.setInactivityTimer(timingCallback, remainingTimeInCountdown);
                }
                else {
                    _this.toggleState();
                }
            });
        };
        this.setInactivityTimer(timingCallback, this.inactivityTimeInSeconds * 1000);
    };
    InactivityService.prototype.setInactivityTimer = function (watchFn, frequency) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.inactivityTimer = setInterval(watchFn, frequency);
        });
    };
    InactivityService.prototype.stop = function () {
        this.toggleEventSources(false);
        this.stopInactivityTimer();
        this.stopCountDownTimer();
        this.setCountdownStarted(false);
        this.running = false;
        this.localStorageExpiration.setExpirationTime(null);
    };
    InactivityService.prototype.startCountdownTimer = function () {
        this.toggleEventSources(false);
        this.stopInactivityTimer();
        this.stopCountDownTimer();
        this.setCountdownStarted(true);
        this.running = false;
        this.countdown = 0;
        this.logoutUser.emit(null);
    };
    InactivityService.prototype.setCountdownStarted = function (value) {
        this.countDownStarted = value;
        this.localStorageExpiration.setCountdownWarning(value);
    };
    InactivityService.prototype.toggleState = function () {
        var _this = this;
        this.setCountdownStarted(!this.countDownStarted);
        if (this.countDownStarted) {
            this.startCountdownModal.emit(null);
            if (this.countdownTimeInSeconds > 0) {
                this.countdown = this.countdownTimeInSeconds;
                this.setTimoutIntervalOutsideZone(function () {
                    _this.startCountDown();
                }, 1000);
            }
        }
        else {
            this.toggleEventSources(true);
            this.stopCountdownModal.emit(null);
        }
        this.stopInactivityTimer();
    };
    InactivityService.prototype.setTimoutIntervalOutsideZone = function (intervalFn, frequency) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.countdownTimer = setInterval(function () {
                intervalFn();
            }, frequency);
        });
    };
    InactivityService.prototype.toggleEventSources = function (resume) {
        for (var _i = 0, _a = this.eventSourceSubscribers; _i < _a.length; _i++) {
            var eventSourceSubscriber = _a[_i];
            if (resume) {
                eventSourceSubscriber.resume();
            }
            else {
                eventSourceSubscriber.pause();
            }
        }
    };
    InactivityService.prototype.startCountDown = function () {
        var _this = this;
        this.zone.run(function () {
            var now = new Date();
            var last = _this.localStorageExpiration.getExpirationTime() || now;
            var remainingTimeInCountdown = last.getTime() - now.getTime() - _this.countdownTimeInSeconds * 1000;
            if (remainingTimeInCountdown > 0) {
                _this.stopCountDownTimer();
                if (!_this.running) {
                    return;
                }
                if (_this.countdownTimeInSeconds && _this.localStorageExpiration.isExpired()) {
                    _this.startCountdownTimer();
                    return;
                }
                _this.startInactivityTimer();
                return;
            }
            if (!_this.countDownStarted) {
                return;
            }
            if (_this.countdown <= 0) {
                _this.startCountdownTimer();
                return;
            }
            _this.countDownTimerValue.emit(_this.countdown);
            _this.countdown--;
        });
    };
    InactivityService.prototype.stopCountDownTimer = function () {
        if (!_.isNil(this.countdownTimer)) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
    };
    InactivityService.prototype.stopInactivityTimer = function () {
        if (!_.isNil(this.inactivityTimer)) {
            clearInterval(this.inactivityTimer);
            this.inactivityTimer = null;
        }
    };
    InactivityService.prototype.ngOnDestroy = function () {
        this.stop();
        this.clearEventSources();
    };
    InactivityService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [InactivityLocalStorageService, NgZone])
    ], InactivityService);
    return InactivityService;
}());
export { InactivityService };
//# sourceMappingURL=inactivity.service.js.map