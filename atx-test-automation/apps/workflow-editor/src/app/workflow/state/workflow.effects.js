import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { WorkflowService } from '../services/workflow.service';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as workflowActions from './workflow.actions';
import { Store } from '@ngrx/store';
import { WorkflowFacade } from './workflow.facade';
import { Router } from '@angular/router';
import { GeospaModelService } from '@AtonixWebSites/api';
var WorkflowEffects = /** @class */ (function () {
    function WorkflowEffects(actions$, workflowService, geospaModelService, facade, store, router) {
        var _this = this;
        this.actions$ = actions$;
        this.workflowService = workflowService;
        this.geospaModelService = geospaModelService;
        this.facade = facade;
        this.store = store;
        this.router = router;
        this.canConfigureWorkflow$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.CanConfigureWorkflow)).pipe(switchMap(function (_) {
            return _this.workflowService.canConfigureWorkflow().pipe(map(function (asset) { return new workflowActions.CanConfigureWorkflowSuccessAction(asset); }), catchError(function (error) { return of(new workflowActions.CanConfigureWorkflowFailureAction({ errorMessage: error })); }));
        }));
        this.issueCategoryTypes$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadIssueCategoryTypes)).pipe(map(function (action) { return action.payload.assetGuid; }), switchMap(function (guid) {
            return _this.workflowService.issueCategoryTypes(guid).pipe(map(function (apiPayload) {
                if (apiPayload === null) {
                    return new workflowActions.LoadIssueCategoryTypesFailureAction({ errorMessage: 'No categories found' });
                }
                return new workflowActions.LoadIssueCategoryTypesSuccessAction({
                    issueClasses: apiPayload.IssueClassAndCategories,
                    assetClassTypes: apiPayload.AssetClassTypes
                });
            }), catchError(function (error) { return of(new workflowActions.LoadIssueCategoryTypesFailureAction({ errorMessage: error })); }));
        }));
        this.issueCategoryTypesLoaded = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadIssueCategoryTypesSuccess)).pipe(map(function (action) { return action.payload.issueClasses; }), tap(function (issueClasses) {
            if (issueClasses && issueClasses.length) {
                _this.store.dispatch(new workflowActions.SelectIssueClassAction({ issueClassTypeID: issueClasses[0].IssueClassTypeID }));
            }
        }));
        this.issuesAssociatedWithCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.IssuesAssociatedWithCategory), withLatestFrom(this.facade.selectedCategoryID$), map(function (_a) {
            var _ = _a[0], selectedCategoryID = _a[1];
            return selectedCategoryID;
        }), switchMap(function (selectedCategoryID) {
            return _this.workflowService.issueWarnings(selectedCategoryID).pipe(map(function (issues) {
                return new workflowActions.IssuesAssociatedWithCategorySuccess(issues);
            }), catchError(function (err) {
                console.log(err);
                return of(new workflowActions.IssuesAssociatedWithCategoryFailure(err.statusText));
            }));
        }));
        this.saveCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SaveCategory), map(function (action) { return action.payload; }), switchMap(function (newCategory) {
            return _this.workflowService.saveCategory(newCategory).pipe(map(function (category) { return new workflowActions.SaveCategorySuccessAction(category); }), catchError(function (err) {
                return of(new workflowActions.SaveCategoryFailureAction({ errorMessage: err.statusText }));
            }));
        }));
        this.saveCategorySuccess$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SaveCategorySuccess), map(function (action) { return action.payload; }), switchMap(function (category) {
            _this.router.navigate(['/categories'], { queryParamsHandling: 'preserve' });
            return of(new workflowActions.SelectIssueClassAndCategoryAction({
                issueClassTypeID: category.IssueClassTypeID,
                categoryID: category.AssetIssueCategoryTypeID
            }));
        }));
        this.selectCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectCategory)).pipe(map(function (action) { return action.payload.categoryID; }), switchMap(function (categoryID) {
            return of(new workflowActions.LoadCategoryDetailsAction({ whichCategoryID: categoryID }));
        }));
        this.selectIssueClassAndCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectIssueClassAndCategory)).pipe(map(function (action) { return action.payload.categoryID; }), switchMap(function (categoryID) {
            return of(new workflowActions.LoadCategoryDetailsAction({ whichCategoryID: categoryID }));
        }));
        this.loadCategoryDetails$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadCategoryDetails)).pipe(map(function (action) { return action.payload.whichCategoryID; }), switchMap(function (assetIssueCategoryID) {
            return _this.workflowService.resolutionAndIssueStatuses(assetIssueCategoryID).pipe(map(function (categoryDetails) { return new workflowActions.LoadCategoryDetailsSuccessAction({ assetIssueCategoryID: assetIssueCategoryID, categoryDetails: categoryDetails }); }), catchError(function (error) { return of(new workflowActions.LoadCategoryDetailsFailureAction({ errorMessage: error })); }));
        }));
        this.selectIssueClass$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectIssueClass)).pipe(map(function (action) { return action.payload.issueClassTypeID; }), withLatestFrom(this.facade.selectedIssueClass$), switchMap(function (_a) {
            var _ = _a[0], issueClass = _a[1];
            var categoryID = issueClass && issueClass.Categories.length > 0 ? issueClass.Categories[0].AssetIssueCategoryTypeID : -1;
            return of({ type: workflowActions.WorkflowActionTypes.SelectCategory, payload: { categoryID: categoryID } });
        }));
        this.deleteCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.DeleteCategory)).pipe(map(function (action) { return action.payload.assetIssueCategoryID; }), switchMap(function (assetIssueCategoryID) {
            return _this.workflowService.deleteCategory(assetIssueCategoryID).pipe(map(function (_) { return new workflowActions.DeleteCategorySuccess(); }), catchError(function (err) {
                return of(new workflowActions.DeleteCategoryFailure({ errorMessage: err.error }));
            }));
        }));
        this.loadMaps$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadMaps)).pipe(map(function (action) { return action.payload; }), switchMap(function (payload) {
            return _this.geospaModelService.getGeospaDropdownItems(payload.assetGuid).pipe(map(function (apiPayload) {
                if (apiPayload === null) {
                    return new workflowActions.LoadMapsFailure({ errorMessage: 'Load maps failed.' });
                }
                var currentMaps = new Map();
                for (var _i = 0, _a = Object.keys(apiPayload); _i < _a.length; _i++) {
                    var k = _a[_i];
                    currentMaps.set(k, apiPayload[k]);
                }
                return new workflowActions.LoadMapsSuccess(currentMaps);
            }), catchError(function (error) { return of(new workflowActions.LoadMapsFailure({ errorMessage: 'Load maps failed: ' + error })); }));
        }));
        this.loadMilestones$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadMilestones)).pipe(map(function (action) { return action.payload; }), switchMap(function (payload) {
            return _this.geospaModelService.getAssetsOnMap(payload.mapID, payload.assetGuid).pipe(map(function (apiPayload) {
                if (apiPayload === null) {
                    return new workflowActions.LoadMilestonesFailure({ errorMessage: 'Load milestones failed.' });
                }
                var layers = apiPayload;
                var ourLayer = null;
                layers.forEach(function (layer) {
                    if (layer.CashFlowField != null && layer.States && layer.States.length > 0) {
                        ourLayer = layer;
                        return;
                    }
                });
                if (ourLayer === null) {
                    console.log('selected map not found');
                    return new workflowActions.LoadMilestonesSuccess(null);
                    // return new workflowActions.LoadMilestonesFailure({ errorMessage: 'Load milestones failed.' });
                }
                return new workflowActions.LoadMilestonesSuccess(ourLayer);
            }), catchError(function (error) { return of(new workflowActions.LoadMilestonesFailure({ errorMessage: 'Load milestones failed: ' + error })); }));
        }));
        this.loadGeoSpas$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadGeoSpas)).pipe(map(function (action) { return action.payload; }), switchMap(function (payload) {
            return _this.geospaModelService.getGeoSpas(payload.assetGuid, null, true, true, false, false, false).pipe(map(function (apiPayload) {
                console.log(apiPayload);
                if (apiPayload === null) {
                    return new workflowActions.LoadGeoSpasFailure({ errorMessage: 'Load geospas failed.' });
                }
                return new workflowActions.LoadGeoSpasSuccess(apiPayload);
            }), catchError(function (error) { return of(new workflowActions.LoadGeoSpasFailure({ errorMessage: 'Load geospas failed: ' + error })); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "canConfigureWorkflow$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "issueCategoryTypes$", void 0);
    tslib_1.__decorate([
        Effect({ dispatch: false }),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "issueCategoryTypesLoaded", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "issuesAssociatedWithCategory$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "saveCategory$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "saveCategorySuccess$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "selectCategory$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "selectIssueClassAndCategory$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "loadCategoryDetails$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "selectIssueClass$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "deleteCategory$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "loadMaps$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "loadMilestones$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowEffects.prototype, "loadGeoSpas$", void 0);
    WorkflowEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            WorkflowService,
            GeospaModelService,
            WorkflowFacade,
            Store,
            Router])
    ], WorkflowEffects);
    return WorkflowEffects;
}());
export { WorkflowEffects };
//# sourceMappingURL=workflow.effects.js.map