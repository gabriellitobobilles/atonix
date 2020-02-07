import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IssuesModelService } from '@AtonixWebSites/api';
import * as paSummaryActions from './pa-summary.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PaSummaryService } from '../services/pa-summary.service';
var PaSummaryEffects = /** @class */ (function () {
    function PaSummaryEffects(actions$, paSummaryService, issuesModelService) {
        var _this = this;
        this.actions$ = actions$;
        this.paSummaryService = paSummaryService;
        this.issuesModelService = issuesModelService;
        this.assetViewFromId$ = this.actions$.pipe(ofType(paSummaryActions.PaActionTypes.CountIssueAndAlerts)).pipe(map(function (action) { return action.payload; }), switchMap(function (viewParameters) {
            return _this.issuesModelService.countIssuesAndAlerts(viewParameters).pipe(switchMap(function (returnObject) { return [
                new paSummaryActions.ConfigurePieCharts({ selectedAssetGuid: viewParameters.assetID, issuesAndAlerts: returnObject })
            ]; }), catchError(function (error) { return of(new paSummaryActions.CountIssueAndAlertsFailure(error)); }));
        }));
        this.configurePieCharts$ = this.actions$.pipe(ofType(paSummaryActions.PaActionTypes.ConfigurePieCharts)).pipe(map(function (action) { return action.payload; }), switchMap(function (viewParameters) {
            return _this.paSummaryService
                .configureSummaryCharts(viewParameters)
                .pipe(map(function (returnObject) { return new paSummaryActions.ConfigurePieChartsSuccess(returnObject); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], PaSummaryEffects.prototype, "assetViewFromId$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], PaSummaryEffects.prototype, "configurePieCharts$", void 0);
    PaSummaryEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            PaSummaryService,
            IssuesModelService])
    ], PaSummaryEffects);
    return PaSummaryEffects;
}());
export { PaSummaryEffects };
//# sourceMappingURL=pa-summary.effects.js.map