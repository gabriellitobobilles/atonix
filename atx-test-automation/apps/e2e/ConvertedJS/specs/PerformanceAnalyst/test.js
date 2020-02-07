"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
describe('19594: Performance Analyst - Map', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var categoryName, categoryList, priorClearFilter, afterClearFilter, slider;
    beforeAll((function () {
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
    it('Step 1: Ensure map is loading.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(performanceHelper_po_1.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(performanceHelper_po_1.PerformanceTabName.map);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.$('[id="QuickSearchName"]').click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.$$('[ng-click="tagSearchPopupVM.setSelectedQuicksearch(item)"]')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-click="tagSearchPopupVM.setSelectedQuicksearch(item)"]')
                            .getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [(_c.sent()).indexOf('DeCitXt1DIy')]).click();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=test.js.map