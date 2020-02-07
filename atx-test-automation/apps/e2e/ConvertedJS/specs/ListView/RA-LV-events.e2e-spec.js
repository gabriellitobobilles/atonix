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
var interface_1 = require("../../helpers/interface");
var listview = new listview_po_1.Listview();
var user = new user_1.User();
var riskAssessmentPage = new Pages.RskAssessment();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    parent: 'RA Testing',
    child: ['Distributed Asset Example Data', 'Division 1',
        'District 1', 'Substation 1', 'Feeder 1']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
var newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = riskAssessmentPage.getTabNames();
var eventsColumns = ['Actual Start Date', 'Actual End Date', 'Planned Start Date', 'Planned End Date'];
describe('List view - Events', function () {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.riskAssessment);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.riskAssessment);
    });
    describe('Column Options - Events Column Type', function () {
        it('should verify Selected Columns are present in column options dialog', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var newQuickSearchColumn, colHeaders, selectedColumns;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user.openTab(tabNames.lists);
                        newQuickSearchColumn = Object.create(newQuickSearch);
                        listview.createQuickSearch(newQuickSearchColumn);
                        return [4 /*yield*/, listview.getColumnHeadersByApp(testDetails_data_1.appName.riskAssessment)];
                    case 1:
                        colHeaders = _a.sent();
                        listview.showColumnOptionsBtn.click();
                        return [4 /*yield*/, listview.getSelectedColummns()];
                    case 2:
                        selectedColumns = _a.sent();
                        expect(colHeaders).toEqual(selectedColumns);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should switch to Events column type', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var availableColumns;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listview.selectColumnType(listview.columnTypes.events);
                        return [4 /*yield*/, listview.getAvailableColumns()];
                    case 1:
                        availableColumns = _a.sent();
                        expect(listview.columnTypeDropDown.$("[label=\"" + listview.columnTypes.events + "\"]").isSelected())
                            .toBeTruthy();
                        eventsColumns.forEach(function (columns) {
                            expect(availableColumns).toContain(columns);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should select to SHOW EVENTS VIEW option', function () {
            listview.setShowAssetEventsViewOption(interface_1.AssetEventsViewEnum.events);
            expect(listview.showAssetEventsViewOption.get(1).isSelected()).toBeTruthy();
            expect(listview.getSelectedColummns()).toContain('Event Type');
        });
        it('should display EVENT TYPES', function () {
            expect(listview.availableEventTypes.isDisplayed()).toBeTruthy();
            expect(listview.getEventType(interface_1.EventTypesEnum.Fault).isDisplayed()).toBeTruthy();
            expect(listview.getEventType(interface_1.EventTypesEnum.Inspection).isDisplayed()).toBeTruthy();
            expect(listview.getEventType(interface_1.EventTypesEnum.Outage).isDisplayed()).toBeTruthy();
        });
        it('should set FAULT event (Actual and Planned columns) and display in List View', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var eventsObjArr;
            return tslib_1.__generator(this, function (_a) {
                eventsObjArr = [
                    { event: interface_1.EventTypesEnum.Fault, checkbox: true, },
                    { event: interface_1.EventTypesEnum.Inspection, checkbox: false },
                    { event: interface_1.EventTypesEnum.Outage, checkbox: false }
                ];
                setEventTypeAndColumns(eventsObjArr);
                eventsColumns.forEach(function (eventColumn) {
                    expect(listview.getColumnHeadersByApp(testDetails_data_1.appName.riskAssessment)).toContain(eventColumn);
                });
                expect(listview.getColumnItemsByColName('Event Type')).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Fault]);
                return [2 /*return*/];
            });
        }); });
        it('should set INSPECTION event (Actual and Planned columns) and display in List View', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var eventsObjArr;
            return tslib_1.__generator(this, function (_a) {
                eventsObjArr = [
                    { event: interface_1.EventTypesEnum.Fault, checkbox: false, },
                    { event: interface_1.EventTypesEnum.Inspection, checkbox: true },
                    { event: interface_1.EventTypesEnum.Outage, checkbox: false }
                ];
                setEventTypeAndColumns(eventsObjArr, true);
                eventsColumns.forEach(function (eventColumn) {
                    expect(listview.getColumnHeadersByApp(testDetails_data_1.appName.riskAssessment)).toContain(eventColumn);
                });
                expect(listview.getColumnItemsByColName('Event Type')).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Inspection]);
                return [2 /*return*/];
            });
        }); });
        it('should set OUTAGE event (Actual and Planned columns) and display in List View', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var eventsObjArr;
            return tslib_1.__generator(this, function (_a) {
                eventsObjArr = [
                    { event: interface_1.EventTypesEnum.Fault, checkbox: false, },
                    { event: interface_1.EventTypesEnum.Inspection, checkbox: false },
                    { event: interface_1.EventTypesEnum.Outage, checkbox: true }
                ];
                setEventTypeAndColumns(eventsObjArr, true);
                eventsColumns.forEach(function (eventColumn) {
                    expect(listview.getColumnHeadersByApp(testDetails_data_1.appName.riskAssessment)).toContain(eventColumn);
                });
                expect(listview.getColumnItemsByColName('Event Type')).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Outage]);
                return [2 /*return*/];
            });
        }); });
        it('should set and display FAULT, INSPECTION, and OUTAGE in List View', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var eventsObjArr, eventTypes;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventsObjArr = [
                            { event: interface_1.EventTypesEnum.Fault, checkbox: true, },
                            { event: interface_1.EventTypesEnum.Inspection, checkbox: true },
                            { event: interface_1.EventTypesEnum.Outage, checkbox: true }
                        ];
                        setEventTypeAndColumns(eventsObjArr, true);
                        eventsColumns.forEach(function (eventColumn) {
                            expect(listview.getColumnHeadersByApp(testDetails_data_1.appName.riskAssessment)).toContain(eventColumn, "event columns are not the same");
                        });
                        listview.setColumnFilterByName("Asset", "UG_"); // Set column filter Asset to properly see all event types
                        return [4 /*yield*/, listview.getColumnItemsByColName('Event Type')];
                    case 1:
                        eventTypes = _a.sent();
                        expect(eventTypes).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Fault]);
                        expect(eventTypes).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Inspection]);
                        expect(eventTypes).toContain(interface_1.EventTypesEnum[interface_1.EventTypesEnum.Outage]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
function generateQuickSearch() {
    return {
        searchName: casual.word + (new Date().getTime()),
        searchTerm: "",
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
function setEventTypeAndColumns(eventsObjArr, complete) {
    if (complete === void 0) { complete = false; }
    if (complete) { // only set to True IF steps inside this IF clause is already performed.
        listview.showColumnOptionsBtn.click();
        listview.selectColumnType(listview.columnTypes.events);
        listview.setShowAssetEventsViewOption(interface_1.AssetEventsViewEnum.events);
    }
    listview.setEventTypes(eventsObjArr);
    eventsObjArr.forEach(function (eventObj) {
        expect(listview.getEventType(eventObj.event).isSelected()).toEqual(eventObj.checkbox, interface_1.EventTypesEnum[eventObj.event] + " option selected status should be " + eventObj.checkbox + " ");
    });
    if (!complete) {
        listview.selectColumnToAdd(eventsColumns);
    }
    listview.okBtnColumnDialog.click();
    listview.waitForSpinner();
}
//# sourceMappingURL=RA-LV-events.e2e-spec.js.map