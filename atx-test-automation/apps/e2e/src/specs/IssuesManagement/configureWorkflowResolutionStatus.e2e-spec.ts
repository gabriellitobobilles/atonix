/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, categoryData, appName } from '../../helpers/testDetails.data';
import { browser, element, by, ElementFinder } from 'protractor';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';

import * as casual from 'casual';
import { EmailActionData, AttributeActionData } from '../../helpers/interface';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const util = new Utils();
const helper = new Helper();

const date = new Date();
const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const newCategory = { ...categoryData };
newCategory.issueName = 'Pole Attachment Program';
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1].actions = [];
newCategory.resolutionStatus[2] = {
  name: '3_reso_' + casual.word,
  actions: [],
};
newCategory.issueActivities.open = [];
newCategory.issueActivities.closed = [];

const resolutionActionEmailData: EmailActionData = {
  actionName: '1_action_' + casual.word,
  recipient: userObj.email,
  subject: casual.word,
  messageBody: casual.sentence,
  advancedSettings: {
    actionStatus: actionStatus.entering,
  },
};

const resolutionActionAttributeData: AttributeActionData = {
  type: 'attribute',
  actionName: `2_action_` + casual.word,
  name: casual.word,
  value: `value_` + casual.random,
  advancedSettings: {
    actionStatus: actionStatus.leaving,
  },
};

