import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PaSummaryFacade } from '../../state/pa-summary.facade';
import { AtonixDonutChart, HChartService } from '@AtonixWebSites/hchart';
import * as _ from 'lodash';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
var SummaryComponent = /** @class */ (function () {
    function SummaryComponent(hChartService, paSummaryFacade, assetTreeFacadeFactory, userFacade) {
        this.hChartService = hChartService;
        this.paSummaryFacade = paSummaryFacade;
        this.userFacade = userFacade;
        this.unsubscribe = new Subject();
        this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
    }
    SummaryComponent.prototype.ngOnInit = function () {
        this.Highcharts = this.hChartService.getHCharts();
        this.summaryCharts$ = this.paSummaryFacade.summaryCharts$;
        this.pending$ = this.paSummaryFacade.pending$;
        this.impactsChart = new AtonixDonutChart('Impacts ($k)', 'NO IMPACTS');
        this.issuesChart = new AtonixDonutChart('Issues', 'NO OPEN ISSUES');
        this.alertsChart = new AtonixDonutChart('Alerts', 'NO ALERTS');
        this.currentState$ = combineLatest(this.assetTreeFacade.selectedAssetGuid$, this.userFacade.selectedAppContext$).pipe(map(function (_a) {
            var assetGuid = _a[0], appContext = _a[1];
            return { assetGuid: assetGuid, appContext: appContext };
        }));
        this.updateCountIssuesAndAlerts();
        this.updateDonutCharts();
    };
    SummaryComponent.prototype.updateDonutCharts = function () {
        var _this = this;
        this.paSummaryFacade.summaryCharts$.pipe(takeUntil(this.unsubscribe)).subscribe(function (issueAndAlerts) {
            if (!_.isNil(issueAndAlerts)) {
                _this.alertsChart.updateSeries("" + issueAndAlerts.activeAlertsCount.toFixed(0), issueAndAlerts.alertsPoints);
                _this.impactsChart.updateSeries("" + (issueAndAlerts.impactTotal / 1000).toFixed(0), issueAndAlerts.impactPoints);
                _this.issuesChart.updateSeries("" + issueAndAlerts.issuesCount.toFixed(0), issueAndAlerts.issuesPoints);
            }
        });
    };
    SummaryComponent.prototype.updateCountIssuesAndAlerts = function () {
        var _this = this;
        this.currentState$.pipe(takeUntil(this.unsubscribe)).subscribe(function (_a) {
            var assetGuid = _a.assetGuid, appContext = _a.appContext;
            if (!_.isNil(appContext) && !_.isNil(assetGuid)) {
                _this.paSummaryFacade.countIssuesAndAlerts({
                    appContext: appContext.DisplayName,
                    assetID: assetGuid
                });
            }
        });
    };
    SummaryComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    SummaryComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-summary',
            templateUrl: './summary.component.html',
            styleUrls: ['./summary.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HChartService,
            PaSummaryFacade,
            AssetTreeFacadeFactory,
            UserFacade])
    ], SummaryComponent);
    return SummaryComponent;
}());
export { SummaryComponent };
//# sourceMappingURL=summary.component.js.map