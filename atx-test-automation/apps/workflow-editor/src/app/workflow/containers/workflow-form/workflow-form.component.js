import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { Subject, combineLatest } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { WorkflowFacade } from '../../state/workflow.facade';
import { WorkflowFormService, resStatString, activityStatusString } from '../../services/workflow-form.service';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { takeUntil, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WorkflowEffects } from '../../state/workflow.effects';
import { WorkflowFormState } from '../../model/form-edit-state';
import { StatusesComponent } from '../../components/statuses/statuses.component';
import { WorkflowService } from '../../services/workflow.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ModalSaveCategoryComponent } from '../../components/modal-save-category/modal-save-category.component';
var WorkflowFormComponent = /** @class */ (function () {
    function WorkflowFormComponent(toastr, workflowFacade, wffService, assetTreeFacadeFactory, workflowEffects, workflowService, dialog) {
        this.toastr = toastr;
        this.workflowFacade = workflowFacade;
        this.wffService = wffService;
        this.assetTreeFacadeFactory = assetTreeFacadeFactory;
        this.workflowEffects = workflowEffects;
        this.workflowService = workflowService;
        this.dialog = dialog;
        this.unsubscribe = new Subject();
        // form ui logic
        this.numResolutionStatuses = -1;
        this.selectedDrawerItemForStatus = [];
        this.showValidationMessages = false;
        this.editingWhichName = null;
        this.savedNameForEdit = null;
        this.expandAllAccordions = false;
        this.showSettingsButton = true;
        this.settingsOpen = false;
        this.deletedResolutionStatus = [];
        this.snapShot = null;
    }
    WorkflowFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.waitingOnCategoryResponse$ = this.workflowFacade.waitingOnCategoryResponse$;
        this.workflowFacade.formState$.pipe(takeUntil(this.unsubscribe)).subscribe(function (formState) {
            _this.formState = formState;
        });
        this.assetTreeFacade = this.assetTreeFacadeFactory.CreateFacade();
        this.assetTreeFacade.selectedAssetGuid$.pipe(takeUntil(this.unsubscribe)).subscribe(function (guid) {
            _this.selectedAssetGuid = guid;
        });
        this.assetClasses$ = this.workflowFacade.allAssetClassTypes$;
        this.workflowFacade.successMessage$.pipe(takeUntil(this.unsubscribe)).subscribe(function (message) {
            if (message) {
                setTimeout(function () { return _this.toastr.success('', message); });
                _this.workflowFacade.setFormState(WorkflowFormState.Viewing);
            }
        });
        this.workflowFacade.deleteCategorySuccess$.pipe(takeUntil(this.unsubscribe)).subscribe(function (message) {
            if (message) {
                setTimeout(function () { return _this.toastr.success('', message); });
                _this.workflowFacade.loadIssueCategoryTypes(_this.selectedAssetGuid);
                _this.workflowFacade.setFormState(WorkflowFormState.Viewing);
            }
        });
        this.workflowFacade.deleteCategoryError$.pipe(takeUntil(this.unsubscribe)).subscribe(function (message) {
            if (message) {
                setTimeout(function () { return _this.toastr.error(message, 'Delete Category Failed'); });
            }
        });
        this.workflowFacade.saveErrorMessage$.pipe(takeUntil(this.unsubscribe)).subscribe(function (message) {
            if (message) {
                setTimeout(function () { return _this.toastr.error(message, 'Save Category Failed'); });
            }
        });
        this.workflowFormSubscription = this.wffService.workflowForm$.pipe(takeUntil(this.unsubscribe)).subscribe(function (form) {
            _this.numResolutionStatuses = _.isNil(form) ? 0 : form.get(resStatString).length;
            if (!_.isNull(form)) {
                _this.selectedDrawerItemForStatus = form.get(resStatString).controls.map(function (__) { return 0; });
                Object.keys(form.get(activityStatusString).controls).forEach(function (__) {
                    return _this.selectedDrawerItemForStatus.push(0);
                });
            }
        });
        this.issueClasses$ = this.workflowFacade.issueClasses$;
        this.selectedIssueClass$ = this.workflowFacade.selectedIssueClass$;
        this.selectedCategoryTypeID$ = this.workflowFacade.selectedCategoryID$;
        this.selectedAssetClassTypes$ = this.workflowFacade.selectedAssetClassTypes$;
        this.selectedCategoryDetails$ = combineLatest(this.workflowFacade.selectedCategory$, this.workflowFacade.categoryDetails$).pipe(takeUntil(this.unsubscribe), map(function (_a) {
            var category = _a[0], details = _a[1];
            return { category: category, details: details };
        }));
        this.selectedCategoryDetails$.subscribe(function (newValues) {
            if (newValues.category && newValues.details) {
                _this.selectedCategoryTypeID = newValues.category.AssetIssueCategoryTypeID;
                _this.wffService.resetForm(-1, {
                    Category: newValues.category,
                    ResolutionStatuses: newValues.details.resolutionStatuses,
                    IssueStatuses: newValues.details.issueStatuses
                });
            }
            else {
                _this.wffService.setFormToNull();
            }
        });
        this.workflowFacade.selectedCategory$.pipe(takeUntil(this.unsubscribe)).subscribe(function (category) {
            _this.unalteredCategory = category;
        });
        this.workflowFacade.categoryDetails$.pipe(takeUntil(this.unsubscribe)).subscribe(function (categoryDetails) {
            _this.unalteredCategoryDetails = categoryDetails;
            _this.numResolutionStatuses = categoryDetails ? categoryDetails.resolutionStatuses.length : 0;
        });
        this.mapsForAsset$ = this.workflowFacade.mapsForAsset$;
        this.layerForMap$ = this.workflowFacade.layerForMap$;
    };
    WorkflowFormComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
    };
    WorkflowFormComponent.prototype.addCategoryEvent = function () {
        var _this = this;
        this.issueClasses$.pipe(take(1)).subscribe(function (issueClasses) {
            _this.wffService.resetForm(issueClasses[0].IssueClassTypeID);
            _this.closeSettings();
            _this.workflowFacade.setFormState(WorkflowFormState.Adding);
        });
    };
    WorkflowFormComponent.prototype.editCategoryEvent = function () {
        var _this = this;
        this.wffService.setNullAssetClassType();
        this.deletedResolutionStatus.length = 0;
        this.closeSettings();
        this.wffService.workflowForm$.pipe(take(1)).subscribe(function (form) {
            _this.snapShot = form.getRawValue();
            _this.workflowFacade.setFormState(WorkflowFormState.Editing);
        });
    };
    WorkflowFormComponent.prototype.deleteResolutionStatus = function (resolutionStatus) {
        var _this = this;
        var dialogRef = this.dialog.open(ModalDialogComponent, {
            data: {
                message: 'Items currently in this status will revert to initial status. Actions triggered by this status will be deleted.',
                title: 'Delete Resolution status?',
                yesTitle: 'OK',
                noTitle: 'Cancel'
            }
        });
        dialogRef.afterClosed().subscribe(function (returnValue) {
            if (returnValue) {
                _this.wffService.workflowForm$.pipe(take(1)).subscribe(function (form) {
                    var value = _this.wffService.resolutionStatusesFromForm(form).value[resolutionStatus];
                    if (value.id > -1) {
                        // only want a list of saved resolution statuses that are to be deleted, not new ones.
                        _this.deletedResolutionStatus.push({ name: value.resolutionStatusName, id: value.id });
                    }
                    _this.wffService.deleteResolutionStatus(resolutionStatus);
                });
            }
        });
    };
    WorkflowFormComponent.prototype.deleteCategoryEvent = function () {
        var _this = this;
        this.workflowFacade.issuesAssociatedWithCategory();
        var dialogRef = this.dialog.open(ModalDialogComponent, {
            data: {
                message: "This category is associated with existing issues/workflow items.\n          Deleting the category will delete the issues/ items immediately. Continue? ",
                title: 'Delete Category?',
                yesTitle: 'OK',
                noTitle: 'Cancel',
                showIssues: true,
                viewLink: 'todo: IssuesManagement link that needs to be done'
            }
        });
        dialogRef.afterClosed().subscribe(function (returnValue) {
            if (returnValue) {
                _this.workflowFacade.deleteCategory(_this.selectedCategoryTypeID);
            }
        });
    };
    WorkflowFormComponent.prototype.changeSelectedIssueClass = function ($event) {
        this.workflowFacade.selectIssueClass($event);
    };
    WorkflowFormComponent.prototype.changeSelectedCategory = function ($event) {
        this.workflowFacade.selectCategory($event);
    };
    WorkflowFormComponent.prototype.expandAllToggle = function () {
        this.expandAllAccordions = !this.expandAllAccordions;
    };
    WorkflowFormComponent.prototype.saveCategoryChanges = function () {
        var _this = this;
        var workFlowForm = null;
        this.wffService.workflowForm$.pipe(take(1)).subscribe(function (form) {
            workFlowForm = form;
            if (JSON.stringify(_this.snapShot) === JSON.stringify(form.getRawValue())) {
                return;
            }
            if (workFlowForm.invalid) {
                _this.expandAllAccordions = true;
                _this.showValidationMessages = true;
                setTimeout(function () { return _this.toastr.error('Check Validation Errors', 'Form Not Saved'); });
                return;
            }
            _this.showValidationMessages = false;
            _this.openSettings();
            _this.editingWhichName = null;
            if (_this.formState === WorkflowFormState.Editing) {
                var currentResolutionStatuses_1 = [];
                var assetClassTypeChanges = false;
                if (_this.snapShot['assetClassTypes'] !== form.getRawValue()['assetClassTypes']) {
                    assetClassTypeChanges = true;
                }
                var resolutionStatuses = _this.wffService.resolutionStatusesFromForm(workFlowForm).getRawValue();
                resolutionStatuses.forEach(function (resolutionStatus) {
                    currentResolutionStatuses_1.push({ name: resolutionStatus.resolutionStatusName, id: resolutionStatus.id });
                });
                var dialogRef = _this.dialog.open(ModalSaveCategoryComponent, {
                    data: {
                        currentResolutionStatuses: currentResolutionStatuses_1,
                        assetClassTypeChanges: assetClassTypeChanges,
                        resolutionStatuses: _this.deletedResolutionStatus
                    }
                });
                dialogRef.afterClosed().subscribe(function (returnValue) {
                    if (returnValue) {
                        _this.workflowFacade.saveCategory(_this.wffService.formToNewCategory(_this.selectedAssetGuid, returnValue.data));
                    }
                    else {
                        _this.discardCategoryChanges();
                    }
                });
            }
            else {
                // adding new category
                _this.workflowFacade.saveCategory(_this.wffService.formToNewCategory(_this.selectedAssetGuid, undefined));
            }
        });
    };
    WorkflowFormComponent.prototype.discardCategoryChanges = function () {
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
    };
    WorkflowFormComponent.prototype.addAction = function (event) {
        event.whichStatus >= this.numResolutionStatuses
            ? this.wffService.addActionToIssueActivityStatus(event.whichStatus - this.numResolutionStatuses)
            : this.wffService.addActionToResolutionStatus(event.whichStatus);
    };
    WorkflowFormComponent.prototype.actionTypeChanged = function (event) {
        if (event.whichStatus >= this.numResolutionStatuses) {
            this.wffService.changeIssueActivityStatusActionType(event.whichStatus - this.numResolutionStatuses, event.whichAction, Number(event.actionType));
        }
        else {
            this.wffService.changeResolutionStatusActionType(event.whichStatus, event.whichAction, Number(event.actionType));
        }
    };
    WorkflowFormComponent.prototype.deleteAction = function (event) {
        if (event.whichStatus >= this.numResolutionStatuses) {
            this.wffService.removeActionFromIssueActivityStatus(event.whichStatus - this.numResolutionStatuses, event.whichAction);
        }
        else {
            this.wffService.removeActionFromResolutionStatus(event.whichStatus, event.whichAction);
        }
    };
    WorkflowFormComponent.prototype.assetClassTypeSelection = function (event) {
        if (event === -1) {
            this.wffService.setAllAssetClassTypes();
        }
        else {
            this.wffService.setSpecificAssetClassType(event);
        }
    };
    WorkflowFormComponent.prototype.selectDrawerItem = function (event) {
        this.selectedDrawerItemForStatus[event.whichStatus] = event.drawerItemIndex;
    };
    WorkflowFormComponent.prototype.startEditingName = function (which) {
        var _this = this;
        this.editingWhichName = which;
        this.wffService.workflowForm$.pipe(take(1)).subscribe(function (form) {
            _this.savedNameForEdit = _this.wffService.resolutionStatusesFromForm(form).controls[which].controls['resolutionStatusName'].value;
        });
    };
    WorkflowFormComponent.prototype.stopEditingName = function () {
        var _this = this;
        this.wffService.workflowForm$.pipe(take(1)).subscribe(function (form) {
            if (_this.editingWhichName !== null &&
                _this.wffService.resolutionStatusesFromForm(form).controls[_this.editingWhichName].controls['resolutionStatusName'].valid) {
                _this.editingWhichName = null;
                _this.wffService.commitFormChanges();
            }
        });
    };
    WorkflowFormComponent.prototype.cancelEditingName = function () {
        if (this.editingWhichName !== undefined && this.savedNameForEdit !== undefined) {
            this.wffService.setName(this.savedNameForEdit, this.editingWhichName);
        }
        this.editingWhichName = null;
        this.savedNameForEdit = null;
    };
    WorkflowFormComponent.prototype.openSettings = function () {
        this.showSettingsButton = true;
    };
    WorkflowFormComponent.prototype.closeSettings = function () {
        this.settingsOpen = false;
        this.showSettingsButton = false;
    };
    WorkflowFormComponent.prototype.settingsButtonClicked = function () {
        this.settingsOpen = !this.settingsOpen;
    };
    WorkflowFormComponent.prototype.changeSelectedMap = function (selectedMapName) {
        var _this = this;
        console.log(selectedMapName);
        var selectedMapId = -1;
        this.mapsForAsset$.pipe(take(1)).subscribe(function (maps) {
            if (maps === null) {
                return;
            }
            maps.forEach(function (element) {
                if (element.Title === selectedMapName) {
                    selectedMapId = element.Id;
                }
            });
            if (selectedMapId > -1) {
                _this.workflowFacade.loadMilestonesForMap(_this.selectedAssetGuid, selectedMapId, selectedMapName);
            }
        });
    };
    tslib_1.__decorate([
        ViewChild(StatusesComponent),
        tslib_1.__metadata("design:type", Object)
    ], WorkflowFormComponent.prototype, "statusesComponent", void 0);
    WorkflowFormComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-workflow-form',
            templateUrl: './workflow-form.component.html',
            styleUrls: ['./workflow-form.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ToastrService,
            WorkflowFacade,
            WorkflowFormService,
            AssetTreeFacadeFactory,
            WorkflowEffects,
            WorkflowService,
            MatDialog])
    ], WorkflowFormComponent);
    return WorkflowFormComponent;
}());
export { WorkflowFormComponent };
//# sourceMappingURL=workflow-form.component.js.map