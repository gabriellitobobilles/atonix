import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { AtonixDonutChart } from '@AtonixWebSites/hchart';
var DonutChartComponent = /** @class */ (function () {
    function DonutChartComponent() {
    }
    DonutChartComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DonutChartComponent.prototype, "highCharts", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], DonutChartComponent.prototype, "categories", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", AtonixDonutChart)
    ], DonutChartComponent.prototype, "donutChart", void 0);
    DonutChartComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-donut-chart',
            templateUrl: './donut-chart.component.html',
            styleUrls: ['./donut-chart.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DonutChartComponent);
    return DonutChartComponent;
}());
export { DonutChartComponent };
//# sourceMappingURL=donut-chart.component.js.map