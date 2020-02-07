export interface IIssueCauseType {
  IssueCauseTypeID: number;
  IssueTypeID: number;
  IssueCauseDesc: string;
  IssueCauseAbbrev: string;
  IssueCauseTypeVariableTypeMaps: any[];
  IsBVApproved: boolean;
  CreateDate: Date;
  ChangeDate: Date;
  CreatedByUserID: number;
  ChangedByUserID: number;
  displayOrder?: number;
}
