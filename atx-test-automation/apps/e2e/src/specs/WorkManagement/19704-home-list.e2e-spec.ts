/**
 * Test Case: 19704
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
const workManagementPage = new Pages.IssueManagement();
const helper = new Helper();
const util = new Utils();

const newCategory = Object.create(categoryData);

const filterTags = [`tag1_${casual.word}_${(new Date).getMilliseconds()}`
  , `tag2_${casual.word}_${(new Date).getMilliseconds()}`];

describe('Work Management - Home List', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToWorkManagement();
    helper.selectClientMain(automationAssetData.clientGroup, [automationAssetData.clientName], appName.issuesManagement);
  });
  it('should be able to DOWNLOAD issues in CSV', async () => {
    workManagementPage.downloadIssuesBtn.click();
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
    it('should be able to sort by STATUS', async () => {
      const columnDetails = await sortColumn('STATUS');

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
      expect(columnDetails.tempBefore.map(x => x.toLowerCase()).sort().reverse())
        // @ts-ignore
        .toEqual(columnDetails.columnDataAfter.map(x => x.toLowerCase()));
    });
  });
  describe('ADD NEW FILTER', () => {
    it('should add ID filter', async () => {
      const filterObj = { id: await getRandomDataFromList('ID') };
      workManagementPage.addNewFilter(filterObj);

      let columnData = await workManagementPage.getColumnItemsByColName('ID');
      const countBefore = columnData.length;

      expect(columnData[0]).toEqual(filterObj.id);

      filterObj.id = '';
      workManagementPage.addNewFilter(filterObj); // clear the field
      columnData = await workManagementPage.getColumnItemsByColName('ID');

      expect(countBefore).not.toEqual(columnData.length);
    });

    it('should add TITLE filter', async () => {
      const filterObj = { title: await getRandomDataFromList('TITLE') };
      workManagementPage.addNewFilter(filterObj);

      let columnData = await workManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.includes(filterObj.title));

      const countBefore = columnData.length;
      filterObj.title = '';
      workManagementPage.addNewFilter(filterObj); // clear the field
      columnData = await workManagementPage.getColumnItemsByColName('TITLE');

      expect(countBefore).not.toEqual(columnData.length);
    });
    it('should add multile CATERGORY filter', async () => {
      const filterObj = {
        issueCategoryType: [await getRandomDataFromList('CATEGORY')
          , await getRandomDataFromList('CATEGORY')]
      };

      workManagementPage.addNewFilter(filterObj);
      let columnData = await workManagementPage.getColumnItemsByColName('CATEGORY');

      columnData.forEach(item => {
        expect(filterObj.issueCategoryType.includes(item))
          .toBeTruthy(`filterObj.category: ${filterObj.issueCategoryType} !== ${item}`);
      });

      workManagementPage.addNewFilter(filterObj);
      columnData = await workManagementPage.getColumnItemsByColName('CATEGORY');
    });

    /* Not applicable for Work Management */
    // it('should add multile STATUS filter', async () => {
    //   const filterObj = {
    //     resolutionList: [await getRandomDataFromList('STATUS')
    //       , await getRandomDataFromList('STATUS')]
    //   };
    //   workManagementPage.addNewFilter(filterObj);
    //   let columnData = await workManagementPage.getColumnItemsByColName('STATUS');

    //   columnData.forEach(item => {
    //     expect(filterObj.resolutionList.includes(item))
    //       .toBeTruthy(`filterObj.resolutionList: ${filterObj.resolutionList} includes item: ${item}`);
    //   });

    //   workManagementPage.addNewFilter(filterObj);
    //   columnData = await workManagementPage.getColumnItemsByColName('RESOLUTION');
    // });

    it('should be able to filter using TAGS', async () => {
      const issueCreateData = await createIssue([filterTags[0]]);
      const filterObj = {
        keyword: issueCreateData.details.tags.toString()
      };

      workManagementPage.addNewFilter(filterObj);
      const columnData = await workManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.includes(issueCreateData.issueInfo.name))
        .toBeTruthy(`Issue not created. Title: ${columnData} should include issue name: ${issueCreateData.issueInfo.name}`);
    });
    it('BUG 11818 - should be able to use MULTIPLE TAGS', async () => {
      // create another issue with tag
      const issueCreateData = await createIssue([filterTags[1]]);
      const filterObj = {
        keyword: filterTags.toString()
      };
      workManagementPage.addNewFilter(filterObj);
      const columnData = await workManagementPage.getColumnItemsByColName('TITLE');

      expect(columnData.length).toBeGreaterThan(0, 'Tag filters returns 0 results');
      expect(columnData.includes(issueCreateData.issueInfo.name))
        .toBeTruthy(`Filter result does not contain Title:  ${issueCreateData.issueInfo.name}`);

      filterObj.keyword = '';
      workManagementPage.addNewFilter(filterObj); // clear the field
    });
    it('use filter and switch asset, should have different result', async () => {
      /*
      When using a filter and user switches asset,
      user should not get the same result as before
      */
      const filterObj = { id: await getRandomDataFromList('ID') };
      workManagementPage.addNewFilter(filterObj);

      const columnData1 = await workManagementPage.getColumnItemsByColName('ID');

      helper.selectClientFromListMain(['Protractor Automation Test'], appName.issuesManagement);
      const columnData2 = await workManagementPage.getColumnItemsByColName('ID');
      expect(columnData1).not.toEqual(columnData2);
    });
  });
});

async function sortColumn(columnName: string) {
  browser.waitForAngular();
  const columnDataBefore = await workManagementPage.getColumnItemsByColName(columnName);
  const column = workManagementPage.getColumnHeaderByText(columnName);
  column.click();
  const columnDataAfter = await workManagementPage.getColumnItemsByColName(columnName);
  const tempBefore = columnDataBefore.map(x => x);

  return {
    columnDataBefore,
    columnDataAfter,
    tempBefore
  };
}

async function getRandomDataFromList(columnName: string) {
  const columnData = await workManagementPage.getColumnItemsByColName(columnName);
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
  helper.waitAndClick(workManagementPage.openNewItemBtn);
  // workManagementPage.openNewItemBtn.click();
  const tabWindow = await util.getWindowHandles();
  browser.switchTo().window(tabWindow[tabWindow.length - 1]);
  await user.createNewIssue(issueCreateData, 'WM');
  browser.switchTo().window(tabWindow[0]);

  return issueCreateData;
}
