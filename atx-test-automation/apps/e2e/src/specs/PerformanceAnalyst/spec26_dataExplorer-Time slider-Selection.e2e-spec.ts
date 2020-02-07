import { ElementFinder, by, element, $, $$, browser, protractor, ElementArrayFinder } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

// tslint:disable-next-line:max-line-length
describe('19611: Data Explorer - Time slider - Selection ', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let previousdate, currentdate;

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


  it('Step 1:  Change time range to less than 4 days and verify switch to higher frequency data', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('All Clients'))
      .click();
    await appTitle.trendSelector();
    browser.waitForAngular();
    browser.driver.sleep(3000);
    appTitle.selectingDataExplorerTrends('BCP 11 MOTOR FILTER DP');


    appTitle.selectTimeSlider.calendarIcon.click();
    expect(appTitle.selectTimeSlider.calendarIconStart.isPresent()).toBe(true, 'open start calendar was not present');
    appTitle.selectTimeSlider.calendarIconStart.click();
    const dateStart = new Date(new Date().setDate(new Date().getDate() - 4));
    appTitle.selectCalendarMonthYear(dateStart);
    expect(appTitle.selectTimeSlider.calendarIconEnd.isPresent()).toBe(true, 'open end calendar was not present');
    appTitle.selectTimeSlider.calendarIconEnd.click();
    const dateEnd = new Date(new Date().setDate(new Date().getDate()));
    appTitle.selectCalendarMonthYear(dateEnd);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();


  });

  it('Step 2:  Change time range with handles in calendar', async () => {


    // **
    // * Change time range with handles
    // */
    expect($('[id="navEnd"]').isPresent()).toBe(true, 'End handle circle was not present');
    expect($('[id="navStart"]').isPresent()).toBe(true, 'Start handle circle was not present');
    const target = $('[id="navEnd"]');
    const elem = $('[id="navStart"]').$('g').$('circle');
    await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    browser.waitForAngular();

  });

  it('Step 3:  Change time by typing date range in calendar', async () => {


    // **
    // * Change time range by typing date range in calendar
    // */
    appTitle.selectTimeSlider.calendarIcon.click();
    expect(appTitle.selectTimeSlider.calendarIconStart.isPresent()).toBe(true, 'open start calendar was not present');
    expect(element(by.model('trVM.popupConfiguration.date1')).isPresent()).toBe(true, 'open start text box calendar was not present');
    previousdate = appTitle.getPreviousdaysDate(5);
    await element(by.model('trVM.popupConfiguration.date1')).clear();
    await element(by.model('trVM.popupConfiguration.date1')).sendKeys(previousdate);
    expect(appTitle.selectTimeSlider.calendarIconEnd.isPresent()).toBe(true, 'open end calendar was not present');
    expect(element(by.model('trVM.popupConfiguration.date2')).isPresent()).toBe(true, 'open end text box calendar was not present');
    await element(by.model('trVM.popupConfiguration.date2')).clear();
    currentdate = appTitle.getCurrentDate();
    await element(by.model('trVM.popupConfiguration.date2')).sendKeys(currentdate);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();

  });

});
