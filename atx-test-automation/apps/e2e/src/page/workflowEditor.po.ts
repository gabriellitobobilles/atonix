import { browser, by, $$, element, $, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../helpers/utils';
import { Helper } from '../helpers/helper';
import { EmailActionData, AttributeActionData, UpdateResolutionActionData } from '../helpers/interface';

const util = new Utils();
const helper = new Helper();

export class WorkflowEditor {

  public configureWorkflowBtn = element(by.css('[ng-if="baseVM.canConfigureWorkflow"] > a'));
  public addCategoryBtn = $(`[title="Add"]`);
  public assetsList = $$(`[class='assetTreeNode adhocTreeNode ng-star-inserted']  > div > span`);
  public categoryTitle = $(`.mat-card-title`);
  public categoryHolder = element(by.className('row ng-star-inserted'));
  public clientNameTxt = $(`mat-card-content > div:nth-child(2) > span`); // need to send update request for element name
  public classDropdown = $(`mat-card-content > div:nth-child(3) > select`); // element name needs update
  public categoryDropdown = $(`mat-card-content > div:nth-child(4) > select`);

  public contentHolder = $(`atx-statuses .work-management`);

  public resolutionStatusBtnAll = $$(`atx-statuses mat-card-content > form`);

  public resolutionActionAttributeAll = $$(`.drawer-content.mat-card`).get(0)
    .$$('atx-action-form-update-attribute-details');
  public resolutionActionEmailAll = $$(`.drawer-content.mat-card`).get(0)
    .$$('atx-action-form-email-details');

  // Issue Acitity Open and Closed Header button
  public issueActivityOpenBtn = element(by.cssContainingText('.mat-expansion-panel-header-title', 'Open'));
  public issueActivityCloseBtn = element(by.cssContainingText('.mat-expansion-panel-header-title', 'Closed'));
  public groupHolder = $$(`atx-category-actions > .drawer-content.mat-card`);

  // Category Settings Section
  public categorySettings = {
    categorySetingsBtn: $(`[title="Category Settings"]`),
    categoryName: $$(`atx-view-category-settings mat-card-content > div > span`).get(0),
    issueClass: $$(`atx-view-category-settings mat-card-content > div > span`).get(1),
    assetClassesList: $$(`atx-view-category-settings mat-card-content > div > ul > li`),
    closeBtn: $(`atx-view-category-settings mat-card-title > button`),
    contentHolder: $(`atx-view-category-settings > div`),
  };

  public categoryNameTxt = $(`[formcontrolname="categoryDescription"]`);
  public issueClassDropDown = $(`[formcontrolname="issueClassID"] > .mat-select-trigger`);
  public assetClassDropdown = $(`[formcontrolname="assetClassTypes"] > .mat-select-trigger`);
  public addNewResolutionStatusBtn = $(`atx-statuses > div > div > mat-card > mat-card-content > button`);
  public resolutionStatusNameTxt = $(`[formcontrolname="resolutionStatusName"]`);
  resolutionStatusNameSelectorStr = '[formcontrolname="resolutionStatusName"]';
  resolutionAddActionBtn = $(`atx-statuses form [title="Add Action"]`);

  public actionTypeDropDown = $(`[formcontrolname="selectedActionType"]`);
  public deleteActionBtn = $(`[title="Delete Action"]`);

  public saveBtn = element(by.cssContainingText('.mat-button-wrapper', 'Save'));
  public editBtn = $(`[title="Edit"]`);
  public cancelBtn = $(`[title="Discard"]`);
  public dialogOkBtn = $$(`mat-dialog-actions > button > span`).get(0);
  public dialogCancelBtn = $$(`mat-dialog-actions > button > span`).get(1);

  actionPanelStr = `atx-category-actions #atx-test-actions > mat-expansion-panel`;
  actionEmailFormObj = {
    actionNameTxt: $$(`[formcontrolname="actionName"]`),
    recipientTxt: $$(`[formcontrolname="recipientList"]`),
    subjectTxt: $$(`[formcontrolname="subject"]`),
    messageBody: $$(`[formcontrolname="messageBody"]`),
    allowOverride: $$(`[formcontrolname="override"]`),
    dropFilesHere: $$(`atx-action-form-email-attachment .uploadfilecontainer`),
    chooseFileBtn: $$(`atx-action-form-email-attachment [type="file"]`)
  };

  actionAttributeFormObj = {
    actionNameTxt: $$(`[formcontrolname="actionName"]`),
    attributeName: $$(`[formcontrolname="attributeName"]`),
    attributeValue: $$(`[formcontrolname="attributeValue"]`),
  };

  actionTypes = {
    email: 'Email',
    updateAMapStatus: 'Update a Map Status',
    updateAttribute: 'Update Attribute',
    updateResolutionStatus: 'Update Resolution Status'
  };
  actionTypeDropdownSelector = `[formcontrolname = 'selectedActionType']`;
  overlayBackDrop = $(`.cdk-overlay-backdrop`);

  targetResolutionStatusDropdownStr = `[formcontrolname="targetResolutionStatus"]`;
  public targetResolutionStatusDropdown = $(this.targetResolutionStatusDropdownStr);
  delayAutoWFCheckboxSelector = `[formcontrolname="delayAutoWorkflow"]`;
  /**
   * This will return the element which contains the details for the actions.
   * @param groupType - resolution | open | closed
   * @param actionType - email | attribute
   * @example const actionDetails = getStatusGroup('open', 'email')
   * @returns {array} element.
   */
  public getActionDetails(groupType: string, actionType: string) {
    // NEED TO UPDATE THIS
    switch (groupType) {
      case 'resolution':
        return this.getActionByType(this.groupHolder.get(0), actionType);
      case 'open':
        return this.getActionByType(this.groupHolder.get(1), actionType);
      case 'closed':
        return this.getActionByType(this.groupHolder.get(2), actionType);
      default:
        break;
    }
  }
  /**
   * returns the Issue Activity Panel elemen
   * @param issueActivityName - 'Open' || 'Closed'
   */
  public getIssueActivityPanel(issueActivityName: string) {
    switch (issueActivityName) {
      case 'Open':
        return $$(`.resItems > mat-expansion-panel`).first();
      case 'Closed':
        return $$(`.resItems > mat-expansion-panel`).last();
      default:
        break;
    }
  }

  public getAddAction(groupStatusElement: ElementFinder) {

  }

  /**
   * Currently just being used for getStatusGroup()
   * Returns an array
   */
  public getActionByType(elem: ElementFinder, actionType: string) {
    browser.sleep(800);
    switch (actionType) {
      case 'attribute':
        return elem.$$(`atx-action-form-update-attribute-details`);
      case 'email':
        return elem.$$(`atx-action-form-email-details`);
      case 'resolution':
        return elem.$$(`atx-action-form-update-resolution-status`);
      default:
        break;
    }
  }

  // might be able to use this later on.
  public getActionByActionGroup(actionGroupForm: ElementFinder, actionType: string) {
    // const actionSettings = actionGroupForm.$$(`atx-action-form form`);
    switch (actionType) {
      case this.actionTypes.email:
        return this.getActionEmailDetails(actionGroupForm);
      case this.actionTypes.updateAttribute:
        return this.getUpdateAttributeDetails(actionGroupForm);
      case this.actionTypes.updateResolutionStatus:
        return this.getActionEmailDetails(actionGroupForm);
      default:
        break;
    }
  }

  // async getAllActions(resolutionGroup: ElementFinder) {
  //   const actions = resolutionGroup.$$(`atx-category-actions #atx-test-actions > mat-expansion-panel`);
  //   const actionNameSelector = `mat-card > .mat-card-content > #atx-test-actions >` +
  //     `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
  //   const totalActions = await actions.count();
  //   const actionsArr = [];
  //   for (let idx = 0; idx < totalActions; idx++) {
  //     helper.clickAndSleep(actions.get(idx).$(actionNameSelector), 1500);
  //     actionsArr.push(await this.getActionDetailsV2(actions.get(idx)));
  //     helper.clickAndSleep(actions.get(idx).$(actionNameSelector), 1500);
  //   }
  //   return actionsArr;
  // }

  async getAllActions(resolutionGroup?: ElementFinder):
    Promise<Array<{
      name: string,
      actions: any[]
    }>> {
    const allResolutionStatus: ElementArrayFinder = this.resolutionStatusBtnAll;
    const resoCount = await allResolutionStatus.count();
    const resolutionArr: Array<{ name: string, actions: any }> = [];

    for (let resoIdx = 0; resoIdx < resoCount; resoIdx++) {
      // get actions
      const resolutionHeader = allResolutionStatus.get(resoIdx);
      const actions = resolutionHeader.$$(this.actionPanelStr);
      helper.waitForVisibleAndMouseMove(resolutionHeader);
      helper.clickAndSleep(resolutionHeader, 2000); // open resolution header
      const actionNameSelector = `mat-card > .mat-card-content > #atx-test-actions >` +
        `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
      const totalActions = await actions.count();

      const resoName = await resolutionHeader.$(`mat-panel-title`).getText();
      const tempActions = [];
      for (let idx = 0; idx < totalActions; idx++) {
        const actionHeader = actions.get(idx).$(actionNameSelector);
        helper.waitForVisibleAndMouseMove(actionHeader);
        helper.clickAndSleep(actionHeader, 1500); // click action header to expand
        tempActions.push(await this.getActionDetailsV2(actions.get(idx))); // store actions
        helper.clickAndSleep(actionHeader, 1500);
      }
      resolutionArr.push({ name: resoName, actions: tempActions });
    }
    return resolutionArr;
  }

  // old implementation
  async getActionDetailsV2_Old(actionForm: ElementFinder): Promise<{ name: string, settingsForm: string, advancedSettings: any }> {
    const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
      `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    const form = actionForm.$$(`form .select-settings`);
    const actionType = await actionForm.$$(`form .select-settings`).get(0).getText();
    console.log(`actionType.split(':')[1].trim(): `, actionType.split(':')[1].trim());
    const actionDetails = await this.getActionByActionGroup(actionForm, actionType.split(':')[1].trim());
    console.log(`emailDetails: `, actionDetails);
    return {
      name: await actionForm.$(actionName).getText(),
      settingsForm: await form.getText(),
      advancedSettings: 'nothing here' // await this.getAdvancedSettings(actionForm.$(`form`))
    };
  }

  async getActionDetailsV2(actionForm: ElementFinder) {
    // const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
    //   `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    const form = actionForm.$$(`form .select-settings`);
    const actionType = await actionForm.$$(`form .select-settings`).get(0).getText();
    return this.getActionByActionGroup(actionForm, actionType.split(':')[1].trim());
  }
  // async getActionDetailsV2(actionForm: ElementFinder): Promise<{ name: string, settingsForm: string, advancedSettings: any }> {
  //   const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
  //     `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
  //   const form = actionForm.$$(`form .select-settings`);
  //   return {
  //     name: await actionForm.$(actionName).getText(),
  //     settingsForm: await form.getText(),
  //     advancedSettings: await this.getAdvancedSettings(actionForm.$(`form`))
  //   };
  // }

  private async getActionEmailDetails(emailForm: ElementFinder) {
    const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
      `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    const settingsForm = emailForm.$$(`.select-settings`);

    return {
      headerTitle: await emailForm.$(actionName).getText(),
      type: await settingsForm.get(0).getText(),
      actionName: await settingsForm.get(1).getText(),
      recipients: await settingsForm.get(2).getText(),
      subject: await settingsForm.get(3).getText(),
      messageBody: await settingsForm.get(4).getText(),
      attachments: await settingsForm.get(5).getText(),
      allowOverride: await settingsForm.get(6).getText(),
      advancedSettings: await this.getAdvancedSettings(emailForm.$(`form`))
    };
  }

  private async getUpdateAttributeDetails(updateAttributeForm: ElementFinder) {
    const actionName = `mat-card > .mat-card-content > #atx-test-actions >` +
      `mat-expansion-panel > mat-expansion-panel-header > .mat-content`;
    const settingsForm = updateAttributeForm.$$(`.select-settings`);

    return {
      headerTitle: await updateAttributeForm.$(actionName).getText(),
      type: await settingsForm.get(0).getText(),
      actionName: await settingsForm.get(1).getText(),
      attributeName: await settingsForm.get(2).getText(),
      attributeValue: await settingsForm.get(3).getText(),
      advancedSettings: await this.getAdvancedSettings(updateAttributeForm.$(`form`))
    };
  }

  async getAdvancedSettings(actionFormGroup: ElementFinder) {
    const advancedSettingsHeaderBtn = `mat-expansion-panel-header[role="button"]`;
    helper.waitForVisibleAndMouseMove(actionFormGroup.$(advancedSettingsHeaderBtn)); browser.sleep(1000);
    helper.clickAndSleep(actionFormGroup.$(advancedSettingsHeaderBtn));
    return {
      executionDetails: {
        executedActionWhen: 'entering',
        transitionResolutionStatuses: await this.getTransitionResolutionStatuses(actionFormGroup),
        transitionAction: await actionFormGroup.$(`.transition-action`).getText(),
        resolutionStatusThis: await actionFormGroup.$(`.transition-resolution-status-this`).getText()
      },
      delayActionDetails: { // will update this working with Delay test task
        delayed: true,
        days: 1,
        hours: 1,
        alwaysTrigger: true
      }
    };
  }
  private async getTransitionResolutionStatuses(actionFormGroup: ElementFinder) {
    const workflowStatuses = actionFormGroup.$$(`#work-flow-status-other > mat-list-item mat-checkbox`);
    // $$(`#work-flow-status-other > mat-list-item mat-checkbox`);
    const totalWorkflowStatueses = await workflowStatuses.count();
    const statusDetails = [];
    for (let idx = 0; idx < totalWorkflowStatueses; idx++) {
      statusDetails.push({
        statusName: await workflowStatuses.get(idx).$(`.mat-checkbox-label`).getText(),
        checked: await workflowStatuses.get(idx).$(`.mat-checkbox-input`).isSelected()
      });
    }
    return statusDetails;
  }


  public getActionByStatusGroup(statusGroupElement: ElementFinder) {
    // statusGroupElement
  }

  /**
   * returns resolution element with the param resolutionName
   * @param resolutionName - string. Resolution Name to fetch
   */
  public getResolutionStatusByName(resolutionName: string) {
    return this.resolutionStatusBtnAll.filter(function (status) {
      return status.getText().then(function (text) {
        return text.includes(resolutionName);
      });
    }).first();
  }

  getResolutionStatusName(resolutionGroupElem: ElementFinder) {
    return resolutionGroupElem.$(`span.editing-names`).getText();
  }

  deleteResolutionStatus(resolutionGroupElem: ElementFinder) {
    // resolutionGroupElem.findElement
    // resolutionGroupElem.element(by
    //   .xpath(`//*[local-name()="svg"][@data-icon="trash"]/` +
    //     `ancestor::button[@class="small editing-names mat-mini-fab mat-warn ng-star-inserted"]`))
    //   .click();
    this.resolutionHeaderButtonPress(resolutionGroupElem, 'remove');
    helper.waitAndClick(this.getDeleteResoDialogConfirm(`OK`));
  }

  private getDeleteResoDialogConfirm(buttonOption: string) {
    return element(by.xpath(`//atx-modal-dialog//button/span[contains(text(),"${buttonOption}")]`));
  }

  /**
   * This function will perform up, down, edit, and cancel buttons of resolution header
   * @param element - the resolutionStatus Header element from this.getResolutionStatusByName()
   * @param {string} action - up | down | edit | cancel
   */

  public resolutionHeaderButtonPress(elem: ElementFinder, action: string) {
    const selector = `mat-expansion-panel-header button`;
    switch (action) {
      case 'up':
        helper.clickAndSleep(elem.$$(selector).get(0), 500);
        break;
      case 'down':
        helper.clickAndSleep(elem.$$(selector).get(1), 500);
        break;
      case 'edit':
        helper.clickAndSleep(elem.$$(selector).get(2), 500);
        break;
      case 'cancel':
        helper.clickAndSleep(elem.$$(selector).get(3), 500);
        break;
      case 'remove':
        helper.clickAndSleep(elem.$$(selector).get(3), 500);
        break;
      default:
        break;
    }
  }

  /** @description - function to get element from Client Parent group.  */
  public getParentClientsList(parentName: string) {
    return $$(`#assetTree > div.top-level`).filter(function (parent, index) {
      return parent.$(`div > span`).getText().then(function (text) {
        return text === parentName;
      });
    }).first();
  }

  public getCategoryOptions() {
    return this.categoryDropdown.$$(`option`);
  }

  public getClassOptions() {
    return this.classDropdown.$$(`option`);
  }

  public selectClassByName(className: string) {
    this.classDropdown.element(by.cssContainingText('.ng-star-inserted', className)).click();
  }
  public selectCategoryByName(categoryName: string) {
    this.categoryDropdown.element(by.cssContainingText('.ng-star-inserted', categoryName)).click();
  }

  /** This method will do all the category creation
   * @param categoryData - category to create. Contains data for resolution status, Open, and closed
   */
  public createCategoryComplete(categoryData: any) {
    this.addNewCategoryFn(categoryData);
    for (const idx of Object.keys(categoryData.resolutionStatus)) {
      this.addNewResolutionFn(categoryData.resolutionStatus[idx]);
      browser.sleep(500);
    }
    if (categoryData.issueActivities.open.length > 0) { // filter actions
      const issueActivityOpenBtn = this.getIssueActivityPanel('Open');
      issueActivityOpenBtn.click(); // OPEN ACTIVITY PANEL
      for (const idx of Object.keys(categoryData.issueActivities.open)) {
        this.addNewAction(issueActivityOpenBtn, categoryData.issueActivities.open[idx].type,
          categoryData.issueActivities.open[idx], true);
      }
      browser.sleep(1000);
    }
    if (categoryData.issueActivities.closed.length > 0) { // filter actions
      const issueActivityClosedBtn = this.getIssueActivityPanel('Closed');
      issueActivityClosedBtn.click();
      for (const idx of Object.keys(categoryData.issueActivities.closed)) {
        this.addNewAction(issueActivityClosedBtn, categoryData.issueActivities.closed[idx].type,
          categoryData.issueActivities.closed[idx], true);
      }
      browser.sleep(1000);
    }
    this.saveCategory();
    helper.closeToastMessage();
  }
  public addNewCategoryFn(data: any) {
    this.addCategoryBtn.isDisplayed().then(isDisplayed => {
      if (isDisplayed) {
        helper.waitForVisible(this.addCategoryBtn);
        browser.sleep(2000);
        helper.waitForElementClickable(this.addCategoryBtn);
        this.addCategoryBtn.click();
        this.categoryNameTxt.sendKeys(data.categoryName);
        if (data.issueName !== undefined) { this.selectIssueClass(data.issueName); }
        if (data.assetName !== undefined) { this.selectAssetClass(data.assetName); }
      }
    });
  }

  public addNewResolutionFn(resolutionStatusObj: any) {
    browser.sleep(500);
    this.addNewResolutionStatusBtn.click();
    const newResolutionStatus = this.resolutionStatusBtnAll.last();
    this.resolutionHeaderButtonPress(newResolutionStatus, 'edit'); // edit
    newResolutionStatus.$(this.resolutionStatusNameSelectorStr).clear();
    newResolutionStatus.$(this.resolutionStatusNameSelectorStr).sendKeys(resolutionStatusObj.name);
    this.resolutionHeaderButtonPress(newResolutionStatus, 'edit'); // save
    const actionObj = resolutionStatusObj.actions;
    if (actionObj.length > 0) {
      const resolutionHeader = this.resolutionStatusBtnAll.last();
      helper.clickAndSleep(resolutionHeader);
      for (const idx of Object.keys(actionObj)) {
        this.addNewAction(resolutionHeader, actionObj[idx].type, actionObj[idx]);
      }
    }
  }

  public editResolutionFn(elem: ElementFinder, resolutionStatusObj: any) {
    this.resolutionHeaderButtonPress(elem, 'edit'); // edit
    elem.$(this.resolutionStatusNameSelectorStr).clear();
    elem.$(this.resolutionStatusNameSelectorStr).sendKeys(resolutionStatusObj.name);
    this.resolutionHeaderButtonPress(elem, 'edit'); // save
  }

  public addNewAction(groupStatusElement: ElementFinder, actionType: string, actionData: any, issueActivityStatus = false) {
    browser.actions().mouseMove(groupStatusElement.$(`[title="Add Action"]`)).perform();
    helper.waitAndClick(groupStatusElement.$(`[title="Add Action"]`)); // CLICK ADD ACTION BUTTON
    const groupStatusActions = this.getActionHeaderAll(groupStatusElement);
    groupStatusActions.last().click(); // EXPAND EMAIL/ATTRIBUTE ACTION PANEL
    switch (actionType) {
      case 'email':
        this.addNewEmailAction(groupStatusElement, actionData);
        break;
      case 'attribute':
        this.addNewUpdateAttributeAction(groupStatusElement, actionData);
        break;
      case this.actionTypes.updateAttribute:
        this.addNewUpdateAttributeAction(groupStatusElement, actionData);
        break;
      case this.actionTypes.updateResolutionStatus:
        this.addNewUpdateResolutionStatus(groupStatusElement, actionData);
        break;
      case 'mapUpdate':
        // function call goes here
        break;
      default:
        break;
    }

    if (!issueActivityStatus) {
      this.setActionAdvancedSettings(groupStatusElement, groupStatusActions, actionData);
    } else { browser.sleep(1000); }

    // close action
    groupStatusActions.last().click();
  }

  public selectIssueClass(issueName: string) {
    browser.sleep(2000);
    helper.waitAndClick(this.issueClassDropDown);
    helper.selectFromListBoxOverlayByName(issueName);
    browser.sleep(2000);
  }

  public selectAssetClass(assetName: any) {
    helper.waitAndClick(this.assetClassDropdown);
    if (Array.isArray(assetName)) {
      for (const idx of Object.keys(assetName)) {
        helper.selectFromListBoxOverlayByName(assetName[idx]);
        browser.sleep(300);
      }
      // for (let idx = 0; idx < assetName.length; idx++) {
      //   helper.selectFromListBoxOverlayByName(assetName[idx])
      //   browser.sleep(300)
      // }
    } else { helper.selectFromListBoxOverlayByName(assetName); }
    browser.sleep(1000);
    // clicks backdrop to close drop down list
    // $(`.cdk-overlay-backdrop`).click()
    browser.actions()
      .mouseMove(this.overlayBackDrop, { x: 100, y: 100 })
      .click()
      .perform();
  }

  /**
   * returns elements array of all the actions on a certain group / panel
   * @param {ElementFinder} groupStatusContainer - group (resolution, open, closed) element
   */
  public getActionHeaderAll(groupStatusContainer: ElementFinder) { // param should be elementFinder
    const selector = `#atx-test-actions > mat-expansion-panel > mat-expansion-panel-header > span.mat-content`;
    return groupStatusContainer.$$(selector);
  }

  /**
   * returns all action section in an array. Object contains "actionHead" which is clickable to open and close the action.
   * "advancedSettings" - which contains elements and advanced action functions
   * @param groupStatusContainer - group (resolution, open, closed) element
   */
  public getActionPanelAll(groupStatusContainer: ElementFinder) {
    const actionContainerSelector = `#atx-test-actions > mat-expansion-panel`;

    const actionHeaderSelector = ' > ' + `mat-expansion-panel-header > span.mat-content`;

    const advancedSettingsPanel = actionContainerSelector + ` mat-expansion-panel`;
    const advancedSettings = {
      headerSelector: ` mat-expansion-panel-header > span.mat-content`,
      radioButtons: ` div.mat-expansion-panel-body > mat-radio-group > mat-radio-button`,
      transition: ` div.mat-expansion-panel-body > div > div`,
    };
    const statusListItemsSelector = 'atx-action-form mat-list > mat-list-item';
    const listChkBoxSelector = statusListItemsSelector + ' mat-checkbox';

    return {
      // action flow in advanced settings,
      // NOTE: (this and other can be interchanged depends on Entering / Leaving Status)
      // transition-resolution-status-this <- resolution where the action is.
      // transition-action <-- current action
      // transition-resolution-status-other <-
      actionHeader: groupStatusContainer.$$(actionContainerSelector + actionHeaderSelector),
      getDeleteBtn: (actionIdx: number) => {
        return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
          .$(`[title="Delete Action"]`);
      },
      advancedSettings: {
        container: groupStatusContainer.$$(advancedSettingsPanel),
        header: groupStatusContainer.$$(advancedSettingsPanel + advancedSettings.headerSelector),
        /** returns the selected Action Status
         */
        getSelectedStatusRBtn: (actionIdx: number) => {
          return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
            .$$(advancedSettings.radioButtons).filter(function (radioBtn) {
              return radioBtn.getAttribute('class').then(function (attributeValue) {
                return attributeValue.includes(`mat-radio-checked`);
              });
            });
        },
        // set Entering or Leaving status
        setActionStatus: (actionIdx: number, status: string) => {
          // browser.actions().mouseMove(groupStatusContainer.$$(advancedSettingsPanel).get(actionIdx)).perform();
          browser.sleep(2000);
          const actionRadioBtn = groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
            .$$(advancedSettings.radioButtons);
          if (status === 'Entering') {
            actionRadioBtn.$$(`label`).first().click(); actionRadioBtn.$$(`label`).first().click();
          } else {
            actionRadioBtn.$$(`label`).last().click(); actionRadioBtn.$$(`label`).last().click();
          }
        },
        flow: {
          // this method gets all items without filters of action transition
          getSelectedItemsByActionIdx: (actionIdx: number) => {
            return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
              .$$(listChkBoxSelector).filter(function (elem) {
                return elem.getAttribute('class').then(function (attributeValue) {
                  return attributeValue.includes(`mat-checkbox-checked`);
                });
              });
          },
          /**
           * returns an array of the list items in a transition. returns 0 if there are no items in the transition
           * @param actionIdx - index number of the action, 0 if there is only 1 action
           * @param transitionIdx - index number of transition transition = 0 or 2
           */
          getListItemsByTransitionIdx(actionIdx: number, transitionIdx: number) {
            return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
              .$$(advancedSettings.transition).get(transitionIdx).$$(`mat-list-item`);
          },
          getTransitionAction: (actionIdx: number) => {
            return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
              .$(`.transition-action`);
          },
          getTransitionStatusThis: (actionIdx: number) => {
            return groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
              .$(`.transition-resolution-status-this`);
          },
          setTransitionListItems: (actionIdx: number, transitionIdx: number, itemNames: string[]) => {
            console.log(`itemNames: `, itemNames);
            for (const idx of Object.keys(itemNames)) {
              groupStatusContainer.$$(actionContainerSelector).get(actionIdx)
                .$$(advancedSettings.transition).get(transitionIdx)
                .$(`mat - list - item > div > mat - checkbox`)
                .element(by.cssContainingText('.mat-checkbox-layout', itemNames[idx])).click();
            }
          },
        },
      },
    };
  }

  /**
   * returns the ListItems if there are any a transitionElement
   * @param transitionElement - ElementFinder - elementArr.first() || ElementArr.last() - which is left or right transition
   */
  public getListItemsByTransition(transitionElement: ElementFinder) {
    return transitionElement.$$(`mat - list - item`);
  }

  public setActionAdvancedSettings(groupStatusElement: ElementFinder, groupStatusActions: ElementArrayFinder, actionData: any) {
    const actionToUse = this.getActionPanelAll(groupStatusElement);
    helper.clickAndSleep(actionToUse.advancedSettings.header.last()); // expand action panel

    // set variable Entering or Leaving
    groupStatusActions.then(function (actions) {
      actionToUse.advancedSettings.setActionStatus(actions.length - 1, actionData.advancedSettings.actionStatus);
    });

    const transitionListItemHolderIdx = (actionData.advancedSettings.actionStatus === 'Entering') ? 0 : 2;
    const transitionItemNames = actionData.advancedSettings.listItemsToSelect;

    if (transitionItemNames !== undefined) {
      groupStatusActions.then(function (actions) {
        actionToUse.advancedSettings.setActionStatus(actions.length - 1,
          actionData.advancedSettings.actionStatus);
        actionToUse.advancedSettings.flow.setTransitionListItems(actions.length - 1,
          transitionListItemHolderIdx, transitionItemNames);
      });
    }

    helper.clickAndSleep(actionToUse.advancedSettings.header.last());
  }
  /**
   * emailActionData = { actionName: string, recipient: string, subject: string, messageBody: string }
   */
  public addNewEmailAction(groupStatusContainer: ElementFinder, emailActionData: EmailActionData) {
    browser.sleep(1000);
    groupStatusContainer.$$(`[formcontrolname = 'selectedActionType']`).last()
      .element(by.cssContainingText('.ng-star-inserted', 'Email')).click();
    // click to expand last | newly created action
    browser.sleep(1000);
    const actionPanel = groupStatusContainer.$(this.actionPanelStr);

    helper.clearAndSendKeys(this.actionEmailFormObj.actionNameTxt.last(), emailActionData.actionName);
    this.actionEmailFormObj.recipientTxt.last().sendKeys(emailActionData.recipient);
    this.actionEmailFormObj.subjectTxt.last().sendKeys(emailActionData.subject);
    this.actionEmailFormObj.messageBody.last().sendKeys(emailActionData.messageBody);
    if (emailActionData.allowOverride) { this.actionEmailFormObj.allowOverride.last().click(); }

    this.addEmailAttachment(actionPanel, emailActionData.attachments);
  }

  addEmailAttachment(actionPanel: ElementFinder, attachments: string[]) {
    const chooseFileBtn = actionPanel.$(`atx-action-form-email-attachment [type="file"]`);
    if (Array.isArray(attachments)) {
      if (attachments.length > 0) {
        attachments.forEach(attachment => {
          util.fileUpload(chooseFileBtn, attachment);
          browser.sleep(1500);
        });
      }
    }
  }

  getEmailAttachments(actionPanel: ElementFinder, modify = true): ElementArrayFinder {
    if (modify) {
      return actionPanel.$$(`atx-action-form-email-attachment .files-list`);
    } else {
      return actionPanel.$$(`.attachment-container files-list li`);
    }
  }

  /**
   * removes email attachment by index of file name
   * @param actionPanel Element Finder of actionPanel
   * @param toDelete index as number || name as string
   */
  deleteEmailAttachment(actionPanel: ElementFinder, toDelete: number | string) {
    if (typeof toDelete === 'number') {
      actionPanel.$$(`atx-action-form-email-attachment > .files-list`).get(toDelete)
        .click();
    } else if (typeof toDelete === 'string') {
      actionPanel.element(by
        .xpath(`//div[@class="files-list ng-star-inserted"]/p[text()="${toDelete}"]/ancestor::div/button`))
        .click();
    }
  }



  /**
   * @param attributeActionData attributeActionData = { actionName: string, name: string, value: string }
   */
  public addNewUpdateAttributeAction(groupStatusContainer: ElementFinder, attributeActionData: AttributeActionData) {
    browser.sleep(1000);
    groupStatusContainer.$$(`[formcontrolname = 'selectedActionType']`).last()
      .element(by.cssContainingText('.ng-star-inserted', 'Update Attribute')).click();
    browser.sleep(1000);
    helper.clearAndSendKeys(this.actionAttributeFormObj.actionNameTxt.last(),
      attributeActionData.actionName);
    this.actionAttributeFormObj.attributeName.last().sendKeys(attributeActionData.name);
    this.actionAttributeFormObj.attributeValue.last().sendKeys(attributeActionData.value);
  }

  public selectActionTypeFn(actionType: string) {
    // this work only IF one action is open.
    // Can be updated by adding groupHolder: ElementFinder
    this.actionTypeDropDown
      .element(by.cssContainingText('.ng-star-inserted', actionType)).click();
  }

  public selectActionStatus(groupStatus: ElementFinder, status: string) {
    const actionToUse = this.getActionPanelAll(groupStatus);
  }

  /** This saves and opens the category.
   * Workaround for issue before where it loads empty state instead of openning the category
   * @param {any} categoryObj - newCategoryObj
   * @param {boolean} update  - required if it's update category
   */
  public saveAndOpenCategory(categoryObj: any, update: boolean = false) {
    this.saveBtn.click();

    if (update) { helper.waitAndClick(this.dialogOkBtn); }
    // note that there is an issue with invalid email address where is doesn't save the progress
    this.openCategory(categoryObj);
    browser.sleep(1500);
    helper.waitForVisible(this.categoryTitle);
  }

  public openCategory(categoryObj: any) {
    this.selectClassByName(categoryObj.issueName);
    this.selectCategoryByName(categoryObj.categoryName);
  }

  /** This saves the category.
   * @param {boolean} update - REQUIRED if save is Update category
   */
  public saveCategory(update: boolean = false) {
    this.saveBtn.click();
    if (update) { helper.waitAndClick(this.dialogOkBtn); }
    browser.sleep(3000);
    helper.waitForVisible(this.categoryTitle);
  }

  addNewUpdateResolutionStatus(groupStatusContainer: ElementFinder, attributeActionData: UpdateResolutionActionData) {
    browser.sleep(1000);
    groupStatusContainer.$$(`[formcontrolname = 'selectedActionType']`).last()
      .element(by.cssContainingText('.ng-star-inserted', this.actionTypes.updateResolutionStatus)).click();
    helper.clearAndSendKeys(groupStatusContainer.$$(`[formcontrolname="actionName"]`).last(), attributeActionData.actionName);
    this.selectTargetResolutionName(groupStatusContainer.$$(this.targetResolutionStatusDropdownStr).last()
      , attributeActionData.resolutionStatusName);
    // groupStatusContainer.$$(this.targetResolutionStatusDropdownStr).last()
    //   .element(by.cssContainingText('.ng-star-inserted', attributeActionData.resolutionStatusName)).click();
  }

  /**
   * Returns the resolution status target drop down list of an action.
   * @param groupStatusContainer Element Finder of ResolutionStatus.ActionPanel
   * @param actionIdx optional if there are multiple actions in one resolution status
   */
  getTargetResolutionDropdownList(groupStatusContainer: ElementFinder, actionIdx?: number): ElementFinder {
    const targetResolutionDropdown = groupStatusContainer.$$(this.targetResolutionStatusDropdownStr);

    return actionIdx !== undefined ? targetResolutionDropdown.get(actionIdx)
      : targetResolutionDropdown.get(0);
  }

  selectTargetResolutionName(groupStatusActionContainer: ElementFinder, targetResolutionName: string) {
    groupStatusActionContainer.element(by.cssContainingText('.ng-star-inserted', targetResolutionName)).click();
  }


}

