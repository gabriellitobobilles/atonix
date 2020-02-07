import * as tslib_1 from "tslib";
import { UiconfigModelService } from '@AtonixWebSites/api';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { timeRangeSelectorQuery } from './time-range-selector.selectors';
import { TimeRangeSelectorActionTypes, DefaultJumpToFailed, DefaultJumpToRetrieved, SelectedJumpToDatesRetrieved, SelectedJumpToDatesFailed } from './time-range-selector.actions';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
var TimeRangeSelectorEffects = /** @class */ (function () {
    function TimeRangeSelectorEffects(actions$, uiconfigModelService, store) {
        var _this = this;
        this.actions$ = actions$;
        this.uiconfigModelService = uiconfigModelService;
        this.store = store;
        this.defaultJumpTo$ = this.actions$.pipe(ofType(TimeRangeSelectorActionTypes.GetDefaultJumpTo), switchMap(function () {
            return _this.uiconfigModelService.getCriteriaObjectListCategory(1).pipe(map(function (values) { return new DefaultJumpToRetrieved(values); }), catchError(function (error) { return of(new DefaultJumpToFailed(error)); }));
        }));
        this.selectJumpTo$ = this.actions$.pipe(ofType(TimeRangeSelectorActionTypes.GetSelectedJumpToDates), map(function (action) { return action.payload; }), withLatestFrom(this.store.pipe(select(timeRangeSelectorQuery.getSelection))), switchMap(function (_a) {
            var criteriaObjectID = _a[0], selection = _a[1];
            return _this.uiconfigModelService
                .getTimeRangeDateRangeFromCriteria(criteriaObjectID, selection.startDate, selection.endDate)
                .pipe(map(function (response) { return new SelectedJumpToDatesRetrieved({ StartDate: new Date(response.Start), EndDate: new Date(response.End) }); }), catchError(function (error) { return of(new SelectedJumpToDatesFailed(error)); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], TimeRangeSelectorEffects.prototype, "defaultJumpTo$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], TimeRangeSelectorEffects.prototype, "selectJumpTo$", void 0);
    TimeRangeSelectorEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            UiconfigModelService,
            Store])
    ], TimeRangeSelectorEffects);
    return TimeRangeSelectorEffects;
}());
export { TimeRangeSelectorEffects };
//# sourceMappingURL=time-range-selector.effects.js.map