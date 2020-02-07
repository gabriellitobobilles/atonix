import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
import { Helper } from '../../helpers/helper';
const user = new User();
const helper = new Helper();
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
    browser.wait(EC.presenceOf(page.RMtab), 10000);
    expect(page.RMtab.isPresent()).toBe(true, 'Risk Matrix assessment app');
  });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
    helper.waitForDisappear($(`#overlay-background`));
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
    await browser.actions().mouseMove(page.assetnavixp4dsub1).click().perform();
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000);
    browser.waitForAngular();
    expect(page.assetnavixp4dsub1.isPresent()).toBe(true, 'Substation 1 asset is seen');
  });
});
describe('asset360 risk matrix map tab', function () {
  var page;
  page = new RskAssessment();

  it('should go to RA map tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > circle');
    browser.sleep(6000);
    await browser.actions().mouseMove(page.maptab).click().perform();
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
  it('should click on map type dropdown Risk map (Zoom level) on RA map', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > path');
    page.mapdrpdown.click();
    await browser.actions().mouseMove(page.mapdrpdown).click().perform();
    page.selectMapDropdown('Risk Map (Zoom Levels)');
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
  it('should click on map type dropdown Risk Score on RA map', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > path');
    page.mapdrpdown.click();
    await browser.actions().mouseMove(page.mapdrpdown).click().perform();
    page.selectMapDropdown('Risk Score');
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
});
describe('risk assessment app using timeslider on map tab', function () {
  var page;
  page = new RskAssessment();

  it('should click time slider then slide it to the left', async () => {
    const EC = protractor.ExpectedConditions;
    const ylwCircle = $(`#navIndicatorHandle`)
    console.log('Step 6');
    browser.waitForAngular();
    browser.sleep(5000);
    browser.actions().mouseMove(ylwCircle).click().perform();
    const dateTxtInfo1 = await element(by.id('navIndicatorDate')).getText();
    console.log('origin: ', dateTxtInfo1);
    browser.actions().mouseDown(ylwCircle).mouseMove({ x: -100, y: 0 }).mouseUp().perform();
    const dateTxtInfo2 = await element(by.id('navIndicatorDate')).getText();
    console.log('slide left: ', dateTxtInfo2);
    expect(dateTxtInfo1).not.toEqual(dateTxtInfo2);
  });
  it('should click time slider then slide it to the right', async () => {
    browser.waitForAngular();
    const EC = protractor.ExpectedConditions;
    const ylwCircle = element(by.id('navIndicatorHandle'));
    console.log('Step 7');
    browser.waitForAngular();
    browser.sleep(5000);
    browser.actions().mouseMove(ylwCircle).click().perform();
    const datetext1 = await element(by.id('navIndicatorDate')).getText();
    console.log('origin: ', datetext1);
    browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
    const datetext2 = await element(by.id('navIndicatorDate')).getText();
    console.log('slide right: ', datetext2);
    await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
    expect(datetext1).not.toEqual(datetext2);
  });
  it('should click on zoom in and zoom out on risk assessment map', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
  });
  it('should see the map legend by hovering in a key symbol on the map', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    const elemC = $('#geoSpa_layers > svg > g > circle');
    browser.sleep(3600);
    await browser.wait(EC.elementToBeClickable(page.mapToggleKey), 250000);
    browser.actions().mouseMove(page.mapToggleKey).click().perform();
    browser.sleep(3600);
    browser.actions().mouseMove(page.mapKeyPadTrans).click().perform();
    await browser.wait(EC.invisibilityOf($('#geoSpa_layers > svg > g > circle')), 128000);
    browser.actions().mouseMove(page.mapKeyUGPowCab).click().perform();
    await browser.wait(EC.invisibilityOf($('#geoSpa_layers > svg > g > path')), 128000);
    browser.actions().mouseMove(page.mapKeyDistrFeed).click().perform();
    browser.sleep(3600);
    browser.actions().mouseMove(page.mapKeyPadTrans).click().perform();
    await browser.wait(EC.presenceOf($('#geoSpa_layers > svg > g > circle')), 128000);
    browser.actions().mouseMove(page.mapKeyUGPowCab).click().perform();
    await browser.wait(EC.presenceOf($('#geoSpa_layers > svg > g > path')), 128000);
    browser.actions().mouseMove(page.mapKeyDistrFeed).click().perform();
    browser.sleep(3600);
    expect(elemC.isPresent());
  });
});
describe('asset360 risk matrix map filtering and select asset', function () {
  var page;
  page = new RskAssessment();
  it('should ra map tab then click on the search filter button', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    const elemC = $('#geoSpa_layers > svg > g > circle');
    browser.sleep(3800);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    browser.sleep(3800);
    await page.searchTboxMapFltr.sendKeys('asset=xfmr*');
    await browser.actions().mouseMove(page.raSerchFltrBtn).click().perform();
    browser.sleep(3800);
    await browser.wait(EC.invisibilityOf($('#geoSpa_layers > svg > g > path')), 128000);
    browser.waitForAngular();
    expect(elemC.isPresent());
  });
  it('should ra map tab then click on the search filter clear button', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    const elemP = $('#geoSpa_layers > svg > g > path');
    browser.sleep(3800);
    await browser.actions().mouseMove(page.raSerchClrFltr).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf($('#geoSpa_layers > svg > g > path')), 128000);
    await browser.actions().mouseMove(page.mapFilterBtn).click().perform();
    browser.waitForAngular();
    expect(elemP.isPresent());
  });
  it('should ra map tab then click on a asset on the map', async () => {
    console.log('Step 12');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > circle');
    browser.sleep(20000);
    browser.actions().click(elem.getWebElement()).perform();
    browser.waitForAngular();
    expect(await page.infotabPanel.isPresent()).toBe(true, 'asset info tray on map is not working');
  });
  it('should ra map tab then click multiselect on a asset on the map', async () => {
    console.log('Step 13');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    browser.actions().mouseMove(page.closeAsetInfo).click().perform();
    const elemC = $$('#geoSpa_layers > svg > g > circle');
    const elemP = $$('#geoSpa_layers > svg > g > path');
    await browser.wait(EC.presenceOf(elemC.get(5)), 28000);
    browser.sleep(5000);
    await browser.actions().mouseMove(element(by.css('a.btn.multiSelectButton'))).click().perform();
    browser.actions().click(elemC.get(6)).perform();
    browser.actions().click(elemC.get(7)).perform();
    browser.actions().click(elemC.get(8)).perform();
    browser.actions().click(elemP.get(3)).perform();
    browser.actions().click(elemP.get(6)).perform();
    browser.actions().click(elemP.get(7)).perform();
    expect(await page.mapAttrTrayXpanded.isPresent()).toBe(true, 'multiple select of asset on map is not working');
    expect(await page.mapAttrTrayHidden.isPresent()).toBe(true, 'multiple select of asset on map is not working');
  });
});