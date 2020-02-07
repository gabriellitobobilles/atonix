import { IssueSnapshot } from './issueSnapshot.po';
import { IssueCreationData } from '../helpers/interface';
import { Helper } from '../helpers/helper';
import { browser } from 'protractor';

const helper = new Helper();

export class FillIssueForm extends IssueSnapshot {

  async fillIssue(issueData: IssueCreationData, type: string) {

    const issueInfo = issueData.issueInfo;

    // if (type === 'IM') { deleteBtn = this.deleteIssueBtn; } else { deleteBtn = this.deleteItemBtn; }
    const deleteBtn = (type === 'IM') ? this.deleteIssueBtn : this.deleteItemBtn;

    helper.clearAndSendKeys(this.issueNameTxt, issueInfo.name); // issueName
    this.priorityDropdown.$(`[label="${issueInfo.priority}"]`).click();
    // NEED LOGIC FOR SHOW ON SCORECARD. IF it's selected or what... yeah!
    this.setIssueStatus(issueData.issueInfo.status);
    this.summaryPane.shortSummaryTxt.sendKeys(issueInfo.shortSummary);

    // Commented first because this is not set yet in Data passed by spec.
    // add later.
    //
    // issueData.details.tags.forEach(tag => {
    //   this.detailsPane.tagInput.sendKeys(tag);
    //   this.detailsPane.tagAddBtn.click();
    // });
    browser.sleep(2000);
  }

}
