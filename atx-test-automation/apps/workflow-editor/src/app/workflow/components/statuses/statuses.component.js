import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { faCog, faArrowCircleDown, faArrowCircleUp, faArrowDown, faArrowUp, faCheck, faTrash, faSave, faEdit, faBan, faTimes, faPlus, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { WorkflowFormState } from '../../model/form-edit-state';
import { WorkflowFormService } from '../../services/workflow-form.service';
import { MatDialog } from '@angular/material';
var StatusesComponent = /** @class */ (function () {
    function StatusesComponent(wffService, dialog) {
        this.wffService = wffService;
        this.dialog = dialog;
        this.changeSelectedMap = new EventEmitter();
        this.deleteAction = new EventEmitter();
        this.deleteResolutionStatus = new EventEmitter();
        this.addAction = new EventEmitter();
        this.actionTypeChanged = new EventEmitter();
        this.selectDrawerItem = new EventEmitter();
        this.startEditingName = new EventEmitter();
        this.stopEditingName = new EventEmitter();
        this.cancelEditingName = new EventEmitter();
        this.expandAllToggle = new EventEmitter();
        this.openSettings = new EventEmitter();
        this.closeSettings = new EventEmitter();
        this.settingsButtonClicked = new EventEmitter();
        this.WorkflowFormStateType = WorkflowFormState;
        this.faIcons = {
            faCog: faCog,
            faArrowCircleDown: faArrowCircleDown,
            faArrowCircleUp: faArrowCircleUp,
            faCheck: faCheck,
            faUp: faArrowUp,
            faDown: faArrowDown,
            faDelete: faTrash,
            faSave: faSave,
            faBan: faBan,
            faEdit: faEdit,
            faTimes: faTimes,
            faAdd: faPlus,
            faCaretDown: faCaretDown,
            faCaretUp: faCaretUp
        };
    }
    StatusesComponent.prototype.ngOnInit = function () { };
    StatusesComponent.prototype.toggleExpandAll = function () {
        this.expandAllToggle.emit();
    };
    StatusesComponent.prototype.openSettingsClicked = function () {
        this.openSettings.emit();
    };
    StatusesComponent.prototype.closeSettingsClicked = function () {
        this.closeSettings.emit();
    };
    StatusesComponent.prototype.categorySettingsClicked = function () {
        this.settingsButtonClicked.emit();
    };
    StatusesComponent.prototype.onChangeSelectedMap = function (selectedMap) {
        this.changeSelectedMap.emit(selectedMap);
    };
    StatusesComponent.prototype.selectDrawerItemForStatus = function (drawerItemIndex, whichStatus) {
        this.selectDrawerItem.emit({ whichStatus: whichStatus, drawerItemIndex: drawerItemIndex });
    };
    StatusesComponent.prototype.clickDeleteAction = function (whichAction, whichStatus) {
        this.deleteAction.emit({ whichAction: whichAction, whichStatus: whichStatus });
    };
    StatusesComponent.prototype.clickAddAction = function (whichStatus) {
        this.addAction.emit({ whichStatus: whichStatus });
    };
    StatusesComponent.prototype.changeActionType = function (event, whichStatus) {
        this.actionTypeChanged.emit({ whichStatus: whichStatus, whichAction: event.whichAction, actionType: event.actionType });
    };
    StatusesComponent.prototype.buttonAddResolutionStatus = function () {
        this.wffService.addResolutionStatus();
    };
    StatusesComponent.prototype.buttonMoveResolutionStatusUp = function (which) {
        this.wffService.moveResolutionStatusUp(which);
    };
    StatusesComponent.prototype.buttonMoveResolutionStatusDown = function (which) {
        this.wffService.moveResolutionStatusDown(which);
    };
    StatusesComponent.prototype.buttonRemoveResolutionStatus = function (which) {
        this.deleteResolutionStatus.emit(which);
    };
    StatusesComponent.prototype.buttonStartEditingName = function (which) {
        var _this = this;
        this.startEditingName.emit(which);
        setTimeout(function () {
            _this.resolutionNameInput.nativeElement.focus();
        }, 0);
    };
    StatusesComponent.prototype.buttonStopEditingName = function () {
        this.stopEditingName.emit();
    };
    StatusesComponent.prototype.buttonCancelEditingName = function () {
        this.cancelEditingName.emit();
    };
    StatusesComponent.prototype.handleEditNameKeyStroke = function (event) {
        if (event.keyCode === 32) {
            event.stopPropagation();
        }
        else if (event.keyCode === 13) {
            event.stopPropagation();
            this.buttonStopEditingName();
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "validationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], StatusesComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], StatusesComponent.prototype, "issueClassDesc", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], StatusesComponent.prototype, "selectedAssetClassTypes", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], StatusesComponent.prototype, "formState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], StatusesComponent.prototype, "workflowForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], StatusesComponent.prototype, "selectedDrawerItemForStatus", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], StatusesComponent.prototype, "numResolutionStatuses", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], StatusesComponent.prototype, "editingWhichName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], StatusesComponent.prototype, "savedNameForEdit", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], StatusesComponent.prototype, "expandAllAccordions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], StatusesComponent.prototype, "showSettingsButton", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], StatusesComponent.prototype, "settingsOpen", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "mapsForAsset", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "layerForMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "changeSelectedMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "deleteAction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "deleteResolutionStatus", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "addAction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "actionTypeChanged", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "selectDrawerItem", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "startEditingName", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "stopEditingName", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "cancelEditingName", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "expandAllToggle", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "openSettings", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "closeSettings", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "settingsButtonClicked", void 0);
    tslib_1.__decorate([
        ViewChild('resolutionNameInput'),
        tslib_1.__metadata("design:type", Object)
    ], StatusesComponent.prototype, "resolutionNameInput", void 0);
    StatusesComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-statuses',
            templateUrl: './statuses.component.html',
            styleUrls: ['./statuses.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [WorkflowFormService, MatDialog])
    ], StatusesComponent);
    return StatusesComponent;
}());
export { StatusesComponent };
//# sourceMappingURL=statuses.component.js.map