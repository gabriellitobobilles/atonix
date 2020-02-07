import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

export const ModifyAssetTagsFormInfo = {
  controls: {},
  validationMessages: {}
};

@Component({
  selector: 'atx-action-form-modify-asset-tags',
  templateUrl: './action-form-modify-asset-tags.component.html',
  styleUrls: ['./action-form-modify-asset-tags.component.scss']
})
export class ActionFormModifyAssetTagsComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() errors: { [key: string]: string };
  constructor() {}
  ngOnInit() {}
}
