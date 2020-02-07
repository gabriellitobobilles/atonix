"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('BUG 25218: Data Explorer - Selecting "Cancel" When Attempting to Navigate to Different Asset Does Not Retain Unsaved Chart', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName;
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
    // tslint:disable-next-line:max-line-length
    it('Step 1: New Chart - verify selecting "Cancel" When Attempting to Navigate to Different Asset should Retain Unsaved Chart', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, dx, target, elem, trendIndex1, _l, _m, trendIndex2, _o, _p, _q, _r;
        return tslib_1.__generator(this, function (_s) {
            switch (_s.label) {
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
                return [4 /*yield*/, _b.apply(_a, [(_s.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_s.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_s.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_s.sent()).indexOf('Eastern PC1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_s.sent()).indexOf('Air Quality Control System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    protractor_1.browser.waitForAngular();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(5000);
                    dx = 1;
                    _s.label = 11;
                case 11:
                    if (!(dx >= 0)) return [3 /*break*/, 15];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="asset.sensors"]').get(dx)];
                case 12:
                    elem = _s.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 13:
                    _s.sent();
                    _s.label = 14;
                case 14:
                    --dx;
                    return [3 /*break*/, 11];
                case 15: return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 16:
                    trendIndex1 = _s.sent();
                    _m = (_l = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 17: 
                /**  Selecting anothe trend */
                return [4 /*yield*/, _m.apply(_l, [(_s.sent()).indexOf('Grid')])
                        .click()];
                case 18:
                    /**  Selecting anothe trend */
                    _s.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.switchTo().alert().dismiss();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 19:
                    trendIndex2 = _s.sent();
                    // const num = await appTitle.getNumberHighchartsVMLegendItem(0);
                    expect(trendIndex1[0] === trendIndex2[0]).toBe(true, 'Trends Does Not Retain Unsaved Chart');
                    // tslint:disable-next-line:max-line-length
                    _p = expect;
                    return [4 /*yield*/, appTitle.chartDropDown.chartDropDownBtn.getText()];
                case 20:
                    // tslint:disable-next-line:max-line-length
                    _q = (_o = _p.apply(void 0, [_s.sent()])).toBe;
                    _r = trendName + ' (';
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 21:
                    // tslint:disable-next-line:max-line-length
                    _q.apply(_o, [_r + (_s.sent()) + ')*', 'Trends Does Not Retain Unsaved Chart']);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: New Chart - selecting another trend and verify if the created trend still exist', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var val2, strTrendLength, index, value;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.trendSelector();
                    protractor_1.browser.sleep(2000);
                    protractor_1.$$('[ng-repeat="chartSummary in trends"]').first().click();
                    protractor_1.browser.sleep(2000);
                    appTitle.trendSelector();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 1:
                    val2 = _a.sent();
                    strTrendLength = trendName.length;
                    // tslint:disable-next-line:prefer-for-of
                    for (index = 0; index < val2.length; ++index) {
                        value = val2[index];
                        if (value.substring(0, strTrendLength) === trendName) {
                            expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
                            expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(value))
                                .isPresent()).toBe(true, 'Delete icon is not present');
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: New Chart - selecting another trend and click "OK" verify if the created trend does not exist anymore', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 1: 
                /**  Selecting anothe trend */
                return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('Grid')])
                        .click()];
                case 2:
                    /**  Selecting anothe trend */
                    _c.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.switchTo().alert().accept();
                    protractor_1.browser.waitForAngular();
                    appTitle.trendSelector();
                    appTitle.deletingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec21_dataExplorer-BUG-25218.e2e-spec.js.map