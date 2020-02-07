import { merge, Subject, fromEvent } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { throttleTime, filter, takeUntil, repeatWhen } from 'rxjs/operators';
import 'zone.js';
var EventSource = /** @class */ (function () {
    function EventSource(target, events, throttleDelayInMilliseconds, isPassiveEvent) {
        var _this = this;
        this.unsubscribeToggle = new Subject();
        this.isAttached = false;
        this.sourceIsActive = new EventEmitter();
        this.throttleDelayInMilliseconds = throttleDelayInMilliseconds;
        var events$ = [];
        events.forEach(function (event) {
            events$.push(fromEvent(target, event, { passive: isPassiveEvent }));
        });
        this.eventStream$ = merge.apply(void 0, events$);
        this.eventStream$ = this.eventStream$.pipe(filter(function (eventTrigger) { return _this.isValidEventTrigger(eventTrigger); }));
        this.eventStream$ = this.eventStream$.pipe(throttleTime(this.throttleDelayInMilliseconds));
        var activeSourceCallback = function (innerArgs) {
            return _this.sourceIsActive.emit({ source: _this, innerArgs: innerArgs });
        };
        this.eventStream$
            .pipe(takeUntil(this.unsubscribeToggle), repeatWhen(function () { return _this.unsubscribeToggle; }))
            .subscribe(activeSourceCallback);
        this.isAttached = true;
    }
    EventSource.prototype.restartEventSource = function () {
        if (!this.isAttached) {
            this.unsubscribeToggle.next();
        }
        this.isAttached = true;
    };
    EventSource.prototype.unsubscribeEventSource = function () {
        if (this.isAttached) {
            this.unsubscribeToggle.next();
        }
        this.isAttached = false;
    };
    return EventSource;
}());
export { EventSource };
//# sourceMappingURL=event-source.js.map