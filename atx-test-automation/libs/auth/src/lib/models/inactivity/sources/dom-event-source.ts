import { EventSource } from './event-source';

export class DomEventSource extends EventSource {
  constructor() {
    // list of domEvents we look for to consider the window 'active'
    const domEvents = ['mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll'];
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    let isPassiveEvent = false;
    if (!isIEOrEdge) {
      // https://caniuse.com/#feat=passive-event-listener. Not for IE.
      // This should improve performance in newer browsers.
      // See: https://developers.google.com/web/updates/2016/06/passive-event-listeners
      isPassiveEvent = true;
    }
    super(document.documentElement, domEvents, 500, isPassiveEvent);
  }

  isValidEventTrigger(event: any): boolean {
    // right now, there are no invalid events. Any DOM event listed above
    // will count as activity
    return true;
  }
}
