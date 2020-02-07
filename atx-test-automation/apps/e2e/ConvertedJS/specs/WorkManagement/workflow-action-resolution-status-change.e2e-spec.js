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
var date = new Date();
var issueNumber; // used when issue is created
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var updateResolutionStatus = workflowEditorPage.actionTypes.updateResolutionStatus;
var targetResolution = 'Target Resolution';
var newCategory = {
    categoryName: 'ResolutionChange_' + casual.word + '_' + date.getTime(),
    issueName: 'Membrane Cleaning',
    assetName: ['Generic Station Group'],
    resolutionStatus: [{
            name: '1_reso_' + casual.word,
            actions: [],
        }, {
            name: targetResolution,
            actions: []
        },
        {
            name: '3_reso_Entering_' + casual.word,
            actions: [
                {
                    // type: 'updateResolutionStatus',
                    type: updateResolutionStatus,
                    actionName: '1_action_' + casual.word,
                    resolutionStatusName: targetResolution,
                    advancedSettings: {
                        actionStatus: actionStatus.entering,
                    },
                }
            ],
        }, {
            name: '4_reso_Leaving_' + casual.word,
            actions: [
                {
                    // type: 'updateResolutionStatus',
                    type: updateResolutionStatus,
                    actionName: '2_action_' + casual.word,
                    resolutionStatusName: targetResolution,
                    advancedSettings: {
                        actionStatus: actionStatus.leaving,
                    },
                }
            ],
        }],
    issueActivities: {
        open: [{
                // type: 'updateResolutionStatus',
                type: updateResolutionStatus,
                actionName: 'IssueActivityCloseAction',
                resolutionStatusName: targetResolution,
            }],
        closed: [{
                // type: 'updateResolutionStatus',
                type: updateResolutionStatus,
                actionName: 'IssueActivityCloseAction',
                resolutionStatusName: targetResolution,
            }],
    },
};
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
describe('Configure Workflow - Update Resolution Action', function () {
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
    describe('Resolution Status', function () {
        it('Entering status should trigger resolution status change', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                setResolutionStatusAndSave(newCategory.resolutionStatus[2].name);
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it('Leaving status should trigger resolution status change', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
                protractor_1.browser.refresh();
                helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeFalsy();
                setResolutionStatusAndSave(newCategory.resolutionStatus[3].name);
                setResolutionStatusAndSave(newCategory.resolutionStatus[0].name);
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeTruthy();
                return [2 /*return*/];
            });
        }); });
    });
    describe('Issue Activity', function () {
        it('Issue Activity Close should trigger resolution status change', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
                protractor_1.browser.refresh();
                helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeFalsy();
                issueSnapshotPage.setIssueStatus('Closed');
                issueSnapshotPage.saveIssueBtn.click();
                issueSnapshotPage.getToastMessage();
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it('Issue Activity Open should trigger resolution status change', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
                protractor_1.browser.refresh();
                helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeFalsy();
                issueSnapshotPage.setIssueStatus("Open");
                issueSnapshotPage.saveIssueBtn.click();
                issueSnapshotPage.getToastMessage();
                expect(issueSnapshotPage.resolutionStatusDropdown.$("[label=\"" + targetResolution + "\"]").isSelected())
                    .toBeTruthy();
                return [2 /*return*/];
            });
        }); });
    });
});
function setResolutionStatusAndSave(resolutionStatusName) {
    issueSnapshotPage.setResolutionStatus(resolutionStatusName);
    issueSnapshotPage.saveIssueBtn.click();
    return issueSnapshotPage.getToastMessage();
}
//# sourceMappingURL=workflow-action-resolution-status-change.e2e-spec.js.map