export interface IMilestoneDefinition {
  Label: string;
  Id: number;
}
export interface IGeoSpaAssetClassTypes {
  AssetClassTypeName: string;
  AssetClassTypeID: number;
  Milestones: IMilestoneDefinition[];
}

export interface IGeoSpaDropdownValue {
  Id: number;
  Title: string;
  MapType: number;
  GeoSpaAssetClassTypes: IGeoSpaAssetClassTypes[];
}

export interface IGeoSpaDropdownItem {
  [mapName: string]: IGeoSpaDropdownValue;
}
