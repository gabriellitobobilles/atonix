import { Action } from '@ngrx/store';
import { IssueAndResolutionStatuses } from '../model/issue-and-resolution-statuses';
import { Category, AssetClassType, IssueClassAndCategory } from '../model/issue-class-and-categories';
import { NewCategory } from '../model/new-category';
import { WorkflowFormState } from '../model/form-edit-state';
import { IAssetIssue, IStatesForLayer, IGeoSpa, IGeoSpaDropdownValue } from '@AtonixWebSites/api';

export enum WorkflowActionTypes {
  ClearWorkflow = '[Workflow] Clear Workflow Settings',
  LoadIssueCategoryTypes = '[Workflow] Load Issue Category Types',
  LoadIssueCategoryTypesSuccess = '[Workflow] Load Issue Category Success',
  LoadIssueCategoryTypesFailure = '[Workflow] Load Issue Category Failure',
  SelectCategory = '[Workflow] Select Category',
  LoadCategoryDetails = '[Workflow] Load Category Details',
  LoadCategoryDetailsSuccess = '[Workflow] Load Category Details Success',
  LoadCategoryDetailsFailure = '[Workflow] Load Category Details Failure',
  SaveCategory = '[Workflow] Save Category',
  SaveCategorySuccess = '[Workflow] Save Category Success',
  SaveCategoryFailure = '[Workflow] Save Category Failure',
  CanConfigureWorkflow = '[Workflow] Can Configure Workflow',
  CanConfigureWorkflowSuccess = '[Workflow] Can Configure Workflow Success',
  CanConfigureWorkflowFailure = '[Workflow] Can Configure Workflow Failure',
  SelectIssueClass = '[Workflow] Select Issue Class',
  SelectIssueClassAndCategory = '[Workflow] Select Issue Class and Category',
  ChangeWorkFlowFormState = '[Workflow] Change Workflow Form State',
  IssuesAssociatedWithCategory = '[Workflow] Find Issues Associated with Category',
  IssuesAssociatedWithCategorySuccess = '[Workflow] Find Issues Success',
  IssuesAssociatedWithCategoryFailure = '[Workflow] Find Issues Failure',
  DeleteCategory = '[Workflow] Delete Category',
  DeleteCategorySuccess = '[Workflow] Delete Category Success',
  DeleteCategoryFailure = '[Workflow] Delete Categroy Failure',
  LoadMaps = '[Workflow] Load Maps',
  LoadMapsSuccess = '[Workflow] Load Maps Success',
  LoadMapsFailure = '[Workflow] Load Maps Failure',
  LoadMilestones = '[Workflow] Load Milestones',
  LoadMilestonesSuccess = '[Workflow] Load Milestones Success',
  LoadMilestonesFailure = '[Workflow] Load Milestones Failure',
  LoadGeoSpas = '[Workflow] Load GeoSpas',
  LoadGeoSpasSuccess = '[Workflow] Load GeoSpas Success',
  LoadGeoSpasFailure = '[Workflow] Load GeoSpas Failure'
}

export class ClearWorkflowAction implements Action {
  readonly type = WorkflowActionTypes.ClearWorkflow;
  constructor() {}
}

export class SaveCategoryAction implements Action {
  readonly type = WorkflowActionTypes.SaveCategory;
  constructor(public payload: NewCategory) {}
}

export class SaveCategorySuccessAction implements Action {
  readonly type = WorkflowActionTypes.SaveCategorySuccess;
  constructor(public payload: Category) {}
}

