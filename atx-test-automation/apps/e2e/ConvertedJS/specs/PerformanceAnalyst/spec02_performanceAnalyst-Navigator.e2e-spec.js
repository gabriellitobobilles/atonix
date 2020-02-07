"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable-next-line:file-name-casing
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Performance Analyst - Navigator', function () {
    var title;
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
    it('19581: Performance Analyst - Navigator', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < validator.getAppList.length)) return [3 /*break*/, 5];
                    appTitle.clickAppMenu();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceAnalysApp(validator.getAppList[i]);
                    protractor_1.browser.driver.sleep(2000);
                    return [4 /*yield*/, expect(appTitle.getToastErrorMsg().isPresent()).toBeFalsy()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(appTitle.getAppTitle()));
                    return [4 /*yield*/, appTitle.getAppTitle().getText()];
                case 3:
                    // tslint:disable-next-line:prefer-const
                    title = _a.sent();
                    // tslint:disable-next-line:max-line-length
                    expect(title.replace(/ powered by/g, '').trim() === validator.getAppList[i].toUpperCase()).toBe(true, 'the page title is not same as apps name:' + validator.getAppList[i].toUpperCase());
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec02_performanceAnalyst-Navigator.e2e-spec.js.map