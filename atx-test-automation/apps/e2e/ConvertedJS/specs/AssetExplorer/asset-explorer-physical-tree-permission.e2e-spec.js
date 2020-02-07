"use strict";
/**
 * maps test for Program Navigator
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
var user = new user_1.User();
var assetExplorerPage = new Pages.AssetExplorer();
var assetNavigatorPane = Pages.assetNavigatorPane;
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    parent: 'Demo Clients',
    child: ['Test Asset']
};
var assetObj = {
    name: 'Test Asset ' + casual.word,
    descriptiveName: 'Descriptive ' + casual.word,
    attributes: [{
            name: 'attr_' + casual.word,
            attributeType: interface_1.AttributeTypesEnum['Freeform Text'],
            favorite: true
        }]
};
describe('Asset Explorer', function () {
    beforeAll(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.logIn({ email: 'nino@test.com', password: '@Password1' });
            user.navigateToApp(testDetails_data_1.appName.assetExplorer);
            return [2 /*return*/];
        });
    }); });
    it('should be able to load Asset Explorer', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            protractor_1.browser.waitForAngularEnabled();
            expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
            return [2 /*return*/];
        });
    }); });
    it('Ad Hoc controls should NOT be present', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            expect(assetNavigatorPane.adHocDropDownBtn.isPresent()).toBeTruthy();
            expect(assetNavigatorPane.adHocDropDownBtn.isDisplayed()).toBeFalsy();
            return [2 /*return*/];
        });
    }); });
    it('should be able to Enable Edit mode physical Tree', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            expect(assetNavigatorPane.editTreeBtn.isDisplayed()).toBeTruthy();
            assetNavigatorPane.editPhysicalTree();
            expect(assetNavigatorPane.currentlyEditingTxtLbl.isDisplayed()).toBeTruthy();
            expect(assetNavigatorPane.currentlyEditingTxtLbl.getText()).toContain('CURRENTLY EDITING');
            return [2 /*return*/];
        });
    }); });
    it('should be able to ADD NEW ASSET', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            addNewAssetFn();
            expect(assetExplorerPage.getToastMessage()).toContain('Changes Saved');
            expect(assetNavigatorPane.getCurrentChildArea().getText()).toContain(assetObj.name);
            return [2 /*return*/];
        });
    }); });
});
function addNewAssetFn() {
    assetNavigatorPane.selectAssetInTree(clientToUse);
    assetNavigatorPane.addChild();
    assetExplorerPage.inputAssetDetails(assetObj);
    assetExplorerPage.saveAssetFn();
}
//# sourceMappingURL=asset-explorer-physical-tree-permission.e2e-spec.js.map