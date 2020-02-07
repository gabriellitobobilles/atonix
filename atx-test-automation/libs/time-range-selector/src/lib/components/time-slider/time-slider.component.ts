import * as _ from 'lodash';
import { Component, OnInit, Input, Output, LOCALE_ID, Inject, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';

interface IDivision {
  text: string;
  shortText: string;
  start: number;
  end: number;
}

@Component({
  selector: 'atx-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit, OnChanges {
  @Input() RangeStart?: Date;
  @Input() RangeEnd?: Date;
  @Input() SelectionStart?: Date;
  @Input() SelectionEnd?: Date;
  @Input() Indicator?: Date;
  @Input() NowMarker?: Date;
  @Input() ShowSelection?: boolean;
  @Input() ShowIndicator?: boolean;
  @Input() ShowNowMarker?: boolean;

  @Output()
  SelectionChanged = new EventEmitter<{
    SelectionStart?: Date;
    SelectionEnd?: Date;
    Indicator?: Date;
    RangeStart?: Date;
    RangeEnd?: Date;
  }>();

  @Output() ShowPopup = new EventEmitter();

  // Used for deciding how many divisions to draw
  private divisionFactor = 0.5;

  // These will be used to calculate the number of divisions to show
  private hourTicks = 1000 * 60 * 60;
  private shiftTicks = this.hourTicks * 8;
  private dayTicks = this.hourTicks * 24;
  private weekTicks = this.dayTicks * 7;
  private monthTicks = this.dayTicks * 30;
  private quarterTicks = this.dayTicks * 90;
  private yearTicks = this.dayTicks * 365;

  // These are the bindings for the svg.  They must be updated whenever the screen size changes.
  public Ball: number;
  public Width = 100;
  public Height = 100;
  public Left = 0;
  public BarTop: number;
  public Divisions: IDivision[];
  public BarHeight: number;
  public SelectionWidth: number;

  // These are used for binding scope values to the values in the template.  They are translated to the units of the template
  // and they can be updated without immediately updating the scope, such as when dragging the bars.
  public SelectionStartPosition: number;
  public SelectionEndPosition: number;
  public IndicatorPosition: number;
  public NowMarkerPosition: number;

  // When these are not null the system knows that the user is dragging something.
  private dragStart: { height: number; width: number; left: number } = null;
  private dragEnd: { height: number; width: number; left: number } = null;
  private dragSelected: {
    left: number;
    width: number;
    start: number;
    end: number;
  } = null;
  private dragIndicator: { height: number; width: number; left: number } = null;
  private clickInfo: any = null;

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.Redraw();
  }

  SizeChanged($event: { width: number; height: number; left: number }) {
    this.Width = $event.width;
    this.Height = $event.height;
    this.Left = $event.left;
    this.Redraw();
  }

  private getRangeStart() {
    let result: Date = this.RangeStart;
    // Make sure the range is set to something.
    if (_.isNil(this.RangeStart)) {
      if (this.SelectionStart) {
        result = this.SelectionStart;
      } else if (this.Indicator) {
        result = this.Indicator;
        result.setMonth(result.getMonth() - 1);
      } else {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        result = d;
      }
    }
    return result;
  }

  private getRangeEnd() {
    let result: Date = this.RangeEnd;
    if (_.isNil(this.RangeEnd)) {
      if (this.SelectionEnd) {
        result = this.SelectionEnd;
      } else if (this.Indicator) {
        result = this.Indicator;
      } else {
        result = new Date();
      }
    }
    return result;
  }

  // Translate screen coordinates to a date.
  public getCoordinateFromDate(myDate: Date) {
    // Requires myDate, rangeStart, rangeEnd and width to be set.  If any of these are falsy return 0
    let position = 0;
    if (myDate && this.Width) {
      const d1 = myDate.getTime();
      const r1 = this.getRangeStart().getTime();
      const r2 = this.getRangeEnd().getTime();
      position = ((d1 - r1) / (r2 - r1)) * this.Width;
      position = Math.max(position, 0);
      position = Math.min(position, this.Width);
    }
    return position;
  }

  Redraw() {
    const myRangeStart = this.getRangeStart();
    const myRangeEnd = this.getRangeEnd();

    this.dragStart = null;
    this.dragEnd = null;
    this.dragSelected = null;
    this.dragIndicator = null;
    this.clickInfo = null;

    this.BarTop = Math.min(20, this.Height);
    this.BarHeight = this.Height - this.BarTop;

    let rangeWidth = myRangeEnd.getTime() - myRangeStart.getTime();
    if (rangeWidth <= 0) {
      rangeWidth = 1;
    }

    this.SelectionStartPosition = this.getCoordinateFromDate(this.SelectionStart);
    this.SelectionEndPosition = this.getCoordinateFromDate(this.SelectionEnd);
    this.SelectionWidth = this.SelectionEndPosition - this.SelectionStartPosition;

    if (this.SelectionEndPosition < this.SelectionStartPosition) {
      const t = this.SelectionEndPosition;
      this.SelectionEndPosition = this.SelectionStartPosition;
      this.SelectionStartPosition = t;
    }

    this.IndicatorPosition = this.Indicator ? this.getCoordinateFromDate(this.Indicator) : null;

    this.NowMarkerPosition = this.NowMarker ? this.getCoordinateFromDate(this.NowMarker) : null;

    // I am currently targeting about 10 divisions.  If there are less then 2 divisions
    // or more than 10 divisions it should use a different time range.
    this.Divisions = [];
    const fullTicks = myRangeEnd.getTime() - myRangeStart.getTime();
    if (fullTicks < this.hourTicks * 10) {
      // hour divisions
      let startTrimmedToHour = new Date(
        myRangeStart.getFullYear(),
        myRangeStart.getMonth(),
        myRangeStart.getDate(),
        myRangeStart.getHours()
      );
      if (startTrimmedToHour.getTime() + this.hourTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmedToHour.setHours(startTrimmedToHour.getHours() + 1);
      }

      while (startTrimmedToHour.getTime() < myRangeEnd.getTime()) {
        const nextHour = new Date(startTrimmedToHour.getTime());
        nextHour.setHours(nextHour.getHours() + 1);

        let text = formatDate(startTrimmedToHour, 'MM/dd ha', this.localeId);
        let shortText = formatDate(startTrimmedToHour, 'ha', this.localeId);
        if (nextHour.getTime() - this.hourTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: Math.max(0, this.getCoordinateFromDate(startTrimmedToHour)),
          end: Math.min(this.Width, this.getCoordinateFromDate(nextHour))
        });
        startTrimmedToHour = nextHour;
      }
    } else if (fullTicks < this.shiftTicks * 10) {
      // 8 hour divisions
      let startTrimmedToHour = new Date(
        myRangeStart.getFullYear(),
        myRangeStart.getMonth(),
        myRangeStart.getDate(),
        myRangeStart.getHours() - (myRangeStart.getHours() % 8)
      );
      if (startTrimmedToHour.getTime() + this.hourTicks * 8 * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmedToHour.setHours(startTrimmedToHour.getHours() + 8);
      }

      while (startTrimmedToHour.getTime() < myRangeEnd.getTime()) {
        const nextHour = new Date(startTrimmedToHour.getTime());
        nextHour.setHours(nextHour.getHours() + 8);

        let text = formatDate(startTrimmedToHour, 'MM/dd ha-', this.localeId) + formatDate(nextHour, 'ha', this.localeId);
        let shortText = formatDate(startTrimmedToHour, 'ha', this.localeId);
        if (nextHour.getTime() - this.hourTicks * 8 * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmedToHour),
          end: Math.min(this.Width, this.getCoordinateFromDate(nextHour))
        });
        startTrimmedToHour = nextHour;
      }
    } else if (fullTicks < this.dayTicks * 10) {
      // day divisions
      let startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate());
      if (startTrimmed.getTime() + this.dayTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setDate(startTrimmed.getDate() + 1);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setDate(next.getDate() + 1);

        let text = formatDate(startTrimmed, 'MM/dd', this.localeId);
        let shortText = formatDate(startTrimmed, 'dd', this.localeId);
        if (next.getTime() - this.dayTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else if (fullTicks < this.dayTicks * 35) {
      // 3 day divisions
      let startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), myRangeStart.getDate());
      if (startTrimmed.getTime() + this.dayTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setDate(startTrimmed.getDate() + 1);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setDate(next.getDate() + 3);

        let text = formatDate(startTrimmed, 'MM/dd-', this.localeId) + formatDate(next, 'MM/dd', this.localeId);
        let shortText = formatDate(startTrimmed, 'dd', this.localeId);
        if (next.getTime() - this.dayTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else if (fullTicks < this.weekTicks * 10) {
      // week divisions
      let startTrimmed = new Date(
        myRangeStart.getFullYear(),
        myRangeStart.getMonth(),
        myRangeStart.getDate() - myRangeStart.getDay()
      );
      if (startTrimmed.getTime() + this.weekTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setDate(startTrimmed.getDate() + 7);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setDate(next.getDate() + 7);

        let text = 'Week ' + formatDate(startTrimmed, 'w MM/dd-', this.localeId) + formatDate(next, 'MM/dd', this.localeId);
        let shortText = formatDate(startTrimmed, 'MM/dd', this.localeId);
        if (next.getTime() - this.weekTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else if (fullTicks < this.monthTicks * 10) {
      // month divisions
      let startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth(), 1);
      if (startTrimmed.getTime() + this.monthTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setMonth(startTrimmed.getMonth() + 1);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setMonth(next.getMonth() + 1);

        let text = formatDate(startTrimmed, 'MMM yyyy', this.localeId);
        let shortText = formatDate(startTrimmed, 'MMM', this.localeId);
        if (next.getTime() - this.monthTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else if (fullTicks < this.quarterTicks * 10) {
      // quarter divisions
      let startTrimmed = new Date(myRangeStart.getFullYear(), myRangeStart.getMonth() - (myRangeStart.getMonth() % 3), 1);
      if (startTrimmed.getTime() + this.quarterTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setMonth(startTrimmed.getMonth() + 3);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setMonth(next.getMonth() + 3);

        let text = 'Q' + (Math.floor(startTrimmed.getMonth() / 3) + 1) + formatDate(startTrimmed, ' yyyy', this.localeId);
        let shortText = 'Q' + (Math.floor(startTrimmed.getMonth() / 3) + 1);
        if (next.getTime() - this.quarterTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else if (fullTicks < this.yearTicks * 20) {
      // Year divisions
      let startTrimmed = new Date(myRangeStart.getFullYear(), 0, 1);
      if (startTrimmed.getTime() + this.yearTicks * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setFullYear(startTrimmed.getFullYear() + 1);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setFullYear(next.getFullYear() + 1);

        let text = formatDate(startTrimmed, 'yyyy', this.localeId);
        let shortText = formatDate(startTrimmed, `'yy`, this.localeId);
        if (next.getTime() - this.yearTicks * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    } else {
      // Decade divisions
      let startTrimmed = new Date(myRangeStart.getFullYear() - (myRangeStart.getFullYear() % 10), 0, 1);
      if (startTrimmed.getTime() + this.yearTicks * 10 * this.divisionFactor < myRangeStart.getTime()) {
        startTrimmed.setFullYear(startTrimmed.getFullYear() + 10);
      }

      while (startTrimmed.getTime() < myRangeEnd.getTime()) {
        const next = new Date(startTrimmed.getTime());
        next.setFullYear(next.getFullYear() + 10);

        let text = formatDate(startTrimmed, 'yyyy', this.localeId);
        let shortText = formatDate(startTrimmed, `'yy`, this.localeId);
        if (next.getTime() - this.yearTicks * 10 * this.divisionFactor > myRangeEnd.getTime()) {
          text = '';
          shortText = '';
        }

        this.Divisions.push({
          text,
          shortText,
          start: this.getCoordinateFromDate(startTrimmed),
          end: Math.min(this.Width, this.getCoordinateFromDate(next))
        });
        startTrimmed = next;
      }
    }
  }

  SelectDivision($event, division: IDivision) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.ShowSelection) {
      this.SelectionChanged.emit({
        SelectionStart: this.GetDateFromCoordinate(division.start),
        SelectionEnd: this.GetDateFromCoordinate(division.end)
      });
    } else if (this.ShowIndicator) {
      this.SelectionChanged.emit({ Indicator: this.GetDateFromCoordinate(division.start) });
    }

    this.clickInfo = null;
  }

  GetDateFromCoordinate(coord: number) {
    let result = new Date();
    if (this.RangeStart && this.RangeEnd && this.Width) {
      const rmin = this.getRangeStart();
      const rmax = this.getRangeEnd();
      if (!isNaN(rmin.getTime()) && !isNaN(rmax.getTime())) {
        result = new Date(rmin.getTime() + (coord / this.Width) * (rmax.getTime() - rmin.getTime()));
      }
      if (isNaN(result.getTime())) {
        result = new Date();
      }
    }
    return result;
  }

  Nudge(val: number) {
    if (isNaN(val)) {
      return 0;
    } else if (val < 0) {
      return 0;
    } else if (val > this.Width) {
      return this.Width;
    }
    return val;
  }

  GetTransform(value: number, value2?: number) {
    let result = '';

    if (_.isNil(value) || isNaN(value)) {
      value = 0;
    }

    if (_.isNil(value2)) {
      result = 'translate(' + String(this.Nudge(value)) + ')';
    } else {
      if (isNaN(value2)) {
        value2 = 0;
      }
      result = 'translate(' + String(this.Nudge(value)) + ',' + String(value2) + ')';
    }

    return result;
  }

  // Translate a screen coordinates to a date.
  private getDateFromCoordinate(coord: number) {
    let result = new Date();
    if (this.RangeStart && this.RangeEnd && this.Width) {
      const rmin = this.RangeStart;
      const rmax = this.RangeEnd;
      if (!isNaN(rmin.getTime()) && !isNaN(rmax.getTime())) {
        result = new Date(rmin.getTime() + (coord / this.Width) * (rmax.getTime() - rmin.getTime()));
      }
      if (isNaN(result.getTime())) {
        result = new Date();
      }
    }
    return result;
  }

  private getClientY($event: MouseEvent) {
    let result = 0;
    if ($event.clientY !== undefined) {
      result = $event.clientY;
    } else {
      const e = $event as any;
      if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
        result = e.originalEvent.targetTouches[0].clientY || 0;
      }
    }
    return result;
  }

  private getClientX($event: MouseEvent) {
    let result = 0;
    if ($event.clientX !== undefined) {
      result = $event.clientX;
    } else {
      const e = $event as any;
      if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
        result = e.originalEvent.targetTouches[0].clientX || 0;
      }
    }
    return result;
  }

  private mouseUpEventHolder = (ev: MouseEvent) => {
    try {
      const myEvent = new MouseEvent('mouseup', {
        clientX: ev.clientX,
        clientY: ev.clientY
      });
      document.querySelector('#navContainer').dispatchEvent(myEvent);
    } catch (e) {
      console.error('Error in mouse up:' + JSON.stringify(e));
    }
  };

  private mouseMoveEventHolder = (ev: MouseEvent) => {
    try {
      const myEvent = new MouseEvent('mousemove', {
        clientX: ev.clientX,
        clientY: ev.clientY
      });
      document.querySelector('#navContainer').dispatchEvent(myEvent);
    } catch (e) {
      console.error('Error in mouse move:' + JSON.stringify(e));
    }
  };

  // This should initiate a drag operation.
  public Mousedown($event: MouseEvent, selection) {
    window.addEventListener('mouseup', this.mouseUpEventHolder);
    window.addEventListener('mousemove', this.mouseMoveEventHolder);

    $event.preventDefault();
    $event.stopPropagation();

    this.clickInfo = $event;

    const boundingRect = { height: this.Height, width: this.Width, left: this.Left };

    if (selection === 'bar') {
      const clicked = this.getClientX($event) - this.Left;
      this.dragSelected = {
        left: this.Left,
        width: this.Width,
        start: clicked - this.SelectionStartPosition,
        end: this.SelectionEndPosition - clicked
      };
    } else if (selection === 'start') {
      this.dragStart = boundingRect;
    } else if (selection === 'end') {
      this.dragEnd = boundingRect;
    } else if (selection === 'indicator') {
      this.dragIndicator = boundingRect;
    }
  }

  // This should cause something to move if a drag operation is in progress.
  public Mousemove($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.dragSelected) {
      const newStart = this.getClientX($event) - this.dragSelected.left - this.dragSelected.start;
      const newEnd = this.getClientX($event) - this.dragSelected.left + this.dragSelected.end;
      if (newStart <= 0) {
        this.SelectionStartPosition = 0;
        this.SelectionEndPosition = this.dragSelected.start + this.dragSelected.end;
      } else if (newEnd >= this.dragSelected.width) {
        this.SelectionStartPosition = this.dragSelected.width - (this.dragSelected.start + this.dragSelected.end);
        this.SelectionEndPosition = this.dragSelected.width;
      } else {
        this.SelectionStartPosition = newStart;
        this.SelectionEndPosition = newEnd;
      }
    } else if (this.dragStart) {
      this.SelectionStartPosition = this.getClientX($event) - this.dragStart.left;
      this.SelectionStartPosition = Math.max(0, this.SelectionStartPosition);
      this.SelectionStartPosition = Math.min(this.dragStart.width, this.SelectionStartPosition);
      if (this.SelectionStartPosition > this.SelectionEndPosition) {
        const t = this.SelectionStartPosition;
        this.SelectionStartPosition = this.SelectionEndPosition;
        this.SelectionEndPosition = t;
        this.dragEnd = this.dragStart;
        this.dragStart = null;
      }
    } else if (this.dragEnd) {
      this.SelectionEndPosition = this.getClientX($event) - this.dragEnd.left;
      this.SelectionEndPosition = Math.max(0, this.SelectionEndPosition);
      this.SelectionEndPosition = Math.min(this.dragEnd.width, this.SelectionEndPosition);
      if (this.SelectionStartPosition > this.SelectionEndPosition) {
        const t = this.SelectionStartPosition;
        this.SelectionStartPosition = this.SelectionEndPosition;
        this.SelectionEndPosition = t;
        this.dragStart = this.dragEnd;
        this.dragEnd = null;
      }
    } else if (this.dragIndicator) {
      this.IndicatorPosition = this.getClientX($event) - this.dragIndicator.left;
      this.IndicatorPosition = Math.max(0, this.IndicatorPosition);
      this.IndicatorPosition = Math.min(this.dragIndicator.width, this.IndicatorPosition);
    }
  }

  // The completion of a drag operation.
  public Mouseup($event) {
    window.removeEventListener('mouseup', this.mouseUpEventHolder);
    window.removeEventListener('mousemove', this.mouseMoveEventHolder);

    $event.preventDefault();
    $event.stopPropagation();

    if (
      this.clickInfo &&
      this.getClientX(this.clickInfo) === this.getClientX($event) &&
      this.getClientY(this.clickInfo) === this.getClientY($event)
    ) {
      this.ShowPopup.emit();
    } else if (this.dragIndicator) {
      this.SelectionChanged.emit({ Indicator: this.getDateFromCoordinate(this.IndicatorPosition) });
    } else {
      this.SelectionChanged.emit({
        SelectionStart: this.getDateFromCoordinate(this.SelectionStartPosition),
        SelectionEnd: this.getDateFromCoordinate(this.SelectionEndPosition)
      });
    }

    this.dragSelected = null;
    this.dragStart = null;
    this.dragEnd = null;
    this.dragIndicator = null;
    this.clickInfo = null;
  }
}
