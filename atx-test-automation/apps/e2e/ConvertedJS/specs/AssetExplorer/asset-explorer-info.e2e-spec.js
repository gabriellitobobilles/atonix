"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var Pages = require("../../page/pages");
var interface_1 = require("../../helpers/interface");
var user_1 = require("../../helpers/user");
var helper_1 = require("../../helpers/helper");
var casual = require("casual");
var testDetails_data_1 = require("../../helpers/testDetails.data");
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
var infoAssetTree = {
    assetName: 'Test Automation Asset',
    assetTree: 'nD Test Client\\Atonix',
    copyAssetTree: 'nD Test Client\\Atonix',
    pasteAssetTree: 'Demo Clients\\Test Asset',
    edittedAssetName: 'Editted Test Automation',
    assetTag: ['Automation', 'Protractor', 'Testing']
};
describe('Asset Explorer - Info', function () {
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
    it('Ensure assets can be added to the asset tree at multiple levels', function () {
        expect(assetExplorerPage.addAsset(infoAssetTree)).toBeTruthy();
        expect(assetExplorerPage.afterEditVerification()).toBeTruthy();
        helper.waitAndClick(assetExplorerPage.runModeBtn);
        helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
        assetExplorerPage.searchAsset(infoAssetTree.assetName);
        expect(assetExplorerPage.assetNameTxt.getAttribute('value')).toMatch(infoAssetTree.assetName);
    });
    it('Ensure assets can be moved up/down the asset tree (reorder)', function () {
        expect(assetExplorerPage.moveAssetUpAndDown(infoAssetTree)).toBeTruthy();
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    });
    it('Ensure a copy and paste of assets can be performed at different levels', function () {
        expect(assetExplorerPage.copyAsset(infoAssetTree)).toBeTruthy();
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
        expect(assetExplorerPage.pasteAsset(infoAssetTree)).toBeTruthy();
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    });
    it('Ensure edits can be made to assets and changes are shown (i.e. renaming)', function () {
        expect(assetExplorerPage.editAsset(infoAssetTree.assetTree, infoAssetTree.assetName, infoAssetTree.edittedAssetName)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
        assetExplorerPage.searchAsset(infoAssetTree.edittedAssetName);
        expect(assetExplorerPage.assetNameTxt.getAttribute('value')).toMatch(infoAssetTree.edittedAssetName);
    });
    it('Ensure an attribute can be starred as a favorite', function () {
        expect(assetExplorerPage.starFavoriteAttribute(infoAssetTree)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
        helper.waitAndClick(assetExplorerPage.editAssetTreeBtn);
        helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    });
    it('Ensure a tag can be added to an asset and can be deleted', function () {
        expect(assetExplorerPage.addAssetTag(infoAssetTree)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
        expect(assetExplorerPage.deleteAssetTag(infoAssetTree)).toBeTruthy();
        assetExplorerPage.afterEditVerification();
        helper.waitAndClick(assetExplorerPage.editAssetTreeBtn);
        helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    });
    it('Ensure an asset can be deleted', function () {
        expect(assetExplorerPage.deleteAsset(infoAssetTree)).toBeTruthy();
        assetExplorerPage.waitForSpinner();
        assetExplorerPage.waitForToastMessage();
        expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.assetTreeEntry
            .replace('{value}', infoAssetTree.edittedAssetName)))
            .isPresent())
            .toBe(false);
    });
});
//# sourceMappingURL=asset-explorer-info.e2e-spec.js.map