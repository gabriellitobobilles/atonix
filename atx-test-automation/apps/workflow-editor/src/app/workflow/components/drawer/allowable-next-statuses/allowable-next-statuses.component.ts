import { ResolutionStatus } from '../../../model/issue-and-resolution-statuses';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { WorkflowFormState } from '../../../model/form-edit-state';

@Component({
  selector: 'atx-allowable-next-statuses',
  templateUrl: './allowable-next-statuses.component.html',
  styleUrls: ['./allowable-next-statuses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllowableNextStatusesComponent {
  @Input() statusNames: ResolutionStatus[];
  @Input() allowedNextStatuses: FormArray;
  @Input() myIndex: number;
  @Input() formState: WorkflowFormState;

  WorkflowFormStateType = WorkflowFormState;

  constructor() {}
}
