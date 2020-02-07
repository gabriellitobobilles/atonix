import { ElementFinder, by, element, $, $$, browser, protractor, ElementArrayFinder } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('19593: Performance Analyst - Summary - Report', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let win, trendName, trendIndex;

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


  it('Step 1:  Ensure chart aggregation data respecting time slider.', async () => {


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
    browser.waitForAngular();


    // ** Create new chart without saving*/
    browser.sleep(3000);
    trendName = appTitle.makeid(11);
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    appTitle.DispatchChart.EditChartSettingBtn.first().click();
    appTitle.DispatchChart.chartTitle.clear();
    appTitle.DispatchChart.chartTitle.sendKeys(trendName);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();


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
    // await appTitle.dataExplorerNavElemSelector.assetTree
    //   .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC1'))
    //   .click();
    browser.waitForAngular();

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
    browser.waitForAngular();
    trendIndex = await appTitle.getNumberHighchartsVMLegendItem(0);

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, 5);
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.aggregation, 2);
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

    const target1 = $$('[transform="translate(0)"]').first();
    const elem1 = await $('[class="grabbable"]');
    await appTitle.dragANDdrop(elem1, target1);
    // await browser.driver.actions().dragAndDrop(elem1, target1).mouseUp().perform();


    browser.sleep(3000);
    await browser.driver.actions().mouseMove($('[id="CEChartContainer"]')).perform();
    browser.sleep(3000);
    while (trendIndex >= 1) {
      expect(await $('[id="CEChartContainer"]').$('table').$('tbody').$$('tr').get(trendIndex).$$('td').last().getText()).not.toEqual(null);
      trendIndex--;
    }

  });



});
