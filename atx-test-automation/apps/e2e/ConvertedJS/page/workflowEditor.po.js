"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var utils_1 = require("../helpers/utils");
var helper_1 = require("../helpers/helper");
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var WorkflowEditor = /** @class */ (function () {
    function WorkflowEditor() {
        this.configureWorkflowBtn = protractor_1.element(protractor_1.by.css('[ng-if="baseVM.canConfigureWorkflow"] > a'));
        this.addCategoryBtn = protractor_1.$("[title=\"Add\"]");
        this.assetsList = protractor_1.$$("[class='assetTreeNode adhocTreeNode ng-star-inserted']  > div > span");
        this.categoryTitle = protractor_1.$(".mat-card-title");
        this.categoryHolder = protractor_1.element(protractor_1.by.className('row ng-star-inserted'));
        this.clientNameTxt = protractor_1.$("mat-card-content > div:nth-child(2) > span"); // need to send update request for element name
        this.classDropdown = protractor_1.$("mat-card-content > div:nth-child(3) > select"); // element name needs update
        this.categoryDropdown = protractor_1.$("mat-card-content > div:nth-child(4) > select");
        this.contentHolder = protractor_1.$("atx-statuses .work-management");
        this.resolutionStatusBtnAll = protractor_1.$$("atx-statuses mat-card-content > form");
        this.resolutionActionAttributeAll = protractor_1.$$(".drawer-content.mat-card").get(0)
            .$$('atx-action-form-update-attribute-details');
        this.resolutionActionEmailAll = protractor_1.$$(".drawer-content.mat-card").get(0)
            .$$('atx-action-form-email-details');
        // Issue Acitity Open and Closed Header button
        this.issueActivityOpenBtn = protractor_1.element(protractor_1.by.cssContainingText('.mat-expansion-panel-header-title', 'Open'));
        this.issueActivityCloseBtn = protractor_1.element(protractor_1.by.cssContainingText('.mat-expansion-panel-header-title', 'Closed'));
        this.groupHolder = protractor_1.$$("atx-category-actions > .drawer-content.mat-card");
        // Category Settings Section
        this.categorySettings = {
            categorySetingsBtn: protractor_1.$("[title=\"Category Settings\"]"),
            categoryName: protractor_1.$$("atx-view-category-settings mat-card-content > div > span").get(0),
            issueClass: protractor_1.$$("atx-view-category-settings mat-card-content > div > span").get(1),
            assetClassesList: protractor_1.$$("atx-view-category-settings mat-card-content > div > ul > li"),
            closeBtn: protractor_1.$("atx-view-category-settings mat-card-title > button"),
            contentHolder: protractor_1.$("atx-view-category-settings > div"),
        };
        this.categoryNameTxt = protractor_1.$("[formcontrolname=\"categoryDescription\"]");
        this.issueClassDropDown = protractor_1.$("[formcontrolname=\"issueClassID\"] > .mat-select-trigger");
        this.assetClassDropdown = protractor_1.$("[formcontrolname=\"assetClassTypes\"] > .mat-select-trigger");
        this.addNewResolutionStatusBtn = protractor_1.$("atx-statuses > div > div > mat-card > mat-card-content > button");
        this.resolutionStatusNameTxt = protractor_1.$("[formcontrolname=\"resolutionStatusName\"]");
        this.resolutionStatusNameSelectorStr = '[formcontrolname="resolutionStatusName"]';
        this.resolutionAddActionBtn = protractor_1.$("atx-statuses form [title=\"Add Action\"]");
        this.actionTypeDropDown = protractor_1.$("[formcontrolname=\"selectedActionType\"]");
        this.deleteActionBtn = protractor_1.$("[title=\"Delete Action\"]");
        this.saveBtn = protractor_1.element(protractor_1.by.cssContainingText('.mat-button-wrapper', 'Save'));
        this.editBtn = protractor_1.$("[title=\"Edit\"]");
        this.cancelBtn = protractor_1.$("[title=\"Discard\"]");
        this.dialogOkBtn = protractor_1.$$("mat-dialog-actions > button > span").get(0);
        this.dialogCancelBtn = protractor_1.$$("mat-dialog-actions > button > span").get(1);
        this.actionPanelStr = "atx-category-actions #atx-test-actions > mat-expansion-panel";
        this.actionEmailFormObj = {
            actionNameTxt: protractor_1.$$("[formcontrolname=\"actionName\"]"),
            recipientTxt: protractor_1.$$("[formcontrolname=\"recipientList\"]"),
            subjectTxt: protractor_1.$$("[formcontrolname=\"subject\"]"),
            messageBody: protractor_1.$$("[formcontrolname=\"messageBody\"]"),
            allowOverride: protractor_1.$$("[formcontrolname=\"override\"]"),
            dropFilesHere: protractor_1.$$("atx-action-form-email-attachment .uploadfilecontainer"),
            chooseFileBtn: protractor_1.$$("atx-action-form-email-attachment [type=\"file\"]")
        };
        this.actionAttributeFormObj = {
            actionNameTxt: protractor_1.$$("[formcontrolname=\"actionName\"]"),
            attributeName: protractor_1.$$("[formcontrolname=\"attributeName\"]"),
            attributeValue: protractor_1.$$("[formcontrolname=\"attributeValue\"]"),
        };
        this.actionTypes = {
            email: 'Email',
            updateAMapStatus: 'Update a Map Status',
            updateAttribute: 'Update Attribute',
            updateResolutionStatus: 'Update Resolution Status'
        };
        this.actionTypeDropdownSelector = "[formcontrolname = 'selectedActionType']";
        this.overlayBackDrop = protractor_1.$(".cdk-overlay-backdrop");
        this.targetResolutionStatusDropdownStr = "[formcontrolname=\"targetResolutionStatus\"]";
        this.targetResolutionStatusDropdown = protractor_1.$(this.targetResolutionStatusDropdownStr);
        this.delayAutoWFCheckboxSelector = "[formcontrolname=\"delayAutoWorkflow\"]";
    }
    /**
     * This will return the element which contains the details for the actions.
     * @param groupType - resolution | open | closed
     * @param actionType - email | attribute
     * @example const actionDetails = getStatusGroup('open', 'email')
     * @returns {array} element.
     */
    WorkflowEditor.prototype.getActionDetails = function (groupType, actionType) {
        // NEED TO UPDATE THIS
        switch (groupType) {
            case 'resolution':
                return this.getActionByType(this.groupHolder.get(0), actionType);
            case 'open':
                return this.getActionByType(this.groupHolder.get(1), actionType);
            case 'closed':
                return this.getActionByType(this.groupHolder.get(2), actionType);
            default:
                break;
        }
    };
    /**
     * returns the Issue Activity Panel elemen
     * @param issueActivityName - 'Open' || 'Closed'
     */
    WorkflowEditor.prototype.getIssueActivityPanel = function (issueActivityName) {
        switch (issueActivityName) {
            case 'Open':
                return protractor_1.$$(".resItems > mat-expansion-panel").first();
            case 'Closed':
                return protractor_1.$$(".resItems > mat-expansion-panel").last();
            default:
                break;
        }
    };
    WorkflowEditor.prototype.getAddAction = function (groupStatusElement) {
    };
    /**
     * Currently just being used for getStatusGroup()
     * Returns an array
     */
    WorkflowEditor.prototype.getActionByType = function (elem, actionType) {
        protractor_1.browser.sleep(800);
        switch (actionType) {
            case 'attribute':
                return elem.$$("atx-action-form-update-attribute-details");
            case 'email':
                return elem.$$("atx-action-form-email-details");
            case 'resolution':
                return elem.$$("atx-action-form-update-resolution-status");
            default:
                break;
        }
    };
    // might be able to use this later on.
    WorkflowEditor.prototype.getActionByActionGroup = function (actionGroupForm, actionType) {
        // const actionSettings = actionGroupForm.$$(`atx-action-form form`);
        switch (actionType) {
            case this.actionTypes.email:
                return this.getActionEmailDetails(actionGroupForm);
            case this.actionTypes.updateAttribute:
                return this.getUpdateAttributeDetails(actionGroupForm);
            case this.actionTypes.updateResolutionStatus:
                return this.getActionEmailDetails(actionGroupForm);
            default:
                break;
        }
    };
    // async getAllActions(resolutionGroup: ElementFinder) {
    //   const actions = resolutionGroup.$$(`atx-category-actions #atx-test-actions > mat-expansion-panel`);
    //   const actionNameSelector = `mat-card > .mat-card-content > #atx-test-actions >` +
    //     `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    //   const totalActions = await actions.count();
    //   const actionsArr = [];
    //   for (let idx = 0; idx < totalActions; idx++) {
    //     helper.clickAndSleep(actions.get(idx).$(actionNameSelector), 1500);
    //     actionsArr.push(await this.getActionDetailsV2(actions.get(idx)));
    //     helper.clickAndSleep(actions.get(idx).$(actionNameSelector), 1500);
    //   }
    //   return actionsArr;
    // }
    WorkflowEditor.prototype.getAllActions = function (resolutionGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allResolutionStatus, resoCount, resolutionArr, resoIdx, resolutionHeader, actions, actionNameSelector, totalActions, resoName, tempActions, idx, actionHeader, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        allResolutionStatus = this.resolutionStatusBtnAll;
                        return [4 /*yield*/, allResolutionStatus.count()];
                    case 1:
                        resoCount = _c.sent();
                        resolutionArr = [];
                        resoIdx = 0;
                        _c.label = 2;
                    case 2:
                        if (!(resoIdx < resoCount)) return [3 /*break*/, 10];
                        resolutionHeader = allResolutionStatus.get(resoIdx);
                        actions = resolutionHeader.$$(this.actionPanelStr);
                        helper.waitForVisibleAndMouseMove(resolutionHeader);
                        helper.clickAndSleep(resolutionHeader, 2000); // open resolution header
                        actionNameSelector = "mat-card > .mat-card-content > #atx-test-actions >" +
                            "mat-expansion-panel > mat-expansion-panel-header > .mat-content";
                        return [4 /*yield*/, actions.count()];
                    case 3:
                        totalActions = _c.sent();
                        return [4 /*yield*/, resolutionHeader.$("mat-panel-title").getText()];
                    case 4:
                        resoName = _c.sent();
                        tempActions = [];
                        idx = 0;
                        _c.label = 5;
                    case 5:
                        if (!(idx < totalActions)) return [3 /*break*/, 8];
                        actionHeader = actions.get(idx).$(actionNameSelector);
                        helper.waitForVisibleAndMouseMove(actionHeader);
                        helper.clickAndSleep(actionHeader, 1500); // click action header to expand
                        _b = (_a = tempActions).push;
                        return [4 /*yield*/, this.getActionDetailsV2(actions.get(idx))];
                    case 6:
                        _b.apply(_a, [_c.sent()]); // store actions
                        helper.clickAndSleep(actionHeader, 1500);
                        _c.label = 7;
                    case 7:
                        idx++;
                        return [3 /*break*/, 5];
                    case 8:
                        resolutionArr.push({ name: resoName, actions: tempActions });
                        _c.label = 9;
                    case 9:
                        resoIdx++;
                        return [3 /*break*/, 2];
                    case 10: return [2 /*return*/, resolutionArr];
                }
            });
        });
    };
    // old implementation
    WorkflowEditor.prototype.getActionDetailsV2_Old = function (actionForm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionName, form, actionType, actionDetails, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        actionName = "mat-card > .mat-card-content > #atx-test-actions >" +
                            "mat-expansion-panel > mat-expansion-panel-header > .mat-content";
                        form = actionForm.$$("form .select-settings");
                        return [4 /*yield*/, actionForm.$$("form .select-settings").get(0).getText()];
                    case 1:
                        actionType = _b.sent();
                        console.log("actionType.split(':')[1].trim(): ", actionType.split(':')[1].trim());
                        return [4 /*yield*/, this.getActionByActionGroup(actionForm, actionType.split(':')[1].trim())];
                    case 2:
                        actionDetails = _b.sent();
                        console.log("emailDetails: ", actionDetails);
                        _a = {};
                        return [4 /*yield*/, actionForm.$(actionName).getText()];
                    case 3:
                        _a.name = _b.sent();
                        return [4 /*yield*/, form.getText()];
                    case 4: return [2 /*return*/, (_a.settingsForm = _b.sent(),
                            _a.advancedSettings = 'nothing here' // await this.getAdvancedSettings(actionForm.$(`form`))
                        ,
                            _a)];
                }
            });
        });
    };
    WorkflowEditor.prototype.getActionDetailsV2 = function (actionForm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var form, actionType;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = actionForm.$$("form .select-settings");
                        return [4 /*yield*/, actionForm.$$("form .select-settings").get(0).getText()];
                    case 1:
                        actionType = _a.sent();
                        return [2 /*return*/, this.getActionByActionGroup(actionForm, actionType.split(':')[1].trim())];
                }
            });
        });
    };
    // async getActionDetailsV2(actionForm: ElementFinder): Promise<{ name: string, settingsForm: string, advancedSettings: any }> {
    //   const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
    //     `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    //   const form = actionForm.$$(`form .select-settings`);
    //   return {
    //     name: await actionForm.$(actionName).getText(),
    //     settingsForm: await form.getText(),
    //     advancedSettings: await this.getAdvancedSettings(actionForm.$(`form`))
    //   };
    // }
    WorkflowEditor.prototype.getActionEmailDetails = function (emailForm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionName, settingsForm, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        actionName = "mat-card > .mat-card-content > #atx-test-actions >" +
                            "mat-expansion-panel > mat-expansion-panel-header > .mat-content";
                        settingsForm = emailForm.$$(".select-settings");
                        _a = {};
                        return [4 /*yield*/, emailForm.$(actionName).getText()];
                    case 1:
                        _a.headerTitle = _b.sent();
                        return [4 /*yield*/, settingsForm.get(0).getText()];
                    case 2:
                        _a.type = _b.sent();
                        return [4 /*yield*/, settingsForm.get(1).getText()];
                    case 3:
                        _a.actionName = _b.sent();
                        return [4 /*yield*/, settingsForm.get(2).getText()];
                    case 4:
                        _a.recipients = _b.sent();
                        return [4 /*yield*/, settingsForm.get(3).getText()];
                    case 5:
                        _a.subject = _b.sent();
                        return [4 /*yield*/, settingsForm.get(4).getText()];
                    case 6:
                        _a.messageBody = _b.sent();
                        return [4 /*yield*/, settingsForm.get(5).getText()];
                    case 7:
                        _a.attachments = _b.sent();
                        return [4 /*yield*/, settingsForm.get(6).getText()];
                    case 8:
                        _a.allowOverride = _b.sent();
                        return [4 /*yield*/, this.getAdvancedSettings(emailForm.$("form"))];
                    case 9: return [2 /*return*/, (_a.advancedSettings = _b.sent(),
                            _a)];
                }
            });
        });
    };
    WorkflowEditor.prototype.getUpdateAttributeDetails = function (updateAttributeForm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionName, settingsForm, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        actionName = "mat-card > .mat-card-content > #atx-test-actions >" +
                            "mat-expansion-panel > mat-expansion-panel-header > .mat-content";
                        settingsForm = updateAttributeForm.$$(".select-settings");
                        _a = {};
                        return [4 /*yield*/, updateAttributeForm.$(actionName).getText()];
                    case 1:
                        _a.headerTitle = _b.sent();
                        return [4 /*yield*/, settingsForm.get(0).getText()];
                    case 2:
                        _a.type = _b.sent();
                        return [4 /*yield*/, settingsForm.get(1).getText()];
                    case 3:
                        _a.actionName = _b.sent();
                        return [4 /*yield*/, settingsForm.get(2).getText()];
                    case 4:
                        _a.attributeName = _b.sent();
                        return [4 /*yield*/, settingsForm.get(3).getText()];
                    case 5:
                        _a.attributeValue = _b.sent();
                        return [4 /*yield*/, this.getAdvancedSettings(updateAttributeForm.$("form"))];
                    case 6: return [2 /*return*/, (_a.advancedSettings = _b.sent(),
                            _a)];
                }
            });
        });
    };
    WorkflowEditor.prototype.getAdvancedSettings = function (actionFormGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var advancedSettingsHeaderBtn, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        advancedSettingsHeaderBtn = "mat-expansion-panel-header[role=\"button\"]";
                        helper.waitForVisibleAndMouseMove(actionFormGroup.$(advancedSettingsHeaderBtn));
                        protractor_1.browser.sleep(1000);
                        helper.clickAndSleep(actionFormGroup.$(advancedSettingsHeaderBtn));
                        _a = {};
                        _b = {
                            executedActionWhen: 'entering'
                        };
                        return [4 /*yield*/, this.getTransitionResolutionStatuses(actionFormGroup)];
                    case 1:
                        _b.transitionResolutionStatuses = _c.sent();
                        return [4 /*yield*/, actionFormGroup.$(".transition-action").getText()];
                    case 2:
                        _b.transitionAction = _c.sent();
                        return [4 /*yield*/, actionFormGroup.$(".transition-resolution-status-this").getText()];
                    case 3: return [2 /*return*/, (_a.executionDetails = (_b.resolutionStatusThis = _c.sent(),
                            _b),
                            _a.delayActionDetails = {
                                delayed: true,
                                days: 1,
                                hours: 1,
                                alwaysTrigger: true
                            },
                            _a)];
                }
            });
        });
    };
    WorkflowEditor.prototype.getTransitionResolutionStatuses = function (actionFormGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var workflowStatuses, totalWorkflowStatueses, statusDetails, idx, _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        workflowStatuses = actionFormGroup.$$("#work-flow-status-other > mat-list-item mat-checkbox");
                        return [4 /*yield*/, workflowStatuses.count()];
                    case 1:
                        totalWorkflowStatueses = _d.sent();
                        statusDetails = [];
                        idx = 0;
                        _d.label = 2;
                    case 2:
                        if (!(idx < totalWorkflowStatueses)) return [3 /*break*/, 6];
                        _b = (_a = statusDetails).push;
                        _c = {};
                        return [4 /*yield*/, workflowStatuses.get(idx).$(".mat-checkbox-label").getText()];
                    case 3:
                        _c.statusName = _d.sent();
                        return [4 /*yield*/, workflowStatuses.get(idx).$(".mat-checkbox-input").isSelected()];
                    case 4:
                        _b.apply(_a, [(_c.checked = _d.sent(),
                                _c)]);
                        _d.label = 5;
                    case 5:
                        idx++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, statusDetails];
                }
            });
        });
    };
    WorkflowEditor.prototype.getActionByStatusGroup = function (statusGroupElement) {
        // statusGroupElement
    };
    /**
     * returns resolution element with the param resolutionName
     * @param resolutionName - string. Resolution Name to fetch
     */
    WorkflowEditor.prototype.getResolutionStatusByName = function (resolutionName) {
        return this.resolutionStatusBtnAll.filter(function (status) {
            return status.getText().then(function (text) {
                return text.includes(resolutionName);
            });
        }).first();
    };
    WorkflowEditor.prototype.getResolutionStatusName = function (resolutionGroupElem) {
        return resolutionGroupElem.$("span.editing-names").getText();
    };
    WorkflowEditor.prototype.deleteResolutionStatus = function (resolutionGroupElem) {
        // resolutionGroupElem.findElement
        // resolutionGroupElem.element(by
        //   .xpath(`//*[local-name()="svg"][@data-icon="trash"]/` +
        //     `ancestor::button[@class="small editing-names mat-mini-fab mat-warn ng-star-inserted"]`))
        //   .click();
        this.resolutionHeaderButtonPress(resolutionGroupElem, 'remove');
        helper.waitAndClick(this.getDeleteResoDialogConfirm("OK"));
    };
    WorkflowEditor.prototype.getDeleteResoDialogConfirm = function (buttonOption) {
        return protractor_1.element(protractor_1.by.xpath("//atx-modal-dialog//button/span[contains(text(),\"" + buttonOption + "\")]"));
    };
    /**
     * This function will perform up, down, edit, and cancel buttons of resolution header
     * @param element - the resolutionStatus Header element from this.getResolutionStatusByName()
     * @param {string} action - up | down | edit | cancel
     */
    WorkflowEditor.prototype.resolutionHeaderButtonPress = function (elem, action) {
        var selector = "mat-expansion-panel-header button";
        switch (action) {
            case 'up':
                helper.clickAndSleep(elem.$$(selector).get(0), 500);
                break;
            case 'down':
                helper.clickAndSleep(elem.$$(selector).get(1), 500);
                break;
            case 'edit':
                helper.clickAndSleep(elem.$$(selector).get(2), 500);
                break;
            case 'cancel':
                helper.clickAndSleep(elem.$$(selector).get(3), 500);
                break;
            case 'remove':
                helper.clickAndSleep(elem.$$(selector).get(3), 500);
                break;
            default:
                break;
        }
    };
    /** @description - function to get element from Client Parent group.  */
    WorkflowEditor.prototype.getParentClientsList = function (parentName) {
        return protractor_1.$$("#assetTree > div.top-level").filter(function (parent, index) {
            return parent.$("div > span").getText().then(function (text) {
                return text === parentName;
            });
        }).first();
    };
    WorkflowEditor.prototype.getCategoryOptions = function () {
        return this.categoryDropdown.$$("option");
    };
    WorkflowEditor.prototype.getClassOptions = function () {
        return this.classDropdown.$$("option");
    };
    WorkflowEditor.prototype.selectClassByName = function (className) {
        this.classDropdown.element(protractor_1.by.cssContainingText('.ng-star-inserted', className)).click();
    };
    WorkflowEditor.prototype.selectCategoryByName = function (categoryName) {
        this.categoryDropdown.element(protractor_1.by.cssContainingText('.ng-star-inserted', categoryName)).click();
    };
    /** This method will do all the category creation
     * @param categoryData - category to create. Contains data for resolution status, Open, and closed
     */
    WorkflowEditor.prototype.createCategoryComplete = function (categoryData) {
        this.addNewCategoryFn(categoryData);
        for (var _i = 0, _a = Object.keys(categoryData.resolutionStatus); _i < _a.length; _i++) {
            var idx = _a[_i];
            this.addNewResolutionFn(categoryData.resolutionStatus[idx]);
            protractor_1.browser.sleep(500);
        }
        if (categoryData.issueActivities.open.length > 0) { // filter actions
            var issueActivityOpenBtn = this.getIssueActivityPanel('Open');
            issueActivityOpenBtn.click(); // OPEN ACTIVITY PANEL
            for (var _b = 0, _c = Object.keys(categoryData.issueActivities.open); _b < _c.length; _b++) {
                var idx = _c[_b];
                this.addNewAction(issueActivityOpenBtn, categoryData.issueActivities.open[idx].type, categoryData.issueActivities.open[idx], true);
            }
            protractor_1.browser.sleep(1000);
        }
        if (categoryData.issueActivities.closed.length > 0) { // filter actions
            var issueActivityClosedBtn = this.getIssueActivityPanel('Closed');
            issueActivityClosedBtn.click();
            for (var _d = 0, _e = Object.keys(categoryData.issueActivities.closed); _d < _e.length; _d++) {
                var idx = _e[_d];
                this.addNewAction(issueActivityClosedBtn, categoryData.issueActivities.closed[idx].type, categoryData.issueActivities.closed[idx], true);
            }
            protractor_1.browser.sleep(1000);
        }
        this.saveCategory();
        helper.closeToastMessage();
    };
    WorkflowEditor.prototype.addNewCategoryFn = function (data) {
        var _this = this;
        this.addCategoryBtn.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                helper.waitForVisible(_this.addCategoryBtn);
                protractor_1.browser.sleep(2000);
                helper.waitForElementClickable(_this.addCategoryBtn);
                _this.addCategoryBtn.click();
                _this.categoryNameTxt.sendKeys(data.categoryName);
                if (data.issueName !== undefined) {
                    _this.selectIssueClass(data.issueName);
                }
                if (data.assetName !== undefined) {
                    _this.selectAssetClass(data.assetName);
                }
            }
        });
    };
    WorkflowEditor.prototype.addNewResolutionFn = function (resolutionStatusObj) {
        protractor_1.browser.sleep(500);
        this.addNewResolutionStatusBtn.click();
        var newResolutionStatus = this.resolutionStatusBtnAll.last();
        this.resolutionHeaderButtonPress(newResolutionStatus, 'edit'); // edit
        newResolutionStatus.$(this.resolutionStatusNameSelectorStr).clear();
        newResolutionStatus.$(this.resolutionStatusNameSelectorStr).sendKeys(resolutionStatusObj.name);
        this.resolutionHeaderButtonPress(newResolutionStatus, 'edit'); // save
        var actionObj = resolutionStatusObj.actions;
        if (actionObj.length > 0) {
            var resolutionHeader = this.resolutionStatusBtnAll.last();
            helper.clickAndSleep(resolutionHeader);
            for (var _i = 0, _a = Object.keys(actionObj); _i < _a.length; _i++) {
                var idx = _a[_i];
                this.addNewAction(resolutionHeader, actionObj[idx].type, actionObj[idx]);
            }
        }
    };
    WorkflowEditor.prototype.editResolutionFn = function (elem, resolutionStatusObj) {
        this.resolutionHeaderButtonPress(elem, 'edit'); // edit
        elem.$(this.resolutionStatusNameSelectorStr).clear();
        elem.$(this.resolutionStatusNameSelectorStr).sendKeys(resolutionStatusObj.name);
        this.resolutionHeaderButtonPress(elem, 'edit'); // save
    };
    WorkflowEditor.prototype.addNewAction = function (groupStatusElement, actionType, actionData, issueActivityStatus) {
        if (issueActivityStatus === void 0) { issueActivityStatus = false; }
        protractor_1.browser.actions().mouseMove(groupStatusElement.$("[title=\"Add Action\"]")).perform();
        helper.waitAndClick(groupStatusElement.$("[title=\"Add Action\"]")); // CLICK ADD ACTION BUTTON
        var groupStatusActions = this.getActionHeaderAll(groupStatusElement);
        groupStatusActions.last().click(); // EXPAND EMAIL/ATTRIBUTE ACTION PANEL
        switch (actionType) {
            case 'email':
                this.addNewEmailAction(groupStatusElement, actionData);
                break;
            case 'attribute':
                this.addNewUpdateAttributeAction(groupStatusElement, actionData);
                break;
            case this.actionTypes.updateAttribute:
                this.addNewUpdateAttributeAction(groupStatusElement, actionData);
                break;
            case this.actionTypes.updateResolutionStatus:
                this.addNewUpdateResolutionStatus(groupStatusElement, actionData);
                break;
            case 'mapUpdate':
                // function call goes here
                break;
            default:
                break;
        }
        if (!issueActivityStatus) {
            this.setActionAdvancedSettings(groupStatusElement, groupStatusActions, actionData);
        }
        else {
            protractor_1.browser.sleep(1000);
        }
        // close action
        groupStatusActions.last().click();
    };
    WorkflowEditor.prototype.selectIssueClass = function (issueName) {
        protractor_1.browser.sleep(2000);
        helper.waitAndClick(this.issueClassDropDown);
        helper.selectFromListBoxOverlayByName(issueName);
        protractor_1.browser.sleep(2000);
    };
    WorkflowEditor.prototype.selectAssetClass = function (assetName) {
        helper.waitAndClick(this.assetClassDropdown);
        if (Array.isArray(assetName)) {
            for (var _i = 0, _a = Object.keys(assetName); _i < _a.length; _i++) {
                var idx = _a[_i];
                helper.selectFromListBoxOverlayByName(assetName[idx]);
                protractor_1.browser.sleep(300);
            }
            // for (let idx = 0; idx < assetName.length; idx++) {
            //   helper.selectFromListBoxOverlayByName(assetName[idx])
            //   browser.sleep(300)
            // }
        }
        else {
            helper.selectFromListBoxOverlayByName(assetName);
        }
        protractor_1.browser.sleep(1000);
        // clicks backdrop to close drop down list
        // $(`.cdk-overlay-backdrop`).click()
        protractor_1.browser.actions()
            .mouseMove(this.overlayBackDrop, { x: 100, y: 100 })
            .click()
            .perform();
    };
    /**
     * returns elements array of all the actions on a certain group / panel
     * @param {ElementFinder} groupStatusContainer - group (resolution, open, closed) element
     */
    WorkflowEditor.prototype.getActionHeaderAll = function (groupStatusContainer) {
        var selector = "#atx-test-actions > mat-expansion-panel > mat-expansion-panel-header > span.mat-content";
        return groupStatusContainer.$$(selector);
    };
    /**
     * returns all action section in an array. Object contains "actionHead" which is clickable to open and close the action.
     * "advancedSettings" - which contains elements and advanced action functions
     * @param groupStatusContainer - group (resolution, open, closed) element
     */
    WorkflowEditor.prototype.getActionPanelAll = function (groupStatusContainer) {
        var actionContainerSelector = "#atx-test-actions > mat-expansion-panel";
        var actionHeaderSelector = ' > ' + "mat-expansion-panel-header > span.mat-content";
        var advancedSettingsPanel = actionContainerSelector + " mat-expansion-panel";
        var advancedSettings = {
            headerSelector: " mat-expansion-panel-header > span.mat-content",
            radioButtons: " div.mat-expansion-panel-body > mat-radio-group > mat-radio-button",
            transition: " div.mat-expansion-panel-body > div > div",
        };
        var statusListItemsSelector = 'atx-action-form mat-list > mat-list-item';
        var listChkBoxSelector = statusListItemsSelector + ' mat-checkbox';
        return {
            // action flow in advanced settings,
            // NOTE: (this and other can be interchanged depends on Entering / Leaving Status)
            // transition-resolution-status-this <- resolution where the action is.
            // transition-action <-- current action
            // transition-resolution-status-other <-
            actionHeader: groupStatusContainer.$$(actionContainerSelector + actionHeaderSelector),
            getDeleteBtn: function (actionIdx) {
                return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                    .$("[title=\"Delete Action\"]");
            },
            advancedSettings: {
                container: groupStatusContainer.$$(advancedSettingsPanel),
                header: groupStatusContainer.$$(advancedSettingsPanel + advancedSettings.headerSelector),
                /** returns the selected Action Status
                 */
                getSelectedStatusRBtn: function (actionIdx) {
                    return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                        .$$(advancedSettings.radioButtons).filter(function (radioBtn) {
                        return radioBtn.getAttribute('class').then(function (attributeValue) {
                            return attributeValue.includes("mat-radio-checked");
                        });
                    });
                },
                // set Entering or Leaving status
                setActionStatus: function (actionIdx, status) {
                    // browser.actions().mouseMove(groupStatusContainer.$$(advancedSettingsPanel).get(actionIdx)).perform();
                    protractor_1.browser.sleep(2000);
                    var actionRadioBtn = groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                        .$$(advancedSettings.radioButtons);
                    if (status === 'Entering') {
                        actionRadioBtn.$$("label").first().click();
                        actionRadioBtn.$$("label").first().click();
                    }
                    else {
                        actionRadioBtn.$$("label").last().click();
                        actionRadioBtn.$$("label").last().click();
                    }
                },
                flow: {
                    // this method gets all items without filters of action transition
                    getSelectedItemsByActionIdx: function (actionIdx) {
                        return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                            .$$(listChkBoxSelector).filter(function (elem) {
                            return elem.getAttribute('class').then(function (attributeValue) {
                                return attributeValue.includes("mat-checkbox-checked");
                            });
                        });
                    },
                    /**
                     * returns an array of the list items in a transition. returns 0 if there are no items in the transition
                     * @param actionIdx - index number of the action, 0 if there is only 1 action
                     * @param transitionIdx - index number of transition transition = 0 or 2
                     */
                    getListItemsByTransitionIdx: function (actionIdx, transitionIdx) {
                        return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                            .$$(advancedSettings.transition).get(transitionIdx).$$("mat-list-item");
                    },
                    getTransitionAction: function (actionIdx) {
                        return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                            .$(".transition-action");
                    },
                    getTransitionStatusThis: function (actionIdx) {
                        return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                            .$(".transition-resolution-status-this");
                    },
                    setTransitionListItems: function (actionIdx, transitionIdx, itemNames) {
                        console.log("itemNames: ", itemNames);
                        for (var _i = 0, _a = Object.keys(itemNames); _i < _a.length; _i++) {
                            var idx = _a[_i];
                            groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                                .$$(advancedSettings.transition).get(transitionIdx)
                                .$("mat - list - item > div > mat - checkbox")
                                .element(protractor_1.by.cssContainingText('.mat-checkbox-layout', itemNames[idx])).click();
                        }
                    },
                },
            },
        };
    };
    /**
     * returns the ListItems if there are any a transitionElement
     * @param transitionElement - ElementFinder - elementArr.first() || ElementArr.last() - which is left or right transition
     */
    WorkflowEditor.prototype.getListItemsByTransition = function (transitionElement) {
        return transitionElement.$$("mat - list - item");
    };
    WorkflowEditor.prototype.setActionAdvancedSettings = function (groupStatusElement, groupStatusActions, actionData) {
        var actionToUse = this.getActionPanelAll(groupStatusElement);
        helper.clickAndSleep(actionToUse.advancedSettings.header.last()); // expand action panel
        // set variable Entering or Leaving
        groupStatusActions.then(function (actions) {
            actionToUse.advancedSettings.setActionStatus(actions.length - 1, actionData.advancedSettings.actionStatus);
        });
        var transitionListItemHolderIdx = (actionData.advancedSettings.actionStatus === 'Entering') ? 0 : 2;
        var transitionItemNames = actionData.advancedSettings.listItemsToSelect;
        if (transitionItemNames !== undefined) {
            groupStatusActions.then(function (actions) {
                actionToUse.advancedSettings.setActionStatus(actions.length - 1, actionData.advancedSettings.actionStatus);
                actionToUse.advancedSettings.flow.setTransitionListItems(actions.length - 1, transitionListItemHolderIdx, transitionItemNames);
            });
        }
        helper.clickAndSleep(actionToUse.advancedSettings.header.last());
    };
    /**
     * emailActionData = { actionName: string, recipient: string, subject: string, messageBody: string }
     */
    WorkflowEditor.prototype.addNewEmailAction = function (groupStatusContainer, emailActionData) {
        protractor_1.browser.sleep(1000);
        groupStatusContainer.$$("[formcontrolname = 'selectedActionType']").last()
            .element(protractor_1.by.cssContainingText('.ng-star-inserted', 'Email')).click();
        // click to expand last | newly created action
        protractor_1.browser.sleep(1000);
        var actionPanel = groupStatusContainer.$(this.actionPanelStr);
        helper.clearAndSendKeys(this.actionEmailFormObj.actionNameTxt.last(), emailActionData.actionName);
        this.actionEmailFormObj.recipientTxt.last().sendKeys(emailActionData.recipient);
        this.actionEmailFormObj.subjectTxt.last().sendKeys(emailActionData.subject);
        this.actionEmailFormObj.messageBody.last().sendKeys(emailActionData.messageBody);
        if (emailActionData.allowOverride) {
            this.actionEmailFormObj.allowOverride.last().click();
        }
        this.addEmailAttachment(actionPanel, emailActionData.attachments);
    };
    WorkflowEditor.prototype.addEmailAttachment = function (actionPanel, attachments) {
        var chooseFileBtn = actionPanel.$("atx-action-form-email-attachment [type=\"file\"]");
        if (Array.isArray(attachments)) {
            if (attachments.length > 0) {
                attachments.forEach(function (attachment) {
                    util.fileUpload(chooseFileBtn, attachment);
                    protractor_1.browser.sleep(1500);
                });
            }
        }
    };
    WorkflowEditor.prototype.getEmailAttachments = function (actionPanel, modify) {
        if (modify === void 0) { modify = true; }
        if (modify) {
            return actionPanel.$$("atx-action-form-email-attachment .files-list");
        }
        else {
            return actionPanel.$$(".attachment-container files-list li");
        }
    };
    /**
     * removes email attachment by index of file name
     * @param actionPanel Element Finder of actionPanel
     * @param toDelete index as number || name as string
     */
    WorkflowEditor.prototype.deleteEmailAttachment = function (actionPanel, toDelete) {
        if (typeof toDelete === 'number') {
            actionPanel.$$("atx-action-form-email-attachment > .files-list").get(toDelete)
                .click();
        }
        else if (typeof toDelete === 'string') {
            actionPanel.element(protractor_1.by
                .xpath("//div[@class=\"files-list ng-star-inserted\"]/p[text()=\"" + toDelete + "\"]/ancestor::div/button"))
                .click();
        }
    };
    /**
     * @param attributeActionData attributeActionData = { actionName: string, name: string, value: string }
     */
    WorkflowEditor.prototype.addNewUpdateAttributeAction = function (groupStatusContainer, attributeActionData) {
        protractor_1.browser.sleep(1000);
        groupStatusContainer.$$("[formcontrolname = 'selectedActionType']").last()
            .element(protractor_1.by.cssContainingText('.ng-star-inserted', 'Update Attribute')).click();
        protractor_1.browser.sleep(1000);
        helper.clearAndSendKeys(this.actionAttributeFormObj.actionNameTxt.last(), attributeActionData.actionName);
        this.actionAttributeFormObj.attributeName.last().sendKeys(attributeActionData.name);
        this.actionAttributeFormObj.attributeValue.last().sendKeys(attributeActionData.value);
    };
    WorkflowEditor.prototype.selectActionTypeFn = function (actionType) {
        // this work only IF one action is open.
        // Can be updated by adding groupHolder: ElementFinder
        this.actionTypeDropDown
            .element(protractor_1.by.cssContainingText('.ng-star-inserted', actionType)).click();
    };
    WorkflowEditor.prototype.selectActionStatus = function (groupStatus, status) {
        var actionToUse = this.getActionPanelAll(groupStatus);
    };
    /** This saves and opens the category.
     * Workaround for issue before where it loads empty state instead of openning the category
     * @param {any} categoryObj - newCategoryObj
     * @param {boolean} update  - required if it's update category
     */
    WorkflowEditor.prototype.saveAndOpenCategory = function (categoryObj, update) {
        if (update === void 0) { update = false; }
        this.saveBtn.click();
        if (update) {
            helper.waitAndClick(this.dialogOkBtn);
        }
        // note that there is an issue with invalid email address where is doesn't save the progress
        this.openCategory(categoryObj);
        protractor_1.browser.sleep(1500);
        helper.waitForVisible(this.categoryTitle);
    };
    WorkflowEditor.prototype.openCategory = function (categoryObj) {
        this.selectClassByName(categoryObj.issueName);
        this.selectCategoryByName(categoryObj.categoryName);
    };
    /** This saves the category.
     * @param {boolean} update - REQUIRED if save is Update category
     */
    WorkflowEditor.prototype.saveCategory = function (update) {
        if (update === void 0) { update = false; }
        this.saveBtn.click();
        if (update) {
            helper.waitAndClick(this.dialogOkBtn);
        }
        protractor_1.browser.sleep(3000);
        helper.waitForVisible(this.categoryTitle);
    };
    WorkflowEditor.prototype.addNewUpdateResolutionStatus = function (groupStatusContainer, attributeActionData) {
        protractor_1.browser.sleep(1000);
        groupStatusContainer.$$("[formcontrolname = 'selectedActionType']").last()
            .element(protractor_1.by.cssContainingText('.ng-star-inserted', this.actionTypes.updateResolutionStatus)).click();
        helper.clearAndSendKeys(groupStatusContainer.$$("[formcontrolname=\"actionName\"]").last(), attributeActionData.actionName);
        this.selectTargetResolutionName(groupStatusContainer.$$(this.targetResolutionStatusDropdownStr).last(), attributeActionData.resolutionStatusName);
        // groupStatusContainer.$$(this.targetResolutionStatusDropdownStr).last()
        //   .element(by.cssContainingText('.ng-star-inserted', attributeActionData.resolutionStatusName)).click();
    };
    /**
     * Returns the resolution status target drop down list of an action.
     * @param groupStatusContainer Element Finder of ResolutionStatus.ActionPanel
     * @param actionIdx optional if there are multiple actions in one resolution status
     */
    WorkflowEditor.prototype.getTargetResolutionDropdownList = function (groupStatusContainer, actionIdx) {
        var targetResolutionDropdown = groupStatusContainer.$$(this.targetResolutionStatusDropdownStr);
        return actionIdx !== undefined ? targetResolutionDropdown.get(actionIdx)
            : targetResolutionDropdown.get(0);
    };
    WorkflowEditor.prototype.selectTargetResolutionName = function (groupStatusActionContainer, targetResolutionName) {
        groupStatusActionContainer.element(protractor_1.by.cssContainingText('.ng-star-inserted', targetResolutionName)).click();
    };
    return WorkflowEditor;
}());
exports.WorkflowEditor = WorkflowEditor;
//# sourceMappingURL=workflowEditor.po.js.map