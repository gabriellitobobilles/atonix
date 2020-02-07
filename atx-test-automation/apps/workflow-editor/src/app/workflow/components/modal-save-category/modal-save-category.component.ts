import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkflowModalSaveCategory } from '../../model/workflow-modal-save-category';
import * as _ from 'lodash';

@Component({
  selector: 'atx-modal-save-category',
  templateUrl: './modal-save-category.component.html',
  styleUrls: ['./modal-save-category.component.scss']
})
export class ModalSaveCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalSaveCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkflowModalSaveCategory
  ) {
    if (data.currentResolutionStatuses && data.resolutionStatuses && data.resolutionStatuses.length > 0) {
      data.defaultResolutionStatus = data.currentResolutionStatuses[0].id;
    }
    dialogRef.disableClose = true;
  }
  saveCategory() {
    this.dialogRef.close({ data: this.data });
  }
  onChangeDefaultResolutionStatus(resolutionStatus: number) {
    this.data.defaultResolutionStatus = resolutionStatus;
  }
}
