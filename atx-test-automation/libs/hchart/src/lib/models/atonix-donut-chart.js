import * as tslib_1 from "tslib";
import { BaseHChart } from './base-hchart';
var AtonixDonutChart = /** @class */ (function (_super) {
    tslib_1.__extends(AtonixDonutChart, _super);
    function AtonixDonutChart(title, errorMessage) {
        var _this = this;
        var defaultOptions = {
            subtitle: {
                text: '',
                align: 'center',
                style: { color: 'white', fontSize: '18px' },
                verticalAlign: 'middle',
                y: 8
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:,.0f}</b><br/>',
                shared: true
            },
            credits: {
                enabled: false
            },
            title: {
                margin: 0,
                style: { color: 'white', fontSize: '16px', fontWeight: 'bold' },
                text: title
            },
            chart: {
                margin: [0, 0, 0, 0],
                spacing: [0, 0, 0, 0],
                renderTo: 'container',
                backgroundColor: null,
                type: 'pie',
                zoomType: 'xy'
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    borderWidth: 0,
                    innerSize: '50%',
                    center: ['50%', '50%'],
                    dataLabels: {
                        enabled: false
                    },
                    size: '140'
                },
                series: {
                    shadow: true
                }
            },
            exporting: { enabled: false },
            series: [
                {
                    data: [],
                    description: title,
                    name: title
                }
            ]
        };
        _this = _super.call(this, defaultOptions, errorMessage) || this;
        return _this;
    }
    AtonixDonutChart.prototype.updateSeries = function (centerText, series) {
        this.hChartOptions.series[0].data = series;
        this.hChartOptions.subtitle.text = centerText;
        this.updatedData = true;
    };
    return AtonixDonutChart;
}(BaseHChart));
export { AtonixDonutChart };
//# sourceMappingURL=atonix-donut-chart.js.map