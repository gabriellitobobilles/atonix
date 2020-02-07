"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var helper_1 = require("../helpers/helper");
var utils_1 = require("../helpers/utils");
var userAndServerCredential_1 = require("../page/userAndServerCredential");
// import path = require('path');
var path = require("path");
var fs = require("fs");
// import fs = require('fs');
// const downloadsFolder = require('downloads-folder');
var downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');
// tslint:disable-next-line:class-name
var helper = /** @class */ (function (_super) {
    tslib_1.__extends(helper, _super);
    function helper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.util = new utils_1.Utils();
        // tslint:disable-next-line:variable-name
        _this.DispatchChart = {
            EditChartBtn: protractor_1.$$('[ng-click="buttonsVM.LaunchAdhoc()"]'),
            ToggleChartLegendLabelBtn: protractor_1.$('[ng-click="buttonsVM.ChangeLabels()"]'),
            EditChartSettingBtn: protractor_1.$$('[ng-click="buttonsVM.Settings()"]'),
            OpenChartInNewTabBtn: protractor_1.$$('[ng-click="buttonsVM.Zoom()"]'),
            EmailChartBtn: protractor_1.$('[ng-click="buttonsVM.Email()"]'),
            chartTitle: protractor_1.$('[ng-model="settingsVM.trendDefinition.Title"]'),
            DownloadChartContentBtn: protractor_1.$('[ng-click="buttonsVM.Download()"]'),
            DownloadCsvChartbtn: protractor_1.$('[ng-click="svm.downloadStats()"]'),
            pinName: protractor_1.$$('[ng-model="pin.NameFormat"]'),
        };
        _this.dataExplorerNavElemSelector = {
            assetNodeTree: protractor_1.$$('[class="assetTreeNode ng-scope"]'),
            assetChildNodeTree: protractor_1.$$('[ng-repeat="assetNode in asset.children"]'),
            assetExpander: protractor_1.$('[class="arrow-cursor fa fa-caret-right"]'),
            assetTreeController: protractor_1.$$('[ng-click="treeController.click(asset)"]'),
            assetTree: protractor_1.$$('[ng-click="sensorTreeController.click(asset)"]'),
            savePin: protractor_1.$('[ng-click="vm.addPin()"]'),
            addPins: protractor_1.$('[ng-click="settingsVM.addPin()"]'),
            pins: protractor_1.$$('[ng-click="vm.pinFocus(pin)"]'),
        };
        _this.performanceAnalystNavElemSelector = {
            assetNodeTree: protractor_1.$$('[class="assetTreeNode ng-scope"]'),
            assetChildNodeTree: protractor_1.$$('[ng-repeat="assetNode in asset.children"]'),
            assetExpander: protractor_1.$('[class="fa fa-caret-right"]')
        };
        _this.assetExplorerNavElemSelector = {
            assetNodeTree: protractor_1.$$('[class="assetTreeNode adhocTreeNode"]'),
            assetChildNodeTree: protractor_1.$$('[ng-repeat="adhocNode in node.children"]'),
            assetNode: protractor_1.$$('[ng-click="treeController.click(node)"]'),
        };
        _this.customeModelImport = {
            acmVMExit: protractor_1.$('[ng-click="acmVM.Exit()"]'),
            acmVMimportBtn: protractor_1.$('[ng-click="acmVM.import(acmVM.uploadFile)"]'),
            fileUpload: protractor_1.$('[name="fileUpload"]'),
            configurationIcon: protractor_1.$$('i#unique-1.fa.fa-button.ng-scope.fa-gear'),
            treeControllerEditMode: protractor_1.$('[ng-click="treeController.editMode()"]'),
            EditModeHide: protractor_1.$('[class="btn btn-default btn-sm fa fa-button fa-pencil ng-hide"]'),
            errorTextLocation: protractor_1.$('[class="error"]'),
        };
        _this.PAMap = {
            selectDiffmap: protractor_1.$('[ng-model="sekoiaSelectedGeospa"]'),
            multiSelectBtn: protractor_1.$('[class="btn multiSelectButton"]'),
            mapAttrTrayXpanded: protractor_1.$('[class="attribute-tray-right-popup expanded"]'),
            mapAttrTrayHidden: protractor_1.$('[class="attributeTab attributeTab-notAvailable"]'),
            mapAttrTrayTabSelected: protractor_1.$('[class="attributeTab attributeTab-selected"]'),
            clearAsset: protractor_1.$('[ng-click="aitVM.ClearAsset()"]'),
            GeoVismap: protractor_1.$('div.mapArea.map'),
            GeoSpaMap: protractor_1.$('[id="geoSpa_gc"]'),
            Rastemap: protractor_1.$('[ng-repeat="group in rasterVM.groups"]'),
            mapAssetHover: protractor_1.$('[id="bvHoverBox"]'),
            mapFilterBtn: protractor_1.$('[id="filterToggle"]'),
            mapAssetSearchBox: protractor_1.$('[ng-model="tagSearchPopupVM.searchText"]'),
            mapAssetSearchBtn: protractor_1.$('[class="btn btn-default btn-sm pull-right"]'),
            mapCircle: protractor_1.$$('circle'),
            saveSearchAsset: protractor_1.$('[ng-click="tagSearchPopupVM.saveQuickSearch(tagSearchPopupVM.selectedQuickSearch)"]'),
            assetCategoryTextbox: protractor_1.$('[ng-model="aConCatVM.Candidate"]'),
            quickSearchSavebtn: protractor_1.$('[ng-click="saveQuickSearchVm.ok()"]'),
            expandCategoryPane: protractor_1.$$('[ng-repeat="c in aConCatVM.ExpandedCategories"]'),
            categoryAddBtn: protractor_1.$('[ng-click="aConCatVM.addCandidate()"]'),
            saveQuickSearchVmName: protractor_1.$('[ng-model="saveQuickSearchVm.name"]'),
            saveQuickSearchVmOKBtn: protractor_1.$('[ng-click="saveQuickSearchVm.ok()"]'),
            clearSearchBtn: protractor_1.$('[ng-click="tagSearchPopupVM.clearSearch()"]'),
            advancedSettings: protractor_1.$('[ng-model="tagSearchPopupVM.advancedSettings"]'),
            advanceSettingMap: protractor_1.$('[ng-model="tagSearchPopupVM.selectedMap"]'),
            saveQuickSearchVmisPublic: protractor_1.$('[ng-model="saveQuickSearchVm.isPublic"]'),
            basemapWrapImageBtn: protractor_1.$$('[class="basemapWrap"]'),
            basemapWrapTriggerTab: protractor_1.$$('[id="trigger-tab"]')
        };
        _this.PAlerts = {
            filterItem: protractor_1.$$('[class="filterItem"]'),
            chevronDown: protractor_1.$('[class="fa fa-button fa-lg fa-chevron-down"]'),
            chevronUp: protractor_1.$('[class="fa fa-button fa-lg fa-chevron-up"]'),
            alertTimelineVM: protractor_1.$('[ng-show="alertTimelineVM.tempfilter.actionItemTypeID.length > 0"]'),
        };
        // tslint:disable-next-line:variable-name
        _this.DownloadOption = {
            ChartContextMenuBtn: protractor_1.$('[class="highcharts-button-symbol"]'),
            DownLoadListOption: protractor_1.$$('[class="highcharts-menu-item"]'),
            CsvContextMenuBtn: protractor_1.$('#trigger-tab'),
        };
        _this.downloadFileName = {
            JPEG: 'chart.jpg',
            PNG: 'chart.png',
            PDF: 'chart.pdf',
            CSV: 'chart.csv',
        };
        _this.downloadFileType = {
            FilePNG: 1,
            FileJPEG: 0,
            FilePDF: 2,
        };
        _this.resetZoom = {
            ResetZoomBtn: protractor_1.$('[class=" highcharts-button-box"]'),
        };
        _this.selectTimeSlider = {
            calendarIcon: protractor_1.$('[id="calendarPopupButton"]'),
            calendarIconmap: protractor_1.$('[id="calendarPopupButtonIndicator"]'),
            startDatebox: protractor_1.$('[ng-model="trVM.popupConfiguration.date1"]'),
            startDateboxMap: protractor_1.$('[ng-model="trVM.popupConfigurationIndicator.date1"]'),
            endDatebox: protractor_1.$('[ng-model="trVM.popupConfiguration.date2"]'),
            calendarApplybtn: protractor_1.$$('[ng-click="trVM.applyPopup()"]'),
            calendarOKBtn: protractor_1.$$('[class="btn btn-primary"]'),
            calendarIconStart: protractor_1.$('[ng-click="trVM.popupConfiguration.openStart($event)"]'),
            calendarIconStartMap: protractor_1.$('[ng-click="trVM.popupConfigurationIndicator.openStart($event)"]'),
            calendarIconEnd: protractor_1.$('[ng-click="trVM.popupConfiguration.openEnd($event)"]'),
            dateIndicator: protractor_1.$('[id="navIndicatorDate"]'),
        };
        _this.dataExplorerNavigator = {
            assetFilter: protractor_1.$('[ng-model="tagAssetFilterTemp"]'),
            variableFilter: protractor_1.$('[ng-model="tagVariableFilterTemp"]'),
            nameFilter: protractor_1.$('[ng-model="tagNameFilterTemp"]'),
            descFilter: protractor_1.$('[ng-model="tagDescFilterTemp"]'),
            unitFilter: protractor_1.$('[ng-model="tagUnitsFilterTemp"]'),
        };
        _this.annotation = {
            editAnnotation: protractor_1.$('[ng-click="chartVM.editAnnotation()"]'),
            createAnnotation: protractor_1.$('[ng-click="caVM.cancel()"]'),
            deleteAnnotation: protractor_1.$('[ng-click="chartVM.deleteAnnotation()"]'),
        };
        _this.annotationModal = {
            editAnnotationOkbtn: protractor_1.$('[ng-click="caVM.OK()"]'),
            editAnnotationCancelbtn: protractor_1.$('[ng-click="caVM.cancel()"]'),
            annotationCalendarIcon: protractor_1.$('[ng-click="caVM.openStart($event)"]'),
            annotationNotes: protractor_1.$('[ng-model="caVM.notes"]'),
            annotationTags: protractor_1.$('[ng-model="caVM.selectedTag"]'),
        };
        _this.atonixTrendButtons = {
            trenPauseBtn: protractor_1.$('[ng-click="pause = !pause"]'),
            changeLabel: protractor_1.$('[ng-click="trend.ChangeLabels()"]'),
            EditChartSettingBtn: protractor_1.$$('[ng-click="buttonsVM.Settings()"]'),
            nameDropdown: protractor_1.$('[id="newDropdown"]'),
            saveBtn: protractor_1.$('[ng-click="buttonsVM.Save()"]'),
            trenZoombtn: protractor_1.$('[ng-click="trend.Zoom()"]'),
            annotationBtn: protractor_1.$$('[ng-click="buttonsVM.Annotation()"]'),
        };
        _this.atonixSaveTrendDefinition = {
            titleTrend: protractor_1.$('[ng-model="saveVM.title"]'),
            linkedToAssestSelection: protractor_1.$$('[ng-click="ddVM.showDropdown()"]'),
            saveBtn: protractor_1.$('[ng-click="saveVM.OK()"]'),
        };
        _this.atonixCreateCharts = {
            createNewChartBtn: protractor_1.$('[ng-click="buttonsVM.CreateNew(\'time\')"]'),
            createNewChartGroupBtn: protractor_1.$('[ng-click="buttonsVM.CreateNew(\'grouped\')"]'),
        };
        _this.chartDropDown = {
            chartDropDownBtn: protractor_1.$('[id="chartDropdown"]'),
        };
        _this.chartSettingTab = {
            axis: protractor_1.element(protractor_1.by.linkText('Axis')),
            series: protractor_1.element(protractor_1.by.linkText('Series')),
            pin: protractor_1.element(protractor_1.by.linkText('Pins')),
            save: protractor_1.$('[ng-click="settingsVM.OK()"]'),
            chartType: protractor_1.$('[ng-model="settingsVM.trendDefinition.ChartTypeID"]'),
            seriesChartType: protractor_1.$$('[ng-model="s.ChartTypeID"]'),
            aggregation: protractor_1.$('[ng-model="settingsVM.summaryID"]'),
            pinType: protractor_1.$$('[ng-model="criteriaObjectId"]'),
            measurementType: protractor_1.$$('[ng-model="measurement.Type"]'),
            addMeasurement: protractor_1.$('[ng-click="settingsVM.CreateNewMeasurement()"]'),
            measurementName: protractor_1.$$('[ng-model="measurement.Name"]'),
            measurementSetting: protractor_1.$$('[ng-click="settingsVM.configure( measurement)"]'),
            measurementConfig: protractor_1.$$('[class="measureConfig ng-scope"]'),
            deleteMeasurement: protractor_1.$$('[ng-click="settingsVM.DeleteMeasurement(measurement)"]'),
            seriesFilter: protractor_1.$$('[ng-click="settingsVM.ToggleFilter(measurement)"]'),
            seriesFilterConfig: protractor_1.$$('[class="filterConfig ng-scope"]'),
            trendDataRetrieval: protractor_1.$$('[ng-model="settingsVM.trendDefinition.DataRetrieval.Method"]'),
            criteriaObjectId: protractor_1.$$('[ng-model="criteriaObjectId"]'),
            hidePin: protractor_1.$$('[ng-model="pin.Hidden"]'),
            removePin: protractor_1.$$('[ng-click="settingsVM.removePin(pin)"]'),
        };
        // GETTER elements: modal:Login
        _this.getLoginModalUserEmail = function () {
            return protractor_1.element(protractor_1.by.id('inputEmailLogin'));
        };
        _this.getLoginModalUserPwd = function () {
            return protractor_1.element(protractor_1.by.model('vm.Password'));
        };
        _this.getLoginButton = function () {
            return protractor_1.element(protractor_1.by.id('inputSubmitLogin'));
        };
        _this.getNavLogoutButton = function () {
            return protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.logout()"]'));
        };
        _this.getSelectScanariosVMClearBtn = function () {
            return protractor_1.$('[ng-click="selectScenariosVM.Clear()"]');
        };
        _this.getSelectScanariosVMCancelBtn = function () {
            return protractor_1.$('[ng-click="selectScenariosVM.Cancel()"]');
        };
        _this.getSelectScanariosVMOKBtn = function () {
            return protractor_1.$('[ng-click="selectScenariosVM.OK()"]');
        };
        _this.getSelectScanariosVMFilterBtn = function () {
            return protractor_1.$('[ng-model="selectScenariosVM.filter"]');
        };
        // GETTER elements: modal:Apps Menu
        _this.getNavAppsMenu = function () {
            return protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        };
        _this.getNavPerformanceAnalystIcon = function () {
            return protractor_1.element.all(protractor_1.by.cssContainingText('.ng-binding', 'Performance Analyst')).get(1);
            // return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(16);
        };
        _this.getNavMatIcon = function () {
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(11);
            // return element(by.cssContainingText('.ng-binding', 'MATS'));
        };
        _this.getNavIssueMgtIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Issues Management'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(10);
        };
        _this.getNavAlertsIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Alerts'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(2);
        };
        _this.getNavAdaptivePlanningIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Adaptive Planning Performance Analyst'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(0);
        };
        _this.getNavAirPermitsIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Air Permits'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(1);
        };
        _this.getNavArcFlashIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Arc Flash'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(3);
        };
        _this.getNavAsset360Icon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Asset 360'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(4);
        };
        _this.getNavAssetExplorerIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Asset Explorer'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(5);
        };
        _this.getNavCriteriaObjectUtilityIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Criteria Object Utility'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(6);
        };
        _this.getNavCSAPRIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'CSAPR'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(7);
        };
        _this.getNavEnvironmentalDashboardIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Environmental Dashboard'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(8);
        };
        _this.getNavInvestmentAcceleratorIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Investment Accelerator'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(9);
        };
        _this.getNavMicrogridIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Microgrid'));
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(13)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(12);
        };
        _this.getNavnDTestRigIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'nD Test Rig'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(13);
        };
        _this.getNavOldWaterMeterIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Old Water Meter'));
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(15)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(14);
        };
        _this.getNavOptionsExplorerIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'Options Explorer'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(15);
        };
        _this.getNavSEKOIAIcon = function () {
            // return element(by.cssContainingText('.ng-binding', 'SEKOIA'));
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(25)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(18);
        };
        _this.getNavRiskMatrixIcon = function () {
            // Risk Matrix app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(22)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(22);
        };
        _this.getNavWaterMeterIcon = function () {
            // Water Meter app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(34)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(33);
        };
        _this.getNavWaterQualityPlatformIcon = function () {
            // Water Quality Platform app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(35)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(34);
        };
        _this.getNavWaterReclamationIcon = function () {
            // Water Reclamation app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(36)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(35);
        };
        _this.getNavWaterTreatmentIcon = function () {
            // Water Treatment app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(37)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(36);
        };
        _this.getNavWaterCHPIcon = function () {
            // Wate CHP app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(33)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(32);
        };
        _this.getNavUserAdministrationIcon = function () {
            // User Administration app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(30)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(29);
        };
        _this.getNavViewExplorerIcon = function () {
            // View Explorer
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(31)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(30);
        };
        _this.getNavVirtualTourIcon = function () {
            // Virtual Tour app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(32)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(31);
        };
        _this.getNavWorkManagementIcon = function () {
            // work management app
            // return element(by.css('#appContextBox > div.ACList > div:nth-child(38)'));
            return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(37);
        };
        _this.getAllAppsMenuIcon = function () {
            // App Menu box
            return protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        };
        _this.getAppTitle = function () {
            return protractor_1.element(protractor_1.by.css('.appTitle'));
        };
        _this.getToastErrorMsg = function () {
            return protractor_1.element(protractor_1.by.css('div.toast.toast-error'));
        };
        // ACTIONS: global
        _this.open = function () {
            var EC = protractor_1.protractor.ExpectedConditions;
            protractor_1.browser.get(userAndServerCredential_1.serverToTest);
            protractor_1.browser.sleep(5000);
            protractor_1.browser.wait(EC.elementToBeClickable(protractor_1.element(protractor_1.by.css('#inputSubmitLogin'))));
            protractor_1.browser.getTitle().then(function (webpagetitle) {
                expect(webpagetitle).toEqual('Welcome to ASSET360');
            });
            return protractor_1.browser.waitForAngular();
        };
        _this.logout = function () {
            _this.getNavLogoutButton().isDisplayed();
            return _this.getNavLogoutButton().click();
        };
        // ACTIONS: login
        _this.fillLoginForm = function () {
            this.getLoginModalUserEmail().clear().sendKeys(userAndServerCredential_1.username);
            this.getLoginModalUserPwd().clear().sendKeys(userAndServerCredential_1.password);
            // when the login button is enablead means that form is fulfilled
            return expect(this.getLoginButton().isEnabled()).toBeTruthy();
        };
        _this.confirmLogin = function () {
            return this.getLoginButton().click();
        };
        // ACTIONS: Apps
        // Checking Apps Icon is Present on the Apps Menu
        _this.checkAppMenu = function () {
            return expect(this.getNavAppsMenu().isEnabled()).toBeTruthy();
        };
        _this.checkPerformanceAppIcon = function () {
            return expect(this.getNavPerformanceAnalystIcon().isEnabled()).toBeTruthy();
        };
        _this.checkMatIcon = function () {
            return expect(this.getNavMatIcon().isEnabled()).toBeTruthy();
        };
        _this.checkIssueMgtIcon = function () {
            return expect(this.getNavIssueMgtIcon().isEnabled()).toBeTruthy();
        };
        _this.checkAlertsIcon = function () {
            return expect(this.getNavAlertsIcon().isEnabled()).toBeTruthy();
        };
        _this.checkAdaptivePlanningIcon = function () {
            return expect(this.getNavAdaptivePlanningIcon().isEnabled()).toBeTruthy();
        };
        _this.checkAirPermitsIcon = function () {
            return expect(this.getNavAirPermitsIcon().isEnabled()).toBeTruthy();
        };
        _this.checkArcFlashIcon = function () {
            return expect(this.getNavArcFlashIcon().isEnabled()).toBeTruthy();
        };
        _this.checkAsset360Icon = function () {
            return expect(this.getNavAsset360Icon().isEnabled()).toBeTruthy();
        };
        _this.checkAssetExplorerIcon = function () {
            return expect(this.getNavAssetExplorerIcon().isEnabled()).toBeTruthy();
        };
        _this.checkCriteriaObjectUtilityIcon = function () {
            return expect(this.getNavCriteriaObjectUtilityIcon().isEnabled()).toBeTruthy();
        };
        _this.checkCSAPRIcon = function () {
            return expect(this.getNavCSAPRIcon().isEnabled()).toBeTruthy();
        };
        _this.checkEnvironmentalDashboardIcon = function () {
            return expect(this.getNavEnvironmentalDashboardIcon().isEnabled()).toBeTruthy();
        };
        _this.checkInvestmentAcceleratorIcon = function () {
            return expect(this.getNavInvestmentAcceleratorIcon().isEnabled()).toBeTruthy();
        };
        _this.checkMicrogridIcon = function () {
            return expect(this.getNavMicrogridIcon().isEnabled()).toBeTruthy();
        };
        _this.checknDTestRigIcon = function () {
            return expect(this.getNavnDTestRigIcon().isEnabled()).toBeTruthy();
        };
        _this.checkOldWaterMeterIcon = function () {
            return expect(this.getNavOldWaterMeterIcon().isEnabled()).toBeTruthy();
        };
        _this.checkOptionsExplorerIcon = function () {
            return expect(this.getNavOptionsExplorerIcon().isEnabled()).toBeTruthy();
        };
        _this.checkSEKOIAIcon = function () {
            return expect(this.getNavSEKOIAIcon().isEnabled()).toBeTruthy();
        };
        _this.checkRiskMatrixIcon = function () {
            return expect(this.getNavRiskMatrixIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWaterMeterIcon = function () {
            return expect(this.getNavWaterMeterIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWaterQualityPlatformIcon = function () {
            return expect(this.getNavWaterQualityPlatformIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWaterReclamationIcon = function () {
            return expect(this.getNavWaterReclamationIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWaterTreatmentIcon = function () {
            return expect(this.getNavWaterTreatmentIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWaterCHPIcon = function () {
            return expect(this.getNavWaterCHPIcon().isEnabled()).toBeTruthy();
        };
        _this.checkUserAdministrationIcon = function () {
            return expect(this.getNavUserAdministrationIcon().isEnabled()).toBeTruthy();
        };
        _this.checkViewExplorerIcon = function () {
            return expect(this.getNavViewExplorerIcon().isEnabled()).toBeTruthy();
        };
        _this.checkVirtualTourIcon = function () {
            return expect(this.getNavVirtualTourIcon().isEnabled()).toBeTruthy();
        };
        _this.checkWorkManagementIcon = function () {
            return expect(this.getNavWorkManagementIcon().isEnabled()).toBeTruthy();
        };
        _this.checkAllAppMenuIcon = function () {
            return expect(this.getAllAppsMenuIcon().isEnabled()).toBeTruthy();
        };
        // Click Apps icon on the Apps Menu
        _this.clickAppMenu = function () {
            return this.getNavAppsMenu().click();
        };
        _this.clickPerformanceAnalysApp = function (apps) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var appsName;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.$$('[ng-click="navBarVM.clickAppContext(ac)"]').getText()];
                    case 1:
                        appsName = _a.sent();
                        return [4 /*yield*/, protractor_1.$$('[ng-click="navBarVM.clickAppContext(ac)"]').get(appsName.indexOf(apps)).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.clickPerformanceViewsTab = function (tabName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var TabName;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.$$('[ng-click="vm.selectView(view)"]').getText()];
                    case 1:
                        TabName = _a.sent();
                        return [4 /*yield*/, protractor_1.$$('[ng-click="vm.selectView(view)"]').get(TabName.indexOf(tabName)).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.clickMatApp = function () {
            return this.getNavMatIcon().click();
        };
        _this.clickIssueMgtApp = function () {
            return this.getNavIssueMgtIcon().click();
        };
        _this.clickAlertsApp = function () {
            return this.getNavAlertsIcon().click();
        };
        _this.clickAdaptivePlanningApp = function () {
            return this.getNavAdaptivePlanningIcon().click();
        };
        _this.clickAirPermitsApp = function () {
            return this.getNavAirPermitsIcon().click();
        };
        _this.clickArcFlashApp = function () {
            return this.getNavArcFlashIcon().click();
        };
        _this.clickAsset360App = function () {
            return this.getNavAsset360Icon().click();
        };
        _this.clickAssetExplorerApp = function () {
            return this.getNavAssetExplorerIcon().click();
        };
        _this.clickCriteriaObjectUtilityrApp = function () {
            return this.getNavCriteriaObjectUtilityIcon().click();
        };
        _this.clickCSAPRApp = function () {
            return this.getNavCSAPRIcon().click();
        };
        _this.clickEnvironmentalDashboardApp = function () {
            return this.getNavEnvironmentalDashboardIcon().click();
        };
        _this.clickInvestmentAcceleratorApp = function () {
            return this.getNavInvestmentAcceleratorIcon().click();
        };
        _this.clickMicrogridApp = function () {
            return this.getNavMicrogridIcon().click();
        };
        _this.clicknDTestRigApp = function () {
            return this.getNavnDTestRigIcon().click();
        };
        _this.clickOldWaterMeterApp = function () {
            return this.getNavOldWaterMeterIcon().click();
        };
        _this.clickOptionsExplorerApp = function () {
            return this.getNavOptionsExplorerIcon().click();
        };
        _this.clickSEKOIAApp = function () {
            return this.getNavSEKOIAIcon().click();
        };
        _this.clickRiskMatrixApp = function () {
            return this.getNavRiskMatrixIcon().click();
        };
        _this.clickWaterMeterApp = function () {
            return this.getNavWaterMeterIcon().click();
        };
        _this.clickWaterQualityPlatformApp = function () {
            return this.getNavWaterQualityPlatformIcon().click();
        };
        _this.clickWaterReclamationApp = function () {
            return this.getNavWaterReclamationIcon().click();
        };
        _this.clickWaterTreatmentApp = function () {
            return this.getNavWaterTreatmentIcon().click();
        };
        _this.clickWaterCHPApp = function () {
            return this.getNavWaterCHPIcon().click();
        };
        _this.clickUserAdministrationApp = function () {
            return this.getNavUserAdministrationIcon().click();
        };
        _this.clickViewExplorerApp = function () {
            return this.getNavViewExplorerIcon().click();
        };
        _this.clickVirtualTourApp = function () {
            return this.getNavVirtualTourIcon().click();
        };
        _this.clickWorkManagementApp = function () {
            return this.getNavWorkManagementIcon().click();
        };
        /** Will transfer it to Utility Page Object */
        _this.getCurrentDate = function () {
            var now = new Date();
            var day = ('0' + now.getDate()).slice(-2);
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var today = (month) + '/' + (day) + '/' + now.getFullYear();
            return today;
        };
        _this.getPreviousdaysDate = function (x) {
            var now = new Date(new Date().setDate(new Date().getDate() - x));
            var day = ('0' + now.getDate()).slice(-2);
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var today = (month) + '/' + (day) + '/' + now.getFullYear();
            return today;
        };
        _this.getRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        _this.deleteAlreadyDownloadedFiles = function (namefile) {
            // var filename = downloadsPath+ '/chart.csv';
            var filename = (downloadsPath + '\\' + namefile).replace(/\\/g, '/');
            if (fs.existsSync(filename)) {
                // delete if there is any existing file with same name
                fs.unlinkSync(filename);
            }
        };
        _this.assetList = function (elem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var assetMenu;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, elem.getText()];
                    case 1:
                        assetMenu = _a.sent();
                        return [2 /*return*/, assetMenu];
                }
            });
        }); };
        _this.selectDropdownbyNum = function (elem, optionNum) {
            if (optionNum) {
                var options = elem.all(protractor_1.by.tagName('option'))
                    // tslint:disable-next-line:no-shadowed-variable
                    .then(function (options) {
                    options[optionNum].click();
                });
            }
        };
        _this.selectDropdownbyString = function (elem, typeName) {
            elem.element(protractor_1.by.cssContainingText('option', typeName)).click();
        };
        return _this;
    }
    helper.prototype.comparedropdownListValue = function (elem, optionNum) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, elem.all(protractor_1.by.tagName('option')).getAttribute('textContent')];
                    case 1:
                        values = _a.sent();
                        expect(values).toEqual(optionNum);
                        return [2 /*return*/];
                }
            });
        });
    };
    // public expectDropdownListOptionPresence(elem: ElementFinder, optionText: string) {
    //   const allOptions = elem.all(by.tagName('option')).map((option) => {
    //     return option.getText();
    //   });
    //   expect(allOptions).toContain(optionText);
    // }
    helper.prototype.expectDropdownListOptionPresence = function (elem, optionText) {
        var foundOptions = elem.all(protractor_1.by.tagName('option')).filter(function (option) {
            return option.getText().then(function (text) {
                foundOptions[optionText].click();
                return text === optionText;
            });
        });
        expect(foundOptions.count()).toBeGreaterThan(0);
    };
    helper.prototype.verifyFileInDownloadsFolder = function (fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filePath;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, console.log('Getting users download path ' + downloadsPath)];
                    case 1:
                        _a.sent();
                        filePath = (downloadsPath + '\\' + fileName).replace(/\\/g, '/');
                        return [4 /*yield*/, console.log('Getting the path ' + filePath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, fs.existsSync(filePath)];
                            }); }); })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(fs.existsSync(filePath)).toBe(true, 'Failed to download file: ' + fileName + ' in user directory' + filePath)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, console.log('File download was successful')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Search and Select Data Explorer trend by passing string(Trend Name)
    * @param {string} trendName
    */
    helper.prototype.selectingDataExplorerTrends = function (trendName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var strTrendLength, val2, index, value, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strTrendLength = trendName.length;
                        return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent')];
                    case 1:
                        val2 = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < val2.length)) return [3 /*break*/, 7];
                        value = val2[index];
                        if (!(value.substring(0, strTrendLength) === trendName)) return [3 /*break*/, 6];
                        // console.log(value);
                        // expect(val2.indexOf('GabrielTest (' + sensor + ')') > -1).toBe(true, 'Your not successfully created a Trend');
                        expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
                        expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(value))
                            .isPresent()).toBe(true, 'Delete icon is not present');
                        protractor_1.browser.sleep(3000);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(val2.indexOf(value)).click()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        ++index;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    helper.prototype.selectingPerformanceAnalystTrends = function (trendName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var strTrendLength, val2, index, value, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strTrendLength = trendName.length;
                        return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartVM.getSeriesText(chartSummary)"]').getAttribute('textContent')];
                    case 1:
                        val2 = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < val2.length)) return [3 /*break*/, 7];
                        value = val2[index];
                        if (!(value.substring(0, strTrendLength) === trendName)) return [3 /*break*/, 6];
                        // console.log(value);
                        // expect(val2.indexOf('GabrielTest (' + sensor + ')') > -1).toBe(true, 'Your not successfully created a Trend');
                        expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
                        expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(value))
                            .isPresent()).toBe(true, 'Delete icon is not present');
                        protractor_1.browser.sleep(3000);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartVM.getSeriesText(chartSummary)"]').get(val2.indexOf(value)).click()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        ++index;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search and delete Data Explorer trend by passing string(Trend Name)
     * @param {string} trendName
     */
    helper.prototype.deletingDataExplorerTrends = function (trendName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var strTrendLength, val2, index, value, ale, deletedVal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strTrendLength = trendName.length;
                        return [4 /*yield*/, protractor_1.$$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent')];
                    case 1:
                        val2 = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < val2.length)) return [3 /*break*/, 5];
                        value = val2[index];
                        if (!(value.substring(0, strTrendLength) === trendName)) return [3 /*break*/, 4];
                        // ** Check if the Delete Icon is present */
                        expect(protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(value))
                            .isPresent()).toBe(true, 'Delete icon is not present');
                        // ** Deleted Created Trend */
                        protractor_1.$$('i.fa.fa-trash-o').get(val2.indexOf(value)).click(); // Delete created trend
                        protractor_1.browser.sleep(2000);
                        ale = protractor_1.browser.switchTo().alert();
                        ale.accept();
                        protractor_1.browser.waitForAngular();
                        // browser.refresh();
                        // browser.sleep(2000);
                        // this.chartDropDown.chartDropDownBtn.click();
                        protractor_1.browser.sleep(2000);
                        return [4 /*yield*/, protractor_1.$$('[ng-repeat="chartSummary in trends"]').getAttribute('textContent')];
                    case 3:
                        deletedVal = _a.sent();
                        // console.log(newval);
                        expect(deletedVal.indexOf(value) < 0).toBe(true, 'Save as trend was not deleted');
                        _a.label = 4;
                    case 4:
                        ++index;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Verify zoom in & zoom out feature.
    *
    */
    helper.prototype.verifyZoomInAndZoomOutInMap = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var defaulZoomvalue, ZoomOutvalue, ZoomInvalue;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        protractor_1.browser.waitForAngular();
                        protractor_1.browser.sleep(3000);
                        return [4 /*yield*/, protractor_1.$('[id="geoSpa"]').getAttribute('data-zoom')];
                    case 1:
                        defaulZoomvalue = _a.sent();
                        expect(defaulZoomvalue).not.toEqual(null, 'default Zoom value is null');
                        // console.log(defaulZoomvalue);
                        protractor_1.browser.sleep(3000);
                        protractor_1.$$('[class="esriSimpleSliderIncrementButton"]').last().click(); // ZoomOut
                        protractor_1.browser.waitForAngular();
                        protractor_1.browser.sleep(3000);
                        return [4 /*yield*/, protractor_1.$('[id="geoSpa"]').getAttribute('data-zoom')];
                    case 2:
                        ZoomOutvalue = _a.sent();
                        expect(ZoomOutvalue !== defaulZoomvalue).toBe(true, 'Zoom Out feature is not working');
                        // console.log(ZoomOutvalue);
                        protractor_1.$$('[class="esriSimpleSliderDecrementButton"]').last().click(); // ZoomIn
                        protractor_1.browser.sleep(3000);
                        protractor_1.$$('[class="esriSimpleSliderDecrementButton"]').last().click(); // ZoomIn
                        protractor_1.browser.waitForAngular();
                        protractor_1.browser.sleep(3000);
                        return [4 /*yield*/, protractor_1.$('[id="geoSpa"]').getAttribute('data-zoom')];
                    case 3:
                        ZoomInvalue = _a.sent();
                        expect(ZoomInvalue !== defaulZoomvalue).toBe(true, 'Zoom In feature is not working');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Selection Trend on the Dropdown
    */
    // tslint:disable-next-line:adjacent-overload-signatures
    helper.prototype.trendSelector = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.visibilityOf(this.chartDropDown.chartDropDownBtn), 10000);
                        return [2 /*return*/, this.chartDropDown.chartDropDownBtn];
                    });
                }); });
                protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.stalenessOf(protractor_1.$('[class="text-center text-dark"]')));
                protractor_1.browser.waitForAngular();
                this.chartDropDown.chartDropDownBtn.click();
                return [2 /*return*/];
            });
        });
    };
    /**
    * wait for the pie chart to fully loaded
    */
    helper.prototype.waitingForPieChartToLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, protractor_1.browser.element.all(protractor_1.by.css('[ng-show="pasVM.loading"]')).first()
                                            .getAttribute('class')];
                                    case 1: return [2 /*return*/, (_a.sent()) === 'ng-hide'];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * wait for the Table chart to fully loaded
    */
    helper.prototype.waitingFortableChartToLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, protractor_1.browser.element(protractor_1.by.css('[ng-show="chartVM.statusMessage"]')).getAttribute('class')];
                                    case 1: return [2 /*return*/, (_a.sent())
                                            === 'chart-warning ng-hide'];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line:variable-name
    helper.prototype.DownloadingChartPNGImage = function (DownloadMenu, elemChartPNG, FileName, FileType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /** Downloading Chart PNG Image */
                        protractor_1.browser.sleep(1000);
                        //   if (!fs.existsSync(downloadsPath)) {
                        //     fs.mkdirSync(downloadsPath)
                        // }
                        this.deleteAlreadyDownloadedFiles(FileName);
                        protractor_1.browser.sleep(2000);
                        return [4 /*yield*/, DownloadMenu.click()];
                    case 1:
                        _a.sent();
                        protractor_1.browser.sleep(2000);
                        return [4 /*yield*/, elemChartPNG.get(FileType).click()];
                    case 2:
                        _a.sent();
                        protractor_1.browser.sleep(2000);
                        this.verifyFileInDownloadsFolder(FileName);
                        return [2 /*return*/];
                }
            });
        });
    };
    // tslint:disable-next-line:variable-name
    helper.prototype.DownloadingChartCSV = function (DownloadMenu, elemChartCsv, FileName) {
        /** Downloading Chart PNG Image */
        protractor_1.browser.sleep(1000);
        //   if (!fs.existsSync(downloadsPath)) {
        //     fs.mkdirSync(downloadsPath)
        // }
        protractor_1.browser.actions().mouseMove(DownloadMenu).perform();
        this.deleteAlreadyDownloadedFiles(FileName);
        protractor_1.browser.sleep(3000);
        elemChartCsv.click();
        protractor_1.browser.sleep(3000);
        this.verifyFileInDownloadsFolder(FileName);
    };
    helper.prototype.DownloadingCSVFile = function (DownloadMenu, elemChartCsv, match) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                protractor_1.browser.actions().mouseMove(DownloadMenu).perform();
                protractor_1.browser.sleep(3000);
                elemChartCsv.click();
                protractor_1.browser.sleep(3000);
                protractor_1.browser.driver.wait(function () {
                    // tslint:disable-next-line:prefer-const
                    var filepath = downloadsPath + '\\';
                    // tslint:disable-next-line:prefer-const
                    var matcher = match;
                    var foundFile = false;
                    var fileExist;
                    fs.readdirSync(filepath).forEach(function (filename) {
                        if (matcher.test(filename)) {
                            foundFile = true;
                            fileExist = filename;
                            expect(foundFile).toBe(true, 'Failed to download file: ' + filename + ' in user directory' + filepath);
                            console.log('File download was successful');
                        }
                        protractor_1.browser.sleep(3000);
                        _this.deleteAlreadyDownloadedFiles(fileExist);
                    });
                    return foundFile;
                }, 30000);
                return [2 /*return*/];
            });
        });
    };
    helper.prototype.dataExplorerFilterColumn = function (elem, filterName) {
        elem.clear(); // clearting search container
        elem.click();
        elem.sendKeys(filterName); // Filter column
        this.dataExplorerNavigator.variableFilter.click();
        // tslint:disable-next-line:max-line-length
        protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.presenceOf(protractor_1.$('[ng-repeat="map in vm.maps"]')), 5000, 'Element taking too long to appear in the DOM');
        expect(protractor_1.element.all(protractor_1.by.repeater('map in vm.maps'))).toBeTruthy();
        elem.clear(); // clearing search container
    };
    /**
     * ZoomIN and ZoomOut
     */
    helper.prototype.ChartZoomOut = function (xtr) {
        protractor_1.browser.actions().
            mouseDown(protractor_1.$$('[class="highcharts-axis-line"]').first()).
            mouseMove(protractor_1.$('g.highcharts-series.highcharts-series-' + xtr + '.highcharts-line-series ')).
            // mouseMove($('[class="highcharts-series highcharts-series-4 highcharts-line-series "]')).
            mouseUp().
            perform();
    };
    /**
    * Double click an element
    */
    helper.prototype.doubleClicking = function (ele) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.actions().doubleClick(ele).perform()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    helper.prototype.dragANDdrop = function (source, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.driver.actions().dragAndDrop(source, target).mouseUp().perform()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    helper.prototype.selectWindow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var windows;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.getAllWindowHandles()];
                    case 1:
                        windows = _a.sent();
                        return [2 /*return*/, windows];
                }
            });
        });
    };
    helper.prototype.getNumberHighchartsVMLegendItem = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var highChartLegenItem;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.$$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g').count()];
                    case 1:
                        highChartLegenItem = _a.sent();
                        return [2 /*return*/, highChartLegenItem];
                }
            });
        });
    };
    helper.prototype.getListHighchartsVMLegendItem = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var highChartLegenItem;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.$$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g').getText()];
                    case 1:
                        highChartLegenItem = _a.sent();
                        return [2 /*return*/, highChartLegenItem];
                }
            });
        });
    };
    helper.prototype.HighchartsVMLegendItem = function (index) {
        // tslint:disable-next-line:max-line-length
        // const highChartLegenItem = $$('g.highcharts-legend').get(index).element(by.tagName('g')).element(by.tagName('g')).$$('g');
        var highChartLegenItem = protractor_1.$$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g');
        return highChartLegenItem;
    };
    helper.prototype.printPreview = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var printButton, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.$('[class="highcharts-button-symbol"]').click()];
                    case 1:
                        _a.sent();
                        protractor_1.browser.sleep(3000);
                        return [4 /*yield*/, protractor_1.$$('[class="highcharts-menu-item"]').first()];
                    case 2:
                        printButton = _a.sent();
                        result = protractor_1.browser.executeAsyncScript(function (elm, callback) {
                            function listener() {
                                callback(true);
                            }
                            window.print = listener;
                            elm.click();
                        }, printButton.getWebElement());
                        protractor_1.browser.sleep(3000);
                        expect(result).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        });
    };
    helper.prototype.rightClick = function (el) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loc = el.getLocation();
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove(loc).perform()];
                    case 1:
                        _a.sent(); // takes the mouse to hover the element
                        return [4 /*yield*/, protractor_1.browser.actions().click(protractor_1.protractor.Button.RIGHT).perform()];
                    case 2:
                        _a.sent(); // performs the right click
                        return [2 /*return*/];
                }
            });
        });
    };
    helper.prototype.waitingForElementTobeVisible = function (ele) {
        var _this = this;
        var EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.driver.wait(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                protractor_1.browser.wait(EC.visibilityOf(ele), 10000);
                return [2 /*return*/, ele];
            });
        }); });
    };
    // console error detection function
    helper.prototype.consoleErrorDetection = function () {
        protractor_1.browser.manage().logs().get('browser').then(function (browserLogs) {
            console.error('log: ' + JSON.stringify(browserLogs));
            // browser.executeScript(function() {console.error('An error has occurred.')})
            // browserLogs is an array of objects with level and message fields
            browserLogs.forEach(function (log) {
                console.log(log.level.value);
                if (log.level.value <= 900) { // it's an error log
                    console.log('Browser console error!');
                    console.log(log.message);
                }
            });
        });
    };
    helper.prototype.makeid = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return helper;
}(helper_1.Helper));
exports.helper = helper;
// tslint:disable-next-line:class-name
var alert = /** @class */ (function () {
    function alert() {
        this.alertCriteria = {
            // tslint:disable-next-line:max-line-length
            alertCriteriaTab: protractor_1.$('[ng-click="$ctrl.localChange(\'ActiveConfiguration\', \'Alerts\'); $ctrl.localChange(\'ShowHide Range Selector\', false)"]'),
            AnomalyAreaDefaultCheckBox: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AnomalyAreaDefault"]'),
            AnomalyOscillationDefaultCheckBox: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AnomalyOscillationDefault"]'),
            AnomalyFrequencyDefaultCheckBox: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AnomalyFrequencyDefault"]'),
            ActivateFrozenCheckBox: protractor_1.$$('[ng-model="$ctrl.alertsConfig.ActivateFrozen"]'),
            loadingSheen: protractor_1.$('[class="loadingSheen"]'),
            alertremovefilterISWatch: protractor_1.$('[ng-click="modelsVM.removeFilterItem(\'isWatch\')"]'),
            alertremovefilterISAlert: protractor_1.$('[ng-click="modelsVM.removeFilterItem(\'isAlert\')"]'),
            alertremovefilterISIgnore: protractor_1.$('[ng-click="modelsVM.removeFilterItem(\'isIgnore\')"]'),
            alertAnomalyAreaFastResponseTime: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaFastResponseTimeTemporalTypeID"]'),
            alertAnomalyAreaSlowResponseTime: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseTimeTemporalTypeID"]'),
            alertAnomalyOscillationDuration: protractor_1.$$('[ng-model="$ctrl.alertsConfig.OscillationDurationTemporalTypeID"]'),
            alertAnomalyFrequencyDuration: protractor_1.$$('[ng-model="$ctrl.alertsConfig.FrequencyDurationTemporalTypeID"]'),
            alertAnomalyFrozenDataDuration: protractor_1.$$('[ng-model="$ctrl.alertsConfig.FrozenDataDurationTemporalTypeID"]'),
            alertAnomalyOscillationDurationInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.OscillationDuration"]'),
            alertAnomalyFrozenDataDurationInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.FrozenDataDuration"]'),
            alertAnomalyFrequencyDurationInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.FrequencyDuration"]'),
            alertAnomalyAreaFastResponseTimeInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaFastResponseTime"]'),
            alertAnomalyAreaSlowResponseTimeInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseTime"]'),
            alertAnomalyAreaFastResponseValueInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaFastResponseValue"]'),
            alertAnomalyAreaSlowResponseValueInput: protractor_1.$$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseValue"]'),
            savebtn: protractor_1.$('[ng-click="$ctrl.localChange(\'SaveBatch\')"]'),
        };
        this.alertScreeningView = {
            modelConfiguration: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'modelConfiguration\')"]'),
            modeConfig: protractor_1.$("[ng-click=\"mnVM.selectAlert()\"]"),
            opmodeConfig: protractor_1.$("[ng-click=\"mnVM.selectView('opmode')\"]"),
            opmodeConfiguration: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'opModeConfiguration\')"]'),
            diagnosticDrilldown: protractor_1.$('[ng-click="modelsVM.doubleclick(modelsVM.selectedModel)"]'),
            clearAlertStatus: protractor_1.$('[ng-click="modelsVM.ignore(modelsVM.selectedModel)"]'),
            clearAlertDiagnose: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'clearDiagnose\')"]'),
            modelMaintenance: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'clearModelMaintenance\')"]'),
            createActionItem: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'createActionItem\')"]'),
            createOpenIssue: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'createOpenIssue\')"]'),
            showRelatedmodel: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'showRelatedModels\')"]'),
            showRelatedIssue: protractor_1.$('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'showRelatedIssues\')"]'),
            modelsVM: protractor_1.$$('[ng-repeat="model in modelsVM.models"]'),
            noteTxtBox: protractor_1.$('[ng-model="amVM.note"]'),
            saveNoteBtn: protractor_1.$('[ng-click="amVM.saveNow()"]'),
            cancelNoteBtn: protractor_1.$('[ng-click="amVM.close()"]'),
            setAsFavorite: protractor_1.$("[ng-model=\"amVM.favorite\"]"),
            priorityDropDownList: protractor_1.$("[ng-model=\"amVM.priority\"]"),
            issueClassDropdown: protractor_1.$("[id=\"issueClassDropdown\"]"),
            createNewIssuebtn: protractor_1.$("[ng-click=\"baseVM.createNewIssue(baseVM.newCategory)\"]"),
            cancelNewIssuebtn: protractor_1.$("[id=\"cancelNewBtn\"]"),
            createNewRelatedIssuebtn: protractor_1.$("[ng-click=\"amVM.createNew()\"]"),
            addNewIssueFilter: protractor_1.$$("[ng-click=\"issuesVM.addFilter()\"]"),
            addNewModelFilter: protractor_1.$$("[ng-click=\"modelsVM.addFilter()\"]"),
        };
        this.modelConfigView = {
            singleViewInputTab: protractor_1.$('[ng-click="mdlVM.activeConfiguration = \'Inputs\'"]'),
            singleViewAnomaliesTab: protractor_1.$('[ng-click="mdlVM.activeConfiguration = \'Anomalies\'"]'),
            singleViewAlertTab: protractor_1.$('[ng-click="mdlVM.activeConfiguration = \'Alerts\'"]'),
            singleViewDataTab: protractor_1.$('[ng-click="mdlVM.activeConfiguration = \'Data\'"]'),
        };
        this.OpmodelConfigView = {
            addNewOperatingModebta: protractor_1.$('[ng-click="opmdVM.addOpModeDef(\'Add\')"]'),
        };
        this.diagnosticDrilldown = {
            modelTrendTab: protractor_1.$('[ng-click="selectedTab=\'modelTrend\'"]'),
            modelHistoryTab: protractor_1.$('[ng-click="selectedTab=\'modelTimeline\'"]')
        };
        this.alerQuickDeployActionList = {
            qdActionList: protractor_1.$$('[ng-repeat="opModeType in mdlVM.opModeTypeOptions"]'),
            replaceAlert: protractor_1.$('[ng-click="qdVM.replace()"]'),
            autoApply: protractor_1.$('[ng-model="qdVM.autoApply"]')
        };
        this.alerCriteriaBoxError = {
            boxError: protractor_1.$$('[class="has-error"]')
        };
        this.alerToastMessage = {
            toastMessage: protractor_1.$('[class="toast-message"]')
        };
        this.one = new helper();
    }
    /**
  * single clicking the model name
  */
    alert.prototype.selectModelandClick = function (modelName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, e_3;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _b = (_a = protractor_1.$$('[class="text-right lightTableCell ng-binding"]')).get;
                        return [4 /*yield*/, protractor_1.$$('[class="text-right lightTableCell ng-binding"]')
                                .getText()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf(modelName)]).click()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Righ Clicking the model name
    */
    alert.prototype.rightClickingModelName = function (modelName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loc, _a, _b, e_4;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _b = (_a = protractor_1.$$('[class="text-right lightTableCell ng-binding"]')).get;
                        return [4 /*yield*/, protractor_1.$$('[class="text-right lightTableCell ng-binding"]')
                                .getText()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf(modelName)])];
                    case 2:
                        loc = _c.sent();
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove(loc).perform()];
                    case 3:
                        _c.sent(); // takes the mouse to hover the element
                        return [4 /*yield*/, protractor_1.browser.actions().click(protractor_1.protractor.Button.RIGHT).perform()];
                    case 4:
                        _c.sent(); // performs the right click
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _c.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * double clicking the model name
    */
    alert.prototype.selectModelandDoubleCLick = function (modelName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dblclickEle, _a, _b, e_5;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _b = (_a = protractor_1.$$('[class="text-right lightTableCell ng-binding"]')).get;
                        return [4 /*yield*/, protractor_1.$$('[class="text-right lightTableCell ng-binding"]')
                                .getText()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).indexOf(modelName)])];
                    case 2:
                        dblclickEle = _c.sent();
                        return [4 /*yield*/, protractor_1.browser.actions().doubleClick(dblclickEle).perform()];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Method will do Alert Quick Deploy on Old Regression Unit asset only
    */
    alert.prototype.alertQuickDeploy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loc, _a, _b, e_6, _c, _d, _e, _f, _g, _h, _j;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 5, , 6]);
                        _b = (_a = this.one.dataExplorerNavElemSelector.assetTree).get;
                        return [4 /*yield*/, this.one.dataExplorerNavElemSelector.assetTree.getText()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_k.sent()).indexOf('Old Regression Unit')])];
                    case 2:
                        loc = _k.sent();
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove(loc).perform()];
                    case 3:
                        _k.sent(); // takes the mouse to hover the element
                        return [4 /*yield*/, protractor_1.browser.actions().click(protractor_1.protractor.Button.RIGHT).perform()];
                    case 4:
                        _k.sent(); // performs the right click
                        return [3 /*break*/, 6];
                    case 5:
                        e_6 = _k.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _d = (_c = protractor_1.$$('[class="col-xs-6"]')).get;
                        return [4 /*yield*/, protractor_1.$$('[class="col-xs-6"]').getText()];
                    case 7: return [4 /*yield*/, _d.apply(_c, [(_k.sent()).indexOf('Quick Deploy')])
                            .$('[class="fa fa-caret-right"]').click()];
                    case 8:
                        _k.sent();
                        _f = (_e = this.alerQuickDeployActionList.qdActionList).get;
                        return [4 /*yield*/, this.alerQuickDeployActionList.qdActionList
                                .getText()];
                    case 9: 
                    // console.log(await $$('[ng-repeat="opModeType in mdlVM.opModeTypeOptions"]').getText());
                    return [4 /*yield*/, _f.apply(_e, [(_k.sent()).indexOf('Steady State')]).click()];
                    case 10:
                        // console.log(await $$('[ng-repeat="opModeType in mdlVM.opModeTypeOptions"]').getText());
                        _k.sent();
                        this.alerQuickDeployActionList.replaceAlert.isPresent().then(function (present) {
                            if (present) {
                                _this.alerQuickDeployActionList.autoApply.click();
                                _this.alerQuickDeployActionList.replaceAlert.click();
                            }
                        });
                        /** waiting for 7 minutes delay for backend services running necessary actions */
                        protractor_1.browser.wait(function () {
                            // return this.alertScreeningView.modelsVM.isPresent();
                        }, 420000).catch(function () {
                            protractor_1.browser.refresh();
                        }).then(function () {
                            protractor_1.browser.refresh();
                        });
                        _g = expect;
                        _h = Number;
                        return [4 /*yield*/, this.getTotalModelsONAlertScreeningView()];
                    case 11:
                        _g.apply(void 0, [_h.apply(void 0, [_k.sent()]) >= 3]).toBe(true, 'Something went wrong on QD expected number of models(3) is not meet');
                        _j = expect;
                        return [4 /*yield*/, this.alertScreeningView.modelsVM.count()];
                    case 12:
                        _j.apply(void 0, [(_k.sent()) >= 3]).toBe(true, 'Something went wrong on QD expected number of models(3) is not meet');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
  * Get the total number of alerts in alert screening view
  */
    alert.prototype.getTotalModelsONAlertScreeningView = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, protractor_1.$("[class=\"fullSpan ng-binding\"]").getText()];
                    case 1: 
                    // tslint:disable-next-line:no-unused-expression
                    return [2 /*return*/, (_a.sent()).split(":")[1]];
                    case 2:
                        e_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return alert;
}());
exports.alert = alert;
//# sourceMappingURL=performanceHelper.po.js.map