"use strict";
/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var protractor_1 = require("protractor");
var utils_1 = require("../../helpers/utils");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var casual = require("casual");
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var date = new Date();
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var newCategory = tslib_1.__assign({}, testDetails_data_1.categoryData);
newCategory.issueName = 'Pole Attachment Program';
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1].actions = [];
newCategory.resolutionStatus[2] = {
    name: '3_reso_' + casual.word,
    actions: [],
};
newCategory.issueActivities.open = [];
newCategory.issueActivities.closed = [];
var resolutionActionEmailData = {
    actionName: '1_action_' + casual.word,
    recipient: testDetails_data_1.userObj.email,
    subject: casual.word,
    messageBody: casual.sentence,
    advancedSettings: {
        actionStatus: actionStatus.entering,
    },
};
var resolutionActionAttributeData = {
    type: 'attribute',
    actionName: "2_action_" + casual.word,
    name: casual.word,
    value: "value_" + casual.random,
    advancedSettings: {
        actionStatus: actionStatus.leaving,
    },
};
describe('Issues Management - Configure Workflow - Resolution Status', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToIssueManagementConfigureWorkflow();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
    });
    it('should be able to add new Resolution Status', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatus;
        return tslib_1.__generator(this, function (_a) {
            // console.log(`Category to create: `, newCategory)
            workflowEditorPage.addNewCategoryFn(newCategory);
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
            resolutionStatus = workflowEditorPage.resolutionStatusBtnAll;
            resolutionStatus.then(function (elem) {
                expect(elem.length).toEqual(1);
            });
            expect(resolutionStatus.last().getText()).toMatch(newCategory.resolutionStatus[0].name);
            return [2 /*return*/];
        });
    }); });
    it('should be able edit Resolution Status', function () {
        newCategory.resolutionStatus[0].name = '1_edited_' + casual.word;
        var newResolutionStatus = workflowEditorPage.resolutionStatusBtnAll.last();
        workflowEditorPage.editResolutionFn(newResolutionStatus, newCategory.resolutionStatus[0]);
        expect(newResolutionStatus.getText()).toMatch(newCategory.resolutionStatus[0].name);
    });
    it('should be able to add another resolution status and move from statuses', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatusHeader;
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[2]);
            expect(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(3);
            // Newly created should appear last
            expect(workflowEditorPage.resolutionStatusBtnAll.last().getText())
                .toMatch(newCategory.resolutionStatus[2].name);
            resolutionStatusHeader = workflowEditorPage
                .getResolutionStatusByName(newCategory.resolutionStatus[2].name);
            workflowEditorPage.resolutionHeaderButtonPress(resolutionStatusHeader, 'up'); // move up
            workflowEditorPage.resolutionHeaderButtonPress(resolutionStatusHeader, 'up'); // move up
            // newly created should now be first
            expect(workflowEditorPage.resolutionStatusBtnAll.first().getText())
                .toMatch(newCategory.resolutionStatus[2].name);
            // save category
            // saveAndOpenCategory(newCategory)
            workflowEditorPage.saveCategory();
            expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName, "CategoryName doesn't match  data " + newCategory.categoryName);
            expect(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(3);
            expect(workflowEditorPage.resolutionStatusBtnAll.first().getText())
                .toMatch(newCategory.resolutionStatus[2].name); // Check if moved resolution status is saved.
            return [2 /*return*/];
        });
    }); });
    it('should be able to add new Action ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolution1;
        return tslib_1.__generator(this, function (_a) {
            resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
            resolution1.click();
            workflowEditorPage.editBtn.click();
            resolution1.$("[title=\"Add Action\"]").click(); // click add action btn
            expect(workflowEditorPage.getActionHeaderAll(resolution1).count()).toBe(1);
            expect(workflowEditorPage.getActionHeaderAll(resolution1).first().getText())
                .toMatch("New Action - Email");
            return [2 /*return*/];
        });
    }); });
    it('Verify Action Type drop down list & ensure user is able to select', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolution1;
        return tslib_1.__generator(this, function (_a) {
            resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
            workflowEditorPage.getActionHeaderAll(resolution1).first().click();
            protractor_1.browser.sleep(1500);
            workflowEditorPage.selectActionTypeFn('Email');
            expect(workflowEditorPage.actionEmailFormObj.actionNameTxt.isPresent()).toBeTruthy();
            expect(workflowEditorPage.actionEmailFormObj.recipientTxt.isPresent()).toBeTruthy();
            workflowEditorPage.selectActionTypeFn('Update Attribute');
            expect(workflowEditorPage.actionAttributeFormObj.actionNameTxt.isPresent()).toBeTruthy();
            expect(workflowEditorPage.actionAttributeFormObj.attributeName.isPresent()).toBeTruthy();
            workflowEditorPage.deleteActionBtn.click(); // delete action for next step
            return [2 /*return*/];
        });
    }); });
    it('User should be able to add all action details. Name, Recipients, Subject, Message Body', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolution1, resolution1Actions, actionsFromSiteEmail, actionsFromSiteAttribute;
        return tslib_1.__generator(this, function (_a) {
            protractor_1.browser.sleep(5000);
            resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
            // adds new Email action
            workflowEditorPage.addNewAction(resolution1, 'email', resolutionActionEmailData);
            // adds new Update Attribute action
            workflowEditorPage.addNewAction(resolution1, 'attribute', resolutionActionAttributeData);
            // saveAndOpenCategory(newCategory, true)
            workflowEditorPage.saveCategory(true);
            expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName, "CategoryName doesn't match  data " + newCategory.categoryName);
            resolution1.click();
            resolution1Actions = workflowEditorPage.getActionPanelAll(resolution1);
            resolution1Actions.actionHeader.first().click();
            actionsFromSiteEmail = workflowEditorPage.getActionByType(resolution1, 'email');
            expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(resolutionActionEmailData.recipient);
            expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(resolutionActionEmailData.subject);
            expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(resolutionActionEmailData.messageBody);
            resolution1Actions.actionHeader.last().click();
            actionsFromSiteAttribute = workflowEditorPage.getActionByType(resolution1, 'attribute');
            expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(resolutionActionAttributeData.name);
            expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(resolutionActionAttributeData.value);
            return [2 /*return*/];
        });
    }); });
    it('Verify "Advanced Action Settings"', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatusHeader, actionPanels;
        return tslib_1.__generator(this, function (_a) {
            resolutionStatusHeader = workflowEditorPage
                .getResolutionStatusByName(newCategory.resolutionStatus[2].name);
            actionPanels = workflowEditorPage.getActionPanelAll(resolutionStatusHeader);
            helper.clickAndSleep(actionPanels.advancedSettings.header.first());
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 0).count())
                .toEqual(2);
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 0).getText())
                .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);
            // Check if Entering Status is selected
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).count())
                .toEqual(1);
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).first().getText())
                .toMatch(resolutionActionEmailData.advancedSettings.actionStatus);
            // Check if current action is displayed in .transition-action
            expect(actionPanels.advancedSettings.flow.getTransitionAction(0).getText())
                .toMatch(resolutionActionEmailData.actionName);
            // Check if .transition-resolution-status-othe is currently displayed
            expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(0).getText())
                .toMatch(newCategory.resolutionStatus[2].name);
            // check Second Action with Leaving status
            helper.clickAndSleep(actionPanels.advancedSettings.header.last());
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(1, 2).count())
                .toEqual(2);
            // check if ListItems section is at the right side
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(1, 2).getText())
                .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(1).count())
                .toEqual(1);
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(1).first().getText())
                .toMatch(resolutionActionAttributeData.advancedSettings.actionStatus);
            // Check if current action is displayed in .transition-action
            expect(actionPanels.advancedSettings.flow.getTransitionAction(1).getText())
                .toMatch(resolutionActionAttributeData.actionName);
            // Check if .transition-resolution-status-othe is currently displayed
            expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(1).getText())
                .toMatch(newCategory.resolutionStatus[2].name);
            return [2 /*return*/];
        });
    }); });
    it('should Verify delete action feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatusHeader, actionPanels;
        return tslib_1.__generator(this, function (_a) {
            resolutionStatusHeader = workflowEditorPage
                .getResolutionStatusByName(newCategory.resolutionStatus[2].name);
            actionPanels = workflowEditorPage.getActionPanelAll(resolutionStatusHeader);
            workflowEditorPage.editBtn.click();
            actionPanels.getDeleteBtn(0).click(); // delete first action
            // saveAndOpenCategory(newCategory, true)
            workflowEditorPage.saveCategory(true);
            expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName, "CategoryName doesn't match  data " + newCategory.categoryName);
            resolutionStatusHeader.click();
            expect(actionPanels.actionHeader.count()).toEqual(1);
            expect(actionPanels.actionHeader.first().getText()).toMatch(resolutionActionAttributeData.actionName);
            return [2 /*return*/];
        });
    }); });
});
describe('BUG - 21294 - Advanced Action Settings are not correctly saved', function () {
    var newCategoryForBug = {
        categoryName: casual.word + '_' + date.getTime(),
        issueName: 'Compliance',
        assetName: testDetails_data_1.categoryData.assetName[0],
        resolutionStatus: [{ name: '1_res_BUG_' + casual.word, actions: [] },
            { name: '2_res_BUG_' + casual.word, actions: [] },
            { name: '3_res_BUG_' + casual.word, actions: [] }],
    };
    var actionAttributeData = {
        actionName: "2_action_" + casual.word,
        name: casual.word,
        value: "value_" + casual.random,
        advancedSettings: {
            actionStatus: actionStatus.leaving,
        },
    };
    it('should update the Action Status, unselect first resolution in advanced and verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var newResolutionStatus, actionPanels;
        return tslib_1.__generator(this, function (_a) {
            // console.log(`BUG - 21294:  Category to create: `, newCategoryForBug)
            workflowEditorPage.addNewCategoryFn(newCategoryForBug);
            workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[0]);
            workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[1]);
            workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[2]);
            newResolutionStatus = workflowEditorPage.resolutionStatusBtnAll.first();
            newResolutionStatus.click();
            workflowEditorPage.addNewAction(newResolutionStatus, 'attribute', actionAttributeData);
            // saveAndOpenCategory(newCategoryForBug)
            workflowEditorPage.saveCategory();
            helper.clickAndSleep(newResolutionStatus);
            actionPanels = workflowEditorPage.getActionPanelAll(newResolutionStatus);
            actionPanels.actionHeader.first().click();
            helper.clickAndSleep(actionPanels.advancedSettings.header.first());
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 2).count())
                .toEqual(2);
            expect(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 2).getText())
                .toEqual([newCategoryForBug.resolutionStatus[1].name, newCategoryForBug.resolutionStatus[2].name]);
            // Check if Entering Status is selected
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).count())
                .toEqual(1);
            expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).first().getText())
                .toMatch(actionAttributeData.advancedSettings.actionStatus);
            // Check if current action is displayed in .transition-action
            expect(actionPanels.advancedSettings.flow.getTransitionAction(0).getText())
                .toMatch(actionAttributeData.actionName);
            // Check if .transition-resolution-status-other is currently displayed
            expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(0).getText())
                .toMatch(newCategoryForBug.resolutionStatus[0].name);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=configureWorkflowResolutionStatus.e2e-spec.js.map