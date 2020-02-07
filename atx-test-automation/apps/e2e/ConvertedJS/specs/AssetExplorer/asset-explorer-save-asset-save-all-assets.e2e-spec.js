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
var saveAndSaveAll = {
    assetTree: 'nD Test Client\\Atonix',
    firstAsset: ['Automation Test Asset 1', 'Editted Protractor Test 1'],
    secondAsset: ['Automation Test Asset 2', 'Editted Protractor Test 2'],
    thirdAsset: ['Automation Test Asset 3', 'Editted Protractor Test 3'],
};
describe('Asset Explorer - Save Asset and Save All Assets', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.logIn(testDetails_data_1.userObj);
            user.navigateToApp(testDetails_data_1.appName.assetExplorer);
            return [2 /*return*/];
        });
    }); });
    it('Ensure "Save Asset" button\'s functionality', function () {
        protractor_1.browser.waitForAngularEnabled();
        expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.firstAsset[0], saveAndSaveAll.firstAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.firstAsset[0]))).isPresent);
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.secondAsset[0], saveAndSaveAll.secondAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.secondAsset[0]))).isPresent);
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.thirdAsset[0], saveAndSaveAll.thirdAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.thirdAsset[0]))).isPresent);
        assetExplorerPage.searchAsset(saveAndSaveAll.secondAsset[0]);
        helper.waitForDisappear(assetExplorerPage.saveAssetBtnDisabled);
        helper.waitAndClick(assetExplorerPage.saveAssetBtn);
        expect(helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.secondAsset[0])))));
    });
    it('Ensure "Save Asset" button\'s functionality', function () {
        protractor_1.browser.waitForAngularEnabled();
        expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.firstAsset[0], saveAndSaveAll.firstAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.firstAsset[0]))).isPresent);
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.secondAsset[0], saveAndSaveAll.secondAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.secondAsset[0]))).isPresent);
        expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree, saveAndSaveAll.thirdAsset[0], saveAndSaveAll.thirdAsset[0])).toBeTruthy();
        expect(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.thirdAsset[0]))).isPresent);
        assetExplorerPage.searchAsset(saveAndSaveAll.secondAsset[0]);
        helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
        helper.waitAndClick(assetExplorerPage.saveAllAssetsBtn);
        expect(helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.firstAsset[0])))));
        expect(helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.secondAsset[0])))));
        expect(helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
            .replace('{value}', saveAndSaveAll.thirdAsset[0])))));
    });
});
//# sourceMappingURL=asset-explorer-save-asset-save-all-assets.e2e-spec.js.map