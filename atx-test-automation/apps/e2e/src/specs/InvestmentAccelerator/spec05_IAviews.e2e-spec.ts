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

describe('asset360 view explorer page app', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should see view explorer page', () => {
    user.logIn(userObj)
    console.log('Step 1');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.viewExpapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.viewExpTitle), 10000);
    expect(page.viewExpTitle.isPresent()).toBe(true, 'View explorer app not seen');
  });
});
describe('Demo Clients > Coal Plants > Eastern Station > Eastern PC1', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on Coal Plants, expand its assets and see Unit performance', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.invisibilityOf(element(by.className('progress-bar'))), 128000);
    page.VEparentNtree.get((await page.VEparentNtree.getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    await browser.wait(EC.presenceOf(page.assetnaviCP), 128000);
    page.VEchildNtree.get((await page.VEchildNtree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.wait(EC.presenceOf(page.assetnaviES), 128000);
    page.VEchildNtree.get((await page.VEchildNtree.getText()).indexOf('Eastern Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnaviEPc1).click().perform();
    expect(page.assetnaviEPc1.isPresent()).toBe(true, 'Eastern PC1 was not selected');
    await browser.wait(EC.presenceOf(page.vePc1UnitPerf), 128000);
    expect(page.vePc1UnitPerf.isPresent()).toBe(true, 'Eastern PC1 Unit Performance was not seen');
    browser.waitForAngular();
  });
});
describe('asset360 investment accelerator page app', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should see investment accelerator page', () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 128000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.investAcrapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.invstAccViews), 120000);
    expect(page.invstAccViews.isPresent()).toBe(true, 'Investment Accelerator app was not seen');
    browser.waitForAngular();
  });
});
describe('Demo Clients > Coal Plants > Eastern Station > Eastern PC1', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on Coal Plants and expand its assets', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.visibilityOf(page.assetnaviSDC), 128000);
    await browser.wait(EC.invisibilityOf(element(by.className('progress-bar'))), 128000);
    page.IAparentNtree.get((await page.IAparentNtree.getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    await browser.wait(EC.presenceOf(page.assetnaviCP), 128000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.wait(EC.presenceOf(page.assetnaviES), 128000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('Eastern Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnaviEPc1).click().perform();
    expect(page.assetnaviEPc1.isPresent()).toBe(true, 'Eastern PC1 was not selected');
    browser.waitForAngular();
  });
});

describe('asset360 investment accelerator Views tab and check its functionalities', function () {
  var page;
  page = new InvestmentAccelerator();
  const downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
  }

  it('should go to Views tab and see Unit performance', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.iaViewActvSpiner), 128000);
    await browser.actions().mouseMove(page.invstAccViews).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.visibilityOf(page.iaViewHideSpiner), 128000);
    expect(page.iaViewHideSpiner.isPresent()).toBe(true, 'Views tab is not loaded');
    await browser.wait(EC.presenceOf(page.iaPc1UnitPerf), 128000);
    expect(page.iaPc1UnitPerf.isPresent()).toBe(true, 'Eastern PC1 Unit Performance was not seen');
  });
  it('should go to Trends dropdown menu and select on Unit Reliability', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3700);
    browser.wait(EC.invisibilityOf(page.iaViewActvSpiner), 250000);
    await browser.actions().mouseMove(page.viewsDropdown).click().perform();
    page.selectViewsDropdown('Unit Reliability');
    browser.wait(EC.visibilityOf(page.viewsDrpdwnUR), 250000);
    browser.wait(EC.visibilityOf(page.viewChartLoadng), 250000);
    browser.waitForAngular();
    expect(page.viewsDrpdwnUR.isPresent()).toBe(true, 'Unit Reliability on trent chart was not selected');
  });
  it('should click on chart menu and download images', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var itm = 1;
    browser.sleep(3700);
    browser.wait(EC.invisibilityOf(page.viewChartLoadng), 250000);
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
});
describe('Verify the toggle legend on chart and open chart to new tab', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on the toggle legend on summary trend to hide', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.elementToBeClickable(page.eastrnPc1LgndS0), 128000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS0).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS0hide), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS1).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS1hide), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS2).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS2hide), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS10).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS10hide), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS11).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS11hide), 250000);
    expect(page.eastrnPc1LgndS11hide.isPresent()).toBe(true, 'legend toggle is hide is not working');
  });

  it('should click on the toggle legend on summary trend to active', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.elementToBeClickable(page.eastrnPc1LgndS0hide), 128000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS0hide).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS0b), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS1hide).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS1b), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS2hide).click().perform();
    await browser.wait(EC.presenceOf(page.eastrnPc1LgndS2b), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS10hide).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS10b), 250000);
    await browser.actions().mouseMove(page.eastrnPc1LgndS11hide).click().perform();
    await browser.wait(EC.visibilityOf(page.eastrnPc1LgndS11b), 250000);
    expect(page.eastrnPc1LgndS1.isPresent()).toBe(true, 'legend toggle is reactivate from hide is not working');
  });

  it('should click Open Chart on New tab button', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000);
    await browser.actions().mouseMove(page.tlnExpndChrt).click().perform();
    expect(page.tlnExpndChrt.isPresent()).toBe(true, 'expand chart button is not working');
  });

  it('should switch from previos tab and focus on new tab', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    browser.getAllWindowHandles().then(function (handles) {
      browser.driver.switchTo().window(handles[0]);
      browser.driver.switchTo().window(handles[1]);
    });
    await browser.wait(EC.invisibilityOf(page.invstAccViews), 128000);
    expect(page.invstAccViews.isPresent()).toBe(false, 'chart was not opened to new tab');
  });
});