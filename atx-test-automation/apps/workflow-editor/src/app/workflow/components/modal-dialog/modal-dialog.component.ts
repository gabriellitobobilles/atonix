import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { WorkflowModalDialog } from '../../model/workflow-modal-dialog';
import { Observable } from 'rxjs';
import { WorkflowFacade } from '../../state/workflow.facade';
import { IAssetIssue } from '@AtonixWebSites/api';
import * as _ from 'lodash';

@Component({
  selector: 'atx-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  waitingOnAffectedIssues$: Observable<boolean> | null;
  affectedIssues$: Observable<IAssetIssue[]> | null;
  displayedColumns: string[] = ['name', 'create-date', 'change-date', 'resolution-status'];
  dataSource = new MatTableDataSource<IAssetIssue>();

  constructor(
    private workflowFacade: WorkflowFacade,
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkflowModalDialog
  ) {
    dialogRef.disableClose = true;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getIssue(event: string) {
    const url = `${window.location.host}/IssuesManagement/Issue.html#!/snapshot?iid=${event}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    if (this.data.showIssues) {
      this.workflowFacade.affectedIssues$.subscribe(data => {
        if (!_.isNil(data)) {
          this.dataSource = new MatTableDataSource<IAssetIssue>(data);
          setTimeout(() => (this.dataSource.paginator = this.paginator));
        }
      });
      this.affectedIssues$ = this.workflowFacade.affectedIssues$;
      this.waitingOnAffectedIssues$ = this.workflowFacade.waitingOnAffectedIssues$;
    }
  }
}
