import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const CreateBlogEntryDetailsInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-create-blog-entry',
  templateUrl: './action-form-create-blog-entry.component.html',
  styleUrls: ['./action-form-create-blog-entry.component.scss']
})
export class ActionFormCreateBlogEntryComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };

  constructor() {}

  ngOnInit() {}
}
