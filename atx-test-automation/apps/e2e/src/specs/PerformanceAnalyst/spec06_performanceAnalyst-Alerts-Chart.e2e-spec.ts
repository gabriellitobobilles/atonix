import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileName } from '../../helpers/testDetails.data';

describe('19585: Performance Analyst  - Alerts - Chart', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;

  // tslint:disable-next-line:one-variable-per-declaration
  let winSel, highcharts_legend_item;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
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


  it('Step 1: Verify load time seems reasonable', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.alert);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'));
    browser.waitForAngular();
    browser.sleep(2000);

    // double-clicking should make hiddenElement visible
    await browser.actions().doubleClick(element.all(by.repeater('model in modelsVM.models')).get(0)).perform();
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    browser.waitForAngular();
    browser.sleep(2000);
    expect(appTitle.DispatchChart.OpenChartInNewTabBtn).toBeTruthy();

  });

  it('Step 2: Download data to excel', async () => {
    /** Step 2 */
    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
    // /** Download data to excel */
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.trendSelector();
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf(element.all(by.repeater('chartSummary in chartVM.charts')).get(0)), 10000);
      return element.all(by.repeater('chartSummary in chartVM.charts')).get(2);
    });
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await element.all(by.repeater('chartSummary in chartVM.charts')).get(0).click();
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.startDatebox.click();
    appTitle.selectTimeSlider.startDatebox.clear();
    appTitle.selectTimeSlider.startDatebox.sendKeys('07/01/2016');
    appTitle.selectTimeSlider.endDatebox.click();
    appTitle.selectTimeSlider.endDatebox.clear();
    appTitle.selectTimeSlider.endDatebox.sendKeys('12/30/2016');
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(1);

    for (let i = 0; i <= highcharts_legend_item - 1; ++i) {
      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
    }

    browser.waitForAngular();
    // appTitle.DownloadingChartCSV(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn,
    //   appTitle.downloadFileName.CSV);
    // tslint:disable-next-line:max-line-length
    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn, appTitle.DispatchChart.DownloadCsvChartbtn, downloadFileName.downloadCSV);
  });

  it('Step 3: Expand chart to full screen', async () => {
    /** Step 3 */
    /** Expand chart to full screen */
    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
    browser.sleep(2000);
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[2]);
    browser.waitForAngular();
    browser.sleep(5000);
    const highcharts_legend_item_zoom_page = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(await browser.getTitle()).toEqual('Chart Zoom');

  });

  it('Step 4: Click different alert and verify that it populates in chart ', async () => {

    browser.close();
    await browser.switchTo().window(winSel[1]);
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(1000);

    await browser.actions().doubleClick(element.all(by.repeater('model in modelsVM.models')).get(1)).perform();
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.trendSelector();
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await element.all(by.repeater('chartSummary in chartVM.charts')).get(0).click();
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.startDatebox.click();
    appTitle.selectTimeSlider.startDatebox.clear();
    appTitle.selectTimeSlider.startDatebox.sendKeys('07/01/2016');
    appTitle.selectTimeSlider.endDatebox.click();
    appTitle.selectTimeSlider.endDatebox.clear();
    appTitle.selectTimeSlider.endDatebox.sendKeys('12/30/2016');
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    const highcharts_legend_item_new_alert = await appTitle.getNumberHighchartsVMLegendItem(1);
    const highcharts_legend_item_zoom = highcharts_legend_item_new_alert - 1;
    /** Verifying zoon functionality */
    appTitle.ChartZoomOut(highcharts_legend_item_zoom);
    browser.sleep(3000);
    expect(await appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();

    for (let i = 0; i <= highcharts_legend_item_new_alert - 1; ++i) {
      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
    }


  });

  it('Step 5: Verify Vertical Expand(up and down) and Alert default filter', async () => {

    await browser.switchTo().window(winSel[1]);
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(1000);
    // tslint:disable-next-line:prefer-const
    let FilterItems = await appTitle.PAlerts.filterItem.getText();
    for (let x = 0; x <= validator.AlertDefaultFilter.length; x++) {

      expect(FilterItems[x] === validator.AlertDefaultFilter[x]).toBe(true, 'Alert default Filter is not match');
    }

    let defaultfilter = await appTitle.PAlerts.alertTimelineVM.getAttribute('textContent');
    defaultfilter = defaultfilter.trim();
    expect(defaultfilter === validator.alertTimelineVMtempfilter.alertTimelineVMtempfilter);
    await appTitle.PAlerts.chevronDown.click();
    expect(appTitle.PAlerts.chevronUp.isDisplayed()).toBe(true, 'Vertical Expand(up and down) is not working');

  });

});


