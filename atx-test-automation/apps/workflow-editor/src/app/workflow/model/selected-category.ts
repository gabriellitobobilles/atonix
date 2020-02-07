import { Category } from './issue-class-and-categories';
import { IssueStatus, ResolutionStatus } from './issue-and-resolution-statuses';

export interface SelectedCategory {
  IssueStatuses: IssueStatus[] | null;
  ResolutionStatuses: ResolutionStatus[] | null;
  Category: Category | null;
}
