import * as tslib_1 from "tslib";
import { EventSource } from './event-source';
var DomEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(DomEventSource, _super);
    function DomEventSource() {
        var _this = this;
        // list of domEvents we look for to consider the window 'active'
        var domEvents = ['mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll'];
        var isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        var isPassiveEvent = false;
        if (!isIEOrEdge) {
            // https://caniuse.com/#feat=passive-event-listener. Not for IE.
            // This should improve performance in newer browsers.
            // See: https://developers.google.com/web/updates/2016/06/passive-event-listeners
            isPassiveEvent = true;
        }
        _this = _super.call(this, document.documentElement, domEvents, 500, isPassiveEvent) || this;
        return _this;
    }
    DomEventSource.prototype.isValidEventTrigger = function (event) {
        // right now, there are no invalid events. Any DOM event listed above
        // will count as activity
        return true;
    };
    return DomEventSource;
}(EventSource));
export { DomEventSource };
//# sourceMappingURL=dom-event-source.js.map