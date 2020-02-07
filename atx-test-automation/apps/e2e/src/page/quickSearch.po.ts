import { browser, by, $$, $, element, ElementFinder, utils } from 'protractor';
import { Helper } from '../helpers/helper';
import { protractor } from 'protractor/built/ptor';

const helper = new Helper();

export const quickSearchPage = {

  modalWindow: $(`[uib-modal-window="modal-window"]`),
  spinnerImg: $(`[id="spinner"]`),
  tabElements: $$(`[ng-repeat="tab in vm.tabs"] > a`), // or $$(`[role="tab"]`)

  filterByCategoryBtn: $(`[title="Filter by Category"]`),
  quickSearchBtn: $(`[ng-click="listVM.search(listVM.selectedQuickSearch)"]`),
  quickSearchDropdownBtn: $(`#quicksearch button.dropdown-toggle.dropdown-toggle-split`),
  quickSearchList: $$(`#quicksearch >div.pull-right ul[role="menu"] a[role="menuitem"]`),
  // saveListBtn: $(`[ng-click="listVM.saveQuickSearch()"]`),
  saveListBtn: $(`[title="Save List"]`),
  // saveAsBtn: $(`[title="Save As"]`),
  saveAsBtn: $(`[ng-click="listVM.copyQuickSearch()"]`),
  filterBtn: $(`[ng-click="searchSettings.toggle()"]`),
  deleteList: $(`[role="menu"] [ng-click="listVM.deleteQuickSearch($event)"]`),
  moreOptions: $(`#quicksearch button.btn.btn-link.dropdown-toggle`),

  showColumnOptionsBtn: $(`[ng-click="listVM.showColumnOptions()"]`),
  newListBtn: $(`[role="menu"] [ng-click="listVM.newList()"]`),
  editListBtn: $(`[role="menu"] [ng-click="listVM.saveQuickSearch(true)"]`),
  exportBtn: $(`[ng-click="listVM.Export()"]`),
  badgeCtr: $(`.badge`), // displays number of items in the list

  /** Create New List */
  modalTitle: $(`.modal-title`),
  searchName: $(`[name="quickSearchTitle"]`),
  searchTerm: $(`[id="searchText"]`), // clear text first
  okNewListBtn: $(`[ng-click="newListVM.ok()"]`),
  cancelNewListBtn: $(`[ng-click="newListVM.cancel()"]`),
  scheduleChkBox: $(`[ng-model="newListVM.selected.ScheduleSearch"]`),

  /** Save Quick Search */
  titleTxt: $(`[ng-model="saveQuickSearchVm.name"]`),
  categoryTxt: $(`[ng-model="aConCatVM.Candidate"]`),
  categoryAddBtn: $(`[ng-click="aConCatVM.addCandidate()"]`),
  makePublicChkBox: $(`[ng-model="saveQuickSearchVm.isPublic"]`),
  applyToSelectedAssetChkBox: $(`[ng-model="saveQuickSearchVm.applyToSelectedAsset"]`),
  categoryTags: $$(`.modal-content .chosen-choices > .search-choice > span`),
  okSaveQuickSearchBtn: $(`[ng-click="saveQuickSearchVm.ok()"]`),
  cancelQuickSearchBtn: $(`[ng-click="saveQuickSearchVm.cancel()"]`),

  searchExpansionTxt: $(`[ng-model="quickSearch.SearchExpression"]`),
  clearBtn: $(`[ng-click="searchSettings.clearSearch()"]`),
  submitFilter: $(`#tagSearchPopup [type="submit"]`),

  toastMessage: $(`.toast-message`),

  /** List */
  listContainer: $(`.listContainer`),
  listHeader: $$(`.listContainer [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`),
  rowList: $$(`.ui-grid-row`),
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
  availableColumns: $$(`[ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]`),
  selectedColumns: $$(`[ng-options="column as column.DisplayName for column in popupVM.selected"]`),
  addSelectedColumnBtn: $(`[title="Add"]`),
  removeSelectedColumnBtn: $(`[title="Remove"]`),
  addAllColumnsBtn: $(`[title="Add All"]`),
  removeAllColumnsBtn: $(`[title="Remove All"]`),
  cancelBtnColumnDialog: $(`[ng-click="popupVM.cancel()"]`),
  okBtnColumnDialog: $(`[ng-click="popupVM.close()"]`),
  moveUpBtn: $(`[title="Move Up"]`),
  moveDownBtn: $(`[title="Move Up"]`),
  /**
   *
   * @param quickSearchObj {name, searchTerm }
   */
  createQuickSearch(quickSearchObj: any) {
    helper.clickAndSleep(quickSearchPage.moreOptions);
    quickSearchPage.newListBtn.click();
    helper.waitForVisible(quickSearchPage.modalTitle);
    expect(quickSearchPage.modalTitle.getText())
      .toEqual(`Create New List`, `Modal Title does not match`);
    helper.clearAndSendKeys(quickSearchPage.searchName, quickSearchObj.searchName);
    helper.clearAndSendKeys(quickSearchPage.searchTerm, quickSearchObj.searchTerm);
    quickSearchPage.okNewListBtn.click();
    quickSearchPage.waitForSpinner();
    return quickSearchPage.quickSearchBtn.getText();
  },

  saveQuickSearchFn(quickSearchObj: any, modify = false) {
    if (modify) {
      quickSearchPage.moreOptions.click();
      quickSearchPage.editListBtn.click();
    } else {
      quickSearchPage.saveListBtn.click();
    }

    helper.waitForVisible(quickSearchPage.modalTitle);
    helper.waitForVisible(quickSearchPage.categoryTxt); browser.sleep(2000);
    expect(quickSearchPage.modalTitle.getText())
      .toEqual(`Save a quick search`, `Modal Title does not match`);
    helper.clearAndSendKeys(quickSearchPage.titleTxt, quickSearchObj.searchName);
    quickSearchPage.addCategories(quickSearchObj.categories.add);
    quickSearchPage.removeCategories(quickSearchObj.categories.remove);
    helper.selectCheckBox(quickSearchPage.applyToSelectedAssetChkBox,
      quickSearchObj.applyToSelectedAsset);
    helper.selectCheckBox(quickSearchPage.makePublicChkBox,
      quickSearchObj.makePublic);

    const catTags = quickSearchPage.categoryTags.getText();
    quickSearchPage.okSaveQuickSearchBtn.click();
    quickSearchPage.waitForSpinner();
    browser.sleep(1000);
    return catTags;
  },

  /**
   * use this if you just want to click sa save button..
   * this has the waitForSpinner()
   */
  saveListFn(firstTimeSave = false) {
    quickSearchPage.saveListBtn.click();
    if (firstTimeSave) {
      helper.waitForVisible(quickSearchPage.modalTitle);
      quickSearchPage.okSaveQuickSearchBtn.click();
    }
    quickSearchPage.waitForSpinner();
  },
  updateQuickSearch(listFilterDetails: any) {
    quickSearchPage.modifySearchFilter(listFilterDetails);
    quickSearchPage.saveQuickSearchFn(listFilterDetails, true);
  },

  modifySearchFilter(listFilterDetails: any) {
    quickSearchPage.filterBtn.click();
    helper.clearAndSendKeys(quickSearchPage.searchExpansionTxt, listFilterDetails.searchTerm);
    // add advance filters here
    quickSearchPage.submitFilter.click(); helper.waitForDisappear(quickSearchPage.spinnerImg);
    // currently it will reload the list if the filter btn is clicked to close
    quickSearchPage.filterBtn.click(); helper.waitForDisappear(quickSearchPage.spinnerImg);
  },

  deleteQuickSearch(quickSearchName: any) {
    quickSearchPage.quickSearchDropdownBtn.click();
    quickSearchPage.removeQuickSearchFromDropdown(quickSearchName);
    quickSearchPage.quickSearchDropdownBtn.click();
  },

  deleteQuickSearchMoreOption() {
    quickSearchPage.moreOptions.click();
    browser.sleep(1000);
    quickSearchPage.deleteList.click();
    browser.switchTo().alert().accept();
    helper.waitForVisible(quickSearchPage.toastMessage);
    quickSearchPage.moreOptions.click();
    quickSearchPage.waitForSpinner(); browser.sleep(1000);
    return quickSearchPage.getToastMessage();
  },

  saveAsQuickSearch(quickSearchObj?: any) {
    // helper.waitForElementClickable(quickSearchPage.saveAsBtn, 3000);
    browser.sleep(1000);
    quickSearchPage.moreOptions.click();
    browser.sleep(2000);
    quickSearchPage.saveAsBtn.click();
    helper.waitForVisible(quickSearchPage.categoryTxt);
    const saveAsDetails = quickSearchPage.getQuickSearchDetails();
    if (quickSearchObj !== undefined) {
      quickSearchPage.saveQuickSearchFn(saveAsDetails);
    } else {
      helper.clickAndSleep(quickSearchPage.okSaveQuickSearchBtn, 1000);
      quickSearchPage.waitForSpinner();
      return saveAsDetails;
    }
  },

  createQuickSearchComplete(quickSearchObj: any) {
    /**
     * quickSearchObj {searchName, searchTerm}
     */
    quickSearchPage.createQuickSearch(quickSearchObj);
    const saveRes = quickSearchPage.saveQuickSearchFn(quickSearchObj);
  },

  addCategories(categories: [string]) {
    categories.forEach(category => {
      quickSearchPage.categoryTxt.sendKeys(category);
      quickSearchPage.categoryAddBtn.click(); browser.sleep(800);
    });
  },

  removeCategories(categories: [string]) {
    categories.forEach(category => {
      element(by
        .xpath(`//div[@class="modal-content"]//ul[@class="chosen-choices"]/li` +
          `/span[contains(text(),"${category}")]/preceding-sibling::a`))
        .click();
    });
  },

  selectCategory(category: string) {

  },

  getQuickSearchFromDropdown(searchName: string) {
    return element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]`));
  },

  /**
   *
   * @param searchName Quick search name
   * @param alert Set to true if you want to interact with Alert message (unsaved message)
   */
  selectQuickSearchFromDropdown(searchName: string, alert = false) {
    element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]`))
      .first().click();
    if (!alert) { helper.waitForDisappear(quickSearchPage.spinnerImg); }
  },

  removeQuickSearchFromDropdown(searchName: string) {
    element.all(by
      .xpath(`//a[@ng-click="listVM.setQuickSearch(item)"]/span[contains(text(),'${searchName}')]/following-sibling::span/i`))
      .first().click();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
  },

  async getQuickSearchDetails() {
    helper.waitForVisible(quickSearchPage.categoryTxt);

    return {
      searchName: await quickSearchPage.titleTxt.getAttribute('value'),
      makePublic: await quickSearchPage.makePublicChkBox.getAttribute('class')
        .then(attr => attr.includes('ng-not-empty')),
      applyToSelectedAsset: await quickSearchPage.applyToSelectedAssetChkBox.getAttribute('class')
        .then(attr => attr.includes('ng-not-empty')),
      categories: await quickSearchPage.getSelectedCategories().categories.getText(),
      categoryTag: await quickSearchPage.getSelectedCategories().categoryTags.getText()
    };
  },

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
  },

  getQuickSearchFromList(searchName: string) {

  },

  getSelectedColummns() {
    browser.sleep(2000);
    helper.waitForVisible($(`.modal-dialog `));
    return quickSearchPage.selectedColumns.$$('option').getText();
  },

  getAvailableColumns() {
    helper.waitForVisible($(`.modal-dialog `));
    return quickSearchPage.availableColumns.$$(`option`).getText();
  },

  setSelectedColumns(colName: string[]) {
    quickSearchPage.selectColumnToAdd(colName);
  },

  selectColumnToAdd(colName: string[]) {
    colName.forEach(column => {
      // helper.waitAndClick(element.all(by
      //   .xpath(`//select[@ng-options="column as column.DisplayName` +
      //     ` for column in popupVM.visibleOptions"]/option[@label="${column}"]`))[0]);
      // // element.all(by
      // tslint:disable-next-line:max-line-length
      // //   .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]/option[@label="${column}"]`))
      // //   .click();
      helper.waitAndClick(element(by
        .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.visibleOptions"]/option[@label="${column}"]`)));
      browser.sleep(800);
      quickSearchPage.addSelectedColumnBtn.click();
    });
  },

  removeColumns(colName: string[]) {
    browser.sleep(1000);
    colName.forEach(column => {
      element.all(by
        .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.selected"]/option[@label="${column}"]`))
        .click();
      quickSearchPage.removeSelectedColumnBtn.click();
    });
  },

  moveSelectedColumn(column) {
    // { columnName: string, direction: string, count: number }
    const moveBtn = column.direction === 'up' ? quickSearchPage.moveUpBtn : quickSearchPage.moveDownBtn;
    element.all(by
      .xpath(`//select[@ng-options="column as column.DisplayName for column in popupVM.selected"]/option[@label="${column.columnName}"]`))
      .click();
    for (let idx = 0; idx < column.count; idx++) {
      moveBtn.click();
      browser.sleep(1000);
    }
  },

  waitForSpinner() {
    helper.waitForVisible(quickSearchPage.spinnerImg);
    helper.waitForDisappear(quickSearchPage.spinnerImg);
    browser.sleep(1000);
  },

  getToastMessage() {
    return quickSearchPage.toastMessage.getText();
  }
};
