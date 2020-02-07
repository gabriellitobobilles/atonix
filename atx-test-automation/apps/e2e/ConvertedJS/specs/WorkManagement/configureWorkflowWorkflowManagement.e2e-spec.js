"use strict";
/**
 * Test Case: 19688
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19688
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
var user = new user_1.User();
var workflowEditorPage = new Pages.WorkflowEditor();
var issueManagemwentPage = new Pages.IssueManagement();
var issueSnapshotPage = new Pages.IssueSnapshot();
var assetExplorer = new Pages.AssetExplorer();
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var issueNumber; // used when issue is created
var issueCountGbl; // issue counter before and after creation
var newCategory = Object.create(testDetails_data_1.categoryData);
newCategory.issueActivities.open = []; // empty issue activity Open
newCategory.issueActivities.closed = []; // empty closed
newCategory.resolutionStatus[0].actions = [{
        type: 'attribute',
        actionName: "2_action_" + casual.word,
        name: casual.word,
        value: "value_" + casual.random,
        advancedSettings: {
            actionStatus: "Entering",
        },
    }];
var issueCreateData = {
    // issueClass: newCategory.issueName,
    // issueClass: 'Compliance',
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
// NOTE: add in test case - Entering and Leaving status test
describe('Work Management - Configure Workflow - Workflow Management', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;
            user.logIn(testDetails_data_1.userObj);
            user.goToWorkManagementConfigureWorkflow();
            helper.selectClient(testDetails_data_1.automationAssetData.clientGroup, testDetails_data_1.automationAssetData.clientName);
            workflowEditorPage.createCategoryComplete(newCategory);
            util.getWindowHandles().then(function (window) {
                protractor_1.browser.close();
                protractor_1.browser.switchTo().window(window[0]); // back to Issue Management
            });
            helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
            return [2 /*return*/];
        });
    }); });
    it('should be able to navigate to Issue Snapshot page', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var tabWindow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("xxxx: ", JSON.stringify(newCategory));
                    issueManagemwentPage.openNewItemBtn.click();
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    // expect(tabWindow.length).toEqual(2) // check if another tab is opened
                    protractor_1.browser.switchTo().window(tabWindow[1]);
                    expect(protractor_1.browser.getTitle()).toMatch("Issue Snapshot"); // check if title matched
                    expect(issueSnapshotPage.modalHeader.isPresent()).toBeTruthy();
                    expect(issueSnapshotPage.modalHeader.getText()).toMatch('Create New Item');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to display Issue Category Details', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user.createNewIssue(issueCreateData, 'WM')];
                case 1:
                    // BUG - Created category not showing in Create New Issue window
                    // issueNumber = await issueSnapshotPage.createNewIssue(issueCreateData) // commented for Screenplay
                    issueNumber = _a.sent();
                    console.log("issueNumber: ", issueNumber);
                    expect(issueNumber).not.toEqual('');
                    // expect(issueNumber).not.toBeNull()
                    // after creating New Issue. Check if the Category used is displayed in page.
                    expect(issueSnapshotPage.assetName.getText()).toMatch(testDetails_data_1.automationAssetData.clientName.toUpperCase());
                    expect(issueSnapshotPage.issueClassNameLabel.getText()).toMatch(issueCreateData.issueClass);
                    expect(issueSnapshotPage.categoryLabel.getText()).toMatch(issueCreateData.issueCategory);
                    issueSnapshotPage.resolutionStatusDropdown.$$('option').then(function (option) {
                        expect(option[0].getText()).toMatch(newCategory.resolutionStatus[0].name);
                        expect(option[1].getText()).toMatch(newCategory.resolutionStatus[1].name);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should verify issue created appears in Work Management Page', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var tabWindow, issueTofetch, issueDetails, issueCreatedInfo, issueCountAfterExpected, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _e.sent();
                    protractor_1.browser.close();
                    protractor_1.browser.switchTo().window(tabWindow[0]);
                    return [4 /*yield*/, issueManagemwentPage.issueCount1.getText()];
                case 2:
                    issueCountGbl = _e.sent();
                    protractor_1.browser.refresh();
                    protractor_1.browser.sleep(3000);
                    helper.waitForVisible(issueManagemwentPage.issueRow.first());
                    issueTofetch = issueNumber;
                    expect(issueManagemwentPage.issueRow.last().$$('td').get(1).getText())
                        .toMatch(issueNumber);
                    return [4 /*yield*/, issueManagemwentPage.getIssueDetailsByIdWM(issueTofetch, 1)];
                case 3:
                    issueDetails = _e.sent();
                    issueCreatedInfo = issueCreateData.issueInfo;
                    expect(issueDetails.issueNumber).toMatch(issueNumber);
                    expect(issueDetails.category).toMatch(issueCreateData.issueCategory);
                    expect(issueDetails.name).toMatch(issueCreatedInfo.name);
                    expect(issueDetails.status).toMatch(issueCreatedInfo.status);
                    expect(issueDetails.resolution).toMatch(issueCreatedInfo.resolution);
                    expect(issueDetails.priority).toMatch(issueCreatedInfo.priority);
                    issueCountAfterExpected = Number(issueCountGbl) + 1;
                    _b = (_a = expect(issueManagemwentPage.issueCount1.getText())).toMatch;
                    _c = [String(issueCountAfterExpected)];
                    _d = "IssueCount PieChart1: ";
                    return [4 /*yield*/, issueManagemwentPage.issueCount1.getText()];
                case 4:
                    _b.apply(_a, _c.concat([_d + (_e.sent()) + " !== issueCountAfterExpected"]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should verify triggered Update Attribute appear in Asset Navigator', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.goToAssetExplorer();
            helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.assetExplorer);
            assetExplorer.getAttributeDetailsByName(newCategory.resolutionStatus[0].actions[0].name).getText()
                .then(function (value) {
                expect(value.length).toBeGreaterThan(0);
                expect(value[2]).toMatch(newCategory.resolutionStatus[0].actions[0].name);
                expect(value[3]).toMatch(newCategory.resolutionStatus[0].actions[0].value);
            });
            return [2 /*return*/];
        });
    }); });
    it('created categories SHOULD ONLY be available to selected asset type', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var tabWindow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** @Note
                     * The Asset Type depends on the Asset. Each Asset has it's own asset type
                     * which can be viewed / modified in Asset Explorer.
                     * If the Category created belongs to a different asset type,
                     * then user cannot see the Category in Create New Issue window
                     * if user selected an Asset with different asset type.
                     */
                    user.goToWorkManagement();
                    helper.selectClientFromListMain(["Atonix"], testDetails_data_1.appName.issuesManagement);
                    // helper.selectClientMain(automationAssetData.clientGroup,
                    //   [automationAssetData.clientName, `nD Test Station`],
                    //   appName.issuesManagement);
                    issueManagemwentPage.openNewItemBtn.click();
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[1]);
                    issueSnapshotPage.issueClassDropdown.$("[label=\"" + issueCreateData.issueClass + "\"]").click();
                    util.mouseMoveClickPerform(issueSnapshotPage.issueCategoryDropdown);
                    expect(issueSnapshotPage.getCategoryOptions().getText())
                        .not.toContain(issueCreateData.issueCategory);
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    // xit('yooooo File upload test', async () => {
    //   user.goToIssueManagement()
    //   helper.selectClientMain(automationAssetData.clientGroup,
    //     ["Protractor Automation Test"],
    //     appName.issuesManagement)
    //   const row = $$(`[ng-repeat="issue in issuesVM.issues"]`)
    //   helper.waitForVisible(row.get(0))
    //   browser.sleep(2000)
    //   util.doubleClick(row.get(0).$$('td').get(1))
    //   const tabWindow = await util.getWindowHandles()
    //   browser.switchTo().window(tabWindow[1])
    //   const summaryPane = issueSnapshotPage.summaryPane
    //   helper.waitForVisible(summaryPane.issueSummaryEditBtn)
    //   helper.waitForDisappear($(`.modal-content`))
    //   summaryPane.issueSummaryEditBtn.click(); browser.sleep(2000)
    //   browser.switchTo().frame($(`[id="mceIssueSummary_ifr"]`).getWebElement())
    //   summaryPane.issueSummaryContentTxtArea.sendKeys('Yo test this is!!! yo!')
    //   browser.switchTo().defaultContent()
    //   util.fileUpload(summaryPane.issueSummaryFileImport, './test_Data/smiley1.jpg')
    //   browser.sleep(20000)
    // })
    // it('pie-ish tests in the furture', async () => {
    //   const pieChart1 = issueManagemwentPage.pieChart1
    //   helper.waitForVisible(pieChart1)
    //   browser.sleep(5000)
    //   // let slice1 = issueManagemwentPage.getPieSlices(pieChart1)
    //   // console.log(`slice1 count :`, await slice1.count())
    //   // browser.actions().mouseMove(slice1.get(0)).perform()
    //   // console.log(`slice 1 done`)
    //   // console.log(`0 attr: `, await slice1.get(0).getAttribute('class'))
    //   // browser.sleep(5000)
    //   // browser.actions().mouseMove(slice1.get(1)).perform()
    //   // console.log(`slice 2 done`)
    //   // console.log(`1 attr: `, await slice1.get(1).getAttribute('class'))
    //   let pie1 = issueManagemwentPage.pieChart1
    //   let visiblePie1 = issueManagemwentPage.getPieSlicesVisible(pie1)
    //   browser.actions().mouseMove(visiblePie1.get(0)).perform()
    //   browser.sleep(3000)
    //   // browser.actions().mouseMove(visiblePie1.get(5)).perform()
    // });
    // it('click on legend', async () => {
    //   browser.sleep(10000)
    //   let pie1 = issueManagemwentPage.pieChart1
    //   let legend1 = issueManagemwentPage.getPieLegends(pie1)
    //   let visiblePie1 = issueManagemwentPage.getPieSlicesVisible(pie1)
    //   console.log(`visible Pie Before: `, await visiblePie1.count())
    //   browser.actions().mouseMove(legend1.get(0)).click().perform()
    //   let currentPie = issueManagemwentPage.getPieSlices(issueManagemwentPage.pieChart1)
    //   browser.sleep(2000)
    //   // console.log('yooo: ', await currentPie.getAttribute('visibility'))
    //   let visiblePie2 = issueManagemwentPage.getPieSlicesVisible(pie1)
    //   console.log(`visible Pie After: `, await visiblePie2.count())
    // });
});
//# sourceMappingURL=configureWorkflowWorkflowManagement.e2e-spec.js.map