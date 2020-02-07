"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var riskAssessment_po_1 = require("../../page/riskAssessment_po");
var user_1 = require("../../helpers/user");
var user = new user_1.User();
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
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 18000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
    });
});
describe('RA Testing > Distributed Asset Example Data > Division 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 1:
                    _b.apply(_a, [(_g.sent()).indexOf('RA Testing')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 2:
                    _d.apply(_c, [(_g.sent()).indexOf('Distributed Asset Example Data')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _f.apply(_e, [(_g.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavi4Div1).click().perform()];
                case 4:
                    _g.sent();
                    expect(page.assetnavi4Div1.isPresent()).toBe(true, 'Division 1 asset is seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk assessment asset navigator edit tree is disabled', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should check if edit tree button is disabled', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.wait(EC.visibilityOf(page.scoreCardNum), 118000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetExpEditTree).perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.scoreCardNum), 118000);
                    protractor_1.browser.wait(EC.not(EC.elementToBeClickable(page.assetExpEditTree)), 105000);
                    protractor_1.browser.waitForAngular();
                    expect(page.assetExpEditTree.isPresent()).toBe(true, 'edit tree was clicked');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('risk assessment create adhoc tree is checking is seen', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should check if create tree button is enabled', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.wait(EC.elementToBeClickable(page.assetExpCreateTree), 128000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetExpCreateTree).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.assetAdHocTreeDlg), 128000)];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.saveBtnAdHocDlg.isPresent()).toBe(true, 'save button on adhoc tree dialog is not seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec08_RAassetNav.e2e-spec.js.map