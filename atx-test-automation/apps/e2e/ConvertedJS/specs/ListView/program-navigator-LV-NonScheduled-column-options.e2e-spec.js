"use strict";
/**
 * Listview test for Program Navigator
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var utils_1 = require("../../helpers/utils");
var casual = require("casual");
var listview_po_1 = require("../../page/listview.po");
var listview = new listview_po_1.Listview();
var user = new user_1.User();
var programNavigatorPage = new Pages.ProgramNavigator();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    // parent: 'SEKOIA Demo Clients',
    // child: ['UGM Historical Reliability Plan']
    parent: testDetails_data_1.automationAssetData.clientGroup,
    child: [testDetails_data_1.automationAssetData.clientName]
};
var newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = programNavigatorPage.getTabNames();
var columnsToExpect;
describe('Non Scheduled Test', function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.logIn(testDetails_data_1.userObj);
                    user.navigateToApp(testDetails_data_1.appName.programNavigator);
                    return [4 /*yield*/, helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Column Options', function () {
        it('should verify Selected Columns are present in column options dialog', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var newQuickSearchColumn, colHeaders, selectedColumns;
            return tslib_1.__generator(this, function (_a) {
                user.openTab(tabNames.lists);
                newQuickSearchColumn = Object.create(newQuickSearch);
                listview.createQuickSearch(newQuickSearchColumn);
                colHeaders = listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator);
                listview.showColumnOptionsBtn.click();
                selectedColumns = listview.getSelectedColummns();
                expect(colHeaders).toEqual(selectedColumns);
                return [2 /*return*/];
            });
        }); });
        it('should be able to add new column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var availableColumns, selectedColumns, columnToAdd, columnToAddTemp, colHeaders, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return tslib_1.__generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4 /*yield*/, listview.getAvailableColumns()];
                    case 1:
                        availableColumns = _o.sent();
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 2:
                        selectedColumns = _o.sent();
                        columnsToExpect = selectedColumns;
                        columnToAdd = [];
                        columnToAdd.push(util.getRandomFromArray(helper.removeItemFromArrayByValue(availableColumns, selectedColumns)));
                        setSelectedColumns(columnToAdd);
                        columnsToExpect.push.apply(columnsToExpect, columnToAdd);
                        return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                    case 3:
                        colHeaders = _o.sent();
                        expect(colHeaders).toEqual(columnsToExpect);
                        helper.waitAndClick(listview.showColumnOptionsBtn); // options column options dialog
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 4:
                        selectedColumns = _o.sent();
                        expect(colHeaders).toEqual(selectedColumns);
                        columnToAdd = [];
                        columnToAddTemp = selectedColumns; // This part gathers columns to be added
                        _b = (_a = columnToAdd).push;
                        _d = (_c = util).getRandomFromArray;
                        _f = (_e = helper).removeItemFromArrayByValue;
                        return [4 /*yield*/, listview.getAvailableColumns()];
                    case 5:
                        _b.apply(_a, [_d.apply(_c, [_f.apply(_e, [_o.sent(),
                                    columnToAddTemp])])]);
                        columnToAddTemp.push.apply(columnToAddTemp, columnToAdd);
                        _h = (_g = columnToAdd).push;
                        _k = (_j = util).getRandomFromArray;
                        _m = (_l = helper).removeItemFromArrayByValue;
                        return [4 /*yield*/, listview.getAvailableColumns()];
                    case 6:
                        _h.apply(_g, [_k.apply(_j, [_m.apply(_l, [_o.sent(),
                                    columnToAddTemp])])]);
                        setSelectedColumns(columnToAdd); // adds the columns
                        helper.waitAndClick(listview.showColumnOptionsBtn);
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 7:
                        selectedColumns = _o.sent();
                        columnsToExpect.push.apply(columnsToExpect, columnToAdd);
                        columnsToExpect.forEach(function (col) {
                            expect(selectedColumns).toContain(col);
                        });
                        listview.cancelBtnColumnDialog.click();
                        return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                    case 8:
                        colHeaders = _o.sent();
                        columnsToExpect.forEach(function (col) {
                            expect(colHeaders).toContain(col);
                        });
                        helper.waitAndClick(listview.showColumnOptionsBtn); // open column options dialog
                        expect(listview.getSelectedColummns()).toEqual(colHeaders);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to rearrange columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var selectedColumnsBefore, columnData, selectedColumnsAfter, columnHeaders;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, listview.getSelectedColummns()];
                    case 1:
                        selectedColumnsBefore = _a.sent();
                        columnData = {
                            columnName: selectedColumnsBefore[selectedColumnsBefore.length - 1],
                            direction: 'up',
                            count: 2
                        };
                        listview.moveSelectedColumn(columnData);
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 2:
                        selectedColumnsAfter = _a.sent();
                        listview.okBtnColumnDialog.click();
                        listview.waitForSpinner();
                        return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                    case 3:
                        columnHeaders = _a.sent();
                        expect(columnHeaders).toEqual(selectedColumnsAfter);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to remove a column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var countToRemove, selectedColumnsBefore, columnToRemove, selectedColumnsAfter, columnHeaders;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper.waitAndClick(listview.showColumnOptionsBtn);
                        countToRemove = 2;
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 1:
                        selectedColumnsBefore = _a.sent();
                        columnToRemove = util.getRandomFromArrayMultiple(selectedColumnsBefore, countToRemove);
                        listview.removeColumns(columnToRemove);
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 2:
                        selectedColumnsAfter = _a.sent();
                        expect(selectedColumnsBefore.length - countToRemove).toEqual(selectedColumnsAfter.length);
                        listview.okBtnColumnDialog.click();
                        listview.waitForSpinner();
                        return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                    case 3:
                        columnHeaders = _a.sent();
                        expect(columnHeaders).toEqual(selectedColumnsAfter);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
