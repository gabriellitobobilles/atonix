import * as tslib_1 from "tslib";
import { faSave, faTimes, faPlus, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowFormState } from '../../model/form-edit-state';
import { WorkflowFormService } from '../../services/workflow-form.service';
var CategorySelectorComponent = /** @class */ (function () {
    function CategorySelectorComponent(wffService) {
        this.wffService = wffService;
        this.WorkflowFormStateType = WorkflowFormState;
        this.faIcons = { faSave: faSave, faTimes: faTimes, faPlus: faPlus, faPencilAlt: faPencilAlt, faTrash: faTrash };
        this.assetClassTypes = [];
        this.changeSelectedIssueClass = new EventEmitter();
        this.changeSelectedCategory = new EventEmitter();
        this.addCategoryEmit = new EventEmitter();
        this.editCategoryEmit = new EventEmitter();
        this.categorySaveChanges = new EventEmitter();
        this.categoryDiscardChanges = new EventEmitter();
        this.assetClassTypeSelection = new EventEmitter();
        this.deleteCategory = new EventEmitter();
    }
    CategorySelectorComponent.prototype.ngOnInit = function () { };
    CategorySelectorComponent.prototype.addCategory = function () {
        this.addCategoryEmit.emit();
    };
    CategorySelectorComponent.prototype.editCategory = function () {
        this.editCategoryEmit.emit();
    };
    CategorySelectorComponent.prototype.assetClassTypesChanged = function ($event) {
        this.assetClassTypeSelection.emit($event);
    };
    CategorySelectorComponent.prototype.onSelectIssueClass = function (currentClassTypeId) {
        currentClassTypeId = Number(currentClassTypeId);
        this.changeSelectedIssueClass.emit(currentClassTypeId);
    };
    CategorySelectorComponent.prototype.onSelectCategory = function (assetIssueCategoryTypeID) {
        assetIssueCategoryTypeID = Number(assetIssueCategoryTypeID);
        this.changeSelectedCategory.emit(assetIssueCategoryTypeID);
    };
    CategorySelectorComponent.prototype.buttonSave = function () {
        this.categorySaveChanges.emit();
    };
    CategorySelectorComponent.prototype.buttonDiscard = function () {
        this.categoryDiscardChanges.emit();
    };
    CategorySelectorComponent.prototype.buttonDelete = function () {
        this.deleteCategory.emit();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CategorySelectorComponent.prototype, "issueClasses", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "selectedIssueClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CategorySelectorComponent.prototype, "assetClassTypes", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CategorySelectorComponent.prototype, "selectedCategoryTypeID", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CategorySelectorComponent.prototype, "formState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CategorySelectorComponent.prototype, "editingWhichName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "validationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CategorySelectorComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CategorySelectorComponent.prototype, "waitingOnCategoryResponse", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "changeSelectedIssueClass", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "changeSelectedCategory", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "addCategoryEmit", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "editCategoryEmit", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "categorySaveChanges", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "categoryDiscardChanges", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "assetClassTypeSelection", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CategorySelectorComponent.prototype, "deleteCategory", void 0);
    CategorySelectorComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-category-selector',
            templateUrl: './category-selector.component.html',
            styleUrls: ['./category-selector.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [WorkflowFormService])
    ], CategorySelectorComponent);
    return CategorySelectorComponent;
}());
export { CategorySelectorComponent };
//# sourceMappingURL=category-selector.component.js.map