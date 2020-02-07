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
import { isNumber } from 'util';

const listview = new Listview();
const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'SEKOIA Demo Clients',
  child: ['UGM Historical Reliability Plan']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
const newQuickSearch = generateQuickSearch();
const modifiedQuickSearch = Object.create(newQuickSearch);
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
let saveAsQuickSearch: any;

describe('List View SCHEDULE ', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  it('nagivate to Listview Tab', async () => {
    // programNavigatorPage.getTabElementByName(tabNames.lists).click();
    user.openTab(tabNames.lists);
    const listHeader = $(`.listContainer .ui-grid-viewport`);
    browser.waitForAngularEnabled();
    expect(listHeader.isPresent()).toBeTruthy();
  });
  it('New Search should not be default quick search', () => {
    expect(listview.quickSearchBtn.getText()).not.toEqual('New Search');
  });
  it('New Search should not be present in Quick Search dropdown', () => {
    listview.quickSearchDropdownBtn.click();
    expect(listview.quickSearchList.get(0).getText()).not.toEqual('New Search');
  });
  describe('CRUD', () => {
    it('Create new Quick Search', () => {
      console.log(`QuickSearch to create: `, newQuickSearch.searchName);
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
    it('Display default scheduled columns', async () => {
      util.scrollToView(listview.listHeader.get(await listview.listHeader.count() - 1)); // scroll to last column to view list headers

      browser.sleep(1000);
      const headers = listview.formatScheduleColumnHeaders(await listview.getColumnHeadersScheduled(appName.programNavigator) as string[]);
      let listScheduleHeaders = listview.scheduleColumnsArray;
      listScheduleHeaders = listScheduleHeaders.map(e => e.toUpperCase());

      // remove first array element because it captures ' ' since it's not showing in the screen
      headers.splice(0, 3);
      headers.shift(); listScheduleHeaders.shift();
      expect(listScheduleHeaders).toEqual(headers);
      expect(headers.length).toEqual(listScheduleHeaders.length);
    });
    it('Save new Quick Search', async () => {
      /** Saves Quick Search */
      expect(listview.saveQuickSearchFn(newQuickSearch))
        .toEqual(newQuickSearch.categories.add); // check if categorie tags were shown when added

      expect(listview.quickSearchBtn.getText()).toMatch(newQuickSearch.searchName
        , `Newly created Quick Search is not selected by default after saving.`);

      helper.clickAndSleep(listview.quickSearchDropdownBtn, 500); // click drop down to view list

      expect(listview.quickSearchList.getText()).toMatch(newQuickSearch.searchName
        , `${await listview.quickSearchList.getText()} does not contain ${newQuickSearch.searchName}`);

      /** WORKAROUND because newly created is not selected after save */
      listview.selectQuickSearchFromDropdown(newQuickSearch.searchName);

      /** Quick Search details should be correct */
      const savedQuickSearch = await getQuickSearch(); // open save dialog and get details
      assertQuickSearchDetails(savedQuickSearch, newQuickSearch);
    });
    it('MODIFY Search Term and Categories', async () => {
      const listItemsBefore = await listview.getColumnItemsByColName('Asset');
      const badgeCtrBefore = await listview.badgeCtr.getText();
      const modifySearchTerm = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
      const newCategory = `cat_${casual.word}_${(new Date().getTime())}`;
      const categoryToRemove = newQuickSearch.categories.toExpect[0];

      modifiedQuickSearch.searchName = casual.word + (new Date().getTime());
      modifiedQuickSearch.searchTerm = `asset=*${modifySearchTerm}`;
      modifiedQuickSearch.categories.remove = [categoryToRemove];
      modifiedQuickSearch.categories.add = [newCategory]; // add another category
      modifiedQuickSearch.categories.toExpect = helper.removeItemFromArrayByValue(modifiedQuickSearch.categories.toExpect
        , [categoryToRemove]);
      modifiedQuickSearch.categories.toExpect.push(newCategory);

      listview.updateQuickSearch(modifiedQuickSearch); // update Quick search

      const listItemsAfterSave = await listview.getColumnItemsByColName('Asset');
      const badgeCtrAfterSave = await listview.badgeCtr.getText();

      expect(listItemsBefore.length).not.toEqual(listItemsAfterSave.length, 'List results'); // compare count
      expect(badgeCtrBefore).not.toEqual(await listview.badgeCtr.getText(), 'Badge counter'); // compare badge count

      browser.refresh(); // refresh to check it changes are saved
      helper.waitAndClick(listview.quickSearchDropdownBtn, 30000);
      listview.selectQuickSearchFromDropdown(modifiedQuickSearch.searchName);

      const listItemsAfterRefresh = await listview.getColumnItemsByColName('Asset');
      const badgeCtrAfterRefresh = await listview.badgeCtr.getText();

      expect(listItemsAfterSave.length).toEqual(listItemsAfterRefresh.length);
      expect(badgeCtrAfterSave).toEqual(badgeCtrAfterRefresh);

      // listview.saveListBtn.click();
      const savedQuickSearch = await getQuickSearch(); // open save dialog and get details
      assertQuickSearchDetails(savedQuickSearch, modifiedQuickSearch);
    });
    it('SAVE AS a Quick Search', async () => {
      // NEEED TO UPDATE HERE. NEED TO USE ACTION OPTIONS
      const currentQuickSearch = await getQuickSearch();
      currentQuickSearch.searchName = currentQuickSearch.searchName + `-copy`; // to compare with SaveAs details

      saveAsQuickSearch = await listview.saveAsQuickSearch();

      expect(currentQuickSearch).toEqual(saveAsQuickSearch);
      listview.waitForSpinner();
      const quickSearchCopy = await listview.quickSearchBtn.getText();
      expect(quickSearchCopy).toEqual(saveAsQuickSearch.searchName);

      /** check if the same config retains */
      const currentQuickSearchAfter = await getQuickSearch();
      expect(currentQuickSearchAfter).toEqual(saveAsQuickSearch);
    });
    it('Delete quick search', async () => {
      listview.deleteQuickSearchMoreOption();
      expect(listview.getQuickSearchFromDropdown(saveAsQuickSearch.searchName).count())
        .toEqual(0);

      helper.clickAndSleep(listview.quickSearchDropdownBtn, 500);
      listview.selectQuickSearchFromDropdown(modifiedQuickSearch.searchName);
      listview.deleteQuickSearchMoreOption();

      expect(listview.getQuickSearchFromDropdown(modifiedQuickSearch.searchName).count())
        .toEqual(0);
    });
  });
});

function generateQuickSearch() {
  return {
    searchName: casual.word + (new Date().getTime()),
    searchTerm: `asset=*`,
    schedule: {
      scheduled: true, // set this to false if non-scheduled
      map: listview.mapGeoSpa.projectStatus,
      assetType: 'Pole Replacement'
    },
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

async function getQuickSearch() {
  listview.moreOptions.click();
  listview.editListBtn.click();
  const qsDetails = await listview.getQuickSearchDetails();
  // return listview.getQuickSearchDetails();
  listview.cancelQuickSearchBtn.click();
  helper.waitForDisappear(listview.modalWindow);
  return qsDetails;
}

function assertQuickSearchDetails(savedQuickSearchDetails: any, toCompare: any) {
  expect(savedQuickSearchDetails.searchName).toEqual(toCompare.searchName);
  expect(savedQuickSearchDetails.makePublic).toEqual(toCompare.makePublic);
  expect(savedQuickSearchDetails.assetOption).toEqual(toCompare.assetOption);
  expect(savedQuickSearchDetails.categories === toCompare.categories.toExpect)
    .toBeTruthy(`Categories: ${savedQuickSearchDetails.categories} are not equal ` +
      `or Categories are not checked in save dialog: ${toCompare.categories.toExpect}`);
  expect(savedQuickSearchDetails.categoryTag).toEqual(toCompare.categories.toExpect
    , `CategoryTag not equal or CategoryTag not present`);
  // listview.cancelQuickSearchBtn.click();
}
