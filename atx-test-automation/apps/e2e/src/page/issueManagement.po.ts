import { browser, by, $, $$, element, ElementFinder } from 'protractor';
import { Utils } from '../helpers/utils';
import { Helper } from '../helpers/helper';
import { AddNewFilterForm } from './issueManagement-addNewFilter.po';


const util = new Utils();
const helper = new Helper();

export class IssueManagement extends AddNewFilterForm {

  configureWorkflowBtn = element(by.css('[ng-if="baseVM.canConfigureWorkflow"] > a'));
  openNewIssueBtn = $(`[title="Open New Issue"]`);
  openNewItemBtn = $(`[title="Open New Item"]`);
  // left chart - Issue count by resolution status
  pieChart1 = $(`[chart-name="issues_pie1"] .highcharts-container`);
  issueCount1 = this.pieChart1.$(`.highcharts-subtitle`);

  addNewFilterBtn = $(`div.filterAdd a[ng-click="issuesVM.addFilter()"]`);
  downloadIssuesBtn = $(`[class="fa fa-download"]`);

  // issue table list
  issueRow = $$(`tr[ng-repeat="issue in issuesVM.issues"]`); // array
  totalIssuesRow = $(`.issueTable > tbody> tr > .fullSpan`);
  columnHeader = $$(`.darkTableHeader.headerIssuesTemplateRow > td`);

  filterBtnIds = {
    id: 'idFilter',
    title: 'titleFilter',
    impactCostLow: 'impactCostLowFilter',
    impactCostHigh: 'impactCostHighFilter',
    activityStatus: 'activityStatusFilter',
    relationshipStatus: 'resolutionStatusFilter',
    startDate: 'startDateFilter',
    endDate: 'endDateFilter',
    changedBy: 'changedByFilter',
    changeStartDate: 'changeStartDateFilter',
    changeEndDate: 'changeEndDateFilter',
    closeStartDate: 'closeStartDateFilter',
    closeEndDate: 'closeEndDateFilter',
    assignedTo: 'assignedToFilter',
    keyword: 'keywordFilter',
    openDurationLow: 'openDurationLowFilter',
    openDurationHigh: 'openDurationHighFilter',
    priority: 'priorityFilter',
    scorecard: 'scorecardFilter',
    issueCategoryType: 'issueCategoryTypeFilter',
    issueTypeID: 'issueTypeIDFilter'
  };

  /**
   * returns array of path for pie slices
   * @param pieChart - PieChart# element
   */
  getPieSlices(pieChart: ElementFinder) {
    return pieChart.$$(`svg > g.highcharts-series-group > g.highcharts-series > path.highcharts-point`);
  }

  /**
   * return array of visible pie slices
   * @param pieChart - PieChart# Element
   */
  getPieSlicesVisible(pieChart: ElementFinder) {
    return this.getPieSlices(pieChart)
      .filter((pie, idx) => {
        return pie.getAttribute('visibility').then((visiblePie) => {
          return visiblePie !== 'hidden';
        });
      });
  }

  getPieLegends(pieChart: ElementFinder) {
    return pieChart.$$(`svg > g.highcharts-legend > g > g > g`);
  }

  getConfigureWfBtn() {
    return this.configureWorkflowBtn;
  }

  goToConfigureWorkflow() {
    this.configureWorkflowBtn.click();
  }

  async getIssueDetailsById(issueNumber: string, issueNumberIdx = 0) {
    const issueRowFound = this.issueRow.filter((row) => {
      return row.$$('td').get(issueNumberIdx).getText().then((text) => {
        return text === issueNumber;
      });
    }).first();


    const issueDetails = issueRowFound.$$('td');
    return {
      issueNumber: await issueDetails.get(0).getText(),
      name: await issueDetails.get(1).getText(),
      status: await issueDetails.get(3).getText(),
      resolution: await issueDetails.get(4).getText(),
      category: await issueDetails.get(9).getText(),
      priority: await issueDetails.get(12).getText(),
    };
  }

  async getIssueDetailsByIdWM(issueNumber: string, issueNumberIdx = 0) {
    const issueRowFound = this.issueRow.filter((row) => {
      return row.$$('td').get(issueNumberIdx).getText().then((text) => {
        return text === issueNumber;
      });
    }).first();
    const issueDetails = issueRowFound.$$('td');
    return {
      category: await issueDetails.get(0).getText(),
      issueNumber: await issueDetails.get(1).getText(),
      name: await issueDetails.get(2).getText(),
      status: await issueDetails.get(3).getText(),
      resolution: await issueDetails.get(4).getText(),
      priority: await issueDetails.get(5).getText(),
    };
  }

  getColumnHeaderByText(columnName: string) {
    return this.columnHeader.filter((column) => {
      return column.getText().then((text) => {
        return text.trim() === columnName;
      });
    }).first();
  }

  async getColumnItemsByColName(columnName: string) {
    // const columnId =
    // const columnsID = {
    //   ID: 0, TITLE: 1, STATUS: 3, RESOLUTION: 4,
    //   CATEGORY: 9, PRIORITY: 10
    // };

    // return this.issueRow.map((elem, index) => {
    //   return elem.$$(`td`).get(columnsID[columnName]).getText();
    // });
    const col = await this.getColumnID(columnName);

    return this.issueRow.map((elem, index) => {
      return elem.$$(`td`).get(col.indexOf(columnName)).getText();
    });

  }

  private getColumnID(colName: string) {
    return this.columnHeader.$$(`b`).map((p) => {
      return p.getText();
    });
  }

  getFilterButtons(filterBtnStr: string) {
    // return $(filterBtn);
    return element(by.id(filterBtnStr));
  }

  getCalendarBtn(btnStr: string) {
    return $(`[ng-click="issuesVM.showDatePicker($event,'${btnStr}')"]`);
  }

  uploadFile() {

  }

}
