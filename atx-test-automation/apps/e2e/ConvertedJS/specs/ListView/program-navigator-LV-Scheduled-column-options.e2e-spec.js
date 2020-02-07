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
    parent: 'SEKOIA Demo Clients',
    child: ['UGM Historical Reliability Plan']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
var newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = programNavigatorPage.getTabNames();
var columnsToExpect;
// describe('List view - Scheduled Test', () => {
describe('List view - SCHEDULE Column Options', function () {
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
    it('should verify Selected Columns are present in column options dialog', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var newQuickSearchColumn, _a, _b, _c, _d, colHeaders, _e, _f, selectedColumns, _g, _h;
        return tslib_1.__generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    user.openTab(tabNames.lists);
                    newQuickSearchColumn = Object.create(newQuickSearch);
                    listview.createQuickSearch(newQuickSearchColumn);
                    _b = (_a = util).scrollToView;
                    _d = (_c = listview.listHeader).get;
                    return [4 /*yield*/, listview.listHeader.count()];
                case 1:
                    _b.apply(_a, [_d.apply(_c, [(_j.sent()) - 1])]);
                    _f = (_e = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator, false)];
                case 2:
                    colHeaders = _f.apply(_e, [_j.sent()]);
                    // const colHeaders = listview.getColumnHeadersByApp(appName.programNavigator);
                    listview.showColumnOptionsBtn.click();
                    _h = (_g = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 3:
                    selectedColumns = _h.apply(_g, [_j.sent()]);
                    colHeaders.splice(0, 3);
                    colHeaders.shift();
                    selectedColumns.shift();
                    expect(selectedColumns).toEqual(colHeaders);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to rearrange columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var selectedColumnsBefore, columnData, selectedColumnsAfter, _a, _b, columnHeaders, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, listview.getSelectedColummns()];
                case 1:
                    selectedColumnsBefore = _e.sent();
                    columnData = {
                        columnName: selectedColumnsBefore[selectedColumnsBefore.length - 1],
                        direction: 'up',
                        count: 2
                    };
                    listview.moveSelectedColumn(columnData);
                    _b = (_a = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 2:
                    selectedColumnsAfter = _b.apply(_a, [_e.sent()]);
                    listview.okBtnColumnDialog.click();
                    listview.waitForSpinner();
                    _d = (_c = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                case 3:
                    columnHeaders = _d.apply(_c, [_e.sent()]);
                    columnHeaders.splice(0, 3);
                    selectedColumnsAfter.shift();
                    columnHeaders.shift();
                    expect(columnHeaders).toEqual(selectedColumnsAfter);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to remove a column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var countToRemove, selectedColumnsBefore, columnToRemove, selectedColumnsAfter, _a, _b, columnHeaders, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    helper.waitAndClick(listview.showColumnOptionsBtn);
                    countToRemove = 5;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 1:
                    selectedColumnsBefore = _e.sent();
                    columnToRemove = util.getRandomFromArrayMultiple(selectedColumnsBefore, countToRemove);
                    listview.removeColumns(columnToRemove);
                    _b = (_a = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 2:
                    selectedColumnsAfter = _b.apply(_a, [_e.sent()]);
                    expect(selectedColumnsBefore.length - countToRemove).toEqual(selectedColumnsAfter.length);
                    listview.okBtnColumnDialog.click();
                    listview.waitForSpinner();
                    _d = (_c = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                case 3:
                    columnHeaders = _d.apply(_c, [_e.sent()]);
                    columnHeaders.splice(0, 3);
                    expect(columnHeaders).toEqual(selectedColumnsAfter);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to add new column SCHEDULE and Non-Schedule', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var availableColumns, selectedColumns, columnToAdd, columnToAddTemp, colHeaders, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        return tslib_1.__generator(this, function (_z) {
            switch (_z.label) {
                case 0:
                    listview.showColumnOptionsBtn.click();
                    return [4 /*yield*/, listview.getAvailableColumns()];
                case 1:
                    availableColumns = _z.sent();
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 2:
                    selectedColumns = _z.sent();
                    columnsToExpect = selectedColumns;
                    columnToAdd = [];
                    columnToAdd.push(util.getRandomFromArray(helper.removeItemFromArrayByValue(availableColumns, selectedColumns)));
                    setSelectedColumns(columnToAdd);
                    columnsToExpect.push.apply(columnsToExpect, columnToAdd);
                    columnsToExpect = columnsToExpect.map(function (e) { return e.toUpperCase(); });
                    _b = (_a = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                case 3:
                    colHeaders = _b.apply(_a, [_z.sent()]);
                    colHeaders.splice(0, 3);
                    expect(colHeaders).toEqual(columnsToExpect);
                    helper.waitAndClick(listview.showColumnOptionsBtn); // options column options dialog
                    _d = (_c = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 4:
                    selectedColumns = _d.apply(_c, [_z.sent()]);
                    expect(colHeaders).toEqual(selectedColumns);
                    columnToAdd = [];
                    columnToAddTemp = selectedColumns; // This part gathers columns to be added
                    // Add additional columns
                    _f = (_e = columnToAdd).push;
                    _h = (_g = util).getRandomFromArray;
                    _k = (_j = helper).removeItemFromArrayByValue;
                    return [4 /*yield*/, listview.getAvailableColumns()];
                case 5:
                    // Add additional columns
                    _f.apply(_e, [_h.apply(_g, [_k.apply(_j, [_z.sent(),
                                columnToAddTemp])])]);
                    columnToAddTemp.push.apply(columnToAddTemp, columnToAdd);
                    _m = (_l = columnToAdd).push;
                    _p = (_o = util).getRandomFromArray;
                    _r = (_q = helper).removeItemFromArrayByValue;
                    return [4 /*yield*/, listview.getAvailableColumns()];
                case 6:
                    _m.apply(_l, [_p.apply(_o, [_r.apply(_q, [_z.sent(),
                                columnToAddTemp])])]);
                    setSelectedColumns(columnToAdd); // adds the columns
                    helper.waitAndClick(listview.showColumnOptionsBtn);
                    _t = (_s = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 7:
                    selectedColumns = _t.apply(_s, [_z.sent()]);
                    columnsToExpect.push.apply(columnsToExpect, columnToAdd);
                    columnsToExpect.forEach(function (col) {
                        expect(selectedColumns).toContain(col.toUpperCase());
                    });
                    listview.cancelBtnColumnDialog.click();
                    _v = (_u = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                case 8:
                    colHeaders = _v.apply(_u, [_z.sent()]);
                    colHeaders.splice(0, 3);
                    columnsToExpect.forEach(function (col) {
                        expect(colHeaders).toContain(col.toUpperCase());
                    });
                    helper.waitAndClick(listview.showColumnOptionsBtn); // open column options dialog
                    _w = expect;
                    _y = (_x = listview).formatScheduleColumnHeaders;
                    return [4 /*yield*/, listview.getSelectedColummns()];
                case 9:
                    _w.apply(void 0, [_y.apply(_x, [_z.sent()])]).toEqual(colHeaders);
                    return [2 /*return*/];
            }
        });
    }); });
});
// });
function generateQuickSearch() {
    return {
        searchName: casual.word + (new Date().getTime()),
        searchTerm: "asset=*",
        schedule: {
            scheduled: true,
            map: listview.mapGeoSpa.projectStatus,
            assetType: 'Pole Replacement'
        },
        makePublic: true,
        // applyToSelectedAsset: true,
        assetOption: listview.assetOptions.applyToSelectedAssetAndAllDescendants,
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
//# sourceMappingURL=program-navigator-LV-Scheduled-column-options.e2e-spec.js.map