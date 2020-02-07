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
var interface_1 = require("../../helpers/interface");
var issueSnapshot_task_fillIssueForm_1 = require("../../page/issueSnapshot.task.fillIssueForm");
var issueManagemwentPage = new Pages.IssueManagement();
var issueSnapshotPage = new Pages.IssueSnapshot();
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var date = new Date();
var newCategory = generateCategory();
var newCategory2 = generateCategory();
newCategory2.categoryName = casual.word + '_' + casual.word + '_' + casual.date();
newCategory2.resolutionStatus[0] = newCategory.resolutionStatus[1];
newCategory2.resolutionStatus[1] = newCategory.resolutionStatus[0];
var issueCreateData = generateIssue(newCategory);
var gbl_ctr = 1;
describe('BUG 31975 - Configure Workflow - Email Override on First Save', function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var tabWindow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.logIn(testDetails_data_1.userObj);
                    user.goToWorkManagementConfigureWorkflow();
                    helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
                    workflowEditorPage.createCategoryComplete(newCategory);
                    util.getWindowHandles().then(function (window) {
                        protractor_1.browser.close();
                        protractor_1.browser.switchTo().window(window[0]); // back to Issue Management
                    });
                    helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
                    issueManagemwentPage.openNewItemBtn.click();
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[1]);
                    createIssue(issueCreateData, 'WM');
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Entering', function () {
        it('email override should pop up on ENTERING', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var recipients;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
                        return [4 /*yield*/, issueSnapshotPage.emailPopUpRecipients.getAttribute('value')];
                    case 1:
                        recipients = _a.sent();
                        expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
                        expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[0].actions[0].actionName);
                        expect(recipients.trim())
                            .toEqual(newCategory.resolutionStatus[0].actions[0].recipient + ';');
                        expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[0].actions[0].subject);
                        issueSnapshotPage.emailCancelBtn.click();
                        expect(issueSnapshotPage.getToastMessage()).toEqual("Not able to save Item");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Leaving', function () {
        it('email override should pop up on LEAVING', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var recipients;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
                        issueSnapshotPage.saveIssueBtn.click();
                        protractor_1.browser.sleep(5000);
                        issueSnapshotPage.getToastMessage();
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[2].name);
                        helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 10000);
                        return [4 /*yield*/, issueSnapshotPage.emailPopUpRecipients.getAttribute('value')];
                    case 1:
                        recipients = _a.sent();
                        expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
                        expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[1].actions[0].actionName);
                        expect(recipients.trim())
                            .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
                        expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[1].actions[0].subject);
                        issueSnapshotPage.emailSendBtn.click();
                        expect(issueSnapshotPage.getToastMessage()).toEqual("Item Saved");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
function generateCategory() {
    return {
        categoryName: "xxxEmailNewSaveBug" + '_' + casual.word + '_' + date.getTime(),
        issueName: 'Membrane Cleaning',
        assetName: ['Generic Station Group'],
        resolutionStatus: [{
                name: '_reso_Entering_' + casual.word,
                actions: [
                    {
                        type: 'email',
                        actionName: '1_action_Entering ' + casual.word,
                        recipient: testDetails_data_1.userObj.email,
                        subject: "Sorry for the spam 1 - " + casual.word,
                        messageBody: "Automation test for bug 31127",
                        allowOverride: true,
                        advancedSettings: {
                            actionStatus: actionStatus.entering,
                        },
                    }
                ],
            }, {
                name: '_reso_Leaving_' + casual.word,
                actions: [
                    {
                        type: 'email',
                        actionName: '2_action_Leaving ' + casual.word,
                        recipient: testDetails_data_1.userObj.email,
                        subject: 'Sorry for the spam 2 -' + casual.word,
                        messageBody: "Automation test for bug 31127",
                        allowOverride: true,
                        advancedSettings: {
                            actionStatus: actionStatus.leaving,
                        },
                    }
                ],
            }, {
                name: "3_reso Nothing Here",
                actions: []
            }],
        issueActivities: {
            open: [],
            closed: []
        }
    };
}
function generateIssue(category) {
    return {
        issueClass: category.issueName,
        issueCategory: category.categoryName,
        issueInfo: {
            name: casual.word + casual.title,
            priority: interface_1.PriorityValues.Low,
            status: 'Open',
            resolution: category.resolutionStatus[0].name,
            showOnScorecard: true,
            shortSummary: casual.short_description,
        },
    };
}
function createIssue(issueData, type) {
    if (type === void 0) { type = 'IM'; }
    // this is copied from user.createNewIssue(). This doesn't have issueSnapShotPage.saveIssueBtn.click line
    var fillIssue = new issueSnapshot_task_fillIssueForm_1.FillIssueForm();
    var deleteBtn = (type === 'IM') ? issueSnapshotPage.deleteIssueBtn : issueSnapshotPage.deleteItemBtn;
    issueSnapshotPage.issueClassDropdown.$("[label=\"" + issueData.issueClass + "\"]").click();
    if (issueData.issueCategory !== null) {
        helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$("[label=\"" + issueData.issueCategory + "\"]"));
    }
    else {
        helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$$("option").get(1));
    }
    issueSnapshotPage.createNewIssueBtn.click();
    helper.waitForDisappear(protractor_1.$(".modal-content"));
    protractor_1.browser.sleep(3000);
    fillIssue.fillIssue(issueData, type);
}
//# sourceMappingURL=workflow-email-override-new-issue-save-bug-31975.e2e.spec.js.map