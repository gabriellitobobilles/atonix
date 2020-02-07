import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
import { Helper } from '../../helpers/helper'
const user = new User()
const helper = new Helper()
const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',

}
const uniqueVal = Date.now();

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
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1 > Feeder 1', function () {
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
    browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('District 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform();
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Feeder 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000);
    expect(page.assetnavixp4dfed1.isPresent()).toBe(true, 'Asset Feeder 1 is selected');
  });
});
describe('asset360 risk matrix tab and list tab, then choose Save and Continue', function () {
  var page;
  var uniqueVal = Date.now();
  page = new RskAssessment();

  it('should drag and select a risk matrix blocks, zoom-in ', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(async () => await browser.element(by.css('#ra-spinner.ng-hide')).isPresent());
    const x1 = await page.getRiskValue('High Risk');
    console.log('Before High: ', await page.getRiskValue('High Risk'));
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(91)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(65)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
    const x2 = await page.getRiskValue('High Risk');
    console.log('After High: ', await page.getRiskValue('High Risk'));
    expect(x1).not.toEqual(x2, 'risk values should not be the same');
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should ra map tab then click on the search filter button', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    console.log('Before Medium: ', await page.getRiskValue('Medium Risk'));
    const y1 = await page.getRiskValue('Medium Risk');
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    browser.sleep(3000);
    await page.searchTboxMapFltr.sendKeys('asset=xfmr*');
    await browser.actions().mouseMove(page.raSerchFltrBtn).click().perform();
    browser.sleep(3000);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000);
    console.log('After Medium: ', await page.getRiskValue('Medium Risk'));
    const y2 = await page.getRiskValue('Medium Risk');
    expect(y1).not.toEqual(y2, 'risk values should not be the same');
    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should click on list tab and click on save and continue', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3700);
    await browser.actions().mouseMove(page.listTab).click().perform();
    await browser.wait(EC.presenceOf(page.saveContiBtn), 28000);
    page.saveContiBtn.click();
    page.saveQsrchTitleTbox.clear();
    await page.saveQsrchTitleTbox.sendKeys('SaveContinue', +uniqueVal);
    page.saveQsOKBtn.click();
    await browser.wait(EC.invisibilityOf(page.loadListSpin), 128000);
    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should check list tab details is correct', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
    console.log('text: ', await page.srchListTbox.getAttribute('value'));
    expect(await page.srchListTbox.getAttribute('value')).toEqual('asset=xfmr*');
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is not visible');
    browser.waitForAngular();
  });
  it('should clear list, clear zoom-in filter, and delete quicksearch list', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    await browser.actions().mouseMove(page.clearListTbox).click().perform();
    page.raSerchFltrBtn.click();
    browser.wait(EC.visibilityOf(page.noListViewSpin), 28000);
    page.toggleListSrch.click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    await browser.actions().mouseMove(page.clearApplyFilter).click().perform();
    page.moreListOption.click();
    await browser.actions().mouseMove(page.moreLOptionDel).click().perform();
    browser.switchTo().alert().accept();
    expect(page.QSdeleteToast.isPresent()).toBe(false, 'QuickSearch deleted toast is no longer seen');
    browser.sleep(3500);
    browser.waitForAngular();
  });
});
describe('asset360 risk matrix tab and list tab, then choose Retain Search but Dont Save Yet', function () {
  var page;
  page = new RskAssessment();

  it('should drag and select a risk matrix blocks, zoom-in ', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3700);
    await browser.actions().mouseMove(page.RMtab).click().perform();
    expect(page.scoreCardNum.isPresent()).toBe(false, 'Default Scorecard is longer seen');
    browser.sleep(3650);
    browser.actions().mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(43)'))).perform();
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(43)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(17)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);

    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should ra matrix tab then click on the search filter button', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    browser.sleep(3500);
    await page.searchTboxMapFltr.sendKeys('asset=xfmr*');
    await browser.actions().mouseMove(page.raSerchFltrBtn).click().perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000);
    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should click on list tab and click on Retain Search but Dont Save Yet', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3700);
    await browser.actions().mouseMove(page.listTab).click().perform();
    await browser.wait(EC.presenceOf(page.noSaveRcontinue), 28000);
    page.noSaveRcontinue.click();
    await browser.wait(EC.invisibilityOf(page.loadListSpin), 128000);
    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should check list tab details is correct', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
    console.log('text: ', await page.srchListTbox.getAttribute('value'));
    expect(await page.srchListTbox.getAttribute('value')).toEqual('asset=xfmr*');
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
    browser.waitForAngular();
  });
  it('should clear list, and clear zoom-in filter', async () => {
    console.log('Step 12');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    await browser.actions().mouseMove(page.clearListTbox).click().perform();
    page.raSerchFltrBtn.click();
    browser.wait(EC.visibilityOf(page.noListViewSpin), 28000);
    page.toggleListSrch.click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    await browser.actions().mouseMove(page.clearApplyFilter).click().perform();
    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
    browser.sleep(3500);
    browser.waitForAngular();
  });
});
describe('asset360 risk matrix tab and list tab, then choose Clear Search and Continue', function () {
  var page;
  page = new RskAssessment();

  it('should drag and select a risk matrix blocks, zoom-in ', async () => {
    console.log('Step 13');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3550);
    await browser.actions().mouseMove(page.RMtab).click().perform();
    page.ClearSrchContinue.click();
    expect(page.scoreCardNum.isPresent()).toBe(false, 'Default Scorecard is longer seen');
    browser.sleep(3650);
    browser.actions().mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(86)'))).perform();
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(86)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(59)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);

    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should ra matrix tab then click on the search filter button', async () => {
    console.log('Step 14');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    browser.sleep(3500);
    await page.searchTboxMapFltr.sendKeys('asset=xfmr*');
    await browser.actions().mouseMove(page.raSerchFltrBtn).click().perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000);
    expect(page.mapLoadSpinr.isPresent()).toBe(false, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should click on list tab and click on Clear Search and Continue', async () => {
    console.log('Step 15');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3700);
    await browser.actions().mouseMove(page.listTab).click().perform();
    await browser.wait(EC.presenceOf(page.ClearSrchContinue), 28000);
    page.ClearSrchContinue.click();
    await browser.wait(EC.invisibilityOf(page.loadListSpin), 128000);
    expect(page.loadListSpin.isPresent()).toBe(true, 'map loading spinner is no longer seen');
    browser.waitForAngular();
  });
  it('should check list tab details is correct', async () => {
    console.log('Step 16');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    browser.wait(EC.visibilityOf(page.srchListTbox), 28000);
    console.log('text: ', await page.srchListTbox.getAttribute('value'));
    expect(await page.srchListTbox.getAttribute('value')).not.toEqual('asset=xfmr*');
    await browser.actions().mouseMove(page.toggleListSrch).click().perform();
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
    browser.waitForAngular();
  });
});