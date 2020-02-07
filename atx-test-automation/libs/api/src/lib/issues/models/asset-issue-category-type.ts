import { IIssueClassType } from './issue-class-type';

export interface IAssetIssueCategoryType {
  AssetIssueCategoryTypeID: number;
  CategoryAbbrev: string;
  CategoryDesc: string;
  IssueClassTypeID: number;
  IssueClassType: IIssueClassType;
  CreatedBy: string;
  ChangedBy: string;
  CreateDate: Date;
  ChangeDate: Date;
}
