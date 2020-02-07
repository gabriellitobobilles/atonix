import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
import { AngularPage } from '../../page/page_PNsekoia'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
const user = new User()
const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',

}

describe('asset360 sekoia page app and select a specific asset', function () {
  var page;
  page = new AngularPage();

  it('should see SEKOIA page', () => {
    user.logIn(userObj)
    console.log('Step 27');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    page.sekoiaapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 10000);
  });
  it('should click on sekoia demo client and expand its assets', async () => {
    console.log('Step 28');
    var EC = protractor.ExpectedConditions;
    browser.actions().mouseMove(page.assetnavi3).click().perform();
    browser.sleep(2500);
    await browser.actions().mouseMove(page.assetnaviSDC).click().perform();
    await browser.actions().mouseMove(page.assetnavixp3).click().perform();
    await browser.actions().mouseMove(page.assetnaviUGM0).click().perform();
    browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
    browser.waitForAngular();
  });
  it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', () => {
    console.log('Step 29');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    page.searchasset.sendKeys('UGM Historical Reliability Plan');
    browser.sleep(5000);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'UGM Historical Reliability Plan'))), 10000);
  });
});
describe('sekoia map tab', function () {
  var page;
  page = new AngularPage();

  it('should click on sekoia map tab', async () => {
    console.log('Step 30');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.sleep(10000);
    await browser.actions().mouseMove(page.maptab).click().perform()
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 8000);
    //await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
  });
  it('should click last year, then click again jumpTo button', async () => {
    console.log('Step 31');
    browser.sleep(9000);
    var EC = protractor.ExpectedConditions;
    page.jumptobtn.click();
    browser.sleep(1000);
    page.jmplastyr.click();
    browser.wait(EC.invisibilityOf(element(by.className('tableLoadingSpinner'))), 8000);
  });
  it('should click last quarter, then click again jumpTo button', async () => {
    console.log('Step 32');
    browser.sleep(9000);
    var EC = protractor.ExpectedConditions;
    page.jumptobtn.click();
    browser.sleep(1000);
    page.jmplastqtr.click();
    browser.wait(EC.invisibilityOf(element(by.className('tableLoadingSpinner'))), 8000);
  });
  it('should click on zoom in and zoom out on sekoia map', async () => {
    console.log('Step 33');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
  });
  it('should click an asset on the sekoia map', () => {
    console.log('Step 34');
    //var EC = protractor.ExpectedConditions;
    //browser.sleep(10000);
    //browser.element(by.css('#9624_features_layer')).$$('path');
    //browser.actions().mouseMove(element.all(by.css('#9624_features_layer')).$$('path')).click().perform()
    //browser.actions().mouseMove(element(by.css('#9624_features_layer')).element(by.tagName('path'))).click().perform();
    //browser.actions().mouseMove(element(by.xpath('//*[@id="9601_features_layer"]/path[4]'))).click().perform();
    //browser.actions().mouseMove(element(by.css('#\\39 601_features_layer > path:nth-child(5)'))).click().perform();
    //browser.wait(EC.stalenessOf(element(by.className('mapLoadingSpinner'))), 8000); 
  });
  it('should click on status dropdown Program Status on sekoia map', () => {
    console.log('Step 35');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    page.mapdrpdown.click();
    browser.sleep(5000);
    browser.actions().sendKeys(protractor.Key.DOWN).perform();
    page.mapdrpdown.click();
    browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 8000);
  });
  it('should click on zoom in and zoom out on sekoia map', async () => {
    console.log('Step 36');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
    //browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 8000);
  });
  it('should click on status dropdown SAIDI on sekoia map', () => {
    console.log('Step 37');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    page.mapdrpdown.click();
    browser.sleep(5000);
    browser.actions().sendKeys(protractor.Key.DOWN).perform();
    page.mapdrpdown.click();
    browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 10000);
  });
  it('should click on zoom in and zoom out on sekoia map', async () => {
    console.log('Step 38');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
    //browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 8000);
  });
  it('should click on status dropdown SAIFI on sekoia map', () => {
    console.log('Step 39');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    page.mapdrpdown.click();
    browser.sleep(6000);
    browser.actions().sendKeys(protractor.Key.DOWN).perform();
    page.mapdrpdown.click();
    browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 9000);
  });
  it('should click on zoom in and zoom out on sekoia map', async () => {
    console.log('Step 40');
    var EC = protractor.ExpectedConditions;
    browser.sleep(6000);
    await browser.wait(EC.elementToBeClickable(page.mapzoomIn), 250000);
    page.mapzoomIn.click();
    browser.sleep(5000);
    page.mapzoomOut.click();
    browser.sleep(5000);
    //browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 8000);
  });

});  