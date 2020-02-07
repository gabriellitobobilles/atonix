import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19582: Performance Analyst - Donuts', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });
    // var width = 1600;
    // var height = 1268;
    // browser.driver.manage().window().setSize(width, height);
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



  it('Step 1- Verify values seem correct in Donuts', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'));
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    browser.waitForAngular();

    const alertTotalALLClient = await element.all(by.css('.highcharts-subtitle tspan')).get(0).getText();
    const issuesTotalALLClient = await element.all(by.css('.highcharts-subtitle tspan')).get(1).getText();
    const impactTotalALLClient = await element.all(by.css('.highcharts-subtitle tspan')).get(2).getText();

    /* Check if the valuess are not zero */
    expect(alertTotalALLClient).toBeGreaterThan(0);
    expect(issuesTotalALLClient).toBeGreaterThan(0);
    expect(impactTotalALLClient).toBeGreaterThan(0);

    /* Check if the valuess are not null */
    expect(alertTotalALLClient).not.toEqual(null);
    expect(issuesTotalALLClient).not.toEqual(null);
    expect(impactTotalALLClient).not.toEqual(null);

    /* Check if the valuess are not empty */
    expect(alertTotalALLClient).not.toBe('');
    expect(issuesTotalALLClient).not.toBe('');
    expect(impactTotalALLClient).not.toBe('');

  });

  it('Step 2- Click a slice in each donut and verify correct navigation', async () => {

    browser.waitForAngular();
    element.all(by.css('[ng-click="vm.selectView(view)')).get(0).click();
    browser.sleep(5000);
    appTitle.waitingForPieChartToLoad();

    for (let i = 0; i <= 1; ++i) {

      // const z = await element.all(by.css('path.highcharts-point.highcharts-color-' + i + '')).count()

      for (let y = 0; y <= 1; y++) {
        await browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-' + i + '')).get(y)).perform();
        browser.sleep(3000);
        // var name= await element.all(by.css('text > tspan:nth-child(1)')).get(5).getText();
        // console.log(y);
        browser.wait(EC.presenceOf($('.highcharts-tooltip')));
        await browser.wait(async () => $('.highcharts-tooltip'));
        const name = await $('.highcharts-tooltip').element(by.tagName('text')).$$('tspan').get(0).getText();
        browser.actions().click().perform();
        browser.sleep(5000);
        browser.wait(EC.presenceOf(browser.element.all(by.css('.arrow-cursor.selectedAsset')).first()));
        await browser.wait(async () => browser.element.all(by.css('.arrow-cursor.selectedAsset')).first());
        await browser.actions().mouseMove(element.all(by.css('.arrow-cursor.selectedAsset')).first()).perform();
        browser.sleep(2000);
        // var val = await $('.arrow-cursor.selectedAsset').element(by.model('asset.Asset')).getAttribute('title');
        const val = await $$('.arrow-cursor.selectedAsset').first().element(by.model('asset.Asset')).$('.ng-binding').getText();
        // console.log('the value of value is: ' + val);
        // console.log('the name of value is: ' + name);
        expect(name === val).toBe(true);
        await browser.actions().mouseMove(element.all(by.repeater('assetNode in treeController.rootAssets')).get(0)).perform();
        browser.sleep(5000);
        await element.all(by.repeater('assetNode in treeController.rootAssets')).get(0).$$('.arrow-cursor').first()
          .element(by.model('asset.Asset')).click();

        browser.wait(EC.stalenessOf($('[class="chart-warning"]')));

        // browser.sleep(5000);

      }

    }

  });

});
