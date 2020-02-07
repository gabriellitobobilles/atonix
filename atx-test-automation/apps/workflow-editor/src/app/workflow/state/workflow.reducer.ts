import { WorkflowActions, WorkflowActionTypes } from './workflow.actions';
import { AssetClassType, IssueClassAndCategory } from '../model/issue-class-and-categories';
import { IssueStatus, ResolutionStatus } from '../model/issue-and-resolution-statuses';
import { WorkflowFormState } from '../model/form-edit-state';
import { IAssetIssue, IStatesForLayer, IGeoSpa, IGeoSpaDropdownValue } from '@AtonixWebSites/api';

export interface WorkflowState {
  assetClassTypes: AssetClassType[];
  issueClasses: IssueClassAndCategory[];
  selectedIssueClassID: number;
  selectedCategoryID: number;
  categoryDetails: {
    issueStatuses: IssueStatus[];
    resolutionStatuses: ResolutionStatus[];
  };
  canConfigureWorkflow: boolean;
  errorMessage: string;
  successMessage: string;
  saveErrorMessage: string;
  deleteCategoryError: string;
  deleteCategorySuccess: string;
  loadingPermission: boolean;
  waitingOnCategoryResponse: boolean;
  waitingOnAffectedIssues: boolean;
  affectedIssues: IAssetIssue[];
  formState: WorkflowFormState;
  mapsForAsset: Map<string, IGeoSpaDropdownValue>;
  layerForMap: IStatesForLayer;
  geoSpasForAsset: IGeoSpa[];
}

const initialState: WorkflowState = {
  assetClassTypes: null,
  issueClasses: null,
  selectedIssueClassID: -1,
  selectedCategoryID: -1,
  categoryDetails: null,
  canConfigureWorkflow: null,
  errorMessage: '',
  successMessage: '',
  deleteCategoryError: '',
  deleteCategorySuccess: '',
  loadingPermission: false,
  waitingOnCategoryResponse: false,
  saveErrorMessage: '',
  waitingOnAffectedIssues: false,
  affectedIssues: null,
  formState: WorkflowFormState.Viewing,
  mapsForAsset: null,
  layerForMap: null,
  geoSpasForAsset: null
};

