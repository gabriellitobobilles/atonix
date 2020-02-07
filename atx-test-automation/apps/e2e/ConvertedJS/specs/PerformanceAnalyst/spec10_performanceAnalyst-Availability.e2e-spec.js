"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
// tslint:disable-next-line:semicolon
describe('19589: Performance Analyst - Availability', function () {
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
    it('Step 1: Verify the donuts with its data with respective to its specific color.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, i, name_1, name_2;
        var _this = this;
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
                return [4 /*yield*/, _d.apply(_c, [(_l.sent()).indexOf('APS')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 4:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 5: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_l.sent()).indexOf('Gila Bend')])
                        .$('[class="fa fa-caret-right"]').click()];
                case 6:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    _h = (_g = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 7: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _h.apply(_g, [(_l.sent()).indexOf('Gila Bend Solar PV')])
                        .click()];
                case 8:
                    // tslint:disable-next-line:max-line-length
                    _l.sent();
                    // appTitle.selectClientMain('All Clients', ['APS', 'Gila Bend', 'Gila Bend Solar PV'],
                    //   appName.performanceAnalyst);
                    // $$('[ng-click="vm.selectView(view)"]').get(8).click();
                    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.availability);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.driver.sleep(3000);
                    /* Check if the valuess are not null */
                    _j = expect;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-subtitle"]').get(1).getText()];
                case 9:
                    /* Check if the valuess are not null */
                    _j.apply(void 0, [_l.sent()]).not.toEqual(null);
                    /* Check if the valuess are not empty */
                    _k = expect;
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-subtitle"]').get(1).getText()];
                case 10:
                    /* Check if the valuess are not empty */
                    _k.apply(void 0, [_l.sent()]).not.toBe('');
                    i = 10;
                    _l.label = 11;
                case 11:
                    if (!(i >= 0)) return [3 /*break*/, 20];
                    if (!(i === 1)) return [3 /*break*/, 15];
                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-' + i + ' '))
                            .get(1)).perform()];
                case 12:
                    _l.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.$$('.highcharts-tooltip').first()];
                        }); }); })];
                case 13:
                    _l.sent();
                    return [4 /*yield*/, protractor_1.$$('.highcharts-tooltip').first().element(protractor_1.by.tagName('text')).$$('tspan').get(3).getText()];
                case 14:
                    name_1 = _l.sent();
                    // console.log(name);
                    expect(name_1).not.toBe('');
                    expect(name_1).not.toEqual(null);
                    i--;
                    return [3 /*break*/, 19];
                case 15: return [4 /*yield*/, protractor_1.browser.actions().mouseMove(protractor_1.element.all(protractor_1.by.css('path.highcharts-point.highcharts-color-' + i + ' '))
                        .get(0)).perform()];
                case 16:
                    _l.sent();
                    protractor_1.browser.sleep(1000);
                    return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.$$('.highcharts-tooltip').first()];
                        }); }); })];
                case 17:
                    _l.sent();
                    return [4 /*yield*/, protractor_1.$$('.highcharts-tooltip').first().element(protractor_1.by.tagName('text')).$$('tspan').get(3).getText()];
                case 18:
                    name_2 = _l.sent();
                    // console.log(name);
                    expect(name_2).not.toBe('');
                    expect(name_2).not.toEqual(null);
                    i--;
                    _l.label = 19;
                case 19: return [3 /*break*/, 11];
                case 20: return [2 /*return*/];
            }
        });
    }); });
    it('Step 2: Verify Event Category Log.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            /** Check that event category is present */
            expect(protractor_1.$('[ng-click="vm.addOutageEvent()"]').isPresent()).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('Step 3: Ensure user is able to add and delete outage event.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var eventCategoryLogCount, eventCount, x, eventCategoryLogCountx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Adding and Delete Event category log */
                    protractor_1.$('[ng-click="vm.addOutageEvent()"]').click();
                    protractor_1.browser.waitForAngular();
                    expect(protractor_1.$('[ng-click="OK()"]').isPresent()).toBeTruthy();
                    protractor_1.$('[ng-click="OK()"]').click();
                    protractor_1.browser.wait(EC.visibilityOf(protractor_1.$$('[ng-repeat="event in vm.eventCategoryLog"]').first()));
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('event in vm.eventCategoryLog')).count()];
                case 1:
                    eventCategoryLogCount = _a.sent();
                    expect(eventCategoryLogCount).toBeGreaterThan(0);
                    return [4 /*yield*/, protractor_1.$$('[class="highcharts-subtitle"]').last().getText()];
                case 2:
                    eventCount = _a.sent();
                    // console.log(eventCount);
                    // tslint:disable-next-line:radix
                    expect(parseInt(eventCount) === eventCategoryLogCount).toBe(true, 'Event Category log should be equal in number with Event Count');
                    expect(protractor_1.$$('[ng-repeat="event in vm.eventCategoryLog"]').first().isPresent()).toBeTruthy();
                    x = eventCategoryLogCount - 1;
                    _a.label = 3;
                case 3:
                    if (!(x >= 0)) return [3 /*break*/, 6];
                    // console.log(x);
                    return [4 /*yield*/, protractor_1.$$('[ng-click="vm.deleteOutageEvent(event)"]').get(x).click()];
                case 4:
                    // console.log(x);
                    _a.sent();
                    _a.label = 5;
                case 5:
                    --x;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, protractor_1.element.all(protractor_1.by.repeater('event in vm.eventCategoryLog')).count()];
                case 7:
                    eventCategoryLogCountx = _a.sent();
                    expect(eventCategoryLogCountx).not.toBeGreaterThan(0);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec10_performanceAnalyst-Availability.e2e-spec.js.map