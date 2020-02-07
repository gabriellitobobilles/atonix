import { Subscription } from 'rxjs';
import { EventSource } from './sources/event-source';

export class EventSourceSubscriber {
  private eventSubscription: Subscription;

  constructor(public eventSource: EventSource) {}

  subscribe(fn: (args: { source: EventSource; innerArgs: any }) => void): void {
    this.eventSubscription = this.eventSource.sourceIsActive.subscribe(fn);
  }

  unsubscribe(): void {
    this.eventSubscription.unsubscribe();
    this.eventSubscription = null;
  }

  resume(): void {
    this.eventSource.restartEventSource();
  }

  pause(): void {
    this.eventSource.unsubscribeEventSource();
  }
}
