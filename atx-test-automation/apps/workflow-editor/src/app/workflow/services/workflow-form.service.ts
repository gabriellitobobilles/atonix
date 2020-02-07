import { WorkflowAction, WorkflowEmailAction, WorkflowUpdateAttributeAction, WorkflowMapStatusAction } from './../model/actions';
import { ResolutionStatus } from './../model/issue-and-resolution-statuses';
import { NewCategory } from './../model/new-category';
import { SelectedCategory } from './../model/selected-category';
import {
  WorkflowFormValidationMessages,
  ResolutionStatusValidationMessages,
  ActionBaseValidationMessages,
  ActionEmailFormValidationMessages,
  ActionUpdateAttributeFormValidationMessages,
  ActionUpdateAttributeForm,
  ActionMapStatusForm,
  ActionMapStatusFormValidationMessages
} from './../model/workflow-form';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ResolutionStatusForm, ActionEmailForm, WorkflowForm, ActionBase } from '../model/workflow-form';
import { GenericValidator } from '@AtonixWebSites/shared';
import { map } from 'rxjs/operators';
import { WorkflowModalSaveCategory } from '../model/workflow-modal-save-category';
import * as _ from 'lodash';
import { ActionFormUpdateMapDetailsComponent } from '../components/drawer/action-type-forms/action-form-update-map-details/action-form-update-map-details.component';

export const resStatString = 'resolutionStatuses';
export const actionsString = 'actions';
export const allowedNextString = 'allowedNextStatuses';
export const activityStatusString = 'issueActivityStatuses';
export const issueActivityActionsString = 'issueActivityStatusActions';

@Injectable({
  providedIn: 'root'
})
export class WorkflowFormService {
  private workflowForm = new BehaviorSubject<FormGroup>(null);
  private workflowFormValidator = new GenericValidator({
    ...WorkflowFormValidationMessages,
    ...ResolutionStatusValidationMessages,
    ...ActionBaseValidationMessages,
    ...ActionEmailFormValidationMessages,
    ...ActionMapStatusFormValidationMessages,
    ...ActionUpdateAttributeFormValidationMessages
  });
  private validatorSubscription?: Subscription;
  private validationMessages = new BehaviorSubject<object>({});
  workflowForm$ = this.workflowForm.asObservable();
  validationMessages$ = this.validationMessages.asObservable();

  constructor(private fb: FormBuilder) {}

  private configureValidationSubscription(form: FormGroup) {
    if (this.validatorSubscription !== undefined && !this.validatorSubscription.closed) {
      this.validatorSubscription.unsubscribe();
    }
    this.validationMessages.next(this.workflowFormValidator.processMessages(form));
    this.validatorSubscription = form.valueChanges.subscribe(__ => {
      this.validationMessages.next(this.workflowFormValidator.processMessages(form));
    });
  }
  setFormToNull() {
    this.workflowForm.next(null);
  }

  setSpecificAssetClassType(event: number) {
    const currentForm = this.workflowForm.getValue();
    let assetClassTypes: number[] = currentForm.get('assetClassTypes').value;
    if (assetClassTypes.find(x => x === event)) {
      assetClassTypes = assetClassTypes.filter(obj => obj !== event);
    }
    assetClassTypes = assetClassTypes.filter(obj => obj !== -1);
    currentForm.get('assetClassTypes').setValue(assetClassTypes);
    this.workflowForm.next(currentForm);
  }

  setAllAssetClassTypes() {
    const currentForm = this.workflowForm.getValue();
    currentForm.get('assetClassTypes').setValue([-1]);
    this.workflowForm.next(currentForm);
  }

  setNullAssetClassType() {
    const currentForm = this.workflowForm.getValue();
    if (currentForm.get('assetClassTypes').value.length === 0) {
      currentForm.get('assetClassTypes').setValue([-1]);
    }
    this.workflowForm.next(currentForm);
  }

