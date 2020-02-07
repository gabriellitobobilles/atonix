import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19586: Performance Analyst - Issues', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let winSel, name, val;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    const EC = protractor.ExpectedConditions;
    browser.manage().timeouts().setScriptTimeout(600000);
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



  it('Step 1: Hover over info icon for issue summary', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngularEnabled(false);
    browser.sleep(5000);
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.issues);
    browser.waitForAngular();
    browser.driver.sleep(5000);
    await browser.wait(protractor.ExpectedConditions.visibilityOf($$('[class="highcharts-series-group"]').first()));
    await browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-4 ')).get(0)).perform();
    browser.sleep(3000);
    await browser.wait(async () => $('.highcharts-tooltip'));
    name = await $('.highcharts-tooltip').element(by.tagName('text')).$$('tspan').get(0).getText();
    browser.actions().click().perform();
    browser.waitForAngular();
  });


  it('Step 2: Click issue title to navigate to issue', async () => {

    await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('[class="highcharts-series-group"]')).first()));
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.arrow-cursor.selectedAsset'))));
    await browser.actions().mouseMove(element(by.css('.arrow-cursor.selectedAsset'))).perform();
    browser.sleep(2000);
    val = await $('.arrow-cursor.selectedAsset').element(by.model('asset.Asset')).$('.ng-binding').getText();
    expect(name === val).toBe(true);
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('[class="issue ng-binding"]')).first()));
    await $$('[class="issue ng-binding"]').get(0).click();
  });

  it('Step 3: Select Issue Name and Confirm Navigation to Issue Snapshot ', async () => {
    const issueName = await $$('[class="issue ng-binding"]').get(0).getText();
    browser.waitForAngular();
    browser.sleep(2000);
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    browser.waitForAngular();
    browser.sleep(2000);
    const issueID = await $('[class="pull-right ng-binding ng-scope"]').getAttribute('textContent');
    const issueSnaphot = await browser.getTitle();
    const issueResult = 'Issue' + ' ' + issueID + ':' + ' ' + issueName;
    expect(issueSnaphot === issueResult).toBe(true);
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.waitForAngular();


  });

});
