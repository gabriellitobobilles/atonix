import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes } from '../../../model/actions';
import { WorkflowFormState } from '../../../model/form-edit-state';
import { IGeoSpaDropdownItem, IStatesForLayer } from '@AtonixWebSites/api';

@Component({
  selector: 'atx-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFormComponent implements OnInit {
  @Input() actionForm: FormGroup;
  @Input() index: number;
  @Input() errorMessages: any;
  @Input() showValidationMessages: boolean;
  @Input() resolutionStatusNames: FormArray;
  @Input() resolutionTransitionsAllowedFromMe: boolean[];
  @Input() resolutionTransitionsAllowedToMe: boolean[];
  @Input() myStatusIndex: number;
  @Input() showAdvancedSettings: boolean;
  @Input() isIssueActivityOpenStatus = false;
  @Input() isIssueActivityClosedStatus = false;
  @Input() formState: WorkflowFormState;
  @Input() mapsForAsset: IGeoSpaDropdownItem;
  @Input() layerForMap: IStatesForLayer;

  @Output() changeSelectedMap = new EventEmitter();
  @Output() changeActionType = new EventEmitter();

  faIcons = { faArrowCircleRight };

  WorkflowFormStateType = WorkflowFormState;
  ActionTypes = ActionTypes;
  selectedActionType = 1;
  constructor() {}

  ngOnInit() {
    if (this.actionForm) {
      const formSelectedActionType = Number(this.actionForm.get('selectedActionType').value);
      const matchingTypes = ActionTypes.filter(t => t.ActionTypeID === formSelectedActionType);
      this.selectedActionType = matchingTypes.length > 0 ? matchingTypes[0].ActionTypeID : ActionTypes[0].ActionTypeID;
      this.actionForm.controls['selectedActionType'].valueChanges.subscribe(value => {
        this.selectChangeActionType(value);
      });
    }
  }

  selectChangeActionType(actionType: number) {
    const actionTypeNum = Number(actionType);
    this.selectedActionType = actionTypeNum;
    this.changeActionType.emit({ whichAction: this.index, actionType: actionTypeNum });
  }

  onChangeSelectedMap(selectedMap: string) {
    this.changeSelectedMap.emit(selectedMap);
  }
}
