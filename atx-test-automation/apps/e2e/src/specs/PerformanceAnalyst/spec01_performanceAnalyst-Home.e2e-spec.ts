import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('Performance Analyst - Home', () => {

  const appTitle = new helper();

  beforeEach((() => {

    const EC = protractor.ExpectedConditions;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    appTitle.fillLoginForm();
    appTitle.confirmLogin();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);

  }));



  it('19580: Performance Analyst - Home', () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.waitForAngular();
    browser.actions().keyDown(protractor.Key.CONTROL).sendKeys(protractor.Key.SUBTRACT).keyUp(protractor.Key.CONTROL).perform();
    for (let i = 100; i >= 30; i = i - 10) {
      browser.executeScript('document.body.style.zoom=\'' + i + '%\'');
      browser.sleep(3000);
    }

    protractor.browser.sleep(5000);

    for (let x = 30; x <= 150; x = x + 10) {
      browser.executeScript('document.body.style.zoom=\'' + x + '%\'');
      browser.sleep(1000);
    }
    browser.sleep(5000);

  });

});
