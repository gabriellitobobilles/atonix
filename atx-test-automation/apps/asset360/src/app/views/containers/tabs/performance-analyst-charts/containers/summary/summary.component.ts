import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserFacade } from '@AtonixWebSites/auth';
import { IAppContext } from '@AtonixWebSites/api';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PaSummaryFacade } from '../../state/pa-summary.facade';
import { SummaryCharts } from '../../models/summary-charts';
import { AtonixDonutChart, HChartService } from '@AtonixWebSites/hchart';
import * as _ from 'lodash';
import { AssetTreeFacade, AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';

@Component({
  selector: 'atx-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  alertsChart: AtonixDonutChart;
  impactsChart: AtonixDonutChart;
  issuesChart: AtonixDonutChart;
  pending$: Observable<boolean>;
  assetTreeFacade: AssetTreeFacade;
  summaryCharts$: Observable<SummaryCharts>;
  currentState$: Observable<{
    assetGuid: string;
    appContext: IAppContext;
  }>;
  Highcharts: any;

  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private hChartService: HChartService,
    private paSummaryFacade: PaSummaryFacade,
    assetTreeFacadeFactory: AssetTreeFacadeFactory,
    private userFacade: UserFacade
  ) {
    this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
  }

  ngOnInit() {
    this.Highcharts = this.hChartService.getHCharts();
    this.summaryCharts$ = this.paSummaryFacade.summaryCharts$;
    this.pending$ = this.paSummaryFacade.pending$;
    this.impactsChart = new AtonixDonutChart('Impacts ($k)', 'NO IMPACTS');
    this.issuesChart = new AtonixDonutChart('Issues', 'NO OPEN ISSUES');
    this.alertsChart = new AtonixDonutChart('Alerts', 'NO ALERTS');
    this.currentState$ = combineLatest(this.assetTreeFacade.selectedAssetGuid$, this.userFacade.selectedAppContext$).pipe(
      map(([assetGuid, appContext]) => {
        return { assetGuid, appContext };
      })
    );
    this.updateCountIssuesAndAlerts();
    this.updateDonutCharts();
  }

  updateDonutCharts() {
    this.paSummaryFacade.summaryCharts$.pipe(takeUntil(this.unsubscribe)).subscribe(issueAndAlerts => {
      if (!_.isNil(issueAndAlerts)) {
        this.alertsChart.updateSeries(`${issueAndAlerts.activeAlertsCount.toFixed(0)}`, issueAndAlerts.alertsPoints);
        this.impactsChart.updateSeries(`${(issueAndAlerts.impactTotal / 1000).toFixed(0)}`, issueAndAlerts.impactPoints);
        this.issuesChart.updateSeries(`${issueAndAlerts.issuesCount.toFixed(0)}`, issueAndAlerts.issuesPoints);
      }
    });
  }
  updateCountIssuesAndAlerts() {
    this.currentState$.pipe(takeUntil(this.unsubscribe)).subscribe(({ assetGuid, appContext }) => {
      if (!_.isNil(appContext) && !_.isNil(assetGuid)) {
        this.paSummaryFacade.countIssuesAndAlerts({
          appContext: appContext.DisplayName,
          assetID: assetGuid
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
