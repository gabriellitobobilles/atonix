import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { workflowQuery } from './workflow.selector';
import { ClearWorkflowAction, LoadIssueCategoryTypesAction, CanConfigureWorkflowAction, SelectCategoryAction, SelectIssueClassAction, SaveCategoryAction, ChangeWorkFlowFormState, IssuesAssociatedWithCategory, DeleteCategoryAction, LoadMapsAction, LoadMilestonesAction, LoadGeoSpasAction } from './workflow.actions';
import { combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
var WorkflowFacade = /** @class */ (function () {
    function WorkflowFacade(store) {
        var _this = this;
        this.store = store;
        this.selectedAssetClassTypesSubject = new BehaviorSubject(null);
        this.allAssetClassTypes$ = this.store.pipe(select(workflowQuery.getAllAssetClassTypes));
        this.issueClasses$ = this.store.pipe(select(workflowQuery.getIssueClasses));
        this.selectedIssueClassID$ = this.store.pipe(select(workflowQuery.getSelectedIssueClassID));
        this.selectedIssueClass$ = this.store.pipe(select(workflowQuery.getSelectedIssueClass));
        this.selectedCategoryID$ = this.store.pipe(select(workflowQuery.getSelectedCategoryID));
        this.selectedCategory$ = this.store.pipe(select(workflowQuery.getSelectedCategory));
        this.selectedAssetClassTypeIDs$ = this.store.pipe(select(workflowQuery.getCategoryAssetClassTypeIDs));
        this.selectedAssetClassTypes$ = this.selectedAssetClassTypesSubject.asObservable();
        this.categoryDetails$ = this.store.pipe(select(workflowQuery.getCategoryDetails));
        this.canConfigureWorkflow$ = this.store.pipe(select(workflowQuery.getCanConfigureWorkflow));
        this.errorMessage$ = this.store.pipe(select(workflowQuery.getErrorMessage));
        this.saveErrorMessage$ = this.store.pipe(select(workflowQuery.getSaveErrorMessage));
        this.successMessage$ = this.store.pipe(select(workflowQuery.getSuccessMessage));
        this.isLoadingPermission$ = this.store.pipe(select(workflowQuery.getIsLoadingPermission));
        this.waitingOnCategoryResponse$ = this.store.pipe(select(workflowQuery.getWaitingOnCategoryResponse));
        this.formState$ = this.store.pipe(select(workflowQuery.getFormState));
        this.waitingOnAffectedIssues$ = this.store.pipe(select(workflowQuery.getWaitingOnAffectedIssues));
        this.affectedIssues$ = this.store.pipe(select(workflowQuery.getAffectedIssues));
        this.deleteCategoryError$ = this.store.pipe(select(workflowQuery.getDeleteCategoryError));
        this.deleteCategorySuccess$ = this.store.pipe(select(workflowQuery.getDeleteCategorySuccess));
        this.geoSpasForAsset$ = this.store.pipe(select(workflowQuery.getGeoSpas));
        this.mapsForAsset$ = this.store.pipe(select(workflowQuery.getMaps));
        this.layerForMap$ = this.store.pipe(select(workflowQuery.getMapLayer));
        this.unsubscribe = new Subject();
        this.combinedAssetClassTypeDetails$ = combineLatest(this.allAssetClassTypes$, this.selectedAssetClassTypeIDs$).pipe(takeUntil(this.unsubscribe), map(function (_a) {
            var allAssetClassTypes = _a[0], selectedIDs = _a[1];
            return { allAssetClassTypes: allAssetClassTypes, selectedIDs: selectedIDs };
        }));
        this.combinedAssetClassTypeDetails$.subscribe(function (values) {
            if (values.allAssetClassTypes && values.selectedIDs) {
                _this.selectedAssetClassTypesSubject.next(values.allAssetClassTypes.filter(function (a) { return values.selectedIDs.indexOf(a.AssetClassTypeID) >= 0; }));
            }
        });
    }
    WorkflowFacade.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
    };
    WorkflowFacade.prototype.clearWorkflow = function () {
        this.store.dispatch(new ClearWorkflowAction());
    };
    WorkflowFacade.prototype.setFormState = function (formState) {
        this.store.dispatch(new ChangeWorkFlowFormState({ formState: formState }));
    };
    WorkflowFacade.prototype.loadIssueCategoryTypes = function (assetGuid) {
        this.store.dispatch(new LoadIssueCategoryTypesAction({ assetGuid: assetGuid }));
    };
    WorkflowFacade.prototype.canConfigureWorkflow = function () {
        this.store.dispatch(new CanConfigureWorkflowAction());
    };
    WorkflowFacade.prototype.selectCategory = function (categoryID) {
        this.store.dispatch(new SelectCategoryAction({ categoryID: categoryID }));
    };
    WorkflowFacade.prototype.selectIssueClass = function (issueClassTypeID) {
        this.store.dispatch(new SelectIssueClassAction({ issueClassTypeID: issueClassTypeID }));
    };
    WorkflowFacade.prototype.saveCategory = function (category) {
        this.store.dispatch(new SaveCategoryAction(category));
    };
    WorkflowFacade.prototype.deleteCategory = function (assetIssueCategoryID) {
        this.store.dispatch(new DeleteCategoryAction({ assetIssueCategoryID: assetIssueCategoryID }));
    };
    WorkflowFacade.prototype.issuesAssociatedWithCategory = function () {
        this.store.dispatch(new IssuesAssociatedWithCategory());
    };
    WorkflowFacade.prototype.loadMapsForAsset = function (assetGuid) {
        this.store.dispatch(new LoadMapsAction({ assetGuid: assetGuid }));
    };
    WorkflowFacade.prototype.loadMilestonesForMap = function (assetGuid, mapID, mapName) {
        this.store.dispatch(new LoadMilestonesAction({ assetGuid: assetGuid, mapID: mapID, mapName: mapName }));
    };
    WorkflowFacade.prototype.loadGeoSpasForAsset = function (assetGuid) {
        this.store.dispatch(new LoadGeoSpasAction({ assetGuid: assetGuid }));
    };
    WorkflowFacade = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], WorkflowFacade);
    return WorkflowFacade;
}());
export { WorkflowFacade };
//# sourceMappingURL=workflow.facade.js.map