  resetForm(defaultIssueClassID: number, category?: SelectedCategory) {
    this.workflowForm.next(this.fb.group(new WorkflowForm(defaultIssueClassID, category)));
    this.validationMessages.next({});
    this.validateAllFormFields(this.workflowForm.getValue());
    // set initial value
    this.configureValidationSubscription(this.workflowForm.getValue());
    // set subsequent subscriptions
    this.workflowForm.pipe(
      map(newForm => {
        this.configureValidationSubscription(newForm);
      })
    );
  }

  setName(name: string, resolutionStatus: number) {
    const currentForm = this.workflowForm.getValue();
    const statuses = this.resolutionStatusesFromForm(currentForm).controls[resolutionStatus] as FormGroup;
    statuses.controls['resolutionStatusName'].setValue(name);
    this.workflowForm.next(currentForm);
  }
  // resolution status functions
  resolutionStatusesFromForm(form: FormGroup): FormArray {
    return form.get(resStatString) as FormArray;
  }
  resolutionStatusFromForm(form: FormGroup, whichResolutionStatus: number): FormGroup {
    return this.resolutionStatusesFromForm(form).controls[whichResolutionStatus] as FormGroup;
  }
  actionsFromResolutionStatus(form: FormGroup): FormArray {
    return form.get(actionsString) as FormArray;
  }
  actionFromResolutionStatus(form: FormGroup, whichAction: number): FormGroup {
    return this.actionsFromResolutionStatus(form).controls[whichAction] as FormGroup;
  }
  allowedNextStautesFromResolutionStatus(form: FormGroup): FormArray {
    return form.get(allowedNextString) as FormArray;
  }
  private markActionOnResolutionStatusDirty(form: FormGroup, whichResolutionStatus: number, whichAction: number) {
    const action = this.actionFromResolutionStatus(this.resolutionStatusFromForm(form, whichResolutionStatus), whichAction);
    action.markAsDirty({ onlySelf: true });
    this.markActionsOnResolutionStatusDirty(form, whichResolutionStatus);
  }
  private markActionsOnResolutionStatusDirty(form: FormGroup, whichResolutionStatus: number) {
    const actions = this.actionsFromResolutionStatus(this.resolutionStatusFromForm(form, whichResolutionStatus));
    actions.markAsDirty({ onlySelf: true });
    this.markResolutionStatusAsDirty(form, whichResolutionStatus);
  }
  private markResolutionStatusAsDirty(form: FormGroup, whichResolutionStatus: number) {
    const status = this.resolutionStatusFromForm(form, whichResolutionStatus);
    status.markAsDirty({ onlySelf: true });
    this.markResolutionStatusesAsDirty(form);
  }
  private markResolutionStatusesAsDirty(form: FormGroup) {
    const statuses = this.resolutionStatusesFromForm(form);
    statuses.markAsDirty({ onlySelf: true });
    form.markAsDirty({ onlySelf: true });
  }

  private makeUniqueName(name: string[]) {
    const count = {};
    name.forEach((x: string, i: number) => {
      if (name.indexOf(x) !== i) {
        const c = x in count ? (count[x] = count[x] + 1) : (count[x] = 1);
        let j = c + 1;
        let k = `${x} (${j})`;
        while (name.indexOf(k) !== -1) {
          k = `${x} (${++j})`;
        }
        name[i] = k;
      }
    });
    return name;
  }

