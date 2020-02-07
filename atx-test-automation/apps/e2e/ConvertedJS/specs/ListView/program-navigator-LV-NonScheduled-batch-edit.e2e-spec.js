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
var protractor_1 = require("protractor");
var listview = new listview_po_1.Listview();
var user = new user_1.User();
var programNavigatorPage = new Pages.ProgramNavigator();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    // parent: 'SEKOIA Demo Clients',
    // child: ['UGM Historical Reliability Plan']
    parent: testDetails_data_1.automationAssetData.clientGroup,
    child: ['Test: Create Role']
    // child: [automationAssetData.clientName]
};
var newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = programNavigatorPage.getTabNames();
var newQuickSearchColumn = Object.create(newQuickSearch);
var dateTime = getRandomAttributeDate();
var lineItemData = {
    numOfAssets: 1,
    assetNames: [],
    nonSchedule: [
        {
            attributeName: casual.word + "_TEXT_" + casual.date(),
            value: casual.string,
            type: interface_1.AttributeTypesEnum['Freeform Text']
        },
        {
            attributeName: casual.word + "_INTEGER_" + casual.date(),
            value: 123,
            type: interface_1.AttributeTypesEnum.Integer
        },
        {
            attributeName: casual.word + "_FLOAT_" + casual.date(),
            value: 123.45,
            type: interface_1.AttributeTypesEnum.Float,
            attributeOption: 2
        },
        {
            attributeName: casual.word + "_LIST_" + casual.date(),
            value: 'List3',
            type: interface_1.AttributeTypesEnum['Discrete List'],
            attributeOption: 'List1;List2;List3;List4;List5'
        },
        {
            attributeName: casual.word + "_BOOLEAN_" + casual.date(),
            value: true,
            type: interface_1.AttributeTypesEnum.Boolean,
        },
        {
            attributeName: casual.word + "_DATE_" + casual.date(),
            value: {
                dateValue: dateTime.date,
                timeValue: dateTime.timeWithAMPM
            },
            type: interface_1.AttributeTypesEnum.Date,
        },
    ],
    schedule: [],
};
var columnHeadersBefore;
describe('List view Batch Edit Asset Info', function () {
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
                    return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                case 2:
                    columnHeadersBefore = _b.sent();
                    listview.selectLineItemChkBox(lineItemData.assetNames);
                    expect(listview.editSelectedBtn.getText()).toContain("Edit Selected (" + lineItemData.numOfAssets + ")");
                    return [2 /*return*/];
            }
        });
    }); });
    it('Batch Edit Asset Info window should display', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            helper.clickAndWaitForVisible(listview.editSelectedBtn, listview.batchEditWindow);
            expect(listview.batchEditCounter.getText()).toContain("(" + lineItemData.numOfAssets + ")", "Selected asset should be equal to " + lineItemData.numOfAssets);
            columnHeadersBefore.push.apply(columnHeadersBefore, lineItemData.nonSchedule.map(function (p) { return p.attributeName; }).sort());
            return [2 /*return*/];
        });
    }); });
    lineItemData.nonSchedule.forEach(function (attribute) {
        it("should be able to add attribute type: " + interface_1.AttributeTypesEnum[attribute.type] + " and display properly in batch edit", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var splitTime, timeToExpect;
            return tslib_1.__generator(this, function (_a) {
                listview.batchEditAddAttributeTxt.sendKeys(attribute.attributeName);
                protractor_1.browser.sleep(1000);
                listview.batchEditAddAttributeBtn.click();
                helper.waitForVisible(listview.modalWindow);
                listview.setAttributeValue(attribute);
                if (attribute.type === interface_1.AttributeTypesEnum['Discrete List']) {
                    expect(listview.attributeValueList.$$("option").getText()).toEqual(attribute.attributeOption.split(';'));
                }
                listview.setAttributeValueOkBtn.click();
                expect(listview.getColumnItemsByColName('Attribute', false, true)).toContain(attribute.attributeName);
                if (attribute.type === interface_1.AttributeTypesEnum.Date) {
                    splitTime = attribute.value.timeValue.split(':');
                    timeToExpect = '1:14:15 PM';
                    expect(listview.getAttributeValueByAssetBatchEdit(attribute.attributeName))
                        .toEqual(attribute.value.dateValue.toLocaleDateString() + ", " + timeToExpect);
                }
                else {
                    expect(listview.getAttributeValueByAssetBatchEdit(attribute.attributeName)).toEqual("" + attribute.value);
                }
                return [2 /*return*/];
            });
        }); });
    });
    // lineItemData.nonSchedule.forEach(attribute => {
    //   it(`modify attribute type: ${AttributeTypesEnum[attribute.type]} value in batch edit`, async () => {
    //     listview.batchEditAddAttributeTxt.sendKeys(attribute.attributeName);
    //     browser.sleep(1000);
    //     listview.batchEditAddAttributeBtn.click();
    //     helper.waitForVisible(listview.modalWindow);
    //     listview.setAttributeValue(attribute);
    //     if (attribute.type === AttributeTypesEnum['Discrete List']) {
    //       expect(listview.attributeValueList.$$(`option`).getText()).toEqual(attribute.attributeOption.split(';'));
    //     }
    //     listview.setAttributeValueOkBtn.click(); browser.sleep(1000);
    //     expect(listview.getColumnItemsByColName(`Attribute`, true, true)).toContain(attribute.attributeName);
    //     // console.log(`getAttributeValueByAssetBatchEdit:::: `, await listview.getAttributeValueByAssetBatchEdit());
    //     await listview.getAttributeValueByAssetBatchEdit();
    //   });
    // });
    it('attribute should appear in listview as columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var colHeaders;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listview.batchEditSaveBtn.click(); // click Save Changes to save new attribute
                    listview.waitForSpinner();
                    return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.programNavigator)];
                case 1:
                    colHeaders = _a.sent();
                    expect(colHeaders).toEqual(columnHeadersBefore);
                    return [2 /*return*/];
            }
        });
    }); });
    it('attribute values should appear correctly in listview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _loop_1, _i, _a, assetName;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            _loop_1 = function (assetName) {
                lineItemData.nonSchedule.forEach(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var timeToExpect;
                    return tslib_1.__generator(this, function (_a) {
                        if (item.type === interface_1.AttributeTypesEnum.Boolean) {
                            expect(listview.getRowBoolean(assetName)).toEqual("" + item.value);
                        }
                        else if (item.type === interface_1.AttributeTypesEnum.Date) {
                            timeToExpect = '1:14:15 PM';
                            // item.value.timeValue
                            expect(listview.getAttributeByColumnAndAsset(assetName, item.attributeName, false).getText())
                                .toEqual(item.value.dateValue.toLocaleDateString() + ", " + timeToExpect);
                        }
                        else {
                            expect(listview.getAttributeByColumnAndAsset(assetName, item.attributeName, false).getText())
                                .toEqual("" + item.value);
                        }
                        return [2 /*return*/];
                    });
                }); });
            };
            for (_i = 0, _a = lineItemData.assetNames; _i < _a.length; _i++) {
                assetName = _a[_i];
                _loop_1(assetName);
            }
            return [2 /*return*/];
        });
    }); });
});
function generateQuickSearch() {
    return {
        searchName: casual.word + (new Date().getTime()),
        searchTerm: "asset=*",
        schedule: {
            scheduled: false,
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
function getRandomAttributeDate() {
    var date = new Date(casual.date("MM/DD/" + casual.integer(2001, 2019)));
    date.setHours(1);
    date.setMinutes(15);
    date.setSeconds(24);
    date.setMilliseconds(84);
    var timeWithAMPM = '13:14:15';
    // return {
    //   date, timeWithAMPM: {
    //     hrs: date.getHours(),
    //     min: date.getMinutes(),
    //     sec: date.getSeconds(),
    //     ms: date.getMilliseconds(),
    //     ampm: date.toLocaleTimeString().split(' ')[1]
    //   }
    // };
    return {
        date: date, timeWithAMPM: timeWithAMPM
    };
}
//# sourceMappingURL=program-navigator-LV-NonScheduled-batch-edit.e2e-spec.js.map