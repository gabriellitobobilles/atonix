import { FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { requireNonWhitespaceValidator } from '../../shared/utils/require-non-whitespace-validator';
import { ChildrenUniquePropertyValidator } from '../../shared/utils/children-unique-property-validator';
import { FormArrayMinItemsValidator } from '@AtonixWebSites/shared';
var ActionBase = /** @class */ (function () {
    function ActionBase(params) {
        var _this = this;
        this.actionName = new FormControl('New Action', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            requireNonWhitespaceValidator
        ]);
        this.selectedActionType = new FormControl(1, [Validators.required]);
        this.triggerOnEnter = new FormControl(true);
        this.triggerOnResolutionStatus = new FormArray([]);
        this.categoryNotificationId = -1;
        if (params.action) {
            this.actionName.setValue(params.action.ActionName);
            this.selectedActionType.setValue(params.action.ActionTypeID);
            this.categoryNotificationId = params.action.CategoryNotificationID;
            this.triggerOnEnter.setValue(params.action.TriggerOnEnterStatus);
            params.action.TriggeringResolutionStatuses.forEach(function (t) { return _this.triggerOnResolutionStatus.push(new FormControl(t)); });
        }
        else {
            if (params.id !== undefined) {
                this.categoryNotificationId = params.id;
            }
            this.actionName.setValue(params.name !== undefined ? params.name : 'New Action');
            this.selectedActionType.setValue(params.type !== undefined ? params.type : 1);
        }
    }
    return ActionBase;
}());
export { ActionBase };
export var ActionBaseValidationMessages = {
    actionName: {
        required: 'Action name is required',
        minlength: 'Action name must be at least 5 characters.',
        maxlength: 'Action name must be fewer than 50 characters.',
        requireNonWhitespace: 'Action name must have non-whitespace characters'
    }
};
var ActionEmailForm = /** @class */ (function () {
    function ActionEmailForm(workflowAction) {
        this.recipientList = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.subject = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.messageBody = new FormControl('', [Validators.required, Validators.minLength(1)]);
        if (workflowAction) {
            this.recipientList.setValue(workflowAction.EmailList); // gets built and concatenated on server side
            this.subject.setValue(workflowAction.EmailSubject);
            this.messageBody.setValue(workflowAction.EmailContent);
        }
    }
    return ActionEmailForm;
}());
export { ActionEmailForm };
export var ActionEmailFormValidationMessages = {
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
var ActionMapStatusForm = /** @class */ (function () {
    function ActionMapStatusForm(workflowAction) {
        this.map = new FormControl('', [Validators.required]);
        this.assetClassType = new FormControl('', [Validators.required]);
        this.milestone = new FormControl('', [Validators.required]);
        if (workflowAction) {
            this.map.setValue(workflowAction.MapName);
            this.assetClassType.setValue(workflowAction.AssetClassTypeID);
            this.milestone.setValue(workflowAction.MilestoneID);
        }
    }
    return ActionMapStatusForm;
}());
export { ActionMapStatusForm };
export var ActionMapStatusFormValidationMessages = {
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
var ActionUpdateAttributeForm = /** @class */ (function () {
    function ActionUpdateAttributeForm(workflowAction) {
        this.attributeName = new FormControl('', [Validators.required]);
        this.attributeValue = new FormControl('', [Validators.required]);
        if (workflowAction) {
            this.attributeName.setValue(workflowAction.AttributeName);
            this.attributeValue.setValue(workflowAction.AttributeValue);
        }
    }
    return ActionUpdateAttributeForm;
}());
export { ActionUpdateAttributeForm };
export var ActionUpdateAttributeFormValidationMessages = {
    attributeName: {
        required: 'Attribute name is required'
    },
    attributeValue: {
        required: 'Attribute value is required'
    }
};
var ResolutionStatusForm = /** @class */ (function () {
    function ResolutionStatusForm(id, fromResolutionStatus, resolutionStatusName) {
        var _this = this;
        this.id = new FormControl(0, [Validators.required]);
        this.resolutionStatusName = new FormControl('New Resolution Status', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            requireNonWhitespaceValidator
        ]);
        this.actions = new FormArray([], [ChildrenUniquePropertyValidator.childrenUniqueProperty('actionName')]);
        this.allowedNextStatuses = new FormArray([]);
        var myId = id !== null ? id : 0;
        this.id.setValue(myId);
        if (fromResolutionStatus) {
            this.resolutionStatusName.setValue(fromResolutionStatus.AssetIssueResolutionStatusTypeDesc);
            fromResolutionStatus.Actions.forEach(function (action) {
                var builder = new FormBuilder();
                var actionGroup = builder.group(new ActionBase({ action: action }));
                if (action.ActionTypeID === 1) {
                    actionGroup.addControl('emailDetails', builder.group(new ActionEmailForm(action)));
                }
                else if (action.ActionTypeID === 2) {
                    actionGroup.addControl('mapStatusDetails', builder.group(new ActionMapStatusForm(action)));
                }
                else if (action.ActionTypeID === 3) {
                    actionGroup.addControl('updateAttributeDetails', builder.group(new ActionUpdateAttributeForm(action)));
                }
                _this.actions.push(actionGroup);
            });
        }
        if (resolutionStatusName) {
            this.resolutionStatusName.setValue(resolutionStatusName);
        }
    }
    return ResolutionStatusForm;
}());
export { ResolutionStatusForm };
export var ResolutionStatusValidationMessages = {
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
var IssueActivityStatusForm = /** @class */ (function () {
    function IssueActivityStatusForm(isOpen, issueStatus) {
        var _this = this;
        this.issueActivityStatusDesc = new FormControl();
        this.issueActivityStatusActions = new FormArray([], [ChildrenUniquePropertyValidator.childrenUniqueProperty('actionName')]);
        this.issueActivityStatusDesc.setValue(isOpen ? 'Open' : 'Closed');
        if (issueStatus) {
            issueStatus.Actions.forEach(function (action) {
                var builder = new FormBuilder();
                var actionGroup = builder.group(new ActionBase({ action: action }));
                if (action.ActionTypeID === 1) {
                    actionGroup.addControl('emailDetails', builder.group(new ActionEmailForm(action)));
                }
                else if (action.ActionTypeID === 2) {
                    actionGroup.addControl('mapStatusDetails', builder.group(new ActionMapStatusForm(action)));
                }
                else if (action.ActionTypeID === 3) {
                    actionGroup.addControl('updateAttributeDetails', builder.group(new ActionUpdateAttributeForm(action)));
                }
                _this.issueActivityStatusActions.push(actionGroup);
            });
        }
    }
    return IssueActivityStatusForm;
}());
export { IssueActivityStatusForm };
export var IssueActivityStatusValidationMessages = {
    issueActivityStatusActions: {
        childrenUniqueProperty: 'Action names are not unique'
    }
};
var WorkflowForm = /** @class */ (function () {
    function WorkflowForm(defaultIssueClassID, category) {
        var _this = this;
        this.categoryId = new FormControl(-1);
        this.categoryDescription = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
        this.issueClassID = new FormControl('', [Validators.required]);
        this.assetClassTypes = new FormControl([-1]);
        this.resolutionStatuses = new FormArray([], [ChildrenUniquePropertyValidator.childrenUniqueProperty('resolutionStatusName'), FormArrayMinItemsValidator.minItems(2)]);
        this.issueActivityStatuses = new FormArray([]);
        var builder = new FormBuilder();
        if (category) {
            if (!category.Category) {
                return;
            }
            this.categoryId.setValue(category.Category.AssetIssueCategoryTypeID);
            this.categoryDescription.setValue(category.Category.CategoryDesc);
            this.issueClassID.setValue(category.Category.IssueClassTypeID);
            this.assetClassTypes.setValue(category.Category.MappedAssetClassTypeIDs);
            for (var _i = 0, _a = category.ResolutionStatuses; _i < _a.length; _i++) {
                var status_1 = _a[_i];
                this.resolutionStatuses.push(builder.group(new ResolutionStatusForm(status_1.AssetIssueResolutionStatusTypeID, status_1)));
            }
            // set the allowed resolution statuses
            category.ResolutionStatuses.forEach(function (status, index) {
                var statusForm = _this.resolutionStatuses.controls[index];
                var allowableNextArray = statusForm.controls['allowedNextStatuses'];
                category.ResolutionStatuses.forEach(function (otherStatus, otherIndex) {
                    var allowed = false;
                    if (index === otherIndex) {
                        allowed = true;
                    }
                    else if (status.TransitionIDs.includes(otherStatus.AssetIssueResolutionStatusTypeID)) {
                        allowed = true;
                    }
                    allowableNextArray.push(builder.control(allowed));
                });
            });
            category.IssueStatuses.forEach(function (activityStatus) {
                _this.issueActivityStatuses.push(builder.group(new IssueActivityStatusForm(activityStatus.IsOpen, activityStatus)));
            });
        }
        else {
            // put in the default values
            this.issueClassID.setValue(defaultIssueClassID);
            this.issueActivityStatuses.push(builder.group(new IssueActivityStatusForm(true, {
                AssetIssueActivityStatusTypeID: 1,
                AssetIssueActivityStatusTypeDesc: 'Open',
                IsOpen: true,
                IsDefault: true,
                Actions: []
            })));
            this.issueActivityStatuses.push(builder.group(new IssueActivityStatusForm(false, {
                AssetIssueActivityStatusTypeID: 2,
                AssetIssueActivityStatusTypeDesc: 'Closed',
                IsOpen: false,
                IsDefault: false,
                Actions: []
            })));
        }
    }
    return WorkflowForm;
}());
export { WorkflowForm };
export var WorkflowFormValidationMessages = {
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
//# sourceMappingURL=workflow-form.js.map