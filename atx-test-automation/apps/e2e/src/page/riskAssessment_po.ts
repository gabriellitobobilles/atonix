import { ElementFinder, browser, $, $$, by, element } from 'protractor';

const path = require('path');
const downloadsPath = path.resolve(__dirname, '../../ConvertedJSFiles/src/test_Data/DownloadFiles');
const fs = require('fs');

export class RskAssessment {
  // getter
  //spec01_RAmatrix
  menuapps = element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  riskAsmntapp = element(by.cssContainingText('div.ACDisplayName.ng-binding', 'Risk Assessment'));
  RAparentNtree = $$('[class="assetTreeNode adhocTreeNode"]');
  RAchildNtree = $$('[ng-repeat="adhocNode in node.children"]');
  RAexpandNode = $('[class="arrow-cursor fa fa-caret-right"]');
  assetnaviDC = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Demo Clients'));
  assetnaviCP = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Coal Plants'));
  assetnaviES = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Eastern Station'));
  assetnaviESpc1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Eastern PC1'));
  assetnavi4RA = element(by.cssContainingText('[ng-click="treeController.click(node)"]','RA Testing'));
  assetnavi4DAED = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Distributed Asset Example Data'));
  assetnavi4DAEDv1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Distributed Asset Example Data (small) v1'));
  assetnavi4Div1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Division 1'));
  assetnavi4Dist1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','District 1'));
  assetnavixp4dsub1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Substation 1'));
  assetnavixp4dsub1dos = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div:nth-child(1) > a'));
  assetnavixp4dfed1 = element(by.cssContainingText('[ng-click="treeController.click(node)"]','Feeder 1'));
  assetnavixp2smfed1 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div:nth-child(1) > span'));
  assetnaviclckUGC145823 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div:nth-child(1) > div:nth-child(1) > a > span'));
  RMtab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]','Risk Matrix'));
  mtrxZoomIn = element(by.className('fa fa-button fa-search-plus'));
  mtrxZoomOut = element(by.className('fa fa-button fa-search-minus'));
  mtrxClearZoom = element(by.className('btn tab-filter-button btn-sm'));
  RMzoomInApld = element(by.cssContainingText('[class="tab-filter-message"]','Risk Matrix Zoom Filter is being applied'));
  RAuserGearBtn = element(by.className('fa fa-button fa-gear'));
  RAuserSettingDlg = element(by.cssContainingText('[class="col-xs-10"]','RISK MATRIX USER SETTINGS'));
  RAGearCloseBtn = element(by.className('fa fa-times closeBtn'));
  RAGearNewConfig = element(by.className('fa fa-plus fa-button'));
  RANewConfigName = element(by.css('[label="New Config 1*"]'));
  RASingleViewBtn = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div.main-view.layout-transparent-panel > div > div:nth-child(2) > div.col-sm-8.col-lg-9 > div.risk-matrix-header-2 > form > div:nth-child(1) > label > input'));
  RAsChartTerror = element(by.className('toast toast-error'));
  RAsvWhitebuble = element(by.css('#grid-chart > svg > g:nth-child(2) > g > circle'));
  RAMultiViewBtn = element(by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div.main-view.layout-transparent-panel > div > div:nth-child(2) > div.col-sm-8.col-lg-9 > div.risk-matrix-header-2 > form > div:nth-child(2) > label > input'));
  //spec02_RAmaps
  mapPanel = element(by.id('geoSpa_gc'));
  maptab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
  mapdrpdown = element(by.model('sekoiaSelectedGeospa'));
  mapzoomIn = element(by.className('esriSimpleSliderIncrementButton'));
  mapzoomOut = element(by.className('esriSimpleSliderDecrementButton'));
  mapToggleKey = $('[id="trigger-tab"]').element(by.className('fa fa-key'));
  mapAttrTrayXpanded = $('[class="attribute-tray-right-popup expanded"]');
  mapAttrTrayHidden = $('[class="attributeTab attributeTab-notAvailable"]');
  mapKeyPadTrans = element.all(by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(0);
  mapKeyUGPowCab = element.all(by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(1);
  mapKeyDistrFeed = element.all(by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(2);
  mapFilterBtn = element(by.id('filterToggle'));
  searchTboxMapFltr = element(by.model('tagSearchPopupVM.searchText'));
  raSerchFltrBtn = element(by.className('btn btn-default btn-sm pull-right'));
  raSerchClrFltr = element(by.css('[ng-click="tagSearchPopupVM.clearSearch()"]'));
  closeAsetInfo = element(by.className('fa fa-button fa-close'));
  //spec03_RAmapAItrays
  assetExapp = element(by.cssContainingText('div.ACDisplayName.ng-binding', 'Asset Explorer'));
  AEparentNtree = $$('[class="assetTreeNode adhocTreeNode ng-scope"]');
  AEchildNtree = $$('[ng-repeat="adhocNode in node.children"]');
  attachmntTab = element(by.css('[ng-click="vm.setTab(\'attachments\')"]'));
  attachPhotoBtn = element.all(by.css('[ng-click="attachVM.addAttachment(vm.selectedAsset)"]')).get(0);
  attachFileBtn = element.all(by.css('[ng-click="attachVM.addAttachment(vm.selectedAsset)"]')).get(1);
  attachSelFileBtn = element(by.className('btn btn-primary ng-pristine ng-untouched ng-valid ng-empty'));
  assetnaviclckXFMR36 = element(by.css('#panewest > panewest > div:nth-child(2) > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(187) > div:nth-child(1) > a'));
  assetnaviclckXFMR36r = element(by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(186) > div:nth-child(1) > a'));
  mapAssetInfoAttach = element(by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'attachments\')"]'));
  assetExpAddTagTbox = element(by.id('addTag'));
  assetExpAddTagBtn = element(by.css('[ng-click="typeaheadVM.addKeywordTag(typeaheadVM.selectedKeyword)"]'));
  xfmr36Label = element(by.cssContainingText('[class="ng-binding"]','XFMR 36'));
  assetExpBlogTab = element(by.css('#layout > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div:nth-child(3) > ul > li:nth-child(3) > a'));
  assetExpandBlog = element(by.css('[ng-click="discussionVM.newEntry.collapsed = !discussionVM.newEntry.collapsed"]'));
  assetExpAddBlog = element(by.className('panel-heading clearfix'));
  assetBlogDropFileH = element(by.css('#blog > div > div.col-md-8.col-lg-9.col-md-pull-4.col-lg-pull-3 > div > bv-discussion > div:nth-child(2) > div.panel.newEntry.ng-pristine.ng-valid.ng-valid-required > div.panel-body.issueTextEditor.in.collapse > div:nth-child(3) > div > div'));
  assetExpBlogTitle = element(by.id('title'));
  assetExpBlogBody = element(by.id('tinymce'));
  saveAssetBtn = element(by.css('[ng-click="vm.save(vm.selectedAsset)"]'));
  saveaAllBtn = element(by.css('[ng-click="vm.saveAllChanges()"]'));
  mapAssetInfoBlog = element(by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'discussion\')"]'));
  mapAssetInfoTags = element(by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'tags\')"]'));
  attachPaneTab = element(by.id('attachments'));
  chngPopSaved = element(by.cssContainingText('[class="toast-message"]','Changes Saved.'));
  assetexpAppFlg = element(by.model('vm.selectedAsset.asset.AssetAbbrev'));
  blogAssetInfIcon = element(by.className('fa fa-comment blog'));
  mapLoadSpinr = element(by.className('mapLoadingSpinner'));
  directorytxtInfo = element(by.cssContainingText('[class="trayContentHeader"]','directory.txt'));
  circleAssetMap = $('#geoSpa_layers > svg > g > circle');
  infotabPanel = element(by.id('infoTab'));
  addtagAssetInfo = element(by.cssContainingText('[class="trayContentHeader trayHeader"]','Tags'));
  //spec04_RAmatrixList1
  listTab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Lists'));
  saveContiBtn = element(by.cssContainingText('[ng-click="tagSearchPopupSaveVM.saveSearch()"]', 'Save and Continue'));
  saveQsrchTitleTbox = element(by.css('#modal-body > div > form > div:nth-child(1) > div > input'));
  saveQsOKBtn = element(by.cssContainingText('[ng-click="saveQuickSearchVm.ok()"]', 'OK'));
  loadListSpin = element(by.className('fa fa-spinner fa-spin ng-hide'));
  toggleListSrch = element(by.className('fa fa-filter fa-button'));
  srchListTbox = element(by.id('searchText'));
  clearListTbox = element(by.css('[ng-click="searchSettings.clearSearch()"]'));
  noListViewSpin = element(by.className('fa fa-spinner fa-2x fa-pulse ng-hide'));
  clearApplyFilter = element(by.css('[ng-click="vm.clearMatrixMapFilter()"]'));
  moreListOption = element(by.className('btn btn-link dropdown-toggle'));
  moreLOptionDel = element(by.css('[ng-show="!listVM.isInvestmentAcceleratorSearch() && listVM.canDelete()"]'));
  QSdeleteToast = element(by.cssContainingText('[class="toast-message"]', 'QuickSearch deleted'));
  scoreCardNum = element(by.cssContainingText('[class="scorecard-value"]', '...'));
  noSaveRcontinue = element(by.cssContainingText('[ng-click="tagSearchPopupSaveVM.retainSearch()"]', 'Retain Search but Don\'t Save Yet'));
  ClearSrchContinue = element(by.cssContainingText('[ng-click="tagSearchPopupSaveVM.clearSearch()"]', 'Clear Search and Continue'));
  //spec05_RAmatrixList2
  matrixHideSpnnr = element(by.css('#ra-spinner.ng-hide'));
  raMatrixFilter = element(by.id('filterToggle'));
  raMtrxSrchDd = element(by.css('#quicksearchpopup > div:nth-child(1) > button'));
  raMtrxSrchDd1 = element(by.css('#quicksearch > div > div:nth-child(2) > button.btn.btn-default.dropdown-toggle.dropdown-toggle-split'));
  //spec06_RAmatrixMaps
  //spec07_RAadHocTree
  adHocInputTreeName = element(by.model('targetTree.TreeName'));
  treePopSaved = element(by.css('#toast-container > div > div'));
  viewExpapp = element(by.cssContainingText('div.ACDisplayName', 'View Explorer'));
  viewExpTitle = element(by.className('navbar-text appTitle hidden-xs ng-binding'));
  assetNaviDrpDwn = element(by.css('#panewest > div.northwest-container > panenorthwest > div.AdhocTree.ng-isolate-scope > div.adhoc-mode-controls > div > button > i'));
  adHocPubChkbox = element(by.model('targetTree.IsPrivate'));
  veAssetDrpDwn = element(by.repeater('tree in treeController.adhocTrees'));
  veAssetDdlist = $('[ng-repeat="adhocNode in node.children"]').element(by.className("ng-binding"));
  veAssetDdmenu = element(by.css('#panewest > div.northwest-container > panenorthwest > div.AdhocTree.ng-isolate-scope > div.adhoc-mode-controls > div > ul'));
  veDropDownSel = element(by.className('AdhocTree ng-isolate-scope'));
  //spec08_RAassetNavigator
  assetExpEditTree = element(by.className('btn btn-default btn-sm fa fa-button fa-pencil'));
  assetExpEditTreeD = element(by.cssContainingText('[class="btn btn-default btn-sm fa fa-button fa-pencil"]','disabled'));
  assetExpCreateTree = element(by.className('btn btn-default fa fa-button btn-sm fa-plus-circle'));
  assetAdHocTreeDlg = element(by.cssContainingText('[class="col-sm-3 col-md-3 control-label"]','Tree Name:'));
  saveBtnAdHocDlg = element(by.css('[ng-click="saveAHTVM.save()"]'));
  listUpdSaved = element(by.className('toast toast-success'));
  //spec09_RAtrends
  trendsTab = element(by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
  trnd3dots = element(by.cssContainingText('[class="highcharts-title"]','...'));
  trendRADropdown = $(`[ng-model="riskTrendsVM.selectedChart"]`);
  calendarBtn = element(by.id('calendarPopupButton'));
  calndrStartTxtbx = element(by.model('trVM.popupConfiguration.date1'));
  calndrOkBtn = element(by.css('#rangePopup > form > div.PopupBody.trPopupBody > div:nth-child(2) > div:nth-child(3) > button.btn.btn-primary'));
  chartConMenu = element(by.className('highcharts-button-symbol'));
  chartConItm = element.all(by.className('highcharts-menu-item'));
  inspctLgndS0 = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0'));
  outgLgndS1 = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1'));
  inspctLgndS0a = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 '));
  outgLgndS1a = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 '));
  inspctLgndS0hide = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden'));
  outgLgndS1hide = element(by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden'));
  tlnExpndChrt = element(by.className('fa fa-expand'));
  chartZoomTab = element(by.css('[ng-app="HChartZoomApp"]'));
  chartZoomYaxis = element(by.className('highcharts-axis highcharts-yaxis '));
  popTimeSlidrDlg = element(by.cssContainingText('[class="PopupHeader "]','Selected Time Slider'));
  chartSelected = element(by.css('[ng-change="riskTrendsVM.chartSelected()"]'));
  
  selectVEnavDropdown(option: string) {
    element(by.xpath(`//li[@ng-repeat="tree in treeController.adhocTrees"]/a[text()="${option}"]`)).click();
  }
  selectMapDropdown(option: string) {
    this.mapdrpdown.$(`[label="${option}"]`).click();
  }
  selectTrendsDropdown(option: string) {
    this.trendRADropdown.$(`[label="${option}"]`).click();
  }
  getTabNames() {
    return {
      riskMatrix: 'Risk Matrix',
      map: 'Map',
      trends: 'Trends',
      lists: 'Lists',
    };
  }
  getRiskValue(riskName: string) {
    return element.all(by
      .xpath(`//p[@class="scorecard-desc" and contains(text(),'${riskName}')]/../p[@class="scorecard-value"]`)).first().getText();
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