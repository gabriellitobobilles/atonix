import { browser, by, $$, $, element, ElementFinder, utils } from 'protractor';
import { Helper } from '../helpers/helper';
import { protractor } from 'protractor/built/ptor';
import { appName } from '../helpers/testDetails.data';
import { AssetEventsViewEnum, EventTypesEnum, MilestoneType, MilestoneStatus, LineItemBatchEditInterface, AttributeTypesEnum } from '../helpers/interface';
import { Attribute } from '@angular/compiler';
import * as _ from 'lodash';
import { Utils } from '../helpers/utils';

const util = new Utils();
const helper = new Helper();

export class Listview {

  modalWindow = $(`[uib-modal-window="modal-window"]`);
  spinnerImg = $(`[id="spinner"]`);
  tabElements = $$(`[ng-repeat="tab in vm.tabs"] > a`); // or $$(`[role="tab"]`)

  filterByCategoryBtn = $(`[title="Filter by Category"]`);
  quickSearchBtn = $(`[ng-click="listVM.search(listVM.selectedQuickSearch)"]`);
  quickSearchDropdownBtn = $(`#quicksearch button.dropdown-toggle.dropdown-toggle-split`);
  quickSearchList = $$(`#quicksearch >div.pull-right ul[role="menu"] a[role="menuitem"]`);
  // saveListBtn= $(`[ng-click="listVM.saveQuickSearch()"]`);
  saveListBtn = $(`[title="Save List"]`);
  // saveAsBtn= $(`[title="Save As"]`);
  saveAsBtn = $(`[ng-click="listVM.copyQuickSearch()"]`);
  filterBtn = $(`[ng-click="searchSettings.toggle()"]`);
  deleteList = $(`[role="menu"] [ng-click="listVM.deleteQuickSearch($event)"]`);
  moreOptions = $(`#quicksearch button.btn.btn-link.dropdown-toggle`);

  showColumnOptionsBtn = $(`[ng-click="listVM.showColumnOptions()"]`);
  newListBtn = $(`[role="menu"] [ng-click="listVM.newList()"]`);
  editListBtn = $(`[role="menu"] [ng-click="listVM.saveQuickSearch(true)"]`);
  exportBtn = $(`[ng-click="listVM.Export()"]`);
  badgeCtr = $(`.badge`); // displays number of items in the list

  /** Create New List */
  modalTitle = $(`.modal-title`);
  searchName = $(`[name="quickSearchTitle"]`);
  searchTerm = $(`[id="searchText"]`); // clear text first
  okNewListBtn = $(`[ng-click="newListVM.ok()"]`);
  cancelNewListBtn = $(`[ng-click="newListVM.cancel()"]`);
  scheduleChkBox = $(`[ng-model="newListVM.selected.ScheduleSearch"]`);
  mapSpinner = $(`#geoSpaSpinner`);
  mapDropdown = $(`[ng-model="sekoiaSelectedGeospa"]`);
  mapGeoSpa = {
    projectStatus: 'Project Status',
    programStatus: 'Program Status',
    SAIDI: 'SAIDI',
    SAIFI: 'SAIFI',
    CEMI: 'CEMI',
    voltageViolations: 'Voltage Violations',
    outageEvents: 'Outage Events',
    fieldAreaNetwork: 'Field Area Network'
  };
  assetTypeDropdown = $(`[ng-model="newListVM.selectedAssetClassTypesForSchedule"]`);

  /** Save Quick Search */
  titleTxt = $(`[ng-model="saveQuickSearchVm.name"]`);
  categoryTxt = $(`[ng-model="aConCatVM.Candidate"]`);
  categoryAddBtn = $(`[ng-click="aConCatVM.addCandidate()"]`);
  makePublicChkBox = $(`[ng-model="saveQuickSearchVm.isPublic"]`);
  applyToSelectedAssetChkBox = $(`[ng-model="saveQuickSearchVm.applyToSelectedAsset"]`);
  assetOptionDropdown = $$(`[ng-model="saveQuickSearchVm.assetOption"]`);
  assetOptions = {
    applyToSelectedAsset: `Apply to selected asset only`,
    applyToSelectedAssetAndAllDescendants: `Apply to selected asset and all its descendants`,
    applyToSelectedAssetAndDescendantsSpecficType: `Apply to selected asset and its decendants of specific type`
  };
  categoryTags = $$(`.modal-content .chosen-choices > .search-choice > span`);
  okSaveQuickSearchBtn = $(`[ng-click="saveQuickSearchVm.ok()"]`);
  cancelQuickSearchBtn = $(`[ng-click="saveQuickSearchVm.cancel()"]`);

  searchExpansionTxt = $(`[ng-model="quickSearch.SearchExpression"]`);
  clearBtn = $(`[ng-click="searchSettings.clearSearch()"]`);
  submitFilter = $(`#tagSearchPopup [type="submit"]`);

