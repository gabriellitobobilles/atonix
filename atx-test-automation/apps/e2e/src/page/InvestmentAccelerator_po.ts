import { ElementFinder, browser, $, $$, by, element } from 'protractor';

const path = require('path');
const downloadsPath = path.resolve(__dirname, '../../ConvertedJSFiles/src/test_Data/DownloadFiles');
const fs = require('fs');

export class InvestmentAccelerator {
  // getter
  menuapps = element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  investAcrapp = element(by.cssContainingText('div.ACDisplayName.ng-binding', 'Investment Accelerator'));
  viewExpapp = element(by.cssContainingText('div.ACDisplayName.ng-binding', 'View Explorer'));
  viewExpTitle = element(by.className('navbar-text appTitle hidden-xs ng-binding'));
  VEparentNtree = $$('[class="assetTreeNode adhocTreeNode ng-scope"]');
  VEchildNtree = $$('[ng-repeat="adhocNode in node.children"]');
  vePc1UnitPerf = element(by.cssContainingText('div.col-xs-12.bvReportTitle.ng-binding', 'Unit Performance'));
  iaPc1UnitPerf = element(by.cssContainingText('div.col-xs-12.bvReportTitle', 'Unit Performance'));
  IAparentNtree = $$('[class="assetTreeNode adhocTreeNode"]');
  IAchildNtree = $$('[ng-repeat="adhocNode in node.children"]');
  IAexpandNode = $('[class="arrow-cursor fa fa-caret-right"]');
  assetnavixp4 = element.all(by.css('[ng-click="treeController.expand(node)"]')).get(5);
  assetnavinDtc = element(by.cssContainingText('[ng-click="treeController.click(node)"]','nD Test Client'));
  assetnavinTsg = element(by.cssContainingText('[ng-click="treeController.click(node)"]','nD Test StationGroup'));
  assetnavinNts = element(by.cssContainingText('[ng-click="treeController.click(node)"]','nD Test Station'));
  assetnavinNts1 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(5) > div.childArea > div > div:nth-child(5) > div.childArea > div > div > div:nth-child(1) > a > span'));
  assetnaviSDC = element(by.cssContainingText('[ng-click="treeController.click(node)"]','SEKOIA Demo Clients'));
  assetnaviCoM = element(by.cssContainingText('[ng-click="treeController.click(node)"]','City of Metropolis'));
  assetnaviUGM = element(by.cssContainingText('[ng-click="treeController.click(node)"]','UGM Historical Reliability Plan'));
  assetnaviDC = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Demo Clients'));
  assetnaviCP = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Coal Plants'));
  assetnaviES = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Eastern Station'));
  assetnaviEPc1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Eastern PC1'));
  jumptobtn = element(by.css('#quicksearch > div.btn-group.dropup > button'));
  jmplastqtr = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Quarter'));
  reqInfoLink = element(by.css('[href="/Utilities/WorkPackage/index.html"]'));
  hidepanel = element(by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open'));
  openpanel = element(by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed'));
  // investment accelerator map tab
  progresBar = element(by.cssContainingText('[class="progress-bar"]', 'Retrieving Data...'));
  maptab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
  mapdrpdown = element(by.model('sekoiaSelectedGeospa'));
  mapdrpdwn1 = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div:nth-child(6) > geospa-drop-down > select'))
  mapToggleKey = $('[id="trigger-tab"]').element(by.className('fa fa-key'));
  mapzoomIn = element(by.css('#geoSpa_zoom_slider > div.esriSimpleSliderIncrementButton'));
  mapzoomOut = element(by.css('#geoSpa_zoom_slider > div.esriSimpleSliderDecrementButton'));
  infotabPanel = element(by.id('infoTab'));
  mapAttrTrayXpanded = $('[class="attribute-tray-right-popup expanded"]');
  mapAttrTrayHidden = $('[class="attributeTab attributeTab-notAvailable"]');
  mapAttrTrayOtab = $('[class="attributeTab"]');
  closeAsetInfo = element(by.className('fa fa-button fa-close'));
  mapTkeyCircuit = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div.mapView.selectedMapView.esriPopupMap1 > div:nth-child(4) > div.attribute-tray-bottom-popup > div > div > div > div:nth-child(1) > div > div.col-sm-10.no-padding.no-margin.legend > div > div:nth-child(1) > div > div > div > label > input'));
  mapTkeyPoles = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div.mapView.selectedMapView.esriPopupMap1 > div:nth-child(4) > div.attribute-tray-bottom-popup > div > div > div > div:nth-child(1) > div > div.col-sm-10.no-padding.no-margin.legend > div > div:nth-child(2) > div > div > div > label > input'));
  // investment accelerator timeline
  timelineTab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]','Timeline'));
  timelnDropdown = $(`[ng-model="iaTimelineVM.selectedChart"]`);
  trnd3dots = element(by.cssContainingText('[class="highcharts-title"]','...'));
  trndCost = element(by.cssContainingText('[class="highcharts-title"]','Cost'));
  chartConMenu = element(by.className('highcharts-button-symbol'));
  chartConItm = element.all(by.className('highcharts-menu-item'));
  timelnFilter = element(by.className('fa fa-filter'));
  timelnFltrDrpdwn = $$('[ng-repeat="pt in iaTimelineVM.projectTypes"]');
  tlnFltrPRchck = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div:nth-child(3) > div.in.collapse > div:nth-child(6) > input'));
  tlnExpndChrt = element(by.className('fa fa-expand'));
  // investment accelerator trends
  trendsTab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
  trendDropdown = $(`[ng-model="iaTrendsVM.selectedChart"]`);
  trndCapCost = element(by.cssContainingText('[class="highcharts-title"]','Capital Costs'));
  trndDrpdown = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div > div > div.panel-heading > span > select'));
  cOcLgndS0 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0"]').element(by.tagName("text")).element(by.tagName("tspan"));
  cOcLgndS0b = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0 "]').element(by.tagName("text")).element(by.tagName("tspan"));
  cOcLgndS0hide = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0 highcharts-legend-item-hidden"]').element(by.tagName("text")).element(by.tagName("tspan"));
  toogleLviewBtn = element(by.className('fa fa-list-ul'));
  saveNcOFaBtn = element(by.css('#list > div.panel-heading > span > button'));
  listFltrTxtbx = element(by.id('ui-grid-filter-input-'));
  selAllNoneBtn = element(by.css('#list > div.panel-heading > button:nth-child(1)'));
  editSelBtn = element(by.css('#list > div.panel-heading > button:nth-child(2)'));
  selChckLboxBtn = element(by.className('fa fa-button fa-check-square'));
  selUnchckLboxBtn = element(by.className('fa fa-button fa-square-o'));
  dlExcelBtn = element(by.className('fa fa-download fa-button'));
  batchEditInfoLbl = element(by.cssContainingText('[ng-click="batchVM.setTab(\'attribute\')"]','Batch Edit Asset Info'));
  chartZoomYaxis = element(by.className('highcharts-axis highcharts-yaxis '));
  dlExcelsToast = element(by.cssContainingText('[class="toast-message"]', 'Search results downloaded to spreadsheet.'));
  // investment accelerator views
  invstAccViews = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]','Views'));
  iaViewHideSpiner = element(by.className('fa fa-spinner fa-pulse fa-3x fa-fw ng-hide'));
  iaViewActvSpiner = element(by.className('fa fa-spinner fa-pulse fa-3x fa-fw ng-animate ng-hide-animate ng-hide-add ng-hide ng-hide-add-active'));
  viewsDropdown = $(`[ng-model="reportViewerVM.selectedReport"]`);
  viewsDrpdwnUR = element(by.cssContainingText('[ng-model="reportViewerVM.selectedReport"]','Unit Reliability'));
  viewChartLoadng = element(by.cssContainingText('[class="chart-warning"]','    Loading Data'));
  viewChartLoad = element(by.className('chart-warning ng-hide'));
  eastrnPc1LgndS0 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0"]').element(by.tagName("tspan"));
  eastrnPc1LgndS1 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1"]').element(by.tagName("tspan"));
  eastrnPc1LgndS2 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2"]').element(by.tagName("tspan"));
  eastrnPc1LgndS10 = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10"]').element(by.tagName("tspan"));
  eastrnPc1LgndS11 = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11"]').element(by.tagName("tspan"));
  eastrnPc1LgndS0b = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 "]').element(by.tagName("tspan"));
  eastrnPc1LgndS1b = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 "]').element(by.tagName("tspan"));
  eastrnPc1LgndS2b = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 "]').element(by.tagName("tspan"));
  eastrnPc1LgndS10b = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10 "]').element(by.tagName("tspan"));
  eastrnPc1LgndS11b = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11 "]').element(by.tagName("tspan"));
  eastrnPc1LgndS0hide = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden"]').element(by.tagName("tspan"));
  eastrnPc1LgndS1hide = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden"]').element(by.tagName("tspan"));
  eastrnPc1LgndS2hide = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 highcharts-legend-item-hidden"]').element(by.tagName("tspan"));
  eastrnPc1LgndS10hide = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10 highcharts-legend-item-hidden"]').element(by.tagName("tspan"));
  eastrnPc1LgndS11hide = $('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11 highcharts-legend-item-hidden"]').element(by.tagName("tspan"));

  selectTrendsDropdown(option: string) {
    this.trendDropdown.$(`[label="${option}"]`).click();
  }
  selectMapDropdown(option: string) {
    this.mapdrpdown.$(`[label="${option}"]`).click();
  }
  selectTimelnDropdown(option: string) {
    this.timelnDropdown.$(`[label="${option}"]`).click();
  }
  selectViewsDropdown(option: string) {
    this.viewsDropdown.$(`[label="${option}"]`).click();
  }
  async verifyFileInDownloadsFolder(fileName: string) {
    await console.log('Getting users download path ' + downloadsPath);
    const filePath = (downloadsPath + '\\' + fileName).replace(/\\/g, '/');
    await console.log('Getting the path ' + filePath);
    await browser.wait(async () => fs.existsSync(filePath));
    await expect(fs.existsSync(filePath)).toBe(true,'Failed to download file: ' + fileName + ' in user directory' + filePath);
    await console.log('File download was successful');
  }
  deleteAlreadyDownloadedFiles = function (Namefile: string) {
    const filename = (downloadsPath + '\\' + Namefile).replace(/\\/g, '/');
    if (fs.existsSync(filename)) {
      // delete if there is any existing file with same name
      fs.unlinkSync(filename);
    }
  };
}
