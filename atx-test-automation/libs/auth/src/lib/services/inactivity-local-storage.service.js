import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var InactivityLocalStorageService = /** @class */ (function () {
    function InactivityLocalStorageService() {
    }
    InactivityLocalStorageService.prototype.setExpirationTime = function (value) {
        if (!_.isNil(value)) {
            window.localStorage.setItem('ExpireTime', value.getTime().toString());
        }
        else {
            window.localStorage.removeItem('ExpireTime');
        }
    };
    InactivityLocalStorageService.prototype.getExpirationTime = function () {
        var expireTime = window.localStorage.getItem('ExpireTime');
        if (expireTime) {
            return new Date(parseInt(expireTime, 10));
        }
        else {
            return null;
        }
    };
    InactivityLocalStorageService.prototype.setCountdownWarning = function (value) {
        if (value) {
            window.localStorage.setItem('CountdownWarning', 'true');
        }
        else {
            window.localStorage.setItem('CountdownWarning', 'false');
        }
    };
    InactivityLocalStorageService.prototype.isExpired = function () {
        var expirationTime = this.getExpirationTime();
        return expirationTime != null && expirationTime <= new Date();
    };
    InactivityLocalStorageService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], InactivityLocalStorageService);
    return InactivityLocalStorageService;
}());
export { InactivityLocalStorageService };
//# sourceMappingURL=inactivity-local-storage.service.js.map