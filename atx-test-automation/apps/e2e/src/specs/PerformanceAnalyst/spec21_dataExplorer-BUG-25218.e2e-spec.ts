import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('BUG 25218: Data Explorer - Selecting "Cancel" When Attempting to Navigate to Different Asset Does Not Retain Unsaved Chart', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendName;

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
  it('Step 1: New Chart - verify selecting "Cancel" When Attempting to Navigate to Different Asset should Retain Unsaved Chart', async () => {

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

    browser.sleep(5000);
    for (let dx = 1; dx >= 0; --dx) {
      const target = $$('[class="highcharts-container "]').first();
      const elem = await $$('[ng-model="asset.sensors"]').get(dx);
      await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    }

    const trendIndex1 = await appTitle.getListHighchartsVMLegendItem(0);

    /**  Selecting anothe trend */
    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Grid'))
      .click();

    browser.sleep(2000);
    browser.switchTo().alert().dismiss();
    browser.waitForAngular();

    const trendIndex2 = await appTitle.getListHighchartsVMLegendItem(0);
    // const num = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(trendIndex1[0] === trendIndex2[0]).toBe(true, 'Trends Does Not Retain Unsaved Chart');
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.chartDropDown.chartDropDownBtn.getText()).toBe(trendName + ' (' + await appTitle.getNumberHighchartsVMLegendItem(0) + ')*', 'Trends Does Not Retain Unsaved Chart');

  });


  it('Step 2: New Chart - selecting another trend and verify if the created trend still exist', async () => {


    appTitle.trendSelector();
    browser.sleep(2000);
    $$('[ng-repeat="chartSummary in trends"]').first().click();
    browser.sleep(2000);
    appTitle.trendSelector();
    browser.sleep(2000);
    const val2 = await $$('[ng-repeat="chartSummary in trends"]').getText();
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-for-of
    const strTrendLength = trendName.length;
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < val2.length; ++index) {
      // tslint:disable-next-line:prefer-const
      let value = val2[index];
      if (value.substring(0, strTrendLength) === trendName) {
        expect(val2.indexOf(value) !== -1).toBe(true, 'Your not successfully created a Trend');
        expect($$('i.fa.fa-trash-o').get(val2.indexOf(value))
          .isPresent()).toBe(true, 'Delete icon is not present');
      }
    }

  });

  it('Step 3: New Chart - selecting another trend and click "OK" verify if the created trend does not exist anymore', async () => {

    /**  Selecting anothe trend */
    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Grid'))
      .click();

    browser.sleep(2000);
    browser.switchTo().alert().accept();
    browser.waitForAngular();

    appTitle.trendSelector();
    appTitle.deletingDataExplorerTrends(trendName);


  });

});

