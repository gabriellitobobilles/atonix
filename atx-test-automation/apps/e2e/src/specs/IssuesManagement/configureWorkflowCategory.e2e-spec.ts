/**
 * Test Case: 19687
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19687
 */

import { User } from '../../helpers/user';
import { userObj, categoryData, automationAssetData, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { browser } from 'protractor';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const helper = new Helper();

const newCategory = Object.create(categoryData);
const newCategory2 = Object.create(categoryData);
newCategory2.issueName = 'Membrane Cleaning';

describe('Issues Management - Configure Workflow - Category', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToIssueManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
  });

  // fit('yoooooo', () => {
  //   user.navigateToApp(appName.issuesManagement)
  //   helper.waitTitleContains(appName.issuesManagement)
  //   browser.waitForAngularEnabled(false)

  //   issueManagementPage.goToConfigureWorkflow()
  //   browser.ignoreSynchronization = true
  //   util.getWindowHandles().then(function(window) {
  //     browser.switchTo().window(window[1])
  //   })
  //   helper.waitForVisible(workflowEditorPage.addCategoryBtn)
  // })
  it('Verify "Save" category button after adding resolution status, Issue Activity Status(Open/Closed)', async () => {
    workflowEditorPage.createCategoryComplete(newCategory);

    expect<any>(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(2);
    expect<any>(workflowEditorPage.resolutionStatusBtnAll.getText())
      .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);

    checkIssueActivityStatus('Open');
    checkIssueActivityStatus('Closed');
  });
  it('Verify "Cancel" button after adding all details & without adding all details.', async () => {
    workflowEditorPage.selectClassByName(newCategory2.issueName);
    workflowEditorPage.addNewCategoryFn(newCategory2);
    helper.clickAndSleep(workflowEditorPage.cancelBtn);

    expect(workflowEditorPage.saveBtn.isDisplayed()).toBeFalsy();
    expect(workflowEditorPage.cancelBtn.isDisplayed()).toBeFalsy();
    expect(workflowEditorPage.contentHolder.isDisplayed())
      .toBeFalsy('Did not load empty state after cancel');
  });
});

function checkIssueActivityStatus(statusType: string) {
  const issueActivityBtn = workflowEditorPage.getIssueActivityPanel(statusType);
  // get the action panels section
  issueActivityBtn.click();
  const issueActivityActions = workflowEditorPage.getActionPanelAll(issueActivityBtn);
  issueActivityActions.actionHeader.first().click();

  // returns the action section and it's details inside <.select-settings> tag
  // Need to check this from time to time, this changed before
  let emailData: { recipient: string | RegExp, subject: string | RegExp, messageBody: string | RegExp },
    attributeData: { name: string | RegExp; value: string | RegExp; };
  if (statusType === 'Open') {
    emailData = newCategory.issueActivities.open[0];
    attributeData = newCategory.issueActivities.open[1];
  } else if (statusType === 'Closed') {
    emailData = newCategory.issueActivities.closed[0];
    attributeData = newCategory.issueActivities.closed[1];
  }

  const actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityBtn, 'email');
  expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(emailData.recipient);
  expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(emailData.subject);
  expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(emailData.messageBody);
  issueActivityActions.actionHeader.last().click();
  const actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityBtn, 'attribute');
  expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(attributeData.name);
  expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(attributeData.value);
}
