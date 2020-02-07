import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError as observableThrowError, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take, flatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
var JwtInterceptorService = /** @class */ (function () {
    function JwtInterceptorService(authService) {
        this.authService = authService;
        // Modified from https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts
        this.isRefreshingToken = false;
        this.tokenSubject = new BehaviorSubject(null);
    }
    JwtInterceptorService.prototype.addToken = function (req, token) {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    };
    JwtInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.headers.has('Anonymous')) {
            return next.handle(req);
        }
        else {
            return this.authService
                .GetToken()
                .pipe(flatMap(function (n) { return next.handle(_this.addToken(req, n)); }))
                .pipe(catchError(function (error) {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 400:
                            return _this.handle400Error(error);
                        case 401:
                            // This means the token needs to be refreshed
                            return _this.handle401Error(req, next);
                        default:
                            return observableThrowError(error);
                    }
                }
                else {
                    return observableThrowError(error);
                }
            }));
        }
    };
    JwtInterceptorService.prototype.handle400Error = function (error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser();
        }
        return observableThrowError(error);
    };
    JwtInterceptorService.prototype.handle401Error = function (req, next) {
        var _this = this;
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.authService.GetToken(true).pipe(switchMap(function (newToken) {
                if (newToken) {
                    _this.tokenSubject.next(newToken);
                    return next.handle(_this.addToken(req, newToken));
                }
                // If we don't get a new token, we are in trouble so logout.
                return _this.logoutUser();
            }), catchError(function (error) {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return _this.logoutUser();
            }), finalize(function () {
                _this.isRefreshingToken = false;
            }));
        }
        else {
            return this.tokenSubject.pipe(filter(function (token) { return token != null; }), take(1), switchMap(function (token) {
                return next.handle(_this.addToken(req, token));
            }));
        }
    };
    JwtInterceptorService.prototype.logoutUser = function () {
        this.authService.LogOut();
        return throwError('Http Error');
    };
    JwtInterceptorService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], JwtInterceptorService);
    return JwtInterceptorService;
}());
export { JwtInterceptorService };
//# sourceMappingURL=jwt-interceptor.service.js.map