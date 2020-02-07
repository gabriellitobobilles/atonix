/**
 * maps test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, $$, ElementArrayFinder, ElementFinder } from 'protractor';
import { MilestoneType, MilestoneStatus, LineItemBatchEditInterface } from '../../helpers/interface';
import * as casual from 'casual';
import { MapPage } from '../../page/features/map.po';
import { TimeSliderPage } from '../../page/features/timeSlider.po';

const mapPage = new MapPage();
const timeSliderPage = new TimeSliderPage();

const listview = new Pages.Listview();
const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'SEKOIA Demo Clients',
  // child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022', 'P4 - 14th Street']
  child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
let mapHoverDetails: any;

interface LineItemInterface { assetName: string; attributes: Array<{ name: string; value: string; dataType: string; }>; }

const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
const newQuickSearchColumn = Object.create(newQuickSearch);
const tempDate = casual.date(`MM/DD/${casual.integer(2001, 2019)}`);

const lineItemData: LineItemBatchEditInterface = {
  numOfAssets: 1,
  assetNames: [],
  nonSchedule: [],
  schedule: [{
    milestoneType: MilestoneType.Plan,
    milestoneStatus: MilestoneStatus.Engineering,
    milestoneValue: tempDate
  }],
};

let convertDate = lineItemData.schedule[0].milestoneValue;
// convertDate = convertDate.substr(1, convertDate.length - 5) + convertDate.slice(-2);

convertDate = formatDateTimeAddZero(convertDate.split('/')[0], false) + '/'
  + formatDateTimeAddZero(convertDate.split('/')[1], false) + '/'
  + convertDate.slice(-2);

describe('Program Navigator Maps - Change Status PLAN', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.lists);
    listview.createQuickSearch(newQuickSearchColumn);
    lineItemData.assetNames = await getRandomAssets();
  });
  it(`update schedule with value ${lineItemData.schedule[0].milestoneValue}`, async () => {
    listview.batchEdit(lineItemData);
    const expectNewMilestoneValue = await listview.getAttributeByColumnAndAsset(lineItemData.assetNames[0],
      `${MilestoneStatus[lineItemData.schedule[0].milestoneStatus]} PLAN`, true).getText();

    expect(expectNewMilestoneValue).toEqual(lineItemData.schedule[0].milestoneValue);

    /**
     * as a workaround for a column filter / search filter bug not able to search
     * special characters with [ ]. Check assetname and get asset number
     */
    let searchTermFilter;
    if (lineItemData.assetNames[0].includes('[')) {
      const assetName = lineItemData.assetNames[0];
      searchTermFilter = assetName.slice(assetName.indexOf('[') + 1, assetName.indexOf(']'));
      searchTermFilter = `*${searchTermFilter}*`;
    } else { searchTermFilter = lineItemData.assetNames[0]; }
    newQuickSearchColumn.searchTerm = `asset=${searchTermFilter}`;

    listview.modifySearchFilter(newQuickSearchColumn);
    listview.saveQuickSearchFn(newQuickSearchColumn);
    // listview.saveListFn(false);
    browser.refresh();
    helper.waitAndClick(listview.quickSearchDropdownBtn, 30000);
    listview.selectQuickSearchFromDropdown(newQuickSearchColumn.searchName);
  });
  it(`move slider to test date: ${removeZeroInDate(convertDate)}`, async () => {
    user.openTab(tabNames.map);
    timeSliderPage.selectDateFromCalendar(new Date(lineItemData.schedule[0].milestoneValue));
    helper.waitForVisible(mapPage.svgCircles.get(0), 30000);

    const sliderDate = await timeSliderPage.getSliderDateValue();
    expect(removeZeroInDate(convertDate)).toContain(sliderDate.split(' ')[0],
      `Test Date is does not match date in slider ${sliderDate}`);
  });
  it('verify asset milestone is updated in Maps - hover details', async () => {
    mapPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
    mapHoverDetails = await programNavigatorPage.getMapHoverMilesStone();

    const milestoneToExpect = mapHoverDetails.filter(p => p.milestoneName === 'Engineering');
    expect(milestoneToExpect.length).toEqual(1);

    expect(milestoneToExpect[0].planned)
      .toEqual(convertDate);
  });
  it('verify asset milestone is updated in Maps - Info Tray', async () => {
    programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0)); browser.sleep(2000);
    programNavigatorPage.infoTrayTabHeaders.chart.click();
    const infoTrayMilestone = await programNavigatorPage.getMapInfoTrayChart();

    expect(mapHoverDetails).toEqual(infoTrayMilestone);
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
      add: [],
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

async function getRandomAssets() {
  const randomAssetNames: string[] = [];
  let tempAssetName: string;
  for (let index = 0; index < lineItemData.numOfAssets; index++) {
    tempAssetName = await util.getRandomFromArray(
      helper.removeItemFromArrayByValue(await listview.getColumnItemsByColName('Asset'), randomAssetNames));
    console.log(`tempAssetName::: `, tempAssetName);
    randomAssetNames.push(tempAssetName);
  }
  return randomAssetNames;
}

function formatDateTimeAddZero(dateTime: string, plusOne = true) {
  // this is different from the function in the helper class
  // this checks if there are 2 characters ex: 01, 20, 09
  return plusOne ? (dateTime.length < 2 ? ('0' + (dateTime + 1)) : dateTime + 1)
    : (dateTime.length < 2 ? ('0' + (dateTime)) : dateTime);
}


function removeZeroInDate(date: string) {
  const tDate = date.split('/');
  let returnDate = '';
  for (let index = 0; index < 2; index++) {
    returnDate = tDate[index].length === 2 && tDate[index].includes('0') ?
      returnDate + tDate[index].slice(-1) : returnDate + tDate[index];

    returnDate = returnDate + '/';
  }
  return returnDate + tDate[2];
}
