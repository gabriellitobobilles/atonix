import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './containers/summary/summary.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { paSummaryReducer } from './state/pa-summary.reducer';
import { PaSummaryEffects } from './state/pa-summary.effects';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { routes } from './performance-analyst-charts-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { PaSummaryFacade } from './state/pa-summary.facade';
import { MaterialModule } from '@AtonixWebSites/material';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { HChartModule } from '@AtonixWebSites/hchart';
var PerformanceAnalystChartsModule = /** @class */ (function () {
    function PerformanceAnalystChartsModule() {
    }
    PerformanceAnalystChartsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                HChartModule.forRoot(),
                StoreModule.forFeature('paSummaryState', paSummaryReducer),
                EffectsModule.forFeature([PaSummaryEffects]),
                HighchartsChartModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SummaryComponent, DonutChartComponent],
            providers: [PaSummaryFacade]
        })
    ], PerformanceAnalystChartsModule);
    return PerformanceAnalystChartsModule;
}());
export { PerformanceAnalystChartsModule };
//# sourceMappingURL=performance-analyst-charts.module.js.map