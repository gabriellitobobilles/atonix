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
var protractor_1 = require("protractor");
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
var floatDecimalPlace = 2;
var booleanValueBefore;
var lineItemData = generateLineItemData();
var lineItemAttributes;
var tempValue;
var columnsToAdd = [];
lineItemData.attributes.forEach(function (attr) {
    if (attr.name !== 'Tags') {
        columnsToAdd.push(attr.name);
    }
});
describe('Non Scheduled Test - Inline Edit', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
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
    it('should be able to navigate and create a new list', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var newQuickSearchColumn;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.openTab(tabNames.lists);
                    newQuickSearchColumn = Object.create(newQuickSearch);
                    return [4 /*yield*/, listview.createQuickSearch(newQuickSearchColumn)];
                case 1:
                    _a.sent();
                    expect(listview.quickSearchBtn.getText()).toEqual(newQuickSearch.searchName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to add columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    listview.showColumnOptionsBtn.click();
                    setSelectedColumns(columnsToAdd);
                    _a = lineItemData;
                    _c = (_b = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                case 2:
                    _a.assetName = _d.sent();
                    protractor_1.browser.sleep(3000);
                    return [4 /*yield*/, listview.getRowBoolean(lineItemData.assetName)];
                case 3:
                    booleanValueBefore = _d.sent();
                    listview.editInLineAttribute(lineItemData);
                    lineItemAttributes = listview.getAttributeLineItemByAsset(lineItemData.assetName).getText();
                    expect(listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)).toEqual(jasmine.arrayContaining(columnsToAdd));
                    return [2 /*return*/];
            }
        });
    }); });
    lineItemData.attributes.forEach(function (attr) {
        it("should verify value is correct for: " + attr.name, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(attr.dataType === listview.dataTypes.float)) return [3 /*break*/, 1];
                        tempValue = attr.value;
                        tempValue = parseFloat(tempValue).toFixed(floatDecimalPlace).toString();
                        expect(lineItemAttributes).toContain(tempValue);
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(attr.dataType === listview.dataTypes.tag)) return [3 /*break*/, 2];
                        tempValue = attr.value;
                        tempValue.forEach(function (tag) {
                            expect(listview.getRowTags(lineItemData.assetName)).toContain(tag);
                        });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(attr.dataType === listview.dataTypes.boolean)) return [3 /*break*/, 3];
                        expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(booleanValueBefore);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(attr.dataType === listview.dataTypes.date)) return [3 /*break*/, 4];
                        expect(lineItemAttributes).toContain(helper.formatDateTimeToAssert(attr.value));
                        return [3 /*break*/, 6];
                    case 4:
                        _b = (_a = console).log;
                        _c = ["lineItemAttributes: "];
                        return [4 /*yield*/, lineItemAttributes];
                    case 5:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        console.log("attr.value.toString(): ", attr.value.toString());
                        expect(lineItemAttributes).toContain(attr.value.toString());
                        _d.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
    it('Negative Tests ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var testLineItem, _a, _b, _c, lineItemRowElem;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    testLineItem = {
                        assetName: '',
                        attributes: [
                            { name: 'Tags', dataType: listview.dataTypes.tag, value: [casual.word + "Tag", casual.word + "Tag"] },
                            { name: 'testAutoString', dataType: listview.dataTypes.string, value: "~!@#$%^&*()_+-={}[];'<>?/@" },
                            { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: casual.double(1, 2000) },
                            { name: 'testAutoInt', dataType: listview.dataTypes.int, value: "123.456" },
                            { name: 'testAutoList', dataType: listview.dataTypes.list, value: "List3" },
                            { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
                        ]
                    };
                    _a = testLineItem;
                    _c = (_b = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                case 2:
                    _a.assetName = _d.sent();
                    console.log("testLineItem.assetName:::", testLineItem.assetName);
                    lineItemRowElem = listview.getInLineRowItem(testLineItem.assetName);
                    listview.clickInLineItemEditBtn(lineItemRowElem);
                    listview.setInLineAttribute(lineItemRowElem, testLineItem.attributes);
                    // adding this for Date for now since setIneLineAttribute() uses Date() data type and not just strings
                    testLineItem.attributes.push({ name: "testAutoDate", dataType: listview.dataTypes.date, value: "" });
                    listview.setInLineDateFn(lineItemRowElem, testLineItem.attributes[6], "33333333", "3333PM");
                    listview.saveInLineItemBtn(lineItemRowElem);
                    listview.saveListFn(false);
                    expect(listview.getInLineAttribute(lineItemRowElem, "testAutoString").getText())
                        .toEqual(testLineItem.attributes[1].value);
                    expect(listview.getInLineAttribute(lineItemRowElem, "testAutoInt").getText())
                        .not.toEqual(testLineItem.attributes[3].value);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sleeP(1000)', function () {
        protractor_1.browser.sleep(10000);
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
            {
                name: 'testAutoDate', dataType: listview.dataTypes.date,
                value: helper.formatDateTime("" + casual.date("MM/DD/YYYY"), "11:12")
            }
        ]
    };
}
//# sourceMappingURL=program-navigator-LV-NonScheduled-inline-edit.e2e-spec.js.map