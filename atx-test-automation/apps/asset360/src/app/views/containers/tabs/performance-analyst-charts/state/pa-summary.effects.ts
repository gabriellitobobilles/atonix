import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IssuesModelService, CountIssueAndAlertsParameters } from '@AtonixWebSites/api';
import * as paSummaryActions from './pa-summary.actions';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PaSummaryService } from '../services/pa-summary.service';
import { SummaryChartsParameters } from '../models/summary-charts-parameters';

@Injectable()
export class PaSummaryEffects {
  constructor(
    private actions$: Actions,
    private paSummaryService: PaSummaryService,
    private issuesModelService: IssuesModelService
  ) {}

  @Effect()
  assetViewFromId$ = this.actions$.pipe(ofType(paSummaryActions.PaActionTypes.CountIssueAndAlerts)).pipe(
    map((action: paSummaryActions.CountIssueAndAlerts) => action.payload),
    switchMap((viewParameters: CountIssueAndAlertsParameters) => {
      return this.issuesModelService.countIssuesAndAlerts(viewParameters).pipe(
        switchMap(returnObject => [
          new paSummaryActions.ConfigurePieCharts({ selectedAssetGuid: viewParameters.assetID, issuesAndAlerts: returnObject })
        ]),
        catchError(error => of(new paSummaryActions.CountIssueAndAlertsFailure(error)))
      );
    })
  );

  @Effect()
  configurePieCharts$ = this.actions$.pipe(ofType(paSummaryActions.PaActionTypes.ConfigurePieCharts)).pipe(
    map((action: paSummaryActions.ConfigurePieCharts) => action.payload),
    switchMap((viewParameters: SummaryChartsParameters) => {
      return this.paSummaryService
        .configureSummaryCharts(viewParameters)
        .pipe(map(returnObject => new paSummaryActions.ConfigurePieChartsSuccess(returnObject)));
    })
  );
}
