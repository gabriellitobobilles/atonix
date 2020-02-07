var BaseHChart = /** @class */ (function () {
    function BaseHChart(hChartOptions, errorMessage) {
        this.hChartOptions = hChartOptions;
        this.errorMessage = errorMessage;
        this.updatedData = false;
    }
    // These functions are used on your highcharts component. Example:
    //   <highcharts-chart
    //   [Highcharts]="Highcharts"
    //   [options]="alertsChart.data()"
    //   [(update)]="alertsChart.updatedData"
    // ></highcharts-chart>
    BaseHChart.prototype.data = function () {
        return this.hChartOptions;
    };
    BaseHChart.prototype.updated = function () {
        return this.updatedData;
    };
    return BaseHChart;
}());
export { BaseHChart };
//# sourceMappingURL=base-hchart.js.map