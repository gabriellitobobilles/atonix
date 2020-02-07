import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { WorkflowFacade } from '../../state/workflow.facade';
import * as _ from 'lodash';
var ModalDialogComponent = /** @class */ (function () {
    function ModalDialogComponent(workflowFacade, dialogRef, data) {
        this.workflowFacade = workflowFacade;
        this.dialogRef = dialogRef;
        this.data = data;
        this.displayedColumns = ['name', 'create-date', 'change-date', 'resolution-status'];
        this.dataSource = new MatTableDataSource();
        dialogRef.disableClose = true;
    }
    ModalDialogComponent.prototype.getIssue = function (event) {
        var url = window.location.host + "/IssuesManagement/Issue.html#!/snapshot?iid=" + event;
        window.open(url, '_blank');
    };
    ModalDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.showIssues) {
            this.workflowFacade.affectedIssues$.subscribe(function (data) {
                if (!_.isNil(data)) {
                    _this.dataSource = new MatTableDataSource(data);
                    setTimeout(function () { return (_this.dataSource.paginator = _this.paginator); });
                }
            });
            this.affectedIssues$ = this.workflowFacade.affectedIssues$;
            this.waitingOnAffectedIssues$ = this.workflowFacade.waitingOnAffectedIssues$;
        }
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ModalDialogComponent.prototype, "paginator", void 0);
    ModalDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-modal-dialog',
            templateUrl: './modal-dialog.component.html',
            styleUrls: ['./modal-dialog.component.scss']
        }),
        tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [WorkflowFacade,
            MatDialogRef, Object])
    ], ModalDialogComponent);
    return ModalDialogComponent;
}());
export { ModalDialogComponent };
//# sourceMappingURL=modal-dialog.component.js.map