import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('BUG 15359: Data Explorer - Chart Legend Toggle and Tag Prefix Not Working Before Save', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendName, trendName2;
  const tagsEasternPC1 = ['Air Quality Control System Performance (Air Quality Control System Performance;Value;16037)'];
  const tagsEasternPC3 = ['ACTUAL VOLUME FLOW (MEAS_7:3045-FI_053-01)',
    'Boiler System Performance (Boiler System Performance;Value;12596)'];
  const tagsEasternPC2 = ['Air Heater System Health (Air Heater System Health;Value;12605)',
    'Air Heater System Performance (Air Heater System Performance;Value;12605)'];
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


  it('Step 1: Chart Legend Toggle should work Before Save', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();


    // ** Create new chart without saving*/
    browser.sleep(3000);
    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.DispatchChart.EditChartSettingBtn.click();
    appTitle.DispatchChart.chartTitle.clear();
    appTitle.DispatchChart.chartTitle.sendKeys(trendName);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

    // tslint:disable-next-line:max-line-length
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
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Air Quality Control System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.waitForAngular();


    // ** Add variable and do drag and drop*/

    browser.sleep(3000);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 0; dx < tagsEasternPC1.length; dx++) {
      const target = $$('[class="highcharts-container "]').first();
      // tslint:disable-next-line:max-line-length
      const elem = await element(by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC1[dx]));
      await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    }
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(0);
    appTitle.atonixTrendButtons.changeLabel.click();
    const trendIndex2 = await appTitle.getListHighchartsVMLegendItem(0);
    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(false, 'toggle is not working using new create chart');


  });

  it('Step 2: Tag Prefix should work Before Save', async () => {


    browser.waitForAngular();
    browser.sleep(2000);

    // ** Create new chart without saving*/
    browser.sleep(3000);
    trendName2 = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.DispatchChart.EditChartSettingBtn.click();
    appTitle.DispatchChart.chartTitle.clear();
    appTitle.DispatchChart.chartTitle.sendKeys(trendName2);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Boiler System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.waitForAngular();


    // ** Add variable and do drag and drop*/
    browser.sleep(3000);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 0; dx < tagsEasternPC3.length; dx++) {
      const target = $$('[class="highcharts-container "]').first();
      // tslint:disable-next-line:max-line-length
      const elem = await element(by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC3[dx]));
      await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    }

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Air Heater System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.waitForAngular();

    // ** Add variable and do drag and drop*/
    browser.sleep(3000);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 0; dx < tagsEasternPC2.length; dx++) {
      const target = $$('[class="highcharts-container "]').first();
      // tslint:disable-next-line:max-line-length
      const elem = await element(by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', tagsEasternPC2[dx]));
      await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    }

    browser.waitForAngular();
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(0);
    console.log(JSON.stringify(trendIndex));
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    browser.waitForAngular();
    const trendIndex2 = await appTitle.getListHighchartsVMLegendItem(0);
    console.log(JSON.stringify(trendIndex2));
    expect(JSON.stringify(trendIndex) === JSON.stringify(trendIndex2)).toBe(true, 'Tag Prefix Not Working Before Save');
    appTitle.trendSelector();
    // ** Deleted Created Trend */
    appTitle.deletingDataExplorerTrends(trendName2);

  });
});

