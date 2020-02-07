import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { InvestmentAccelerator } from '../../page/InvestmentAccelerator_po'
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
describe('Sekoia Demo Clients > City of Metropolis', function () {
  var page;
  page = new InvestmentAccelerator();

  it('should click on City of Metropolis and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(4500);
    browser.waitForAngular();
    await browser.wait(EC.visibilityOf(page.assetnaviSDC), 128000);
    await browser.wait(EC.invisibilityOf(element(by.className('progress-bar'))), 128000);
    helper.waitForDisappear($(`#overlay-background`))
    page.IAparentNtree.get((await page.IAparentNtree.getText()).indexOf('SEKOIA Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    await browser.wait(EC.presenceOf(page.assetnaviCoM), 128000);
    page.IAchildNtree.get((await page.IAchildNtree.getText()).indexOf('City of Metropolis'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.actions().mouseMove(page.assetnaviCoM).click().perform();
    expect(page.assetnaviCoM.isPresent()).toBe(true, 'City of Metropolis is selected');
    browser.waitForAngular();
  });
});
describe('asset360 investment accelerator timeline tab and check its functionalities', function () {
  var page;
  page = new InvestmentAccelerator();
  const downloadFileName = {
    FilePNG: 'chart.png',
    FileJPEG: 'chart.jpeg' || 'chart.jpg',
    FilePDF: 'chart.pdf',
    FileSVG: 'chart.svg',
    FileXLSX: 'ListViewExport.xlsx',
  }

  it('should go to Trends tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    await browser.actions().mouseMove(page.trendsTab).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.presenceOf(page.trnd3dots), 128000);
    expect(page.trnd3dots.isPresent()).toBe(true, 'trends tab is not loaded');
  });
  it('should go to Trends dropdown menu and select on Cost', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    browser.sleep(3700);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    await browser.actions().mouseMove(page.trendDropdown).click().perform();
    page.selectTrendsDropdown('Capital Costs');
    browser.wait(EC.visibilityOf(page.trndCapCost), 250000);
    browser.waitForAngular();
    expect(page.trndCapCost.isPresent()).toBe(true, 'Capital Costs on trent chart was not selected');
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
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3800);
    console.log(await $$('g.highcharts-legend').get(0).$$('g').first().$$('g').first().$$('g').getText());
    await browser.actions().mouseMove(page.cOcLgndS0).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.cOcLgndS0hide), 250000);
    expect(page.cOcLgndS0hide.isPresent()).toBe(true, 'legend toggle is hide is not working');
    await browser.actions().mouseMove(page.cOcLgndS0hide).click().perform();
    browser.sleep(3000);
    await browser.wait(EC.visibilityOf(page.cOcLgndS0b), 250000);
    expect(page.cOcLgndS0b.isPresent()).toBe(true, 'legend toggle is hide is not working');
  });
  it('should go to Trends dropdown menu and select on Cost', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.progresBar), 128000);
    browser.sleep(3700);
    browser.wait(EC.invisibilityOf(page.trnd3dots), 250000);
    await browser.actions().mouseMove(page.trendDropdown).click().perform();
    page.selectTrendsDropdown('Capital Costs');
    browser.wait(EC.visibilityOf(page.trndCapCost), 250000);
    browser.waitForAngular();
    expect(page.trndCapCost.isPresent()).toBe(true, 'Capital Costs on trent chart was not selected');
  });
  it('should click Toggle List view button', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(EC.elementToBeClickable(page.toogleLviewBtn), 128000);
    await browser.actions().mouseMove(page.toogleLviewBtn).click().perform();
    await browser.wait(EC.visibilityOf(page.listFltrTxtbx), 250000);
    expect(page.listFltrTxtbx.isPresent()).toBe(true, 'toggle list view is not working');
  });
  it('should click Select all/none button, and check if checkbox is selected', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(EC.elementToBeClickable(page.selAllNoneBtn), 128000);
    await browser.actions().mouseMove(page.selAllNoneBtn).click().perform();
    expect(page.selChckLboxBtn.isPresent()).toBe(true, 'checkbox button in listview is not working');
  });
  it('should click Export List to Excel button, and check if xlsx file was downloaded', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    page.deleteAlreadyDownloadedFiles(downloadFileName.FileXLSX);
    await browser.wait(EC.elementToBeClickable(page.dlExcelBtn), 128000);
    await browser.actions().mouseMove(page.dlExcelBtn).click().perform();
    page.verifyFileInDownloadsFolder(downloadFileName.FileXLSX);
    console.log('XLSX downloading');
    expect(page.dlExcelsToast.isPresent()).toBe(false, 'export list to excel button not working');
  });
  it('should click edit selected button, and check if checkbox is selected', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    await browser.wait(EC.elementToBeClickable(page.editSelBtn), 128000);
    await browser.actions().mouseMove(page.editSelBtn).click().perform();
    expect(page.batchEditInfoLbl.isPresent()).toBe(true, 'Batch Edit Asset Info label is not seen');
  });
  it('should switch from previos tab and focus on new tab', async () => {
    console.log('Step 12');
    var EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(page.tlnExpndChrt), 128000);
    browser.sleep(3800);
    await browser.actions().mouseMove(page.tlnExpndChrt).click().perform();
    browser.sleep(4200);
    browser.getAllWindowHandles().then(function (handles) {
      console.log(`browser window: `, handles.length)
      browser.driver.switchTo().window(handles[1]);
    });
    browser.sleep(3500);
    await browser.wait(EC.visibilityOf(page.chartZoomYaxis), 128000);
    expect(page.chartZoomYaxis.isPresent()).toBe(true, 'chart was not opened to new tab');
  });
});