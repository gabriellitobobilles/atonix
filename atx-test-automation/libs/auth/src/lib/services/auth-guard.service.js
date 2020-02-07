import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthFacade } from '../state/auth/auth.facade';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, authFacade) {
        this.auth = auth;
        this.authFacade = authFacade;
    }
    AuthGuardService.prototype.canActivate = function () {
        var _this = this;
        return this.auth.IsLoggedIn$().pipe(map(function (loggedIn) {
            if (!loggedIn) {
                _this.authFacade.loginRedirect();
                return false;
            }
            return true;
        }), take(1));
    };
    AuthGuardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, AuthFacade])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map