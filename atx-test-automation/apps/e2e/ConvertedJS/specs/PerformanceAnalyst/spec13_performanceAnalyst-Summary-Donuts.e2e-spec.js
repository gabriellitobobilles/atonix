"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('19592: Performance Analyst - Summary - Donuts', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
    var highcharts_legend_item, highcharts_legend;
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
    it('Step 1: Verify Donut for All Clients->City of Lawrence->Waste Water Treatment Plants->WWTP->WWTP', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, name, val, assetLanding, i, i, _o, _p, _q, _r;
        var _this = this;
        return tslib_1.__generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    protractor_1.browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
                    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
                    protractor_1.browser.driver.sleep(5000);
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_s.sent()).indexOf('All Clients')])];
                case 2:
                    _s.sent();
                    protractor_1.browser.waitForAngular();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 3: return [4 /*yield*/, _d.apply(_c, [(_s.sent()).indexOf('All Clients')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    _s.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_s.sent()).indexOf('City Of Lawrence')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_s.sent()).indexOf('Waste Water Treatment Plants (WWTP)')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _k = (_j = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 9: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _k.apply(_j, [(_s.sent()).indexOf('Kansas River WWTP')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 10:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    _m = (_l = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 11: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _m.apply(_l, [(_s.sent()).indexOf('Kansas River WWTP')])
                        .click()];
                case 12:
                    // tslint:disable-next-line:max-line-length
                    _s.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.sleep(2000);
                    // tslint:disable-next-line:no-shadowed-variable
                    protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-0')).get(0)).perform();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.$('.highcharts-tooltip')));
                    protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, protractor_1.$('.highcharts-tooltip')];
                    }); }); });
                    return [4 /*yield*/, protractor_1.$('.highcharts-tooltip').element(protractor_1.by.tagName('text')).$$('tspan').get(0).getText()];
                case 13:
                    name = _s.sent();
                    protractor_1.browser.actions().click().perform();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.wait(EC.presenceOf(protractor_1.browser.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))));
                    protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, protractor_1.browser.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))];
                    }); }); });
                    protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('.arrow-cursor.selectedAsset'))).perform();
                    protractor_1.browser.sleep(2000);
                    return [4 /*yield*/, protractor_1.$('.arrow-cursor.selectedAsset').element(protractor_1.by.model('asset.Asset')).$('.ng-binding').getText()];
                case 14:
                    val = _s.sent();
                    console.log('the val of value is: ' + val);
                    console.log('the name of value is: ' + name);
                    expect(name === val).toBe(true);
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController.getText()];
                case 15:
                    assetLanding = _s.sent();
                    // tslint:disable-next-line:max-line-length
                    appTitle.dataExplorerNavElemSelector.assetTreeController.get(assetLanding.indexOf('Kansas River WWTP') + 2)
                        .click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(4)];
                case 16:
                    highcharts_legend_item = _s.sent();
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(4)];
                case 17:
                    highcharts_legend = _s.sent();
                    if (highcharts_legend.indexOf('\nUser Notes') > 1 || highcharts_legend.indexOf('\nAll Annotations') > 1) {
                        for (i = 0; i <= highcharts_legend_item - 3; ++i) {
                            protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                            // tslint:disable-next-line:max-line-length
                            expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                        }
                    }
                    else {
                        for (i = 0; i <= highcharts_legend_item - 1; ++i) {
                            protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                            // tslint:disable-next-line:max-line-length
                            expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                        }
                    }
                    expect(protractor_1.$('g.highcharts-shadow')).toBeTruthy();
                    _o = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').first().getText()];
                case 18:
                    _o.apply(void 0, [_s.sent()]).toBe('by Asset');
                    _p = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(1).getText()];
                case 19:
                    _p.apply(void 0, [_s.sent()]).toBe('by Source');
                    _q = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(2).getText()];
                case 20:
                    _q.apply(void 0, [_s.sent()]).toBe('by Asset');
                    _r = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(3).getText()];
                case 21:
                    _r.apply(void 0, [_s.sent()]).toBe('by Source');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify Donut for All Clients->Omaha MUD->Florence WTP', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetLanding1, dateStart, dateEnd;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 1:
                    assetLanding1 = _a.sent();
                    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding1.indexOf('Omaha MUD'))
                        .$('[class="fa fa-caret-right"]').click();
                    // tslint:disable-next-line:max-line-length
                    // await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Water Treatment Plants'))
                    //   .click();
                    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding1.indexOf('Water Treatment Plants'))
                        .click();
                    protractor_1.$$('[ng-click="vm.selectView(view)"]').get(0).click();
                    protractor_1.browser.waitForAngular();
                    appTitle.selectTimeSlider.calendarIcon.click();
                    appTitle.selectTimeSlider.calendarIconStart.click();
                    dateStart = new Date('07/01/2016');
                    appTitle.selectCalendarMonthYear(dateStart);
                    appTitle.selectTimeSlider.calendarIconEnd.click();
                    dateEnd = new Date('12/30/2016');
                    appTitle.selectCalendarMonthYear(dateEnd);
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 2:
                    highcharts_legend_item = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-line-length
    it('Step 3: Verify the donuts along with its charts, data for All Clients->Omaha MUD->Water Treatment Plants->Florence WTP with Time frame -Q3-Q4-2016', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetLanding2, dateStart, dateEnd, i, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 1:
                    assetLanding2 = _e.sent();
                    // tslint:disable-next-line:max-line-length
                    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding2.indexOf('Water Treatment Plants'))
                        .$('[class="fa fa-caret-right"]').click();
                    // tslint:disable-next-line:max-line-length
                    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding2.indexOf('Florence WTP'))
                        .click();
                    protractor_1.$$('[ng-click="vm.selectView(view)"]').first().click();
                    appTitle.trendSelector();
                    // browser.driver.wait(async () => {
                    //   browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
                    //   return appTitle.chartDropDown.chartDropDownBtn;
                    // });
                    // appTitle.chartDropDown.chartDropDownBtn.click();
                    protractor_1.browser.sleep(3000);
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('chartSummary in chartVM.charts')).get(3).click()];
                case 2:
                    _e.sent();
                    protractor_1.browser.waitForAngular();
                    appTitle.selectTimeSlider.calendarIcon.click();
                    appTitle.selectTimeSlider.calendarIconStart.click();
                    dateStart = new Date('07/01/2016');
                    appTitle.selectCalendarMonthYear(dateStart);
                    appTitle.selectTimeSlider.calendarIconEnd.click();
                    dateEnd = new Date('12/30/2016');
                    appTitle.selectCalendarMonthYear(dateEnd);
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.$$('[ng-click="vm.selectView(view)"]').first().click();
                    return [4 /*yield*/, appTitle.getNumberHighchartsVMLegendItem(0)];
                case 3:
                    highcharts_legend_item = _e.sent();
                    for (i = 0; i <= highcharts_legend_item - 1; ++i) {
                        protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
                        // tslint:disable-next-line:max-line-length
                        expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    }
                    expect(protractor_1.$('g.highcharts-shadow')).toBeTruthy();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').first().getText()];
                case 4:
                    _a.apply(void 0, [_e.sent()]).not.toEqual(null);
                    _b = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(1).getText()];
                case 5:
                    _b.apply(void 0, [_e.sent()]).not.toEqual(null);
                    _c = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(2).getText()];
                case 6:
                    _c.apply(void 0, [_e.sent()]).not.toEqual(null);
                    _d = expect;
                    return [4 /*yield*/, protractor_1.$$('text.highcharts-title').get(3).getText()];
                case 7:
                    _d.apply(void 0, [_e.sent()]).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 4: Ensure add annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetLanding3, dateStart, dateEnd, annotationDate, trendIndex, x, x, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController
                        .getText()];
                case 1:
                    assetLanding3 = _b.sent();
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTreeController.get(assetLanding3.indexOf('All Clients'))
                            .click()];
                case 2:
                    _b.sent();
                    // $$('[ng-click="vm.selectView(view)"]').first().click();
                    return [4 /*yield*/, appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary)];
                case 3:
                    // $$('[ng-click="vm.selectView(view)"]').first().click();
                    _b.sent();
                    // ** Setting  Date Range on the calendar*/
                    appTitle.selectTimeSlider.calendarIcon.click();
                    appTitle.selectTimeSlider.calendarIconStart.click();
                    dateStart = new Date(new Date().setDate(new Date().getDate() - 30));
                    appTitle.selectCalendarMonthYear(dateStart);
                    appTitle.selectTimeSlider.calendarIconEnd.click();
                    dateEnd = new Date(new Date().setDate(new Date().getDate()));
                    appTitle.selectCalendarMonthYear(dateEnd);
                    appTitle.selectTimeSlider.calendarApplybtn.first().click();
                    appTitle.selectTimeSlider.calendarOKBtn.first().click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    // $$('[ng-click="vm.selectView(view)"]').first().click();
                    return [4 /*yield*/, appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary)];
                case 4:
                    // $$('[ng-click="vm.selectView(view)"]').first().click();
                    _b.sent();
                    protractor_1.browser.sleep(3000);
                    appTitle.trendSelector();
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    return [4 /*yield*/, appTitle.selectingPerformanceAnalystTrends('ALL BCP FILTER DP')];
                case 5:
                    // await appTitle.chartDropDown.chartDropDownBtn.click();
                    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
                    _b.sent();
                    // await element.all(by.repeater('chartSummary in chartVM.charts')).get(2).click();
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    // ** Create annotation */
                    protractor_1.browser.sleep(3000);
                    appTitle.atonixTrendButtons.annotationBtn.first().click();
                    appTitle.annotationModal.annotationNotes.sendKeys('Test Annotation');
                    appTitle.annotationModal.annotationCalendarIcon.click();
                    annotationDate = new Date(new Date().setDate(new Date().getDate() - 3));
                    appTitle.selectCalendarMonthYear(annotationDate);
                    appTitle.annotationModal.editAnnotationOkbtn.click();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, appTitle.getListHighchartsVMLegendItem(3)];
                case 6:
                    trendIndex = _b.sent();
                    x = 0;
                    _b.label = 7;
                case 7:
                    if (!(x <= trendIndex.length - 3)) return [3 /*break*/, 10];
                    return [4 /*yield*/, protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click()];
                case 8:
                    _b.sent();
                    // tslint:disable-next-line:max-line-length
                    expect(protractor_1.$('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
                    _b.label = 9;
                case 9:
                    x++;
                    return [3 /*break*/, 7];
                case 10:
                    x = 0;
                    _b.label = 11;
                case 11:
                    _a = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').count()];
                case 12:
                    if (!(_a <= (_b.sent()) - 1)) return [3 /*break*/, 15];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
                    return [4 /*yield*/, protractor_1.$('.highcharts-point-hover').isPresent()];
                case 13:
                    if (_b.sent()) {
                        protractor_1.browser.sleep(2000);
                        expect(protractor_1.$('.highcharts-point-hover').isPresent()).toBeTruthy();
                        return [3 /*break*/, 15];
                    }
                    _b.label = 14;
                case 14:
                    x++;
                    return [3 /*break*/, 11];
                case 15: return [2 /*return*/];
            }
        });
    }); });
    it('Step 5: Ensure edit annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var x, _a, dateStart;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = 0;
                    _b.label = 1;
                case 1:
                    _a = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').count()];
                case 2:
                    if (!(_a <= (_b.sent()) - 1)) return [3 /*break*/, 5];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
                    return [4 /*yield*/, protractor_1.$('.highcharts-point-hover').isPresent()];
                case 3:
                    if (_b.sent()) {
                        protractor_1.browser.sleep(2000);
                        expect(protractor_1.$('.highcharts-point-hover').isPresent()).toBeTruthy();
                        return [3 /*break*/, 5];
                    }
                    _b.label = 4;
                case 4:
                    x++;
                    return [3 /*break*/, 1];
                case 5:
                    protractor_1.$('.highcharts-point-hover').click();
                    // $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
                    appTitle.annotation.editAnnotation.click();
                    expect(appTitle.annotationModal.annotationNotes.isPresent()).toBe(true, 'edit annotatoion modal does not exist');
                    appTitle.annotationModal.annotationCalendarIcon.click();
                    dateStart = new Date(new Date().setDate(new Date().getDate() - 3));
                    appTitle.selectCalendarMonthYear(dateStart);
                    appTitle.annotationModal.annotationNotes.clear();
                    appTitle.annotationModal.annotationNotes.sendKeys('test2');
                    appTitle.annotationModal.editAnnotationOkbtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Step 6: Ensure delete annotation feature of trends.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var x, _a, x, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // ** delete  annotation */
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(EC.stalenessOf(protractor_1.$('[class="chart-warning"]')));
                    x = 0;
                    _c.label = 1;
                case 1:
                    _a = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').count()];
                case 2:
                    if (!(_a <= (_c.sent()) - 1)) return [3 /*break*/, 5];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
                    return [4 /*yield*/, protractor_1.$('.highcharts-point-hover').isPresent()];
                case 3:
                    if (_c.sent()) {
                        protractor_1.browser.sleep(2000);
                        expect(protractor_1.$('.highcharts-point-hover').isPresent()).toBeTruthy();
                        return [3 /*break*/, 5];
                    }
                    _c.label = 4;
                case 4:
                    x++;
                    return [3 /*break*/, 1];
                case 5:
                    protractor_1.browser.sleep(2000);
                    protractor_1.$('.highcharts-point-hover').click();
                    // $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
                    appTitle.annotation.deleteAnnotation.click();
                    x = 0;
                    _c.label = 6;
                case 6:
                    _b = x;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').count()];
                case 7:
                    if (!(_b <= (_c.sent()) - 1)) return [3 /*break*/, 10];
                    // tslint:disable-next-line:max-line-length
                    protractor_1.browser.driver.actions().mouseMove(protractor_1.$$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
                    return [4 /*yield*/, protractor_1.$('.highcharts-point-hover').isPresent()];
                case 8:
                    if (!(_c.sent())) {
                        protractor_1.browser.sleep(2000);
                        expect(protractor_1.$('.highcharts-point-hover').isPresent()).toBe(false, 'Annotation was not successfully deleted');
                        return [3 /*break*/, 10];
                    }
                    _c.label = 9;
                case 9:
                    x++;
                    return [3 /*break*/, 6];
                case 10: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec13_performanceAnalyst-Summary-Donuts.e2e-spec.js.map