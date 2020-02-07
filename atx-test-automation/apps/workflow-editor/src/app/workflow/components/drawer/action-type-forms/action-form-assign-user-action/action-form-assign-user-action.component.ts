import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const AssignUserActionDetailsFormInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-assign-user-action',
  templateUrl: './action-form-assign-user-action.component.html',
  styleUrls: ['./action-form-assign-user-action.component.scss']
})
export class ActionFormAssignUserActionComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };
  constructor() {}

  ngOnInit() {}
}
