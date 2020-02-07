"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19603: Data Explorer - Drop Down Menu', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var trendName;
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
    it('step 1: Load different charts - Verify timing is normal', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _loop_1, i;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _c.sent();
                    _loop_1 = function (i) {
                        // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
                        protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="text-center text-dark"]')));
                        protractor_1.browser.waitForAngular();
                        appTitle.trendSelector();
                        // appTitle.chartDropDown.chartDropDownBtn.click();
                        protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                protractor_1.browser.wait(EC.visibilityOf(protractor_1.$$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i)), 10000);
                                return [2 /*return*/, protractor_1.$$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i)];
                            });
                        }); });
                        protractor_1.$$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i).click();
                        protractor_1.browser.wait(EC.visibilityOf(protractor_1.$('[id="CEChartContainer"]')), 3000);
                        expect(protractor_1.$('[id="CEChartContainer"]')).toBeTruthy();
                    };
                    for (i = 1; i < 4; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Delete charts', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ** Delete Charts*/
                    trendName = appTitle.makeid(11);
                    return [4 /*yield*/, appTitle.atonixTrendButtons.nameDropdown.click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.refresh();
                    protractor_1.browser.sleep(2000);
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
                            return [2 /*return*/, appTitle.chartDropDown.chartDropDownBtn];
                        });
                    }); });
                    appTitle.trendSelector();
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    protractor_1.browser.sleep(2000);
                    appTitle.deletingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec16_dataExplorer-Drop-Down-Menu.e2e-spec.js.map