"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19583: Performance Analyst -Charts', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var data1, data_2, min_defaultValue, max_defaultValue, cnttxt, cnttxt2, min_y2, max_y2, winSel, highcharts_legend_item;
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
    it('Step 1: Verify multiple trends load in drop down menu', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, trnds;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.waitForAngular();
                    // browser.driver.wait(async () => {
                    //   browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
                    //   return appTitle.chartDropDown.chartDropDownBtn;
                    // });
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.trendSelector();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(3000);
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
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Change time range to less than 4 days and verify switch to higher frequency data', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var previousdate, currentDay;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.element(protractor_1.by.css('#navBar')).getAttribute('width')];
                case 1:
                    /** step 2 */
                    // browser.sleep(3000);
                    data1 = _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIcon.click()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIconStart.click()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDatebox.clear()];
                case 4:
                    _a.sent();
                    previousdate = new Date(new Date().setDate(new Date().getDate() - 4));
                    appTitle.selectCalendarMonthYear(previousdate);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIconEnd.click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.endDatebox.clear()];
                case 6:
                    _a.sent();
                    currentDay = new Date(new Date().setDate(new Date().getDate()));
                    appTitle.selectCalendarMonthYear(currentDay);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarApplybtn.first().click()];
                case 7:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarOKBtn.first().click()];
                case 8:
                    _a.sent();
                    appTitle.waitingFortableChartToLoad();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.css('#navBar')).getAttribute('width')];
                case 9:
                    // tslint:disable-next-line:variable-name
                    data_2 = _a.sent();
                    // console.log(data_2);
                    // tslint:disable-next-line:radix
                    expect(parseInt(data1) > parseInt(data_2)).toBe(true, 'data1 should be greater than data2');
                    expect(data1 !== data_2).toBe(true, 'data 1 should not be equal to data2');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Change time range with handles and by typing date range in calendar', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var previousdate, currentdate, data2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /** step 3 */
                return [4 /*yield*/, appTitle.selectTimeSlider.calendarIcon.click()];
                case 1:
                    /** step 3 */
                    _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDatebox.clear()];
                case 2:
                    _a.sent();
                    previousdate = appTitle.getPreviousdaysDate(4);
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDatebox.sendKeys(previousdate)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.endDatebox.clear()];
                case 4:
                    _a.sent();
                    currentdate = appTitle.getCurrentDate();
                    return [4 /*yield*/, appTitle.selectTimeSlider.endDatebox.sendKeys(currentdate)];
                case 5:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarApplybtn.first().click()];
                case 6:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarOKBtn.first().click()];
                case 7:
                    _a.sent();
                    appTitle.waitingFortableChartToLoad();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.css('#navBar')).getAttribute('width')];
                case 8:
                    data2 = _a.sent();
                    // tslint:disable-next-line:radix
                    expect(parseInt(data1) > parseInt(data2)).toBe(true, 'data1 should be greater than data2');
                    expect(data1 !== data2).toBe(true, 'data1 should not be equal to data2');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Change scale of axes, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var min_y, miny, max_y;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** step 4 */
                    // $('[id="chartDropdown"]').click();
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.trendSelector();
                    protractor_1.browser.sleep(3000);
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(2).click()];
                case 1:
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _a.sent();
                    appTitle.waitingFortableChartToLoad();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 2:
                    /** get the default value of the chart */
                    // tslint:disable-next-line:variable-name
                    min_defaultValue = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 3:
                    // tslint:disable-next-line:variable-name
                    max_defaultValue = _a.sent();
                    /** Change the value to specific number */
                    return [4 /*yield*/, protractor_1.$$('[ng-click="buttonsVM.Settings()"]').first().click()];
                case 4:
                    /** Change the value to specific number */
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).sendKeys('500')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).click()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).sendKeys('700')];
                case 8:
                    _a.sent();
                    protractor_1.$('[ng-click="settingsVM.OK()"]').click();
                    appTitle.waitingFortableChartToLoad();
                    // tslint:disable-next-line:variable-name
                    return [4 /*yield*/, protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click()];
                case 9:
                    // tslint:disable-next-line:variable-name
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed"]').click();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 10:
                    min_y = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').getText()];
                case 11:
                    miny = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 12:
                    max_y = _a.sent();
                    /** will check if the value is correct */
                    // tslint:disable-next-line:radix
                    expect(min_y).not.toEqual(null);
                    // expect(parseInt(min_y) === 500).toBe(true, 'minimum y axes should be equal to 500 since it is a default value');
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(min_y));
                    // tslint:disable-next-line:radix
                    expect(max_y).not.toEqual(null);
                    // expect(parseInt(max_y) === 700).toBe(true, 'maximum y axes should be equal to 700 since it is a default value');
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(max_y));
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Change scale of axes back to auto, click ok, verify', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var my2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.$$('[ng-click="buttonsVM.Settings()"]').first().click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    /** Change the value to auto */
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Min')).get(0).clear()];
                case 2:
                    /** Change the value to auto */
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.model('ax.Max')).get(0).clear()];
                case 3:
                    _a.sent();
                    protractor_1.$('[ng-click="settingsVM.OK()"]').click();
                    appTitle.waitingFortableChartToLoad();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText()];
                case 4:
                    // tslint:disable-next-line:variable-name
                    min_y2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').getText()];
                case 5:
                    my2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText()];
                case 6:
                    // console.log('value of defaule:', my2);
                    // tslint:disable-next-line:variable-name
                    max_y2 = _a.sent();
                    // const cnttxt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count();
                    return [4 /*yield*/, protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click()];
                case 7:
                    // const cnttxt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count();
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count()];
                case 8:
                    cnttxt = _a.sent();
                    // const txt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').last().getText();
                    // console.log(cnttxt);
                    // console.log(txt);
                    /** Check the auto value to the previous/default value */
                    // tslint:disable-next-line:radix
                    expect(min_y2).not.toEqual(null);
                    // expect(parseInt(min_y2) === parseInt(min_defaultValue)).toBe(true, 'Minimum y should be equal to minimum y default value');
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(min_y2));
                    // tslint:disable-next-line:radix
                    // console.log(parseInt(min_defaultValue));
                    // tslint:disable-next-line:radix
                    expect(max_y2).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Verify Hamburger Chart button exists and functions as desired- save chart as all 4 types and print preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, printButton, result;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // console.log('Step 6: Verify Hamburger Chart button exists and functions as desired- save chart as all 4 types and print preview');
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$('[class="highcharts-button-symbol"]').isPresent()];
                case 1:
                    // console.log('Step 6: Verify Hamburger Chart button exists and functions as desired- save chart as all 4 types and print preview');
                    _a.apply(void 0, [_b.sent()]).toBe(true, 'highchart button should be present');
                    return [4 /*yield*/, protractor_1.$('[class="highcharts-button-symbol"]').click()];
                case 2:
                    _b.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-menu-item"]').first()];
                case 3:
                    printButton = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.executeAsyncScript(function (elm, callback) {
                            function listener() {
                                callback(true);
                            }
                            window.print = listener;
                            elm.click();
                        }, printButton.getWebElement())];
                case 4:
                    result = _b.sent();
                    protractor_1.browser.sleep(3000);
                    expect(result).toBe(true, 'Print preview should be present');
                    protractor_1.browser.sleep(3000);
                    /** Downloading Chart PNG Image */
                    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePNG, testDetails_data_1.downloadFileType.PNG);
                    /** Downloading Chart JPEG Image */
                    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileJPEG, testDetails_data_1.downloadFileType.JPEG);
                    /** Downloading Chart PDF File */
                    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePDF, testDetails_data_1.downloadFileType.PDF);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 7: Download data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // console.log('Step 7: Download data to excel');
            /** Download data to excel */
            appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, testDetails_data_1.downloadFileName.downloadCSV);
            return [2 /*return*/];
        });
    }); });
    it('Step 8: Expand chart to full screen', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    protractor_1.browser.sleep(3000);
                    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[1])];
                case 2:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, appTitle.DownloadOption.ChartContextMenuBtn.isPresent()];
                case 3:
                    _a.apply(void 0, [_b.sent()]).toBe(true, 'chart context button menu should be present');
                    protractor_1.browser.sleep(3000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 9: Verify "click and drag" zoom works properly ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 1:
                    highcharts_legend_item = _b.sent();
                    highcharts_legend_item = highcharts_legend_item - 1;
                    // console.log(highcharts_legend_item);
                    appTitle.ChartZoomOut(highcharts_legend_item);
                    protractor_1.browser.sleep(5000);
                    _a = expect;
                    return [4 /*yield*/, appTitle.resetZoom.ResetZoomBtn.isPresent()];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toBe(true, 'reset zoom button should be present');
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 3:
                    _b.sent();
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 10: Click on chart editor button and verify that it navigates to correct chart and time range', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.sleep(3000);
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _a.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, protractor_1.browser.element.all(protractor_1.by.css('[ng-show="vm.loading"]')).first().getAttribute('class')];
                                    case 1: return [2 /*return*/, (_a.sent())
                                            === 'text-center text-dark ng-hide'];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.stalenessOf(protractor_1.element(protractor_1.by.css('#CEChartContainer > div > div > span'))))];
                case 3:
                    _a.sent();
                    // await browser.wait(async () => await browser.element(by.css('[ng-show="vm.chartWarning"]')).getAttribute('class')
                    // === 'chart-warning ng-hide');
                    return [4 /*yield*/, protractor_1.$('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click()];
                case 4:
                    // await browser.wait(async () => await browser.element(by.css('[ng-show="vm.chartWarning"]')).getAttribute('class')
                    // === 'chart-warning ng-hide');
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').$$('text').count()];
                case 5:
                    cnttxt2 = _a.sent();
                    expect(cnttxt).not.toEqual(null, 'value of the data shoule not be equal to null');
                    expect(cnttxt2).not.toEqual(null, 'value of the data shoule not be equal to null');
                    // console.log(cnttxt);
                    // console.log(cnttxt2);
                    // expect(cnttxt === cnttxt2).toBe(true, 'cnttxt data should be equal to cnttxt2 data value');
                    protractor_1.browser.sleep(1000);
                    protractor_1.browser.close();
                    protractor_1.browser.switchTo().window(winSel[0]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec04_performanceAnalyst-Charts.e2e-spec.js.map