import { Observable } from 'rxjs/internal/Observable';
import { merge, Subject, fromEvent } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { throttleTime, filter, takeUntil, repeatWhen } from 'rxjs/operators';
import 'zone.js';

export abstract class EventSource {
  private eventStream$: Observable<any>;
  private throttleDelayInMilliseconds: number;
  private unsubscribeToggle: Subject<void> = new Subject();
  isAttached = false;
  sourceIsActive: EventEmitter<{ source: EventSource; innerArgs: any }> = new EventEmitter<{
    source: EventSource;
    innerArgs: any;
  }>();

  constructor(target: any, events: string[], throttleDelayInMilliseconds: number, isPassiveEvent: boolean) {
    this.throttleDelayInMilliseconds = throttleDelayInMilliseconds;
    const events$: Array<Observable<Event>> = [];
    events.forEach(event => {
      events$.push(fromEvent(target, event, { passive: isPassiveEvent }));
    });

    this.eventStream$ = merge(...events$);
    this.eventStream$ = this.eventStream$.pipe(filter(eventTrigger => this.isValidEventTrigger(eventTrigger)));
    this.eventStream$ = this.eventStream$.pipe(throttleTime(this.throttleDelayInMilliseconds));

    const activeSourceCallback = (innerArgs: any) => {
      return this.sourceIsActive.emit({ source: this, innerArgs });
    };

    this.eventStream$
      .pipe(
        takeUntil(this.unsubscribeToggle),
        repeatWhen(() => this.unsubscribeToggle)
      )
      .subscribe(activeSourceCallback);
    this.isAttached = true;
  }

  abstract isValidEventTrigger(event: any): boolean;

  restartEventSource(): void {
    if (!this.isAttached) {
      this.unsubscribeToggle.next();
    }
    this.isAttached = true;
  }

  unsubscribeEventSource(): void {
    if (this.isAttached) {
      this.unsubscribeToggle.next();
    }
    this.isAttached = false;
  }
}
