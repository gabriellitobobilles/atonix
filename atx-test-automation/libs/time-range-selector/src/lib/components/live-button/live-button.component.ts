import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'atx-live-button',
  templateUrl: './live-button.component.html',
  styleUrls: ['./live-button.component.scss']
})
export class LiveButtonComponent implements OnInit, OnDestroy {
  public IsLive$: Observable<boolean>;
  public liveTimeout = 300;
  public liveSubscription: Subscription;
  public isLiveSubscription: Subscription;

  constructor(private facade: TimeRangeSelectorFacade) {
    this.IsLive$ = facade.isLive$;
    this.isLiveSubscription = this.IsLive$.subscribe(newVal => {
      if (newVal) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
    this.liveSubscription = this.facade.liveTimeout$.subscribe(newVal => {
      this.liveTimeout = newVal;
    });
  }

  ngOnInit() {}

  LiveToggle() {
    this.facade.liveToggle();
  }

  private myTimer: Subscription;
  startTimer() {
    this.stopTimer();

    this.myTimer = timer(0, this.liveTimeout * 1000).subscribe(() => {
      this.facade.goToNow();
    });
  }

  stopTimer() {
    if (this.myTimer) {
      this.myTimer.unsubscribe();
      this.myTimer = null;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.isLiveSubscription.unsubscribe();
    this.liveSubscription.unsubscribe();
  }
}
