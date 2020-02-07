"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
describe('Alerts: Creating Frozen Data models', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    var win;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(900000);
        appTitle.open();
        protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            console.log(' BROWSER SIZE ' + JSON.stringify(size));
        });
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
    it('Creating Frozen Data Model', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return tslib_1.__generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(performanceHelper_po_1.AppName.Alert);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first()), 700000, 'Element taking too long to appear in the DOM');
                    protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first().click();
                    return [4 /*yield*/, appTitle.rightClick(protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first())];
                case 1:
                    _q.sent();
                    protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'modelConfiguration\')"]').click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _q.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _q.sent();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 4: return [4 /*yield*/, _b.apply(_a, [(_q.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 5:
                    _q.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 6: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_q.sent()).indexOf('Stage')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 7:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 8: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_q.sent()).indexOf('Stage Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 9:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 10: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_q.sent()).indexOf('Old Regression Unit')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 11:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 12: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_q.sent()).indexOf('Boiler Air & Gas System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 13:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _m = (_l = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 14: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _m.apply(_l, [(_q.sent()).indexOf('Mill System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 15:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    _p = (_o = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 16: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _p.apply(_o, [(_q.sent()).indexOf('Mill F')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 17:
                    // tslint:disable-next-line:max-line-length
                    _q.sent();
                    return [4 /*yield*/, appTitle.doubleClicking(protractor_1.$$('[ng-model="asset.sensors"]').get(5))];
                case 18:
                    _q.sent();
                    return [4 /*yield*/, protractor_1.$('[ng-click="mdlVM.addModelFromEmptyResults()"]').click()];
                case 19:
                    _q.sent();
                    protractor_1.browser.wait(function () {
                        return protractor_1.$('[ng-click="mdlVM.addModelFromEmptyResults()"]').isDisplayed();
                    }, 720000).catch(function () {
                        protractor_1.browser.refresh();
                    }).then(function () {
                        protractor_1.browser.refresh();
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=test3.js.map