/**
 * Listview test for Program Navigator
 */
import fs = require('fs');

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import * as casual from 'casual';
import { Listview } from '../../page/listview.po';
import { LineItemBatchEditInterface, AttributeTypesEnum } from '../../helpers/interface';
import * as _ from 'lodash';
import { browser } from 'protractor';

const listview = new Listview();
const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  // parent: 'SEKOIA Demo Clients',
  // child: ['UGM Historical Reliability Plan']
  parent: automationAssetData.clientGroup,
  child: ['Test: Create Role']
  // child: [automationAssetData.clientName]
};

interface LineItemInterface { assetName: string; attributes: Array<{ name: string; value: string; dataType: string; }>; }

const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = programNavigatorPage.getTabNames();
const newQuickSearchColumn = Object.create(newQuickSearch);

const dateTime = getRandomAttributeDate();
const lineItemData: LineItemBatchEditInterface = {
  numOfAssets: 1,
  assetNames: [],
  nonSchedule: [
    {
      attributeName: casual.word + `_TEXT_` + casual.date(),
      value: casual.string,
      type: AttributeTypesEnum['Freeform Text']
    },
    {
      attributeName: casual.word + `_INTEGER_` + casual.date(),
      value: 123,
      type: AttributeTypesEnum.Integer
    },
    {
      attributeName: casual.word + `_FLOAT_` + casual.date(),
      value: 123.45,
      type: AttributeTypesEnum.Float,
      attributeOption: 2
    },
    {
      attributeName: casual.word + `_LIST_` + casual.date(),
      value: 'List3',
      type: AttributeTypesEnum['Discrete List'],
      attributeOption: 'List1;List2;List3;List4;List5'
    },
    {
      attributeName: casual.word + `_BOOLEAN_` + casual.date(),
      value: true,
      type: AttributeTypesEnum.Boolean,
    },
    {
      attributeName: casual.word + `_DATE_` + casual.date(),
      value: {
        dateValue: dateTime.date,
        timeValue: dateTime.timeWithAMPM
      },
      type: AttributeTypesEnum.Date,
    },
  ],
  schedule: [],
};
let columnHeadersBefore;

describe('List view Batch Edit Asset Info', () => {
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
    columnHeadersBefore = await listview.getColumnHeadersByApp(appName.programNavigator);
    listview.selectLineItemChkBox(lineItemData.assetNames);
    expect(listview.editSelectedBtn.getText()).toContain(`Edit Selected (${lineItemData.numOfAssets})`);
  });
  it('Batch Edit Asset Info window should display', async () => {
    helper.clickAndWaitForVisible(listview.editSelectedBtn, listview.batchEditWindow);
    expect(listview.batchEditCounter.getText()).toContain(`(${lineItemData.numOfAssets})`,
      `Selected asset should be equal to ${lineItemData.numOfAssets}`);

    columnHeadersBefore.push(...lineItemData.nonSchedule.map(p => p.attributeName).sort());
  });
  lineItemData.nonSchedule.forEach(attribute => {
    it(`should be able to add attribute type: ${AttributeTypesEnum[attribute.type]} and display properly in batch edit`, async () => {
      listview.batchEditAddAttributeTxt.sendKeys(attribute.attributeName);
      browser.sleep(1000);
      listview.batchEditAddAttributeBtn.click();
      helper.waitForVisible(listview.modalWindow);
      listview.setAttributeValue(attribute);

      if (attribute.type === AttributeTypesEnum['Discrete List']) {
        expect(listview.attributeValueList.$$(`option`).getText()).toEqual(attribute.attributeOption.split(';'));
      }

      listview.setAttributeValueOkBtn.click();

      expect(listview.getColumnItemsByColName('Attribute', false, true)).toContain(attribute.attributeName);
      if (attribute.type === AttributeTypesEnum.Date) {
        const splitTime = attribute.value.timeValue.split(':');
        // const timeToExpect = helper.formatDateTimeAddZero(Number(splitTime[0]) - 12, false) + ':' + splitTime[1] + ':' +
        //   splitTime[2];
        const timeToExpect = '1:14:15 PM';

        expect(listview.getAttributeValueByAssetBatchEdit(attribute.attributeName))
          .toEqual(`${attribute.value.dateValue.toLocaleDateString()}, ${timeToExpect}`);
      } else {
        expect(listview.getAttributeValueByAssetBatchEdit(attribute.attributeName)).toEqual(`${attribute.value}`);
      }
    });
  });
  // lineItemData.nonSchedule.forEach(attribute => {
  //   it(`modify attribute type: ${AttributeTypesEnum[attribute.type]} value in batch edit`, async () => {
  //     listview.batchEditAddAttributeTxt.sendKeys(attribute.attributeName);
  //     browser.sleep(1000);
  //     listview.batchEditAddAttributeBtn.click();
  //     helper.waitForVisible(listview.modalWindow);
  //     listview.setAttributeValue(attribute);

  //     if (attribute.type === AttributeTypesEnum['Discrete List']) {
  //       expect(listview.attributeValueList.$$(`option`).getText()).toEqual(attribute.attributeOption.split(';'));
  //     }

  //     listview.setAttributeValueOkBtn.click(); browser.sleep(1000);
  //     expect(listview.getColumnItemsByColName(`Attribute`, true, true)).toContain(attribute.attributeName);
  //     // console.log(`getAttributeValueByAssetBatchEdit:::: `, await listview.getAttributeValueByAssetBatchEdit());
  //     await listview.getAttributeValueByAssetBatchEdit();
  //   });
  // });

  it('attribute should appear in listview as columns', async () => {
    listview.batchEditSaveBtn.click(); // click Save Changes to save new attribute
    listview.waitForSpinner();
    const colHeaders = await listview.getColumnHeadersByApp(appName.programNavigator);
    expect(colHeaders).toEqual(columnHeadersBefore);
  });
  it('attribute values should appear correctly in listview', async () => {
    for (const assetName of lineItemData.assetNames) {
      lineItemData.nonSchedule.forEach(async item => {
        if (item.type === AttributeTypesEnum.Boolean) {
          expect(listview.getRowBoolean(assetName)).toEqual(`${item.value}`);
        } else if (item.type === AttributeTypesEnum.Date) {
          const timeToExpect = '1:14:15 PM';
          // item.value.timeValue
          expect(listview.getAttributeByColumnAndAsset(assetName, item.attributeName, false).getText())
            .toEqual(`${item.value.dateValue.toLocaleDateString()}, ${timeToExpect}`);
        } else {
          expect(listview.getAttributeByColumnAndAsset(assetName, item.attributeName, false).getText())
            .toEqual(`${item.value}`);
        }
      });
    }
  });
});

function generateQuickSearch() {
  return {
    searchName: casual.word + (new Date().getTime()),
    searchTerm: `asset=*`,
    schedule: {
      scheduled: false, // set this to false if non-scheduled
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

function getRandomAttributeDate() {
  const date = new Date(casual.date(`MM/DD/${casual.integer(2001, 2019)}`));
  date.setHours(1); date.setMinutes(15); date.setSeconds(24); date.setMilliseconds(84);
  const timeWithAMPM = '13:14:15';
  // return {
  //   date, timeWithAMPM: {
  //     hrs: date.getHours(),
  //     min: date.getMinutes(),
  //     sec: date.getSeconds(),
  //     ms: date.getMilliseconds(),
  //     ampm: date.toLocaleTimeString().split(' ')[1]
  //   }
  // };
  return {
    date, timeWithAMPM
  };
}

