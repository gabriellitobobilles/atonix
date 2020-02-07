"use strict";
/**
 * maps test for Program Navigator
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
var map_po_1 = require("../../page/features/map.po");
var timeSlider_po_1 = require("../../page/features/timeSlider.po");
var mapPage = new map_po_1.MapPage();
var timeSliderPage = new timeSlider_po_1.TimeSliderPage();
var listview = new Pages.Listview();
var user = new user_1.User();
var programNavigatorPage = new Pages.ProgramNavigator();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    parent: 'SEKOIA Demo Clients',
    // child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P4 - 14th Street']
    child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
var mapHoverDetails;
var newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = programNavigatorPage.getTabNames();
var newQuickSearchColumn = Object.create(newQuickSearch);
var tempDate = casual.date("MM/DD/" + casual.integer(2001, 2019));
var lineItemData = {
    numOfAssets: 1,
    assetNames: [],
    nonSchedule: [],
    schedule: [{
            milestoneType: interface_1.MilestoneType.Plan,
            milestoneStatus: interface_1.MilestoneStatus.Engineering,
            milestoneValue: tempDate
        }],
};
var convertDate = lineItemData.schedule[0].milestoneValue;
// convertDate = convertDate.substr(1, convertDate.length - 5) + convertDate.slice(-2);
convertDate = formatDateTimeAddZero(convertDate.split('/')[0], false) + '/'
    + formatDateTimeAddZero(convertDate.split('/')[1], false) + '/'
    + convertDate.slice(-2);
describe('Program Navigator Maps - Change Status PLAN', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user.logIn(testDetails_data_1.userObj);
                    user.navigateToApp(testDetails_data_1.appName.programNavigator);
                    helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
                    user.openTab(tabNames.lists);
                    listview.createQuickSearch(newQuickSearchColumn);
                    _a = lineItemData;
                    return [4 /*yield*/, getRandomAssets()];
                case 1:
                    _a.assetNames = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("update schedule with value " + lineItemData.schedule[0].milestoneValue, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var expectNewMilestoneValue, searchTermFilter, assetName;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listview.batchEdit(lineItemData);
                    return [4 /*yield*/, listview.getAttributeByColumnAndAsset(lineItemData.assetNames[0], interface_1.MilestoneStatus[lineItemData.schedule[0].milestoneStatus] + " PLAN", true).getText()];
                case 1:
                    expectNewMilestoneValue = _a.sent();
                    expect(expectNewMilestoneValue).toEqual(lineItemData.schedule[0].milestoneValue);
                    if (lineItemData.assetNames[0].includes('[')) {
                        assetName = lineItemData.assetNames[0];
                        searchTermFilter = assetName.slice(assetName.indexOf('[') + 1, assetName.indexOf(']'));
                        searchTermFilter = "*" + searchTermFilter + "*";
                    }
                    else {
                        searchTermFilter = lineItemData.assetNames[0];
                    }
                    newQuickSearchColumn.searchTerm = "asset=" + searchTermFilter;
                    listview.modifySearchFilter(newQuickSearchColumn);
                    listview.saveQuickSearchFn(newQuickSearchColumn);
                    // listview.saveListFn(false);
                    protractor_1.browser.refresh();
                    helper.waitAndClick(listview.quickSearchDropdownBtn, 30000);
                    listview.selectQuickSearchFromDropdown(newQuickSearchColumn.searchName);
                    return [2 /*return*/];
            }
        });
    }); });
    it("move slider to test date: " + removeZeroInDate(convertDate), function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var sliderDate;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.openTab(tabNames.map);
                    timeSliderPage.selectDateFromCalendar(new Date(lineItemData.schedule[0].milestoneValue));
                    helper.waitForVisible(mapPage.svgCircles.get(0), 30000);
                    return [4 /*yield*/, timeSliderPage.getSliderDateValue()];
                case 1:
                    sliderDate = _a.sent();
                    expect(removeZeroInDate(convertDate)).toContain(sliderDate.split(' ')[0], "Test Date is does not match date in slider " + sliderDate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('verify asset milestone is updated in Maps - hover details', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var milestoneToExpect;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mapPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
                    return [4 /*yield*/, programNavigatorPage.getMapHoverMilesStone()];
                case 1:
                    mapHoverDetails = _a.sent();
                    milestoneToExpect = mapHoverDetails.filter(function (p) { return p.milestoneName === 'Engineering'; });
                    expect(milestoneToExpect.length).toEqual(1);
                    expect(milestoneToExpect[0].planned)
                        .toEqual(convertDate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('verify asset milestone is updated in Maps - Info Tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var infoTrayMilestone;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0));
                    protractor_1.browser.sleep(2000);
                    programNavigatorPage.infoTrayTabHeaders.chart.click();
                    return [4 /*yield*/, programNavigatorPage.getMapInfoTrayChart()];
                case 1:
                    infoTrayMilestone = _a.sent();
                    expect(mapHoverDetails).toEqual(infoTrayMilestone);
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
            add: [],
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
function formatDateTimeAddZero(dateTime, plusOne) {
    if (plusOne === void 0) { plusOne = true; }
    // this is different from the function in the helper class
    // this checks if there are 2 characters ex: 01, 20, 09
    return plusOne ? (dateTime.length < 2 ? ('0' + (dateTime + 1)) : dateTime + 1)
        : (dateTime.length < 2 ? ('0' + (dateTime)) : dateTime);
}
function removeZeroInDate(date) {
    var tDate = date.split('/');
    var returnDate = '';
    for (var index = 0; index < 2; index++) {
        returnDate = tDate[index].length === 2 && tDate[index].includes('0') ?
            returnDate + tDate[index].slice(-1) : returnDate + tDate[index];
        returnDate = returnDate + '/';
    }
    return returnDate + tDate[2];
}
//# sourceMappingURL=program-navigator-maps-Info-tray-change-status-plan.e2e-spec.js.map