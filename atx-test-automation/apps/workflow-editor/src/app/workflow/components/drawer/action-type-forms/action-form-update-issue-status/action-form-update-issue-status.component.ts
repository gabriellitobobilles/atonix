import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const UpdateIssueStatusDetailsInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-update-issue-status',
  templateUrl: './action-form-update-issue-status.component.html',
  styleUrls: ['./action-form-update-issue-status.component.scss']
})
export class ActionFormUpdateIssueStatusComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };

  constructor() {}

  ngOnInit() {}
}
