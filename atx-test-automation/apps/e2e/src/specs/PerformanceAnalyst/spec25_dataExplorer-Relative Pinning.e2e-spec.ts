import { ElementFinder, by, element, $, $$, browser, protractor, ElementArrayFinder } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('19609: Data Explorer - Relative Pinning', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendName, trendIndex, trendIndex2, cntTrends;

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


  it('Step 1:  Add new chart… add new data, at least 2 series', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    browser.driver.sleep(5000);

    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC1'))
      .click();
    browser.waitForAngular();

    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();

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

    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
    appTitle.trendSelector();
    appTitle.selectingDataExplorerTrends(trendName);
    cntTrends = await appTitle.getNumberHighchartsVMLegendItem(0);

  });

  it('Step 2:  Save pin from toolbar.', async () => {

    appTitle.dataExplorerNavElemSelector.savePin.click();
    browser.waitForAngular();
    expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).toBe(true, 'Pin was not save successfully');
    trendIndex = await appTitle.getListHighchartsVMLegendItem(0);

  });

  it('Step 3:  Create a Relative Pinned chart.', async () => {

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    await element(by.linkText('Pins')).click();
    appTitle.dataExplorerNavElemSelector.addPins.click();
    appTitle.DispatchChart.pinName.last().clear();
    appTitle.DispatchChart.pinName.last().sendKeys('Pin 2');
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.pinType.last(), 2);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    trendIndex2 = await appTitle.getListHighchartsVMLegendItem(0);
    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(false, 'newly created pin was not successfull');
    expect(await appTitle.dataExplorerNavElemSelector.pins.count() === 2).toBe(true, 'Second Pin was not created successfully');


    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 5);
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.aggregation, 2);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

    const target1 = $$('[transform="translate(0)"]').first();
    const elem1 = await $('[class="grabbable"]');
    await appTitle.dragANDdrop(elem1, target1);

    browser.sleep(3000);
    await browser.driver.actions().mouseMove($('[id="CEChartContainer"]')).perform();
    browser.sleep(3000);
    browser.waitForAngular();

    while (cntTrends >= 1) {
      expect(await $('[id="CEChartContainer"]').$('table').$('tbody').$$('tr').get(cntTrends).$$('td').last().getText()).not.toEqual(null);
      cntTrends--;
    }
    browser.sleep(3000);


  });

  it('Step 4:  Returning back to default chart setting', async () => {

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 1);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    expect(appTitle.DownloadOption.ChartContextMenuBtn.isPresent()).
      toBe(true, 'Something wrong, it will not return to the default chart type setting');

  });

  it('Step 5:  Delete Relative Pinned Chart', async () => {

    appTitle.trendSelector();
    browser.sleep(2000);
    appTitle.deletingDataExplorerTrends(trendName);

  });

});
