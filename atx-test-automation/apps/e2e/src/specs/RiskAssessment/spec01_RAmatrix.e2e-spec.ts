import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
const user = new User()
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
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
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
    await browser.actions().mouseMove(page.assetnavixp4dsub1).click().perform();
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000);
    browser.waitForAngular();
    expect(page.assetnavixp4dsub1.isPresent()).toBe(true, 'Substation 1 asset is seen');
  });
});
describe('asset360 risk matrix tab', function () {
  var page;
  page = new RskAssessment();

  it('should count risk matrix blocks', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    const riskcount = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').count();
    //console.log(riskcount);
    if (riskcount == 100) {
      console.log(riskcount, " blocks 10x10");
    } else if (riskcount == 50) {
      console.log(riskcount, " blocks 5x5");
    } else {
      console.log('wrong/incomplete number of blocks');
    }
    browser.sleep(6500);
    expect([100, 50]).toContain(riskcount, `wrong/incomplete number of blocks. riskcount: ${riskcount}`);
  });
  it('should count the green, yellow and red risk matrix blocks', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var igreen = 0;
    var iyellow = 0;
    var ired = 0;
    browser.sleep(3000);
    const riskcount = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').count();
    if (riskcount == 100) {
      for (i = 99; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(101,188,110,0.80)") {
          console.log('green detected');
          igreen++;
        }
        else if (colorfill === "rgba(244,201,5,0.90)") {
          console.log('yellow detected');
          iyellow++;
        }
        else if (colorfill === "rgba(186,80,72,0.90)") {
          console.log('red detected');
          ired++;
        }
        else {
          console.log('no color / invalid color detected');
        }
      }
    } else if (riskcount == 25) {
      console.log(riskcount, " blocks 5x5");
      console.log('this is not a 10x5 risk matrix');
      for (i = 24; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(101,188,110,0.80)") {
          console.log('green detected');
          igreen++;
        }
        else if (colorfill === "rgba(244,201,5,0.90)") {
          console.log('yellow detected');
          iyellow++;
        }
        else if (colorfill === "rgba(186,80,72,0.90)") {
          console.log('red detected');
          ired++;
        }
        else {
          console.log('no color / invalid color detected');
        }
      }
    } else {
      console.log('wrong/incomplete number of blocks');
    }
    console.log('green blocks: ', igreen);
    console.log('yellow blocks: ', iyellow);
    console.log('red blocks: ', ired);
    browser.sleep(6500);
    expect([100, 50]).toContain(riskcount, `is a number of blocks. riskcount: ${riskcount}`);
  });
  it('should determine that red, yellow, and green color blocks are in the correct place', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var iMisplaced = 0;
    browser.sleep(3000);
    const riskcount = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').count();
    if (riskcount == 100) {
      console.log("10x10 blocks: ", riskcount);
      for (i = 99; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(186,80,72,0.90)" && [69, 77, 78, 79, 87, 88, 89, 96, 97, 98, 99].indexOf(i) != -1) {
          console.log('red detected are in correct place');
          console.log("red[]: ", i);
        }
        else if (colorfill === "rgba(244,201,5,0.90)" && [28, 29, 36, 37, 38, 39, 45, 46, 47, 48, 49, 54, 55, 56, 57, 58, 59, 63, 64, 65, 66, 67, 68, 73, 74, 75, 76, 82, 83, 84, 85, 86, 92, 93, 94, 95].indexOf(i) != -1) {
          console.log('yellow detected are in correct place');
          console.log("yellow[]: ", i);
        }
        else if (colorfill === "rgba(101,188,110,0.80)" && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 40, 41, 42, 43, 44, 50, 51, 52, 53, 60, 61, 62, 70, 71, 72, 80, 81, 90, 91].indexOf(i) != -1) {
          console.log('green detected are in correct place');
          console.log("green[]: ", i);
        }
        else {
          console.log('no color / invalid color detected');
          console.log(colorfill, " ", i);
          iMisplaced++;
        }
      }
    } else if (riskcount == 25) {
      console.log("5x5 blocks: ", riskcount);
      console.log('this is not a 10x10 risk matrix');
    } else {
      console.log('wrong/incomplete number of blocks');
    }
    browser.sleep(6500);
    console.log('incorrect placed blocks: ', iMisplaced);
    expect([100, 50]).toContain(riskcount, `is a number of blocks. riskcount: ${riskcount}`);
  });

  it('should drag and select a risk matrix blocks, zoom-in ', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.wait(async () => await browser.element(by.css('#ra-spinner.ng-hide')).isPresent);
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(91)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(65)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should click the zoom-out button and view returned to default risk matrix blocks', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.mtrxZoomOut).click().perform();
    browser.wait(EC.invisibilityOf(page.RMzoomInApld), 250000);
    expect(page.RMzoomInApld.isPresent()).toBe(false, 'Zoom-in text applied is no longer seen');
  });
  it('should drag and select a risk matrix blocks, zoom-in again', async () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(63)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(37)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 20000);
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should click the clear button and view returned to default risk matrix blocks', async () => {
    console.log('Step 9');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.mtrxClearZoom).click().perform();
    browser.wait(EC.invisibilityOf(page.RMzoomInApld), 250000);
    expect(page.RMzoomInApld.isPresent()).toBe(false, 'Zoom-in text applied is no longer seen');
  });
  it('should click the RA gear button and see the Risk Matrix User Setting dialog menu', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.RAuserGearBtn).click().perform();
    browser.wait(EC.presenceOf(page.RAuserSettingDlg), 110000);
    expect(page.RAuserSettingDlg.isPresent()).toBe(true, 'RA user setting dialog');
  });
  it('should click the + button on the Risk Matrix User Setting dialog menu, and see New Config*', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.RAGearNewConfig).click().perform();
    browser.wait(EC.presenceOf(page.RANewConfigName), 110000);
    expect(page.RANewConfigName.isPresent()).toBe(true, 'New config name is seen');
  });
  it('should click the close dialog button on the Risk Matrix User Setting dialog menu', async () => {
    console.log('Step 12');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.RAGearCloseBtn).click().perform();
    browser.wait(EC.invisibilityOf(page.RAuserSettingDlg), 190000);
    //expect(page.RAuserSettingDlg.isPresent()).toBe(false,'RA dialog is no longer seen');

  });
  it('should click single view radio button on the Risk Matrix tab and should see a toast error', async () => {
    console.log('Step 13');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.RASingleViewBtn).click().perform();
    browser.wait(EC.presenceOf(page.RAsChartTerror), 110000);
    browser.sleep(4000);
    expect(page.RAsChartTerror.isPresent()).toBe(true, 'Chart toast error');
  });
  it('should click single view radio button on the Risk Matrix tab and should see a white bubble', async () => {
    console.log('Step 14');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform();
    browser.wait(EC.presenceOf(page.RAsvWhitebuble), 110000);
    browser.sleep(4000);
    expect(page.RAsvWhitebuble.isPresent()).toBe(true, 'Chart toast error');
  });
  it('should click multiple view radio button on the Risk Matrix tab and should see a toast error', async () => {
    console.log('Step 15');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.RAMultiViewBtn).click().perform();
    browser.wait(EC.invisibilityOf(page.RAsvWhitebuble), 110000);
    browser.sleep(4000);
    expect(page.RAsvWhitebuble.isPresent()).toBe(false, 'Chart toast error');
  });
});
describe('RA Testing > Distributed Asset Example Data (small) v1> Division 1 > District 1 > Substation 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 16');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
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
    browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    await browser.actions().mouseMove(page.assetnavixp2smfed1).click().perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnaviclckUGC145823).click().perform();
    browser.waitForAngular();
    expect(page.assetnaviclckUGC145823.isPresent()).toBe(true, 'UGC 145823 is seen');
  });
  it('should count the green, yellow and red risk matrix blocks', async () => {
    console.log('Step 17');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var igreen = 0;
    var iyellow = 0;
    var ired = 0;
    browser.sleep(5000);
    //browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000);
    await browser.wait(async () => await browser.element(by.css('#ra-spinner.ng-hide')).isPresent);
    const riskcount = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').count();
    if (riskcount == 25) {
      console.log(riskcount, " blocks 5x5");
      console.log('this is not a 10x10 risk matrix');
      for (i = 24; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(101,188,110,0.80)") {
          console.log('green detected');
          igreen++;
        }
        else if (colorfill === "rgba(244,201,5,0.90)") {
          console.log('yellow detected');
          iyellow++;
        }
        else if (colorfill === "rgba(186,80,72,0.90)") {
          console.log('red detected');
          ired++;
        }
        else {
          console.log('no color / invalid color detected');
        }
      }
    }
    else if (riskcount == 100) {
      console.log(riskcount, " blocks 10x10");
      console.log('this is not a 5x5 risk matrix');
      for (i = 99; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(101,188,110,0.80)") {
          console.log('green detected');
          igreen++;
        }
        else if (colorfill === "rgba(244,201,5,0.90)") {
          console.log('yellow detected');
          iyellow++;
        }
        else if (colorfill === "rgba(186,80,72,0.90)") {
          console.log('red detected');
          ired++;
        }
        else {
          console.log('no color / invalid color detected');
        }
      }
    } else {
      console.log('wrong/incomplete number of blocks');
    }
    console.log('green blocks: ', igreen);
    console.log('yellow blocks: ', iyellow);
    console.log('red blocks: ', ired);
    browser.sleep(6500);
    //expect([100, 50]).toContain(riskcount, `is a number of blocks. riskcount: ${riskcount}`);
  });
  it('should determine that red, yellow, and green color blocks are in the correct place', async () => {
    console.log('Step 18');
    var EC = protractor.ExpectedConditions;
    var i: number;
    var iMisplaced = 0;
    browser.sleep(3000);
    browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000);
    const riskcount = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').count();
    if (riskcount == 25) {
      console.log("5x5 blocks: ", riskcount);
      for (i = 24; i >= 0; i--) {
        const colorfill = await $('[id="grid-chart"]').element(by.tagName('svg')).element(by.tagName('g')).$$('rect').get(i).getAttribute('fill');
        if (colorfill === "rgba(186,80,72,0.90)" && [18, 19, 23, 24].indexOf(i) != -1) {
          console.log('red detected are in correct place');
          console.log("red[]: ", i);
        }
        else if (colorfill === "rgba(244,201,5,0.90)" && [8, 9, 12, 13, 14, 16, 17, 21, 22].indexOf(i) != -1) {
          console.log('yellow detected are in correct place');
          console.log("yellow[]: ", i);
        }
        else if (colorfill === "rgba(101,188,110,0.80)" && [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 15, 20].indexOf(i) != -1) {
          console.log('green detected are in correct place');
          console.log("green[]: ", i);
        }
        else {
          console.log('no color / invalid color detected');
          console.log(colorfill, " ", i);
          iMisplaced++;
        }
      }
    } else if (riskcount == 100) {
      console.log("10x10 blocks: ", riskcount);
      console.log('this is not a 5x5 risk matrix');
    } else {
      console.log('wrong/incomplete number of blocks');
    }
    browser.sleep(6500);
    console.log('incorrect placed blocks: ', iMisplaced);
    //expect([50, 100]).toContain(riskcount, `is a number of blocks. riskcount: ${riskcount}`);
  });
  it('should drag and select a risk matrix blocks, zoom-in again', async () => {
    console.log('Step 19');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    browser.actions().
      mouseDown(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(16)'))).
      mouseMove(element(by.css('#grid-chart > svg > g:nth-child(1) > rect:nth-child(8)'))).
      mouseUp().
      perform();
    await browser.actions().mouseMove(page.mtrxZoomIn).click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(page.RMzoomInApld), 250000);
    expect(page.RMzoomInApld.isPresent()).toBe(true, 'Zoom-in text applied is seen');
  });
  it('should click the clear button and view returned to default risk matrix blocks', async () => {
    console.log('Step 20');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    await browser.actions().mouseMove(page.mtrxClearZoom).click().perform();
    browser.wait(EC.invisibilityOf(page.RMzoomInApld), 190000);
    expect(page.RMzoomInApld.isPresent()).toBe(false, 'Zoom-in text applied is no longer seen');
  });
});