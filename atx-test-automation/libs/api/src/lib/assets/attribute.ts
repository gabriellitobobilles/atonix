import { IAttributeType, IAttributeTypeOption } from './attribute-type';
import { ICategory } from './category';

export interface IAssetAttribute {
  AssetAttributeID: number;
  AssetID: number;
  AttributeTypeID: number;
  AttributeOptionTypeID: number;
  Attribute_int: number;
  Attribute_string: string;
  Attribute_float: number;
  AttributeType: IAttributeType;
  Favorite: boolean;
  DisplayOrder: number;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate?: Date;
  ChangeDate?: Date;
  IsTheOwner: boolean;
  Categories: ICategory[];
  Options: IAttributeTypeOption[];
}
