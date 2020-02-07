"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19585: Performance Analyst  - Alerts - Chart', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var winSel, highcharts_legend_item;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
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
    it('Step 1: Verify load time seems reasonable', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.alert);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])];
                case 2:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    // double-clicking should make hiddenElement visible
                    return [4 /*yield*/, protractor_1.browser.actions().doubleClick(protractor_1.element.all(protractor_1.by.repeater('model in modelsVM.models')).get(0)).perform()];
                case 3:
                    // double-clicking should make hiddenElement visible
                    _c.sent();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 4:
                    winSel = _c.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    expect(appTitle.DispatchChart.OpenChartInNewTabBtn).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Download data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var i;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Step 2 */
                    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
                    // /** Download data to excel */
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.trendSelector();
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(EC.visibilityOf(protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(0)), 10000);
                            return [2 /*return*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(2)];
                        });
                    }); });
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(0).click()];
                case 1:
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _a.sent();
                    appTitle.selectTimeSlider.calendarIcon.click();
                    appTitle.selectTimeSlider.startDatebox.click();
                    appTitle.selectTimeSlider.startDatebox.clear();
                    appTitle.selectTimeSlider.startDatebox.sendKeys('07/01/2016');
                    appTitle.selectTimeSlider.endDatebox.click();
                    appTitle.selectTimeSlider.endDatebox.clear();
                    appTitle.selectTimeSlider.endDatebox.sendKeys('12/30/2016');
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(1)];
                case 2:
                    highcharts_legend_item = _a.sent();
                    for (i = 0; i <= highcharts_legend_item - 1; ++i) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    protractor_1.browser.waitForAngular();
                    // appTitle.DownloadingChartCSV(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn,
                    //   appTitle.downloadFileName.CSV);
                    // tslint:disable-next-line:max-line-length
                    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, testDetails_data_1.downloadFileName.downloadCSV);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Expand chart to full screen', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highcharts_legend_item_zoom_page, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    /** Step 3 */
                    /** Expand chart to full screen */
                    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _b.sent();
                    protractor_1.browser.switchTo().window(winSel[2]);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    highcharts_legend_item_zoom_page = _b.sent();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 3:
                    _a.apply(void 0, [_b.sent()]).toEqual('Chart Zoom');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Click different alert and verify that it populates in chart ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highcharts_legend_item_new_alert, highcharts_legend_item_zoom, _a, i;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[1])];
                case 1:
                    _b.sent();
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 2:
                    _b.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.browser.actions().doubleClick(protractor_1.element.all(protractor_1.by.repeater('model in modelsVM.models')).get(1)).perform()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 4:
                    winSel = _b.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.trendSelector();
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(0).click()];
                case 5:
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _b.sent();
                    appTitle.selectTimeSlider.calendarIcon.click();
                    appTitle.selectTimeSlider.startDatebox.click();
                    appTitle.selectTimeSlider.startDatebox.clear();
                    appTitle.selectTimeSlider.startDatebox.sendKeys('07/01/2016');
                    appTitle.selectTimeSlider.endDatebox.click();
                    appTitle.selectTimeSlider.endDatebox.clear();
                    appTitle.selectTimeSlider.endDatebox.sendKeys('12/30/2016');
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(1)];
                case 6:
                    highcharts_legend_item_new_alert = _b.sent();
                    highcharts_legend_item_zoom = highcharts_legend_item_new_alert - 1;
                    /** Verifying zoon functionality */
                    appTitle.ChartZoomOut(highcharts_legend_item_zoom);
                    protractor_1.browser.sleep(3000);
                    _a = expect;
                    return [4 /*yield*/, appTitle.resetZoom.ResetZoomBtn.isPresent()];
                case 7:
                    _a.apply(void 0, [_b.sent()]).toBeTruthy();
                    for (i = 0; i <= highcharts_legend_item_new_alert - 1; ++i) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Verify Vertical Expand(up and down) and Alert default filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var FilterItems, x, defaultfilter;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[1])];
                case 1:
                    _a.sent();
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, appTitle.PAlerts.filterItem.getText()];
                case 3:
                    FilterItems = _a.sent();
                    for (x = 0; x <= validator.AlertDefaultFilter.length; x++) {
                        expect(FilterItems[x] === validator.AlertDefaultFilter[x]).toBe(true, 'Alert default Filter is not match');
                    }
                    return [4 /*yield*/, appTitle.PAlerts.alertTimelineVM.getAttribute('textContent')];
                case 4:
                    defaultfilter = _a.sent();
                    defaultfilter = defaultfilter.trim();
                    expect(defaultfilter === validator.alertTimelineVMtempfilter.alertTimelineVMtempfilter);
                    return [4 /*yield*/, appTitle.PAlerts.chevronDown.click()];
                case 5:
                    _a.sent();
                    expect(appTitle.PAlerts.chevronUp.isDisplayed()).toBe(true, 'Vertical Expand(up and down) is not working');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec06_performanceAnalyst-Alerts-Chart.e2e-spec.js.map