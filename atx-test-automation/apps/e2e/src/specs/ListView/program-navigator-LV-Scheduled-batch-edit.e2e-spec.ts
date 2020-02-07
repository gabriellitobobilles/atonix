/**
 * Listview test for Program Navigator
 */
import fs = require('fs');

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, protractor, ElementFinder } from 'protractor';
import * as casual from 'casual';
import { Listview } from '../../page/listview.po';
import { MilestoneType, MilestoneStatus, LineItemBatchEditInterface } from '../../helpers/interface';
import * as _ from 'lodash';

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

interface LineItemInterface { assetName: string; attributes: Array<{ name: string; value: string; dataType: string; }>; }

const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
const newQuickSearchColumn = Object.create(newQuickSearch);

const lineItemData: LineItemBatchEditInterface = {
  numOfAssets: 2,
  assetNames: [],
  nonSchedule: [],
  schedule: [{
    milestoneType: MilestoneType.Plan,
    milestoneStatus: MilestoneStatus.Engineering,
    milestoneValue: casual.date(`MM/DD/YYYY`)
  }],
};
let milestoneValuesFromList: Array<{
  assetName: string,
  milestone: Array<{ column: string, type: string, value: string }>
}>;

describe('List view SCHEDULED Test - Batch Edit', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.lists);
    listview.createQuickSearch(newQuickSearchColumn);
    // listview.saveQuickSearchFn(newQuickSearchColumn);
  });
  it('select multiple assets (checkbox) and counter display correctly', async () => {
    // this gets random assets from list view and stores in an string[]
    lineItemData.assetNames = await getRandomAssets();

    milestoneValuesFromList = await listview.getScheduleDataFromList(lineItemData.assetNames);
    console.log(`milestoneValuesFromList::: `, JSON.stringify(milestoneValuesFromList));
    listview.selectLineItemChkBox(lineItemData.assetNames);
    expect(listview.editSelectedBtn.getText()).toContain(`Edit Selected (${lineItemData.numOfAssets})`);
    browser.sleep(2000);
  });

  it('batch edit window should display Milestone values ', async () => {
    helper.clickAndWaitForVisible(listview.editSelectedBtn, listview.batchEditWindow);
    expect(listview.batchEditCounter.getText()).toContain(`(${lineItemData.numOfAssets})`);

    helper.waitForElementClickable(listview.batchEditScheduleTab);
    browser.sleep(3000); helper.waitAndClick(listview.batchEditScheduleTab, 5000);
    // helper.clickAndSleep(listview.batchEditScheduleTab, 3000);
    helper.waitForElementClickable(listview.batchEditScheduleTab, 10000);

    const milestoneBatchValues = await listview.getBatchEditScheduleValues();
    const expectedBatchEditScheduleValues = getExpectedBatchScheduleValues(milestoneBatchValues);
    expect(expectedBatchEditScheduleValues).toEqual(milestoneBatchValues);
  });
  it('should be able to Update schedule', async () => {
    for (const schedule of lineItemData.schedule) {
      listview.setBatchEditScheduleDate(schedule.milestoneType, schedule.milestoneStatus, schedule.milestoneValue);
    }

    listview.batchEditSaveBtn.click();
    helper.waitForVisibleAndDisappear(listview.progressBar);

    const updatedMilestoneValueFromList = await listview.getScheduleDataFromList(lineItemData.assetNames);
    // console.log(`updatedMilestoneValueFromList:::: `, JSON.stringify(updatedMilestoneValueFromList));
    expect(updatedMilestoneValueFromList).not.toEqual(milestoneValuesFromList);
  });
});

function acceptAlert() {
  helper.getAlert().accept();
  listview.waitForSpinner();
}

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

function generateLineItemData() {
  return {
    assetName: '',
    attributes: [
      { name: `NOT STARTED PLAN`, value: casual.date(`MM/DD/YYYY`), dataType: listview.dataTypes.scheduleDate },
      { name: `testAutoString`, value: 'TestString', dataType: listview.dataTypes.string },
      { name: `MITIGATION PLAN PLAN`, value: casual.date(`MM/DD/YYYY`), dataType: listview.dataTypes.scheduleDate }
    ]
  };
}

function getExpectedBatchScheduleValues(milestoneBatchValues) {
  const expectedBatchEditScheduleValues = [];
  milestoneBatchValues.forEach(milestone => {
    const indexOfMilestone = milestoneBatchValues.indexOf(milestone);
    const value = milestoneValuesFromList[0].milestone[indexOfMilestone].value;
    const ms = {
      milestone: [{
        column: milestone.column,
        type: milestone.type,
        value
      }]
    };
    const result = _.filter(milestoneValuesFromList, ms);
    let batchValue;
    if (result.length < milestoneValuesFromList.length) {
      batchValue = '(Multiple Values)';
    } else if (result.length === milestoneValuesFromList.length) {
      batchValue = value;
    }
    const expectedMilestoneValues = {
      column: milestone.column,
      type: milestone.type,
      value: batchValue
    };
    expectedBatchEditScheduleValues.push(expectedMilestoneValues);
  });

  return expectedBatchEditScheduleValues;
}
