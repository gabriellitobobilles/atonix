"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var path = require('path');
var downloadsPath = path.resolve(__dirname, '../../ConvertedJSFiles/src/test_Data/DownloadFiles');
var fs = require('fs');
var InvestmentAccelerator = /** @class */ (function () {
    function InvestmentAccelerator() {
        // getter
        this.menuapps = protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        this.investAcrapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName.ng-binding', 'Investment Accelerator'));
        this.viewExpapp = protractor_1.element(protractor_1.by.cssContainingText('div.ACDisplayName.ng-binding', 'View Explorer'));
        this.viewExpTitle = protractor_1.element(protractor_1.by.className('navbar-text appTitle hidden-xs ng-binding'));
        this.VEparentNtree = protractor_1.$$('[class="assetTreeNode adhocTreeNode ng-scope"]');
        this.VEchildNtree = protractor_1.$$('[ng-repeat="adhocNode in node.children"]');
        this.vePc1UnitPerf = protractor_1.element(protractor_1.by.cssContainingText('div.col-xs-12.bvReportTitle.ng-binding', 'Unit Performance'));
        this.iaPc1UnitPerf = protractor_1.element(protractor_1.by.cssContainingText('div.col-xs-12.bvReportTitle', 'Unit Performance'));
        this.IAparentNtree = protractor_1.$$('[class="assetTreeNode adhocTreeNode"]');
        this.IAchildNtree = protractor_1.$$('[ng-repeat="adhocNode in node.children"]');
        this.IAexpandNode = protractor_1.$('[class="arrow-cursor fa fa-caret-right"]');
        this.assetnavixp4 = protractor_1.element.all(protractor_1.by.css('[ng-click="treeController.expand(node)"]')).get(5);
        this.assetnavinDtc = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'nD Test Client'));
        this.assetnavinTsg = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'nD Test StationGroup'));
        this.assetnavinNts = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'nD Test Station'));
        this.assetnavinNts1 = protractor_1.element(protractor_1.by.css('#panewest > panewest > div:nth-child(2) > div > div > div.treeList.treeWithAutoComplete > div:nth-child(5) > div.childArea > div > div:nth-child(5) > div.childArea > div > div > div:nth-child(1) > a > span'));
        this.assetnaviSDC = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'SEKOIA Demo Clients'));
        this.assetnaviCoM = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'City of Metropolis'));
        this.assetnaviUGM = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'));
        this.assetnaviDC = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Demo Clients'));
        this.assetnaviCP = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Coal Plants'));
        this.assetnaviES = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern Station'));
        this.assetnaviEPc1 = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern PC1'));
        this.jumptobtn = protractor_1.element(protractor_1.by.css('#quicksearch > div.btn-group.dropup > button'));
        this.jmplastqtr = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]', 'Last Quarter'));
        this.reqInfoLink = protractor_1.element(protractor_1.by.css('[href="/Utilities/WorkPackage/index.html"]'));
        this.hidepanel = protractor_1.element(protractor_1.by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open'));
        this.openpanel = protractor_1.element(protractor_1.by.className('ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed'));
        // investment accelerator map tab
        this.progresBar = protractor_1.element(protractor_1.by.cssContainingText('[class="progress-bar"]', 'Retrieving Data...'));
        this.maptab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Map'));
        this.mapdrpdown = protractor_1.element(protractor_1.by.model('sekoiaSelectedGeospa'));
        this.mapdrpdwn1 = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div:nth-child(6) > geospa-drop-down > select'));
        this.mapToggleKey = protractor_1.$('[id="trigger-tab"]').element(protractor_1.by.className('fa fa-key'));
        this.mapzoomIn = protractor_1.element(protractor_1.by.css('#geoSpa_zoom_slider > div.esriSimpleSliderIncrementButton'));
        this.mapzoomOut = protractor_1.element(protractor_1.by.css('#geoSpa_zoom_slider > div.esriSimpleSliderDecrementButton'));
        this.infotabPanel = protractor_1.element(protractor_1.by.id('infoTab'));
        this.mapAttrTrayXpanded = protractor_1.$('[class="attribute-tray-right-popup expanded"]');
        this.mapAttrTrayHidden = protractor_1.$('[class="attributeTab attributeTab-notAvailable"]');
        this.mapAttrTrayOtab = protractor_1.$('[class="attributeTab"]');
        this.closeAsetInfo = protractor_1.element(protractor_1.by.className('fa fa-button fa-close'));
        this.mapTkeyCircuit = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div.mapView.selectedMapView.esriPopupMap1 > div:nth-child(4) > div.attribute-tray-bottom-popup > div > div > div > div:nth-child(1) > div > div.col-sm-10.no-padding.no-margin.legend > div > div:nth-child(1) > div > div > div > label > input'));
        this.mapTkeyPoles = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center.ui-layout-pane-hover.ui-layout-pane-center-hover.ui-layout-pane-open-hover.ui-layout-pane-center-open-hover > panecenter > div > div > div.panel.no-margin.withoutTrend > div > div > div > div > div.mapView.selectedMapView.esriPopupMap1 > div:nth-child(4) > div.attribute-tray-bottom-popup > div > div > div > div:nth-child(1) > div > div.col-sm-10.no-padding.no-margin.legend > div > div:nth-child(2) > div > div > div > label > input'));
        // investment accelerator timeline
        this.timelineTab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Timeline'));
        this.timelnDropdown = protractor_1.$("[ng-model=\"iaTimelineVM.selectedChart\"]");
        this.trnd3dots = protractor_1.element(protractor_1.by.cssContainingText('[class="highcharts-title"]', '...'));
        this.trndCost = protractor_1.element(protractor_1.by.cssContainingText('[class="highcharts-title"]', 'Cost'));
        this.chartConMenu = protractor_1.element(protractor_1.by.className('highcharts-button-symbol'));
        this.chartConItm = protractor_1.element.all(protractor_1.by.className('highcharts-menu-item'));
        this.timelnFilter = protractor_1.element(protractor_1.by.className('fa fa-filter'));
        this.timelnFltrDrpdwn = protractor_1.$$('[ng-repeat="pt in iaTimelineVM.projectTypes"]');
        this.tlnFltrPRchck = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div:nth-child(3) > div.in.collapse > div:nth-child(6) > input'));
        this.tlnExpndChrt = protractor_1.element(protractor_1.by.className('fa fa-expand'));
        // investment accelerator trends
        this.trendsTab = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Trends'));
        this.trendDropdown = protractor_1.$("[ng-model=\"iaTrendsVM.selectedChart\"]");
        this.trndCapCost = protractor_1.element(protractor_1.by.cssContainingText('[class="highcharts-title"]', 'Capital Costs'));
        this.trndDrpdown = protractor_1.element(protractor_1.by.css('#layout > div.ui-layout-center.ui-layout-container.ui-layout-pane.ui-layout-pane-center > div.ui-layout-center.ui-layout-pane.ui-layout-pane-center > panecenter > div > div > div > div > div.panel-heading > span > select'));
        this.cOcLgndS0 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0"]').element(protractor_1.by.tagName("text")).element(protractor_1.by.tagName("tspan"));
        this.cOcLgndS0b = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0 "]').element(protractor_1.by.tagName("text")).element(protractor_1.by.tagName("tspan"));
        this.cOcLgndS0hide = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-0 highcharts-series-0 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("text")).element(protractor_1.by.tagName("tspan"));
        this.toogleLviewBtn = protractor_1.element(protractor_1.by.className('fa fa-list-ul'));
        this.saveNcOFaBtn = protractor_1.element(protractor_1.by.css('#list > div.panel-heading > span > button'));
        this.listFltrTxtbx = protractor_1.element(protractor_1.by.id('ui-grid-filter-input-'));
        this.selAllNoneBtn = protractor_1.element(protractor_1.by.css('#list > div.panel-heading > button:nth-child(1)'));
        this.editSelBtn = protractor_1.element(protractor_1.by.css('#list > div.panel-heading > button:nth-child(2)'));
        this.selChckLboxBtn = protractor_1.element(protractor_1.by.className('fa fa-button fa-check-square'));
        this.selUnchckLboxBtn = protractor_1.element(protractor_1.by.className('fa fa-button fa-square-o'));
        this.dlExcelBtn = protractor_1.element(protractor_1.by.className('fa fa-download fa-button'));
        this.batchEditInfoLbl = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="batchVM.setTab(\'attribute\')"]', 'Batch Edit Asset Info'));
        this.chartZoomYaxis = protractor_1.element(protractor_1.by.className('highcharts-axis highcharts-yaxis '));
        this.dlExcelsToast = protractor_1.element(protractor_1.by.cssContainingText('[class="toast-message"]', 'Search results downloaded to spreadsheet.'));
        // investment accelerator views
        this.invstAccViews = protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.selectTab(tab)"]', 'Views'));
        this.iaViewHideSpiner = protractor_1.element(protractor_1.by.className('fa fa-spinner fa-pulse fa-3x fa-fw ng-hide'));
        this.iaViewActvSpiner = protractor_1.element(protractor_1.by.className('fa fa-spinner fa-pulse fa-3x fa-fw ng-animate ng-hide-animate ng-hide-add ng-hide ng-hide-add-active'));
        this.viewsDropdown = protractor_1.$("[ng-model=\"reportViewerVM.selectedReport\"]");
        this.viewsDrpdwnUR = protractor_1.element(protractor_1.by.cssContainingText('[ng-model="reportViewerVM.selectedReport"]', 'Unit Reliability'));
        this.viewChartLoadng = protractor_1.element(protractor_1.by.cssContainingText('[class="chart-warning"]', '    Loading Data'));
        this.viewChartLoad = protractor_1.element(protractor_1.by.className('chart-warning ng-hide'));
        this.eastrnPc1LgndS0 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS1 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS2 = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS10 = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS11 = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS0b = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 "]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS1b = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 "]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS2b = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 "]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS10b = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10 "]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS11b = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11 "]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS0hide = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-0 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS1hide = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-1 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS2hide = protractor_1.$('[class="highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS10hide = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-0 highcharts-series-10 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("tspan"));
        this.eastrnPc1LgndS11hide = protractor_1.$('[class="highcharts-legend-item highcharts-scatter-series highcharts-color-1 highcharts-series-11 highcharts-legend-item-hidden"]').element(protractor_1.by.tagName("tspan"));
        this.deleteAlreadyDownloadedFiles = function (Namefile) {
            var filename = (downloadsPath + '\\' + Namefile).replace(/\\/g, '/');
            if (fs.existsSync(filename)) {
                // delete if there is any existing file with same name
                fs.unlinkSync(filename);
            }
        };
    }
    InvestmentAccelerator.prototype.selectTrendsDropdown = function (option) {
        this.trendDropdown.$("[label=\"" + option + "\"]").click();
    };
    InvestmentAccelerator.prototype.selectMapDropdown = function (option) {
        this.mapdrpdown.$("[label=\"" + option + "\"]").click();
    };
    InvestmentAccelerator.prototype.selectTimelnDropdown = function (option) {
        this.timelnDropdown.$("[label=\"" + option + "\"]").click();
    };
    InvestmentAccelerator.prototype.selectViewsDropdown = function (option) {
        this.viewsDropdown.$("[label=\"" + option + "\"]").click();
    };
    InvestmentAccelerator.prototype.verifyFileInDownloadsFolder = function (fileName) {
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
    return InvestmentAccelerator;
}());
exports.InvestmentAccelerator = InvestmentAccelerator;
//# sourceMappingURL=InvestmentAccelerator_po.js.map