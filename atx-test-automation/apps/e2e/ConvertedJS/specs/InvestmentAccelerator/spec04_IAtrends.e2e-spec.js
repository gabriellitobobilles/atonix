"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var InvestmentAccelerator_po_1 = require("../../page/InvestmentAccelerator_po");
var helper_1 = require("../../helpers/helper");
var user_1 = require("../../helpers/user");
var user = new user_1.User();
var helper = new helper_1.Helper();
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
describe('Sekoia Demo Clients > City of Metropolis', function () {
    var _this = this;
    var page;
    page = new InvestmentAccelerator_po_1.InvestmentAccelerator();
    it('should click on City of Metropolis and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log('Step 2');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(4500);
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.assetnaviSDC), 128000)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('progress-bar'))), 128000)];
                case 2:
                    _e.sent();
                    helper.waitForDisappear(protractor_1.$("#overlay-background"));
                    _b = (_a = page.IAparentNtree).get;
                    return [4 /*yield*/, page.IAparentNtree.getText()];
                case 3:
                    _b.apply(_a, [(_e.sent()).indexOf('SEKOIA Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(4500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.assetnaviCoM), 128000)];
                case 4:
                    _e.sent();
                    _d = (_c = page.IAchildNtree).get;
                    return [4 /*yield*/, page.IAchildNtree.getText()];
                case 5:
                    _d.apply(_c, [(_e.sent()).indexOf('City of Metropolis')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click();
                    protractor_1.browser.sleep(3500);
                    protractor_1.browser.actions().mouseMove(page.assetnaviCoM).click().perform();
                    expect(page.assetnaviCoM.isPresent()).toBe(true, 'City of Metropolis is selected');
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
        FileJPEG: 'chart.jpeg' || 'chart.jpg',
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
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.progresBar), 128000)];
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
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendDropdown).click().perform()];
                case 2:
                    _a.sent();
                    page.selectTrendsDropdown('Capital Costs');
                    protractor_1.browser.wait(EC.visibilityOf(page.trndCapCost), 250000);
                    protractor_1.browser.waitForAngular();
                    expect(page.trndCapCost.isPresent()).toBe(true, 'Capital Costs on trent chart was not selected');
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
                    console.log('Step 6');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3800);
                    _b = (_a = console).log;
                    return [4 /*yield*/, protractor_1.$$('g.highcharts-legend').get(0).$$('g').first().$$('g').first().$$('g').getText()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.cOcLgndS0).click().perform()];
                case 2:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.cOcLgndS0hide), 250000)];
                case 3:
                    _c.sent();
                    expect(page.cOcLgndS0hide.isPresent()).toBe(true, 'legend toggle is hide is not working');
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.cOcLgndS0hide).click().perform()];
                case 4:
                    _c.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.cOcLgndS0b), 250000)];
                case 5:
                    _c.sent();
                    expect(page.cOcLgndS0b.isPresent()).toBe(true, 'legend toggle is hide is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should go to Trends dropdown menu and select on Cost', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 7');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(page.progresBar), 128000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3700);
                    protractor_1.browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendDropdown).click().perform()];
                case 2:
                    _a.sent();
                    page.selectTrendsDropdown('Capital Costs');
                    protractor_1.browser.wait(EC.visibilityOf(page.trndCapCost), 250000);
                    protractor_1.browser.waitForAngular();
                    expect(page.trndCapCost.isPresent()).toBe(true, 'Capital Costs on trent chart was not selected');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click Toggle List view button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 8');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.toogleLviewBtn), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toogleLviewBtn).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.listFltrTxtbx), 250000)];
                case 3:
                    _a.sent();
                    expect(page.listFltrTxtbx.isPresent()).toBe(true, 'toggle list view is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click Select all/none button, and check if checkbox is selected', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 9');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.selAllNoneBtn), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.selAllNoneBtn).click().perform()];
                case 2:
                    _a.sent();
                    expect(page.selChckLboxBtn.isPresent()).toBe(true, 'checkbox button in listview is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click Export List to Excel button, and check if xlsx file was downloaded', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 10');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FileXLSX);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.dlExcelBtn), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.dlExcelBtn).click().perform()];
                case 2:
                    _a.sent();
                    page.verifyFileInDownloadsFolder(downloadFileName.FileXLSX);
                    console.log('XLSX downloading');
                    expect(page.dlExcelsToast.isPresent()).toBe(false, 'export list to excel button not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click edit selected button, and check if checkbox is selected', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 11');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.editSelBtn), 128000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.editSelBtn).click().perform()];
                case 2:
                    _a.sent();
                    expect(page.batchEditInfoLbl.isPresent()).toBe(true, 'Batch Edit Asset Info label is not seen');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should switch from previos tab and focus on new tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 12');
                    EC = protractor_1.protractor.ExpectedConditions;
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(3800);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.tlnExpndChrt).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(4200);
                    protractor_1.browser.getAllWindowHandles().then(function (handles) {
                        console.log("browser window: ", handles.length);
                        protractor_1.browser.driver.switchTo().window(handles[1]);
                    });
                    protractor_1.browser.sleep(3500);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.visibilityOf(page.chartZoomYaxis), 128000)];
                case 3:
                    _a.sent();
                    expect(page.chartZoomYaxis.isPresent()).toBe(true, 'chart was not opened to new tab');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec04_IAtrends.e2e-spec.js.map