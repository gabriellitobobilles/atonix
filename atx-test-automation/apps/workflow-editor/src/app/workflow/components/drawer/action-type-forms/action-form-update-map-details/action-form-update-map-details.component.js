import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WorkflowFormState } from '../../../../model/form-edit-state';
import * as _ from 'lodash';
export var UpdateMapDetailsFormInfo = {
    controls: {},
    validationMessages: {}
};
var ActionFormUpdateMapDetailsComponent = /** @class */ (function () {
    function ActionFormUpdateMapDetailsComponent() {
        this.changeSelectedMap = new EventEmitter();
        this.WorkflowFormStateType = WorkflowFormState;
        this.currentMaps = new Map();
    }
    ActionFormUpdateMapDetailsComponent.prototype.getAssets = function (value) {
        if (_.isNil(value) || value === '') {
            return [];
        }
        return this.mapsForAsset.get(value).GeoSpaAssetClassTypes;
    };
    ActionFormUpdateMapDetailsComponent.prototype.getMileStones = function (map, assetClassType) {
        if (_.isNil(map) || map === '' || _.isNil(assetClassType) || assetClassType === '') {
            return [];
        }
        var selectedAssetClassType = this.mapsForAsset
            .get(map)
            .GeoSpaAssetClassTypes.filter(function (asset) { return asset.AssetClassTypeID === Number(assetClassType); })[0];
        if (!_.isNil(selectedAssetClassType)) {
            return selectedAssetClassType.Milestones;
        }
        else {
            return [];
        }
    };
    ActionFormUpdateMapDetailsComponent.prototype.displayAssetClassType = function (map, assetClassTypeID) {
        if (_.isNil(map) || map === '' || _.isNil(assetClassTypeID) || assetClassTypeID === '') {
            return '';
        }
        var selectedAssetClassType = this.mapsForAsset
            .get(map)
            .GeoSpaAssetClassTypes.filter(function (asset) { return asset.AssetClassTypeID === Number(assetClassTypeID); })[0];
        if (!_.isNil(selectedAssetClassType)) {
            return selectedAssetClassType.AssetClassTypeName;
        }
        else {
            return '';
        }
    };
    ActionFormUpdateMapDetailsComponent.prototype.displayStatus = function (map, assetClassTypeID, statusID) {
        if (_.isNil(map) || map === '' || _.isNil(assetClassTypeID) || assetClassTypeID === '') {
            return '';
        }
        var selectedAssetClassType = this.mapsForAsset
            .get(map)
            .GeoSpaAssetClassTypes.filter(function (asset) { return asset.AssetClassTypeID === Number(assetClassTypeID); })[0];
        if (!_.isNil(selectedAssetClassType)) {
            var status_1 = selectedAssetClassType.Milestones.filter(function (milestone) { return milestone.Id === Number(statusID); })[0];
            if (!_.isNil(status_1)) {
                return status_1.Label;
            }
        }
        return '';
    };
    ActionFormUpdateMapDetailsComponent.prototype.ngOnInit = function () { };
    ActionFormUpdateMapDetailsComponent.prototype.onChangeMap = function (map) {
        var newMap = this.mapsForAsset.get(map).GeoSpaAssetClassTypes[0];
        this.workflowForm.get('assetClassType').setValue(newMap.AssetClassTypeID.toString());
        if (newMap.Milestones) {
            this.workflowForm.get('milestone').setValue(newMap.Milestones[0].Id.toString());
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormUpdateMapDetailsComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateMapDetailsComponent.prototype, "errors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ActionFormUpdateMapDetailsComponent.prototype, "formState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ActionFormUpdateMapDetailsComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Map)
    ], ActionFormUpdateMapDetailsComponent.prototype, "mapsForAsset", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateMapDetailsComponent.prototype, "layerForMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormUpdateMapDetailsComponent.prototype, "changeSelectedMap", void 0);
    ActionFormUpdateMapDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form-update-map-details',
            templateUrl: './action-form-update-map-details.component.html',
            styleUrls: ['./action-form-update-map-details.component.scss']
        })
    ], ActionFormUpdateMapDetailsComponent);
    return ActionFormUpdateMapDetailsComponent;
}());
export { ActionFormUpdateMapDetailsComponent };
//# sourceMappingURL=action-form-update-map-details.component.js.map