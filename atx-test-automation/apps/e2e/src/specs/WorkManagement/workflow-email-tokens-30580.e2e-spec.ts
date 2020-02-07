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
import { EmailActionData, AttributeActionData, IssueCreationData, PriorityValues, AssetAttributes, AttributeTypesEnum } from '../../helpers/interface';

const issueManagemwentPage = new Pages.IssueManagement();
const issueSnapshotPage = new Pages.IssueSnapshot();
const assetExplorerPage = new Pages.AssetExplorer();
const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const util = new Utils();
const helper = new Helper();
const date = new Date();

let attributesInAE: any;
let emailPopUpDetails1: { actionName: any; recipients: any; subject: any; body: any; };

const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

let issueNumber: any;

const newCategory = { ...categoryData };
newCategory.categoryName = `EmailToken_` + casual.word + '_' + date.getTime();
newCategory.issueName = 'Pole Attachment Program';
newCategory.assetName = [];
newCategory.resolutionStatus[0].name = `1_reso`;
newCategory.resolutionStatus[0].actions = [];
newCategory.resolutionStatus[1] = {
  name: '2_reso_Entering_' + casual.word,
  actions: [
    {
      type: 'email',
      actionName: '1_action_' + casual.word,
      recipient: `ngomez@fullscale.io`,
      subject: `Sorry for the spam 1 - ` + casual.word,
      messageBody: `Line 1<br>\nLine 2<br>\nLine 3`, // casual.sentence,
      allowOverride: true,
      advancedSettings: {
        actionStatus: actionStatus.entering,
      },
    }
  ],
};
newCategory.resolutionStatus[2] = {
  name: '3_reso_Leaving_' + casual.word,
  actions: [
    {
      type: 'email',
      actionName: '1_action_' + casual.word,
      recipient: `ngomez@fullscale.io`,
      subject: 'Sorry for the spam 2 -' + casual.word,
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
  },
};

const clientToUse = {
  parent: 'SEKOIA Demo Clients',
  child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P.5 - Country Lane']
};

const assetAtt: AssetAttributes = {
  name: casual.word + ` ` + casual.word,
  value: casual.sentence,
  editted_value: 'Editted Test Value',
  attributeType: AttributeTypesEnum['Freeform Text'],
  favorite: true
};

describe('Workflow - Email Token', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.assetExplorer);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.assetExplorer);
    addAttributeAndCreateWFCategory();
  });
  it('create issue', async () => {
    issueManagemwentPage.openNewItemBtn.click();
    const tabWindow = await util.getWindowHandles();

    browser.switchTo().window(tabWindow[1]);
    issueNumber = await user.createNewIssue(issueCreateData, 'WM');
  });
  describe('Entering', () => {
    it('email attributes should appear correctly', async () => {
      issueSnapshotPage.setResolutionStatus(newCategory.resolutionStatus[1].name);
      helper.clickAndWaitForVisible(issueSnapshotPage.saveIssueBtn, issueSnapshotPage.emailPopUpModal, 15000);

      emailPopUpDetails1 = await issueSnapshotPage.getEmailPopUpDetails();
      const resolutionEntering = newCategory.resolutionStatus[1];

      expect(emailPopUpDetails1.actionName).toEqual(resolutionEntering.actions[0].actionName);
      expect(emailPopUpDetails1.recipients.trim()).toEqual(`${resolutionEntering.actions[0].recipient};`);
      expect(emailPopUpDetails1.subject).toEqual(resolutionEntering.actions[0].subject);

      emailPopUpDetails1.body.forEach((item, index) => {
        expect(item).toEqual(`${attributesInAE.attributes[index]}: ${attributesInAE.values[index]}`);
      });
    });
    it('email is sent and discussion is displayed', async () => {
      issueSnapshotPage.emailSendBtn.click();
      expect(issueSnapshotPage.getToastMessage()).toEqual(`Item Saved`);

      const discussionEntries: Array<{ header: string, body: any, footer: string }>
        = await issueSnapshotPage.getAllDiscussionEntryDetailsElem();

      expect(discussionEntries.length).toEqual(1);
      discussionEntries.forEach(async (discussion, index) => {
        const msgBodyToAssert = formatForAssertDiscussionEmailBody(userObj.email, emailPopUpDetails1);

        expect(discussion.header).toContain(`Email Sent ${userObj.email}`);

        const tempBody = await discussion.body;
        tempBody.forEach((item, idx) => {
          expect(item).toEqual(msgBodyToAssert[idx].trim());
        });
      });
    });
  });
  // it('should be able to display new attribtue', () => {

  // });
  // it('should be able to display FREEFORM TEXT attribtue', () => {

  // });
  // it('should be able to display INT attribtue', () => {

  // });
  // it('should be able to display FLOAT attribtue', () => {

  // });
  // it('should be able to display BOOLEAN attribtue', () => {

  // });
  // it('should be able to display DATE attribtue', () => {

  // });
  // it('should be able to display attribtue name with spaces', () => {

  // });
});

