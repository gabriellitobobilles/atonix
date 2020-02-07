"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var path = require("path");
describe('19585: Performance Analyst  - Alerts - Chart', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
        appTitle.fillLoginForm();
        appTitle.confirmLogin();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
        expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
        protractor_1.browser.driver.sleep(5000);
    }));
    it('Step 1: Verify import file that is > 100MB confirm the file is not stored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, fileToUpload, absolutePath, _o, _p;
        return tslib_1.__generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    return [4 /*yield*/, appTitle.clickPerformanceAnalysApp(validator.AppName.assetExplorer)];
                case 1:
                    _q.sent();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.customeModelImport.treeControllerEditMode.click()];
                case 2:
                    _q.sent();
                    protractor_1.browser.waitForAngular();
                    expect(appTitle.customeModelImport.EditModeHide.isPresent()).toBe(true, 'Editing asset is not working');
                    _b = (_a = appTitle.assetExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_q.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 4:
                    _q.sent();
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_q.sent()).indexOf('Stage')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _f = (_e = appTitle.assetExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_q.sent()).indexOf('Stage Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    // tslint:disable-next-line:max-line-length
                    _h = (_g = protractor_1.browser.actions()).mouseMove;
                    _k = (_j = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 9:
                    // tslint:disable-next-line:max-line-length
                    _h.apply(_g, [_k.apply(_j, [(_q.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _m = (_l = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _m.apply(_l, [(_q.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    fileToUpload = '../../../src/test_Data/test.xlsm';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    // tslint:disable-next-line:max-line-length
                    _o = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.errorTextLocation.getText()];
                case 11:
                    // tslint:disable-next-line:max-line-length
                    _o.apply(void 0, [(_q.sent()) === validator.customModelErrorMessage.InvalidfileSize]).toBe(true, 'Error is not consistent');
                    _p = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 12:
                    _p.apply(void 0, [_q.sent()]).toBe(false, 'Import file button is not enable by default');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify import file that is < 1KB confirm the file is not stored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, fileToUpload, absolutePath, _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.customeModelImport.acmVMExit.click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.browser.actions()).mouseMove;
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [_d.apply(_c, [(_j.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _f = (_e = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(_e, [(_j.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    fileToUpload = '../../../src/test_Data/test3.xls';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    // tslint:disable-next-line:max-line-length
                    _g = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.errorTextLocation.getText()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _g.apply(void 0, [(_j.sent()) === validator.customModelErrorMessage.InvalidfileSize]).toBe(true, 'Error is not consistent');
                    _h = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 4:
                    _h.apply(void 0, [_j.sent()]).toBe(false, 'Import file button is not enable by default');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 3: Verify import file that is not XLS or XLSM, confirm it is not stored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, fileToUpload, absolutePath, _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.customeModelImport.acmVMExit.click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.browser.actions()).mouseMove;
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [_d.apply(_c, [(_j.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _f = (_e = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(_e, [(_j.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    fileToUpload = '../../../src/test_Data/test.txt';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    // tslint:disable-next-line:max-line-length
                    _g = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.errorTextLocation.getText()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _g.apply(void 0, [(_j.sent()) === validator.customModelErrorMessage.InvalidfileExtension]).toBe(true, 'Error is not consistent');
                    _h = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 4:
                    _h.apply(void 0, [_j.sent()]).toBe(false, 'Import file button is not enable by default');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Verify import file that is XLSM and the size meets criteria, confirm it is stored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, fileToUpload, absolutePath, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.customeModelImport.acmVMExit.click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.browser.actions()).mouseMove;
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [_d.apply(_c, [(_j.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _f = (_e = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(_e, [(_j.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    _g = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 3:
                    _g.apply(void 0, [_j.sent()]).toBe(false, 'Import file button is not enable by default');
                    fileToUpload = '../../../src/test_Data/test2.xlsm';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    _h = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 4:
                    _h.apply(void 0, [_j.sent()])
                        .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Verify import file that is XLS and the size meets criteria, confirm it is stored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, fileToUpload, absolutePath, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.customeModelImport.acmVMExit.click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.browser.actions()).mouseMove;
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [_d.apply(_c, [(_j.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _f = (_e = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(_e, [(_j.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    _g = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 3:
                    _g.apply(void 0, [_j.sent()]).toBe(false, 'Import file button is not enable by default');
                    fileToUpload = '../../../src/test_Data/test2.xls';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    _h = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 4:
                    _h.apply(void 0, [_j.sent()])
                        .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: DEFECT 31485, Page does not refresh on selecting a "Choose File" button.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, fileToUpload, absolutePath, _h, _j, fileToUpload2, absolutePath2, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.customeModelImport.acmVMExit.click();
                    // tslint:disable-next-line:max-line-length
                    _b = (_a = protractor_1.browser.actions()).mouseMove;
                    _d = (_c = appTitle.assetExplorerNavElemSelector.assetNode).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(_a, [_d.apply(_c, [(_l.sent()).indexOf('Old Regression Unit')])]).perform();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(1000);
                    // tslint:disable-next-line:max-line-length
                    _f = (_e = appTitle.customeModelImport.configurationIcon).get;
                    return [4 /*yield*/, appTitle.assetExplorerNavElemSelector.assetNode.getText()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(_e, [(_l.sent()).indexOf('Old Regression Unit')]).click();
                    protractor_1.browser.waitForAngular();
                    _g = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 3:
                    _g.apply(void 0, [_l.sent()]).toBe(false, 'Import file button is not enable by default');
                    fileToUpload = '../../../src/test_Data/test.txt';
                    absolutePath = path.resolve(__dirname, fileToUpload);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
                    _h = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.errorTextLocation.getText()];
                case 4:
                    _h.apply(void 0, [(_l.sent())
                            === validator.customModelErrorMessage.InvalidfileExtension])
                        .toBe(true, 'Error is not consistent');
                    _j = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 5:
                    _j.apply(void 0, [_l.sent()]).toBe(false, 'Import file button is not enable by default');
                    fileToUpload2 = '../../../src/test_Data/test2.xls';
                    absolutePath2 = path.resolve(__dirname, fileToUpload2);
                    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath2);
                    _k = expect;
                    return [4 /*yield*/, appTitle.customeModelImport.acmVMimportBtn.isEnabled()];
                case 6:
                    _k.apply(void 0, [_l.sent()])
                        .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Custom Model Import Upload XLS or XLSM files.js.map