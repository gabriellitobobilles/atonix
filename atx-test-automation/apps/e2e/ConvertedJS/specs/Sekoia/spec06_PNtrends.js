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
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
    }));
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 55');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 50000);
    });
    it('should click on sekoia demo client and expand its assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 56');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.actions().mouseMove(page.assetnavi2a).click().perform();
                    protractor_1.browser.sleep(2500);
                    protractor_1.browser.actions().mouseMove(page.assetnavixp2a).click().perform();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp13).click().perform()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnavixp14).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.assetnaviEPC1).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern PC1'))), 10000);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click search navigator then enter sekoia Eastern PC1', function () {
        console.log('Step 57');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.searchasset.sendKeys('Eastern PC1');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.wait(EC.presenceOf(page.assetnaviUDP), 25000);
    });
});
describe('sekoia trends tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
    }));
    var downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
    };
    it('should click on sekoia trends tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 58');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendstab).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('temporary solution to BUG 21719', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 59t');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.sviewtab).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(22000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.trendstab).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should select trend on dropdown', function () {
        console.log('Step 60');
        protractor_1.browser.sleep(7000);
        protractor_1.browser.actions().mouseMove(page.trendsdrpdwn).click().perform();
        protractor_1.browser.sleep(1000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        protractor_1.browser.sleep(1000);
        //browser.actions().mouseMove(element(by.cssContainingText('label','Heat Rate Calculations'))).click().perform()
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.sleep(6000);
    });
    it('should click on sekoia calendar pop.op button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ctrlA;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 61');
                    EC = protractor_1.protractor.ExpectedConditions;
                    ctrlA = protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, "a");
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(15000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.calendrPopBtn), 250000)];
                case 1:
                    _a.sent();
                    protractor_1.browser.actions().mouseMove(page.calendrPopBtn).click().perform();
                    protractor_1.browser.actions().mouseMove(page.startdate).click().perform();
                    return [4 /*yield*/, protractor_1.element(protractor_1.by.model('trVM.popupConfiguration.date1')).clear()];
                case 2:
                    _a.sent();
                    protractor_1.browser.element(protractor_1.by.model('trVM.popupConfiguration.date1')).sendKeys('10/01/2016');
                    protractor_1.browser.sleep(6000);
                    protractor_1.browser.actions().mouseMove(page.calApplyBtn).click().perform();
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, protractor_1.$('[class="btn btn-primary"]').click()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.cssContainingText('.highcharts-loading-inner', 'Loading...'))), 8000)];
                case 4:
                    _a.sent();
                    protractor_1.browser.sleep(15000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click toogle chart legend label (hide-all)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 62');
                    EC = protractor_1.protractor.ExpectedConditions;
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.toggleClk4), 250000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleClk0.$$('text').first()).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleClk2.$$('text').first()).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleClk4.$$('text').first()).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleClk1.$$('text').first()).click().perform()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleClk3.$$('text').first()).click().perform()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.toggleUnClk4), 8000)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click toogle chart legend label (show-all)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 63');
                    EC = protractor_1.protractor.ExpectedConditions;
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.toggleUnClk4), 250000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleUnClk0.$$('text').first()).click().perform()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleUnClk2.$$('text').first()).click().perform()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleUnClk4.$$('text').first()).click().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleUnClk1.$$('text').first()).click().perform()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.toggleUnClk3.$$('text').first()).click().perform()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(page.toggleClk4t), 8000)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click chart menu and print preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var printButton, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 64');
                    /**Verify Print preview  */
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.className('highcharts-button-symbol'))).click().perform()];
                case 1:
                    /**Verify Print preview  */
                    _a.sent();
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
                    protractor_1.browser.sleep(3000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on chart menu and download images', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i, itm;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 65');
                    EC = protractor_1.protractor.ExpectedConditions;
                    itm = 1;
                    protractor_1.browser.sleep(8000);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePNG);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FileJPEG);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePDF);
                    page.deleteAlreadyDownloadedFiles(downloadFileName.FileSVG);
                    console.log('Previous downloaded files deleted');
                    i = 4;
                    _a.label = 1;
                case 1:
                    if (!(i >= 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.className('highcharts-button-symbol'))).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(4000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.className('highcharts-menu-item')).get(itm)).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(6000);
                    itm++;
                    if (itm == 4) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
                        console.log('PNG downloading');
                    }
                    else if (itm == 3) {
                        page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
                        console.log('JPEG downloading');
                    }
                    else if (itm == 2) {
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
    it('should click Open new chart on tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 66');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('[ng-click="buttonsVM.Zoom()"]'))).click().perform()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(4000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should close previos tab and focus on new tab', function () {
        console.log('Step 67');
        protractor_1.browser.getAllWindowHandles().then(function (handles) {
            protractor_1.browser.driver.switchTo().window(handles[1]);
            //browser.driver.close();
            protractor_1.browser.sleep(4000);
            protractor_1.browser.driver.switchTo().window(handles[0]);
        });
    });
});
//# sourceMappingURL=spec06_PNtrends.js.map