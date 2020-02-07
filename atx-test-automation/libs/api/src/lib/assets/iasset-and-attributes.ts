import { ICategory } from './category';
import { IAsset } from './asset';
import { IAssetAttribute } from './attribute';
import { IAttributeTypeWithOptions } from './attribute-type';
import { IAssetAttachment } from './attachment';

export interface IAssetAndAttributes {
  Asset: IAsset;
  Parent: IAsset;
  Attributes: IAssetAttribute[];
  AvailableAttributes: IAttributeTypeWithOptions[];
  AllAttributes: IAttributeTypeWithOptions[];
  CustomProperties: IAssetAttribute[];
  Attachments: IAssetAttachment[];
  AvailableAttributeCategories: ICategory[];
  AvailableAttachmentCategories: ICategory[];
  UsedAttributeCategories: ICategory[];
  UsedAttachmentCategories: ICategory[];
}
