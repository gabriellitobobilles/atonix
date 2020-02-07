import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '../base-model';
var UiconfigModelService = /** @class */ (function (_super) {
    tslib_1.__extends(UiconfigModelService, _super);
    function UiconfigModelService(http) {
        var _this = _super.call(this, '/Services/api/UIConfig/') || this;
        _this.http = http;
        return _this;
    }
    UiconfigModelService.prototype.getAsset360Logo = function () {
        return this.http.get(this.GetUrl('Asset360Logo')).pipe(map(function (mydata) {
            var data = mydata.replace(/"/g, '');
        }), catchError(this.HandleError));
    };
    UiconfigModelService.prototype.getTimeRangeDateRangeFromCriteria = function (criteriaFilterid, startDate, endDate) {
        var params = {
            criteriaFilterid: String(criteriaFilterid),
            startDate: null,
            endDate: null
        };
        if (startDate && startDate.toISOString) {
            params.startDate = startDate.toISOString();
        }
        if (endDate && endDate.toISOString) {
            params.endDate = endDate.toISOString();
        }
        return this.http
            .get(this.GetUrl('TimeSelectorGetDateRangeFromCriteria'), {
            params: params
        })
            .pipe(catchError(this.HandleError));
    };
    UiconfigModelService.prototype.getCriteriaObjectListCategory = function (categoryID, appContextID, tabID) {
        if (appContextID === void 0) { appContextID = null; }
        if (tabID === void 0) { tabID = null; }
        var params = { categoryID: String(categoryID) };
        if (appContextID !== null) {
            params['appContextID'] = String(appContextID);
        }
        if (tabID !== null) {
            params['tabID'] = String(tabID);
        }
        return this.http
            .get(this.GetUrl('TimeSelectorCategoryCriteria'), {
            params: params
        })
            .pipe(catchError(this.HandleError));
    };
    UiconfigModelService.prototype.initializeTree = function (treeID, parentID, nodeID, assetID, appContextID, startAtLevel) {
        var params = {};
        if (!_.isNil(treeID)) {
            params.treeID = String(treeID);
        }
        if (!_.isNil(parentID)) {
            params.parentID = String(parentID);
        }
        if (!_.isNil(nodeID)) {
            params.nodeID = String(nodeID);
        }
        if (!_.isNil(assetID)) {
            params.assetID = String(assetID);
        }
        if (!_.isNil(appContextID)) {
            params.appContextID = String(appContextID);
        }
        if (!_.isNil(startAtLevel)) {
            params.startAtLevel = String(startAtLevel);
        }
        return this.http.get(this.GetUrl('LoadNodeFromKey'), { params: params }).pipe(map(function (result) {
            return { trees: result.m_Item1, assets: result.m_Item2 };
        }), catchError(this.HandleError));
    };
    UiconfigModelService.prototype.deepAsset = function (treeID, assetID, appContext) {
        var params = {
            treeID: treeID,
            assetID: assetID,
            appContext: appContext
        };
        return this.http.get(this.GetUrl('DeepAsset'), { params: params }).pipe(catchError(this.HandleError));
    };
    UiconfigModelService.prototype.assetTreeChildren = function (key, appContext) {
        var params = {
            key: key,
            appContext: appContext
        };
        return this.http.get(this.GetUrl('Children'), { params: params }).pipe(catchError(this.HandleError));
    };
    UiconfigModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UiconfigModelService);
    return UiconfigModelService;
}(BaseModel));
export { UiconfigModelService };
//# sourceMappingURL=uiconfig-model.service.js.map