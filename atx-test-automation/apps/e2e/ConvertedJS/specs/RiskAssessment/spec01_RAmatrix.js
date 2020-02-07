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
        console.log('Step 3');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.riskAsmntapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 10000);
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
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
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
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk matrix tab', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should count risk matrix blocks', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, riskcount;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').count()];
                case 1:
                    riskcount = _a.sent();
                    //console.log(riskcount);
                    if (riskcount == 100) {
                        console.log(riskcount, " blocks 10x10");
                    }
                    else if (riskcount == 50) {
                        console.log(riskcount, " blocks 5x5");
                    }
                    else {
                        console.log('wrong/incomplete number of blocks');
                    }
                    protractor_1.browser.sleep(6500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should count the green, yellow and red risk matrix blocks', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, igreen, iyellow, ired, riskcount, colorfill, colorfill;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    igreen = 0;
                    iyellow = 0;
                    ired = 0;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').count()];
                case 1:
                    riskcount = _a.sent();
                    if (!(riskcount == 100)) return [3 /*break*/, 6];
                    i = 99;
                    _a.label = 2;
                case 2:
                    if (!(i >= 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').get(i).getAttribute('fill')];
                case 3:
                    colorfill = _a.sent();
                    if (colorfill === "rgba(101,188,110,0.80)") {
                        console.log('green detected');
                        igreen++;
                    }
                    else if (colorfill === "rgba(244,201,5,0.90)") {
                        console.log('yellow detected');
                        iyellow++;
                    }
                    else if (colorfill === "rgba(186,80,72,0.90)") {
                        console.log('red detected');
                        ired++;
                    }
                    else {
                        console.log('no color / invalid color detected');
                    }
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    if (!(riskcount == 50)) return [3 /*break*/, 11];
                    console.log(riskcount, " blocks 5x5");
                    i = 49;
                    _a.label = 7;
                case 7:
                    if (!(i >= 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').get(i).getAttribute('fill')];
                case 8:
                    colorfill = _a.sent();
                    if (colorfill === "rgba(101,188,110,0.80)") {
                        console.log('green detected');
                        igreen++;
                    }
                    else if (colorfill === "rgba(244,201,5,0.90)") {
                        console.log('yellow detected');
                        iyellow++;
                    }
                    else if (colorfill === "rgba(186,80,72,0.90)") {
                        console.log('red detected');
                        ired++;
                    }
                    else {
                        console.log('no color / invalid color detected');
                    }
                    _a.label = 9;
                case 9:
                    i--;
                    return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 12];
                case 11:
                    console.log('wrong/incomplete number of blocks');
                    _a.label = 12;
                case 12:
                    console.log('green blocks: ', igreen);
                    console.log('yellow blocks: ', iyellow);
                    console.log('red blocks: ', ired);
                    protractor_1.browser.sleep(6500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should determine that red, yellow, and green color blocks are in the correct place', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, iMisplaced, riskcount, colorfill;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    iMisplaced = 0;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').count()];
                case 1:
                    riskcount = _a.sent();
                    if (!(riskcount == 100)) return [3 /*break*/, 6];
                    console.log("10x10 blocks: ", riskcount);
                    i = 99;
                    _a.label = 2;
                case 2:
                    if (!(i >= 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.$('[id="grid-chart"]').element(protractor_1.by.tagName('svg')).element(protractor_1.by.tagName('g')).$$('rect').get(i).getAttribute('fill')];
                case 3:
                    colorfill = _a.sent();
                    if (colorfill === "rgba(186,80,72,0.90)" && [69, 77, 78, 79, 87, 88, 89, 96, 97, 98, 99].indexOf(i) != -1) {
                        console.log('red detected are in correct place');
                        console.log("red[]: ", i);
                    }
                    else if (colorfill === "rgba(244,201,5,0.90)" && [28, 29, 36, 37, 38, 39, 45, 46, 47, 48, 49, 54, 55, 56, 57, 58, 59, 63, 64, 65, 66, 67, 68, 73, 74, 75, 76, 82, 83, 84, 85, 86, 92, 93, 94, 95].indexOf(i) != -1) {
                        console.log('yellow detected are in correct place');
                        console.log("yellow[]: ", i);
                    }
                    else if (colorfill === "rgba(101,188,110,0.80)" && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 40, 41, 42, 43, 44, 50, 51, 52, 53, 60, 61, 62, 70, 71, 72, 80, 81, 90, 91].indexOf(i) != -1) {
                        console.log('green detected are in correct place');
                        console.log("green[]: ", i);
                    }
                    else {
                        console.log('no color / invalid color detected');
                        console.log(colorfill, " ", i);
                        iMisplaced++;
                    }
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    if (riskcount == 50) {
                        console.log("5x5 blocks: ", riskcount);
                    }
                    else {
                        console.log('wrong/incomplete number of blocks');
                    }
                    _a.label = 7;
                case 7:
                    protractor_1.browser.sleep(6500);
                    console.log('incorrect placed blocks: ', iMisplaced);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should drag and select a risk matrix blocks, zoom-in ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(91)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(65)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click the zoom-out button and view returned to default risk matrix blocks', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomOut).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.RMzoomInApld), 9000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should drag and select a risk matrix blocks, zoom-in again', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.actions().
                        mouseDown(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(63)'))).
                        mouseMove(protractor_1.element(protractor_1.by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(37)'))).
                        mouseUp().
                        perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxZoomIn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(page.RMzoomInApld), 10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click the clear button and view returned to default risk matrix blocks', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mtrxClearZoom).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.RMzoomInApld), 9000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click the RA gear button and see the Risk Matrix User Setting dialog menu', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 12');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RAuserGearBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(page.RAuserSettingDlg), 10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click the + button on the Risk Matrix User Setting dialog menu, and see New Config*', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 13');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RAGearNewConfig).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(page.RANewConfigName), 10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click the close dialog button on the Risk Matrix User Setting dialog menu', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 14');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RAGearCloseBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.RAuserSettingDlg), 9000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click single view radio button on the Risk Matrix tab and should see a toast error', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 15');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RASingleViewBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(page.RAsChartTerror), 10000);
                    protractor_1.browser.sleep(4000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click single view radio button on the Risk Matrix tab and should see a white bubble', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 16');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(page.RAsvWhitebuble), 10000);
                    protractor_1.browser.sleep(4000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click multiple view radio button on the Risk Matrix tab and should see a toast error', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 17');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.RAMultiViewBtn).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.RAsvWhitebuble), 10000);
                    protractor_1.browser.sleep(4000);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('RA Testing > Distributed Asset Example Data (small) v1> Division 1 > District 1 > Substation 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on RA Testing and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log('Step 18');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
                    _b = (_a = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 1:
                    _b.apply(_a, [(_j.sent()).indexOf('Distributed Asset Example Data (small) v1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 2:
                    _d.apply(_c, [(_j.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _f.apply(_e, [(_j.sent()).indexOf('District 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dsub1).click().perform()];
                case 4:
                    _j.sent();
                    _h = (_g = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 5:
                    _h.apply(_g, [(_j.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000)];
                case 6:
                    _j.sent();
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec01_RAmatrix.js.map