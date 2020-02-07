"use strict";
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
var interface_1 = require("../../helpers/interface");
var _ = require("lodash");
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
var lineItemData = {
    numOfAssets: 2,
    assetNames: [],
    nonSchedule: [],
    schedule: [{
            milestoneType: interface_1.MilestoneType.Plan,
            milestoneStatus: interface_1.MilestoneStatus.Engineering,
            milestoneValue: casual.date("MM/DD/YYYY")
        }],
};
var milestoneValuesFromList;
describe('List view SCHEDULED Test - Batch Edit', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.lists);
        listview.createQuickSearch(newQuickSearchColumn);
        // listview.saveQuickSearchFn(newQuickSearchColumn);
    });
    it('select multiple assets (checkbox) and counter display correctly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // this gets random assets from list view and stores in an string[]
                    _a = lineItemData;
                    return [4 /*yield*/, getRandomAssets()];
                case 1:
                    // this gets random assets from list view and stores in an string[]
                    _a.assetNames = _b.sent();
                    return [4 /*yield*/, listview.getScheduleDataFromList(lineItemData.assetNames)];
                case 2:
                    milestoneValuesFromList = _b.sent();
                    console.log("milestoneValuesFromList::: ", JSON.stringify(milestoneValuesFromList));
                    listview.selectLineItemChkBox(lineItemData.assetNames);
                    expect(listview.editSelectedBtn.getText()).toContain("Edit Selected (" + lineItemData.numOfAssets + ")");
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batch edit window should display Milestone values ', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var milestoneBatchValues, expectedBatchEditScheduleValues;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    helper.clickAndWaitForVisible(listview.editSelectedBtn, listview.batchEditWindow);
                    expect(listview.batchEditCounter.getText()).toContain("(" + lineItemData.numOfAssets + ")");
                    helper.waitForElementClickable(listview.batchEditScheduleTab);
                    protractor_1.browser.sleep(3000);
                    helper.waitAndClick(listview.batchEditScheduleTab, 5000);
                    // helper.clickAndSleep(listview.batchEditScheduleTab, 3000);
                    helper.waitForElementClickable(listview.batchEditScheduleTab, 10000);
                    return [4 /*yield*/, listview.getBatchEditScheduleValues()];
                case 1:
                    milestoneBatchValues = _a.sent();
                    expectedBatchEditScheduleValues = getExpectedBatchScheduleValues(milestoneBatchValues);
                    expect(expectedBatchEditScheduleValues).toEqual(milestoneBatchValues);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to Update schedule', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _i, _a, schedule, updatedMilestoneValueFromList;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    for (_i = 0, _a = lineItemData.schedule; _i < _a.length; _i++) {
                        schedule = _a[_i];
                        listview.setBatchEditScheduleDate(schedule.milestoneType, schedule.milestoneStatus, schedule.milestoneValue);
                    }
                    listview.batchEditSaveBtn.click();
                    helper.waitForVisibleAndDisappear(listview.progressBar);
                    return [4 /*yield*/, listview.getScheduleDataFromList(lineItemData.assetNames)];
                case 1:
                    updatedMilestoneValueFromList = _b.sent();
                    // console.log(`updatedMilestoneValueFromList:::: `, JSON.stringify(updatedMilestoneValueFromList));
                    expect(updatedMilestoneValueFromList).not.toEqual(milestoneValuesFromList);
                    return [2 /*return*/];
            }
        });
    }); });
});
function acceptAlert() {
    helper.getAlert().accept();
    listview.waitForSpinner();
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
function generateLineItemData() {
    return {
        assetName: '',
        attributes: [
            { name: "NOT STARTED PLAN", value: casual.date("MM/DD/YYYY"), dataType: listview.dataTypes.scheduleDate },
            { name: "testAutoString", value: 'TestString', dataType: listview.dataTypes.string },
            { name: "MITIGATION PLAN PLAN", value: casual.date("MM/DD/YYYY"), dataType: listview.dataTypes.scheduleDate }
        ]
    };
}
function getExpectedBatchScheduleValues(milestoneBatchValues) {
    var expectedBatchEditScheduleValues = [];
    milestoneBatchValues.forEach(function (milestone) {
        var indexOfMilestone = milestoneBatchValues.indexOf(milestone);
        var value = milestoneValuesFromList[0].milestone[indexOfMilestone].value;
        var ms = {
            milestone: [{
                    column: milestone.column,
                    type: milestone.type,
                    value: value
                }]
        };
        var result = _.filter(milestoneValuesFromList, ms);
        var batchValue;
        if (result.length < milestoneValuesFromList.length) {
            batchValue = '(Multiple Values)';
        }
        else if (result.length === milestoneValuesFromList.length) {
            batchValue = value;
        }
        var expectedMilestoneValues = {
            column: milestone.column,
            type: milestone.type,
            value: batchValue
        };
        expectedBatchEditScheduleValues.push(expectedMilestoneValues);
    });
    return expectedBatchEditScheduleValues;
}
//# sourceMappingURL=program-navigator-LV-Scheduled-batch-edit.e2e-spec.js.map