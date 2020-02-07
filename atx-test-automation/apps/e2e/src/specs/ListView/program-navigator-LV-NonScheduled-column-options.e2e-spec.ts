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
  // parent: 'SEKOIA Demo Clients',
  // child: ['UGM Historical Reliability Plan']
  parent: automationAssetData.clientGroup,
  child: [automationAssetData.clientName]
};
const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
let columnsToExpect: any;
describe('Non Scheduled Test', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  describe('Column Options', () => {
    it('should verify Selected Columns are present in column options dialog', async () => {
      user.openTab(tabNames.lists);
      const newQuickSearchColumn = Object.create(newQuickSearch);
      listview.createQuickSearch(newQuickSearchColumn);
      const colHeaders = listview.getColumnHeadersByApp(appName.programNavigator);
      listview.showColumnOptionsBtn.click();
      const selectedColumns = listview.getSelectedColummns();

      expect(colHeaders).toEqual(selectedColumns);
    });
    it('should be able to add new column', async () => {
      const availableColumns = await listview.getAvailableColumns(); // get columns items in column options dialog
      let selectedColumns = await listview.getSelectedColummns();
      columnsToExpect = selectedColumns;
      let columnToAdd = [];
      let columnToAddTemp: any;

      columnToAdd.push(util.getRandomFromArray(helper.removeItemFromArrayByValue(availableColumns, selectedColumns)));

      setSelectedColumns(columnToAdd);
      columnsToExpect.push(...columnToAdd);

      let colHeaders = await listview.getColumnHeadersByApp(appName.programNavigator);

      expect(colHeaders).toEqual(columnsToExpect);

      helper.waitAndClick(listview.showColumnOptionsBtn);  // options column options dialog
      selectedColumns = await listview.getSelectedColummns();

      expect(colHeaders).toEqual(selectedColumns);
      columnToAdd = [];

      columnToAddTemp = selectedColumns; // This part gathers columns to be added
      columnToAdd.push(
        util.getRandomFromArray(helper.removeItemFromArrayByValue(await listview.getAvailableColumns(),
          columnToAddTemp)));
      columnToAddTemp.push(...columnToAdd);
      columnToAdd.push(
        util.getRandomFromArray(helper.removeItemFromArrayByValue(await listview.getAvailableColumns(),
          columnToAddTemp)));

      setSelectedColumns(columnToAdd); // adds the columns
      helper.waitAndClick(listview.showColumnOptionsBtn);
      selectedColumns = await listview.getSelectedColummns();
      columnsToExpect.push(...columnToAdd);

      columnsToExpect.forEach(col => {
        expect(selectedColumns).toContain(col);
      });
      listview.cancelBtnColumnDialog.click();
      colHeaders = await listview.getColumnHeadersByApp(appName.programNavigator);

      columnsToExpect.forEach(col => {
        expect(colHeaders).toContain(col);
      });
      helper.waitAndClick(listview.showColumnOptionsBtn); // open column options dialog

      expect(listview.getSelectedColummns()).toEqual(colHeaders);
    });
    it('should be able to rearrange columns', async () => {
      const selectedColumnsBefore = await listview.getSelectedColummns();
      const columnData = {
        columnName: selectedColumnsBefore[selectedColumnsBefore.length - 1],
        direction: 'up',
        count: 2
      };
      listview.moveSelectedColumn(columnData);

      const selectedColumnsAfter = await listview.getSelectedColummns();
      listview.okBtnColumnDialog.click();
      listview.waitForSpinner();

      const columnHeaders = await listview.getColumnHeadersByApp(appName.programNavigator);
      expect(columnHeaders).toEqual(selectedColumnsAfter);

    });
    it('should be able to remove a column', async () => {
      helper.waitAndClick(listview.showColumnOptionsBtn);
      const countToRemove = 2;
      const selectedColumnsBefore = await listview.getSelectedColummns();
      const columnToRemove = util.getRandomFromArrayMultiple(selectedColumnsBefore, countToRemove);

      listview.removeColumns(columnToRemove);

      const selectedColumnsAfter = await listview.getSelectedColummns();
      expect(selectedColumnsBefore.length - countToRemove).toEqual(selectedColumnsAfter.length);

      listview.okBtnColumnDialog.click();
      listview.waitForSpinner();

      const columnHeaders = await listview.getColumnHeadersByApp(appName.programNavigator);
      expect(columnHeaders).toEqual(selectedColumnsAfter);
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

function setSelectedColumns(columnToAdd) {
  listview.setSelectedColumns(columnToAdd);
  listview.okBtnColumnDialog.click();
  listview.waitForSpinner();
}

function generateLineItemData() {
  return {
    assetName: '',
    attributes: [
      { name: 'Tags', dataType: listview.dataTypes.tag, value: [`${casual.word}Tag`, `${casual.word}Tag`] },
      { name: 'testAutoString', dataType: listview.dataTypes.string, value: `${casual.word}String` },
      { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: casual.double(1, 2000) },
      { name: 'testAutoInt', dataType: listview.dataTypes.int, value: `${casual.integer(1, 1000)}` },
      { name: 'testAutoList', dataType: listview.dataTypes.list, value: `List3` },
      { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
      { name: 'testAutoDate', dataType: listview.dataTypes.date, value: helper.formatDateTime(`02/08/2017`, `02:45`) }
    ]
  };
}

function formatDateTimeToAssert(dateTime: Date) {
  return (dateTime.getMonth() + 1) + '/' + dateTime.getDate() + '/' + dateTime.getFullYear()
    + ', ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':00'
    + ' ' + (dateTime.getHours() >= 12 ? 'PM' : 'AM');

}

function setFilterInLine() {

}



function inputInlineValues() {

}
