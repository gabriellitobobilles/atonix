import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes } from '../../../model/actions';
import { WorkflowFormState } from '../../../model/form-edit-state';
var ActionFormComponent = /** @class */ (function () {
    function ActionFormComponent() {
        this.isIssueActivityOpenStatus = false;
        this.isIssueActivityClosedStatus = false;
        this.changeSelectedMap = new EventEmitter();
        this.changeActionType = new EventEmitter();
        this.faIcons = { faArrowCircleRight: faArrowCircleRight };
        this.WorkflowFormStateType = WorkflowFormState;
        this.ActionTypes = ActionTypes;
        this.selectedActionType = 1;
    }
    ActionFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.actionForm) {
            var formSelectedActionType_1 = Number(this.actionForm.get('selectedActionType').value);
            var matchingTypes = ActionTypes.filter(function (t) { return t.ActionTypeID === formSelectedActionType_1; });
            this.selectedActionType = matchingTypes.length > 0 ? matchingTypes[0].ActionTypeID : ActionTypes[0].ActionTypeID;
            this.actionForm.controls['selectedActionType'].valueChanges.subscribe(function (value) {
                _this.selectChangeActionType(value);
            });
        }
    };
    ActionFormComponent.prototype.selectChangeActionType = function (actionType) {
        var actionTypeNum = Number(actionType);
        this.selectedActionType = actionTypeNum;
        this.changeActionType.emit({ whichAction: this.index, actionType: actionTypeNum });
    };
    ActionFormComponent.prototype.onChangeSelectedMap = function (selectedMap) {
        this.changeSelectedMap.emit(selectedMap);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], ActionFormComponent.prototype, "actionForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], ActionFormComponent.prototype, "index", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "errorMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ActionFormComponent.prototype, "showValidationMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormArray)
    ], ActionFormComponent.prototype, "resolutionStatusNames", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ActionFormComponent.prototype, "resolutionTransitionsAllowedFromMe", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ActionFormComponent.prototype, "resolutionTransitionsAllowedToMe", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], ActionFormComponent.prototype, "myStatusIndex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ActionFormComponent.prototype, "showAdvancedSettings", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "isIssueActivityOpenStatus", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "isIssueActivityClosedStatus", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ActionFormComponent.prototype, "formState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "mapsForAsset", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "layerForMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "changeSelectedMap", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ActionFormComponent.prototype, "changeActionType", void 0);
    ActionFormComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-action-form',
            templateUrl: './action-form.component.html',
            styleUrls: ['./action-form.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionFormComponent);
    return ActionFormComponent;
}());
export { ActionFormComponent };
//# sourceMappingURL=action-form.component.js.map