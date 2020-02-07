import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var ModalCountdownComponent = /** @class */ (function () {
    function ModalCountdownComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.unsubscribe = new Subject();
        this.displayedColumns = ['name', 'create-date', 'change-date', 'resolution-status'];
        this.dataSource = new MatTableDataSource();
        this.countdown = null;
        dialogRef.disableClose = true;
    }
    ModalCountdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.countdown.pipe(takeUntil(this.unsubscribe)).subscribe(function (countdown) {
            _this.countdown = countdown;
        });
    };
    ModalCountdownComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ModalCountdownComponent.prototype, "paginator", void 0);
    ModalCountdownComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-modal-countdown',
            templateUrl: './modal-countdown.component.html',
            styleUrls: ['./modal-countdown.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ModalCountdownComponent);
    return ModalCountdownComponent;
}());
export { ModalCountdownComponent };
//# sourceMappingURL=modal-countdown.component.js.map