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

describe('asset360 sekoia page app and select specific asset', function () {
  var page;

  page = new AngularPage();
  beforeAll((() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
  }));

  it('should see SEKOIA page', () => {
    user.logIn(userObj)
    console.log('Step 55');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    page.sekoiaapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 50000);
  });
  it('should click on sekoia demo client and expand its assets', async () => {
    console.log('Step 56');
    var EC = protractor.ExpectedConditions;
    browser.actions().mouseMove(page.assetnavi2a).click().perform();
    browser.sleep(2500);
    browser.actions().mouseMove(page.assetnavixp2a).click().perform();
    await browser.actions().mouseMove(page.assetnavixp13).click().perform();
    await browser.actions().mouseMove(page.assetnavixp14).click().perform();
    await browser.actions().mouseMove(page.assetnaviEPC1).click().perform();
    browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]', 'Eastern PC1'))), 10000);
    browser.waitForAngular();
  });
  it('should click search navigator then enter sekoia Eastern PC1', () => {
    console.log('Step 57');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    page.searchasset.sendKeys('Eastern PC1');
    browser.sleep(5000);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.wait(EC.presenceOf(page.assetnaviUDP), 25000);
  });
});
describe('sekoia trends tab', function () {
  var page;
  page = new AngularPage();
  beforeAll((() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
  }));
  const downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
  }

  it('should click on sekoia trends tab', async () => {
    console.log('Step 58');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.sleep(5000);
    await browser.actions().mouseMove(page.trendstab).click().perform();
    browser.sleep(5000);
  });

  it('temporary solution to BUG 21719', async () => {
    console.log('Step 59t');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.sleep(5000);
    await browser.actions().mouseMove(page.sviewtab).click().perform();
    browser.sleep(22000);
    await browser.actions().mouseMove(page.trendstab).click().perform();
    browser.sleep(5000);
  });
  it('should select trend on dropdown', () => {
    console.log('Step 60');
    browser.sleep(7000);
    browser.actions().mouseMove(page.trendsdrpdwn).click().perform()
    browser.sleep(1000);
    browser.actions().sendKeys(protractor.Key.DOWN).perform();
    browser.actions().sendKeys(protractor.Key.DOWN).perform();
    browser.sleep(1000);
    //browser.actions().mouseMove(element(by.cssContainingText('label','Heat Rate Calculations'))).click().perform()
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(6000);
  });
  it('should click on sekoia calendar pop.op button', async () => {
    console.log('Step 61');
    var EC = protractor.ExpectedConditions;
    var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
    browser.waitForAngular();
    browser.sleep(15000);
    await browser.wait(EC.elementToBeClickable(page.calendrPopBtn), 250000);
    browser.actions().mouseMove(page.calendrPopBtn).click().perform();
    browser.actions().mouseMove(page.startdate).click().perform();
    await element(by.model('trVM.popupConfiguration.date1')).clear();
    browser.element(by.model('trVM.popupConfiguration.date1')).sendKeys('10/01/2016');
    browser.sleep(6000);
    browser.actions().mouseMove(page.calApplyBtn).click().perform();
    browser.sleep(6000);
    await $('[class="btn btn-primary"]').click();
    await browser.wait(EC.invisibilityOf(element(by.cssContainingText('.highcharts-loading-inner', 'Loading...'))), 8000);
    browser.sleep(15000);
  });

  it('should click toogle chart legend label (hide-all)', async () => {
    console.log('Step 62');
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(page.toggleClk4), 250000);
    await browser.actions().mouseMove(page.toggleClk0.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleClk2.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleClk4.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleClk1.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleClk3.$$('text').first()).click().perform();
    await browser.wait(EC.presenceOf(page.toggleUnClk4), 8000);
  });
  it('should click toogle chart legend label (show-all)', async () => {
    console.log('Step 63');
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(page.toggleUnClk4), 250000);
    await browser.actions().mouseMove(page.toggleUnClk0.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleUnClk2.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleUnClk4.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleUnClk1.$$('text').first()).click().perform();
    await browser.actions().mouseMove(page.toggleUnClk3.$$('text').first()).click().perform();
    await browser.wait(EC.presenceOf(page.toggleClk4t), 8000);
  });
  it('should click chart menu and print preview', async () => {
    console.log('Step 64');
    /**Verify Print preview  */
    await browser.actions().mouseMove(element(by.className('highcharts-button-symbol'))).click().perform();
    let printButton = await $$('[class="highcharts-menu-item"]').first();
    var result = browser.executeAsyncScript(function (elm, callback) {
      function listener() {
        callback(true);
      }
      window.print = listener;
      elm.click();
    }, printButton.getWebElement());
    browser.sleep(3000);
    expect(result).toBeTruthy();
    browser.sleep(3000);
  });
  it('should click on chart menu and download images', async () => {
    console.log('Step 65');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var itm = 1;
    browser.sleep(8000);
    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePNG)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FileJPEG)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePDF)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FileSVG)
    console.log('Previous downloaded files deleted');
    for (i = 4; i >= 1; i--) {
      await browser.actions().mouseMove(element(by.className('highcharts-button-symbol'))).click().perform();
      browser.sleep(4000);
      await browser.actions().mouseMove(element.all(by.className('highcharts-menu-item')).get(itm)).click().perform();
      browser.sleep(6000);
      itm++;
      if (itm == 4) {
        page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
        console.log('PNG downloading');
      } else if (itm == 3) {
        page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
        console.log('JPEG downloading');
      } else if (itm == 2) {
        page.verifyFileInDownloadsFolder(downloadFileName.FilePDF);
        console.log('PDF downloading');
      } else {
        page.verifyFileInDownloadsFolder(downloadFileName.FileSVG);
        console.log('SVG downloading');
      }
    }
  });
  it('should click Open new chart on tab', async () => {
    console.log('Step 66');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.actions().mouseMove(element(by.css('[ng-click="buttonsVM.Zoom()"]'))).click().perform()
    browser.sleep(4000);
  });
  it('should close previos tab and focus on new tab', () => {
    console.log('Step 67');
    browser.getAllWindowHandles().then(function (handles) {
      browser.driver.switchTo().window(handles[1]);
      //browser.driver.close();
      browser.sleep(4000);
      browser.driver.switchTo().window(handles[0]);
    });
  });
});