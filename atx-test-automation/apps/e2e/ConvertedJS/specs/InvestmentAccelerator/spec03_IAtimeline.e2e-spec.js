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
        protractor_1.browser.wait(EC.presenceOf(page.timelineTab), 10000);
        expect(page.timelineTab.isPresent()).toBe(true, 'Investment Accelerator app seen');
    });
});
describe('Sekoia Demo Clients > UGM Historical Reliability Plan', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on UGM Historical Reliability Plan and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviUGM), 128000)];
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
describe('asset360 investment accelerator timeline tab and check its functionalities', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    var downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpeg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
    };
    it('should go to Timeline tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.progresBar), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.timelineTab).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.trnd3dots), 128000)];
                case 3:
                    _a.sent();
                    expect(page.trnd3dots.isPresent()).toBe(true, 'Timeline tab is not loaded');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should go to Trends dropdown menu and select on Cost', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.progresBar), 128000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3700);
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.timelnDropdown).click().perform()];
                case 2:
                    _a.sent();
                    page.selectTimelnDropdown('Cost');
                    protractor_1.browser.wait(EC.visibilityOf(page.trndCost), 250000);
                    protractor_1.browser.waitForAngular();
                    expect(page.trndCost.isPresent()).toBe(true, 'Cost on trent chart was not selected');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on chart menu and download images', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, itm;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    itm = 1;
                    protractor_1.browser.sleep(8000);
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
                        console.log('JPEG downloading');
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
    it('should click on the Filter on the Timeline button and uncheck few checkbox', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.timelnFilter).click().perform()];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.timelnFltrDrpdwn), 100000)];
                case 2:
                    _g.sent();
                    _b = (_a = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 3:
                    _b.apply(_a, [(_g.sent()).indexOf('Circuit Segment Main OH')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.trnd3dots), 128000)];
                case 4:
                    _g.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    _d = (_c = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 5:
                    _d.apply(_c, [(_g.sent()).indexOf('Circuit Segment UG')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.trnd3dots), 250000)];
                case 6:
                    _g.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 128000);
                    _f = (_e = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 7:
                    _f.apply(_e, [(_g.sent()).indexOf('Pole Replacement')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    expect(page.trnd3dots.isPresent()).toBe(false, '3 dots on chart is still seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on the Filter on the Timeline button and check few checkbox', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3750);
                    _b = (_a = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 1:
                    _b.apply(_a, [(_g.sent()).indexOf('Circuit Segment Main OH')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.trnd3dots), 128000)];
                case 2:
                    _g.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    _d = (_c = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 3:
                    _d.apply(_c, [(_g.sent()).indexOf('Circuit Segment UG')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.trnd3dots), 128000)];
                case 4:
                    _g.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    _f = (_e = page.timelnFltrDrpdwn).get;
                    return [4 /*yield*/, page.timelnFltrDrpdwn.getText()];
                case 5:
                    _f.apply(_e, [(_g.sent()).indexOf('Pole Replacement')])
                        .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
                    protractor_1.browser.sleep(5500);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 128000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.timelnFilter).click().perform()];
                case 6:
                    _g.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.trnd3dots.isPresent()).toBe(false, '3 dots on chart is still seen');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Verify moving the time slider and Open chart to new tab', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click time slider then slide it to the left', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var ylwCircle, dateTxtInfo1, dateTxtInfo2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ylwCircle = protractor_1.$("#navIndicatorHandle");
                    console.log('Step 8');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(7000);
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
        var ylwCircle, datetext1, datetext2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    console.log('Step 9');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(7000);
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
                    expect(datetext1).not.toEqual(datetext2);
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
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.timelineTab), 128000)];
                case 1:
                    _a.sent();
                    expect(page.timelineTab.isPresent()).toBe(false, 'chart was not opened to new tab');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec03_IAtimeline.e2e-spec.js.map