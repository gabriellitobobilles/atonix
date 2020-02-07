import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileName } from '../../helpers/testDetails.data';

describe('19606: Data Explorer - Stats Pane', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendName, dx, dv;

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

  it('step 1: Pin stats pane', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    browser.driver.sleep(3000);

    /** Create new Chart trend */
    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    browser.waitForAngular();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('City Of Lawrence'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Waste Water Treatment Plants (WWTP)'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Delayed KRWWTP LIMS Data'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();


    // ** Add tags and do drag and drop*/
    browser.sleep(2000);
    for (dx = 2; dx >= 1; --dx) {
      const target = $$('[class="highcharts-container "]').first();
      const elem = await $$('[ng-model="asset.sensors"]').get(dx);
      await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    }
    browser.waitForAngular();
    browser.sleep(5000);
    const trendIndex = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(trendIndex === 2).toBe(true, 'trend is not equal');

    browser.waitForAngular();
    // ** Creating Pins*/
    for (dv = 2; dv >= 1; --dv) {
      $('[ng-click="vm.addPin()"]').click();
    }
    const cntpin = await $$('[ng-repeat="pin in vm.selectedTrend.Pins"]').count();
    expect(cntpin === 2).toBe(true, 'pin is not equal');

  });


  it('step 2: Navigate through different series', async () => {

    const trendIndexPin = await appTitle.getNumberHighchartsVMLegendItem(0);
    for (let ldv = trendIndexPin - 1; ldv >= 0; --ldv) {
      appTitle.HighchartsVMLegendItem(0).get(ldv).click();
      browser.sleep(2000);
    }

  });

  it('step 3: Export data to excel', async () => {

    try {
      appTitle.DownloadingCSVFile(appTitle.DispatchChart.DownloadChartContentBtn,
        appTitle.DispatchChart.DownloadChartContentBtn, downloadFileName.downloadCSV);
    } catch (err) {
      console.log(err);
    }

    appTitle.trendSelector();
    appTitle.deletingDataExplorerTrends(trendName);


  });

});
