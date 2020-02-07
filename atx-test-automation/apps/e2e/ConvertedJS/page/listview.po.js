"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var helper_1 = require("../helpers/helper");
var ptor_1 = require("protractor/built/ptor");
var testDetails_data_1 = require("../helpers/testDetails.data");
var interface_1 = require("../helpers/interface");
var _ = require("lodash");
var utils_1 = require("../helpers/utils");
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var Listview = /** @class */ (function () {
    function Listview() {
        this.modalWindow = protractor_1.$("[uib-modal-window=\"modal-window\"]");
        this.spinnerImg = protractor_1.$("[id=\"spinner\"]");
        this.tabElements = protractor_1.$$("[ng-repeat=\"tab in vm.tabs\"] > a"); // or $$(`[role="tab"]`)
        this.filterByCategoryBtn = protractor_1.$("[title=\"Filter by Category\"]");
        this.quickSearchBtn = protractor_1.$("[ng-click=\"listVM.search(listVM.selectedQuickSearch)\"]");
        this.quickSearchDropdownBtn = protractor_1.$("#quicksearch button.dropdown-toggle.dropdown-toggle-split");
        this.quickSearchList = protractor_1.$$("#quicksearch >div.pull-right ul[role=\"menu\"] a[role=\"menuitem\"]");
        // saveListBtn= $(`[ng-click="listVM.saveQuickSearch()"]`);
        this.saveListBtn = protractor_1.$("[title=\"Save List\"]");
        // saveAsBtn= $(`[title="Save As"]`);
        this.saveAsBtn = protractor_1.$("[ng-click=\"listVM.copyQuickSearch()\"]");
        this.filterBtn = protractor_1.$("[ng-click=\"searchSettings.toggle()\"]");
        this.deleteList = protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.deleteQuickSearch($event)\"]");
        this.moreOptions = protractor_1.$("#quicksearch button.btn.btn-link.dropdown-toggle");
        this.showColumnOptionsBtn = protractor_1.$("[ng-click=\"listVM.showColumnOptions()\"]");
        this.newListBtn = protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.newList()\"]");
        this.editListBtn = protractor_1.$("[role=\"menu\"] [ng-click=\"listVM.saveQuickSearch(true)\"]");
        this.exportBtn = protractor_1.$("[ng-click=\"listVM.Export()\"]");
        this.badgeCtr = protractor_1.$(".badge"); // displays number of items in the list
        /** Create New List */
        this.modalTitle = protractor_1.$(".modal-title");
        this.searchName = protractor_1.$("[name=\"quickSearchTitle\"]");
        this.searchTerm = protractor_1.$("[id=\"searchText\"]"); // clear text first
        this.okNewListBtn = protractor_1.$("[ng-click=\"newListVM.ok()\"]");
        this.cancelNewListBtn = protractor_1.$("[ng-click=\"newListVM.cancel()\"]");
        this.scheduleChkBox = protractor_1.$("[ng-model=\"newListVM.selected.ScheduleSearch\"]");
        this.mapSpinner = protractor_1.$("#geoSpaSpinner");
        this.mapDropdown = protractor_1.$("[ng-model=\"sekoiaSelectedGeospa\"]");
        this.mapGeoSpa = {
            projectStatus: 'Project Status',
            programStatus: 'Program Status',
            SAIDI: 'SAIDI',
            SAIFI: 'SAIFI',
            CEMI: 'CEMI',
            voltageViolations: 'Voltage Violations',
            outageEvents: 'Outage Events',
            fieldAreaNetwork: 'Field Area Network'
        };
        this.assetTypeDropdown = protractor_1.$("[ng-model=\"newListVM.selectedAssetClassTypesForSchedule\"]");
        /** Save Quick Search */
        this.titleTxt = protractor_1.$("[ng-model=\"saveQuickSearchVm.name\"]");
        this.categoryTxt = protractor_1.$("[ng-model=\"aConCatVM.Candidate\"]");
        this.categoryAddBtn = protractor_1.$("[ng-click=\"aConCatVM.addCandidate()\"]");
        this.makePublicChkBox = protractor_1.$("[ng-model=\"saveQuickSearchVm.isPublic\"]");
        this.applyToSelectedAssetChkBox = protractor_1.$("[ng-model=\"saveQuickSearchVm.applyToSelectedAsset\"]");
        this.assetOptionDropdown = protractor_1.$$("[ng-model=\"saveQuickSearchVm.assetOption\"]");
        this.assetOptions = {
            applyToSelectedAsset: "Apply to selected asset only",
            applyToSelectedAssetAndAllDescendants: "Apply to selected asset and all its descendants",
            applyToSelectedAssetAndDescendantsSpecficType: "Apply to selected asset and its decendants of specific type"
        };
        this.categoryTags = protractor_1.$$(".modal-content .chosen-choices > .search-choice > span");
        this.okSaveQuickSearchBtn = protractor_1.$("[ng-click=\"saveQuickSearchVm.ok()\"]");
        this.cancelQuickSearchBtn = protractor_1.$("[ng-click=\"saveQuickSearchVm.cancel()\"]");
        this.searchExpansionTxt = protractor_1.$("[ng-model=\"quickSearch.SearchExpression\"]");
        this.clearBtn = protractor_1.$("[ng-click=\"searchSettings.clearSearch()\"]");
        this.submitFilter = protractor_1.$("#tagSearchPopup [type=\"submit\"]");
        this.toastMessage = protractor_1.$(".toast-message");
        this.progressBar = protractor_1.$(".overlayContent .progress-bar");
        /** List */
        this.listCanvas = protractor_1.$(".listContainer [role=\"rowgroup\"] > .ui-grid-canvas");
        this.listContainer = protractor_1.$(".listContainer");
        this.listHeader = protractor_1.$$(".listContainer [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]");
        this.listHeaderBatchEdit = protractor_1.$$("[ui-grid=\"batchVM.scheduleEdit\"] [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]");
        this.rowList = protractor_1.$$(".listContainer .ui-grid-row");
        this.rowListBatchEdit = protractor_1.$$("[ui-grid=\"batchVM.scheduleEdit\"] .ui-grid-row");
        // rowListBatchEdit = $$(`#BatchEdit .ui-grid-row`);
        this.batchEditGrid = protractor_1.$("[ui-grid=\"batchVM.scheduleEdit\"]");
        this.dataTypes = {
            float: 'Float',
            int: 'Int',
            string: 'String',
            list: 'List',
            boolean: 'Boolean',
            date: 'Date',
            tag: 'Tag',
            scheduleDate: 'ScheduleDate'
        };
        /** Column Options */
        this.availableColumns = protractor_1.$$("[ng-options=\"column as column.DisplayName for column in popupVM.visibleOptions\"]");
        this.selectedColumns = protractor_1.$$("[ng-options=\"column as column.DisplayName for column in popupVM.selected\"]");
        this.addSelectedColumnBtn = protractor_1.$("[title=\"Add\"]");
        this.removeSelectedColumnBtn = protractor_1.$("[title=\"Remove\"]");
        this.addAllColumnsBtn = protractor_1.$("[title=\"Add All\"]");
        this.removeAllColumnsBtn = protractor_1.$("[title=\"Remove All\"]");
        this.cancelBtnColumnDialog = protractor_1.$("[ng-click=\"popupVM.cancel()\"]");
        this.okBtnColumnDialog = protractor_1.$("[ng-click=\"popupVM.close()\"]");
        this.moveUpBtn = protractor_1.$("[title=\"Move Up\"]");
        this.moveDownBtn = protractor_1.$("[title=\"Move Up\"]");
        this.columnTypeDropDown = protractor_1.$("[ng-model=\"popupVM.selColumnType\"]");
        this.columnTypes = {
            asset: 'Asset', schedule: 'Schedule', timeSeries: 'Time-Series', events: 'Events'
        };
        this.showAssetEventsViewOption = protractor_1.$$("[type=\"radio\"]");
        this.availableEventTypes = protractor_1.$("[ng-show=\"popupVM.selColumnType == 'Events'\"]"); // event types container
        /** Scheduled */
        this.scheduleColumnsArray = [
            'Asset',
            'Not Started Plan', 'Not Started Actual',
            'Mitigation Plan Plan', 'Mitigation Plan Actual',
            'Engineering Plan', 'Engineering Actual',
            'Procurement Plan', 'Procurement Actual',
            'Permitting Plan', 'Permitting Actual',
            'Construction Plan', 'Construction Actual',
            'Close-out Plan', 'Close-out Actual',
            'Mitigation Complete Plan', 'Mitigation Complete Actual'
        ];
        this.scheduleColumnObj = {
            notStarted: 'Not Started', mitigationPlan: 'Mitigation Plan', engineering: 'Engineering',
            procurement: 'Procurement', permitting: 'Permitting', construction: 'Construction',
            closeOut: 'Close-out', mitigationComplete: 'Mitigation Complete'
        };
        /** Batch Edit */
        this.selectedAllNoneBtn = protractor_1.$("[ng-click=\"listVM.selectAllChanged()\"]");
        this.editSelectedBtn = protractor_1.$("[ng-click=\"listVM.editSelected()\"]");
        this.batchEditWindow = protractor_1.$("#BatchEdit");
        this.batchEditCounter = protractor_1.$("#BatchEdit > div > label");
        this.batchEditAssetInfoTab = protractor_1.$("[ng-click=\"batchVM.setTab('attribute')\"]");
        this.batchEditScheduleTab = protractor_1.$("[ng-click=\"batchVM.setTab('schedule')\"]");
        this.batchEditSaveBtn = protractor_1.$("[ng-click=\"batchVM.saveEditSelected()\"]");
        this.batchEditAddAttributeTxt = protractor_1.$("#newAttributeNameField");
        this.batchEditAddAttributeDropdown = protractor_1.$("#newAttribute .dropdown-toggle");
        this.batchEditAddAttributeBtn = protractor_1.$("[ng-click=\"batchVM.addAttribute(batchVM.newAttributeType)\"]");
        this.batchEditAttributeMenu = protractor_1.$("#newAttribute [role=\"menuitem\"]");
        this.batchEditAddTagTxt = protractor_1.$(".taggingInputSection #addTag");
        this.batchEditAddTagBtn = protractor_1.$(".taggingInputSection button");
        this.batchEditSetDetailsBtn = protractor_1.$("[ng-click=\"attributeVM.detailsCollapsed = !attributeVM.detailsCollapsed\"]");
        this.attributeValueTypesDropdown = protractor_1.$("#attributeType"); // put .getText() and should display all existing
        this.attributeValueFreeformText = protractor_1.$("#attributeValueText");
        this.attributeValueFloat = protractor_1.$("#attributeValueFloat");
        this.attributeDecimalFloat = protractor_1.$("#attributeDecimal");
        this.attributeValueInteger = protractor_1.$("#attributeValueInt");
        this.attributeValueList = protractor_1.$("#attributeValueList");
        this.attributeOptionsList = protractor_1.$("#attributeOptions");
        this.attributeValueBoolean = protractor_1.$("#attributeValueBoolean");
        this.attributeDateBtn = protractor_1.$("[ng-click=\"dpController.openStart($event)\"]");
        this.attributeTimeTxt = protractor_1.$("[ng-model=\"dpController.internalTime\"]");
        this.setAttributeValueOkBtn = protractor_1.$("[ng-click=\"attributeVM.ok()\"]");
        this.setAttributeValueCancelBtn = protractor_1.$("[ng-click=\"attributeVM.cancel()\"]");
        this.batchEditAssetInfoColumnHeaders = protractor_1.$$("#BatchEdit #batchAttributeTable [role=\"columnheader\"]");
    }
    // listHeaderBatchEdit = $$(`#BatchEdit [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);
    Listview.prototype.getListHeaderBatchEdit = function (schedule) {
        return schedule ? protractor_1.$$("[ui-grid=\"batchVM.scheduleEdit\"] [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]")
            : protractor_1.$$("[ui-grid=\"batchVM.attributeEdit\"]  [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]");
    };
    Listview.prototype.getRowListBatchEdit = function (schedule) {
        return schedule ? protractor_1.$$("[ui-grid=\"batchVM.scheduleEdit\"] .ui-grid-row")
            : protractor_1.$$("[ui-grid=\"batchVM.attributeEdit\"] .ui-grid-row");
    };
    /**
     *
     * @param quickSearchObj {name, searchTerm }
     */
    Listview.prototype.createQuickSearch = function (quickSearchObj) {
        helper.waitForVisible(this.moreOptions);
        helper.clickAndSleep(this.moreOptions);
        this.newListBtn.click();
        helper.waitForVisible(this.modalTitle);
        expect(this.modalTitle.getText())
            .toEqual("Create New List", "Modal Title does not match");
        helper.clearAndSendKeys(this.searchName, quickSearchObj.searchName);
        helper.clearAndSendKeys(this.searchTerm, quickSearchObj.searchTerm);
        /* This is For Scheduled */
        if (quickSearchObj && quickSearchObj.schedule && quickSearchObj.schedule.scheduled) {
            this.scheduleChkBox.click();
            // helper.waitForVisible(this.mapSpinner); helper.waitForDisappear(this.mapSpinner);
            this.mapDropdown.$("[label=\"" + quickSearchObj.schedule.map + "\"]").click();
            this.assetTypeDropdown.$("[label=\"" + quickSearchObj.schedule.assetType + "\"]").click();
        }
        this.okNewListBtn.click();
        this.waitForSpinner();
        return this.quickSearchBtn.getText();
    };
    Listview.prototype.saveQuickSearchFn = function (quickSearchObj, modify) {
        if (modify === void 0) { modify = false; }
        if (modify) {
            this.moreOptions.click();
            this.editListBtn.click();
        }
        else {
            this.saveListBtn.click();
        }
        helper.waitForVisible(this.modalTitle);
        helper.waitForVisible(this.categoryTxt);
        protractor_1.browser.sleep(2000);
        expect(this.modalTitle.getText())
            .toEqual("Save a quick search", "Modal Title does not match");
        helper.clearAndSendKeys(this.titleTxt, quickSearchObj.searchName);
        if (quickSearchObj && quickSearchObj.categories && quickSearchObj.categories.add) {
            this.addCategories(quickSearchObj.categories.add);
        }
        if (quickSearchObj && quickSearchObj.categories && quickSearchObj.categories.remove) {
            this.removeCategories(quickSearchObj.categories.remove);
        }
        // helper.selectCheckBox(this.applyToSelectedAssetChkBox,
        //   quickSearchObj.applyToSelectedAsset);
        helper.selectCheckBox(this.makePublicChkBox, quickSearchObj.makePublic);
        this.assetOptionDropdown.get(quickSearchObj.makePublic ? 1 : 0)
            .element(protractor_1.by.cssContainingText('option', quickSearchObj.assetOption)).click();
        var catTags = this.categoryTags.getText();
        this.okSaveQuickSearchBtn.click();
        this.waitForSpinner();
        protractor_1.browser.sleep(1000);
        return catTags;
    };
    /**
     * use this if you just want to click sa save button..
     * this has the waitForSpinner()
     */
    Listview.prototype.saveListFn = function (firstTimeSave) {
        if (firstTimeSave === void 0) { firstTimeSave = false; }
        this.saveListBtn.click();
        if (firstTimeSave) {
            helper.waitForVisible(this.modalTitle);
            this.okSaveQuickSearchBtn.click();
        }
        this.waitForSpinner();
    };
    Listview.prototype.updateQuickSearch = function (listFilterDetails) {
        // this.filterBtn.click();
        // helper.clearAndSendKeys(this.searchExpansionTxt, listFilterDetails.searchTerm);
        // // add advance filters here
        // this.submitFilter.click(); helper.waitForDisappear(this.spinnerImg);
        // // currently it will reload the list if the filter btn is clicked to close
        // this.filterBtn.click(); helper.waitForDisappear(this.spinnerImg);
        this.modifySearchFilter(listFilterDetails);
        this.saveQuickSearchFn(listFilterDetails, true);
        // this.okSaveQuickSearchBtn.click(); helper.waitForDisappear(this.spinnerImg);
    };
    Listview.prototype.modifySearchFilter = function (listFilterDetails) {
        this.filterBtn.click();
        helper.clearAndSendKeys(this.searchExpansionTxt, listFilterDetails.searchTerm);
        // add advance filters here
        this.submitFilter.click();
        helper.waitForDisappear(this.spinnerImg);
        protractor_1.browser.sleep(1000);
        // currently it will reload the list if the filter btn is clicked to close
        this.filterBtn.click(); // helper.waitForDisappear(this.spinnerImg);
    };
    Listview.prototype.deleteQuickSearch = function (quickSearchName) {
        this.quickSearchDropdownBtn.click();
        this.removeQuickSearchFromDropdown(quickSearchName);
        this.quickSearchDropdownBtn.click();
    };
    Listview.prototype.deleteQuickSearchMoreOption = function () {
        this.moreOptions.click();
        protractor_1.browser.sleep(1000);
        this.deleteList.click();
        protractor_1.browser.switchTo().alert().accept();
        helper.waitForVisible(this.toastMessage);
        var toastMessage = this.getToastMessage();
        this.moreOptions.click(); // click more options to close
        this.waitForSpinner();
        return toastMessage;
    };
    Listview.prototype.saveAsQuickSearch = function (quickSearchObj) {
        // helper.waitForElementClickable(this.saveAsBtn, 3000);
        protractor_1.browser.sleep(1000);
        this.moreOptions.click();
        protractor_1.browser.sleep(2000);
        this.saveAsBtn.click();
        helper.waitForVisible(this.categoryTxt);
        var saveAsDetails = this.getQuickSearchDetails();
        if (quickSearchObj !== undefined) {
            this.saveQuickSearchFn(saveAsDetails);
        }
        else {
            helper.clickAndSleep(this.okSaveQuickSearchBtn, 1000);
            this.waitForSpinner();
            return saveAsDetails;
        }
    };
    Listview.prototype.createQuickSearchComplete = function (quickSearchObj) {
        this.createQuickSearch(quickSearchObj);
        var saveRes = this.saveQuickSearchFn(quickSearchObj);
    };
    Listview.prototype.addCategories = function (categories) {
        var _this = this;
        categories.forEach(function (category) {
            _this.categoryTxt.sendKeys(category);
            _this.categoryAddBtn.click();
            protractor_1.browser.sleep(800);
        });
    };
    Listview.prototype.removeCategories = function (categories) {
        categories.forEach(function (category) {
            protractor_1.element(protractor_1.by
                .xpath("//div[@class=\"modal-content\"]//ul[@class=\"chosen-choices\"]/li" +
                ("/span[contains(text(),\"" + category + "\")]/preceding-sibling::a")))
                .click();
        });
    };
    Listview.prototype.selectCategory = function (category) {
    };
    Listview.prototype.getQuickSearchFromDropdown = function (searchName) {
        return protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]"));
    };
    /**
     *
     * @param searchName Quick search name
     * @param alert Set to true if you want to interact with Alert message (unsaved message)
     */
    Listview.prototype.selectQuickSearchFromDropdown = function (searchName, alert) {
        if (alert === void 0) { alert = false; }
        protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]"))
            .first().click();
        if (!alert) {
            helper.waitForDisappear(this.spinnerImg);
        }
    };
    Listview.prototype.removeQuickSearchFromDropdown = function (searchName) {
        protractor_1.element.all(protractor_1.by
            .xpath("//a[@ng-click=\"listVM.setQuickSearch(item)\"]/span[contains(text(),'" + searchName + "')]/following-sibling::span/i"))
            .first().click();
        protractor_1.browser.switchTo().alert().accept();
        protractor_1.browser.sleep(2000);
    };
    Listview.prototype.getQuickSearchDetails = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isMakePublic, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        helper.waitForVisible(this.categoryTxt);
                        return [4 /*yield*/, this.makePublicChkBox.getAttribute('class')
                                .then(function (attr) { return attr.includes('ng-not-empty'); })];
                    case 1:
                        isMakePublic = _b.sent();
                        _a = {};
                        return [4 /*yield*/, this.titleTxt.getAttribute('value')];
                    case 2:
                        _a.searchName = _b.sent(),
                            _a.makePublic = isMakePublic;
                        return [4 /*yield*/, this.assetOptionDropdown.get(isMakePublic ? 1 : 0).$("[selected=\"selected\"]").getText()];
                    case 3:
                        // applyToSelectedAsset: await this.applyToSelectedAssetChkBox.getAttribute('class')
                        //   .then(attr => attr.includes('ng-not-empty')),
                        _a.assetOption = _b.sent();
                        return [4 /*yield*/, this.getSelectedCategories().categories.getText()];
                    case 4:
                        _a.categories = _b.sent();
                        return [4 /*yield*/, this.getSelectedCategories().categoryTags.getText()];
                    case 5: return [2 /*return*/, (_a.categoryTag = _b.sent(),
                            _a)];
                }
            });
        });
    };
    /**
     * returns categories and tags displayed
     */
    Listview.prototype.getSelectedCategories = function () {
        return {
            categories: protractor_1.element.all(protractor_1.by
                .xpath("//div[@ng-repeat=\"c in aConCatVM.ExpandedCategories\"]/" +
                "label/input[contains(@class,\"ng-not-empty\")]/ancestor::label")),
            categoryTags: protractor_1.$$("[ng-repeat=\"s in selectedCategories\"] > span")
        };
    };
    Listview.prototype.getQuickSearchFromList = function (searchName) {
    };
    Listview.prototype.getColumnItemsByColName = function (columnName, schedule, batchEdit) {
        if (schedule === void 0) { schedule = false; }
        if (batchEdit === void 0) { batchEdit = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var col, rowList;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnID(columnName, schedule, batchEdit)];
                    case 1:
                        col = _a.sent();
                        rowList = batchEdit ? this.getRowListBatchEdit(schedule) : this.rowList;
                        return [2 /*return*/, rowList.map(function (elem, index) {
                                return elem.$$("[role=\"gridcell\"]").get(col.indexOf(columnName)).getText();
                                // return elem.$$(`[role="gridcell"] > .ui-grid-cell-contents`).get(col.indexOf(columnName)).getText();
                            })];
                }
            });
        });
    };
    Listview.prototype.getColumnID = function (colName, schedule, batchEdit) {
        if (schedule === void 0) { schedule = false; }
        if (batchEdit === void 0) { batchEdit = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var columnHeaderContainer, headerType, returnVal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        columnHeaderContainer = schedule ? "[role=\"columnheader\"]" : "span.ui-grid-header-cell-label";
                        headerType = batchEdit ? this.getListHeaderBatchEdit(schedule) : this.listHeader;
                        return [4 /*yield*/, headerType.$$(columnHeaderContainer).map(function (p) {
                                return p.getText();
                            })];
                    case 1:
                        returnVal = _a.sent();
                        if (schedule && !batchEdit) {
                            return [2 /*return*/, this.formatScheduleColumnHeaders(returnVal)];
                        }
                        else if (batchEdit) {
                            returnVal = returnVal.map(function (val) { return val.replace(/\n/g, ' ').trim(); });
                            return [2 /*return*/, returnVal];
                        }
                        else {
                            return [2 /*return*/, returnVal];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used to get value of attribute/schedule by Column Name and Asset name
     * @param assetName asset name of the line item in list view
     * @param columnName Scheduled column name
     * @param schedule boolean, set to `true` if list view is Scheduled
     */
    Listview.prototype.getAttributeByColumnAndAsset = function (assetName, columnName, schedule) {
        if (schedule === void 0) { schedule = false; }
        var col = this.getColumnID(columnName, schedule);
        columnName = schedule ? columnName.toUpperCase() : columnName;
        return this.getAttributeLineItemByAsset(assetName).get(col.then(function (column) {
            return column.indexOf(columnName);
        }));
    };
    Listview.prototype.getColumnHeadersByApp = function (app) {
        return this.listHeader.$$("span.ui-grid-header-cell-label").map(function (p) {
            return p.getText();
        }).then(function (headers) {
            switch (app) {
                case testDetails_data_1.appName.programNavigator:
                    headers.splice(0, 3);
                    return headers;
                case testDetails_data_1.appName.riskAssessment:
                    headers.splice(0, 1);
                    return headers;
                default:
                    return headers;
            }
        });
    };
    Listview.prototype.getColumnHeadersScheduled = function (app, batchEdit) {
        if (batchEdit === void 0) { batchEdit = false; }
        var listHeader = batchEdit ? this.listHeaderBatchEdit : this.listHeader;
        return listHeader.$$("[role=\"columnheader\"]").map(function (p) {
            return p.getText();
        }).then(function (headers) {
            // headers = batchEdit ? (headers as string[]).map(val => val.replace(/\n/g, ' ').trim()) : headers.splice(0, 3);
            return headers;
        });
    };
    /**
     *
     * @param columnName name of the column to be filtered
     * @param filterValue value of the filter
     * @param schedule default to False. Set this to true if list view tested is Schedule
     */
    Listview.prototype.setColumnFilterByName = function (columnName, filterValue, schedule) {
        if (schedule === void 0) { schedule = false; }
        this.getInLineFilterByColumn(columnName, schedule).then(function (elem) {
            helper.clearAndSendKeys(elem, filterValue);
            elem.sendKeys(ptor_1.protractor.Key.ENTER);
        });
        this.waitForSpinner();
        protractor_1.browser.sleep(1000);
    };
    Listview.prototype.getInLineFilterByColumn = function (columnName, schedule) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var col;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnID(columnName, schedule)];
                    case 1:
                        col = _a.sent();
                        return [2 /*return*/, this.listHeader.get(col.indexOf(columnName)).$("#ui-grid-filter-input-")];
                }
            });
        });
    };
    Listview.prototype.clearInLineFilter = function (columnName, schedule) {
        if (schedule === void 0) { schedule = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var col;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnID(columnName, schedule)];
                    case 1:
                        col = _a.sent();
                        this.listHeader.get(col.indexOf(columnName)).$(".ui-grid-icon-cancel").click();
                        this.waitForSpinner();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * returns string[] of selected columns
     */
    Listview.prototype.getSelectedColummns = function () {
        protractor_1.browser.sleep(2000);
        helper.waitForVisible(protractor_1.$(".modal-dialog "));
        return this.selectedColumns.$$('option').getText();
    };
    /**
     * returns string[] of available columns
     */
    Listview.prototype.getAvailableColumns = function () {
        helper.waitForVisible(protractor_1.$(".modal-dialog "));
        return this.availableColumns.$$("option").getText();
    };
    Listview.prototype.setSelectedColumns = function (colName) {
        this.selectColumnToAdd(colName);
    };
    /**
     * Used to add a column in the availability column in column options dialog box
     * @param colName array of column name to add
     */
    Listview.prototype.selectColumnToAdd = function (colName) {
        var _this = this;
        colName.forEach(function (column) {
            helper.waitAndClick(protractor_1.element(protractor_1.by
                .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.visibleOptions\"]/option[@label=\"" + column + "\"]")));
            protractor_1.browser.sleep(800);
            _this.addSelectedColumnBtn.click();
        });
    };
    Listview.prototype.removeColumns = function (colName) {
        var _this = this;
        protractor_1.browser.sleep(1000);
        colName.forEach(function (column) {
            protractor_1.element.all(protractor_1.by
                .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.selected\"]/option[@label=\"" + column + "\"]"))
                .click();
            _this.removeSelectedColumnBtn.click();
        });
    };
    Listview.prototype.moveSelectedColumn = function (column) {
        // { columnName: string, direction: string, count: number }
        var moveBtn = column.direction === 'up' ? this.moveUpBtn : this.moveDownBtn;
        protractor_1.element.all(protractor_1.by
            .xpath("//select[@ng-options=\"column as column.DisplayName for column in popupVM.selected\"]/option[@label=\"" + column.columnName + "\"]"))
            .click();
        for (var idx = 0; idx < column.count; idx++) {
            moveBtn.click();
            protractor_1.browser.sleep(1000);
        }
    };
    /**
     * returns the row element in this. Use this to access other elements in the row/lineitem
     * @param assetName - get row line item by assetName
     */
    Listview.prototype.getInLineRowItem = function (assetName) {
        var rowNum = this.getColumnItemsByColName('Asset');
        return this.rowList.get(rowNum.then(function (rows) {
            return rows.indexOf(assetName);
        }));
    };
    // .ui-grid-row:nth-child(3) .ui-grid-cell-contents
    Listview.prototype.getAttributeLineItemByAsset = function (assetName) {
        return this.getInLineRowItem(assetName).$$(".ui-grid-cell-contents");
    };
    Listview.prototype.getRowTags = function (assetName) {
        return this.getInLineRowItem(assetName).$$("[ng-repeat=\"keyword in row.entity.tags\"] > span")
            .getAttribute('textContent');
    };
    Listview.prototype.getRowBoolean = function (assetName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getInLineRowItem(assetName).$$("input[type=\"checkbox\"]")
                        .get(0).getAttribute('title')];
            });
        });
    };
    Listview.prototype.clickInLineItemEditBtn = function (rowItem) {
        // rowItem.$(`[title="Edit"]`).click();
        helper.clickAndSleep(rowItem.$("[title=\"Edit\"]"), 2000);
    };
    Listview.prototype.editInLineAttribute = function (lineItemData) {
        var lineItemRowElem = this.getInLineRowItem(lineItemData.assetName);
        this.clickInLineItemEditBtn(lineItemRowElem);
        this.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
        this.saveInLineItemBtn(lineItemRowElem);
        // browser.refresh();
        protractor_1.browser.sleep(3000);
        // HOY!!! tan-awa dili ma view ang tag after nimo ma save
    };
    Listview.prototype.editInLineAttributeSchedule = function (lineItemData) {
        var lineItemRowElem = this.getInLineRowItem(lineItemData.assetName);
        this.clickInLineItemEditBtn(lineItemRowElem);
        this.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
        if (_.find(lineItemData.attributes, ["dataType", this.dataTypes.scheduleDate])
            && _.find(lineItemData.attributes, ["value", null])) {
            helper.waitForAlert();
            helper.getAlert().accept();
            this.waitForSpinner();
        }
        this.saveInLineItemBtn(lineItemRowElem);
        // browser.refresh();
        protractor_1.browser.sleep(2000);
    };
    Listview.prototype.setInLineAttribute = function (rowElem, attributes) {
        var _this = this;
        protractor_1.browser.sleep(800);
        attributes.forEach(function (attr) {
            if (attr.dataType === _this.dataTypes.tag) {
                _this.addTags(rowElem, attr.value);
            }
            else {
                var dataTypes = _this.dataTypes;
                switch (attr.dataType) {
                    case dataTypes.boolean:
                        _this.setInLineBoolean(rowElem, attr);
                        break;
                    case dataTypes.float:
                    case dataTypes.int:
                        protractor_1.browser.sleep(1000);
                        _this.setInLineIntegerFloat(rowElem, attr);
                        break;
                    case dataTypes.string:
                        _this.setInLineString(rowElem, attr);
                        break;
                    case dataTypes.list:
                        _this.getInLineAttribute(rowElem, attr.name)
                            .element(protractor_1.by.cssContainingText('option', attr.value)).click();
                        break;
                    case dataTypes.date:
                        _this.setInLineDateAttribute(rowElem, attr);
                        break;
                    case dataTypes.scheduleDate:
                        _this.setInLineSchedule(rowElem, attr);
                        break;
                    default:
                        break;
                }
            }
        });
    };
    Listview.prototype.setInLineBoolean = function (rowElem, attr) {
        var _this = this;
        this.getInLineAttribute(rowElem, attr.name)
            .$("input[type=\"checkbox\"]").getAttribute("class").then(function (attribute) {
            if ((attribute.includes("ng-not-empty") && !attr.value)
                || (attribute.includes("ng-empty") && attr.value)) {
                _this.getInLineAttribute(rowElem, attr.name)
                    .$("input[type=\"checkbox\"]").click();
            }
        });
    };
    Listview.prototype.setInLineIntegerFloat = function (rowElem, attr) {
        helper.clearAndSendKeys(this.getInLineAttribute(rowElem, attr.name)
            .$("input[type=\"number\"]"), attr.value);
    };
    Listview.prototype.setInLineString = function (rowElem, attr) {
        helper.clearAndSendKeys(this.getInLineAttribute(rowElem, attr.name)
            .$("input[type=\"text\"]"), attr.value);
    };
    Listview.prototype.setInLineDateAttribute = function (rowElem, attr) {
        var date = attr.value;
        var d = helper.formatDateTimeAddZero(date.getMonth())
            + '' + helper.formatDateTimeAddZero(date.getDate(), false)
            + '' + (date.getFullYear());
        var t = helper.formatDateTimeAddZero(date.getHours(), false)
            + '' + helper.formatDateTimeAddZero(date.getMinutes(), false);
        // tslint:disable-next-line:radix
        var timeWithAMPM = parseInt(t.substring(0, 2)) >= 12 ? t + 'PM' : t + 'AM';
        this.setInLineDateFn(rowElem, attr, d, timeWithAMPM);
    };
    /**
     * used to input in line for Schedule data
     */
    Listview.prototype.setInLineSchedule = function (rowElem, attr) {
        if (attr.value === null) {
            this.getInLineAttribute(rowElem, attr.name, attr.name.includes("PLAN") || attr.name.includes('ACTUAL'))
                .$("[type=\"date\"]").clear();
        }
        else {
            this.getInLineAttribute(rowElem, attr.name, attr.name.includes("PLAN") || attr.name.includes('ACTUAL'))
                .$("[type=\"date\"]").sendKeys(attr.value);
        }
    };
    /**
     * use this to directly input to Date.
     * @param rowElem ElementFinder
     * @param attr attribute obj
     * @param date as string MMDDYYY
     * @param time as string HHMMAM or HHMMPM
     */
    Listview.prototype.setInLineDateFn = function (rowElem, attr, date, time) {
        this.getInLineAttribute(rowElem, attr.name).$("[type=\"datetime-local\"]")
            .sendKeys(date, ptor_1.protractor.Key.TAB, time);
    };
    Listview.prototype.saveInLineItemBtn = function (rowItem) {
        helper.clickAndSleep(rowItem.$("[title=\"Save\"]"));
        this.waitForSpinner();
    };
    Listview.prototype.addTags = function (rowItem, rowTags) {
        protractor_1.browser.sleep(5000);
        rowTags.forEach(function (tag) {
            helper.waitForVisible(rowItem.$("#addTag"));
            rowItem.$("#addTag").sendKeys(tag);
            rowItem.$(".taggingInputSection .btn.btn-default").click(); // Add Tag button
            protractor_1.browser.sleep(1000);
        });
    };
    /**
       * returns attribute element while on in-line edit mode
     */
    Listview.prototype.getInLineAttribute = function (rowElem, attributeName, schedule, batchEdit) {
        if (schedule === void 0) { schedule = false; }
        if (batchEdit === void 0) { batchEdit = false; }
        protractor_1.browser.sleep(1000);
        var col = this.getColumnID(attributeName, schedule, batchEdit);
        return rowElem.$$("[role=\"gridcell\"]").get(col.then(function (columns) {
            return columns.indexOf(attributeName);
        }));
    };
    Listview.prototype.applyAdvancedFilterSettings = function (advancedSettings) {
    };
    Listview.prototype.waitForSpinner = function () {
        helper.waitForVisible(this.spinnerImg);
        helper.waitForDisappear(this.spinnerImg);
        protractor_1.browser.sleep(1000);
    };
    Listview.prototype.getToastMessage = function () {
        helper.waitForVisible(this.toastMessage);
        return this.toastMessage.getText();
    };
    Listview.prototype.selectColumnType = function (columnType) {
        this.columnTypeDropDown.$("[label=\"" + columnType + "\"]").click();
    };
    /**
     * sets the radio button for column option view
     * @param option asset || events
     */
    Listview.prototype.setShowAssetEventsViewOption = function (option) {
        helper.waitForElementClickable(this.showAssetEventsViewOption.get(0));
        option === interface_1.AssetEventsViewEnum.asset ? this.showAssetEventsViewOption.get(0).click()
            : this.showAssetEventsViewOption.get(1).click();
    };
    /**
     *
     * @param eventType EventTypesEnum enum type. Fault, Inspection, Outage
     * @param check Defines if checkbox needs to be checked or not
     * @example
     * this.setEventType(EventTypesEnum.Fault, true)
     */
    Listview.prototype.setEventType = function (eventType, check) {
        var event = this.getEventType(eventType);
        event.isSelected().then(function (checkbox) {
            if ((!checkbox && check) || (checkbox && !check)) {
                event.click();
            }
        });
    };
    /**
     * Sets the Event Types in Column Options dialog if needs to be checked or not.
     * @param eventsObjArr Array of { event: EventTypesEnum, checkbox: boolean }
     * @example
     * const eventsObjArr = [{event: EventTypesEnum.Fault, checkbox: true}]
     * this.setEventTypes(eventObjArr)
     */
    Listview.prototype.setEventTypes = function (eventsObjArr) {
        var _this = this;
        helper.waitForVisible(this.availableEventTypes);
        protractor_1.browser.sleep(1000);
        eventsObjArr.forEach(function (eventObj) {
            var event = _this.getEventType(eventObj.event);
            helper.waitForVisible(event);
            event.isSelected().then(function (checkbox) {
                if ((checkbox && !eventObj.checkbox) || (!checkbox && eventObj.checkbox)) {
                    helper.clickAndSleep(event, 500);
                }
            });
        });
    };
    Listview.prototype.getEventType = function (eventType) {
        return protractor_1.element(protractor_1.by.xpath("//div[@class=\"eventTypes\"]//label[contains(.,\"" + interface_1.EventTypesEnum[eventType] + "\")]/input"));
    };
    /**
     * Used to convert ex: `Not Started Plan (512)` to `NOT STARTED PLAN`
     * @param columnHeaders column headers[] array from this.getColumnHeadersScheduled()
     */
    Listview.prototype.formatScheduleColumnHeaders = function (columnHeaders) {
        return columnHeaders.map(function (header) { return header.replace(/\n/g, ' ').replace(/\(.*/g, '').trim().toUpperCase(); });
    };
    /**
     * Used to get the number of items in the column ex: `Not Started Plan (512)` to `512`
     * @param columnName schedule column name ex: Not Started Plan (512)
     * @example
     * const columnName = `NOT STARTED PLAN`
     * this.getScheduleColumnItemCount(columnName)
     */
    Listview.prototype.getScheduleColumnItemCount = function (columnName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var colHeaders;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnHeadersScheduled().then(function (columnHeaders) {
                            return columnHeaders.filter(function (headers) {
                                return headers.replace(/\n/g, ' ').toUpperCase().includes(columnName.toUpperCase());
                            })[0].replace(/\n/g, ' ').trim().split(' ');
                        })];
                    case 1:
                        colHeaders = _a.sent();
                        return [2 /*return*/, colHeaders[colHeaders.length - 1].slice(1, -1)];
                }
            });
        });
    };
    // batchEditAttributeSchedule(lineItemData: Array<{
    //   assetName: string, attributes: Array<{ name: string, value: any, dataType: string }>
    // }>) {
    //   lineItemData.forEach(lineItem => {
    //     const lineItemRowElems: ElementFinder = this.getInLineRowItem(lineItem.assetName);
    //     this.selectLineItemChkBox(lineItemRowElems);
    //   });
    // };
    Listview.prototype.selectLineItemChkBox = function (assetNames) {
        var _this = this;
        assetNames.forEach(function (assetName) {
            var lineItemRowElem = _this.getInLineRowItem(assetName);
            helper.clickAndSleep(lineItemRowElem.$("[title=\"Select\"]"), 1000);
        });
        protractor_1.browser.sleep(1000);
    };
    Listview.prototype.batchEdit = function (lineItemDataBatch) {
        protractor_1.browser.sleep(2000);
        this.selectLineItemChkBox(lineItemDataBatch.assetNames);
        helper.clickAndWaitForVisible(this.editSelectedBtn, this.batchEditWindow);
        helper.waitForVisibleAndDisappear(this.progressBar);
        protractor_1.browser.sleep(3000);
        this.batchEditNonSchedule(lineItemDataBatch);
        this.batchEditSchedule(lineItemDataBatch);
        this.batchEditSaveBtn.click();
        helper.waitForVisibleAndDisappear(this.progressBar);
    };
    Listview.prototype.batchEditNonSchedule = function (lineItemDataBatch) {
        if (lineItemDataBatch.nonSchedule.length > 0) {
            this.addAttributeBatchEdit(lineItemDataBatch.nonSchedule);
        }
    };
    Listview.prototype.batchEditSchedule = function (lineItemDataBatch) {
        var _this = this;
        if (lineItemDataBatch.schedule.length > 0) {
            helper.waitAndClick(this.batchEditScheduleTab, 5000);
            lineItemDataBatch.schedule.forEach(function (milestone) {
                // const gridCell: ElementFinder = this.getMilestoneBatchEditElem(milestone.milestoneType, milestone.milestoneStatus);
                // gridCell.sendKeys(milestone.milestoneValue);
                _this.setBatchEditScheduleDate(milestone.milestoneType, milestone.milestoneStatus, milestone.milestoneValue);
            });
        }
    };
    Listview.prototype.setBatchEditScheduleDate = function (type, milestoneStatus, value) {
        var scheduleElem = this.getMilestoneBatchEditElem(type, milestoneStatus);
        scheduleElem.click();
        var batchEditGridDateInputbox = this.batchEditGrid.$("[type=\"date\"]");
        helper.waitForVisible(batchEditGridDateInputbox);
        batchEditGridDateInputbox.sendKeys(value);
        // this.getMilestoneBatchEditElem(type, milestoneStatus).element(by.xpath('/parent::*//input[@type="date"]')).sendKeys(value);
    };
    /**
     * gets the element by type (Plan or Actual) and Milestone
     * @param type {string} MilestoneType enum
     * @param milesStone {string} MilestoneStatus enum
     */
    Listview.prototype.getMilestoneBatchEditElem = function (type, milesStone) {
        var col = this.getColumnID('columnName', true, true);
        return this.getLineItemBatchEditByType(type).get(col.then(function (column) {
            return column.indexOf(interface_1.MilestoneStatus[milesStone]);
        }));
    };
    Listview.prototype.getLineItemBatchEditByType = function (type) {
        return this.getInLineRowItemBatchEdit(type).$$(".ui-grid-cell-contents");
    };
    Listview.prototype.getInLineRowItemBatchEdit = function (type) {
        var rowNum = this.getColumnItemsByColName('Type', true, true);
        return this.rowListBatchEdit.get(rowNum.then(function (rows) {
            return rows.indexOf(interface_1.MilestoneType[type]);
        }));
    };
    /**
     * this returns all the values of all milestone
     * @param assetName
     */
    // : Array<{ columnName: string, value: string }>
    Listview.prototype.getScheduleDatesByAssetName = function (assetName) {
        var _this = this;
        var scheduleColumnsArray2 = [
            'Asset',
            'Not Started Plan', 'Not Started Actual',
            'Mitigation Plan Plan', 'Mitigation Plan Actual',
            'Engineering Plan', 'Engineering Actual',
            'Procurement Plan', 'Procurement Actual',
            'Permitting Plan', 'Permitting Actual',
            'Construction Plan', 'Construction Actual',
            'Close-out Plan', 'Close-out Actual',
            'Mitigation Complete Plan', 'Mitigation Complete Actual'
        ];
        var tempReturnArr = [];
        var tempValue;
        var scheduleColumns = scheduleColumnsArray2;
        scheduleColumns.shift();
        scheduleColumns.forEach(function (column) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAttributeByColumnAndAsset(assetName, column, true).getText()];
                    case 1:
                        tempValue = _a.sent();
                        tempReturnArr.push({
                            columnName: column,
                            value: tempValue
                        });
                        console.log("columnName: ", column);
                        console.log("value::: ", tempValue);
                        if (column === 'Permitting Actual') {
                            // util.scrollToView(this.listHeader.get(this.listHeader.count() - 1));
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return tempReturnArr;
    };
    Listview.prototype.getScheduleDataFromList = function (assetNames, defaultColumns) {
        if (defaultColumns === void 0) { defaultColumns = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var milestoneData, headers, _a, _i, assetNames_1, assetName, values, tempDataObj, _loop_1, _b, milestoneData_1, data;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        milestoneData = [];
                        if (!!defaultColumns) return [3 /*break*/, 2];
                        _a = this.formatScheduleColumnHeaders;
                        return [4 /*yield*/, this.getColumnHeadersScheduled(testDetails_data_1.appName.programNavigator)];
                    case 1:
                        headers = _a.apply(this, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        headers = this.scheduleColumnsArray;
                        _c.label = 3;
                    case 3:
                        _i = 0, assetNames_1 = assetNames;
                        _c.label = 4;
                    case 4:
                        if (!(_i < assetNames_1.length)) return [3 /*break*/, 7];
                        assetName = assetNames_1[_i];
                        return [4 /*yield*/, this.getAttributeLineItemByAsset(assetName).getText()];
                    case 5:
                        values = (_c.sent());
                        if (defaultColumns) {
                            values.splice(0, 3);
                        }
                        milestoneData.push({ assetName: assetName, headers: headers, values: values });
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        tempDataObj = [];
                        _loop_1 = function (data) {
                            var eachAsset = {
                                assetName: data.assetName, milestone: []
                            };
                            data.headers.forEach(function (header) {
                                if (header !== 'Asset') {
                                    var milestoneType = header.substr(header.lastIndexOf(' '), header.length).trim();
                                    var schedObj = {
                                        column: header.substr(0, header.lastIndexOf(' ')),
                                        type: interface_1.MilestoneType[interface_1.MilestoneType[milestoneType]],
                                        value: data.values[headers.indexOf(header)],
                                    };
                                    eachAsset.milestone.push(schedObj);
                                }
                            });
                            tempDataObj.push(eachAsset);
                        };
                        for (_b = 0, milestoneData_1 = milestoneData; _b < milestoneData_1.length; _b++) {
                            data = milestoneData_1[_b];
                            _loop_1(data);
                        }
                        return [2 /*return*/, tempDataObj];
                }
            });
        });
    };
    Listview.prototype.getBatchEditScheduleValues2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tempValues;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rowListBatchEdit.getText()];
                    case 1:
                        tempValues = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Listview.prototype.getBatchEditScheduleValues = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var milestoneBatchValues, scheduleColumnsArray, _i, scheduleColumnsArray_1, schedule, milestoneType, milestoneStatus, schedObj, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        milestoneBatchValues = [];
                        scheduleColumnsArray = this.scheduleColumnsArray;
                        _i = 0, scheduleColumnsArray_1 = scheduleColumnsArray;
                        _b.label = 1;
                    case 1:
                        if (!(_i < scheduleColumnsArray_1.length)) return [3 /*break*/, 4];
                        schedule = scheduleColumnsArray_1[_i];
                        if (!(schedule !== 'Asset')) return [3 /*break*/, 3];
                        milestoneType = interface_1.MilestoneType[schedule.substr(schedule.lastIndexOf(' '), schedule.length).trim()];
                        milestoneStatus = interface_1.MilestoneStatus[schedule.substr(0, schedule.lastIndexOf(' '))];
                        _a = {
                            column: schedule.substr(0, schedule.lastIndexOf(' ')),
                            type: interface_1.MilestoneType[milestoneType]
                        };
                        return [4 /*yield*/, this.getMilestoneBatchEditElem(milestoneType, milestoneStatus).getText()];
                    case 2:
                        schedObj = (_a.value = _b.sent(),
                            _a);
                        milestoneBatchValues.push(schedObj);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, milestoneBatchValues];
                }
            });
        });
    };
    Listview.prototype.addAttributeBatchEdit = function (attrObjArr) {
        var _this = this;
        attrObjArr.forEach(function (attr) {
            _this.batchEditAddAttributeTxt.sendKeys(attr.attributeName);
            protractor_1.browser.sleep(1000);
            _this.batchEditAddAttributeBtn.click();
            helper.waitForVisible(_this.modalWindow);
            _this.setAttributeValue(attr);
            _this.setAttributeValueOkBtn.click();
            // this.batchEditSaveBtn.click(); add another function with Save Changes button clicked
        });
        protractor_1.browser.sleep(1000);
    };
    Listview.prototype.setAttributeValue = function (attrObj) {
        protractor_1.browser.sleep(1000);
        helper.waitAndClick(this.batchEditSetDetailsBtn); // expand Set Details panel
        helper.waitAndClick(this.attributeValueTypesDropdown.$("[label=\"" + interface_1.AttributeTypesEnum[attrObj.type] + "\"]"), 5000);
        switch (attrObj.type) {
            case interface_1.AttributeTypesEnum['Freeform Text']:
                this.attributeValueFreeformText.sendKeys(attrObj.value);
                break;
            case interface_1.AttributeTypesEnum.Float:
                helper.waitForVisible(this.attributeDecimalFloat);
                helper.clearAndSendKeys(this.attributeDecimalFloat, attrObj.attributeOption);
                this.attributeValueFloat.sendKeys(attrObj.value);
                break;
            case interface_1.AttributeTypesEnum.Integer:
                this.attributeValueInteger.sendKeys(attrObj.value);
                break;
            case interface_1.AttributeTypesEnum['Discrete List']:
                helper.waitForVisible(this.attributeOptionsList);
                this.attributeOptionsList.sendKeys(attrObj.attributeOption);
                this.attributeValueList.click(); // click dropdown first to populate dropdown list values
                this.attributeValueList.$("[label=" + attrObj.value + "]").click();
                break;
            case interface_1.AttributeTypesEnum.Boolean:
                helper.waitForVisible(this.attributeValueBoolean);
                protractor_1.browser.sleep(1000);
                helper.selectCheckBox(this.attributeValueBoolean, attrObj.value);
                break;
            case interface_1.AttributeTypesEnum.Date:
                this.setAttributeDateBatchEdit(attrObj);
                break;
            default:
                break;
        }
    };
    Listview.prototype.getBatchEditAssetInfoColumnHeaderLabels = function () {
        var columnLabelElemStr = ".ui-grid-header-cell-label";
        return this.batchEditAssetInfoColumnHeaders.$$(columnLabelElemStr).getText();
    };
    Listview.prototype.setAttributeDateBatchEdit = function (attrObj) {
        var _a = attrObj.value, dateValue = _a.dateValue, timeValue = _a.timeValue;
        helper.waitForVisible(this.attributeDateBtn);
        protractor_1.browser.sleep(1000);
        this.attributeDateBtn.click();
        helper.selectCalendarMonthYear(dateValue);
        this.attributeTimeTxt.sendKeys(timeValue);
    };
    Listview.prototype.getAttributeValueByAssetBatchEdit = function (attributeName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var attributeNameColumn, attributeValueColumn;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getColumnItemsByColName('Attribute', false, true)];
                    case 1:
                        attributeNameColumn = _a.sent();
                        return [4 /*yield*/, this.getColumnItemsByColName('Value', false, true)];
                    case 2:
                        attributeValueColumn = _a.sent();
                        return [2 /*return*/, attributeValueColumn[attributeNameColumn.indexOf(attributeName)]];
                }
            });
        });
    };
    return Listview;
}());
exports.Listview = Listview;
//# sourceMappingURL=listview.po.js.map