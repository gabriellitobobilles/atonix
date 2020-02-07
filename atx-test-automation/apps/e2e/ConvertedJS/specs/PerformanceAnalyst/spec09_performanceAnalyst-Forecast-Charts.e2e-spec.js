"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19588: Performance Analyst - Forecast  Charts', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var previousdate, currentdate;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        var EC = protractor_1.protractor.ExpectedConditions;
        // browser.manage().timeouts().setScriptTimeout(600000);
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
    it('Step 1: Confirm current weather values display properly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_j.sent()).indexOf('All Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_j.sent()).indexOf('APS')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_j.sent()).indexOf('Gila Bend')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_j.sent()).indexOf('Gila Bend Solar PV')])
                        .click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    // appTitle.selectClientMain('All Clients', ['APS', 'Gila Bend', 'Gila Bend Solar PV'],
                    //   appName.performanceAnalyst);
                    // $$('[ng-click="vm.selectView(view)"]').get(7).click();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.forecast);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Adjust time to see 5 day forecast- verify correct displayed trends', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    appTitle.waitingForElementTobeVisible(protractor_1.$('[id="calendarPopupButton"]'));
                    /** Adjust time to see 5 day forecast */
                    return [4 /*yield*/, protractor_1.$('[id="calendarPopupButton"]').click()];
                case 1:
                    /** Adjust time to see 5 day forecast */
                    _c.sent();
                    previousdate = appTitle.getPreviousdaysDate(5);
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).clear()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).sendKeys(previousdate)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date2')).clear()];
                case 4:
                    _c.sent();
                    currentdate = appTitle.getCurrentDate();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date2')).sendKeys(currentdate)];
                case 5:
                    _c.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.$$('[ng-click="trVM.applyPopup()"]').first().click()];
                case 6:
                    _c.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.$$('[class="btn btn-primary"]').first().click()];
                case 7:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(3000);
                    /** verify correct displayed trends  */
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="forecast in vm.tempForecast"]').count()];
                case 8:
                    /** verify correct displayed trends  */
                    _a.apply(void 0, [_c.sent()]).toEqual(6);
                    // console.log(await $('[class="currentWeatherStyle"]').getText());
                    _b = expect;
                    return [4 /*yield*/, protractor_1.$('[class="currentWeatherStyle"]').getText()];
                case 9:
                    // console.log(await $('[class="currentWeatherStyle"]').getText());
                    _b.apply(void 0, [_c.sent()]).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec09_performanceAnalyst-Forecast-Charts.e2e-spec.js.map