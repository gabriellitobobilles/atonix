/**
 * Test Case: 19684
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19684
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, categoryData } from '../../helpers/testDetails.data';
import { browser, element, by } from 'protractor';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { EmailActionData, AttributeActionData } from '../../helpers/interface';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const helper = new Helper();

const newCategory = { ...categoryData };
newCategory.resolutionStatus[0].actions = []; // empty Resolution Actions since not needed

describe('Configure Workflow - Issue Activity Open', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.addNewCategoryFn(newCategory);
    // console.log(`Category to create: `, newCategory)
    // Need to add two resolution status as per category requirement.
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
  });

  it('Verify Action Type drop down list & ensure user is able to select', async () => {
    const issueActivityOpenBtn = workflowEditorPage.getIssueActivityPanel('Open');
    issueActivityOpenBtn.click();
    issueActivityOpenBtn.$(`[title="Add Action"]`).click();
    workflowEditorPage.getActionHeaderAll(issueActivityOpenBtn).first().click();
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
    const issueActivityOpenBtn = workflowEditorPage.getIssueActivityPanel('Open');
    // adds new Email action
    workflowEditorPage.addNewAction(issueActivityOpenBtn, 'email', newCategory.issueActivities.open[0], true);
    // adds new Update Attribute action
    workflowEditorPage.addNewAction(issueActivityOpenBtn, 'attribute', newCategory.issueActivities.open[1], true);

    // saveAndOpenCategory(newCategory)
    workflowEditorPage.saveCategory();
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    // get the action panels section
    issueActivityOpenBtn.click();
    const issueActivityOpenActions = workflowEditorPage.getActionPanelAll(issueActivityOpenBtn);
    issueActivityOpenActions.actionHeader.first().click();

    // returns the action section and it's details inside <.select-settings> tag
    // Need to check this from time to time, this changed before
    const openEmailData = newCategory.issueActivities.open[0];
    const openAttributeData = newCategory.issueActivities.open[1];

    const actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityOpenBtn, 'email');
    expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(openEmailData.recipient);
    expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(openEmailData.subject);
    expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(openEmailData.messageBody);
    issueActivityOpenActions.actionHeader.last().click();
    const actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityOpenBtn, 'attribute');
    expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(openAttributeData.name);
    expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(openAttributeData.value);
  });
  it('should Verify delete action feature.', async () => {
    const issueActivityOpenBtn = workflowEditorPage.getIssueActivityPanel('Open'); // get last
    const actionPanels = workflowEditorPage.getActionPanelAll(issueActivityOpenBtn);

    workflowEditorPage.editBtn.click();
    actionPanels.getDeleteBtn(0).click(); // delete first action

    // saveAndOpenCategory(newCategory, true)
    workflowEditorPage.saveCategory(true);
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    issueActivityOpenBtn.click();

    expect<any>(actionPanels.actionHeader.count()).toEqual(1);
    expect(actionPanels.actionHeader.first().getText()).toMatch(newCategory.issueActivities.open[1].actionName);
  });
});
