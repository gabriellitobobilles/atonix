"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var page_PNsekoia_1 = require("../../page/page_PNsekoia");
var user_1 = require("../../helpers/user");
var user = new user_1.User();
var userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
};
describe('asset360 sekoia page app and select a specific asset', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 51');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 10000);
    });
    it('should click search navigator then enter sekoia 1A Automation Substation', function () {
        console.log('Step 52');
        protractor_1.browser.waitForAngular();
        page.searchasset.sendKeys('1A Automation Substation');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.sleep(5000);
    });
});
describe('sekoia list tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click on sekoia list tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 53');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    //browser.sleep(20000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.slisttab).click().perform()];
                case 1:
                    //browser.sleep(20000);
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('ui-grid-header-cell-label'))), 25000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click searchbox then search UGM Historical Reliability Plan', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 54s');
                    return [4 /*yield*/, page.searchasset3.sendKeys('UGM Historical Reliability Plan')];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(1000);
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click UseMap dropdown and select', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 55');
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.waitForAngular();
                    EC = protractor_1.protractor.ExpectedConditions;
                    i = 4;
                    _a.label = 1;
                case 1:
                    if (!(i >= 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.slistdrpdwn), 250000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.slistdrpdwn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
                    protractor_1.browser.sleep(2500);
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
                    protractor_1.browser.sleep(25000);
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec04_PNlist.js.map