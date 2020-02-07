"use strict";
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
var interface_1 = require("../../helpers/interface");
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
var dateTime = getRandomAttributeDate();
var lineItemData = {
    numOfAssets: 2,
    assetNames: [],
    nonSchedule: [
        {
            attributeName: casual.word + "_TEXT_" + casual.date(), value: casual.string, type: interface_1.AttributeTypesEnum['Freeform Text']
        },
    ],
    schedule: [{
            milestoneType: interface_1.MilestoneType.Plan,
            milestoneStatus: interface_1.MilestoneStatus.Engineering,
            milestoneValue: casual.date("MM/DD/YYYY")
        }],
};
describe('List view - Batch Edit', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.lists);
        listview.createQuickSearch(newQuickSearchColumn);
        // listview.saveQuickSearchFn(newQuickSearchColumn);
    });
    it('should be successfully Batch Edit - NonSchedule and Scheduled', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = lineItemData;
                    return [4 /*yield*/, getRandomAssets()];
                case 1:
                    _a.assetNames = _b.sent();
                    listview.batchEdit(lineItemData);
                    expect(listview.getToastMessage()).toEqual("Changes saved successfully");
                    listview.waitForSpinner();
                    return [2 /*return*/];
            }
        });
    }); });
    it('verify schedule and attribute displayed correctly in Listview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var columnName, updatedMilestoneInList, _i, _a, assetName, temp, datesToExpect;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    columnName = interface_1.MilestoneStatus[lineItemData.schedule[0].milestoneStatus]
                        + ' ' + interface_1.MilestoneType[lineItemData.schedule[0].milestoneType];
                    updatedMilestoneInList = [];
                    _i = 0, _a = lineItemData.assetNames;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    assetName = _a[_i];
                    return [4 /*yield*/, listview.getAttributeByColumnAndAsset(assetName, columnName, true).getText()];
                case 2:
                    temp = _b.sent();
                    datesToExpect = getDatesToExpect();
                    expect([datesToExpect.date1, datesToExpect.date2]).toContain(temp); // Due to time zone. List view displays -1 day
                    updatedMilestoneInList.push(temp);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
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
function getRandomAssets() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var randomAssetNames, tempAssetName, index, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    randomAssetNames = [];
                    index = 0;
                    _e.label = 1;
                case 1:
                    if (!(index < lineItemData.numOfAssets)) return [3 /*break*/, 5];
                    _b = (_a = util).getRandomFromArray;
                    _d = (_c = helper).removeItemFromArrayByValue;
                    return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                case 2: return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [_e.sent(), randomAssetNames])])];
                case 3:
                    tempAssetName = _e.sent();
                    console.log("tempAssetName::: ", tempAssetName);
                    randomAssetNames.push(tempAssetName);
                    _e.label = 4;
                case 4:
                    index++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, randomAssetNames];
            }
        });
    });
}
function getRandomAttributeDate() {
    var date = new Date(casual.date("MM/DD/" + casual.integer(2001, 2019)));
    date.setHours(1);
    date.setMinutes(15);
    date.setSeconds(24);
    date.setMilliseconds(84);
    var timeWithAMPM = '13:14:15';
    return {
        date: date, timeWithAMPM: timeWithAMPM
    };
}
function getDatesToExpect() {
    var d = new Date(lineItemData.schedule[0].milestoneValue);
    var date1 = helper.formatDateTimeAddZero(d.getMonth()) + "/" +
        (helper.formatDateTimeAddZero(d.getDate(), false) + "/" + d.getFullYear());
    var date2 = helper.formatDateTimeAddZero(d.getMonth()) + "/" +
        (helper.formatDateTimeAddZero(d.getDate() - 1, false) + "/" + d.getFullYear());
    return { date1: date1, date2: date2 };
}
//# sourceMappingURL=program-navigator-LV-BatchEdit-schedule-nonschedule.e2e-spec.js.map