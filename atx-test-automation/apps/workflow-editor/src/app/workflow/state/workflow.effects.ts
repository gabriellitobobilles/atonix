import { WorkflowState } from './workflow.reducer';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { WorkflowService } from '../services/workflow.service';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as workflowActions from './workflow.actions';
import { Store } from '@ngrx/store';
import { NewCategory } from '../model/new-category';
import { WorkflowFacade } from './workflow.facade';
import { IssueClassesCategoriesAndAssetClassTypes, Category, IssueClassAndCategory } from '../model/issue-class-and-categories';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  GeospaModelService,
  GetAssetParameters,
  IAsset,
  IStatesForLayer,
  IGeoSpaDropdownItem,
  IStateForLayer,
  IGeoSpa
} from '@AtonixWebSites/api';
import { actionsString } from '../services/workflow-form.service';

@Injectable()
export class WorkflowEffects {
  constructor(
    private actions$: Actions,
    private workflowService: WorkflowService,
    private geospaModelService: GeospaModelService,
    private facade: WorkflowFacade,
    private store: Store<WorkflowState>,
    private router: Router
  ) {}

  @Effect()
  canConfigureWorkflow$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.CanConfigureWorkflow)).pipe(
    switchMap(_ => {
      return this.workflowService.canConfigureWorkflow().pipe(
        map(asset => new workflowActions.CanConfigureWorkflowSuccessAction(asset)),
        catchError(error => of(new workflowActions.CanConfigureWorkflowFailureAction({ errorMessage: error })))
      );
    })
  );

  @Effect()
  issueCategoryTypes$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadIssueCategoryTypes)).pipe(
    map((action: workflowActions.LoadIssueCategoryTypesAction) => action.payload.assetGuid),
    switchMap(guid => {
      return this.workflowService.issueCategoryTypes(guid).pipe(
        map((apiPayload: IssueClassesCategoriesAndAssetClassTypes) => {
          if (apiPayload === null) {
            return new workflowActions.LoadIssueCategoryTypesFailureAction({ errorMessage: 'No categories found' });
          }
          return new workflowActions.LoadIssueCategoryTypesSuccessAction({
            issueClasses: apiPayload.IssueClassAndCategories,
            assetClassTypes: apiPayload.AssetClassTypes
          });
        }),
        catchError(error => of(new workflowActions.LoadIssueCategoryTypesFailureAction({ errorMessage: error })))
      );
    })
  );

  @Effect({ dispatch: false })
  issueCategoryTypesLoaded = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadIssueCategoryTypesSuccess)).pipe(
    map((action: workflowActions.LoadIssueCategoryTypesSuccessAction) => action.payload.issueClasses),
    tap((issueClasses: IssueClassAndCategory[]) => {
      if (issueClasses && issueClasses.length) {
        this.store.dispatch(new workflowActions.SelectIssueClassAction({ issueClassTypeID: issueClasses[0].IssueClassTypeID }));
      }
    })
  );

  @Effect()
  issuesAssociatedWithCategory$ = this.actions$.pipe(
    ofType(workflowActions.WorkflowActionTypes.IssuesAssociatedWithCategory),
    withLatestFrom(this.facade.selectedCategoryID$),
    map(([_, selectedCategoryID]) => selectedCategoryID),
    switchMap(selectedCategoryID => {
      return this.workflowService.issueWarnings(selectedCategoryID).pipe(
        map(issues => {
          return new workflowActions.IssuesAssociatedWithCategorySuccess(issues);
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of(new workflowActions.IssuesAssociatedWithCategoryFailure(err.statusText));
        })
      );
    })
  );

  @Effect()
  saveCategory$ = this.actions$.pipe(
    ofType(workflowActions.WorkflowActionTypes.SaveCategory),
    map((action: workflowActions.SaveCategoryAction) => action.payload),
    switchMap((newCategory: NewCategory) => {
      return this.workflowService.saveCategory(newCategory).pipe(
        map(category => new workflowActions.SaveCategorySuccessAction(category)),
        catchError((err: HttpErrorResponse) => {
          return of(new workflowActions.SaveCategoryFailureAction({ errorMessage: err.statusText }));
        })
      );
    })
  );

  @Effect()
  saveCategorySuccess$ = this.actions$.pipe(
    ofType(workflowActions.WorkflowActionTypes.SaveCategorySuccess),
    map((action: workflowActions.SaveCategorySuccessAction) => action.payload),
    switchMap((category: Category) => {
      this.router.navigate(['/categories'], { queryParamsHandling: 'preserve' });
      return of(
        new workflowActions.SelectIssueClassAndCategoryAction({
          issueClassTypeID: category.IssueClassTypeID,
          categoryID: category.AssetIssueCategoryTypeID
        })
      );
    })
  );

  @Effect()
  selectCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectCategory)).pipe(
    map((action: workflowActions.SelectCategoryAction) => action.payload.categoryID),
    switchMap(categoryID => {
      return of(new workflowActions.LoadCategoryDetailsAction({ whichCategoryID: categoryID }));
    })
  );

  @Effect()
  selectIssueClassAndCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectIssueClassAndCategory)).pipe(
    map((action: workflowActions.SelectIssueClassAndCategoryAction) => action.payload.categoryID),
    switchMap(categoryID => {
      return of(new workflowActions.LoadCategoryDetailsAction({ whichCategoryID: categoryID }));
    })
  );

  @Effect()
  loadCategoryDetails$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadCategoryDetails)).pipe(
    map((action: workflowActions.LoadCategoryDetailsAction) => action.payload.whichCategoryID),
    switchMap(assetIssueCategoryID => {
      return this.workflowService.resolutionAndIssueStatuses(assetIssueCategoryID).pipe(
        map(categoryDetails => new workflowActions.LoadCategoryDetailsSuccessAction({ assetIssueCategoryID, categoryDetails })),
        catchError(error => of(new workflowActions.LoadCategoryDetailsFailureAction({ errorMessage: error })))
      );
    })
  );

  @Effect()
  selectIssueClass$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.SelectIssueClass)).pipe(
    map((action: workflowActions.SelectIssueClassAction) => action.payload.issueClassTypeID),
    withLatestFrom(this.facade.selectedIssueClass$),
    switchMap(([_, issueClass]) => {
      const categoryID = issueClass && issueClass.Categories.length > 0 ? issueClass.Categories[0].AssetIssueCategoryTypeID : -1;
      return of({ type: workflowActions.WorkflowActionTypes.SelectCategory, payload: { categoryID } });
    })
  );

  @Effect()
  deleteCategory$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.DeleteCategory)).pipe(
    map((action: workflowActions.DeleteCategoryAction) => action.payload.assetIssueCategoryID),
    switchMap(assetIssueCategoryID => {
      return this.workflowService.deleteCategory(assetIssueCategoryID).pipe(
        map(_ => new workflowActions.DeleteCategorySuccess()),
        catchError((err: HttpErrorResponse) => {
          return of(new workflowActions.DeleteCategoryFailure({ errorMessage: err.error }));
        })
      );
    })
  );

  @Effect()
  loadMaps$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadMaps)).pipe(
    map((action: workflowActions.LoadMapsAction) => action.payload),
    switchMap(payload => {
      return this.geospaModelService.getGeospaDropdownItems(payload.assetGuid).pipe(
        map((apiPayload: IGeoSpaDropdownItem) => {
          if (apiPayload === null) {
            return new workflowActions.LoadMapsFailure({ errorMessage: 'Load maps failed.' });
          }
          const currentMaps = new Map();
          for (const k of Object.keys(apiPayload)) {
            currentMaps.set(k, apiPayload[k]);
          }
          return new workflowActions.LoadMapsSuccess(currentMaps);
        }),
        catchError(error => of(new workflowActions.LoadMapsFailure({ errorMessage: 'Load maps failed: ' + error })))
      );
    })
  );

  @Effect()
  loadMilestones$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadMilestones)).pipe(
    map((action: workflowActions.LoadMilestonesAction) => action.payload),
    switchMap(payload => {
      return this.geospaModelService.getAssetsOnMap(payload.mapID, payload.assetGuid).pipe(
        map((apiPayload: IStatesForLayer[]) => {
          if (apiPayload === null) {
            return new workflowActions.LoadMilestonesFailure({ errorMessage: 'Load milestones failed.' });
          }
          const layers: IStatesForLayer[] = apiPayload;
          let ourLayer: IStatesForLayer = null;
          layers.forEach(layer => {
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
        }),
        catchError(error => of(new workflowActions.LoadMilestonesFailure({ errorMessage: 'Load milestones failed: ' + error })))
      );
    })
  );

  @Effect()
  loadGeoSpas$ = this.actions$.pipe(ofType(workflowActions.WorkflowActionTypes.LoadGeoSpas)).pipe(
    map((action: workflowActions.LoadGeoSpasAction) => action.payload),
    switchMap(payload => {
      return this.geospaModelService.getGeoSpas(payload.assetGuid, null, true, true, false, false, false).pipe(
        map((apiPayload: IGeoSpa[]) => {
          console.log(apiPayload);
          if (apiPayload === null) {
            return new workflowActions.LoadGeoSpasFailure({ errorMessage: 'Load geospas failed.' });
          }
          return new workflowActions.LoadGeoSpasSuccess(apiPayload);
        }),
        catchError(error => of(new workflowActions.LoadGeoSpasFailure({ errorMessage: 'Load geospas failed: ' + error })))
      );
    })
  );
}
