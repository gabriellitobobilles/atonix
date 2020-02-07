import { ElementFinder, browser, by, element, protractor, ElementArrayFinder, $, $$ } from 'protractor';
import { Helper } from '../helpers/helper';
import { } from '../helpers/extends/calendar-picker.helper';
import { Utils } from '../helpers/utils';
import {
  serverToTest,
  username,
  password
} from '../page/userAndServerCredential';


// import path = require('path');
import * as path from 'path';
import * as fs from 'fs';
import { List } from 'lodash';
// import fs = require('fs');

// const downloadsFolder = require('downloads-folder');
const downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');



// tslint:disable-next-line:class-name
class helper extends Helper {

  util = new Utils();


  // tslint:disable-next-line:variable-name
  public DispatchChart = {
    EditChartBtn: $$('[ng-click="buttonsVM.LaunchAdhoc()"]'),
    ToggleChartLegendLabelBtn: $('[ng-click="buttonsVM.ChangeLabels()"]'),
    EditChartSettingBtn: $$('[ng-click="buttonsVM.Settings()"]'),
    OpenChartInNewTabBtn: $$('[ng-click="buttonsVM.Zoom()"]'),
    EmailChartBtn: $('[ng-click="buttonsVM.Email()"]'),
    chartTitle: $('[ng-model="settingsVM.trendDefinition.Title"]'),
    DownloadChartContentBtn: $('[ng-click="buttonsVM.Download()"]'),
    DownloadCsvChartbtn: $('[ng-click="svm.downloadStats()"]'),
    pinName: $$('[ng-model="pin.NameFormat"]'),

  };
  public dataExplorerNavElemSelector = {
    assetNodeTree: $$('[class="assetTreeNode ng-scope"]'),
    assetChildNodeTree: $$('[ng-repeat="assetNode in asset.children"]'),
    assetExpander: $('[class="arrow-cursor fa fa-caret-right"]'),
    assetTreeController: $$('[ng-click="treeController.click(asset)"]'),
    assetTree: $$('[ng-click="sensorTreeController.click(asset)"]'),
    savePin: $('[ng-click="vm.addPin()"]'),
    addPins: $('[ng-click="settingsVM.addPin()"]'),
    pins: $$('[ng-click="vm.pinFocus(pin)"]'),


  };
  public performanceAnalystNavElemSelector = {
    assetNodeTree: $$('[class="assetTreeNode ng-scope"]'),
    assetChildNodeTree: $$('[ng-repeat="assetNode in asset.children"]'),
    assetExpander: $('[class="fa fa-caret-right"]')

  };

  public assetExplorerNavElemSelector = {
    assetNodeTree: $$('[class="assetTreeNode adhocTreeNode"]'),
    assetChildNodeTree: $$('[ng-repeat="adhocNode in node.children"]'),
    assetNode: $$('[ng-click="treeController.click(node)"]'),
  };

  public customeModelImport = {
    acmVMExit: $('[ng-click="acmVM.Exit()"]'),
    acmVMimportBtn: $('[ng-click="acmVM.import(acmVM.uploadFile)"]'),
    fileUpload: $('[name="fileUpload"]'),
    configurationIcon: $$('i#unique-1.fa.fa-button.ng-scope.fa-gear'),
    treeControllerEditMode: $('[ng-click="treeController.editMode()"]'),
    EditModeHide: $('[class="btn btn-default btn-sm fa fa-button fa-pencil ng-hide"]'),
    errorTextLocation: $('[class="error"]'),
  };

  public PAMap = {
    selectDiffmap: $('[ng-model="sekoiaSelectedGeospa"]'),
    multiSelectBtn: $('[class="btn multiSelectButton"]'),
    mapAttrTrayXpanded: $('[class="attribute-tray-right-popup expanded"]'),
    mapAttrTrayHidden: $('[class="attributeTab attributeTab-notAvailable"]'),
    mapAttrTrayTabSelected: $('[class="attributeTab attributeTab-selected"]'),
    clearAsset: $('[ng-click="aitVM.ClearAsset()"]'),
    GeoVismap: $('div.mapArea.map'),
    GeoSpaMap: $('[id="geoSpa_gc"]'),
    Rastemap: $('[ng-repeat="group in rasterVM.groups"]'),
    mapAssetHover: $('[id="bvHoverBox"]'),
    mapFilterBtn: $('[id="filterToggle"]'),
    mapAssetSearchBox: $('[ng-model="tagSearchPopupVM.searchText"]'),
    mapAssetSearchBtn: $('[class="btn btn-default btn-sm pull-right"]'),
    mapCircle: $$('circle'),
    saveSearchAsset: $('[ng-click="tagSearchPopupVM.saveQuickSearch(tagSearchPopupVM.selectedQuickSearch)"]'),
    assetCategoryTextbox: $('[ng-model="aConCatVM.Candidate"]'),
    quickSearchSavebtn: $('[ng-click="saveQuickSearchVm.ok()"]'),
    expandCategoryPane: $$('[ng-repeat="c in aConCatVM.ExpandedCategories"]'),
    categoryAddBtn: $('[ng-click="aConCatVM.addCandidate()"]'),
    saveQuickSearchVmName: $('[ng-model="saveQuickSearchVm.name"]'),
    saveQuickSearchVmOKBtn: $('[ng-click="saveQuickSearchVm.ok()"]'),
    clearSearchBtn: $('[ng-click="tagSearchPopupVM.clearSearch()"]'),
    advancedSettings: $('[ng-model="tagSearchPopupVM.advancedSettings"]'),
    advanceSettingMap: $('[ng-model="tagSearchPopupVM.selectedMap"]'),
    saveQuickSearchVmisPublic: $('[ng-model="saveQuickSearchVm.isPublic"]'),
    basemapWrapImageBtn: $$('[class="basemapWrap"]'),
    basemapWrapTriggerTab: $$('[id="trigger-tab"]')
  };

  public PAlerts = {

    filterItem: $$('[class="filterItem"]'),
    chevronDown: $('[class="fa fa-button fa-lg fa-chevron-down"]'),
    chevronUp: $('[class="fa fa-button fa-lg fa-chevron-up"]'),
    alertTimelineVM: $('[ng-show="alertTimelineVM.tempfilter.actionItemTypeID.length > 0"]'),
  };

