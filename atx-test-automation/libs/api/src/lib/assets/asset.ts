import { IAssetClassType } from './asset-class-type';
import { IAssetType } from './asset-type';
import { IGPSCoordinate } from './gps-coordinate';
import { ITaggingKeyword } from './tagging-keyword';
import { ICategory } from './category';

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
  Track: boolean;
  AssetClassType: IAssetClassType;
  AssetType: IAssetType;
  NumChildren: number;
  Keywords?: ITaggingKeyword[];
  IsTheOwner: boolean;
  AttributeCategories: ICategory[];
  AttachmentCategories: ICategory[];
  Location?: IGPSCoordinate;
  power?: number;
  openIssues?: number;
  Loaded?: boolean;
}

export class Asset implements IAsset {
  constructor(myAsset?: IAsset) {
    if (myAsset) {
      this.AssetID = myAsset.AssetID;
      this.ParentAssetID = myAsset.ParentAssetID;
      this.AssetAbbrev = myAsset.AssetAbbrev;
      this.AssetDesc = myAsset.AssetDesc;
      this.AssetClassTypeID = myAsset.AssetClassTypeID;
      this.AssetTreeNodeChildConfigurationTypeID = myAsset.AssetTreeNodeChildConfigurationTypeID;
      this.DisplayOrder = myAsset.DisplayOrder;
      this.CreatedBy = myAsset.CreatedBy;
      this.ChangedBy = myAsset.ChangedBy;
      this.CreateDate = myAsset.CreateDate;
      this.ChangeDate = myAsset.ChangeDate;
      this.GlobalId = myAsset.GlobalId;
      this.IsHidden = myAsset.IsHidden;
      this.Track = myAsset.Track;
      this.AssetClassType = myAsset.AssetClassType;
      this.AssetType = myAsset.AssetType;
      this.NumChildren = myAsset.NumChildren;
      this.Keywords = myAsset.Keywords;
      this.IsTheOwner = myAsset.IsTheOwner;
      this.AttributeCategories = myAsset.AttachmentCategories;
      this.AttachmentCategories = myAsset.AttachmentCategories;
      this.Location = myAsset.Location;
      this.power = myAsset.power;
      this.openIssues = myAsset.openIssues;
      this.Loaded = myAsset.Loaded;
    }
  }

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
  Track: boolean;
  AssetClassType: IAssetClassType;
  AssetType: IAssetType;
  NumChildren: number;
  Keywords?: ITaggingKeyword[];
  IsTheOwner: boolean;
  AttributeCategories: ICategory[];
  AttachmentCategories: ICategory[];
  Location?: IGPSCoordinate;
  power?: number;
  openIssues?: number;
  Loaded?: boolean;
}
