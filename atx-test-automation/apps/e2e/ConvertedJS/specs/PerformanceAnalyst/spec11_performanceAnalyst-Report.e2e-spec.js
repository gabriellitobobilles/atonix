"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19590: Performance Analyst - Report', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
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
    it('Step 1: Ensure report can be selected from drop down list.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_g.sent()).indexOf('All Clients')])];
                case 2:
                    _g.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_g.sent()).indexOf('All Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_g.sent()).indexOf('City Of Lawrence')])
                        .click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    // appTitle.selectClientMain('All Clients', ['City Of Lawrence'],
                    //   appName.performanceAnalyst);
                    // $$('[ng-click="vm.selectView(view)"]').get(9).click();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.report);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(protractor_1.$('[ng-model="reportViewerVM.selectedReport"]')).perform();
                    appTitle.selectDropdownbyNum(protractor_1.$('[ng-model="reportViewerVM.selectedReport"]'), 2);
                    expect(protractor_1.$('[ng-model="reportViewerVM.selectedReport"]').$('option:checked').getText()).toEqual('Sarah Test');
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify Print feature of different sections of report', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var printButton, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, appTitle.DownloadOption.ChartContextMenuBtn.click()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-menu-item"]').first()];
                case 2:
                    printButton = _a.sent();
                    return [4 /*yield*/, protractor_1.browser.executeAsyncScript(function (elm, callback) {
                            function listener() {
                                callback(true);
                            }
                            window.print = listener;
                            elm.click();
                        }, printButton.getWebElement())];
                case 3:
                    result = _a.sent();
                    protractor_1.browser.sleep(3000);
                    expect(result).toBe(true, 'Print preview should be present');
                    protractor_1.browser.sleep(3000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Verify download feature of different sections of report.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Downloading Chart PNG Image */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePNG, testDetails_data_1.downloadFileType.PNG);
            /** Downloading Chart JPEG Image */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileJPEG, testDetails_data_1.downloadFileType.JPEG);
            /** Downloading Chart PDF File */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePDF, testDetails_data_1.downloadFileType.PDF);
            return [2 /*return*/];
        });
    }); });
    it('Step 4: Ensure add annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var annotationDate, trendIndex, x, x, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    /** Adding Annotation with specified date */
                    // ** Create annotation */
                    protractor_1.browser.sleep(3000);
                    protractor_1.$$('[ng-click="buttonsVM.Annotation()"]').last().click();
                    appTitle.annotationModal.annotationNotes.sendKeys('Test Annotation');
                    appTitle.annotationModal.annotationCalendarIcon.click();
                    annotationDate = new Date(new Date().setDate(new Date().getDate() - 3));
                    appTitle.selectCalendarMonthYear(annotationDate);
                    appTitle.annotationModal.editAnnotationOkbtn.click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    trendIndex = _b.sent();
                    for (x = 0; x <= trendIndex.length - 3; x++) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    x = 0;
                    _b.label = 2;
                case 2:
                    _a = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').count()];
                case 3:
                    if (!(_a <= (_b.sent()) - 1)) return [3 /*break*/, 6];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
                    return [4 /*yield*/, protractor_1.$('.highcharts-point-hover').isPresent()];
                case 4:
                    if (_b.sent()) {
                        protractor_1.browser.sleep(2000);
                        expect(protractor_1.$('.highcharts-point-hover').isPresent()).toBeTruthy();
                        return [3 /*break*/, 6];
                    }
                    _b.label = 5;
                case 5:
                    x++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    xit('Step 5: Ensure edit annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var trendIndex, x, dateStart;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ** edit  annotation */
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    trendIndex = _a.sent();
                    for (x = 0; x <= trendIndex.length - 3; x++) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    return [4 /*yield*/, protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.$('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
                    appTitle.annotation.editAnnotation.click();
                    expect(appTitle.annotationModal.annotationNotes.isPresent()).toBe(true, 'edit annotatoion modal does not exist');
                    appTitle.annotationModal.annotationCalendarIcon.click();
                    dateStart = new Date('06/05/2019');
                    appTitle.selectCalendarMonthYear(dateStart);
                    appTitle.annotationModal.annotationNotes.clear();
                    appTitle.annotationModal.annotationNotes.sendKeys('test2');
                    appTitle.annotationModal.editAnnotationOkbtn.click();
                    protractor_1.browser.sleep(10000);
                    return [2 /*return*/];
            }
        });
    }); });
    xit('Step 6: Ensure delete annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var trendIndex, x, x;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ** edit  annotation */
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    trendIndex = _a.sent();
                    for (x = 0; x <= trendIndex.length - 3; x++) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    return [4 /*yield*/, protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    protractor_1.$('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
                    appTitle.annotation.deleteAnnotation.click();
                    for (x = 0; x <= trendIndex.length - 3; x++) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    // ** Hovering Annotation */
                    return [4 /*yield*/, protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform()];
                case 3:
                    // ** Hovering Annotation */
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    // tslint:disable-next-line:max-line-length
                    expect(protractor_1.$('[class="highcharts-point highcharts-negative highcharts-point-hover"]').isPresent()).toBe(false, 'Annotation was not deleted');
                    protractor_1.browser.sleep(10000);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec11_performanceAnalyst-Report.e2e-spec.js.map