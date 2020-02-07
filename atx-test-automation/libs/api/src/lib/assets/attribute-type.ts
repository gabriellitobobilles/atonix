import { ICategory } from './category';

export interface IAttributeType {
  AttributeTypeID: number;
  AttributeTypeDesc: string;
  AttributeTypeKey: string;
  EngrUnits: string;
  DisplayFormat: string;
  IsStandard: boolean;
  IsExempt: boolean;
  ClientID: number;
}

export interface IAttributeTypeOption {
  attributeOptionTypeID: number;
  attributeTypeID: number;
  attributeOptionTypeDesc: string;
  displayOrder: number;
}

export interface IAttributeTypeWithOptions {
  AttributeType: IAttributeType;
  Options: IAttributeTypeOption[];
  Categories: ICategory[];
}
