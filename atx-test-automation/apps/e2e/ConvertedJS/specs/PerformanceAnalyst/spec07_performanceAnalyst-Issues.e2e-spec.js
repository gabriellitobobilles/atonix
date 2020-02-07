"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19586: Performance Analyst - Issues', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var winSel, name, val;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
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
    it('Step 1: Hover over info icon for issue summary', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngularEnabled(false);
                    protractor_1.browser.sleep(5000);
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.issues);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(protractor_1.$$('[class="highcharts-series-group"]').first()))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-4 ')).get(0)).perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.$('.highcharts-tooltip')];
                        }); }); })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$('.highcharts-tooltip').element(protractor_1.by.tagName('text')).$$('tspan').get(0).getText()];
                case 4:
                    name = _a.sent();
                    protractor_1.browser.actions().click().perform();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Click issue title to navigate to issue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(protractor_1.element.all(protractor_1.by.css('[class="highcharts-series-group"]')).first()))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(protractor_1.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))).perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('.arrow-cursor.selectedAsset').element(protractor_1.by.model('asset.Asset')).$('.ng-binding').getText()];
                case 4:
                    val = _a.sent();
                    expect(name === val).toBe(true);
                    return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(protractor_1.element.all(protractor_1.by.css('[class="issue ng-binding"]')).first()))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[class="issue ng-binding"]').get(0).click()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Select Issue Name and Confirm Navigation to Issue Snapshot ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var issueName, issueID, issueSnaphot, issueResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, protractor_1.$$('[class="issue ng-binding"]').get(0).getText()];
                case 1:
                    issueName = _a.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    winSel = _a.sent();
                    protractor_1.browser.switchTo().window(winSel[1]);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('[class="pull-right ng-binding ng-scope"]').getAttribute('textContent')];
                case 3:
                    issueID = _a.sent();
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 4:
                    issueSnaphot = _a.sent();
                    issueResult = 'Issue' + ' ' + issueID + ':' + ' ' + issueName;
                    expect(issueSnaphot === issueResult).toBe(true);
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(winSel[0])];
                case 5:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec07_performanceAnalyst-Issues.e2e-spec.js.map