import * as _ from 'lodash';
import { FormGroup, Form, FormArray } from '@angular/forms';
import { AssetClassType, Category, IssueClassAndCategory } from '../../model/issue-class-and-categories';
import { Observable, Subject, combineLatest, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WorkflowFacade } from '../../state/workflow.facade';
import { WorkflowFormService, resStatString, activityStatusString } from '../../services/workflow-form.service';
import { IssueStatus, ResolutionStatus } from '../../model/issue-and-resolution-statuses';
import { AssetTreeFacade, AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { takeUntil, map, take, takeWhile } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WorkflowEffects } from '../../state/workflow.effects';
import { WorkflowFormState } from '../../model/form-edit-state';
import { StatusesComponent } from '../../components/statuses/statuses.component';
import { WorkflowService } from '../../services/workflow.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ModalSaveCategoryComponent } from '../../components/modal-save-category/modal-save-category.component';
import { IGeoSpaDropdownItem, IStatesForLayer, IGeoSpaDropdownValue } from '@AtonixWebSites/api';

@Component({
  selector: 'atx-workflow-form',
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.scss']
})
export class WorkflowFormComponent implements OnInit, OnDestroy {
  @ViewChild(StatusesComponent) statusesComponent;

  private unsubscribe: Subject<void> = new Subject();

  // higher level data
  issueClasses$: Observable<IssueClassAndCategory[]> | null;
  selectedAssetClassTypes$: Observable<AssetClassType[]> | null;
  assetClasses$: Observable<AssetClassType[]> | null;
  waitingOnCategoryResponse$: Observable<boolean>;
  assetTreeFacade: AssetTreeFacade;
  selectedAssetGuid: string;
  selectedCategoryTypeID: number;
  formState: WorkflowFormState;
  workflowFormSubscription: Subscription;
  validationMessages: object;

  mapsForAsset$: Observable<Map<string, IGeoSpaDropdownValue>> | null;
  layerForMap$: Observable<IStatesForLayer> | null;

  // selections
  selectedIssueClass$: Observable<IssueClassAndCategory>;
  selectedCategoryTypeID$: Observable<number>;

  // form ui logic
  numResolutionStatuses = -1;
  selectedDrawerItemForStatus: number[] = [];
  showValidationMessages = false;
  editingWhichName?: number = null;
  savedNameForEdit?: string = null;
  expandAllAccordions = false;
  showSettingsButton = true;
  settingsOpen = false;
  deletedResolutionStatus: Array<{ name: string; id: number }> = [];
  snapShot = null;
  selectedCategoryDetails$: Observable<{
    category: Category;
    details: { issueStatuses: IssueStatus[]; resolutionStatuses: ResolutionStatus[] };
  }>;

  unalteredCategory: Category;
  unalteredCategoryDetails: { issueStatuses: IssueStatus[]; resolutionStatuses: ResolutionStatus[] };

