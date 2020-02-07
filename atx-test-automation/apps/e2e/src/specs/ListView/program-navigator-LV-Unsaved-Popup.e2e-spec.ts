/**
 * Listview test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $ } from 'protractor';
import * as casual from 'casual';
import { Listview } from '../../page/listview.po';

const listview = new Listview();
const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  // parent: 'SEKOIA Demo Clients',
  // child: ['UGM Historical Reliability Plan']
  parent: automationAssetData.clientGroup,
  child: [automationAssetData.clientName]
};
const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();

describe('List View', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  it('should be able to nagivate to Listview Tab', async () => {
    // programNavigatorPage.getTabElementByName(tabNames.lists).click();
    user.openTab(tabNames.lists);
    const listHeader = $(`.listContainer .ui-grid-viewport`);
    browser.waitForAngularEnabled();
    expect(listHeader.isPresent()).toBeTruthy();
  });
  describe('Confirmation Message - Unsaved Changes', () => {
    // const popUpMsg = `There are unsaved changes to this list that will be lost.  Are you sure you want to continue?`;

    beforeAll(() => {
      newQuickSearch.searchName = 'unsaved' + (new Date().getTime());
      newQuickSearch.categories.add = [];
      newQuickSearch.categories.remove = [];
      listview.createQuickSearch(newQuickSearch);
    });
    describe('New and Unsaved quick search', () => {
      unsavedChangesSteps();
    });
    describe('Saved and modified search filter', () => {
      const searchFilterText = {
        searchTerm: `asset=A*`
      };
      beforeAll(() => {
        listview.saveQuickSearchFn(newQuickSearch);
        listview.modifySearchFilter(searchFilterText);
      });
      unsavedChangesSteps();
    });
    describe('Add column', () => {
      beforeAll(async () => {
        listview.saveListBtn.click();
        listview.waitForSpinner();
        listview.showColumnOptionsBtn.click();
        const columnToAdd = [];
        columnToAdd.push(util.getRandomFromArray(
          helper.removeItemFromArrayByValue(await listview.getAvailableColumns(), await listview.getSelectedColummns())
        ));
        setColumns(columnToAdd, 'add');
      });
      unsavedChangesSteps();
    });
    describe('Remove column', () => {
      beforeAll(async () => {
        listview.saveListBtn.click();
        listview.waitForSpinner();
        listview.showColumnOptionsBtn.click();
        setColumns([`Tags`], 'remove');
      });
      unsavedChangesSteps();
    });
    describe('Modified column filters', () => {
      beforeAll(async () => {
        listview.saveListBtn.click();
        listview.waitForSpinner();
        const searchTermFilter = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
        listview.setColumnFilterByName('Asset', searchTermFilter);
      });
      unsavedChangesSteps();
    });
  });
  describe('Continue Unsaved Changes', () => {
    const searchFilterText = {
      searchTerm: `asset = A*`
    };
    beforeAll(() => {
      helper.clickAndSleep(listview.saveListBtn);
      listview.modifySearchFilter(searchFilterText);
    });
    it('pop up should not appear after being accepted', async () => {
      listview.quickSearchDropdownBtn.click();
      listview.selectQuickSearchFromDropdown(
        util.getRandomFromArray(await listview.quickSearchList.getText()), true
      );

      expect(typeof helper.checkAlert() === 'object').toBeTruthy();
      helper.getAlert().accept();
      listview.waitForSpinner();

      listview.quickSearchDropdownBtn.click();
      listview.selectQuickSearchFromDropdown(
        util.getRandomFromArray(await listview.quickSearchList.getText())
      );

      expect(helper.checkAlert()).toBeFalsy();
    });
  });
});

function generateQuickSearch() {
  return {
    searchName: casual.word + (new Date().getTime()),
    searchTerm: `asset=*`,
    makePublic: true,
    // applyToSelectedAsset: true,
    assetOption: listview.assetOptions.applyToSelectedAsset,
    categories: {
      toExpect: [],
      add: [`cat_${casual.word}${casual.random}_${(new Date().getTime())}`
        , `cat_${casual.word}${casual.random}_${(new Date().getTime())}2`],
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

function setColumns(columns, action: string) {
  if (action === 'add') {
    listview.setSelectedColumns(columns);
  } else {
    listview.removeColumns(columns);
  }
  listview.okBtnColumnDialog.click();
  listview.waitForSpinner();

}

function unsavedChangesSteps() {
  const popUpMsg = `There are unsaved changes to this list that will be lost.  Are you sure you want to continue?`;
  it('switching from Lists to other tabs', () => {
    Object.keys(tabNames).forEach(tab => {
      user.openTab(tabNames[tab]);

      const alert = helper.getAlert();
      expect(alert.getText()).toEqual(popUpMsg);
      alert.dismiss();
    });
  });
  it('switching to another quick search', async () => {
    listview.quickSearchDropdownBtn.click();
    listview.selectQuickSearchFromDropdown(
      util.getRandomFromArray(await listview.quickSearchList.getText()), true
    );

    const alert = helper.getAlert();
    expect(alert.getText()).toEqual(popUpMsg);
    alert.dismiss();
  });
}
