"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var helper_1 = require("../helpers/helper");
var helper = new helper_1.Helper();
exports.quickSearchPage = {
    modalWindow: protractor_1.$("[uib-modal-window=\"modal-window\"]"),
    spinnerImg: protractor_1.$("[id=\"spinner\"]"),
    tabElements: protractor_1.$$("[ng-repeat=\"tab in vm.tabs\"] > a"),
    filterByCategoryBtn: protractor_1.$("[title=\"Filter by Category\"]"),
    quickSearchBtn: protractor_1.$("[ng-click=\"listVM.search(listVM.selectedQuickSearch)\"]"),
    quickSearchDropdownBtn: protractor_1.$("#quicksearch button.dropdown-toggle.dropdown-toggle-split"),
    quickSearchList: protractor_1.$$("#quicksearch >div.pull-right ul[role=\"menu\"] a[role=\"menuitem\"]"),
    // saveListBtn: $(`[ng-click="listVM.saveQuickSearch()"]`),
    saveListBtn: protractor_1.$("[title=\"Save List\"]"),
    // saveAsBtn: $(`[title="Save As"]`),
    saveAsBtn: protractor_1.$("[ng-click=\"listVM.copyQuickSearch()\"]"),
    filterBtn: protractor_1.$("[ng-click=\"searchSettings.toggle()\"]"),
    deleteList: protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.deleteQuickSearch($event)\"]"),
    moreOptions: protractor_1.$("#quicksearch button.btn.btn-link.dropdown-toggle"),
    showColumnOptionsBtn: protractor_1.$("[ng-click=\"listVM.showColumnOptions()\"]"),
    newListBtn: protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.newList()\"]"),
    editListBtn: protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.saveQuickSearch(true)\"]"),
    exportBtn: protractor_1.$("[ng-click=\"listVM.Export()\"]"),
    badgeCtr: protractor_1.$(".badge"),
    /** Create New List */
    modalTitle: protractor_1.$(".modal-title"),
    searchName: protractor_1.$("[name=\"quickSearchTitle\"]"),
    searchTerm: protractor_1.$("[id=\"searchText\"]"),
    okNewListBtn: protractor_1.$("[ng-click=\"newListVM.ok()\"]"),
    cancelNewListBtn: protractor_1.$("[ng-click=\"newListVM.cancel()\"]"),
    scheduleChkBox: protractor_1.$("[ng-model=\"newListVM.selected.ScheduleSearch\"]"),
    /** Save Quick Search */
    titleTxt: protractor_1.$("[ng-model=\"saveQuickSearchVm.name\"]"),
    categoryTxt: protractor_1.$("[ng-model=\"aConCatVM.Candidate\"]"),
    categoryAddBtn: protractor_1.$("[ng-click=\"aConCatVM.addCandidate()\"]"),
    makePublicChkBox: protractor_1.$("[ng-model=\"saveQuickSearchVm.isPublic\"]"),
    applyToSelectedAssetChkBox: protractor_1.$("[ng-model=\"saveQuickSearchVm.applyToSelectedAsset\"]"),
    categoryTags: protractor_1.$$(".modal-content .chosen-choices > .search-choice > span"),
    okSaveQuickSearchBtn: protractor_1.$("[ng-click=\"saveQuickSearchVm.ok()\"]"),
    cancelQuickSearchBtn: protractor_1.$("[ng-click=\"saveQuickSearchVm.cancel()\"]"),
    searchExpansionTxt: protractor_1.$("[ng-model=\"quickSearch.SearchExpression\"]"),
    clearBtn: protractor_1.$("[ng-click=\"searchSettings.clearSearch()\"]"),
    submitFilter: protractor_1.$("#tagSearchPopup [type=\"submit\"]"),
    toastMessage: protractor_1.$(".toast-message"),
    /** List */
    listContainer: protractor_1.$(".listContainer"),
    listHeader: protractor_1.$$(".listContainer [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]"),
    rowList: protractor_1.$$(".ui-grid-row"),
    dataTypes: {
        float: 'Float',
        int: 'Int',
        string: 'String',
        list: 'List',
        boolean: 'Boolean',
        date: 'Date',
        tag: 'Tag'
    },
    /** Column Options */
    availableColumns: protractor_1.$$("[ng-options=\"column as column.DisplayName for column in popupVM.visibleOptions\"]"),
    selectedColumns: protractor_1.$$("[ng-options=\"column as column.DisplayName for column in popupVM.selected\"]"),
    addSelectedColumnBtn: protractor_1.$("[title=\"Add\"]"),
    removeSelectedColumnBtn: protractor_1.$("[title=\"Remove\"]"),
    addAllColumnsBtn: protractor_1.$("[title=\"Add All\"]"),
    removeAllColumnsBtn: protractor_1.$("[title=\"Remove All\"]"),
    cancelBtnColumnDialog: protractor_1.$("[ng-click=\"popupVM.cancel()\"]"),
    okBtnColumnDialog: protractor_1.$("[ng-click=\"popupVM.close()\"]"),
    moveUpBtn: protractor_1.$("[title=\"Move Up\"]"),
    moveDownBtn: protractor_1.$("[title=\"Move Up\"]"),
    /**
     *
     * @param quickSearchObj {name, searchTerm }
     */
    createQuickSearch: function (quickSearchObj) {
        helper.clickAndSleep(exports.quickSearchPage.moreOptions);
        exports.quickSearchPage.newListBtn.click();
        helper.waitForVisible(exports.quickSearchPage.modalTitle);
        expect(exports.quickSearchPage.modalTitle.getText())
            .toEqual("Create New List", "Modal Title does not match");
        helper.clearAndSendKeys(exports.quickSearchPage.searchName, quickSearchObj.searchName);
        helper.clearAndSendKeys(exports.quickSearchPage.searchTerm, quickSearchObj.searchTerm);
        exports.quickSearchPage.okNewListBtn.click();
        exports.quickSearchPage.waitForSpinner();
        return exports.quickSearchPage.quickSearchBtn.getText();
    },
    saveQuickSearchFn: function (quickSearchObj, modify) {
        if (modify === void 0) { modify = false; }
        if (modify) {
            exports.quickSearchPage.moreOptions.click();
            exports.quickSearchPage.editListBtn.click();
        }
        else {
            exports.quickSearchPage.saveListBtn.click();
        }
        helper.waitForVisible(exports.quickSearchPage.modalTitle);
        helper.waitForVisible(exports.quickSearchPage.categoryTxt);
        protractor_1.browser.sleep(2000);
        expect(exports.quickSearchPage.modalTitle.getText())
            .toEqual("Save a quick search", "Modal Title does not match");
        helper.clearAndSendKeys(exports.quickSearchPage.titleTxt, quickSearchObj.searchName);
        exports.quickSearchPage.addCategories(quickSearchObj.categories.add);
        exports.quickSearchPage.removeCategories(quickSearchObj.categories.remove);
        helper.selectCheckBox(exports.quickSearchPage.applyToSelectedAssetChkBox, quickSearchObj.applyToSelectedAsset);
        helper.selectCheckBox(exports.quickSearchPage.makePublicChkBox, quickSearchObj.makePublic);
        var catTags = exports.quickSearchPage.categoryTags.getText();
        exports.quickSearchPage.okSaveQuickSearchBtn.click();
        exports.quickSearchPage.waitForSpinner();
        protractor_1.browser.sleep(1000);
        return catTags;
    },
    /**
     * use this if you just want to click sa save button..
     * this has the waitForSpinner()
     */
    saveListFn: function (firstTimeSave) {
        if (firstTimeSave === void 0) { firstTimeSave = false; }
        exports.quickSearchPage.saveListBtn.click();
        if (firstTimeSave) {
            helper.waitForVisible(exports.quickSearchPage.modalTitle);
            exports.quickSearchPage.okSaveQuickSearchBtn.click();
        }
        exports.quickSearchPage.waitForSpinner();
    },
    updateQuickSearch: function (listFilterDetails) {
        exports.quickSearchPage.modifySearchFilter(listFilterDetails);
        exports.quickSearchPage.saveQuickSearchFn(listFilterDetails, true);
    },
    modifySearchFilter: function (listFilterDetails) {
        exports.quickSearchPage.filterBtn.click();
        helper.clearAndSendKeys(exports.quickSearchPage.searchExpansionTxt, listFilterDetails.searchTerm);
        // add advance filters here
        exports.quickSearchPage.submitFilter.click();
        helper.waitForDisappear(exports.quickSearchPage.spinnerImg);
        // currently it will reload the list if the filter btn is clicked to close
        exports.quickSearchPage.filterBtn.click();
        helper.waitForDisappear(exports.quickSearchPage.spinnerImg);
    },
    deleteQuickSearch: function (quickSearchName) {
        exports.quickSearchPage.quickSearchDropdownBtn.click();
        exports.quickSearchPage.removeQuickSearchFromDropdown(quickSearchName);
        exports.quickSearchPage.quickSearchDropdownBtn.click();
    },
    deleteQuickSearchMoreOption: function () {
        exports.quickSearchPage.moreOptions.click();
        protractor_1.browser.sleep(1000);
        exports.quickSearchPage.deleteList.click();
        protractor_1.browser.switchTo().alert().accept();
        helper.waitForVisible(exports.quickSearchPage.toastMessage);
        exports.quickSearchPage.moreOptions.click();
        exports.quickSearchPage.waitForSpinner();
        protractor_1.browser.sleep(1000);
        return exports.quickSearchPage.getToastMessage();
    },
    saveAsQuickSearch: function (quickSearchObj) {
        // helper.waitForElementClickable(quickSearchPage.saveAsBtn, 3000);
        protractor_1.browser.sleep(1000);
        exports.quickSearchPage.moreOptions.click();
        protractor_1.browser.sleep(2000);
        exports.quickSearchPage.saveAsBtn.click();
        helper.waitForVisible(exports.quickSearchPage.categoryTxt);
        var saveAsDetails = exports.quickSearchPage.getQuickSearchDetails();
        if (quickSearchObj !== undefined) {
            exports.quickSearchPage.saveQuickSearchFn(saveAsDetails);
        }
        else {
            helper.clickAndSleep(exports.quickSearchPage.okSaveQuickSearchBtn, 1000);
            exports.quickSearchPage.waitForSpinner();
            return saveAsDetails;
        }
    },
    createQuickSearchComplete: function (quickSearchObj) {
        /**
         * quickSearchObj {searchName, searchTerm}
         */
        exports.quickSearchPage.createQuickSearch(quickSearchObj);
        var saveRes = exports.quickSearchPage.saveQuickSearchFn(quickSearchObj);
    },
    addCategories: function (categories) {
        categories.forEach(function (category) {
            exports.quickSearchPage.categoryTxt.sendKeys(category);
            exports.quickSearchPage.categoryAddBtn.click();
            protractor_1.browser.sleep(800);
        });
    },
    removeCategories: function (categories) {
        categories.forEach(function (category) {
            protractor_1.element(protractor_1.by
                .xpath("//div[@class=\"modal-content\"]//ul[@class=\"chosen-choices\"]/li" +
                ("/span[contains(text(),\"" + category + "\")]/preceding-sibling::a")))
                .click();
        });
    },
    selectCategory: function (category) {
    },
    getQuickSearchFromDropdown: function (searchName) {
        return protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]"));
    },
    /**
     *
     * @param searchName Quick search name
     * @param alert Set to true if you want to interact with Alert message (unsaved message)
     */
    selectQuickSearchFromDropdown: function (searchName, alert) {
        if (alert === void 0) { alert = false; }
        protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]"))
            .first().click();
        if (!alert) {
            helper.waitForDisappear(exports.quickSearchPage.spinnerImg);
        }
    },
    removeQuickSearchFromDropdown: function (searchName) {
        protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]/following-sibling::span/i"))
            .first().click();
        protractor_1.browser.switchTo().alert().accept();
        protractor_1.browser.sleep(2000);
    },
    getQuickSearchDetails: function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        helper.waitForVisible(exports.quickSearchPage.categoryTxt);
                        _a = {};
                        return [4 /*yield*/, exports.quickSearchPage.titleTxt.getAttribute('value')];
                    case 1:
                        _a.searchName = _b.sent();
                        return [4 /*yield*/, exports.quickSearchPage.makePublicChkBox.getAttribute('class')
                                .then(function (attr) { return attr.includes('ng-not-empty'); })];
                    case 2:
                        _a.makePublic = _b.sent();
                        return [4 /*yield*/, exports.quickSearchPage.applyToSelectedAssetChkBox.getAttribute('class')
                                .then(function (attr) { return attr.includes('ng-not-empty'); })];
                    case 3:
                        _a.applyToSelectedAsset = _b.sent();
                        return [4 /*yield*/, exports.quickSearchPage.getSelectedCategories().categories.getText()];
                    case 4:
                        _a.categories = _b.sent();
                        return [4 /*yield*/, exports.quickSearchPage.getSelectedCategories().categoryTags.getText()];
                    case 5: return [2 /*return*/, (_a.categoryTag = _b.sent(),
                            _a)];
                }
            });
        });
    },
    /**
     * returns categories and tags displayed
     */
    getSelectedCategories: function () {
        return {
            categories: protractor_1.element.all(protractor_1.by
                .xpath("//div[@ng-repeat=\"c in aConCatVM.ExpandedCategories\"]/" +
                "label/input[contains(@class,\"ng-not-empty\")]/ancestor::label")),
            categoryTags: protractor_1.$$("[ng-repeat=\"s in selectedCategories\"] > span")
        };
    },
    getQuickSearchFromList: function (searchName) {
    },
    getSelectedColummns: function () {
        protractor_1.browser.sleep(2000);
        helper.waitForVisible(protractor_1.$(".modal-dialog "));
        return exports.quickSearchPage.selectedColumns.$$('option').getText();
    },
    getAvailableColumns: function () {
        helper.waitForVisible(protractor_1.$(".modal-dialog "));
        return exports.quickSearchPage.availableColumns.$$("option").getText();
    },
    setSelectedColumns: function (colName) {
        exports.quickSearchPage.selectColumnToAdd(colName);
    },
    selectColumnToAdd: function (colName) {
        colName.forEach(function (column) {
            // helper.waitAndClick(element.all(by
            //   .xpath(`//select[@ng-options="column as column.DisplayName` +
            //     ` for column in popupVM.visibleOptions"]/option[@label="${column}"]`))[0]);
            // // element.all(by
            // tslint:disable-next-line:max-line-length
            // //   .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]/option[@label="${column}"]`))
            // //   .click();
            helper.waitAndClick(protractor_1.element(protractor_1.by
                .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.visibleOptions\"]/option[@label=\"" + column + "\"]")));
            protractor_1.browser.sleep(800);
            exports.quickSearchPage.addSelectedColumnBtn.click();
        });
    },
    removeColumns: function (colName) {
        protractor_1.browser.sleep(1000);
        colName.forEach(function (column) {
            protractor_1.element.all(protractor_1.by
                .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.selected\"]/option[@label=\"" + column + "\"]"))
                .click();
            exports.quickSearchPage.removeSelectedColumnBtn.click();
        });
    },
    moveSelectedColumn: function (column) {
        // { columnName: string, direction: string, count: number }
        var moveBtn = column.direction === 'up' ? exports.quickSearchPage.moveUpBtn : exports.quickSearchPage.moveDownBtn;
        protractor_1.element.all(protractor_1.by
            .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.selected\"]/option[@label=\"" + column.columnName + "\"]"))
            .click();
        for (var idx = 0; idx < column.count; idx++) {
            moveBtn.click();
            protractor_1.browser.sleep(1000);
        }
    },
    waitForSpinner: function () {
        helper.waitForVisible(exports.quickSearchPage.spinnerImg);
        helper.waitForDisappear(exports.quickSearchPage.spinnerImg);
        protractor_1.browser.sleep(1000);
    },
    getToastMessage: function () {
        return exports.quickSearchPage.toastMessage.getText();
    }
};
//# sourceMappingURL=quickSearch.po.js.map