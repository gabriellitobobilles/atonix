"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var utils_1 = require("../helpers/utils");
var helper_1 = require("../helpers/helper");
var issueManagement_addNewFilter_po_1 = require("./issueManagement-addNewFilter.po");
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var IssueManagement = /** @class */ (function (_super) {
    tslib_1.__extends(IssueManagement, _super);
    function IssueManagement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.configureWorkflowBtn = protractor_1.element(protractor_1.by.css('[ng-if="baseVM.canConfigureWorkflow"] > a'));
        _this.openNewIssueBtn = protractor_1.$("[title=\"Open New Issue\"]");
        _this.openNewItemBtn = protractor_1.$("[title=\"Open New Item\"]");
        // left chart - Issue count by resolution status
        _this.pieChart1 = protractor_1.$("[chart-name=\"issues_pie1\"] .highcharts-container");
        _this.issueCount1 = _this.pieChart1.$(".highcharts-subtitle");
        _this.addNewFilterBtn = protractor_1.$("div.filterAdd a[ng-click=\"issuesVM.addFilter()\"]");
        _this.downloadIssuesBtn = protractor_1.$("[class=\"fa fa-download\"]");
        // issue table list
        _this.issueRow = protractor_1.$$("tr[ng-repeat=\"issue in issuesVM.issues\"]"); // array
        _this.totalIssuesRow = protractor_1.$(".issueTable > tbody> tr > .fullSpan");
        _this.columnHeader = protractor_1.$$(".darkTableHeader.headerIssuesTemplateRow > td");
        _this.filterBtnIds = {
            id: 'idFilter',
            title: 'titleFilter',
            impactCostLow: 'impactCostLowFilter',
            impactCostHigh: 'impactCostHighFilter',
            activityStatus: 'activityStatusFilter',
            relationshipStatus: 'resolutionStatusFilter',
            startDate: 'startDateFilter',
            endDate: 'endDateFilter',
            changedBy: 'changedByFilter',
            changeStartDate: 'changeStartDateFilter',
            changeEndDate: 'changeEndDateFilter',
            closeStartDate: 'closeStartDateFilter',
            closeEndDate: 'closeEndDateFilter',
            assignedTo: 'assignedToFilter',
            keyword: 'keywordFilter',
            openDurationLow: 'openDurationLowFilter',
            openDurationHigh: 'openDurationHighFilter',
            priority: 'priorityFilter',
            scorecard: 'scorecardFilter',
            issueCategoryType: 'issueCategoryTypeFilter',
            issueTypeID: 'issueTypeIDFilter'
        };
        return _this;
    }
    /**
     * returns array of path for pie slices
     * @param pieChart - PieChart# element
     */
    IssueManagement.prototype.getPieSlices = function (pieChart) {
        return pieChart.$$("svg > g.highcharts-series-group > g.highcharts-series > path.highcharts-point");
    };
    /**
     * return array of visible pie slices
     * @param pieChart - PieChart# Element
     */
    IssueManagement.prototype.getPieSlicesVisible = function (pieChart) {
        return this.getPieSlices(pieChart)
            .filter(function (pie, idx) {
            return pie.getAttribute('visibility').then(function (visiblePie) {
                return visiblePie !== 'hidden';
            });
        });
    };
    IssueManagement.prototype.getPieLegends = function (pieChart) {
        return pieChart.$$("svg > g.highcharts-legend > g > g > g");
    };
    IssueManagement.prototype.getConfigureWfBtn = function () {
        return this.configureWorkflowBtn;
    };
    IssueManagement.prototype.goToConfigureWorkflow = function () {
        this.configureWorkflowBtn.click();
    };
    IssueManagement.prototype.getIssueDetailsById = function (issueNumber, issueNumberIdx) {
        if (issueNumberIdx === void 0) { issueNumberIdx = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var issueRowFound, issueDetails, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        issueRowFound = this.issueRow.filter(function (row) {
                            return row.$$('td').get(issueNumberIdx).getText().then(function (text) {
                                return text === issueNumber;
                            });
                        }).first();
                        issueDetails = issueRowFound.$$('td');
                        _a = {};
                        return [4 /*yield*/, issueDetails.get(0).getText()];
                    case 1:
                        _a.issueNumber = _b.sent();
                        return [4 /*yield*/, issueDetails.get(1).getText()];
                    case 2:
                        _a.name = _b.sent();
                        return [4 /*yield*/, issueDetails.get(3).getText()];
                    case 3:
                        _a.status = _b.sent();
                        return [4 /*yield*/, issueDetails.get(4).getText()];
                    case 4:
                        _a.resolution = _b.sent();
                        return [4 /*yield*/, issueDetails.get(9).getText()];
                    case 5:
                        _a.category = _b.sent();
                        return [4 /*yield*/, issueDetails.get(12).getText()];
                    case 6: return [2 /*return*/, (_a.priority = _b.sent(),
                            _a)];
                }
            });
        });
    };
    IssueManagement.prototype.getIssueDetailsByIdWM = function (issueNumber, issueNumberIdx) {
        if (issueNumberIdx === void 0) { issueNumberIdx = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var issueRowFound, issueDetails, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        issueRowFound = this.issueRow.filter(function (row) {
                            return row.$$('td').get(issueNumberIdx).getText().then(function (text) {
                                return text === issueNumber;
                            });
                        }).first();
                        issueDetails = issueRowFound.$$('td');
                        _a = {};
                        return [4 /*yield*/, issueDetails.get(0).getText()];
                    case 1:
                        _a.category = _b.sent();
                        return [4 /*yield*/, issueDetails.get(1).getText()];
                    case 2:
                        _a.issueNumber = _b.sent();
                        return [4 /*yield*/, issueDetails.get(2).getText()];
                    case 3:
                        _a.name = _b.sent();
                        return [4 /*yield*/, issueDetails.get(3).getText()];
                    case 4:
                        _a.status = _b.sent();
                        return [4 /*yield*/, issueDetails.get(4).getText()];
                    case 5:
                        _a.resolution = _b.sent();
                        return [4 /*yield*/, issueDetails.get(5).getText()];
                    case 6: return [2 /*return*/, (_a.priority = _b.sent(),
                            _a)];
                }
            });
        });
    };
    IssueManagement.prototype.getColumnHeaderByText = function (columnName) {
        return this.columnHeader.filter(function (column) {
            return column.getText().then(function (text) {
                return text.trim() === columnName;
            });
        }).first();
    };
    IssueManagement.prototype.getColumnItemsByColName = function (columnName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var col;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnID(columnName)];
                    case 1:
                        col = _a.sent();
                        return [2 /*return*/, this.issueRow.map(function (elem, index) {
                                return elem.$$("td").get(col.indexOf(columnName)).getText();
                            })];
                }
            });
        });
    };
    IssueManagement.prototype.getColumnID = function (colName) {
        return this.columnHeader.$$("b").map(function (p) {
            return p.getText();
        });
    };
    IssueManagement.prototype.getFilterButtons = function (filterBtnStr) {
        // return $(filterBtn);
        return protractor_1.element(protractor_1.by.id(filterBtnStr));
    };
    IssueManagement.prototype.getCalendarBtn = function (btnStr) {
        return protractor_1.$("[ng-click=\"issuesVM.showDatePicker($event,'" + btnStr + "')\"]");
    };
    IssueManagement.prototype.uploadFile = function () {
    };
    return IssueManagement;
}(issueManagement_addNewFilter_po_1.AddNewFilterForm));
exports.IssueManagement = IssueManagement;
//# sourceMappingURL=issueManagement.po.js.map