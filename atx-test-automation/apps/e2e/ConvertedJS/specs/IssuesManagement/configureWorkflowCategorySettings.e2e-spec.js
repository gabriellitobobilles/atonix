"use strict";
/**
 * Test Case: 19686
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19686
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
var actionStatus = {
    entering: 'Entering',
    leaving: 'Leaving',
};
var newCategory = Object.create(testDetails_data_1.categoryData);
newCategory.issueName = 'Compliance';
newCategory.assetName = ['Generic Station Group', 'Generic Station'];
newCategory.resolutionStatus[0].actions = [];
newCategory.issueActivities.open = [{
        type: 'email',
        actionName: '1_action_' + casual.word,
        recipient: testDetails_data_1.userObj.email,
        subject: casual.word,
        messageBody: casual.sentence,
        advancedSettings: {
            actionStatus: actionStatus.entering,
        },
    }, {
        type: 'attribute',
        actionName: "2_action_" + casual.word,
        name: casual.word,
        value: "value_" + casual.random,
        advancedSettings: {
            actionStatus: actionStatus.leaving,
        },
    }];
var categorySettings = workflowEditorPage.categorySettings;
describe('Issues Management - Configure Workflow - Category Settings', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
            user.logIn(testDetails_data_1.userObj);
            user.goToIssueManagementConfigureWorkflow();
            helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
            return [2 /*return*/];
        });
    }); });
    it('Ensure user is able to see Category Name & Issue class (which was selected in Select Category)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.addNewCategoryFn(newCategory);
            // console.log(`Category to create: `, newCategory)
            // Need to add two resolution status as per category requirement.
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
            workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
            workflowEditorPage.saveCategory();
            categorySettings.categorySetingsBtn.click();
            expect(categorySettings.categoryName.getText()).toMatch(newCategory.categoryName);
            expect(categorySettings.issueClass.getText()).toMatch(newCategory.issueName);
            return [2 /*return*/];
        });
    }); });
    it('Ensure user is able to access asset classes.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            expect(categorySettings.assetClassesList.count()).toEqual(2);
            expect(categorySettings.assetClassesList.getText())
                .toEqual([newCategory.assetName[0], newCategory.assetName[1]]);
            return [2 /*return*/];
        });
    }); });
    it('BUG - should be able to modify asset classes and display properly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetClassEdit;
        return tslib_1.__generator(this, function (_a) {
            workflowEditorPage.editBtn.click();
            assetClassEdit = ['Generic Station Group',
                'Other/Unknown Unit Type', 'Solid Fuel Thermal Unit'];
            workflowEditorPage.selectAssetClass(assetClassEdit);
            workflowEditorPage.categoryTitle.click(); // close
            workflowEditorPage.saveCategory(true);
            categorySettings.categorySetingsBtn.click();
            expect(categorySettings.assetClassesList.count()).toEqual(3);
            expect(categorySettings.assetClassesList.getText())
                .toEqual([newCategory.assetName[1], assetClassEdit[1], assetClassEdit[2]]);
            return [2 /*return*/];
        });
    }); });
    it('Verify "Close" button.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            helper.clickAndSleep(categorySettings.closeBtn);
            expect(categorySettings.contentHolder.isPresent()).toBeFalsy();
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=configureWorkflowCategorySettings.e2e-spec.js.map