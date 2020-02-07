import { ResolutionStatus } from './issue-and-resolution-statuses';
import { CategoryNotification } from './category-notification';
import { WorkflowAction } from './actions';

export interface NewCategory {
  AssetIssueCategoryTypeID: number;
  CategoryAbbrev: string;
  CategoryDesc: string;
  IssueClassTypeID: number;
  MappedAssetGUID: string;
  IncludeDescendants: boolean;
  MappedAssetClassTypeIDs: number[];
  MappedResolutionStatuses: ResolutionStatus[];
  ActionsOnIssueActivityStatusOpen: WorkflowAction[];
  ActionsOnIssueActivityStatusClosed: WorkflowAction[];
  DefaultResolutionStatus?: number;
}
