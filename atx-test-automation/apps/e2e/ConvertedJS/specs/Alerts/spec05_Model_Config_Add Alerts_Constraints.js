"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Alerts: Model Config Add Contraints', function () {
    var appTitle = new performanceHelper_po_1.helper();
    var alerthelper = new performanceHelper_po_1.alert();
    var EC = protractor_1.protractor.ExpectedConditions;
    // tslint:disable-next-line:one-variable-per-declaration
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
    it('Verify the duration drop down displays only: seconds, minutes and hour.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()), 700000, 'Element taking too long to appear in the DOM');
                    return [4 /*yield*/, alerthelper.rightClickingModelName(validator.alertScreeningViewTestData.siitest)];
                case 1:
                    _g.sent();
                    alerthelper.alertScreeningView.modelConfiguration.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _g.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _g.sent();
                    protractor_1.browser.waitForAngular();
                    _b = (_a = appTitle.dataExplorerNavElemSelector.assetNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetNodeTree
                            .getText()];
                case 4: return [4 /*yield*/, _b.apply(_a, [(_g.sent()).indexOf('Demo Clients')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 5:
                    _g.sent();
                    _d = (_c = appTitle.dataExplorerNavElemSelector.assetChildNodeTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()];
                case 6: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _d.apply(_c, [(_g.sent()).indexOf('Coal Plants')])
                        .$('[class="arrow-cursor fa fa-caret-right"]').click()];
                case 7:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    _f = (_e = appTitle.dataExplorerNavElemSelector.assetTree).get;
                    return [4 /*yield*/, appTitle.dataExplorerNavElemSelector.assetTree.getText()];
                case 8: 
                // tslint:disable-next-line:max-line-length
                return [4 /*yield*/, _f.apply(_e, [(_g.sent()).indexOf('Eastern Station')])
                        .click()];
                case 9:
                    // tslint:disable-next-line:max-line-length
                    _g.sent();
                    alerthelper.selectModelandClick(validator.alertSingleViewTestData.siitest);
                    protractor_1.browser.wait(EC.stalenessOf(alerthelper.alertCriteria.loadingSheen));
                    return [4 /*yield*/, alerthelper.alertCriteria.alertCriteriaTab.click()];
                case 10:
                    _g.sent();
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Area*/
                    return [4 /*yield*/, alerthelper.alertCriteria.AnomalyAreaDefaultCheckBox.first().click()];
                case 11:
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Area*/
                    _g.sent();
                    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTime.first(), validator.alertConstraintsTimeDuration.timeDuration);
                    protractor_1.browser.waitForAngular();
                    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyAreaFastResponseTime.first(), validator.alertConstraintsTimeDuration.timeDuration);
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for AnomalyOscillation Area*/
                    return [4 /*yield*/, alerthelper.alertCriteria.AnomalyOscillationDefaultCheckBox.first().click()];
                case 12:
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for AnomalyOscillation Area*/
                    _g.sent();
                    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyOscillationDuration.first(), validator.alertConstraintsTimeDuration.timeDuration);
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
                    return [4 /*yield*/, alerthelper.alertCriteria.AnomalyFrequencyDefaultCheckBox.first().click()];
                case 13:
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
                    _g.sent();
                    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyFrequencyDuration.first(), validator.alertConstraintsTimeDuration.timeDuration);
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
                    return [4 /*yield*/, alerthelper.alertCriteria.ActivateFrozenCheckBox.first().click()];
                case 14:
                    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
                    _g.sent();
                    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyFrozenDataDuration.first(), validator.alertConstraintsTimeDuration.FrozenDataDurationtimeDuration);
                    protractor_1.browser.waitForAngular();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Verify that selected duration is not greater than 6' +
        'hours or 360 minutes or 21600 seconds and verify a red box is displayed around the duration text box.', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var cnt;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cnt = 0;
                    _a.label = 1;
                case 1:
                    if (!(cnt <= validator.alertConstraintsTimeDuration.timeDuration.length - 1)) return [3 /*break*/, 4];
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().sendKeys(900);
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().sendKeys(900);
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
                    appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyAreaFastResponseTime.first(), validator.alertConstraintsTimeDuration.timeDuration[cnt]);
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
                    appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTime.first(), validator.alertConstraintsTimeDuration.timeDuration[cnt]);
                    return [4 /*yield*/, alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().click()];
                case 2:
                    _a.sent();
                    alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
                    appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyOscillationDuration.first(), validator.alertConstraintsTimeDuration.timeDuration[cnt]);
                    alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
                    appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyFrozenDataDuration.first(), validator.alertConstraintsTimeDuration.timeDuration[cnt]);
                    alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().click();
                    alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().clear();
                    alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
                    appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyFrequencyDuration.first(), validator.alertConstraintsTimeDuration.timeDuration[cnt]);
                    alerthelper.alertCriteria.savebtn.click();
                    protractor_1.browser.sleep(2000);
                    // console.log(await $('[class="toast-message"]').getText());
                    expect(alerthelper.alerToastMessage.toastMessage.isDisplayed()).toBe(true);
                    _a.label = 3;
                case 3:
                    cnt++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec05_Model_Config_Add Alerts_Constraints.js.map