import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { IAssetIssue } from '@AtonixWebSites/api';
import * as _ from 'lodash';

import { CountdownModal } from '../../models/inactivity/countdown-modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'atx-modal-countdown',
  templateUrl: './modal-countdown.component.html',
  styleUrls: ['./modal-countdown.component.scss']
})
export class ModalCountdownComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  waitingOnAffectedIssues$: Observable<boolean> | null;
  affectedIssues$: Observable<IAssetIssue[]> | null;
  displayedColumns: string[] = ['name', 'create-date', 'change-date', 'resolution-status'];
  dataSource = new MatTableDataSource<IAssetIssue>();
  countdown: number = null;

  constructor(public dialogRef: MatDialogRef<ModalCountdownComponent>, @Inject(MAT_DIALOG_DATA) public data: CountdownModal) {
    dialogRef.disableClose = true;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.data.countdown.pipe(takeUntil(this.unsubscribe)).subscribe(countdown => {
      this.countdown = countdown;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
