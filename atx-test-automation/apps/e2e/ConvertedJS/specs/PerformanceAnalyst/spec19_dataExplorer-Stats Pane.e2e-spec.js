"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19606: Data Explorer - Stats Pane', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName, dx, dv;
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
    it('step 1: Pin stats pane', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, target, elem, trendIndex, cntpin;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(3000);
                    /** Create new Chart trend */
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    protractor_1.browser.waitForAngular();
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
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Delayed KRWWTP LIMS Data')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    // ** Add tags and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 2;
                    _l.label = 11;
                case 11:
                    if (!(dx >= 1)) return [3 /*break*/, 15];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="asset.sensors"]').get(dx)];
                case 12:
                    elem = _l.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 13:
                    _l.sent();
                    _l.label = 14;
                case 14:
                    --dx;
                    return [3 /*break*/, 11];
                case 15:
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 16:
                    trendIndex = _l.sent();
                    expect(trendIndex === 2).toBe(true, 'trend is not equal');
                    protractor_1.browser.waitForAngular();
                    // ** Creating Pins*/
                    for (dv = 2; dv >= 1; --dv) {
                        protractor_1.$('[ng-click="vm.addPin()"]').click();
                    }
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="pin in vm.selectedTrend.Pins"]').count()];
                case 17:
                    cntpin = _l.sent();
                    expect(cntpin === 2).toBe(true, 'pin is not equal');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Navigate through different series', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var trendIndexPin, ldv;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 1:
                    trendIndexPin = _a.sent();
                    for (ldv = trendIndexPin - 1; ldv >= 0; --ldv) {
                        appTitle.HighchartsVMLegendItem(0).get(ldv).click();
                        protractor_1.browser.sleep(2000);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 3: Export data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            try {
                appTitle.DownloadingCSVFile(appTitle.DispatchChart.DownloadChartContentBtn, appTitle.DispatchChart.DownloadChartContentBtn, testDetails_data_1.downloadFileName.downloadCSV);
            }
            catch (err) {
                console.log(err);
            }
            appTitle.trendSelector();
            appTitle.deletingDataExplorerTrends(trendName);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=spec19_dataExplorer-Stats Pane.e2e-spec.js.map