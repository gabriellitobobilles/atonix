import { browser, by, $$, $, element, ElementFinder } from 'protractor';
import { Listview } from './listview.po';
import { MapPage } from '../page/features/map.po';
import { Helper } from '../helpers/helper';
import { MilestoneStatus } from '../helpers/interface';

const helper = new Helper();

export class ProgramNavigator extends MapPage {

  spinnerImg = $(`[id="spinner"]`);
  tabElements = $$(`[ng-repeat="tab in vm.tabs"] > a`); // or $$(`[role="tab"]`)

  // Map
  hoverBoxMilestoneTable = $(`#bvHoverBox > .scheduleTable`);
  hoverScheduleRepeater = $$(`#hoverContainer [ng-repeat="milestone in hvrvm.assetMilestonesAndDates"]`);
  milestoneRepeaterSelector = `[ng-repeat="milestone in hvrvm.assetMilestonesAndDates"]`;

  // Change Live Status Modal
  liveStatusDetails = $(`[ng-repeat="pds in csVM.collations.processDataStatuses"]`);
  changeStatusDropDown = $(`[ng-model="pds.nowStatus"]`);
  liveSatatusSpinner = $(`[ng-show="pds.saving"] > .fa-spinner`);
  liveStatusCloseBtn = $(`[ng-click="csVM.close()"]`);
  liveStatusSuccessMsg = $(`.modal-content`).element(by.cssContainingText(`span`, `status set to`));

  getTabNames() {
    return {
      // info: 'Info',
      // attachments: 'Attachments',
      // blog: 'Blog',
      // location: 'Location',
      summary: 'Summary',
      map: 'Map',
      trends: 'Trends',
      views: 'Views',
      lists: 'Lists',
      search: 'Search'
    };
  }

  getTabElementByName(tabName: string) {
    return this.tabElements.filter(tab => {
      return tab.getText().then(text => {
        return text === tabName;
      });
    }).first();
  }

  openTab(tabName: string) {
    this.getTabElementByName(tabName).click();
  }

  getMapInfoTrayChart() {
    return this.getMapMilestoneFn(this.infoTrayTabContents.chart);
  }

  getMapHoverMilesStone() {
    return this.getMapMilestoneFn(this.hoverAssetBox);
  }

  getMapMilestoneFn(elem: ElementFinder) {
    helper.waitForVisible(elem.$$(this.milestoneRepeaterSelector).get(0));
    return elem.$$(this.milestoneRepeaterSelector).map(milestone => {
      return {
        milestoneName: milestone.$$(`td`).get(0).getText(),
        actual: milestone.$$(`td`).get(1).getText(),
        planned: milestone.$$(`td`).get(2).getText(),
      };
    });
  }

  /**
   * used to set the live status in Change Live Status window in Maps
   * @param status {string} - `MilestoneStatus` enum.
   * @returns obj {res: boolean, msg: string}
   */
  setMapLiveStatus(status: MilestoneStatus): { res: boolean, msg: string } {
    this.changeStatusDropDown.$(`[label="${MilestoneStatus[status]}"]`).click();
    const setBtn = $(`[ng-click="csVM.ok(pds)"]`);
    helper.waitAndClick(setBtn, 1500);
    helper.waitForVisible(this.liveSatatusSpinner, 5000);
    helper.waitForDisappear(this.liveSatatusSpinner);
    const successCheckIcon = $$(`.fa-check`).get(0);

    if (!successCheckIcon.isDisplayed() || !this.liveStatusSuccessMsg.isDisplayed()) {
      return {
        res: false, msg: `Asset: ${this.getAssetChangeLiveStatusWindow()} change Live status not successfully failed`
      };
    }
    return {
      res: true,
      msg: 'success'
    };
  }

  /**
   * open Change Live Status window, sets Live status, close window
   * @param status MilestoneStatue
   */
  updateMapLiveStatus(status: MilestoneStatus) {
    this.infoTrayChangeStatusBtn.click();
    helper.waitForVisible($(`.modal-header`), 5000);
    this.setMapLiveStatus(MilestoneStatus[`${status}`]);
    this.liveStatusCloseBtn.click();
  }

  async getAssetChangeLiveStatusWindow() {
    const details = await this.liveStatusDetails.getText();
    return details.split(/\n/).filter(detail => detail.includes('Asset:'))[0];
  }

  /**
   * gets the actual and plan status of the project.
   * @returns {obj} `{actual: string, plan: string}`
   */
  async getInfoTrayProjectStatus() {
    const projectStatus = await this.infoTrayProjectStatus.getText();
    return {
      actual: projectStatus.split(/\n/)[1],
      plan: projectStatus.split(/\n/)[3]
    };
  }
}
