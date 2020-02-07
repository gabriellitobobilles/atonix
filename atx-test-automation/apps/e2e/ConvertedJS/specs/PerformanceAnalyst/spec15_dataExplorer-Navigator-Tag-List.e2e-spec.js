"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
var testDetails_data_1 = require("../../helpers/testDetails.data");
describe('19602: Data Explorer - Navigator - Tag List', function () {
    var appTitle = new performanceHelper_po_1.helper();
    // tslint:disable-next-line:one-variable-per-declaration
    var win, elem, target, divs, trendName;
    var EC = protractor_1.protractor.ExpectedConditions;
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
    it('step 1: Expand Nodes until scroll bar displays', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.sleep(5000);
                    appTitle.waitingForPieChartToLoad();
                    appTitle.DispatchChart.EditChartBtn.first().click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 1:
                    win = _a.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 2: Select Asset - Verify timing is normal', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            protractor_1.$('#panewest > panewest > div > ul > li:nth-child(2) > a').click(); // Clicking Task List tab
            // tslint:disable-next-line:max-line-length
            elem = protractor_1.$$('[class="draggableTag ng-pristine ng-untouched ng-valid ng-scope ui-draggable ui-draggable-handle ng-not-empty selectedTag"]').first(); // asset table
            target = protractor_1.$('[id="CEChartContainer"]'); // chart container
            divs = protractor_1.element.all(protractor_1.by.repeater('map in vm.maps'));
            return [2 /*return*/];
        });
    }); });
    it('step 3: Search Assets', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // ** Search Asset*//
                // await appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.assetFilter, 'Brewery');
                return [4 /*yield*/, appTitle.dataExplorerNavigator.assetFilter.click()];
                case 1:
                    // ** Search Asset*//
                    // await appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.assetFilter, 'Brewery');
                    _a.sent();
                    protractor_1.browser.sleep(200);
                    appTitle.dataExplorerNavigator.assetFilter.sendKeys('AQC System');
                    // browser.sleep(5000);
                    // appTitle.dataExplorerNavigator.variableFilter.click();
                    protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(divs), 5000, 'Element taking too long to appear in the DOM');
                    expect(divs).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 4: Drag tags to chart', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var desc, highChartLegenItemList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Create second  trend and verify that it won't another trend with the same name */
                    trendName = appTitle.makeid(11);
                    appTitle.atonixTrendButtons.nameDropdown.click();
                    appTitle.atonixCreateCharts.createNewChartBtn.click();
                    appTitle.atonixTrendButtons.saveBtn.click();
                    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
                    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
                    appTitle.atonixSaveTrendDefinition.saveBtn.click();
                    // ** Drag tags to chart*//
                    return [4 /*yield*/, divs.get(0).click()];
                case 1:
                    // ** Drag tags to chart*//
                    _a.sent();
                    return [4 /*yield*/, divs.get(0).$$('[class="tagCell ng-binding"]').get(3).getText()];
                case 2:
                    desc = _a.sent();
                    protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.$$('g.highcharts-legend-item').get(0).element(protractor_1.by.tagName('text'))
                            .element(protractor_1.by.tagName('tspan')).getText()];
                case 3:
                    highChartLegenItemList = _a.sent();
                    // const highChartLegenItemList = await appTitle.getListHighchartsVMLegendItem(0);
                    expect(highChartLegenItemList.indexOf(desc) === 0).toBe(true, 'Error, Design Curve was not created successfully');
                    appTitle.trendSelector();
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    appTitle.deletingDataExplorerTrends(trendName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 5: Change Asset filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // ** Change Asset filter*//
            protractor_1.$('[ng-click="vm.tagAssetFilterToggle()"]').click();
            appTitle.selectClientMain('All Clients', ['City Of Lawrence', 'Waste Water Treatment Plants (WWTP)',
                'Kansas River WWTP', 'Kansas River WWTP'], testDetails_data_1.appName.performanceAnalyst);
            return [2 /*return*/];
        });
    }); });
    it('step 6: Filter by each column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // ** Filter by each column*//
            appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.assetFilter, 'Kansas River WWTP');
            appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.variableFilter, 'Energy Usage');
            appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.nameFilter, 'Energy Cost|Hourly per MG');
            appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.descFilter, 'Kansas River WWTP Hourly');
            appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.unitFilter, 'US MMGPD');
            return [2 /*return*/];
        });
    }); });
    it('step 7: Drag single tags to chart', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ** Drag single tags to chart*//
                    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.unitFilter, 'US MMGPD');
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, divs.get(0).click()];
                case 1:
                    _a.sent();
                    protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
                    return [2 /*return*/];
            }
        });
    }); });
    it('step 8: Drag multiple tags onto chart at once (multiselect)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var i;
        return tslib_1.__generator(this, function (_a) {
            // ** Drag multiple tags onto chart at once (multiselect)*//
            for (i = 1; i < 4; i++) {
                protractor_1.browser.sleep(3000);
                protractor_1.browser.actions()
                    .keyDown(protractor_1.protractor.Key.CONTROL)
                    .mouseMove(divs.get(i))
                    .click()
                    .perform();
            }
            protractor_1.browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
            protractor_1.browser.waitForAngular();
            expect(target).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=spec15_dataExplorer-Navigator-Tag-List.e2e-spec.js.map