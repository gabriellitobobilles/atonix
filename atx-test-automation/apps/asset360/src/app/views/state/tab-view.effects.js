import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as tabViewActions from './tab-view.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetsModelService } from '@AtonixWebSites/api';
var TabViewEffects = /** @class */ (function () {
    function TabViewEffects(actions$, assetModelService) {
        var _this = this;
        this.actions$ = actions$;
        this.assetModelService = assetModelService;
        this.assetViews$ = this.actions$.pipe(ofType(tabViewActions.TabViewActionTypes.AssetViewFromId)).pipe(switchMap(function (action) {
            return _this.assetModelService.assetViews(action.payload.assetID, action.payload.appContextID).pipe(map(function (asset) { return new tabViewActions.AssetViewFromIdSuccess(asset); }), catchError(function (error) { return of(new tabViewActions.AssetViewFromIdFailure(error)); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], TabViewEffects.prototype, "assetViews$", void 0);
    TabViewEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions, AssetsModelService])
    ], TabViewEffects);
    return TabViewEffects;
}());
export { TabViewEffects };
//# sourceMappingURL=tab-view.effects.js.map