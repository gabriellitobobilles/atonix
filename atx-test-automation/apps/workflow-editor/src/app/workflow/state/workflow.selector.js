import { createFeatureSelector, createSelector } from '@ngrx/store';
var getWorkflowFeatureState = createFeatureSelector('workflow');
export var getIssueClasses = createSelector(getWorkflowFeatureState, function (state) { return state.issueClasses; });
export var getSelectedIssueClassID = createSelector(getWorkflowFeatureState, function (state) { return state.selectedIssueClassID; });
export var getSelectedCategoryID = createSelector(getWorkflowFeatureState, function (state) { return state.selectedCategoryID; });
export var getCategoryDetails = createSelector(getWorkflowFeatureState, function (state) { return state.categoryDetails; });
export var getCanConfigureWorkflow = createSelector(getWorkflowFeatureState, function (state) { return state.canConfigureWorkflow; });
export var getErrorMessage = createSelector(getWorkflowFeatureState, function (state) { return state.errorMessage; });
export var getSuccessMessage = createSelector(getWorkflowFeatureState, function (state) { return state.successMessage; });
export var getSaveErrorMessage = createSelector(getWorkflowFeatureState, function (state) { return state.saveErrorMessage; });
export var getIsLoadingPermission = createSelector(getWorkflowFeatureState, function (state) { return state.loadingPermission; });
export var getWaitingOnCategoryResponse = createSelector(getWorkflowFeatureState, function (state) { return state.waitingOnCategoryResponse; });
export var getSelectedIssueClass = createSelector(getWorkflowFeatureState, function (state) {
    if (state.issueClasses && state.selectedIssueClassID !== -1) {
        for (var _i = 0, _a = state.issueClasses; _i < _a.length; _i++) {
            var issueClass = _a[_i];
            if (issueClass.IssueClassTypeID === state.selectedIssueClassID) {
                return issueClass;
            }
        }
    }
    return null;
});
export var getSelectedCategory = createSelector(getWorkflowFeatureState, function (state) {
    if (state.issueClasses && state.selectedIssueClassID !== -1 && state.selectedCategoryID !== -1) {
        for (var _i = 0, _a = state.issueClasses; _i < _a.length; _i++) {
            var issueClass = _a[_i];
            if (issueClass.IssueClassTypeID === state.selectedIssueClassID && issueClass.Categories) {
                for (var _b = 0, _c = issueClass.Categories; _b < _c.length; _b++) {
                    var category = _c[_b];
                    if (category.AssetIssueCategoryTypeID === state.selectedCategoryID) {
                        return category;
                    }
                }
            }
        }
    }
    return null;
});
export var getCategoryAssetClassTypeIDs = createSelector(getSelectedCategory, function (cat) { return (cat ? cat.MappedAssetClassTypeIDs : null); });
export var getAllAssetClassTypes = createSelector(getWorkflowFeatureState, function (state) { return state.assetClassTypes; });
export var getFormState = createSelector(getWorkflowFeatureState, function (state) { return state.formState; });
export var getWaitingOnAffectedIssues = createSelector(getWorkflowFeatureState, function (state) { return state.waitingOnAffectedIssues; });
export var getAffectedIssues = createSelector(getWorkflowFeatureState, function (state) { return state.affectedIssues; });
export var getDeleteCategoryError = createSelector(getWorkflowFeatureState, function (state) { return state.deleteCategoryError; });
export var getDeleteCategorySuccess = createSelector(getWorkflowFeatureState, function (state) { return state.deleteCategorySuccess; });
export var getMaps = createSelector(getWorkflowFeatureState, function (state) { return state.mapsForAsset; });
export var getMapLayer = createSelector(getWorkflowFeatureState, function (state) { return state.layerForMap; });
export var getGeoSpas = createSelector(getWorkflowFeatureState, function (state) { return state.geoSpasForAsset; });
export var workflowQuery = {
    getIssueClasses: getIssueClasses,
    getSelectedIssueClassID: getSelectedIssueClassID,
    getSelectedCategoryID: getSelectedCategoryID,
    getCategoryDetails: getCategoryDetails,
    getCanConfigureWorkflow: getCanConfigureWorkflow,
    getErrorMessage: getErrorMessage,
    getSuccessMessage: getSuccessMessage,
    getSaveErrorMessage: getSaveErrorMessage,
    getDeleteCategoryError: getDeleteCategoryError,
    getDeleteCategorySuccess: getDeleteCategorySuccess,
    getIsLoadingPermission: getIsLoadingPermission,
    getWaitingOnCategoryResponse: getWaitingOnCategoryResponse,
    getSelectedIssueClass: getSelectedIssueClass,
    getSelectedCategory: getSelectedCategory,
    getCategoryAssetClassTypeIDs: getCategoryAssetClassTypeIDs,
    getAllAssetClassTypes: getAllAssetClassTypes,
    getFormState: getFormState,
    getWaitingOnAffectedIssues: getWaitingOnAffectedIssues,
    getAffectedIssues: getAffectedIssues,
    getMaps: getMaps,
    getMapLayer: getMapLayer,
    getGeoSpas: getGeoSpas
};
//# sourceMappingURL=workflow.selector.js.map