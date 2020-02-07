"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var riskAssessment_po_1 = require("../../page/riskAssessment_po");
var user_1 = require("../../helpers/user");
var helper_1 = require("../../helpers/helper");
var user = new user_1.User();
var helper = new helper_1.Helper();
var userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
};
describe('asset360 risk assessment page app', function () {
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should see risk assessment page', function () {
        user.logIn(userObj);
        console.log('Step 1');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.riskAsmntapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 10000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Matrix assessment app');
    });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
                    helper.waitForDisappear(protractor_1.$("#overlay-background"));
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 1:
                    _b.apply(_a, [(_l.sent()).indexOf('RA Testing')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 2:
                    _d.apply(_c, [(_l.sent()).indexOf('Distributed Asset Example Data')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _f.apply(_e, [(_l.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
                    _h = (_g = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 4:
                    _h.apply(_g, [(_l.sent()).indexOf('District 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dsub1).click().perform()];
                case 5:
                    _l.sent();
                    _k = (_j = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 6:
                    _k.apply(_j, [(_l.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000)];
                case 7:
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.assetnavixp4dsub1.isPresent()).toBe(true, 'Substation 1 asset is seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix map tab', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should go to RA map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.maptab).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on map type dropdown Risk map (Zoom level) on RA map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > path');
                    page.mapdrpdown.click();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectMapDropdown('Risk Map (Zoom Levels)');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on map type dropdown Risk Score on RA map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > path');
                    page.mapdrpdown.click();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectMapDropdown('Risk Score');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elem.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('risk assessment app using timeslider on map tab', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click time slider then slide it to the left', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, dateTxtInfo1, dateTxtInfo2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.$("#navIndicatorHandle");
                    console.log('Step 6');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.id('navIndicatorDate')).getText()];
                case 1:
                    dateTxtInfo1 = _a.sent();
                    console.log('origin: ', dateTxtInfo1);
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: -100, y: 0 }).mouseUp().perform();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.id('navIndicatorDate')).getText()];
                case 2:
                    dateTxtInfo2 = _a.sent();
                    console.log('slide left: ', dateTxtInfo2);
                    expect(dateTxtInfo1).not.toEqual(dateTxtInfo2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click time slider then slide it to the right', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, datetext1, datetext2;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    console.log('Step 7');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.id('navIndicatorDate')).getText()];
                case 1:
                    datetext1 = _a.sent();
                    console.log('origin: ', datetext1);
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.id('navIndicatorDate')).getText()];
                case 2:
                    datetext2 = _a.sent();
                    console.log('slide right: ', datetext2);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 3:
                    _a.sent();
                    expect(datetext1).not.toEqual(datetext2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on zoom in and zoom out on risk assessment map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
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
    it('should see the map legend by hovering in a key symbol on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elemC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elemC = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    protractor_1.browser.sleep(3600);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapToggleKey), 250000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapToggleKey).click().perform();
                    protractor_1.browser.sleep(3600);
                    protractor_1.browser.actions().mouseMove(page.mapKeyPadTrans).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.$('#geoSpa_layers > svg > g > circle')), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapKeyUGPowCab).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapKeyDistrFeed).click().perform();
                    protractor_1.browser.sleep(3600);
                    protractor_1.browser.actions().mouseMove(page.mapKeyPadTrans).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.$('#geoSpa_layers > svg > g > circle')), 128000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapKeyUGPowCab).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 5:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.mapKeyDistrFeed).click().perform();
                    protractor_1.browser.sleep(3600);
                    expect(elemC.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix map filtering and select asset', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should ra map tab then click on the search filter button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elemC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elemC = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, page.searchTboxMapFltr.sendKeys('asset=xfmr*')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchFltrBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elemC.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click on the search filter clear button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elemP;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elemP = protractor_1.$('#geoSpa_layers > svg > g > path');
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchClrFltr).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(protractor_1.$('#geoSpa_layers > svg > g > path')), 128000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(elemP.isPresent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click on a asset on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Step 12');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    protractor_1.browser.sleep(20000);
                    protractor_1.browser.actions().click(elem.getWebElement()).perform();
                    protractor_1.browser.waitForAngular();
                    _a = expect;
                    return [4 /*yield*/, page.infotabPanel.isPresent()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(true, 'asset info tray on map is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click multiselect on a asset on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elemC, elemP, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Step 13');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(page.closeAsetInfo).click().perform();
                    elemC = protractor_1.$$('#geoSpa_layers > svg > g > circle');
                    elemP = protractor_1.$$('#geoSpa_layers > svg > g > path');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elemC.get(5)), 28000)];
                case 1:
                    _c.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('a.btn.multiSelectButton'))).click().perform()];
                case 2:
                    _c.sent();
                    protractor_1.browser.actions().click(elemC.get(6)).perform();
                    protractor_1.browser.actions().click(elemC.get(7)).perform();
                    protractor_1.browser.actions().click(elemC.get(8)).perform();
                    protractor_1.browser.actions().click(elemP.get(3)).perform();
                    protractor_1.browser.actions().click(elemP.get(6)).perform();
                    protractor_1.browser.actions().click(elemP.get(7)).perform();
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
});
//# sourceMappingURL=spec02_RAmaps.e2e-spec.js.map