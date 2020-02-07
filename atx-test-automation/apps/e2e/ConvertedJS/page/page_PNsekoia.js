"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var path = require('path');
var downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');
var fs = require('fs');
var AngularPage = /** @class */ (function () {
    function AngularPage() {
        // getter
        // spec01_PNsekoia
        this.menuapps = protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        this.sekoiaapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName.ng-binding', 'Program Navigator'));
        this.searchasset = protractor_1.element(protractor_1.by.css('input.form-control.assetAutoComplete.ng-pristine.ng-untouched.ng-valid.ng-valid-editable.ng-empty'));
        this.assetaddnav = protractor_1.element(protractor_1.by.css('.btn.btn-default.fa.fa-button.btn-sm.fa-plus-circle'));
        this.assetnavi3 = protractor_1.element.all(protractor_1.by.css('[ng-click="treeController.click(node)"]')).get(3);
        this.assetnavixp3 = protractor_1.element.all(protractor_1.by.css('[ng-click="treeController.expand(node)"]')).get(3);
        this.assetnaviSDC = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'SEKOIA Demo Clients'));
        this.assetnaviUGM = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'));
        this.assetnaviUGM0 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(4) > div.childArea > div > div:nth-child(2) > div:nth-child(1)'));
        this.addhoctreename = protractor_1.element(protractor_1.by.css('input.form-control.ng-pristine.ng-untouched.ng-empty.ng-invalid.ng-invalid-required.ng-valid-maxlength'));
        this.cboxassoclent1 = protractor_1.element.all(protractor_1.by.css('input.ng-pristine.ng-untouched.ng-valid.ng-empty')).get(1);
        this.cboxassoapp1 = protractor_1.element.all(protractor_1.by.css('[ng-click="saveAHTVM.setSpecificApps()"]')).get(0);
        this.addcategoryahdd = protractor_1.element(protractor_1.by.css('.btn.btn-default.dropdown-toggle'));
        this.pickddaddcat1 = protractor_1.element.all(protractor_1.by.css('[ng-click="saveAHTVM.setSelection(c)"]')).get(1);
        this.canceladdhoc = protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.cancel()"]'));
        this.saveaddhoc = protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.save()"]'));
        this.editaddhocbtn = protractor_1.element(protractor_1.by.css('[ng-click="treeController.editMode()"]'));
        this.treenameline1 = protractor_1.element(protractor_1.by.className('TreeName'));
        this.deladdhocbtn = protractor_1.element(protractor_1.by.css('[ng-click="treeController.deleteTree()"]'));
        this.runaddhocbtn = protractor_1.element(protractor_1.by.css('[ng-click="treeController.runMode()"]'));
        this.jmplastmonth = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Month'));
        this.jmpnow = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Now'));
        this.jmptomorrow = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Tomorrow'));
        // spec01_PNsekoia and spec02_PNmaps common
        this.jumptobtn = protractor_1.element(protractor_1.by.css('#quicksearch > div.btn-group.dropup > button'));
        this.jmplastyr = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Year'));
        this.jmplastqtr = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Quarter'));
        this.mapdrpdown = protractor_1.element(protractor_1.by.model('sekoiaSelectedGeospa'));
        // spec02_PNmaps
        this.maptab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
        this.maptabt = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > ul > li:nth-child(2) > a'));
        // mapzoomIn = element.all(by.className('esriSimpleSliderIncrementButton')).get(1);
        this.mapzoomIn = protractor_1.element(protractor_1.by.css('#geoSpa_zoom_slider > div.esriSimpleSliderIncrementButton'));
        this.mapzoomOut = protractor_1.element.all(protractor_1.by.className('esriSimpleSliderDecrementButton')).get(1);
        // spec03_PNsearch
        this.sekiosearchtab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Search'));
        this.searchtxtboxtab = protractor_1.element(protractor_1.by.model('tagSearchVM.searchText'));
        this.sekoisaveicon = protractor_1.element(protractor_1.by.css('[ng-click="tagSearchVM.saveQuickSearch(tagSearchVM.selectedQuickSearch)"]'));
        this.sekoisearchtips = protractor_1.element(protractor_1.by.css('[ng-click="tagSearchVM.hideHelpText = !tagSearchVM.hideHelpText"]'));
        this.sekioqksavetbox = protractor_1.element(protractor_1.by.model('saveQuickSearchVm.name'));
        this.sekoimakepublc = protractor_1.element(protractor_1.by.model('saveQuickSearchVm.isPublic'));
        this.sekoiaddcatgry = protractor_1.element(protractor_1.by.model('aConCatVM.Candidate'));
        this.addsearchcat = protractor_1.element(protractor_1.by.css('[ng-click="aConCatVM.addCandidate()"]'));
        this.sekoiqksaveok = protractor_1.element(protractor_1.by.css('[ng-click="saveQuickSearchVm.ok()"]'));
        this.choosecatgries2 = protractor_1.element.all(protractor_1.by.model('c.selected')).get(2);
        this.searchdropdown = protractor_1.element(protractor_1.by.css('#quicksearch > div > div > button.btn.btn-default.dropdown-toggle'));
        this.searchdrpdwnQS = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="tagSearchVM.updateSelectedQuicksearch(item)"]', 'quicksearch testing'));
        this.searchdelete4 = protractor_1.element.all(protractor_1.by.css('[ng-click="tagSearchVM.deleteQuickSearch(item)"]')).get(4);
        this.searchdelete3 = protractor_1.element.all(protractor_1.by.css('[ng-click="tagSearchVM.deleteQuickSearch(item)"]')).get(3);
        this.sekoiserchbtn = protractor_1.element(protractor_1.by.css('[ng-click="tagSearchVM.search()"]'));
        this.srchAssetgClps = protractor_1.element(protractor_1.by.css('[ng-click="assetGroup.collapsed = !assetGroup.collapsed"]'));
        this.srchAtachmntgClps = protractor_1.element(protractor_1.by.css('[ng-click="attachmentGroup.collapsed = !attachmentGroup.collapsed"]'));
        this.srchPhotosgClps = protractor_1.element(protractor_1.by.css('[ng-click="photosGroup.collapsed = !photosGroup.collapsed"]'));
        this.srchAsetIsuesgClps = protractor_1.element(protractor_1.by.css('[ng-click="assetIssuesGroup.collapsed = !assetIssuesGroup.collapsed"]'));
        this.srchDiscusEntrygClps = protractor_1.element(protractor_1.by.css('[ng-click="discussionEntriesGroup.collapsed = !discussionEntriesGroup.collapsed"]'));
        this.srchCFAuditEntrygClps = protractor_1.element(protractor_1.by.css('[ng-click="cashflowAuditEntriesGroup.collapsed = !cashflowAuditEntriesGroup.collapsed"]'));
        this.exportsrchresbtn = protractor_1.element(protractor_1.by.css('[ng-click="tagSearchVM.searchAndExport()"]'));
        this.srchToogleBtn = protractor_1.element(protractor_1.by.css('button.btn.btn-info.dropdown-toggle'));
        // spec03_PNsearch, spec04_PNlist and spec05_PNviews common
        this.searchasset3 = protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'));
        // spec04_PNlist
        this.slistdrpdwn = protractor_1.element(protractor_1.by.model('listVM.selectedMap'));
        this.slisttab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Lists'));
        // spec05_PNviews
        // spec05_PNviews and spec06_PNtrends common
        this.sviewtab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Views'));
        // spec06_PNtrends
        this.assetnavixp13 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div:nth-child(1) > span'));
        this.assetnavixp14 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div.childArea > div > div:nth-child(1) > div:nth-child(1) > span'));
        this.assetnaviUDP1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern Station'));
        this.assetnaviUDP = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Upstream Deepwater Platforms'));
        this.assetnaviEPC1 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.childArea > div > div:nth-child(11) > div.childArea > div > div:nth-child(1) > div.childArea > div > div:nth-child(1) > div:nth-child(1) > a > span'));
        this.toggleClk0 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0"]');
        this.toggleClk2 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2"]');
        this.toggleClk4 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4"]');
        this.toggleClk4t = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4 "]');
        this.toggleClk1 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1"]');
        this.toggleClk3 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-3"]');
        this.toggleUnClk0 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden"]');
        this.toggleUnClk2 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 highcharts-legend-item-hidden"]');
        this.toggleUnClk4 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-4 highcharts-legend-item-hidden"]');
        this.toggleUnClk1 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden"]');
        this.toggleUnClk3 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-3 highcharts-legend-item-hidden"]');
        this.calendrPopBtn = protractor_1.element(protractor_1.by.id('calendarPopupButton'));
        this.startdate = protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1'));
        this.calApplyBtn = protractor_1.element(protractor_1.by.css('[ng-click="trVM.applyPopup()"]'));
        this.trendsdrpdwn = protractor_1.element(protractor_1.by.model('iaTrendsVM.selectedChart'));
        this.trendstab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
        // spec06_PNanalytics
        this.hidepanel = protractor_1.element(protractor_1.by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open'));
        this.openpanel = protractor_1.element(protractor_1.by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed'));
        this.dltableBtn = protractor_1.element(protractor_1.by.css('[ng-click="prjcftvm.downloadTable()"]'));
        this.dlchartcBtn = protractor_1.element(protractor_1.by.css('[ng-click="buttonsVM.Download()"]'));
        this.assetnavi2 = protractor_1.element.all(protractor_1.by.css('[ng-click="treeController.click(node)"]')).get(2);
        this.assetnavixp2 = protractor_1.element.all(protractor_1.by.css('[ng-click="treeController.expand(node)"]')).get(2);
        this.assetnavi2a = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div:nth-child(1) > a > span'));
        this.assetnavixp2a = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(3) > div.selectedAsset > span'));
        this.deleteAlreadyDownloadedFiles = function (Namefile) {
            // var filename = downloadsPath+ '/chart.csv';
            var filename = (downloadsPath + '\\' + Namefile).replace(/\\/g, '/');
            if (fs.existsSync(filename)) {
                // delete if there is any existing file with same name
                fs.unlinkSync(filename);
            }
        };
    }
    // function/method
    AngularPage.prototype.verifyFileInDownloadsFolder = function (fileName) {
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
    return AngularPage;
}());
exports.AngularPage = AngularPage;
//# sourceMappingURL=page_PNsekoia.js.map