import { browser, $, $$ } from 'protractor';
import * as Pages from '../page/pages';
import * as Helper from './helper';
import {
  appName, serverToTest
} from '../helpers/testDetails.data';
import { Utils } from '../helpers/utils';
import { protractor } from 'protractor/built/ptor';
import { FillIssueForm } from '../page/issueSnapshot.task.fillIssueForm';
import { IssueCreationData } from './interface';

const workflowEditorPage = new Pages.WorkflowEditor();
const loginPage = new Pages.LoginPage();
const helper = new Helper.Helper();
const homePage = new Pages.HomePage();
const issueSnapshotPage = new Pages.IssueSnapshot();
const issueManagementPage = new Pages.IssueManagement();
const fillIssue = new FillIssueForm();
const util = new Utils();

const until = protractor.ExpectedConditions;
export class User {

  logIn(userObj: { email: string, password: string }) {
    browser.waitForAngularEnabled(false);
    browser.get(serverToTest);
    browser.sleep(2000);
    this.waitUrlContains('Unauthorized.html');
    loginPage.inputUserEmail(userObj.email);
    loginPage.inputUserPassword(userObj.password);
    loginPage.clickSignInBtn();
    helper.waitForVisible(homePage.getNavBarRight());
    browser.sleep(3000);
    browser.waitForAngularEnabled(false);
    // return something here.
  }

  waitUrlContains(param: any, ms = 30000) {
    browser.wait(until.urlContains(param), ms);
  }
  /**
   * helper tool to navigate to specific app
   * @param {String} appName - string imported from appName.data file
   */
  navigateToApp(appNameStr: string) {
    homePage.selectAppFromMenu(appNameStr);

    const appNameSub = helper.getTrueTitle(appNameStr);

    if (appNameStr === appName.arcFlash) {
      util.getWindowHandles().then(tabWindow => {
        browser.switchTo().window(tabWindow[tabWindow.length - 1]);
      });
      browser.sleep(2000);
    }

    if (appNameStr === appName.investmentAccelerator) {
      helper.waitForVisible($(`#overlay-background`));
      helper.waitForDisappear($(`#overlay-background`));
    }

    helper.waitTitleContains(appNameSub);
    browser.waitForAngularEnabled(false);
  }

  goToIssueManagementConfigureWorkflow() {
    this.navigateToApp(appName.issuesManagement);
    helper.waitTitleContains(appName.issuesManagement);
    browser.waitForAngularEnabled(false);
    issueManagementPage.goToConfigureWorkflow(); browser.sleep(2000);
    util.getWindowHandles().then((window) => {
      browser.switchTo().window(window[1]);
    });
    helper.waitForVisible(workflowEditorPage.addCategoryBtn);
    // browser.switchTo().window(tabWindow[1])
  }
  goToIssueManagement() {
    this.navigateToApp(appName.issuesManagement);
    helper.waitTitleContains(appName.issuesManagement);
    browser.waitForAngularEnabled(false);
    // helper.waitForVisible($(`[placeholder="Asset Search"]`))
  }
  goToAssetExplorer() {
    this.navigateToApp(appName.assetExplorer);
    helper.waitTitleContains(appName.assetExplorer);
    browser.waitForAngularEnabled(false);
    // helper.waitForVisible($(`[placeholder="Asset Search"]`))
  }
  goToPerformanceAnalyst() {
    this.navigateToApp(appName.performanceAnalyst);
    helper.waitTitleContains(appName.performanceAnalyst);
    browser.waitForAngularEnabled(false);
  }
  goToWorkManagementConfigureWorkflow() {
    this.navigateToApp(appName.workManagement);
    helper.waitTitleContains(appName.workManagement);
    browser.waitForAngularEnabled(false);
    issueManagementPage.goToConfigureWorkflow();
    util.getWindowHandles().then((window) => {
      browser.switchTo().window(window[1]);
    });
    helper.waitForVisible(workflowEditorPage.addCategoryBtn);
    // browser.switchTo().window(tabWindow[1])
  }
  goToWorkManagement() {
    this.navigateToApp(appName.workManagement);
    helper.waitTitleContains(appName.workManagement);
    browser.waitForAngularEnabled(false);
    // helper.waitForVisible($(`[placeholder="Asset Search"]`))
  }

  // this is just a test for ScreenPlay Pattern
  createNewIssue(issueData: IssueCreationData, type = 'IM', save = true) {
    const deleteBtn = (type === 'IM') ? issueSnapshotPage.deleteIssueBtn : issueSnapshotPage.deleteItemBtn;

    issueSnapshotPage.issueClassDropdown.$(`[label="${issueData.issueClass}"]`).click();

    if (issueData.issueCategory !== null) {
      helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$(`[label="${issueData.issueCategory}"]`));
    } else { helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$$(`option`).get(1)); }

    issueSnapshotPage.createNewIssueBtn.click();
    helper.waitForDisappear($(`.modal-content`));
    browser.sleep(3000);

    fillIssue.fillIssue(issueData, type);
    if (save) {
      issueSnapshotPage.saveIssueBtn.click();

      browser.sleep(2000);
      helper.waitForVisible(deleteBtn, 10000);
      browser.sleep(1000);

      helper.waitForVisible(issueSnapshotPage.issueNumber);
      issueSnapshotPage.toastCloseBtn.click();
      helper.waitForDisappear(issueSnapshotPage.toastMessage);
      return issueSnapshotPage.issueNumber.getText();
    }
  }

  getTabElementByName(tabName: string) {
    const tabElements = $$(`[ng-repeat="tab in vm.tabs"] > a`); // or $$(`[role="tab"]`)
    return tabElements.filter(tab => {
      return tab.getText().then(text => {
        return text === tabName;
      });
    }).first();
  }

  openTab(tabName: string) {
    this.getTabElementByName(tabName).click();
    // helper.waitForVisible($(`.listContainer .ui-grid-header`));
  }
}
