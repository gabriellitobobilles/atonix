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

let issueNumber: string;  // used when issue is created
const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const newCategory = { ...categoryData };
// newCategory.categoryName = `testEmailPopUp`;
newCategory.issueName = 'Pole Attachment Program';
newCategory.resolutionStatus[0].name = `1_reso`;
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1] = {
  name: '2_reso_Entering_' + casual.word,
  // name: `2_reso_Entering`,
  actions: [
    {
      type: 'email',
      actionName: '1_action_' + casual.word,
      // actionName: `1_action_reiciendis`,
      recipient: userObj.email,
      subject: `Sorry for the spam 1 - ` + casual.word,
      // subject: `Sorry for the spam 1`,
      messageBody: `Test Body 1`, // casual.sentence,
      allowOverride: true,
      advancedSettings: {
        actionStatus: actionStatus.entering,
      },
    }
  ],
};
newCategory.resolutionStatus[2] = {
  name: '3_reso_Leaving_' + casual.word,
  // name: `3_reso_Leaving`,
  actions: [
    {
      type: 'email',
      actionName: '1_action_' + casual.word,
      // actionName: '1_action_sequi',
      recipient: userObj.email,
      // subject: `Sorry for the spam 2`,
      subject: 'Sorry for the spam 2 -' + casual.word,
      // messageBody: casual.sentence,
      messageBody: 'Test Body 2',
      allowOverride: true,
      advancedSettings: {
        actionStatus: actionStatus.leaving,
      },
    }
  ],
};
newCategory.issueActivities.open = [];
newCategory.issueActivities.closed = [];

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

describe('Configure Workflow - Email Override', () => {
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
  describe('Entering', () => {
    it('email override should pop up on ENTERING', async () => {
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
      const recipients = await issueSnapshotPage.emailPopUpRecipients.getAttribute('value');

      expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
      expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[1].actions[0].actionName);
      expect(recipients.trim())
        .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
      expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[1].actions[0].subject);
    });
    it('cancel will not save issue and not send email', async () => {
      issueSnapshotPage.emailCancelBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Not able to save Item`);
      helper.waitForVisible(issueSnapshotPage.showAutoGenEntries, 15000);
      expect(issueSnapshotPage.getSelectedResolutionStatus()).toEqual(newCategory.resolutionStatus[0].name);
    });
    it('issue is saved and email is sent', async () => {
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);
      issueSnapshotPage.emailSendBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Item Saved`);
    });
    it('discussion entry should appear', async () => {
      const discussionEntries: Array<{ header: string, body: string, footer: string }>
        = await issueSnapshotPage.getAllDiscussionEntryDetailsElem();

      expect(discussionEntries.length).toEqual(1);
      discussionEntries.forEach((discussion, index) => {
        expect(discussion.header).toContain(`Email Sent AtonixQATeam@BlackandVeatch.onmicrosoft.com`);
        expect(discussion.body).toContain(`by AtonixQATeam@BlackandVeatch.onmicrosoft.com`);
        expect(discussion.body).toContain(`Action Name: ${newCategory.resolutionStatus[index + 1].actions[0].actionName}`);
        expect(discussion.body).toContain(`Subject: ${newCategory.resolutionStatus[index + 1].actions[0].subject}`);
        expect(discussion.body).toContain(newCategory.resolutionStatus[index + 1].actions[0].messageBody);
      });
    });
  });
  describe('Leaving', () => {
    it('email override should pop up on LEAVING', async () => {
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[2].name);
      issueSnapshotPage.saveIssueBtn.click();
      issueSnapshotPage.getToastMessage();
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[0].name);
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 10000);
      const recipients = await issueSnapshotPage.emailPopUpRecipients.getAttribute('value');

      expect(issueSnapshotPage.emailPopUpModal.isPresent()).toBeTruthy();
      expect(issueSnapshotPage.emailPopUpActionName.getText()).toEqual(newCategory.resolutionStatus[2].actions[0].actionName);
      expect(recipients.trim())
        .toEqual(newCategory.resolutionStatus[1].actions[0].recipient + ';');
      expect(issueSnapshotPage.emailPopUpSubject.getAttribute('value')).toEqual(newCategory.resolutionStatus[2].actions[0].subject);
    });
    it('issue is saved and email is sent', async () => {
      issueSnapshotPage.emailSendBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Item Saved`);
    });
    it('discussion entry should appear', async () => {
      const discussionEntries = await issueSnapshotPage.getAllDiscussionEntryDetailsElem();
      discussionEntries.reverse(); // reverse the array of discussions since it's newest first

      expect(discussionEntries.length).toEqual(2, `Total discussion entries is not equal`);
      discussionEntries.forEach((discussion, index) => {
        expect(discussion.header).toContain(`Email Sent AtonixQATeam@BlackandVeatch.onmicrosoft.com`);
        expect(discussion.body).toContain(`by AtonixQATeam@BlackandVeatch.onmicrosoft.com`);
        expect(discussion.body).toContain(`Action Name: ${newCategory.resolutionStatus[index + 1].actions[0].actionName}`);
        expect(discussion.body).toContain(`Subject: ${newCategory.resolutionStatus[index + 1].actions[0].subject}`);
        expect(discussion.body).toContain(newCategory.resolutionStatus[index + 1].actions[0].messageBody);
      });
    });
  });

});
