import { WorkflowEmailAction, WorkflowAction, WorkflowUpdateAttributeAction, WorkflowMapStatusAction } from './actions';
import { SelectedCategory } from './selected-category';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ResolutionStatus, IssueStatus } from './issue-and-resolution-statuses';
import { requireNonWhitespaceValidator } from '../../shared/utils/require-non-whitespace-validator';
import { ChildrenUniquePropertyValidator } from '../../shared/utils/children-unique-property-validator';
import { FormArrayMinItemsValidator } from '@AtonixWebSites/shared';

export class ActionBase {
  actionName = new FormControl('New Action', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(50),
    requireNonWhitespaceValidator
  ]);
  selectedActionType = new FormControl(1, [Validators.required]);
  triggerOnEnter = new FormControl(true);
  triggerOnResolutionStatus = new FormArray([]);
  categoryNotificationId = -1;

  constructor(params: { action?: WorkflowAction; id?: number; name?: string; type?: number }) {
    if (params.action) {
      this.actionName.setValue(params.action.ActionName);
      this.selectedActionType.setValue(params.action.ActionTypeID);
      this.categoryNotificationId = params.action.CategoryNotificationID;
      this.triggerOnEnter.setValue(params.action.TriggerOnEnterStatus);
      params.action.TriggeringResolutionStatuses.forEach(t => this.triggerOnResolutionStatus.push(new FormControl(t)));
    } else {
      if (params.id !== undefined) {
        this.categoryNotificationId = params.id;
      }
      this.actionName.setValue(params.name !== undefined ? params.name : 'New Action');
      this.selectedActionType.setValue(params.type !== undefined ? params.type : 1);
    }
  }
}

export const ActionBaseValidationMessages = {
  actionName: {
    required: 'Action name is required',
    minlength: 'Action name must be at least 5 characters.',
    maxlength: 'Action name must be fewer than 50 characters.',
    requireNonWhitespace: 'Action name must have non-whitespace characters'
  }
};

export class ActionEmailForm {
  recipientList = new FormControl('', [Validators.required, Validators.minLength(1)]);
  subject = new FormControl('', [Validators.required, Validators.minLength(1)]);
  messageBody = new FormControl('', [Validators.required, Validators.minLength(1)]);
  constructor(workflowAction?: WorkflowEmailAction) {
    if (workflowAction) {
      this.recipientList.setValue(workflowAction.EmailList); // gets built and concatenated on server side
      this.subject.setValue(workflowAction.EmailSubject);
      this.messageBody.setValue(workflowAction.EmailContent);
    }
  }
}

export const ActionEmailFormValidationMessages = {
  recipientList: {
    required: 'Recipient is required',
    minlength: 'Recipient must have at least one character'
  },
  subject: {
    required: 'Subject is required',
    minlength: 'Subject must have at least one character'
  },
  messageBody: {
    required: 'Message body is required',
    minlength: 'message body must have at least one character'
  }
};

export class ActionMapStatusForm {
  map = new FormControl('', [Validators.required]);
  assetClassType = new FormControl('', [Validators.required]);
  milestone = new FormControl('', [Validators.required]);
  constructor(workflowAction?: WorkflowMapStatusAction) {
    if (workflowAction) {
      this.map.setValue(workflowAction.MapName);
      this.assetClassType.setValue(workflowAction.AssetClassTypeID);
      this.milestone.setValue(workflowAction.MilestoneID);
    }
  }
}

export const ActionMapStatusFormValidationMessages = {
  map: {
    required: 'Map selection is required'
  },
  assetClassType: {
    required: 'Asset Class Type selection is required'
  },
  milestone: {
    required: 'Status selection is required'
  }
};

export class ActionUpdateAttributeForm {
  attributeName = new FormControl('', [Validators.required]);
  attributeValue = new FormControl('', [Validators.required]);
  constructor(workflowAction?: WorkflowUpdateAttributeAction) {
    if (workflowAction) {
      this.attributeName.setValue(workflowAction.AttributeName);
      this.attributeValue.setValue(workflowAction.AttributeValue);
    }
  }
}

export const ActionUpdateAttributeFormValidationMessages = {
  attributeName: {
    required: 'Attribute name is required'
  },
  attributeValue: {
    required: 'Attribute value is required'
  }
};

export class ResolutionStatusForm {
  id = new FormControl(0, [Validators.required]);
  resolutionStatusName = new FormControl('New Resolution Status', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
    requireNonWhitespaceValidator
  ]);
  actions = new FormArray([], [ChildrenUniquePropertyValidator.childrenUniqueProperty('actionName')]);
  allowedNextStatuses = new FormArray([]);

  constructor(id?: number, fromResolutionStatus?: ResolutionStatus, resolutionStatusName?: string) {
    const myId = id !== null ? id : 0;
    this.id.setValue(myId);

    if (fromResolutionStatus) {
      this.resolutionStatusName.setValue(fromResolutionStatus.AssetIssueResolutionStatusTypeDesc);
      fromResolutionStatus.Actions.forEach(action => {
        const builder = new FormBuilder();
        const actionGroup = builder.group(new ActionBase({ action }));
        if (action.ActionTypeID === 1) {
          actionGroup.addControl('emailDetails', builder.group(new ActionEmailForm(action as WorkflowEmailAction)));
        } else if (action.ActionTypeID === 2) {
          actionGroup.addControl('mapStatusDetails', builder.group(new ActionMapStatusForm(action as WorkflowMapStatusAction)));
        } else if (action.ActionTypeID === 3) {
          actionGroup.addControl(
            'updateAttributeDetails',
            builder.group(new ActionUpdateAttributeForm(action as WorkflowUpdateAttributeAction))
          );
        }
        this.actions.push(actionGroup);
      });
    }
    if (resolutionStatusName) {
      this.resolutionStatusName.setValue(resolutionStatusName);
    }
  }
}

