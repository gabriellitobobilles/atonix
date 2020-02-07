export interface IIssueType {
  IssueTypeID: number;
  IssueTypeDesc: string;
  IssueTypeAbbrev: string;
  TrendDirection: number;
  IsBVApproved: boolean;
  CreateDate: Date;
  ChangeDate: Date;
  CreatedByUserID: number;
  ChangedByUserID: number;
  IssueTypeCausesTypes: any[];
}
