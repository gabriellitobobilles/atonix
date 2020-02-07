"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var page_PNsekoia_1 = require("../../page/page_PNsekoia");
var user_1 = require("../../helpers/user");
var user = new user_1.User();
var userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
};
describe('asset360 sekoia page app and select specific asset', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 56');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 50000);
    });
    it('should click on the keep and open panel feature', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 57');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.hidepanel).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.openpanel).click().perform()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click search navigator then enter sekoia UGM Historical Reliability Plan', function () {
        console.log('Step 58');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.actions().mouseMove(page.assetnavi3).click().perform();
        protractor_1.browser.sleep(2500);
        protractor_1.browser.actions().mouseMove(page.assetnavixp3).click().perform();
        protractor_1.browser.actions().mouseMove(page.assetnaviUGM).click().perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
        protractor_1.browser.waitForAngular();
    });
});
describe('sekoia trends tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    var downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
        FileCSV: 'chart.csv',
        FilePRcsv: 'Pole Replacement.csv'
    };
    it('should click on download table and chart content', function () {
        console.log('Step 59');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.deleteAlreadyDownloadedFiles(downloadFileName.FileCSV);
        page.deleteAlreadyDownloadedFiles(downloadFileName.FilePRcsv);
        protractor_1.browser.sleep(6000);
        console.log('delete old CSV files');
        protractor_1.browser.actions().mouseMove(page.dltableBtn).click().perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.PAGE_DOWN).perform();
        protractor_1.browser.actions().mouseMove(page.dlchartcBtn).click().perform();
        protractor_1.browser.sleep(6000);
    });
    it('should click on download table and chart content', function () {
        console.log('Step 60');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.verifyFileInDownloadsFolder(downloadFileName.FilePRcsv);
        page.verifyFileInDownloadsFolder(downloadFileName.FileCSV);
    });
    it('should click on chart menu and download images', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, itm;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 61');
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
                    if (!(i >= 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.className('highcharts-button-symbol'))).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(4000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.className('highcharts-menu-item')).get(itm)).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(6000);
                    itm++;
                    if (itm == 3) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
                        console.log('PNG downloading');
                    }
                    else if (itm == 2) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
                        console.log('JPEG downloading');
                    }
                    else if (itm == 1) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FilePDF);
                        console.log('PDF downloading');
                    }
                    else {
                        page.verifyFileInDownloadsFolder(downloadFileName.FileSVG);
                        console.log('SVG downloading');
                    }
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec07_PNanalytics.js.map