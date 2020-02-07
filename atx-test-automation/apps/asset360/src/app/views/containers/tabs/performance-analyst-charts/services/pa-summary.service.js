import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SummaryCharts } from '../models/summary-charts';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
var PaSummaryService = /** @class */ (function () {
    function PaSummaryService(assetTreeFacadeFactory) {
        this.colors = [
            '#1F497D',
            '#6699cc',
            '#bfbfbf',
            '#cc6633',
            '#76933c',
            '#993333',
            '#666699',
            '#F79646',
            '#9BBB59',
            '#ff9999',
            '#ffcc66',
            '#ccccff'
        ];
        this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
    }
    PaSummaryService.prototype.getColor = function (i) {
        return this.colors[Math.abs(i) % this.colors.length];
    };
    PaSummaryService.prototype.selectAsset = function (selectedAssetGuid) {
        this.assetTreeFacade.selectAssetByGUID(selectedAssetGuid);
        return true;
    };
    PaSummaryService.prototype.configureSummaryCharts = function (summaryChartParameters) {
        var _this = this;
        var summaryChart = new SummaryCharts();
        if (summaryChartParameters.issuesAndAlerts.length > 0) {
            var selectedAssetGuid_1 = summaryChartParameters.selectedAssetGuid;
            var issuesAndAlerts = summaryChartParameters.issuesAndAlerts.slice().sort(function (a, b) {
                if (a.Asset.GlobalId === selectedAssetGuid_1 && b.Asset.GlobalId !== selectedAssetGuid_1) {
                    return -1;
                }
                else if (b.Asset.GlobalId === selectedAssetGuid_1 && a.Asset.GlobalId !== selectedAssetGuid_1) {
                    return 1;
                }
                else if (a.Asset.DisplayOrder < b.Asset.DisplayOrder) {
                    return -1;
                }
                else if (a.Asset.DisplayOrder > b.Asset.DisplayOrder) {
                    return 1;
                }
                else if (a.Asset.AssetDesc < b.Asset.AssetDesc) {
                    return -1;
                }
                else if (a.Asset.AssetDesc > b.Asset.AssetDesc) {
                    return 1;
                }
                return 0;
            });
            var count = 0;
            var _loop_1 = function (data) {
                var show = false;
                var color = this_1.getColor(count);
                summaryChart.activeAlertsCount += data.AlertsCount;
                summaryChart.issuesCount += data.OpenIssuesCount;
                summaryChart.impactTotal += data.Impact;
                if (data.AlertsCount > 0) {
                    summaryChart.alertsPoints.push({
                        name: data.Asset.AssetAbbrev,
                        y: data.AlertsCount,
                        color: color,
                        events: {
                            click: function (_event) { return _this.selectAsset(data.Asset.GlobalId); }
                        }
                    });
                    show = true;
                }
                if (data.OpenIssuesCount > 0) {
                    summaryChart.issuesPoints.push({
                        name: data.Asset.AssetAbbrev,
                        y: data.OpenIssuesCount,
                        color: color,
                        events: {
                            click: function (_event) { return _this.selectAsset(data.Asset.GlobalId); }
                        }
                    });
                    show = true;
                }
                if (data.Impact > 0) {
                    summaryChart.impactPoints.push({
                        name: data.Asset.AssetAbbrev,
                        y: Math.round(data.Impact / 1000),
                        color: color,
                        events: {
                            click: function (_event) { return _this.selectAsset(data.Asset.GlobalId); }
                        }
                    });
                    show = true;
                }
                if (show) {
                    count++;
                    summaryChart.legend.push({ style: { 'background-color': color }, assetDesc: data.Asset.AssetDesc });
                }
            };
            var this_1 = this;
            for (var _i = 0, issuesAndAlerts_1 = issuesAndAlerts; _i < issuesAndAlerts_1.length; _i++) {
                var data = issuesAndAlerts_1[_i];
                _loop_1(data);
            }
        }
        return of(summaryChart);
    };
    PaSummaryService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AssetTreeFacadeFactory])
    ], PaSummaryService);
    return PaSummaryService;
}());
export { PaSummaryService };
//# sourceMappingURL=pa-summary.service.js.map