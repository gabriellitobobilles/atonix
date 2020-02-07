export interface IAsset {
  AssetID: number;
  ParentAssetID?: number;
  AssetAbbrev: string;
  AssetDesc: string;
  AssetClassTypeID: number;
  AssetTreeNodeChildConfigurationTypeID?: number;
  DisplayOrder: number;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate: Date;
  ChangeDate?: Date;
  GlobalId: string;
  IsHidden: boolean;
  AssetClassType: IAssetClassType;
  AssetType: IAssetType;
  NumChildren: number;
  Location?: IGPSCoordinate;
  power?: number;
  openIssues?: number;
  Track: boolean;
  Keywords?: ITaggingKeyword[];
  IsTheOwner: boolean;
}

export interface IAssetClassType {
  AssetClassTypeID: number;
  AssetTypeID: number;
  AssetClassTypeKey: string;
  AssetClassTypeAbbrev: string;
  AssetClassTypeDesc: string;
  DisplayOrder: number;
}

export interface IAssetType {
  AssetTypeID: number;
  AssetTypeAbbrev: string;
  AssetTypeDesc: string;
}

export interface ITaggingKeyword {
  ClientId: number;
  KeywordId: number;
  Text: string;
  BackDated: boolean;
  DateTime?: Date;
  BackDate?: Date;
  CreatedByUserID?: number;
  ChangedByUserID?: number;
  IsTheOwner: boolean;
}

export interface IGPSCoordinate {
  Longitude: number;
  Latitude: number;
}
