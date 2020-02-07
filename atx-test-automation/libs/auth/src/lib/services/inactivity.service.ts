import { EventEmitter, Injectable, NgZone, OnDestroy } from '@angular/core';
import { EventSourceSubscriber } from '../models/inactivity/event-source-subscriber';
import { InactivityLocalStorageService } from './inactivity-local-storage.service';
import { EventSource } from '../models/inactivity/sources/event-source';
import { DomEventSource } from '../models/inactivity/sources/dom-event-source';
import { StorageEventSource } from '../models/inactivity/sources/storage-event-source';
import * as _ from 'lodash';

@Injectable()
export class InactivityService implements OnDestroy {
  private inactivityTimeInSeconds = 5;
  private countdownTimeInSeconds = 5;

  private eventSourceSubscribers: EventSourceSubscriber[] = new Array();
  private running = false;
  private countDownStarted: boolean;
  private countdown: number;

  public startCountdownModal: EventEmitter<any> = new EventEmitter();
  public stopCountdownModal: EventEmitter<any> = new EventEmitter();
  public countDownTimerValue: EventEmitter<number> = new EventEmitter<number>();
  public logoutUser: EventEmitter<number> = new EventEmitter<number>();

  inactivityTimer = null;
  countdownTimer = null;

  constructor(private localStorageExpiration: InactivityLocalStorageService, private zone: NgZone) {
    this.setCountdownStarted(false);
  }

  initializeEventSources(inactivityTimeInSeconds: number, countdownTimeInSeconds: number) {
    this.countdownTimeInSeconds = countdownTimeInSeconds;
    this.inactivityTimeInSeconds = inactivityTimeInSeconds;
    this.clearEventSources();
    const sources: EventSource[] = [new DomEventSource(), new StorageEventSource()];
    for (const source of sources) {
      const eventSource = new EventSourceSubscriber(source);
      eventSource.subscribe(() => {
        if (!this.running) {
          return;
        }
        if (this.countdownTimeInSeconds && this.localStorageExpiration.isExpired()) {
          this.startCountdownTimer();
          return;
        }
        this.startInactivityTimer();
      });
      this.eventSourceSubscribers.push(eventSource);
    }
  }

  clearEventSources(): void {
    for (const eventSourceSubscriber of this.eventSourceSubscribers) {
      eventSourceSubscriber.pause();
      eventSourceSubscriber.unsubscribe();
    }
    this.eventSourceSubscribers.length = 0;
  }

  startInactivityTimer(): void {
    this.stopInactivityTimer();
    this.stopCountDownTimer();
    const value = new Date(new Date().getTime() + (this.inactivityTimeInSeconds + this.countdownTimeInSeconds) * 1000);
    this.localStorageExpiration.setExpirationTime(value);
    if (this.countDownStarted) {
      this.toggleState();
    }
    if (!this.running) {
      this.toggleEventSources(true);
    }
    this.running = true;
    const timingCallback = () => {
      this.zone.run(() => {
        const now: Date = new Date();
        const last: Date = this.localStorageExpiration.getExpirationTime() || now;
        const remainingTimeInCountdown = last.getTime() - now.getTime() - this.countdownTimeInSeconds * 1000;
        if (remainingTimeInCountdown > 0) {
          this.stopInactivityTimer();
          this.setInactivityTimer(timingCallback, remainingTimeInCountdown);
        } else {
          this.toggleState();
        }
      });
    };
    this.setInactivityTimer(timingCallback, this.inactivityTimeInSeconds * 1000);
  }

  setInactivityTimer(watchFn: () => void, frequency: number): void {
    this.zone.runOutsideAngular(() => {
      this.inactivityTimer = setInterval(watchFn, frequency);
    });
  }

  stop(): void {
    this.toggleEventSources(false);
    this.stopInactivityTimer();
    this.stopCountDownTimer();
    this.setCountdownStarted(false);
    this.running = false;
    this.localStorageExpiration.setExpirationTime(null);
  }

  startCountdownTimer(): void {
    this.toggleEventSources(false);
    this.stopInactivityTimer();
    this.stopCountDownTimer();
    this.setCountdownStarted(true);
    this.running = false;
    this.countdown = 0;
    this.logoutUser.emit(null);
  }

  private setCountdownStarted(value: boolean): void {
    this.countDownStarted = value;
    this.localStorageExpiration.setCountdownWarning(value);
  }

  private toggleState(): void {
    this.setCountdownStarted(!this.countDownStarted);
    if (this.countDownStarted) {
      this.startCountdownModal.emit(null);
      if (this.countdownTimeInSeconds > 0) {
        this.countdown = this.countdownTimeInSeconds;
        this.setTimoutIntervalOutsideZone(() => {
          this.startCountDown();
        }, 1000);
      }
    } else {
      this.toggleEventSources(true);
      this.stopCountdownModal.emit(null);
    }
    this.stopInactivityTimer();
  }

  private setTimoutIntervalOutsideZone(intervalFn: () => void, frequency: number) {
    this.zone.runOutsideAngular(() => {
      this.countdownTimer = setInterval(() => {
        intervalFn();
      }, frequency);
    });
  }

  private toggleEventSources(resume: boolean): void {
    for (const eventSourceSubscriber of this.eventSourceSubscribers) {
      if (resume) {
        eventSourceSubscriber.resume();
      } else {
        eventSourceSubscriber.pause();
      }
    }
  }

  private startCountDown(): void {
    this.zone.run(() => {
      const now: Date = new Date();
      const last: Date = this.localStorageExpiration.getExpirationTime() || now;
      const remainingTimeInCountdown = last.getTime() - now.getTime() - this.countdownTimeInSeconds * 1000;
      if (remainingTimeInCountdown > 0) {
        this.stopCountDownTimer();
        if (!this.running) {
          return;
        }
        if (this.countdownTimeInSeconds && this.localStorageExpiration.isExpired()) {
          this.startCountdownTimer();
          return;
        }
        this.startInactivityTimer();
        return;
      }
      if (!this.countDownStarted) {
        return;
      }
      if (this.countdown <= 0) {
        this.startCountdownTimer();
        return;
      }
      this.countDownTimerValue.emit(this.countdown);
      this.countdown--;
    });
  }

  private stopCountDownTimer() {
    if (!_.isNil(this.countdownTimer)) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  private stopInactivityTimer() {
    if (!_.isNil(this.inactivityTimer)) {
      clearInterval(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }

  ngOnDestroy(): void {
    this.stop();
    this.clearEventSources();
  }
}
