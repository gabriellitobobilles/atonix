"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19587: Performance Analyst - Water', function () {
    var appTitle = new performanceHelper_po_1.helper();
    beforeAll((function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        var EC = protractor_1.protractor.ExpectedConditions;
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
    it('Step 1: Navigate to water asset', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return tslib_1.__generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_l.sent()).indexOf('All Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('City Of Lawrence')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Waste Water Treatment Plants (WWTP)')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Kansas River WWTP')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_l.sent()).indexOf('Kansas River WWTP')])
                        .click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify values seem correct in Donuts', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            protractor_1.browser.waitForAngular();
            expect(protractor_1.$$('[class="highcharts-series-group"]').first().isDisplayed()).toBe(true, 'Donut was not displayed');
            expect(protractor_1.$$('[class="highcharts-series-group"]').get(1).isDisplayed()).toBe(true, 'Donut was not displayed');
            expect(protractor_1.$$('[class="highcharts-series-group"]').get(2).isDisplayed()).toBe(true, 'Donut was not displayed');
            expect(protractor_1.$$('[class="highcharts-series-group"]').get(3).isDisplayed()).toBe(true, 'Donut was not displayed');
            return [2 /*return*/];
        });
    }); });
    // tslint:disable-next-line:max-line-length
    it('Step 3: Values respond to changes in time slider- note that some charts are always 1min resolution regardless of time slider', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var costAsset1, haveEnergy1, haveChemical1, target, elem, costAsset2, haveEnergy2, haveChemical2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveCostAssets"]').first().getText()];
                case 1:
                    costAsset1 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveEnergies"]').first().getText()];
                case 2:
                    haveEnergy1 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveChemicals"]').first().getText()];
                case 3:
                    haveChemical1 = _a.sent();
                    target = protractor_1.$('[id="navEnd"]');
                    elem = protractor_1.$('[id="navStart"]').$('g').$('circle');
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveCostAssets"]').first().getText()];
                case 5:
                    costAsset2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveEnergies"]').first().getText()];
                case 6:
                    haveEnergy2 = _a.sent();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && wpaVM.haveChemicals"]').first().getText()];
                case 7:
                    haveChemical2 = _a.sent();
                    // console.log(costAsset2, haveEnergy2, haveChemical2);
                    expect(costAsset1).not.toEqual(costAsset2);
                    expect(haveEnergy1).not.toEqual(haveEnergy2);
                    expect(haveChemical1).not.toEqual(haveChemical2);
                    protractor_1.browser.sleep(10000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Click a slice in Chemical Usage by Chemical donut, verify donut changes to Chemical Usage by Asset', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var y, EC, name_1, val, _a, _b;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    y = 0;
                    _c.label = 1;
                case 1:
                    if (!(y <= 1)) return [3 /*break*/, 10];
                    EC = protractor_1.protractor.ExpectedConditions;
                    protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-' + y)).get(0)).perform();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.$('.highcharts-tooltip')));
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.$('.highcharts-tooltip')];
                        }); }); })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.$('.highcharts-tooltip').element(protractor_1.by.tagName('text')).$$('tspan').get(0).getText()];
                case 3:
                    name_1 = _c.sent();
                    protractor_1.browser.actions().click().perform();
                    protractor_1.browser.sleep(5000);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.browser.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))));
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.browser.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))];
                        }); }); })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))).perform()];
                case 5:
                    _c.sent();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('.arrow-cursor.selectedAsset').element(protractor_1.by.model('asset.Asset')).$('.ng-binding').getText()];
                case 6:
                    val = _c.sent();
                    expect(name_1 === val).toBe(true);
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTreeController).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController.getText()];
                case 7: 
                // console.log(await appTitle.assetList(appTitle.assetNav.motherList));
                // $$('[ng-model="asset.Asset"]').get((await $$('[ng-model="asset.Asset"]').getText())
                //   .indexOf('Clinton WTP'))
                //   .click();
                // console.log((await appTitle.dataExplorerNavElemSelector.assetTreeController.getText()).indexOf('Kansas River WWTP'));
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('Kansas River WWTP') + 2])
                        .click()];
                case 8:
                    // console.log(await appTitle.assetList(appTitle.assetNav.motherList));
                    // $$('[ng-model="asset.Asset"]').get((await $$('[ng-model="asset.Asset"]').getText())
                    //   .indexOf('Clinton WTP'))
                    //   .click();
                    // console.log((await appTitle.dataExplorerNavElemSelector.assetTreeController.getText()).indexOf('Kansas River WWTP'));
                    // tslint:disable-next-line:max-line-length
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    _c.label = 9;
                case 9:
                    y++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Navigate to child asset with no $, energy, and/or chemical usage', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, haveChemical;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = protractor_1.$$('[ng-repeat="assetNode in asset.children"]')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="assetNode in asset.children"]').getText()];
                case 1:
                    _b.apply(_a, [(_c.sent())
                            .indexOf('Intake Pump Station')])
                        .click();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!vm.loading && !vm.haveChemicals"]').isPresent()];
                case 2:
                    if (!_c.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!vm.loading && !vm.haveChemicals"]').last().getText()];
                case 3:
                    haveChemical = _c.sent();
                    expect(haveChemical).toEqual('NO\nCHEMICAL USAGE');
                    return [3 /*break*/, 5];
                case 4:
                    expect(true);
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Verify donuts replaced with "no ___ usage" and legend responds appropriately ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, haveEnergies;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_g.sent()).indexOf('Water Treatment Plants (WTP)')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_g.sent()).indexOf('Clinton WTP')])
                        .click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    _f = (_e = protractor_1.$$('[ng-repeat="assetNode in asset.children"]')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-repeat="assetNode in asset.children"]').getText()];
                case 5:
                    _f.apply(_e, [(_g.sent())
                            .indexOf('CO2 System')])
                        .click();
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && !wpaVM.haveEnergies"]').isPresent()];
                case 6:
                    if (!_g.sent()) return [3 /*break*/, 8];
                    return [4 /*yield*/, protractor_1.$$('[ng-show="!wpaVM.loading && !wpaVM.haveEnergies"]').last().getText()];
                case 7:
                    haveEnergies = _g.sent();
                    expect(haveEnergies).toEqual('NO\nENERGY USAGE\nBY ASSET');
                    return [3 /*break*/, 9];
                case 8:
                    expect(true);
                    _g.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec08_performanceAnalyst-Water.e2e-spec.js.map