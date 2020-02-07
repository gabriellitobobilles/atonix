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
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var helper = new helper_1.Helper();
var date = new Date();
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var newCategory = generateCategory();
describe('Workflow - Email Action', function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToIssueManagementConfigureWorkflow();
        helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
        workflowEditorPage.addNewCategoryFn(newCategory);
    });
    it('Email Action fields should be present', function () {
        workflowEditorPage.addNewResolutionStatusBtn.click();
        var resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.last();
        resolutionHeader.click();
        helper.waitAndClick(resolutionHeader.$("[title=\"Add Action\"]"));
        workflowEditorPage.getActionHeaderAll(resolutionHeader).first().click();
        var actionTypes = workflowEditorPage.actionTypes;
        workflowEditorPage.selectActionTypeFn(actionTypes.email);
        expect(workflowEditorPage.actionEmailFormObj.actionNameTxt.last().isPresent()).toBeTruthy();
        expect(workflowEditorPage.actionEmailFormObj.recipientTxt.last().isPresent()).toBeTruthy();
        expect(workflowEditorPage.actionEmailFormObj.messageBody.last().isPresent()).toBeTruthy();
        expect(workflowEditorPage.actionEmailFormObj.allowOverride.last().isPresent()).toBeTruthy();
        helper.clickAndSleep(workflowEditorPage.deleteActionBtn, 3000); // delete action for next step
        workflowEditorPage.deleteResolutionStatus(workflowEditorPage.resolutionStatusBtnAll.last());
    });
    it('should be able to add Resolution status with Email action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resolutionStatuses, resolutioinDetails;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    workflowEditorPage.createCategoryComplete(newCategory);
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
                        });
                    });
                    expect(resolutioinDetails.length)
                        .toEqual(resolutionStatuses.length, "Resolution Status should be equal to " + resolutionStatuses.length);
                    return [2 /*return*/];
            }
        });
    }); });
});
function generateCategory() {
    return {
        categoryName: "EmailNewSaveBug" + '_' + casual.word + '_' + date.getTime(),
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
//# sourceMappingURL=workflow-email-action.e2e-spec.js.map