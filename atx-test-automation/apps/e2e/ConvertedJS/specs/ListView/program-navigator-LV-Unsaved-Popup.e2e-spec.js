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
describe('List View', function () {
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
    it('should be able to nagivate to Listview Tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var listHeader;
        return tslib_1.__generator(this, function (_a) {
            // programNavigatorPage.getTabElementByName(tabNames.lists).click();
            user.openTab(tabNames.lists);
            listHeader = protractor_1.$(".listContainer .ui-grid-viewport");
            protractor_1.browser.waitForAngularEnabled();
            expect(listHeader.isPresent()).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    describe('Confirmation Message - Unsaved Changes', function () {
        // const popUpMsg = `There are unsaved changes to this list that will be lost.  Are you sure you want to continue?`;
        beforeAll(function () {
            newQuickSearch.searchName = 'unsaved' + (new Date().getTime());
            newQuickSearch.categories.add = [];
            newQuickSearch.categories.remove = [];
            listview.createQuickSearch(newQuickSearch);
        });
        describe('New and Unsaved quick search', function () {
            unsavedChangesSteps();
        });
        describe('Saved and modified search filter', function () {
            var searchFilterText = {
                searchTerm: "asset=A*"
            };
            beforeAll(function () {
                listview.saveQuickSearchFn(newQuickSearch);
                listview.modifySearchFilter(searchFilterText);
            });
            unsavedChangesSteps();
        });
        describe('Add column', function () {
            beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var columnToAdd, _a, _b, _c, _d, _e, _f, _g;
                return tslib_1.__generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            listview.saveListBtn.click();
                            listview.waitForSpinner();
                            listview.showColumnOptionsBtn.click();
                            columnToAdd = [];
                            _b = (_a = columnToAdd).push;
                            _d = (_c = util).getRandomFromArray;
                            _f = (_e = helper).removeItemFromArrayByValue;
                            return [4 /*yield*/, listview.getAvailableColumns()];
                        case 1:
                            _g = [_h.sent()];
                            return [4 /*yield*/, listview.getSelectedColummns()];
                        case 2:
                            _b.apply(_a, [_d.apply(_c, [_f.apply(_e, _g.concat([_h.sent()]))])]);
                            setColumns(columnToAdd, 'add');
                            return [2 /*return*/];
                    }
                });
            }); });
            unsavedChangesSteps();
        });
        describe('Remove column', function () {
            beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    listview.saveListBtn.click();
                    listview.waitForSpinner();
                    listview.showColumnOptionsBtn.click();
                    setColumns(["Tags"], 'remove');
                    return [2 /*return*/];
                });
            }); });
            unsavedChangesSteps();
        });
        describe('Modified column filters', function () {
            beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var searchTermFilter, _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            listview.saveListBtn.click();
                            listview.waitForSpinner();
                            _b = (_a = util).getRandomFromArray;
                            return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                        case 1:
                            searchTermFilter = _b.apply(_a, [_c.sent()]);
                            listview.setColumnFilterByName('Asset', searchTermFilter);
                            return [2 /*return*/];
                    }
                });
            }); });
            unsavedChangesSteps();
        });
    });
    describe('Continue Unsaved Changes', function () {
        var searchFilterText = {
            searchTerm: "asset = A*"
        };
        beforeAll(function () {
            helper.clickAndSleep(listview.saveListBtn);
            listview.modifySearchFilter(searchFilterText);
        });
        it('pop up should not appear after being accepted', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        listview.quickSearchDropdownBtn.click();
                        _b = (_a = listview).selectQuickSearchFromDropdown;
                        _d = (_c = util).getRandomFromArray;
                        return [4 /*yield*/, listview.quickSearchList.getText()];
                    case 1:
                        _b.apply(_a, [_d.apply(_c, [_j.sent()]), true]);
                        expect(typeof helper.checkAlert() === 'object').toBeTruthy();
                        helper.getAlert().accept();
                        listview.waitForSpinner();
                        listview.quickSearchDropdownBtn.click();
                        _f = (_e = listview).selectQuickSearchFromDropdown;
                        _h = (_g = util).getRandomFromArray;
                        return [4 /*yield*/, listview.quickSearchList.getText()];
                    case 2:
                        _f.apply(_e, [_h.apply(_g, [_j.sent()])]);
                        expect(helper.checkAlert()).toBeFalsy();
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
function setColumns(columns, action) {
    if (action === 'add') {
        listview.setSelectedColumns(columns);
    }
    else {
        listview.removeColumns(columns);
    }
    listview.okBtnColumnDialog.click();
    listview.waitForSpinner();
}
function unsavedChangesSteps() {
    var _this = this;
    var popUpMsg = "There are unsaved changes to this list that will be lost.  Are you sure you want to continue?";
    it('switching from Lists to other tabs', function () {
        Object.keys(tabNames).forEach(function (tab) {
            user.openTab(tabNames[tab]);
            var alert = helper.getAlert();
            expect(alert.getText()).toEqual(popUpMsg);
            alert.dismiss();
        });
    });
    it('switching to another quick search', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d, alert;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    listview.quickSearchDropdownBtn.click();
                    _b = (_a = listview).selectQuickSearchFromDropdown;
                    _d = (_c = util).getRandomFromArray;
                    return [4 /*yield*/, listview.quickSearchList.getText()];
                case 1:
                    _b.apply(_a, [_d.apply(_c, [_e.sent()]), true]);
                    alert = helper.getAlert();
                    expect(alert.getText()).toEqual(popUpMsg);
                    alert.dismiss();
                    return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=program-navigator-LV-Unsaved-Popup.e2e-spec.js.map