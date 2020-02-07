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
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var casual = require("casual");
var utils_1 = require("../../helpers/utils");
var protractor_1 = require("protractor");
var interface_1 = require("../../helpers/interface");
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var issueManagemwentPage = new Pages.IssueManagement();
var issueSnapshotPage = new Pages.IssueSnapshot();
var helper = new helper_1.Helper();
var date = new Date();
var util = new utils_1.Utils();
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var newCategory = generateCategory();
var issueCreateData = generateIssue(newCategory);
describe('Workflow - Email Action', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToWorkManagementConfigureWorkflow();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
        workflowEditorPage.createCategoryComplete(newCategory);
    });
    it('should be able to add Resolution status with Email attachments', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatuses, resolutioinDetails;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resolutionStatuses = newCategory.resolutionStatus;
                    return [4 /*yield*/, workflowEditorPage.getAllActions()];
                case 1:
                    resolutioinDetails = _a.sent();
                    resolutioinDetails.forEach(function (resolution, idx) {
                        expect(resolution.name).toEqual(resolutionStatuses[idx].name);
                        resolution.actions.forEach(function (actions, actionIdx) {
                            expect(actions.headerTitle)
                                .toEqual(resolutionStatuses[idx].actions[actionIdx].actionName + " - " + workflowEditorPage.actionTypes.email);
                            expect(actions.type).toContain("Action Type: " + workflowEditorPage.actionTypes.email);
                            expect(actions.actionName).toContain("Action Name: " + resolutionStatuses[idx].actions[actionIdx].actionName);
                            expect(actions.recipients).toContain("Recipients: " + resolutionStatuses[idx].actions[actionIdx].recipient);
                            expect(actions.subject).toContain("Subject: " + resolutionStatuses[idx].actions[actionIdx].subject);
                            expect(actions.messageBody).toContain("Message Body: " + resolutionStatuses[idx].actions[actionIdx].messageBody);
                            expect(actions.allowOverride).toContain("Allow Override: " + resolutionStatuses[idx].actions[actionIdx].allowOverride);
                            var emailAttachments = resolutionStatuses[idx].actions[actionIdx].attachments;
                            if (emailAttachments.length > 1) {
                                emailAttachments = emailAttachments.map(function (x) { return x.split('/')[6]; });
                            }
                            emailAttachments.unshift('Attachments:   (Max 20MB)');
                            if (emailAttachments.length === 1) {
                                emailAttachments.push("<none>");
                            }
                            var attachmentsFromWF = actions.attachments.split(/\n/);
                            expect(emailAttachments).toEqual(attachmentsFromWF);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to view email attachments in Issue Snapshot', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var filesFromPopUp, emailAttachments;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closeWindowAndSwitch();
                    addNewIssue();
                    user.createNewIssue(issueCreateData, 'WM', false);
                    issueSnapshotPage.saveIssueBtn.click();
                    return [4 /*yield*/, issueSnapshotPage.getAttachmentsFileName()];
                case 1:
                    filesFromPopUp = _a.sent();
                    emailAttachments = newCategory.resolutionStatus[0].actions[0].attachments;
                    filesFromPopUp = filesFromPopUp.map(function (filename) { return filename.split(':')[1]; });
                    emailAttachments = emailAttachments.map(function (x) { return x.split('/')[6]; });
                    expect(filesFromPopUp).toEqual(emailAttachments);
                    return [2 /*return*/];
            }
        });
    }); });
});
function closeWindowAndSwitch() {
    util.getWindowHandles().then(function (window) {
        protractor_1.browser.sleep(2000);
        protractor_1.browser.close();
        protractor_1.browser.switchTo().window(window[0]); // back to Issue Management
    });
}
function addNewIssue() {
    helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
    issueManagemwentPage.openNewItemBtn.click();
    util.getWindowHandles().then(function (window) { return protractor_1.browser.switchTo().window(window[1]); });
}
function generateCategory() {
    var file = "./apps/e2e/src/test_Data/workflow/";
    return {
        categoryName: "Email Attachment" + '_' + casual.word + '_' + date.getTime(),
        issueName: 'Membrane Cleaning',
        assetName: ['Generic Station Group'],
        resolutionStatus: [{
                name: '1_reso_Entering_' + casual.word,
                actions: [
                    {
                        type: 'email',
                        actionName: '1_action_Entering ' + casual.word,
                        recipient: testDetails_data_1.userObj.email,
                        subject: "Sorry for the spam 1 - " + casual.word,
                        messageBody: casual.sentence,
                        allowOverride: true,
                        attachments: [file + "1.jpg", file + "2.png", file + "3.jpg", file + "4.jpg", file + "5.png"],
                        advancedSettings: {
                            actionStatus: actionStatus.entering,
                        },
                    }
                ],
            }, {
                name: '2_reso_Leaving_' + casual.word,
                actions: [
                    {
                        type: 'email',
                        actionName: '2_action_Leaving ' + casual.word,
                        recipient: testDetails_data_1.userObj.email,
                        subject: 'Sorry for the spam 2 -' + casual.word,
                        messageBody: casual.sentence,
                        allowOverride: true,
                        attachments: [],
                        advancedSettings: {
                            actionStatus: actionStatus.leaving,
                        },
                    }
                ],
            }, {
                name: "3_reso Nothing Here",
                actions: [],
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
//# sourceMappingURL=workflow-email-attachment.e2e-spec.js.map