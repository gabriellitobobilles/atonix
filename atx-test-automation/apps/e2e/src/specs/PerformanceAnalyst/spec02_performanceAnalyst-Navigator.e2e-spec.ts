// tslint:disable-next-line:file-name-casing
import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('Performance Analyst - Navigator', () => {

  let title: string;
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



  it('19581: Performance Analyst - Navigator', async () => {

    const EC = protractor.ExpectedConditions;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < validator.getAppList.length; i++) {

      appTitle.clickAppMenu();
      browser.waitForAngular();
      appTitle.clickPerformanceAnalysApp(validator.getAppList[i]);
      browser.driver.sleep(2000);
      await expect(appTitle.getToastErrorMsg().isPresent()).toBeFalsy();
      browser.sleep(3000);
      browser.wait(EC.presenceOf(appTitle.getAppTitle()));
      // tslint:disable-next-line:prefer-const
      title = await appTitle.getAppTitle().getText();
      // tslint:disable-next-line:max-line-length
      expect(title.replace(/ powered by/g, '').trim() === validator.getAppList[i].toUpperCase()).toBe(true, 'the page title is not same as apps name:' + validator.getAppList[i].toUpperCase());

    }

  });

});
