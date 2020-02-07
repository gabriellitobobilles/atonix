import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const CreateIssueDetailsInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-create-issue',
  templateUrl: './action-form-create-issue.component.html',
  styleUrls: ['./action-form-create-issue.component.scss']
})
export class ActionFormCreateIssueComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };

  constructor() {}

  ngOnInit() {}
}
