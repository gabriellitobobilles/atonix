import { faSave, faTimes, faPlus, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IssueClassAndCategory, AssetClassType } from '../../model/issue-class-and-categories';
import { WorkflowFormState } from '../../model/form-edit-state';
import { WorkflowFormService } from '../../services/workflow-form.service';

@Component({
  selector: 'atx-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectorComponent implements OnInit {
  CategoryFormState: WorkflowFormState;
  WorkflowFormStateType = WorkflowFormState;
  faIcons = { faSave, faTimes, faPlus, faPencilAlt, faTrash };

  constructor(public wffService: WorkflowFormService) {}
  @Input() issueClasses: IssueClassAndCategory[];
  @Input() selectedIssueClass: IssueClassAndCategory;
  @Input() assetClassTypes: AssetClassType[] = [];
  @Input() selectedCategoryTypeID: number;
  @Input() formState: WorkflowFormState;
  @Input() editingWhichName?: number;
  @Input() validationMessages: object;
  @Input() showValidationMessages: boolean;
  @Input() waitingOnCategoryResponse: boolean;

  @Output() changeSelectedIssueClass = new EventEmitter();
  @Output() changeSelectedCategory = new EventEmitter();
  @Output() addCategoryEmit = new EventEmitter();
  @Output() editCategoryEmit = new EventEmitter();
  @Output() categorySaveChanges = new EventEmitter();
  @Output() categoryDiscardChanges = new EventEmitter();
  @Output() assetClassTypeSelection = new EventEmitter();
  @Output() deleteCategory = new EventEmitter();

  ngOnInit() {}

  addCategory() {
    this.addCategoryEmit.emit();
  }

  editCategory() {
    this.editCategoryEmit.emit();
  }

  assetClassTypesChanged($event) {
    this.assetClassTypeSelection.emit($event);
  }

  onSelectIssueClass(currentClassTypeId: number) {
    currentClassTypeId = Number(currentClassTypeId);
    this.changeSelectedIssueClass.emit(currentClassTypeId);
  }

  onSelectCategory(assetIssueCategoryTypeID: number) {
    assetIssueCategoryTypeID = Number(assetIssueCategoryTypeID);
    this.changeSelectedCategory.emit(assetIssueCategoryTypeID);
  }

  buttonSave() {
    this.categorySaveChanges.emit();
  }

  buttonDiscard() {
    this.categoryDiscardChanges.emit();
  }

  buttonDelete() {
    this.deleteCategory.emit();
  }
}
