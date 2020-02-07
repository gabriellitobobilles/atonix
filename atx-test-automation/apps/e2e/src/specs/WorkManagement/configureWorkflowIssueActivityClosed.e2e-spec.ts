/**
 * Test Case: 1968=5
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19685
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, categoryData } from '../../helpers/testDetails.data';
import { browser, element, by } from 'protractor';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as _ from 'lodash';
import * as casual from 'casual';
import { EmailActionData, AttributeActionData } from '../../helpers/interface';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const helper = new Helper();

const newCategory = { ...categoryData };
newCategory.resolutionStatus[0].actions = []; // empty Resolution Actions since not needed

describe('Configure Workflow - Issue Activity Closed', () => {
  beforeAll(async () => {
    // console.log(JSON.stringify(newCategory))
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.addNewCategoryFn(newCategory);
    // console.log(`Category to create: `, newCategory)
    // Need to add two resolution status as per category requirement.
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[0]);
  });

  it('Verify Action Type drop down list & ensure user is able to select', async () => {
    workflowEditorPage.addNewResolutionFn(newCategory.resolutionStatus[1]);
    const issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed');
    issueActivityClosedBtn.click();
    issueActivityClosedBtn.$(`[title="Add Action"]`).click();
    workflowEditorPage.getActionHeaderAll(issueActivityClosedBtn).first().click();
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
    const issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed');
    // adds new Email action
    workflowEditorPage.addNewAction(issueActivityClosedBtn, 'email', newCategory.issueActivities.closed[0], true);
    // adds new Update Attribute action
    workflowEditorPage.addNewAction(issueActivityClosedBtn, 'attribute', newCategory.issueActivities.closed[1], true);

    // saveAndOpenCategory(newCategory)
    workflowEditorPage.saveCategory();
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    // get the action panels section
    issueActivityClosedBtn.click();
    const issueActivityClosedActions = workflowEditorPage.getActionPanelAll(issueActivityClosedBtn);
    issueActivityClosedActions.actionHeader.first().click();

    // returns the action section and it's details inside <.select-settings> tag
    // Need to check this from time to time, this changed before
    const openEmailData = newCategory.issueActivities.closed[0];
    const openAttributeData = newCategory.issueActivities.closed[1];

    const actionsFromSiteEmail = workflowEditorPage.getActionByType(issueActivityClosedBtn, 'email');
    expect(actionsFromSiteEmail.$$('.select-settings').get(0).getText()).toContain(openEmailData.recipient);
    expect(actionsFromSiteEmail.$$('.select-settings').get(1).getText()).toContain(openEmailData.subject);
    expect(actionsFromSiteEmail.$$('.select-settings').get(2).getText()).toContain(openEmailData.messageBody);
    issueActivityClosedActions.actionHeader.last().click();
    const actionsFromSiteAttribute = workflowEditorPage.getActionByType(issueActivityClosedBtn, 'attribute');
    expect(actionsFromSiteAttribute.$$('.select-settings').get(0).getText()).toMatch(openAttributeData.name);
    expect(actionsFromSiteAttribute.$$('.select-settings').get(1).getText()).toMatch(openAttributeData.value);
  });
  it('should Verify delete action feature.', async () => {
    const issueActivityClosedBtn = workflowEditorPage.getIssueActivityPanel('Closed'); // get last
    const actionPanels = workflowEditorPage.getActionPanelAll(issueActivityClosedBtn);

    workflowEditorPage.editBtn.click();
    actionPanels.getDeleteBtn(0).click(); // delete first action

    // saveAndOpenCategory(newCategory, true)
    workflowEditorPage.saveCategory(true);
    expect(workflowEditorPage.categoryTitle.getText()).toMatch(newCategory.categoryName,
      `CategoryName doesn't match  data ${newCategory.categoryName}`);

    issueActivityClosedBtn.click();

    expect<any>(actionPanels.actionHeader.count()).toEqual(1);
    expect(actionPanels.actionHeader.first().getText()).toMatch(newCategory.issueActivities.closed[1].actionName);
  });
});
