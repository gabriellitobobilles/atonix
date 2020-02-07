import { IIssuesAndAlerts } from '@AtonixWebSites/api';
import { PaSummaryActions, PaActionTypes } from './pa-summary.actions';
import { SummaryCharts } from '../models/summary-charts';

export interface PaSummaryState {
  summaryCharts: SummaryCharts;
  message: string;
  pending: boolean;
}

const initialState: PaSummaryState = {
  summaryCharts: null,
  message: '',
  pending: true
};

export function paSummaryReducer(state = initialState, action: PaSummaryActions): PaSummaryState {
  switch (action.type) {
    case PaActionTypes.CountIssueAndAlertsFailure:
      return {
        ...state,
        message: action.payload,
        pending: false
      };
    case PaActionTypes.CountIssueAndAlerts:
      return {
        ...state,
        pending: true
      };
    case PaActionTypes.ConfigurePieChartsSuccess:
      return {
        ...state,
        summaryCharts: action.payload,
        pending: false
      };

    default:
      return state;
  }
}
