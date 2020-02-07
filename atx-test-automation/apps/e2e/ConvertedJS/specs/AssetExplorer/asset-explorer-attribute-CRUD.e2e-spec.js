"use strict";
/**
 * Asset Explorer - Attribute CRUD
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var utils_1 = require("../../helpers/utils");
var protractor_1 = require("protractor");
var interface_1 = require("../../helpers/interface");
var casual = require("casual");
var material_1 = require("@angular/material");
var user = new user_1.User();
var assetExplorerPage = new Pages.AssetExplorer();
var helper = new helper_1.Helper();
var helpUtil = new utils_1.Utils();
var date = new Date(2006, material_1.OCT, 31);
var editted_date = new Date(2017, material_1.JUN, 17);
var assetObj = {
    name: 'Atonix',
    descriptiveName: 'Descriptive ' + casual.word,
    attributes: [{
            name: 'attr_' + casual.word,
            attributeType: interface_1.AttributeTypesEnum['Freeform Text'],
            favorite: true
        }]
};
var assetAtt = [{
        name: 'Freeform Text',
        value: 'TestValue',
        editted_value: 'Editted Test Value',
        invalid_value: '3fasd3ad1.4',
        attributeType: interface_1.AttributeTypesEnum['Freeform Text'],
        favorite: true
    }, {
        name: 'Integer',
        value: 3321,
        editted_value: 5679,
        invalid_value: '3fasd3ad1.4',
        attributeType: interface_1.AttributeTypesEnum['Integer'],
        favorite: true
    }, {
        name: 'Float',
        value: 223.323,
        editted_value: 546.87,
        invalid_value: '123ff342',
        attributeType: interface_1.AttributeTypesEnum['Float'],
        favorite: true
    }, {
        name: 'Discrete List',
        value: 'itemOne',
        value2: 'itemTwo',
        value3: 'itemThree',
        editted_value: 'itemEditted',
        invalid_value: 'itemOne,itemTwo.itemThree:',
        attributeType: interface_1.AttributeTypesEnum['Discrete List'],
        favorite: true
    }, {
        name: 'Boolean',
        value: false,
        attributeType: interface_1.AttributeTypesEnum['Boolean'],
        favorite: true
    }, {
        name: 'Date',
        dateValue: date,
        value2: '01:59:23PM',
        editted_dateValue: editted_date,
        editted_value2: '12:02:03AM',
        invalid_value: 'thisIsAn1nvalidValue3',
        attributeType: interface_1.AttributeTypesEnum['Date'],
        favorite: true
    }];
describe('Asset Attribute - CRUD', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.logIn(testDetails_data_1.userObj);
            user.navigateToApp(testDetails_data_1.appName.assetExplorer);
            return [2 /*return*/];
        });
    }); });
    describe('Freeform Text', function () {
        it('should be able to load Asset Explorer', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Freeform Text', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.addAttribute(assetAtt[0])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Freeform Text', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[0])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Freeform Text', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[0])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
    describe('Integer', function () {
        it('should be able to load Asset Explorer', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Integer', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.addAttribute(assetAtt[1])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Integer', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[1])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Integer', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[1])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to test invalid attribute values - Integer', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            assetExplorerPage.addInvalidAttribute(assetAtt[1]);
            expect(assetExplorerPage.invalidAttributeValueLocator(assetAtt[1])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
            expect(assetExplorerPage.deleteInvalidAttribute(assetAtt[1])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
    describe('Float', function () {
        it('should be able to load Asset Explorer', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Float', function () {
            expect(assetExplorerPage.addAttribute(assetAtt[2])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Float', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[2])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Float', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[2])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to test invalid attribute values- Float', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            assetExplorerPage.addInvalidAttribute(assetAtt[2]);
            expect(assetExplorerPage.invalidAttributeValueLocator(assetAtt[2])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
            expect(assetExplorerPage.deleteInvalidAttribute(assetAtt[2])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
    describe('Discrete List', function () {
        it('should be able to load Asset Explorer - Discrete List', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Discrete List', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.addAttribute(assetAtt[3])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Discrete List', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[3])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Discrete List', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[3])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to test invalid attribute values - Discrete List', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            assetExplorerPage.addInvalidAttribute(assetAtt[3]);
            expect(assetExplorerPage.invalidAttributeValueLocator(assetAtt[3])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
            expect(assetExplorerPage.deleteInvalidAttribute(assetAtt[3])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
    describe('Boolean', function () {
        it('should be able to load Asset Explorer - Boolean', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Boolean', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.addAttribute(assetAtt[4])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Boolean', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[4])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Boolean', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[4])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
    describe('Date', function () {
        it('should be able to load Asset Explorer - Date', function () {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
        });
        it('should be able to add attribute to Asset - Date', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.addAttribute(assetAtt[5])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to edit attribute from Asset - Date', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.editAttribute(assetAtt[5])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to delete attribute from Asset - Date', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            expect(assetExplorerPage.deleteAttribute(assetAtt[5])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
        it('should be able to test invalid attribute values - Date', function () {
            assetExplorerPage.searchAsset(assetObj.name);
            assetExplorerPage.addInvalidAttribute(assetAtt[5]);
            expect(assetExplorerPage.invalidAttributeValueLocator(assetAtt[5])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
            expect(assetExplorerPage.deleteInvalidAttribute(assetAtt[5])).toBeTruthy();
            helper.waitForVisible(assetExplorerPage.changedAssetIndicator);
            helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
            helper.waitForElementClickable(assetExplorerPage.saveAssetBtn, 1000);
            expect(assetExplorerPage.undoBtn.isEnabled());
            expect(assetExplorerPage.saveAssetBtn.isEnabled());
            expect(assetExplorerPage.saveAllAssetsBtn.isEnabled());
            expect(assetExplorerPage.changedAssetIndicator.isEnabled());
            helper.waitAndClick(assetExplorerPage.saveAssetBtn);
            assetExplorerPage.waitForSpinner();
            assetExplorerPage.waitForToastMessage();
        });
    });
});
//# sourceMappingURL=asset-explorer-attribute-CRUD.e2e-spec.js.map