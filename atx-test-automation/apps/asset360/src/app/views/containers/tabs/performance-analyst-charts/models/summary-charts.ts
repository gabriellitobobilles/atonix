import { ChartLegend } from './chart-legend';
import * as Highcharts from 'highcharts';

export class SummaryCharts {
  alertsPoints: Highcharts.DataPoint[] = [];
  issuesPoints: Highcharts.DataPoint[] = [];
  impactPoints: Highcharts.DataPoint[] = [];
  legend: ChartLegend[] = [];
  activeAlertsCount = 0;
  issuesCount = 0;
  impactTotal = 0;
}
