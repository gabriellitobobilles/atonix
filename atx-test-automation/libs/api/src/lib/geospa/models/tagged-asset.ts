export interface ITaggedAssetInfo {
  AssetId: number;
  AssetAbbrev: string;
  AssetPath: string;
  Guid: string;
}

export interface ITaggedAsset {
  AssetInfo: ITaggedAssetInfo;
  Tags: ITaggingKeyword[];
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
