import { browser, by, $$, $, element, ElementFinder, utils, ElementArrayFinder } from 'protractor';
import { Helper } from '../../helpers/helper';
import { protractor } from 'protractor/built/ptor';
import { ProgramNavigator } from '../programNavigator.po';


const helper = new Helper();

export class MapPage {
  mapLayer = $(`#geoSpa_layers > svg`);
  mapSpinner = $(`.mapLoadingSpinner > span.fa-spinner`);

  quickSearchBtn = $(`#quicksearchpopup > .btn-group > button`);
  filterBtn = $(`#quicksearchpopup #filterToggle`);
  searchFilterTxt = $(`[ng-model="tagSearchPopupVM.searchText"]`);
  searchBtn = $(`.mapFilter form > #tagSearchPopup div > button[type="submit"]`);

  // Info Tray
  infoTray = $(`.attribute-tray-right-popup`);
  infoTrayExpanded = $(`.attribute-tray-right-popup.expanded`);
  infoTrayAssetName = $(`.trayTitle`);
  infoTrayRefreshBtn = $(`.attribute-tray-right-popup.expanded .fa-refresh`);
  infoTrayCloseBtn = $(`.attribute-tray-right-popup.expanded .fa-close`);
  infoTrayTabHeaders = {
    chart: $(`.attributeTab > .fa-line-chart`),
    info: $(`.attributeTab > .fa-info-circle`),
    attachments: $(`.attributeTab > .fa-paperclip`),
    discussion: $(`.attributeTab > .fa-comment-o`),
    tags: $(`.attributeTab > .fa-tag`),
  };
  infoTrayTabContents = {
    chart: $(`[ng-show="aitVM.selectedTab === 'charts'"]`),
    info: $(`#infoTab`),
    attachments: $(`[ng-show="aitVM.selectedTab === 'attachments'"]`),
    discussion: $(`[ng-show="aitVM.selectedTab === 'discussion'"]`),
    tags: $(`[ng-show="aitVM.selectedTab === 'tags'"]`),
  };
  // this is for Project Status Actual and Project Status Plan
  infoTrayProjectStatus = $(`[ng-show="aitVM.selectedTab === 'charts'"] [ng-if="aitVM.showStatus"]`);
  infoTrayChangeStatusBtn = $(`[ng-click="aitVM.changeStatus()"]`);

  // Hover Box and asset info when mouseover on Assets in map
  hoverAssetBox = $(`#hoverContainer`);
  hoverBoxAssetName = $$(`#bvHoverBox > div`).get(0);

  // SVG elements in maps
  svgCircles = $$(`#geoSpa_layers > svg > g > circle`);
  svgPath = element.all(
    by.xpath(`//div[@id="geoSpa_layers"]/*[local-name()='svg']/*[contains(@id,'features_layer')]/*[local-name()='path']`));

  zoomInBtn = $(`#geoSpa_zoom_slider > [title="Zoom In"]`);
  zoomOutBtn = $(`#geoSpa_zoom_slider > [title="Zoom Out"]`);

  /**
   *
   * @param tab infoTrayTabs property in mapPage
   * @example selectInfoTrayTabs(this.infoTrayTabs.chart)
   */
  selectInfoTrayTabs(tab: ElementFinder) {
    tab.click();
  }

  /**
   * selects / clicks the asset in the map
   * @param assetElem Element of the asset to be selected
   * @example
   * const assetElement = maps.svgCircles.get(1)
   * maps.selectAssetFromMap(assetElement)
   */
  selectAssetFromMap(assetElem: ElementFinder) {
    browser.actions().click(assetElem.getWebElement()).perform();
    helper.waitForVisible(this.infoTrayExpanded);
    browser.sleep(1000);
  }

  /**
   * does a mouseover on an asset in maps and waits for the hover box
   * @param assetElem Element of the asset to be selected
   */
  mouseMoveToAsset(assetElem: ElementFinder) {
    helper.waitForVisible(assetElem, 10000);
    browser.actions().mouseMove(assetElem.getWebElement()).perform();
    helper.waitForVisible(this.hoverAssetBox);
    // helper.waitForVisible(this.hoverBoxMilestoneTable);
  }

  /**
   * returns circle and path elements in maps
   */
  getMapElements() {
    return {
      circles: this.svgCircles as ElementArrayFinder,
      paths: this.svgPath as ElementArrayFinder
    };
  }

  getMilestoneFn(elem: ElementFinder, type: string) {
    helper.waitForVisible(elem.$$(`[ng-repeat="milestone in hvrvm.assetMilestonesAndDates"]`).get(0));
    return elem.$$(`[ng-repeat="milestone in hvrvm.assetMilestonesAndDates"]`).map(milestone => {
      return {
        milestoneName: milestone.$$(`td`).get(0).getText(),
        actual: milestone.$$(`td`).get(1).getText(),
        planned: milestone.$$(`td`).get(2).getText(),
      };
    });
  }

  getInfoTrayContentByTab(tabElem: ElementFinder) {
    if (tabElem === this.infoTrayTabContents.chart) {
      return this.infoTrayTabContents.chart.getText();
    } else if (tabElem === this.infoTrayTabContents.info) {
      return `Info. Some code goes here`;
    } else if (tabElem === this.infoTrayTabContents.attachments) {
      return `Attachments. Some code goes here`;
    }
  }

  getHoverDetails() {

  }
}
