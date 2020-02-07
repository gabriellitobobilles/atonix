import * as tslib_1 from "tslib";
import { WorkflowFormValidationMessages, ResolutionStatusValidationMessages, ActionBaseValidationMessages, ActionEmailFormValidationMessages, ActionUpdateAttributeFormValidationMessages, ActionUpdateAttributeForm, ActionMapStatusForm, ActionMapStatusFormValidationMessages } from './../model/workflow-form';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ResolutionStatusForm, ActionEmailForm, WorkflowForm, ActionBase } from '../model/workflow-form';
import { GenericValidator } from '@AtonixWebSites/shared';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
export var resStatString = 'resolutionStatuses';
export var actionsString = 'actions';
export var allowedNextString = 'allowedNextStatuses';
export var activityStatusString = 'issueActivityStatuses';
export var issueActivityActionsString = 'issueActivityStatusActions';
var WorkflowFormService = /** @class */ (function () {
    function WorkflowFormService(fb) {
        this.fb = fb;
        this.workflowForm = new BehaviorSubject(null);
        this.workflowFormValidator = new GenericValidator(tslib_1.__assign({}, WorkflowFormValidationMessages, ResolutionStatusValidationMessages, ActionBaseValidationMessages, ActionEmailFormValidationMessages, ActionMapStatusFormValidationMessages, ActionUpdateAttributeFormValidationMessages));
        this.validationMessages = new BehaviorSubject({});
        this.workflowForm$ = this.workflowForm.asObservable();
        this.validationMessages$ = this.validationMessages.asObservable();
    }
    WorkflowFormService.prototype.configureValidationSubscription = function (form) {
        var _this = this;
        if (this.validatorSubscription !== undefined && !this.validatorSubscription.closed) {
            this.validatorSubscription.unsubscribe();
        }
        this.validationMessages.next(this.workflowFormValidator.processMessages(form));
        this.validatorSubscription = form.valueChanges.subscribe(function (__) {
            _this.validationMessages.next(_this.workflowFormValidator.processMessages(form));
        });
    };
    WorkflowFormService.prototype.setFormToNull = function () {
        this.workflowForm.next(null);
    };
    WorkflowFormService.prototype.setSpecificAssetClassType = function (event) {
        var currentForm = this.workflowForm.getValue();
        var assetClassTypes = currentForm.get('assetClassTypes').value;
        if (assetClassTypes.find(function (x) { return x === event; })) {
            assetClassTypes = assetClassTypes.filter(function (obj) { return obj !== event; });
        }
        assetClassTypes = assetClassTypes.filter(function (obj) { return obj !== -1; });
        currentForm.get('assetClassTypes').setValue(assetClassTypes);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.setAllAssetClassTypes = function () {
        var currentForm = this.workflowForm.getValue();
        currentForm.get('assetClassTypes').setValue([-1]);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.setNullAssetClassType = function () {
        var currentForm = this.workflowForm.getValue();
        if (currentForm.get('assetClassTypes').value.length === 0) {
            currentForm.get('assetClassTypes').setValue([-1]);
        }
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.resetForm = function (defaultIssueClassID, category) {
        var _this = this;
        this.workflowForm.next(this.fb.group(new WorkflowForm(defaultIssueClassID, category)));
        this.validationMessages.next({});
        this.validateAllFormFields(this.workflowForm.getValue());
        // set initial value
        this.configureValidationSubscription(this.workflowForm.getValue());
        // set subsequent subscriptions
        this.workflowForm.pipe(map(function (newForm) {
            _this.configureValidationSubscription(newForm);
        }));
    };
    WorkflowFormService.prototype.setName = function (name, resolutionStatus) {
        var currentForm = this.workflowForm.getValue();
        var statuses = this.resolutionStatusesFromForm(currentForm).controls[resolutionStatus];
        statuses.controls['resolutionStatusName'].setValue(name);
        this.workflowForm.next(currentForm);
    };
    // resolution status functions
    WorkflowFormService.prototype.resolutionStatusesFromForm = function (form) {
        return form.get(resStatString);
    };
    WorkflowFormService.prototype.resolutionStatusFromForm = function (form, whichResolutionStatus) {
        return this.resolutionStatusesFromForm(form).controls[whichResolutionStatus];
    };
    WorkflowFormService.prototype.actionsFromResolutionStatus = function (form) {
        return form.get(actionsString);
    };
    WorkflowFormService.prototype.actionFromResolutionStatus = function (form, whichAction) {
        return this.actionsFromResolutionStatus(form).controls[whichAction];
    };
    WorkflowFormService.prototype.allowedNextStautesFromResolutionStatus = function (form) {
        return form.get(allowedNextString);
    };
    WorkflowFormService.prototype.markActionOnResolutionStatusDirty = function (form, whichResolutionStatus, whichAction) {
        var action = this.actionFromResolutionStatus(this.resolutionStatusFromForm(form, whichResolutionStatus), whichAction);
        action.markAsDirty({ onlySelf: true });
        this.markActionsOnResolutionStatusDirty(form, whichResolutionStatus);
    };
    WorkflowFormService.prototype.markActionsOnResolutionStatusDirty = function (form, whichResolutionStatus) {
        var actions = this.actionsFromResolutionStatus(this.resolutionStatusFromForm(form, whichResolutionStatus));
        actions.markAsDirty({ onlySelf: true });
        this.markResolutionStatusAsDirty(form, whichResolutionStatus);
    };
    WorkflowFormService.prototype.markResolutionStatusAsDirty = function (form, whichResolutionStatus) {
        var status = this.resolutionStatusFromForm(form, whichResolutionStatus);
        status.markAsDirty({ onlySelf: true });
        this.markResolutionStatusesAsDirty(form);
    };
    WorkflowFormService.prototype.markResolutionStatusesAsDirty = function (form) {
        var statuses = this.resolutionStatusesFromForm(form);
        statuses.markAsDirty({ onlySelf: true });
        form.markAsDirty({ onlySelf: true });
    };
    WorkflowFormService.prototype.makeUniqueName = function (name) {
        var count = {};
        name.forEach(function (x, i) {
            if (name.indexOf(x) !== i) {
                var c = x in count ? (count[x] = count[x] + 1) : (count[x] = 1);
                var j = c + 1;
                var k = x + " (" + j + ")";
                while (name.indexOf(k) !== -1) {
                    k = x + " (" + ++j + ")";
                }
                name[i] = k;
            }
        });
        return name;
    };
    WorkflowFormService.prototype.addResolutionStatus = function () {
        var currentForm = this.workflowForm.getValue();
        var statuses = this.resolutionStatusesFromForm(currentForm);
        // give the new status an ID.
        var id = statuses.length > 0 ? Math.min.apply(Math, [0].concat(statuses.controls.map(function (c) { return Number(c.controls['id'].value); }))) : 0;
        id -= 1;
        var currentNames = currentForm.get(resStatString).value.map(function (a) { return a.resolutionStatusName; });
        currentNames.push('New Resolution Status');
        var newStatus = this.fb.group(new ResolutionStatusForm(id, null, this.makeUniqueName(currentNames).pop()));
        var newAllowedList = this.allowedNextStautesFromResolutionStatus(newStatus);
        // update the rest of the statuses' allowable next statuses
        // Add new status to each action, initial value of true if all existing are true, otherwise false
        for (var _i = 0, _a = statuses.controls; _i < _a.length; _i++) {
            var status_1 = _a[_i];
            var allowedList = this.allowedNextStautesFromResolutionStatus(status_1);
            allowedList.push(this.fb.control(true, [Validators.required]));
            newAllowedList.push(this.fb.control(true, [Validators.required]));
            // Do this before adding newStatus so it only affects existing statuses
            var actions = this.actionsFromResolutionStatus(status_1);
            for (var _b = 0, _c = actions.controls; _b < _c.length; _b++) {
                var action = _c[_b];
                var initialValue = action.controls['triggerOnResolutionStatus'].value.every(function (item) { return item === true; });
                action.controls['triggerOnResolutionStatus'].push(new FormControl(initialValue));
            }
        }
        // add new status to its own allowed list
        newAllowedList.push(this.fb.control(true, [Validators.required]));
        statuses.push(newStatus);
        this.markResolutionStatusesAsDirty(currentForm);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.deleteResolutionStatus = function (which) {
        var _this = this;
        var currentForm = this.workflowForm.getValue();
        var statuses = this.resolutionStatusesFromForm(currentForm);
        statuses.removeAt(which);
        this.markResolutionStatusesAsDirty(currentForm);
        // delete the value from the allowable next statuses
        // Remove status from each action
        statuses.controls.forEach(function (arrayItem) {
            var statusForm = arrayItem;
            var allowableNextStatuses = statusForm.controls['allowedNextStatuses'];
            allowableNextStatuses.removeAt(which);
            var actions = _this.actionsFromResolutionStatus(arrayItem);
            for (var _i = 0, _a = actions.controls; _i < _a.length; _i++) {
                var action = _a[_i];
                action.controls['triggerOnResolutionStatus'].removeAt(which);
            }
        });
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.moveFormArrayItemUp = function (array, which) {
        if (which <= 0 || which >= array.length) {
            return;
        }
        var itemToMove = array.controls[which];
        array.removeAt(which);
        array.insert(which - 1, itemToMove);
    };
    WorkflowFormService.prototype.moveFormArrayItemDown = function (array, which) {
        if (which < 0 || which >= array.length - 1) {
            return;
        }
        var itemToMove = array.controls[which];
        array.removeAt(which);
        array.insert(which + 1, itemToMove);
    };
    WorkflowFormService.prototype.moveResolutionStatusUp = function (which) {
        var currentForm = this.workflowForm.getValue();
        var statuses = this.resolutionStatusesFromForm(currentForm);
        this.moveFormArrayItemUp(statuses, which);
        this.markResolutionStatusesAsDirty(currentForm);
        // loop over each of the resolution statuses and update the
        // allowedNextStatuses order
        for (var _i = 0, _a = statuses.controls; _i < _a.length; _i++) {
            var status_2 = _a[_i];
            var allowList = this.allowedNextStautesFromResolutionStatus(status_2);
            this.moveFormArrayItemUp(allowList, which);
            // loop over actions for this resolution status and update the triggerOnResolutionStatus order
            var actions = this.actionsFromResolutionStatus(status_2);
            for (var _b = 0, _c = actions.controls; _b < _c.length; _b++) {
                var action = _c[_b];
                this.moveFormArrayItemUp(action.controls['triggerOnResolutionStatus'], which);
            }
        }
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.commitFormChanges = function () {
        var currentForm = this.workflowForm.getValue();
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.moveResolutionStatusDown = function (which) {
        var currentForm = this.workflowForm.getValue();
        var statuses = this.resolutionStatusesFromForm(currentForm);
        this.moveFormArrayItemDown(statuses, which);
        this.markResolutionStatusesAsDirty(currentForm);
        // loop over each of the resolution statuses and update the
        // allowedNextStatuses order
        for (var _i = 0, _a = statuses.controls; _i < _a.length; _i++) {
            var status_3 = _a[_i];
            var allowList = this.allowedNextStautesFromResolutionStatus(status_3);
            this.moveFormArrayItemDown(allowList, which);
            // loop over actions for this resolution status and update the triggerOnResolutionStatus order
            var actions = this.actionsFromResolutionStatus(status_3);
            for (var _b = 0, _c = actions.controls; _b < _c.length; _b++) {
                var action = _c[_b];
                this.moveFormArrayItemDown(action.controls['triggerOnResolutionStatus'], which);
            }
        }
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.addActionToResolutionStatus = function (whichResolutionStatus) {
        var currentForm = this.workflowForm.getValue();
        var status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
        var actions = this.actionsFromResolutionStatus(status);
        var currentNames = actions.value.map(function (a) { return a.actionName; });
        currentNames.push('New Action');
        var newActionBase = new ActionBase({ type: 1, name: this.makeUniqueName(currentNames).pop() });
        this.resolutionStatusesFromForm(currentForm).controls.forEach(function (__) {
            newActionBase.triggerOnResolutionStatus.push(new FormControl(true));
        });
        var newAction = this.fb.group(newActionBase);
        newAction.addControl('emailDetails', this.fb.group(new ActionEmailForm()));
        this.validateAllFormFields(newAction);
        actions.push(newAction);
        this.markActionsOnResolutionStatusDirty(currentForm, whichResolutionStatus);
        this.workflowForm.next(currentForm);
        return actions.controls.length;
    };
    WorkflowFormService.prototype.addActionToIssueActivityStatus = function (whichIssueActivityStatus) {
        var currentForm = this.workflowForm.getValue();
        var status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
        var actions = this.actionsFromIssueActivityStatus(status);
        var currentNames = actions.value.map(function (a) { return a.actionName; });
        currentNames.push('New Action');
        var newAction = this.fb.group(new ActionBase({ type: 1, name: this.makeUniqueName(currentNames).pop() }));
        newAction.addControl('emailDetails', this.fb.group(new ActionEmailForm()));
        this.validateAllFormFields(newAction);
        actions.push(newAction);
        this.markActionsOnIssueStatusDirty(currentForm, whichIssueActivityStatus);
        this.workflowForm.next(currentForm);
        return actions.controls.length;
    };
    WorkflowFormService.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        var keysArray = formGroup instanceof FormGroup ? Object.values(formGroup.controls) : formGroup.controls;
        keysArray.forEach(function (control) {
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: false });
                control.updateValueAndValidity();
            }
            else if (control instanceof FormGroup || control instanceof FormArray) {
                _this.validateAllFormFields(control);
            }
        });
        return formGroup.invalid;
    };
    WorkflowFormService.prototype.changeActionType = function (actionForm, actionType) {
        // TODO support other action types.
        actionType = Number(actionType);
        var childFormNamesByActionType = {
            1: 'emailDetails',
            2: 'mapStatusDetails',
            3: 'updateAttributeDetails'
        };
        var currentChildFormName = childFormNamesByActionType[actionType];
        Object.keys(childFormNamesByActionType)
            .filter(function (t) { return Number(t) !== actionType; })
            .forEach(function (t) {
            if (actionForm.contains(childFormNamesByActionType[t])) {
                actionForm.removeControl(childFormNamesByActionType[t]);
            }
        });
        if (actionType === 1) {
            if (!actionForm.contains(currentChildFormName)) {
                var emailForm = this.fb.group(new ActionEmailForm());
                this.validateAllFormFields(emailForm);
                actionForm.addControl(currentChildFormName, emailForm);
            }
        }
        else if (actionType === 2) {
            if (!actionForm.contains(currentChildFormName)) {
                var mapForm = this.fb.group(new ActionMapStatusForm());
                this.validateAllFormFields(mapForm);
                actionForm.addControl(currentChildFormName, mapForm);
            }
        }
        else if (actionType === 3) {
            if (!actionForm.contains(currentChildFormName)) {
                var attributeForm = this.fb.group(new ActionUpdateAttributeForm());
                this.validateAllFormFields(attributeForm);
                actionForm.addControl(currentChildFormName, attributeForm);
            }
        }
        return actionForm;
    };
    WorkflowFormService.prototype.changeResolutionStatusActionType = function (whichResolutionStatus, whichAction, actionType) {
        var currentForm = this.workflowForm.getValue();
        var status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
        this.changeActionType(this.actionFromResolutionStatus(status, whichAction), actionType);
        this.markActionOnResolutionStatusDirty(currentForm, whichResolutionStatus, whichAction);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.removeActionFromResolutionStatus = function (whichResolutionStatus, whichAction) {
        var currentForm = this.workflowForm.getValue();
        var status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
        var actions = this.actionsFromResolutionStatus(status);
        actions.removeAt(whichAction);
        this.markActionsOnResolutionStatusDirty(currentForm, whichResolutionStatus);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.revertResolutionActionToValue = function (whichResolutionStatus, whichAction, actionValue) {
        var currentForm = this.workflowForm.getValue();
        var status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
        var action = this.actionFromResolutionStatus(status, whichAction);
        // make sure the action is in the right type now
        if (actionValue.selectedActionType !== undefined) {
            this.changeActionType(action, actionValue.selectedActionType);
        }
        Object.keys(actionValue).forEach(function (key) {
            action.controls[key].setValue(actionValue[key]);
        });
        // this.validateAllFormFields(action);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.issueActivityStatusesFromForm = function (form) {
        return form.get(activityStatusString);
    };
    WorkflowFormService.prototype.issueActivityStatusFromForm = function (form, whichIssueActivityStatus) {
        var statuses = this.issueActivityStatusesFromForm(form).controls[whichIssueActivityStatus];
        return statuses;
    };
    WorkflowFormService.prototype.actionsFromIssueActivityStatus = function (form) {
        return form.get(issueActivityActionsString);
    };
    WorkflowFormService.prototype.actionFromIssueActivityStatus = function (form, whichAction) {
        return this.actionsFromIssueActivityStatus(form).controls[whichAction];
    };
    WorkflowFormService.prototype.markActionOnIssueStatusDirty = function (form, whichIssueStatus, whichAction) {
        var action = this.actionFromIssueActivityStatus(this.issueActivityStatusFromForm(form, whichIssueStatus), whichAction);
        action.markAsDirty({ onlySelf: true });
        this.markActionsOnIssueStatusDirty(form, whichIssueStatus);
    };
    WorkflowFormService.prototype.markActionsOnIssueStatusDirty = function (form, whichIssueStatus) {
        var actions = this.actionsFromIssueActivityStatus(this.issueActivityStatusFromForm(form, whichIssueStatus));
        actions.markAsDirty({ onlySelf: true });
        this.markIssueStatusAsDirty(form, whichIssueStatus);
    };
    WorkflowFormService.prototype.markIssueStatusAsDirty = function (form, whichIssueStatus) {
        var status = this.issueActivityStatusFromForm(form, whichIssueStatus);
        status.markAsDirty({ onlySelf: true });
        this.markIssueStatusesAsDirty(form);
    };
    WorkflowFormService.prototype.markIssueStatusesAsDirty = function (form) {
        var statuses = this.issueActivityStatusesFromForm(form);
        statuses.markAsDirty({ onlySelf: true });
        form.markAsDirty({ onlySelf: true });
    };
    WorkflowFormService.prototype.changeIssueActivityStatusActionType = function (whichIssueActivityStatus, whichAction, actionType) {
        var currentForm = this.workflowForm.getValue();
        var status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
        this.changeActionType(this.actionFromIssueActivityStatus(status, whichAction), actionType);
        this.markActionOnIssueStatusDirty(currentForm, whichIssueActivityStatus, whichAction);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.removeActionFromIssueActivityStatus = function (whichIssueActivityStatus, whichAction) {
        var currentForm = this.workflowForm.getValue();
        var status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
        var actions = this.actionsFromIssueActivityStatus(status);
        actions.removeAt(whichAction);
        this.markActionsOnIssueStatusDirty(currentForm, whichIssueActivityStatus);
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.revertIssueActivityStatusActionToValue = function (whichIssueActivityStatus, whichAction, actionValue) {
        var currentForm = this.workflowForm.getValue();
        var status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
        var action = this.actionFromIssueActivityStatus(status, whichAction);
        // make sure the action is in the right type now
        if (actionValue.selectedActionType !== undefined) {
            this.changeActionType(action, actionValue.selectedActionType);
        }
        Object.keys(actionValue).forEach(function (key) {
            action.controls[key].setValue(actionValue[key]);
        });
        this.workflowForm.next(currentForm);
    };
    WorkflowFormService.prototype.formToNewCategory = function (assetGuid, options) {
        var _this = this;
        var currentFormValue = this.workflowForm.getValue().getRawValue();
        var resStatuses = currentFormValue.resolutionStatuses.map(function (resStatus, i) {
            // negate to avoid lookup collisions when we resolve existing
            // statuses by name // will create this below;
            // have to fix all the IDs in this first loop.
            var fixedStatus = {
                AssetIssueResolutionStatusTypeID: resStatus.id,
                AssetIssueResolutionStatusTypeDesc: resStatus.resolutionStatusName,
                Actions: _this.transformActions(resStatus.actions),
                IsDefault: i === 0,
                DisplayOrder: i + 1,
                TransitionIDs: null
            };
            return fixedStatus;
        });
        // now we have to build each status's list of allowed transitions by ID from the ordered boolean list.
        resStatuses.forEach(function (__, h) {
            var transitionIDs = [];
            var statusToGetFixedTIDs = resStatuses[h];
            var unfixedStatusWithBooleanList = currentFormValue.resolutionStatuses[h];
            for (var i = 0; i < resStatuses.length; i++) {
                var fixedStatus = resStatuses[i];
                if (unfixedStatusWithBooleanList.allowedNextStatuses[i]) {
                    transitionIDs.push(fixedStatus.AssetIssueResolutionStatusTypeID);
                }
            }
            statusToGetFixedTIDs.TransitionIDs = transitionIDs;
        });
        var assetClassTypeIDs = currentFormValue.assetClassTypes.length === 1 && currentFormValue.assetClassTypes[0] === -1
            ? []
            : currentFormValue.assetClassTypes;
        // issue activity statuses
        var openIssueActions = this.transformActions(currentFormValue.issueActivityStatuses[0].issueActivityStatusActions);
        var closeIssueActions = this.transformActions(currentFormValue.issueActivityStatuses[1].issueActivityStatusActions);
        // for now. Once asset selector is implemented, its value will get passed through and  assigned here.
        // for now. Once the checkbox for this boolean is created, its value will get passed through and assigned.
        return {
            AssetIssueCategoryTypeID: currentFormValue.categoryId,
            CategoryAbbrev: currentFormValue.categoryDescription,
            CategoryDesc: currentFormValue.categoryDescription,
            IssueClassTypeID: currentFormValue.issueClassID,
            MappedAssetGUID: assetGuid,
            IncludeDescendants: true,
            MappedAssetClassTypeIDs: assetClassTypeIDs,
            MappedResolutionStatuses: resStatuses,
            ActionsOnIssueActivityStatusOpen: openIssueActions,
            ActionsOnIssueActivityStatusClosed: closeIssueActions,
            DefaultResolutionStatus: !_.isNil(options) && !_.isNil(options.defaultResolutionStatus) ? options.defaultResolutionStatus : null
        };
    };
    WorkflowFormService.prototype.transformActions = function (rawActions) {
        var fixedActions = [];
        for (var _i = 0, rawActions_1 = rawActions; _i < rawActions_1.length; _i++) {
            var rawAction = rawActions_1[_i];
            switch (Number(rawAction.selectedActionType)) {
                case 1: // Email
                    var emailAction = {
                        ActionName: rawAction.actionName,
                        ActionTypeID: 1,
                        CategoryNotificationID: rawAction.categoryNotificationId,
                        TriggerOnEnterStatus: rawAction.triggerOnEnter,
                        TriggeringResolutionStatuses: rawAction.triggerOnResolutionStatus,
                        EmailSubject: rawAction.emailDetails.subject,
                        EmailContent: rawAction.emailDetails.messageBody,
                        EmailList: rawAction.emailDetails.recipientList
                    };
                    fixedActions.push(emailAction);
                    break;
                case 2:
                    var mapStatusAction = {
                        ActionName: rawAction.actionName,
                        ActionTypeID: 2,
                        CategoryNotificationID: rawAction.categoryNotificationId,
                        TriggerOnEnterStatus: rawAction.triggerOnEnter,
                        TriggeringResolutionStatuses: rawAction.triggerOnResolutionStatus,
                        MapName: rawAction.mapStatusDetails.map,
                        AssetClassTypeID: rawAction.mapStatusDetails.assetClassType,
                        MilestoneID: rawAction.mapStatusDetails.milestone
                    };
                    fixedActions.push(mapStatusAction);
                    break;
                case 3:
                    var updateAttributeAction = {
                        ActionName: rawAction.actionName,
                        ActionTypeID: 3,
                        CategoryNotificationID: rawAction.categoryNotificationId,
                        TriggerOnEnterStatus: rawAction.triggerOnEnter,
                        TriggeringResolutionStatuses: rawAction.triggerOnResolutionStatus,
                        AttributeName: rawAction.updateAttributeDetails.attributeName,
                        AttributeValue: rawAction.updateAttributeDetails.attributeValue
                    };
                    fixedActions.push(updateAttributeAction);
                    break;
                default:
                    var baseAction = {
                        ActionName: rawAction.actionName,
                        ActionTypeID: -1,
                        CategoryNotificationID: rawAction.categoryNotificationId,
                        TriggerOnEnterStatus: rawAction.triggerOnEnter,
                        TriggeringResolutionStatuses: rawAction.triggerOnResolutionStatus
                    };
                    fixedActions.push(baseAction);
                    break;
            }
        }
        return fixedActions;
    };
    WorkflowFormService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder])
    ], WorkflowFormService);
    return WorkflowFormService;
}());
export { WorkflowFormService };
//# sourceMappingURL=workflow-form.service.js.map