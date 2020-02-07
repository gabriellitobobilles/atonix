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
    browser.wait(EC.presenceOf(page.RMtab), 18000);
    expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
  });
});
describe('RA Testing > Distributed Asset Example Data > Division 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
    page.RAparentNtree.get((await page.RAparentNtree.getText()).indexOf('RA Testing'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Distributed Asset Example Data'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Division 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnavi4Div1).click().perform();
    expect(page.assetnavi4Div1.isPresent()).toBe(true, 'Division 1 asset is seen');
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
describe('risk assessment create adhoc tree is checking is seen', function () {
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
});