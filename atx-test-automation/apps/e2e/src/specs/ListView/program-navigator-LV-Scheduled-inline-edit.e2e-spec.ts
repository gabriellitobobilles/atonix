/**
 * Listview test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, protractor, ElementFinder } from 'protractor';
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
const lineItemData = generateLineItemData();

const newQuickSearchColumn = Object.create(newQuickSearch);

describe('SCHEDULED Test - Inline Edit', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.lists);
    listview.createQuickSearch(newQuickSearchColumn);
    listview.saveQuickSearchFn(newQuickSearchColumn);
  });
  it('update a schedule column', async () => {
    lineItemData.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
    listview.editInLineAttributeSchedule(lineItemData);
    listview.saveListFn(); // save to refresh the list

    lineItemData.attributes.forEach(async attr => {
      const attributValue = await listview.getAttributeByColumnAndAsset(lineItemData.assetName, attr.name, true).getText();
      const d = new Date(attr.value); // due to time different dates will be + 1. ex: 11/23/2019 will be 11/24/2019
      const date1 = `${helper.formatDateTimeAddZero(d.getMonth())}/` +
        `${helper.formatDateTimeAddZero(d.getDate(), false)}/${d.getFullYear()}`;
      const date2 = `${helper.formatDateTimeAddZero(d.getMonth())}/` +
        `${helper.formatDateTimeAddZero(d.getDate() - 1, false)}/${d.getFullYear()}`;
      expect([date1, date2]).toContain(attributValue);
    });
  });
  it('clear schedule data and pop confirmation pop up', async () => {
    lineItemData.attributes[0].value = null;
    lineItemData.attributes[1].value = null;
    inputSchedule();
    const alertText = await helper.getAlert().getText();
    acceptAlert();
    listview.saveListFn(); // save to refresh the list
    lineItemData.attributes.forEach(attr => {
      const attributValue = listview.getAttributeByColumnAndAsset(lineItemData.assetName, attr.name, true).getText();
      expect(attributValue).toEqual(attr.value === null ? '' : attr.value);
      expect(alertText.toUpperCase()).toContain(`${lineItemData.assetName} - ${attr.name}`.toUpperCase());
    });
  });
  // it('invalid values / date', async () => {
  //   lineItemData.attributes[0].value = `111/34/3000`;
  //   lineItemData.attributes[1].value = `11/11/2011`;
  //   lineItemData.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
  //   // listview.editInLineAttributeSchedule(lineItemData);
  //   inputSchedule();
  //   // const alertText = await helper.getAlert().getText();
  //   // console.log(`alertText: `, alertText);
  //   // acceptAlert();

  //   browser.sleep(10000);
  // });
});

function acceptAlert() {
  helper.getAlert().accept();
  listview.waitForSpinner();
}

function inputSchedule() { // used this since editInLineAttributeSchedule() is complete input user wf
  const lineItemRowElem: ElementFinder = listview.getInLineRowItem(lineItemData.assetName);
  listview.clickInLineItemEditBtn(lineItemRowElem);
  listview.setInLineAttribute(lineItemRowElem, lineItemData.attributes);
  helper.clickAndSleep(lineItemRowElem.$(`[title="Save"]`));
  helper.waitForAlert();
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

function generateLineItemData() {
  return {
    assetName: '',
    attributes: [
      { name: `NOT STARTED PLAN`, value: casual.date(`MM/DD/YYYY`), dataType: listview.dataTypes.scheduleDate },
      { name: `MITIGATION PLAN PLAN`, value: casual.date(`MM/DD/YYYY`), dataType: listview.dataTypes.scheduleDate },
    ]
  };
}
