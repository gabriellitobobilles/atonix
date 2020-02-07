"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19605: Data Explorer - Chart Settings', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var ydx, dxy;
    var axes = ['500', '700'];
    var minmax = ['450', '300'];
    var tags = ['Net Unit Heat Rate Heat Loss Method (MDCalc7_TURBIN:NUHR_HL)',
        'Net Unit Heat Rate Input Output Method (MDCalc7_TURBIN:NUHR_IO)', 'RELATIVE HUMIDITY (AMBIENT_AIR:HUMIDITY)',
        'AMBIENT AIR TEMPERATURE (GPA tag replaced with measured FD Fan Inlet Temp tag) (MEAS:1GPATMBNT)', 'Target (Target;Value;6039)'];
    var EC = protractor_1.protractor.ExpectedConditions;
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
    it('step 1: Change scale of axes, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, min_y, max_y;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(3000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _c.sent();
                    protractor_1.browser.driver.sleep(3000);
                    appTitle.trendSelector();
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP')];
                case 3:
                    _c.sent();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    appTitle.DispatchChart.EditChartSettingBtn.click();
                    protractor_1.$$('[ng-model="ax.Min"]').last().clear();
                    protractor_1.$$('[ng-model="ax.Min"]').last().sendKeys(axes[0]);
                    protractor_1.$$('[ng-model="ax.Max"]').last().clear();
                    protractor_1.$$('[ng-model="ax.Max"]').last().sendKeys(axes[1]);
                    return [4 /*yield*/, protractor_1.$('[ng-click="settingsVM.OK()"]').click()];
                case 4:
                    _c.sent();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 6:
                    min_y = _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 7:
                    max_y = _c.sent();
                    /** will check if the value is correct */
                    // tslint:disable-next-line:radix
                    expect(min_y).not.toEqual(null);
                    // expect(parseInt(min_y) === 500).toBe(true, 'minimum y axes should be equal to 500 since it is a default value');
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(min_y));
                    // tslint:disable-next-line:radix
                    expect(max_y).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Change scale of axes back to auto, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var minAuto_y, maxAuto_y;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.DispatchChart.EditChartSettingBtn.click();
                    protractor_1.$$('[ng-model="ax.Min"]').last().clear();
                    protractor_1.$$('[ng-model="ax.Max"]').last().clear();
                    protractor_1.$('[ng-click="settingsVM.OK()"]').click();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 1:
                    minAuto_y = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 2:
                    maxAuto_y = _a.sent();
                    /** will check if the value is correct */
                    // tslint:disable-next-line:radix
                    expect(minAuto_y).not.toEqual(null);
                    // expect(parseInt(min_y) === 500).toBe(true, 'minimum y axes should be equal to 500 since it is a default value');
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(minAuto_y));
                    // tslint:disable-next-line:radix
                    expect(maxAuto_y).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-line-length
    it('step 3: Filter data (Before saving anything) by min/max with and without apply to all selected - verify chart responds', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, d, dy;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed"]').click()];
                case 1:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 2: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 3:
                    _c.sent();
                    appTitle.trendSelector();
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP')];
                case 4:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().getAttribute('d')];
                case 5:
                    d = _c.sent();
                    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Series')).click()];
                case 6:
                    _c.sent();
                    dy = tags.length - 1;
                    _c.label = 7;
                case 7:
                    if (!(dy >= 0)) return [3 /*break*/, 14];
                    return [4 /*yield*/, protractor_1.$$('[class="fa fa-filter"]').get(dy).click()];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMin"]').get(dy).clear()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMin"]').get(dy).sendKeys(minmax[0])];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMax"]').get(dy).clear()];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMax"]').get(dy).sendKeys(minmax[1])];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    --dy;
                    return [3 /*break*/, 7];
                case 14:
                    appTitle.chartSettingTab.save.click();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().isPresent()];
                case 15:
                    if (!((_c.sent()) === false)) return [3 /*break*/, 16];
                    dxy = '';
                    return [3 /*break*/, 18];
                case 16: return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().getAttribute('d')];
                case 17:
                    dxy = _c.sent();
                    _c.label = 18;
                case 18:
                    expect(d !== dxy).toBe(true, 'Chart is not responding the changes');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 4: Filter with multiple "Apply to All" Filters- should work as "And" logic- current bug', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var d, dy;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().getAttribute('d')];
                case 1:
                    d = _a.sent();
                    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Series')).click()];
                case 2:
                    _a.sent();
                    dy = tags.length - 1;
                    _a.label = 3;
                case 3:
                    if (!(dy >= 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, protractor_1.$$('[class="fa fa-filter"]').get(dy).click()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMin"]').get(dy).clear()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMin"]').get(dy).sendKeys(minmax[0])];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMax"]').get(dy).clear()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMax"]').get(dy).sendKeys(minmax[1])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.ApplyToAll"]').get(dy).click()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    --dy;
                    return [3 /*break*/, 3];
                case 11:
                    appTitle.chartSettingTab.save.click();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().isPresent()];
                case 12:
                    if (!((_a.sent()) === false)) return [3 /*break*/, 13];
                    ydx = '';
                    return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().getAttribute('d')];
                case 14:
                    ydx = _a.sent();
                    _a.label = 15;
                case 15:
                    expect(d !== ydx).toBe(true, 'Chart is not responding the changes');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 5: Change chart and series type', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dy, x, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Series')).click()];
                case 1:
                    _c.sent();
                    dy = tags.length - 1;
                    _c.label = 2;
                case 2:
                    if (!(dy >= 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, protractor_1.$$('[class="fa fa-filter"]').get(dy).click()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMin"]').get(dy).clear()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.FilterMax"]').get(dy).clear()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.ApplyToAll"]').get(dy).click()];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    --dy;
                    return [3 /*break*/, 2];
                case 8:
                    x = 0;
                    _c.label = 9;
                case 9:
                    _a = x;
                    return [4 /*yield*/, appTitle.chartSettingTab.seriesChartType.count()];
                case 10:
                    if (!(_a <= (_c.sent()) - 1)) return [3 /*break*/, 12];
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.seriesChartType.get(x), 2);
                    _c.label = 11;
                case 11:
                    x++;
                    return [3 /*break*/, 9];
                case 12:
                    protractor_1.browser.sleep(10000);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.sleep(10000);
                    _b = expect;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-tracker"]').first().isDisplayed()];
                case 13:
                    _b.apply(void 0, [_c.sent()]).toBe(true, 'Chart Type does not change');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 6: Add design curve', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highChartLegenItemList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
                    protractor_1.browser.sleep(1000);
                    // clicking static curves menu
                    protractor_1.element(protractor_1.by.linkText('Static Curves')).click();
                    // adding design curves
                    protractor_1.$('[ng-click="settingsVM.addCurve()"]').click();
                    // adding x and y values
                    protractor_1.$('[ng-click="settingsVM.addPoint(curve)"]').click();
                    protractor_1.$('[ng-model="p.Y"]').click();
                    protractor_1.$('[ng-model="p.Y"]').clear();
                    protractor_1.$('[ng-model="p.Y"]').sendKeys('10');
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(function () {
                        return appTitle.chartDropDown.chartDropDownBtn.isDisplayed();
                    }, 720000);
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    highChartLegenItemList = _a.sent();
                    expect(highChartLegenItemList.indexOf('Design Curve') > 1).toBe(true, 'Error, Design Curve was not created successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 7: Move one series to the x-axis', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highChartLegenItemList, dy;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    highChartLegenItemList = _a.sent();
                    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Series')).click()];
                case 2:
                    _a.sent();
                    dy = highChartLegenItemList.length - 2;
                    _a.label = 3;
                case 3:
                    if (!(dy >= 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, protractor_1.$$('[ng-model="s.IsXAxis"]').get(dy).click()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    --dy;
                    return [3 /*break*/, 3];
                case 6:
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec18_dataExplorer-Chart-Settings.e2e-spec.js.map