  addResolutionStatus() {
    const currentForm = this.workflowForm.getValue();
    const statuses = this.resolutionStatusesFromForm(currentForm);
    // give the new status an ID.
    let id = statuses.length > 0 ? Math.min(0, ...statuses.controls.map(c => Number((c as FormGroup).controls['id'].value))) : 0;
    id -= 1;

    const currentNames = currentForm.get(resStatString).value.map(a => a.resolutionStatusName);
    currentNames.push('New Resolution Status');
    const newStatus = this.fb.group(new ResolutionStatusForm(id, null, this.makeUniqueName(currentNames).pop()));
    const newAllowedList = this.allowedNextStautesFromResolutionStatus(newStatus);

    // update the rest of the statuses' allowable next statuses
    // Add new status to each action, initial value of true if all existing are true, otherwise false
    for (const status of statuses.controls as FormGroup[]) {
      const allowedList = this.allowedNextStautesFromResolutionStatus(status);
      allowedList.push(this.fb.control(true, [Validators.required]));
      newAllowedList.push(this.fb.control(true, [Validators.required]));

      // Do this before adding newStatus so it only affects existing statuses
      const actions = this.actionsFromResolutionStatus(status);
      for (const action of actions.controls as FormArray[]) {
        const initialValue: boolean = action.controls['triggerOnResolutionStatus'].value.every(item => item === true);
        action.controls['triggerOnResolutionStatus'].push(new FormControl(initialValue));
      }
    }

    // add new status to its own allowed list
    newAllowedList.push(this.fb.control(true, [Validators.required]));

    statuses.push(newStatus);
    this.markResolutionStatusesAsDirty(currentForm);
    this.workflowForm.next(currentForm);
  }

  deleteResolutionStatus(which: number) {
    const currentForm = this.workflowForm.getValue();
    const statuses = this.resolutionStatusesFromForm(currentForm);
    statuses.removeAt(which);
    this.markResolutionStatusesAsDirty(currentForm);

    // delete the value from the allowable next statuses
    // Remove status from each action
    statuses.controls.forEach(arrayItem => {
      const statusForm = arrayItem as FormGroup;
      const allowableNextStatuses = statusForm.controls['allowedNextStatuses'] as FormArray;
      allowableNextStatuses.removeAt(which);

      const actions = this.actionsFromResolutionStatus(arrayItem as FormGroup);
      for (const action of actions.controls as FormArray[]) {
        action.controls['triggerOnResolutionStatus'].removeAt(which);
      }
    });
    this.workflowForm.next(currentForm);
  }

  private moveFormArrayItemUp(array: FormArray, which: number) {
    if (which <= 0 || which >= array.length) {
      return;
    }
    const itemToMove = array.controls[which];
    array.removeAt(which);
    array.insert(which - 1, itemToMove);
  }

  private moveFormArrayItemDown(array: FormArray, which: number) {
    if (which < 0 || which >= array.length - 1) {
      return;
    }
    const itemToMove = array.controls[which];
    array.removeAt(which);
    array.insert(which + 1, itemToMove);
  }

  moveResolutionStatusUp(which: number) {
    const currentForm = this.workflowForm.getValue();
    const statuses = this.resolutionStatusesFromForm(currentForm);
    this.moveFormArrayItemUp(statuses, which);
    this.markResolutionStatusesAsDirty(currentForm);

    // loop over each of the resolution statuses and update the
    // allowedNextStatuses order
    for (const status of statuses.controls as FormGroup[]) {
      const allowList = this.allowedNextStautesFromResolutionStatus(status);
      this.moveFormArrayItemUp(allowList, which);

      // loop over actions for this resolution status and update the triggerOnResolutionStatus order
      const actions = this.actionsFromResolutionStatus(status as FormGroup);
      for (const action of actions.controls as FormArray[]) {
        this.moveFormArrayItemUp(action.controls['triggerOnResolutionStatus'], which);
      }
    }
    this.workflowForm.next(currentForm);
  }

  commitFormChanges() {
    const currentForm = this.workflowForm.getValue();
    this.workflowForm.next(currentForm);
  }

