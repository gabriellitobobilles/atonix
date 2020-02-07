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
var lineItemData = generateLineItemData();
var newQuickSearchColumn = Object.create(newQuickSearch);
describe('SCHEDULED Test - Inline Edit', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.lists);
        listview.createQuickSearch(newQuickSearchColumn);
        listview.saveQuickSearchFn(newQuickSearchColumn);
    });
    it('update a schedule column', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        var _this = this;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = lineItemData;
                    _c = (_b = util).getRandomFromArray;
                    return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                case 2:
                    _a.assetName = _d.sent();
                    listview.editInLineAttributeSchedule(lineItemData);
                    listview.saveListFn(); // save to refresh the list
                    lineItemData.attributes.forEach(function (attr) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var attributValue, d, date1, date2;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, listview.getAttributeByColumnAndAsset(lineItemData.assetName, attr.name, true).getText()];
                                case 1:
                                    attributValue = _a.sent();
                                    d = new Date(attr.value);
                                    date1 = helper.formatDateTimeAddZero(d.getMonth()) + "/" +
                                        (helper.formatDateTimeAddZero(d.getDate(), false) + "/" + d.getFullYear());
                                    date2 = helper.formatDateTimeAddZero(d.getMonth()) + "/" +
                                        (helper.formatDateTimeAddZero(d.getDate() - 1, false) + "/" + d.getFullYear());
                                    expect([date1, date2]).toContain(attributValue);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    it('clear schedule data and pop confirmation pop up', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var alertText;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lineItemData.attributes[0].value = null;
                    lineItemData.attributes[1].value = null;
                    inputSchedule();
                    return [4 /*yield*/, helper.getAlert().getText()];
                case 1:
                    alertText = _a.sent();
                    acceptAlert();
                    listview.saveListFn(); // save to refresh the list
                    lineItemData.attributes.forEach(function (attr) {
                        var attributValue = listview.getAttributeByColumnAndAsset(lineItemData.assetName, attr.name, true).getText();
                        expect(attributValue).toEqual(attr.value === null ? '' : attr.value);
                        expect(alertText.toUpperCase()).toContain((lineItemData.assetName + " - " + attr.name).toUpperCase());
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    // it('invalid values / date', async () => {
    //   lineItemData.attributes[0].value = `111/34/3000`;
    //   lineItemData.attributes[1].value = `11/11/2011`;
    //   lineItemData.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
    //   // listview.editInLineAttributeSchedule(lineItemData);
    //   inputSchedule();
    //   // const alertText = await helper.getAlert().getText();
    //   // console.log(`alertText: `, alertText);
    //   // acceptAlert();
    //   browser.sleep(10000);
    // });
});
function acceptAlert() {
    helper.getAlert().accept();
    listview.waitForSpinner();
}
function inputSchedule() {
    var lineItemRowElem = listview.getInLineRowItem(lineItemData.assetName);
    listview.clickInLineItemEditBtn(lineItemRowElem);
    listview.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
    helper.clickAndSleep(lineItemRowElem.$("[title=\"Save\"]"));
    helper.waitForAlert();
}
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
function generateLineItemData() {
    return {
        assetName: '',
        attributes: [
            { name: "NOT STARTED PLAN", value: casual.date("MM/DD/YYYY"), dataType: listview.dataTypes.scheduleDate },
            { name: "MITIGATION PLAN PLAN", value: casual.date("MM/DD/YYYY"), dataType: listview.dataTypes.scheduleDate },
        ]
    };
}
//# sourceMappingURL=program-navigator-LV-Scheduled-inline-edit.e2e-spec.js.map