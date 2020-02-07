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
var newQuickSearchColumn = Object.create(newQuickSearch);
var scheduleBol = true;
var searchTermFilterTemp1;
var columnToFilter1 = "NOT STARTED ACTUAL";
describe('List view - SCHEDULE - Column filter', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.lists);
        listview.createQuickSearch(newQuickSearchColumn);
    });
    it('filter using correct Asset', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var searchTermFilter, badgeCtrBefore, newListItems, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    searchTermFilter = "P3 - Ava Avenue & Riverside Drive";
                    return [4 /*yield*/, listview.badgeCtr.getText()];
                case 1:
                    badgeCtrBefore = _c.sent();
                    listview.setColumnFilterByName('Asset', searchTermFilter);
                    expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);
                    _b = (_a = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 2:
                    newListItems = _b.apply(_a, [_c.sent()]);
                    expect(newListItems).toContain(searchTermFilter);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not show any result using INCORRECT Asset filter', function () {
        listview.setColumnFilterByName('Asset', 'thisIsNotAValidAssetxxx');
        expect(listview.badgeCtr.getText()).not.toEqual(0);
        listview.clearInLineFilter('Asset');
    });
    it('partial schedule column filter ex: 10/21/', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var searchTermFilter1, _a, _b, badgeCtrBefore, _c, _d, _e, _f, _g, _h, _j;
        return tslib_1.__generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _b = (_a = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter1, scheduleBol)];
                case 1:
                    searchTermFilter1 = _b.apply(_a, [_k.sent()]);
                    searchTermFilter1 = searchTermFilter1.substr(0, searchTermFilter1.length - 6);
                    badgeCtrBefore = listview.badgeCtr.getText();
                    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);
                    // filterResult1 not used as assertions because of time zone difference where 10/1 appears as 10/2
                    // const filterResult1 = await listview.getColumnItemsByColName(columnToFilter1, scheduleBol);
                    expect(listview.badgeCtr.getText()).toEqual(listview.getScheduleColumnItemCount(columnToFilter1));
                    expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);
                    listview.clearInLineFilter(columnToFilter1, scheduleBol);
                    _d = (_c = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter1, scheduleBol)];
                case 2:
                    searchTermFilter1 = _d.apply(_c, [_k.sent()]);
                    // searchTermFilter1 = searchTermFilter1.substr(2, searchTermFilter1.length - 4);
                    searchTermFilter1 = "/10/20";
                    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);
                    expect(listview.badgeCtr.getText()).toEqual(listview.getScheduleColumnItemCount(columnToFilter1), "Badge counter should be the same as Column Item count for " + columnToFilter1 + " with searchTerm: " + searchTermFilter1);
                    _f = (_e = expect(listview.badgeCtr.getText()).not).toEqual;
                    _g = [badgeCtrBefore];
                    _h = "Badge counter before and after should not be equal. Search term: " + searchTermFilter1 + " for column: " + columnToFilter1 + " results ";
                    _j = "";
                    return [4 /*yield*/, listview.getScheduleColumnItemCount(columnToFilter1)];
                case 3:
                    _f.apply(_e, _g.concat([_h +
                            (_j + (_k.sent()))]));
                    listview.clearInLineFilter(columnToFilter1, scheduleBol);
                    return [2 /*return*/];
            }
        });
    }); });
    it('use (*) and null in column filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var procurementActualColumn, filterResult1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listview.setColumnFilterByName(columnToFilter1, "*", scheduleBol);
                    expect(listview.getColumnItemsByColName(columnToFilter1, scheduleBol)).not.toContain("", "should not contain blank since filter is *");
                    listview.clearInLineFilter(columnToFilter1, scheduleBol);
                    procurementActualColumn = "PROCUREMENT ACTUAL";
                    listview.setColumnFilterByName(procurementActualColumn, "null", scheduleBol);
                    return [4 /*yield*/, listview.getColumnItemsByColName(procurementActualColumn, scheduleBol)];
                case 1:
                    filterResult1 = _a.sent();
                    filterResult1.forEach(function (result) { return expect(result).toEqual("", "Should be expecting blank since filter is null"); });
                    expect(listview.getScheduleColumnItemCount(procurementActualColumn))
                        .toEqual("0", "column item count should be zero since filter is null");
                    listview.clearInLineFilter(procurementActualColumn, scheduleBol);
                    return [2 /*return*/];
            }
        });
    }); });
    it('filter using 1 Schedule Column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var searchTermFilter1, _a, _b, filterResult1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter1, scheduleBol)];
                case 1:
                    searchTermFilter1 = _b.apply(_a, [_c.sent()]);
                    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter1, scheduleBol)];
                case 2:
                    filterResult1 = _c.sent();
                    searchTermFilterTemp1 = searchTermFilter1;
                    filterResult1.forEach(function (res) {
                        expect(res).toEqual(searchTermFilter1);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('filter using multiple (2) Schedule Columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var columnToFilter2, searchTermFilter2, _a, _b, filterResult2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    columnToFilter2 = "ENGINEERING PLAN";
                    _b = (_a = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter2, scheduleBol)];
                case 1:
                    searchTermFilter2 = _b.apply(_a, [_c.sent()]);
                    listview.setColumnFilterByName(columnToFilter2, searchTermFilter2, scheduleBol);
                    return [4 /*yield*/, listview.getColumnItemsByColName(columnToFilter2, scheduleBol)];
                case 2:
                    filterResult2 = _c.sent();
                    filterResult2.forEach(function (res) {
                        expect(res).toEqual(searchTermFilter2);
                    });
                    expect(listview.getColumnItemsByColName(columnToFilter1, scheduleBol)).toContain(searchTermFilterTemp1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('be able to Save list with In-line filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var listItems, badgeCtrBefore;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 1:
                    listItems = _a.sent();
                    badgeCtrBefore = listview.badgeCtr.getText();
                    listview.saveQuickSearchFn(newQuickSearchColumn);
                    expect(listview.getColumnItemsByColName('Asset')).toEqual(listItems);
                    return [2 /*return*/];
            }
        });
    }); });
});
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
//# sourceMappingURL=program-navigator-LV-Scheduled-column-filter.e2e-spec.js.map