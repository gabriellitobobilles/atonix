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
var uniqueNme = (Date.now()).toString().slice(8);
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
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 180000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
    });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 85000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavi4RA).click().perform()];
                case 1:
                    _a.sent();
                    expect(page.assetnavi4RA.isPresent()).toBe(true, 'RA Testing asset is seen');
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
describe('risk assessment adhoc tree is checking is seen', function () {
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
    it('should check create private adhoc tree functionalities and save', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.wait(EC.elementToBeClickable(page.adHocInputTreeName), 128000);
                    return [4 /*yield*/, page.adHocInputTreeName.sendKeys('Prv', +uniqueNme)];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.saveBtnAdHocDlg), 128000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.saveBtnAdHocDlg).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.treePopSaved.isPresent()).toBe(true, 'Tree Saved toast message appears');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check create public adhoc tree functionalities and save', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.wait(EC.elementToBeClickable(page.assetExpCreateTree), 128000);
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetExpCreateTree).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.elementToBeClickable(page.adHocInputTreeName), 128000);
                    return [4 /*yield*/, page.adHocInputTreeName.sendKeys('Pub', +uniqueNme)];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.adHocPubChkbox).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.saveBtnAdHocDlg), 128000)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.saveBtnAdHocDlg).click().perform()];
                case 5:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.treePopSaved.isPresent()).toBe(true, 'Tree Saved toast message appears');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk assessment then go to view explorer app', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should see view explorer page', function () {
        console.log('Step 7');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.viewExpapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.viewExpTitle), 100000);
        expect(page.viewExpTitle.isPresent()).toBe(true, 'View explorer app not seen');
    });
    it('should click on RA Testing and select the created public and private adhoc tree', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 85000);
                    protractor_1.browser.wait(EC.elementToBeClickable(page.assetnavi4RA), 128000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavi4RA).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.elementToBeClickable(page.assetNaviDrpDwn), 128000);
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetNaviDrpDwn).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    page.assetNaviDrpDwn.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.veAssetDdmenu), 128000)];
                case 3:
                    _a.sent();
                    page.selectVEnavDropdown('Prv' + uniqueNme);
                    protractor_1.browser.sleep(3500);
                    page.assetNaviDrpDwn.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.veAssetDdmenu), 128000)];
                case 4:
                    _a.sent();
                    page.selectVEnavDropdown('Pub' + uniqueNme);
                    expect(page.veDropDownSel.isPresent()).toBe(true, 'create adhoc was not seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec07_RAadHocTree.e2e-spec.js.map