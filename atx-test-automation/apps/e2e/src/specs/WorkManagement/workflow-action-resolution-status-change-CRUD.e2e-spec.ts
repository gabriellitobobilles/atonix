/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, categoryData, appName } from '../../helpers/testDetails.data';
import { browser, element, by, ElementFinder, $$, $ } from 'protractor';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';
import { EmailActionData, AttributeActionData, IssueCreationData, PriorityValues } from '../../helpers/interface';

const issueManagemwentPage = new Pages.IssueManagement();
const issueSnapshotPage = new Pages.IssueSnapshot();
const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const util = new Utils();
const helper = new Helper();
const date = new Date();

let issueNumber: string;  // used when issue is created
const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};
const targetResolution = '2 Target Resolution';

const newCategory = {
  categoryName: 'ResolutionChange_' + casual.word + '_' + date.getTime(),
  issueName: 'Membrane Cleaning',
  assetName: ['Generic Station Group'],
  resolutionStatus: [{
    name: '1_reso_' + casual.word,
    actions: [],
  }, {
    name: targetResolution,
    actions: []
  },
  {
    name: '3_reso_' + casual.word,
    actions: [],
  }, {
    name: '4_reso_' + casual.word,
    actions: [],
  }, {
    name: '5_reso_' + casual.word,
    actions: [],
  }],
  issueActivities: {
    open: [{
      type: workflowEditorPage.actionTypes.updateResolutionStatus,
      actionName: 'IssueActivityCloseAction',
      resolutionStatusName: targetResolution,
    }],
    closed: [{
      type: workflowEditorPage.actionTypes.updateResolutionStatus,
      actionName: 'IssueActivityCloseAction',
      resolutionStatusName: targetResolution,
    }],
  },
};

describe('Configure Workflow - Action - Update Resolution Change - CRUD', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    // user.goToWorkManagement();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    // workflowEditorPage.createCategoryComplete(newCategory);
    // util.getWindowHandles().then((window) => {
    //   browser.close();
    //   browser.switchTo().window(window[0]); // back to Issue Management
    // });
    // helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
    workflowEditorPage.addNewCategoryFn(newCategory);
  });
  it('Update Resolution Change should be present', async () => {
    workflowEditorPage.addNewResolutionStatusBtn.click();
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.last();
    updateResolutionStatusName(newCategory.resolutionStatus[0], resolutionHeader);
    addAction(resolutionHeader);
    expect(workflowEditorPage.actionTypeDropDown.getText()).toContain(workflowEditorPage.actionTypes.updateResolutionStatus);
  });
  it('new resolution added should appear in the drop down dynamically', async () => {
    workflowEditorPage.selectActionTypeFn(workflowEditorPage.actionTypes.updateResolutionStatus);
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);
    newCategory.resolutionStatus.forEach(async (resolution, index) => {
      if (index !== 0) {
        helper.clickAndSleep(workflowEditorPage.addNewResolutionStatusBtn, 800);
        updateResolutionStatusName(resolution, workflowEditorPage.resolutionStatusBtnAll.get(index));
        const currentResolutionStatusName =
          await workflowEditorPage.getResolutionStatusName(workflowEditorPage.resolutionStatusBtnAll.get(index));
        expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
          .toContain(currentResolutionStatusName.trim());
        expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
          .toContain(resolution.name);
      }
    });
    expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
      .not.toContain(newCategory.resolutionStatus[0].name);
  });
  it('Target resolution drop down should update after deleting a resolution status', () => {
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);

    deleteResolution(4);
    expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
      .not.toContain(newCategory.resolutionStatus[4].name);
  });
  it('Target resolution drop down should update after deleting selected status', () => {
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);

    deleteResolution(1);
    expect(resolutionHeader.$(workflowEditorPage.targetResolutionStatusDropdownStr).getText())
      .not.toContain(newCategory.resolutionStatus[1].name);
  });
  it('update target Resolution and save. Change should retain', async () => {
    const resolutionStatuses = newCategory.resolutionStatus;
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.get(0);

    workflowEditorPage.selectTargetResolutionName(
      resolutionHeader.$$(workflowEditorPage.targetResolutionStatusDropdownStr).last(), resolutionStatuses[3].name);

    workflowEditorPage.saveCategory();
    const resolution1 = workflowEditorPage.resolutionStatusBtnAll.first();
    helper.clickAndSleep(resolution1, 2000);
    const workflowActions = await workflowEditorPage.getAllActions(resolutionHeader);
    expect(workflowActions[0].name).toContain(`New Action - Update Resolution Status`);
    expect(workflowActions[0].actions[0].settingsForm).toContain(`Action Type: ${workflowEditorPage.actionTypes.updateResolutionStatus}`);
    expect(workflowActions[0].actions[0].settingsForm).toContain(`Action Name: New Action`);
    expect(workflowActions[0].actions[0].settingsForm).toContain(`Resolution Status Name: ${resolutionStatuses[3].name}`);
  });
});

function setResolutionStatusAndSave(resolutionStatusName: string) {
  issueSnapshotPage.setResolutionStatus(resolutionStatusName);
  issueSnapshotPage.saveIssueBtn.click();
  return issueSnapshotPage.getToastMessage();
}

function updateResolutionStatusName(resolutionStatusObj: any, resolutionHeader: ElementFinder) {
  workflowEditorPage.resolutionHeaderButtonPress(resolutionHeader, 'edit'); // edit
  const resolutionElemTxt = resolutionHeader.$(workflowEditorPage.resolutionStatusNameSelectorStr);
  helper.waitForVisible(resolutionElemTxt);
  helper.clearAndSendKeys(resolutionElemTxt, resolutionStatusObj.name);
  workflowEditorPage.resolutionHeaderButtonPress(resolutionHeader, 'edit'); // save
  browser.sleep(500);
}

function addAction(resolutionHeader: ElementFinder) {
  resolutionHeader.click(); // expand resolution
  browser.actions().mouseMove(resolutionHeader.$(`[title="Add Action"]`)).perform();
  helper.waitAndClick(resolutionHeader.$(`[title="Add Action"]`)); // CLICK ADD ACTION BUTTON
  const groupStatusActions = workflowEditorPage.getActionHeaderAll(resolutionHeader);
  groupStatusActions.last().click(); // EXPAND EMAIL/ATTRIBUTE ACTION PAN
  helper.waitForVisible(workflowEditorPage.actionTypeDropDown);
}

function deleteResolution(idx: number) {
  const resolutionStatuses = workflowEditorPage.resolutionStatusBtnAll;
  workflowEditorPage.deleteResolutionStatus(resolutionStatuses.get(idx));
  browser.sleep(1000);
}
