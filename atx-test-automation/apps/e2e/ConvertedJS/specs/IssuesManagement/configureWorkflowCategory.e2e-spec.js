"use strict";
/**
 * Test Case: 19687
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19687
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var helper = new helper_1.Helper();
var newCategory = Object.create(testDetails_data_1.categoryData);
var newCategory2 = Object.create(testDetails_data_1.categoryData);
newCategory2.issueName = 'Membrane Cleaning';
describe('Issues Management - Configure Workflow - Category', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToIssueManagementConfigureWorkflow();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
    });
    // fit('yoooooo', () => {
    //   user.navigateToApp(appName.issuesManagement)
    //   helper.waitTitleContains(appName.issuesManagement)
    //   browser.waitForAngularEnabled(false)
    //   issueManagementPage.goToConfigureWorkflow()
    //   browser.ignoreSynchronization = true
    //   util.getWindowHandles().then(function(window) {
    //     browser.switchTo().window(window[1])
    //   })
    //   helper.waitForVisible(workflowEditorPage.addCategoryBtn)
    // })
    it('Verify "Save" category button after adding resolution status, Issue Activity Status(Open/Closed)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.createCategoryComplete(newCategory);
            expect(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(2);
            expect(workflowEditorPage.resolutionStatusBtnAll.getText())
                .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);
            checkIssueActivityStatus('Open');
            checkIssueActivityStatus('Closed');
            return [2 /*return*/];
        });
    }); });
    it('Verify "Cancel" button after adding all details & without adding all details.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.selectClassByName(newCategory2.issueName);
            workflowEditorPage.addNewCategoryFn(newCategory2);
            helper.clickAndSleep(workflowEditorPage.cancelBtn);
            expect(workflowEditorPage.saveBtn.isDisplayed()).toBeFalsy();
            expect(workflowEditorPage.cancelBtn.isDisplayed()).toBeFalsy();
            expect(workflowEditorPage.contentHolder.isDisplayed())
                .toBeFalsy('Did not load empty state after cancel');
            return [2 /*return*/];
        });
    }); });
});
function checkIssueActivityStatus(statusType) {
    var issueActivityBtn = workflowEditorPage.getIssueActivityPanel(statusType);
    // get the action panels section
    issueActivityBtn.click();
    var issueActivityActions = workflowEditorPage.getActionPanelAll(issueActivityBtn);
    issueActivityActions.actionHeader.first().click();
    // returns the action section and it's details inside <.select-settings> tag
    // Need to check this from time to time, this changed before
    var emailData, attributeData;
    if (statusType === 'Open') {
        emailData = newCategory.issueActivities.open[0];
        attributeData = newCategory.issueActivities.open[1];
    }
    else if (statusType === 'Closed') {
        emailData = newCategory.issueActivities.closed[0];
        attributeData = newCategory.issueActivities.closed[1];
    }
    var actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityBtn, 'email');
    expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(emailData.recipient);
    expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(emailData.subject);
    expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(emailData.messageBody);
    issueActivityActions.actionHeader.last().click();
    var actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityBtn, 'attribute');
    expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(attributeData.name);
    expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(attributeData.value);
}
//# sourceMappingURL=configureWorkflowCategory.e2e-spec.js.map