import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
// tslint:disable-next-line:semicolon

describe('19589: Performance Analyst - Availability', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;


  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
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


  it('Step 1: Verify the donuts with its data with respective to its specific color.', async () => {

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
    // $$('[ng-click="vm.selectView(view)"]').get(8).click();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.availability);
    browser.waitForAngular();
    browser.driver.sleep(3000);
    /* Check if the valuess are not null */
    expect(await $$('[class="highcharts-subtitle"]').get(1).getText()).not.toEqual(null);
    /* Check if the valuess are not empty */
    expect(await $$('[class="highcharts-subtitle"]').get(1).getText()).not.toBe('');

    let i = 10;
    while (i >= 0) {
      if (i === 1) {
        await browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-' + i + ' '))
          .get(1)).perform();
        browser.sleep(1000);
        await browser.wait(async () => $$('.highcharts-tooltip').first());
        const name = await $$('.highcharts-tooltip').first().element(by.tagName('text')).$$('tspan').get(3).getText();
        // console.log(name);
        expect(name).not.toBe('');
        expect(name).not.toEqual(null);
        i--;
      } else {
        await browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-' + i + ' '))
          .get(0)).perform();
        browser.sleep(1000);
        await browser.wait(async () => $$('.highcharts-tooltip').first());
        const name = await $$('.highcharts-tooltip').first().element(by.tagName('text')).$$('tspan').get(3).getText();
        // console.log(name);
        expect(name).not.toBe('');
        expect(name).not.toEqual(null);
        i--;

      }

    }

  });

  it('Step 2: Verify Event Category Log.', async () => {

    /** Check that event category is present */
    expect($('[ng-click="vm.addOutageEvent()"]').isPresent()).toBeTruthy();
  });

  it('Step 3: Ensure user is able to add and delete outage event.', async () => {

    /** Adding and Delete Event category log */
    $('[ng-click="vm.addOutageEvent()"]').click();
    browser.waitForAngular();
    expect($('[ng-click="OK()"]').isPresent()).toBeTruthy();
    $('[ng-click="OK()"]').click();
    browser.wait(EC.visibilityOf($$('[ng-repeat="event in vm.eventCategoryLog"]').first()));
    browser.waitForAngular();
    const eventCategoryLogCount = await element.all(by.repeater('event in vm.eventCategoryLog')).count();
    expect(eventCategoryLogCount).toBeGreaterThan(0);
    const eventCount = await $$('[class="highcharts-subtitle"]').last().getText();
    // console.log(eventCount);
    // tslint:disable-next-line:radix
    expect(parseInt(eventCount) === eventCategoryLogCount).toBe(true, 'Event Category log should be equal in number with Event Count');
    expect($$('[ng-repeat="event in vm.eventCategoryLog"]').first().isPresent()).toBeTruthy();

    /** Delete outage event */
    for (let x = eventCategoryLogCount - 1; x >= 0; --x) {
      // console.log(x);
      await $$('[ng-click="vm.deleteOutageEvent(event)"]').get(x).click();
    }
    const eventCategoryLogCountx = await element.all(by.repeater('event in vm.eventCategoryLog')).count();
    expect(eventCategoryLogCountx).not.toBeGreaterThan(0);
    browser.waitForAngular();

  });



});
