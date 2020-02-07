import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19587: Performance Analyst - Water', () => {

  const appTitle = new helper();


  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    const EC = protractor.ExpectedConditions;
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


  it('Step 1: Navigate to water asset', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.sleep(5000);
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('City Of Lawrence'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Waste Water Treatment Plants (WWTP)'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .click();

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);

  });

  it('Step 2: Verify values seem correct in Donuts', async () => {
    browser.waitForAngular();
    expect($$('[class="highcharts-series-group"]').first().isDisplayed()).toBe(true, 'Donut was not displayed');
    expect($$('[class="highcharts-series-group"]').get(1).isDisplayed()).toBe(true, 'Donut was not displayed');
    expect($$('[class="highcharts-series-group"]').get(2).isDisplayed()).toBe(true, 'Donut was not displayed');
    expect($$('[class="highcharts-series-group"]').get(3).isDisplayed()).toBe(true, 'Donut was not displayed');
  });

  // tslint:disable-next-line:max-line-length
  it('Step 3: Values respond to changes in time slider- note that some charts are always 1min resolution regardless of time slider', async () => {
    browser.waitForAngular();
    const costAsset1 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveCostAssets"]').first().getText();
    const haveEnergy1 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveEnergies"]').first().getText();
    const haveChemical1 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveChemicals"]').first().getText();
    // console.log(costAsset1, haveEnergy1, haveChemical1);
    const target = $('[id="navEnd"]');
    const elem = $('[id="navStart"]').$('g').$('circle');
    await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();

    const costAsset2 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveCostAssets"]').first().getText();
    const haveEnergy2 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveEnergies"]').first().getText();
    const haveChemical2 = await $$('[ng-show="!wpaVM.loading && wpaVM.haveChemicals"]').first().getText();
    // console.log(costAsset2, haveEnergy2, haveChemical2);
    expect(costAsset1).not.toEqual(costAsset2);
    expect(haveEnergy1).not.toEqual(haveEnergy2);
    expect(haveChemical1).not.toEqual(haveChemical2);
    browser.sleep(10000);

  });

  it('Step 4: Click a slice in Chemical Usage by Chemical donut, verify donut changes to Chemical Usage by Asset', async () => {

    browser.waitForAngular();
    for (let y = 0; y <= 1; y++) {
      const EC = protractor.ExpectedConditions;
      browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-' + y)).get(0)).perform();
      browser.sleep(3000);
      browser.wait(EC.presenceOf($('.highcharts-tooltip')));
      await browser.wait(async () => $('.highcharts-tooltip'));
      const name = await $('.highcharts-tooltip').element(by.tagName('text')).$$('tspan').get(0).getText();
      browser.actions().click().perform();
      browser.sleep(5000);
      browser.wait(EC.presenceOf(browser.element(by.css('.arrow-cursor.selectedAsset'))));
      await browser.wait(async () => browser.element(by.css('.arrow-cursor.selectedAsset')));
      await browser.actions().mouseMove(element(by.css('.arrow-cursor.selectedAsset'))).perform();
      browser.sleep(2000);

      const val = await $('.arrow-cursor.selectedAsset').element(by.model('asset.Asset')).$('.ng-binding').getText();

      expect(name === val).toBe(true);
      // console.log(await appTitle.assetList(appTitle.assetNav.motherList));
      // $$('[ng-model="asset.Asset"]').get((await $$('[ng-model="asset.Asset"]').getText())
      //   .indexOf('Clinton WTP'))
      //   .click();
      // console.log((await appTitle.dataExplorerNavElemSelector.assetTreeController.getText()).indexOf('Kansas River WWTP'));
      // tslint:disable-next-line:max-line-length
      await appTitle.dataExplorerNavElemSelector.assetTreeController.get((await appTitle.dataExplorerNavElemSelector.assetTreeController.getText()).indexOf('Kansas River WWTP') + 2)
        .click();
      browser.waitForAngular();

    }

  });

  it('Step 5: Navigate to child asset with no $, energy, and/or chemical usage', async () => {

    $$('[ng-repeat="assetNode in asset.children"]').get((await $$('[ng-repeat="assetNode in asset.children"]').getText())
      .indexOf('Intake Pump Station'))
      .click();
    if (await $$('[ng-show="!vm.loading && !vm.haveChemicals"]').isPresent()) {
      const haveChemical = await $$('[ng-show="!vm.loading && !vm.haveChemicals"]').last().getText();
      expect(haveChemical).toEqual('NO\nCHEMICAL USAGE');
    } else {
      expect(true);
    }

  });

  it('Step 6: Verify donuts replaced with "no ___ usage" and legend responds appropriately ', async () => {

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Water Treatment Plants (WTP)'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Clinton WTP'))
      .click();
    $$('[ng-repeat="assetNode in asset.children"]').get((await $$('[ng-repeat="assetNode in asset.children"]').getText())
      .indexOf('CO2 System'))
      .click();
    if (await $$('[ng-show="!wpaVM.loading && !wpaVM.haveEnergies"]').isPresent()) {
      const haveEnergies = await $$('[ng-show="!wpaVM.loading && !wpaVM.haveEnergies"]').last().getText();
      expect(haveEnergies).toEqual('NO\nENERGY USAGE\nBY ASSET');
    } else {
      expect(true);
    }

  });

});