  moveResolutionStatusDown(which: number) {
    const currentForm = this.workflowForm.getValue();
    const statuses = this.resolutionStatusesFromForm(currentForm);
    this.moveFormArrayItemDown(statuses, which);
    this.markResolutionStatusesAsDirty(currentForm);

    // loop over each of the resolution statuses and update the
    // allowedNextStatuses order
    for (const status of statuses.controls as FormGroup[]) {
      const allowList = this.allowedNextStautesFromResolutionStatus(status);
      this.moveFormArrayItemDown(allowList, which);

      // loop over actions for this resolution status and update the triggerOnResolutionStatus order
      const actions = this.actionsFromResolutionStatus(status as FormGroup);
      for (const action of actions.controls as FormArray[]) {
        this.moveFormArrayItemDown(action.controls['triggerOnResolutionStatus'], which);
      }
    }
    this.workflowForm.next(currentForm);
  }

  addActionToResolutionStatus(whichResolutionStatus: number): number {
    const currentForm = this.workflowForm.getValue();
    const status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
    const actions = this.actionsFromResolutionStatus(status);
    const currentNames = actions.value.map(a => a.actionName);
    currentNames.push('New Action');
    const newActionBase = new ActionBase({ type: 1, name: this.makeUniqueName(currentNames).pop() });
    this.resolutionStatusesFromForm(currentForm).controls.forEach(__ => {
      newActionBase.triggerOnResolutionStatus.push(new FormControl(true));
    });

    const newAction = this.fb.group(newActionBase);
    newAction.addControl('emailDetails', this.fb.group(new ActionEmailForm()));
    this.validateAllFormFields(newAction);
    actions.push(newAction);
    this.markActionsOnResolutionStatusDirty(currentForm, whichResolutionStatus);
    this.workflowForm.next(currentForm);
    return actions.controls.length;
  }

  addActionToIssueActivityStatus(whichIssueActivityStatus: number): number {
    const currentForm = this.workflowForm.getValue();
    const status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
    const actions = this.actionsFromIssueActivityStatus(status);
    const currentNames = actions.value.map(a => a.actionName);
    currentNames.push('New Action');
    const newAction = this.fb.group(new ActionBase({ type: 1, name: this.makeUniqueName(currentNames).pop() }));
    newAction.addControl('emailDetails', this.fb.group(new ActionEmailForm()));
    this.validateAllFormFields(newAction);
    actions.push(newAction);
    this.markActionsOnIssueStatusDirty(currentForm, whichIssueActivityStatus);
    this.workflowForm.next(currentForm);
    return actions.controls.length;
  }

