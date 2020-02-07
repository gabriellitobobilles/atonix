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
var lineItemData = generateLineItemData();
var columnsToAdd = [];
lineItemData.attributes.forEach(function (attr) {
    if (attr.name !== 'Tags') {
        columnsToAdd.push(attr.name);
    }
});
var newQuickSearchColumn = Object.create(newQuickSearch);
describe('Non Scheduled Test', function () {
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
    describe('In line filter', function () {
        beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user.openTab(tabNames.lists);
                        listview.createQuickSearch(newQuickSearchColumn);
                        listview.showColumnOptionsBtn.click();
                        setSelectedColumns(columnsToAdd);
                        _a = lineItemData;
                        _c = (_b = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 2:
                        _a.assetName = _d.sent();
                        // lineItemData.assetName = `Feedwater System`;
                        listview.editInLineAttribute(lineItemData);
                        listview.saveListFn(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should filter using correct Asset', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var searchTermFilter, _a, _b, badgeCtrBefore, newListItems, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 1:
                        searchTermFilter = _b.apply(_a, [_e.sent()]);
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 2:
                        badgeCtrBefore = _e.sent();
                        listview.setColumnFilterByName('Asset', searchTermFilter);
                        expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);
                        _d = (_c = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 3:
                        newListItems = _d.apply(_c, [_e.sent()]);
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
        it('should be able to filter Asset Type', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var searchTermFilter, _a, _b, badgeCtrBefore, newListItems, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset Type')];
                    case 1:
                        searchTermFilter = _b.apply(_a, [_e.sent()]);
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 2:
                        badgeCtrBefore = _e.sent();
                        listview.setColumnFilterByName('Asset Type', searchTermFilter);
                        expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);
                        _d = (_c = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset Type')];
                    case 3:
                        newListItems = _d.apply(_c, [_e.sent()]);
                        expect(newListItems).toContain(searchTermFilter);
                        listview.clearInLineFilter('Asset Type');
                        return [2 /*return*/];
                }
            });
        }); });
        lineItemData.attributes.forEach(function (attr) {
            var dataTypes = listview.dataTypes;
            var value = returnTrueValue(attr);
            if (attr.dataType !== dataTypes.tag && attr.dataType !== dataTypes.list) {
                it("should be able to filter " + attr.dataType.toUpperCase() + " ", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var attribute;
                    return tslib_1.__generator(this, function (_a) {
                        attribute = lineItemData.attributes.filter(function (p) { return p.dataType === attr.dataType; })[0];
                        listview.setColumnFilterByName(attribute.name, "" + value);
                        if (attr.dataType === dataTypes.boolean) {
                            listview.getRowBoolean(lineItemData.assetName).then(function (bol) {
                                expect(bol).toEqual(attr.value.toString());
                            });
                            // expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(attr.value.toString());
                        }
                        else {
                            expect(listview.getColumnItemsByColName(attribute.name)).toContain(value);
                        }
                        listview.clearInLineFilter(attribute.name);
                        return [2 /*return*/];
                    });
                }); });
            }
        });
        lineItemData.attributes.forEach(function (attr) {
            var dataTypes = listview.dataTypes;
            var value = returnTrueValue(attr);
            if (attr.dataType !== dataTypes.tag && attr.dataType !== dataTypes.list
                && attr.dataType !== dataTypes.boolean) {
                var partialValueToFilter_1 = partialValue(value);
                it("should be able to PARTIAL filter " + attr.dataType.toUpperCase() + " ", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var attribute;
                    return tslib_1.__generator(this, function (_a) {
                        attribute = lineItemData.attributes.filter(function (p) { return p.dataType === attr.dataType; })[0];
                        listview.setColumnFilterByName(attribute.name, "" + partialValueToFilter_1);
                        if (attr.dataType === dataTypes.boolean) {
                            expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(attr.value.toString());
                        }
                        else {
                            expect(listview.getColumnItemsByColName(attribute.name)).toContain(value);
                        }
                        listview.clearInLineFilter(attribute.name);
                        return [2 /*return*/];
                    });
                }); });
            }
        });
        xit('should be able to Save list with In-line filter', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var listItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 1:
                        listItems = _a.sent();
                        listview.saveQuickSearchFn(newQuickSearchColumn, true);
                        expect(listview.getColumnItemsByColName('Asset')).toEqual(listItems);
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
            { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: "" + casual.double(1, 2000) },
            { name: 'testAutoInt', dataType: listview.dataTypes.int, value: "" + casual.integer(1, 1000) },
            { name: 'testAutoList', dataType: listview.dataTypes.list, value: "List3" },
            { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
            {
                name: 'testAutoDate', dataType: listview.dataTypes.date,
                value: helper.formatDateTime("" + casual.date("MM/DD/YYYY"), "11:12:10")
            }
        ]
    };
}
function returnTrueValue(attr) {
    var dataTypes = listview.dataTypes;
    // const value = attr.dataType === dataTypes.float ? parseFloat(attr.value as string).toFixed(2).toString()
    //   : attr.value;
    switch (attr.dataType) {
        case dataTypes.float:
            return parseFloat(attr.value).toFixed(2).toString();
        case dataTypes.boolean:
            return attr.value ? "1" : "0";
        case dataTypes.date:
            var value = attr.value;
            return helper.formatDateTimeToAssert(value);
        default:
            return attr.value;
    }
}
function partialValue(attr) {
    return attr.substr(0, attr.length / 2);
}
function setFilterInLine() {
}
function inputInlineValues() {
}
//# sourceMappingURL=program-navigator-LV-NonScheduled-column-filter.e2e-spec.js.map