import * as tslib_1 from "tslib";
import { WorkflowActionTypes } from './workflow.actions';
import { WorkflowFormState } from '../model/form-edit-state';
var initialState = {
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
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case WorkflowActionTypes.ClearWorkflow:
            return tslib_1.__assign({}, initialState, { successMessage: '', errorMessage: '', deleteCategoryError: '', deleteCategorySuccess: '', canConfigureWorkflow: state.canConfigureWorkflow, loadingPermission: state.loadingPermission, formState: WorkflowFormState.Viewing });
        case WorkflowActionTypes.ChangeWorkFlowFormState:
            return tslib_1.__assign({}, state, { formState: action.payload.formState });
        case WorkflowActionTypes.LoadIssueCategoryTypes:
            return tslib_1.__assign({}, initialState, { canConfigureWorkflow: state.canConfigureWorkflow });
        case WorkflowActionTypes.LoadIssueCategoryTypesSuccess:
            return tslib_1.__assign({}, state, { assetClassTypes: action.payload.assetClassTypes, issueClasses: action.payload.issueClasses, errorMessage: '' });
        case WorkflowActionTypes.LoadIssueCategoryTypesFailure:
            return tslib_1.__assign({}, state, { errorMessage: action.payload.errorMessage });
        case WorkflowActionTypes.SelectCategory:
            return tslib_1.__assign({}, state, { categoryDetails: null, selectedCategoryID: action.payload.categoryID });
        case WorkflowActionTypes.LoadCategoryDetails:
            return tslib_1.__assign({}, state, { categoryDetails: null });
        case WorkflowActionTypes.LoadCategoryDetailsSuccess:
            return tslib_1.__assign({}, state, { categoryDetails: {
                    issueStatuses: action.payload.categoryDetails.IssueStatuses,
                    resolutionStatuses: action.payload.categoryDetails.ResolutionStatuses
                } });
        case WorkflowActionTypes.LoadCategoryDetailsFailure:
            return tslib_1.__assign({}, state, { categoryDetails: null, errorMessage: action.payload.errorMessage });
        case WorkflowActionTypes.CanConfigureWorkflow:
            return tslib_1.__assign({}, state, { loadingPermission: true });
        case WorkflowActionTypes.CanConfigureWorkflowSuccess:
            return tslib_1.__assign({}, state, { canConfigureWorkflow: action.payload, loadingPermission: false });
        case WorkflowActionTypes.CanConfigureWorkflowFailure:
            return tslib_1.__assign({}, state, { canConfigureWorkflow: false, errorMessage: action.payload.errorMessage, loadingPermission: false });
        case WorkflowActionTypes.SelectIssueClass:
            return tslib_1.__assign({}, state, { selectedIssueClassID: action.payload.issueClassTypeID });
        case WorkflowActionTypes.SelectIssueClassAndCategory:
            return tslib_1.__assign({}, state, { categoryDetails: null, selectedIssueClassID: action.payload.issueClassTypeID, selectedCategoryID: action.payload.categoryID });
        case WorkflowActionTypes.SaveCategory:
            return tslib_1.__assign({}, state, { successMessage: '', saveErrorMessage: '', waitingOnCategoryResponse: true });
        case WorkflowActionTypes.SaveCategorySuccess:
            var issueClassID_1 = action.payload.IssueClassTypeID;
            var i = state.issueClasses.findIndex(function (c) { return c.IssueClassTypeID === issueClassID_1; });
            var categoryIndex = state.issueClasses[i].Categories.findIndex(function (c) { return c.AssetIssueCategoryTypeID === action.payload.AssetIssueCategoryTypeID; });
            if (categoryIndex >= 0) {
                // category was updated. not new.
                // selected issue category name, class may have been updated
                return tslib_1.__assign({}, state, { selectedIssueClassID: action.payload.IssueClassTypeID, selectedCategoryID: action.payload.AssetIssueCategoryTypeID, waitingOnCategoryResponse: false, successMessage: 'Updated Category', issueClasses: state.issueClasses.map(function (issueClass) {
                        if (issueClass.IssueClassTypeID === issueClassID_1) {
                            return tslib_1.__assign({}, issueClass, { Categories: issueClass.Categories.map(function (issueCategory) {
                                    if (issueCategory.AssetIssueCategoryTypeID === action.payload.AssetIssueCategoryTypeID) {
                                        return action.payload;
                                    }
                                    else {
                                        return issueCategory;
                                    }
                                }) });
                        }
                        else {
                            return issueClass;
                        }
                    }) });
            }
            return tslib_1.__assign({}, state, { waitingOnCategoryResponse: false, saveErrorMessage: '', selectedIssueClassID: action.payload.IssueClassTypeID, selectedCategoryID: action.payload.AssetIssueCategoryTypeID, successMessage: 'Added Category', issueClasses: state.issueClasses.map(function (issueClass) {
                    // append the new category to the currently selected issue class
                    if (issueClass.IssueClassTypeID === issueClassID_1) {
                        return tslib_1.__assign({}, issueClass, { Categories: issueClass.Categories.concat([action.payload]) });
                    }
                    else {
                        return issueClass;
                    }
                }) });
        case WorkflowActionTypes.SaveCategoryFailure:
            return tslib_1.__assign({}, state, { waitingOnCategoryResponse: false, saveErrorMessage: action.payload.errorMessage });
        case WorkflowActionTypes.IssuesAssociatedWithCategory:
            return tslib_1.__assign({}, state, { affectedIssues: null, waitingOnAffectedIssues: true });
        case WorkflowActionTypes.IssuesAssociatedWithCategorySuccess:
            return tslib_1.__assign({}, state, { waitingOnAffectedIssues: false, affectedIssues: action.payload });
        case WorkflowActionTypes.IssuesAssociatedWithCategoryFailure:
            return tslib_1.__assign({}, state, { waitingOnAffectedIssues: false, affectedIssues: null });
        case WorkflowActionTypes.DeleteCategory:
            return tslib_1.__assign({}, state, { waitingOnCategoryResponse: true, deleteCategoryError: '', deleteCategorySuccess: '' });
        case WorkflowActionTypes.DeleteCategorySuccess:
            return tslib_1.__assign({}, state, { waitingOnCategoryResponse: false, deleteCategoryError: '', deleteCategorySuccess: 'Deleted Category' });
        case WorkflowActionTypes.DeleteCategoryFailure:
            return tslib_1.__assign({}, state, { waitingOnCategoryResponse: false, deleteCategoryError: action.payload.errorMessage, deleteCategorySuccess: '' });
        case WorkflowActionTypes.LoadMaps:
            return tslib_1.__assign({}, state, { mapsForAsset: null, layerForMap: null });
        case WorkflowActionTypes.LoadMapsSuccess:
            return tslib_1.__assign({}, state, { mapsForAsset: action.payload, layerForMap: null });
        case WorkflowActionTypes.LoadMapsFailure:
            return tslib_1.__assign({}, state, { errorMessage: action.payload.errorMessage, mapsForAsset: null, layerForMap: null });
        case WorkflowActionTypes.LoadMilestones:
            return tslib_1.__assign({}, state, { layerForMap: null });
        case WorkflowActionTypes.LoadMilestonesSuccess:
            return tslib_1.__assign({}, state, { layerForMap: action.payload });
        case WorkflowActionTypes.LoadMilestonesFailure:
            return tslib_1.__assign({}, state, { errorMessage: action.payload.errorMessage, layerForMap: null });
        case WorkflowActionTypes.LoadGeoSpas:
            return tslib_1.__assign({}, state, { geoSpasForAsset: null });
        case WorkflowActionTypes.LoadGeoSpasSuccess:
            return tslib_1.__assign({}, state, { geoSpasForAsset: action.payload });
        case WorkflowActionTypes.LoadGeoSpasFailure:
            return tslib_1.__assign({}, state, { errorMessage: action.payload.errorMessage, geoSpasForAsset: null });
        default:
            return state;
    }
}
//# sourceMappingURL=workflow.reducer.js.map