export function reducer(state = initialState, action: WorkflowActions): WorkflowState {
  switch (action.type) {
    case WorkflowActionTypes.ClearWorkflow:
      return {
        ...initialState,
        successMessage: '',
        errorMessage: '',
        deleteCategoryError: '',
        deleteCategorySuccess: '',
        canConfigureWorkflow: state.canConfigureWorkflow,
        loadingPermission: state.loadingPermission,
        formState: WorkflowFormState.Viewing
      };
    case WorkflowActionTypes.ChangeWorkFlowFormState:
      return {
        ...state,
        formState: action.payload.formState
      };

    case WorkflowActionTypes.LoadIssueCategoryTypes:
      return {
        ...initialState,
        canConfigureWorkflow: state.canConfigureWorkflow
      };

    case WorkflowActionTypes.LoadIssueCategoryTypesSuccess:
      return {
        ...state,
        assetClassTypes: action.payload.assetClassTypes,
        issueClasses: action.payload.issueClasses,
        errorMessage: ''
      };

    case WorkflowActionTypes.LoadIssueCategoryTypesFailure:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case WorkflowActionTypes.SelectCategory:
      return {
        ...state,
        categoryDetails: null,
        selectedCategoryID: action.payload.categoryID
      };
    case WorkflowActionTypes.LoadCategoryDetails:
      return {
        ...state,
        categoryDetails: null
      };
    case WorkflowActionTypes.LoadCategoryDetailsSuccess:
      return {
        ...state,
        categoryDetails: {
          issueStatuses: action.payload.categoryDetails.IssueStatuses,
          resolutionStatuses: action.payload.categoryDetails.ResolutionStatuses
        }
      };

    case WorkflowActionTypes.LoadCategoryDetailsFailure:
      return {
        ...state,
        categoryDetails: null,
        errorMessage: action.payload.errorMessage
      };
    case WorkflowActionTypes.CanConfigureWorkflow:
      return {
        ...state,
        loadingPermission: true
      };
    case WorkflowActionTypes.CanConfigureWorkflowSuccess:
      return {
        ...state,
        canConfigureWorkflow: action.payload,
        loadingPermission: false
      };
    case WorkflowActionTypes.CanConfigureWorkflowFailure:
      return {
        ...state,
        canConfigureWorkflow: false,
        errorMessage: action.payload.errorMessage,
        loadingPermission: false
      };
    case WorkflowActionTypes.SelectIssueClass:
      return {
        ...state,
        selectedIssueClassID: action.payload.issueClassTypeID
      };
    case WorkflowActionTypes.SelectIssueClassAndCategory:
      return {
        ...state,
        categoryDetails: null,
        selectedIssueClassID: action.payload.issueClassTypeID,
        selectedCategoryID: action.payload.categoryID
      };
    case WorkflowActionTypes.SaveCategory:
      return {
        ...state,
        successMessage: '',
        saveErrorMessage: '',
        waitingOnCategoryResponse: true
      };
    case WorkflowActionTypes.SaveCategorySuccess:
      const issueClassID = action.payload.IssueClassTypeID;
      const i = state.issueClasses.findIndex(c => c.IssueClassTypeID === issueClassID);
      const categoryIndex = state.issueClasses[i].Categories.findIndex(
        c => c.AssetIssueCategoryTypeID === action.payload.AssetIssueCategoryTypeID
      );
      if (categoryIndex >= 0) {
        // category was updated. not new.
        // selected issue category name, class may have been updated
        return {
          ...state,
          selectedIssueClassID: action.payload.IssueClassTypeID,
          selectedCategoryID: action.payload.AssetIssueCategoryTypeID,
          waitingOnCategoryResponse: false,
          successMessage: 'Updated Category',
          issueClasses: state.issueClasses.map(issueClass => {
            if (issueClass.IssueClassTypeID === issueClassID) {
              return {
                ...issueClass,
                Categories: issueClass.Categories.map(issueCategory => {
                  if (issueCategory.AssetIssueCategoryTypeID === action.payload.AssetIssueCategoryTypeID) {
                    return action.payload;
                  } else {
                    return issueCategory;
                  }
                })
              };
            } else {
              return issueClass;
            }
          })
        };
      }
      return {
        ...state,
        waitingOnCategoryResponse: false,
        saveErrorMessage: '',
        selectedIssueClassID: action.payload.IssueClassTypeID,
        selectedCategoryID: action.payload.AssetIssueCategoryTypeID,
        successMessage: 'Added Category',
        issueClasses: state.issueClasses.map(issueClass => {
          // append the new category to the currently selected issue class
          if (issueClass.IssueClassTypeID === issueClassID) {
            return {
              ...issueClass,
              Categories: [...issueClass.Categories, action.payload]
            };
          } else {
            return issueClass;
          }
        })
      };
    case WorkflowActionTypes.SaveCategoryFailure:
      return {
        ...state,
        waitingOnCategoryResponse: false,
        saveErrorMessage: action.payload.errorMessage
      };
    case WorkflowActionTypes.IssuesAssociatedWithCategory:
      return {
        ...state,
        affectedIssues: null,
        waitingOnAffectedIssues: true
      };

    case WorkflowActionTypes.IssuesAssociatedWithCategorySuccess:
      return {
        ...state,
        waitingOnAffectedIssues: false,
        affectedIssues: action.payload
      };

    case WorkflowActionTypes.IssuesAssociatedWithCategoryFailure:
      return {
        ...state,
        waitingOnAffectedIssues: false,
        affectedIssues: null
      };
    case WorkflowActionTypes.DeleteCategory:
      return {
        ...state,
        waitingOnCategoryResponse: true,
        deleteCategoryError: '',
        deleteCategorySuccess: ''
      };
    case WorkflowActionTypes.DeleteCategorySuccess:
      return {
        ...state,
        waitingOnCategoryResponse: false,
        deleteCategoryError: '',
        deleteCategorySuccess: 'Deleted Category'
      };
    case WorkflowActionTypes.DeleteCategoryFailure:
      return {
        ...state,
        waitingOnCategoryResponse: false,
        deleteCategoryError: action.payload.errorMessage,
        deleteCategorySuccess: ''
      };
    case WorkflowActionTypes.LoadMaps:
      return {
        ...state,
        mapsForAsset: null,
        layerForMap: null
      };
    case WorkflowActionTypes.LoadMapsSuccess:
      return {
        ...state,
        mapsForAsset: action.payload,
        layerForMap: null
      };
    case WorkflowActionTypes.LoadMapsFailure:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        mapsForAsset: null,
        layerForMap: null
      };
    case WorkflowActionTypes.LoadMilestones:
      return {
        ...state,
        layerForMap: null
      };
    case WorkflowActionTypes.LoadMilestonesSuccess:
      return {
        ...state,
        layerForMap: action.payload
      };
    case WorkflowActionTypes.LoadMilestonesFailure:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        layerForMap: null
      };
    case WorkflowActionTypes.LoadGeoSpas:
      return {
        ...state,
        geoSpasForAsset: null
      };
    case WorkflowActionTypes.LoadGeoSpasSuccess:
      return {
        ...state,
        geoSpasForAsset: action.payload
      };
    case WorkflowActionTypes.LoadGeoSpasFailure:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        geoSpasForAsset: null
      };
    default:
      return state;
  }
}
