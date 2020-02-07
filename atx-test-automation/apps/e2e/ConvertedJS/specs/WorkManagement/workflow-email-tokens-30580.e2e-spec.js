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
var assetExplorerPage = new Pages.AssetExplorer();
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var date = new Date();
var attributesInAE;
var emailPopUpDetails1;
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var issueNumber;
var newCategory = tslib_1.__assign({}, testDetails_data_1.categoryData);
newCategory.categoryName = "EmailToken_" + casual.word + '_' + date.getTime();
newCategory.issueName = 'Pole Attachment Program';
newCategory.assetName = [];
newCategory.resolutionStatus[0].name = "1_reso";
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1] = {
    name: '2_reso_Entering_' + casual.word,
    actions: [
        {
            type: 'email',
            actionName: '1_action_' + casual.word,
            recipient: "ngomez@fullscale.io",
            subject: "Sorry for the spam 1 - " + casual.word,
            messageBody: "Line 1<br>\nLine 2<br>\nLine 3",
            allowOverride: true,
            advancedSettings: {
                actionStatus: actionStatus.entering,
            },
        }
    ],
};
newCategory.resolutionStatus[2] = {
    name: '3_reso_Leaving_' + casual.word,
    actions: [
        {
            type: 'email',
            actionName: '1_action_' + casual.word,
            recipient: "ngomez@fullscale.io",
            subject: 'Sorry for the spam 2 -' + casual.word,
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
var clientToUse = {
    parent: 'SEKOIA Demo Clients',
    child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P.5 - Country Lane']
};
var assetAtt = {
    name: casual.word + " " + casual.word,
    value: casual.sentence,
    editted_value: 'Editted Test Value',
    attributeType: interface_1.AttributeTypesEnum['Freeform Text'],
    favorite: true
};
describe('Workflow - Email Token', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.assetExplorer);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.assetExplorer);
        addAttributeAndCreateWFCategory();
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
        it('email attributes should appear correctly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var resolutionEntering;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
                        helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
                        return [4 /*yield*/, issueSnapshotPage.getEmailPopUpDetails()];
                    case 1:
                        emailPopUpDetails1 = _a.sent();
                        resolutionEntering = newCategory.resolutionStatus[1];
                        expect(emailPopUpDetails1.actionName).toEqual(resolutionEntering.actions[0].actionName);
                        expect(emailPopUpDetails1.recipients.trim()).toEqual(resolutionEntering.actions[0].recipient + ";");
                        expect(emailPopUpDetails1.subject).toEqual(resolutionEntering.actions[0].subject);
                        emailPopUpDetails1.body.forEach(function (item, index) {
                            expect(item).toEqual(attributesInAE.attributes[index] + ": " + attributesInAE.values[index]);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('email is sent and discussion is displayed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var discussionEntries;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issueSnapshotPage.emailSendBtn.click();
                        expect(issueSnapshotPage.getToastMessage()).toEqual("Item Saved");
                        return [4 /*yield*/, issueSnapshotPage.getAllDiscussionEntryDetailsElem()];
                    case 1:
                        discussionEntries = _a.sent();
                        expect(discussionEntries.length).toEqual(1);
                        discussionEntries.forEach(function (discussion, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var msgBodyToAssert, tempBody;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        msgBodyToAssert = formatForAssertDiscussionEmailBody(testDetails_data_1.userObj.email, emailPopUpDetails1);
                                        expect(discussion.header).toContain("Email Sent " + testDetails_data_1.userObj.email);
                                        return [4 /*yield*/, discussion.body];
                                    case 1:
                                        tempBody = _a.sent();
                                        tempBody.forEach(function (item, idx) {
                                            expect(item).toEqual(msgBodyToAssert[idx].trim());
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // it('should be able to display new attribtue', () => {
    // });
    // it('should be able to display FREEFORM TEXT attribtue', () => {
    // });
    // it('should be able to display INT attribtue', () => {
    // });
    // it('should be able to display FLOAT attribtue', () => {
    // });
    // it('should be able to display BOOLEAN attribtue', () => {
    // });
    // it('should be able to display DATE attribtue', () => {
    // });
    // it('should be able to display attribtue name with spaces', () => {
    // });
});
// format message body to be saved in workflow editor email action
function formatMessageBody(attributesAndValues) {
    var attrCount = attributesAndValues.attributes.length; // might use this to limit the attributes to be displayed
    var messageBodyArr = [];
    var messageBodyToSend = '';
    attributesAndValues.attributes.forEach(function (attribute, index) {
        messageBodyArr.push({
            attribute: attribute,
            value: attributesAndValues.values[index]
        });
    });
    messageBodyArr.forEach(function (attrItem) {
        messageBodyToSend = messageBodyToSend + (attrItem.attribute + ": {{" + attrItem.attribute + "}}<br>");
    });
    return messageBodyToSend;
}
function addAttribute() {
    assetExplorerPage.addAttribute(assetAtt);
    protractor_1.browser.sleep(2000);
    helper.waitAndClick(assetExplorerPage.saveAssetBtn);
    assetExplorerPage.waitForSpinner();
    assetExplorerPage.waitForToastMessage();
}
function addAttributeAndCreateWFCategory() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var msgBody;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assetExplorerPage.getAttributesValueColumn('Attribute')];
                case 1:
                    attributesInAE = _a.sent();
                    attributesInAE.attributes.push(assetAtt.name);
                    attributesInAE.values.push(assetAtt.value);
                    attributesInAE.attributes.push('invalidAttribute'); // add invalid attribute
                    attributesInAE.values.push('N/A');
                    addAttribute();
                    msgBody = formatMessageBody(attributesInAE);
                    newCategory.resolutionStatus[1].actions[0].messageBody = msgBody;
                    user.goToWorkManagementConfigureWorkflow();
                    helper.selectClient('SEKOIA Demo Clients', 'UGM Historical Reliability Plan');
                    workflowEditorPage.createCategoryComplete(newCategory);
                    util.getWindowHandles().then(function (window) {
                        protractor_1.browser.close();
                        protractor_1.browser.switchTo().window(window[0]); // back to Issue Management
                    });
                    helper.selectClientMain(clientToUse.parent, ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P.5 - Country Lane'], testDetails_data_1.appName.issuesManagement);
                    return [2 /*return*/];
            }
        });
    });
}
// format use to assert Email Pop Up details === discussion entry
function formatForAssertDiscussionEmailBody(userEmail, emailDetailsFromPopUp) {
    var actionName = emailDetailsFromPopUp.actionName, recipients = emailDetailsFromPopUp.recipients, subject = emailDetailsFromPopUp.subject, body = emailDetailsFromPopUp.body;
    var msgBodyToAssert = [];
    msgBodyToAssert.push("by " + userEmail);
    msgBodyToAssert.push("Action Name: " + actionName);
    msgBodyToAssert.push("Recipients: " + recipients);
    msgBodyToAssert.push("Subject: " + subject);
    var tempBody = '';
    body.forEach(function (item) {
        tempBody = tempBody + item + '\n';
    });
    msgBodyToAssert.push("Message Body: " + tempBody.trim());
    return msgBodyToAssert;
}
//# sourceMappingURL=workflow-email-tokens-30580.e2e-spec.js.map