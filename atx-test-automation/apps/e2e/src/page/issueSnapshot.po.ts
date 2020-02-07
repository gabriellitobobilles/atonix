import { browser, by, $, element, $$, ElementFinder, ElementArrayFinder } from 'protractor';
import { IssueCreationData } from '../helpers/interface';
import { Helper } from '../helpers/helper';
import { setPriority } from 'os';
import { Utils } from '../helpers/utils';

const helper = new Helper();
const util = new Utils();

export class IssueSnapshot {

  modalHeader = $(`.modal-header`);
  issueClassDropdown = $(`[ng-model="baseVM.newClass"]`);
  issueCategoryDropdown = $(`[ng-model="baseVM.newCategory"]`);
  createNewIssueBtn = $(`[ng-click="baseVM.createNewIssue(baseVM.newCategory)"]`);

  // top right buttons
  saveIssueBtn = $(`[title="Save Changes"]`);
  deleteIssueBtn = $(`[title="Delete Issue"]`);
  deleteItemBtn = $(`[title="Delete Item"]`);
  // General - Left panel
  generalContainer = $(`.ui-layout-rounded`);
  leftPanel = this.generalContainer.$(`.container-fluid > div.row > div:nth-child(1)`);
  assetName = this.leftPanel.$(`b.uppercase`);
  issueNumber = this.leftPanel.$(`b[ng-if="baseVM.issue.AssetIssueID != -1"]`);
  generalInfoLabel = this.generalContainer.$(`b.tab-label`);
  issueNameTxt = this.generalContainer.$(`[ng-model="baseVM.issue.IssueTitle"]`);
  priorityDropdown = this.generalContainer.$(`[ng-model="baseVM.issue.Priority"]`);
  showOnScorecardCheckbox = this.generalContainer.$(`[ng-model="baseVM.issue.Scorecard"]`);

  // General - Center panel
  centerPanel = $(`.container-fluid > div.row > div:nth-child(2)`);
  issueClassNameLabel = this.centerPanel.$$(`div.row span.ng-binding`).get(0);
  categoryLabel = this.centerPanel.$$(`div.row span.ng-binding`).get(1);
  issueStatusDropdown = $(`[ng-model="baseVM.issue.ActivityStatusID"]`);
  resolutionStatusDropdown = $(`[ng-model="baseVM.issue.ResolutionStatusID"]`);

  // General - Right panel

  // Summary Panel
  summaryPane = {
    shortSummaryTxt: $('#shortSummary'),
    saveShortSummary: $(`[ng-click="baseVM.saveShortSummary()"]`),
    issueSummaryEditBtn: $(`[title="Edit"]`),
    issueSummaryFileImport: $(`#issueSummaryFileInput`),
    issueSummaryContentDisplay: $(`[class="panel-body issueTextEditor"]`),
    issueSummaryContentiFrame: $(`#mceIssueSummary_ifr`),
    issueSummaryContentTxtArea: $(`[data-id="mceIssueSummary"]`),
    saveIssueSmmary: $(`[ng-click="baseVM.saveSummary()"]`),
  };

  detailsPane = {
    tagInput: $(`div[id="issueTagsDiv"] #addTag`),
    tagAddBtn: $(`div[id="issueTagsDiv"] button`)
  };

  // Email Pop up
  emailPopUpModal = $(`[name="editEmailForm"]`);
  emailPopUpActionName = $$(`[name="editEmailForm"] .form-group .data-tag`).get(0);
  emailPopUpRecipients = $(`[name="editEmailForm"] [name="recipients"]`);
  emailPopUpSubject = $(`[name="editEmailForm"] [name="subject"]`);
  emailSendBtn = $(`[ng-click="editEmailVM.SendEmail()"]`);
  emailCancelBtn = $(`[ng-click="editEmailVM.Cancel()"]`);

  toastSuccess = $(`.toast-success`);
  toastMessage = $(`.toast-message`);
  toastCloseBtn = $(`.toast-close-button`);

  overlay = $(`[ng-show="baseVM.saving"]`);

  // Discussion
  showAutoGenEntries = $(`[ng-model="discussionVM.showAutogenEntries"]`);
  discussionEntries = $$(`[ng-repeat="entry in discussionVM.discussion.Entries | orderBy : '-CreateDateZ.getTime()'"]`);

  emailPopUpIframe = $(`[name="editEmailForm"] iframe`);
  emailPopUpBody = $(`p`);

  // can be refractored commented for Screenplay pattern
  createNewIssue(issueData: IssueCreationData) {
    this.issueClassDropdown.$(`[label="${issueData.issueClass}"]`).click();
    helper.waitAndClick(this.issueCategoryDropdown.$(`[label="${issueData.issueCategory}"]`));
    // helper.waitAndClick(this.issueCategoryDropdown.$(`[label="architecto_15477221197161"]`))
    this.createNewIssueBtn.click();
    helper.waitForDisappear($(`.modal-content`));
    browser.sleep(3000);
    this.fillIssueForm(issueData);
    helper.waitForVisible(this.issueNumber);
    return this.issueNumber.getText();
  }

