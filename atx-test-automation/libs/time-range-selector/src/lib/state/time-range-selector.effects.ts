import { UiconfigModelService } from '@AtonixWebSites/api';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TimeRangeSelectorState } from './time-range-selector.reducer';
import { timeRangeSelectorQuery } from './time-range-selector.selectors';
import {
  TimeRangeSelectorActionTypes,
  TimeRangeSelectorActions,
  DefaultJumpToFailed,
  DefaultJumpToRetrieved,
  GetSelectedJumpToDates,
  SelectedJumpToDatesRetrieved,
  SelectedJumpToDatesFailed
} from './time-range-selector.actions';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Injectable()
export class TimeRangeSelectorEffects {
  constructor(
    private actions$: Actions,
    private uiconfigModelService: UiconfigModelService,
    private store: Store<TimeRangeSelectorState>
  ) {}

  @Effect()
  defaultJumpTo$ = this.actions$.pipe(
    ofType(TimeRangeSelectorActionTypes.GetDefaultJumpTo),
    switchMap(() => {
      return this.uiconfigModelService.getCriteriaObjectListCategory(1).pipe(
        map(values => new DefaultJumpToRetrieved(values)),
        catchError(error => of(new DefaultJumpToFailed(error)))
      );
    })
  );

  @Effect()
  selectJumpTo$ = this.actions$.pipe(
    ofType(TimeRangeSelectorActionTypes.GetSelectedJumpToDates),
    map((action: GetSelectedJumpToDates) => action.payload),
    withLatestFrom(this.store.pipe(select(timeRangeSelectorQuery.getSelection))),
    switchMap(([criteriaObjectID, selection]) => {
      return this.uiconfigModelService
        .getTimeRangeDateRangeFromCriteria(criteriaObjectID, selection.startDate, selection.endDate)
        .pipe(
          map(
            response => new SelectedJumpToDatesRetrieved({ StartDate: new Date(response.Start), EndDate: new Date(response.End) })
          ),
          catchError(error => of(new SelectedJumpToDatesFailed(error)))
        );
    })
  );
}
