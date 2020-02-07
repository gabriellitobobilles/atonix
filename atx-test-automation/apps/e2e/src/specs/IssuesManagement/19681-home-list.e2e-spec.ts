/**
 * Test Case: 19681
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19681
 */

import { User } from '../../helpers/user';
import { userObj, categoryData, automationAssetData, appName, downloadFileType, downloadFileName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $$ } from 'protractor';
import { IssueCreationData, PriorityValues } from '../../helpers/interface';
import * as casual from 'casual';

const user = new User();
const issueManagementPage = new Pages.IssueManagement();
const helper = new Helper();
const util = new Utils();

const newCategory = Object.create(categoryData);

const filterTags = [`tag1_${casual.word}_${(new Date).getMilliseconds()}`
  , `tag2_${casual.word}_${(new Date).getMilliseconds()}`];

describe('Issues Management - Home List', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToIssueManagement();
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
  });
  it('should be able to DOWNLOAD issues in CSV', async () => {
    issueManagementPage.downloadIssuesBtn.click();
    expect(helper.checkDownloads(downloadFileName.issuesCSV)).toBeTruthy('File not downloaded');
  });
  describe('Sort column', () => {
    it('should be able to sort by ID', async () => {
      const columnDetails = await sortColumn('ID');

      expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter,
        `Databefore: ${columnDetails.columnDataBefore} should NOT be equal to DataAfter: ${columnDetails.columnDataAfter}`);
      expect(columnDetails.tempBefore.sort().reverse()).toEqual(columnDetails.columnDataAfter,
        `tempBefore.reverse(): ${columnDetails.tempBefore.sort().reverse()} should be equal to ${columnDetails.columnDataAfter}`);
    });
    it('should be able to sort by TITLE', async () => {
      const columnDetails = await sortColumn('TITLE');

      expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter,
        `Databefore: ${columnDetails.columnDataBefore} should NOT be equal to DataAfter: ${columnDetails.columnDataAfter}`);
      // @ts-ignore
      expect(columnDetails.tempBefore.map(x => x.toLowerCase()).sort().reverse())
        // @ts-ignore
        .toEqual(columnDetails.columnDataAfter.map(x => x.toLowerCase()));
    });
    it('should be able to sort by RESOLUTION', async () => {
      const columnDetails = await sortColumn('RESOLUTION');

      expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter,
        `Databefore: ${columnDetails.columnDataBefore} should NOT be equal to DataAfter: ${columnDetails.columnDataAfter}`);
      // @ts-ignore
      expect(columnDetails.tempBefore.map(x => x.toLowerCase()).sort().reverse())
        // @ts-ignore
        .toEqual(columnDetails.columnDataAfter.map(x => x.toLowerCase()));
    });
    it('should be able to sort by CATEGORY', async () => {
      const columnDetails = await sortColumn('CATEGORY');

      expect(columnDetails.columnDataBefore).not.toEqual(columnDetails.columnDataAfter,
        `Databefore: ${columnDetails.columnDataBefore} should NOT be equal to DataAfter: ${columnDetails.columnDataAfter}`);
      // @ts-ignore
      console.log(`columnDetails.tempBefore:::: `, columnDetails.tempBefore.map(x => (x as string).toLowerCase()).sort().reverse());
      console.log(`columnDetails.columnDataAfter:: `, columnDetails.columnDataAfter.map(x => (x as string).toLowerCase()));
      expect(columnDetails.tempBefore.map(x => (x as string).toLowerCase()).sort().reverse())
        // @ts-ignore
        .toEqual(columnDetails.columnDataAfter.map(x => x.toLowerCase()));
    });
  });
  describe('ADD NEW FILTER', () => {
    it('should add ID filter', async () => {
      const filterObj = { id: await getRandomDataFromList('ID') };
      issueManagementPage.addNewFilter(filterObj);

      let columnData = await issueManagementPage.getColumnItemsByColName('ID');
      const countBefore = columnData.length;

      expect(columnData[0]).toEqual(filterObj.id);

      filterObj.id = '';
      issueManagementPage.addNewFilter(filterObj); // clear the field
      columnData = await issueManagementPage.getColumnItemsByColName('ID');

      expect(countBefore).not.toEqual(columnData.length);
    });

    it('should add TITLE filter', async () => {
      const filterObj = { title: await getRandomDataFromList('TITLE') };
      issueManagementPage.addNewFilter(filterObj);

      let columnData = await issueManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.includes(filterObj.title));

      const countBefore = columnData.length;
      filterObj.title = '';
      issueManagementPage.addNewFilter(filterObj); // clear the field
      columnData = await issueManagementPage.getColumnItemsByColName('TITLE');

      expect(countBefore).not.toEqual(columnData.length);
    });
    it('should add multile CATERGORY filter', async () => {
      const filterObj = {
        issueCategoryType: [await getRandomDataFromList('CATEGORY')
          , await getRandomDataFromList('CATEGORY')]
        // categoryList: ['Plant Operations'
        //   , 'Outage Maintenance']
      };

      issueManagementPage.addNewFilter(filterObj);
      let columnData = await issueManagementPage.getColumnItemsByColName('CATEGORY');

      columnData.forEach(item => {
        expect(filterObj.issueCategoryType.includes(item))
          .toBeTruthy(`filterObj.issueCategoryType: ${filterObj.issueCategoryType} !== ${item}`);
      });

      issueManagementPage.addNewFilter(filterObj);
      columnData = await issueManagementPage.getColumnItemsByColName('CATEGORY');
    });

    it('should add multile RESOLUTION filter', async () => {
      const filterObj = {
        resolutionStatus: [await getRandomDataFromList('RESOLUTION')
          , await getRandomDataFromList('RESOLUTION')]
      };
      issueManagementPage.addNewFilter(filterObj);
      let columnData = await issueManagementPage.getColumnItemsByColName('RESOLUTION');

      columnData.forEach(item => {
        expect(filterObj.resolutionStatus.includes(item)).toBeTruthy(`item: ${item}
        , filterObj.resolutionStatus: ${filterObj.resolutionStatus}`);
      });

      issueManagementPage.addNewFilter(filterObj);
      columnData = await issueManagementPage.getColumnItemsByColName('RESOLUTION');
    });

    it('should be able to filter using TAGS', async () => {
      const issueCreateData = await createIssue([filterTags[0]]);
      const filterObj = {
        keyword: issueCreateData.details.tags.toString()
      };

      issueManagementPage.addNewFilter(filterObj);
      const columnData = await issueManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.includes(issueCreateData.issueInfo.name)).toBeTruthy();
    });
    it('BUG 11818 - should be able to use MULTIPLE TAGS', async () => {
      // create another issue with tag
      const issueCreateData = await createIssue([filterTags[1]]);
      const filterObj = {
        keyword: filterTags.toString()
      };
      issueManagementPage.addNewFilter(filterObj);
      const columnData = await issueManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.length).toBeGreaterThan(0, 'Tag filters returns 0 results');
      expect(columnData.includes(issueCreateData.issueInfo.name))
        .toBeTruthy(`Filter result does not contain Title:  ${issueCreateData.issueInfo.name}`);

      filterObj.keyword = '';
      issueManagementPage.addNewFilter(filterObj); // clear the field
    });
    it('use filter and switch asset, should have different result', async () => {
      /*
      When using a filter and user switches asset,
      user should not get the same result as before
      */
      const filterObj = { id: await getRandomDataFromList('ID') };
      issueManagementPage.addNewFilter(filterObj);

      const columnData1 = await issueManagementPage.getColumnItemsByColName('ID');

      helper.selectClientFromListMain(['Protractor Automation Test'], appName.issuesManagement);
      const columnData2 = await issueManagementPage.getColumnItemsByColName('ID');
      expect(columnData1).not.toEqual(columnData2);
    });
  });
});

async function sortColumn(columnName: string) {
  browser.waitForAngular();
  const columnDataBefore = await issueManagementPage.getColumnItemsByColName(columnName);
  const column = issueManagementPage.getColumnHeaderByText(columnName);
  column.click();
  const columnDataAfter = await issueManagementPage.getColumnItemsByColName(columnName);
  const tempBefore = columnDataBefore.map(x => x);

  return {
    columnDataBefore,
    columnDataAfter,
    tempBefore
  };
}

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
