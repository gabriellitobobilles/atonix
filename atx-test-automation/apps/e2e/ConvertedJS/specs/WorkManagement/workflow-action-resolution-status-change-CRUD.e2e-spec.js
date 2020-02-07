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
var targetResolution = '2 Target Resolution';
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
            name: '3_reso_' + casual.word,
            actions: [],
        }, {
            name: '4_reso_' + casual.word,
            actions: [],
        }, {
            name: '5_reso_' + casual.word,
            actions: [],
        }],
    issueActivities: {
        open: [{
                type: workflowEditorPage.actionTypes.updateResolutionStatus,
                actionName: 'IssueActivityCloseAction',
                resolutionStatusName: targetResolution,
            }],
        closed: [{
                type: workflowEditorPage.actionTypes.updateResolutionStatus,
                actionName: 'IssueActivityCloseAction',
                resolutionStatusName: targetResolution,
            }],
    },
};
describe('Configure Workflow - Action - Update Resolution Change - CRUD', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToWorkManagementConfigureWorkflow();
        // user.goToWorkManagement();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
        // workflowEditorPage.createCategoryComplete(newCategory);
        // util.getWindowHandles().then((window) => {
        //   browser.close();
        //   browser.switchTo().window(window[0]); // back to Issue Management
        // });
        // helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
        workflowEditorPage.addNewCategoryFn(newCategory);
    });
    it('Update Resolution Change should be present', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionHeader;
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.addNewResolutionStatusBtn.click();
            resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.last();
            updateResolutionStatusName(newCategory.resolutionStatus[0], resolutionHeader);
            addAction(resolutionHeader);
            expect(workflowEditorPage.actionTypeDropDown.getText()).toContain(workflowEditorPage.actionTypes.updateResolutionStatus);
            return [2 /*return*/];
        });
    }); });
    it('new resolution added should appear in the drop down dynamically', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionHeader;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.selectActionTypeFn(workflowEditorPage.actionTypes.updateResolutionStatus);
            resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);
            newCategory.resolutionStatus.forEach(function (resolution, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var currentResolutionStatusName;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(index !== 0)) return [3 /*break*/, 2];
                            helper.clickAndSleep(workflowEditorPage.addNewResolutionStatusBtn, 800);
                            updateResolutionStatusName(resolution, workflowEditorPage.resolutionStatusBtnAll.get(index));
                            return [4 /*yield*/, workflowEditorPage.getResolutionStatusName(workflowEditorPage.resolutionStatusBtnAll.get(index))];
                        case 1:
                            currentResolutionStatusName = _a.sent();
                            expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
                                .toContain(currentResolutionStatusName.trim());
                            expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
                                .toContain(resolution.name);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
                .not.toContain(newCategory.resolutionStatus[0].name);
            return [2 /*return*/];
        });
    }); });
    it('Target resolution drop down should update after deleting a resolution status', function () {
        var resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);
        deleteResolution(4);
        expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
            .not.toContain(newCategory.resolutionStatus[4].name);
    });
    it('Target resolution drop down should update after deleting selected status', function () {
        var resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);
        deleteResolution(1);
        expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
            .not.toContain(newCategory.resolutionStatus[1].name);
    });
    it('update target Resolution and save. Change should retain', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatuses, resolutionHeader, resolution1, workflowActions;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resolutionStatuses = newCategory.resolutionStatus;
                    resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);
                    workflowEditorPage.selectTargetResolutionName(resolutionHeader.$$(workflowEditorPage.targetResolutionStatusDropdownStr).last(), resolutionStatuses[3].name);
                    workflowEditorPage.saveCategory();
                    resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
                    helper.clickAndSleep(resolution1, 2000);
                    return [4 /*yield*/, workflowEditorPage.getAllActions(resolutionHeader)];
                case 1:
                    workflowActions = _a.sent();
                    expect(workflowActions[0].name).toContain("New Action - Update Resolution Status");
                    expect(workflowActions[0].actions[0].settingsForm).toContain("Action Type: " + workflowEditorPage.actionTypes.updateResolutionStatus);
                    expect(workflowActions[0].actions[0].settingsForm).toContain("Action Name: New Action");
                    expect(workflowActions[0].actions[0].settingsForm).toContain("Resolution Status Name: " + resolutionStatuses[3].name);
                    return [2 /*return*/];
            }
        });
    }); });
});
function setResolutionStatusAndSave(resolutionStatusName) {
    issueSnapshotPage.setResolutionStatus(resolutionStatusName);
    issueSnapshotPage.saveIssueBtn.click();
    return issueSnapshotPage.getToastMessage();
}
function updateResolutionStatusName(resolutionStatusObj, resolutionHeader) {
    workflowEditorPage.resolutionHeaderButtonPress(resolutionHeader, 'edit'); // edit
    var resolutionElemTxt = resolutionHeader.$(workflowEditorPage.resolutionStatusNameSelectorStr);
    helper.waitForVisible(resolutionElemTxt);
    helper.clearAndSendKeys(resolutionElemTxt, resolutionStatusObj.name);
    workflowEditorPage.resolutionHeaderButtonPress(resolutionHeader, 'edit'); // save
    protractor_1.browser.sleep(500);
}
function addAction(resolutionHeader) {
    resolutionHeader.click(); // expand resolution
    protractor_1.browser.actions().mouseMove(resolutionHeader.$("[title=\"Add Action\"]")).perform();
    helper.waitAndClick(resolutionHeader.$("[title=\"Add Action\"]")); // CLICK ADD ACTION BUTTON
    var groupStatusActions = workflowEditorPage.getActionHeaderAll(resolutionHeader);
    groupStatusActions.last().click(); // EXPAND EMAIL/ATTRIBUTE ACTION PAN
    helper.waitForVisible(workflowEditorPage.actionTypeDropDown);
}
function deleteResolution(idx) {
    var resolutionStatuses = workflowEditorPage.resolutionStatusBtnAll;
    workflowEditorPage.deleteResolutionStatus(resolutionStatuses.get(idx));
    protractor_1.browser.sleep(1000);
}
//# sourceMappingURL=workflow-action-resolution-status-change-CRUD.e2e-spec.js.map