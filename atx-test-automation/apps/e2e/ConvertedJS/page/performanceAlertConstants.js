"use strict";
// tslint:disable-next-line:file-name-casing
Object.defineProperty(exports, "__esModule", { value: true });
var AppName;
(function (AppName) {
    AppName["performanceAnalyst"] = "Performance Analyst";
    AppName["assetExplorer"] = "Asset Explorer";
    AppName["dataExplorer"] = "Data Explorer";
    AppName["Alert"] = "Alerts";
})(AppName || (AppName = {}));
exports.AppName = AppName;
var customModelErrorMessage;
(function (customModelErrorMessage) {
    customModelErrorMessage["InvalidfileSize"] = "Invalid file size. Valid file size is 1 KB < x < 100MB";
    customModelErrorMessage["InvalidfileExtension"] = "Invalid file extension. Valid file extensions are .xls, .xlsx or .xlsm.";
})(customModelErrorMessage || (customModelErrorMessage = {}));
exports.customModelErrorMessage = customModelErrorMessage;
var PerformanceTabName;
(function (PerformanceTabName) {
    PerformanceTabName["summary"] = "Summary";
    PerformanceTabName["alert"] = "Alerts";
    PerformanceTabName["financial"] = "Financial";
    PerformanceTabName["issues"] = "Issues";
    PerformanceTabName["OM"] = "OM";
    PerformanceTabName["map"] = "Map";
    PerformanceTabName["userChart"] = "User Charts";
    PerformanceTabName["forecast"] = "Forecast";
    PerformanceTabName["availability"] = "Availability";
    PerformanceTabName["report"] = "Report";
    PerformanceTabName["dispatch"] = "Dispatch";
})(PerformanceTabName || (PerformanceTabName = {}));
exports.PerformanceTabName = PerformanceTabName;
var alertTimelineVMtempfilter;
(function (alertTimelineVMtempfilter) {
    // tslint:disable-next-line:max-line-length
    alertTimelineVMtempfilter["alertTimelineVMtempfilter"] = "History:'Diagnose Set(0), Diagnose Cleared(0), Model Maintenance Set(0), Model Maintenance Cleared(0), Note Added(0)'";
})(alertTimelineVMtempfilter || (alertTimelineVMtempfilter = {}));
exports.alertTimelineVMtempfilter = alertTimelineVMtempfilter;
// tslint:disable-next-line:prefer-const
// let displayAs = ['Trend', 'Table', 'Radar'];
var chartSetting = {
    GroupSeriesChart: {
        displayAs: ['Trend', 'Table', 'Radar'],
        chartType: ['Line', 'Symbol', 'Column', 'Area', 'Box and Whiskers'],
    },
    SingleSeriesChart: {
        displayAs: ['Trend', 'Table', 'Radar'],
        chartType: ['Line', 'Symbol', 'Column', 'Area', 'Box and Whiskers'],
    }
};
exports.chartSetting = chartSetting;
var priorityOption = {
    priorityOptions: ['-None-', 'High', 'Medium', 'Low']
};
exports.priorityOption = priorityOption;
var issueClass = {
    issueClasses: ['Arc Flash', 'Asset Health', 'Compliance', 'Fuels', 'M&D', 'Membrane Cleaning', 'O&M',
        'Pole Attachment Program', 'Project Management']
};
exports.issueClass = issueClass;
var alertConstraintsTimeDuration = {
    timeDuration: ['Seconds', 'Minutes', 'Hours'],
    FrozenDataDurationtimeDuration: ['', 'Seconds', 'Minutes', 'Hours'],
};
exports.alertConstraintsTimeDuration = alertConstraintsTimeDuration;
var alertDataDuration = {
    dataDuration: ['21600.9', '360.9', '6.9'],
};
exports.alertDataDuration = alertDataDuration;
var alertScreeningViewTestData = {
    siitest: "AIR HEATER A ACTUAL GAS SIDE DP",
    siistage: "MILL 1D PA FLOW (1PU2DP01.PV)"
};
exports.alertScreeningViewTestData = alertScreeningViewTestData;
var alertSingleViewTestData = {
    siitest: "ID Fan 1 Motor Winding Temp",
    siistage: "ID Fan 1 Motor Winding Temp"
};
exports.alertSingleViewTestData = alertSingleViewTestData;
var mapDropDown = {
    SEKOIADemoClients_UGMHistoricalReliabilityPlan: ['Project Status', 'Program Status', 'SAIDI', 'SAIFI', 'CEMI', 'Voltage Violations',
        'Outage Events', 'Field Area Network'],
    DemoClients_EasternPC1: ['Boiler Air & Gas', 'Turbine Cycle', 'GeoVis Map']
};
exports.mapDropDown = mapDropDown;
var basemapWrap = ['satellite', 'dark-gray', 'gray', 'hybrid', 'national-geographic', 'oceans',
    'osm', 'streets', 'terrain', 'topo'];
exports.basemapWrap = basemapWrap;
var AlertDefaultFilter = ['WATCH:\'FALSE\'', 'ALERT:\'TRUE\'', 'IGNORE:\'FALSE\'', ''];
exports.AlertDefaultFilter = AlertDefaultFilter;
// tslint:disable-next-line:prefer-const
var getAppList = ['Performance Analyst', 'Investment Accelerator', 'Alerts', 'Issues Management',
    'Asset 360', 'Microgrid', 'Old Water Meter', 'Work Management',
    'Asset Explorer', 'Program Navigator', 'Risk Matrix', 'Risk Assessment'];
exports.getAppList = getAppList;
var getTagList = ['AMBIENT AIR TEMPERATURE (GPA tag replaced with measured FD Fan Inlet Temp tag) (MEAS:1GPATMBNT)',
    'RELATIVE HUMIDITY (AMBIENT_AIR:HUMIDITY)'];
exports.getTagList = getTagList;
var pinsType = ['Fixed (date/time entry)', 'Last 30 Minutes (Now)', 'Last 30 Minutes (Selected)',
    'Current Month (Now)', 'Current Month (Selected)', 'Previous Month (Now)',
    'Previous Month (Selected)', 'Yesterday (Now)', 'Yesterday (Selected)'];
exports.pinsType = pinsType;
var dataRetrieval = ['Use Default', 'Archive Selection', 'Minimum Data Interval'];
exports.dataRetrieval = dataRetrieval;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
exports.months = months;
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
exports.days = days;
//# sourceMappingURL=performanceAlertConstants.js.map