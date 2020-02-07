import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { SummaryCharts } from '../models/summary-charts';
import { SummaryChartsParameters } from '../models/summary-charts-parameters';
import { AssetTreeFacadeFactory, AssetTreeFacade } from '@AtonixWebSites/asset-tree';

@Injectable({
  providedIn: 'root'
})
export class PaSummaryService {
  constructor(assetTreeFacadeFactory: AssetTreeFacadeFactory) {
    this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
  }

  assetTreeFacade: AssetTreeFacade;
  colors: string[] = [
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

  getColor(i) {
    return this.colors[Math.abs(i) % this.colors.length];
  }
  selectAsset(selectedAssetGuid: string): boolean {
    this.assetTreeFacade.selectAssetByGUID(selectedAssetGuid);
    return true;
  }
  configureSummaryCharts(summaryChartParameters: SummaryChartsParameters): Observable<SummaryCharts> {
    const summaryChart = new SummaryCharts();
    if (summaryChartParameters.issuesAndAlerts.length > 0) {
      const selectedAssetGuid = summaryChartParameters.selectedAssetGuid;
      const issuesAndAlerts = [...summaryChartParameters.issuesAndAlerts].sort((a, b) => {
        if (a.Asset.GlobalId === selectedAssetGuid && b.Asset.GlobalId !== selectedAssetGuid) {
          return -1;
        } else if (b.Asset.GlobalId === selectedAssetGuid && a.Asset.GlobalId !== selectedAssetGuid) {
          return 1;
        } else if (a.Asset.DisplayOrder < b.Asset.DisplayOrder) {
          return -1;
        } else if (a.Asset.DisplayOrder > b.Asset.DisplayOrder) {
          return 1;
        } else if (a.Asset.AssetDesc < b.Asset.AssetDesc) {
          return -1;
        } else if (a.Asset.AssetDesc > b.Asset.AssetDesc) {
          return 1;
        }
        return 0;
      });
      let count = 0;
      for (const data of issuesAndAlerts) {
        let show = false;
        const color = this.getColor(count);
        summaryChart.activeAlertsCount += data.AlertsCount;
        summaryChart.issuesCount += data.OpenIssuesCount;
        summaryChart.impactTotal += data.Impact;

        if (data.AlertsCount > 0) {
          summaryChart.alertsPoints.push({
            name: data.Asset.AssetAbbrev,
            y: data.AlertsCount,
            color,
            events: {
              click: (_event: Event) => this.selectAsset(data.Asset.GlobalId)
            }
          });
          show = true;
        }
        if (data.OpenIssuesCount > 0) {
          summaryChart.issuesPoints.push({
            name: data.Asset.AssetAbbrev,
            y: data.OpenIssuesCount,
            color,
            events: {
              click: (_event: Event) => this.selectAsset(data.Asset.GlobalId)
            }
          });
          show = true;
        }
        if (data.Impact > 0) {
          summaryChart.impactPoints.push({
            name: data.Asset.AssetAbbrev,
            y: Math.round(data.Impact / 1000),
            color,
            events: {
              click: (_event: Event) => this.selectAsset(data.Asset.GlobalId)
            }
          });
          show = true;
        }
        if (show) {
          count++;
          summaryChart.legend.push({ style: { 'background-color': color }, assetDesc: data.Asset.AssetDesc });
        }
      }
    }
    return of(summaryChart);
  }
}
