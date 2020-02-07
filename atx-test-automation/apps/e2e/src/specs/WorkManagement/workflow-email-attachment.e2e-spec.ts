/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';
import { Utils } from '../../helpers/utils';
import { browser } from 'protractor';
import { PriorityValues, IssueCreationData } from '../../helpers/interface';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const issueManagemwentPage = new Pages.IssueManagement();
const issueSnapshotPage = new Pages.IssueSnapshot();
const helper = new Helper();
const date = new Date();
const util = new Utils();

const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const newCategory = generateCategory();
const issueCreateData: IssueCreationData = generateIssue(newCategory);

describe('Workflow - Email Action', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.goToWorkManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.createCategoryComplete(newCategory);
  });

  it('should be able to add Resolution status with Email attachments', async () => {
    const resolutionStatuses = newCategory.resolutionStatus;
    const resolutioinDetails = await workflowEditorPage.getAllActions();

    resolutioinDetails.forEach((resolution, idx) => {
      expect(resolution.name).toEqual(resolutionStatuses[idx].name);
      resolution.actions.forEach((actions, actionIdx) => {
        expect(actions.headerTitle)
          .toEqual(`${resolutionStatuses[idx].actions[actionIdx].actionName} - ${workflowEditorPage.actionTypes.email}`);
        expect(actions.type).toContain(`Action Type: ${workflowEditorPage.actionTypes.email}`);
        expect(actions.actionName).toContain(`Action Name: ${resolutionStatuses[idx].actions[actionIdx].actionName}`);
        expect(actions.recipients).toContain(`Recipients: ${resolutionStatuses[idx].actions[actionIdx].recipient}`);
        expect(actions.subject).toContain(`Subject: ${resolutionStatuses[idx].actions[actionIdx].subject}`);
        expect(actions.messageBody).toContain(`Message Body: ${resolutionStatuses[idx].actions[actionIdx].messageBody}`);
        expect(actions.allowOverride).toContain(`Allow Override: ${resolutionStatuses[idx].actions[actionIdx].allowOverride}`);

        let emailAttachments = resolutionStatuses[idx].actions[actionIdx].attachments;
        if (emailAttachments.length > 1) { emailAttachments = emailAttachments.map(x => x.split('/')[6]); }
        emailAttachments.unshift('Attachments:   (Max 20MB)');
        if (emailAttachments.length === 1) { emailAttachments.push(`<none>`); }
        const attachmentsFromWF = actions.attachments.split(/\n/);

        expect(emailAttachments).toEqual(attachmentsFromWF);
      });
    });
  });
  it('should be able to view email attachments in Issue Snapshot', async () => {
    closeWindowAndSwitch();
    addNewIssue();
    user.createNewIssue(issueCreateData, 'WM', false);
    issueSnapshotPage.saveIssueBtn.click();

    let filesFromPopUp = await issueSnapshotPage.getAttachmentsFileName();
    let emailAttachments = newCategory.resolutionStatus[0].actions[0].attachments;

    filesFromPopUp = filesFromPopUp.map(filename => (filename as string).split(':')[1]);
    emailAttachments = emailAttachments.map(x => x.split('/')[6]);

    expect(filesFromPopUp).toEqual(emailAttachments);
  });
});


function closeWindowAndSwitch() {
  util.getWindowHandles().then((window) => {
    browser.sleep(2000);
    browser.close();
    browser.switchTo().window(window[0]); // back to Issue Management
  });
}

function addNewIssue() {
  helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
  issueManagemwentPage.openNewItemBtn.click();
  util.getWindowHandles().then(window => browser.switchTo().window(window[1]));
}

function generateCategory() {
  const file = `./apps/e2e/src/test_Data/workflow/`;
  return {
    categoryName: `Email Attachment` + '_' + casual.word + '_' + date.getTime(),
    issueName: 'Membrane Cleaning',
    assetName: ['Generic Station Group'],
    resolutionStatus: [{
      name: '1_reso_Entering_' + casual.word,
      actions: [
        {
          type: 'email',
          actionName: '1_action_Entering ' + casual.word,
          recipient: userObj.email,
          subject: `Sorry for the spam 1 - ` + casual.word,
          messageBody: casual.sentence,
          allowOverride: true,
          attachments: [`${file}1.jpg`, `${file}2.png`, `${file}3.jpg`, `${file}4.jpg`, `${file}5.png`],
          advancedSettings: {
            actionStatus: actionStatus.entering,
          },
        }
      ],
    }, {
      name: '2_reso_Leaving_' + casual.word,
      actions: [
        {
          type: 'email',
          actionName: '2_action_Leaving ' + casual.word,
          recipient: userObj.email,
          subject: 'Sorry for the spam 2 -' + casual.word,
          messageBody: casual.sentence,
          allowOverride: true,
          attachments: [],
          advancedSettings: {
            actionStatus: actionStatus.leaving,
          },
        }
      ],
    }, {
      name: `3_reso Nothing Here`,
      actions: [],
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