  getCategoryOptions() {
    return this.issueCategoryDropdown.$$(`option`);
  }

  // can be refractored commented for Screenplay pattern
  fillIssueForm(issueData: IssueCreationData) {
    const issueInfo = issueData.issueInfo;
    helper.clearAndSendKeys(this.issueNameTxt, issueInfo.name);
    this.priorityDropdown.$(`[label="${issueInfo.priority}"]`).click();
    // NEED LOGIC FOR SHOW ON SCORECARD. IF it's selected or what... yeah!

    this.setIssueStatus(issueData.issueInfo.status);
    this.summaryPane.shortSummaryTxt.sendKeys(issueInfo.shortSummary);
    this.saveIssueBtn.click();
    browser.sleep(2000);
    helper.waitForVisible(this.deleteIssueBtn);
    browser.sleep(1000);
  }
  /**
   * @param prio  'Low', 'Medium', 'High', 'Critical'
   */
  setIssuePriority(prio: string) {
    this.priorityDropdown.$(`[value="${prio}"]`).click();
  }

  /**
   * @param status Open | Closed
   */
  setIssueStatus(status: string) {
    this.issueStatusDropdown.$(`[label="${status}"]`).click();
  }

  /**
   * returns array of options in Resolution Status drop down
   */
  getResolutionStatus() {
    return this.resolutionStatusDropdown.$$(`option`);
  }

  /**
   * @returns string of selected resolution status
   */
  getSelectedResolutionStatus() {
    return this.resolutionStatusDropdown.$(` option[selected="selected"]`).getText();
  }

  setResolutionStatus(resolutionName: string) {
    this.resolutionStatusDropdown.$(`[label="${resolutionName}"]`).click();
  }

  waitForOverlay() {
    helper.waitForVisibleAndDisappear(this.overlay);
  }

  async getAllDiscussionEntryDetailsElem() {
    const discussionEntriesElem = $$(`[ng-repeat="entry in discussionVM.discussion.Entries | orderBy : '-CreateDateZ.getTime()'"] `);
    const entries = [];
    const totalDiscussion = await discussionEntriesElem.count();

    for (let idx = 0; idx <= totalDiscussion - 1; idx++) {
      entries.push({
        header: this.getDiscussionHeader(discussionEntriesElem.get(idx)),
        body: this.getDiscussionBody(discussionEntriesElem.get(idx)),
        footer: this.getDiscussionFooter(discussionEntriesElem.get(idx))
      });
    }
    return entries;
  }

  getDiscussionHeader(discussionElem: ElementFinder) {
    const panelHeader = discussionElem.$(`.panel-heading`);
    /** might need to break down to 'Action', 'from', 'date'
     * Ex:
     * header: {
     *  action: string,
     *  from: string,
     *  date: string
     * }
     */
    return panelHeader.getText();
  }
  getDiscussionBody(discussionElem: ElementFinder) {
    const panelBody = discussionElem.$$(`.panel-body.issueTextEditor [ng-bind-html="entry.SafeContent"] p`);
    // might need to create object later body: {}

    return panelBody.getText();
  }
  getDiscussionFooter(discussionElem: ElementFinder) {
    const panelFooter = discussionElem.$(`.panel-footer`);

    return panelFooter.getText();
  }

  getToastMessage() {
    helper.waitForVisible(this.toastMessage);
    const toastMessage = this.toastMessage.getText();
    this.toastCloseBtn.click();

    helper.waitForDisappear(this.toastMessage);
    return toastMessage;
  }

  async getEmailPopUpDetails() {
    return {
      actionName: await this.emailPopUpActionName.getText(),
      recipients: await this.emailPopUpRecipients.getAttribute('value'),
      subject: await this.emailPopUpSubject.getAttribute('value'),
      body: await this.getEmailPopUpBody()
    };
  }

  async getEmailPopUpBody() {
    util.switchToIframe(this.emailPopUpIframe);

    const body = await this.emailPopUpBody.getText();
    util.switchToMainFrame();
    return body.split(/\n/);
  }

  getAttachments(): ElementArrayFinder {
    return $$(`.entryAttachments > div[ng-repeat="file in editEmailVM.emailOverride.EmailAttachments"]`);
  }

  getAttachmentByName(name: string): ElementFinder {
    return element(by.xpath(`//div[@ng-repeat="file in editEmailVM.emailOverride.EmailAttachments"]//a[text()="File:${name}"]`));
  }

  getAttachmentsFileName() {
    return this.getAttachments().map(fileNames => {
      return fileNames.getText();
    });
  }


}
