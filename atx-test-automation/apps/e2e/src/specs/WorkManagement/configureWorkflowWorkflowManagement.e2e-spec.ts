/**
 * Test Case: 19688
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19688
 */

import { User } from '../../helpers/user';
import { userObj, categoryData, appName, automationAssetData } from '../../helpers/testDetails.data';
import { browser, element, by, $$, $ } from 'protractor';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';
import {
  EmailActionData, AttributeActionData,
  IssueCreationData, PriorityValues
} from '../../helpers/interface';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const issueManagemwentPage = new Pages.IssueManagement();
const issueSnapshotPage = new Pages.IssueSnapshot();
const assetExplorer = new Pages.AssetExplorer();
const util = new Utils();
const helper = new Helper();

let issueNumber: string;  // used when issue is created
let issueCountGbl: string; // issue counter before and after creation

const newCategory = Object.create(categoryData);
newCategory.issueActivities.open = []; // empty issue activity Open
newCategory.issueActivities.closed = []; // empty closed
newCategory.resolutionStatus[0].actions = [{ // actions for resolution, no logic yet to CreateCategoryComplete
  type: 'attribute',
  actionName: `2_action_` + casual.word,
  name: casual.word,
  value: `value_` + casual.random,
  advancedSettings: {
    actionStatus: `Entering`,
  },
}];

const issueCreateData: IssueCreationData = {
  // issueClass: newCategory.issueName,
  // issueClass: 'Compliance',
  issueClass: newCategory.issueName,
  issueCategory: newCategory.categoryName,
  issueInfo: {
    name: casual.word + casual.title,
    priority: PriorityValues.Low,
    status: 'Open',
    resolution: newCategory.resolutionStatus[0].name,
    showOnScorecard: true,
    shortSummary: casual.short_description,
    // issueSummary: casual.description
  },
};

// NOTE: add in test case - Entering and Leaving status test
describe('Work Management - Configure Workflow - Workflow Management', () => {
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.createCategoryComplete(newCategory);
    util.getWindowHandles().then(function (window) {
      browser.close();
      browser.switchTo().window(window[0]); // back to Issue Management
    });
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName],
      appName.issuesManagement);
  });

  it('should be able to navigate to Issue Snapshot page', async () => {
    console.log(`xxxx: `, JSON.stringify(newCategory));
    issueManagemwentPage.openNewItemBtn.click();
    const tabWindow = await util.getWindowHandles();
    // expect(tabWindow.length).toEqual(2) // check if another tab is opened

    browser.switchTo().window(tabWindow[1]);
    expect(browser.getTitle()).toMatch(`Issue Snapshot`); // check if title matched
    expect(issueSnapshotPage.modalHeader.isPresent()).toBeTruthy();
    expect(issueSnapshotPage.modalHeader.getText()).toMatch('Create New Item');
  });
  it('should be able to display Issue Category Details', async () => {
    // BUG - Created category not showing in Create New Issue window
    // issueNumber = await issueSnapshotPage.createNewIssue(issueCreateData) // commented for Screenplay
    issueNumber = await user.createNewIssue(issueCreateData, 'WM');
    console.log(`issueNumber: `, issueNumber);
    expect(issueNumber).not.toEqual('');
    // expect(issueNumber).not.toBeNull()
    // after creating New Issue. Check if the Category used is displayed in page.
    expect(issueSnapshotPage.assetName.getText()).toMatch(automationAssetData.clientName.toUpperCase());
    expect(issueSnapshotPage.issueClassNameLabel.getText()).toMatch(issueCreateData.issueClass);
    expect(issueSnapshotPage.categoryLabel.getText()).toMatch(issueCreateData.issueCategory);

    issueSnapshotPage.resolutionStatusDropdown.$$('option').then(function (option) {
      expect(option[0].getText()).toMatch(newCategory.resolutionStatus[0].name);
      expect(option[1].getText()).toMatch(newCategory.resolutionStatus[1].name);
    });
  });
  it('should verify issue created appears in Work Management Page', async () => {
    // NOTE That this is not part of the TC but is added for additional assertion.
    const tabWindow = await util.getWindowHandles();
    browser.close();
    browser.switchTo().window(tabWindow[0]);
    issueCountGbl = await issueManagemwentPage.issueCount1.getText();

    browser.refresh();
    browser.sleep(3000);
    helper.waitForVisible(issueManagemwentPage.issueRow.first());

    const issueTofetch = issueNumber;
    expect(issueManagemwentPage.issueRow.last().$$('td').get(1).getText())
      .toMatch(issueNumber);

    const issueDetails = await issueManagemwentPage.getIssueDetailsByIdWM(issueTofetch, 1);
    const issueCreatedInfo = issueCreateData.issueInfo;
    expect(issueDetails.issueNumber).toMatch(issueNumber);
    expect(issueDetails.category).toMatch(issueCreateData.issueCategory);
    expect(issueDetails.name).toMatch(issueCreatedInfo.name);
    expect(issueDetails.status).toMatch(issueCreatedInfo.status);
    expect(issueDetails.resolution).toMatch(issueCreatedInfo.resolution);
    expect(issueDetails.priority).toMatch(issueCreatedInfo.priority);

    const issueCountAfterExpected = Number(issueCountGbl) + 1;
    expect(issueManagemwentPage.issueCount1.getText()).toMatch(String(issueCountAfterExpected),
      `IssueCount PieChart1: ${await issueManagemwentPage.issueCount1.getText()} !== issueCountAfterExpected`);
  });

  it('should verify triggered Update Attribute appear in Asset Navigator', async () => {
    user.goToAssetExplorer();
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName],
      appName.assetExplorer);

    assetExplorer.getAttributeDetailsByName(newCategory.resolutionStatus[0].actions[0].name).getText()
      .then(function (value) {
        expect(value.length).toBeGreaterThan(0);
        expect(value[2]).toMatch(newCategory.resolutionStatus[0].actions[0].name);
        expect(value[3]).toMatch(newCategory.resolutionStatus[0].actions[0].value);
      });
  });

  it('created categories SHOULD ONLY be available to selected asset type', async () => {
    /** @Note
     * The Asset Type depends on the Asset. Each Asset has it's own asset type
     * which can be viewed / modified in Asset Explorer.
     * If the Category created belongs to a different asset type,
     * then user cannot see the Category in Create New Issue window
     * if user selected an Asset with different asset type.
     */
    user.goToWorkManagement();
    helper.selectClientFromListMain([`Atonix`],
      appName.issuesManagement);
    // helper.selectClientMain(automationAssetData.clientGroup,
    //   [automationAssetData.clientName, `nD Test Station`],
    //   appName.issuesManagement);
    issueManagemwentPage.openNewItemBtn.click();

    const tabWindow = await util.getWindowHandles();
    browser.switchTo().window(tabWindow[1]);

    issueSnapshotPage.issueClassDropdown.$(`[label="${issueCreateData.issueClass}"]`).click();
    util.mouseMoveClickPerform(issueSnapshotPage.issueCategoryDropdown);
    expect(issueSnapshotPage.getCategoryOptions().getText())
      .not.toContain(issueCreateData.issueCategory);
    browser.sleep(5000);
  });

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
