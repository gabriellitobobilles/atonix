import * as tslib_1 from "tslib";
import { faEdit, faTimes, faCheck, faArrowCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { WorkflowFormState } from '../../../model/form-edit-state';
var CategoryActionsComponent = /** @class */ (function () {
    function CategoryActionsComponent() {
        this.FormEditStateType = WorkflowFormState;
        this.areIssueStatuses = false;
        this.changeSelectedMap = new EventEmitter();
        this.deleteAction = new EventEmitter();
        this.addAction = new EventEmitter();
        this.actionTypeChange = new EventEmitter();
        this.faIcons = { faEdit: faEdit, faTimes: faTimes, faCheck: faCheck, faArrowCircleRight: faArrowCircleRight, faTrash: faTrash };
    }
    CategoryActionsComponent.prototype.buttonDeleteAction = function (whichAction) {
        this.deleteAction.emit(whichAction);
    };
    CategoryActionsComponent.prototype.buttonAddAction = function () {
        this.addAction.emit();
    };
    CategoryActionsComponent.prototype.changeActionType = function (event, whichAction) {
        this.actionTypeChange.emit({ actionType: event.actionType, whichAction: whichAction });
    };
    CategoryActionsComponent.prototype.onChangeSelectedMap = function (selectedMap) {
        this.changeSelectedMap.emit(selectedMap);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormArray)
    ], CategoryActionsComponent.prototype, "actions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "validationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CategoryActionsComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CategoryActionsComponent.prototype, "resolutionStatusNames", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CategoryActionsComponent.prototype, "myResolutionStatusIndex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "areIssueStatuses", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CategoryActionsComponent.prototype, "resolutionTransitionsAllowedToMe", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CategoryActionsComponent.prototype, "resolutionTransitionsAllowedFromMe", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CategoryActionsComponent.prototype, "expandAllAccordions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CategoryActionsComponent.prototype, "formEditState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "mapsForAsset", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "layerForMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "changeSelectedMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "deleteAction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "addAction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategoryActionsComponent.prototype, "actionTypeChange", void 0);
    CategoryActionsComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-category-actions',
            templateUrl: './category-actions.component.html',
            styleUrls: ['./category-actions.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CategoryActionsComponent);
    return CategoryActionsComponent;
}());
export { CategoryActionsComponent };
//# sourceMappingURL=category-actions.component.js.map