import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { appName } from '../../helpers/testDetails.data';

describe('19602: Data Explorer - Navigator - Tag List', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let win, elem, target, divs, trendName;
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


  it('step 1: Expand Nodes until scroll bar displays', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.sleep(5000);
    appTitle.waitingForPieChartToLoad();
    appTitle.DispatchChart.EditChartBtn.first().click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
  });

  it('step 2: Select Asset - Verify timing is normal', async () => {

    $('#panewest > panewest > div > ul > li:nth-child(2) > a').click(); // Clicking Task List tab
    // tslint:disable-next-line:max-line-length
    elem = $$('[class="draggableTag ng-pristine ng-untouched ng-valid ng-scope ui-draggable ui-draggable-handle ng-not-empty selectedTag"]').first(); // asset table
    target = $('[id="CEChartContainer"]');  // chart container
    divs = element.all(by.repeater('map in vm.maps'));

  });

  it('step 3: Search Assets', async () => {
    // ** Search Asset*//
    // await appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.assetFilter, 'Brewery');
    await appTitle.dataExplorerNavigator.assetFilter.click();
    browser.sleep(200);
    appTitle.dataExplorerNavigator.assetFilter.sendKeys('AQC System');
    // browser.sleep(5000);
    // appTitle.dataExplorerNavigator.variableFilter.click();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.wait(protractor.ExpectedConditions.presenceOf(divs), 5000, 'Element taking too long to appear in the DOM');
    expect(divs).toBeTruthy();
  });

  it('step 4: Drag tags to chart', async () => {

    /** Create second  trend and verify that it won't another trend with the same name */
    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    // ** Drag tags to chart*//
    await divs.get(0).click();
    const desc = await divs.get(0).$$('[class="tagCell ng-binding"]').get(3).getText();
    browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    browser.waitForAngular();
    const highChartLegenItemList = await $$('g.highcharts-legend-item').get(0).element(by.tagName('text'))
      .element(by.tagName('tspan')).getText();
    // const highChartLegenItemList = await appTitle.getListHighchartsVMLegendItem(0);
    expect(highChartLegenItemList.indexOf(desc) === 0).toBe(true, 'Error, Design Curve was not created successfully');
    appTitle.trendSelector();
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.deletingDataExplorerTrends(trendName);
  });

  it('step 5: Change Asset filter', async () => {

    // ** Change Asset filter*//
    $('[ng-click="vm.tagAssetFilterToggle()"]').click();
    appTitle.selectClientMain('All Clients', ['City Of Lawrence', 'Waste Water Treatment Plants (WWTP)',
      'Kansas River WWTP', 'Kansas River WWTP'],
      appName.performanceAnalyst);
  });

  it('step 6: Filter by each column', async () => {

    // ** Filter by each column*//
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.assetFilter, 'Kansas River WWTP');
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.variableFilter, 'Energy Usage');
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.nameFilter, 'Energy Cost|Hourly per MG');
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.descFilter, 'Kansas River WWTP Hourly');
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.unitFilter, 'US MMGPD');
  });

  it('step 7: Drag single tags to chart', async () => {

    // ** Drag single tags to chart*//
    appTitle.dataExplorerFilterColumn(appTitle.dataExplorerNavigator.unitFilter, 'US MMGPD');
    browser.waitForAngular();
    await divs.get(0).click();
    browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
  });

  it('step 8: Drag multiple tags onto chart at once (multiselect)', async () => {

    // ** Drag multiple tags onto chart at once (multiselect)*//
    for (let i = 1; i < 4; i++) {
      browser.sleep(3000);
      browser.actions()
        .keyDown(protractor.Key.CONTROL)
        .mouseMove(divs.get(i))
        .click()
        .perform();
    }

    browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    browser.waitForAngular();
    expect(target).toBeTruthy();

  });

});
