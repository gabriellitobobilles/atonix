import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
// For next line. See open issue: https://github.com/highcharts/highcharts-angular/issues/54
// tslint:disable-next-line:no-submodule-imports
import * as exporting from 'highcharts/modules/exporting.src';
import * as CustomEvents from 'highcharts-custom-events';
exporting(Highcharts);
CustomEvents(Highcharts);
Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});
var HChartService = /** @class */ (function () {
    function HChartService() {
        this.Highcharts = Highcharts;
    }
    HChartService.prototype.getHCharts = function () {
        return Highcharts;
    };
    HChartService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HChartService);
    return HChartService;
}());
export { HChartService };
//# sourceMappingURL=hchart.service.js.map