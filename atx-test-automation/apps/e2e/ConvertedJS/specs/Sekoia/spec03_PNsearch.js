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
describe('asset360 sekoia page app and select a specific asset', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 40');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 10000);
    });
    it('should click search navigator then enter sekoia 1A Automation Substation', function () {
        console.log('Step 41');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.searchasset.sendKeys('1A Automation Substation');
        protractor_1.browser.sleep(6000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', '1A Automation Substation'))), 10000);
    });
});
describe('sekoia search standard tab', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click on sekoia search tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 42');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    return [4 /*yield*/, page.sekiosearchtab.click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('.btn.btn-default.btn-sm', 'Search tips'))), 10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on sekoia tips', function () {
        console.log('Step 43');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(6000);
        page.sekoisearchtips.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('Search Tips:'))), 30000);
    });
    it('should click on new search input text and then click save icon', function () {
        console.log('Step 44');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(6000);
        page.searchtxtboxtab.sendKeys('asset = *t');
        protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="tagSearchVM.saveQuickSearch(tagSearchVM.selectedQuickSearch)"]'))), 10000);
        page.sekoisaveicon.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('.modal-title'))), 10000);
    });
    it('should enter title name for search and then click ok button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 45');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(6000);
                    page.sekioqksavetbox.sendKeys('quicksearch testing');
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('.form-control.ng-valid.ng-not-empty.ng-dirty.ng-valid-parse.ng-touched'))), 10000);
                    page.sekoimakepublc.click();
                    //browser.wait(EC.presenceOf(element(by.cssContainingText('.ng-valid.ng-not-empty.ng-dirty.ng-valid-parse.ng-touched','Make Public'))), 10000);
                    return [4 /*yield*/, page.sekoiaddcatgry.click()];
                case 1:
                    //browser.wait(EC.presenceOf(element(by.cssContainingText('.ng-valid.ng-not-empty.ng-dirty.ng-valid-parse.ng-touched','Make Public'))), 10000);
                    _a.sent();
                    page.sekoiaddcatgry.sendKeys('test03');
                    protractor_1.browser.sleep(5000);
                    page.addsearchcat.click();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.wait(EC.elementToBeClickable(page.sekoiqksaveok), 10000);
                    return [4 /*yield*/, page.sekoiqksaveok.click()];
                case 2:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('modal-title'))), 8000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click again save button then enter title name for search and then click ok button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 46');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.wait(EC.elementToBeClickable(page.sekoisaveicon), 10000);
                    page.sekoisaveicon.click();
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('.modal-title', 'Save a quick search'))), 10000);
                    page.sekioqksavetbox.sendKeys('another quicksearch');
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, page.choosecatgries2.click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    return [4 /*yield*/, page.sekoiqksaveok.click()];
                case 2:
                    _a.sent();
                    protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.css('.modal-title'))), 8000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on dropdown arrow on new search button, then select newly saved', function () {
        console.log('Step 47');
        protractor_1.browser.sleep(6000);
        page.searchdropdown.click();
        protractor_1.browser.sleep(2500);
        page.searchdrpdwnQS.click();
        protractor_1.browser.sleep(5000);
    });
    it('should click on dropdown arrow on new search button, then select and delete public', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 48');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(20000);
                    page.searchdropdown.click();
                    protractor_1.browser.sleep(2500);
                    protractor_1.browser.actions().mouseMove(page.searchdelete3).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.cssContainingText('.overlayContainer', '[style="display: none;"]')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(20000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on dropdown arrow on new search button, then select and delete private', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 49');
                    protractor_1.browser.sleep(20000);
                    page.searchdropdown.click();
                    protractor_1.browser.sleep(2500);
                    protractor_1.browser.actions().mouseMove(page.searchdelete3).click().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.cssContainingText('.overlayContainer', '[style="display: none;"]')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    protractor_1.browser.sleep(20000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click on search tip to remove then new search on search tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 50');
            EC = protractor_1.protractor.ExpectedConditions;
            page.sekoisearchtips.click();
            protractor_1.browser.sleep(20000);
            page.searchtxtboxtab.clear();
            page.searchtxtboxtab.sendKeys('test');
            protractor_1.browser.sleep(5000);
            page.sekoiserchbtn.click();
            protractor_1.browser.sleep(40000);
            protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.cssContainingText('[class="overlayContainer"]', '[style="display: none;"]'))), 40000);
            return [2 /*return*/];
        });
    }); });
});
describe('sekoia search result', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    var downloadFileName = {
        //FileLast: '*.xlsx',
        //FileXLSX: FileFirst + '*.xlsx',
        FileXLSX: 'SearchResultsExport' + '.xlsx',
    };
    it('should click search textbox, clear, and search all on Coal Station 1', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 51');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(20000);
                    page.searchtxtboxtab.clear();
                    page.searchtxtboxtab.sendKeys('tag=*');
                    protractor_1.browser.sleep(5000);
                    page.sekoiserchbtn.click();
                    protractor_1.browser.sleep(40000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.cssContainingText('[class="progress-bar"]', 'Retrieving Data...'))), 160000)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click collapse up on result', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 52');
            EC = protractor_1.protractor.ExpectedConditions;
            protractor_1.browser.sleep(10000);
            protractor_1.browser.actions().mouseMove(page.srchAssetgClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.actions().mouseMove(page.srchAtachmntgClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.actions().mouseMove(page.srchPhotosgClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.actions().mouseMove(page.srchAsetIsuesgClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.actions().mouseMove(page.srchDiscusEntrygClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.actions().mouseMove(page.srchCFAuditEntrygClps).click().perform();
            protractor_1.browser.sleep(2500);
            protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.cssContainingText('[class="overlayContainer"]', '[style="display: none;"]'))), 40000);
            return [2 /*return*/];
        });
    }); });
    it('should click search export button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            console.log('Step 53');
            EC = protractor_1.protractor.ExpectedConditions;
            //page.deleteAlreadyDownloadedFiles(downloadFileName.FileXLSX)  
            protractor_1.browser.actions().mouseMove(page.srchToogleBtn).click().perform();
            protractor_1.browser.actions().mouseMove(page.exportsrchresbtn).click().perform();
            protractor_1.browser.sleep(25000);
            //page.verifyFileInDownloadsFolder(downloadFileName.FileXLSX);
            /*         var glob = require("glob");
                    var filePattern = '*.xlsx';
                    browser.driver.wait (function () {
                    var filesArray = glob.sync(filePattern);
                    if (typeof filesArray !== 'undefined' && filesArray.length > 0) {
                    // this check is necessary because `glob.sync` can return
                    // an empty list, which will be considered as a valid output
                    // making the wait to end.
                        return filesArray;
                        }
                    }, 10000).then(function (filesArray) {
                    var downloadFileName = filesArray[0];
                    // now we have the filename and can do whatever we want
                    console.log('File download was successful');
                    });
             */
            console.log('Excel downloading');
            protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.cssContainingText('[class="overlayContainer"]', '[style="display: none;"]'))), 40000);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=spec03_PNsearch.js.map