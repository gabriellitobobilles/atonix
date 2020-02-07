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
import { AssetEventsViewEnum, EventTypesEnum } from '../../helpers/interface';

const listview = new Listview();
const user = new User();
const riskAssessmentPage = new Pages.RskAssessment();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'RA Testing',
  child: ['Distributed Asset Example Data', 'Division 1',
    'District 1', 'Substation 1', 'Feeder 1']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
const newQuickSearch = generateQuickSearch();
newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
const tabNames = riskAssessmentPage.getTabNames();
const eventsColumns = ['Actual Start Date', 'Actual End Date', 'Planned Start Date', 'Planned End Date'];

describe('List view - Events', () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.riskAssessment);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.riskAssessment);
  });
  describe('Column Options - Events Column Type', () => {
    it('should verify Selected Columns are present in column options dialog', async () => {
      user.openTab(tabNames.lists);
      const newQuickSearchColumn = Object.create(newQuickSearch);
      listview.createQuickSearch(newQuickSearchColumn);
      const colHeaders = await listview.getColumnHeadersByApp(appName.riskAssessment);
      listview.showColumnOptionsBtn.click();
      const selectedColumns = await listview.getSelectedColummns();

      expect(colHeaders).toEqual(selectedColumns);
    });
    it('should switch to Events column type', async () => {
      listview.selectColumnType(listview.columnTypes.events);
      const availableColumns = await listview.getAvailableColumns();
      expect(listview.columnTypeDropDown.$(`[label="${listview.columnTypes.events}"]`).isSelected())
        .toBeTruthy();
      eventsColumns.forEach(columns => {
        expect(availableColumns).toContain(columns);
      });
    });
    it('should select to SHOW EVENTS VIEW option', () => {
      listview.setShowAssetEventsViewOption(AssetEventsViewEnum.events);
      expect(listview.showAssetEventsViewOption.get(1).isSelected()).toBeTruthy();
      expect(listview.getSelectedColummns()).toContain('Event Type');
    });
    it('should display EVENT TYPES', () => {
      expect(listview.availableEventTypes.isDisplayed()).toBeTruthy();
      expect(listview.getEventType(EventTypesEnum.Fault).isDisplayed()).toBeTruthy();
      expect(listview.getEventType(EventTypesEnum.Inspection).isDisplayed()).toBeTruthy();
      expect(listview.getEventType(EventTypesEnum.Outage).isDisplayed()).toBeTruthy();
    });
    it('should set FAULT event (Actual and Planned columns) and display in List View', async () => {
      const eventsObjArr = [
        { event: EventTypesEnum.Fault, checkbox: true, },
        { event: EventTypesEnum.Inspection, checkbox: false },
        { event: EventTypesEnum.Outage, checkbox: false }
      ];
      setEventTypeAndColumns(eventsObjArr);
      eventsColumns.forEach(eventColumn => {
        expect(listview.getColumnHeadersByApp(appName.riskAssessment)).toContain(eventColumn);
      });
      expect(listview.getColumnItemsByColName('Event Type')).toContain(EventTypesEnum[EventTypesEnum.Fault]);
    });
    it('should set INSPECTION event (Actual and Planned columns) and display in List View', async () => {
      const eventsObjArr = [
        { event: EventTypesEnum.Fault, checkbox: false, },
        { event: EventTypesEnum.Inspection, checkbox: true },
        { event: EventTypesEnum.Outage, checkbox: false }
      ];
      setEventTypeAndColumns(eventsObjArr, true);
      eventsColumns.forEach(eventColumn => {
        expect(listview.getColumnHeadersByApp(appName.riskAssessment)).toContain(eventColumn);
      });
      expect(listview.getColumnItemsByColName('Event Type')).toContain(EventTypesEnum[EventTypesEnum.Inspection]);
    });
    it('should set OUTAGE event (Actual and Planned columns) and display in List View', async () => {
      const eventsObjArr = [
        { event: EventTypesEnum.Fault, checkbox: false, },
        { event: EventTypesEnum.Inspection, checkbox: false },
        { event: EventTypesEnum.Outage, checkbox: true }
      ];
      setEventTypeAndColumns(eventsObjArr, true);
      eventsColumns.forEach(eventColumn => {
        expect(listview.getColumnHeadersByApp(appName.riskAssessment)).toContain(eventColumn);
      });
      expect(listview.getColumnItemsByColName('Event Type')).toContain(EventTypesEnum[EventTypesEnum.Outage]);
    });
    it('should set and display FAULT, INSPECTION, and OUTAGE in List View', async () => {
      const eventsObjArr = [
        { event: EventTypesEnum.Fault, checkbox: true, },
        { event: EventTypesEnum.Inspection, checkbox: true },
        { event: EventTypesEnum.Outage, checkbox: true }
      ];
      setEventTypeAndColumns(eventsObjArr, true);
      eventsColumns.forEach(eventColumn => {
        expect(listview.getColumnHeadersByApp(appName.riskAssessment)).toContain(eventColumn, `event columns are not the same`);
      });
      listview.setColumnFilterByName(`Asset`, `UG_`); // Set column filter Asset to properly see all event types
      const eventTypes = await listview.getColumnItemsByColName('Event Type');

      expect(eventTypes).toContain(EventTypesEnum[EventTypesEnum.Fault]);
      expect(eventTypes).toContain(EventTypesEnum[EventTypesEnum.Inspection]);
      expect(eventTypes).toContain(EventTypesEnum[EventTypesEnum.Outage]);
    });
  });
});

function generateQuickSearch() {
  return {
    searchName: casual.word + (new Date().getTime()),
    searchTerm: ``,
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

function setEventTypeAndColumns(eventsObjArr: Array<{ event: EventTypesEnum, checkbox: boolean }>, complete = false) {
  if (complete) { // only set to True IF steps inside this IF clause is already performed.
    listview.showColumnOptionsBtn.click();
    listview.selectColumnType(listview.columnTypes.events);
    listview.setShowAssetEventsViewOption(AssetEventsViewEnum.events);
  }

  listview.setEventTypes(eventsObjArr);
  eventsObjArr.forEach(eventObj => {
    expect(listview.getEventType(eventObj.event).isSelected()).toEqual(eventObj.checkbox
      , `${EventTypesEnum[eventObj.event]} option selected status should be ${eventObj.checkbox} `);
  });

  if (!complete) { listview.selectColumnToAdd(eventsColumns); }

  listview.okBtnColumnDialog.click();
  listview.waitForSpinner();
}
