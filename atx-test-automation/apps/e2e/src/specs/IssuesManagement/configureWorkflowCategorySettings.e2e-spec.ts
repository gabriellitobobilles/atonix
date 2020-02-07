/**
 * Test Case: 19686
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19686
 */

import { User } from '../../helpers/user';
import { userObj, categoryData, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const helper = new Helper();

const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const newCategory = Object.create(categoryData);
newCategory.issueName = 'Compliance';
newCategory.assetName = ['Generic Station Group', 'Generic Station'];
newCategory.resolutionStatus[0].actions = [];

newCategory.issueActivities.open = [{
  type: 'email',
  actionName: '1_action_' + casual.word,
  recipient: userObj.email,
  subject: casual.word,
  messageBody: casual.sentence,
  advancedSettings: {
    actionStatus: actionStatus.entering,
  },
}, {
  type: 'attribute',
  actionName: `2_action_` + casual.word,
  name: casual.word,
  value: `value_` + casual.random,
  advancedSettings: {
    actionStatus: actionStatus.leaving,
  },
}];

const categorySettings = workflowEditorPage.categorySettings;

describe('Issues Management - Configure Workflow - Category Settings', () => {
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    user.logIn(userObj);
    user.goToIssueManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
  });

  it('Ensure user is able to see Category Name & Issue class (which was selected in Select Category)', async () => {
    workflowEditorPage.addNewCategoryFn(newCategory);
    // console.log(`Category to create: `, newCategory)
    // Need to add two resolution status as per category requirement.
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
    workflowEditorPage.saveCategory();
    categorySettings.categorySetingsBtn.click();

    expect(categorySettings.categoryName.getText()).toMatch(newCategory.categoryName);
    expect(categorySettings.issueClass.getText()).toMatch(newCategory.issueName);
  });
  it('Ensure user is able to access asset classes.', async () => {
    expect<any>(categorySettings.assetClassesList.count()).toEqual(2);
    expect<any>(categorySettings.assetClassesList.getText())
      .toEqual([newCategory.assetName[0], newCategory.assetName[1]]);
  });
  it('BUG - should be able to modify asset classes and display properly', async () => {
    workflowEditorPage.editBtn.click();
    const assetClassEdit = ['Generic Station Group', // unselect Investment Accelerator
      'Other/Unknown Unit Type', 'Solid Fuel Thermal Unit']; // select these items
    workflowEditorPage.selectAssetClass(assetClassEdit);

    workflowEditorPage.categoryTitle.click(); // close
    workflowEditorPage.saveCategory(true);
    categorySettings.categorySetingsBtn.click();

    expect<any>(categorySettings.assetClassesList.count()).toEqual(3);
    expect<any>(categorySettings.assetClassesList.getText())
      .toEqual([newCategory.assetName[1], assetClassEdit[1], assetClassEdit[2]]);
  });
  it('Verify "Close" button.', async () => {
    helper.clickAndSleep(categorySettings.closeBtn);
    expect(categorySettings.contentHolder.isPresent()).toBeFalsy();
  });
});
