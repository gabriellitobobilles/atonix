"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19591: Performance Analyst - Dispatch -Scenarios - Reports', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var winSel, highcharts_legend_item, highcharts_legend_item_zoom;
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
    it('Step 1: Ensure scenarios can be selected from comparison chart.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = this;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('All Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('City Of Lawrence')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Waste Water Treatment Plants (WWTP)')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Kansas River WWTP')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Kansas River WWTP')])
                        .click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    // appTitle.selectClientMain('All Clients', ['City Of Lawrence', 'Waste Water Treatment Plants (WWTP)',
                    //   'Kansas River WWTP', 'Kansas River WWTP'],
                    //   appName.performanceAnalyst);
                    // $$('[ng-click="vm.selectView(view)"]').get(10).click();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.dispatch);
                    protractor_1.browser.waitForAngular();
                    // await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
                    //   .getText()).indexOf('All Clients'));
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    appTitle.trendSelector();
                    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(EC.visibilityOf(protractor_1.element.all(protractor_1.by.repeater('chartSummary in dispatchVM.charts')).get(2)), 10000);
                            return [2 /*return*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in dispatchVM.charts')).get(2)];
                        });
                    }); });
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in dispatchVM.charts')).get(2).click()];
                case 11:
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _l.sent();
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
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 12:
                    highcharts_legend_item = _l.sent();
                    protractor_1.$('[ng-click="dispatchVM.chooseScenarios()"]').click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify Clear/Cancel/Ok button feature on comparison chart.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var val1, val2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.element(protractor_1.by.model('archive.Selected')).getAttribute('class')];
                case 1:
                    val1 = _a.sent();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('archive.Selected')).click()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('archive.Selected')).getAttribute('class')];
                case 3:
                    val2 = _a.sent();
                    expect(val1 !== val2).toBeTruthy();
                    expect(appTitle.getSelectScanariosVMClearBtn().isPresent()).toBeTruthy();
                    expect(appTitle.getSelectScanariosVMCancelBtn().isPresent()).toBeTruthy();
                    expect(appTitle.getSelectScanariosVMOKBtn().isPresent()).toBeTruthy();
                    expect(appTitle.getSelectScanariosVMFilterBtn().isPresent()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Ensure Filter functionality on comparison chart.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Ensure Filter functionality on comparison chart. */
            appTitle.getSelectScanariosVMFilterBtn().sendKeys('test');
            expect(protractor_1.element(protractor_1.by.model('archive.Selected')).isPresent()).not.toBeTruthy();
            appTitle.getSelectScanariosVMCancelBtn().click();
            expect(protractor_1.element(protractor_1.by.model('archive.Selected')).isPresent()).not.toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('Step 4: Ensure user is able to select different modes of data (Min/Max/Average/First/Last/Sum)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var sumSelector, i, sumClass;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (protractor_1.$$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]')).count()];
                case 1:
                    sumSelector = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i <= sumSelector - 1)) return [3 /*break*/, 5];
                    protractor_1.$$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]').get(i).click();
                    return [4 /*yield*/, protractor_1.$$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]').get(i).getAttribute('class')];
                case 3:
                    sumClass = _a.sent();
                    expect(sumClass === 'btn ng-binding ng-scope btn-success').toBeTruthy();
                    _a.label = 4;
                case 4:
                    ++i;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Ensure reports can be selected from drop down list.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /** Ensure reports can be selected from drop down list. */
                return [4 /*yield*/, protractor_1.$('[id="chartDropdown"]').click()];
                case 1:
                    /** Ensure reports can be selected from drop down list. */
                    _a.sent();
                    protractor_1.element.all(protractor_1.by.repeater('chartSummary in dispatchVM.charts')).get(2).click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Verify Print report feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /** Verify Print preview  */
                return [4 /*yield*/, appTitle.printPreview()];
                case 1:
                    /** Verify Print preview  */
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 7: Ensure report can be downloaded as an image, pdf, svg, jpeg. ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Ensure reports can be selected from drop down list. */
            /** Downloading Chart PNG Image */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePNG, testDetails_data_1.downloadFileType.PNG);
            /** Downloading Chart JPEG Image */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileJPEG, testDetails_data_1.downloadFileType.JPEG);
            /** Downloading Chart PDF File */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FilePDF, testDetails_data_1.downloadFileType.PDF);
            /** Downloading Chart SVG File */
            appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn, appTitle.DownloadOption.DownLoadListOption, testDetails_data_1.downloadFileName.FileSVG, testDetails_data_1.downloadFileType.SVG);
            return [2 /*return*/];
        });
    }); });
    it('Step 8: Verify edit chart feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highcharts_legend_item_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Verify edit chart feature. */
                    expect(appTitle.DispatchChart.EditChartBtn.first().isPresent()).toBeTruthy();
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _a.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    protractor_1.browser.waitForAngularEnabled();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    highcharts_legend_item_2 = _a.sent();
                    expect(highcharts_legend_item === highcharts_legend_item_2).toBe(true, 'Legent chart should be equal');
                    expect(appTitle.DispatchChart.EditChartSettingBtn.isPresent()).toBeTruthy();
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 9: Verify edit chart settings feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Verify edit chart settings feature. */
            expect(appTitle.DispatchChart.EditChartSettingBtn.isPresent()).toBeTruthy();
            appTitle.DispatchChart.EditChartSettingBtn.first().click();
            protractor_1.browser.waitForAngular();
            expect(protractor_1.$('[ng-submit="settingsVM.OK()"]').isPresent).toBeTruthy();
            protractor_1.$('[ng-click="settingsVM.OK()"]').click();
            return [2 /*return*/];
        });
    }); });
    it('Step 10: Ensure open chart in new tab feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highcharts_legend_item_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Ensure open chart in new tab feature. */
                    expect(appTitle.DispatchChart.OpenChartInNewTabBtn.isPresent()).toBeTruthy();
                    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _a.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    highcharts_legend_item_3 = _a.sent();
                    expect(highcharts_legend_item === highcharts_legend_item_3).toBe(true, 'Legent chart should be equal');
                    expect(appTitle.DownloadOption.ChartContextMenuBtn.isPresent()).toBeTruthy();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    highcharts_legend_item_zoom = _a.sent();
                    highcharts_legend_item_zoom = highcharts_legend_item_zoom - 1;
                    appTitle.ChartZoomOut(highcharts_legend_item_zoom);
                    protractor_1.browser.sleep(5000);
                    expect(appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 11: Verify email chart feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Verify email chart feature. */
            expect(appTitle.DispatchChart.EmailChartBtn.isPresent()).toBeTruthy();
            appTitle.DispatchChart.EmailChartBtn.click();
            protractor_1.browser.waitForAngular();
            expect(protractor_1.element.all(protractor_1.by.repeater('emailOption in emailOptions')).isPresent()).toBeTruthy();
            protractor_1.$('[ng-click="bvShow=false"]').click();
            return [2 /*return*/];
        });
    }); });
    it('Step 12: Verify Download chart contents feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var highcharts_legend_item_4;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Verify Download chart contents feature. */
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    winSel = _a.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    highcharts_legend_item_4 = _a.sent();
                    expect(highcharts_legend_item === highcharts_legend_item_4).toBe(true, 'Legent chart should be equal');
                    expect(appTitle.DispatchChart.DownloadChartContentBtn.isPresent()).toBeTruthy();
                    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, testDetails_data_1.downloadFileName.downloadCSV);
                    protractor_1.browser.sleep(1000);
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec12_performanceAnalyst-Dispatch-Scenarios-Reports.e2e-spec.js.map