"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
describe('19602: Data Explorer - Navigator - Tag List', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    var win;
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
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
    it('Creating Rolling Average', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, target, elem, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, divs;
        return tslib_1.__generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(performanceHelper_po_1.AppName.Alert);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first()), 700000, 'Element taking too long to appear in the DOM');
                    protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first().click();
                    return [4 /*yield*/, appTitle.rightClick(protractor_1.$$('[ng-repeat="model in modelsVM.models"]').first())];
                case 1:
                    _4.sent();
                    protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'modelConfiguration\')"]').click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _4.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _4.sent();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 4: return [4 /*yield*/, _b.apply(_a, [(_4.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 5:
                    _4.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 6: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_4.sent()).indexOf('Stage')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 7:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 8: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_4.sent()).indexOf('Stage Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 9:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 10: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_4.sent()).indexOf('Old Regression Unit')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 11:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 12: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_4.sent()).indexOf('Boiler Air & Gas System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 13:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _m = (_l = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 14: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _m.apply(_l, [(_4.sent()).indexOf('Mill System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 15:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _p = (_o = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 16: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _p.apply(_o, [(_4.sent()).indexOf('Mill A')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 17:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    return [4 /*yield*/, appTitle.doubleClicking(protractor_1.$$('[ng-model="asset.sensors"]').get(5))];
                case 18:
                    _4.sent();
                    return [4 /*yield*/, protractor_1.$('[ng-click="mdlVM.addModelFromEmptyResults()"]').click()];
                case 19:
                    _4.sent();
                    expect(protractor_1.$('[ng-click="vm.create()"]').isDisplayed()).toBe(true, 'No modal popup show');
                    // * Creating models
                    return [4 /*yield*/, protractor_1.$('[ng-model="vm.modelName"]').click()];
                case 20:
                    // * Creating models
                    _4.sent();
                    protractor_1.$('[ng-model="vm.modelName"]').clear();
                    protractor_1.$('[ng-model="vm.modelName"]').sendKeys('APR model');
                    appTitle.selectDropdownbyNum(protractor_1.$('[ng-model="vm.selectedModelType"]'), 0);
                    appTitle.selectDropdownbyNum(protractor_1.$('[ng-model="vm.selectedOpModeType"]'), 3);
                    protractor_1.$('[ng-click="vm.create()"]').click();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(protractor_1.$('[ng-model="$ctrl.inputsConfig.ModelActive"]')), 700000, 'Element taking too long to appear in the DOM');
                    protractor_1.$('[ng-model="$ctrl.inputsConfig.ModelActive"]').click();
                    target = protractor_1.$('[ng-repeat="series in $ctrl.inputsConfig.Inputs"]');
                    elem = protractor_1.$$('[ng-model="asset.sensors"]').get(6);
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 21:
                    _4.sent();
                    protractor_1.$('[ng-click="$ctrl.localChange(\'ActiveConfiguration\', \'Output\'); $ctrl.localChange(\'ShowHide Range Selector\', true)"]').click();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="toast-message"]')));
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarIcon.click()];
                case 22:
                    _4.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDatebox.clear()];
                case 23:
                    _4.sent();
                    return [4 /*yield*/, appTitle.selectTimeSlider.startDatebox.sendKeys('08/01/2018')];
                case 24:
                    _4.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarApplybtn.first().click()];
                case 25:
                    _4.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, appTitle.selectTimeSlider.calendarOKBtn.first().click()];
                case 26:
                    _4.sent();
                    protractor_1.$('[class="fa fa-floppy-o"]').click();
                    expect(protractor_1.$('[ng-click="$ctrl.ok()"]').isDisplayed()).toBe(true, 'No modal popup show');
                    protractor_1.$('[ng-click="$ctrl.ok()"]').click();
                    protractor_1.browser.driver.sleep(120000);
                    protractor_1.browser.refresh();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(5000);
                    _r = (_q = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 27: return [4 /*yield*/, _r.apply(_q, [(_4.sent()).indexOf('nD Test Client')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 28:
                    _4.sent();
                    _t = (_s = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 29: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _t.apply(_s, [(_4.sent()).indexOf('Stage')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 30:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _v = (_u = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 31: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _v.apply(_u, [(_4.sent()).indexOf('Stage Station')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 32:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _x = (_w = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 33: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _x.apply(_w, [(_4.sent()).indexOf('Old Regression Unit')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 34:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _z = (_y = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 35: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _z.apply(_y, [(_4.sent()).indexOf('Boiler Air & Gas System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 36:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _1 = (_0 = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 37: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _1.apply(_0, [(_4.sent()).indexOf('Mill System')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 38:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    _3 = (_2 = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 39: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _3.apply(_2, [(_4.sent()).indexOf('Mill A')])
                        .click()];
                case 40:
                    // tslint:disable-next-line:max-line-length
                    _4.sent();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(5000);
                    return [4 /*yield*/, protractor_1.$('[ng-repeat="model in modelsVM.models"]').$$('[text-right lightTableCell ng-binding]').get(2).getText()];
                case 41:
                    divs = _4.sent();
                    console.log(divs);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec15_dataExplorer-Navigator-Tag-List.e2e-spec.js.map