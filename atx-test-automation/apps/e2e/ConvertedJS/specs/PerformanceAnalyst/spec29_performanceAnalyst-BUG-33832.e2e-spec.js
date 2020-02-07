"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Bug 33832 - Time Slider resets on lower assets', function () {
    var appTitle = new performanceHelper_po_1.helper();
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        var EC = protractor_1.protractor.ExpectedConditions;
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
    it('Bug 33832 - Time Slider resets on lower assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, previousdate, date1, _g, _h, _j, _k, date2;
        var _this = this;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    protractor_1.browser.sleep(5000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('Demo Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('Reference WWTP Client')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('WWTP Plant')])
                        .click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, appTitle.selectTimeSlider.calendarIconmap.isPresent()];
                        });
                    }); }, 720000);
                    protractor_1.browser.actions().mouseMove(appTitle.selectTimeSlider.calendarIconmap).perform();
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIconmap.click()];
                case 7:
                    _l.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIconStartMap.click()];
                case 8:
                    _l.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDateboxMap.clear()];
                case 9:
                    _l.sent();
                    previousdate = new Date(new Date().setDate(new Date().getDate() - 5));
                    appTitle.selectCalendarMonthYear(previousdate);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarApplybtn.last().click()];
                case 10:
                    _l.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarOKBtn.last().click()];
                case 11:
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.selectTimeSlider.dateIndicator.getAttribute('textContent')];
                case 12:
                    date1 = _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 13: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('WWTP Plant')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 14:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 15: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Primary Treatment')])
                        .click()];
                case 16:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.selectTimeSlider.dateIndicator.getAttribute('textContent')];
                case 17:
                    date2 = _l.sent();
                    expect(date1 === date2).toBe(true, 'Bug repeat again, the time slider goes to “now” again');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec29_performanceAnalyst-BUG-33832.e2e-spec.js.map