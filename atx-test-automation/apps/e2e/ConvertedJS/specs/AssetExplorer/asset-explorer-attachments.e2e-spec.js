"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var Pages = require("../../page/pages");
var user_1 = require("../../helpers/user");
var helper_1 = require("../../helpers/helper");
var interface_1 = require("../../helpers/interface");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var casual = require("casual");
var user = new user_1.User();
var helper = new helper_1.Helper();
var assetExplorerPage = new Pages.AssetExplorer();
var assetObj = {
    name: 'Atonix',
    descriptiveName: 'Descriptive ' + casual.word,
    attributes: [{
            name: 'attr_' + casual.word,
            attributeType: interface_1.AttributeTypesEnum['Freeform Text'],
            favorite: true
        }]
};
var attachments = {
    imageOrVideoFile: ['smiley1.jpg', 'testAvatar.png', 'tester.gif', 'testAvatar2.png', 'testAvatar3.jpg'],
    imageOrVideoCaption: ['jpgCaption', 'pngCaption', 'gifCaption', 'pngCaption2', 'jpgCaption2'],
    tags: 'AutomationTesting',
    attachmentFiles: ['chart.pdf', 'chart.svg', 'test.html', 'test_Data.rar', 'test_Data.txt'],
    attachmentFilesCaption: ['pdfFileCaption', 'svgFileCaption', 'htmlFileCaption', 'rarFileCaption', 'txtFileCaption']
};
describe('Asset Explorer - Attachments', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.logIn(testDetails_data_1.userObj);
            user.navigateToApp(testDetails_data_1.appName.assetExplorer);
            return [2 /*return*/];
        });
    }); });
    it('should be able to load Asset Explorer', function () {
        protractor_1.browser.waitForAngularEnabled();
        expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });
    it('Ensure Attachments functionality', function () {
        assetExplorerPage.searchAsset(assetObj.name);
        helper.waitAndClick(assetExplorerPage.attachmentsTab);
        expect(assetExplorerPage.addPhotoVideoBtn.isPresent);
        expect(assetExplorerPage.addAttachmentBtn.isPresent);
    });
    it('Ensure photo or video is imported', function () {
        expect(assetExplorerPage.addPhotoVideo(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    it('Ensure photo or video can be starred as favorite', function () {
        expect(assetExplorerPage.starFavoritePhotoVideo(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    it('Ensure photo or video can be editted', function () {
        expect(assetExplorerPage.editPhotoVideo(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    xit('Ensure photo or video can be deleted', function () {
        expect(assetExplorerPage.deletePhotoVideo(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    it('Ensure attachment files are imported', function () {
        expect(assetExplorerPage.addAttachmentFiles(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    it('Ensure attachment files can be starred as favorite', function () {
        expect(assetExplorerPage.starFavoriteAttachmentFiles(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    it('Ensure attachment files can be editted', function () {
        expect(assetExplorerPage.editAttachmentFiles(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
    xit('Ensure attachment files can be deleted', function () {
        expect(assetExplorerPage.deleteAttachmentFiles(attachments)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
    });
});
// describe('asset360 asset navigator go to asset test1, and go to attachments tab', () => {
//   let page;
//   const path = require('path');
//   page = new AssetExplorer();
//   let asset1;
//   let asset2;
//   let assetAttach;
//   it('should click expand then select asset test1', async () => {
//     console.log('Step 5');
//     const EC = protractor.ExpectedConditions;
//     // browser.sleep(8000);
//     browser.waitForAngular();
//     asset1 = await $$('[ng-repeat="adhocNode in node.children"]').getText();
//     // console.log(asset1);
//     await $$('[ng-repeat="adhocNode in node.children"]').get(asset1.indexOf('Protractor Automation Test'))
//       .$('[class="arrow-cursor fa fa-caret-right"]').click();
//     asset2 = await $$('[ng-repeat="adhocNode in node.children"]').getText();
//     // console.log(asset2);
//     await $$('[ng-repeat="adhocNode in node.children"]').get(asset2.indexOf('1A Automation Substation'))
//       .$('[class="arrow-cursor fa fa-caret-right"]').click();
//     assetAttach = await $$('[ng-repeat="adhocNode in node.children"]').getText();
//     // browser.actions().mouseMove(page.assetnaviXpPAT).click().perform();
//     browser.waitForAngular();
//     await $$('[ng-repeat="adhocNode in node.children"]').get(assetAttach.indexOf('asset attach'))
//       .$('[class="ng-binding"]').click();
//     // browser.actions().mouseMove(page.assetnaviAT1).click().perform();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="ng-binding"]', 'asset attach'))), 10000);
//   });
//   it('should click attachment tab and click on add photo', async () => {
//     console.log('Step 6');
//     const EC = protractor.ExpectedConditions;
//     // browser.sleep(8000);
//     browser.waitForAngular();
//     browser.actions().mouseMove(page.attachmntTab).click().perform();
//     browser.waitForAngular();
//     browser.wait(EC.presenceOf(element(by.id('attachments'))), 10000);
//   });
//   it('on the add photo on the upload dialog and click on the Select File(s)', async () => {
//     console.log('Step 7');
//     const EC = protractor.ExpectedConditions;
//     browser.actions().mouseMove(page.attachPhotoBtn).click().perform();
//     browser.waitForAngular();
//     const fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/smiley1.jpg';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
//   it('should click attachment tab and click on add attachment', async () => {
//     console.log('Step 8');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     browser.actions().mouseMove(page.attachFileBtn).click().perform();
//     const fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/directory.txt';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
// });
// describe('should add attachment and uncheck favorite on photo and attachment', () => {
//   let page;
//   page = new AssetExplorer();
//   const path = require('path');
//   it('on the Add photo on the upload dialog and click on the Select File(s)', async () => {
//     console.log('Step 9');
//     const EC = protractor.ExpectedConditions;
//     browser.actions().mouseMove(page.attachPhotoBtn).click().perform();
//     browser.waitForAngular();
//     const fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/sad1.jpg';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.model('addAttachmentVM.favorite')).click();
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
//   it('should click attachment tab and click on add attachment', async () => {
//     console.log('Step 10');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     browser.actions().mouseMove(page.attachFileBtn).click().perform();
//     const fileToUpload = 'D:/PROTR_Asset360AT08/test_Data/folder.txt';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.model('addAttachmentVM.favorite')).click();
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
// });
// describe('should be able to move photos/attachment can be ordered', () => {
//   let page;
//   page = new AssetExplorer();
//   const path = require('path');
//   it('should be able to move left the photo', async () => {
//     console.log('Step 11');
//     const EC = protractor.ExpectedConditions;
//     await browser.actions().mouseMove(page.photoLeftClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button pull-left fa-star-o'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
//   it('should be able to move right the photo', async () => {
//     console.log('Step 12');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     await browser.actions().mouseMove(page.photoRightClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button pull-left fa-star'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
//   it('should be able to move down the attachment', async () => {
//     console.log('Step 13');
//     const EC = protractor.ExpectedConditions;
//     await browser.actions().mouseMove(page.fileDownClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button fa-star'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
//   it('should be able to move up the attachment', async () => {
//     console.log('Step 14');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     await browser.actions().mouseMove(page.fileUpClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button fa-star-o'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
// });
// describe('should be able to delete photos/attachment files', () => {
//   let page;
//   page = new AssetExplorer();
//   it('should be able to delete one of file attachments', async () => {
//     console.log('Step 15');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     browser.sleep(8000);
//     await browser.wait(EC.elementToBeClickable(page.deleteFileClick), 60000);
//     await browser.actions().mouseMove(page.deleteFileClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button fa-star-o'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//     browser.waitForAngular();
//   });
//   it('should be able to delete one of photo', async () => {
//     console.log('Step 16');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     await browser.actions().mouseMove(page.deletePhotoClick).click().perform();
//     browser.wait(EC.presenceOf(element(by.className('fa fa-button fa-star-o'))), 10000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
// });
// describe('should be able to edit photos/attachment files', () => {
//   let page;
//   page = new AssetExplorer();
//   const path = require('path');
//   it('should be able to edit one of file attachments', async () => {
//     console.log('Step 17');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     browser.sleep(8000);
//     await browser.wait(EC.elementToBeClickable(page.editFileClick), 60000);
//     await browser.actions().mouseMove(page.editFileClick).click().perform();
//     const fileToUpload = 'D:/PROTR_Asset360AT07/test_Data/directory.txt';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//     browser.waitForAngular();
//   });
//   it('should be able to edit one of photo', async () => {
//     console.log('Step 18');
//     const EC = protractor.ExpectedConditions;
//     browser.waitForAngular();
//     await browser.actions().mouseMove(page.editPhotoClick).click().perform();
//     const fileToUpload = 'D:/PROTR_Asset360AT07/test_Data/sad1.jpg';
//     const absolutePath = path.resolve(fileToUpload);
//     $('input[type="file"]').sendKeys(absolutePath);
//     element(by.css('[ng-click="addAttachmentVM.ok()"]')).click();
//     browser.wait(EC.invisibilityOf(element(by.id('modal-body'))), 8000);
//     element(by.css('[ng-click="vm.save(vm.selectedAsset)"]')).click();
//     browser.wait(EC.presenceOf(element(by.cssContainingText('[class="toast-message"]', 'Changes Saved.'))), 10000);
//   });
// });
//# sourceMappingURL=asset-explorer-attachments.e2e-spec.js.map