"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Alert: Right click on model perform all actions', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var alerthelper = new performanceHelper_po_1.alert();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var win;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(900000);
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
    it('ModelConfiguration Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()), 700000, 'Element taking too long to appear in the DOM');
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _b.sent();
                    alerthelper.alertScreeningView.modelConfiguration.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 4:
                    _a.apply(void 0, [(_b.sent()) === "Alerts - Model Config"]).toBe(true, "Title is not model config");
                    expect(alerthelper.modelConfigView.singleViewInputTab.isDisplayed()).toBe(true, "Input Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewAlertTab.isDisplayed()).toBe(true, "Alert Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewAnomaliesTab.isDisplayed()).toBe(true, "Anomalies Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewDataTab.isDisplayed()).toBe(true, "Data Tab is not showing");
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=test.js.map