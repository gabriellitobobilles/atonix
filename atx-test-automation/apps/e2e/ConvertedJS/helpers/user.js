"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var Pages = require("../page/pages");
var Helper = require("./helper");
var testDetails_data_1 = require("../helpers/testDetails.data");
var utils_1 = require("../helpers/utils");
var ptor_1 = require("protractor/built/ptor");
var issueSnapshot_task_fillIssueForm_1 = require("../page/issueSnapshot.task.fillIssueForm");
var workflowEditorPage = new Pages.WorkflowEditor();
var loginPage = new Pages.LoginPage();
var helper = new Helper.Helper();
var homePage = new Pages.HomePage();
var issueSnapshotPage = new Pages.IssueSnapshot();
var issueManagementPage = new Pages.IssueManagement();
var fillIssue = new issueSnapshot_task_fillIssueForm_1.FillIssueForm();
var util = new utils_1.Utils();
var until = ptor_1.protractor.ExpectedConditions;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.logIn = function (userObj) {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.get(testDetails_data_1.serverToTest);
        protractor_1.browser.sleep(2000);
        this.waitUrlContains('Unauthorized.html');
        loginPage.inputUserEmail(userObj.email);
        loginPage.inputUserPassword(userObj.password);
        loginPage.clickSignInBtn();
        helper.waitForVisible(homePage.getNavBarRight());
        protractor_1.browser.sleep(3000);
        protractor_1.browser.waitForAngularEnabled(false);
        // return something here.
    };
    User.prototype.waitUrlContains = function (param, ms) {
        if (ms === void 0) { ms = 30000; }
        protractor_1.browser.wait(until.urlContains(param), ms);
    };
    /**
     * helper tool to navigate to specific app
     * @param {String} appName - string imported from appName.data file
     */
    User.prototype.navigateToApp = function (appNameStr) {
        homePage.selectAppFromMenu(appNameStr);
        var appNameSub = helper.getTrueTitle(appNameStr);
        if (appNameStr === testDetails_data_1.appName.arcFlash) {
            util.getWindowHandles().then(function (tabWindow) {
                protractor_1.browser.switchTo().window(tabWindow[tabWindow.length - 1]);
            });
            protractor_1.browser.sleep(2000);
        }
        if (appNameStr === testDetails_data_1.appName.investmentAccelerator) {
            helper.waitForVisible(protractor_1.$("#overlay-background"));
            helper.waitForDisappear(protractor_1.$("#overlay-background"));
        }
        helper.waitTitleContains(appNameSub);
        protractor_1.browser.waitForAngularEnabled(false);
    };
    User.prototype.goToIssueManagementConfigureWorkflow = function () {
        this.navigateToApp(testDetails_data_1.appName.issuesManagement);
        helper.waitTitleContains(testDetails_data_1.appName.issuesManagement);
        protractor_1.browser.waitForAngularEnabled(false);
        issueManagementPage.goToConfigureWorkflow();
        protractor_1.browser.sleep(2000);
        util.getWindowHandles().then(function (window) {
            protractor_1.browser.switchTo().window(window[1]);
        });
        helper.waitForVisible(workflowEditorPage.addCategoryBtn);
        // browser.switchTo().window(tabWindow[1])
    };
    User.prototype.goToIssueManagement = function () {
        this.navigateToApp(testDetails_data_1.appName.issuesManagement);
        helper.waitTitleContains(testDetails_data_1.appName.issuesManagement);
        protractor_1.browser.waitForAngularEnabled(false);
        // helper.waitForVisible($(`[placeholder="Asset Search"]`))
    };
    User.prototype.goToAssetExplorer = function () {
        this.navigateToApp(testDetails_data_1.appName.assetExplorer);
        helper.waitTitleContains(testDetails_data_1.appName.assetExplorer);
        protractor_1.browser.waitForAngularEnabled(false);
        // helper.waitForVisible($(`[placeholder="Asset Search"]`))
    };
    User.prototype.goToPerformanceAnalyst = function () {
        this.navigateToApp(testDetails_data_1.appName.performanceAnalyst);
        helper.waitTitleContains(testDetails_data_1.appName.performanceAnalyst);
        protractor_1.browser.waitForAngularEnabled(false);
    };
    User.prototype.goToWorkManagementConfigureWorkflow = function () {
        this.navigateToApp(testDetails_data_1.appName.workManagement);
        helper.waitTitleContains(testDetails_data_1.appName.workManagement);
        protractor_1.browser.waitForAngularEnabled(false);
        issueManagementPage.goToConfigureWorkflow();
        util.getWindowHandles().then(function (window) {
            protractor_1.browser.switchTo().window(window[1]);
        });
        helper.waitForVisible(workflowEditorPage.addCategoryBtn);
        // browser.switchTo().window(tabWindow[1])
    };
    User.prototype.goToWorkManagement = function () {
        this.navigateToApp(testDetails_data_1.appName.workManagement);
        helper.waitTitleContains(testDetails_data_1.appName.workManagement);
        protractor_1.browser.waitForAngularEnabled(false);
        // helper.waitForVisible($(`[placeholder="Asset Search"]`))
    };
    // this is just a test for ScreenPlay Pattern
    User.prototype.createNewIssue = function (issueData, type, save) {
        if (type === void 0) { type = 'IM'; }
        if (save === void 0) { save = true; }
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
        if (save) {
            issueSnapshotPage.saveIssueBtn.click();
            protractor_1.browser.sleep(2000);
            helper.waitForVisible(deleteBtn, 10000);
            protractor_1.browser.sleep(1000);
            helper.waitForVisible(issueSnapshotPage.issueNumber);
            issueSnapshotPage.toastCloseBtn.click();
            helper.waitForDisappear(issueSnapshotPage.toastMessage);
            return issueSnapshotPage.issueNumber.getText();
        }
    };
    User.prototype.getTabElementByName = function (tabName) {
        var tabElements = protractor_1.$$("[ng-repeat=\"tab in vm.tabs\"] > a"); // or $$(`[role="tab"]`)
        return tabElements.filter(function (tab) {
            return tab.getText().then(function (text) {
                return text === tabName;
            });
        }).first();
    };
    User.prototype.openTab = function (tabName) {
        this.getTabElementByName(tabName).click();
        // helper.waitForVisible($(`.listContainer .ui-grid-header`));
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map