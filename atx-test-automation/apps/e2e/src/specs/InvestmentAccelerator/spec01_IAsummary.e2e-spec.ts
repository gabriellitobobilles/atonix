import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
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

  it('should see investment accelerator page', () => {
    user.logIn(userObj)
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.investAcrapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.invstAccViews), 10000);
  });
});
describe('nD Test Client > Protractor Automation Test', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on nD Test Client and expand its assets', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavinDtc), 25000);
    page.IAparentNtree.get((await page.IAparentNtree.getText()).indexOf('nD Test Client'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    browser.wait(EC.presenceOf(page.assetnavinTsg), 25000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('nD Test StationGroup'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavinNts), 25000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('nD Test Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnavinNts).click().perform();
    expect(page.assetnavinNts.isPresent()).toBe(true, 'nD Test Station is selected');
    browser.waitForAngular();
  });
});
describe('asset360 investment accelerator timeslider and jump.to feature', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click jumpTo button', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(EC.elementToBeClickable(page.jumptobtn), 25000);
    await page.jumptobtn.click();
    page.jmplastqtr.click();
    browser.sleep(6500);
  });

  it('should click time slider then slide it to the left', async () => {
    //browser.waitForAngular();
    const EC = protractor.ExpectedConditions;
    const ylwCircle = element(by.id('navIndicatorHandle'));
    const datetext = element(by.id('navIndicatorDate'));
    const yCircle = element(by.id('navIndicator'));
    console.log('Step 6');
    browser.waitForAngular();
    browser.sleep(10000);
    //browser.wait(EC.presenceOf(ylwCircle), 10000).then() => { 
    browser.actions().mouseMove(ylwCircle).click().perform()
    browser.actions().mouseDown(ylwCircle).mouseMove({ x: -100, y: 0 }).mouseUp().perform();
    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
    //await browser.wait(EC.presenceOf(element(by.id('navIndicator'))), 15000);
    await browser.wait(EC.presenceOf(yCircle), 15000);
    //browser.sleep(12000);
  });
  it('should click time slider then slide it to the right', async () => {
    browser.waitForAngular();
    const EC = protractor.ExpectedConditions;
    const ylwCircle = element(by.id('navIndicatorHandle'));
    const datetext = element(by.id('navIndicatorDate'));
    const yCircle = element(by.id('navIndicator'));
    console.log('Step 7');
    browser.waitForAngular();
    browser.sleep(10000);
    browser.actions().mouseMove(ylwCircle).click().perform()
    browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
    //await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
    await browser.wait(EC.presenceOf(yCircle), 15000);
  });
  it('should click on the keep and open panel feature', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    await browser.actions().mouseMove(page.hidepanel).click().perform();
    browser.sleep(5000);
    await browser.actions().mouseMove(page.openpanel).click().perform();
  });
});
describe('able to select Request Information link & redirects to its web URL', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click Request Information button', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.elementToBeClickable(page.reqInfoLink), 25000);
    await page.reqInfoLink.click();
    //await browser.wait(EC.presenceOf(element(by.css('#Workpackage > h2'))), 27500);
  });
  it('should switch from previos tab and focus on new tab', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    browser.getAllWindowHandles().then(function (handles) {
      browser.driver.switchTo().window(handles[0]);
      browser.driver.switchTo().window(handles[1]);
    });
    await browser.wait(EC.presenceOf(element(by.css('#Workpackage > h2'))), 27500);
  });
  it('Verify the Information Request Generator page', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="vm.pickUsers()"]', 'Add Recipients'))), 10000);
    await browser.wait(EC.presenceOf(element(by.id('Workpackage'))), 15000);
  });
});