"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var path = require('path');
var downloadsPath = path.resolve(__dirname, '../../ConvertedJSFiles/src/test_Data/DownloadFiles');
var fs = require('fs');
var RskAssessment = /** @class */ (function () {
    function RskAssessment() {
        // getter
        //spec01_RAmatrix
        this.menuapps = protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        this.riskAsmntapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName.ng-binding', 'Risk Assessment'));
        this.RAparentNtree = protractor_1.$$('[class="assetTreeNode adhocTreeNode"]');
        this.RAchildNtree = protractor_1.$$('[ng-repeat="adhocNode in node.children"]');
        this.RAexpandNode = protractor_1.$('[class="arrow-cursor fa fa-caret-right"]');
        this.assetnaviDC = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Demo Clients'));
        this.assetnaviCP = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Coal Plants'));
        this.assetnaviES = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern Station'));
        this.assetnaviESpc1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern PC1'));
        this.assetnavi4RA = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'RA Testing'));
        this.assetnavi4DAED = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Distributed Asset Example Data'));
        this.assetnavi4DAEDv1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Distributed Asset Example Data (small) v1'));
        this.assetnavi4Div1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Division 1'));
        this.assetnavi4Dist1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'District 1'));
        this.assetnavixp4dsub1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Substation 1'));
        this.assetnavixp4dsub1dos = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div:nth-child(1) > a'));
        this.assetnavixp4dfed1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Feeder 1'));
        this.assetnavixp2smfed1 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div:nth-child(1) > span'));
        this.assetnaviclckUGC145823 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(2) > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div > div.childArea > div > div:nth-child(1) > div:nth-child(1) > a > span'));
        this.RMtab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Risk Matrix'));
        this.mtrxZoomIn = protractor_1.element(protractor_1.by.className('fa fa-button fa-search-plus'));
        this.mtrxZoomOut = protractor_1.element(protractor_1.by.className('fa fa-button fa-search-minus'));
        this.mtrxClearZoom = protractor_1.element(protractor_1.by.className('btn tab-filter-button btn-sm'));
        this.RMzoomInApld = protractor_1.element(protractor_1.by.cssContainingText('[class="tab-filter-message"]', 'Risk Matrix Zoom Filter is being applied'));
        this.RAuserGearBtn = protractor_1.element(protractor_1.by.className('fa fa-button fa-gear'));
        this.RAuserSettingDlg = protractor_1.element(protractor_1.by.cssContainingText('[class="col-xs-10"]', 'RISK MATRIX USER SETTINGS'));
        this.RAGearCloseBtn = protractor_1.element(protractor_1.by.className('fa fa-times closeBtn'));
        this.RAGearNewConfig = protractor_1.element(protractor_1.by.className('fa fa-plus fa-button'));
        this.RANewConfigName = protractor_1.element(protractor_1.by.css('[label="New Config 1*"]'));
        this.RASingleViewBtn = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div.main-view.layout-transparent-panel > div > div:nth-child(2) > div.col-sm-8.col-lg-9 > div.risk-matrix-header-2 > form > div:nth-child(1) > label > input'));
        this.RAsChartTerror = protractor_1.element(protractor_1.by.className('toast toast-error'));
        this.RAsvWhitebuble = protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(2) > g > circle'));
        this.RAMultiViewBtn = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div.main-view.layout-transparent-panel > div > div:nth-child(2) > div.col-sm-8.col-lg-9 > div.risk-matrix-header-2 > form > div:nth-child(2) > label > input'));
        //spec02_RAmaps
        this.mapPanel = protractor_1.element(protractor_1.by.id('geoSpa_gc'));
        this.maptab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
        this.mapdrpdown = protractor_1.element(protractor_1.by.model('sekoiaSelectedGeospa'));
        this.mapzoomIn = protractor_1.element(protractor_1.by.className('esriSimpleSliderIncrementButton'));
        this.mapzoomOut = protractor_1.element(protractor_1.by.className('esriSimpleSliderDecrementButton'));
        this.mapToggleKey = protractor_1.$('[id="trigger-tab"]').element(protractor_1.by.className('fa fa-key'));
        this.mapAttrTrayXpanded = protractor_1.$('[class="attribute-tray-right-popup expanded"]');
        this.mapAttrTrayHidden = protractor_1.$('[class="attributeTab attributeTab-notAvailable"]');
        this.mapKeyPadTrans = protractor_1.element.all(protractor_1.by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(0);
        this.mapKeyUGPowCab = protractor_1.element.all(protractor_1.by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(1);
        this.mapKeyDistrFeed = protractor_1.element.all(protractor_1.by.model('gsAstGrp.Symbology.symbologyScheme.gsVisible')).get(2);
        this.mapFilterBtn = protractor_1.element(protractor_1.by.id('filterToggle'));
        this.searchTboxMapFltr = protractor_1.element(protractor_1.by.model('tagSearchPopupVM.searchText'));
        this.raSerchFltrBtn = protractor_1.element(protractor_1.by.className('btn btn-default btn-sm pull-right'));
        this.raSerchClrFltr = protractor_1.element(protractor_1.by.css('[ng-click="tagSearchPopupVM.clearSearch()"]'));
        this.closeAsetInfo = protractor_1.element(protractor_1.by.className('fa fa-button fa-close'));
        //spec03_RAmapAItrays
        this.assetExapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName.ng-binding', 'Asset Explorer'));
        this.AEparentNtree = protractor_1.$$('[class="assetTreeNode adhocTreeNode ng-scope"]');
        this.AEchildNtree = protractor_1.$$('[ng-repeat="adhocNode in node.children"]');
        this.attachmntTab = protractor_1.element(protractor_1.by.css('[ng-click="vm.setTab(\'attachments\')"]'));
        this.attachPhotoBtn = protractor_1.element.all(protractor_1.by.css('[ng-click="attachVM.addAttachment(vm.selectedAsset)"]')).get(0);
        this.attachFileBtn = protractor_1.element.all(protractor_1.by.css('[ng-click="attachVM.addAttachment(vm.selectedAsset)"]')).get(1);
        this.attachSelFileBtn = protractor_1.element(protractor_1.by.className('btn btn-primary ng-pristine ng-untouched ng-valid ng-empty'));
        this.assetnaviclckXFMR36 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(187) > div:nth-child(1) > a'));
        this.assetnaviclckXFMR36r = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(186) > div:nth-child(1) > a'));
        this.mapAssetInfoAttach = protractor_1.element(protractor_1.by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'attachments\')"]'));
        this.assetExpAddTagTbox = protractor_1.element(protractor_1.by.id('addTag'));
        this.assetExpAddTagBtn = protractor_1.element(protractor_1.by.css('[ng-click="typeaheadVM.addKeywordTag(typeaheadVM.selectedKeyword)"]'));
        this.xfmr36Label = protractor_1.element(protractor_1.by.cssContainingText('[class="ng-binding"]', 'XFMR 36'));
        this.assetExpBlogTab = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div:nth-child(3) > ul > li:nth-child(3) > a'));
        this.assetExpandBlog = protractor_1.element(protractor_1.by.css('[ng-click="discussionVM.newEntry.collapsed = !discussionVM.newEntry.collapsed"]'));
        this.assetExpAddBlog = protractor_1.element(protractor_1.by.className('panel-heading clearfix'));
        this.assetBlogDropFileH = protractor_1.element(protractor_1.by.css('#blog > div > div.col-md-8.col-lg-9.col-md-pull-4.col-lg-pull-3 > div > bv-discussion > div:nth-child(2) > div.panel.newEntry.ng-pristine.ng-valid.ng-valid-required > div.panel-body.issueTextEditor.in.collapse > div:nth-child(3) > div > div'));
        this.assetExpBlogTitle = protractor_1.element(protractor_1.by.id('title'));
        this.assetExpBlogBody = protractor_1.element(protractor_1.by.id('tinymce'));
        this.saveAssetBtn = protractor_1.element(protractor_1.by.css('[ng-click="vm.save(vm.selectedAsset)"]'));
        this.saveaAllBtn = protractor_1.element(protractor_1.by.css('[ng-click="vm.saveAllChanges()"]'));
        this.mapAssetInfoBlog = protractor_1.element(protractor_1.by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'discussion\')"]'));
        this.mapAssetInfoTags = protractor_1.element(protractor_1.by.css('[ng-click="(assets.length > 1) || (aitVM.selectedTab = \'tags\')"]'));
        this.attachPaneTab = protractor_1.element(protractor_1.by.id('attachments'));
        this.chngPopSaved = protractor_1.element(protractor_1.by.cssContainingText('[class="toast-message"]', 'Changes Saved.'));
        this.assetexpAppFlg = protractor_1.element(protractor_1.by.model('vm.selectedAsset.asset.AssetAbbrev'));
        this.blogAssetInfIcon = protractor_1.element(protractor_1.by.className('fa fa-comment blog'));
        this.mapLoadSpinr = protractor_1.element(protractor_1.by.className('mapLoadingSpinner'));
        this.directorytxtInfo = protractor_1.element(protractor_1.by.cssContainingText('[class="trayContentHeader"]', 'directory.txt'));
        this.circleAssetMap = protractor_1.$('#geoSpa_layers > svg > g > circle');
        this.infotabPanel = protractor_1.element(protractor_1.by.id('infoTab'));
        this.addtagAssetInfo = protractor_1.element(protractor_1.by.cssContainingText('[class="trayContentHeader trayHeader"]', 'Tags'));
        //spec04_RAmatrixList1
        this.listTab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Lists'));
        this.saveContiBtn = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="tagSearchPopupSaveVM.saveSearch()"]', 'Save and Continue'));
        this.saveQsrchTitleTbox = protractor_1.element(protractor_1.by.css('#modal-body > div > form > div:nth-child(1) > div > input'));
        this.saveQsOKBtn = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="saveQuickSearchVm.ok()"]', 'OK'));
        this.loadListSpin = protractor_1.element(protractor_1.by.className('fa fa-spinner fa-spin ng-hide'));
        this.toggleListSrch = protractor_1.element(protractor_1.by.className('fa fa-filter fa-button'));
        this.srchListTbox = protractor_1.element(protractor_1.by.id('searchText'));
        this.clearListTbox = protractor_1.element(protractor_1.by.css('[ng-click="searchSettings.clearSearch()"]'));
        this.noListViewSpin = protractor_1.element(protractor_1.by.className('fa fa-spinner fa-2x fa-pulse ng-hide'));
        this.clearApplyFilter = protractor_1.element(protractor_1.by.css('[ng-click="vm.clearMatrixMapFilter()"]'));
        this.moreListOption = protractor_1.element(protractor_1.by.className('btn btn-link dropdown-toggle'));
        this.moreLOptionDel = protractor_1.element(protractor_1.by.css('[ng-show="!listVM.isInvestmentAcceleratorSearch() && listVM.canDelete()"]'));
        this.QSdeleteToast = protractor_1.element(protractor_1.by.cssContainingText('[class="toast-message"]', 'QuickSearch deleted'));
        this.scoreCardNum = protractor_1.element(protractor_1.by.cssContainingText('[class="scorecard-value"]', '...'));
        this.noSaveRcontinue = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="tagSearchPopupSaveVM.retainSearch()"]', 'Retain Search but Don\'t Save Yet'));
        this.ClearSrchContinue = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="tagSearchPopupSaveVM.clearSearch()"]', 'Clear Search and Continue'));
        //spec05_RAmatrixList2
        this.matrixHideSpnnr = protractor_1.element(protractor_1.by.css('#ra-spinner.ng-hide'));
        this.raMatrixFilter = protractor_1.element(protractor_1.by.id('filterToggle'));
        this.raMtrxSrchDd = protractor_1.element(protractor_1.by.css('#quicksearchpopup > div:nth-child(1) > button'));
        this.raMtrxSrchDd1 = protractor_1.element(protractor_1.by.css('#quicksearch > div > div:nth-child(2) > button.btn.btn-default.dropdown-toggle.dropdown-toggle-split'));
        //spec06_RAmatrixMaps
        //spec07_RAadHocTree
        this.adHocInputTreeName = protractor_1.element(protractor_1.by.model('targetTree.TreeName'));
        this.treePopSaved = protractor_1.element(protractor_1.by.css('#toast-container > div > div'));
        this.viewExpapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName', 'View Explorer'));
        this.viewExpTitle = protractor_1.element(protractor_1.by.className('navbar-text appTitle hidden-xs ng-binding'));
        this.assetNaviDrpDwn = protractor_1.element(protractor_1.by.css('#panewest > div.northwest-container > panenorthwest > div.AdhocTree.ng-isolate-scope > div.adhoc-mode-controls > div > button > i'));
        this.adHocPubChkbox = protractor_1.element(protractor_1.by.model('targetTree.IsPrivate'));
        this.veAssetDrpDwn = protractor_1.element(protractor_1.by.repeater('tree in treeController.adhocTrees'));
        this.veAssetDdlist = protractor_1.$('[ng-repeat="adhocNode in node.children"]').element(protractor_1.by.className("ng-binding"));
        this.veAssetDdmenu = protractor_1.element(protractor_1.by.css('#panewest > div.northwest-container > panenorthwest > div.AdhocTree.ng-isolate-scope > div.adhoc-mode-controls > div > ul'));
        this.veDropDownSel = protractor_1.element(protractor_1.by.className('AdhocTree ng-isolate-scope'));
        //spec08_RAassetNavigator
        this.assetExpEditTree = protractor_1.element(protractor_1.by.className('btn btn-default btn-sm fa fa-button fa-pencil'));
        this.assetExpEditTreeD = protractor_1.element(protractor_1.by.cssContainingText('[class="btn btn-default btn-sm fa fa-button fa-pencil"]', 'disabled'));
        this.assetExpCreateTree = protractor_1.element(protractor_1.by.className('btn btn-default fa fa-button btn-sm fa-plus-circle'));
        this.assetAdHocTreeDlg = protractor_1.element(protractor_1.by.cssContainingText('[class="col-sm-3 col-md-3 control-label"]', 'Tree Name:'));
        this.saveBtnAdHocDlg = protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.save()"]'));
        this.listUpdSaved = protractor_1.element(protractor_1.by.className('toast toast-success'));
        //spec09_RAtrends
        this.trendsTab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
        this.trnd3dots = protractor_1.element(protractor_1.by.cssContainingText('[class="highcharts-title"]', '...'));
        this.trendRADropdown = protractor_1.$("[ng-model=\"riskTrendsVM.selectedChart\"]");
        this.calendarBtn = protractor_1.element(protractor_1.by.id('calendarPopupButton'));
        this.calndrStartTxtbx = protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1'));
        this.calndrOkBtn = protractor_1.element(protractor_1.by.css('#rangePopup > form > div.PopupBody.trPopupBody > div:nth-child(2) > div:nth-child(3) > button.btn.btn-primary'));
        this.chartConMenu = protractor_1.element(protractor_1.by.className('highcharts-button-symbol'));
        this.chartConItm = protractor_1.element.all(protractor_1.by.className('highcharts-menu-item'));
        this.inspctLgndS0 = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0'));
        this.outgLgndS1 = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1'));
        this.inspctLgndS0a = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 '));
        this.outgLgndS1a = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 '));
        this.inspctLgndS0hide = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden'));
        this.outgLgndS1hide = protractor_1.element(protractor_1.by.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden'));
        this.tlnExpndChrt = protractor_1.element(protractor_1.by.className('fa fa-expand'));
        this.chartZoomTab = protractor_1.element(protractor_1.by.css('[ng-app="HChartZoomApp"]'));
        this.chartZoomYaxis = protractor_1.element(protractor_1.by.className('highcharts-axis highcharts-yaxis '));
        this.popTimeSlidrDlg = protractor_1.element(protractor_1.by.cssContainingText('[class="PopupHeader "]', 'Selected Time Slider'));
        this.chartSelected = protractor_1.element(protractor_1.by.css('[ng-change="riskTrendsVM.chartSelected()"]'));
        this.deleteAlreadyDownloadedFiles = function (Namefile) {
            var filename = (downloadsPath + '\\' + Namefile).replace(/\\/g, '/');
            if (fs.existsSync(filename)) {
                // delete if there is any existing file with same name
                fs.unlinkSync(filename);
            }
        };
    }
    RskAssessment.prototype.selectVEnavDropdown = function (option) {
        protractor_1.element(protractor_1.by.xpath("//li[@ng-repeat=\"tree in treeController.adhocTrees\"]/a[text()=\"" + option + "\"]")).click();
    };
    RskAssessment.prototype.selectMapDropdown = function (option) {
        this.mapdrpdown.$("[label=\"" + option + "\"]").click();
    };
    RskAssessment.prototype.selectTrendsDropdown = function (option) {
        this.trendRADropdown.$("[label=\"" + option + "\"]").click();
    };
    RskAssessment.prototype.getTabNames = function () {
        return {
            riskMatrix: 'Risk Matrix',
            map: 'Map',
            trends: 'Trends',
            lists: 'Lists',
        };
    };
    RskAssessment.prototype.getRiskValue = function (riskName) {
        return protractor_1.element.all(protractor_1.by
            .xpath("//p[@class=\"scorecard-desc\" and contains(text(),'" + riskName + "')]/../p[@class=\"scorecard-value\"]")).first().getText();
    };
    RskAssessment.prototype.verifyFileInDownloadsFolder = function (fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filePath;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, console.log('Getting users download path ' + downloadsPath)];
                    case 1:
                        _a.sent();
                        filePath = (downloadsPath + '\\' + fileName).replace(/\\/g, '/');
                        return [4 /*yield*/, console.log('Getting the path ' + filePath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, fs.existsSync(filePath)];
                            }); }); })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(fs.existsSync(filePath)).toBe(true, 'Failed to download file: ' + fileName + ' in user directory' + filePath)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, console.log('File download was successful')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RskAssessment;
}());
exports.RskAssessment = RskAssessment;
//# sourceMappingURL=riskAssessment_po.js.map