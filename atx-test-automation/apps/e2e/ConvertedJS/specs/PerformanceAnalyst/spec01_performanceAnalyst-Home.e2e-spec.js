"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Performance Analyst - Home', function () {
    var appTitle = new performanceHelper_po_1.helper();
    beforeEach((function () {
        var EC = protractor_1.protractor.ExpectedConditions;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        appTitle.fillLoginForm();
        appTitle.confirmLogin();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
        expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
        protractor_1.browser.driver.sleep(5000);
    }));
    it('19580: Performance Analyst - Home', function () {
        appTitle.clickAppMenu();
        appTitle.checkPerformanceAppIcon();
        appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
        protractor_1.browser.waitForAngular();
        appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().keyDown(protractor_1.protractor.Key.CONTROL).sendKeys(protractor_1.protractor.Key.SUBTRACT).keyUp(protractor_1.protractor.Key.CONTROL).perform();
        for (var i = 100; i >= 30; i = i - 10) {
            protractor_1.browser.executeScript('document.body.style.zoom=\'' + i + '%\'');
            protractor_1.browser.sleep(3000);
        }
        protractor_1.protractor.browser.sleep(5000);
        for (var x = 30; x <= 150; x = x + 10) {
            protractor_1.browser.executeScript('document.body.style.zoom=\'' + x + '%\'');
            protractor_1.browser.sleep(1000);
        }
        protractor_1.browser.sleep(5000);
    });
});
//# sourceMappingURL=spec01_performanceAnalyst-Home.e2e-spec.js.map