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
  parent: automationAssetData.clientGroup,
  child: [automationAssetData.clientName]

};
const newQuickSearch = generateQuickSearch();
const modifiedQuickSearch = Object.create(newQuickSearch);
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
let saveAsQuickSearch: any;
const defaultColumns = ['Asset', 'EffectiveAge', 'COF', 'Risk_ELR', 'Outage Actual End Date'];

describe('Risk Assessment - List View', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.riskAssessment);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.riskAssessment);
  });
  it('should be able to nagivate to Listview Tab', async () => {
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
    it('should be able to Create new Quick Search', () => {
      console.log(`QuickSearch to create: `, newQuickSearch.searchName);
      /** Creates Quick search list */
      expect(listview.createQuickSearch(newQuickSearch)).toEqual(newQuickSearch.searchName);
      expect(listview.rowList.count()).toBeGreaterThan(0);
    });
    it('should able to display RA Default Columns - Asset, EffectiveAge, COF, Risk_ELR, Outage Actual End Date', async () => {
      const colHeaders = await listview.getColumnHeadersByApp(appName.riskAssessment);
      // console.log(`listview.getColumnHeadersByApp(appName.riskAssessment):::: `,
      //   await listview.getColumnHeadersByApp(appName.riskAssessment));
      defaultColumns.forEach(column => {
        expect(colHeaders).toContain(column);
      });
    });
    it('should be able to Save new Quick Search', async () => {
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
    it('should be able to MODIFY Search Term and Categories', async () => {
      const listItemsBefore = await listview.getColumnItemsByColName('Asset');
      const badgeCtrBefore = await listview.badgeCtr.getText();
      const modifySearchTerm = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
      const newCategory = `cat_${casual.word}_${(new Date().getTime())}`;
      const categoryToRemove = newQuickSearch.categories.toExpect[0];
      const qsDetailsToModify = { modifySearchTerm, categoryToRemove, newCategory };

      modifyQuickSearchDetails(qsDetailsToModify); //

      listview.updateQuickSearch(modifiedQuickSearch); // update Quick search

      const listItemsAfterSave = await listview.getColumnItemsByColName('Asset');
      const badgeCtrAfterSave = await listview.badgeCtr.getText();

      expect(listItemsBefore.length).not.toEqual(listItemsAfterSave.length, 'List results'); // compare count
      expect(badgeCtrBefore).not.toEqual(await listview.badgeCtr.getText(), 'Badge counter'); // compare badge count

      browser.refresh(); // refresh to check it changes are saved
      helper.waitAndClick(listview.quickSearchDropdownBtn, 30000);
      // helper.clickAndSleep(listview.quickSearchDropdownBtn, 500);
      listview.selectQuickSearchFromDropdown(modifiedQuickSearch.searchName);

      const listItemsAfterRefresh = await listview.getColumnItemsByColName('Asset');
      const badgeCtrAfterRefresh = await listview.badgeCtr.getText();

      expect(listItemsAfterSave.length).toEqual(listItemsAfterRefresh.length);
      expect(badgeCtrAfterSave).toEqual(badgeCtrAfterRefresh);

      // listview.saveListBtn.click();
      const savedQuickSearch = await getQuickSearch(); // open save dialog and get details
      assertQuickSearchDetails(savedQuickSearch, modifiedQuickSearch);
    });
    it('should be able to SAVE AS a Quick Search', async () => {
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
    it('should be able to Delete quick search', async () => {
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
    searchTerm: ``,
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
}

function modifyQuickSearchDetails(qsDetails) {
  const { modifySearchTerm, categoryToRemove, newCategory } = qsDetails;

  modifiedQuickSearch.searchName = casual.word + (new Date().getTime());
  modifiedQuickSearch.searchTerm = `asset=*${modifySearchTerm}`;
  modifiedQuickSearch.categories.remove = [categoryToRemove];
  modifiedQuickSearch.categories.add = [newCategory]; // add another category
  modifiedQuickSearch.categories.toExpect = helper.removeItemFromArrayByValue(modifiedQuickSearch.categories.toExpect
    , [categoryToRemove]);
  modifiedQuickSearch.categories.toExpect.push(newCategory);
}
