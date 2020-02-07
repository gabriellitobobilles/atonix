import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueClassAndCategory, AssetClassType } from '../../../model/issue-class-and-categories';
import { MatOptionSelectionChange } from '@angular/material';

@Component({
  selector: 'atx-create-category-settings',
  templateUrl: './create-category-settings.component.html',
  styleUrls: ['./create-category-settings.component.scss']
})
export class CreateCategorySettingsComponent implements OnInit {
  @Input() workflowForm: FormGroup;
  @Input() issueClasses: IssueClassAndCategory[];
  @Input() assetClassTypes: AssetClassType[];
  @Input() validationMessages: { [key: string]: string };
  @Input() showValidationMessages: boolean;

  @Output() assetClassTypesChanged = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  assetClassSelectionChanged(event: MatOptionSelectionChange, assetClassTypeID) {
    if (event.isUserInput) {
      this.assetClassTypesChanged.emit(assetClassTypeID);
    }
  }
}
