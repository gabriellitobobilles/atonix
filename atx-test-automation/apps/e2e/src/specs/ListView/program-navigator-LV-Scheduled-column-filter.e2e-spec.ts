/**
 * Listview test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
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
const newQuickSearchColumn = Object.create(newQuickSearch);
const scheduleBol = true;
let searchTermFilterTemp1;
const columnToFilter1 = `NOT STARTED ACTUAL`;

describe('List view - SCHEDULE - Column filter', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.lists);
    listview.createQuickSearch(newQuickSearchColumn);
  });
  it('filter using correct Asset', async () => {
    const searchTermFilter = `P3 - Ava Avenue & Riverside Drive`;
    const badgeCtrBefore = await listview.badgeCtr.getText();
    listview.setColumnFilterByName('Asset', searchTermFilter);

    expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);

    const newListItems = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
    expect(newListItems).toContain(searchTermFilter);
  });
  it('should not show any result using INCORRECT Asset filter', () => {
    listview.setColumnFilterByName('Asset', 'thisIsNotAValidAssetxxx');
    expect(listview.badgeCtr.getText()).not.toEqual(0);
    listview.clearInLineFilter('Asset');
  });
  it('partial schedule column filter ex: 10/21/', async () => {
    let searchTermFilter1: string = util.getRandomFromArray(await listview.getColumnItemsByColName(columnToFilter1, scheduleBol));
    searchTermFilter1 = searchTermFilter1.substr(0, searchTermFilter1.length - 6);
    const badgeCtrBefore = listview.badgeCtr.getText();

    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);
    // filterResult1 not used as assertions because of time zone difference where 10/1 appears as 10/2
    // const filterResult1 = await listview.getColumnItemsByColName(columnToFilter1, scheduleBol);
    expect(listview.badgeCtr.getText()).toEqual(listview.getScheduleColumnItemCount(columnToFilter1));
    expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);
    listview.clearInLineFilter(columnToFilter1, scheduleBol);

    searchTermFilter1 = util.getRandomFromArray(await listview.getColumnItemsByColName(columnToFilter1, scheduleBol));
    // searchTermFilter1 = searchTermFilter1.substr(2, searchTermFilter1.length - 4);
    searchTermFilter1 = `/10/20`;
    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);
    expect(listview.badgeCtr.getText()).toEqual(listview.getScheduleColumnItemCount(columnToFilter1),
      `Badge counter should be the same as Column Item count for ${columnToFilter1} with searchTerm: ${searchTermFilter1}`);
    expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore,
      `Badge counter before and after should not be equal. Search term: ${searchTermFilter1} for column: ${columnToFilter1} results ` +
      `${await listview.getScheduleColumnItemCount(columnToFilter1)}`);

    listview.clearInLineFilter(columnToFilter1, scheduleBol);
  });
  it('use (*) and null in column filter', async () => {
    listview.setColumnFilterByName(columnToFilter1, `*`, scheduleBol);
    expect(listview.getColumnItemsByColName(columnToFilter1, scheduleBol)).not.toContain(``, `should not contain blank since filter is *`);
    listview.clearInLineFilter(columnToFilter1, scheduleBol);

    const procurementActualColumn = `PROCUREMENT ACTUAL`;
    listview.setColumnFilterByName(procurementActualColumn, `null`, scheduleBol);

    const filterResult1 = await listview.getColumnItemsByColName(procurementActualColumn, scheduleBol);
    filterResult1.forEach(result => expect(result).toEqual(``, `Should be expecting blank since filter is null`));
    expect(listview.getScheduleColumnItemCount(procurementActualColumn))
      .toEqual(`0`, `column item count should be zero since filter is null`);

    listview.clearInLineFilter(procurementActualColumn, scheduleBol);
  });
  it('filter using 1 Schedule Column', async () => {
    const searchTermFilter1 = util.getRandomFromArray(await listview.getColumnItemsByColName(columnToFilter1, scheduleBol));
    listview.setColumnFilterByName(columnToFilter1, searchTermFilter1, scheduleBol);

    const filterResult1 = await listview.getColumnItemsByColName(columnToFilter1, scheduleBol);
    searchTermFilterTemp1 = searchTermFilter1;
    filterResult1.forEach(res => {
      expect(res).toEqual(searchTermFilter1);
    });
  });
  it('filter using multiple (2) Schedule Columns', async () => {
    const columnToFilter2 = `ENGINEERING PLAN`;
    const searchTermFilter2 = util.getRandomFromArray(await listview.getColumnItemsByColName(columnToFilter2, scheduleBol));
    listview.setColumnFilterByName(columnToFilter2, searchTermFilter2, scheduleBol);

    const filterResult2 = await listview.getColumnItemsByColName(columnToFilter2, scheduleBol);

    filterResult2.forEach(res => {
      expect(res).toEqual(searchTermFilter2);
    });
    expect(listview.getColumnItemsByColName(columnToFilter1, scheduleBol)).toContain(searchTermFilterTemp1);
  });
  it('be able to Save list with In-line filter', async () => {
    const listItems = await listview.getColumnItemsByColName('Asset');
    const badgeCtrBefore = listview.badgeCtr.getText();
    listview.saveQuickSearchFn(newQuickSearchColumn);

    expect(listview.getColumnItemsByColName('Asset')).toEqual(listItems);
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
