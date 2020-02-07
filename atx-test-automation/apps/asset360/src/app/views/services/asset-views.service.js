import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { ThrowMessage } from '@AtonixWebSites/shared';
var AssetViewsService = /** @class */ (function () {
    function AssetViewsService(http) {
        this.http = http;
    }
    AssetViewsService.prototype.assetViews = function (viewParameters) {
        return this.http
            .get(environment.baseUrl + "/Services/api/Assets/AssetViews?applicationContext=" + viewParameters.applicationContext + "&assetID=" + viewParameters.assetId)
            .pipe(tap(function (results) {
            results.Views.sort(function (a, b) { return (a.DisplayOrder < b.DisplayOrder ? -1 : 1); });
        }), catchError(ThrowMessage.error));
    };
    AssetViewsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AssetViewsService);
    return AssetViewsService;
}());
export { AssetViewsService };
//# sourceMappingURL=asset-views.service.js.map