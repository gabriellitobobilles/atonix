export interface IActionPlan {
  AssetIssueActionPlanID: number;
  AssetIssueID: number;
  ActivityNumber: number;
  ResponsibleParty: string;
  ActivityDate: Date;
  Activity: string;
  CreateDate: Date;
  ChangeDate: Date;
  CreatedBy: string;
  ChangedBy: string;
  Status: string;
  CanEdit: boolean;
  CanDelete: boolean;
  CanEditStatus: boolean;
}
