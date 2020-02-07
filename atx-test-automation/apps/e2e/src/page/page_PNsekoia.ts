import { ElementFinder, browser, $, $$, by, element } from 'protractor';

const path = require('path');
const downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');
const fs = require('fs');

export class AngularPage {
  // getter
  // spec01_PNsekoia
  menuapps = element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  sekoiaapp = element(by.cssContainingText('div.ACDisplayName.ng-binding', 'Program Navigator'));
  searchasset = element(by.css('input.form-control.assetAutoComplete.ng-pristine.ng-untouched.ng-valid.ng-valid-editable.ng-empty'));
  assetaddnav = element(by.css('.btn.btn-default.fa.fa-button.btn-sm.fa-plus-circle'));
  assetnavi3 = element.all(by.css('[ng-click="treeController.click(node)"]')).get(3);
  assetnavixp3 = element.all(by.css('[ng-click="treeController.expand(node)"]')).get(3);
  assetnaviSDC = element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'SEKOIA Demo Clients'));
  assetnaviUGM = element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'));
  assetnaviUGM0 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(4) > div.childArea > div > div:nth-child(2) > div:nth-child(1)'));
  addhoctreename = element(by.css('input.form-control.ng-pristine.ng-untouched.ng-empty.ng-invalid.ng-invalid-required.ng-valid-maxlength'));
  cboxassoclent1 = element.all(by.css('input.ng-pristine.ng-untouched.ng-valid.ng-empty')).get(1);
  cboxassoapp1 = element.all(by.css('[ng-click="saveAHTVM.setSpecificApps()"]')).get(0);
  addcategoryahdd = element(by.css('.btn.btn-default.dropdown-toggle'));
  pickddaddcat1 = element.all(by.css('[ng-click="saveAHTVM.setSelection(c)"]')).get(1);
  canceladdhoc = element(by.css('[ng-click="saveAHTVM.cancel()"]'));
  saveaddhoc = element(by.css('[ng-click="saveAHTVM.save()"]'));
  editaddhocbtn = element(by.css('[ng-click="treeController.editMode()"]'));
  treenameline1 = element(by.className('TreeName'));
  deladdhocbtn = element(by.css('[ng-click="treeController.deleteTree()"]'));
  runaddhocbtn = element(by.css('[ng-click="treeController.runMode()"]'));
  jmplastmonth = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Month'));
  jmpnow = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Now'));
  jmptomorrow = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Tomorrow'));
  // spec01_PNsekoia and spec02_PNmaps common
  jumptobtn = element(by.css('#quicksearch > div.btn-group.dropup > button'));
  jmplastyr = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Year'));
  jmplastqtr = element(by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Quarter'));
  mapdrpdown = element(by.model('sekoiaSelectedGeospa'));
  // spec02_PNmaps
  maptab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
  maptabt = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > ul > li:nth-child(2) > a'));
  // mapzoomIn = element.all(by.className('esriSimpleSliderIncrementButton')).get(1);
  mapzoomIn = element(by.css('#geoSpa_zoom_slider > div.esriSimpleSliderIncrementButton'));
  mapzoomOut = element.all(by.className('esriSimpleSliderDecrementButton')).get(1);
  // spec03_PNsearch
  sekiosearchtab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Search'));
  searchtxtboxtab = element(by.model('tagSearchVM.searchText'));
  sekoisaveicon = element(by.css('[ng-click="tagSearchVM.saveQuickSearch(tagSearchVM.selectedQuickSearch)"]'));
  sekoisearchtips = element(by.css('[ng-click="tagSearchVM.hideHelpText = !tagSearchVM.hideHelpText"]'));
  sekioqksavetbox = element(by.model('saveQuickSearchVm.name'));
  sekoimakepublc = element(by.model('saveQuickSearchVm.isPublic'));
  sekoiaddcatgry = element(by.model('aConCatVM.Candidate'));
  addsearchcat = element(by.css('[ng-click="aConCatVM.addCandidate()"]'));
  sekoiqksaveok = element(by.css('[ng-click="saveQuickSearchVm.ok()"]'));
  choosecatgries2 = element.all(by.model('c.selected')).get(2);
  searchdropdown = element(by.css('#quicksearch > div > div > button.btn.btn-default.dropdown-toggle'));
  searchdrpdwnQS = element(by.cssContainingText('[ng-click="tagSearchVM.updateSelectedQuicksearch(item)"]', 'quicksearch testing'));
  searchdelete4 = element.all(by.css('[ng-click="tagSearchVM.deleteQuickSearch(item)"]')).get(4);
  searchdelete3 = element.all(by.css('[ng-click="tagSearchVM.deleteQuickSearch(item)"]')).get(3);
  sekoiserchbtn = element(by.css('[ng-click="tagSearchVM.search()"]'));
  srchAssetgClps = element(by.css('[ng-click="assetGroup.collapsed = !assetGroup.collapsed"]'));
  srchAtachmntgClps = element(by.css('[ng-click="attachmentGroup.collapsed = !attachmentGroup.collapsed"]'));
  srchPhotosgClps = element(by.css('[ng-click="photosGroup.collapsed = !photosGroup.collapsed"]'));
  srchAsetIsuesgClps = element(by.css('[ng-click="assetIssuesGroup.collapsed = !assetIssuesGroup.collapsed"]'));
  srchDiscusEntrygClps = element(by.css('[ng-click="discussionEntriesGroup.collapsed = !discussionEntriesGroup.collapsed"]'));
  srchCFAuditEntrygClps = element(by.css('[ng-click="cashflowAuditEntriesGroup.collapsed = !cashflowAuditEntriesGroup.collapsed"]'));
  exportsrchresbtn = element(by.css('[ng-click="tagSearchVM.searchAndExport()"]'));
  srchToogleBtn = element(by.css('button.btn.btn-info.dropdown-toggle'));
  // spec03_PNsearch, spec04_PNlist and spec05_PNviews common
  searchasset3 = element(by.model('typeaheadVM.customSelected'));
  // spec04_PNlist
  slistdrpdwn = element(by.model('listVM.selectedMap'));
  slisttab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Lists'));
  // spec05_PNviews

  // spec05_PNviews and spec06_PNtrends common
  sviewtab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Views'));
  // spec06_PNtrends
  assetnavixp13 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div:nth-child(1) > span'));
  assetnavixp14 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div.childArea > div > div:nth-child(1) > div:nth-child(1) > span'));
  assetnaviUDP1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern Station'));
  assetnaviUDP = element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'Upstream Deepwater Platforms'));
  assetnaviEPC1 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div:nth-child(1) > a > span'));
  toggleClk0 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0"]');
  toggleClk2 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2"]');
  toggleClk4 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4"]');
  toggleClk4t = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4 "]');
  toggleClk1 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1"]');
  toggleClk3 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-3"]');
  toggleUnClk0 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden"]');
  toggleUnClk2 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 highcharts-legend-item-hidden"]');
  toggleUnClk4 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4 highcharts-legend-item-hidden"]');
  toggleUnClk1 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden"]');
  toggleUnClk3 = $('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-3 highcharts-legend-item-hidden"]');
  calendrPopBtn = element(by.id('calendarPopupButton'));
  startdate = element(by.model('trVM.popupConfiguration.date1'));
  calApplyBtn = element(by.css('[ng-click="trVM.applyPopup()"]'));
  trendsdrpdwn = element(by.model('iaTrendsVM.selectedChart'));
  trendstab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
  // spec06_PNanalytics
  hidepanel = element(by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open'));
  openpanel = element(by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed'));
  dltableBtn = element(by.css('[ng-click="prjcftvm.downloadTable()"]'));
  dlchartcBtn = element(by.css('[ng-click="buttonsVM.Download()"]'));
  assetnavi2 = element.all(by.css('[ng-click="treeController.click(node)"]')).get(2);
  assetnavixp2 = element.all(by.css('[ng-click="treeController.expand(node)"]')).get(2);
  assetnavi2a = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div:nth-child(1) > a > span'));
  assetnavixp2a = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.selectedAsset > span'));
  // function/method
  async verifyFileInDownloadsFolder(fileName: string) {
    await console.log('Getting users download path ' + downloadsPath);
    const filePath = (downloadsPath + '\\' + fileName).replace(/\\/g, '/');
    await console.log('Getting the path ' + filePath);
    await browser.wait(async () => fs.existsSync(filePath));
    await expect(fs.existsSync(filePath)).toBe(true,
      'Failed to download file: ' + fileName + ' in user directory' + filePath);
    await console.log('File download was successful');
  }


  deleteAlreadyDownloadedFiles = function (Namefile: string) {
    // var filename = downloadsPath+ '/chart.csv';
    const filename = (downloadsPath + '\\' + Namefile).replace(/\\/g, '/');
    if (fs.existsSync(filename)) {
      // delete if there is any existing file with same name
      fs.unlinkSync(filename);
    }
  };
}
