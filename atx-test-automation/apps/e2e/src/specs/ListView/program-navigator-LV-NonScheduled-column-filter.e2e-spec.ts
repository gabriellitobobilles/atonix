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

const lineItemData = generateLineItemData();
const columnsToAdd = [];
lineItemData.attributes.forEach(attr => {
  if (attr.name !== 'Tags') { columnsToAdd.push(attr.name); }
});
const newQuickSearchColumn = Object.create(newQuickSearch);
describe('Non Scheduled Test', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    await helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  describe('In line filter', () => {
    beforeAll(async () => {
      user.openTab(tabNames.lists);
      listview.createQuickSearch(newQuickSearchColumn);
      listview.showColumnOptionsBtn.click();
      setSelectedColumns(columnsToAdd);
      lineItemData.assetName = await util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
      // lineItemData.assetName = `Feedwater System`;
      listview.editInLineAttribute(lineItemData);
      listview.saveListFn(true);
    });

    it('should filter using correct Asset', async () => {
      const searchTermFilter = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset'));
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
    it('should be able to filter Asset Type', async () => {
      const searchTermFilter = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset Type'));
      const badgeCtrBefore = await listview.badgeCtr.getText();
      listview.setColumnFilterByName('Asset Type', searchTermFilter);

      expect(listview.badgeCtr.getText()).not.toEqual(badgeCtrBefore);

      const newListItems = util.getRandomFromArray(await listview.getColumnItemsByColName('Asset Type'));
      expect(newListItems).toContain(searchTermFilter);
      listview.clearInLineFilter('Asset Type');
    });
    lineItemData.attributes.forEach(attr => {
      const dataTypes = listview.dataTypes;
      const value = returnTrueValue(attr);

      if (attr.dataType !== dataTypes.tag && attr.dataType !== dataTypes.list) {
        it(`should be able to filter ${attr.dataType.toUpperCase()} `, async () => {
          const attribute = lineItemData.attributes.filter(p => p.dataType === attr.dataType)[0];
          listview.setColumnFilterByName(attribute.name, `${value}`);

          if (attr.dataType === dataTypes.boolean) {
            listview.getRowBoolean(lineItemData.assetName).then(bol => {
              expect(bol).toEqual(attr.value.toString());
            });
            // expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(attr.value.toString());
          } else {
            expect(listview.getColumnItemsByColName(attribute.name)).toContain(value);
          }

          listview.clearInLineFilter(attribute.name);
        });
      }
    });
    lineItemData.attributes.forEach(attr => {
      const dataTypes = listview.dataTypes;
      const value = returnTrueValue(attr);

      if (attr.dataType !== dataTypes.tag && attr.dataType !== dataTypes.list
        && attr.dataType !== dataTypes.boolean) {
        const partialValueToFilter = partialValue(value);
        it(`should be able to PARTIAL filter ${attr.dataType.toUpperCase()} `, async () => {
          const attribute = lineItemData.attributes.filter(p => p.dataType === attr.dataType)[0];
          listview.setColumnFilterByName(attribute.name, `${partialValueToFilter}`);

          if (attr.dataType === dataTypes.boolean) {
            expect(listview.getRowBoolean(lineItemData.assetName)).toEqual(attr.value.toString());
          } else {
            expect(listview.getColumnItemsByColName(attribute.name)).toContain(value);
          }

          listview.clearInLineFilter(attribute.name);
        });
      }
    });
    xit('should be able to Save list with In-line filter', async () => {
      const listItems = await listview.getColumnItemsByColName('Asset');
      listview.saveQuickSearchFn(newQuickSearchColumn, true);

      expect(listview.getColumnItemsByColName('Asset')).toEqual(listItems);
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
      { name: 'testAutoFloat', dataType: listview.dataTypes.float, value: `${casual.double(1, 2000)}` },
      { name: 'testAutoInt', dataType: listview.dataTypes.int, value: `${casual.integer(1, 1000)}` },
      { name: 'testAutoList', dataType: listview.dataTypes.list, value: `List3` },
      { name: 'testAutoBoolean', dataType: listview.dataTypes.boolean, value: true },
      {
        name: 'testAutoDate', dataType: listview.dataTypes.date,
        value: helper.formatDateTime(`${casual.date(`MM/DD/YYYY`)}`, `11:12:10`)
      }
    ]
  };
}

function returnTrueValue(attr: { name: string, dataType: string, value: any }) {
  const dataTypes = listview.dataTypes;
  // const value = attr.dataType === dataTypes.float ? parseFloat(attr.value as string).toFixed(2).toString()
  //   : attr.value;
  switch (attr.dataType) {
    case dataTypes.float:
      return parseFloat(attr.value as string).toFixed(2).toString();
    case dataTypes.boolean:
      return attr.value ? `1` : `0`;
    case dataTypes.date:
      const value: Date = attr.value;
      return helper.formatDateTimeToAssert(value);
    default:
      return attr.value;
  }
}

function partialValue(attr: any) {
  return attr.substr(0, attr.length / 2);
}

function setFilterInLine() {

}

function inputInlineValues() {

}
