/**
 * Test Case: 19682
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19682
 */

import { User } from '../../helpers/user';
import {
  appName, userObj, clientData,
  workflowEditorTestData
} from '../../helpers/testDetails.data';
import { browser, element, by } from 'protractor';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';

const user = new User();
const issueManagementPage = new Pages.IssueManagement();
const workflowEditorPage = new Pages.WorkflowEditor();
const util = new Utils();
const helper = new Helper();

describe('Configure Workflow ', () => {
  beforeAll(() => {
    user.logIn(userObj);
  });

  it('should be able to open Issues Management', () => {
    user.navigateToApp(appName.issuesManagement);
    helper.waitTitleContains(appName.issuesManagement);
    // check if Configure workflow button is present
    expect(issueManagementPage.configureWorkflowBtn.isPresent).toBeTruthy();
  });

  it('should be able to navigate to Configure Workflow Editor', async () => {
    browser.waitForAngularEnabled(false);
    issueManagementPage.goToConfigureWorkflow();

    const tabWindow = await util.getWindowHandles();
    expect(tabWindow.length).toEqual(2); // check if another tab is opened

    browser.switchTo().window(tabWindow[1]);
    expect(browser.getTitle()).toMatch(`Asset360 - Workflow Editor`); // check if title matched
  });

  it('should be able select an asset in navigator', () => {
    browser.waitForAngularEnabled(false);
    helper.waitForVisible(workflowEditorPage.addCategoryBtn);
    helper.selectClient(clientData.clientGroup, clientData.clientName);
    // check if addCategoryBtn is loaded and present
    expect(workflowEditorPage.addCategoryBtn.isPresent()).toBeTruthy();
    workflowEditorPage.selectClassByName(clientData.issueClass);
  });

  // it(`should display Client name, category, resolution status & Issue Activity status details.`, async () => {
  //   const actionDataResoltion1 = workflowEditorTestData.actionDataResolution1
  //   const actionDataResolution2 = workflowEditorTestData.actionDataResolution2
  //   workflowEditorPage.selectClassByName(clientData.issueClass)
  //   // check if clientName displays and correct. Test data is imported from testDetails.data.ts above
  //   expect(workflowEditorPage.clientNameTxt.getText()).toMatch(clientData.clientName)
  //   // waits for category section IF client contains Resolution status, etc
  //   helper.waitForVisible(workflowEditorPage.categoryHolder)

  //   const resolutionStatusBtn1 = workflowEditorPage.getResolutionStatusByName(`New Resolution Status`)
  //   expect(resolutionStatusBtn1.getText()).toMatch(`New Resolution Status`)
  //   expect<any>(workflowEditorPage.resolutionStatusBtnAll.count()).toEqual(2)
  //   expect<any>(workflowEditorPage.resolutionStatusBtnAll.last().getText()).toEqual('New Resolution Status (2)')

  //   // Resolution Section
  //   resolutionStatusBtn1.click()
  //   checkActionDetails(`Action Test - Update Attribute`, actionDataResoltion1)
  //   checkActionDetails(`Action Test - Email - Email`, actionDataResolution2)
  // });
  // it('should display Issue Activity Status details', () => {
  //   const actionDataOpen = workflowEditorTestData.actionDataOpen
  //   const actionDataClosed = workflowEditorTestData.actionDataClosed

  //   // // Open activity section
  //   // const issueActivityOpenBtn = workflowEditorPage.issueActivityOpenBtn
  //   // expect(issueActivityOpenBtn.isPresent()).toBeTruthy()
  //   // issueActivityOpenBtn.click()
  //   // browser.sleep(1500)
  //   // checkActionDetails(`Action Name Activity Open - Email`, actionDataOpen)

  //   // // closed activity section
  //   // const issueActivityCloseBtn = workflowEditorPage.issueActivityCloseBtn
  //   // expect(issueActivityCloseBtn.isPresent()).toBeTruthy()
  //   // issueActivityCloseBtn.click()
  //   // browser.sleep(1500)
  //   // checkActionDetails(`Action Name Closed - Update Attribute`, actionDataClosed)

  //   const issueActivityOpenBtn = workflowEditorPage.getIssueActivityPanel('Open')
  //   const issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed')
  //   // get the action panels section
  //   issueActivityOpenBtn.click()
  //   let issueActivityOpenActions = workflowEditorPage.getActionPanelAll(issueActivityOpenBtn)
  //   issueActivityOpenActions.actionHeader.first().click()

  //   const actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityOpenBtn, 'email')
  //   expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toMatch(actionDataOpen.details[0])
  //   expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toMatch(actionDataOpen.details[1])
  //   expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toMatch(actionDataOpen.details[1])

  //   issueActivityClosedBtn.click()
  //   let issueActivityClosedActions = workflowEditorPage.getActionPanelAll(issueActivityClosedBtn)
  //   issueActivityClosedActions.actionHeader.first().click()

  //   const actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityClosedBtn, 'attribute')
  //   expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(actionDataClosed.details[0])
  //   expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(actionDataClosed.details[1])

  // });

  // it(`Ensure user is able to select class, category from drop down list.`, async () => {
  //   const classes = ['M&D', 'Fuels', 'Compliance', 'Membrane Cleaning',
  //     'Arc Flash', 'Project Management', 'Pole Attachment Program']
  //   const mdClassCategories = ['M&D Category Test', 'M&DCategory2'] // M&D categories created
  //   const categoriesToCompare = ['M&D Category Test', 'Fuels Test Category',
  //     'Compliance Category Test', 'Membrane Category Test']

  //   const optionsInClassDropdown = await workflowEditorPage.getClassOptions().getText()
  //   expect(optionsInClassDropdown).toEqual(classes)

  //   const categoryOptions = await workflowEditorPage.getCategoryOptions().getText()
  //   expect(categoryOptions).toEqual(mdClassCategories)

  //   workflowEditorPage.getCategoryOptions().get(1).click() // select KMC category
  //   expect(workflowEditorPage.categoryTitle.getText()).toMatch('KMC')
  //   workflowEditorPage.getCategoryOptions().get(0).click() // select M&D Category Test category

  //   checkClasses(classes, categoriesToCompare) // assertions to check classes
  // })

  it('  browser.sleep(50000)', () => {
    browser.sleep(10000);
  });
});