export class SaveCategoryFailureAction implements Action {
  readonly type = WorkflowActionTypes.SaveCategoryFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class CanConfigureWorkflowAction implements Action {
  readonly type = WorkflowActionTypes.CanConfigureWorkflow;
  constructor() {}
}

export class CanConfigureWorkflowSuccessAction implements Action {
  readonly type = WorkflowActionTypes.CanConfigureWorkflowSuccess;
  constructor(public payload: boolean) {}
}

export class CanConfigureWorkflowFailureAction implements Action {
  readonly type = WorkflowActionTypes.CanConfigureWorkflowFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class LoadIssueCategoryTypesAction implements Action {
  readonly type = WorkflowActionTypes.LoadIssueCategoryTypes;
  constructor(public payload: { assetGuid: string }) {}
}

export class LoadIssueCategoryTypesSuccessAction implements Action {
  readonly type = WorkflowActionTypes.LoadIssueCategoryTypesSuccess;
  constructor(public payload: { issueClasses: IssueClassAndCategory[]; assetClassTypes: AssetClassType[] }) {}
}

export class LoadIssueCategoryTypesFailureAction implements Action {
  readonly type = WorkflowActionTypes.LoadIssueCategoryTypesFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class SelectCategoryAction implements Action {
  readonly type = WorkflowActionTypes.SelectCategory;
  constructor(public payload: { categoryID: number }) {}
}

export class LoadCategoryDetailsAction implements Action {
  readonly type = WorkflowActionTypes.LoadCategoryDetails;
  constructor(public payload: { whichCategoryID: number }) {}
}

export class LoadCategoryDetailsSuccessAction implements Action {
  readonly type = WorkflowActionTypes.LoadCategoryDetailsSuccess;
  constructor(public payload: { assetIssueCategoryID: number; categoryDetails: IssueAndResolutionStatuses }) {}
}

export class LoadCategoryDetailsFailureAction implements Action {
  readonly type = WorkflowActionTypes.LoadCategoryDetailsFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class SelectIssueClassAction implements Action {
  readonly type = WorkflowActionTypes.SelectIssueClass;
  constructor(public payload: { issueClassTypeID: number }) {}
}

export class SelectIssueClassAndCategoryAction implements Action {
  readonly type = WorkflowActionTypes.SelectIssueClassAndCategory;
  constructor(public payload: { issueClassTypeID: number; categoryID: number }) {}
}

export class ChangeWorkFlowFormState implements Action {
  readonly type = WorkflowActionTypes.ChangeWorkFlowFormState;
  constructor(public payload: { formState: WorkflowFormState }) {}
}

export class IssuesAssociatedWithCategory implements Action {
  readonly type = WorkflowActionTypes.IssuesAssociatedWithCategory;
  constructor() {}
}

export class IssuesAssociatedWithCategorySuccess implements Action {
  readonly type = WorkflowActionTypes.IssuesAssociatedWithCategorySuccess;
  constructor(public payload: IAssetIssue[]) {}
}

export class IssuesAssociatedWithCategoryFailure implements Action {
  readonly type = WorkflowActionTypes.IssuesAssociatedWithCategoryFailure;
  constructor(public payload: string) {}
}

export class DeleteCategoryAction implements Action {
  readonly type = WorkflowActionTypes.DeleteCategory;
  constructor(public payload: { assetIssueCategoryID: number }) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = WorkflowActionTypes.DeleteCategorySuccess;
  constructor() {}
}

export class DeleteCategoryFailure implements Action {
  readonly type = WorkflowActionTypes.DeleteCategoryFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class LoadMapsAction implements Action {
  readonly type = WorkflowActionTypes.LoadMaps;
  constructor(public payload: { assetGuid: string }) {}
}

export class LoadMapsSuccess implements Action {
  readonly type = WorkflowActionTypes.LoadMapsSuccess;
  constructor(public payload: Map<string, IGeoSpaDropdownValue>) {}
}

export class LoadMapsFailure implements Action {
  readonly type = WorkflowActionTypes.LoadMapsFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class LoadMilestonesAction implements Action {
  readonly type = WorkflowActionTypes.LoadMilestones;
  constructor(public payload: { assetGuid: string; mapID: number; mapName: string }) {}
}

export class LoadMilestonesSuccess implements Action {
  readonly type = WorkflowActionTypes.LoadMilestonesSuccess;
  constructor(public payload: IStatesForLayer) {}
}

export class LoadMilestonesFailure implements Action {
  readonly type = WorkflowActionTypes.LoadMilestonesFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export class LoadGeoSpasAction implements Action {
  readonly type = WorkflowActionTypes.LoadGeoSpas;
  constructor(public payload: { assetGuid: string }) {}
}

export class LoadGeoSpasSuccess implements Action {
  readonly type = WorkflowActionTypes.LoadGeoSpasSuccess;
  constructor(public payload: IGeoSpa[]) {}
}

export class LoadGeoSpasFailure implements Action {
  readonly type = WorkflowActionTypes.LoadGeoSpasFailure;
  constructor(public payload: { errorMessage: string }) {}
}

export type WorkflowActions =
  | ClearWorkflowAction
  | LoadIssueCategoryTypesAction
  | LoadIssueCategoryTypesSuccessAction
  | LoadIssueCategoryTypesFailureAction
  | SelectCategoryAction
  | LoadCategoryDetailsAction
  | LoadCategoryDetailsSuccessAction
  | LoadCategoryDetailsFailureAction
  | SaveCategoryAction
  | SaveCategorySuccessAction
  | SaveCategoryFailureAction
  | CanConfigureWorkflowAction
  | CanConfigureWorkflowSuccessAction
  | CanConfigureWorkflowFailureAction
  | SelectIssueClassAction
  | SelectIssueClassAndCategoryAction
  | ChangeWorkFlowFormState
  | IssuesAssociatedWithCategory
  | IssuesAssociatedWithCategorySuccess
  | IssuesAssociatedWithCategoryFailure
  | DeleteCategoryAction
  | DeleteCategorySuccess
  | DeleteCategoryFailure
  | LoadMapsAction
  | LoadMapsSuccess
  | LoadMapsFailure
  | LoadMilestonesAction
  | LoadMilestonesSuccess
  | LoadMilestonesFailure
  | LoadGeoSpasAction
  | LoadGeoSpasSuccess
  | LoadGeoSpasFailure;
