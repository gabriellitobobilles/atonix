"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var performanceHelper_po_1 = require("../../page/performanceHelper.po");
var validator = require("../../page/performanceAlertConstants");
describe('Alert: Right click on model perform all actions', function () {
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
    it('ModelConfiguration Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appTitle.clickAppMenu();
                    appTitle.checkPerformanceAppIcon();
                    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
                    protractor_1.browser.waitForAngular();
                    protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()), 700000, 'Element taking too long to appear in the DOM');
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _b.sent();
                    alerthelper.alertScreeningView.modelConfiguration.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 4:
                    _a.apply(void 0, [(_b.sent()) === "Alerts - Model Config"]).toBe(true, "Title is not model config");
                    expect(alerthelper.modelConfigView.singleViewInputTab.isDisplayed()).toBe(true, "Input Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewAlertTab.isDisplayed()).toBe(true, "Alert Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewAnomaliesTab.isDisplayed()).toBe(true, "Anomalies Tab is not showing");
                    expect(alerthelper.modelConfigView.singleViewDataTab.isDisplayed()).toBe(true, "Data Tab is not showing");
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Diagnostic Drilldown Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.diagnosticDrilldown.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _a.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _a.sent();
                    protractor_1.browser.waitForAngular();
                    expect(alerthelper.diagnosticDrilldown.modelTrendTab.isDisplayed()).toBe(true, "Model Trend tab was not displaying");
                    expect(alerthelper.diagnosticDrilldown.modelHistoryTab.isDisplayed()).toBe(true, "Model History tab was not displaying");
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Op Mode Configuration Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _b.sent();
                    alerthelper.alertScreeningView.opmodeConfiguration.click();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 4:
                    _a.apply(void 0, [(_b.sent()) === "Alerts - Op Mode Definition"]).toBe(true, "Title is not op mode config");
                    expect(alerthelper.OpmodelConfigView.addNewOperatingModebta.isDisplayed()).toBe(true, "Operating mode button was not displaying");
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Clear AlertStatus Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var currentcount, clearcount;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, alerthelper.getTotalModelsONAlertScreeningView()];
                case 1:
                    currentcount = _a.sent();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 2:
                    _a.sent();
                    alerthelper.alertScreeningView.clearAlertStatus.click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, alerthelper.getTotalModelsONAlertScreeningView()];
                case 3:
                    clearcount = _a.sent();
                    expect(currentcount !== clearcount).toBe(true, "Clear AlertStatus is not working because total number of alert was decreasing");
                    return [2 /*return*/];
            }
        });
    }); });
    it('Clear Diagnose Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.clearAlertDiagnose.click();
                    protractor_1.browser.waitForAngular();
                    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, "Clear Diagnose note was not displaying");
                    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, "Clear Diagnose save button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, "Clear Diagnose cancel button was not displaying");
                    alerthelper.alertScreeningView.cancelNoteBtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Model Maintenance Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.modelMaintenance.click();
                    protractor_1.browser.waitForAngular();
                    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, "Operating mode textbox was not displaying");
                    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, "Operating mode save button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, "Operating mode cancel button was not displaying");
                    alerthelper.alertScreeningView.cancelNoteBtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Diagnose Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.clearAlertDiagnose.click();
                    protractor_1.browser.waitForAngular();
                    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList, validator.priorityOption.priorityOptions);
                    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, "Action Diagnose textbox was not displaying");
                    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, "Action Diagnose save button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, "Action Diagnose cancel button was not displaying");
                    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, "Action Diagnose set as Fav button was not displaying");
                    expect(protractor_1.$("input[type='radio']:checked").getAttribute('value')).toEqual("diagnose", "Diagnose radio button is not enable by default");
                    alerthelper.alertScreeningView.cancelNoteBtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Model Maintenance Action', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.modelMaintenance.click();
                    protractor_1.browser.waitForAngular();
                    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList, validator.priorityOption.priorityOptions);
                    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, "Model Maintenance textbox was not displaying");
                    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, "Model Maintenance save button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, "Model Maintenance cancel button was not displaying");
                    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, "Model Maintenance set as Fav button was not displaying");
                    expect(protractor_1.$("input[type='radio']:checked").getAttribute('value')).toEqual("maintenance", "Diagnose radio button is not enable by default");
                    alerthelper.alertScreeningView.cancelNoteBtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creation Action Item', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _a.sent();
                    alerthelper.alertScreeningView.createActionItem.click();
                    protractor_1.browser.waitForAngular();
                    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList, validator.priorityOption.priorityOptions);
                    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, "Creation Action textbox was not displaying");
                    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, "Creation Action save button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, "Creation Action cancel button was not displaying");
                    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, "Creation Action set as Fav button was not displaying");
                    expect(protractor_1.$("input[type='radio']:checked").getAttribute('value')).toEqual("note", "Diagnose radio button is not enable by default");
                    alerthelper.alertScreeningView.cancelNoteBtn.click();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Create Open Issue', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    alerthelper.alertScreeningView.modelsVM.first().click();
                    return [4 /*yield*/, appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first())];
                case 1:
                    _b.sent();
                    alerthelper.alertScreeningView.createOpenIssue.click();
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, appTitle.selectWindow()];
                case 2:
                    win = _b.sent();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[1])];
                case 3:
                    _b.sent();
                    protractor_1.browser.waitForAngular();
                    _a = expect;
                    return [4 /*yield*/, protractor_1.browser.getTitle()];
                case 4:
                    _a.apply(void 0, [(_b.sent()) === "Issue"]).toBe(true, "Title is not model config");
                    expect(alerthelper.diagnosticDrilldown.modelTrendTab.isDisplayed()).toBe(true, "Model Trend tab was not displaying");
                    expect(alerthelper.diagnosticDrilldown.modelHistoryTab.isDisplayed()).toBe(true, "Model History tab was not displaying");
                    protractor_1.browser.close();
                    return [4 /*yield*/, protractor_1.browser.switchTo().window(win[0])];
                case 5:
                    _b.sent();
                    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.issueClassDropdown, validator.issueClass.issueClasses);
                    expect(alerthelper.alertScreeningView.createNewIssuebtn.isDisplayed()).toBe(true, "Create new issue button was not displaying");
                    expect(alerthelper.alertScreeningView.cancelNewIssuebtn.isDisplayed()).toBe(true, "Cancel new issue button was not displaying");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spec07_Right_click_on_model_perform_all_actions.js.map