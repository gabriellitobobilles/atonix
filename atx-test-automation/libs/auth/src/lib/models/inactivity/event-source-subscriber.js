var EventSourceSubscriber = /** @class */ (function () {
    function EventSourceSubscriber(eventSource) {
        this.eventSource = eventSource;
    }
    EventSourceSubscriber.prototype.subscribe = function (fn) {
        this.eventSubscription = this.eventSource.sourceIsActive.subscribe(fn);
    };
    EventSourceSubscriber.prototype.unsubscribe = function () {
        this.eventSubscription.unsubscribe();
        this.eventSubscription = null;
    };
    EventSourceSubscriber.prototype.resume = function () {
        this.eventSource.restartEventSource();
    };
    EventSourceSubscriber.prototype.pause = function () {
        this.eventSource.unsubscribeEventSource();
    };
    return EventSourceSubscriber;
}());
export { EventSourceSubscriber };
//# sourceMappingURL=event-source-subscriber.js.map