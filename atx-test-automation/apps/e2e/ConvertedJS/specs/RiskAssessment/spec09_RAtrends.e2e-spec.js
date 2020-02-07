"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var riskAssessment_po_1 = require("../../page/riskAssessment_po");
var helper_1 = require("../../helpers/helper");
var user_1 = require("../../helpers/user");
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
        protractor_1.browser.wait(EC.presenceOf(page.RMtab), 18000);
        expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
    });
});
describe('RA Testing>Distributed Asset Example Data (small) v1>Division 1>District 1>Substation 1', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    it('should click on Distributed Asset Example Data (small) v1 and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.assetnavi4RA), 128000)];
                case 1:
                    _l.sent();
                    helper.waitForDisappear(protractor_1.$("#overlay-background"));
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 2:
                    _b.apply(_a, [(_l.sent()).indexOf('RA Testing')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4DAEDv1), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _d.apply(_c, [(_l.sent()).indexOf('Distributed Asset Example Data (small) v1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 4:
                    _f.apply(_e, [(_l.sent()).indexOf('Division 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
                    _h = (_g = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 5:
                    _h.apply(_g, [(_l.sent()).indexOf('District 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform()];
                case 6:
                    _l.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp4dsub1dos).click().perform()];
                case 7:
                    _l.sent();
                    _k = (_j = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 8:
                    _k.apply(_j, [(_l.sent()).indexOf('Substation 1')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnavixp4dsub1dos), 28000)];
                case 9:
                    _l.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform()];
                case 10:
                    _l.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp2smfed1).click().perform()];
                case 11:
                    _l.sent();
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviclckUGC145823).click().perform()];
                case 12:
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    expect(page.assetnaviclckUGC145823.isPresent()).toBe(true, 'UGC 145823 is seen');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 risk assessment trends tab and check its functionalities', function () {
    var _this = this;
    var page;
    page = new riskAssessment_po_1.RskAssessment();
    var downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpg' || 'chart.jpeg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
        FileXLSX: 'ListViewExport.xlsx',
    };
    it('should go to Trends tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 3');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.scoreCardNum), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendsTab).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.trnd3dots), 128000)];
                case 3:
                    _a.sent();
                    expect(page.trnd3dots.isPresent()).toBe(true, 'trends tab is not loaded');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click calendar button and change the start date', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 4');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.calendarBtn), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.calendarBtn).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    page.calndrStartTxtbx.clear();
                    page.calndrStartTxtbx.sendKeys('01/01/2016');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.calndrOkBtn).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    expect(page.popTimeSlidrDlg.isPresent()).toBe(true, 'time slider pop-up not closed');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should go to Trends dropdown menu and select on EventData Trend', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 5');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    protractor_1.browser.sleep(3700);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendRADropdown).click().perform()];
                case 1:
                    _a.sent();
                    page.selectTrendsDropdown('EventData Trend');
                    protractor_1.browser.waitForAngular();
                    expect(page.chartSelected.isPresent()).toBe(true, 'EventData Trend on trent chart was not selected');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on chart menu and download images', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, itm;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 6');
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
    it('should click on the toggle legend on summary trend to hide', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    _b = (_a = console).log;
                    return [4 /*yield*/, protractor_1.$$('g.highcharts-legend').get(0).$$('g').first().$$('g').first().$$('g').getText()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.inspctLgndS0).click().perform()];
                case 2:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.inspctLgndS0hide), 250000)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.outgLgndS1).click().perform()];
                case 4:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.outgLgndS1hide), 250000)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.inspctLgndS0hide).click().perform()];
                case 6:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.inspctLgndS0a), 250000)];
                case 7:
                    _c.sent();
                    expect(page.inspctLgndS0a.isPresent()).toBe(true, 'legend toggle is hide is not working');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.outgLgndS1hide).click().perform()];
                case 8:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.outgLgndS1a), 250000)];
                case 9:
                    _c.sent();
                    expect(page.outgLgndS1a.isPresent()).toBe(true, 'legend toggle is hide is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should switch Demo Clients>Coal Plant>Eastern Station asset on asset navigator', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.assetnaviDC), 128000)];
                case 1:
                    _g.sent();
                    helper.waitForDisappear(protractor_1.$("#overlay-background"));
                    _b = (_a = page.RAparentNtree).get;
                    return [4 /*yield*/, page.RAparentNtree.getText()];
                case 2:
                    _b.apply(_a, [(_g.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4000);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnaviCP), 25000);
                    _d = (_c = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 3:
                    _d.apply(_c, [(_g.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4000);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnaviES), 25000);
                    _f = (_e = page.RAchildNtree).get;
                    return [4 /*yield*/, page.RAchildNtree.getText()];
                case 4:
                    _f.apply(_e, [(_g.sent()).indexOf('Eastern Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4000);
                    protractor_1.browser.wait(EC.presenceOf(page.assetnaviESpc1), 25000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviESpc1).click().perform()];
                case 5:
                    _g.sent();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.visibilityOf(page.trnd3dots), 250000);
                    expect(page.trnd3dots.isPresent()).toBe(true, 'changing asset is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click select on the trends dropdown Loss Summary, and check if it is selected', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    protractor_1.browser.sleep(3700);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.trendRADropdown), 128000)];
                case 1:
                    _a.sent();
                    page.selectTrendsDropdown('Loss Summary');
                    protractor_1.browser.waitForAngular();
                    expect(page.chartSelected.isPresent()).toBe(true, 'Loss Summary on trent chart was not selected');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click chart menu, and chick print and print preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var printButton, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.$('[class="highcharts-button-symbol"]').click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-menu-item"]').first()];
                case 2:
                    printButton = _a.sent();
                    result = protractor_1.browser.executeAsyncScript(function (elm, callback) {
                        function listener() {
                            callback(true);
                        }
                        window.print = listener;
                        elm.click();
                    }, printButton.getWebElement());
                    protractor_1.browser.sleep(3000);
                    expect(result).toBeTruthy();
                    console.log('Print preview');
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
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(4500);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.tlnExpndChrt).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(4200);
                    protractor_1.browser.getAllWindowHandles().then(function (handles) {
                        console.log("browser window: ", handles.length);
                        protractor_1.browser.driver.switchTo().window(handles[1]);
                    });
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.chartZoomTab), 128000)];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.chartZoomYaxis), 128000)];
                case 4:
                    _a.sent();
                    expect(page.chartZoomYaxis.isPresent()).toBe(true, 'chart was not opened to new tab');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec09_RAtrends.e2e-spec.js.map