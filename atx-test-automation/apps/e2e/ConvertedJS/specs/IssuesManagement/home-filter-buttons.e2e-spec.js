"use strict";
/**
 * Test Case: 19681 Extended - Filter buttons
 * https://dev.azure.com/AtonixDigital/Asset360/_workitems/edit/23870
 * Created a separate test just for the buttons because there are a lot of buttons/elements affected.
 * Note: This can be merged with TC: 19681 later on.
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var utils_1 = require("../../helpers/utils");
var protractor_1 = require("protractor");
var interface_1 = require("../../helpers/interface");
var casual = require("casual");
var user = new user_1.User();
var issueManagementPage = new Pages.IssueManagement();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var newCategory = Object.create(testDetails_data_1.categoryData);
var filterBtnIds = issueManagementPage.filterBtnIds;
var filterObj;
var calendarDates = {
    startDate: new Date('01-21-2017'),
    endDate: new Date('03-21-2018'),
    changeStartDate: new Date('01-22-2017'),
    changeEndDate: new Date('03-22-2018'),
    closeStartDate: new Date('01-23-2017'),
    closeEndDate: new Date('03-23-2018'),
};
describe('Issues Management - Filter Test Extented', function () {
    describe('Filter Buttons', function () {
        beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user.logIn(testDetails_data_1.userObj);
                        user.goToIssueManagement();
                        helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
                        _a = {};
                        return [4 /*yield*/, getRandomDataFromList('ID')];
                    case 1:
                        _a.id = _b.sent();
                        return [4 /*yield*/, getRandomDataFromList('TITLE')];
                    case 2:
                        _a.title = _b.sent();
                        return [4 /*yield*/, getRandomDataFromList('CATEGORY')];
                    case 3:
                        _a.issueCategoryType = [_b.sent()],
                            _a.impactCostLow = 0,
                            _a.impactCostHigh = 10,
                            _a.activityStatus = ['Closed'];
                        return [4 /*yield*/, getRandomDataFromList('RESOLUTION')];
                    case 4:
                        _a.resolutionStatus = [_b.sent()],
                            _a.startDate = '2019-02-05',
                            _a.endDate = '2019-03-05';
                        return [4 /*yield*/, getRandomDataFromList('CHANGED BY')];
                    case 5:
                        _a.changedBy = _b.sent(),
                            _a.changeStartDate = '2019-02-05',
                            _a.changeEndDate = '2019-02-05',
                            _a.closeStartDate = '2019-03-05',
                            _a.closeEndDate = '2019-03-05',
                            _a.assignedTo = 'assignedTest',
                            _a.keyword = 'tag_sample',
                            _a.openDurationLow = '1',
                            _a.openDurationHigh = '2';
                        return [4 /*yield*/, getRandomDataFromList('PRIORITY')];
                    case 6:
                        filterObj = (_a.priority = _b.sent(),
                            _a.scorecard = 'included',
                            _a.issueTypeID = ['test'],
                            _a);
                        issueManagementPage.addNewFilter(filterObj);
                        return [2 /*return*/];
                }
            });
        }); });
        Object.keys(filterBtnIds).forEach(function (key) {
            it("should show filter buttons after use - " + key.toUpperCase(), function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    expect(issueManagementPage.getFilterButtons(filterBtnIds[key]).isDisplayed())
                        .toBeTruthy("Filter: " + key + " is not visible");
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('Calendar Filter', function () {
        beforeAll(function () {
            helper.waitAndClick(issueManagementPage.addNewFilterBtn, 5000);
        });
        Object.keys(calendarDates).forEach(function (key) {
            it("should be able to use Calendar Picker - " + key.toUpperCase(), function () {
                issueManagementPage.selectFullDateFromCalendar(calendarDates[key], key);
                expect(getElementAttributeValue(key)).toEqual(formatDate(calendarDates[key]));
            });
        });
    });
});
function getRandomDataFromList(columnName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var columnData;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, issueManagementPage.getColumnItemsByColName(columnName)];
                case 1:
                    columnData = _a.sent();
                    return [2 /*return*/, util.getRandomFromArray(columnData)];
            }
        });
    });
}
function createIssue(tagsFilter) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var issueCreateData, tabWindow;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.sleep(2000);
                    issueCreateData = {
                        issueClass: newCategory.issueName,
                        issueCategory: null,
                        issueInfo: {
                            name: casual.word + casual.title,
                            priority: interface_1.PriorityValues.Low,
                            status: 'Open',
                            resolution: newCategory.resolutionStatus[0].name,
                            showOnScorecard: true,
                            shortSummary: casual.short_description,
                        },
                        details: {
                            tags: tagsFilter
                        }
                    };
                    issueManagementPage.openNewIssueBtn.click();
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[tabWindow.length - 1]);
                    return [4 /*yield*/, user.createNewIssue(issueCreateData)];
                case 2:
                    _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[0]);
                    return [2 /*return*/, issueCreateData];
            }
        });
    });
}
function formatDate(argDate) {
    var date = new Date(argDate);
    // tslint:disable-next-line:radix
    var month = parseInt(date.getMonth().toString()) + 1 < 10
        ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    // tslint:disable-next-line:radix
    var day = parseInt(date.getDate().toString()) < 10
        ? '0' + date.getDate().toString() : date.getDate();
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}
function getElementAttributeValue(filterStr) {
    return issueManagementPage.getFilterFieldElem(filterStr).getAttribute('value');
}
//# sourceMappingURL=home-filter-buttons.e2e-spec.js.map