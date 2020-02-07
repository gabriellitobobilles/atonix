import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const UpdateActivityStatusDetailsInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-update-activity-status',
  templateUrl: './action-form-update-activity-status.component.html',
  styleUrls: ['./action-form-update-activity-status.component.scss']
})
export class ActionFormUpdateActivityStatusComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };

  constructor() {}

  ngOnInit() {}
}
