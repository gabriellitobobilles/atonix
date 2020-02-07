import { Injectable } from '@angular/core';
import { PaSummaryState } from './pa-summary.reducer';
import { Store, select } from '@ngrx/store';
import { paSummaryQuery } from './pa-summary.selector';
import { CountIssueAndAlerts } from './pa-summary.actions';
import { CountIssueAndAlertsParameters } from '@AtonixWebSites/api';

@Injectable()
export class PaSummaryFacade {
  constructor(private store: Store<PaSummaryState>) {}
  pending$ = this.store.pipe(select(paSummaryQuery.getPending));
  summaryCharts$ = this.store.pipe(select(paSummaryQuery.getSummaryCharts));
  countIssuesAndAlerts(parameters: CountIssueAndAlertsParameters) {
    this.store.dispatch(new CountIssueAndAlerts(parameters));
  }
}
