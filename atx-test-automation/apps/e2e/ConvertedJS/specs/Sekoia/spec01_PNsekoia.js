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
describe('asset360 sekoia page app', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should see SEKOIA page', function () {
        user.logIn(userObj);
        console.log('Step 3');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.menuapps.click();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        protractor_1.browser.waitForAngular();
        page.sekoiaapp.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.model('typeaheadVM.customSelected'))), 10000);
    });
});
describe('sekoia demo client > UGM Historical Reliability asset navigator', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click on sekoia demo client and expand its assets', function () {
        console.log('Step 4');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.actions().mouseMove(page.assetnavi3).click().perform();
        protractor_1.browser.sleep(2500);
        protractor_1.browser.actions().mouseMove(page.assetnavixp3).click().perform();
        protractor_1.browser.actions().mouseMove(page.assetnaviUGM).click().perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
        protractor_1.browser.waitForAngular();
    });
    it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', function () {
        console.log('Step 5');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.searchasset.sendKeys('UGM Historical Reliability Plan');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.sleep(5000);
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
    });
});
describe('asset360 sekoia asset navigator functionalities and cancel adhoc tree', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click sekoia add button asset navigator', function () {
        console.log('Step 6');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(10000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().mouseMove(page.assetaddnav).click().perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('modal-title'))), 10000);
    });
    it('should input text in Tree Name on New Adhoc Tree', function () {
        console.log('Step 7');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(5000);
        page.addhoctreename.sendKeys('TreeName test1');
        protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
    });
    it('should add click checkbox on new ad hoc tree', function () {
        console.log('Step 8');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.cboxassoclent1.click();
        page.cboxassoapp1.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('ng-valid ng-dirty ng-valid-parse ng-touched ng-not-empty'))), 10000);
    });
    it('should click dropdown add category on new ad hoc tree', function () {
        console.log('Step 9');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.addcategoryahdd.click();
        protractor_1.browser.sleep(5000);
        page.pickddaddcat1.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
    });
    it('should click cancel button on add hoc tree pop-up', function () {
        console.log('Step 10');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.canceladdhoc.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('modal-title'))), 8000);
    });
});
describe('asset360 sekoia asset navigator functionalities and save adhoc tree', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click sekoia add button asset navigator', function () {
        console.log('Step 11');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(10000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().mouseMove(page.assetaddnav).click().perform();
        protractor_1.browser.sleep(10000);
        protractor_1.browser.waitForAngular();
    });
    it('should enter adhoc treename', function () {
        console.log('Step 12');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(5000);
        page.addhoctreename.sendKeys('TreeName test1');
        protractor_1.browser.waitForAngular();
        //browser.sleep(5000);
        protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
    });
    it('should add click checkbox on new ad hoc tree', function () {
        console.log('Step 13');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.cboxassoclent1.click();
        page.cboxassoapp1.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('ng-valid ng-dirty ng-valid-parse ng-touched ng-not-empty'))), 10000);
    });
    it('should click dropdown add category on new ad hoc tree', function () {
        console.log('Step 14');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.addcategoryahdd.click();
        protractor_1.browser.sleep(5000);
        page.pickddaddcat1.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.sleep(5000);
    });
    it('should click add button on add hoc tree pop-up', function () {
        console.log('Step 15');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.saveaddhoc.click();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('modal-title'))), 8000);
    });
});
describe('asset360 sekoia asset navigator functionalities and edit and delete adhoc tree', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click sekoia edit button asset navigator', function () {
        console.log('Step 16');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(8000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().mouseMove(page.editaddhocbtn).click().perform();
        //browser.sleep(5000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('bg-info'))), 10000);
    });
    it('should click sekoia hover mouse on treename navigator', function () {
        console.log('Step 17');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(8000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().mouseMove(page.treenameline1).click().perform();
        protractor_1.browser.actions().mouseMove(page.deladdhocbtn).click().perform();
        protractor_1.browser.sleep(5000);
        protractor_1.browser.switchTo().alert().accept();
        protractor_1.browser.waitForAngular();
    });
    it('should click sekoia run mode navigator', function () {
        console.log('Step 18');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.sleep(8000);
        protractor_1.browser.waitForAngular();
        protractor_1.browser.actions().mouseMove(page.runaddhocbtn).click().perform();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.invisibilityOf(protractor_1.element(protractor_1.by.className('bg-info'))), 8000);
    });
});
describe('sekoia demo client > UGM Historical Reliability asset navigator', function () {
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', function () {
        console.log('Step 19');
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.waitForAngular();
        page.searchasset3.sendKeys('UGM Historical Reliability Plan');
        protractor_1.browser.sleep(5000);
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
    });
});
describe('asset360 sekoia timeslider feature', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click jumpTo button', function () {
        console.log('Step 20');
        var EC = protractor_1.protractor.ExpectedConditions;
        page.jumptobtn.click();
        page.jmplastqtr.click();
        protractor_1.browser.sleep(5000);
    });
    it('should click time slider then slide it to the left', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, datetext, yCircle;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    datetext = protractor_1.element(protractor_1.by.id('navIndicatorDate'));
                    yCircle = protractor_1.element(protractor_1.by.id('navIndicator'));
                    console.log('Step 22');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(10000);
                    //browser.wait(EC.presenceOf(ylwCircle), 10000).then() => { 
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: -100, y: 0 }).mouseUp().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('highcharts-shadow'))), 15000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click time slider then slide it to the right', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, ylwCircle, datetext, yCircle;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    EC = protractor_1.protractor.ExpectedConditions;
                    ylwCircle = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    datetext = protractor_1.element(protractor_1.by.id('navIndicatorDate'));
                    yCircle = protractor_1.element(protractor_1.by.id('navIndicator'));
                    console.log('Step 23');
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(10000);
                    protractor_1.browser.actions().mouseMove(ylwCircle).click().perform();
                    protractor_1.browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('highcharts-shadow'))), 15000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('asset360 sekoia asset JumpTo feature', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click last year, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 24');
                    protractor_1.browser.sleep(10000);
                    EC = protractor_1.protractor.ExpectedConditions;
                    page.jumptobtn.click();
                    protractor_1.browser.sleep(1000);
                    page.jmplastyr.click();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click last month, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 25');
                    EC = protractor_1.protractor.ExpectedConditions;
                    page.jumptobtn.click();
                    protractor_1.browser.sleep(1000);
                    page.jmplastmonth.click();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('highcharts-shadow'))), 15000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click tomorrow, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 26');
                    EC = protractor_1.protractor.ExpectedConditions;
                    page.jumptobtn.click();
                    page.jmptomorrow.click();
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('.tableLoadingSpinner.ng-hide')).isPresent];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('highcharts-shadow'))), 15000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should click Now, then click again jumpTo button', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Step 27');
                    EC = protractor_1.protractor.ExpectedConditions;
                    page.jumptobtn.click();
                    page.jmpnow.click();
                    return [4 /*yield*/, protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.className('highcharts-shadow'))), 15000)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Sekoia Summarize Map Data dropdown select', function () {
    var _this = this;
    var page;
    page = new page_PNsekoia_1.AngularPage();
    it('should click dropdown, then select map dropdown', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.sleep(8000);
                    protractor_1.browser.waitForAngular();
                    console.log('Step 28');
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.sleep(10000);
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapdrpdown), 250000)];
                case 1:
                    _a.sent();
                    i = 4;
                    _a.label = 2;
                case 2:
                    if (!(i >= 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 3:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
                    protractor_1.browser.sleep(2500);
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
                    protractor_1.browser.sleep(15000);
                    _a.label = 4;
                case 4:
                    i--;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('should click dropdown, then select map dropdown go to first option', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var EC, i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.waitForAngular();
                    console.log('Step 29');
                    EC = protractor_1.protractor.ExpectedConditions;
                    return [4 /*yield*/, protractor_1.browser.wait(EC.elementToBeClickable(page.mapdrpdown), 250000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(page.mapdrpdown).click().perform()];
                case 2:
                    _a.sent();
                    protractor_1.browser.sleep(5000);
                    //for(i = 7; i>=1; i--) {
                    for (i = 4; i >= 1; i--) {
                        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.UP).perform();
                        protractor_1.browser.sleep(1000);
                    }
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec01_PNsekoia.js.map