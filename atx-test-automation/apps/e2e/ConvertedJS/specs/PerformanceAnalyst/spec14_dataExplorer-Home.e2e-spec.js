"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19601: Data Explorer - Home', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var trendIndex, trendIndex2, val2;
    var axes = ['Saab', 'Volvo'];
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
    it('step 1: Verify app auto scale', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, i, x;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_j.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_j.sent()).indexOf('nD Test StationGroup')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_j.sent()).indexOf('nD Test Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_j.sent()).indexOf('nD Test Eastern PC3')])
                        .click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.actions().keyDown(protractor_1.protractor.Key.CONTROL).sendKeys(protractor_1.protractor.Key.SUBTRACT).keyUp(protractor_1.protractor.Key.CONTROL).perform();
                    for (i = 100; i >= 30; i = i - 10) {
                        protractor_1.browser.executeScript('document.body.style.zoom=\'' + i + '%\'');
                        protractor_1.browser.sleep(3000);
                    }
                    protractor_1.protractor.browser.sleep(5000);
                    for (x = 30; x <= 100; x = x + 10) {
                        protractor_1.browser.executeScript('document.body.style.zoom=\'' + x + '%\'');
                        protractor_1.browser.sleep(1000);
                    }
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Any nested scroll bars from previous test', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            expect(protractor_1.$('[id="CEChartContainer"]').isPresent()).toBe(true, 'double scroll is present');
            return [2 /*return*/];
        });
    }); });
    it('step 3: Verify the Customize series name feature for New Chart & New Grouped Series chart', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, dx, x, _l, target, elem, highcharts_legend_item;
        return tslib_1.__generator(this, function (_m) {
            switch (_m.label) {
                case 0:
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
                    /** Create new Chart trend */
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys('GabrielTest');
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 11:
                    trendIndex = _m.sent();
                    appTitle.trendSelector();
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getText()];
                case 12:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    val2 = _m.sent();
                    expect(val2.indexOf('GabrielTest (' + trendIndex + ')') >= 0).toBe(true, 'Your not successfully created a Trend');
                    expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf('GabrielTest (' + trendIndex + ')'))
                        .isPresent()).toBe(true, 'Delete icon is not present');
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in trends')).get(val2.indexOf('GabrielTest (' + trendIndex + ')')).click()];
                case 13:
                    _m.sent();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 0;
                    _m.label = 14;
                case 14:
                    if (!(dx < validator.getTagList.length)) return [3 /*break*/, 21];
                    x = 0;
                    _m.label = 15;
                case 15:
                    _l = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-container "]').count()];
                case 16:
                    if (!(_l <= (_m.sent()) - 4)) return [3 /*break*/, 20];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]))];
                case 17:
                    elem = _m.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 18:
                    _m.sent();
                    _m.label = 19;
                case 19:
                    x++;
                    return [3 /*break*/, 15];
                case 20:
                    dx++;
                    return [3 /*break*/, 14];
                case 21:
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.linkText('Series')).click()];
                case 22:
                    _m.sent();
                    protractor_1.$$('[ng-model="s.DisplayText"]').first().clear();
                    protractor_1.$$('[ng-model="s.DisplayText"]').first().sendKeys(axes[0]);
                    protractor_1.$$('[ng-model="s.DisplayText"]').last().clear();
                    protractor_1.$$('[ng-model="s.DisplayText"]').last().sendKeys(axes[1]);
                    protractor_1.$('[ng-click="settingsVM.OK()"]').click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(0)];
                case 23:
                    highcharts_legend_item = _m.sent();
                    // console.log(highcharts_legend_item);
                    expect(highcharts_legend_item.indexOf(axes[0]) >= 0).toBe(true, 'Customize series name was not created');
                    expect(highcharts_legend_item.indexOf(axes[1]) >= 0).toBe(true, 'Customize series name was not created');
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 24:
                    // browser.refresh();
                    trendIndex2 = _m.sent();
                    appTitle.trendSelector();
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.deletingDataExplorerTrends('GabrielTest');
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 4: Ensure user is able to group the series for a custom group type.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var cnt, dx, cntx, dy;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Create new Chart trend */
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartGroupBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys('GabrielTest');
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Check if the trend is created and select it */
                    appTitle.trendSelector();
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    return [4 /*yield*/, appTitle.selectingDataExplorerTrends('GabrielTest')];
                case 1:
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    _a.sent();
                    // ** Checking Group Type option */
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.chartSettingTab.series.click();
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.GroupType"]').$$('option').count()];
                case 2:
                    cnt = _a.sent();
                    dx = cnt - 1;
                    _a.label = 3;
                case 3:
                    if (!(dx >= 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.GroupType"]').$$('option').get(dx).click()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.$('[class="form-group ng-hide"]').isPresent()];
                case 5:
                    if (!((_a.sent()) === false)) return [3 /*break*/, 10];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.TimeDivision"]').$$('option').count()];
                case 6:
                    cntx = _a.sent();
                    dy = cntx - 1;
                    _a.label = 7;
                case 7:
                    if (!(dy >= 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, protractor_1.$('[ng-model="settingsVM.TimeDivision"]').$$('option').get(dy).click()];
                case 8:
                    _a.sent();
                    protractor_1.browser.sleep(1000);
                    _a.label = 9;
                case 9:
                    --dy;
                    return [3 /*break*/, 7];
                case 10:
                    --dx;
                    return [3 /*break*/, 3];
                case 11:
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.refresh();
                    // trendIndex2 = await appTitle.getNumberHighchartsVMLegendItem(0);
                    appTitle.trendSelector();
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    // ** Deleted Created Trend */
                    appTitle.deletingDataExplorerTrends('GabrielTest');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec14_dataExplorer-Home.e2e-spec.js.map