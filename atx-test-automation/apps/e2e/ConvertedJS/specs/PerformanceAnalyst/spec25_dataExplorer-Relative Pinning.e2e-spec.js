"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('19609: Data Explorer - Relative Pinning', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName, trendIndex, trendIndex2, cntTrends;
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
    it('Step 1:  Add new chart… add new data, at least 2 series', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, dx, x, _l, target, elem;
        return tslib_1.__generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(5000);
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
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 0;
                    _m.label = 11;
                case 11:
                    if (!(dx < validator.getTagList.length)) return [3 /*break*/, 18];
                    x = 0;
                    _m.label = 12;
                case 12:
                    _l = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-container "]').count()];
                case 13:
                    if (!(_l <= (_m.sent()) - 4)) return [3 /*break*/, 17];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]))];
                case 14:
                    elem = _m.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 15:
                    _m.sent();
                    _m.label = 16;
                case 16:
                    x++;
                    return [3 /*break*/, 12];
                case 17:
                    dx++;
                    return [3 /*break*/, 11];
                case 18:
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
                    appTitle.trendSelector();
                    appTitle.selectingDataExplorerTrends(trendName);
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 19:
                    cntTrends = _m.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2:  Save pin from toolbar.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.dataExplorerNavElemSelector.savePin.click();
                    protractor_1.browser.waitForAngular();
                    expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).toBe(true, 'Pin was not save successfully');
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 1:
                    trendIndex = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3:  Create a Relative Pinned chart.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, target1, elem1, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Pins')).click()];
                case 1:
                    _c.sent();
                    appTitle.dataExplorerNavElemSelector.addPins.click();
                    appTitle.DispatchChart.pinName.last().clear();
                    appTitle.DispatchChart.pinName.last().sendKeys('Pin 2');
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.pinType.last(), 2);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 2:
                    trendIndex2 = _c.sent();
                    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(false, 'newly created pin was not successfull');
                    _a = expect;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.pins.count()];
                case 3:
                    _a.apply(void 0, [(_c.sent()) === 2]).toBe(true, 'Second Pin was not created successfully');
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 5);
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.aggregation, 2);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    target1 = protractor_1.$$('[transform="translate(0)"]').first();
                    return [4 /*yield*/, protractor_1.$('[class="grabbable"]')];
                case 4:
                    elem1 = _c.sent();
                    return [4 /*yield*/, appTitle.dragANDdrop(elem1, target1)];
                case 5:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.driver.actions().mouseMove(protractor_1.$('[id="CEChartContainer"]')).perform()];
                case 6:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.waitForAngular();
                    _c.label = 7;
                case 7:
                    if (!(cntTrends >= 1)) return [3 /*break*/, 9];
                    _b = expect;
                    return [4 /*yield*/, protractor_1.$('[id="CEChartContainer"]').$('table').$('tbody').$$('tr').get(cntTrends).$$('td').last().getText()];
                case 8:
                    _b.apply(void 0, [_c.sent()]).not.toEqual(null);
                    cntTrends--;
                    return [3 /*break*/, 7];
                case 9:
                    protractor_1.browser.sleep(3000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4:  Returning back to default chart setting', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
            appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 1);
            appTitle.chartSettingTab.save.click();
            protractor_1.browser.waitForAngular();
            protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
            expect(appTitle.DownloadOption.ChartContextMenuBtn.isPresent()).
                toBe(true, 'Something wrong, it will not return to the default chart type setting');
            return [2 /*return*/];
        });
    }); });
    it('Step 5:  Delete Relative Pinned Chart', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.trendSelector();
            protractor_1.browser.sleep(2000);
            appTitle.deletingDataExplorerTrends(trendName);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=spec25_dataExplorer-Relative Pinning.e2e-spec.js.map