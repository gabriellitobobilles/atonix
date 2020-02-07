import { ElementFinder, by, element, $, $$, browser, protractor, ElementArrayFinder } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('19610: Data Explorer - Legend', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendIndex2, trendIndex3, highcharts_legend, highcharts_legend_item;

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


  it('Step 1:  Click on data tag titles on chart legend to confirm hiding on trend', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('All Clients'))
      .click();
    browser.wait(EC.stalenessOf($('[class="text-center text-dark"]')));
    browser.waitForAngular();
    browser.actions().mouseMove(appTitle.chartDropDown.chartDropDownBtn).perform();
    appTitle.trendSelector();
    appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    browser.waitForAngular();
    // await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);
    highcharts_legend = await appTitle.getListHighchartsVMLegendItem(0);
    browser.waitForAngular();

    if (highcharts_legend.indexOf('\nUser Notes') > 1 || highcharts_legend.indexOf('\nAll Annotations') > 1) {
      for (let i = 0; i <= highcharts_legend_item - 3; ++i) {

        $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
        // tslint:disable-next-line:max-line-length
        expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
      }

    } else {
      for (let i = 0; i <= highcharts_legend_item - 1; ++i) {
        // tslint:disable-next-line:max-line-length
        browser.actions().mouseMove($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '')).perform();
        await $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
        // tslint:disable-next-line:max-line-length
        expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
      }

    }

  });

  it('Step 2:  Click on key icon to change 6 types of tag displays on trend', async () => {

    appTitle.atonixTrendButtons.changeLabel.click();
    trendIndex2 = await appTitle.getListHighchartsVMLegendItem(0);
    expect(JSON.stringify(highcharts_legend) === JSON.stringify(trendIndex2)).toBe(false, 'toggle is not working using new create chart');
    appTitle.atonixTrendButtons.changeLabel.click();
    trendIndex3 = await appTitle.getListHighchartsVMLegendItem(0);
    expect(JSON.stringify(highcharts_legend) === JSON.stringify(trendIndex3)).toBe(false, 'toggle is not working using new create chart');
    expect(JSON.stringify(trendIndex2) === JSON.stringify(trendIndex3)).toBe(false, 'toggle is not working using new create chart');


  });

});
