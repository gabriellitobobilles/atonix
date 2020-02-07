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
  parent: 'SEKOIA Demo Clients',
  child: ['UGM Historical Reliability Plan']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
let columnsToExpect: any;
// describe('List view - Scheduled Test', () => {
describe('List view - SCHEDULE Column Options', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  it('should verify Selected Columns are present in column options dialog', async () => {
    user.openTab(tabNames.lists);
    const newQuickSearchColumn = Object.create(newQuickSearch);
    listview.createQuickSearch(newQuickSearchColumn);

    util.scrollToView(listview.listHeader.get(await listview.listHeader.count() - 1));
    const colHeaders = listview.formatScheduleColumnHeaders(
      await listview.getColumnHeadersScheduled(appName.programNavigator, false) as string[]);
    // const colHeaders = listview.getColumnHeadersByApp(appName.programNavigator);

    listview.showColumnOptionsBtn.click();
    const selectedColumns = listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any);
    colHeaders.splice(0, 3);
    colHeaders.shift(); selectedColumns.shift();

    expect(selectedColumns).toEqual(colHeaders);
  });
  it('should be able to rearrange columns', async () => {
    const selectedColumnsBefore = await listview.getSelectedColummns();
    const columnData = {
      columnName: selectedColumnsBefore[selectedColumnsBefore.length - 1],
      direction: 'up',
      count: 2
    };
    listview.moveSelectedColumn(columnData);

    const selectedColumnsAfter = listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any);
    listview.okBtnColumnDialog.click();
    listview.waitForSpinner();

    const columnHeaders = listview.formatScheduleColumnHeaders(
      await listview.getColumnHeadersScheduled(appName.programNavigator) as string[]);
    columnHeaders.splice(0, 3);
    selectedColumnsAfter.shift(); columnHeaders.shift();

    expect(columnHeaders).toEqual(selectedColumnsAfter);
  });
  it('should be able to remove a column', async () => {
    helper.waitAndClick(listview.showColumnOptionsBtn);
    const countToRemove = 5;
    const selectedColumnsBefore = await listview.getSelectedColummns();
    const columnToRemove = util.getRandomFromArrayMultiple(selectedColumnsBefore, countToRemove);

    listview.removeColumns(columnToRemove);

    const selectedColumnsAfter = listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any);
    expect(selectedColumnsBefore.length - countToRemove).toEqual(selectedColumnsAfter.length);

    listview.okBtnColumnDialog.click();
    listview.waitForSpinner();

    const columnHeaders = listview.formatScheduleColumnHeaders(
      await listview.getColumnHeadersScheduled(appName.programNavigator) as string[]);
    columnHeaders.splice(0, 3);
    expect(columnHeaders).toEqual(selectedColumnsAfter);
  });
  it('should be able to add new column SCHEDULE and Non-Schedule', async () => {
    listview.showColumnOptionsBtn.click();
    const availableColumns = await listview.getAvailableColumns(); // get columns items in column options dialog
    let selectedColumns: any = await listview.getSelectedColummns();
    columnsToExpect = selectedColumns;
    let columnToAdd = [];
    let columnToAddTemp: any;

    columnToAdd.push(util.getRandomFromArray(helper.removeItemFromArrayByValue(availableColumns, selectedColumns)));

    setSelectedColumns(columnToAdd);
    columnsToExpect.push(...columnToAdd);
    columnsToExpect = columnsToExpect.map(e => e.toUpperCase());
    let colHeaders: any = listview.formatScheduleColumnHeaders(
      await listview.getColumnHeadersScheduled(appName.programNavigator) as string[]);
    colHeaders.splice(0, 3);
    expect(colHeaders).toEqual(columnsToExpect);

    helper.waitAndClick(listview.showColumnOptionsBtn);  // options column options dialog
    selectedColumns = listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any);

    expect(colHeaders).toEqual(selectedColumns);
    columnToAdd = [];

    columnToAddTemp = selectedColumns; // This part gathers columns to be added
    // Add additional columns
    columnToAdd.push(
      util.getRandomFromArray(helper.removeItemFromArrayByValue(await listview.getAvailableColumns(),
        columnToAddTemp)));
    columnToAddTemp.push(...columnToAdd);
    columnToAdd.push(
      util.getRandomFromArray(helper.removeItemFromArrayByValue(await listview.getAvailableColumns(),
        columnToAddTemp)));

    setSelectedColumns(columnToAdd); // adds the columns
    helper.waitAndClick(listview.showColumnOptionsBtn);
    selectedColumns = listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any);
    columnsToExpect.push(...columnToAdd);

    columnsToExpect.forEach(col => {
      expect(selectedColumns).toContain(col.toUpperCase());
    });
    listview.cancelBtnColumnDialog.click();
    colHeaders = listview.formatScheduleColumnHeaders(
      await listview.getColumnHeadersScheduled(appName.programNavigator) as string[]);
    colHeaders.splice(0, 3);
    columnsToExpect.forEach(col => {
      expect(colHeaders).toContain(col.toUpperCase());
    });
    helper.waitAndClick(listview.showColumnOptionsBtn); // open column options dialog

    expect(listview.formatScheduleColumnHeaders(await listview.getSelectedColummns() as any)).toEqual(colHeaders);
  });
});
// });

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
    assetOption: listview.assetOptions.applyToSelectedAssetAndAllDescendants,
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
