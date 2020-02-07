"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19594: Performance Analyst - Map', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var categoryName, categoryList, priorClearFilter, afterClearFilter, slider;
    beforeAll((function () {
        var EC = protractor_1.protractor.ExpectedConditions;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        protractor_1.browser.manage().timeouts().setScriptTimeout(600000);
        appTitle.open();
        appTitle.fillLoginForm();
        appTitle.confirmLogin();
        protractor_1.browser.waitForAngular();
        protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
        expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
        protractor_1.browser.driver.sleep(5000);
    }));
    it('Step 1: Ensure map is loading.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var _this = this;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_j.sent()).indexOf('Demo Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    _j.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_j.sent()).indexOf('Coal Plants')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_j.sent()).indexOf('Eastern Station')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_j.sent()).indexOf('Eastern PC1')])
                        .click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _j.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(appTitle.PAMap.Rastemap), 10000);
                            return [2 /*return*/, appTitle.PAMap.Rastemap];
                        });
                    }); });
                    expect(appTitle.PAMap.Rastemap.isDisplayed()).toBe(true);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(3000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify Raster map. Make sure it should not take more than 10 seconds.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 0);
            // browser.waitForAngular();
            protractor_1.browser.sleep(3000);
            expect(appTitle.PAMap.Rastemap.isPresent()).toBe(true, 'Map was not loaded successfully');
            return [2 /*return*/];
        });
    }); });
    it('Step 3: Verify GeoVis map.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 2);
            protractor_1.browser.waitForAngular();
            expect(appTitle.PAMap.GeoVismap.isPresent()).toBe(true, 'Map was not loaded successfully');
            return [2 /*return*/];
        });
    }); });
    it('Step 4: Verify GeoSpa map.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_e.sent()).indexOf('SEKOIA Demo Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 2:
                    _e.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 3: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_e.sent()).indexOf('UGM Historical Reliability Plan')])
                        .click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _e.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 1);
                    protractor_1.browser.waitForAngular();
                    expect(appTitle.PAMap.GeoSpaMap.isPresent()).toBe(true, 'Map was not loaded successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Ensure user is able to select different maps from drop down list.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, dx, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 0);
                    // tslint:disable-next-line:max-line-length
                    _a = expect;
                    return [4 /*yield*/, appTitle.PAMap.selectDiffmap.$('option:checked').getText()];
                case 1:
                    // tslint:disable-next-line:max-line-length
                    _a.apply(void 0, [_c.sent()]).toEqual(validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan[1]);
                    dx = 1;
                    _c.label = 2;
                case 2:
                    if (!(dx < validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan.length)) return [3 /*break*/, 5];
                    // tslint:disable-next-line:max-line-length
                    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
                    // tslint:disable-next-line:max-line-length
                    _b = expect;
                    return [4 /*yield*/, appTitle.PAMap.selectDiffmap.$('option:checked').getText()];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(void 0, [_c.sent()]).toEqual(validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan[dx]); // this test passes in chrome but fails in phantomjs
                    _c.label = 4;
                case 4:
                    dx++;
                    return [3 /*break*/, 2];
                case 5:
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Ensure multi select & single select of asset on map is working.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, x, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTreeController).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_g.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _g.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    protractor_1.browser.sleep(3000);
                    // ** Ensure single select of asset on may is working */
                    protractor_1.browser.actions().click(appTitle.PAMap.mapCircle.get(3)).perform();
                    _c = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayXpanded.isPresent()];
                case 3:
                    _c.apply(void 0, [_g.sent()]).toBe(true, 'single select of asset on map is not working');
                    _d = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayTabSelected.isPresent()];
                case 4:
                    _d.apply(void 0, [_g.sent()]).toBe(true, 'single select of asset on map is not working');
                    // ** Ensure multiple select of asset on may is working */
                    protractor_1.browser.actions().click(appTitle.PAMap.multiSelectBtn).perform();
                    for (x = 4; x <= 7; x++) {
                        protractor_1.browser.actions().click(appTitle.PAMap.mapCircle.get(x)).perform();
                    }
                    // tslint:disable-next-line:max-line-length
                    _e = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayXpanded.isPresent()];
                case 5:
                    // tslint:disable-next-line:max-line-length
                    _e.apply(void 0, [_g.sent()]).toBe(true, 'multiple select of asset on map is not working');
                    // tslint:disable-next-line:max-line-length
                    _f = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayHidden.isPresent()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _f.apply(void 0, [_g.sent()]).toBe(true, 'multiple select of asset on map is not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 7: Ensure apply simple filter feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetNameMap, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    appTitle.PAMap.clearAsset.click();
                    protractor_1.browser.actions().mouseMove(appTitle.PAMap.mapCircle.get(3)).perform();
                    return [4 /*yield*/, appTitle.PAMap.mapAssetHover.$$('[class="ng-binding"]').first().getText()];
                case 1:
                    assetNameMap = _c.sent();
                    appTitle.PAMap.mapFilterBtn.click();
                    appTitle.PAMap.mapAssetSearchBox.clear();
                    appTitle.PAMap.mapAssetSearchBox.sendKeys('asset=' + assetNameMap + '*');
                    appTitle.PAMap.mapAssetSearchBtn.click();
                    protractor_1.browser.actions().click(appTitle.PAMap.mapCircle.get(0)).perform();
                    _a = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayXpanded.isPresent()];
                case 2:
                    _a.apply(void 0, [_c.sent()]).toBe(true, 'single select of asset on map is not working');
                    _b = expect;
                    return [4 /*yield*/, appTitle.PAMap.mapAttrTrayTabSelected.isPresent()];
                case 3:
                    _b.apply(void 0, [_c.sent()]).toBe(true, 'single select of asset on map is not working');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 8: Ensure user is able to save a new search in map.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            protractor_1.browser.waitForAngular();
            appTitle.PAMap.clearAsset.click();
            appTitle.PAMap.saveSearchAsset.click();
            expect(appTitle.PAMap.assetCategoryTextbox.isPresent()).toBe(true, 'Save Quick Modal does not show');
            expect(appTitle.PAMap.quickSearchSavebtn.isPresent()).toBe(true, 'Save Quick Modal does not show');
            protractor_1.browser.waitForAngular();
            return [2 /*return*/];
        });
    }); });
    it('Step 9: Ensure save new search with adding a category.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    categoryName = appTitle.makeid(11);
                    appTitle.PAMap.assetCategoryTextbox.clear();
                    appTitle.PAMap.assetCategoryTextbox.sendKeys(categoryName);
                    appTitle.PAMap.categoryAddBtn.click();
                    appTitle.PAMap.saveQuickSearchVmName.clear();
                    appTitle.PAMap.saveQuickSearchVmName.sendKeys(appTitle.makeid(11));
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, appTitle.PAMap.expandCategoryPane.getText()];
                case 1:
                    categoryList = _a.sent();
                    // console.log(categoryList.indexOf(categoryName));
                    // console.log(await appTitle.PAMap.expandCategoryPane.get(await categoryList.indexOf(categoryName)));
                    expect(categoryList.indexOf(categoryName) > -1).toBe(true, 'category was not added');
                    expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(false, 'Public caterogy is not default');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 10: Ensure Public & private new search save feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            protractor_1.browser.waitForAngular();
            appTitle.PAMap.saveQuickSearchVmisPublic.click();
            expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(true, 'Unable to make caterogy private');
            appTitle.PAMap.saveQuickSearchVmisPublic.click();
            expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(false, 'Unable to make caterogy public');
            protractor_1.browser.waitForAngular();
            return [2 /*return*/];
        });
    }); });
    it('Step 11: Ensure Clear feature in apply filter.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    appTitle.PAMap.saveQuickSearchVmOKBtn.click();
                    return [4 /*yield*/, appTitle.PAMap.mapCircle.count()];
                case 1:
                    priorClearFilter = _a.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.PAMap.clearSearchBtn.click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.PAMap.mapCircle.count()];
                case 2:
                    afterClearFilter = _a.sent();
                    expect(priorClearFilter !== afterClearFilter).toBe(true, 'clearing filter was not work');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 12: Verify advanced filter feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 1: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('UGM Historical Reliability Plan')])
                        .click()];
                case 2:
                    // tslint:disable-next-line:max-line-length
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    protractor_1.browser.waitForAngular();
                    // appTitle.PAMap.mapFilterBtn.click();
                    appTitle.PAMap.advancedSettings.click();
                    expect(appTitle.PAMap.advanceSettingMap.isDisplayed()).toBe(true, 'advance search was not working');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 13: Verify base maps.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var map, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    appTitle.PAMap.mapFilterBtn.click();
                    protractor_1.browser.actions().mouseMove(appTitle.PAMap.basemapWrapTriggerTab.first()).perform();
                    map = 0;
                    _c.label = 1;
                case 1:
                    _a = map;
                    return [4 /*yield*/, appTitle.PAMap.basemapWrapImageBtn.count()];
                case 2:
                    if (!(_a <= (_c.sent()) - 1)) return [3 /*break*/, 5];
                    protractor_1.browser.waitForAngular();
                    appTitle.PAMap.basemapWrapImageBtn.get(map).click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(2000);
                    // tslint:disable-next-line:max-line-length
                    _b = expect;
                    return [4 /*yield*/, protractor_1.$('[id="geoSpa"]').getAttribute('data-basemap')];
                case 3:
                    // tslint:disable-next-line:max-line-length
                    _b.apply(void 0, [(_c.sent()) === validator.basemapWrap[map]]).toBe(true, 'Map does not match with the expected map name');
                    _c.label = 4;
                case 4:
                    map++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('Step 14: Ensure map is loading with respect to time slider.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var target, elem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    slider = protractor_1.element(protractor_1.by.id('navIndicatorHandle'));
                    protractor_1.browser.actions().dragAndDrop(slider, { x: 100, y: 0 }).mouseUp().perform();
                    protractor_1.browser.waitForAngular();
                    target = protractor_1.$('[id="navIndicatorDate"]');
                    elem = protractor_1.$('[id="navIndicatorHandle"]');
                    return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 15: Ensure Jump to feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var presentDate, _a, _b, afterDate;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.$('[id="navIndicatorDate"]').getAttribute('textContent')];
                case 1:
                    presentDate = _c.sent();
                    protractor_1.$('#quicksearch > div.btn-group.dropup > button').click();
                    protractor_1.browser.driver.sleep(2000);
                    expect(protractor_1.$('[class="btn-group dropup open"]').isDisplayed()).toBe(true, 'Jump to feature is not working');
                    _b = (_a = protractor_1.$$('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]')).get;
                    return [4 /*yield*/, protractor_1.$$('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]')
                            .getText()];
                case 2: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('Last Month')])
                        .click()];
                case 3:
                    _c.sent();
                    protractor_1.browser.driver.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('[id="navIndicatorDate"]').getAttribute('textContent')];
                case 4:
                    afterDate = _c.sent();
                    expect(presentDate !== afterDate).toBe(true, 'Jump feature is not working');
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 16: Verify zoom in & zoom out feature.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetTreeController).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf('All Clients')])
                        .click()];
                case 2:
                    _c.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.verifyZoomInAndZoomOutInMap()];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec28_performanceAnalyst-Map.e2e-spec.js.map