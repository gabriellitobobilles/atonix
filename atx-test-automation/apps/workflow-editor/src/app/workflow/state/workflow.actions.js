export var WorkflowActionTypes;
(function (WorkflowActionTypes) {
    WorkflowActionTypes["ClearWorkflow"] = "[Workflow] Clear Workflow Settings";
    WorkflowActionTypes["LoadIssueCategoryTypes"] = "[Workflow] Load Issue Category Types";
    WorkflowActionTypes["LoadIssueCategoryTypesSuccess"] = "[Workflow] Load Issue Category Success";
    WorkflowActionTypes["LoadIssueCategoryTypesFailure"] = "[Workflow] Load Issue Category Failure";
    WorkflowActionTypes["SelectCategory"] = "[Workflow] Select Category";
    WorkflowActionTypes["LoadCategoryDetails"] = "[Workflow] Load Category Details";
    WorkflowActionTypes["LoadCategoryDetailsSuccess"] = "[Workflow] Load Category Details Success";
    WorkflowActionTypes["LoadCategoryDetailsFailure"] = "[Workflow] Load Category Details Failure";
    WorkflowActionTypes["SaveCategory"] = "[Workflow] Save Category";
    WorkflowActionTypes["SaveCategorySuccess"] = "[Workflow] Save Category Success";
    WorkflowActionTypes["SaveCategoryFailure"] = "[Workflow] Save Category Failure";
    WorkflowActionTypes["CanConfigureWorkflow"] = "[Workflow] Can Configure Workflow";
    WorkflowActionTypes["CanConfigureWorkflowSuccess"] = "[Workflow] Can Configure Workflow Success";
    WorkflowActionTypes["CanConfigureWorkflowFailure"] = "[Workflow] Can Configure Workflow Failure";
    WorkflowActionTypes["SelectIssueClass"] = "[Workflow] Select Issue Class";
    WorkflowActionTypes["SelectIssueClassAndCategory"] = "[Workflow] Select Issue Class and Category";
    WorkflowActionTypes["ChangeWorkFlowFormState"] = "[Workflow] Change Workflow Form State";
    WorkflowActionTypes["IssuesAssociatedWithCategory"] = "[Workflow] Find Issues Associated with Category";
    WorkflowActionTypes["IssuesAssociatedWithCategorySuccess"] = "[Workflow] Find Issues Success";
    WorkflowActionTypes["IssuesAssociatedWithCategoryFailure"] = "[Workflow] Find Issues Failure";
    WorkflowActionTypes["DeleteCategory"] = "[Workflow] Delete Category";
    WorkflowActionTypes["DeleteCategorySuccess"] = "[Workflow] Delete Category Success";
    WorkflowActionTypes["DeleteCategoryFailure"] = "[Workflow] Delete Categroy Failure";
    WorkflowActionTypes["LoadMaps"] = "[Workflow] Load Maps";
    WorkflowActionTypes["LoadMapsSuccess"] = "[Workflow] Load Maps Success";
    WorkflowActionTypes["LoadMapsFailure"] = "[Workflow] Load Maps Failure";
    WorkflowActionTypes["LoadMilestones"] = "[Workflow] Load Milestones";
    WorkflowActionTypes["LoadMilestonesSuccess"] = "[Workflow] Load Milestones Success";
    WorkflowActionTypes["LoadMilestonesFailure"] = "[Workflow] Load Milestones Failure";
    WorkflowActionTypes["LoadGeoSpas"] = "[Workflow] Load GeoSpas";
    WorkflowActionTypes["LoadGeoSpasSuccess"] = "[Workflow] Load GeoSpas Success";
    WorkflowActionTypes["LoadGeoSpasFailure"] = "[Workflow] Load GeoSpas Failure";
})(WorkflowActionTypes || (WorkflowActionTypes = {}));
var ClearWorkflowAction = /** @class */ (function () {
    function ClearWorkflowAction() {
        this.type = WorkflowActionTypes.ClearWorkflow;
    }
    return ClearWorkflowAction;
}());
export { ClearWorkflowAction };
var SaveCategoryAction = /** @class */ (function () {
    function SaveCategoryAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SaveCategory;
    }
    return SaveCategoryAction;
}());
export { SaveCategoryAction };
var SaveCategorySuccessAction = /** @class */ (function () {
    function SaveCategorySuccessAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SaveCategorySuccess;
    }
    return SaveCategorySuccessAction;
}());
export { SaveCategorySuccessAction };
var SaveCategoryFailureAction = /** @class */ (function () {
    function SaveCategoryFailureAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SaveCategoryFailure;
    }
    return SaveCategoryFailureAction;
}());
export { SaveCategoryFailureAction };
var CanConfigureWorkflowAction = /** @class */ (function () {
    function CanConfigureWorkflowAction() {
        this.type = WorkflowActionTypes.CanConfigureWorkflow;
    }
    return CanConfigureWorkflowAction;
}());
export { CanConfigureWorkflowAction };
var CanConfigureWorkflowSuccessAction = /** @class */ (function () {
    function CanConfigureWorkflowSuccessAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.CanConfigureWorkflowSuccess;
    }
    return CanConfigureWorkflowSuccessAction;
}());
export { CanConfigureWorkflowSuccessAction };
var CanConfigureWorkflowFailureAction = /** @class */ (function () {
    function CanConfigureWorkflowFailureAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.CanConfigureWorkflowFailure;
    }
    return CanConfigureWorkflowFailureAction;
}());
export { CanConfigureWorkflowFailureAction };
var LoadIssueCategoryTypesAction = /** @class */ (function () {
    function LoadIssueCategoryTypesAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadIssueCategoryTypes;
    }
    return LoadIssueCategoryTypesAction;
}());
export { LoadIssueCategoryTypesAction };
var LoadIssueCategoryTypesSuccessAction = /** @class */ (function () {
    function LoadIssueCategoryTypesSuccessAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadIssueCategoryTypesSuccess;
    }
    return LoadIssueCategoryTypesSuccessAction;
}());
export { LoadIssueCategoryTypesSuccessAction };
var LoadIssueCategoryTypesFailureAction = /** @class */ (function () {
    function LoadIssueCategoryTypesFailureAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadIssueCategoryTypesFailure;
    }
    return LoadIssueCategoryTypesFailureAction;
}());
export { LoadIssueCategoryTypesFailureAction };
var SelectCategoryAction = /** @class */ (function () {
    function SelectCategoryAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SelectCategory;
    }
    return SelectCategoryAction;
}());
export { SelectCategoryAction };
var LoadCategoryDetailsAction = /** @class */ (function () {
    function LoadCategoryDetailsAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadCategoryDetails;
    }
    return LoadCategoryDetailsAction;
}());
export { LoadCategoryDetailsAction };
var LoadCategoryDetailsSuccessAction = /** @class */ (function () {
    function LoadCategoryDetailsSuccessAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadCategoryDetailsSuccess;
    }
    return LoadCategoryDetailsSuccessAction;
}());
export { LoadCategoryDetailsSuccessAction };
var LoadCategoryDetailsFailureAction = /** @class */ (function () {
    function LoadCategoryDetailsFailureAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadCategoryDetailsFailure;
    }
    return LoadCategoryDetailsFailureAction;
}());
export { LoadCategoryDetailsFailureAction };
var SelectIssueClassAction = /** @class */ (function () {
    function SelectIssueClassAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SelectIssueClass;
    }
    return SelectIssueClassAction;
}());
export { SelectIssueClassAction };
var SelectIssueClassAndCategoryAction = /** @class */ (function () {
    function SelectIssueClassAndCategoryAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SelectIssueClassAndCategory;
    }
    return SelectIssueClassAndCategoryAction;
}());
export { SelectIssueClassAndCategoryAction };
var ChangeWorkFlowFormState = /** @class */ (function () {
    function ChangeWorkFlowFormState(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.ChangeWorkFlowFormState;
    }
    return ChangeWorkFlowFormState;
}());
export { ChangeWorkFlowFormState };
var IssuesAssociatedWithCategory = /** @class */ (function () {
    function IssuesAssociatedWithCategory() {
        this.type = WorkflowActionTypes.IssuesAssociatedWithCategory;
    }
    return IssuesAssociatedWithCategory;
}());
export { IssuesAssociatedWithCategory };
var IssuesAssociatedWithCategorySuccess = /** @class */ (function () {
    function IssuesAssociatedWithCategorySuccess(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.IssuesAssociatedWithCategorySuccess;
    }
    return IssuesAssociatedWithCategorySuccess;
}());
export { IssuesAssociatedWithCategorySuccess };
var IssuesAssociatedWithCategoryFailure = /** @class */ (function () {
    function IssuesAssociatedWithCategoryFailure(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.IssuesAssociatedWithCategoryFailure;
    }
    return IssuesAssociatedWithCategoryFailure;
}());
export { IssuesAssociatedWithCategoryFailure };
var DeleteCategoryAction = /** @class */ (function () {
    function DeleteCategoryAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.DeleteCategory;
    }
    return DeleteCategoryAction;
}());
export { DeleteCategoryAction };
var DeleteCategorySuccess = /** @class */ (function () {
    function DeleteCategorySuccess() {
        this.type = WorkflowActionTypes.DeleteCategorySuccess;
    }
    return DeleteCategorySuccess;
}());
export { DeleteCategorySuccess };
var DeleteCategoryFailure = /** @class */ (function () {
    function DeleteCategoryFailure(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.DeleteCategoryFailure;
    }
    return DeleteCategoryFailure;
}());
export { DeleteCategoryFailure };
var LoadMapsAction = /** @class */ (function () {
    function LoadMapsAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMaps;
    }
    return LoadMapsAction;
}());
export { LoadMapsAction };
var LoadMapsSuccess = /** @class */ (function () {
    function LoadMapsSuccess(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMapsSuccess;
    }
    return LoadMapsSuccess;
}());
export { LoadMapsSuccess };
var LoadMapsFailure = /** @class */ (function () {
    function LoadMapsFailure(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMapsFailure;
    }
    return LoadMapsFailure;
}());
export { LoadMapsFailure };
var LoadMilestonesAction = /** @class */ (function () {
    function LoadMilestonesAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMilestones;
    }
    return LoadMilestonesAction;
}());
export { LoadMilestonesAction };
var LoadMilestonesSuccess = /** @class */ (function () {
    function LoadMilestonesSuccess(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMilestonesSuccess;
    }
    return LoadMilestonesSuccess;
}());
export { LoadMilestonesSuccess };
var LoadMilestonesFailure = /** @class */ (function () {
    function LoadMilestonesFailure(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadMilestonesFailure;
    }
    return LoadMilestonesFailure;
}());
export { LoadMilestonesFailure };
var LoadGeoSpasAction = /** @class */ (function () {
    function LoadGeoSpasAction(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadGeoSpas;
    }
    return LoadGeoSpasAction;
}());
export { LoadGeoSpasAction };
var LoadGeoSpasSuccess = /** @class */ (function () {
    function LoadGeoSpasSuccess(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadGeoSpasSuccess;
    }
    return LoadGeoSpasSuccess;
}());
export { LoadGeoSpasSuccess };
var LoadGeoSpasFailure = /** @class */ (function () {
    function LoadGeoSpasFailure(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadGeoSpasFailure;
    }
    return LoadGeoSpasFailure;
}());
export { LoadGeoSpasFailure };
//# sourceMappingURL=workflow.actions.js.map