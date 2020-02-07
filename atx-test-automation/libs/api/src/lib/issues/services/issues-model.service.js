import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient } from '@angular/common/http';
import { UtilFunctions, ThrowMessage } from '@AtonixWebSites/shared';
import { catchError } from 'rxjs/operators';
var IssuesModelService = /** @class */ (function (_super) {
    tslib_1.__extends(IssuesModelService, _super);
    function IssuesModelService(http) {
        var _this = _super.call(this, '/Services/api/Issues/') || this;
        _this.http = http;
        return _this;
    }
    IssuesModelService.prototype.countIssuesAndAlerts = function (parameters) {
        var queryParams = UtilFunctions.buildQueryParams(parameters);
        queryParams['appContext'] = parameters.appContext.split(' ').join('+');
        return this.http
            .get(this.GetUrl('CountIssuesAndAlerts'), {
            params: queryParams
        })
            .pipe(catchError(ThrowMessage.error));
    };
    IssuesModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], IssuesModelService);
    return IssuesModelService;
}(BaseModel));
export { IssuesModelService };
//# sourceMappingURL=issues-model.service.js.map