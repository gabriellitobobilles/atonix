import { $, $$, browser, protractor } from 'protractor';
import { alert, helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('Alerts: Model Config Add Contraints', () => {

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


  it('Verify the duration drop down displays only: seconds, minutes and hour.', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
    browser.waitForAngular();
    browser.wait(protractor.ExpectedConditions.presenceOf(alerthelper.alertScreeningView.modelsVM.first()),
      700000, 'Element taking too long to appear in the DOM');


    await alerthelper.rightClickingModelName(validator.alertScreeningViewTestData.siitest);
    alerthelper.alertScreeningView.modelConfiguration.click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern Station'))
      .click();

    alerthelper.selectModelandClick(validator.alertSingleViewTestData.siitest);

    browser.wait(EC.stalenessOf(alerthelper.alertCriteria.loadingSheen));
    await alerthelper.alertCriteria.alertCriteriaTab.click();

    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Area*/
    await alerthelper.alertCriteria.AnomalyAreaDefaultCheckBox.first().click();

    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTime.first(),
      validator.alertConstraintsTimeDuration.timeDuration);
    browser.waitForAngular();
    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyAreaFastResponseTime.first(),
      validator.alertConstraintsTimeDuration.timeDuration);


    // **  Verify the duration drop down displays only: seconds, minutes and hour  for AnomalyOscillation Area*/
    await alerthelper.alertCriteria.AnomalyOscillationDefaultCheckBox.first().click();
    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyOscillationDuration.first(),
      validator.alertConstraintsTimeDuration.timeDuration);

    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
    await alerthelper.alertCriteria.AnomalyFrequencyDefaultCheckBox.first().click();
    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyFrequencyDuration.first(),
      validator.alertConstraintsTimeDuration.timeDuration);

    // **  Verify the duration drop down displays only: seconds, minutes and hour  for Anomaly Frequency Area*/
    await alerthelper.alertCriteria.ActivateFrozenCheckBox.first().click();
    appTitle.comparedropdownListValue(alerthelper.alertCriteria.alertAnomalyFrozenDataDuration.first(),
      validator.alertConstraintsTimeDuration.FrozenDataDurationtimeDuration);
    browser.waitForAngular();

  });

  it('Verify that selected duration is not greater than 6' +
    'hours or 360 minutes or 21600 seconds and verify a red box is displayed around the duration text box.', async () => {

      for (let cnt = 0; cnt <= validator.alertConstraintsTimeDuration.timeDuration.length - 1; cnt++) {

        alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().click();
        alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyAreaFastResponseValueInput.first().sendKeys(900);
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().click();
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseValueInput.first().sendKeys(900);
        alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().click();
        alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyAreaFastResponseTimeInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
        appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyAreaFastResponseTime.first(),
          validator.alertConstraintsTimeDuration.timeDuration[cnt]);
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().click();
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTimeInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
        appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyAreaSlowResponseTime.first(),
          validator.alertConstraintsTimeDuration.timeDuration[cnt]);


        await alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().click();
        alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyOscillationDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
        appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyOscillationDuration.first(),
          validator.alertConstraintsTimeDuration.timeDuration[cnt]);

        alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().click();
        alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyFrozenDataDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
        appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyFrozenDataDuration.first(),
          validator.alertConstraintsTimeDuration.timeDuration[cnt]);

        alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().click();
        alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().clear();
        alerthelper.alertCriteria.alertAnomalyFrequencyDurationInput.first().sendKeys(validator.alertDataDuration.dataDuration[cnt]);
        appTitle.selectDropdownbyString(alerthelper.alertCriteria.alertAnomalyFrequencyDuration.first(),
          validator.alertConstraintsTimeDuration.timeDuration[cnt]);

        alerthelper.alertCriteria.savebtn.click();
        browser.sleep(2000);
        // console.log(await $('[class="toast-message"]').getText());
        expect(alerthelper.alerToastMessage.toastMessage.isDisplayed()).toBe(true);

      }
    });


});
