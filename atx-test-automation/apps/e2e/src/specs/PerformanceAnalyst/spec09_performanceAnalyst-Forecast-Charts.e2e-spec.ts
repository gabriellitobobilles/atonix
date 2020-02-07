import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19588: Performance Analyst - Forecast  Charts', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let previousdate, currentdate;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    const EC = protractor.ExpectedConditions;
    // browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });
    // const width = 1040;
    // const height = 744;
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


  it('Step 1: Confirm current weather values display properly', async () => {

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
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('APS'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Gila Bend'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Gila Bend Solar PV'))
      .click();
    // appTitle.selectClientMain('All Clients', ['APS', 'Gila Bend', 'Gila Bend Solar PV'],
    //   appName.performanceAnalyst);
    // $$('[ng-click="vm.selectView(view)"]').get(7).click();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.forecast);
    browser.waitForAngular();
  });

  it('Step 2: Adjust time to see 5 day forecast- verify correct displayed trends', async () => {

    const EC = protractor.ExpectedConditions;
    appTitle.waitingForElementTobeVisible($('[id="calendarPopupButton"]'));
    /** Adjust time to see 5 day forecast */
    await $('[id="calendarPopupButton"]').click();
    previousdate = appTitle.getPreviousdaysDate(5);
    await element(by.model('trVM.popupConfiguration.date1')).clear();
    await element(by.model('trVM.popupConfiguration.date1')).sendKeys(previousdate);
    await element(by.model('trVM.popupConfiguration.date2')).clear();
    currentdate = appTitle.getCurrentDate();
    await element(by.model('trVM.popupConfiguration.date2')).sendKeys(currentdate);
    browser.sleep(1000);
    await $$('[ng-click="trVM.applyPopup()"]').first().click();
    browser.sleep(1000);
    await $$('[class="btn btn-primary"]').first().click();
    browser.waitForAngular();
    browser.sleep(3000);
    /** verify correct displayed trends  */
    expect(await $$('[ng-repeat="forecast in vm.tempForecast"]').count()).toEqual(6);
    // console.log(await $('[class="currentWeatherStyle"]').getText());
    expect(await $('[class="currentWeatherStyle"]').getText()).not.toEqual(null);

  });

});
