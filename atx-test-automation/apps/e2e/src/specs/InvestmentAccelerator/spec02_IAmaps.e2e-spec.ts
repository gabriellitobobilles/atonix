import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { InvestmentAccelerator } from '../../page/InvestmentAccelerator_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
const user = new User()
const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',

}

describe('asset360 investment accelerator page app', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should see risk assessment page', () => {
    user.logIn(userObj)
    console.log('Step 1');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.investAcrapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.invstAccViews), 10000);
    expect(page.invstAccViews.isPresent()).toBe(true, 'Investment Accelerator app seen');
  });
});
describe('Sekoia Demo Clients > UGM Historical Reliability Plan', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on Sekoia Demo Client and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.invisibilityOf(element(by.className('progress-bar'))), 128000);
    page.IAparentNtree.get((await page.IAparentNtree.getText()).indexOf('SEKOIA Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    await browser.wait(EC.presenceOf(page.assetnaviUGM), 69000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('UGM Historical Reliability Plan'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnaviUGM).click().perform();
    expect(page.assetnaviUGM.isPresent()).toBe(true, 'UGM Historical Reliability Plan is selected');
    browser.waitForAngular();
  });
});
describe('asset360 investment accelerator map tab', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should go to Investment Accelerator map tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > circle');
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    await browser.actions().mouseMove(page.maptab).click().perform();
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
  it('should click on map type dropdown Program Status on map tab', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > path');
    browser.sleep(6000);
    await browser.actions().mouseMove(page.mapdrpdown).click().perform();
    page.selectMapDropdown('Program Status');
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
  it('should click on map type dropdown Project Status on map tab', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    const elem = $('#geoSpa_layers > svg > g > circle');
    await browser.actions().mouseMove(page.mapdrpdown).click().perform();
    page.selectMapDropdown('Project Status');
    await browser.wait(EC.presenceOf(elem), 128000);
    browser.waitForAngular();
    expect(elem.isPresent());
  });
  it('should click on zoom in and zoom out on investment accelerator map', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
  });
  it('should ra map tab then click on a asset on the map', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > circle');
    await browser.wait(EC.presenceOf(elem), 28000);
    browser.actions().click(elem.getWebElement()).perform();
    browser.sleep(5000);
    await browser.wait(EC.presenceOf(page.infotabPanel), 145000);
    expect(await page.mapAttrTrayOtab.isPresent()).toBe(true, 'multiple select of asset on map is not working');
    expect(await page.infotabPanel.isPresent()).toBe(true, 'asset info tray on map is not working');
    browser.waitForAngular();
  });
  it('should ra map tab then click multiselect on a asset on the map', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.actions().mouseMove(page.closeAsetInfo).click().perform();
    browser.sleep(5000);
    const elem = $$('#geoSpa_layers > svg > g > circle');
    await browser.wait(EC.presenceOf(elem.get(1)), 28000);
    await browser.actions().mouseMove(element(by.css('a.btn.multiSelectButton'))).click().perform();
    browser.actions().click(elem.get(3)).perform();
    browser.actions().click(elem.get(24)).perform();
    browser.actions().click(elem.get(58)).perform();
    browser.actions().click(elem.get(71)).perform();
    expect(await page.mapAttrTrayXpanded.isPresent()).toBe(true, 'multiple select of asset on map is not working');
    expect(await page.mapAttrTrayHidden.isPresent()).toBe(true, 'multiple select of asset on map is not working');
  });
  it('should see the map legend by hovering in a key symbol on the map', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    browser.actions().mouseMove(page.closeAsetInfo).click().perform();
    await browser.wait(EC.elementToBeClickable(page.mapToggleKey), 250000);
    browser.actions().mouseMove(page.mapToggleKey).click().perform();
    browser.sleep(5000);
    browser.actions().mouseMove(page.mapTkeyCircuit).click().perform();
    await browser.wait(EC.invisibilityOf($('#geoSpa_layers > svg > g > path')), 128000);
    browser.actions().mouseMove(page.mapTkeyPoles).click().perform();
    await browser.wait(EC.invisibilityOf($('#geoSpa_layers > svg > g > circle')), 128000);
    browser.sleep(5000);
    browser.actions().mouseMove(page.mapTkeyCircuit).click().perform();
    await browser.wait(EC.presenceOf($('#geoSpa_layers > svg > g > path')), 128000);
    browser.actions().mouseMove(page.mapTkeyPoles).click().perform();
    await browser.wait(EC.presenceOf($('#geoSpa_layers > svg > g > circle')), 128000);
    browser.sleep(5000);
    expect(($('#geoSpa_layers > svg > g > circle')).isPresent());
    expect(($('#geoSpa_layers > svg > g > path')).isPresent());
  });
});