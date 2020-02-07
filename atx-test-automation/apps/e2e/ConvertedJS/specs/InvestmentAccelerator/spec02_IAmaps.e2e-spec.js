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
    it('should see risk assessment page', function () {
        user.logIn(userObj);
        console.log('Step 1');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.investAcrapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.invstAccViews), 10000);
        expect(page.invstAccViews.isPresent()).toBe(true, 'Investment Accelerator app seen');
    });
});
describe('Sekoia Demo Clients > UGM Historical Reliability Plan', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on Sekoia Demo Client and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('progress-bar'))), 128000)];
                case 1:
                    _e.sent();
                    _b = (_a = page.IAparentNtree).get;
                    return [4 /*yield*/, page.IAparentNtree.getText()];
                case 2:
                    _b.apply(_a, [(_e.sent()).indexOf('SEKOIA Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviUGM), 69000)];
                case 3:
                    _e.sent();
                    _d = (_c = page.IAchildNtree).get;
                    return [4 /*yield*/, page.IAchildNtree.getText()];
                case 4:
                    _d.apply(_c, [(_e.sent()).indexOf('UGM Historical Reliability Plan')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.actions().mouseMove(page.assetnaviUGM).click().perform();
                    expect(page.assetnaviUGM.isPresent()).toBe(true, 'UGM Historical Reliability Plan is selected');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 investment accelerator map tab', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should go to Investment Accelerator map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.progresBar), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.maptab).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on map type dropdown Program Status on map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > path');
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectMapDropdown('Program Status');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on map type dropdown Project Status on map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectMapDropdown('Project Status');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on zoom in and zoom out on investment accelerator map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
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
    it('should ra map tab then click on a asset on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 28000)];
                case 1:
                    _c.sent();
                    protractor_1.browser.actions().click(elem.getWebElement()).perform();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.infotabPanel), 145000)];
                case 2:
                    _c.sent();
                    _a = expect;
                    return [4 /*yield*/, page.mapAttrTrayOtab.isPresent()];
                case 3:
                    _a.apply(void 0, [_c.sent()]).toBe(true, 'multiple select of asset on map is not working');
                    _b = expect;
                    return [4 /*yield*/, page.infotabPanel.isPresent()];
                case 4:
                    _b.apply(void 0, [_c.sent()]).toBe(true, 'asset info tray on map is not working');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click multiselect on a asset on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.actions().mouseMove(page.closeAsetInfo).click().perform();
                    protractor_1.browser.sleep(5000);
                    elem = protractor_1.$$('#geoSpa_layers > svg > g > circle');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem.get(1)), 28000)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('a.btn.multiSelectButton'))).click().perform()];
                case 2:
                    _c.sent();
                    protractor_1.browser.actions().click(elem.get(3)).perform();
                    protractor_1.browser.actions().click(elem.get(24)).perform();
                    protractor_1.browser.actions().click(elem.get(58)).perform();
                    protractor_1.browser.actions().click(elem.get(71)).perform();
                    _a = expect;
                    return [4 /*yield*/, page.mapAttrTrayXpanded.isPresent()];
                case 3:
                    _a.apply(void 0, [_c.sent()]).toBe(true, 'multiple select of asset on map is not working');
                    _b = expect;
                    return [4 /*yield*/, page.mapAttrTrayHidden.isPresent()];
                case 4:
                    _b.apply(void 0, [_c.sent()]).toBe(true, 'multiple select of asset on map is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should see the map legend by hovering in a key symbol on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    protractor_1.browser.actions().mouseMove(page.closeAsetInfo).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapToggleKey), 250000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapToggleKey).click().perform();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(page.mapTkeyCircuit).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapTkeyPoles).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.$('#geoSpa_layers > svg > g > circle')), 128000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(page.mapTkeyCircuit).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapTkeyPoles).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.$('#geoSpa_layers > svg > g > circle')), 128000)];
                case 5:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    expect((protractor_1.$('#geoSpa_layers > svg > g > circle')).isPresent());
                    expect((protractor_1.$('#geoSpa_layers > svg > g > path')).isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec02_IAmaps.e2e-spec.js.map