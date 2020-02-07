import * as _ from 'lodash';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import {
  Overlay,
  OverlayRef,
  CdkOverlayOrigin,
  HorizontalConnectionPos,
  VerticalConnectionPos,
  ConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { SelectionPopupComponent } from '../selection-popup/selection-popup.component';
import { IndicatorPopupComponent } from '../indicator-popup/indicator-popup.component';
import { map, withLatestFrom, combineLatest } from 'rxjs/operators';

interface IRect {
  height: number;
  width: number;
  left: number;
}

@Component({
  selector: 'atx-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.scss']
})
export class TimeRangeSelectorComponent implements OnInit, AfterViewInit {
  // Flag for turning on and off the live mode.
  public IsLive = false;
  public IsFullSize = false;

  @Output() SelectionChanged = new EventEmitter<{ startDate: Date; endDate: Date; indicator: Date }>();

  @ViewChild(CdkOverlayOrigin) origin: CdkOverlayOrigin;

  public RangeStart$: Observable<Date>;
  public RangeEnd$: Observable<Date>;
  public NowMarker$: Observable<Date>;
  public Indicator$: Observable<Date>;
  public SelectionStart$: Observable<Date>;
  public SelectionEnd$: Observable<Date>;
  public ShowSelection$: Observable<boolean>;
  public ShowIndicator$: Observable<boolean>;
  public ShowNowMarker$: Observable<boolean>;
  public PopupOpened$: Observable<boolean>;

  public AllowLive: boolean;
  public JumpToList: any[];
  public SearchText: string;
  public SelectedQuickSearch: any;
  public Ball = 0;

  private bpObserver: Observable<BreakpointState>;
  private popupOverlayRef: OverlayRef;

  constructor(private breakpointObserver: BreakpointObserver, private overlay: Overlay, private facade: TimeRangeSelectorFacade) {
    this.RangeStart$ = facade.rangeStart$;
    this.RangeEnd$ = facade.rangeEnd$;
    this.NowMarker$ = facade.nowMarker$;
    this.Indicator$ = facade.indicator$;
    this.SelectionStart$ = facade.startDate$;
    this.SelectionEnd$ = facade.endDate$;
    this.ShowSelection$ = facade.showSelection$;
    this.ShowIndicator$ = facade.showIndicator$;
    this.ShowNowMarker$ = facade.showNowMarker$;
    this.PopupOpened$ = facade.popupOpened$;

    this.PopupOpened$.pipe(
      withLatestFrom(facade.showSelection$),
      map(data => {
        return { open: data[0], selection: data[1] };
      })
    ).subscribe(vals => {
      if (vals.open) {
        this.openPopup(vals.selection);
      } else {
        this.closePopup();
      }
    });

    this.bpObserver = breakpointObserver.observe([Breakpoints.HandsetPortrait]);

    this.bpObserver.subscribe(() => {
      this.updateLayout();
    });
    this.updateLayout();
  }

  ngAfterViewInit() {
    if (this.origin) {
      console.log('Origin Set');
    }
  }

  public OnSelectionChanged(newValues: {
    SelectionStart?: Date;
    SelectionEnd?: Date;
    Indicator?: Date;
    RangeStart?: Date;
    RangeEnd?: Date;
  }) {
    this.facade.configureTimeRangeSelector(
      newValues.SelectionStart,
      newValues.SelectionEnd,
      newValues.Indicator,
      undefined,
      undefined,
      undefined
    );
  }

  private updateLayout() {
    console.log('Updating Layout');
    this.IsFullSize = !this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
  }

  public LiveClicked() {
    this.IsLive = !this.IsLive;
  }

  public ShowPopup() {
    this.facade.openPopup();
  }

  private openPopup(selection: boolean = true) {
    if (!this.popupOverlayRef) {
      this.popupOverlayRef = this.overlay.create({
        // width: '600px',
        // height: '600px',
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.origin.elementRef)
          .withPositions([
            {
              offsetX: -10,
              offsetY: -10,
              originX: 'end',
              originY: 'top',
              overlayX: 'end',
              overlayY: 'bottom'
            },
            {
              offsetX: 10,
              offsetY: 10,
              originX: 'end',
              originY: 'top',
              overlayX: 'end',
              overlayY: 'bottom'
            }
          ])
          .withPush(true),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: 'apps-panel'
      });

      if (selection) {
        const myPortal = new ComponentPortal(SelectionPopupComponent);
        this.popupOverlayRef.attach(myPortal);
      } else {
        const myPortal = new ComponentPortal(IndicatorPopupComponent);
        this.popupOverlayRef.attach(myPortal);
      }

      this.popupOverlayRef.backdropClick().subscribe(() => {
        this.facade.closePopup();
      });
    }
  }

  private closePopup() {
    if (this.popupOverlayRef) {
      this.popupOverlayRef.dispose();
      this.popupOverlayRef = null;
    }
  }

  public Step(direction: 'right' | 'left') {
    this.facade.step(direction);
  }

  public SelectTimeRangeCriteria(criteriaID: number) {}

  public SaveQuickSearch(quickSearch: any) {}

  public GetFilter(criteriaObject: any) {
    return true;
  }

  private getElementReference() {
    return document.getElementById('timeRangeSelector');
  }

  ngOnInit() {}

  MoveRange(direction: 'left' | 'right') {
    this.facade.moveRange(direction);
  }

  ZoomRange(direction: 'in' | 'out') {
    this.facade.zoomRange(direction);
  }
}
