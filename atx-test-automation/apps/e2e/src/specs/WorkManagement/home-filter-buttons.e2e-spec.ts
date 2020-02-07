/**
 * Test Case: 19681 Extended - Filter buttons
 * https://dev.azure.com/AtonixDigital/Asset360/_workitems/edit/23870
 * Created a separate test just for the buttons because there are a lot of buttons/elements affected.
 * Note: This can be merged with TC: 19681 later on.
 */

import { User } from '../../helpers/user';
import { userObj, categoryData, automationAssetData, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $$, ElementFinder, $ } from 'protractor';
import { IssueCreationData, PriorityValues } from '../../helpers/interface';
import * as casual from 'casual';

const user = new User();
const issueManagementPage = new Pages.IssueManagement();
const helper = new Helper();
const util = new Utils();

const newCategory = Object.create(categoryData);
const filterBtnIds = issueManagementPage.filterBtnIds;

let filterObj: any;

const calendarDates = {
  startDate: new Date('01-21-2017'),
  endDate: new Date('03-21-2018'),
  changeStartDate: new Date('01-22-2017'),
  changeEndDate: new Date('03-22-2018'),
  closeStartDate: new Date('01-23-2017'),
  closeEndDate: new Date('03-23-2018'),
};

describe('Issues Management - Filter Test Extented', () => {
  describe('Filter Buttons', () => {
    beforeAll(async () => {
      user.logIn(userObj);
      user.goToWorkManagement();
      helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
      filterObj = {
        id: await getRandomDataFromList('ID'),
        title: await getRandomDataFromList('TITLE'),
        issueCategoryType: [await getRandomDataFromList('CATEGORY')],
        impactCostLow: 0,
        impactCostHigh: 10,
        // activityStatus: ['Closed'], // [await getRandomDataFromList('STATUS')],
        // resolutionStatus: [await getRandomDataFromList('RESOLUTION')],
        startDate: '2019-02-05',
        endDate: '2019-03-05',
        changedBy: await getRandomDataFromList('CHANGED BY'),
        changeStartDate: '2019-02-05',
        changeEndDate: '2019-02-05',
        closeStartDate: '2019-03-05',
        closeEndDate: '2019-03-05',
        assignedTo: 'assignedTest', // await getRandomDataFromList('ASSIGNED'),
        keyword: 'tag_sample',
        openDurationLow: '1',
        openDurationHigh: '2',
        priority: await getRandomDataFromList('PRIORITY'),
        scorecard: 'included',
        // issueTypeID: ['test'],
      };
      issueManagementPage.addNewFilter(filterObj);
    });
    Object.keys(filterBtnIds).forEach(key => {
      it(`should show filter buttons after use - ${key.toUpperCase()}`, async () => {
        expect(issueManagementPage.getFilterButtons(filterBtnIds[key]).isDisplayed())
          .toBeTruthy(`Filter: ${key} is not visible`);
      });
    });
  });

  describe('Calendar Filter', () => {
    beforeAll(() => {
      helper.waitAndClick(issueManagementPage.addNewFilterBtn, 5000);
    });

    Object.keys(calendarDates).forEach(key => {
      it(`should be able to use Calendar Picker - ${key.toUpperCase()}`, () => {
        issueManagementPage.selectFullDateFromCalendar(calendarDates[key], key);
        expect(getElementAttributeValue(key)).toEqual(formatDate(calendarDates[key]));
      });
    });
  });
});

async function getRandomDataFromList(columnName: string) {
  const columnData = await issueManagementPage.getColumnItemsByColName(columnName);
  return util.getRandomFromArray(columnData);
}

async function createIssue(tagsFilter: string[]) {
  browser.sleep(2000);
  const issueCreateData: IssueCreationData = {
    issueClass: newCategory.issueName,
    issueCategory: null,
    issueInfo: {
      name: casual.word + casual.title,
      priority: PriorityValues.Low,
      status: 'Open',
      resolution: newCategory.resolutionStatus[0].name,
      showOnScorecard: true,
      shortSummary: casual.short_description,
    },
    details: {
      tags: tagsFilter
    }
  };

  issueManagementPage.openNewIssueBtn.click();
  const tabWindow = await util.getWindowHandles();
  browser.switchTo().window(tabWindow[tabWindow.length - 1]);
  await user.createNewIssue(issueCreateData);
  browser.switchTo().window(tabWindow[0]);

  return issueCreateData;
}

function formatDate(argDate) {
  const date = new Date(argDate);

  // tslint:disable-next-line:radix
  const month = parseInt(date.getMonth().toString()) + 1 < 10
    ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  // tslint:disable-next-line:radix
  const day = parseInt(date.getDate().toString()) < 10
    ? '0' + date.getDate().toString() : date.getDate();
  const year = date.getFullYear();
  return year + '-' + month + '-' + day;
}

function getElementAttributeValue(filterStr: string) {
  return issueManagementPage.getFilterFieldElem(filterStr).getAttribute('value');
}
