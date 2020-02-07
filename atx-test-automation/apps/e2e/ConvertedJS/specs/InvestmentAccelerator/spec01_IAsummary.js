"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var InvestmentAccelerator_po_1 = require("../../page/InvestmentAccelerator_po");
var user_1 = require("../../helpers/user");
var user = new user_1.User();
var userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
};
describe('asset360 investment accelerator page app', function () {
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should see investment accelerator page', function () {
        user.logIn(userObj);
        console.log('Step 3');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.investAcrapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.timelineTab), 10000);
    });
});
describe('nD Test Client > Protractor Automation Test', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on nD Test Client and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavinDtc), 25000);
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 1:
                    _b.apply(_a, [(_c.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.wait(EC.presenceOf(page.assetnaviPAT), 25000);
                    //page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Protractor Automation Test'))
                    //.$('[class="arrow-cursor fa fa-caret-right"]').click();
                    /*       browser.sleep(3500);
                          browser.actions().mouseMove(page.assetnavi4).click().perform();
                          browser.sleep(3500);
                          browser.actions().mouseMove(page.assetnavixp4).click().perform()
                          browser.actions().mouseMove(page.assetnaviPAT).click().perform() */
                    protractor_1.browser.actions().mouseMove(page.assetnaviPAT).click().perform();
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Protractor Automation Test'))), 10000);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 investment accelerator timeslider and jump.to feature', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.jumptobtn), 25000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.jumptobtn.click()];
                case 2:
                    _a.sent();
                    page.jmplastqtr.click();
                    protractor_1.browser.sleep(6500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click time slider then slide it to the left', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, datetext, yCircle;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    datetext = protractor_1.element(protractor_1.by.id('navIndicatorDate'));
                    yCircle = protractor_1.element(protractor_1.by.id('navIndicator'));
                    console.log('Step 6');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(10000);
                    //browser.wait(EC.presenceOf(ylwCircle), 10000).then() => { 
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: -100, y: 0 }).mouseUp().perform();
                    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
                    //await browser.wait(EC.presenceOf(element(by.id('navIndicator'))), 15000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(yCircle), 15000)];
                case 1:
                    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
                    //await browser.wait(EC.presenceOf(element(by.id('navIndicator'))), 15000);
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click time slider then slide it to the right', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, datetext, yCircle;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    datetext = protractor_1.element(protractor_1.by.id('navIndicatorDate'));
                    yCircle = protractor_1.element(protractor_1.by.id('navIndicator'));
                    console.log('Step 7');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(10000);
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
                    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(yCircle), 15000)];
                case 1:
                    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on the keep and open panel feature', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.hidepanel).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.openpanel).click().perform()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('able to select Request Information link & redirects to its web URL', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click Request Information button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.reqInfoLink), 25000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.reqInfoLink.click()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should switch from previos tab and focus on new tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.getAllWindowHandles().then(function (handles) {
                        protractor_1.browser.driver.switchTo().window(handles[0]);
                        protractor_1.browser.driver.switchTo().window(handles[1]);
                    });
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('#Workpackage > h2'))), 27500)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Verify the Information Request Generator page', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="vm.pickUsers()"]', 'Add Recipients'))), 10000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.id('Workpackage'))), 15000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec01_IAsummary.js.map