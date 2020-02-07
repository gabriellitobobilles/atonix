import { $, $$, browser, protractor } from 'protractor';
import { helper, alert } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('Alerts: Quick Deploy models', () => {

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


  it('Quick Deploy', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.Alert);
    browser.waitForAngular();
    browser.wait(protractor.ExpectedConditions.presenceOf($$('[ng-repeat="model in modelsVM.models"]').first()),
      700000, 'Element taking too long to appear in the DOM');
    $$('[ng-repeat="model in modelsVM.models"]').first().click();
    await appTitle.rightClick($$('[ng-repeat="model in modelsVM.models"]').first());
    $('[ng-click="modelsVM.contextMenuClick(modelsVM.selectedModel,\'modelConfiguration\')"]').click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('nD Test Client'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Stage'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Stage Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Old Regression Unit'))
      .click();

    alerthelper.alertQuickDeploy();

  });


});
