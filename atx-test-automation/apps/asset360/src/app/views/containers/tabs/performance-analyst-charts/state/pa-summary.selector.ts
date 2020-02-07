import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaSummaryState } from './pa-summary.reducer';

const getPaSummaryFeatureState = createFeatureSelector<PaSummaryState>('paSummaryState');
export const getPending = createSelector(
  getPaSummaryFeatureState,
  state => state.pending
);
export const getSummaryCharts = createSelector(
  getPaSummaryFeatureState,
  state => state.summaryCharts
);
export const paSummaryQuery = {
  getPending,
  getSummaryCharts
};
