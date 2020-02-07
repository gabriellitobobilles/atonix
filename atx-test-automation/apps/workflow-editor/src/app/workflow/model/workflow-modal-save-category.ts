export interface WorkflowModalSaveCategory {
  defaultResolutionStatus: number;
  assetClassTypeChanges: boolean;
  currentResolutionStatuses: Array<{ name: string; id: number }>;
  resolutionStatuses: Array<{ name: string; id: number }>;
}
