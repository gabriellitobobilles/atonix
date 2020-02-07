import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ThrowMessage } from '@AtonixWebSites/shared';
var AccountModelService = /** @class */ (function (_super) {
    tslib_1.__extends(AccountModelService, _super);
    function AccountModelService(http) {
        var _this = _super.call(this, '/Services/api/Account/') || this;
        _this.http = http;
        return _this;
    }
    AccountModelService.prototype.userAuthenticated = function () {
        return this.http.get(this.GetUrl('UserAuthenticated')).pipe(catchError(ThrowMessage.error));
    };
    AccountModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AccountModelService);
    return AccountModelService;
}(BaseModel));
export { AccountModelService };
//# sourceMappingURL=account-model.service.js.map