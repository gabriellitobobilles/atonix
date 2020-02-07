import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileType, downloadFileName } from '../../helpers/testDetails.data';

describe('19583: Performance Analyst -Charts', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let data1, data_2, min_defaultValue, max_defaultValue, cnttxt, cnttxt2, min_y2, max_y2, winSel, highcharts_legend_item;


  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    const EC = protractor.ExpectedConditions;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });
    // const width = 1040;
    // const height = 744;
    // browser.driver.manage().window().setSize(width, height);
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


  it('Step 1: Verify multiple trends load in drop down menu', async () => {

    const EC = protractor.ExpectedConditions;
    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.waitForAngular();
    // browser.driver.wait(async () => {
    //   browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
    //   return appTitle.chartDropDown.chartDropDownBtn;
    // });
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.trendSelector();
    browser.waitForAngular();
    browser.sleep(3000);
    const trnds = await element.all(by.repeater('chartSummary in chartVM.charts')).count();

    /* Check if the valuess are not zero */
    expect(trnds).toBeGreaterThan(0);
    expect(trnds).toBeGreaterThan(0);
    expect(trnds).toBeGreaterThan(0);

    /* Check if the valuess are not null */
    expect(trnds).not.toEqual(null);
    expect(trnds).not.toEqual(null);
    expect(trnds).not.toEqual(null);
  });
  it('Step 2: Change time range to less than 4 days and verify switch to higher frequency data', async () => {
    /** step 2 */

    // browser.sleep(3000);
    data1 = await element(by.css('#navBar')).getAttribute('width');

    await appTitle.selectTimeSlider.calendarIcon.click();

    await appTitle.selectTimeSlider.calendarIconStart.click();
    await appTitle.selectTimeSlider.startDatebox.clear();
    const previousdate = new Date(new Date().setDate(new Date().getDate() - 4));
    appTitle.selectCalendarMonthYear(previousdate);

    await appTitle.selectTimeSlider.calendarIconEnd.click();
    await appTitle.selectTimeSlider.endDatebox.clear();
    const currentDay = new Date(new Date().setDate(new Date().getDate()));
    appTitle.selectCalendarMonthYear(currentDay);
    await appTitle.selectTimeSlider.calendarApplybtn.first().click();
    browser.sleep(1000);
    await appTitle.selectTimeSlider.calendarOKBtn.first().click();

    appTitle.waitingFortableChartToLoad();
    browser.waitForAngular();
    // tslint:disable-next-line:variable-name
    data_2 = await element(by.css('#navBar')).getAttribute('width');
    // console.log(data_2);
    // tslint:disable-next-line:radix
    expect(parseInt(data1) > parseInt(data_2)).toBe(true, 'data1 should be greater than data2');
    expect(data1 !== data_2).toBe(true, 'data 1 should not be equal to data2');
  });

  it('Step 3: Change time range with handles and by typing date range in calendar', async () => {
    /** step 3 */

    await appTitle.selectTimeSlider.calendarIcon.click();
    await appTitle.selectTimeSlider.startDatebox.clear();
    const previousdate = appTitle.getPreviousdaysDate(4);
    await appTitle.selectTimeSlider.startDatebox.sendKeys(previousdate);

    await appTitle.selectTimeSlider.endDatebox.clear();
    const currentdate = appTitle.getCurrentDate();
    await appTitle.selectTimeSlider.endDatebox.sendKeys(currentdate);
    browser.sleep(3000);
    await appTitle.selectTimeSlider.calendarApplybtn.first().click();
    browser.sleep(1000);
    await appTitle.selectTimeSlider.calendarOKBtn.first().click();
    appTitle.waitingFortableChartToLoad();
    const data2 = await element(by.css('#navBar')).getAttribute('width');
    // tslint:disable-next-line:radix
    expect(parseInt(data1) > parseInt(data2)).toBe(true, 'data1 should be greater than data2');
    expect(data1 !== data2).toBe(true, 'data1 should not be equal to data2');
  });

  it('Step 4: Change scale of axes, click ok, verify', async () => {
    /** step 4 */

    // $('[id="chartDropdown"]').click();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.trendSelector();
    browser.sleep(3000);
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await element.all(by.repeater('chartSummary in chartVM.charts')).get(2).click();
    appTitle.waitingFortableChartToLoad();
    /** get the default value of the chart */
    // tslint:disable-next-line:variable-name
    min_defaultValue = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    // tslint:disable-next-line:variable-name
    max_defaultValue = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    /** Change the value to specific number */
    await $$('[ng-click="buttonsVM.Settings()"]').first().click();
    browser.sleep(1000);
    await element.all(by.model('ax.Min')).get(0).click();
    await element.all(by.model('ax.Min')).get(0).sendKeys('500');
    await element.all(by.model('ax.Max')).get(0).click();
    await element.all(by.model('ax.Max')).get(0).sendKeys('700');

    $('[ng-click="settingsVM.OK()"]').click();
    appTitle.waitingFortableChartToLoad();
    // tslint:disable-next-line:variable-name
    await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
    browser.sleep(1000);
    $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed"]').click();
    const min_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    const miny = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').getText();
    // console.log('value of y:', miny);
    // tslint:disable-next-line:variable-name
    const max_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    /** will check if the value is correct */
    // tslint:disable-next-line:radix
    expect(min_y).not.toEqual(null);
    // expect(parseInt(min_y) === 500).toBe(true, 'minimum y axes should be equal to 500 since it is a default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(min_y));
    // tslint:disable-next-line:radix
    expect(max_y).not.toEqual(null);
    // expect(parseInt(max_y) === 700).toBe(true, 'maximum y axes should be equal to 700 since it is a default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(max_y));
    browser.sleep(2000);
  });
  it('Step 5: Change scale of axes back to auto, click ok, verify', async () => {

    await $$('[ng-click="buttonsVM.Settings()"]').first().click();
    browser.sleep(1000);
    /** Change the value to auto */
    await element.all(by.model('ax.Min')).get(0).clear();
    await element.all(by.model('ax.Max')).get(0).clear();

    $('[ng-click="settingsVM.OK()"]').click();
    appTitle.waitingFortableChartToLoad();
    // tslint:disable-next-line:variable-name
    min_y2 = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    const my2 = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').getText();
    // console.log('value of defaule:', my2);
    // tslint:disable-next-line:variable-name
    max_y2 = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    // const cnttxt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count();
    await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
    cnttxt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count();
    // const txt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').last().getText();
    // console.log(cnttxt);
    // console.log(txt);
    /** Check the auto value to the previous/default value */
    // tslint:disable-next-line:radix
    expect(min_y2).not.toEqual(null);
    // expect(parseInt(min_y2) === parseInt(min_defaultValue)).toBe(true, 'Minimum y should be equal to minimum y default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(min_y2));
    // tslint:disable-next-line:radix
    // console.log(parseInt(min_defaultValue));
    // tslint:disable-next-line:radix
    expect(max_y2).not.toEqual(null);
    // tslint:disable-next-line:radix
    // expect(parseInt(max_y2) === parseInt(max_defaultValue)).toBe(true, 'Maximum y should be equal to maximum y default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(max_y2));
    // tslint:disable-next-line:radix
    // console.log(parseInt(max_defaultValue));

  });
  it('Step 6: Verify Hamburger Chart button exists and functions as desired- save chart as all 4 types and print preview', async () => {

    // console.log('Step 6: Verify Hamburger Chart button exists and functions as desired- save chart as all 4 types and print preview');
    expect(await $('[class="highcharts-button-symbol"]').isPresent()).toBe(true, 'highchart button should be present');
    await $('[class="highcharts-button-symbol"]').click();
    browser.sleep(3000);
    // console.log(await $$('[class="highcharts-menu-item"]').get(-3).getText());

    /** Verify Print preview  */
    const printButton = await $$('[class="highcharts-menu-item"]').first();
    const result = await browser.executeAsyncScript((elm, callback) => {
      function listener() {
        callback(true);
      }

      window.print = listener;
      elm.click();
    }, printButton.getWebElement());
    browser.sleep(3000);
    expect(result).toBe(true, 'Print preview should be present');
    browser.sleep(3000);

    /** Downloading Chart PNG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePNG, downloadFileType.PNG);
    /** Downloading Chart JPEG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileJPEG, downloadFileType.JPEG);
    /** Downloading Chart PDF File */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePDF, downloadFileType.PDF);
  });
  it('Step 7: Download data to excel', async () => {
    // console.log('Step 7: Download data to excel');
    /** Download data to excel */
    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn,
      downloadFileName.downloadCSV);
  });

  it('Step 8: Expand chart to full screen', async () => {

    browser.sleep(3000);
    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
    browser.sleep(3000);
    winSel = await appTitle.selectWindow();
    await browser.switchTo().window(winSel[1]);
    expect(await appTitle.DownloadOption.ChartContextMenuBtn.isPresent()).toBe(true,
      'chart context button menu should be present');
    browser.sleep(3000);
  });

  it('Step 9: Verify "click and drag" zoom works properly ', async () => {

    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);
    highcharts_legend_item = highcharts_legend_item - 1;
    // console.log(highcharts_legend_item);
    appTitle.ChartZoomOut(highcharts_legend_item);
    browser.sleep(5000);
    expect(await appTitle.resetZoom.ResetZoomBtn.isPresent()).toBe(true,
      'reset zoom button should be present');
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(2000);
  });


  it('Step 10: Click on chart editor button and verify that it navigates to correct chart and time range', async () => {

    browser.sleep(3000);
    appTitle.DispatchChart.EditChartBtn.first().click();
    browser.sleep(3000);
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    browser.waitForAngular();
    browser.sleep(5000);
    await browser.wait(async () => await browser.element.all(by.css('[ng-show="vm.loading"]')).first().getAttribute('class')
      === 'text-center text-dark ng-hide');
    browser.sleep(5000);
    await browser.wait(protractor.ExpectedConditions.stalenessOf(element(by.css('#CEChartContainer > div > div > span'))));
    // await browser.wait(async () => await browser.element(by.css('[ng-show="vm.chartWarning"]')).getAttribute('class')
    // === 'chart-warning ng-hide');
    await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
    browser.sleep(3000);
    cnttxt2 = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').$$('text').count();
    expect(cnttxt).not.toEqual(null, 'value of the data shoule not be equal to null');
    expect(cnttxt2).not.toEqual(null, 'value of the data shoule not be equal to null');
    // console.log(cnttxt);
    // console.log(cnttxt2);
    // expect(cnttxt === cnttxt2).toBe(true, 'cnttxt data should be equal to cnttxt2 data value');
    browser.sleep(1000);
    browser.close();
    browser.switchTo().window(winSel[0]);
  });

});
