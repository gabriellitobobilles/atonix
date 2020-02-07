import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
const user = new User()
const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',

}
const uniqueNme = (Date.now()).toString().slice(8)

describe('asset360 risk assessment page app', function () {
  var page;
  page = new RskAssessment();

  it('should see risk assessment page', () => {
    user.logIn(userObj)
    console.log('Step 1');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.riskAsmntapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.RMtab), 180000);
    expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
  });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 85000);
    await browser.actions().mouseMove(page.assetnavi4RA).click().perform();
    expect(page.assetnavi4RA.isPresent()).toBe(true, 'RA Testing asset is seen');
  });
});
describe('asset360 risk assessment asset navigator edit tree is disabled', function () {
  var page;
  page = new RskAssessment();

  it('should check if edit tree button is disabled', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.scoreCardNum), 118000);
    await browser.actions().mouseMove(page.assetExpEditTree).perform();
    browser.wait(EC.invisibilityOf(page.scoreCardNum), 118000);
    browser.wait(EC.not(EC.elementToBeClickable(page.assetExpEditTree)), 105000);
    browser.waitForAngular();
    expect(page.assetExpEditTree.isPresent()).toBe(true, 'edit tree was clicked');
  });
});
describe('risk assessment adhoc tree is checking is seen', function () {
  var page;
  page = new RskAssessment();

  it('should check if create tree button is enabled', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(page.assetExpCreateTree), 128000);
    await browser.actions().mouseMove(page.assetExpCreateTree).click().perform();
    browser.sleep(3000)
    await browser.wait(EC.visibilityOf(page.assetAdHocTreeDlg), 128000);
    browser.waitForAngular();
    expect(page.saveBtnAdHocDlg.isPresent()).toBe(true, 'save button on adhoc tree dialog is not seen');
  });
  it('should check create private adhoc tree functionalities and save', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(page.adHocInputTreeName), 128000);
    await page.adHocInputTreeName.sendKeys('Prv', +uniqueNme);
    browser.sleep(3000)
    await browser.wait(EC.elementToBeClickable(page.saveBtnAdHocDlg), 128000);
    await browser.actions().mouseMove(page.saveBtnAdHocDlg).click().perform();
    browser.waitForAngular();
    expect(page.treePopSaved.isPresent()).toBe(true, 'Tree Saved toast message appears');
  });
  it('should check create public adhoc tree functionalities and save', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(page.assetExpCreateTree), 128000);
    browser.sleep(3000);
    await browser.actions().mouseMove(page.assetExpCreateTree).click().perform();
    browser.sleep(3500);
    browser.wait(EC.elementToBeClickable(page.adHocInputTreeName), 128000);
    await page.adHocInputTreeName.sendKeys('Pub', +uniqueNme);
    browser.sleep(3000);
    await browser.actions().mouseMove(page.adHocPubChkbox).click().perform();
    await browser.wait(EC.elementToBeClickable(page.saveBtnAdHocDlg), 128000);
    await browser.actions().mouseMove(page.saveBtnAdHocDlg).click().perform();
    browser.waitForAngular();
    expect(page.treePopSaved.isPresent()).toBe(true, 'Tree Saved toast message appears');
  });
});
describe('asset360 risk assessment then go to view explorer app', function () {
  var page;
  page = new RskAssessment();

  it('should see view explorer page', () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.viewExpapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.viewExpTitle), 100000);
    expect(page.viewExpTitle.isPresent()).toBe(true, 'View explorer app not seen');
  });
  it('should click on RA Testing and select the created public and private adhoc tree', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 85000);
    browser.wait(EC.elementToBeClickable(page.assetnavi4RA), 128000);
    await browser.actions().mouseMove(page.assetnavi4RA).click().perform();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(page.assetNaviDrpDwn), 128000);
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetNaviDrpDwn).click().perform();
    browser.sleep(3500);
    page.assetNaviDrpDwn.click();
    await browser.wait(EC.visibilityOf(page.veAssetDdmenu), 128000);
    page.selectVEnavDropdown('Prv' + uniqueNme);
    browser.sleep(3500);
    page.assetNaviDrpDwn.click();
    await browser.wait(EC.visibilityOf(page.veAssetDdmenu), 128000);
    page.selectVEnavDropdown('Pub' + uniqueNme);
    expect(page.veDropDownSel.isPresent()).toBe(true, 'create adhoc was not seen');
  });
});