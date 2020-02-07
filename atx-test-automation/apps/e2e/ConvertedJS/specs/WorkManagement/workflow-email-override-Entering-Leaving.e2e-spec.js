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
var issueManagemwentPage = new Pages.IssueManagement();
var issueSnapshotPage = new Pages.IssueSnapshot();
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var issueNumber; // used when issue is created
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var newCategory = tslib_1.__assign({}, testDetails_data_1.categoryData);
// newCategory.categoryName = `testEmailPopUp`;
newCategory.issueName = 'Pole Attachment Program';
newCategory.resolutionStatus[0].name = "1_reso";
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1] = {
    name: '2_reso_Entering_' + casual.word,
    // name: `2_reso_Entering`,
    actions: [
        {
            type: 'email',
            actionName: '1_action_' + casual.word,
            // actionName: `1_action_reiciendis`,
            recipient: testDetails_data_1.userObj.email,
            subject: "Sorry for the spam 1 - " + casual.word,
            // subject: `Sorry for the spam 1`,
            messageBody: "Test Body 1",
            allowOverride: true,
            advancedSettings: {
                actionStatus: actionStatus.entering,
            },
        }
    ],
};
newCategory.resolutionStatus[2] = {
    name: '3_reso_Leaving_' + casual.word,
    // name: `3_reso_Leaving`,
    actions: [
        {
            type: 'email',
            actionName: '1_action_' + casual.word,
            // actionName: '1_action_sequi',
            recipient: testDetails_data_1.userObj.email,
            // subject: `Sorry for the spam 2`,
            subject: 'Sorry for the spam 2 -' + casual.word,
            // messageBody: casual.sentence,
            messageBody: 'Test Body 2',
            allowOverride: true,
            advancedSettings: {
                actionStatus: actionStatus.leaving,
            },
        }
    ],
};
newCategory.issueActivities.open = [];
newCategory.issueActivities.closed = [];
var issueCreateData = {
    issueClass: newCategory.issueName,
    issueCategory: newCategory.categoryName,
    issueInfo: {
        name: casual.word + casual.title,
        priority: interface_1.PriorityValues.Low,
        status: 'Open',
        resolution: newCategory.resolutionStatus[0].name,
        showOnScorecard: true,
        shortSummary: casual.short_description,
    },
};
describe('Configure Workflow - Email Override', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToWorkManagementConfigureWorkflow();
        // user.goToWorkManagement();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
        workflowEditorPage.createCategoryComplete(newCategory);
        util.getWindowHandles().then(function (window) {
            protractor_1.browser.close();
            protractor_1.browser.switchTo().window(window[0]); // back to Issue Management
        });
        helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
    });
    it('create issue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var tabWindow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    issueManagemwentPage.openNewItemBtn.click();
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[1]);
                    return [4 /*yield*/, user.createNewIssue(issueCreateData, 'WM')];
                case 2:
                    issueNumber = _a.sent();
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
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
                        helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
                        return [4 /*yield*/, issueSnapshotPage.emailPopUpRecipients.getAttribute('value')];
                    case 1:
                        recipients = _a.sent();
                        expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
                        expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[1].actions[0].actionName);
                        expect(recipients.trim())
                            .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
                        expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[1].actions[0].subject);
                        return [2 /*return*/];
                }
            });
        }); });
        it('cancel will not save issue and not send email', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                issueSnapshotPage.emailCancelBtn.click();
                expect(issueSnapshotPage.getToastMessage()).toEqual("Not able to save Item");
                helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 15000);
                expect(issueSnapshotPage.getSelectedResolutionStatus()).toEqual(newCategory.resolutionStatus[0].name);
                return [2 /*return*/];
            });
        }); });
        it('issue is saved and email is sent', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
                issueSnapshotPage.emailSendBtn.click();
                expect(issueSnapshotPage.getToastMessage()).toEqual("Item Saved");
                return [2 /*return*/];
            });
        }); });
        it('discussion entry should appear', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var discussionEntries;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, issueSnapshotPage.getAllDiscussionEntryDetailsElem()];
                    case 1:
                        discussionEntries = _a.sent();
                        expect(discussionEntries.length).toEqual(1);
                        discussionEntries.forEach(function (discussion, index) {
                            expect(discussion.header).toContain("Email Sent AtonixQATeam@BlackandVeatch.onmicrosoft.com");
                            expect(discussion.body).toContain("by AtonixQATeam@BlackandVeatch.onmicrosoft.com");
                            expect(discussion.body).toContain("Action Name: " + newCategory.resolutionStatus[index + 1].actions[0].actionName);
                            expect(discussion.body).toContain("Subject: " + newCategory.resolutionStatus[index + 1].actions[0].subject);
                            expect(discussion.body).toContain(newCategory.resolutionStatus[index + 1].actions[0].messageBody);
                        });
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
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[2].name);
                        issueSnapshotPage.saveIssueBtn.click();
                        issueSnapshotPage.getToastMessage();
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[0].name);
                        helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 10000);
                        return [4 /*yield*/, issueSnapshotPage.emailPopUpRecipients.getAttribute('value')];
                    case 1:
                        recipients = _a.sent();
                        expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
                        expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[2].actions[0].actionName);
                        expect(recipients.trim())
                            .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
                        expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[2].actions[0].subject);
                        return [2 /*return*/];
                }
            });
        }); });
        it('issue is saved and email is sent', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                issueSnapshotPage.emailSendBtn.click();
                expect(issueSnapshotPage.getToastMessage()).toEqual("Item Saved");
                return [2 /*return*/];
            });
        }); });
        it('discussion entry should appear', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var discussionEntries;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, issueSnapshotPage.getAllDiscussionEntryDetailsElem()];
                    case 1:
                        discussionEntries = _a.sent();
                        discussionEntries.reverse(); // reverse the array of discussions since it's newest first
                        expect(discussionEntries.length).toEqual(2, "Total discussion entries is not equal");
                        discussionEntries.forEach(function (discussion, index) {
                            expect(discussion.header).toContain("Email Sent AtonixQATeam@BlackandVeatch.onmicrosoft.com");
                            expect(discussion.body).toContain("by AtonixQATeam@BlackandVeatch.onmicrosoft.com");
                            expect(discussion.body).toContain("Action Name: " + newCategory.resolutionStatus[index + 1].actions[0].actionName);
                            expect(discussion.body).toContain("Subject: " + newCategory.resolutionStatus[index + 1].actions[0].subject);
                            expect(discussion.body).toContain(newCategory.resolutionStatus[index + 1].actions[0].messageBody);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=workflow-email-override-Entering-Leaving.e2e-spec.js.map