  // tslint:disable-next-line:variable-name
  public DownloadOption = {
    ChartContextMenuBtn: $('[class="highcharts-button-symbol"]'),
    DownLoadListOption: $$('[class="highcharts-menu-item"]'),
    CsvContextMenuBtn: $('#trigger-tab'),
  };

  public downloadFileName = {
    JPEG: 'chart.jpg',
    PNG: 'chart.png',
    PDF: 'chart.pdf',
    CSV: 'chart.csv',
  };

  public downloadFileType = {
    FilePNG: 1,
    FileJPEG: 0,
    FilePDF: 2,
  };

  public resetZoom = {
    ResetZoomBtn: $('[class=" highcharts-button-box"]'),
  };

  public selectTimeSlider = {
    calendarIcon: $('[id="calendarPopupButton"]'),
    calendarIconmap: $('[id="calendarPopupButtonIndicator"]'),
    startDatebox: $('[ng-model="trVM.popupConfiguration.date1"]'),
    startDateboxMap: $('[ng-model="trVM.popupConfigurationIndicator.date1"]'),
    endDatebox: $('[ng-model="trVM.popupConfiguration.date2"]'),
    calendarApplybtn: $$('[ng-click="trVM.applyPopup()"]'),
    calendarOKBtn: $$('[class="btn btn-primary"]'),
    calendarIconStart: $('[ng-click="trVM.popupConfiguration.openStart($event)"]'),
    calendarIconStartMap: $('[ng-click="trVM.popupConfigurationIndicator.openStart($event)"]'),
    calendarIconEnd: $('[ng-click="trVM.popupConfiguration.openEnd($event)"]'),
    dateIndicator: $('[id="navIndicatorDate"]'),

  };

  public dataExplorerNavigator = {
    assetFilter: $('[ng-model="tagAssetFilterTemp"]'),
    variableFilter: $('[ng-model="tagVariableFilterTemp"]'),
    nameFilter: $('[ng-model="tagNameFilterTemp"]'),
    descFilter: $('[ng-model="tagDescFilterTemp"]'),
    unitFilter: $('[ng-model="tagUnitsFilterTemp"]'),

  };

  public annotation = {
    editAnnotation: $('[ng-click="chartVM.editAnnotation()"]'),
    createAnnotation: $('[ng-click="caVM.cancel()"]'),
    deleteAnnotation: $('[ng-click="chartVM.deleteAnnotation()"]'),

  };

  public annotationModal = {
    editAnnotationOkbtn: $('[ng-click="caVM.OK()"]'),
    editAnnotationCancelbtn: $('[ng-click="caVM.cancel()"]'),
    annotationCalendarIcon: $('[ng-click="caVM.openStart($event)"]'),
    annotationNotes: $('[ng-model="caVM.notes"]'),
    annotationTags: $('[ng-model="caVM.selectedTag"]'),
  };

  public atonixTrendButtons = {
    trenPauseBtn: $('[ng-click="pause = !pause"]'),
    changeLabel: $('[ng-click="trend.ChangeLabels()"]'),
    EditChartSettingBtn: $$('[ng-click="buttonsVM.Settings()"]'),
    nameDropdown: $('[id="newDropdown"]'),
    saveBtn: $('[ng-click="buttonsVM.Save()"]'),
    trenZoombtn: $('[ng-click="trend.Zoom()"]'),
    annotationBtn: $$('[ng-click="buttonsVM.Annotation()"]'),
  };

  public atonixSaveTrendDefinition = {
    titleTrend: $('[ng-model="saveVM.title"]'),
    linkedToAssestSelection: $$('[ng-click="ddVM.showDropdown()"]'),
    saveBtn: $('[ng-click="saveVM.OK()"]'),

  };


  public atonixCreateCharts = {
    createNewChartBtn: $('[ng-click="buttonsVM.CreateNew(\'time\')"]'),
    createNewChartGroupBtn: $('[ng-click="buttonsVM.CreateNew(\'grouped\')"]'),
  };

  public chartDropDown = {
    chartDropDownBtn: $('[id="chartDropdown"]'),
  };


  public chartSettingTab = {
    axis: element(by.linkText('Axis')),
    series: element(by.linkText('Series')),
    pin: element(by.linkText('Pins')),
    save: $('[ng-click="settingsVM.OK()"]'),
    chartType: $('[ng-model="settingsVM.trendDefinition.ChartTypeID"]'),
    seriesChartType: $$('[ng-model="s.ChartTypeID"]'),
    aggregation: $('[ng-model="settingsVM.summaryID"]'),
    pinType: $$('[ng-model="criteriaObjectId"]'),
    measurementType: $$('[ng-model="measurement.Type"]'),
    addMeasurement: $('[ng-click="settingsVM.CreateNewMeasurement()"]'),
    measurementName: $$('[ng-model="measurement.Name"]'),
    measurementSetting: $$('[ng-click="settingsVM.configure( measurement)"]'),
    measurementConfig: $$('[class="measureConfig ng-scope"]'),
    deleteMeasurement: $$('[ng-click="settingsVM.DeleteMeasurement(measurement)"]'),
    seriesFilter: $$('[ng-click="settingsVM.ToggleFilter(measurement)"]'),
    seriesFilterConfig: $$('[class="filterConfig ng-scope"]'),
    trendDataRetrieval: $$('[ng-model="settingsVM.trendDefinition.DataRetrieval.Method"]'),
    criteriaObjectId: $$('[ng-model="criteriaObjectId"]'),
    hidePin: $$('[ng-model="pin.Hidden"]'),
    removePin: $$('[ng-click="settingsVM.removePin(pin)"]'),
  };


  // GETTER elements: modal:Login

  getLoginModalUserEmail = () => {
    return element(by.id('inputEmailLogin'));
  };

  getLoginModalUserPwd = () => {
    return element(by.model('vm.Password'));
  };

  getLoginButton = () => {
    return element(by.id('inputSubmitLogin'));
  };

  getNavLogoutButton = () => {
    return element(by.css('[ng-click="navBarVM.logout()"]'));
  };

  getSelectScanariosVMClearBtn = () => {
    return $('[ng-click="selectScenariosVM.Clear()"]');
  };

