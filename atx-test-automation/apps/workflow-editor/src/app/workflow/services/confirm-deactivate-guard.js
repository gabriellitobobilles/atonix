import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AuthFacade } from '@AtonixWebSites/auth';
import { of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
var ConfirmDeactivateGuard = /** @class */ (function () {
    function ConfirmDeactivateGuard(authFacade) {
        this.authFacade = authFacade;
    }
    ConfirmDeactivateGuard.prototype.canDeactivate = function (target) {
        if (_.isNil(target)) {
            return of(true);
        }
        if (target.canDeactivate === true) {
            return of(true);
        }
        return this.authFacade.loggedIn$.pipe(take(1), switchMap(function (loggedIn, __) {
            if (loggedIn) {
                return of(window.confirm('Do you really want to cancel?'));
            }
            else {
                return of(true);
            }
        }));
    };
    ConfirmDeactivateGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthFacade])
    ], ConfirmDeactivateGuard);
    return ConfirmDeactivateGuard;
}());
export { ConfirmDeactivateGuard };
//# sourceMappingURL=confirm-deactivate-guard.js.map