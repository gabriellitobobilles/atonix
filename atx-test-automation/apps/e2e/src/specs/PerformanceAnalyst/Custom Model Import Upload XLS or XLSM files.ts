import { $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


import * as path from 'path';

describe('19585: Performance Analyst  - Alerts - Chart', () => {

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


  it('Step 1: Verify import file that is > 100MB confirm the file is not stored', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    await appTitle.clickPerformanceAnalysApp(validator.AppName.assetExplorer);
    browser.waitForAngular();
    await appTitle.customeModelImport.treeControllerEditMode.click();
    browser.waitForAngular();
    expect(appTitle.customeModelImport.EditModeHide.isPresent()).toBe(true, 'Editing asset is not working');

    await appTitle.assetExplorerNavElemSelector.assetNodeTree.get((await appTitle.assetExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('nD Test Client'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.assetExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.assetExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Stage'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.assetExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.assetExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Stage Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test.xlsm';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.customeModelImport.errorTextLocation.getText() === validator.customModelErrorMessage.InvalidfileSize).toBe(true, 'Error is not consistent');
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');

  });

  it('Step 2: Verify import file that is < 1KB confirm the file is not stored', async () => {


    appTitle.customeModelImport.acmVMExit.click();
    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test3.xls';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.customeModelImport.errorTextLocation.getText() === validator.customModelErrorMessage.InvalidfileSize).toBe(true, 'Error is not consistent');
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');

  });

  it('Step 3: Verify import file that is not XLS or XLSM, confirm it is not stored', async () => {


    appTitle.customeModelImport.acmVMExit.click();
    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test.txt';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.customeModelImport.errorTextLocation.getText() === validator.customModelErrorMessage.InvalidfileExtension).toBe(true, 'Error is not consistent');
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');

  });

  it('Step 4: Verify import file that is XLSM and the size meets criteria, confirm it is stored', async () => {


    appTitle.customeModelImport.acmVMExit.click();
    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test2.xlsm';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled())
      .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');


  });

  it('Step 5: Verify import file that is XLS and the size meets criteria, confirm it is stored', async () => {


    appTitle.customeModelImport.acmVMExit.click();
    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test2.xls';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled())
      .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');


  });


  it('Step 6: DEFECT 31485, Page does not refresh on selecting a "Choose File" button.', async () => {


    appTitle.customeModelImport.acmVMExit.click();
    // tslint:disable-next-line:max-line-length
    browser.actions().mouseMove(appTitle.assetExplorerNavElemSelector.assetNode.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit'))).perform();
    browser.waitForAngular();
    browser.driver.sleep(1000);
    // tslint:disable-next-line:max-line-length
    appTitle.customeModelImport.configurationIcon.get((await appTitle.assetExplorerNavElemSelector.assetNode.getText()).indexOf('Old Regression Unit')).click();
    browser.waitForAngular();
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');
    // tslint:disable-next-line:prefer-const
    let fileToUpload = '../../../src/test_Data/test.txt';
    // tslint:disable-next-line:prefer-const
    let absolutePath = path.resolve(__dirname, fileToUpload);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath);
    expect(await appTitle.customeModelImport.errorTextLocation.getText()
      === validator.customModelErrorMessage.InvalidfileExtension)
      .toBe(true, 'Error is not consistent');
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled()).toBe(false, 'Import file button is not enable by default');


    // tslint:disable-next-line:prefer-const
    let fileToUpload2 = '../../../src/test_Data/test2.xls';
    // tslint:disable-next-line:prefer-const
    let absolutePath2 = path.resolve(__dirname, fileToUpload2);
    appTitle.customeModelImport.fileUpload.sendKeys(absolutePath2);
    expect(await appTitle.customeModelImport.acmVMimportBtn.isEnabled())
      .toBe(true, 'Import file button is after correct file is uploaded and IsAlerts = 1');
  });

});


