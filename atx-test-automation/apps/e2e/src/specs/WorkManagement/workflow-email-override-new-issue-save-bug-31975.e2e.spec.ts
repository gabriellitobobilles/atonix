/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, categoryData, appName } from '../../helpers/testDetails.data';
import { browser, $ } from 'protractor';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';
import { IssueCreationData, PriorityValues } from '../../helpers/interface';
import { FillIssueForm } from '../../page/issueSnapshot.task.fillIssueForm';

const issueManagemwentPage = new Pages.IssueManagement();
const issueSnapshotPage = new Pages.IssueSnapshot();
const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const util = new Utils();
const helper = new Helper();

const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};
const date = new Date();

const newCategory = generateCategory();
const newCategory2 = generateCategory();
newCategory2.categoryName = casual.word + '_' + casual.word + '_' + casual.date();
newCategory2.resolutionStatus[0] = newCategory.resolutionStatus[1];
newCategory2.resolutionStatus[1] = newCategory.resolutionStatus[0];

const issueCreateData: IssueCreationData = generateIssue(newCategory);

const gbl_ctr = 1;
describe('BUG 31975 - Configure Workflow - Email Override on First Save', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(async () => {
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.createCategoryComplete(newCategory);
    util.getWindowHandles().then((window) => {
      browser.close();
      browser.switchTo().window(window[0]); // back to Issue Management
    });
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
    issueManagemwentPage.openNewItemBtn.click();
    const tabWindow = await util.getWindowHandles();
    browser.switchTo().window(tabWindow[1]);

    createIssue(issueCreateData, 'WM');
  });

  describe('Entering', () => {
    it('email override should pop up on ENTERING', async () => {
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
      const recipients = await issueSnapshotPage.emailPopUpRecipients.getAttribute('value');

      expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
      expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[0].actions[0].actionName);
      expect(recipients.trim())
        .toEqual(newCategory.resolutionStatus[0].actions[0].recipient + ';');
      expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[0].actions[0].subject);

      issueSnapshotPage.emailCancelBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Not able to save Item`);
    });
  });
  describe('Leaving', () => {
    it('email override should pop up on LEAVING', async () => {
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
      issueSnapshotPage.saveIssueBtn.click(); browser.sleep(5000);
      issueSnapshotPage.getToastMessage();
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[2].name);
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 10000);
      const recipients = await issueSnapshotPage.emailPopUpRecipients.getAttribute('value');

      expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
      expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[1].actions[0].actionName);
      expect(recipients.trim())
        .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
      expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[1].actions[0].subject);

      issueSnapshotPage.emailSendBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Item Saved`);
    });
  });
});

function generateCategory() {
  return {
    categoryName: `xxxEmailNewSaveBug` + '_' + casual.word + '_' + date.getTime(),
    issueName: 'Membrane Cleaning',
    assetName: ['Generic Station Group'],
    resolutionStatus: [{
      name: '_reso_Entering_' + casual.word,
      actions: [
        {
          type: 'email',
          actionName: '1_action_Entering ' + casual.word,
          recipient: userObj.email,
          subject: `Sorry for the spam 1 - ` + casual.word,
          messageBody: `Automation test for bug 31127`, // casual.sentence,
          allowOverride: true,
          advancedSettings: {
            actionStatus: actionStatus.entering,
          },
        }
      ],
    }, {
      name: '_reso_Leaving_' + casual.word,
      actions: [
        {
          type: 'email',
          actionName: '2_action_Leaving ' + casual.word,
          recipient: userObj.email,
          subject: 'Sorry for the spam 2 -' + casual.word,
          messageBody: `Automation test for bug 31127`,
          allowOverride: true,
          advancedSettings: {
            actionStatus: actionStatus.leaving,
          },
        }
      ],
    }, {
      name: `3_reso Nothing Here`,
      actions: []
    }],
    issueActivities: {
      open: [],
      closed: []
    }
  };
}

function generateIssue(category: any) {
  return {
    issueClass: category.issueName,
    issueCategory: category.categoryName,
    issueInfo: {
      name: casual.word + casual.title,
      priority: PriorityValues.Low,
      status: 'Open',
      resolution: category.resolutionStatus[0].name,
      showOnScorecard: true,
      shortSummary: casual.short_description,
      // issueSummary: casual.description
    },
  };
}

function createIssue(issueData: IssueCreationData, type = 'IM') {
  // this is copied from user.createNewIssue(). This doesn't have issueSnapShotPage.saveIssueBtn.click line
  const fillIssue = new FillIssueForm();
  const deleteBtn = (type === 'IM') ? issueSnapshotPage.deleteIssueBtn : issueSnapshotPage.deleteItemBtn;

  issueSnapshotPage.issueClassDropdown.$(`[label="${issueData.issueClass}"]`).click();

  if (issueData.issueCategory !== null) {
    helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$(`[label="${issueData.issueCategory}"]`));
  } else { helper.waitAndClick(issueSnapshotPage.issueCategoryDropdown.$$(`option`).get(1)); }

  issueSnapshotPage.createNewIssueBtn.click();
  helper.waitForDisappear($(`.modal-content`));
  browser.sleep(3000);

  fillIssue.fillIssue(issueData, type);
}
