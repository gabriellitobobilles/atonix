import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BaseModel } from '../base-model';
import { ThrowMessage, UtilFunctions } from '@AtonixWebSites/shared';
import { of } from 'rxjs';
var AssetsModelService = /** @class */ (function (_super) {
    tslib_1.__extends(AssetsModelService, _super);
    function AssetsModelService(http) {
        var _this = _super.call(this, '/Services/api/Assets/') || this;
        _this.http = http;
        return _this;
    }
    AssetsModelService.prototype.sortAssets = function (assetList) {
        assetList.sort(function (a, b) {
            var result = 0;
            // tslint:disable-next-line:prefer-conditional-expression
            if (a.DisplayOrder === b.DisplayOrder) {
                result = a.AssetID > b.AssetID ? 1 : a.AssetID < b.AssetID ? -1 : 0;
            }
            else {
                result = a.DisplayOrder - b.DisplayOrder;
            }
            return result;
        });
        return assetList;
    };
    AssetsModelService.prototype.getAppContexts = function () {
        var _this = this;
        return this.http.get(this.GetUrl('AppContexts')).pipe(map(function (data) { return _this.processAppContexts(data); }), catchError(this.HandleError));
    };
    AssetsModelService.prototype.firstRootAsset = function (appContextID) {
        return this.http
            .get(this.GetUrl('FirstRootAsset'), { params: { appContextID: String(appContextID) } })
            .pipe(catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.processAppContexts = function (appContexts) {
        // I am adding this section of code so that we can create app contexts that limit access to apps but that don't show
        // up in the app tray.  The user would have to know the address of the app to get to it.
        // This section also makes sure that the app contexts are unique.
        var acDict = {};
        var uniqueAppContexts = [];
        for (var _i = 0, appContexts_1 = appContexts; _i < appContexts_1.length; _i++) {
            var a = appContexts_1[_i];
            if (a.Path && !acDict[a.DisplayName]) {
                uniqueAppContexts.push(a);
                acDict[a.DisplayName] = true;
            }
        }
        uniqueAppContexts.sort(function (a, b) {
            return a.DisplayOrder - b.DisplayOrder;
        });
        return uniqueAppContexts;
    };
    AssetsModelService.prototype.getAsset = function (parameters) {
        if (!parameters.assetGuid || parameters.assetGuid.length < 36) {
            return of();
        }
        var queryParams = UtilFunctions.buildQueryParams(parameters);
        return this.http
            .get(this.GetUrl('AssetFromGuid'), {
            params: queryParams
        })
            .pipe(catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.assetViews = function (assetID, applicationContext) {
        if (_.isNil(assetID)) {
            return of({ Views: [], SelectedView: null });
        }
        else {
            var params = {};
            if (assetID) {
                params.assetID = String(assetID);
            }
            if (applicationContext) {
                params.applicationContext = String(applicationContext);
            }
            return this.http.get(this.GetUrl('AssetViews'), { params: params }).pipe(map(function (results) {
                results.Views.sort(function (a, b) { return (a.DisplayOrder < b.DisplayOrder ? -1 : 1); });
                return results;
            }), catchError(ThrowMessage.error));
        }
    };
    AssetsModelService.prototype.autoCompleteSearch = function (search, count, parentID, startAtLevel, stopAtLevel, appContextID) {
        var params = {
            search: String(search || ''),
            count: String(count || null),
            parentID: String(parentID || null),
            startAtLevel: String(startAtLevel || null),
            stopAtLevel: String(stopAtLevel || null),
            appContextID: String(appContextID)
        };
        return this.http.get(this.GetUrl('AutoCompleteSearch'), { params: params }).pipe(catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.getAssetToNodeWithSiblings = function (assetID, appContextID) {
        var params = {
            Id: String(assetID),
            appContextID: String(appContextID)
        };
        return this.http.get(this.GetUrl('AssetsToNodeWithSiblings'), { params: params }).pipe(map(function (results) {
            var assets = [];
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var a = results_1[_i];
                for (var _a = 0, a_1 = a; _a < a_1.length; _a++) {
                    var b = a_1[_a];
                    assets.push(b);
                }
            }
            return assets;
        }), catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.getAllStandardAttributeTypesWithOptions = function () {
        var _this = this;
        return this.http.get(this.GetUrl('StandardAttributeTypesWithOptions')).pipe(map(function (results) {
            for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
                var myAttribute = results_2[_i];
                _this.StripOutCrap(myAttribute.AttributeType);
                for (var _a = 0, _b = myAttribute.Options; _a < _b.length; _a++) {
                    var myOption = _b[_a];
                    _this.StripOutCrap(myOption);
                }
            }
            return results;
        }), catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.getAssetAndAttributes = function (assetID, full) {
        var _this = this;
        if (full === void 0) { full = true; }
        var params = {
            assetID: String(assetID),
            full: String(full)
        };
        return this.getAllStandardAttributeTypesWithOptions().pipe(switchMap(function (standards) {
            return _this.http.get(_this.GetUrl('AssetAndAttributes'), { params: params }).pipe(map(function (items) {
                if (items.AvailableAttributes) {
                    for (var _i = 0, _a = items.AvailableAttributes; _i < _a.length; _i++) {
                        var myAttribute = _a[_i];
                        _this.StripOutCrap(myAttribute.AttributeType);
                        for (var _b = 0, _c = myAttribute.Options; _b < _c.length; _b++) {
                            var myOption = _c[_b];
                            _this.StripOutCrap(myOption);
                        }
                    }
                }
                items.AllAttributes = standards;
                for (var _d = 0, _e = items.Attributes; _d < _e.length; _d++) {
                    var myAttribute = _e[_d];
                    _this.StripOutCrap(myAttribute);
                    _this.StripOutCrap(myAttribute.AttributeType);
                }
                for (var _f = 0, _g = items.Attachments; _f < _g.length; _f++) {
                    var myAttachment = _g[_f];
                    _this.putFileInfoIntoAttachment(myAttachment.ContentID, myAttachment);
                }
                _this.sortAttachments(items.Attachments, 'custom');
                for (var _h = 0, _j = items.Attachments; _h < _j.length; _h++) {
                    var aa = _j[_h];
                    _this.convertDatesOnAssetAttachment(aa);
                }
                return items;
            }));
        }), catchError(ThrowMessage.error));
    };
    AssetsModelService.prototype.convertDatesOnAssetAttachment = function (aa) {
        aa.CreateDate = new Date(aa.CreateDate);
        aa.ChangeDate = new Date(aa.ChangeDate);
    };
    AssetsModelService.prototype.putFileInfoIntoAttachment = function (newFileID, data) {
        data.complete = true;
        data.path = data.PreSignedURL ? decodeURIComponent(data.PreSignedURL) : '';
    };
    AssetsModelService.prototype.sortAttachments = function (attachments, sortBy) {
        if (attachments && attachments.length > 1) {
            attachments.sort(function (a, b) {
                var result;
                if (sortBy === 'custom') {
                    result = a.DisplayOrder - b.DisplayOrder;
                }
                else if (sortBy === 'filename') {
                    result = a.Title.localeCompare(b.Title);
                }
                else if (sortBy === 'caption') {
                    result = a.Caption.localeCompare(b.Caption);
                }
                else if (sortBy === 'date') {
                    result = a.CreateDate.getTime() - b.CreateDate.getTime();
                }
                else if (sortBy === 'date_reverse') {
                    result = b.CreateDate.getTime() - a.CreateDate.getTime();
                }
                if (result === 0) {
                    result = sortBy !== 'caption' ? a.Caption.localeCompare(b.Caption) : a.CreateDate.getTime() - b.CreateDate.getTime();
                    if (result === 0) {
                        result = a.AttachmentID.localeCompare(b.AttachmentID);
                    }
                }
                return result;
            });
        }
    };
    AssetsModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AssetsModelService);
    return AssetsModelService;
}(BaseModel));
export { AssetsModelService };
//# sourceMappingURL=assets-model.service.js.map