  constructor(
    private toastr: ToastrService,
    private workflowFacade: WorkflowFacade,
    public wffService: WorkflowFormService,
    private assetTreeFacadeFactory: AssetTreeFacadeFactory,
    private workflowEffects: WorkflowEffects,
    private workflowService: WorkflowService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.waitingOnCategoryResponse$ = this.workflowFacade.waitingOnCategoryResponse$;

    this.workflowFacade.formState$.pipe(takeUntil(this.unsubscribe)).subscribe(formState => {
      this.formState = formState;
    });
    this.assetTreeFacade = this.assetTreeFacadeFactory.CreateFacade();
    this.assetTreeFacade.selectedAssetGuid$.pipe(takeUntil(this.unsubscribe)).subscribe(guid => {
      this.selectedAssetGuid = guid;
    });
    this.assetClasses$ = this.workflowFacade.allAssetClassTypes$;
    this.workflowFacade.successMessage$.pipe(takeUntil(this.unsubscribe)).subscribe(message => {
      if (message) {
        setTimeout(() => this.toastr.success('', message));
        this.workflowFacade.setFormState(WorkflowFormState.Viewing);
      }
    });
    this.workflowFacade.deleteCategorySuccess$.pipe(takeUntil(this.unsubscribe)).subscribe(message => {
      if (message) {
        setTimeout(() => this.toastr.success('', message));
        this.workflowFacade.loadIssueCategoryTypes(this.selectedAssetGuid);
        this.workflowFacade.setFormState(WorkflowFormState.Viewing);
      }
    });
    this.workflowFacade.deleteCategoryError$.pipe(takeUntil(this.unsubscribe)).subscribe(message => {
      if (message) {
        setTimeout(() => this.toastr.error(message, 'Delete Category Failed'));
      }
    });
    this.workflowFacade.saveErrorMessage$.pipe(takeUntil(this.unsubscribe)).subscribe(message => {
      if (message) {
        setTimeout(() => this.toastr.error(message, 'Save Category Failed'));
      }
    });

    this.workflowFormSubscription = this.wffService.workflowForm$.pipe(takeUntil(this.unsubscribe)).subscribe(form => {
      this.numResolutionStatuses = _.isNil(form) ? 0 : (form.get(resStatString) as FormArray).length;
      if (!_.isNull(form)) {
        this.selectedDrawerItemForStatus = (form.get(resStatString) as FormArray).controls.map(__ => 0);
        Object.keys((form.get(activityStatusString) as FormArray).controls).forEach(__ =>
          this.selectedDrawerItemForStatus.push(0)
        );
      }
    });

    this.issueClasses$ = this.workflowFacade.issueClasses$;
    this.selectedIssueClass$ = this.workflowFacade.selectedIssueClass$;
    this.selectedCategoryTypeID$ = this.workflowFacade.selectedCategoryID$;
    this.selectedAssetClassTypes$ = this.workflowFacade.selectedAssetClassTypes$;

    this.selectedCategoryDetails$ = combineLatest(
      this.workflowFacade.selectedCategory$,
      this.workflowFacade.categoryDetails$
    ).pipe(
      takeUntil(this.unsubscribe),
      map(([category, details]) => {
        return { category, details };
      })
    );

    this.selectedCategoryDetails$.subscribe(newValues => {
      if (newValues.category && newValues.details) {
        this.selectedCategoryTypeID = newValues.category.AssetIssueCategoryTypeID;
        this.wffService.resetForm(-1, {
          Category: newValues.category,
          ResolutionStatuses: newValues.details.resolutionStatuses,
          IssueStatuses: newValues.details.issueStatuses
        });
      } else {
        this.wffService.setFormToNull();
      }
    });

    this.workflowFacade.selectedCategory$.pipe(takeUntil(this.unsubscribe)).subscribe(category => {
      this.unalteredCategory = category;
    });

    this.workflowFacade.categoryDetails$.pipe(takeUntil(this.unsubscribe)).subscribe(categoryDetails => {
      this.unalteredCategoryDetails = categoryDetails;
      this.numResolutionStatuses = categoryDetails ? categoryDetails.resolutionStatuses.length : 0;
    });

    this.mapsForAsset$ = this.workflowFacade.mapsForAsset$;
    this.layerForMap$ = this.workflowFacade.layerForMap$;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  addCategoryEvent() {
    this.issueClasses$.pipe(take(1)).subscribe((issueClasses: IssueClassAndCategory[]) => {
      this.wffService.resetForm(issueClasses[0].IssueClassTypeID);
      this.closeSettings();
      this.workflowFacade.setFormState(WorkflowFormState.Adding);
    });
  }

  editCategoryEvent() {
    this.wffService.setNullAssetClassType();
    this.deletedResolutionStatus.length = 0;
    this.closeSettings();
    this.wffService.workflowForm$.pipe(take(1)).subscribe(form => {
      this.snapShot = form.getRawValue();
      this.workflowFacade.setFormState(WorkflowFormState.Editing);
    });
  }

  deleteResolutionStatus(resolutionStatus: number) {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        message:
          'Items currently in this status will revert to initial status. Actions triggered by this status will be deleted.',
        title: 'Delete Resolution status?',
        yesTitle: 'OK',
        noTitle: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(returnValue => {
      if (returnValue) {
        this.wffService.workflowForm$.pipe(take(1)).subscribe(form => {
          const value = this.wffService.resolutionStatusesFromForm(form).value[resolutionStatus];
          if (value.id > -1) {
            // only want a list of saved resolution statuses that are to be deleted, not new ones.
            this.deletedResolutionStatus.push({ name: value.resolutionStatusName, id: value.id });
          }
          this.wffService.deleteResolutionStatus(resolutionStatus);
        });
      }
    });
  }
  deleteCategoryEvent() {
    this.workflowFacade.issuesAssociatedWithCategory();
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        message: `This category is associated with existing issues/workflow items.
          Deleting the category will delete the issues/ items immediately. Continue? `,
        title: 'Delete Category?',
        yesTitle: 'OK',
        noTitle: 'Cancel',
        showIssues: true,
        viewLink: 'todo: IssuesManagement link that needs to be done'
      }
    });

    dialogRef.afterClosed().subscribe(returnValue => {
      if (returnValue) {
        this.workflowFacade.deleteCategory(this.selectedCategoryTypeID);
      }
    });
  }

  changeSelectedIssueClass($event: number) {
    this.workflowFacade.selectIssueClass($event);
  }

  changeSelectedCategory($event: number) {
    this.workflowFacade.selectCategory($event);
  }

  expandAllToggle() {
    this.expandAllAccordions = !this.expandAllAccordions;
  }

  saveCategoryChanges() {
    let workFlowForm: FormGroup = null;

    this.wffService.workflowForm$.pipe(take(1)).subscribe(form => {
      workFlowForm = form;
      if (JSON.stringify(this.snapShot) === JSON.stringify(form.getRawValue())) {
        return;
      }

      if (workFlowForm.invalid) {
        this.expandAllAccordions = true;
        this.showValidationMessages = true;
        setTimeout(() => this.toastr.error('Check Validation Errors', 'Form Not Saved'));
        return;
      }
      this.showValidationMessages = false;
      this.openSettings();
      this.editingWhichName = null;

      if (this.formState === WorkflowFormState.Editing) {
        const currentResolutionStatuses: Array<{ name: string; id: number }> = [];
        let assetClassTypeChanges = false;
        if (this.snapShot['assetClassTypes'] !== form.getRawValue()['assetClassTypes']) {
          assetClassTypeChanges = true;
        }

        const resolutionStatuses = this.wffService.resolutionStatusesFromForm(workFlowForm).getRawValue();
        resolutionStatuses.forEach(resolutionStatus => {
          currentResolutionStatuses.push({ name: resolutionStatus.resolutionStatusName, id: resolutionStatus.id });
        });
        const dialogRef = this.dialog.open(ModalSaveCategoryComponent, {
          data: {
            currentResolutionStatuses,
            assetClassTypeChanges,
            resolutionStatuses: this.deletedResolutionStatus
          }
        });

        dialogRef.afterClosed().subscribe(returnValue => {
          if (returnValue) {
            this.workflowFacade.saveCategory(this.wffService.formToNewCategory(this.selectedAssetGuid, returnValue.data));
          } else {
            this.discardCategoryChanges();
          }
        });
      } else {
        // adding new category
        this.workflowFacade.saveCategory(this.wffService.formToNewCategory(this.selectedAssetGuid, undefined));
      }
    });
  }

  discardCategoryChanges() {
    this.workflowFacade.setFormState(WorkflowFormState.Viewing);
    this.wffService.resetForm(-1, {
      Category: this.unalteredCategory,
      ResolutionStatuses: this.unalteredCategoryDetails.resolutionStatuses,
      IssueStatuses: this.unalteredCategoryDetails.issueStatuses
    });
    this.showValidationMessages = false;
    this.openSettings();
    this.editingWhichName = null;
    this.snapShot = null;
  }

  addAction(event: { whichStatus: number }) {
    event.whichStatus >= this.numResolutionStatuses
      ? this.wffService.addActionToIssueActivityStatus(event.whichStatus - this.numResolutionStatuses)
      : this.wffService.addActionToResolutionStatus(event.whichStatus);
  }

  actionTypeChanged(event: { whichStatus: number; whichAction: number; actionType: number | string }) {
    if (event.whichStatus >= this.numResolutionStatuses) {
      this.wffService.changeIssueActivityStatusActionType(
        event.whichStatus - this.numResolutionStatuses,
        event.whichAction,
        Number(event.actionType)
      );
    } else {
      this.wffService.changeResolutionStatusActionType(event.whichStatus, event.whichAction, Number(event.actionType));
    }
  }

  deleteAction(event: { whichStatus: number; whichAction: number }) {
    if (event.whichStatus >= this.numResolutionStatuses) {
      this.wffService.removeActionFromIssueActivityStatus(event.whichStatus - this.numResolutionStatuses, event.whichAction);
    } else {
      this.wffService.removeActionFromResolutionStatus(event.whichStatus, event.whichAction);
    }
  }

  assetClassTypeSelection(event: number) {
    if (event === -1) {
      this.wffService.setAllAssetClassTypes();
    } else {
      this.wffService.setSpecificAssetClassType(event);
    }
  }

  selectDrawerItem(event: { whichStatus: number; drawerItemIndex: number }) {
    this.selectedDrawerItemForStatus[event.whichStatus] = event.drawerItemIndex;
  }

  startEditingName(which: number) {
    this.editingWhichName = which;
    this.wffService.workflowForm$.pipe(take(1)).subscribe(form => {
      this.savedNameForEdit = (this.wffService.resolutionStatusesFromForm(form).controls as FormGroup[])[which].controls[
        'resolutionStatusName'
      ].value;
    });
  }

  stopEditingName() {
    this.wffService.workflowForm$.pipe(take(1)).subscribe(form => {
      if (
        this.editingWhichName !== null &&
        (this.wffService.resolutionStatusesFromForm(form).controls as FormGroup[])[this.editingWhichName].controls[
          'resolutionStatusName'
        ].valid
      ) {
        this.editingWhichName = null;
        this.wffService.commitFormChanges();
      }
    });
  }

  cancelEditingName() {
    if (this.editingWhichName !== undefined && this.savedNameForEdit !== undefined) {
      this.wffService.setName(this.savedNameForEdit, this.editingWhichName);
    }
    this.editingWhichName = null;
    this.savedNameForEdit = null;
  }

  openSettings() {
    this.showSettingsButton = true;
  }

  closeSettings() {
    this.settingsOpen = false;
    this.showSettingsButton = false;
  }

  settingsButtonClicked() {
    this.settingsOpen = !this.settingsOpen;
  }

  changeSelectedMap(selectedMapName: string) {
    console.log(selectedMapName);
    let selectedMapId = -1;
    this.mapsForAsset$.pipe(take(1)).subscribe(maps => {
      if (maps === null) {
        return;
      }
      maps.forEach(element => {
        if (element.Title === selectedMapName) {
          selectedMapId = element.Id;
        }
      });
      if (selectedMapId > -1) {
        this.workflowFacade.loadMilestonesForMap(this.selectedAssetGuid, selectedMapId, selectedMapName);
      }
    });
  }
}
