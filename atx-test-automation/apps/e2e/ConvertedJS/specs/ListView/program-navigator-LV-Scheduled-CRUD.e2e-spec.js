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
    parent: 'SEKOIA Demo Clients',
    child: ['UGM Historical Reliability Plan']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
var newQuickSearch = generateQuickSearch();
var modifiedQuickSearch = Object.create(newQuickSearch);
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
var tabNames = programNavigatorPage.getTabNames();
var saveAsQuickSearch;
describe('List View SCHEDULE ', function () {
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
    it('nagivate to Listview Tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
    it('New Search should not be default quick search', function () {
        expect(listview.quickSearchBtn.getText()).not.toEqual('New Search');
    });
    it('New Search should not be present in Quick Search dropdown', function () {
        listview.quickSearchDropdownBtn.click();
        expect(listview.quickSearchList.get(0).getText()).not.toEqual('New Search');
    });
    describe('CRUD', function () {
        it('Create new Quick Search', function () {
            console.log("QuickSearch to create: ", newQuickSearch.searchName);
            /** Creates Quick search list */
            expect(listview.createQuickSearch(newQuickSearch)).toEqual(newQuickSearch.searchName);
            expect(listview.rowList.count()).toBeGreaterThan(0);
        });
        // it('Display default scheduled columns', async () => {
        //   util.scrollToView(listview.listHeader.get(await listview.listHeader.count() - 1)); // scroll to last column to view list headers
        //   browser.sleep(1000);
        //   const headers = await listview.getColumnHeadersScheduled(appName.programNavigator);
        //   let listScheduleHeaders = listview.scheduleColumnsArray;
        //   listScheduleHeaders = listScheduleHeaders.map(e => e.toUpperCase());
        //   headers.forEach(header => {
        //     if (header !== ' ') {
        //       expect(listScheduleHeaders).toContain(listview.formatScheduleColumnHeaders(header as string[]));
        //     }
        //   });
        //   expect(headers.length).toEqual(listview.scheduleColumnsArray.length);
        // });
        it('Display default scheduled columns', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, headers, _e, _f, listScheduleHeaders;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _b = (_a = util).scrollToView;
                        _d = (_c = listview.listHeader).get;
                        return [4 /*yield*/, listview.listHeader.count()];
                    case 1:
                        _b.apply(_a, [_d.apply(_c, [(_g.sent()) - 1])]); // scroll to last column to view list headers
                        protractor_1.browser.sleep(1000);
                        _f = (_e = listview).formatScheduleColumnHeaders;
                        return [4 /*yield*/, listview.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                    case 2:
                        headers = _f.apply(_e, [_g.sent()]);
                        listScheduleHeaders = listview.scheduleColumnsArray;
                        listScheduleHeaders = listScheduleHeaders.map(function (e) { return e.toUpperCase(); });
                        // remove first array element because it captures ' ' since it's not showing in the screen
                        headers.splice(0, 3);
                        headers.shift();
                        listScheduleHeaders.shift();
                        expect(listScheduleHeaders).toEqual(headers);
                        expect(headers.length).toEqual(listScheduleHeaders.length);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Save new Quick Search', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, savedQuickSearch;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        /** Saves Quick Search */
                        expect(listview.saveQuickSearchFn(newQuickSearch))
                            .toEqual(newQuickSearch.categories.add); // check if categorie tags were shown when added
                        expect(listview.quickSearchBtn.getText()).toMatch(newQuickSearch.searchName, "Newly created Quick Search is not selected by default after saving.");
                        helper.clickAndSleep(listview.quickSearchDropdownBtn, 500); // click drop down to view list
                        _b = (_a = expect(listview.quickSearchList.getText())).toMatch;
                        _c = [newQuickSearch.searchName];
                        return [4 /*yield*/, listview.quickSearchList.getText()];
                    case 1:
                        _b.apply(_a, _c.concat([(_d.sent()) + " does not contain " + newQuickSearch.searchName]));
                        /** WORKAROUND because newly created is not selected after save */
                        listview.selectQuickSearchFromDropdown(newQuickSearch.searchName);
                        return [4 /*yield*/, getQuickSearch()];
                    case 2:
                        savedQuickSearch = _d.sent();
                        assertQuickSearchDetails(savedQuickSearch, newQuickSearch);
                        return [2 /*return*/];
                }
            });
        }); });
        it('MODIFY Search Term and Categories', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var listItemsBefore, badgeCtrBefore, modifySearchTerm, _a, _b, newCategory, categoryToRemove, listItemsAfterSave, badgeCtrAfterSave, _c, _d, listItemsAfterRefresh, badgeCtrAfterRefresh, savedQuickSearch;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 1:
                        listItemsBefore = _e.sent();
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 2:
                        badgeCtrBefore = _e.sent();
                        _b = (_a = util).getRandomFromArray;
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 3:
                        modifySearchTerm = _b.apply(_a, [_e.sent()]);
                        newCategory = "cat_" + casual.word + "_" + (new Date().getTime());
                        categoryToRemove = newQuickSearch.categories.toExpect[0];
                        modifiedQuickSearch.searchName = casual.word + (new Date().getTime());
                        modifiedQuickSearch.searchTerm = "asset=*" + modifySearchTerm;
                        modifiedQuickSearch.categories.remove = [categoryToRemove];
                        modifiedQuickSearch.categories.add = [newCategory]; // add another category
                        modifiedQuickSearch.categories.toExpect = helper.removeItemFromArrayByValue(modifiedQuickSearch.categories.toExpect, [categoryToRemove]);
                        modifiedQuickSearch.categories.toExpect.push(newCategory);
                        listview.updateQuickSearch(modifiedQuickSearch); // update Quick search
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 4:
                        listItemsAfterSave = _e.sent();
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 5:
                        badgeCtrAfterSave = _e.sent();
                        expect(listItemsBefore.length).not.toEqual(listItemsAfterSave.length, 'List results'); // compare count
                        _d = (_c = expect(badgeCtrBefore).not).toEqual;
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 6:
                        _d.apply(_c, [_e.sent(), 'Badge counter']); // compare badge count
                        protractor_1.browser.refresh(); // refresh to check it changes are saved
                        helper.waitAndClick(listview.quickSearchDropdownBtn, 30000);
                        listview.selectQuickSearchFromDropdown(modifiedQuickSearch.searchName);
                        return [4 /*yield*/, listview.getColumnItemsByColName('Asset')];
                    case 7:
                        listItemsAfterRefresh = _e.sent();
                        return [4 /*yield*/, listview.badgeCtr.getText()];
                    case 8:
                        badgeCtrAfterRefresh = _e.sent();
                        expect(listItemsAfterSave.length).toEqual(listItemsAfterRefresh.length);
                        expect(badgeCtrAfterSave).toEqual(badgeCtrAfterRefresh);
                        return [4 /*yield*/, getQuickSearch()];
                    case 9:
                        savedQuickSearch = _e.sent();
                        assertQuickSearchDetails(savedQuickSearch, modifiedQuickSearch);
                        return [2 /*return*/];
                }
            });
        }); });
        it('SAVE AS a Quick Search', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var currentQuickSearch, quickSearchCopy, currentQuickSearchAfter;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getQuickSearch()];
                    case 1:
                        currentQuickSearch = _a.sent();
                        currentQuickSearch.searchName = currentQuickSearch.searchName + "-copy"; // to compare with SaveAs details
                        return [4 /*yield*/, listview.saveAsQuickSearch()];
                    case 2:
                        saveAsQuickSearch = _a.sent();
                        expect(currentQuickSearch).toEqual(saveAsQuickSearch);
                        listview.waitForSpinner();
                        return [4 /*yield*/, listview.quickSearchBtn.getText()];
                    case 3:
                        quickSearchCopy = _a.sent();
                        expect(quickSearchCopy).toEqual(saveAsQuickSearch.searchName);
                        return [4 /*yield*/, getQuickSearch()];
                    case 4:
                        currentQuickSearchAfter = _a.sent();
                        expect(currentQuickSearchAfter).toEqual(saveAsQuickSearch);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete quick search', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                listview.deleteQuickSearchMoreOption();
                expect(listview.getQuickSearchFromDropdown(saveAsQuickSearch.searchName).count())
                    .toEqual(0);
                helper.clickAndSleep(listview.quickSearchDropdownBtn, 500);
                listview.selectQuickSearchFromDropdown(modifiedQuickSearch.searchName);
                listview.deleteQuickSearchMoreOption();
                expect(listview.getQuickSearchFromDropdown(modifiedQuickSearch.searchName).count())
                    .toEqual(0);
                return [2 /*return*/];
            });
        }); });
    });
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
function getQuickSearch() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var qsDetails;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listview.moreOptions.click();
                    listview.editListBtn.click();
                    return [4 /*yield*/, listview.getQuickSearchDetails()];
                case 1:
                    qsDetails = _a.sent();
                    // return listview.getQuickSearchDetails();
                    listview.cancelQuickSearchBtn.click();
                    helper.waitForDisappear(listview.modalWindow);
                    return [2 /*return*/, qsDetails];
            }
        });
    });
}
function assertQuickSearchDetails(savedQuickSearchDetails, toCompare) {
    expect(savedQuickSearchDetails.searchName).toEqual(toCompare.searchName);
    expect(savedQuickSearchDetails.makePublic).toEqual(toCompare.makePublic);
    expect(savedQuickSearchDetails.assetOption).toEqual(toCompare.assetOption);
    expect(savedQuickSearchDetails.categories === toCompare.categories.toExpect)
        .toBeTruthy("Categories: " + savedQuickSearchDetails.categories + " are not equal " +
        ("or Categories are not checked in save dialog: " + toCompare.categories.toExpect));
    expect(savedQuickSearchDetails.categoryTag).toEqual(toCompare.categories.toExpect, "CategoryTag not equal or CategoryTag not present");
    // listview.cancelQuickSearchBtn.click();
}
//# sourceMappingURL=program-navigator-LV-Scheduled-CRUD.e2e-spec.js.map