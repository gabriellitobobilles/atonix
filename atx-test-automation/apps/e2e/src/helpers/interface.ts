export interface EmailActionData {
  type?: string;
  actionName: string;
  recipient: string;
  subject: string;
  messageBody: string;
  allowOverride?: boolean;
  attachments?: string[];
  advancedSettings: {
    listItemsToSelect?: string[],
    actionStatus: string
  };
}
export interface AttributeActionData {
  type?: string;
  actionName: string;
  name: string;
  value: string;
  advancedSettings: {
    listItemsToSelect?: string[],
    actionStatus: string
  };
}
export interface UpdateResolutionActionData {
  type?: string;
  actionName: string;
  resolutionStatusName: string;
  advancedSettings: {
    listItemsToSelect?: string[],
    actionStatus: string
  };
}

export enum PriorityValues {
  'Low' = 'Low', 'Medium' = 'Medium',
  'High' = 'High', 'Critical' = 'Critical'
}

export interface IssueCreationData {
  issueClass: string;
  issueCategory: any;
  issueInfo: {
    name: string,
    priority: PriorityValues,
    status: string,
    resolution?: string,
    showOnScorecard: boolean,
    shortSummary: string
  };
  details?: {
    tags: string[]
  };
}
// -- Asset Explorer --
export interface AssetDetails {
  name: string;
  descriptiveName: string;
  assetType?: string;
  attributes: [AssetAttributes];
}
export interface AssetAttributes {
  name: string;
  value?: string | number | boolean;
  dateValue?: Date;
  value2?: string | number | boolean;
  value3?: string | number | boolean;
  editted_value?: string | number | boolean;
  editted_dateValue?: Date;
  editted_value2?: string | number | boolean;
  invalid_value?: string | number | boolean;
  attributeType: AttributeTypesEnum;
  categories?: string[];
  favorite: boolean;
}
export enum AttributeTypesEnum {
  'Freeform Text', 'Integer', 'Float', 'Discrete List',
  'Boolean', 'Date'
}

export enum AssetEventsViewEnum {
  'asset', 'events'
}

export enum EventTypesEnum {
  'Fault', 'Inspection', 'Outage'
}

export enum MilestoneStatus {
  'Not Started', 'Mitigation Plan', 'Engineering', 'Procurement',
  'Permitting', 'Construction', 'Close-out', 'Mitigation Complete'
}

export enum MilestoneType {
  'Plan', 'Actual'
}

export interface LineItemBatchEditInterface {
  numOfAssets: number;
  assetNames: string[];
  nonSchedule?: Array<{
    attributeName: string;
    // attributeValue: string;
    value: any;
    type: AttributeTypesEnum;
    attributeOption?: any

  }>;
  schedule?: Array<{
    milestoneType: MilestoneType;
    milestoneStatus: MilestoneStatus;
    milestoneValue: string;
  }>;
}

export interface BlogEntry {
  title: string;
  body: string;
  tags: string[];
  file: string;
  edittedTitle: string;
  edittedBody: string;
  edittedTags: string[];
  edittedFile: string;
}

export interface Attachments {
  imageOrVideoFile: string[];
  imageOrVideoCaption: string[];
  tags: string;
  attachmentFiles: string[];
  attachmentFilesCaption: string[];
}

export interface InfoAssetTree {
  assetName: string;
  assetTree: string;
  copyAssetTree: string;
  pasteAssetTree: string;
  edittedAssetName: string;
  assetTag: string[];
}

export interface SaveAndSaveAllAssets {
  assetTree: string;
  firstAsset: string[];
  secondAsset: string[];
  thirdAsset: string[];
}
