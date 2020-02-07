import { IGeoSpaDropdownItem } from '@AtonixWebSites/api';
import { IAssetClassType } from './asset';

export interface ActionType {
  ActionTypeID: number;
  ActionTypeDesc: string;
}
export interface WorkflowAction {
  ActionName: string;
  ActionTypeID: number;
  CategoryNotificationID: number;
  TriggerOnEnterStatus: boolean;
  TriggeringResolutionStatuses: boolean[];
}
export interface WorkflowEmailAction extends WorkflowAction {
  EmailSubject: string;
  EmailContent: string;
  EmailList: string[];
}
export interface WorkflowMapStatusAction extends WorkflowAction {
  MapName: string;
  AssetClassTypeID: number;
  MilestoneID: number; // will upsert CF table with .Type = MapName, .Value (actual) = MilestoneID and .Timestamp = now
}
export interface WorkflowUpdateAttributeAction extends WorkflowAction {
  AttributeName: string;
  AttributeValue: string;
}
export const ActionTypes: ActionType[] = [
  { ActionTypeID: 1, ActionTypeDesc: 'Email' },
  { ActionTypeID: 2, ActionTypeDesc: 'Update a Map Status' },
  { ActionTypeID: 3, ActionTypeDesc: 'Update Attribute' }
  // { ActionTypeID: 4, ActionTypeDesc: 'Modify Asset Tags' },
  // { ActionTypeID: 5, ActionTypeDesc: 'Create Blog Entry' },
  // { ActionTypeID: 6, ActionTypeDesc: 'Assign User Action' },
  // { ActionTypeID: 7, ActionTypeDesc: 'Create Issue' },
  // { ActionTypeID: 8, ActionTypeDesc: 'Update Activity Status' },
  // { ActionTypeID: 9, ActionTypeDesc: 'Update Issue Status' }
];