  toastMessage = $(`.toast-message`);
  progressBar = $(`.overlayContent .progress-bar`);
  /** List */
  listCanvas = $(`.listContainer [role="rowgroup"] > .ui-grid-canvas`);
  listContainer = $(`.listContainer`);
  listHeader = $$(`.listContainer [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);
  listHeaderBatchEdit = $$(`[ui-grid="batchVM.scheduleEdit"] [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);
  // listHeaderBatchEdit = $$(`#BatchEdit [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);
  getListHeaderBatchEdit(schedule: boolean) {
    return schedule ? $$(`[ui-grid="batchVM.scheduleEdit"] [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`)
      : $$(`[ui-grid="batchVM.attributeEdit"]  [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);
  }
  rowList = $$(`.listContainer .ui-grid-row`);
  rowListBatchEdit = $$(`[ui-grid="batchVM.scheduleEdit"] .ui-grid-row`);
  getRowListBatchEdit(schedule: boolean) {
    return schedule ? $$(`[ui-grid="batchVM.scheduleEdit"] .ui-grid-row`)
      : $$(`[ui-grid="batchVM.attributeEdit"] .ui-grid-row`);
  }
  // rowListBatchEdit = $$(`#BatchEdit .ui-grid-row`);
  batchEditGrid = $(`[ui-grid="batchVM.scheduleEdit"]`);
  dataTypes = {
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
  availableColumns = $$(`[ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]`);
  selectedColumns = $$(`[ng-options="column as column.DisplayName for column in popupVM.selected"]`);
  addSelectedColumnBtn = $(`[title="Add"]`);
  removeSelectedColumnBtn = $(`[title="Remove"]`);
  addAllColumnsBtn = $(`[title="Add All"]`);
  removeAllColumnsBtn = $(`[title="Remove All"]`);
  cancelBtnColumnDialog = $(`[ng-click="popupVM.cancel()"]`);
  okBtnColumnDialog = $(`[ng-click="popupVM.close()"]`);
  moveUpBtn = $(`[title="Move Up"]`);
  moveDownBtn = $(`[title="Move Up"]`);
  columnTypeDropDown = $(`[ng-model="popupVM.selColumnType"]`);
  columnTypes = {
    asset: 'Asset', schedule: 'Schedule', timeSeries: 'Time-Series', events: 'Events'
  };
  showAssetEventsViewOption = $$(`[type="radio"]`);
  availableEventTypes = $(`[ng-show="popupVM.selColumnType == 'Events'"]`); // event types container

  /** Scheduled */
  scheduleColumnsArray = [
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
  scheduleColumnObj = {
    notStarted: 'Not Started', mitigationPlan: 'Mitigation Plan', engineering: 'Engineering',
    procurement: 'Procurement', permitting: 'Permitting', construction: 'Construction',
    closeOut: 'Close-out', mitigationComplete: 'Mitigation Complete'
  };

  /** Batch Edit */
  selectedAllNoneBtn = $(`[ng-click="listVM.selectAllChanged()"]`);
  editSelectedBtn = $(`[ng-click="listVM.editSelected()"]`);
  batchEditWindow = $(`#BatchEdit`);
  batchEditCounter = $(`#BatchEdit > div > label`);
  batchEditAssetInfoTab = $(`[ng-click="batchVM.setTab('attribute')"]`);
  batchEditScheduleTab = $(`[ng-click="batchVM.setTab('schedule')"]`);
  batchEditSaveBtn = $(`[ng-click="batchVM.saveEditSelected()"]`);

  batchEditAddAttributeTxt = $(`#newAttributeNameField`);
  batchEditAddAttributeDropdown = $(`#newAttribute .dropdown-toggle`);
  batchEditAddAttributeBtn = $(`[ng-click="batchVM.addAttribute(batchVM.newAttributeType)"]`);
  batchEditAttributeMenu = $(`#newAttribute [role="menuitem"]`);
  batchEditAddTagTxt = $(`.taggingInputSection #addTag`);
  batchEditAddTagBtn = $(`.taggingInputSection button`);

  batchEditSetDetailsBtn = $(`[ng-click="attributeVM.detailsCollapsed = !attributeVM.detailsCollapsed"]`);
  attributeValueTypesDropdown = $(`#attributeType`); // put .getText() and should display all existing

  attributeValueFreeformText = $(`#attributeValueText`);
  attributeValueFloat = $(`#attributeValueFloat`);
  attributeDecimalFloat = $(`#attributeDecimal`);
  attributeValueInteger = $(`#attributeValueInt`);
  attributeValueList = $(`#attributeValueList`);
  attributeOptionsList = $(`#attributeOptions`);
  attributeValueBoolean = $(`#attributeValueBoolean`);
  attributeDateBtn = $(`[ng-click="dpController.openStart($event)"]`);
  attributeTimeTxt = $(`[ng-model="dpController.internalTime"]`);

  setAttributeValueOkBtn = $(`[ng-click="attributeVM.ok()"]`);
  setAttributeValueCancelBtn = $(`[ng-click="attributeVM.cancel()"]`);
  batchEditAssetInfoColumnHeaders = $$(`#BatchEdit #batchAttributeTable [role="columnheader"]`);


  /**
   *
   * @param quickSearchObj {name, searchTerm }
   */
  createQuickSearch(quickSearchObj: any) {
    helper.waitForVisible(this.moreOptions);
    helper.clickAndSleep(this.moreOptions);
    this.newListBtn.click();
    helper.waitForVisible(this.modalTitle);
    expect(this.modalTitle.getText())
      .toEqual(`Create New List`, `Modal Title does not match`);
    helper.clearAndSendKeys(this.searchName, quickSearchObj.searchName);
    helper.clearAndSendKeys(this.searchTerm, quickSearchObj.searchTerm);

    /* This is For Scheduled */
    if (quickSearchObj && quickSearchObj.schedule && quickSearchObj.schedule.scheduled) {
      this.scheduleChkBox.click();
      // helper.waitForVisible(this.mapSpinner); helper.waitForDisappear(this.mapSpinner);
      this.mapDropdown.$(`[label="${quickSearchObj.schedule.map}"]`).click();
      this.assetTypeDropdown.$(`[label="${quickSearchObj.schedule.assetType}"]`).click();
    }

    this.okNewListBtn.click();
    this.waitForSpinner();
    return this.quickSearchBtn.getText();
  }

  saveQuickSearchFn(quickSearchObj: any, modify = false) {
    if (modify) {
      this.moreOptions.click();
      this.editListBtn.click();
    } else {
      this.saveListBtn.click();
    }

    helper.waitForVisible(this.modalTitle);
    helper.waitForVisible(this.categoryTxt); browser.sleep(2000);
    expect(this.modalTitle.getText())
      .toEqual(`Save a quick search`, `Modal Title does not match`);
    helper.clearAndSendKeys(this.titleTxt, quickSearchObj.searchName);
    if (quickSearchObj && quickSearchObj.categories && quickSearchObj.categories.add) {
      this.addCategories(quickSearchObj.categories.add);
    }
    if (quickSearchObj && quickSearchObj.categories && quickSearchObj.categories.remove) {
      this.removeCategories(quickSearchObj.categories.remove);
    }
    // helper.selectCheckBox(this.applyToSelectedAssetChkBox,
    //   quickSearchObj.applyToSelectedAsset);
    helper.selectCheckBox(this.makePublicChkBox,
      quickSearchObj.makePublic);

    this.assetOptionDropdown.get(quickSearchObj.makePublic ? 1 : 0)
      .element(by.cssContainingText('option', quickSearchObj.assetOption)).click();

    const catTags = this.categoryTags.getText();
    this.okSaveQuickSearchBtn.click();
    this.waitForSpinner();
    browser.sleep(1000);
    return catTags;
  }

  /**
   * use this if you just want to click sa save button..
   * this has the waitForSpinner()
   */
  saveListFn(firstTimeSave = false) {
    this.saveListBtn.click();
    if (firstTimeSave) {
      helper.waitForVisible(this.modalTitle);
      this.okSaveQuickSearchBtn.click();
    }
    this.waitForSpinner();
  }
  updateQuickSearch(listFilterDetails: any) {
    // this.filterBtn.click();
    // helper.clearAndSendKeys(this.searchExpansionTxt, listFilterDetails.searchTerm);
    // // add advance filters here
    // this.submitFilter.click(); helper.waitForDisappear(this.spinnerImg);
    // // currently it will reload the list if the filter btn is clicked to close
    // this.filterBtn.click(); helper.waitForDisappear(this.spinnerImg);
    this.modifySearchFilter(listFilterDetails);
    this.saveQuickSearchFn(listFilterDetails, true);
    // this.okSaveQuickSearchBtn.click(); helper.waitForDisappear(this.spinnerImg);
  }

  modifySearchFilter(listFilterDetails: any) {
    this.filterBtn.click();
    helper.clearAndSendKeys(this.searchExpansionTxt, listFilterDetails.searchTerm);
    // add advance filters here
    this.submitFilter.click(); helper.waitForDisappear(this.spinnerImg); browser.sleep(1000);
    // currently it will reload the list if the filter btn is clicked to close
    this.filterBtn.click(); // helper.waitForDisappear(this.spinnerImg);
  }

  deleteQuickSearch(quickSearchName: any) {
    this.quickSearchDropdownBtn.click();
    this.removeQuickSearchFromDropdown(quickSearchName);
    this.quickSearchDropdownBtn.click();
  }

  deleteQuickSearchMoreOption() {
    this.moreOptions.click();
    browser.sleep(1000);
    this.deleteList.click();
    browser.switchTo().alert().accept();
    helper.waitForVisible(this.toastMessage);
    const toastMessage = this.getToastMessage();
    this.moreOptions.click(); // click more options to close
    this.waitForSpinner();
    return toastMessage;
  }

  saveAsQuickSearch(quickSearchObj?: any) {
    // helper.waitForElementClickable(this.saveAsBtn, 3000);
    browser.sleep(1000);
    this.moreOptions.click();
    browser.sleep(2000);
    this.saveAsBtn.click();
    helper.waitForVisible(this.categoryTxt);
    const saveAsDetails = this.getQuickSearchDetails();
    if (quickSearchObj !== undefined) {
      this.saveQuickSearchFn(saveAsDetails);
    } else {
      helper.clickAndSleep(this.okSaveQuickSearchBtn, 1000);
      this.waitForSpinner();
      return saveAsDetails;
    }
  }

  createQuickSearchComplete(quickSearchObj: any) {
    this.createQuickSearch(quickSearchObj);
    const saveRes = this.saveQuickSearchFn(quickSearchObj);
  }

  addCategories(categories: [string]) {
    categories.forEach(category => {
      this.categoryTxt.sendKeys(category);
      this.categoryAddBtn.click(); browser.sleep(800);
    });
  }

  removeCategories(categories: [string]) {
    categories.forEach(category => {
      element(by
        .xpath(`//div[@class="modal-content"]//ul[@class="chosen-choices"]/li` +
          `/span[contains(text(),"${category}")]/preceding-sibling::a`))
        .click();
    });
  }

  selectCategory(category: string) {

  }

  getQuickSearchFromDropdown(searchName: string) {
    return element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]`));
  }

  /**
   *
   * @param searchName Quick search name
   * @param alert Set to true if you want to interact with Alert message (unsaved message)
   */
  selectQuickSearchFromDropdown(searchName: string, alert = false) {
    element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]`))
      .first().click();
    if (!alert) { helper.waitForDisappear(this.spinnerImg); }
  }

  removeQuickSearchFromDropdown(searchName: string) {
    element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]/following-sibling::span/i`))
      .first().click();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
  }

  async getQuickSearchDetails() {
    helper.waitForVisible(this.categoryTxt);
    const isMakePublic = await this.makePublicChkBox.getAttribute('class')
      .then(attr => attr.includes('ng-not-empty'));
    return {
      searchName: await this.titleTxt.getAttribute('value'),
      makePublic: isMakePublic,
      // applyToSelectedAsset: await this.applyToSelectedAssetChkBox.getAttribute('class')
      //   .then(attr => attr.includes('ng-not-empty')),
      assetOption: await this.assetOptionDropdown.get(isMakePublic ? 1 : 0).$(`[selected="selected"]`).getText(),
      categories: await this.getSelectedCategories().categories.getText(),
      categoryTag: await this.getSelectedCategories().categoryTags.getText()
    };
  }

  /**
   * returns categories and tags displayed
   */
  getSelectedCategories() {
    return {
      categories: element.all(by
        .xpath(`//div[@ng-repeat="c in aConCatVM.ExpandedCategories"]/` +
          `label/input[contains(@class,"ng-not-empty")]/ancestor::label`)),
      categoryTags: $$(`[ng-repeat="s in selectedCategories"] > span`)
    };
  }

  getQuickSearchFromList(searchName: string) {

  }

  async getColumnItemsByColName(columnName: string, schedule = false, batchEdit = false) {
    const col = await this.getColumnID(columnName, schedule, batchEdit);
    // const rowList = batchEdit ? this.rowListBatchEdit : this.rowList;
    const rowList = batchEdit ? this.getRowListBatchEdit(schedule) : this.rowList;

    return rowList.map((elem, index) => {
      return elem.$$(`[role="gridcell"]`).get(col.indexOf(columnName)).getText();
      // return elem.$$(`[role="gridcell"] > .ui-grid-cell-contents`).get(col.indexOf(columnName)).getText();
    });
  }

  private async getColumnID(colName: string, schedule = false, batchEdit = false) { // return string of column header
    const columnHeaderContainer = schedule ? `[role="columnheader"]` : `span.ui-grid-header-cell-label`;
    // const headerType = batchEdit ? this.listHeaderBatchEdit : this.listHeader;
    const headerType = batchEdit ? this.getListHeaderBatchEdit(schedule) : this.listHeader;
    let returnVal = await headerType.$$(columnHeaderContainer).map(p => {
      return p.getText();
    });

    if (schedule && !batchEdit) {
      return this.formatScheduleColumnHeaders(returnVal as string[]);
    } else if (batchEdit) {
      returnVal = (returnVal as string[]).map(val => val.replace(/\n/g, ' ').trim());
      return returnVal;
    } else {
      return returnVal;
    }
    // return schedule ? this.formatScheduleColumnHeaders(returnVal as string[]) : returnVal;
  }

  /**
   * Used to get value of attribute/schedule by Column Name and Asset name
   * @param assetName asset name of the line item in list view
   * @param columnName Scheduled column name
   * @param schedule boolean, set to `true` if list view is Scheduled
   */
  getAttributeByColumnAndAsset(assetName: string, columnName: string, schedule = false) {
    const col = this.getColumnID(columnName, schedule);
    columnName = schedule ? columnName.toUpperCase() : columnName;
    return this.getAttributeLineItemByAsset(assetName).get(col.then(column => {
      return column.indexOf(columnName);
    }));
  }

  getColumnHeadersByApp(app?: appName) { // returns the headers as Array
    return this.listHeader.$$(`span.ui-grid-header-cell-label`).map((p) => {
      return p.getText();
    }).then((headers) => {
      switch (app) {
        case appName.programNavigator:
          headers.splice(0, 3);
          return headers;
        case appName.riskAssessment:
          headers.splice(0, 1);
          return headers;
        default:
          return headers;
      }
    });
  }
  getColumnHeadersScheduled(app?: appName, batchEdit = false) { // returns the headers as Array
    const listHeader = batchEdit ? this.listHeaderBatchEdit : this.listHeader;
    return listHeader.$$(`[role="columnheader"]`).map((p) => {
      return p.getText();
    }).then((headers) => {
      // headers = batchEdit ? (headers as string[]).map(val => val.replace(/\n/g, ' ').trim()) : headers.splice(0, 3);
      return headers;
    });
  }

  /**
   *
   * @param columnName name of the column to be filtered
   * @param filterValue value of the filter
   * @param schedule default to False. Set this to true if list view tested is Schedule
   */
  setColumnFilterByName(columnName: string, filterValue: string, schedule = false) {
    this.getInLineFilterByColumn(columnName, schedule).then(elem => {
      helper.clearAndSendKeys(elem, filterValue);
      elem.sendKeys(protractor.Key.ENTER);
    });
    this.waitForSpinner(); browser.sleep(1000);
  }

  async getInLineFilterByColumn(columnName: string, schedule) {
    const col = await this.getColumnID(columnName, schedule);
    return this.listHeader.get(col.indexOf(columnName)).$(`#ui-grid-filter-input-`);
  }

  async clearInLineFilter(columnName: string, schedule = false) {
    // ui-grid-icon-cancel
    const col = await this.getColumnID(columnName, schedule);
    this.listHeader.get(col.indexOf(columnName)).$(`.ui-grid-icon-cancel`).click();
    this.waitForSpinner();
  }
  /**
   * returns string[] of selected columns
   */
  getSelectedColummns() {
    browser.sleep(2000);
    helper.waitForVisible($(`.modal-dialog `));
    return this.selectedColumns.$$('option').getText();
  }
  /**
   * returns string[] of available columns
   */
  getAvailableColumns() {
    helper.waitForVisible($(`.modal-dialog `));
    return this.availableColumns.$$(`option`).getText();
  }

  setSelectedColumns(colName: string[]) {
    this.selectColumnToAdd(colName);
  }

  /**
   * Used to add a column in the availability column in column options dialog box
   * @param colName array of column name to add
   */
  selectColumnToAdd(colName: string[]) {
    colName.forEach(column => {
      helper.waitAndClick(element(by
        .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]/option[@label="${column}"]`)));
      browser.sleep(800);
      this.addSelectedColumnBtn.click();
    });
  }

  removeColumns(colName: string[]) {
    browser.sleep(1000);
    colName.forEach(column => {
      element.all(by
        .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.selected"]/option[@label="${column}"]`))
        .click();
      this.removeSelectedColumnBtn.click();
    });
  }

  moveSelectedColumn(column) {
    // { columnName: string, direction: string, count: number }
    const moveBtn = column.direction === 'up' ? this.moveUpBtn : this.moveDownBtn;
    element.all(by
      .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.selected"]/option[@label="${column.columnName}"]`))
      .click();
    for (let idx = 0; idx < column.count; idx++) {
      moveBtn.click();
      browser.sleep(1000);
    }
  }
  /**
   * returns the row element in this. Use this to access other elements in the row/lineitem
   * @param assetName - get row line item by assetName
   */
  getInLineRowItem(assetName): ElementFinder {
    const rowNum = this.getColumnItemsByColName('Asset');

    return this.rowList.get(rowNum.then((rows) => {
      return rows.indexOf(assetName);
    }));
  }
  // .ui-grid-row:nth-child(3) .ui-grid-cell-contents
  getAttributeLineItemByAsset(assetName: string) {
    return this.getInLineRowItem(assetName).$$(`.ui-grid-cell-contents`);
  }

  getRowTags(assetName: string) {
    return this.getInLineRowItem(assetName).$$(`[ng-repeat="keyword in row.entity.tags"] > span`)
      .getAttribute('textContent');
  }

  async getRowBoolean(assetName: string) {
    return this.getInLineRowItem(assetName).$$(`input[type="checkbox"]`)
      .get(0).getAttribute('title');
  }

  clickInLineItemEditBtn(rowItem: ElementFinder) {
    // rowItem.$(`[title="Edit"]`).click();
    helper.clickAndSleep(rowItem.$(`[title="Edit"]`), 2000);
  }

  editInLineAttribute(lineItemData: { assetName: string, attributes: Array<{ name: string, dataType: string, value: any }> }) {
    const lineItemRowElem: ElementFinder = this.getInLineRowItem(lineItemData.assetName);

    this.clickInLineItemEditBtn(lineItemRowElem);
    this.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
    this.saveInLineItemBtn(lineItemRowElem);
    // browser.refresh();
    browser.sleep(3000);
    // HOY!!! tan-awa dili ma view ang tag after nimo ma save
  }
  editInLineAttributeSchedule(lineItemData: {
    assetName: string, attributes: Array<{ name: string, value: any, dataType: string }>
  }) {
    const lineItemRowElem: ElementFinder = this.getInLineRowItem(lineItemData.assetName);
    this.clickInLineItemEditBtn(lineItemRowElem);
    this.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
    if (_.find(lineItemData.attributes, [`dataType`, this.dataTypes.scheduleDate])
      && _.find(lineItemData.attributes, [`value`, null])) {
      helper.waitForAlert();
      helper.getAlert().accept();
      this.waitForSpinner();
    }
    this.saveInLineItemBtn(lineItemRowElem);
    // browser.refresh();
    browser.sleep(2000);
  }
  setInLineAttribute(rowElem: ElementFinder, attributes: Array<{ name: string, dataType: string, value: any }>) {
    browser.sleep(800);
    attributes.forEach(attr => {
      if (attr.dataType === this.dataTypes.tag) {
        this.addTags(rowElem, attr.value);
      } else {
        const dataTypes = this.dataTypes;
        switch (attr.dataType) {
          case dataTypes.boolean:
            this.setInLineBoolean(rowElem, attr);
            break;
          case dataTypes.float:
          case dataTypes.int:
            browser.sleep(1000);
            this.setInLineIntegerFloat(rowElem, attr);
            break;
          case dataTypes.string:
            this.setInLineString(rowElem, attr);
            break;
          case dataTypes.list:
            this.getInLineAttribute(rowElem, attr.name)
              .element(by.cssContainingText('option', attr.value)).click();
            break;
          case dataTypes.date:
            this.setInLineDateAttribute(rowElem, attr);
            break;
          case dataTypes.scheduleDate:
            this.setInLineSchedule(rowElem, attr);
            break;
          default:
            break;
        }
      }
    });
  }

  private setInLineBoolean(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }) {
    this.getInLineAttribute(rowElem, attr.name)
      .$(`input[type="checkbox"]`).getAttribute(`class`).then(attribute => {
        if ((attribute.includes(`ng-not-empty`) && !attr.value)
          || (attribute.includes(`ng-empty`) && attr.value)) {
          this.getInLineAttribute(rowElem, attr.name)
            .$(`input[type="checkbox"]`).click();
        }
      });
  }
  private setInLineIntegerFloat(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }) {
    helper.clearAndSendKeys(this.getInLineAttribute(rowElem, attr.name)
      .$(`input[type="number"]`), attr.value);
  }
  private setInLineString(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }) {
    helper.clearAndSendKeys(this.getInLineAttribute(rowElem, attr.name)
      .$(`input[type="text"]`), attr.value);
  }
  private setInLineDateAttribute(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }) {
    const date: Date = attr.value;
    const d = helper.formatDateTimeAddZero(date.getMonth())
      + '' + helper.formatDateTimeAddZero(date.getDate(), false)
      + '' + (date.getFullYear());
    const t = helper.formatDateTimeAddZero(date.getHours(), false)
      + '' + helper.formatDateTimeAddZero(date.getMinutes(), false);
    // tslint:disable-next-line:radix
    const timeWithAMPM = parseInt(t.substring(0, 2)) >= 12 ? t + 'PM' : t + 'AM';

    this.setInLineDateFn(rowElem, attr, d, timeWithAMPM);
  }
  /**
   * used to input in line for Schedule data
   */
  private setInLineSchedule(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }) {
    if (attr.value === null) {
      this.getInLineAttribute(rowElem, attr.name, attr.name.includes(`PLAN`) || attr.name.includes('ACTUAL'))
        .$(`[type="date"]`).clear();
    } else {
      this.getInLineAttribute(rowElem, attr.name, attr.name.includes(`PLAN`) || attr.name.includes('ACTUAL'))
        .$(`[type="date"]`).sendKeys(attr.value);
    }
  }
  /**
   * use this to directly input to Date.
   * @param rowElem ElementFinder
   * @param attr attribute obj
   * @param date as string MMDDYYY
   * @param time as string HHMMAM or HHMMPM
   */
  setInLineDateFn(rowElem: ElementFinder, attr: { name: string, dataType: string, value: any }, date: string, time: string) {
    this.getInLineAttribute(rowElem, attr.name).$(`[type="datetime-local"]`)
      .sendKeys(date, protractor.Key.TAB, time);
  }

  saveInLineItemBtn(rowItem: ElementFinder) {
    helper.clickAndSleep(rowItem.$(`[title="Save"]`));
    this.waitForSpinner();
  }

  addTags(rowItem: ElementFinder, rowTags: string[]) {
    browser.sleep(5000);
    rowTags.forEach(tag => {
      helper.waitForVisible(rowItem.$(`#addTag`));
      rowItem.$(`#addTag`).sendKeys(tag);
      rowItem.$(`.taggingInputSection .btn.btn-default`).click(); // Add Tag button
      browser.sleep(1000);
    });
  }

  /**
     * returns attribute element while on in-line edit mode
   */
  getInLineAttribute(rowElem: ElementFinder, attributeName: any, schedule = false, batchEdit = false) {
    browser.sleep(1000);
    const col = this.getColumnID(attributeName, schedule, batchEdit);
    return rowElem.$$(`[role="gridcell"]`).get(col.then((columns) => {
      return columns.indexOf(attributeName);
    }));
  }

  applyAdvancedFilterSettings(advancedSettings) {

  }

  waitForSpinner() {
    helper.waitForVisible(this.spinnerImg);
    helper.waitForDisappear(this.spinnerImg);
    browser.sleep(1000);
  }

  getToastMessage() {
    helper.waitForVisible(this.toastMessage);
    return this.toastMessage.getText();
  }

  selectColumnType(columnType: string) {
    this.columnTypeDropDown.$(`[label="${columnType}"]`).click();
  }

  /**
   * sets the radio button for column option view
   * @param option asset || events
   */
  setShowAssetEventsViewOption(option: AssetEventsViewEnum) {
    helper.waitForElementClickable(this.showAssetEventsViewOption.get(0));
    option === AssetEventsViewEnum.asset ? this.showAssetEventsViewOption.get(0).click()
      : this.showAssetEventsViewOption.get(1).click();
  }

  /**
   *
   * @param eventType EventTypesEnum enum type. Fault, Inspection, Outage
   * @param check Defines if checkbox needs to be checked or not
   * @example
   * this.setEventType(EventTypesEnum.Fault, true)
   */
  setEventType(eventType: EventTypesEnum, check: boolean) {
    const event = this.getEventType(eventType);
    event.isSelected().then(checkbox => {
      if ((!checkbox && check) || (checkbox && !check)) {
        event.click();
      }
    });
  }

  /**
   * Sets the Event Types in Column Options dialog if needs to be checked or not.
   * @param eventsObjArr Array of { event: EventTypesEnum, checkbox: boolean }
   * @example
   * const eventsObjArr = [{event: EventTypesEnum.Fault, checkbox: true}]
   * this.setEventTypes(eventObjArr)
   */
  setEventTypes(eventsObjArr: Array<{ event: EventTypesEnum, checkbox: boolean }>) {
    helper.waitForVisible(this.availableEventTypes); browser.sleep(1000);
    eventsObjArr.forEach(eventObj => {
      const event = this.getEventType(eventObj.event);
      helper.waitForVisible(event);
      event.isSelected().then(checkbox => {
        if ((checkbox && !eventObj.checkbox) || (!checkbox && eventObj.checkbox)) {
          helper.clickAndSleep(event, 500);
        }
      });
    });
  }

  getEventType(eventType: EventTypesEnum): ElementFinder {
    return element(by.xpath(`//div[@class="eventTypes"]//label[contains(.,"${EventTypesEnum[eventType]}")]/input`));
  }

  /**
   * Used to convert ex: `Not Started Plan (512)` to `NOT STARTED PLAN`
   * @param columnHeaders column headers[] array from this.getColumnHeadersScheduled()
   */
  formatScheduleColumnHeaders(columnHeaders: string[]) {
    return columnHeaders.map(header => header.replace(/\n/g, ' ').replace(/\(.*/g, '').trim().toUpperCase());
  }

  /**
   * Used to get the number of items in the column ex: `Not Started Plan (512)` to `512`
   * @param columnName schedule column name ex: Not Started Plan (512)
   * @example
   * const columnName = `NOT STARTED PLAN`
   * this.getScheduleColumnItemCount(columnName)
   */
  async getScheduleColumnItemCount(columnName: string) {
    const colHeaders = await this.getColumnHeadersScheduled().then(columnHeaders => {
      return (columnHeaders as string[]).filter(headers => {
        return headers.replace(/\n/g, ' ').toUpperCase().includes(columnName.toUpperCase());
      })[0].replace(/\n/g, ' ').trim().split(' ');
    }) as string[];

    return colHeaders[colHeaders.length - 1].slice(1, -1);
  }

  // batchEditAttributeSchedule(lineItemData: Array<{
  //   assetName: string, attributes: Array<{ name: string, value: any, dataType: string }>
  // }>) {
  //   lineItemData.forEach(lineItem => {
  //     const lineItemRowElems: ElementFinder = this.getInLineRowItem(lineItem.assetName);
  //     this.selectLineItemChkBox(lineItemRowElems);
  //   });
  // };

  selectLineItemChkBox(assetNames: string[]) {
    assetNames.forEach(assetName => {
      const lineItemRowElem: ElementFinder = this.getInLineRowItem(assetName);
      helper.clickAndSleep(lineItemRowElem.$(`[title="Select"]`), 1000);
    });
    browser.sleep(1000);
  }

  batchEdit(lineItemDataBatch: LineItemBatchEditInterface) {
    browser.sleep(2000);
    this.selectLineItemChkBox(lineItemDataBatch.assetNames);
    helper.clickAndWaitForVisible(this.editSelectedBtn, this.batchEditWindow);
    helper.waitForVisibleAndDisappear(this.progressBar);
    browser.sleep(3000);
    this.batchEditNonSchedule(lineItemDataBatch);
    this.batchEditSchedule(lineItemDataBatch);
    this.batchEditSaveBtn.click();
    helper.waitForVisibleAndDisappear(this.progressBar);
  }

  batchEditNonSchedule(lineItemDataBatch: LineItemBatchEditInterface) {
    if (lineItemDataBatch.nonSchedule.length > 0) {
      this.addAttributeBatchEdit(lineItemDataBatch.nonSchedule);
    }

  }

  batchEditSchedule(lineItemDataBatch: LineItemBatchEditInterface) {
    if (lineItemDataBatch.schedule.length > 0) {
      helper.waitAndClick(this.batchEditScheduleTab, 5000);
      lineItemDataBatch.schedule.forEach(milestone => {
        // const gridCell: ElementFinder = this.getMilestoneBatchEditElem(milestone.milestoneType, milestone.milestoneStatus);
        // gridCell.sendKeys(milestone.milestoneValue);
        this.setBatchEditScheduleDate(milestone.milestoneType, milestone.milestoneStatus, milestone.milestoneValue);
      });
    }
  }

  setBatchEditScheduleDate(type: MilestoneType, milestoneStatus: MilestoneStatus, value: string) {
    const scheduleElem = this.getMilestoneBatchEditElem(type, milestoneStatus);
    scheduleElem.click();
    const batchEditGridDateInputbox = this.batchEditGrid.$(`[type="date"]`);
    helper.waitForVisible(batchEditGridDateInputbox);
    batchEditGridDateInputbox.sendKeys(value);
    // this.getMilestoneBatchEditElem(type, milestoneStatus).element(by.xpath('/parent::*//input[@type="date"]')).sendKeys(value);
  }

  /**
   * gets the element by type (Plan or Actual) and Milestone
   * @param type {string} MilestoneType enum
   * @param milesStone {string} MilestoneStatus enum
   */
  getMilestoneBatchEditElem(type: MilestoneType, milesStone: MilestoneStatus): ElementFinder {
    const col = this.getColumnID('columnName', true, true);
    return this.getLineItemBatchEditByType(type).get(col.then(column => {
      return column.indexOf(MilestoneStatus[milesStone]);
    }));
  }
  private getLineItemBatchEditByType(type: MilestoneType) {
    return this.getInLineRowItemBatchEdit(type).$$(`.ui-grid-cell-contents`);
  }
  private getInLineRowItemBatchEdit(type: MilestoneType) {
    const rowNum = this.getColumnItemsByColName('Type', true, true);

    return this.rowListBatchEdit.get(rowNum.then((rows) => {
      return rows.indexOf(MilestoneType[type]);
    }));
  }
  /**
   * this returns all the values of all milestone
   * @param assetName
   */
  // : Array<{ columnName: string, value: string }>
  getScheduleDatesByAssetName(assetName: string): Array<{ columnName: string, value: string }> {
    const scheduleColumnsArray2 = [
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
    const tempReturnArr = [];
    let tempValue: string;

    const scheduleColumns: string[] = scheduleColumnsArray2;
    scheduleColumns.shift();
    scheduleColumns.forEach(async column => {
      tempValue = await this.getAttributeByColumnAndAsset(assetName, column, true).getText();
      tempReturnArr.push({
        columnName: column,
        value: tempValue
      });
      console.log(`columnName: `, column);
      console.log(`value::: `, tempValue);
      if (column === 'Permitting Actual') {
        // util.scrollToView(this.listHeader.get(this.listHeader.count() - 1));
      }
    });
    return tempReturnArr;
  }

  async getScheduleDataFromList(assetNames: string[], defaultColumns = true) {
    const milestoneData: Array<{ assetName: string, headers: string[], values: string[] }> = [];
    let headers: string[];

    if (!defaultColumns) {
      headers = this.formatScheduleColumnHeaders(
        await this.getColumnHeadersScheduled(appName.programNavigator) as string[]);
    } else {
      headers = this.scheduleColumnsArray;
    }
    // store data to milestoneData obj[]
    for (const assetName of assetNames) {
      const values = (await this.getAttributeLineItemByAsset(assetName).getText()) as unknown as string[];
      if (defaultColumns) { values.splice(0, 3); }
      milestoneData.push({ assetName, headers, values });
    }

    const tempDataObj: Array<{
      assetName: string,
      milestone: Array<{ column: string, type: string, value: string }>
    }> = [];

    for (const data of milestoneData) {
      const eachAsset: { assetName: string, milestone: Array<{ column: string, type: string, value: string }> } = {
        assetName: data.assetName, milestone: []
      };
      data.headers.forEach(header => {
        if (header !== 'Asset') {
          const milestoneType = header.substr(header.lastIndexOf(' '), header.length).trim();
          const schedObj = {
            column: header.substr(0, header.lastIndexOf(' ')),
            type: MilestoneType[MilestoneType[milestoneType]],
            value: data.values[headers.indexOf(header)],
          };
          eachAsset.milestone.push(schedObj);
        }
      });
      tempDataObj.push(eachAsset);
    }
    return tempDataObj;
  }

  async getBatchEditScheduleValues2() {
    const tempValues = await this.rowListBatchEdit.getText();

  }

  async getBatchEditScheduleValues() {
    const milestoneBatchValues = [];
    const scheduleColumnsArray = this.scheduleColumnsArray;
    for (const schedule of scheduleColumnsArray) {
      if (schedule !== 'Asset') {
        const milestoneType = MilestoneType[schedule.substr(schedule.lastIndexOf(' '), schedule.length).trim()];
        const milestoneStatus = MilestoneStatus[schedule.substr(0, schedule.lastIndexOf(' '))];
        const schedObj = {
          column: schedule.substr(0, schedule.lastIndexOf(' ')),
          type: MilestoneType[milestoneType],
          value: await this.getMilestoneBatchEditElem(milestoneType, milestoneStatus).getText()
        };
        milestoneBatchValues.push(schedObj);
      }
    }
    return milestoneBatchValues;
  }

  addAttributeBatchEdit(attrObjArr: Array<{ attributeName: string, value: any, type: AttributeTypesEnum }>) {
    attrObjArr.forEach(attr => {
      this.batchEditAddAttributeTxt.sendKeys(attr.attributeName);
      browser.sleep(1000);
      this.batchEditAddAttributeBtn.click();
      helper.waitForVisible(this.modalWindow);
      this.setAttributeValue(attr);
      this.setAttributeValueOkBtn.click();
      // this.batchEditSaveBtn.click(); add another function with Save Changes button clicked
    });
    browser.sleep(1000);
  }

  setAttributeValue(attrObj: { attributeName: string, value: any, type: AttributeTypesEnum, attributeOption?: any }) {
    browser.sleep(1000);
    helper.waitAndClick(this.batchEditSetDetailsBtn); // expand Set Details panel
    helper.waitAndClick(this.attributeValueTypesDropdown.$(`[label="${AttributeTypesEnum[attrObj.type]}"]`), 5000);
    switch (attrObj.type) {
      case AttributeTypesEnum['Freeform Text']:
        this.attributeValueFreeformText.sendKeys(attrObj.value);
        break;
      case AttributeTypesEnum.Float:
        helper.waitForVisible(this.attributeDecimalFloat);
        helper.clearAndSendKeys(this.attributeDecimalFloat, attrObj.attributeOption);
        this.attributeValueFloat.sendKeys(attrObj.value);
        break;
      case AttributeTypesEnum.Integer:
        this.attributeValueInteger.sendKeys(attrObj.value);
        break;
      case AttributeTypesEnum['Discrete List']:
        helper.waitForVisible(this.attributeOptionsList);
        this.attributeOptionsList.sendKeys(attrObj.attributeOption);
        this.attributeValueList.click(); // click dropdown first to populate dropdown list values
        this.attributeValueList.$(`[label=${attrObj.value}]`).click();
        break;
      case AttributeTypesEnum.Boolean:
        helper.waitForVisible(this.attributeValueBoolean); browser.sleep(1000);
        helper.selectCheckBox(this.attributeValueBoolean, attrObj.value);
        break;
      case AttributeTypesEnum.Date:
        this.setAttributeDateBatchEdit(attrObj);
        break;
      default:
        break;
    }
  }

  getBatchEditAssetInfoColumnHeaderLabels() {
    const columnLabelElemStr = `.ui-grid-header-cell-label`;
    return this.batchEditAssetInfoColumnHeaders.$$(columnLabelElemStr).getText();
  }

  private setAttributeDateBatchEdit(attrObj: any) {
    const { dateValue, timeValue } = attrObj.value;
    helper.waitForVisible(this.attributeDateBtn); browser.sleep(1000);
    this.attributeDateBtn.click();
    helper.selectCalendarMonthYear(dateValue as Date);
    this.attributeTimeTxt.sendKeys(timeValue);
  }

  async getAttributeValueByAssetBatchEdit(attributeName: string) {
    const attributeNameColumn = await this.getColumnItemsByColName('Attribute', false, true);
    const attributeValueColumn = await this.getColumnItemsByColName('Value', false, true);

    return attributeValueColumn[attributeNameColumn.indexOf(attributeName)];
  }
}
