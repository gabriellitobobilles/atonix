import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('Bug 33832 - Time Slider resets on lower assets', () => {

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


  it('Bug 33832 - Time Slider resets on lower assets', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    browser.sleep(5000);
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('Demo Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Reference WWTP Client'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('WWTP Plant'))
      .click();

    browser.waitForAngular();
    browser.wait(async () => {
      return appTitle.selectTimeSlider.calendarIconmap.isPresent();
    }, 720000);

    browser.actions().mouseMove(appTitle.selectTimeSlider.calendarIconmap).perform();
    await appTitle.selectTimeSlider.calendarIconmap.click();
    await appTitle.selectTimeSlider.calendarIconStartMap.click();
    await appTitle.selectTimeSlider.startDateboxMap.clear();
    const previousdate = new Date(new Date().setDate(new Date().getDate() - 5));
    appTitle.selectCalendarMonthYear(previousdate);
    await appTitle.selectTimeSlider.calendarApplybtn.last().click();
    browser.sleep(1000);
    await appTitle.selectTimeSlider.calendarOKBtn.last().click();
    browser.waitForAngular();
    const date1 = await appTitle.selectTimeSlider.dateIndicator.getAttribute('textContent');

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('WWTP Plant'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Primary Treatment'))
      .click();

    browser.waitForAngular();
    const date2 = await appTitle.selectTimeSlider.dateIndicator.getAttribute('textContent');

    expect(date1 === date2).toBe(true, 'Bug repeat again, the time slider goes to “now” again');
    browser.waitForAngular();


  });


});
