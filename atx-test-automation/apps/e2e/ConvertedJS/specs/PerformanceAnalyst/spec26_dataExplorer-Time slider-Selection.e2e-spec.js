"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:max-line-length
describe('19611: Data Explorer - Time slider - Selection ', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var previousdate, currentdate;
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
    it('Step 1:  Change time range to less than 4 days and verify switch to higher frequency data', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, dateStart, dateEnd;
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
                    return [4 /*yield*/, appTitle.trendSelector()];
                case 3:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(3000);
                    appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');
                    appTitle.selectTimeSlider.calendarIcon.click();
                    expect(appTitle.selectTimeSlider.calendarIconStart.isPresent()).toBe(true, 'open start calendar was not present');
                    appTitle.selectTimeSlider.calendarIconStart.click();
                    dateStart = new Date(new Date().setDate(new Date().getDate() - 4));
                    appTitle.selectCalendarMonthYear(dateStart);
                    expect(appTitle.selectTimeSlider.calendarIconEnd.isPresent()).toBe(true, 'open end calendar was not present');
                    appTitle.selectTimeSlider.calendarIconEnd.click();
                    dateEnd = new Date(new Date().setDate(new Date().getDate()));
                    appTitle.selectCalendarMonthYear(dateEnd);
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2:  Change time range with handles in calendar', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var target, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // **
                    // * Change time range with handles
                    // */
                    expect(protractor_1.$('[id="navEnd"]').isPresent()).toBe(true, 'End handle circle was not present');
                    expect(protractor_1.$('[id="navStart"]').isPresent()).toBe(true, 'Start handle circle was not present');
                    target = protractor_1.$('[id="navEnd"]');
                    elem = protractor_1.$('[id="navStart"]').$('g').$('circle');
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3:  Change time by typing date range in calendar', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // **
                    // * Change time range by typing date range in calendar
                    // */
                    appTitle.selectTimeSlider.calendarIcon.click();
                    expect(appTitle.selectTimeSlider.calendarIconStart.isPresent()).toBe(true, 'open start calendar was not present');
                    expect(protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).isPresent()).toBe(true, 'open start text box calendar was not present');
                    previousdate = appTitle.getPreviousdaysDate(5);
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).clear()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).sendKeys(previousdate)];
                case 2:
                    _a.sent();
                    expect(appTitle.selectTimeSlider.calendarIconEnd.isPresent()).toBe(true, 'open end calendar was not present');
                    expect(protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date2')).isPresent()).toBe(true, 'open end text box calendar was not present');
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date2')).clear()];
                case 3:
                    _a.sent();
                    currentdate = appTitle.getCurrentDate();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date2')).sendKeys(currentdate)];
                case 4:
                    _a.sent();
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec26_dataExplorer-Time slider-Selection.e2e-spec.js.map