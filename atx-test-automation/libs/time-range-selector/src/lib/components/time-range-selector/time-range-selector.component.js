import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TimeRangeSelectorFacade } from '../../state/time-range-selector.facade';
import { Overlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SelectionPopupComponent } from '../selection-popup/selection-popup.component';
import { IndicatorPopupComponent } from '../indicator-popup/indicator-popup.component';
import { map, withLatestFrom } from 'rxjs/operators';
var TimeRangeSelectorComponent = /** @class */ (function () {
    function TimeRangeSelectorComponent(breakpointObserver, overlay, facade) {
        var _this = this;
        this.breakpointObserver = breakpointObserver;
        this.overlay = overlay;
        this.facade = facade;
        // Flag for turning on and off the live mode.
        this.IsLive = false;
        this.IsFullSize = false;
        this.SelectionChanged = new EventEmitter();
        this.Ball = 0;
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
        this.PopupOpened$.pipe(withLatestFrom(facade.showSelection$), map(function (data) {
            return { open: data[0], selection: data[1] };
        })).subscribe(function (vals) {
            if (vals.open) {
                _this.openPopup(vals.selection);
            }
            else {
                _this.closePopup();
            }
        });
        this.bpObserver = breakpointObserver.observe([Breakpoints.HandsetPortrait]);
        this.bpObserver.subscribe(function () {
            _this.updateLayout();
        });
        this.updateLayout();
    }
    TimeRangeSelectorComponent.prototype.ngAfterViewInit = function () {
        if (this.origin) {
            console.log('Origin Set');
        }
    };
    TimeRangeSelectorComponent.prototype.OnSelectionChanged = function (newValues) {
        this.facade.configureTimeRangeSelector(newValues.SelectionStart, newValues.SelectionEnd, newValues.Indicator, undefined, undefined, undefined);
    };
    TimeRangeSelectorComponent.prototype.updateLayout = function () {
        console.log('Updating Layout');
        this.IsFullSize = !this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
    };
    TimeRangeSelectorComponent.prototype.LiveClicked = function () {
        this.IsLive = !this.IsLive;
    };
    TimeRangeSelectorComponent.prototype.ShowPopup = function () {
        this.facade.openPopup();
    };
    TimeRangeSelectorComponent.prototype.openPopup = function (selection) {
        var _this = this;
        if (selection === void 0) { selection = true; }
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
                var myPortal = new ComponentPortal(SelectionPopupComponent);
                this.popupOverlayRef.attach(myPortal);
            }
            else {
                var myPortal = new ComponentPortal(IndicatorPopupComponent);
                this.popupOverlayRef.attach(myPortal);
            }
            this.popupOverlayRef.backdropClick().subscribe(function () {
                _this.facade.closePopup();
            });
        }
    };
    TimeRangeSelectorComponent.prototype.closePopup = function () {
        if (this.popupOverlayRef) {
            this.popupOverlayRef.dispose();
            this.popupOverlayRef = null;
        }
    };
    TimeRangeSelectorComponent.prototype.Step = function (direction) {
        this.facade.step(direction);
    };
    TimeRangeSelectorComponent.prototype.SelectTimeRangeCriteria = function (criteriaID) { };
    TimeRangeSelectorComponent.prototype.SaveQuickSearch = function (quickSearch) { };
    TimeRangeSelectorComponent.prototype.GetFilter = function (criteriaObject) {
        return true;
    };
    TimeRangeSelectorComponent.prototype.getElementReference = function () {
        return document.getElementById('timeRangeSelector');
    };
    TimeRangeSelectorComponent.prototype.ngOnInit = function () { };
    TimeRangeSelectorComponent.prototype.MoveRange = function (direction) {
        this.facade.moveRange(direction);
    };
    TimeRangeSelectorComponent.prototype.ZoomRange = function (direction) {
        this.facade.zoomRange(direction);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimeRangeSelectorComponent.prototype, "SelectionChanged", void 0);
    tslib_1.__decorate([
        ViewChild(CdkOverlayOrigin),
        tslib_1.__metadata("design:type", CdkOverlayOrigin)
    ], TimeRangeSelectorComponent.prototype, "origin", void 0);
    TimeRangeSelectorComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-time-range-selector',
            templateUrl: './time-range-selector.component.html',
            styleUrls: ['./time-range-selector.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BreakpointObserver, Overlay, TimeRangeSelectorFacade])
    ], TimeRangeSelectorComponent);
    return TimeRangeSelectorComponent;
}());
export { TimeRangeSelectorComponent };
//# sourceMappingURL=time-range-selector.component.js.map