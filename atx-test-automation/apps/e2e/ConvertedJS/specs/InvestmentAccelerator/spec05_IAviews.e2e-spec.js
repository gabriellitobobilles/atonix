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
describe('asset360 view explorer page app', function () {
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should see view explorer page', function () {
        user.logIn(userObj);
        console.log('Step 1');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.viewExpapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.viewExpTitle), 10000);
        expect(page.viewExpTitle.isPresent()).toBe(true, 'View explorer app not seen');
    });
});
describe('Demo Clients > Coal Plants > Eastern Station > Eastern PC1', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on Coal Plants, expand its assets and see Unit performance', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('progress-bar'))), 128000)];
                case 1:
                    _g.sent();
                    _b = (_a = page.VEparentNtree).get;
                    return [4 /*yield*/, page.VEparentNtree.getText()];
                case 2:
                    _b.apply(_a, [(_g.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviCP), 128000)];
                case 3:
                    _g.sent();
                    _d = (_c = page.VEchildNtree).get;
                    return [4 /*yield*/, page.VEchildNtree.getText()];
                case 4:
                    _d.apply(_c, [(_g.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviES), 128000)];
                case 5:
                    _g.sent();
                    _f = (_e = page.VEchildNtree).get;
                    return [4 /*yield*/, page.VEchildNtree.getText()];
                case 6:
                    _f.apply(_e, [(_g.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.actions().mouseMove(page.assetnaviEPc1).click().perform();
                    expect(page.assetnaviEPc1.isPresent()).toBe(true, 'Eastern PC1 was not selected');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.vePc1UnitPerf), 128000)];
                case 7:
                    _g.sent();
                    expect(page.vePc1UnitPerf.isPresent()).toBe(true, 'Eastern PC1 Unit Performance was not seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 investment accelerator page app', function () {
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should see investment accelerator page', function () {
        console.log('Step 3');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 128000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(3500);
        page.investAcrapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(page.invstAccViews), 120000);
        expect(page.invstAccViews.isPresent()).toBe(true, 'Investment Accelerator app was not seen');
        protractor_1.browser.waitForAngular();
    });
});
describe('Demo Clients > Coal Plants > Eastern Station > Eastern PC1', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on Coal Plants and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.assetnaviSDC), 128000)];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('progress-bar'))), 128000)];
                case 2:
                    _g.sent();
                    _b = (_a = page.IAparentNtree).get;
                    return [4 /*yield*/, page.IAparentNtree.getText()];
                case 3:
                    _b.apply(_a, [(_g.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviCP), 128000)];
                case 4:
                    _g.sent();
                    _d = (_c = page.IAchildNtree).get;
                    return [4 /*yield*/, page.IAchildNtree.getText()];
                case 5:
                    _d.apply(_c, [(_g.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviES), 128000)];
                case 6:
                    _g.sent();
                    _f = (_e = page.IAchildNtree).get;
                    return [4 /*yield*/, page.IAchildNtree.getText()];
                case 7:
                    _f.apply(_e, [(_g.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.actions().mouseMove(page.assetnaviEPc1).click().perform();
                    expect(page.assetnaviEPc1.isPresent()).toBe(true, 'Eastern PC1 was not selected');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 investment accelerator Views tab and check its functionalities', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    var downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
    };
    it('should go to Views tab and see Unit performance', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.iaViewActvSpiner), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.invstAccViews).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.iaViewHideSpiner), 128000)];
                case 3:
                    _a.sent();
                    expect(page.iaViewHideSpiner.isPresent()).toBe(true, 'Views tab is not loaded');
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.iaPc1UnitPerf), 128000)];
                case 4:
                    _a.sent();
                    expect(page.iaPc1UnitPerf.isPresent()).toBe(true, 'Eastern PC1 Unit Performance was not seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should go to Trends dropdown menu and select on Unit Reliability', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3700);
                    protractor_1.browser.wait(EC.invisibilityOf(page.iaViewActvSpiner), 250000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.viewsDropdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectViewsDropdown('Unit Reliability');
                    protractor_1.browser.wait(EC.visibilityOf(page.viewsDrpdwnUR), 250000);
                    protractor_1.browser.wait(EC.visibilityOf(page.viewChartLoadng), 250000);
                    protractor_1.browser.waitForAngular();
                    expect(page.viewsDrpdwnUR.isPresent()).toBe(true, 'Unit Reliability on trent chart was not selected');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on chart menu and download images', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, itm;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    itm = 1;
                    protractor_1.browser.sleep(3700);
                    protractor_1.browser.wait(EC.invisibilityOf(page.viewChartLoadng), 250000);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePNG);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FileJPEG);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePDF);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FileSVG);
                    console.log('Previous downloaded files deleted');
                    i = 3;
                    _a.label = 1;
                case 1:
                    if (!(i >= 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.chartConMenu).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.chartConItm.get(itm)), 128000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.chartConItm.get(itm)).click().perform()];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(6000);
                    if (itm == 3) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FilePDF);
                        console.log('PDF downloading');
                    }
                    else if (itm == 2) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
                        console.log('JPG downloading');
                    }
                    else if (itm == 1) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
                        console.log('PNG downloading');
                    }
                    else {
                        page.verifyFileInDownloadsFolder(downloadFileName.FileSVG);
                        console.log('SVG downloading');
                    }
                    itm++;
                    _a.label = 5;
                case 5:
                    i--;
                    return [3 /*break*/, 1];
                case 6:
                    expect(i.valueOf()).toEqual(-1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Verify the toggle legend on chart and open chart to new tab', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on the toggle legend on summary trend to hide', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.eastrnPc1LgndS0), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS0).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS0hide), 250000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS1).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS1hide), 250000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS2).click().perform()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS2hide), 250000)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS10).click().perform()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS10hide), 250000)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS11).click().perform()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS11hide), 250000)];
                case 11:
                    _a.sent();
                    expect(page.eastrnPc1LgndS11hide.isPresent()).toBe(true, 'legend toggle is hide is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on the toggle legend on summary trend to active', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.eastrnPc1LgndS0hide), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS0hide).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS0b), 250000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS1hide).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS1b), 250000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS2hide).click().perform()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.eastrnPc1LgndS2b), 250000)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS10hide).click().perform()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS10b), 250000)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.eastrnPc1LgndS11hide).click().perform()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.eastrnPc1LgndS11b), 250000)];
                case 11:
                    _a.sent();
                    expect(page.eastrnPc1LgndS1.isPresent()).toBe(true, 'legend toggle is reactivate from hide is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click Open Chart on New tab button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.tlnExpndChrt).click().perform()];
                case 2:
                    _a.sent();
                    expect(page.tlnExpndChrt.isPresent()).toBe(true, 'expand chart button is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should switch from previos tab and focus on new tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.getAllWindowHandles().then(function (handles) {
                        protractor_1.browser.driver.switchTo().window(handles[0]);
                        protractor_1.browser.driver.switchTo().window(handles[1]);
                    });
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.invstAccViews), 128000)];
                case 1:
                    _a.sent();
                    expect(page.invstAccViews.isPresent()).toBe(false, 'chart was not opened to new tab');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec05_IAviews.e2e-spec.js.map