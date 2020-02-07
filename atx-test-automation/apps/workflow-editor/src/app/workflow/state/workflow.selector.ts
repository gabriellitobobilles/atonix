import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.reducer';

const getWorkflowFeatureState = createFeatureSelector<WorkflowState>('workflow');

export const getIssueClasses = createSelector(
  getWorkflowFeatureState,
  state => state.issueClasses
);

export const getSelectedIssueClassID = createSelector(
  getWorkflowFeatureState,
  state => state.selectedIssueClassID
);

export const getSelectedCategoryID = createSelector(
  getWorkflowFeatureState,
  state => state.selectedCategoryID
);

export const getCategoryDetails = createSelector(
  getWorkflowFeatureState,
  state => state.categoryDetails
);

export const getCanConfigureWorkflow = createSelector(
  getWorkflowFeatureState,
  state => state.canConfigureWorkflow
);

export const getErrorMessage = createSelector(
  getWorkflowFeatureState,
  state => state.errorMessage
);

export const getSuccessMessage = createSelector(
  getWorkflowFeatureState,
  state => state.successMessage
);

export const getSaveErrorMessage = createSelector(
  getWorkflowFeatureState,
  state => state.saveErrorMessage
);

export const getIsLoadingPermission = createSelector(
  getWorkflowFeatureState,
  state => state.loadingPermission
);

export const getWaitingOnCategoryResponse = createSelector(
  getWorkflowFeatureState,
  state => state.waitingOnCategoryResponse
);

export const getSelectedIssueClass = createSelector(
  getWorkflowFeatureState,
  state => {
    if (state.issueClasses && state.selectedIssueClassID !== -1) {
      for (const issueClass of state.issueClasses) {
        if (issueClass.IssueClassTypeID === state.selectedIssueClassID) {
          return issueClass;
        }
      }
    }
    return null;
  }
);

export const getSelectedCategory = createSelector(
  getWorkflowFeatureState,
  state => {
    if (state.issueClasses && state.selectedIssueClassID !== -1 && state.selectedCategoryID !== -1) {
      for (const issueClass of state.issueClasses) {
        if (issueClass.IssueClassTypeID === state.selectedIssueClassID && issueClass.Categories) {
          for (const category of issueClass.Categories) {
            if (category.AssetIssueCategoryTypeID === state.selectedCategoryID) {
              return category;
            }
          }
        }
      }
    }
    return null;
  }
);

export const getCategoryAssetClassTypeIDs = createSelector(
  getSelectedCategory,
  cat => (cat ? cat.MappedAssetClassTypeIDs : null)
);

export const getAllAssetClassTypes = createSelector(
  getWorkflowFeatureState,
  state => state.assetClassTypes
);

export const getFormState = createSelector(
  getWorkflowFeatureState,
  state => state.formState
);

export const getWaitingOnAffectedIssues = createSelector(
  getWorkflowFeatureState,
  state => state.waitingOnAffectedIssues
);

export const getAffectedIssues = createSelector(
  getWorkflowFeatureState,
  state => state.affectedIssues
);

export const getDeleteCategoryError = createSelector(
  getWorkflowFeatureState,
  state => state.deleteCategoryError
);

export const getDeleteCategorySuccess = createSelector(
  getWorkflowFeatureState,
  state => state.deleteCategorySuccess
);

export const getMaps = createSelector(
  getWorkflowFeatureState,
  state => state.mapsForAsset
);

export const getMapLayer = createSelector(
  getWorkflowFeatureState,
  state => state.layerForMap
);

export const getGeoSpas = createSelector(
  getWorkflowFeatureState,
  state => state.geoSpasForAsset
);

export const workflowQuery = {
  getIssueClasses,
  getSelectedIssueClassID,
  getSelectedCategoryID,
  getCategoryDetails,
  getCanConfigureWorkflow,
  getErrorMessage,
  getSuccessMessage,
  getSaveErrorMessage,
  getDeleteCategoryError,
  getDeleteCategorySuccess,
  getIsLoadingPermission,
  getWaitingOnCategoryResponse,
  getSelectedIssueClass,
  getSelectedCategory,
  getCategoryAssetClassTypeIDs,
  getAllAssetClassTypes,
  getFormState,
  getWaitingOnAffectedIssues,
  getAffectedIssues,
  getMaps,
  getMapLayer,
  getGeoSpas
};
