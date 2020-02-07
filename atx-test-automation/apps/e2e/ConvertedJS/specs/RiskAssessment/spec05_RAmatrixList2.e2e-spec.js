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
var uniqueVal = Date.now();
var uniqueSmal7 = (Date.now()).toString().slice(5);
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
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 18000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
    });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1 > Feeder 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return tslib_1.__generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 1:
                    _b.apply(_a, [(_o.sent()).indexOf('RA Testing')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 2:
                    _d.apply(_c, [(_o.sent()).indexOf('Distributed Asset Example Data')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _f.apply(_e, [(_o.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
                    _h = (_g = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 4:
                    _h.apply(_g, [(_o.sent()).indexOf('District 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 25000);
                    _k = (_j = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 5:
                    _k.apply(_j, [(_o.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform()];
                case 6:
                    _o.sent();
                    _m = (_l = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 7:
                    _m.apply(_l, [(_o.sent()).indexOf('Feeder 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000)];
                case 8:
                    _o.sent();
                    expect(page.assetnavixp4dfed1.isPresent()).toBe(true, 'Asset Feeder 1 is selected');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix tab and list tab, then choose Save and Continue, create list', function () {
    var _this = this;
    var page;
    var uniqueVal = Date.now();
    page = new riskAssessment_po_1.RskAssessment();
    it('should drag and select a risk matrix blocks, zoom-in ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, x1, _a, _b, _c, x2, _d, _e, _f;
        var _this = this;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.matrixHideSpnnr.isPresent()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, page.getRiskValue('High Risk')];
                case 2:
                    x1 = _g.sent();
                    _b = (_a = console).log;
                    _c = ['Before High: '];
                    return [4 /*yield*/, page.getRiskValue('High Risk')];
                case 3:
                    _b.apply(_a, _c.concat([_g.sent()]));
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(91)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(65)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 4:
                    _g.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
                    return [4 /*yield*/, page.getRiskValue('High Risk')];
                case 5:
                    x2 = _g.sent();
                    _e = (_d = console).log;
                    _f = ['After High: '];
                    return [4 /*yield*/, page.getRiskValue('High Risk')];
                case 6:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    expect(x1).not.toEqual(x2, 'risk values should not be the same');
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click on the search filter button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, y1, _d, _e, _f, y2;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    _b = (_a = console).log;
                    _c = ['Before Medium: '];
                    return [4 /*yield*/, page.getRiskValue('Medium Risk')];
                case 1:
                    _b.apply(_a, _c.concat([_g.sent()]));
                    return [4 /*yield*/, page.getRiskValue('Medium Risk')];
                case 2:
                    y1 = _g.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 3:
                    _g.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, page.searchTboxMapFltr.sendKeys('asset=xfmr*')];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchFltrBtn).click().perform()];
                case 5:
                    _g.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 6:
                    _g.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 128000)];
                case 7:
                    _g.sent();
                    _e = (_d = console).log;
                    _f = ['After Medium: '];
                    return [4 /*yield*/, page.getRiskValue('Medium Risk')];
                case 8:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    return [4 /*yield*/, page.getRiskValue('Medium Risk')];
                case 9:
                    y2 = _g.sent();
                    expect(y1).not.toEqual(y2, 'risk values should not be the same');
                    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on list tab and click on save and continue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.listTab).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.saveContiBtn), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3300);
                    page.saveContiBtn.click();
                    page.saveQsrchTitleTbox.clear();
                    return [4 /*yield*/, page.saveQsrchTitleTbox.sendKeys(uniqueSmal7)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.saveQsOKBtn), 128000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(3300);
                    page.saveQsOKBtn.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.loadListSpin), 128000)];
                case 5:
                    _a.sent();
                    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check list tab details is correct', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _e.sent();
                    protractor_1.browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
                    _b = (_a = console).log;
                    _c = ['text: '];
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 2:
                    _b.apply(_a, _c.concat([_e.sent()]));
                    _d = expect;
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 3:
                    _d.apply(void 0, [_e.sent()]).toEqual('asset=xfmr*');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 4:
                    _e.sent();
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should go to risk matrix tab then, clear list, clear zoom-in filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RMtab).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.visibilityOf(page.raMatrixFilter), 28000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.raMatrixFilter), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raMatrixFilter).perform()];
                case 3:
                    _a.sent();
                    page.raMatrixFilter.click();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchClrFltr).click().perform()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raMatrixFilter).perform()];
                case 5:
                    _a.sent();
                    page.raMatrixFilter.click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearApplyFilter).click().perform()];
                case 6:
                    _a.sent();
                    expect(page.RMzoomInApld.isPresent()).toBe(false, 'Zoom-in text applied is not seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix tab and list tab, then choose Save and Continue', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should drag and select a risk matrix blocks, zoom-in ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, activeSearch;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    activeSearch = protractor_1.element(protractor_1.by.cssContainingText('[ng-repeat="item in tagSearchPopupVM.quickSearches"]', uniqueSmal7));
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raMtrxSrchDd).click().perform()];
                case 1:
                    _a.sent();
                    helper.waitForVisible(activeSearch, 8000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(activeSearch).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.matrixHideSpnnr.isPresent()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 3:
                    _a.sent();
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(91)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(65)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click on the search filter button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    page.searchTboxMapFltr.clear();
                    return [4 /*yield*/, page.searchTboxMapFltr.sendKeys('asset=ug_cable*')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchFltrBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 128000)];
                case 5:
                    _a.sent();
                    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on list tab and click on save and continue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3700);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.listTab).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.saveContiBtn), 28000)];
                case 2:
                    _a.sent();
                    page.saveContiBtn.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.listUpdSaved), 128000)];
                case 3:
                    _a.sent();
                    expect(page.listUpdSaved.isPresent()).toBe(false, 'saved toast message no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check list tab details is correct', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _e.sent();
                    protractor_1.browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
                    _b = (_a = console).log;
                    _c = ['text: '];
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 2:
                    _b.apply(_a, _c.concat([_e.sent()]));
                    _d = expect;
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 3:
                    _d.apply(void 0, [_e.sent()]).toEqual('asset=ug_cable*');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 4:
                    _e.sent();
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should clear list, clear zoom-in filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 12');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearListTbox).click().perform()];
                case 2:
                    _a.sent();
                    page.raSerchFltrBtn.click();
                    protractor_1.browser.wait(EC.visibilityOf(page.noListViewSpin), 28000);
                    page.toggleListSrch.click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearApplyFilter).click().perform()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix tab and list tab, then choose Retain Search but Dont Save Yet', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should drag and select a risk matrix blocks, zoom-in ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, activeSearch;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 13');
                    EC = protractor_1.protractor.ExpectedConditions;
                    activeSearch = protractor_1.element(protractor_1.by.cssContainingText('[ng-repeat="item in tagSearchPopupVM.quickSearches"]', uniqueSmal7));
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RMtab).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.ClearSrchContinue).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.matrixHideSpnnr.isPresent()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 4:
                    _a.sent();
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(86)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(59)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 5:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra matrix tab then click on the search filter button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 14');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, page.searchTboxMapFltr.sendKeys('asset=xfmr*')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchFltrBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 128000)];
                case 5:
                    _a.sent();
                    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on list tab and click on Retain Search but Dont Save Yet', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 15');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3700);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.listTab).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.noSaveRcontinue), 28000)];
                case 2:
                    _a.sent();
                    page.noSaveRcontinue.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.loadListSpin), 128000)];
                case 3:
                    _a.sent();
                    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check list tab details is correct', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 16');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _e.sent();
                    protractor_1.browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
                    _b = (_a = console).log;
                    _c = ['text: '];
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 2:
                    _b.apply(_a, _c.concat([_e.sent()]));
                    _d = expect;
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 3:
                    _d.apply(void 0, [_e.sent()]).toEqual('asset=xfmr*');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 4:
                    _e.sent();
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should clear list, and clear zoom-in filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 17');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearListTbox).click().perform()];
                case 2:
                    _a.sent();
                    page.raSerchFltrBtn.click();
                    protractor_1.browser.wait(EC.visibilityOf(page.noListViewSpin), 28000);
                    page.toggleListSrch.click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearApplyFilter).click().perform()];
                case 4:
                    _a.sent();
                    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix tab and list tab, then choose Retain Search but Dont Save Yet', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should drag and select a risk matrix blocks, zoom-in ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, activeSearch;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 18');
                    EC = protractor_1.protractor.ExpectedConditions;
                    activeSearch = protractor_1.element(protractor_1.by.cssContainingText('[ng-repeat="item in tagSearchPopupVM.quickSearches"]', uniqueSmal7));
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RMtab).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.ClearSrchContinue).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.matrixHideSpnnr.isPresent()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 4:
                    _a.sent();
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(43)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(17)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 5:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra matrix tab then click on the search filter button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 19');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, page.searchTboxMapFltr.sendKeys('asset=xfmr*')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.raSerchFltrBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapFilterBtn).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('mapLoadingSpinner'))), 128000)];
                case 5:
                    _a.sent();
                    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on list tab and click on Clear Search and Continue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 20');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3700);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.listTab).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.ClearSrchContinue), 28000)];
                case 2:
                    _a.sent();
                    page.ClearSrchContinue.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.loadListSpin), 128000)];
                case 3:
                    _a.sent();
                    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check list tab details is correct', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 21');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _e.sent();
                    protractor_1.browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
                    _b = (_a = console).log;
                    _c = ['text: '];
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 2:
                    _b.apply(_a, _c.concat([_e.sent()]));
                    _d = expect;
                    return [4 /*yield*/, page.srchListTbox.getAttribute('value')];
                case 3:
                    _d.apply(void 0, [_e.sent()]).not.toEqual('asset=xfmr*');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 4:
                    _e.sent();
                    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should clear list, clear zoom-in filter, and delete quicksearch list', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 22');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearListTbox).click().perform()];
                case 2:
                    _a.sent();
                    page.raSerchFltrBtn.click();
                    protractor_1.browser.wait(EC.visibilityOf(page.noListViewSpin), 28000);
                    page.toggleListSrch.click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleListSrch).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.clearApplyFilter).click().perform()];
                case 4:
                    _a.sent();
                    page.moreListOption.click();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.moreLOptionDel).click().perform()];
                case 5:
                    _a.sent();
                    protractor_1.browser.switchTo().alert().accept();
                    expect(page.QSdeleteToast.isPresent()).toBe(false, 'QuickSearch deleted toast is no longer seen');
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec05_RAmatrixList2.e2e-spec.js.map