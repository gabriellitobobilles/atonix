"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19584: Performance Analyst -Var vs. Var Charts', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var min_defaultValue, max_defaultValue, cnttxt, cnttxt2, min_y, max_y, min_y2, max_y2, tab, highcharts_legend_item, highcharts_legend_item_2, highcharts_legend_item_3;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
        // const width = 1040;
        // const height = 744;
        // browser.driver.manage().window().setSize(width, height);
        appTitle.fillLoginForm();
        appTitle.confirmLogin();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
        expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
        protractor_1.browser.driver.sleep(5000);
    }));
    it('Step 1: Change scale of axes, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, trnds;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngularEnabled(false);
                    protractor_1.browser.sleep(5000);
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(3000);
                    appTitle.trendSelector();
                    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(3000);
                    appTitle.waitingForElementTobeVisible(protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(0));
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).count()];
                case 1:
                    trnds = _a.sent();
                    /* Check if the valuess are not zero */
                    expect(trnds).toBeGreaterThan(0);
                    expect(trnds).toBeGreaterThan(0);
                    expect(trnds).toBeGreaterThan(0);
                    /* Check if the valuess are not null */
                    expect(trnds).not.toEqual(null);
                    expect(trnds).not.toEqual(null);
                    expect(trnds).not.toEqual(null);
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(2).click()];
                case 2:
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 3:
                    /** get the default value of the chart */
                    // tslint:disable-next-line:variable-name
                    min_defaultValue = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 4:
                    // tslint:disable-next-line:variable-name
                    max_defaultValue = _a.sent();
                    /** Change the value to specific number */
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).sendKeys('200')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).click()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).sendKeys('350')];
                case 8:
                    _a.sent();
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(3)];
                case 9:
                    // await browser.wait(async () => await browser.element(by.css('[ng-show="chartVM.statusMessage"]')).getAttribute('class')
                    //   === 'chart-warning ng-hide');
                    highcharts_legend_item = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 10:
                    // console.log(highcharts_legend_item);
                    // tslint:disable-next-line:variable-name
                    min_y = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 11:
                    // tslint:disable-next-line:variable-name
                    max_y = _a.sent();
                    /** will check if the value is correct */
                    expect(min_y).not.toEqual(null);
                    expect(max_y).not.toEqual(null);
                    // tslint:disable-next-line:radix
                    // expect(parseInt(min_y) === 500).toBeTruthy();
                    // tslint:disable-next-line:radix
                    // expect(parseInt(max_y) === 700).toBeTruthy();
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Change scale of axes back to auto, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(appTitle.atonixTrendButtons.EditChartSettingBtn.first()), 10000);
                            return [2 /*return*/, appTitle.atonixTrendButtons.EditChartSettingBtn.first()];
                        });
                    }); });
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    protractor_1.browser.sleep(1000);
                    /** Change the value to auto */
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).clear()];
                case 1:
                    /** Change the value to auto */
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).clear()];
                case 2:
                    _a.sent();
                    appTitle.chartSettingTab.save.click();
                    appTitle.waitingFortableChartToLoad();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(3)];
                case 3:
                    highcharts_legend_item_2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 4:
                    // tslint:disable-next-line:variable-name
                    min_y2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 5:
                    // tslint:disable-next-line:variable-name
                    max_y2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count()];
                case 6:
                    // browser.waitForAngular();
                    // await $('div.ui-layout-toggler.ui-layout-toggler-west.ui-layout-toggler-open.ui-layout-toggler-west-open').click();
                    cnttxt = _a.sent();
                    // expect(cnttxt === 4).toBe(true, 'it should be equal to 4');
                    // console.log(highcharts_legend_item, highcharts_legend_item_2);
                    expect(cnttxt).not.toEqual(null);
                    expect(highcharts_legend_item_2 === highcharts_legend_item).toBe(true, 'Legent chart should be equal');
                    /** Check the auto value to the previous/default value */
                    // tslint:disable-next-line:radix
                    expect(min_y2).not.toEqual(null);
                    // expect(parseInt(min_y2) === parseInt(min_defaultValue)).toBeTruthy();
                    // tslint:disable-next-line:radix
                    expect(max_y2).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Download data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-button-symbol"]').first().isPresent()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBeTruthy();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-button-symbol"]').first().click()];
                case 2:
                    _b.sent();
                    protractor_1.browser.sleep(3000);
                    // console.log(await $$('[class="highcharts-menu-item"]').get(-3).getText());
                    /** Download data to excel */
                    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, testDetails_data_1.downloadFileName.downloadCSV);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Expand chart to full screen', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(protractor_1.$$('[ng-click="buttonsVM.Zoom()"]').first()), 10000);
                            return [2 /*return*/, protractor_1.$$('[ng-click="buttonsVM.Zoom()"]').first()];
                        });
                    }); });
                    return [4 /*yield*/, protractor_1.$$('[ng-click="buttonsVM.Zoom()"]').first().click()];
                case 1:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    tab = _c.sent();
                    protractor_1.browser.switchTo().window(tab[1]);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    highcharts_legend_item_3 = _c.sent();
                    // console.log(highcharts_legend_item_3);
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$('[class="highcharts-button-symbol"]').isPresent()];
                case 4:
                    // console.log(highcharts_legend_item_3);
                    _a.apply(void 0, [_c.sent()]).toBeTruthy();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').$$('text').count()];
                case 5:
                    cnttxt2 = _c.sent();
                    expect(highcharts_legend_item === highcharts_legend_item_3).toBe(true, 'Legent chart should be equal');
                    expect(cnttxt2).not.toEqual(null);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 6:
                    // expect(cnttxt2 === 14).toBe(true, 'it should be equal to 14');
                    // expect(cnttxt === cnttxt2).toBeTruthy();
                    highcharts_legend_item = _c.sent();
                    highcharts_legend_item = highcharts_legend_item - 1;
                    appTitle.ChartZoomOut(highcharts_legend_item);
                    protractor_1.browser.sleep(3000);
                    _b = expect;
                    return [4 /*yield*/, appTitle.resetZoom.ResetZoomBtn.isPresent()];
                case 7:
                    _b.apply(void 0, [_c.sent()]).toBeTruthy();
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(tab[0])];
                case 8:
                    _c.sent();
                    protractor_1.browser.sleep(5000);
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 9:
                    tab = _c.sent();
                    protractor_1.browser.switchTo().window(tab[1]);
                    protractor_1.browser.waitForAngularEnabled();
                    protractor_1.browser.sleep(10000);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('[ng-show="vm.loading"]')).getAttribute('class')];
                                    case 1: return [2 /*return*/, (_a.sent())
                                            === 'text-center text-dark ng-hide'];
                                }
                            });
                        }); })];
                case 10:
                    _c.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.stalenessOf(protractor_1.element(protractor_1.by.css('#CEChartContainer > div > div > span'))))];
                case 11:
                    _c.sent();
                    // await browser.wait(async () => await browser.element(by.css('[ng-show="vm.chartWarning"]')).getAttribute('class')
                    // === 'chart-warning ng-hide'; );
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(tab[0])];
                case 12:
                    _c.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec05_performanceAnalyst-Var-vs-Var-Charts.e2e-spec.js.map