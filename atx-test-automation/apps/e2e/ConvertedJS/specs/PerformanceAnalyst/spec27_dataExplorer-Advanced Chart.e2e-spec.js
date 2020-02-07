"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('19612: Data Explorer - Advanced Chart', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName, measurementName;
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:max-line-length
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
    it('Step 1:  Ensure Advanced chart can be selected from Add chart list.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, dx, x, _l, target, elem;
        return tslib_1.__generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_m.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    _m.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_m.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _m.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_m.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _m.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_m.sent()).indexOf('Eastern PC1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _m.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_m.sent()).indexOf('Eastern PC1')])
                        .click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _m.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    trendName = appTitle.makeid(11);
                    return [4 /*yield*/, appTitle.atonixTrendButtons.nameDropdown.click()];
                case 11:
                    _m.sent();
                    return [4 /*yield*/, appTitle.atonixCreateCharts.createNewChartGroupBtn.click()];
                case 12:
                    _m.sent();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 0;
                    _m.label = 13;
                case 13:
                    if (!(dx < validator.getTagList.length)) return [3 /*break*/, 20];
                    x = 0;
                    _m.label = 14;
                case 14:
                    _l = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-container "]').count()];
                case 15:
                    if (!(_l <= (_m.sent()) - 4)) return [3 /*break*/, 19];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]))];
                case 16:
                    elem = _m.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 17:
                    _m.sent();
                    _m.label = 18;
                case 18:
                    x++;
                    return [3 /*break*/, 14];
                case 19:
                    dx++;
                    return [3 /*break*/, 13];
                case 20:
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, appTitle.atonixTrendButtons.saveBtn.click()];
                case 21:
                    _m.sent();
                    return [4 /*yield*/, appTitle.atonixSaveTrendDefinition.saveBtn.click()];
                case 22:
                    _m.sent();
                    appTitle.trendSelector();
                    appTitle.selectingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2:  On series tab verify the group by feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var cnt, dx, cntx, dy;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ** Checking Group Type option */
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.chartSettingTab.series.click();
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.GroupType"]').$$('option').count()];
                case 1:
                    cnt = _a.sent();
                    dx = cnt - 1;
                    _a.label = 2;
                case 2:
                    if (!(dx >= 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.GroupType"]').$$('option').get(dx).click()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.$('[class="form-group ng-hide"]').isPresent()];
                case 4:
                    if (!((_a.sent()) === false)) return [3 /*break*/, 9];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.TimeDivision"]').$$('option').count()];
                case 5:
                    cntx = _a.sent();
                    dy = cntx - 1;
                    _a.label = 6;
                case 6:
                    if (!(dy >= 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.TimeDivision"]').$$('option').get(dy).click()];
                case 7:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    _a.label = 8;
                case 8:
                    --dy;
                    return [3 /*break*/, 6];
                case 9:
                    --dx;
                    return [3 /*break*/, 2];
                case 10:
                    // appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Ensure user is able to select Display as options & create a chart accordingly.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            validator.chartSetting.GroupSeriesChart.displayAs.forEach(function (item, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, index);
                            _a = expect;
                            return [4 /*yield*/, appTitle.chartSettingTab.chartType.$('option:checked').getText()];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toEqual(item);
                            return [2 /*return*/];
                    }
                });
            }); });
            protractor_1.browser.waitForAngular();
            return [2 /*return*/];
        });
    }); });
    it('Step 4: Verfiy the Chart type feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, dx, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.measurementType.first(), 0);
                    // tslint:disable-next-line:max-line-length
                    _a = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementType.first().$('option:checked').getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _a.apply(void 0, [_c.sent()]).toEqual(validator.chartSetting.GroupSeriesChart.chartType[2]);
                    dx = 1;
                    _c.label = 2;
                case 2:
                    if (!(dx < validator.chartSetting.GroupSeriesChart.chartType.length)) return [3 /*break*/, 5];
                    // tslint:disable-next-line:max-line-length
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.measurementType.first(), dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
                    // tslint:disable-next-line:max-line-length
                    _b = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementType.first().$('option:checked').getText()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(void 0, [_c.sent()]).toEqual(validator.chartSetting.GroupSeriesChart.chartType[dx]); // this test passes in chrome but fails in phantomjs
                    _c.label = 4;
                case 4:
                    dx++;
                    return [3 /*break*/, 2];
                case 5:
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Ensure Add Measurement.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.selectDropdownbyNum(protractor_1.$('[ng-model="settingsVM.GroupType"]'), 1);
                    measurementName = appTitle.makeid(11);
                    protractor_1.browser.actions().mouseMove(appTitle.chartSettingTab.addMeasurement).perform();
                    appTitle.chartSettingTab.addMeasurement.click();
                    appTitle.chartSettingTab.measurementName.last().click();
                    appTitle.chartSettingTab.measurementName.last().sendKeys(measurementName);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(appTitle.chartSettingTab.save).perform()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, appTitle.chartSettingTab.save.click()];
                case 2:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.chartSettingTab.series.click();
                    // tslint:disable-next-line:max-line-length
                    _a = expect;
                    _b = validator.getTagList.length;
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementName.count()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _a.apply(void 0, [_b !== (_c.sent())]).toBe(true, 'new measurement was not save successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Ensure Chart filter Advanced options', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            validator.months.forEach(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // tslint:disable-next-line:max-line-length
                        return [4 /*yield*/, protractor_1.$('[ng-click="settingsVM.trendDefinition.Filter.exclude' + item + ' = !settingsVM.trendDefinition.Filter.exclude' + item + '"]').click()];
                        case 1:
                            // tslint:disable-next-line:max-line-length
                            _a.sent();
                            expect(protractor_1.$$('[class="fa fa-stack-2x fa-ban"]').isPresent()).toEqual(true, 'Chart Filter was not working correctly');
                            protractor_1.browser.sleep(1000);
                            return [2 /*return*/];
                    }
                });
            }); });
            validator.days.forEach(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // tslint:disable-next-line:max-line-length
                        return [4 /*yield*/, protractor_1.$('[ng-click="settingsVM.trendDefinition.Filter.exclude' + item + ' = !settingsVM.trendDefinition.Filter.exclude' + item + '"]').click()];
                        case 1:
                            // tslint:disable-next-line:max-line-length
                            _a.sent();
                            expect(protractor_1.$$('[class="fa fa-stack-2x fa-ban"]').isPresent()).toEqual(true, 'Chart Filter was not working correctly');
                            protractor_1.browser.sleep(1000);
                            return [2 /*return*/];
                    }
                });
            }); });
            appTitle.chartSettingTab.save.click();
            protractor_1.browser.waitForAngular();
            return [2 /*return*/];
        });
    }); });
    it('Step 7: Verify Series settings', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dx, _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.chartSettingTab.series.click();
                    dx = 0;
                    _d.label = 1;
                case 1:
                    _a = dx;
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementSetting.count()];
                case 2:
                    if (!(_a < (_d.sent()))) return [3 /*break*/, 5];
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementSetting.get(dx).click()];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    dx++;
                    return [3 /*break*/, 1];
                case 5:
                    // tslint:disable-next-line:max-line-length
                    _b = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementConfig.count()];
                case 6:
                    _c = (_d.sent());
                    return [4 /*yield*/, appTitle.chartSettingTab.measurementSetting.count()];
                case 7:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(void 0, [_c === (_d.sent())]).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 8: Ensure series filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dx, _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    dx = 0;
                    _d.label = 1;
                case 1:
                    _a = dx;
                    return [4 /*yield*/, appTitle.chartSettingTab.seriesFilter.count()];
                case 2:
                    if (!(_a < (_d.sent()))) return [3 /*break*/, 5];
                    return [4 /*yield*/, appTitle.chartSettingTab.seriesFilter.get(dx).click()];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    dx++;
                    return [3 /*break*/, 1];
                case 5:
                    _b = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.seriesFilterConfig.count()];
                case 6:
                    _c = (_d.sent());
                    return [4 /*yield*/, appTitle.chartSettingTab.seriesFilter.count()];
                case 7:
                    _b.apply(void 0, [_c === (_d.sent())]).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 9: Verify delete measurement.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, appTitle.chartSettingTab.deleteMeasurement.last().click()];
                case 1:
                    _c.sent();
                    // tslint:disable-next-line:max-line-length
                    _a = expect;
                    _b = validator.getTagList.length;
                    return [4 /*yield*/, appTitle.chartSettingTab.deleteMeasurement.count()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _a.apply(void 0, [_b === (_c.sent())]).toBe(true, 'Measurement was not deleted successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 10: Ensure user is able to select Data Retrieval Method.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            validator.dataRetrieval.forEach(function (item, index) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // tslint:disable-next-line:max-line-length
                            appTitle.selectDropdownbyNum(appTitle.chartSettingTab.trendDataRetrieval.first(), index); // sets the drop down to the first index which has the string text of Eye Infection/Problem
                            // tslint:disable-next-line:max-line-length
                            _a = expect;
                            return [4 /*yield*/, appTitle.chartSettingTab.trendDataRetrieval.first().$('option:checked').getText()];
                        case 1:
                            // tslint:disable-next-line:max-line-length
                            _a.apply(void 0, [_b.sent()]).toEqual(item); // this test passes in chrome but fails in phantomjs
                            protractor_1.browser.sleep(1000);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    it('Step 11: Verify Add Pin feature', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var pinName, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pinName = appTitle.makeid(11);
                    appTitle.chartSettingTab.pin.click();
                    appTitle.dataExplorerNavElemSelector.addPins.click();
                    appTitle.DispatchChart.pinName.last().click();
                    appTitle.DispatchChart.pinName.last().clear();
                    appTitle.DispatchChart.pinName.last().sendKeys(pinName);
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.pinType.last(), 2);
                    _a = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.pinType.last().$('option:checked').getText()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual('Last 30 Minutes (Selected)');
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).toBe(true, 'pins was not created successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 12: Ensure user is able to add different types of pins.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, dx, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.chartSettingTab.pin.click();
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.criteriaObjectId.first(), 0);
                    // tslint:disable-next-line:max-line-length
                    _a = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.criteriaObjectId.first().$('option:checked').getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _a.apply(void 0, [_c.sent()]).toEqual(validator.pinsType[2]);
                    dx = 1;
                    _c.label = 2;
                case 2:
                    if (!(dx < validator.pinsType.length)) return [3 /*break*/, 5];
                    // tslint:disable-next-line:max-line-length
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.criteriaObjectId.first(), dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
                    // tslint:disable-next-line:max-line-length
                    _b = expect;
                    return [4 /*yield*/, appTitle.chartSettingTab.criteriaObjectId.first().$('option:checked').getText()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(void 0, [_c.sent()]).toEqual(validator.pinsType[dx]); // this test passes in chrome but fails in phantomjs
                    _c.label = 4;
                case 4:
                    dx++;
                    return [3 /*break*/, 2];
                case 5:
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 13: Ensure hide pin.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var alert, _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    appTitle.chartSettingTab.hidePin.last().click();
                    return [4 /*yield*/, appTitle.chartSettingTab.hidePin.getAttribute('class')];
                case 1:
                    alert = _d.sent();
                    _a = expect;
                    _b = protractor_1.$;
                    _c = '[class="';
                    return [4 /*yield*/, appTitle.chartSettingTab.hidePin.getAttribute('class')];
                case 2:
                    _a.apply(void 0, [_b.apply(void 0, [_c + (_d.sent()) + '"]']).isPresent()]).toBe(true, 'Pin was not hide');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 14: Ensure delete pin.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.chartSettingTab.removePin.last().click();
            expect(appTitle.DispatchChart.pinName.isPresent()).not.toBe(true, 'Pin was not removed');
            appTitle.chartSettingTab.save.click();
            protractor_1.browser.waitForAngular();
            expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).not.toBe(true, 'Pin was not removed');
            appTitle.trendSelector();
            appTitle.deletingDataExplorerTrends(trendName);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=spec27_dataExplorer-Advanced Chart.e2e-spec.js.map