import { ElementFinder, browser, $, $$, by, element, protractor, promise } from 'protractor';
import { RskAssessment } from '../../page/riskAssessment_po'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'
import { Helper } from '../../helpers/helper'
const user = new User()
const helper = new Helper()
const userObj = {
  email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
  password: 'Passw0rd1!',


}
const tagName = 'assettest1' + Date.now();

describe('asset360 asset explorer page app', function () {
  var page;
  page = new RskAssessment();

  it('should see asset explorer page', () => {
    user.logIn(userObj)
    console.log('Step 1');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 20000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.assetExapp.click();
    browser.waitForAngular();
    //browser.wait(EC.presenceOf(element(by.model('vm.selectedAsset.asset.AssetAbbrev'))), 20000);
    browser.wait(EC.presenceOf(page.assetexpAppFlg), 20000);
    expect(page.assetexpAppFlg.isPresent()).toBe(true, 'Asset Explorer app');
  });
});
describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1 > Feeder 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 2');
    var EC = protractor.ExpectedConditions;
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4RA), 25000);
    page.AEparentNtree.get((await page.AEparentNtree.getText()).indexOf('RA Testing'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.wait(EC.presenceOf(page.assetnavi4DAED), 25000);
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('Distributed Asset Example Data'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(4500);
    browser.wait(EC.presenceOf(page.assetnavi4Div1), 25000);
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('Division 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavi4Dist1), 25000);
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('District 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 25000);
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform();
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('Feeder 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000);
    await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnaviclckXFMR36).click().perform();
    await browser.wait(EC.presenceOf(page.assetnaviclckXFMR36), 28000);
    browser.waitForAngular();
    expect(page.assetnaviclckXFMR36.isPresent()).toBe(true, 'Asset xfmr36 is selected');
  });
});
describe('asset360 asset explorer info tab, add a tag', function () {
  var page;
  page = new RskAssessment();

  it('should be able to add a tag on info tab', async () => {
    console.log('Step 3');
    var EC = protractor.ExpectedConditions;
    const infotag = element(by.cssContainingText('[ng-repeat="keyword in typeaheadVM.getKeywords()"]', tagName));
    browser.waitForAngular();
    page.assetExpAddTagTbox.click();
    page.assetExpAddTagTbox.clear();
    page.assetExpAddTagTbox.sendKeys(tagName);
    browser.actions().mouseMove(page.assetExpAddTagBtn).click().perform();
    helper.waitForVisible(infotag, 5000)
    page.assetExpAddTagBtn.click();
    browser.wait(EC.presenceOf(page.xfmr36Label), 20000);
    await browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="vm.save(vm.selectedAsset)"]'))), 250000);
    page.saveAssetBtn.click();
    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
    await browser.wait(EC.presenceOf(page.chngPopSaved), 250000);
    browser.waitForAngular();
    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
  });
});
describe('asset360 asset navigator go to asset test1, and go to attachments tab', function () {
  var page;
  var path = require('path');
  page = new RskAssessment();

  it('should click attachment tab and click on add photo', async () => {
    console.log('Step 4');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.actions().mouseMove(page.attachmntTab).click().perform();
    browser.waitForAngular();
    //browser.wait(EC.presenceOf(element(by.id('attachments'))), 10000);
    browser.wait(EC.presenceOf(page.attachPaneTab), 10000);
    browser.waitForAngular();
    expect(page.attachPaneTab.isPresent()).toBe(true, 'Attachment panel on attachment tab seen');
  });
  it('on the add photo on the upload dialog and click on the Select File(s)', async () => {
    console.log('Step 5');
    var EC = protractor.ExpectedConditions;
    browser.actions().mouseMove(page.attachPhotoBtn).click().perform();
    browser.sleep(3500);
    var PhotoAtchCount = $$('[ng-repeat="(idx,value) in attachVM.imageAttachments"]');
    let beforeCount = await PhotoAtchCount.count();
    console.log('Photo Attachment before: ');
    PhotoAtchCount.count().then(console.log);
    browser.waitForAngular();
    var fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/smiley1.jpg';
    var absolutePath = path.resolve(fileToUpload);
    $('input[type="file"]').sendKeys(absolutePath);
    browser.wait(EC.presenceOf(element(by.className('form-control ng-pristine ng-untouched ng-valid ng-not-empty'))), 200000);
    await browser.actions().mouseMove(element(by.css('[ng-click="addAttachmentVM.ok()"]'))).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.invisibilityOf(element(by.className('modal-content'))), 200000);
    console.log('Photo Attachment after: ');
    PhotoAtchCount.count().then(console.log);
    expect(await PhotoAtchCount.count()).toEqual(beforeCount + 1);
    browser.sleep(1000);
    browser.actions().mouseMove(element(by.css('[ng-click="vm.save(vm.selectedAsset)"]'))).click().perform();
    browser.sleep(5000);
    //await browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]','Changes Saved.'))), 250000);
    await browser.wait(EC.presenceOf(page.chngPopSaved), 250000);
    browser.waitForAngular();
    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
  });
  it('should click attachment tab and click on add attachment', async () => {
    console.log('Step 6');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.actions().mouseMove(page.attachFileBtn).click().perform();
    browser.sleep(3500);
    browser.waitForAngular();
    var fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/directory.txt';
    var absolutePath = path.resolve(fileToUpload);
    $('input[type="file"]').sendKeys(absolutePath);
    browser.wait(EC.presenceOf(element(by.className('form-control ng-pristine ng-untouched ng-valid ng-not-empty'))), 200000);
    await browser.actions().mouseMove(element(by.css('[ng-click="addAttachmentVM.ok()"]'))).click().perform();
    browser.waitForAngular();
    await browser.wait(EC.invisibilityOf(element(by.className('modal-content'))), 200000);
    await browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="vm.saveAllChanges()"]'))), 250000);
    browser.sleep(4000);
    await browser.actions().mouseMove(element(by.css('[ng-click="vm.saveAllChanges()"]'))).click().perform();
    browser.sleep(5000);
    await browser.wait(EC.presenceOf(page.chngPopSaved), 250000);
    browser.waitForAngular();
    expect(page.chngPopSaved.isPresent()).toBe(true, 'Changes Saved toast message appears');
  });
});
describe('asset360 asset explorer blog tab, add a new entry', function () {
  var page;
  page = new RskAssessment();
  var randVal = Date.now();

  it('should be able to add a entry on blog tab', async () => {
    console.log('Step 7');
    var EC = protractor.ExpectedConditions;
    browser.sleep(5000);
    await browser.actions().mouseMove(page.assetExpBlogTab).click().perform();
    page.assetExpandBlog.click();
    browser.waitForAngular();
    browser.sleep(5000);
    browser.actions().mouseMove(page.assetExpBlogTitle).click().perform();
    page.assetExpBlogTitle.clear();
    page.assetExpBlogTitle.sendKeys('title test ', +randVal);
    browser.sleep(3500);
    browser.switchTo().frame(element(by.id("mce_0_ifr")).getWebElement());
    await browser.actions().click(page.assetExpBlogBody.getWebElement()).perform();
    page.assetExpBlogBody.click();
    page.assetExpBlogBody.sendKeys('body test ' + randVal);
    browser.switchTo().defaultContent();
    browser.wait(EC.presenceOf(page.xfmr36Label), 20000);
    browser.sleep(5000);
    await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    browser.sleep(3500);
    browser.actions().mouseMove(element(by.id('Submit'))).click().perform();
    browser.sleep(5000);
    await browser.wait(EC.invisibilityOf(page.assetBlogDropFileH), 200000);
    browser.waitForAngular();
    expect(page.assetBlogDropFileH.isPresent()).toBe(false, 'asset blog drag and drop file seen');
  });
});
describe('asset360 risk assessment page app', function () {
  var page;
  page = new RskAssessment();

  it('should see risk assessment page', () => {
    console.log('Step 8');
    var EC = protractor.ExpectedConditions;
    page.menuapps.click();
    browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
    browser.waitForAngular();
    browser.sleep(3500);
    page.riskAsmntapp.click();
    browser.waitForAngular();
    browser.wait(EC.presenceOf(page.RMtab), 10000);
    expect(page.RMtab.isPresent()).toBe(true, 'Risk Assessment app');
  });
});

