export abstract class BaseHChart {
  constructor(protected hChartOptions: Highcharts.Options, protected errorMessage: string) {}

  // These functions are used on your highcharts component. Example:
  //   <highcharts-chart
  //   [Highcharts]="Highcharts"
  //   [options]="alertsChart.data()"
  //   [(update)]="alertsChart.updatedData"
  // ></highcharts-chart>

  data(): Highcharts.Options {
    return this.hChartOptions;
  }

  updated() {
    return this.updatedData;
  }

  protected updatedData = false;
}
