"use strict";
/**
 * Test Case: 1968=5
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19685
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var protractor_1 = require("protractor");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var helper = new helper_1.Helper();
var newCategory = tslib_1.__assign({}, testDetails_data_1.categoryData);
newCategory.resolutionStatus[0].actions = []; // empty Resolution Actions since not needed
describe('Configure Workflow - Issue Activity Closed', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // console.log(JSON.stringify(newCategory))
            user.logIn(testDetails_data_1.userObj);
            user.goToWorkManagementConfigureWorkflow();
            helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
            workflowEditorPage.addNewCategoryFn(newCategory);
            // console.log(`Category to create: `, newCategory)
            // Need to add two resolution status as per category requirement.
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
            return [2 /*return*/];
        });
    }); });
    it('Verify Action Type drop down list & ensure user is able to select', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var issueActivityClosedBtn;
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
            issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed');
            issueActivityClosedBtn.click();
            issueActivityClosedBtn.$("[title=\"Add Action\"]").click();
            workflowEditorPage.getActionHeaderAll(issueActivityClosedBtn).first().click();
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
        var issueActivityClosedBtn, issueActivityClosedActions, openEmailData, openAttributeData, actionsFromSiteEmail, actionsFromSiteAttribute;
        return tslib_1.__generator(this, function (_a) {
            issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed');
            // adds new Email action
            workflowEditorPage.addNewAction(issueActivityClosedBtn, 'email', newCategory.issueActivities.closed[0], true);
            // adds new Update Attribute action
            workflowEditorPage.addNewAction(issueActivityClosedBtn, 'attribute', newCategory.issueActivities.closed[1], true);
            // saveAndOpenCategory(newCategory)
            workflowEditorPage.saveCategory();
            expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName, "CategoryName doesn't match  data " + newCategory.categoryName);
            // get the action panels section
            issueActivityClosedBtn.click();
            issueActivityClosedActions = workflowEditorPage.getActionPanelAll(issueActivityClosedBtn);
            issueActivityClosedActions.actionHeader.first().click();
            openEmailData = newCategory.issueActivities.closed[0];
            openAttributeData = newCategory.issueActivities.closed[1];
            actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityClosedBtn, 'email');
            expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(openEmailData.recipient);
            expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(openEmailData.subject);
            expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(openEmailData.messageBody);
            issueActivityClosedActions.actionHeader.last().click();
            actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityClosedBtn, 'attribute');
            expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(openAttributeData.name);
            expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(openAttributeData.value);
            return [2 /*return*/];
        });
    }); });
    it('should Verify delete action feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var issueActivityClosedBtn, actionPanels;
        return tslib_1.__generator(this, function (_a) {
            issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed');
            actionPanels = workflowEditorPage.getActionPanelAll(issueActivityClosedBtn);
            workflowEditorPage.editBtn.click();
            actionPanels.getDeleteBtn(0).click(); // delete first action
            // saveAndOpenCategory(newCategory, true)
            workflowEditorPage.saveCategory(true);
            expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName, "CategoryName doesn't match  data " + newCategory.categoryName);
            issueActivityClosedBtn.click();
            expect(actionPanels.actionHeader.count()).toEqual(1);
            expect(actionPanels.actionHeader.first().getText()).toMatch(newCategory.issueActivities.closed[1].actionName);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=configureWorkflowIssueActivityClosed.e2e-spec.js.map