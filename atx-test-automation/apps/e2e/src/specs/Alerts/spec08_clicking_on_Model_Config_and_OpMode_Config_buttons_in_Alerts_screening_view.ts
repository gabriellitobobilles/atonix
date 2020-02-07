import { $, $$, browser, protractor } from 'protractor';
import { helper, alert } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('Alert: Clicking on Model Config & Op Mode config buttons in Alerts screening view', () => {

  const appTitle = new helper();
  const alerthelper = new alert();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let win;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
    browser.manage().timeouts().setScriptTimeout(900000);
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


  it('Model Config', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
    browser.waitForAngular();
    browser.wait(protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()),
      700000, 'Element taking too long to appear in the DOM');

    alerthelper.alertScreeningView.modelsVM.first().click();
    alerthelper.alertScreeningView.modeConfig.click();

    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(await browser.getTitle() === `Alerts - Model Config`).toBe(true, `Title is not model config`);
    expect(alerthelper.modelConfigView.singleViewInputTab.isDisplayed()).toBe(true, `Input Tab is not showing`);
    expect(alerthelper.modelConfigView.singleViewAlertTab.isDisplayed()).toBe(true, `Alert Tab is not showing`);
    expect(alerthelper.modelConfigView.singleViewAnomaliesTab.isDisplayed()).toBe(true, `Anomalies Tab is not showing`);
    expect(alerthelper.modelConfigView.singleViewDataTab.isDisplayed()).toBe(true, `Data Tab is not showing`);
    browser.close();
    await browser.switchTo().window(win[0]);



  });

  it('Op Mode config', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    alerthelper.alertScreeningView.opmodeConfig.click();

    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(await browser.getTitle() === `Alerts - Op Mode Definition`).toBe(true, `Title is not op mode config`);
    expect(alerthelper.OpmodelConfigView.addNewOperatingModebta.isDisplayed()).toBe(true, `Operating mode button was not displaying`);
    await browser.switchTo().window(win[0]);



  });

});
