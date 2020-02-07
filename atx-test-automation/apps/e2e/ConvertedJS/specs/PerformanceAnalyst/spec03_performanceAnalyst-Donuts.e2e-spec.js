"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19582: Performance Analyst - Donuts', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
        // var width = 1600;
        // var height = 1268;
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
    it('Step 1- Verify values seem correct in Donuts', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, alertTotalALLClient, issuesTotalALLClient, impactTotalALLClient;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])];
                case 2:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.css('.highcharts-subtitle tspan')).get(0).getText()];
                case 3:
                    alertTotalALLClient = _c.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.css('.highcharts-subtitle tspan')).get(1).getText()];
                case 4:
                    issuesTotalALLClient = _c.sent();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.css('.highcharts-subtitle tspan')).get(2).getText()];
                case 5:
                    impactTotalALLClient = _c.sent();
                    /* Check if the valuess are not zero */
                    expect(alertTotalALLClient).toBeGreaterThan(0);
                    expect(issuesTotalALLClient).toBeGreaterThan(0);
                    expect(impactTotalALLClient).toBeGreaterThan(0);
                    /* Check if the valuess are not null */
                    expect(alertTotalALLClient).not.toEqual(null);
                    expect(issuesTotalALLClient).not.toEqual(null);
                    expect(impactTotalALLClient).not.toEqual(null);
                    /* Check if the valuess are not empty */
                    expect(alertTotalALLClient).not.toBe('');
                    expect(issuesTotalALLClient).not.toBe('');
                    expect(impactTotalALLClient).not.toBe('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2- Click a slice in each donut and verify correct navigation', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var i, y, name_1, val;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    protractor_1.element.all(protractor_1.by.css('[ng-click="vm.selectView(view)')).get(0).click();
                    protractor_1.browser.sleep(5000);
                    appTitle.waitingForPieChartToLoad();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= 1)) return [3 /*break*/, 13];
                    y = 0;
                    _a.label = 2;
                case 2:
                    if (!(y <= 1)) return [3 /*break*/, 12];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-' + i + '')).get(y)).perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    // var name= await element.all(by.css('text > tspan:nth-child(1)')).get(5).getText();
                    // console.log(y);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.$('.highcharts-tooltip')));
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.$('.highcharts-tooltip')];
                        }); }); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$('.highcharts-tooltip').element(protractor_1.by.tagName('text')).$$('tspan').get(0).getText()];
                case 5:
                    name_1 = _a.sent();
                    protractor_1.browser.actions().click().perform();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.browser.element.all(protractor_1.by.css('.arrow-cursor.selectedAsset')).first()));
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.browser.element.all(protractor_1.by.css('.arrow-cursor.selectedAsset')).first()];
                        }); }); })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('.arrow-cursor.selectedAsset')).first()).perform()];
                case 7:
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$$('.arrow-cursor.selectedAsset').first().element(protractor_1.by.model('asset.Asset')).$('.ng-binding').getText()];
                case 8:
                    val = _a.sent();
                    // console.log('the value of value is: ' + val);
                    // console.log('the name of value is: ' + name);
                    expect(name_1 === val).toBe(true);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.repeater('assetNode in treeController.rootAssets')).get(0)).perform()];
                case 9:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('assetNode in treeController.rootAssets')).get(0).$$('.arrow-cursor').first()
                            .element(protractor_1.by.model('asset.Asset')).click()];
                case 10:
                    _a.sent();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    _a.label = 11;
                case 11:
                    y++;
                    return [3 /*break*/, 2];
                case 12:
                    ++i;
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec03_performanceAnalyst-Donuts.e2e-spec.js.map