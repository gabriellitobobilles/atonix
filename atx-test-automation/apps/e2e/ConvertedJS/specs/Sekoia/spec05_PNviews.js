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
describe('asset360 sekoia page app and select specific asset', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 54');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 10000);
    });
    it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', function () {
        console.log('Step 55');
        protractor_1.browser.waitForAngular();
        page.searchasset.sendKeys('UGM Historical Reliability Plan');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.sleep(5000);
    });
});
describe('sekoia view tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click on sekoia view tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 56');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(20000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.sviewtab).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click searchbox then search Eastern PC1', function () {
        console.log('Step 57s');
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(2500);
        page.searchasset3.sendKeys('Eastern PC1');
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(2500);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.sleep(5000);
    });
});
//# sourceMappingURL=spec05_PNviews.js.map