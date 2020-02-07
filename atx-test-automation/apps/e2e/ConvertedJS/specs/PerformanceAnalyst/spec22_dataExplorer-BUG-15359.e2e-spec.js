"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('BUG 15359: Data Explorer - Chart Legend Toggle and Tag Prefix Not Working Before Save', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName, trendName2;
    var tagsEasternPC1 = ['Air Quality Control System Performance (Air Quality Control System Performance;Value;16037)'];
    var tagsEasternPC3 = ['ACTUAL VOLUME FLOW (MEAS_7:3045-FI_053-01)',
        'Boiler System Performance (Boiler System Performance;Value;12596)'];
    var tagsEasternPC2 = ['Air Heater System Health (Air Heater System Health;Value;12605)',
        'Air Heater System Performance (Air Heater System Performance;Value;12605)'];
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
    it('Step 1: Chart Legend Toggle should work Before Save', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, dx, target, elem, trendIndex, trendIndex2;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    // ** Create new chart without saving*/
                    protractor_1.browser.sleep(3000);
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.DispatchChart.EditChartSettingBtn.click();
                    appTitle.DispatchChart.chartTitle.clear();
                    appTitle.DispatchChart.chartTitle.sendKeys(trendName);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Eastern PC1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Air Quality Control System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(3000);
                    dx = 0;
                    _l.label = 11;
                case 11:
                    if (!(dx < tagsEasternPC1.length)) return [3 /*break*/, 15];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC1[dx]))];
                case 12:
                    elem = _l.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 13:
                    _l.sent();
                    _l.label = 14;
                case 14:
                    dx++;
                    return [3 /*break*/, 11];
                case 15: return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 16:
                    trendIndex = _l.sent();
                    appTitle.atonixTrendButtons.changeLabel.click();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 17:
                    trendIndex2 = _l.sent();
                    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(false, 'toggle is not working using new create chart');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Tag Prefix should work Before Save', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, dx, target, elem, _c, _d, dx, target, elem, trendIndex, trendIndex2;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    // ** Create new chart without saving*/
                    protractor_1.browser.sleep(3000);
                    trendName2 = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.DispatchChart.EditChartSettingBtn.click();
                    appTitle.DispatchChart.chartTitle.clear();
                    appTitle.DispatchChart.chartTitle.sendKeys(trendName2);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_e.sent()).indexOf('Boiler System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _e.sent();
                    protractor_1.browser.waitForAngular();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(3000);
                    dx = 0;
                    _e.label = 3;
                case 3:
                    if (!(dx < tagsEasternPC3.length)) return [3 /*break*/, 7];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC3[dx]))];
                case 4:
                    elem = _e.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    dx++;
                    return [3 /*break*/, 3];
                case 7:
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 8: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_e.sent()).indexOf('Air Heater System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 9:
                    // tslint:disable-next-line:max-line-length
                    _e.sent();
                    protractor_1.browser.waitForAngular();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(3000);
                    dx = 0;
                    _e.label = 10;
                case 10:
                    if (!(dx < tagsEasternPC2.length)) return [3 /*break*/, 14];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC2[dx]))];
                case 11:
                    elem = _e.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13:
                    dx++;
                    return [3 /*break*/, 10];
                case 14:
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 15:
                    trendIndex = _e.sent();
                    console.log(JSON.stringify(trendIndex));
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 16:
                    trendIndex2 = _e.sent();
                    console.log(JSON.stringify(trendIndex2));
                    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(true, 'Tag Prefix Not Working Before Save');
                    appTitle.trendSelector();
                    // ** Deleted Created Trend */
                    appTitle.deletingDataExplorerTrends(trendName2);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec22_dataExplorer-BUG-15359.e2e-spec.js.map