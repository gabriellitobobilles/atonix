import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { paSummaryQuery } from './pa-summary.selector';
import { CountIssueAndAlerts } from './pa-summary.actions';
var PaSummaryFacade = /** @class */ (function () {
    function PaSummaryFacade(store) {
        this.store = store;
        this.pending$ = this.store.pipe(select(paSummaryQuery.getPending));
        this.summaryCharts$ = this.store.pipe(select(paSummaryQuery.getSummaryCharts));
    }
    PaSummaryFacade.prototype.countIssuesAndAlerts = function (parameters) {
        this.store.dispatch(new CountIssueAndAlerts(parameters));
    };
    PaSummaryFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], PaSummaryFacade);
    return PaSummaryFacade;
}());
export { PaSummaryFacade };
//# sourceMappingURL=pa-summary.facade.js.map