export const ResolutionStatusValidationMessages = {
  resolutionStatusName: {
    required: 'Resolution status name is required',
    minlength: 'Resolution status name must have at least 3 characters',
    maxlength: 'Resolution status name cannot exceed 50 characters',
    requireNonWhitespace: 'Resolution status name must have non-whitespace characters'
  },
  actions: {
    childrenUniqueProperty: 'Action names are not unique'
  }
};

export class IssueActivityStatusForm {
  issueActivityStatusDesc = new FormControl();
  issueActivityStatusActions = new FormArray([], [ChildrenUniquePropertyValidator.childrenUniqueProperty('actionName')]);
  constructor(isOpen: boolean, issueStatus?: IssueStatus) {
    this.issueActivityStatusDesc.setValue(isOpen ? 'Open' : 'Closed');
    if (issueStatus) {
      issueStatus.Actions.forEach(action => {
        const builder = new FormBuilder();
        const actionGroup = builder.group(new ActionBase({ action }));
        if (action.ActionTypeID === 1) {
          actionGroup.addControl('emailDetails', builder.group(new ActionEmailForm(action as WorkflowEmailAction)));
        } else if (action.ActionTypeID === 2) {
          actionGroup.addControl('mapStatusDetails', builder.group(new ActionMapStatusForm(action as WorkflowMapStatusAction)));
        } else if (action.ActionTypeID === 3) {
          actionGroup.addControl(
            'updateAttributeDetails',
            builder.group(new ActionUpdateAttributeForm(action as WorkflowUpdateAttributeAction))
          );
        }
        this.issueActivityStatusActions.push(actionGroup);
      });
    }
  }
}

export const IssueActivityStatusValidationMessages = {
  issueActivityStatusActions: {
    childrenUniqueProperty: 'Action names are not unique'
  }
};

export class WorkflowForm {
  categoryId = new FormControl(-1);
  categoryDescription = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  issueClassID = new FormControl('', [Validators.required]);
  assetClassTypes = new FormControl([-1]);
  resolutionStatuses = new FormArray(
    [],
    [ChildrenUniquePropertyValidator.childrenUniqueProperty('resolutionStatusName'), FormArrayMinItemsValidator.minItems(2)]
  );
  issueActivityStatuses = new FormArray([]);
  constructor(defaultIssueClassID: number, category?: SelectedCategory) {
    const builder = new FormBuilder();
    if (category) {
      if (!category.Category) {
        return;
      }
      this.categoryId.setValue(category.Category.AssetIssueCategoryTypeID);
      this.categoryDescription.setValue(category.Category.CategoryDesc);
      this.issueClassID.setValue(category.Category.IssueClassTypeID);
      this.assetClassTypes.setValue(category.Category.MappedAssetClassTypeIDs);
      for (const status of category.ResolutionStatuses) {
        this.resolutionStatuses.push(builder.group(new ResolutionStatusForm(status.AssetIssueResolutionStatusTypeID, status)));
      }
      // set the allowed resolution statuses
      category.ResolutionStatuses.forEach((status, index) => {
        const statusForm = this.resolutionStatuses.controls[index] as FormGroup;
        const allowableNextArray = statusForm.controls['allowedNextStatuses'] as FormArray;
        category.ResolutionStatuses.forEach((otherStatus, otherIndex) => {
          let allowed = false;
          if (index === otherIndex) {
            allowed = true;
          } else if (status.TransitionIDs.includes(otherStatus.AssetIssueResolutionStatusTypeID)) {
            allowed = true;
          }
          allowableNextArray.push(builder.control(allowed));
        });
      });
      category.IssueStatuses.forEach(activityStatus => {
        this.issueActivityStatuses.push(builder.group(new IssueActivityStatusForm(activityStatus.IsOpen, activityStatus)));
      });
    } else {
      // put in the default values
      this.issueClassID.setValue(defaultIssueClassID);
      this.issueActivityStatuses.push(
        builder.group(
          new IssueActivityStatusForm(true, {
            AssetIssueActivityStatusTypeID: 1,
            AssetIssueActivityStatusTypeDesc: 'Open',
            IsOpen: true,
            IsDefault: true,
            Actions: []
          })
        )
      );
      this.issueActivityStatuses.push(
        builder.group(
          new IssueActivityStatusForm(false, {
            AssetIssueActivityStatusTypeID: 2,
            AssetIssueActivityStatusTypeDesc: 'Closed',
            IsOpen: false,
            IsDefault: false,
            Actions: []
          })
        )
      );
    }
  }
}

export const WorkflowFormValidationMessages = {
  categoryDescription: {
    required: 'Category name is required.',
    minlength: 'Category name must be at least three characters.',
    maxlength: 'Category name cannot exceed 50 characters.'
  },
  assetIssueResolutionStatusTypeDesc: {
    required: 'Resolution Status name is required.'
  },
  issueClassID: {
    required: 'Select an issue class'
  },
  resolutionStatuses: {
    childrenUniqueProperty: 'Resolution status names must be unique',
    minItems: 'Requires at least 2 resolution statuses'
  }
};
