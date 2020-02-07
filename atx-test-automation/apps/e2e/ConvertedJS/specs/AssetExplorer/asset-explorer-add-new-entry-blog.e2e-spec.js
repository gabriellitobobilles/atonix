"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var user_1 = require("../../helpers/user");
var helper_1 = require("../../helpers/helper");
var interface_1 = require("../../helpers/interface");
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
var blogEntry = {
    title: 'Test Title',
    body: 'This is a test body',
    tags: ['test', 'blog', 'entry'],
    file: 'tester.gif',
    edittedTitle: 'TestEdit',
    edittedBody: 'Body is now editted',
    edittedTags: ['editted', 'testing'],
    edittedFile: 'smiley1.jpg'
};
describe('Asset Explorer - Blog - Add New Entry', function () {
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
    it('Ensure Add New Blog Entry functionality', function () {
        assetExplorerPage.searchAsset(assetObj.name);
        helper.waitAndClick(assetExplorerPage.blogTab);
        expect(assetExplorerPage.blogContentSearchBar);
        expect(assetExplorerPage.addNewEntryHeader.isPresent);
    });
    it('Ensure user should be able to add entry (Title, Tags & File attachments)', function () {
        expect(assetExplorerPage.addBlogEntry(blogEntry)).toBeTruthy();
    });
    it('Ensure Edit, View & Format functionality inside the document entry.', function () {
        expect(assetExplorerPage.viewBlogEntry(blogEntry)).toBeTruthy();
        expect(assetExplorerPage.editBlogEntry(blogEntry)).toBeTruthy();
    });
    it('Ensure Blog entries are able to be deleted (delete permissions)', function () {
        expect(assetExplorerPage.deleteBlogEntry(blogEntry)).toBeTruthy();
    });
});
//# sourceMappingURL=asset-explorer-add-new-entry-blog.e2e-spec.js.map