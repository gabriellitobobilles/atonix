import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WorkflowFormState } from '../../../../model/form-edit-state';
import { IStatesForLayer, IGeoSpaDropdownValue } from '@AtonixWebSites/api';
import * as _ from 'lodash';

export const UpdateMapDetailsFormInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-update-map-details',
  templateUrl: './action-form-update-map-details.component.html',
  styleUrls: ['./action-form-update-map-details.component.scss']
})
export class ActionFormUpdateMapDetailsComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };
  @Input() formState: WorkflowFormState;
  @Input() showValidationMessages: boolean;
  @Input() mapsForAsset: Map<string, IGeoSpaDropdownValue>;
  @Input() layerForMap: IStatesForLayer;

  @Output() changeSelectedMap = new EventEmitter();

  WorkflowFormStateType = WorkflowFormState;
  currentMaps = new Map();

  getAssets(value: string) {
    if (_.isNil(value) || value === '') {
      return [];
    }
    return this.mapsForAsset.get(value).GeoSpaAssetClassTypes;
  }

  getMileStones(map: string, assetClassType: string) {
    if (_.isNil(map) || map === '' || _.isNil(assetClassType) || assetClassType === '') {
      return [];
    }
    const selectedAssetClassType = this.mapsForAsset
      .get(map)
      .GeoSpaAssetClassTypes.filter(asset => asset.AssetClassTypeID === Number(assetClassType))[0];
    if (!_.isNil(selectedAssetClassType)) {
      return selectedAssetClassType.Milestones;
    } else {
      return [];
    }
  }

  displayAssetClassType(map: string, assetClassTypeID: string) {
    if (_.isNil(map) || map === '' || _.isNil(assetClassTypeID) || assetClassTypeID === '') {
      return '';
    }
    const selectedAssetClassType = this.mapsForAsset
      .get(map)
      .GeoSpaAssetClassTypes.filter(asset => asset.AssetClassTypeID === Number(assetClassTypeID))[0];
    if (!_.isNil(selectedAssetClassType)) {
      return selectedAssetClassType.AssetClassTypeName;
    } else {
      return '';
    }
  }

  displayStatus(map: string, assetClassTypeID: string, statusID: string) {
    if (_.isNil(map) || map === '' || _.isNil(assetClassTypeID) || assetClassTypeID === '') {
      return '';
    }
    const selectedAssetClassType = this.mapsForAsset
      .get(map)
      .GeoSpaAssetClassTypes.filter(asset => asset.AssetClassTypeID === Number(assetClassTypeID))[0];
    if (!_.isNil(selectedAssetClassType)) {
      const status = selectedAssetClassType.Milestones.filter(milestone => milestone.Id === Number(statusID))[0];
      if (!_.isNil(status)) {
        return status.Label;
      }
    }
    return '';
  }

  ngOnInit() {}

  onChangeMap(map: string) {
    const newMap = this.mapsForAsset.get(map).GeoSpaAssetClassTypes[0];
    this.workflowForm.get('assetClassType').setValue(newMap.AssetClassTypeID.toString());
    if (newMap.Milestones) {
      this.workflowForm.get('milestone').setValue(newMap.Milestones[0].Id.toString());
    }
  }
}
