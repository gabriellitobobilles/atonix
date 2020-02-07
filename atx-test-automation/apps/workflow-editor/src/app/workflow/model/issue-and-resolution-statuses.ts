import { WorkflowAction } from './actions';

export interface IssueStatus {
  AssetIssueActivityStatusTypeID: number;
  AssetIssueActivityStatusTypeDesc: string;
  IsOpen: boolean;
  IsDefault: boolean;
  Actions: WorkflowAction[];
}

export interface ResolutionStatus {
  AssetIssueResolutionStatusTypeID: number;
  AssetIssueResolutionStatusTypeDesc: string;
  IsDefault: boolean;
  DisplayOrder: number;
  TransitionIDs: number[];
  Actions: WorkflowAction[];
}

export interface IssueAndResolutionStatuses {
  IssueStatuses: IssueStatus[] | null;
  ResolutionStatuses: ResolutionStatus[] | null;
}
