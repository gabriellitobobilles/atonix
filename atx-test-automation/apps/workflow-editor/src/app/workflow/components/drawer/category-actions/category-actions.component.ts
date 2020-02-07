import { faEdit, faTimes, faCheck, faArrowCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { WorkflowFormState } from '../../../model/form-edit-state';
import { IGeoSpaDropdownItem, IStatesForLayer } from '@AtonixWebSites/api';

@Component({
  selector: 'atx-category-actions',
  templateUrl: './category-actions.component.html',
  styleUrls: ['./category-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryActionsComponent {
  FormEditStateType = WorkflowFormState;
  @Input() actions: FormArray;
  @Input() validationMessages: object;
  @Input() showValidationMessages: boolean;
  @Input() resolutionStatusNames: string[];
  @Input() myResolutionStatusIndex: number;
  @Input() areIssueStatuses = false;
  @Input() resolutionTransitionsAllowedToMe: boolean[];
  @Input() resolutionTransitionsAllowedFromMe: boolean[];
  @Input() expandAllAccordions: boolean;
  @Input() formEditState: WorkflowFormState;
  @Input() mapsForAsset: IGeoSpaDropdownItem;
  @Input() layerForMap: IStatesForLayer;

  @Output() changeSelectedMap = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() addAction = new EventEmitter();
  @Output() actionTypeChange = new EventEmitter();
  faIcons = { faEdit, faTimes, faCheck, faArrowCircleRight, faTrash };

  constructor() {}

  buttonDeleteAction(whichAction: number) {
    this.deleteAction.emit(whichAction);
  }
  buttonAddAction() {
    this.addAction.emit();
  }
  changeActionType(event, whichAction) {
    this.actionTypeChange.emit({ actionType: event.actionType, whichAction });
  }

  onChangeSelectedMap(selectedMap: string) {
    this.changeSelectedMap.emit(selectedMap);
  }
}
