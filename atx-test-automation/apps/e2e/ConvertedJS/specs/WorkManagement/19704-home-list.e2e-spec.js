"use strict";
/**
 * Test Case: 19704
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19681
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
var workManagementPage = new Pages.IssueManagement();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var newCategory = Object.create(testDetails_data_1.categoryData);
var filterTags = ["tag1_" + casual.word + "_" + (new Date).getMilliseconds(),
    "tag2_" + casual.word + "_" + (new Date).getMilliseconds()];
describe('Work Management - Home List', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToWorkManagement();
        helper.selectClientMain(testDetails_data_1.automationAssetData.clientGroup, [testDetails_data_1.automationAssetData.clientName], testDetails_data_1.appName.issuesManagement);
    });
    it('should be able to DOWNLOAD issues in CSV', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            workManagementPage.downloadIssuesBtn.click();
            expect(helper.checkDownloads(testDetails_data_1.downloadFileName.issuesCSV)).toBeTruthy('File not downloaded');
            return [2 /*return*/];
        });
    }); });
    describe('Sort column', function () {
        it('should be able to sort by ID', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var columnDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sortColumn('ID')];
                    case 1:
                        columnDetails = _a.sent();
                        expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter, "Databefore: " + columnDetails.columnDataBefore + " should NOT be equal to DataAfter: " + columnDetails.columnDataAfter);
                        expect(columnDetails.tempBefore.sort().reverse()).toEqual(columnDetails.columnDataAfter, "tempBefore.reverse(): " + columnDetails.tempBefore.sort().reverse() + " should be equal to " + columnDetails.columnDataAfter);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to sort by TITLE', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var columnDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sortColumn('TITLE')];
                    case 1:
                        columnDetails = _a.sent();
                        expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter, "Databefore: " + columnDetails.columnDataBefore + " should NOT be equal to DataAfter: " + columnDetails.columnDataAfter);
                        // @ts-ignore
                        expect(columnDetails.tempBefore.map(function (x) { return x.toLowerCase(); }).sort().reverse())
                            // @ts-ignore
                            .toEqual(columnDetails.columnDataAfter.map(function (x) { return x.toLowerCase(); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to sort by STATUS', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var columnDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sortColumn('STATUS')];
                    case 1:
                        columnDetails = _a.sent();
                        expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter, "Databefore: " + columnDetails.columnDataBefore + " should NOT be equal to DataAfter: " + columnDetails.columnDataAfter);
                        // @ts-ignore
                        expect(columnDetails.tempBefore.map(function (x) { return x.toLowerCase(); }).sort().reverse())
                            // @ts-ignore
                            .toEqual(columnDetails.columnDataAfter.map(function (x) { return x.toLowerCase(); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to sort by CATEGORY', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var columnDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sortColumn('CATEGORY')];
                    case 1:
                        columnDetails = _a.sent();
                        expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter, "Databefore: " + columnDetails.columnDataBefore + " should NOT be equal to DataAfter: " + columnDetails.columnDataAfter);
                        // @ts-ignore
                        expect(columnDetails.tempBefore.map(function (x) { return x.toLowerCase(); }).sort().reverse())
                            // @ts-ignore
                            .toEqual(columnDetails.columnDataAfter.map(function (x) { return x.toLowerCase(); }));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ADD NEW FILTER', function () {
        it('should add ID filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filterObj, _a, columnData, countBefore;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, getRandomDataFromList('ID')];
                    case 1:
                        filterObj = (_a.id = _b.sent(), _a);
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('ID')];
                    case 2:
                        columnData = _b.sent();
                        countBefore = columnData.length;
                        expect(columnData[0]).toEqual(filterObj.id);
                        filterObj.id = '';
                        workManagementPage.addNewFilter(filterObj); // clear the field
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('ID')];
                    case 3:
                        columnData = _b.sent();
                        expect(countBefore).not.toEqual(columnData.length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should add TITLE filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filterObj, _a, columnData, countBefore;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, getRandomDataFromList('TITLE')];
                    case 1:
                        filterObj = (_a.title = _b.sent(), _a);
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('TITLE')];
                    case 2:
                        columnData = _b.sent();
                        expect(columnData.includes(filterObj.title));
                        countBefore = columnData.length;
                        filterObj.title = '';
                        workManagementPage.addNewFilter(filterObj); // clear the field
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('TITLE')];
                    case 3:
                        columnData = _b.sent();
                        expect(countBefore).not.toEqual(columnData.length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should add multile CATERGORY filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filterObj, _a, _b, columnData;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, getRandomDataFromList('CATEGORY')];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, getRandomDataFromList('CATEGORY')];
                    case 2:
                        filterObj = (_a.issueCategoryType = _b.concat([_c.sent()]),
                            _a);
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('CATEGORY')];
                    case 3:
                        columnData = _c.sent();
                        columnData.forEach(function (item) {
                            expect(filterObj.issueCategoryType.includes(item))
                                .toBeTruthy("filterObj.category: " + filterObj.issueCategoryType + " !== " + item);
                        });
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('CATEGORY')];
                    case 4:
                        columnData = _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        /* Not applicable for Work Management */
        // it('should add multile STATUS filter', async () => {
        //   const filterObj = {
        //     resolutionList: [await getRandomDataFromList('STATUS')
        //       , await getRandomDataFromList('STATUS')]
        //   };
        //   workManagementPage.addNewFilter(filterObj);
        //   let columnData = await workManagementPage.getColumnItemsByColName('STATUS');
        //   columnData.forEach(item => {
        //     expect(filterObj.resolutionList.includes(item))
        //       .toBeTruthy(`filterObj.resolutionList: ${filterObj.resolutionList} includes item: ${item}`);
        //   });
        //   workManagementPage.addNewFilter(filterObj);
        //   columnData = await workManagementPage.getColumnItemsByColName('RESOLUTION');
        // });
        it('should be able to filter using TAGS', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var issueCreateData, filterObj, columnData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createIssue([filterTags[0]])];
                    case 1:
                        issueCreateData = _a.sent();
                        filterObj = {
                            keyword: issueCreateData.details.tags.toString()
                        };
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('TITLE')];
                    case 2:
                        columnData = _a.sent();
                        expect(columnData.includes(issueCreateData.issueInfo.name))
                            .toBeTruthy("Issue not created. Title: " + columnData + " should include issue name: " + issueCreateData.issueInfo.name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('BUG 11818 - should be able to use MULTIPLE TAGS', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var issueCreateData, filterObj, columnData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createIssue([filterTags[1]])];
                    case 1:
                        issueCreateData = _a.sent();
                        filterObj = {
                            keyword: filterTags.toString()
                        };
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('TITLE')];
                    case 2:
                        columnData = _a.sent();
                        expect(columnData.length).toBeGreaterThan(0, 'Tag filters returns 0 results');
                        expect(columnData.includes(issueCreateData.issueInfo.name))
                            .toBeTruthy("Filter result does not contain Title:  " + issueCreateData.issueInfo.name);
                        filterObj.keyword = '';
                        workManagementPage.addNewFilter(filterObj); // clear the field
                        return [2 /*return*/];
                }
            });
        }); });
        it('use filter and switch asset, should have different result', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filterObj, _a, columnData1, columnData2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, getRandomDataFromList('ID')];
                    case 1:
                        filterObj = (_a.id = _b.sent(), _a);
                        workManagementPage.addNewFilter(filterObj);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('ID')];
                    case 2:
                        columnData1 = _b.sent();
                        helper.selectClientFromListMain(['Protractor Automation Test'], testDetails_data_1.appName.issuesManagement);
                        return [4 /*yield*/, workManagementPage.getColumnItemsByColName('ID')];
                    case 3:
                        columnData2 = _b.sent();
                        expect(columnData1).not.toEqual(columnData2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
function sortColumn(columnName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var columnDataBefore, column, columnDataAfter, tempBefore;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protractor_1.browser.waitForAngular();
                    return [4 /*yield*/, workManagementPage.getColumnItemsByColName(columnName)];
                case 1:
                    columnDataBefore = _a.sent();
                    column = workManagementPage.getColumnHeaderByText(columnName);
                    column.click();
                    return [4 /*yield*/, workManagementPage.getColumnItemsByColName(columnName)];
                case 2:
                    columnDataAfter = _a.sent();
                    tempBefore = columnDataBefore.map(function (x) { return x; });
                    return [2 /*return*/, {
                            columnDataBefore: columnDataBefore,
                            columnDataAfter: columnDataAfter,
                            tempBefore: tempBefore
                        }];
            }
        });
    });
}
function getRandomDataFromList(columnName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var columnData;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, workManagementPage.getColumnItemsByColName(columnName)];
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
                    helper.waitAndClick(workManagementPage.openNewItemBtn);
                    return [4 /*yield*/, util.getWindowHandles()];
                case 1:
                    tabWindow = _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[tabWindow.length - 1]);
                    return [4 /*yield*/, user.createNewIssue(issueCreateData, 'WM')];
                case 2:
                    _a.sent();
                    protractor_1.browser.switchTo().window(tabWindow[0]);
                    return [2 /*return*/, issueCreateData];
            }
        });
    });
}
//# sourceMappingURL=19704-home-list.e2e-spec.js.map