import * as tslib_1 from "tslib";
import { RouterActionTypes } from './router.actions';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
var RouterEffects = /** @class */ (function () {
    function RouterEffects(action$, router, location) {
        var _this = this;
        this.action$ = action$;
        this.router = router;
        this.location = location;
        this.navigate$ = this.action$.pipe(ofType(RouterActionTypes.GoToRoute), pipe(map(function (action) { return action.payload; }), tap(function (_a) {
            var path = _a.path, queryParams = _a.query, extras = _a.extras;
            _this.router.navigate(path, tslib_1.__assign({ queryParams: queryParams }, extras));
        })));
        this.navigateBack$ = this.action$.pipe(ofType(RouterActionTypes.GoBack), pipe(tap(function () { return _this.location.back(); })));
        this.navigateForward$ = this.action$.pipe(ofType(RouterActionTypes.GoForward), pipe(tap(function () { return _this.location.forward(); })));
    }
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], RouterEffects.prototype, "navigate$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], RouterEffects.prototype, "navigateBack$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], RouterEffects.prototype, "navigateForward$", void 0);
    RouterEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions, Router, Location])
    ], RouterEffects);
    return RouterEffects;
}());
export { RouterEffects };
//# sourceMappingURL=router.effects.js.map