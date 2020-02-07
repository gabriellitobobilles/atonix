import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var ModalSaveCategoryComponent = /** @class */ (function () {
    function ModalSaveCategoryComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        if (data.currentResolutionStatuses && data.resolutionStatuses && data.resolutionStatuses.length > 0) {
            data.defaultResolutionStatus = data.currentResolutionStatuses[0].id;
        }
        dialogRef.disableClose = true;
    }
    ModalSaveCategoryComponent.prototype.saveCategory = function () {
        this.dialogRef.close({ data: this.data });
    };
    ModalSaveCategoryComponent.prototype.onChangeDefaultResolutionStatus = function (resolutionStatus) {
        this.data.defaultResolutionStatus = resolutionStatus;
    };
    ModalSaveCategoryComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-modal-save-category',
            templateUrl: './modal-save-category.component.html',
            styleUrls: ['./modal-save-category.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ModalSaveCategoryComponent);
    return ModalSaveCategoryComponent;
}());
export { ModalSaveCategoryComponent };
//# sourceMappingURL=modal-save-category.component.js.map