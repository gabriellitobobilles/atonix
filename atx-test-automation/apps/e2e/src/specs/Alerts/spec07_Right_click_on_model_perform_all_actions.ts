import { $, $$, browser, protractor } from 'protractor';
import { helper, alert } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('Alert: Right click on model perform all actions', () => {

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


  it('ModelConfiguration Action', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
    browser.waitForAngular();
    browser.wait(protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()),
      700000, 'Element taking too long to appear in the DOM');



    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.modelConfiguration.click();

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

  it('Diagnostic Drilldown Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.diagnosticDrilldown.click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(alerthelper.diagnosticDrilldown.modelTrendTab.isDisplayed()).toBe(true, `Model Trend tab was not displaying`);
    expect(alerthelper.diagnosticDrilldown.modelHistoryTab.isDisplayed()).toBe(true, `Model History tab was not displaying`);
    browser.close();
    await browser.switchTo().window(win[0]);
  });

  it('Op Mode Configuration Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.opmodeConfiguration.click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(await browser.getTitle() === `Alerts - Op Mode Definition`).toBe(true, `Title is not op mode config`);
    expect(alerthelper.OpmodelConfigView.addNewOperatingModebta.isDisplayed()).toBe(true, `Operating mode button was not displaying`);
    browser.close();
    await browser.switchTo().window(win[0]);
  });


  it('Clear AlertStatus Action', async () => {


    const currentcount = await alerthelper.getTotalModelsONAlertScreeningView();
    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.clearAlertStatus.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    const clearcount = await alerthelper.getTotalModelsONAlertScreeningView();
    expect(currentcount !== clearcount).toBe(true, `Clear AlertStatus is not working because total number of alert was decreasing`);
  });

  it('Clear Diagnose Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.clearAlertDiagnose.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, `Clear Diagnose note was not displaying`);
    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, `Clear Diagnose save button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Clear Diagnose cancel button was not displaying`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });

  it('Model Maintenance Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.modelMaintenance.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, `Operating mode textbox was not displaying`);
    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, `Operating mode save button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Operating mode cancel button was not displaying`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });

  it('Diagnose Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.clearAlertDiagnose.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList,
      validator.priorityOption.priorityOptions);
    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, `Action Diagnose textbox was not displaying`);
    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, `Action Diagnose save button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Action Diagnose cancel button was not displaying`);
    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, `Action Diagnose set as Fav button was not displaying`);
    expect($(`input[type='radio']:checked`).getAttribute('value')).toEqual(`diagnose`, `Diagnose radio button is not enable by default`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });

  it('Model Maintenance Action', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.modelMaintenance.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList,
      validator.priorityOption.priorityOptions);
    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, `Model Maintenance textbox was not displaying`);
    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, `Model Maintenance save button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Model Maintenance cancel button was not displaying`);
    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, `Model Maintenance set as Fav button was not displaying`);
    expect($(`input[type='radio']:checked`).getAttribute('value')).toEqual(`maintenance`, `Diagnose radio button is not enable by default`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });

  it('Creation Action Item', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.createActionItem.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.priorityDropDownList,
      validator.priorityOption.priorityOptions);
    expect(alerthelper.alertScreeningView.noteTxtBox.isDisplayed()).toBe(true, `Creation Action textbox was not displaying`);
    expect(alerthelper.alertScreeningView.saveNoteBtn.isDisplayed()).toBe(true, `Creation Action save button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Creation Action cancel button was not displaying`);
    expect(alerthelper.alertScreeningView.setAsFavorite.isDisplayed()).toBe(true, `Creation Action set as Fav button was not displaying`);
    expect($(`input[type='radio']:checked`).getAttribute('value')).toEqual(`note`, `Diagnose radio button is not enable by default`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });

  it('Create Open Issue', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.createOpenIssue.click();
    browser.waitForAngular();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(await browser.getTitle() === `Issue`).toBe(true, `Title is not model config`);
    appTitle.comparedropdownListValue(alerthelper.alertScreeningView.issueClassDropdown,
      validator.issueClass.issueClasses);
    expect(alerthelper.alertScreeningView.createNewIssuebtn.isDisplayed()).toBe(true, `Create new issue button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNewIssuebtn.isDisplayed()).toBe(true, `Cancel new issue button was not displaying`);
    browser.close();
    await browser.switchTo().window(win[0]);


  });



  it('Show Related Models', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.showRelatedmodel.click();
    browser.waitForAngular();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(await browser.getTitle() === `Alerts`).toBe(true, `Title is not Alerts Screening View`);
    expect(alerthelper.alertScreeningView.addNewModelFilter.first().isDisplayed()).toBe(true, `Add new Filter button was not displaying`);
    browser.close();
    await browser.switchTo().window(win[0]);


  });

  it('Show Related Issues', async () => {


    alerthelper.alertScreeningView.modelsVM.first().click();
    await appTitle.rightClick(alerthelper.alertScreeningView.modelsVM.first());
    alerthelper.alertScreeningView.showRelatedIssue.click();
    browser.waitForAngular();
    browser.driver.sleep(2000);
    expect(alerthelper.alertScreeningView.createNewRelatedIssuebtn.isDisplayed())
      .toBe(true, `Create new related issue button was not displaying`);
    expect(alerthelper.alertScreeningView.addNewIssueFilter.first().isDisplayed()).toBe(true, `Add new Filter button was not displaying`);
    expect(alerthelper.alertScreeningView.cancelNoteBtn.isDisplayed()).toBe(true, `Show Related Issues cancel button was not displaying`);
    alerthelper.alertScreeningView.cancelNoteBtn.click();
  });


});
