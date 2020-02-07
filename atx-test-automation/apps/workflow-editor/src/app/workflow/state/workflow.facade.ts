import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { WorkflowState } from './workflow.reducer';
import { Store, select } from '@ngrx/store';
import { workflowQuery } from './workflow.selector';
import { NewCategory } from '../model/new-category';
import { AssetClassType } from '../model/issue-class-and-categories';
import {
  ClearWorkflowAction,
  LoadIssueCategoryTypesAction,
  CanConfigureWorkflowAction,
  SelectCategoryAction,
  SelectIssueClassAction,
  SaveCategoryAction,
  ChangeWorkFlowFormState,
  IssuesAssociatedWithCategory,
  DeleteCategoryAction,
  LoadMapsAction,
  LoadMilestonesAction,
  LoadGeoSpasAction
} from './workflow.actions';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { WorkflowFormState } from '../model/form-edit-state';

@Injectable()
export class WorkflowFacade implements OnDestroy {
  private selectedAssetClassTypesSubject = new BehaviorSubject<AssetClassType[]>(null);

  constructor(private store: Store<WorkflowState>) {
    this.combinedAssetClassTypeDetails$.subscribe(values => {
      if (values.allAssetClassTypes && values.selectedIDs) {
        this.selectedAssetClassTypesSubject.next(
          values.allAssetClassTypes.filter(a => values.selectedIDs.indexOf(a.AssetClassTypeID) >= 0)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  allAssetClassTypes$ = this.store.pipe(select(workflowQuery.getAllAssetClassTypes));
  issueClasses$ = this.store.pipe(select(workflowQuery.getIssueClasses));
  selectedIssueClassID$ = this.store.pipe(select(workflowQuery.getSelectedIssueClassID));
  selectedIssueClass$ = this.store.pipe(select(workflowQuery.getSelectedIssueClass));
  selectedCategoryID$ = this.store.pipe(select(workflowQuery.getSelectedCategoryID));
  selectedCategory$ = this.store.pipe(select(workflowQuery.getSelectedCategory));
  selectedAssetClassTypeIDs$ = this.store.pipe(select(workflowQuery.getCategoryAssetClassTypeIDs));
  selectedAssetClassTypes$ = this.selectedAssetClassTypesSubject.asObservable();
  categoryDetails$ = this.store.pipe(select(workflowQuery.getCategoryDetails));
  canConfigureWorkflow$ = this.store.pipe(select(workflowQuery.getCanConfigureWorkflow));
  errorMessage$ = this.store.pipe(select(workflowQuery.getErrorMessage));
  saveErrorMessage$ = this.store.pipe(select(workflowQuery.getSaveErrorMessage));
  successMessage$ = this.store.pipe(select(workflowQuery.getSuccessMessage));

  isLoadingPermission$ = this.store.pipe(select(workflowQuery.getIsLoadingPermission));
  waitingOnCategoryResponse$ = this.store.pipe(select(workflowQuery.getWaitingOnCategoryResponse));
  formState$ = this.store.pipe(select(workflowQuery.getFormState));
  waitingOnAffectedIssues$ = this.store.pipe(select(workflowQuery.getWaitingOnAffectedIssues));
  affectedIssues$ = this.store.pipe(select(workflowQuery.getAffectedIssues));
  deleteCategoryError$ = this.store.pipe(select(workflowQuery.getDeleteCategoryError));
  deleteCategorySuccess$ = this.store.pipe(select(workflowQuery.getDeleteCategorySuccess));

  geoSpasForAsset$ = this.store.pipe(select(workflowQuery.getGeoSpas));
  mapsForAsset$ = this.store.pipe(select(workflowQuery.getMaps));
  layerForMap$ = this.store.pipe(select(workflowQuery.getMapLayer));

  private unsubscribe: Subject<void> = new Subject();
  private combinedAssetClassTypeDetails$: Observable<{
    allAssetClassTypes: AssetClassType[];
    selectedIDs: number[];
  }> = combineLatest(this.allAssetClassTypes$, this.selectedAssetClassTypeIDs$).pipe(
    takeUntil(this.unsubscribe),
    map(([allAssetClassTypes, selectedIDs]) => {
      return { allAssetClassTypes, selectedIDs };
    })
  );

  clearWorkflow() {
    this.store.dispatch(new ClearWorkflowAction());
  }

  setFormState(formState: WorkflowFormState) {
    this.store.dispatch(new ChangeWorkFlowFormState({ formState }));
  }

  loadIssueCategoryTypes(assetGuid: string) {
    this.store.dispatch(new LoadIssueCategoryTypesAction({ assetGuid }));
  }

  canConfigureWorkflow() {
    this.store.dispatch(new CanConfigureWorkflowAction());
  }

  selectCategory(categoryID: number) {
    this.store.dispatch(new SelectCategoryAction({ categoryID }));
  }

  selectIssueClass(issueClassTypeID: number) {
    this.store.dispatch(new SelectIssueClassAction({ issueClassTypeID }));
  }

  saveCategory(category: NewCategory) {
    this.store.dispatch(new SaveCategoryAction(category));
  }

  deleteCategory(assetIssueCategoryID: number) {
    this.store.dispatch(new DeleteCategoryAction({ assetIssueCategoryID }));
  }

  issuesAssociatedWithCategory() {
    this.store.dispatch(new IssuesAssociatedWithCategory());
  }

  loadMapsForAsset(assetGuid: string) {
    this.store.dispatch(new LoadMapsAction({ assetGuid }));
  }

  loadMilestonesForMap(assetGuid: string, mapID: number, mapName: string) {
    this.store.dispatch(new LoadMilestonesAction({ assetGuid, mapID, mapName }));
  }

  loadGeoSpasForAsset(assetGuid: string) {
    this.store.dispatch(new LoadGeoSpasAction({ assetGuid }));
  }
}
