/**
 * Test Case: 19683
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19683
 */

import { User } from '../../helpers/user';
import { userObj, automationAssetData } from '../../helpers/testDetails.data';
import { Utils } from '../../helpers/utils';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';

const user = new User();
const workflowEditorPage = new Pages.WorkflowEditor();
const helper = new Helper();
const date = new Date();

const actionStatus = {
  entering: 'Entering',
  leaving: 'Leaving',
};

const newCategory = generateCategory();

describe('Workflow - Email Action', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.goToIssueManagementConfigureWorkflow();
    helper.selectClient(automationAssetData.clientGroup, automationAssetData.clientName);
    workflowEditorPage.addNewCategoryFn(newCategory);
  });

  it('Email Action fields should be present', () => {
    workflowEditorPage.addNewResolutionStatusBtn.click();
    const resolutionHeader = workflowEditorPage.resolutionStatusBtnAll.last();
    resolutionHeader.click();
    helper.waitAndClick(resolutionHeader.$(`[title="Add Action"]`));
    workflowEditorPage.getActionHeaderAll(resolutionHeader).first().click();

    const actionTypes = workflowEditorPage.actionTypes;
    workflowEditorPage.selectActionTypeFn(actionTypes.email);
    expect(workflowEditorPage.actionEmailFormObj.actionNameTxt.last().isPresent()).toBeTruthy();
    expect(workflowEditorPage.actionEmailFormObj.recipientTxt.last().isPresent()).toBeTruthy();
    expect(workflowEditorPage.actionEmailFormObj.messageBody.last().isPresent()).toBeTruthy();
    expect(workflowEditorPage.actionEmailFormObj.allowOverride.last().isPresent()).toBeTruthy();

    helper.clickAndSleep(workflowEditorPage.deleteActionBtn, 3000); // delete action for next step
    workflowEditorPage.deleteResolutionStatus(workflowEditorPage.resolutionStatusBtnAll.last());
  });
  it('should be able to add Resolution status with Email action', async () => {
    workflowEditorPage.createCategoryComplete(newCategory);
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
      });
    });

    expect(resolutioinDetails.length)
      .toEqual(resolutionStatuses.length, `Resolution Status should be equal to ${resolutionStatuses.length}`);
  });

});

function generateCategory() {
  return {
    categoryName: `EmailNewSaveBug` + '_' + casual.word + '_' + date.getTime(),
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
