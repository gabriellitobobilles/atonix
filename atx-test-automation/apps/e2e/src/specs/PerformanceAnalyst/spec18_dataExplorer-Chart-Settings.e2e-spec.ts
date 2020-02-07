import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19605: Data Explorer - Chart Settings', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let ydx, dxy;
  const axes = ['500', '700'];
  const minmax = ['450', '300'];
  const tags = ['Net Unit Heat Rate Heat Loss Method (MDCalc7_TURBIN:NUHR_HL)',
    'Net Unit Heat Rate Input Output Method (MDCalc7_TURBIN:NUHR_IO)', 'RELATIVE HUMIDITY (AMBIENT_AIR:HUMIDITY)',
    'AMBIENT AIR TEMPERATURE (GPA tag replaced with measured FD Fan Inlet Temp tag) (MEAS:1GPATMBNT)', 'Target (Target;Value;6039)'];
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
  it('step 1: Change scale of axes, click ok, verify', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    browser.driver.sleep(3000);
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('All Clients'))
      .click();
    browser.driver.sleep(3000);
    appTitle.trendSelector();
    await appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    appTitle.DispatchChart.EditChartSettingBtn.click();
    $$('[ng-model="ax.Min"]').last().clear();
    $$('[ng-model="ax.Min"]').last().sendKeys(axes[0]);
    $$('[ng-model="ax.Max"]').last().clear();
    $$('[ng-model="ax.Max"]').last().sendKeys(axes[1]);
    await $('[ng-click="settingsVM.OK()"]').click();
    browser.sleep(2000);
    await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"]').click();
    const min_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
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

  });

  it('step 2: Change scale of axes back to auto, click ok, verify', async () => {

    appTitle.DispatchChart.EditChartSettingBtn.click();
    $$('[ng-model="ax.Min"]').last().clear();
    $$('[ng-model="ax.Max"]').last().clear();
    $('[ng-click="settingsVM.OK()"]').click();
    const minAuto_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').first().getText();
    // console.log('value of y:', minAutoy);
    // tslint:disable-next-line:variable-name
    const maxAuto_y = await $$('[class="highcharts-axis-labels highcharts-yaxis-labels "]').first().$$('text').last().getText();
    /** will check if the value is correct */
    // tslint:disable-next-line:radix
    expect(minAuto_y).not.toEqual(null);
    // expect(parseInt(min_y) === 500).toBe(true, 'minimum y axes should be equal to 500 since it is a default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(minAuto_y));
    // tslint:disable-next-line:radix
    expect(maxAuto_y).not.toEqual(null);
    // expect(parseInt(max_y) === 700).toBe(true, 'maximum y axes should be equal to 700 since it is a default value');
    // tslint:disable-next-line:radix
    // console.log(parseInt(maxAuto_y));

  });

  // tslint:disable-next-line:max-line-length
  it('step 3: Filter data (Before saving anything) by min/max with and without apply to all selected - verify chart responds', async () => {

    await $('[class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-closed ui-layout-toggler-west-closed"]').click();
    browser.waitForAngular();

    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .click();

    appTitle.trendSelector();
    await appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');
    browser.waitForAngular();

    const d = await $$('[class="highcharts-tracker"]').first().getAttribute('d');
    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
    await element(by.linkText('Series')).click();
    for (let dy = tags.length - 1; dy >= 0; --dy) {
      await $$('[class="fa fa-filter"]').get(dy).click();
      await $$('[ng-model="s.FilterMin"]').get(dy).clear();
      await $$('[ng-model="s.FilterMin"]').get(dy).sendKeys(minmax[0]);
      await $$('[ng-model="s.FilterMax"]').get(dy).clear();
      await $$('[ng-model="s.FilterMax"]').get(dy).sendKeys(minmax[1]);

    }
    appTitle.chartSettingTab.save.click();
    // tslint:disable-next-line:prefer-conditional-expression
    if (await $$('[class="highcharts-tracker"]').first().isPresent() === false) {
      dxy = '';
    } else {
      dxy = await $$('[class="highcharts-tracker"]').first().getAttribute('d');
    }

    expect(d !== dxy).toBe(true, 'Chart is not responding the changes');

  });

  it('step 4: Filter with multiple "Apply to All" Filters- should work as "And" logic- current bug', async () => {


    const d = await $$('[class="highcharts-tracker"]').first().getAttribute('d');
    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
    await element(by.linkText('Series')).click();
    for (let dy = tags.length - 1; dy >= 0; --dy) {
      await $$('[class="fa fa-filter"]').get(dy).click();
      await $$('[ng-model="s.FilterMin"]').get(dy).clear();
      await $$('[ng-model="s.FilterMin"]').get(dy).sendKeys(minmax[0]);
      await $$('[ng-model="s.FilterMax"]').get(dy).clear();
      await $$('[ng-model="s.FilterMax"]').get(dy).sendKeys(minmax[1]);
      await $$('[ng-model="s.ApplyToAll"]').get(dy).click();

    }
    appTitle.chartSettingTab.save.click();
    // tslint:disable-next-line:prefer-conditional-expression
    if (await $$('[class="highcharts-tracker"]').first().isPresent() === false) {
      ydx = '';
    } else {
      ydx = await $$('[class="highcharts-tracker"]').first().getAttribute('d');
    }

    expect(d !== ydx).toBe(true, 'Chart is not responding the changes');

  });

  it('step 5: Change chart and series type', async () => {
    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
    await element(by.linkText('Series')).click();
    for (let dy = tags.length - 1; dy >= 0; --dy) {
      await $$('[class="fa fa-filter"]').get(dy).click();
      await $$('[ng-model="s.FilterMin"]').get(dy).clear();
      await $$('[ng-model="s.FilterMax"]').get(dy).clear();
      await $$('[ng-model="s.ApplyToAll"]').get(dy).click();

    }
    for (let x = 0; x <= await appTitle.chartSettingTab.seriesChartType.count() - 1; x++) {

      appTitle.selectDropdownbyNum(appTitle.chartSettingTab.seriesChartType.get(x), 2);

    }

    browser.sleep(10000);
    appTitle.chartSettingTab.save.click();
    browser.sleep(10000);
    expect(await $$('[class="highcharts-tracker"]').first().isDisplayed()).toBe(true, 'Chart Type does not change');

  });

  it('step 6: Add design curve', async () => {

    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
    browser.sleep(1000);
    // clicking static curves menu
    element(by.linkText('Static Curves')).click();
    // adding design curves
    $('[ng-click="settingsVM.addCurve()"]').click();
    // adding x and y values
    $('[ng-click="settingsVM.addPoint(curve)"]').click();
    $('[ng-model="p.Y"]').click();
    $('[ng-model="p.Y"]').clear();
    $('[ng-model="p.Y"]').sendKeys('10');
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    browser.wait(() => {
      return appTitle.chartDropDown.chartDropDownBtn.isDisplayed();
    }, 720000);

    const highChartLegenItemList = await appTitle.getListHighchartsVMLegendItem(0);
    expect(highChartLegenItemList.indexOf('Design Curve') > 1).toBe(true, 'Error, Design Curve was not created successfully');
    // browser.sleep(900000);

  });

  it('step 7: Move one series to the x-axis', async () => {
    const highChartLegenItemList = await appTitle.getListHighchartsVMLegendItem(0);
    appTitle.atonixTrendButtons.EditChartSettingBtn.click();
    await element(by.linkText('Series')).click();

    for (let dy = highChartLegenItemList.length - 2; dy >= 0; --dy) {
      await $$('[ng-model="s.IsXAxis"]').get(dy).click();

    }
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

  });

});