  getSelectScanariosVMCancelBtn = () => {
    return $('[ng-click="selectScenariosVM.Cancel()"]');
  };
  getSelectScanariosVMOKBtn = () => {
    return $('[ng-click="selectScenariosVM.OK()"]');
  };

  getSelectScanariosVMFilterBtn = () => {
    return $('[ng-model="selectScenariosVM.filter"]');
  };

  // GETTER elements: modal:Apps Menu
  getNavAppsMenu = () => {
    return element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  };

  getNavPerformanceAnalystIcon = () => {
    return element.all(by.cssContainingText('.ng-binding', 'Performance Analyst')).get(1);
    // return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(16);
  };

  getNavMatIcon = () => {

    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(11);
    // return element(by.cssContainingText('.ng-binding', 'MATS'));
  };

  getNavIssueMgtIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Issues Management'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(10);
  };

  getNavAlertsIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Alerts'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(2);
  };

  getNavAdaptivePlanningIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Adaptive Planning Performance Analyst'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(0);
  };

  getNavAirPermitsIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Air Permits'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(1);
  };

  getNavArcFlashIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Arc Flash'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(3);
  };

  getNavAsset360Icon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Asset 360'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(4);
  };

  getNavAssetExplorerIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Asset Explorer'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(5);
  };

  getNavCriteriaObjectUtilityIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Criteria Object Utility'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(6);
  };

  getNavCSAPRIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'CSAPR'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(7);
  };

  getNavEnvironmentalDashboardIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Environmental Dashboard'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(8);
  };

  getNavInvestmentAcceleratorIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Investment Accelerator'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(9);
  };
  getNavMicrogridIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Microgrid'));
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(13)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(12);
  };

  getNavnDTestRigIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'nD Test Rig'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(13);
  };

  getNavOldWaterMeterIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Old Water Meter'));
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(15)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(14);
  };

  getNavOptionsExplorerIcon = () => {

    // return element(by.cssContainingText('.ng-binding', 'Options Explorer'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(15);
  };

  getNavSEKOIAIcon = () => {
    // return element(by.cssContainingText('.ng-binding', 'SEKOIA'));
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(25)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(18);
  };

  getNavRiskMatrixIcon = () => {
    // Risk Matrix app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(22)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(22);
  };

  getNavWaterMeterIcon = () => {
    // Water Meter app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(34)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(33);
  };
  getNavWaterQualityPlatformIcon = () => {
    // Water Quality Platform app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(35)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(34);

  };
  getNavWaterReclamationIcon = () => {
    // Water Reclamation app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(36)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(35);

  };

  getNavWaterTreatmentIcon = () => {
    // Water Treatment app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(37)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(36);

  };

  getNavWaterCHPIcon = () => {
    // Wate CHP app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(33)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(32);
  };

  getNavUserAdministrationIcon = () => {
    // User Administration app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(30)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(29);
  };

  getNavViewExplorerIcon = () => {
    // View Explorer
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(31)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(30);
  };

  getNavVirtualTourIcon = () => {
    // Virtual Tour app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(32)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(31);
  };

  getNavWorkManagementIcon = () => {
    // work management app
    // return element(by.css('#appContextBox > div.ACList > div:nth-child(38)'));
    return element.all(by.repeater('ac in navBarVM.appContexts | orderBy:\'DisplayOrder\'')).get(37);
  };

  getAllAppsMenuIcon = () => {
    // App Menu box

    return element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  };

  getAppTitle = () => {

    return element(by.css('.appTitle'));

  };

  getToastErrorMsg = () => {

    return element(by.css('div.toast.toast-error'));

  };

  // ACTIONS: global

  open = () => {
    const EC = protractor.ExpectedConditions;
    browser.get(serverToTest);
    browser.sleep(5000);
    browser.wait(EC.elementToBeClickable(element(by.css('#inputSubmitLogin'))));
    browser.getTitle().then(webpagetitle => {
      expect(webpagetitle).toEqual('Welcome to ASSET360');
    });
    return browser.waitForAngular();
  };

  logout = () => {
    this.getNavLogoutButton().isDisplayed();
    return this.getNavLogoutButton().click();
  };



  // ACTIONS: login

  fillLoginForm = function () {
    this.getLoginModalUserEmail().clear().sendKeys(username);
    this.getLoginModalUserPwd().clear().sendKeys(password);
    // when the login button is enablead means that form is fulfilled
    return expect(this.getLoginButton().isEnabled()).toBeTruthy();
  };

  confirmLogin = function () {
    return this.getLoginButton().click();
  };

  // ACTIONS: Apps

  // Checking Apps Icon is Present on the Apps Menu
  checkAppMenu = function () {
    return expect(this.getNavAppsMenu().isEnabled()).toBeTruthy();
  };

  checkPerformanceAppIcon = function () {
    return expect(this.getNavPerformanceAnalystIcon().isEnabled()).toBeTruthy();
  };

  checkMatIcon = function () {
    return expect(this.getNavMatIcon().isEnabled()).toBeTruthy();
  };

  checkIssueMgtIcon = function () {
    return expect(this.getNavIssueMgtIcon().isEnabled()).toBeTruthy();
  };

  checkAlertsIcon = function () {
    return expect(this.getNavAlertsIcon().isEnabled()).toBeTruthy();
  };

  checkAdaptivePlanningIcon = function () {
    return expect(this.getNavAdaptivePlanningIcon().isEnabled()).toBeTruthy();
  };

  checkAirPermitsIcon = function () {
    return expect(this.getNavAirPermitsIcon().isEnabled()).toBeTruthy();
  };

  checkArcFlashIcon = function () {
    return expect(this.getNavArcFlashIcon().isEnabled()).toBeTruthy();
  };

  checkAsset360Icon = function () {
    return expect(this.getNavAsset360Icon().isEnabled()).toBeTruthy();
  };

  checkAssetExplorerIcon = function () {
    return expect(this.getNavAssetExplorerIcon().isEnabled()).toBeTruthy();
  };

  checkCriteriaObjectUtilityIcon = function () {
    return expect(this.getNavCriteriaObjectUtilityIcon().isEnabled()).toBeTruthy();
  };

  checkCSAPRIcon = function () {
    return expect(this.getNavCSAPRIcon().isEnabled()).toBeTruthy();
  };

  checkEnvironmentalDashboardIcon = function () {
    return expect(this.getNavEnvironmentalDashboardIcon().isEnabled()).toBeTruthy();
  };
  checkInvestmentAcceleratorIcon = function () {
    return expect(this.getNavInvestmentAcceleratorIcon().isEnabled()).toBeTruthy();
  };
  checkMicrogridIcon = function () {
    return expect(this.getNavMicrogridIcon().isEnabled()).toBeTruthy();
  };

  checknDTestRigIcon = function () {
    return expect(this.getNavnDTestRigIcon().isEnabled()).toBeTruthy();
  };

  checkOldWaterMeterIcon = function () {
    return expect(this.getNavOldWaterMeterIcon().isEnabled()).toBeTruthy();
  };

  checkOptionsExplorerIcon = function () {
    return expect(this.getNavOptionsExplorerIcon().isEnabled()).toBeTruthy();
  };

  checkSEKOIAIcon = function () {
    return expect(this.getNavSEKOIAIcon().isEnabled()).toBeTruthy();
  };

  checkRiskMatrixIcon = function () {
    return expect(this.getNavRiskMatrixIcon().isEnabled()).toBeTruthy();
  };

  checkWaterMeterIcon = function () {
    return expect(this.getNavWaterMeterIcon().isEnabled()).toBeTruthy();
  };

  checkWaterQualityPlatformIcon = function () {
    return expect(this.getNavWaterQualityPlatformIcon().isEnabled()).toBeTruthy();
  };

  checkWaterReclamationIcon = function () {
    return expect(this.getNavWaterReclamationIcon().isEnabled()).toBeTruthy();
  };

  checkWaterTreatmentIcon = function () {
    return expect(this.getNavWaterTreatmentIcon().isEnabled()).toBeTruthy();
  };

  checkWaterCHPIcon = function () {
    return expect(this.getNavWaterCHPIcon().isEnabled()).toBeTruthy();
  };

  checkUserAdministrationIcon = function () {
    return expect(this.getNavUserAdministrationIcon().isEnabled()).toBeTruthy();
  };

  checkViewExplorerIcon = function () {
    return expect(this.getNavViewExplorerIcon().isEnabled()).toBeTruthy();
  };

  checkVirtualTourIcon = function () {
    return expect(this.getNavVirtualTourIcon().isEnabled()).toBeTruthy();
  };

  checkWorkManagementIcon = function () {
    return expect(this.getNavWorkManagementIcon().isEnabled()).toBeTruthy();
  };

  checkAllAppMenuIcon = function () {
    return expect(this.getAllAppsMenuIcon().isEnabled()).toBeTruthy();
  };

  // Click Apps icon on the Apps Menu

  clickAppMenu = function () {
    return this.getNavAppsMenu().click();
  };

  clickPerformanceAnalysApp = async (apps: string) => {
    // return this.getNavPerformanceAnalystIcon().click();
    // tslint:disable-next-line:prefer-const
    let appsName = await $$('[ng-click="navBarVM.clickAppContext(ac)"]').getText();
    await $$('[ng-click="navBarVM.clickAppContext(ac)"]').get(appsName.indexOf(apps)).click();
  };

  clickPerformanceViewsTab = async (tabName: string) => {
    // return this.getNavPerformanceAnalystIcon().click();
    // tslint:disable-next-line:prefer-const
    let TabName = await $$('[ng-click="vm.selectView(view)"]').getText();
    await $$('[ng-click="vm.selectView(view)"]').get(TabName.indexOf(tabName)).click();
  };

  clickMatApp = function () {
    return this.getNavMatIcon().click();
  };

  clickIssueMgtApp = function () {
    return this.getNavIssueMgtIcon().click();
  };

  clickAlertsApp = function () {
    return this.getNavAlertsIcon().click();
  };

  clickAdaptivePlanningApp = function () {
    return this.getNavAdaptivePlanningIcon().click();
  };

  clickAirPermitsApp = function () {
    return this.getNavAirPermitsIcon().click();
  };

  clickArcFlashApp = function () {
    return this.getNavArcFlashIcon().click();
  };

  clickAsset360App = function () {
    return this.getNavAsset360Icon().click();
  };

  clickAssetExplorerApp = function () {
    return this.getNavAssetExplorerIcon().click();
  };

  clickCriteriaObjectUtilityrApp = function () {
    return this.getNavCriteriaObjectUtilityIcon().click();
  };

  clickCSAPRApp = function () {
    return this.getNavCSAPRIcon().click();
  };

  clickEnvironmentalDashboardApp = function () {
    return this.getNavEnvironmentalDashboardIcon().click();
  };
  clickInvestmentAcceleratorApp = function () {
    return this.getNavInvestmentAcceleratorIcon().click();
  };
  clickMicrogridApp = function () {
    return this.getNavMicrogridIcon().click();
  };

  clicknDTestRigApp = function () {
    return this.getNavnDTestRigIcon().click();
  };

  clickOldWaterMeterApp = function () {
    return this.getNavOldWaterMeterIcon().click();
  };

  clickOptionsExplorerApp = function () {
    return this.getNavOptionsExplorerIcon().click();
  };

  clickSEKOIAApp = function () {
    return this.getNavSEKOIAIcon().click();
  };

  clickRiskMatrixApp = function () {
    return this.getNavRiskMatrixIcon().click();
  };

  clickWaterMeterApp = function () {
    return this.getNavWaterMeterIcon().click();
  };

  clickWaterQualityPlatformApp = function () {
    return this.getNavWaterQualityPlatformIcon().click();
  };

  clickWaterReclamationApp = function () {
    return this.getNavWaterReclamationIcon().click();
  };

  clickWaterTreatmentApp = function () {
    return this.getNavWaterTreatmentIcon().click();
  };

  clickWaterCHPApp = function () {
    return this.getNavWaterCHPIcon().click();
  };

  clickUserAdministrationApp = function () {
    return this.getNavUserAdministrationIcon().click();
  };

  clickViewExplorerApp = function () {
    return this.getNavViewExplorerIcon().click();
  };

  clickVirtualTourApp = function () {
    return this.getNavVirtualTourIcon().click();
  };

  clickWorkManagementApp = function () {
    return this.getNavWorkManagementIcon().click();
  };

  /** Will transfer it to Utility Page Object */
  getCurrentDate = () => {

    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const today = (month) + '/' + (day) + '/' + now.getFullYear();
    return today;

  };

  getPreviousdaysDate = (x: number) => {

    const now = new Date(new Date().setDate(new Date().getDate() - x));
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const today = (month) + '/' + (day) + '/' + now.getFullYear();
    return today;
  };

  getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  deleteAlreadyDownloadedFiles = (namefile: string) => {

    // var filename = downloadsPath+ '/chart.csv';
    const filename = (downloadsPath + '\\' + namefile).replace(/\\/g, '/');

    if (fs.existsSync(filename)) {
      // delete if there is any existing file with same name
      fs.unlinkSync(filename);
    }

  };

  assetList = async (elem: ElementArrayFinder) => {

    const assetMenu = await elem.getText();
    return assetMenu;

  };

  async comparedropdownListValue(elem: ElementFinder, optionNum: string[]) {
    const values = await elem.all(by.tagName('option')).getAttribute('textContent');
    expect(values).toEqual(optionNum);

  }

  selectDropdownbyNum = (elem: ElementFinder, optionNum: number) => {
    if (optionNum) {
      const options = elem.all(by.tagName('option'))
        // tslint:disable-next-line:no-shadowed-variable
        .then((options) => {
          options[optionNum].click();
        });
    }
  };

  selectDropdownbyString = (elem: ElementFinder, typeName: string) => {
    elem.element(by.cssContainingText('option', typeName)).click();
  };

  // public expectDropdownListOptionPresence(elem: ElementFinder, optionText: string) {
  //   const allOptions = elem.all(by.tagName('option')).map((option) => {
  //     return option.getText();
  //   });

  //   expect(allOptions).toContain(optionText);
  // }

  public expectDropdownListOptionPresence(elem: ElementFinder, optionText: string) {
    const foundOptions = elem.all(by.tagName('option')).filter((option) => {
      return option.getText().then((text) => {
        foundOptions[optionText].click();
        return text === optionText;
      });
    });

    expect(foundOptions.count()).toBeGreaterThan(0);
  }


  async verifyFileInDownloadsFolder(fileName: string) {
    await console.log('Getting users download path ' + downloadsPath);
    const filePath = (downloadsPath + '\\' + fileName).replace(/\\/g, '/');
    await console.log('Getting the path ' + filePath);
    await browser.wait(async () => fs.existsSync(filePath));
    await expect(fs.existsSync(filePath)).toBe(true,
      'Failed to download file: ' + fileName + ' in user directory' + filePath);
    await console.log('File download was successful');
  }

  /**
  * Search and Select Data Explorer trend by passing string(Trend Name)
  * @param {string} trendName
  */

  async selectingDataExplorerTrends(trendName: string) {

    // tslint:disable-next-line:prefer-const
    let strTrendLength = trendName.length;
    // console.log(strTrendLength);
    // tslint:disable-next-line:prefer-const
    // let val2 = await $$('[ng-repeat="chartSummary in trends"]').getText();
    // tslint:disable-next-line:prefer-const
    let val2 = await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent');
    // console.log(await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent'));
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < val2.length; ++index) {
      // tslint:disable-next-line:prefer-const
      let value = val2[index];
      if (value.substring(0, strTrendLength) === trendName) {
        // console.log(value);
        // expect(val2.indexOf('GabrielTest (' + sensor + ')') > -1).toBe(true, 'Your not successfully created a Trend');
        expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
        expect($$('i.fa.fa-trash-o').get(val2.indexOf(value))
          .isPresent()).toBe(true, 'Delete icon is not present');
        browser.sleep(3000);
        // await element.all(by.repeater('chartSummary in trends')).get(val2.indexOf('GabrielTest (' + sensor + ')')).click();
        // console.log(await val2.indexOf(value));
        try {
          await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(val2.indexOf(value)).click();
        } catch (e) {

        }



      }
    }

  }

  async selectingPerformanceAnalystTrends(trendName: string) {

    // tslint:disable-next-line:prefer-const
    let strTrendLength = trendName.length;
    // console.log(strTrendLength);
    // tslint:disable-next-line:prefer-const
    // let val2 = await $$('[ng-repeat="chartSummary in trends"]').getText();
    // tslint:disable-next-line:prefer-const
    let val2 = await $$('[ng-bind-html="chartVM.getSeriesText(chartSummary)"]').getAttribute('textContent');
    // console.log(await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent'));
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < val2.length; ++index) {
      // tslint:disable-next-line:prefer-const
      let value = val2[index];
      if (value.substring(0, strTrendLength) === trendName) {
        // console.log(value);
        // expect(val2.indexOf('GabrielTest (' + sensor + ')') > -1).toBe(true, 'Your not successfully created a Trend');
        expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
        expect($$('i.fa.fa-trash-o').get(val2.indexOf(value))
          .isPresent()).toBe(true, 'Delete icon is not present');
        browser.sleep(3000);
        // await element.all(by.repeater('chartSummary in trends')).get(val2.indexOf('GabrielTest (' + sensor + ')')).click();
        // console.log(await val2.indexOf(value));
        try {
          await $$('[ng-bind-html="chartVM.getSeriesText(chartSummary)"]').get(val2.indexOf(value)).click();
        } catch (e) {

        }


      }
    }

  }

  /**
   * Search and delete Data Explorer trend by passing string(Trend Name)
   * @param {string} trendName
   */
  async deletingDataExplorerTrends(trendName: string) {

    const strTrendLength = trendName.length;
    const val2 = await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent');
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < val2.length; ++index) {
      const value = val2[index];
      if (value.substring(0, strTrendLength) === trendName) {
        // ** Check if the Delete Icon is present */
        expect($$('i.fa.fa-trash-o').get(val2.indexOf(value))
          .isPresent()).toBe(true, 'Delete icon is not present');

        // ** Deleted Created Trend */
        $$('i.fa.fa-trash-o').get(val2.indexOf(value)).click(); // Delete created trend
        browser.sleep(2000);
        const ale = browser.switchTo().alert();
        ale.accept();
        browser.waitForAngular();
        // browser.refresh();
        // browser.sleep(2000);
        // this.chartDropDown.chartDropDownBtn.click();
        browser.sleep(2000);
        // const deletedVal = await $$('[ng-repeat="chartSummary in trends"]').getText();
        const deletedVal = await $$('[ng-repeat="chartSummary in trends"]').getAttribute('textContent');
        // console.log(newval);
        expect(deletedVal.indexOf(value) < 0).toBe(true, 'Save as trend was not deleted');
      }
    }

  }




  /**
  * Verify zoom in & zoom out feature.
  *
  */

  async verifyZoomInAndZoomOutInMap() {

    browser.waitForAngular();
    browser.sleep(3000);
    const defaulZoomvalue = await $('[id="geoSpa"]').getAttribute('data-zoom');
    expect(defaulZoomvalue).not.toEqual(null, 'default Zoom value is null');
    // console.log(defaulZoomvalue);
    browser.sleep(3000);
    $$('[class="esriSimpleSliderIncrementButton"]').last().click(); // ZoomOut
    browser.waitForAngular();
    browser.sleep(3000);
    const ZoomOutvalue = await $('[id="geoSpa"]').getAttribute('data-zoom');
    expect(ZoomOutvalue !== defaulZoomvalue).toBe(true, 'Zoom Out feature is not working');
    // console.log(ZoomOutvalue);
    $$('[class="esriSimpleSliderDecrementButton"]').last().click(); // ZoomIn
    browser.sleep(3000);
    $$('[class="esriSimpleSliderDecrementButton"]').last().click(); // ZoomIn
    browser.waitForAngular();
    browser.sleep(3000);
    const ZoomInvalue = await $('[id="geoSpa"]').getAttribute('data-zoom');
    expect(ZoomInvalue !== defaulZoomvalue).toBe(true, 'Zoom In feature is not working');
    // console.log(ZoomInvalue);


  }

  /**
  * Selection Trend on the Dropdown
  */
  // tslint:disable-next-line:adjacent-overload-signatures
  async trendSelector() {
    browser.driver.wait(async () => {
      browser.wait(protractor.ExpectedConditions.visibilityOf(this.chartDropDown.chartDropDownBtn), 10000);
      return this.chartDropDown.chartDropDownBtn;
    });
    browser.wait(protractor.ExpectedConditions.stalenessOf($('[class="text-center text-dark"]')));
    browser.waitForAngular();
    this.chartDropDown.chartDropDownBtn.click();
  }


  /**
  * wait for the pie chart to fully loaded
  */
  async waitingForPieChartToLoad() {

    await browser.wait(async () => await browser.element.all(by.css('[ng-show="pasVM.loading"]')).first()
      .getAttribute('class') === 'ng-hide');
  }

  /**
  * wait for the Table chart to fully loaded
  */
  async waitingFortableChartToLoad() {

    await browser.wait(async () => await browser.element(by.css('[ng-show="chartVM.statusMessage"]')).getAttribute('class')
      === 'chart-warning ng-hide');

  }

  // tslint:disable-next-line:variable-name
  async DownloadingChartPNGImage(DownloadMenu: ElementFinder, elemChartPNG: ElementArrayFinder, FileName: string, FileType: number) {
    /** Downloading Chart PNG Image */
    browser.sleep(1000);
    //   if (!fs.existsSync(downloadsPath)) {
    //     fs.mkdirSync(downloadsPath)
    // }
    this.deleteAlreadyDownloadedFiles(FileName);
    browser.sleep(2000);
    await DownloadMenu.click();
    browser.sleep(2000);
    await elemChartPNG.get(FileType).click();
    browser.sleep(2000);
    this.verifyFileInDownloadsFolder(FileName);

  }

  // tslint:disable-next-line:variable-name
  DownloadingChartCSV(DownloadMenu: ElementFinder, elemChartCsv: ElementFinder, FileName: string) {
    /** Downloading Chart PNG Image */
    browser.sleep(1000);
    //   if (!fs.existsSync(downloadsPath)) {
    //     fs.mkdirSync(downloadsPath)
    // }
    browser.actions().mouseMove(DownloadMenu).perform();
    this.deleteAlreadyDownloadedFiles(FileName);
    browser.sleep(3000);
    elemChartCsv.click();
    browser.sleep(3000);
    this.verifyFileInDownloadsFolder(FileName);

  }

  async DownloadingCSVFile(DownloadMenu: ElementFinder, elemChartCsv: ElementFinder, match) {

    browser.actions().mouseMove(DownloadMenu).perform();
    browser.sleep(3000);
    elemChartCsv.click();
    browser.sleep(3000);

    browser.driver.wait(() => {
      // tslint:disable-next-line:prefer-const
      let filepath = downloadsPath + '\\';
      // tslint:disable-next-line:prefer-const
      let matcher = match;
      let foundFile = false;
      let fileExist;

      fs.readdirSync(filepath).forEach((filename) => {
        if (matcher.test(filename)) {
          foundFile = true;
          fileExist = filename;
          expect(foundFile).toBe(true,
            'Failed to download file: ' + filename + ' in user directory' + filepath);
          console.log('File download was successful');

        }
        browser.sleep(3000);
        this.deleteAlreadyDownloadedFiles(fileExist);
      });
      return foundFile;
    }, 30000);

  }

  dataExplorerFilterColumn(elem: ElementFinder, filterName: string) {

    elem.clear(); // clearting search container
    elem.click();
    elem.sendKeys(filterName); // Filter column
    this.dataExplorerNavigator.variableFilter.click();
    // tslint:disable-next-line:max-line-length
    browser.wait(protractor.ExpectedConditions.presenceOf($('[ng-repeat="map in vm.maps"]')), 5000, 'Element taking too long to appear in the DOM');
    expect(element.all(by.repeater('map in vm.maps'))).toBeTruthy();
    elem.clear(); // clearing search container

  }

  /**
   * ZoomIN and ZoomOut
   */
  ChartZoomOut(xtr: any) {
    browser.actions().
      mouseDown($$('[class="highcharts-axis-line"]').first()).
      mouseMove($('g.highcharts-series.highcharts-series-' + xtr + '.highcharts-line-series ')).
      // mouseMove($('[class="highcharts-series highcharts-series-4 highcharts-line-series "]')).
      mouseUp().
      perform();

  }

  /**
  * Double click an element
  */
  async doubleClicking(ele: ElementFinder) {
    await browser.actions().doubleClick(ele).perform();

  }

  async dragANDdrop(source: ElementFinder, target: ElementFinder) {
    await browser.driver.actions().dragAndDrop(source, target).mouseUp().perform();

  }

  async selectWindow() {
    const windows = await browser.getAllWindowHandles();
    return windows;


  }

  async getNumberHighchartsVMLegendItem(index: number) {

    // tslint:disable-next-line:max-line-length
    // const highChartLegenItem = await $$('g.highcharts-legend').get(index).element(by.tagName('g')).element(by.tagName('g')).$$('g').count();
    const highChartLegenItem = await $$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g').count();
    return highChartLegenItem;
  }

  async getListHighchartsVMLegendItem(index: number) {

    // tslint:disable-next-line:max-line-length
    // const highChartLegenItem = await $$('g.highcharts-legend').get(index).element(by.tagName('g')).element(by.tagName('g')).$$('g').getText();
    const highChartLegenItem = await $$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g').getText();
    return highChartLegenItem;
  }

  HighchartsVMLegendItem(index: number) {

    // tslint:disable-next-line:max-line-length
    // const highChartLegenItem = $$('g.highcharts-legend').get(index).element(by.tagName('g')).element(by.tagName('g')).$$('g');
    const highChartLegenItem = $$('g.highcharts-legend').get(index).$$('g').first().$$('g').first().$$('g');
    return highChartLegenItem;
  }

  async printPreview() {

    await $('[class="highcharts-button-symbol"]').click();
    browser.sleep(3000);
    const printButton = await $$('[class="highcharts-menu-item"]').first();
    const result = browser.executeAsyncScript((elm, callback) => {
      function listener() {
        callback(true);
      }

      window.print = listener;
      elm.click();
    }, printButton.getWebElement());
    browser.sleep(3000);
    expect(result).toBeTruthy();
  }

  async rightClick(el) {
    const loc = el.getLocation();    // get the location of the element we want to click
    await browser.actions().mouseMove(loc).perform();   // takes the mouse to hover the element
    await browser.actions().click(protractor.Button.RIGHT).perform();    // performs the right click
  }

  waitingForElementTobeVisible(ele: ElementFinder) {

    const EC = protractor.ExpectedConditions;
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf(ele), 10000);
      return ele;
    });
  }

  // console error detection function
  consoleErrorDetection() {

    browser.manage().logs().get('browser').then((browserLogs) => {

      console.error('log: ' + JSON.stringify(browserLogs));
      // browser.executeScript(function() {console.error('An error has occurred.')})
      // browserLogs is an array of objects with level and message fields
      browserLogs.forEach((log) => {
        console.log(log.level.value);
        if (log.level.value <= 900) { // it's an error log
          console.log('Browser console error!');
          console.log(log.message);
        }
      });
    });

  }

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }

}

