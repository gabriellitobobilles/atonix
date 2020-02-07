export var PaActionTypes;
(function (PaActionTypes) {
    PaActionTypes["CountIssueAndAlerts"] = "[PerformanceAnalystSummary] Load Count Issue and Alerts Parameters";
    PaActionTypes["CountIssueAndAlertsFailure"] = "[PerformanceAnalystSummary] Load Count Issue and Alerts Parameters Failure";
    PaActionTypes["ConfigurePieCharts"] = "[PerformanceAnalystSummary] Configure Pie Charts with Count Issue and Alerts";
    PaActionTypes["ConfigurePieChartsSuccess"] = "[PerformanceAnalystSummary] Configure Pie Charts Success";
})(PaActionTypes || (PaActionTypes = {}));
var CountIssueAndAlerts = /** @class */ (function () {
    function CountIssueAndAlerts(payload) {
        this.payload = payload;
        this.type = PaActionTypes.CountIssueAndAlerts;
    }
    return CountIssueAndAlerts;
}());
export { CountIssueAndAlerts };
var CountIssueAndAlertsFailure = /** @class */ (function () {
    function CountIssueAndAlertsFailure(payload) {
        this.payload = payload;
        this.type = PaActionTypes.CountIssueAndAlertsFailure;
    }
    return CountIssueAndAlertsFailure;
}());
export { CountIssueAndAlertsFailure };
var ConfigurePieCharts = /** @class */ (function () {
    function ConfigurePieCharts(payload) {
        this.payload = payload;
        this.type = PaActionTypes.ConfigurePieCharts;
    }
    return ConfigurePieCharts;
}());
export { ConfigurePieCharts };
var ConfigurePieChartsSuccess = /** @class */ (function () {
    function ConfigurePieChartsSuccess(payload) {
        this.payload = payload;
        this.type = PaActionTypes.ConfigurePieChartsSuccess;
    }
    return ConfigurePieChartsSuccess;
}());
export { ConfigurePieChartsSuccess };
//# sourceMappingURL=pa-summary.actions.js.map