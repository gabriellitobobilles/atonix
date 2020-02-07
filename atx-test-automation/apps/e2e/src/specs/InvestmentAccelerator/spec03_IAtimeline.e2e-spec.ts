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
    browser.wait(EC.presenceOf(page.timelineTab), 10000);
    expect(page.timelineTab.isPresent()).toBe(true, 'Investment Accelerator app seen');
  });
});
describe('Sekoia Demo Clients > UGM Historical Reliability Plan', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on UGM Historical Reliability Plan and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    await browser.wait(EC.invisibilityOf(element(by.className('progress-bar'))), 128000);
    page.IAparentNtree.get((await page.IAparentNtree.getText()).indexOf('SEKOIA Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    await browser.wait(EC.presenceOf(page.assetnaviUGM), 128000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('UGM Historical Reliability Plan'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnaviUGM).click().perform();
    expect(page.assetnaviUGM.isPresent()).toBe(true, 'UGM Historical Reliability Plan is selected');
    browser.waitForAngular();
  });
});
describe('asset360 investment accelerator timeline tab and check its functionalities', function () {
  var page;
  page = new InvestmentAccelerator();
  const downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpeg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
  }

  it('should go to Timeline tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    await browser.actions().mouseMove(page.timelineTab).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.presenceOf(page.trnd3dots), 128000);
    expect(page.trnd3dots.isPresent()).toBe(true, 'Timeline tab is not loaded');
  });
  it('should go to Trends dropdown menu and select on Cost', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    browser.sleep(3700);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    await browser.actions().mouseMove(page.timelnDropdown).click().perform();
    page.selectTimelnDropdown('Cost');
    browser.wait(EC.visibilityOf(page.trndCost), 250000);
    browser.waitForAngular();
    expect(page.trndCost.isPresent()).toBe(true, 'Cost on trent chart was not selected');
  });
  it('should click on chart menu and download images', async () => {
    console.log('Step 5');
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
        console.log('JPEG downloading');
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
  it('should click on the Filter on the Timeline button and uncheck few checkbox', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.actions().mouseMove(page.timelnFilter).click().perform();
    await browser.wait(EC.presenceOf(page.timelnFltrDrpdwn), 100000);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Circuit Segment Main OH'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    browser.sleep(3500);
    await browser.wait(EC.visibilityOf(page.trnd3dots), 128000);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Circuit Segment UG'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    browser.sleep(5000);
    await browser.wait(EC.visibilityOf(page.trnd3dots), 250000);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 128000);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Pole Replacement'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    expect(page.trnd3dots.isPresent()).toBe(false, '3 dots on chart is still seen');
  });
  it('should click on the Filter on the Timeline button and check few checkbox', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3750);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Circuit Segment Main OH'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    browser.sleep(3500);
    await browser.wait(EC.visibilityOf(page.trnd3dots), 128000);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Circuit Segment UG'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    browser.sleep(3500);
    await browser.wait(EC.visibilityOf(page.trnd3dots), 128000);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    page.timelnFltrDrpdwn.get((await page.timelnFltrDrpdwn.getText()).indexOf('Pole Replacement'))
      .$('[ng-model="iaTimelineVM.filter[pt.id]"]').click();
    browser.sleep(5500);
    browser.waitForAngular();
    browser.wait(EC.invisibilityOf(page.trnd3dots), 128000);
    await browser.actions().mouseMove(page.timelnFilter).click().perform();
    browser.waitForAngular();
    expect(page.trnd3dots.isPresent()).toBe(false, '3 dots on chart is still seen');
  });
});
describe('Verify moving the time slider and Open chart to new tab', function () {
  var page;
  page = new InvestmentAccelerator();
  it('should click time slider then slide it to the left', async () => {
    const ylwCircle = $(`#navIndicatorHandle`)
    console.log('Step 8');
    browser.waitForAngular();
    browser.sleep(7000);
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
    const ylwCircle = element(by.id('navIndicatorHandle'));
    console.log('Step 9');
    browser.waitForAngular();
    browser.sleep(7000);
    browser.actions().mouseMove(ylwCircle).click().perform();
    const datetext1 = await element(by.id('navIndicatorDate')).getText();
    console.log('origin: ', datetext1);
    browser.actions().mouseDown(ylwCircle).mouseMove({ x: 250, y: 0 }).mouseUp().perform();
    const datetext2 = await element(by.id('navIndicatorDate')).getText();
    console.log('slide right: ', datetext2);
    expect(datetext1).not.toEqual(datetext2);
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
    await browser.wait(EC.invisibilityOf(page.timelineTab), 128000);
    expect(page.timelineTab.isPresent()).toBe(false, 'chart was not opened to new tab');
  });
});