describe('Issues Management - Configure Workflow - Resolution Status', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToIssueManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
  });

  it('should be able to add new Resolution Status', async () => {
    // console.log(`Category to create: `, newCategory)
    workflowEditorPage.addNewCategoryFn(newCategory);
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);

    const resolutionStatus = workflowEditorPage.resolutionStatusBtnAll;
    resolutionStatus.then(function (elem) {
      expect(elem.length).toEqual(1);
    });
    expect(resolutionStatus.last().getText()).toMatch(newCategory.resolutionStatus[0].name);
  });

  it('should be able edit Resolution Status', () => {
    newCategory.resolutionStatus[0].name = '1_edited_' + casual.word;

    const newResolutionStatus = workflowEditorPage.resolutionStatusBtnAll.last();
    workflowEditorPage.editResolutionFn(newResolutionStatus, newCategory.resolutionStatus[0]);
    expect(newResolutionStatus.getText()).toMatch(newCategory.resolutionStatus[0].name);
  });

  it('should be able to add another resolution status and move from statuses', async () => {
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[2]);
    expect<any>(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(3);
    // Newly created should appear last
    expect(workflowEditorPage.resolutionStatusBtnAll.last().getText())
      .toMatch(newCategory.resolutionStatus[2].name);

    const resolutionStatusHeader = workflowEditorPage
      .getResolutionStatusByName(newCategory.resolutionStatus[2].name); // get last
    workflowEditorPage.resolutionHeaderButtonPress(resolutionStatusHeader, 'up'); // move up
    workflowEditorPage.resolutionHeaderButtonPress(resolutionStatusHeader, 'up'); // move up
    // newly created should now be first
    expect(workflowEditorPage.resolutionStatusBtnAll.first().getText())
      .toMatch(newCategory.resolutionStatus[2].name);

    // save category
    // saveAndOpenCategory(newCategory)
    workflowEditorPage.saveCategory();
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    expect<any>(workflowEditorPage.resolutionStatusBtnAll.count()).toBe(3);
    expect(workflowEditorPage.resolutionStatusBtnAll.first().getText())
      .toMatch(newCategory.resolutionStatus[2].name); // Check if moved resolution status is saved.
  });

  it('should be able to add new Action ', async () => {
    const resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
    resolution1.click();
    workflowEditorPage.editBtn.click();
    resolution1.$(`[title="Add Action"]`).click();  // click add action btn

    expect<any>(workflowEditorPage.getActionHeaderAll(resolution1).count()).toBe(1);
    expect(workflowEditorPage.getActionHeaderAll(resolution1).first().getText())
      .toMatch(`New Action - Email`);
  });

  it('Verify Action Type drop down list & ensure user is able to select', async () => {
    const resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
    workflowEditorPage.getActionHeaderAll(resolution1).first().click();
    browser.sleep(1500);

    workflowEditorPage.selectActionTypeFn('Email');
    expect(workflowEditorPage.actionEmailFormObj.actionNameTxt.isPresent()).toBeTruthy();
    expect(workflowEditorPage.actionEmailFormObj.recipientTxt.isPresent()).toBeTruthy();

    workflowEditorPage.selectActionTypeFn('Update Attribute');
    expect(workflowEditorPage.actionAttributeFormObj.actionNameTxt.isPresent()).toBeTruthy();
    expect(workflowEditorPage.actionAttributeFormObj.attributeName.isPresent()).toBeTruthy();
    workflowEditorPage.deleteActionBtn.click(); // delete action for next step
  });

  it('User should be able to add all action details. Name, Recipients, Subject, Message Body', async () => {
    browser.sleep(5000);
    const resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
    // adds new Email action
    workflowEditorPage.addNewAction(resolution1, 'email', resolutionActionEmailData);
    // adds new Update Attribute action
    workflowEditorPage.addNewAction(resolution1, 'attribute', resolutionActionAttributeData);

    // saveAndOpenCategory(newCategory, true)
    workflowEditorPage.saveCategory(true);
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    resolution1.click();

    // get the action panels section
    const resolution1Actions = workflowEditorPage.getActionPanelAll(resolution1);
    resolution1Actions.actionHeader.first().click();

    // returns the action section and it's details inside <.select-settings> tag
    // Need to check this from time to time, this changed before
    const actionsFromSiteEmail = workflowEditorPage.getActionByType(resolution1, 'email');
    expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(resolutionActionEmailData.recipient);
    expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(resolutionActionEmailData.subject);
    expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(resolutionActionEmailData.messageBody);
    resolution1Actions.actionHeader.last().click();
    const actionsFromSiteAttribute = workflowEditorPage.getActionByType(resolution1, 'attribute');
    expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(resolutionActionAttributeData.name);
    expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(resolutionActionAttributeData.value);
  });
  it('Verify "Advanced Action Settings"', async () => {
    const resolutionStatusHeader = workflowEditorPage
      .getResolutionStatusByName(newCategory.resolutionStatus[2].name); // get the first Resolution Status
    const actionPanels = workflowEditorPage.getActionPanelAll(resolutionStatusHeader);
    helper.clickAndSleep(actionPanels.advancedSettings.header.first());

    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 0).count())
      .toEqual(2);
    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 0).getText())
      .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);

    // Check if Entering Status is selected
    expect<any>(actionPanels.advancedSettings.getSelectedStatusRBtn(0).count())
      .toEqual(1);
    expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).first().getText())
      .toMatch(resolutionActionEmailData.advancedSettings.actionStatus);
    // Check if current action is displayed in .transition-action
    expect(actionPanels.advancedSettings.flow.getTransitionAction(0).getText())
      .toMatch(resolutionActionEmailData.actionName);
    // Check if .transition-resolution-status-othe is currently displayed
    expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(0).getText())
      .toMatch(newCategory.resolutionStatus[2].name);

    // check Second Action with Leaving status
    helper.clickAndSleep(actionPanels.advancedSettings.header.last());
    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(1, 2).count())
      .toEqual(2);
    // check if ListItems section is at the right side
    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(1, 2).getText())
      .toEqual([newCategory.resolutionStatus[0].name, newCategory.resolutionStatus[1].name]);

    expect<any>(actionPanels.advancedSettings.getSelectedStatusRBtn(1).count())
      .toEqual(1);
    expect(actionPanels.advancedSettings.getSelectedStatusRBtn(1).first().getText())
      .toMatch(resolutionActionAttributeData.advancedSettings.actionStatus);
    // Check if current action is displayed in .transition-action
    expect(actionPanels.advancedSettings.flow.getTransitionAction(1).getText())
      .toMatch(resolutionActionAttributeData.actionName);
    // Check if .transition-resolution-status-othe is currently displayed
    expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(1).getText())
      .toMatch(newCategory.resolutionStatus[2].name);
  });

  it('should Verify delete action feature.', async () => {
    const resolutionStatusHeader = workflowEditorPage
      .getResolutionStatusByName(newCategory.resolutionStatus[2].name); // get last
    const actionPanels = workflowEditorPage.getActionPanelAll(resolutionStatusHeader);

    workflowEditorPage.editBtn.click();
    actionPanels.getDeleteBtn(0).click(); // delete first action

    // saveAndOpenCategory(newCategory, true)
    workflowEditorPage.saveCategory(true);
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    resolutionStatusHeader.click();
    expect<any>(actionPanels.actionHeader.count()).toEqual(1);
    expect(actionPanels.actionHeader.first().getText()).toMatch(resolutionActionAttributeData.actionName);
  });
});
describe('BUG - 21294 - Advanced Action Settings are not correctly saved', () => {
  const newCategoryForBug = {
    categoryName: casual.word + '_' + date.getTime(),
    issueName: 'Compliance',
    assetName: categoryData.assetName[0],
    resolutionStatus: [{ name: '1_res_BUG_' + casual.word, actions: [] },
    { name: '2_res_BUG_' + casual.word, actions: [] },
    { name: '3_res_BUG_' + casual.word, actions: [] }],
  };

  const actionAttributeData: AttributeActionData = {
    actionName: `2_action_` + casual.word,
    name: casual.word,
    value: `value_` + casual.random,
    advancedSettings: {
      actionStatus: actionStatus.leaving,
    },
  };

  it('should update the Action Status, unselect first resolution in advanced and verify', async () => {
    // console.log(`BUG - 21294:  Category to create: `, newCategoryForBug)
    workflowEditorPage.addNewCategoryFn(newCategoryForBug);
    workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[0]);
    workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[1]);
    workflowEditorPage.addNewResolutionFn(newCategoryForBug.resolutionStatus[2]);

    const newResolutionStatus = workflowEditorPage.resolutionStatusBtnAll.first();
    newResolutionStatus.click();
    workflowEditorPage.addNewAction(newResolutionStatus, 'attribute', actionAttributeData);

    // saveAndOpenCategory(newCategoryForBug)
    workflowEditorPage.saveCategory();

    helper.clickAndSleep(newResolutionStatus);
    const actionPanels = workflowEditorPage.getActionPanelAll(newResolutionStatus);

    actionPanels.actionHeader.first().click();
    helper.clickAndSleep(actionPanels.advancedSettings.header.first());

    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 2).count())
      .toEqual(2);
    expect<any>(actionPanels.advancedSettings.flow.getListItemsByTransitionIdx(0, 2).getText())
      .toEqual([newCategoryForBug.resolutionStatus[1].name, newCategoryForBug.resolutionStatus[2].name]);

    // Check if Entering Status is selected
    expect<any>(actionPanels.advancedSettings.getSelectedStatusRBtn(0).count())
      .toEqual(1);
    expect(actionPanels.advancedSettings.getSelectedStatusRBtn(0).first().getText())
      .toMatch(actionAttributeData.advancedSettings.actionStatus);
    // Check if current action is displayed in .transition-action
    expect(actionPanels.advancedSettings.flow.getTransitionAction(0).getText())
      .toMatch(actionAttributeData.actionName);
    // Check if .transition-resolution-status-other is currently displayed
    expect(actionPanels.advancedSettings.flow.getTransitionStatusThis(0).getText())
      .toMatch(newCategoryForBug.resolutionStatus[0].name);
  });
});
