import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { Helper } from '../../helpers/helper';
import { User } from '../../helpers/user'
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
    browser.wait(EC.presenceOf(page.RMtab), 18000);
    expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app launched');
  });
});
describe('RA Testing>Distributed Asset Example Data (small) v1>Division 1>District 1>Substation 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on Distributed Asset Example Data (small) v1 and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(4500);
    browser.waitForAngular();
    await browser.wait(EC.visibilityOf(page.assetnavi4RA), 128000);
    helper.waitForDisappear($(`#overlay-background`));
    page.RAparentNtree.get((await page.RAparentNtree.getText()).indexOf('RA Testing'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    browser.wait(EC.presenceOf(page.assetnavi4DAEDv1), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Distributed Asset Example Data (small) v1'))
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
    await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    await browser.actions().mouseMove(page.assetnavixp4dsub1dos).click().perform();
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dsub1dos), 28000);
    browser.sleep(3500);
    await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    await browser.actions().mouseMove(page.assetnavixp2smfed1).click().perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnaviclckUGC145823).click().perform();
    browser.waitForAngular();
    expect(page.assetnaviclckUGC145823.isPresent()).toBe(true, 'UGC 145823 is seen');
    browser.waitForAngular();
  });
});
describe('asset360 risk assessment trends tab and check its functionalities', function () {
  var page;
  page = new RskAssessment();
  const downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpg' || 'chart.jpeg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
    FileXLSX: 'ListViewExport.xlsx',
  }

  it('should go to Trends tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.scoreCardNum), 128000);
    await browser.actions().mouseMove(page.trendsTab).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.presenceOf(page.trnd3dots), 128000);
    expect(page.trnd3dots.isPresent()).toBe(true, 'trends tab is not loaded');
  });
  it('should click calendar button and change the start date', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.elementToBeClickable(page.calendarBtn), 128000);
    await browser.actions().mouseMove(page.calendarBtn).click().perform();
    browser.waitForAngular();
    page.calndrStartTxtbx.clear();
    page.calndrStartTxtbx.sendKeys('01/01/2016');
    await browser.actions().mouseMove(page.calndrOkBtn).click().perform();
    browser.sleep(3000);
    expect(page.popTimeSlidrDlg.isPresent()).toBe(true, 'time slider pop-up not closed');
  });
  it('should go to Trends dropdown menu and select on EventData Trend', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    browser.sleep(3700);
    await browser.actions().mouseMove(page.trendRADropdown).click().perform();
    page.selectTrendsDropdown('EventData Trend');
    browser.waitForAngular();
    expect(page.chartSelected.isPresent()).toBe(true, 'EventData Trend on trent chart was not selected');
  });
  it('should click on chart menu and download images', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var itm = 1;
    browser.sleep(8000);
    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePNG)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FileJPEG)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FilePDF)
    page.deleteAlreadyDownloadedFiles(downloadFileName.FileSVG)
    console.log('Previous downloaded files deleted');
    for (i = 3; i >= 0; i--) {
      await browser.actions().mouseMove(page.chartConMenu).click().perform();
      await browser.wait(EC.presenceOf(page.chartConItm.get(itm)), 128000);
      await browser.actions().mouseMove(page.chartConItm.get(itm)).click().perform();
      browser.sleep(6000);
      if (itm == 3) {
        page.verifyFileInDownloadsFolder(downloadFileName.FilePDF);
        console.log('PDF downloading');
      } else if (itm == 2) {
        page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
        console.log('JPG downloading');
      } else if (itm == 1) {
        page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
        console.log('PNG downloading');
      } else {
        page.verifyFileInDownloadsFolder(downloadFileName.FileSVG);
        console.log('SVG downloading');
      }
      itm++;
    }
    expect(i.valueOf()).toEqual(-1);
  });
  it('should click on the toggle legend on summary trend to hide', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    console.log(await $$('g.highcharts-legend').get(0).$$('g').first().$$('g').first().$$('g').getText());
    await browser.actions().mouseMove(page.inspctLgndS0).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.inspctLgndS0hide), 250000);
    await browser.actions().mouseMove(page.outgLgndS1).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.outgLgndS1hide), 250000);
    await browser.actions().mouseMove(page.inspctLgndS0hide).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.inspctLgndS0a), 250000);
    expect(page.inspctLgndS0a.isPresent()).toBe(true, 'legend toggle is hide is not working');
    await browser.actions().mouseMove(page.outgLgndS1hide).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.outgLgndS1a), 250000);
    expect(page.outgLgndS1a.isPresent()).toBe(true, 'legend toggle is hide is not working');
  });

  it('should switch Demo Clients>Coal Plant>Eastern Station asset on asset navigator', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(page.assetnaviDC), 128000);
    helper.waitForDisappear($(`#overlay-background`));
    page.RAparentNtree.get((await page.RAparentNtree.getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4000);
    browser.wait(EC.presenceOf(page.assetnaviCP), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4000);
    browser.wait(EC.presenceOf(page.assetnaviES), 25000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Eastern Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4000);
    browser.wait(EC.presenceOf(page.assetnaviESpc1), 25000);
    await browser.actions().mouseMove(page.assetnaviESpc1).click().perform();
    browser.sleep(3500);
    browser.wait(EC.visibilityOf(page.trnd3dots), 250000);
    expect(page.trnd3dots.isPresent()).toBe(true, 'changing asset is not working');
  });
  it('should click select on the trends dropdown Loss Summary, and check if it is selected', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    browser.sleep(3700);
    await browser.wait(EC.elementToBeClickable(page.trendRADropdown), 128000);
    page.selectTrendsDropdown('Loss Summary');
    browser.waitForAngular();
    expect(page.chartSelected.isPresent()).toBe(true, 'Loss Summary on trent chart was not selected');
  });
  it('should click chart menu, and chick print and print preview', async () => {
    console.log('Step 10');
    browser.sleep(3500);
    await $('[class="highcharts-button-symbol"]').click();
    browser.sleep(3000);
    const printButton = await $$('[class="highcharts-menu-item"]').first();
    const result = browser.executeAsyncScript((elm, callback) => {
      function listener() {
        callback(true);
      }
      window.print = listener;
      elm.click();
    }, printButton.getWebElement());
    browser.sleep(3000);
    expect(result).toBeTruthy();
    console.log('Print preview');
  });
  it('should switch from previos tab and focus on new tab', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000);
    browser.sleep(4500);
    await browser.actions().mouseMove(page.tlnExpndChrt).click().perform();
    browser.sleep(4200);
    browser.getAllWindowHandles().then(function (handles) {
      console.log(`browser window: `, handles.length)
      browser.driver.switchTo().window(handles[1]);
    });
    await browser.wait(EC.visibilityOf(page.chartZoomTab), 128000);
    browser.waitForAngular();
    await browser.wait(EC.visibilityOf(page.chartZoomYaxis), 128000);
    expect(page.chartZoomYaxis.isPresent()).toBe(true, 'chart was not opened to new tab');
  });
});