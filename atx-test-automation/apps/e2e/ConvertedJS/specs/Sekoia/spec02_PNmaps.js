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
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 27');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 10000);
    });
    it('should click on sekoia demo client and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 28');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.actions().mouseMove(page.assetnavi3).click().perform();
                    protractor_1.browser.sleep(2500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviSDC).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp3).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviUGM0).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', function () {
        console.log('Step 29');
        protractor_1.browser.waitForAngular();
        var EC = protractor_1.protractor.ExpectedConditions;
        page.searchasset.sendKeys('UGM Historical Reliability Plan');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
    });
});
describe('sekoia map tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click on sekoia map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 30');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(10000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.maptab).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 8000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click last year, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 31');
            protractor_1.browser.sleep(9000);
            EC = protractor_1.protractor.ExpectedConditions;
            page.jumptobtn.click();
            protractor_1.browser.sleep(1000);
            page.jmplastyr.click();
            protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('tableLoadingSpinner'))), 8000);
            return [2 /*return*/];
        });
    }); });
    it('should click last quarter, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 32');
            protractor_1.browser.sleep(9000);
            EC = protractor_1.protractor.ExpectedConditions;
            page.jumptobtn.click();
            protractor_1.browser.sleep(1000);
            page.jmplastqtr.click();
            protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('tableLoadingSpinner'))), 8000);
            return [2 /*return*/];
        });
    }); });
    it('should click on zoom in and zoom out on sekoia map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 33');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000)];
                case 1:
                    _a.sent();
                    page.mapzoomIn.click();
                    protractor_1.browser.sleep(5000);
                    page.mapzoomOut.click();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click an asset on the sekoia map', function () {
        console.log('Step 34');
        //var EC = protractor.ExpectedConditions;
        //browser.sleep(10000);
        //browser.element(by.css('#9624_features_layer')).$$('path');
        //browser.actions().mouseMove(element.all(by.css('#9624_features_layer')).$$('path')).click().perform()
        //browser.actions().mouseMove(element(by.css('#9624_features_layer')).element(by.tagName('path'))).click().perform();
        //browser.actions().mouseMove(element(by.xpath('//*[@id="9601_features_layer"]/path[4]'))).click().perform();
        //browser.actions().mouseMove(element(by.css('#\\39 601_features_layer > path:nth-child(5)'))).click().perform();
        //browser.wait(EC.stalenessOf(element(by.className('mapLoadingSpinner'))), 8000); 
    });
    it('should click on status dropdown Program Status on sekoia map', function () {
        console.log('Step 35');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(6000);
        page.mapdrpdown.click();
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        page.mapdrpdown.click();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 8000);
    });
    it('should click on zoom in and zoom out on sekoia map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 36');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000)];
                case 1:
                    _a.sent();
                    page.mapzoomIn.click();
                    protractor_1.browser.sleep(5000);
                    page.mapzoomOut.click();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on status dropdown SAIDI on sekoia map', function () {
        console.log('Step 37');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(6000);
        page.mapdrpdown.click();
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        page.mapdrpdown.click();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 10000);
    });
    it('should click on zoom in and zoom out on sekoia map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 38');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000)];
                case 1:
                    _a.sent();
                    page.mapzoomIn.click();
                    protractor_1.browser.sleep(5000);
                    page.mapzoomOut.click();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on status dropdown SAIFI on sekoia map', function () {
        console.log('Step 39');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(6000);
        page.mapdrpdown.click();
        protractor_1.browser.sleep(6000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        page.mapdrpdown.click();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 9000);
    });
    it('should click on zoom in and zoom out on sekoia map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 40');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000)];
                case 1:
                    _a.sent();
                    page.mapzoomIn.click();
                    protractor_1.browser.sleep(5000);
                    page.mapzoomOut.click();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec02_PNmaps.js.map