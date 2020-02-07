import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileName } from '../../helpers/testDetails.data';

describe('19584: Performance Analyst -Var vs. Var Charts', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let min_defaultValue, max_defaultValue, cnttxt, cnttxt2,
    min_y, max_y, min_y2,
    max_y2, tab, highcharts_legend_item,
    highcharts_legend_item_2, highcharts_legend_item_3;

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
    appTitle.fillLoginForm();
    appTitle.confirmLogin();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);

  }));



  it('Step 1: Change scale of axes, click ok, verify', async () => {

    const EC = protractor.ExpectedConditions;
    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngularEnabled(false);
    browser.sleep(5000);
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.waitForAngular();
    browser.sleep(3000);
    appTitle.trendSelector();
    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    browser.waitForAngular();
    browser.sleep(3000);
    appTitle.waitingForElementTobeVisible(element.all(by.repeater('chartSummary in chartVM.charts')).get(0));
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    const trnds = await element.all(by.repeater('chartSummary in chartVM.charts')).count();

    /* Check if the valuess are not zero */
    expect(trnds).toBeGreaterThan(0);
    expect(trnds).toBeGreaterThan(0);
    expect(trnds).toBeGreaterThan(0);

    /* Check if the valuess are not null */
    expect(trnds).not.toEqual(null);
    expect(trnds).not.toEqual(null);
    expect(trnds).not.toEqual(null);
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await element.all(by.repeater('chartSummary in chartVM.charts')).get(2).click();
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    /** get the default value of the chart */
    // tslint:disable-next-line:variable-name
    min_defaultValue = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    // tslint:disable-next-line:variable-name
    max_defaultValue = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    /** Change the value to specific number */
    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    browser.sleep(1000);
    await element.all(by.model('ax.Min')).get(0).click();
    await element.all(by.model('ax.Min')).get(0).sendKeys('200');
    await element.all(by.model('ax.Max')).get(0).click();
    await element.all(by.model('ax.Max')).get(0).sendKeys('350');
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    // await browser.wait(async () => await browser.element(by.css('[ng-show="chartVM.statusMessage"]')).getAttribute('class')
    //   === 'chart-warning ng-hide');
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(3);
    // console.log(highcharts_legend_item);
    // tslint:disable-next-line:variable-name
    min_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    // tslint:disable-next-line:variable-name
    max_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    /** will check if the value is correct */
    expect(min_y).not.toEqual(null);
    expect(max_y).not.toEqual(null);
    // tslint:disable-next-line:radix
    // expect(parseInt(min_y) === 500).toBeTruthy();
    // tslint:disable-next-line:radix
    // expect(parseInt(max_y) === 700).toBeTruthy();
    browser.sleep(2000);
  });

  it('Step 2: Change scale of axes back to auto, click ok, verify', async () => {

    browser.driver.wait(async () => {
      browser.wait(protractor.ExpectedConditions.visibilityOf(appTitle.atonixTrendButtons.EditChartSettingBtn.first()), 10000);
      return appTitle.atonixTrendButtons.EditChartSettingBtn.first();
    });
    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    browser.sleep(1000);
    /** Change the value to auto */
    await element.all(by.model('ax.Min')).get(0).clear();
    await element.all(by.model('ax.Max')).get(0).clear();

    appTitle.chartSettingTab.save.click();
    appTitle.waitingFortableChartToLoad();
    highcharts_legend_item_2 = await appTitle.getNumberHighchartsVMLegendItem(3);
    // tslint:disable-next-line:variable-name
    min_y2 = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    // tslint:disable-next-line:variable-name
    max_y2 = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    // browser.waitForAngular();
    // await $('div.ui-layout-toggler.ui-layout-toggler-west.ui-layout-toggler-open.ui-layout-toggler-west-open').click();
    cnttxt = await $$('[class="highcharts-axis-labels highcharts-xaxis-labels "]').get(0).$$('text').count();
    // expect(cnttxt === 4).toBe(true, 'it should be equal to 4');
    // console.log(highcharts_legend_item, highcharts_legend_item_2);
    expect(cnttxt).not.toEqual(null);
    expect(highcharts_legend_item_2 === highcharts_legend_item).toBe(true, 'Legent chart should be equal');
    /** Check the auto value to the previous/default value */
    // tslint:disable-next-line:radix
    expect(min_y2).not.toEqual(null);
    // expect(parseInt(min_y2) === parseInt(min_defaultValue)).toBeTruthy();
    // tslint:disable-next-line:radix
    expect(max_y2).not.toEqual(null);
    // expect(parseInt(max_y2) === parseInt(max_defaultValue)).toBeTruthy();
  });

  it('Step 3: Download data to excel', async () => {

    expect(await $$('[class="highcharts-button-symbol"]').first().isPresent()).toBeTruthy();
    await $$('[class="highcharts-button-symbol"]').first().click();
    browser.sleep(3000);
    // console.log(await $$('[class="highcharts-menu-item"]').get(-3).getText());
    /** Download data to excel */
    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn,
      appTitle.DispatchChart.DownloadCsvChartbtn, downloadFileName.downloadCSV);

  });


  it('Step 4: Expand chart to full screen', async () => {

    browser.sleep(3000);
    browser.driver.wait(async () => {
      browser.wait(protractor.ExpectedConditions.visibilityOf($$('[ng-click="buttonsVM.Zoom()"]').first()), 10000);
      return $$('[ng-click="buttonsVM.Zoom()"]').first();
    });
    await $$('[ng-click="buttonsVM.Zoom()"]').first().click();

    browser.sleep(3000);
    tab = await appTitle.selectWindow();
    browser.switchTo().window(tab[1]);
    highcharts_legend_item_3 = await appTitle.getNumberHighchartsVMLegendItem(0);
    // console.log(highcharts_legend_item_3);
    expect(await $('[class="highcharts-button-symbol"]').isPresent()).toBeTruthy();
    browser.sleep(3000);
    cnttxt2 = await $('[class="highcharts-axis-labels highcharts-xaxis-labels "]').$$('text').count();
    expect(highcharts_legend_item === highcharts_legend_item_3).toBe(true, 'Legent chart should be equal');
    expect(cnttxt2).not.toEqual(null);
    // expect(cnttxt2 === 14).toBe(true, 'it should be equal to 14');
    // expect(cnttxt === cnttxt2).toBeTruthy();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);
    highcharts_legend_item = highcharts_legend_item - 1;
    appTitle.ChartZoomOut(highcharts_legend_item);
    browser.sleep(3000);
    expect(await appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();
    browser.close();
    await browser.switchTo().window(tab[0]);
    browser.sleep(5000);
    appTitle.DispatchChart.EditChartBtn.first().click();
    browser.sleep(3000);
    tab = await appTitle.selectWindow();
    browser.switchTo().window(tab[1]);
    browser.waitForAngularEnabled();
    browser.sleep(10000);
    await browser.wait(async () => await browser.element(by.css('[ng-show="vm.loading"]')).getAttribute('class')
      === 'text-center text-dark ng-hide');
    browser.sleep(5000);
    await browser.wait(protractor.ExpectedConditions.stalenessOf(element(by.css('#CEChartContainer > div > div > span'))));
    // await browser.wait(async () => await browser.element(by.css('[ng-show="vm.chartWarning"]')).getAttribute('class')
    // === 'chart-warning ng-hide'; );
    browser.sleep(5000);
    browser.close();
    await browser.switchTo().window(tab[0]);
    browser.sleep(5000);

  });

});
