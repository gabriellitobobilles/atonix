import { FormGroup, Validators } from '@angular/forms';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowFormState } from '../../../../model/form-edit-state';

@Component({
  selector: 'atx-action-form-update-attribute-details',
  styleUrls: ['./action-form-update-attribute-details.component.scss'],
  templateUrl: './action-form-update-attribute-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFormUpdateAttributeDetailsComponent {
  @Input() workflowForm: FormGroup;
  @Input() showValidationMessages: boolean;
  @Input() errors: { [key: string]: string };
  @Input() formState: WorkflowFormState;

  WorkflowFormStateType = WorkflowFormState;
}
