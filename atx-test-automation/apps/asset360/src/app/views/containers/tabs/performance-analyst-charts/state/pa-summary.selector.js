import { createFeatureSelector, createSelector } from '@ngrx/store';
var getPaSummaryFeatureState = createFeatureSelector('paSummaryState');
export var getPending = createSelector(getPaSummaryFeatureState, function (state) { return state.pending; });
export var getSummaryCharts = createSelector(getPaSummaryFeatureState, function (state) { return state.summaryCharts; });
export var paSummaryQuery = {
    getPending: getPending,
    getSummaryCharts: getSummaryCharts
};
//# sourceMappingURL=pa-summary.selector.js.map