// tslint:disable-next-line:class-name
class alert {



  one: helper;

  constructor() {
    this.one = new helper();
  }

  public alertCriteria = {
    // tslint:disable-next-line:max-line-length
    alertCriteriaTab: $('[ng-click="$ctrl.localChange(\'ActiveConfiguration\', \'Alerts\'); $ctrl.localChange(\'ShowHide Range Selector\', false)"]'),
    AnomalyAreaDefaultCheckBox: $$('[ng-model="$ctrl.alertsConfig.AnomalyAreaDefault"]'),
    AnomalyOscillationDefaultCheckBox: $$('[ng-model="$ctrl.alertsConfig.AnomalyOscillationDefault"]'),
    AnomalyFrequencyDefaultCheckBox: $$('[ng-model="$ctrl.alertsConfig.AnomalyFrequencyDefault"]'),
    ActivateFrozenCheckBox: $$('[ng-model="$ctrl.alertsConfig.ActivateFrozen"]'),
    loadingSheen: $('[class="loadingSheen"]'),
    alertremovefilterISWatch: $('[ng-click="modelsVM.removeFilterItem(\'isWatch\')"]'),
    alertremovefilterISAlert: $('[ng-click="modelsVM.removeFilterItem(\'isAlert\')"]'),
    alertremovefilterISIgnore: $('[ng-click="modelsVM.removeFilterItem(\'isIgnore\')"]'),
    alertAnomalyAreaFastResponseTime: $$('[ng-model="$ctrl.alertsConfig.AreaFastResponseTimeTemporalTypeID"]'),
    alertAnomalyAreaSlowResponseTime: $$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseTimeTemporalTypeID"]'),
    alertAnomalyOscillationDuration: $$('[ng-model="$ctrl.alertsConfig.OscillationDurationTemporalTypeID"]'),
    alertAnomalyFrequencyDuration: $$('[ng-model="$ctrl.alertsConfig.FrequencyDurationTemporalTypeID"]'),
    alertAnomalyFrozenDataDuration: $$('[ng-model="$ctrl.alertsConfig.FrozenDataDurationTemporalTypeID"]'),
    alertAnomalyOscillationDurationInput: $$('[ng-model="$ctrl.alertsConfig.OscillationDuration"]'),
    alertAnomalyFrozenDataDurationInput: $$('[ng-model="$ctrl.alertsConfig.FrozenDataDuration"]'),
    alertAnomalyFrequencyDurationInput: $$('[ng-model="$ctrl.alertsConfig.FrequencyDuration"]'),
    alertAnomalyAreaFastResponseTimeInput: $$('[ng-model="$ctrl.alertsConfig.AreaFastResponseTime"]'),
    alertAnomalyAreaSlowResponseTimeInput: $$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseTime"]'),
    alertAnomalyAreaFastResponseValueInput: $$('[ng-model="$ctrl.alertsConfig.AreaFastResponseValue"]'),
    alertAnomalyAreaSlowResponseValueInput: $$('[ng-model="$ctrl.alertsConfig.AreaSlowResponseValue"]'),

    savebtn: $('[ng-click="$ctrl.localChange(\'SaveBatch\')"]'),

  };
  public alertScreeningView = {
    modelConfiguration: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'modelConfiguration\')"]'),
    modeConfig: $(`[ng-click="mnVM.selectAlert()"]`),
    opmodeConfig: $(`[ng-click="mnVM.selectView('opmode')"]`),
    opmodeConfiguration: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'opModeConfiguration\')"]'),
    diagnosticDrilldown: $('[ng-click="modelsVM.doubleclick(modelsVM.selectedModel)"]'),
    clearAlertStatus: $('[ng-click="modelsVM.ignore(modelsVM.selectedModel)"]'),
    clearAlertDiagnose: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'clearDiagnose\')"]'),
    modelMaintenance: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'clearModelMaintenance\')"]'),
    createActionItem: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'createActionItem\')"]'),
    createOpenIssue: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'createOpenIssue\')"]'),
    showRelatedmodel: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'showRelatedModels\')"]'),
    showRelatedIssue: $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'showRelatedIssues\')"]'),
    modelsVM: $$('[ng-repeat="model in modelsVM.models"]'),
    noteTxtBox: $('[ng-model="amVM.note"]'),
    saveNoteBtn: $('[ng-click="amVM.saveNow()"]'),
    cancelNoteBtn: $('[ng-click="amVM.close()"]'),
    setAsFavorite: $(`[ng-model="amVM.favorite"]`),
    priorityDropDownList: $(`[ng-model="amVM.priority"]`),
    issueClassDropdown: $(`[id="issueClassDropdown"]`),
    createNewIssuebtn: $(`[ng-click="baseVM.createNewIssue(baseVM.newCategory)"]`),
    cancelNewIssuebtn: $(`[id="cancelNewBtn"]`),
    createNewRelatedIssuebtn: $(`[ng-click="amVM.createNew()"]`),
    addNewIssueFilter: $$(`[ng-click="issuesVM.addFilter()"]`),
    addNewModelFilter: $$(`[ng-click="modelsVM.addFilter()"]`),
  };

  public modelConfigView = {
    singleViewInputTab: $('[ng-click="mdlVM.activeConfiguration = \'Inputs\'"]'),
    singleViewAnomaliesTab: $('[ng-click="mdlVM.activeConfiguration = \'Anomalies\'"]'),
    singleViewAlertTab: $('[ng-click="mdlVM.activeConfiguration = \'Alerts\'"]'),
    singleViewDataTab: $('[ng-click="mdlVM.activeConfiguration = \'Data\'"]'),

  };

  public OpmodelConfigView = {
    addNewOperatingModebta: $('[ng-click="opmdVM.addOpModeDef(\'Add\')"]'),
  };

  public diagnosticDrilldown = {
    modelTrendTab: $('[ng-click="selectedTab=\'modelTrend\'"]'),
    modelHistoryTab: $('[ng-click="selectedTab=\'modelTimeline\'"]')
  };

  public alerQuickDeployActionList = {

    qdActionList: $$('[ng-repeat="opModeType in mdlVM.opModeTypeOptions"]'),
    replaceAlert: $('[ng-click="qdVM.replace()"]'),
    autoApply: $('[ng-model="qdVM.autoApply"]')

  };
  public alerCriteriaBoxError = {

    boxError: $$('[class="has-error"]')
  };
  public alerToastMessage = {

    toastMessage: $('[class="toast-message"]')
  };


  /**
* single clicking the model name
*/

  async selectModelandClick(modelName: string) {

    try {
      await $$('[class="text-right lightTableCell ng-binding"]')
        .get((await $$('[class="text-right lightTableCell ng-binding"]')
          .getText()).indexOf(modelName)).click();
    } catch (e) {

    }
  }

  /**
  * Righ Clicking the model name
  */
  async rightClickingModelName(modelName: string) {

    try {
      const loc = await $$('[class="text-right lightTableCell ng-binding"]')
        .get((await $$('[class="text-right lightTableCell ng-binding"]')
          .getText()).indexOf(modelName));
      await browser.actions().mouseMove(loc).perform();   // takes the mouse to hover the element
      await browser.actions().click(protractor.Button.RIGHT).perform();    // performs the right click
    } catch (e) {

    }

  }

  /**
  * double clicking the model name
  */
  async selectModelandDoubleCLick(modelName: string) {
    try {
      const dblclickEle = await $$('[class="text-right lightTableCell ng-binding"]')
        .get((await $$('[class="text-right lightTableCell ng-binding"]')
          .getText()).indexOf(modelName));

      await browser.actions().doubleClick(dblclickEle).perform();

    } catch (e) {

    }
  }




  /**
  * Method will do Alert Quick Deploy on Old Regression Unit asset only
  */

  async alertQuickDeploy() {


    try {
      const loc = await this.one.dataExplorerNavElemSelector.assetTree.
        get((await this.one.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Old Regression Unit'));
      await browser.actions().mouseMove(loc).perform();   // takes the mouse to hover the element
      await browser.actions().click(protractor.Button.RIGHT).perform();    // performs the right click
    } catch (e) {

    }

    await $$('[class="col-xs-6"]').get((await $$('[class="col-xs-6"]').getText()).indexOf('Quick Deploy'))
      .$('[class="fa fa-caret-right"]').click();

    // console.log(await $$('[ng-repeat="opModeType in mdlVM.opModeTypeOptions"]').getText());
    await this.alerQuickDeployActionList.qdActionList.get((await this.alerQuickDeployActionList.qdActionList
      .getText()).indexOf('Steady State')).click();

    this.alerQuickDeployActionList.replaceAlert.isPresent().then((present) => {
      if (present) {
        this.alerQuickDeployActionList.autoApply.click();
        this.alerQuickDeployActionList.replaceAlert.click();
      }
    });

    /** waiting for 7 minutes delay for backend services running necessary actions */
    browser.wait(() => {
      // return this.alertScreeningView.modelsVM.isPresent();
    }, 420000).catch(() => {
      browser.refresh();
    }).then(() => {
      browser.refresh();
    });

    expect(Number(await this.getTotalModelsONAlertScreeningView()) >= 3).toBe(true,
      'Something went wrong on QD expected number of models(3) is not meet');
    expect(await this.alertScreeningView.modelsVM.count() >= 3).toBe(true,
      'Something went wrong on QD expected number of models(3) is not meet');

  }

  /**
* Get the total number of alerts in alert screening view
*/
  async getTotalModelsONAlertScreeningView() {
    try {
      // tslint:disable-next-line:no-unused-expression
      return (await $(`[class="fullSpan ng-binding"]`).getText()).split(`:`)[1];

    } catch (e) {

    }
  }


}
export {

  helper, alert

};
