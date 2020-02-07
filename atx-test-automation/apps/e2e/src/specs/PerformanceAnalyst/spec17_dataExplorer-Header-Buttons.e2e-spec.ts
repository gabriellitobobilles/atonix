import { $$, browser, protractor, element, by } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { faWineGlassAlt } from '@fortawesome/free-solid-svg-icons';
import { appName, downloadFileName } from '../../helpers/testDetails.data';


describe('19604: Data Explorer - Hearder - Buttons', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let win, val2, trendIndex, trendIndex2, newval, newnameval,
    otherTrendAssetval, trendName, trendName2, trendName3;
  const EC = protractor.ExpectedConditions;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });

    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });
    appTitle.fillLoginForm();
    appTitle.confirmLogin();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);

  }));


  // tslint:disable-next-line:max-line-length
  it('step 1: Add a variable - verify there is only one chart by that name and it has the edit', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.sleep(5000);
    appTitle.waitingForPieChartToLoad();
    appTitle.selectClientMain('Demo Clients', ['Coal Plants', 'Eastern Station',
      'Eastern PC2'],
      appName.performanceAnalyst);
    appTitle.DispatchChart.EditChartBtn.first().click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);

    /** Create first trend */
    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    trendIndex = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    val2 = await $$('[ng-repeat="chartSummary in trends"]').getText();
    expect(val2.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Your not successfully created a Trend');
    expect($$('i.fa.fa-trash-o').get(val2.indexOf(trendName + ' (' + trendIndex + ')'))
      .isPresent()).toBe(true, 'Delete icon is not present');

    /** Create second  trend and verify that it won't another trend with the same name */
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    trendIndex = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    newval = await $$('[ng-repeat="chartSummary in trends"]').getText();

    expect($$('i.fa.fa-trash-o')
      .get((await $$('[ng-repeat="chartSummary in trends"]').getText()).indexOf(trendName + ' (' + trendIndex + ')')).
      isPresent()).toBe(true, 'Delete icon is not present');
    // ** Check if there is a duplicate trend created */
    // tslint:disable-next-line:no-shadowed-variable
    newval.forEach((element, index) => {
      // Find if there is a duplicate or not
      expect(newval.indexOf(element, index + 1) > -1).toBe(false, 'same name trend were created');
    });

    appTitle.deletingDataExplorerTrends(trendName);

  });

  it('step 2: Add a variable - save as chart with new name - verify there are two charts and both are correct', async () => {

    /** save as chart with new name */

    browser.sleep(2000);
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    await appTitle.selectingDataExplorerTrends(trendName);
    trendName2 = appTitle.makeid(11);
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName2);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    trendIndex2 = await appTitle.getNumberHighchartsVMLegendItem(0);
    browser.refresh();
    browser.sleep(2000);
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    newnameval = await $$('[ng-repeat="chartSummary in trends"]').getText();
    // tslint:disable-next-line:max-line-length
    expect(newnameval.indexOf(trendName2 + ' (' + trendIndex2 + ')') >= 0).toBe(true, 'the save as trend were not created');  // Check if the save as trend were created'
    // tslint:disable-next-line:max-line-length
    expect(newval.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Old trend name has been removed/deleted'); // Check if the original trend still there

    // ** Check if there is a duplicate trend created */
    // tslint:disable-next-line:no-shadowed-variable
    newnameval.forEach((element, index) => {
      // Find if there is a duplicate or not
      expect(newnameval.indexOf(element, index + 1) > -1).toBe(false, 'same name trend were created');
    });

    appTitle.deletingDataExplorerTrends(trendName2);

  });

  it('step 3: Save chart to different asset', async () => {

    /** save as chart to different asset */

    browser.refresh();
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    // tslint:disable-next-line:prefer-const
    let strTrendLength = trendName.length;
    // tslint:disable-next-line:prefer-const
    let trensel = await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent');
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < trensel.length; ++index) {
      // tslint:disable-next-line:prefer-const
      let value = trensel[index];
      if (value.substring(0, strTrendLength) === trendName) {
        expect(trensel.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
        expect($$('i.fa.fa-trash-o').get(trensel.indexOf(value))
          .isPresent()).toBe(true, 'Delete icon is not present');
        browser.sleep(3000);
        await $$('[ng-repeat="chartSummary in trends"]').get(trensel.indexOf(value)).click();

      }
    }

    browser.sleep(2000);
    appTitle.atonixTrendButtons.saveBtn.click();
    /** Saving trend to another asset */
    appTitle.atonixSaveTrendDefinition.linkedToAssestSelection.first().click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1')).click();
    appTitle.atonixSaveTrendDefinition.saveBtn.click();

    // ** Verifying the trend that has been save to another asset */
    // tslint:disable-next-line:max-line-length
    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1')).click();
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    browser.sleep(2000);
    // otherTrendAssetval = await $$('[ng-repeat="chartSummary in trends"]').getText();
    otherTrendAssetval = await $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').getAttribute('textContent');
    expect(otherTrendAssetval.indexOf(trendName + ' (' + trendIndex + ')') >= 0).toBe(true, 'Trend was not saved to another asset');
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await appTitle.deletingDataExplorerTrends(trendName);


    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC2'))
      .click();
    browser.sleep(2000);
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    appTitle.deletingDataExplorerTrends(trendName);
  });

  it('step 4: Add a new chart, add variables, save', async () => {

    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC1'))
      .click();
    browser.sleep(2000);
    // ** Create a new chart */
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();

    // ** Select another asset to save the chart */
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree
      .get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // ** Add variable and do drag and drop*/
    browser.sleep(2000);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 0; dx < validator.getTagList.length; dx++) {
      for (let x = 0; x <= await $$('[class="highcharts-container "]').count() - 4; x++) {
        const target = $$('[class="highcharts-container "]').first();
        // tslint:disable-next-line:max-line-length
        const elem = await element(by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]));
        await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
      }

    }
    browser.sleep(3000);
    expect(validator.getTagList.length === await appTitle.getNumberHighchartsVMLegendItem(0)).toBe(true, 'Variables are not created');
    // ** Saving the Chart */

    trendName3 = appTitle.makeid(11);
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName3);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();

    // ** Checking the trend if it was saved in the list successfully  */
    browser.refresh();
    browser.sleep(2000);
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    await appTitle.selectingDataExplorerTrends(trendName3);


  });

  it('step 5: Select a time period in the past, verify As Shown and Live links take you to correct times', async () => {
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.calendarIconStart.click();
    const dateStart = new Date('08-01-2018');
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.selectTimeSlider.calendarIconEnd.click();
    const dateEnd = new Date('3-14-2019');
    appTitle.selectCalendarMonthYear(dateEnd);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();

  });


  it('step 6: Expand to full screen', async () => {
    appTitle.atonixTrendButtons.trenZoombtn.click();

  });

  it('step 7: Verify "click and drag" zoom works properly', async () => {

    win = await appTitle.selectWindow();
    browser.switchTo().window(win[2]);
    const zoomdx = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.ChartZoomOut(zoomdx - 1);
    browser.sleep(5000);
    expect(appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();


  });

  it('step 8: Download data to excel', async () => {

    browser.close();
    await browser.switchTo().window(win[1]);
    appTitle.DownloadingCSVFile(appTitle.DispatchChart.DownloadChartContentBtn,
      appTitle.DispatchChart.DownloadChartContentBtn, downloadFileName.downloadCSV);

    // ** Deleting the trend that has been save to another asset */
    appTitle.trendSelector();
    browser.sleep(2000);
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf($$('[ng-repeat="chartSummary in trends"]').get(2)), 10000);
      return $$('[ng-repeat="chartSummary in trends"]').get(2);
    });
    expect((await $$('[ng-repeat="chartSummary in trends"]').getText())
      .indexOf(trendName3 + ' (' + await appTitle.getNumberHighchartsVMLegendItem(0) + ')') >= 0).
      toBe(true, 'Trend was not saved');
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    // tslint:disable-next-line:max-line-length
    expect($$('i.fa.fa-trash-o').get((await $$('[ng-repeat="chartSummary in trends"]').getText()).indexOf(trendName3 + ' (' + await appTitle.getNumberHighchartsVMLegendItem(0) + ')'))
      .isPresent()).toBe(true, 'Delete icon is not present');
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    await appTitle.deletingDataExplorerTrends(trendName3);



  });

  it('step 9: Download Chart Content data to excel', async () => {


    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('All Clients'))
      .click();
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf($$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(2)), 10000);
      return $$('[ng-bind-html="chartSummary.GetDropdownHTML()"]').get(2);
    });
    await appTitle.selectingDataExplorerTrends('ALL BCP FILTER DP');
    browser.waitForAngular();
    browser.sleep(5000);
    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn,
      appTitle.DispatchChart.DownloadCsvChartbtn, downloadFileName.downloadCSV);

    // **Closing the tab 1 */
    browser.close();
    await browser.switchTo().window(win[0]);


  });
});
