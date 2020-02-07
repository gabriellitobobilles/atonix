"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19607: Data Explorer - Hamburger (Chart Context) menu', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var win;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
        appTitle.fillLoginForm();
        appTitle.confirmLogin();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
        expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
        protractor_1.browser.driver.sleep(5000);
    }));
    it('Step 1: Verify Print report feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(3000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('All Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('City Of Lawrence')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Waste Water Treatment Plants (WWTP)')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Kansas River WWTP')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree
                            .getText()];
                case 9: return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Delayed KRWWTP LIMS Data')])
                        .click()];
                case 10:
                    _l.sent();
                    appTitle.atonixTrendButtons.trenZoombtn.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 11:
                    win = _l.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 12:
                    _l.sent();
                    return [4 /*yield*/, appTitle.printPreview()];
                case 13:
                    _l.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 14:
                    _l.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Save as different file types', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /** Ensure reports can be selected from drop down list. */
                /** Downloading Chart PDF File */
                return [4 /*yield*/, appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePDF, testDetails_data_1.downloadFileType.pdf)];
                case 1:
                    /** Ensure reports can be selected from drop down list. */
                    /** Downloading Chart PDF File */
                    _a.sent();
                    /** Downloading Chart JPEG Image */
                    return [4 /*yield*/, appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileJPEG, testDetails_data_1.downloadFileType.jpeg)];
                case 2:
                    /** Downloading Chart JPEG Image */
                    _a.sent();
                    /** Downloading Chart SVG File */
                    return [4 /*yield*/, appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileSVG, testDetails_data_1.downloadFileType.svg)];
                case 3:
                    /** Downloading Chart SVG File */
                    _a.sent();
                    /** Downloading Chart PNG Image */
                    return [4 /*yield*/, appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePNG, testDetails_data_1.downloadFileType.png)];
                case 4:
                    /** Downloading Chart PNG Image */
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec20_dataExplorer-Hamburger (Chart Context) menu.e2e-spec.js.map