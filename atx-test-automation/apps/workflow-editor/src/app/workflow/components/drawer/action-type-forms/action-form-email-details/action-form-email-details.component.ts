import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowFormState } from '../../../../model/form-edit-state';

@Component({
  selector: 'atx-action-form-email-details',
  styleUrls: ['./action-form-email-details.component.scss'],
  templateUrl: './action-form-email-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFormEmailDetailsComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: any;
  @Input() showValidationMessages: boolean;
  @Input() formState: WorkflowFormState;

  WorkflowFormStateType = WorkflowFormState;

  ngOnInit() {}
}
