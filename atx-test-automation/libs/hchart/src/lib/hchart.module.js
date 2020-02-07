import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HChartService } from './services/hchart.service';
var HChartModule = /** @class */ (function () {
    function HChartModule() {
    }
    HChartModule_1 = HChartModule;
    HChartModule.forRoot = function () {
        return {
            ngModule: HChartModule_1,
            providers: [HChartService]
        };
    };
    var HChartModule_1;
    HChartModule = HChartModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            providers: []
        })
    ], HChartModule);
    return HChartModule;
}());
export { HChartModule };
//# sourceMappingURL=hchart.module.js.map