  private validateAllFormFields(formGroup: FormGroup | FormArray): boolean {
    const keysArray = formGroup instanceof FormGroup ? Object.values(formGroup.controls) : formGroup.controls;
    keysArray.forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: false });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
    return formGroup.invalid;
  }

  private changeActionType(actionForm: FormGroup, actionType: number): FormGroup {
    // TODO support other action types.
    actionType = Number(actionType);
    const childFormNamesByActionType: { [key: number]: string } = {
      1: 'emailDetails',
      2: 'mapStatusDetails',
      3: 'updateAttributeDetails'
    };
    const currentChildFormName = childFormNamesByActionType[actionType];
    Object.keys(childFormNamesByActionType)
      .filter(t => Number(t) !== actionType)
      .forEach(t => {
        if (actionForm.contains(childFormNamesByActionType[t])) {
          actionForm.removeControl(childFormNamesByActionType[t]);
        }
      });
    if (actionType === 1) {
      if (!actionForm.contains(currentChildFormName)) {
        const emailForm = this.fb.group(new ActionEmailForm());
        this.validateAllFormFields(emailForm);
        actionForm.addControl(currentChildFormName, emailForm);
      }
    } else if (actionType === 2) {
      if (!actionForm.contains(currentChildFormName)) {
        const mapForm = this.fb.group(new ActionMapStatusForm());
        this.validateAllFormFields(mapForm);
        actionForm.addControl(currentChildFormName, mapForm);
      }
    } else if (actionType === 3) {
      if (!actionForm.contains(currentChildFormName)) {
        const attributeForm = this.fb.group(new ActionUpdateAttributeForm());
        this.validateAllFormFields(attributeForm);
        actionForm.addControl(currentChildFormName, attributeForm);
      }
    }

    return actionForm;
  }

  changeResolutionStatusActionType(whichResolutionStatus: number, whichAction: number, actionType: number) {
    const currentForm = this.workflowForm.getValue();
    const status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
    this.changeActionType(this.actionFromResolutionStatus(status, whichAction), actionType);
    this.markActionOnResolutionStatusDirty(currentForm, whichResolutionStatus, whichAction);
    this.workflowForm.next(currentForm);
  }

  removeActionFromResolutionStatus(whichResolutionStatus: number, whichAction: number) {
    const currentForm = this.workflowForm.getValue();
    const status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
    const actions = this.actionsFromResolutionStatus(status);
    actions.removeAt(whichAction);
    this.markActionsOnResolutionStatusDirty(currentForm, whichResolutionStatus);
    this.workflowForm.next(currentForm);
  }

  revertResolutionActionToValue(whichResolutionStatus: number, whichAction: number, actionValue) {
    const currentForm = this.workflowForm.getValue();
    const status = this.resolutionStatusFromForm(currentForm, whichResolutionStatus);
    const action = this.actionFromResolutionStatus(status, whichAction);

    // make sure the action is in the right type now
    if (actionValue.selectedActionType !== undefined) {
      this.changeActionType(action, actionValue.selectedActionType);
    }
    Object.keys(actionValue).forEach(key => {
      action.controls[key].setValue(actionValue[key]);
    });
    // this.validateAllFormFields(action);
    this.workflowForm.next(currentForm);
  }
  issueActivityStatusesFromForm(form: FormGroup): FormArray {
    return form.get(activityStatusString) as FormArray;
  }
  issueActivityStatusFromForm(form: FormGroup, whichIssueActivityStatus: number): FormGroup {
    const statuses = this.issueActivityStatusesFromForm(form).controls[whichIssueActivityStatus] as FormGroup;
    return statuses;
  }
  actionsFromIssueActivityStatus(form: FormGroup): FormArray {
    return form.get(issueActivityActionsString) as FormArray;
  }
  actionFromIssueActivityStatus(form: FormGroup, whichAction: number): FormGroup {
    return this.actionsFromIssueActivityStatus(form).controls[whichAction] as FormGroup;
  }
  private markActionOnIssueStatusDirty(form: FormGroup, whichIssueStatus: number, whichAction: number) {
    const action = this.actionFromIssueActivityStatus(this.issueActivityStatusFromForm(form, whichIssueStatus), whichAction);
    action.markAsDirty({ onlySelf: true });
    this.markActionsOnIssueStatusDirty(form, whichIssueStatus);
  }
  private markActionsOnIssueStatusDirty(form: FormGroup, whichIssueStatus: number) {
    const actions = this.actionsFromIssueActivityStatus(this.issueActivityStatusFromForm(form, whichIssueStatus));
    actions.markAsDirty({ onlySelf: true });
    this.markIssueStatusAsDirty(form, whichIssueStatus);
  }
  private markIssueStatusAsDirty(form: FormGroup, whichIssueStatus: number) {
    const status = this.issueActivityStatusFromForm(form, whichIssueStatus);
    status.markAsDirty({ onlySelf: true });
    this.markIssueStatusesAsDirty(form);
  }
  private markIssueStatusesAsDirty(form: FormGroup) {
    const statuses = this.issueActivityStatusesFromForm(form);
    statuses.markAsDirty({ onlySelf: true });
    form.markAsDirty({ onlySelf: true });
  }

  changeIssueActivityStatusActionType(whichIssueActivityStatus: number, whichAction: number, actionType: number) {
    const currentForm = this.workflowForm.getValue();
    const status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
    this.changeActionType(this.actionFromIssueActivityStatus(status, whichAction), actionType);
    this.markActionOnIssueStatusDirty(currentForm, whichIssueActivityStatus, whichAction);
    this.workflowForm.next(currentForm);
  }
  removeActionFromIssueActivityStatus(whichIssueActivityStatus: number, whichAction: number) {
    const currentForm = this.workflowForm.getValue();
    const status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
    const actions = this.actionsFromIssueActivityStatus(status);
    actions.removeAt(whichAction);
    this.markActionsOnIssueStatusDirty(currentForm, whichIssueActivityStatus);
    this.workflowForm.next(currentForm);
  }

  revertIssueActivityStatusActionToValue(whichIssueActivityStatus: number, whichAction: number, actionValue) {
    const currentForm = this.workflowForm.getValue();
    const status = this.issueActivityStatusFromForm(currentForm, whichIssueActivityStatus);
    const action = this.actionFromIssueActivityStatus(status, whichAction);
    // make sure the action is in the right type now
    if (actionValue.selectedActionType !== undefined) {
      this.changeActionType(action, actionValue.selectedActionType);
    }
    Object.keys(actionValue).forEach(key => {
      action.controls[key].setValue(actionValue[key]);
    });
    this.workflowForm.next(currentForm);
  }

  formToNewCategory(assetGuid: string, options: WorkflowModalSaveCategory): NewCategory {
    const currentFormValue = this.workflowForm.getValue().getRawValue();

    const resStatuses: ResolutionStatus[] = currentFormValue.resolutionStatuses.map((resStatus, i) => {
      // negate to avoid lookup collisions when we resolve existing
      // statuses by name // will create this below;
      // have to fix all the IDs in this first loop.
      const fixedStatus: ResolutionStatus = {
        AssetIssueResolutionStatusTypeID: resStatus.id,
        AssetIssueResolutionStatusTypeDesc: resStatus.resolutionStatusName,
        Actions: this.transformActions(resStatus.actions),
        IsDefault: i === 0,
        DisplayOrder: i + 1,
        TransitionIDs: null
      };
      return fixedStatus;
    });

    // now we have to build each status's list of allowed transitions by ID from the ordered boolean list.
    resStatuses.forEach((__, h) => {
      const transitionIDs: number[] = [];
      const statusToGetFixedTIDs = resStatuses[h];
      const unfixedStatusWithBooleanList = currentFormValue.resolutionStatuses[h];
      for (let i = 0; i < resStatuses.length; i++) {
        const fixedStatus = resStatuses[i];
        if (unfixedStatusWithBooleanList.allowedNextStatuses[i]) {
          transitionIDs.push(fixedStatus.AssetIssueResolutionStatusTypeID);
        }
      }
      statusToGetFixedTIDs.TransitionIDs = transitionIDs;
    });

    const assetClassTypeIDs =
      currentFormValue.assetClassTypes.length === 1 && currentFormValue.assetClassTypes[0] === -1
        ? []
        : currentFormValue.assetClassTypes;

    // issue activity statuses
    const openIssueActions = this.transformActions(currentFormValue.issueActivityStatuses[0].issueActivityStatusActions);
    const closeIssueActions = this.transformActions(currentFormValue.issueActivityStatuses[1].issueActivityStatusActions);

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
      DefaultResolutionStatus:
        !_.isNil(options) && !_.isNil(options.defaultResolutionStatus) ? options.defaultResolutionStatus : null
    };
  }

  private transformActions(rawActions) {
    const fixedActions: WorkflowAction[] = [];
    for (const rawAction of rawActions) {
      switch (Number(rawAction.selectedActionType)) {
        case 1: // Email
          const emailAction: WorkflowEmailAction = {
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
          const mapStatusAction: WorkflowMapStatusAction = {
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
          const updateAttributeAction: WorkflowUpdateAttributeAction = {
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
          const baseAction: WorkflowAction = {
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
  }
}
