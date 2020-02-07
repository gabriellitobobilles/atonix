import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('Alerts: Creating Rolling Average models', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let win, modelName;

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


  it('Creating Rolling Average Model', async () => {

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
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Old Regression Unit'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Boiler Air & Gas System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Mill System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Mill D'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();


    await appTitle.doubleClicking($$('[ng-model="asset.sensors"]').get(5));
    await $('[ng-click="mdlVM.addModelFromEmptyResults()"]').click();
    expect($('[ng-click="vm.create()"]').isDisplayed()).toBe(true, 'No modal popup show');
    modelName = appTitle.makeid(11);
    modelName = modelName + '_Rolling Average model';
    // * Creating models
    await $('[ng-model="vm.modelName"]').click();
    $('[ng-model="vm.modelName"]').clear();
    $('[ng-model="vm.modelName"]').sendKeys(modelName);
    appTitle.selectDropdownbyNum($('[ng-model="vm.selectedModelType"]'), 1);
    appTitle.selectDropdownbyNum($('[ng-model="vm.selectedOpModeType"]'), 3);
    $('[ng-click="vm.create()"]').click();
    browser.wait(protractor.ExpectedConditions.presenceOf($('[ng-model="$ctrl.inputsConfig.ModelActive"]')),
      700000, 'Element taking too long to appear in the DOM');
    $('[ng-model="$ctrl.inputsConfig.ModelActive"]').click();
    $('[ng-click="$ctrl.localChange(\'ActiveConfiguration\', \'Output\'); $ctrl.localChange(\'ShowHide Range Selector\', true)"]').click();
    browser.wait(EC.stalenessOf($('[class="toast-message"]')));
    await appTitle.selectTimeSlider.calendarIcon.click();
    await appTitle.selectTimeSlider.startDatebox.clear();
    await appTitle.selectTimeSlider.startDatebox.sendKeys('08/01/2018');
    browser.sleep(3000);
    await appTitle.selectTimeSlider.calendarApplybtn.first().click();
    browser.sleep(1000);
    await appTitle.selectTimeSlider.calendarOKBtn.first().click();
    $('[class="fa fa-floppy-o"]').click();
    expect($('[ng-click="$ctrl.ok()"]').isDisplayed()).toBe(true, 'No modal popup show');
    $('[ng-click="$ctrl.ok()"]').click();
    browser.wait(() => {
      return $('[class="modelOutput"]').isDisplayed();
    }, 720000).catch(() => {
      browser.refresh();
    }).then(() => {
      browser.refresh();
    });
    browser.waitForAngular();
    browser.driver.sleep(5000);
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
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Old Regression Unit'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Boiler Air & Gas System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Mill System'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Mill D'))
      .click();

    browser.waitForAngular();
    browser.driver.sleep(5000);
    // tslint:disable-next-line:max-line-length
    // console.log((await $$('[class="text-right lightTableCell ng-binding"]').getText()).indexOf('APR model'));
    const modelIndex = (await $$('[class="text-right lightTableCell ng-binding"]').getText()).indexOf(modelName);
    const divs = await $$('[class="text-right lightTableCell ng-binding"]').get(modelIndex).getText();

    const divs2 = await $$('[class="text-right lightTableCell ng-binding"]')
      .get((await $$('[class="text-right lightTableCell ng-binding"]')
        .getText()).indexOf(modelName) + 7).getText();
    console.log(divs);
    console.log(divs2);

    expect(divs2 === 'Success: Build Successful').toBe(true, 'Model Build was not successful');


  });

  it('Deleting Rolling Average model', async () => {

    // $$('[ng-repeat="model in modelsVM.models"]').first().click();
    await $$('[class="text-right lightTableCell ng-binding"]').get((await $$('[class="text-right lightTableCell ng-binding"]')
      .getText()).indexOf(modelName))
      .click();
    browser.wait(EC.stalenessOf($('[class="toast-message"]')));
    await $('[ng-click="$ctrl.localChange(\'ConfirmDeleteBatch\')"]').click();
    expect($('[ng-click="$ctrl.delete()"]').isDisplayed()).toBe(true, 'Delete Models were not shown');
    $('[ng-click="$ctrl.delete()"]').click();
    console.log(await $('[class="toast-message"]').getText());
    expect(await $('[class="toast-message"]').getText() === 'Model(s) Deleted').toBe(true, 'Deleted models was not successfull');
    browser.wait(EC.stalenessOf($('[class="toast-message"]')));
    browser.refresh();
    browser.waitForAngular();
    browser.driver.sleep(5000);
    expect((await $$('[class="text-right lightTableCell ng-binding"]').getText()).indexOf(modelName) === -1)
      .toBe(true, 'Deleted models was not successfull');

  });


});
