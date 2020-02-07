import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { ThrowMessage } from '@AtonixWebSites/shared';
var UserInfoService = /** @class */ (function () {
    function UserInfoService(http) {
        this.http = http;
    }
    UserInfoService.prototype.userInfo = function () {
        return this.http
            .get(environment.baseUrl + "/Services/api/Account/UserInfo")
            .pipe(catchError(ThrowMessage.error));
    };
    UserInfoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserInfoService);
    return UserInfoService;
}());
export { UserInfoService };
//# sourceMappingURL=user-info.service.js.map