function generateQuickSearch() {
    return {
        searchName: casual.word + (new Date().getTime()),
        searchTerm: "asset=*",
        makePublic: true,
        // applyToSelectedAsset: true,
        assetOption: listview.assetOptions.applyToSelectedAsset,
        categories: {
            toExpect: [],
            add: ["cat_" + casual.word + casual.random + "_" + (new Date().getTime()),
                "cat_" + casual.word + casual.random + "_" + (new Date().getTime()) + "2"],
            remove: []
        },
        advancedSettings: {
            map: '',
            assetStatus: [],
            asOfTodaysDate: false,
            asOfTimeSelection: false
        }
    };
}
function setSelectedColumns(columnToAdd) {
    listview.setSelectedColumns(columnToAdd);
    listview.okBtnColumnDialog.click();
    listview.waitForSpinner();
}
function generateLineItemData() {
    return {
        assetName: '',
        attributes: [
            { name: 'Tags', dataType: listview.dataTypes.tag, value: [casual.word + "Tag", casual.word + "Tag"] },
            { name: 'testAutoString', dataType: listview.dataTypes.string, value: casual.word + "String" },
            { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: casual.double(1, 2000) },
            { name: 'testAutoInt', dataType: listview.dataTypes.int, value: "" + casual.integer(1, 1000) },
            { name: 'testAutoList', dataType: listview.dataTypes.list, value: "List3" },
            { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
            { name: 'testAutoDate', dataType: listview.dataTypes.date, value: helper.formatDateTime("02/08/2017", "02:45") }
        ]
    };
}
function formatDateTimeToAssert(dateTime) {
    return (dateTime.getMonth() + 1) + '/' + dateTime.getDate() + '/' + dateTime.getFullYear()
        + ', ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':00'
        + ' ' + (dateTime.getHours() >= 12 ? 'PM' : 'AM');
}
function setFilterInLine() {
}
function inputInlineValues() {
}
//# sourceMappingURL=program-navigator-LV-NonScheduled-column-options.e2e-spec.js.map