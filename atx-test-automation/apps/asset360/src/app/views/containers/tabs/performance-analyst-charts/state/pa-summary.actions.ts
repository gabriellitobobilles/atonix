import { Action } from '@ngrx/store';
import { CountIssueAndAlertsParameters, IIssuesAndAlerts } from '@AtonixWebSites/api';
import { SummaryChartsParameters } from '../models/summary-charts-parameters';
import { SummaryCharts } from '../models/summary-charts';

export enum PaActionTypes {
  CountIssueAndAlerts = '[PerformanceAnalystSummary] Load Count Issue and Alerts Parameters',
  CountIssueAndAlertsFailure = '[PerformanceAnalystSummary] Load Count Issue and Alerts Parameters Failure',
  ConfigurePieCharts = '[PerformanceAnalystSummary] Configure Pie Charts with Count Issue and Alerts',
  ConfigurePieChartsSuccess = '[PerformanceAnalystSummary] Configure Pie Charts Success'
}

export class CountIssueAndAlerts implements Action {
  readonly type = PaActionTypes.CountIssueAndAlerts;
  constructor(public payload: CountIssueAndAlertsParameters) {}
}

export class CountIssueAndAlertsFailure implements Action {
  readonly type = PaActionTypes.CountIssueAndAlertsFailure;
  constructor(public payload: string) {}
}

export class ConfigurePieCharts implements Action {
  readonly type = PaActionTypes.ConfigurePieCharts;
  constructor(public payload: SummaryChartsParameters) {}
}

export class ConfigurePieChartsSuccess implements Action {
  readonly type = PaActionTypes.ConfigurePieChartsSuccess;
  constructor(public payload: SummaryCharts) {}
}

export type PaSummaryActions = CountIssueAndAlerts | CountIssueAndAlertsFailure | ConfigurePieCharts | ConfigurePieChartsSuccess;