describe('RA Testing > Distributed Asset Example Data > Division 1 > District 1 > Substation 1', function () {
  var page;
  page = new RskAssessment();

  it('should click on RA Testing and expand its assets', async () => {
    console.log('Step 9');
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
    await browser.wait(EC.presenceOf(page.assetnavixp4dsub1), 28000);
    page.RAchildNtree.get((await page.RAchildNtree.getText()).indexOf('Substation 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnavixp4dfed1).click().perform();
    page.AEchildNtree.get((await page.AEchildNtree.getText()).indexOf('Feeder 1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await browser.wait(EC.presenceOf(page.assetnavixp4dfed1), 28000);
    await browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
    browser.sleep(3500);
    await browser.actions().mouseMove(page.assetnaviclckXFMR36r).click().perform();
    await browser.wait(EC.presenceOf(page.assetnaviclckXFMR36r), 28000);
    browser.sleep(3500);
    browser.waitForAngular();
    expect(page.assetnaviclckXFMR36r.isPresent()).toBe(true, 'Asset xfmr36 is selected');
  });
});
describe('asset360 risk matrix map tab and select asset on map to see info tray', function () {
  var page;
  page = new RskAssessment();

  it('should go to RA map tab', async () => {
    console.log('Step 10');
    var EC = protractor.ExpectedConditions;
    // const eleMap = $('#grid-chart > svg > g > rect');
    // await browser.wait(EC.presenceOf(eleMap), 28000);
    await browser.actions().mouseMove(page.maptab).click().perform();
    browser.sleep(6000);
    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
    await browser.wait(EC.invisibilityOf(page.mapLoadSpinr), 158000);
    browser.waitForAngular();
    expect(page.circleAssetMap.isPresent()).toBe(true, 'circle asset is seen on map');
  });
  it('should ra map tab then click on a asset on the map', async () => {
    console.log('Step 11');
    var EC = protractor.ExpectedConditions;
    const elem = $('#geoSpa_layers > svg > g > circle');
    await browser.wait(EC.presenceOf(elem), 28000);
    browser.actions().click(elem.getWebElement()).perform();
    browser.sleep(5000);
    //await browser.wait(EC.invisibilityOf(element(by.className('mapLoadingSpinner'))), 128000)
    await browser.wait(EC.invisibilityOf(page.mapLoadSpinr), 128000);
    await browser.wait(EC.presenceOf(page.infotabPanel), 128000);
    browser.waitForAngular();
    expect(page.infotabPanel.isPresent()).toBe(true, 'asset info panel is seen');
  });
  it('should click asset on the map and click on attachment tab on info tray', async () => {
    console.log('Step 12');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.actions().mouseMove(page.mapAssetInfoAttach).click().perform();
    await browser.wait(EC.presenceOf(page.directorytxtInfo), 250000);
    browser.waitForAngular();
    expect(page.directorytxtInfo.isPresent()).toBe(true, 'directorytxt.txt is seen');
  });
  it('should click asset on the map and click on blog tab on info tray', async () => {
    console.log('Step 13');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.actions().mouseMove(page.mapAssetInfoBlog).click().perform();
    //await browser.wait(EC.presenceOf(element(by.className('fa fa-comment blog'))), 250000);
    await browser.wait(EC.presenceOf(page.blogAssetInfIcon), 250000);
    browser.waitForAngular();
    expect(page.blogAssetInfIcon.isPresent()).toBe(true, 'blog asset info is seen');
  });
  it('should click asset on the map and click on tag tab on info tray', async () => {
    console.log('Step 14');
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    browser.actions().mouseMove(page.mapAssetInfoTags).click().perform();
    await browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-repeat="keyword in typeaheadVM.getKeywords()"]', tagName))), 250000);
    browser.waitForAngular();
    expect(page.addtagAssetInfo.isPresent()).toBe(true, 'add tag asset info is seen');
  });
});