async function checkClasses(classes: any, categoriesToCompare: any) {
  const classDropdown = workflowEditorPage.classDropdown;
  for (let idx = 1; idx <= classes.length; idx++) {
    classDropdown.$(`[value="${idx}"]`).click();
    browser.sleep(1500);
    if (idx <= 4) {
      expect(workflowEditorPage.categoryTitle.getText()).toMatch(categoriesToCompare[idx - 1]);
    } else { /* add some assertions in here... */ }
  }
}

function checkActionDetails(actionName: string, dataToCheck: any) {
  helper.getElementByContainingTextAll('.mat-content', actionName).then(function (element) {
    expect(element.length).toEqual(dataToCheck.count,
      `actions count: ${element.length} !== dataToCheck count: ${dataToCheck.count}, ${dataToCheck}`);
    expect(element[0].isPresent()).toBeTruthy();
    element[0].click();
  });
  browser.sleep(2000);
  const actionDetails = workflowEditorPage.getActionDetails(dataToCheck.group, dataToCheck.type);
  console.log(`dataToCheck.group: `, dataToCheck.group);
  console.log(`dataToCheck.type: `, dataToCheck.type);
  actionDetails.$$(`.select-settings`).getText().then(function (action) {
    expect(action.length).toEqual(dataToCheck.details.length);
    for (let idx = 0; idx < action.length; idx++) {
      // expect(action[idx].includes(dataToCheck.details[idx])).toBe(true,
      //   `action: ${action[idx]} does not include dataToCheck: ${dataToCheck.details[idx]}`)
      expect(action[idx]).toMatch(dataToCheck.details[idx]);
    }
  });
}

// commented for future reference. Just in case the version above fails.
// function checkActionDetails(actionName: string, dataToCheck: any) {
//   helper.getElementByContainingTextAll('.mat-content', actionName).then(function (element) {
//     expect(element.length).toEqual(dataToCheck.count)
//     expect(element[0].isPresent()).toBeTruthy()
//     element[0].click()
//     browser.sleep(2000)
//   })

//   const resolutionAction = dataToCheck.type === 'attribute' ? workflowEditorPage.resolutionActionAttributeAll :
//     workflowEditorPage.resolutionActionEmailAll
//   // let resolutionAction = workflowEditorPage.resolutionActionAttributeAll
//   resolutionAction.getText().then(function (text) {
//   })
//   resolutionAction.$$(`p`).getText().then(function (action) {
//     expect(action.length).toEqual(dataToCheck.details.length)
//     expect(action[0]).toEqual(dataToCheck.details[0])
//     expect(action[1]).toEqual(dataToCheck.details[1])
//   })
// }
