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
const updateResolutionStatus = workflowEditorPage.actionTypes.updateResolutionStatus;
const targetResolution = 'Target Resolution';
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
    name: '3_reso_Entering_' + casual.word,
    actions: [
      {
        // type: 'updateResolutionStatus',
        type: updateResolutionStatus,
        actionName: '1_action_' + casual.word,
        resolutionStatusName: targetResolution,
        advancedSettings: {
          actionStatus: actionStatus.entering,
        },
      }
    ],
  }, {
    name: '4_reso_Leaving_' + casual.word,
    actions: [
      {
        // type: 'updateResolutionStatus',
        type: updateResolutionStatus,
        actionName: '2_action_' + casual.word,
        resolutionStatusName: targetResolution,
        advancedSettings: {
          actionStatus: actionStatus.leaving,
        },
      }
    ],
  }],
  issueActivities: {
    open: [{
      // type: 'updateResolutionStatus',
      type: updateResolutionStatus,
      actionName: 'IssueActivityCloseAction',
      resolutionStatusName: targetResolution,
    }],
    closed: [{
      // type: 'updateResolutionStatus',
      type: updateResolutionStatus,
      actionName: 'IssueActivityCloseAction',
      resolutionStatusName: targetResolution,
    }],
  },
};

const issueCreateData: IssueCreationData = {
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

describe('Configure Workflow - Update Resolution Action', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    // user.goToWorkManagement();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.createCategoryComplete(newCategory);
    util.getWindowHandles().then((window) => {
      browser.close();
      browser.switchTo().window(window[0]); // back to Issue Management
    });
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
  });
  it('create issue', async () => {
    issueManagemwentPage.openNewItemBtn.click();
    const tabWindow = await util.getWindowHandles();

    browser.switchTo().window(tabWindow[1]);
    issueNumber = await user.createNewIssue(issueCreateData, 'WM');
  });
  describe('Resolution Status', () => {
    it('Entering status should trigger resolution status change', async () => {
      setResolutionStatusAndSave(newCategory.resolutionStatus[2].name);
      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeTruthy();
    });
    it('Leaving status should trigger resolution status change', async () => {
      setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
      browser.refresh(); helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);

      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeFalsy();

      setResolutionStatusAndSave(newCategory.resolutionStatus[3].name);
      setResolutionStatusAndSave(newCategory.resolutionStatus[0].name);
      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeTruthy();
    });
  });
  describe('Issue Activity', () => {
    it('Issue Activity Close should trigger resolution status change', async () => {
      setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
      browser.refresh(); helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);

      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeFalsy();

      issueSnapshotPage.setIssueStatus('Closed');
      issueSnapshotPage.saveIssueBtn.click(); issueSnapshotPage.getToastMessage();
      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeTruthy();
    });
    it('Issue Activity Open should trigger resolution status change', async () => {
      setResolutionStatusAndSave(newCategory.resolutionStatus[0].name); // set back to resolution 1 to reset status
      browser.refresh(); helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 25000);

      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeFalsy();

      issueSnapshotPage.setIssueStatus(`Open`);
      issueSnapshotPage.saveIssueBtn.click(); issueSnapshotPage.getToastMessage();
      expect(issueSnapshotPage.resolutionStatusDropdown.$(`[label="${targetResolution}"]`).isSelected())
        .toBeTruthy();
    });
  });

});

function setResolutionStatusAndSave(resolutionStatusName: string) {
  issueSnapshotPage.setResolutionStatus(resolutionStatusName);
  issueSnapshotPage.saveIssueBtn.click();
  return issueSnapshotPage.getToastMessage();
}
