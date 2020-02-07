"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19604: Data Explorer - Hearder - Buttons', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var win, val2, trendIndex, trendIndex2, newval, newnameval, otherTrendAssetval, trendName, trendName2, trendName3;
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
    it('step 1: Add a variable - verify there is only one chart by that name and it has the edit', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    appTitle.waitingForPieChartToLoad();
                    appTitle.selectClientMain('Demo Clients', ['Coal Plants', 'Eastern Station',
                        'Eastern PC2'], testDetails_data_1.appName.performanceAnalyst);
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    win = _d.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 2:
                    _d.sent();
                    /** Create first trend */
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    trendIndex = _d.sent();
                    appTitle.trendSelector();
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 4:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    val2 = _d.sent();
                    expect(val2.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Your not successfully created a Trend');
                    expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(trendName + ' (' + trendIndex + ')'))
                        .isPresent()).toBe(true, 'Delete icon is not present');
                    /** Create second  trend and verify that it won't another trend with the same name */
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 5:
                    trendIndex = _d.sent();
                    appTitle.trendSelector();
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 6:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    newval = _d.sent();
                    _a = expect;
                    _c = (_b = protractor_1.$$('i.fa.fa-trash-o')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 7:
                    _a.apply(void 0, [_c.apply(_b, [(_d.sent()).indexOf(trendName + ' (' + trendIndex + ')')]).
                            isPresent()]).toBe(true, 'Delete icon is not present');
                    // ** Check if there is a duplicate trend created */
                    // tslint:disable-next-line:no-shadowed-variable
                    newval.forEach(function (element, index) {
                        // Find if there is a duplicate or not
                        expect(newval.indexOf(element, index + 1) > -1).toBe(false, 'same name trend were created');
                    });
                    appTitle.deletingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Add a variable - save as chart with new name - verify there are two charts and both are correct', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** save as chart with new name */
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends(trendName)];
                case 1:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    _a.sent();
                    trendName2 = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName2);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    trendIndex2 = _a.sent();
                    protractor_1.browser.refresh();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 3:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    newnameval = _a.sent();
                    // tslint:disable-next-line:max-line-length
                    expect(newnameval.indexOf(trendName2 + ' (' + trendIndex2 + ')') >= 0).toBe(true, 'the save as trend were not created'); // Check if the save as trend were created'
                    // tslint:disable-next-line:max-line-length
                    expect(newval.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Old trend name has been removed/deleted'); // Check if the original trend still there
                    // ** Check if there is a duplicate trend created */
                    // tslint:disable-next-line:no-shadowed-variable
                    newnameval.forEach(function (element, index) {
                        // Find if there is a duplicate or not
                        expect(newnameval.indexOf(element, index + 1) > -1).toBe(false, 'same name trend were created');
                    });
                    appTitle.deletingDataExplorerTrends(trendName2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 3: Save chart to different asset', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var strTrendLength, trensel, index, value, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    /** save as chart to different asset */
                    protractor_1.browser.refresh();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    strTrendLength = trendName.length;
                    return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent')];
                case 1:
                    trensel = _g.sent();
                    index = 0;
                    _g.label = 2;
                case 2:
                    if (!(index < trensel.length)) return [3 /*break*/, 5];
                    value = trensel[index];
                    if (!(value.substring(0, strTrendLength) === trendName)) return [3 /*break*/, 4];
                    expect(trensel.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
                    expect(protractor_1.$$('i.fa.fa-trash-o').get(trensel.indexOf(value))
                        .isPresent()).toBe(true, 'Delete icon is not present');
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').get(trensel.indexOf(value)).click()];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    ++index;
                    return [3 /*break*/, 2];
                case 5:
                    protractor_1.browser.sleep(2000);
                    appTitle.atonixTrendButtons.saveBtn.click();
                    /** Saving trend to another asset */
                    appTitle.atonixSaveTrendDefinition.linkedToAssestSelection.first().click();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 6: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_g.sent()).indexOf('Eastern PC1')]).click()];
                case 7:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Verifying the trend that has been save to another asset */
                    // tslint:disable-next-line:max-line-length
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 8:
                    // ** Verifying the trend that has been save to another asset */
                    // tslint:disable-next-line:max-line-length
                    _d.apply(_c, [(_g.sent()).indexOf('Eastern PC1')]).click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent')];
                case 9:
                    // otherTrendAssetval = await $$('[ng-repeat="chartSummary in trends"]').getText();
                    otherTrendAssetval = _g.sent();
                    expect(otherTrendAssetval.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Trend was not saved to another asset');
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, appTitle.deletingDataExplorerTrends(trendName)];
                case 10:
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _g.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 11: return [4 /*yield*/, _f.apply(_e, [(_g.sent()).indexOf('Eastern PC2')])
                        .click()];
                case 12:
                    _g.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    appTitle.deletingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 4: Add a new chart, add variables, save', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, dx, x, _e, target, elem, _f, _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_h.sent()).indexOf('Eastern PC1')])
                        .click()];
                case 2:
                    _h.sent();
                    protractor_1.browser.sleep(2000);
                    // ** Create a new chart */
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // ** Select another asset to save the chart */
                return [4 /*yield*/, _d.apply(_c, [(_h.sent()).indexOf('Eastern PC1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // ** Select another asset to save the chart */
                    _h.sent();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 0;
                    _h.label = 5;
                case 5:
                    if (!(dx < validator.getTagList.length)) return [3 /*break*/, 12];
                    x = 0;
                    _h.label = 6;
                case 6:
                    _e = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-container "]').count()];
                case 7:
                    if (!(_e <= (_h.sent()) - 4)) return [3 /*break*/, 11];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]))];
                case 8:
                    elem = _h.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 9:
                    _h.sent();
                    _h.label = 10;
                case 10:
                    x++;
                    return [3 /*break*/, 6];
                case 11:
                    dx++;
                    return [3 /*break*/, 5];
                case 12:
                    protractor_1.browser.sleep(3000);
                    _f = expect;
                    _g = validator.getTagList.length;
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 13:
                    _f.apply(void 0, [_g === (_h.sent())]).toBe(true, 'Variables are not created');
                    // ** Saving the Chart */
                    trendName3 = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName3);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Checking the trend if it was saved in the list successfully  */
                    protractor_1.browser.refresh();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends(trendName3)];
                case 14:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 5: Select a time period in the past, verify As Shown and Live links take you to correct times', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dateStart, dateEnd;
        return tslib_1.__generator(this, function (_a) {
            appTitle.selectTimeSlider.calendarIcon.click();
            appTitle.selectTimeSlider.calendarIconStart.click();
            dateStart = new Date('08-01-2018');
            appTitle.selectCalendarMonthYear(dateStart);
            appTitle.selectTimeSlider.calendarIconEnd.click();
            dateEnd = new Date('3-14-2019');
            appTitle.selectCalendarMonthYear(dateEnd);
            appTitle.selectTimeSlider.calendarApplybtn.first().click();
            appTitle.selectTimeSlider.calendarOKBtn.first().click();
            return [2 /*return*/];
        });
    }); });
    it('step 6: Expand to full screen', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.atonixTrendButtons.trenZoombtn.click();
            return [2 /*return*/];
        });
    }); });
    it('step 7: Verify "click and drag" zoom works properly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var zoomdx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    win = _a.sent();
                    protractor_1.browser.switchTo().window(win[2]);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    zoomdx = _a.sent();
                    appTitle.ChartZoomOut(zoomdx - 1);
                    protractor_1.browser.sleep(5000);
                    expect(appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 8: Download data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = this;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 1:
                    _l.sent();
                    appTitle.DownloadingCSVFile(appTitle.DispatchChart.DownloadChartContentBtn, appTitle.DispatchChart.DownloadChartContentBtn, testDetails_data_1.downloadFileName.downloadCSV);
                    // ** Deleting the trend that has been save to another asset */
                    appTitle.trendSelector();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(EC.visibilityOf(protractor_1.$$('[ng-repeat="chartSummary in trends"]').get(2)), 10000);
                            return [2 /*return*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').get(2)];
                        });
                    }); });
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 2:
                    _c = (_b = (_l.sent())).indexOf;
                    _d = trendName3 + ' (';
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    _a.apply(void 0, [_c.apply(_b, [_d + (_l.sent()) + ')']) >= 0]).
                        toBe(true, 'Trend was not saved');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    // tslint:disable-next-line:max-line-length
                    _e = expect;
                    _g = (_f = protractor_1.$$('i.fa.fa-trash-o')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 4:
                    _j = (_h = (_l.sent())).indexOf;
                    _k = trendName3 + ' (';
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 5:
                    // tslint:disable-next-line:max-line-length
                    _e.apply(void 0, [_g.apply(_f, [_j.apply(_h, [_k + (_l.sent()) + ')'])])
                            .isPresent()]).toBe(true, 'Delete icon is not present');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    return [4 /*yield*/, appTitle.deletingDataExplorerTrends(trendName3)];
                case 6:
                    _l.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 9: Download Chart Content data to excel', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
                    appTitle.trendSelector();
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(EC.visibilityOf(protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(2)), 10000);
                            return [2 /*return*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(2)];
                        });
                    }); });
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends('ALL BCP FILTER DP')];
                case 3:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, testDetails_data_1.downloadFileName.downloadCSV);
                    // **Closing the tab 1 */
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec17_dataExplorer-Header-Buttons.e2e-spec.js.map