import { $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19603: Data Explorer - Drop Down Menu', () => {

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





  it('step 1: Load different charts - Verify timing is normal', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('All Clients'))
      .click();
    for (let i = 1; i < 4; i++) {

      // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
      browser.wait(EC.stalenessOf($('[class="text-center text-dark"]')));
      browser.waitForAngular();
      appTitle.trendSelector();
      // appTitle.chartDropDown.chartDropDownBtn.click();
      browser.driver.wait(async () => {
        browser.wait(EC.visibilityOf($$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i)), 10000);
        return $$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i);
      });
      $$('[ng-click="lstVM.SelectTrend(chartSummary)"]').get(i).click();
      browser.wait(EC.visibilityOf($('[id="CEChartContainer"]')), 3000);
      expect($('[id="CEChartContainer"]')).toBeTruthy();
    }
  });


  it('step 2: Delete charts', async () => {

    // ** Delete Charts*/
    trendName = appTitle.makeid(11);
    await appTitle.atonixTrendButtons.nameDropdown.click();
    browser.sleep(2000);
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
      return appTitle.chartDropDown.chartDropDownBtn;
    });
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    browser.sleep(2000);
    appTitle.deletingDataExplorerTrends(trendName);
  });

});
