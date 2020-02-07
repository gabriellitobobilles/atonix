"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('19610: Data Explorer - Legend', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendIndex2, trendIndex3, highcharts_legend, highcharts_legend_item;
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
    it('Step 1:  Click on data tag titles on chart legend to confirm hiding on trend', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, i, i;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _c.sent();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="text-center text-dark"]')));
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    // await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
                    highcharts_legend_item = _c.sent();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 4:
                    highcharts_legend = _c.sent();
                    protractor_1.browser.waitForAngular();
                    if (!(highcharts_legend.indexOf('\nUser Notes') > 1 || highcharts_legend.indexOf('\nAll Annotations') > 1)) return [3 /*break*/, 5];
                    for (i = 0; i <= highcharts_legend_item - 3; ++i) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    return [3 /*break*/, 9];
                case 5:
                    i = 0;
                    _c.label = 6;
                case 6:
                    if (!(i <= highcharts_legend_item - 1)) return [3 /*break*/, 9];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.actions().mouseMove(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '')).perform();
                    return [4 /*yield*/, protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click()];
                case 7:
                    _c.sent();
                    // tslint:disable-next-line:max-line-length
                    expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    _c.label = 8;
                case 8:
                    ++i;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    }); });
    it('Step 2:  Click on key icon to change 6 types of tag displays on trend', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.atonixTrendButtons.changeLabel.click();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    trendIndex2 = _a.sent();
                    expect(JSON.stringify(highcharts_legend) === JSON.stringify(trendIndex2)).toBe(false, 'toggle is not working using new create chart');
                    appTitle.atonixTrendButtons.changeLabel.click();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 2:
                    trendIndex3 = _a.sent();
                    expect(JSON.stringify(highcharts_legend) === JSON.stringify(trendIndex3)).toBe(false, 'toggle is not working using new create chart');
                    expect(JSON.stringify(trendIndex2) === JSON.stringify(trendIndex3)).toBe(false, 'toggle is not working using new create chart');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec24_dataExplorer-Legend.e2e-spec.js.map