import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient } from '@angular/common/http';
import { ThrowMessage } from '@AtonixWebSites/shared';
import { catchError } from 'rxjs/operators';
var GeospaModelService = /** @class */ (function (_super) {
    tslib_1.__extends(GeospaModelService, _super);
    function GeospaModelService(http) {
        var _this = _super.call(this, '/Services/api/GeoSpa/') || this;
        _this.http = http;
        return _this;
    }
    GeospaModelService.prototype.GeoSpaDictionaryKey = function (assetID, nodeID) {
        return (assetID || '') + ':' + (nodeID || '');
    };
    GeospaModelService.prototype.getGeoSpas = function (assetGuid, nodeGuid, includeAncestors, includeGeoSpa, includeGeoVis, includeRaster, include3D) {
        var params = {
            assetID: String(assetGuid),
            nodeGuid: String(nodeGuid),
            includeGeoSpa: String(includeGeoSpa),
            includeGeoVis: String(includeGeoVis),
            includeRaster: String(includeRaster),
            includeAncestors: String(includeAncestors),
            include3D: String(include3D)
        };
        return this.http.get(this.GetUrl('GeoSpas'), { params: params }).pipe(catchError(ThrowMessage.error));
    };
    GeospaModelService.prototype.getGeospaDropdownItems = function (assetGuid, includeGeoSpa, includeGeoVis, includeRaster, include3D) {
        var params = {
            assetGuid: String(assetGuid),
            includeGeoSpa: String(includeGeoSpa),
            includeGeoVis: String(includeGeoVis),
            includeRaster: String(includeRaster),
            include3D: String(include3D)
        };
        return this.http.get(this.GetUrl('DropdownItems'), { params: params }).pipe(catchError(ThrowMessage.error));
    };
    GeospaModelService.prototype.getAssetsOnMap = function (mapID, assetID, nodeID) {
        var params = { mapID: String(mapID), assetID: assetID, nodeID: nodeID };
        return this.http.post(this.GetUrl('AssetsOnMap'), null, { params: params }).pipe(catchError(ThrowMessage.error));
    };
    GeospaModelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GeospaModelService);
    return GeospaModelService;
}(BaseModel));
export { GeospaModelService };
//# sourceMappingURL=geospa-model.service.js.map