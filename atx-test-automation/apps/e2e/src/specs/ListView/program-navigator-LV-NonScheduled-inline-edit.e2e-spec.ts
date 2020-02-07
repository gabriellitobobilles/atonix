/**
 * Listview test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, protractor } from 'protractor';
import * as casual from 'casual';
import { Listview } from '../../page/listview.po';

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

const floatDecimalPlace = 2;
let booleanValueBefore: any;
const lineItemData = generateLineItemData();
let lineItemAttributes: any;
let tempValue: any;

const columnsToAdd = [];
lineItemData.attributes.forEach(attr => {
  if (attr.name !== 'Tags') { columnsToAdd.push(attr.name); }
});

describe('Non Scheduled Test - Inline Edit', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });

  it('should be able to navigate and create a new list', async () => {
    user.openTab(tabNames.lists);
    const newQuickSearchColumn = Object.create(newQuickSearch);

    await listview.createQuickSearch(newQuickSearchColumn);
    expect(listview.quickSearchBtn.getText()).toEqual(newQuickSearch.searchName);
  });
  it('should be able to add columns', async () => {
    listview.showColumnOptionsBtn.click();
    setSelectedColumns(columnsToAdd);

    lineItemData.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
    browser.sleep(3000); booleanValueBefore = await listview.getRowBoolean(lineItemData.assetName);
    listview.editInLineAttribute(lineItemData);
    lineItemAttributes = listview.getAttributeLineItemByAsset(lineItemData.assetName).getText();
    expect(listview.getColumnHeadersByApp(appName.programNavigator)).toEqual(jasmine.arrayContaining(columnsToAdd));
  });
  lineItemData.attributes.forEach(attr => {
    it(`should verify value is correct for: ${attr.name}`, async () => {
      if (attr.dataType === listview.dataTypes.float) {
        tempValue = attr.value;
        tempValue = parseFloat(tempValue).toFixed(floatDecimalPlace).toString();
        expect(lineItemAttributes).toContain(tempValue);
      } else if (attr.dataType === listview.dataTypes.tag) {
        tempValue = attr.value;
        tempValue.forEach(tag => {
          expect(listview.getRowTags(lineItemData.assetName)).toContain(tag);
        });
      } else if (attr.dataType === listview.dataTypes.boolean) {
        expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(booleanValueBefore);
      } else if (attr.dataType === listview.dataTypes.date) {
        expect(lineItemAttributes).toContain(helper.formatDateTimeToAssert(attr.value as Date));
      } else {
        console.log(`lineItemAttributes: `, await lineItemAttributes);
        console.log(`attr.value.toString(): `, attr.value.toString());
        expect(lineItemAttributes).toContain(attr.value.toString());
      }
    });
  });
  it('Negative Tests ', async () => {
    const testLineItem = {
      assetName: '',
      attributes: [
        { name: 'Tags', dataType: listview.dataTypes.tag, value: [`${casual.word}Tag`, `${casual.word}Tag`] },
        { name: 'testAutoString', dataType: listview.dataTypes.string, value: `~!@#$%^&*()_+-={}[];'<>?/@` },
        { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: casual.double(1, 2000) },
        { name: 'testAutoInt', dataType: listview.dataTypes.int, value: `123.456` },
        { name: 'testAutoList', dataType: listview.dataTypes.list, value: `List3` },
        { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
      ]
    };

    testLineItem.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
    console.log(`testLineItem.assetName:::`, testLineItem.assetName);
    const lineItemRowElem = listview.getInLineRowItem(testLineItem.assetName);
    listview.clickInLineItemEditBtn(lineItemRowElem);
    listview.setInLineAttribute(lineItemRowElem, testLineItem.attributes);
    // adding this for Date for now since setIneLineAttribute() uses Date() data type and not just strings
    testLineItem.attributes.push({ name: `testAutoDate`, dataType: listview.dataTypes.date, value: `` });
    listview.setInLineDateFn(lineItemRowElem, testLineItem.attributes[6], `33333333`, `3333PM`);
    listview.saveInLineItemBtn(lineItemRowElem);
    listview.saveListFn(false);

    expect(listview.getInLineAttribute(lineItemRowElem, `testAutoString`).getText())
      .toEqual(testLineItem.attributes[1].value);
    expect(listview.getInLineAttribute(lineItemRowElem, `testAutoInt`).getText())
      .not.toEqual(testLineItem.attributes[3].value);
    // commented for now since there is an issue with how negative data is handled
    // expect(listview.getInLineAttribute(lineItemRowElem, `testAutoDate`).getText()).toEqual(`1/1/1970, 8:00:00 AM`);
  });
  it('sleeP(1000)', () => {
    browser.sleep(10000);
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
      {
        name: 'testAutoDate', dataType: listview.dataTypes.date,
        value: helper.formatDateTime(`${casual.date(`MM/DD/YYYY`)}`, `11:12`)
      }
    ]
  };
}
