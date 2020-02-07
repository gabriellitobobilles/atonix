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
import { MilestoneType, MilestoneStatus, LineItemBatchEditInterface, AttributeTypesEnum } from '../../helpers/interface';
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

const dateTime = getRandomAttributeDate();
const lineItemData: LineItemBatchEditInterface = {
  numOfAssets: 2,
  assetNames: [],
  nonSchedule: [
    {
      attributeName: casual.word + `_TEXT_` + casual.date(), value: casual.string, type: AttributeTypesEnum['Freeform Text']
    },
    // {
    //   attributeName: casual.word + `_INTEGER_` + casual.date(), value: 123, type: AttributeTypesEnum.Integer
    // },
    // {
    //   attributeName: casual.word + `_FLOAT_` + casual.date(), value: 123.45, type: AttributeTypesEnum.Float, attributeOption: 2
    // },
    // {
    //   attributeName: casual.word + `_LIST_` + casual.date(), value: 'List3', type: AttributeTypesEnum['Discrete List'],
    //   attributeOption: 'List1;List2;List3;List4;List5'
    // },
    // {
    //   attributeName: casual.word + `_BOOLEAN_` + casual.date(), value: true, type: AttributeTypesEnum.Boolean,
    // },
    // {
    //   attributeName: casual.word + `_DATE_` + casual.date(),
    //   value: {
    //     dateValue: dateTime.date,
    //     timeValue: dateTime.timeWithAMPM
    //   },
    //   type: AttributeTypesEnum.Date,
    // },
  ],
  schedule: [{
    milestoneType: MilestoneType.Plan,
    milestoneStatus: MilestoneStatus.Engineering,
    milestoneValue: casual.date(`MM/DD/YYYY`)
  }],
};

describe('List view - Batch Edit', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.lists);
    listview.createQuickSearch(newQuickSearchColumn);
    // listview.saveQuickSearchFn(newQuickSearchColumn);
  });

  it('should be successfully Batch Edit - NonSchedule and Scheduled', async () => {
    lineItemData.assetNames = await getRandomAssets();
    listview.batchEdit(lineItemData);
    expect(listview.getToastMessage()).toEqual(`Changes saved successfully`);
    listview.waitForSpinner();
  });
  it('verify schedule and attribute displayed correctly in Listview', async () => {
    const columnName = MilestoneStatus[lineItemData.schedule[0].milestoneStatus]
      + ' ' + MilestoneType[lineItemData.schedule[0].milestoneType];
    const updatedMilestoneInList = [];
    for (const assetName of lineItemData.assetNames) {
      const temp = await listview.getAttributeByColumnAndAsset(assetName, columnName, true).getText();
      const datesToExpect = getDatesToExpect();
      expect([datesToExpect.date1, datesToExpect.date2]).toContain(temp); // Due to time zone. List view displays -1 day
      updatedMilestoneInList.push(temp);
    }
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

function getRandomAttributeDate() {
  const date = new Date(casual.date(`MM/DD/${casual.integer(2001, 2019)}`));
  date.setHours(1); date.setMinutes(15); date.setSeconds(24); date.setMilliseconds(84);
  const timeWithAMPM = '13:14:15';

  return {
    date, timeWithAMPM
  };
}

function getDatesToExpect() {
  const d = new Date(lineItemData.schedule[0].milestoneValue);
  const date1 = `${helper.formatDateTimeAddZero(d.getMonth())}/` +
    `${helper.formatDateTimeAddZero(d.getDate(), false)}/${d.getFullYear()}`;
  const date2 = `${helper.formatDateTimeAddZero(d.getMonth())}/` +
    `${helper.formatDateTimeAddZero(d.getDate() - 1, false)}/${d.getFullYear()}`;

  return { date1, date2 };
}
