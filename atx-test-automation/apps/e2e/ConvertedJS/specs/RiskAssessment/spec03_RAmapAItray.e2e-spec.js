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
var tagName = 'assettest1' + Date.now();
describe('asset360 asset explorer page app', function () {
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should see asset explorer page', function () {
        user.logIn(userObj);
        console.log('Step 1');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 20000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.assetExapp.click();
        protractor_1.browser.waitForAngular();
        //browser.wait(EC.presenceOf(element(by.model('vm.selectedAsset.asset.AssetAbbrev'))), 20000);
        protractor_1.browser.wait(EC.presenceOf(page.assetexpAppFlg), 20000);
        expect(page.assetexpAppFlg.isPresent()).toBe(true, 'Asset Explorer app');
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
                    _b = (_a = page.AEparentNtree).get;
                    return [4 /*yield*/, page.AEparentNtree.getText()];
                case 1:
                    _b.apply(_a, [(_o.sent()).indexOf('RA Testing')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
                    _d = (_c = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 2:
                    _d.apply(_c, [(_o.sent()).indexOf('Distributed Asset Example Data')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _f = (_e = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 3:
                    _f.apply(_e, [(_o.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
                    _h = (_g = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 4:
                    _h.apply(_g, [(_o.sent()).indexOf('District 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 25000);
                    _k = (_j = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 5:
                    _k.apply(_j, [(_o.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform()];
                case 6:
                    _o.sent();
                    _m = (_l = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 7:
                    _m.apply(_l, [(_o.sent()).indexOf('Feeder 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000)];
                case 8:
                    _o.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform()];
                case 9:
                    _o.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviclckXFMR36).click().perform()];
                case 10:
                    _o.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviclckXFMR36), 28000)];
                case 11:
                    _o.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.assetnaviclckXFMR36.isPresent()).toBe(true, 'Asset xfmr36 is selected');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 asset explorer info tab, add a tag', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should be able to add a tag on info tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, infotag;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    infotag = protractor_1.element(protractor_1.by.cssContainingText('[ng-repeat="keyword in typeaheadVM.getKeywords()"]', tagName));
                    protractor_1.browser.waitForAngular();
                    page.assetExpAddTagTbox.click();
                    page.assetExpAddTagTbox.clear();
                    page.assetExpAddTagTbox.sendKeys(tagName);
                    protractor_1.browser.actions().mouseMove(page.assetExpAddTagBtn).click().perform();
                    helper.waitForVisible(infotag, 5000);
                    page.assetExpAddTagBtn.click();
                    protractor_1.browser.wait(EC.presenceOf(page.xfmr36Label), 20000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="vm.save(vm.selectedAsset)"]'))), 250000)];
                case 1:
                    _a.sent();
                    page.saveAssetBtn.click();
                    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.chngPopSaved), 250000)];
                case 2:
                    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 asset navigator go to asset test1, and go to attachments tab', function () {
    var _this = this;
    var page;
    var path = require('path');
    page = new riskAssessment_po_1.RskAssessment();
    it('should click attachment tab and click on add photo', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 4');
            EC = protractor_1.protractor.ExpectedConditions;
            protractor_1.browser.waitForAngular();
            protractor_1.browser.actions().mouseMove(page.attachmntTab).click().perform();
            protractor_1.browser.waitForAngular();
            //browser.wait(EC.presenceOf(element(by.id('attachments'))), 10000);
            protractor_1.browser.wait(EC.presenceOf(page.attachPaneTab), 10000);
            protractor_1.browser.waitForAngular();
            expect(page.attachPaneTab.isPresent()).toBe(true, 'Attachment panel on attachment tab seen');
            return [2 /*return*/];
        });
    }); });
    it('on the add photo on the upload dialog and click on the Select File(s)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, PhotoAtchCount, beforeCount, fileToUpload, absolutePath, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.actions().mouseMove(page.attachPhotoBtn).click().perform();
                    protractor_1.browser.sleep(3500);
                    PhotoAtchCount = protractor_1.$$('[ng-repeat="(idx,value) in attachVM.imageAttachments"]');
                    return [4 /*yield*/, PhotoAtchCount.count()];
                case 1:
                    beforeCount = _b.sent();
                    console.log('Photo Attachment before: ');
                    PhotoAtchCount.count().then(console.log);
                    protractor_1.browser.waitForAngular();
                    fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/smiley1.jpg';
                    absolutePath = path.resolve(fileToUpload);
                    protractor_1.$('input[type="file"]').sendKeys(absolutePath);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('form-control ng-pristine ng-untouched ng-valid ng-not-empty'))), 200000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('[ng-click="addAttachmentVM.ok()"]'))).click().perform()];
                case 2:
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('modal-content'))), 200000)];
                case 3:
                    _b.sent();
                    console.log('Photo Attachment after: ');
                    PhotoAtchCount.count().then(console.log);
                    _a = expect;
                    return [4 /*yield*/, PhotoAtchCount.count()];
                case 4:
                    _a.apply(void 0, [_b.sent()]).toEqual(beforeCount + 1);
                    protractor_1.browser.sleep(1000);
                    protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('[ng-click="vm.save(vm.selectedAsset)"]'))).click().perform();
                    protractor_1.browser.sleep(5000);
                    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.chngPopSaved), 250000)];
                case 5:
                    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click attachment tab and click on add attachment', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, fileToUpload, absolutePath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(page.attachFileBtn).click().perform();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.waitForAngular();
                    fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/directory.txt';
                    absolutePath = path.resolve(fileToUpload);
                    protractor_1.$('input[type="file"]').sendKeys(absolutePath);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('form-control ng-pristine ng-untouched ng-valid ng-not-empty'))), 200000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('[ng-click="addAttachmentVM.ok()"]'))).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('modal-content'))), 200000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="vm.saveAllChanges()"]'))), 250000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(4000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('[ng-click="vm.saveAllChanges()"]'))).click().perform()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.chngPopSaved), 250000)];
                case 5:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 asset explorer blog tab, add a new entry', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    var randVal = Date.now();
    it('should be able to add a entry on blog tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetExpBlogTab).click().perform()];
                case 1:
                    _a.sent();
                    page.assetExpandBlog.click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().mouseMove(page.assetExpBlogTitle).click().perform();
                    page.assetExpBlogTitle.clear();
                    page.assetExpBlogTitle.sendKeys('title test ', +randVal);
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.id("mce_0_ifr")).getWebElement());
                    return [4 /*yield*/, protractor_1.browser.actions().click(page.assetExpBlogBody.getWebElement()).perform()];
                case 2:
                    _a.sent();
                    page.assetExpBlogBody.click();
                    page.assetExpBlogBody.sendKeys('body test ' + randVal);
                    protractor_1.browser.switchTo().defaultContent();
                    protractor_1.browser.wait(EC.presenceOf(page.xfmr36Label), 20000);
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.id('Submit'))).click().perform();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.assetBlogDropFileH), 200000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.assetBlogDropFileH.isPresent()).toBe(false, 'asset blog drag and drop file seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk assessment page app', function () {
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should see risk assessment page', function () {
        console.log('Step 8');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.riskAsmntapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 10000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app');
    });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return tslib_1.__generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    console.log('Step 9');
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
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000)];
                case 5:
                    _o.sent();
                    _k = (_j = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 6:
                    _k.apply(_j, [(_o.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform()];
                case 7:
                    _o.sent();
                    _m = (_l = page.AEchildNtree).get;
                    return [4 /*yield*/, page.AEchildNtree.getText()];
                case 8:
                    _m.apply(_l, [(_o.sent()).indexOf('Feeder 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000)];
                case 9:
                    _o.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform()];
                case 10:
                    _o.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviclckXFMR36r).click().perform()];
                case 11:
                    _o.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviclckXFMR36r), 28000)];
                case 12:
                    _o.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.waitForAngular();
                    expect(page.assetnaviclckXFMR36r.isPresent()).toBe(true, 'Asset xfmr36 is selected');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix map tab and select asset on map to see info tray', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should go to RA map tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    // const eleMap = $('#grid-chart > svg > g > rect');
                    // await browser.wait(EC.presenceOf(eleMap), 28000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.maptab).click().perform()];
                case 1:
                    // const eleMap = $('#grid-chart > svg > g > rect');
                    // await browser.wait(EC.presenceOf(eleMap), 28000);
                    _a.sent();
                    protractor_1.browser.sleep(6000);
                    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.mapLoadSpinr), 158000)];
                case 2:
                    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.circleAssetMap.isPresent()).toBe(true, 'circle asset is seen on map');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should ra map tab then click on a asset on the map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    elem = protractor_1.$('#geoSpa_layers > svg > g > circle');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(elem), 28000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.actions().click(elem.getWebElement()).perform();
                    protractor_1.browser.sleep(5000);
                    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.mapLoadSpinr), 128000)];
                case 2:
                    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.infotabPanel), 128000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.infotabPanel.isPresent()).toBe(true, 'asset info panel is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click asset on the map and click on attachment tab on info tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 12');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(page.mapAssetInfoAttach).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.directorytxtInfo), 250000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.directorytxtInfo.isPresent()).toBe(true, 'directorytxt.txt is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click asset on the map and click on blog tab on info tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 13');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(page.mapAssetInfoBlog).click().perform();
                    //await browser.wait(EC.presenceOf(element(by.className('fa fa-comment blog'))), 250000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.blogAssetInfIcon), 250000)];
                case 1:
                    //await browser.wait(EC.presenceOf(element(by.className('fa fa-comment blog'))), 250000);
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.blogAssetInfIcon.isPresent()).toBe(true, 'blog asset info is seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click asset on the map and click on tag tab on info tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 14');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.actions().mouseMove(page.mapAssetInfoTags).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-repeat="keyword in typeaheadVM.getKeywords()"]', tagName))), 250000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.addtagAssetInfo.isPresent()).toBe(true, 'add tag asset info is seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec03_RAmapAItray.e2e-spec.js.map