// format message body to be saved in workflow editor email action
function formatMessageBody(attributesAndValues: { attributes: string[], values: string[] }) {
  const attrCount = attributesAndValues.attributes.length; // might use this to limit the attributes to be displayed
  const messageBodyArr = [];
  let messageBodyToSend = '';
  attributesAndValues.attributes.forEach((attribute, index) => {
    messageBodyArr.push({
      attribute,
      value: attributesAndValues.values[index]
    });
  });

  messageBodyArr.forEach(attrItem => {
    messageBodyToSend = messageBodyToSend + `${attrItem.attribute}: {{${attrItem.attribute}}}<br>`;
  });
  return messageBodyToSend;
}

function addAttribute() {
  assetExplorerPage.addAttribute(assetAtt); browser.sleep(2000);
  helper.waitAndClick(assetExplorerPage.saveAssetBtn);
  assetExplorerPage.waitForSpinner();
  assetExplorerPage.waitForToastMessage();
}

async function addAttributeAndCreateWFCategory() {
  attributesInAE = await assetExplorerPage.getAttributesValueColumn('Attribute');
  attributesInAE.attributes.push(assetAtt.name);
  attributesInAE.values.push(assetAtt.value);
  attributesInAE.attributes.push('invalidAttribute'); // add invalid attribute
  attributesInAE.values.push('N/A');
  addAttribute();
  const msgBody = formatMessageBody(attributesInAE);
  newCategory.resolutionStatus[1].actions[0].messageBody = msgBody;

  user.goToWorkManagementConfigureWorkflow();
  helper.selectClient('SEKOIA Demo Clients', 'UGM Historical Reliability Plan');
  workflowEditorPage.createCategoryComplete(newCategory);
  util.getWindowHandles().then((window) => {
    browser.close();
    browser.switchTo().window(window[0]); // back to Issue Management
  });
  helper.selectClientMain(clientToUse.parent,
    ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P.5 - Country Lane'], appName.issuesManagement);
}

// format use to assert Email Pop Up details === discussion entry
function formatForAssertDiscussionEmailBody(userEmail: string, emailDetailsFromPopUp: any) {
  const { actionName, recipients, subject, body } = emailDetailsFromPopUp;
  const msgBodyToAssert = [];
  msgBodyToAssert.push(`by ${userEmail}`);
  msgBodyToAssert.push(`Action Name: ${actionName}`);
  msgBodyToAssert.push(`Recipients: ${recipients}`);
  msgBodyToAssert.push(`Subject: ${subject}`);
  let tempBody = '';
  body.forEach(item => {
    tempBody = tempBody + item + '\n';
  });
  msgBodyToAssert.push(`Message Body: ${tempBody.trim()}`);

  return msgBodyToAssert;
}
