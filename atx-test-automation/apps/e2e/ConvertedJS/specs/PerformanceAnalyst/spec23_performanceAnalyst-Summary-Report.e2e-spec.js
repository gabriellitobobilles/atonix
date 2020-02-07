"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('19593: Performance Analyst - Summary - Report', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var win, trendName, trendIndex;
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
    it('Step 1:  Ensure chart aggregation data respecting time slider.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, dx, x, _j, target, elem, target1, elem1, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    appTitle.waitingForPieChartToLoad();
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    win = _l.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 2:
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    // ** Create new chart without saving*/
                    protractor_1.browser.sleep(3000);
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.DispatchChart.EditChartSettingBtn.first().click();
                    appTitle.DispatchChart.chartTitle.clear();
                    appTitle.DispatchChart.chartTitle.sendKeys(trendName);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Eastern PC1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    // tslint:disable-next-line:max-line-length
                    // await appTitle.dataExplorerNavElemSelector.assetTree
                    //   .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC1'))
                    //   .click();
                    protractor_1.browser.waitForAngular();
                    // ** Add variable and do drag and drop*/
                    protractor_1.browser.sleep(2000);
                    dx = 0;
                    _l.label = 11;
                case 11:
                    if (!(dx < validator.getTagList.length)) return [3 /*break*/, 18];
                    x = 0;
                    _l.label = 12;
                case 12:
                    _j = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-container "]').count()];
                case 13:
                    if (!(_j <= (_l.sent()) - 4)) return [3 /*break*/, 17];
                    target = protractor_1.$$('[class="highcharts-container "]').first();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]))];
                case 14:
                    elem = _l.sent();
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 15:
                    _l.sent();
                    _l.label = 16;
                case 16:
                    x++;
                    return [3 /*break*/, 12];
                case 17:
                    dx++;
                    return [3 /*break*/, 11];
                case 18:
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 19:
                    trendIndex = _l.sent();
                    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 5);
                    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.aggregation, 2);
                    appTitle.chartSettingTab.save.click();
                    protractor_1.browser.waitForAngular();
                    target1 = protractor_1.$$('[transform="translate(0)"]').first();
                    return [4 /*yield*/, protractor_1.$('[class="grabbable"]')];
                case 20:
                    elem1 = _l.sent();
                    return [4 /*yield*/, appTitle.dragANDdrop(elem1, target1)];
                case 21:
                    _l.sent();
                    // await browser.driver.actions().dragAndDrop(elem1, target1).mouseUp().perform();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.driver.actions().mouseMove(protractor_1.$('[id="CEChartContainer"]')).perform()];
                case 22:
                    _l.sent();
                    protractor_1.browser.sleep(3000);
                    _l.label = 23;
                case 23:
                    if (!(trendIndex >= 1)) return [3 /*break*/, 25];
                    _k = expect;
                    return [4 /*yield*/, protractor_1.$('[id="CEChartContainer"]').$('table').$('tbody').$$('tr').get(trendIndex).$$('td').last().getText()];
                case 24:
                    _k.apply(void 0, [_l.sent()]).not.toEqual(null);
                    trendIndex--;
                    return [3 /*break*/, 23];
                case 25: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec23_performanceAnalyst-Summary-Report.e2e-spec.js.map