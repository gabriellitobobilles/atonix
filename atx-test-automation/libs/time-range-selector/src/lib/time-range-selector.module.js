import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeRangeSelectorComponent } from './components/time-range-selector/time-range-selector.component';
import { TimeSliderComponent } from './components/time-slider/time-slider.component';
import { WatchElementSizeDirective } from './directives/watch-element-size.directive';
import { TimeRangeSelectorFacade } from './state/time-range-selector.facade';
import { reducer } from './state/time-range-selector.reducer';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { TimeIncrementerComponent } from './components/time-incrementer/time-incrementer.component';
import { LiveButtonComponent } from './components/live-button/live-button.component';
import { SelectionPopupComponent } from './components/selection-popup/selection-popup.component';
import { IndicatorPopupComponent } from './components/indicator-popup/indicator-popup.component';
import { JumpToListComponent } from './components/jump-to-list/jump-to-list.component';
import { TimeRangeSelectorEffects } from './state/time-range-selector.effects';
import { EffectsModule } from '@ngrx/effects';
var TimeRangeSelectorModule = /** @class */ (function () {
    function TimeRangeSelectorModule() {
    }
    TimeRangeSelectorModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FontAwesomeModule,
                ReactiveFormsModule,
                OverlayModule,
                MatInputModule,
                MatSelectModule,
                MatFormFieldModule,
                MatDatepickerModule,
                StoreModule.forFeature('time-range-selector', reducer),
                EffectsModule.forFeature([TimeRangeSelectorEffects])
            ],
            declarations: [
                TimeRangeSelectorComponent,
                TimeSliderComponent,
                WatchElementSizeDirective,
                RangeSliderComponent,
                TimeIncrementerComponent,
                LiveButtonComponent,
                SelectionPopupComponent,
                IndicatorPopupComponent,
                JumpToListComponent
            ],
            exports: [TimeRangeSelectorComponent],
            providers: [TimeRangeSelectorFacade],
            entryComponents: [SelectionPopupComponent, IndicatorPopupComponent]
        })
    ], TimeRangeSelectorModule);
    return TimeRangeSelectorModule;
}());
export { TimeRangeSelectorModule };
//# sourceMappingURL=time-range-selector.module.js.map