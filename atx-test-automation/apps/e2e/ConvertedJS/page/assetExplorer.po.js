"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var utils_1 = require("../helpers/utils");
var helper_1 = require("../helpers/helper");
var pages_1 = require("../page/pages");
var casual = require("casual");
var calendar_picker_helper_1 = require("../helpers/extends/calendar-picker.helper");
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var attributeValues = "div > [ng-repeat=\"(colRenderIndex, col) in " +
    "colContainer.renderedColumns track by col.uid\"] div.ui-grid-cell-contents";
var AssetExplorer = /** @class */ (function () {
    function AssetExplorer() {
        this.infoTab = protractor_1.$("a[ng-click=\"vm.setTab('info')\"]");
        this.attachmentsTab = protractor_1.$("a[ng-click=\"vm.setTab('attachments')\"]");
        this.blogTab = protractor_1.$("a[ng-click=\"vm.setTab('blog')\"]");
        this.locationTab = protractor_1.$("a[ng-click=\"vm.setTab('location')\"]");
        this.listsTab = protractor_1.$("a[ng-click=\"vm.setTab('list')\"]");
        this.searchTab = protractor_1.$("a[ng-click=\"vm.setTab('search')\"]");
        // Info Tab
        this.attributeRow = protractor_1.$$("[ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\"]");
        this.adhocTreeDisabled = protractor_1.$("div[class=\"AdhocTree ng-isolate-scope isDisabled\"]");
        this.assetName = protractor_1.$("#assetAbbrevId");
        this.disabledAssetName = protractor_1.element(protractor_1.by.xpath('//input[@id="assetAbbrevId"] [@disabled="disabled"]'));
        this.appTitle = protractor_1.$('.appTitle');
        this.editAssetTreeBtn = protractor_1.$("button[title=\"Edit Tree\"]");
        this.createNewTreeBtn = protractor_1.$("button[title=\"Create New Tree\"]");
        this.assetTreeCaret = '//span[contains(text(), "{value}")]/../preceding-sibling::span';
        // Info Tab - Asset Tree buttons
        this.assetTreeEntry = '//div[@id="paneWestContainer"]//span[contains(text(), "{value}")]/..';
        this.runModeBtn = protractor_1.$("button[title=\"Run Mode\"]");
        this.parentAsset = '//label[contains(text(), "Parent:")]/following-sibling::span[contains(text(), "{value}")]';
        this.addAssetChild = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Add Child"]';
        this.moveUpAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Move Up"]';
        this.moveDownAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Move Down"]';
        this.deleteAssetBtn = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Delete"]';
        this.createSecurityRoleAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Create Security Role"]';
        this.configurationToolsAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Configuration Tools"]';
        // Info Tab - Right click asset entry buttons
        this.rightClickMenuAddChildBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Add Child")]'));
        this.rightClickMenuMoveUpBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Move Up")]'));
        this.rightClickMenuMoveDownBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Move Down")]'));
        this.rightClickMenuDownloadBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Download")]'));
        this.rightClickMenuDeleteBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Delete")]'));
        this.rightClickMenuCopyBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Copy")]'));
        this.rightClickMenuPasteBtn = protractor_1.element(protractor_1.by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Paste")]'));
        this.assetNameTxt = protractor_1.$("#assetAbbrevId");
        this.assetDescriptiveNameTxt = protractor_1.$("[ng-model=\"vm.selectedAsset.asset.AssetDesc\"]");
        this.setAssetClassTypeBtn = protractor_1.$("[title=\"Set Asset Class Type\"]");
        this.undoBtn = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Undo")]'));
        this.undoBtnDisabled = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Undo")] [@disabled="disabled"]'));
        this.saveAssetBtn = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Save Asset")]'));
        this.saveAssetBtnDisabled = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Save Asset")] [@disabled="disabled"]'));
        this.saveAllAssetsBtn = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Save All Assets")]'));
        this.saveAllAssetsBtnDisabled = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "Save All Assets")] [@disabled="disabled"]'));
        this.changedAssetIndicator = protractor_1.$("[class= \"changedAssetTreeNode\"]");
        this.changedAssetIndicatorAssetName = '//span[contains(text(), "{value}")]/../../div[@class="changedAssetTreeNode"]';
        this.toastMessage = protractor_1.$(".toast-message");
        this.assetSearchBar = protractor_1.$("[placeholder=Search]");
        this.assetSearchBarSuggestions = protractor_1.$("[ng-attr-title='{{match.label}}']");
        this.assetNameHeader = protractor_1.$("h1[class=\"ng-binding\"]");
        this.addAttributeBar = protractor_1.$("[name=\"newAttribute\"]");
        this.addAttributeButton = protractor_1.$("[ng-click=\"infoVM.addAttribute(infoVM.newAttributeType)\"]");
        this.editAttributeButton = '//div[@title = "{value}"]/ancestor::div[@class="ui-grid-row ng-scope"]//i[@title="Edit"]';
        this.setAttributeValueModal = protractor_1.$("[class=\"modal-dialog \"]");
        this.setAttributeValueModalHeader = protractor_1.$("[id=\"modal-title\"]");
        this.setDetailsCaret = protractor_1.element(protractor_1.by.xpath('//div[contains(text(), "Set Details")]/i'));
        this.attributeValueTypeDropdown = protractor_1.$("[id= \"attributeType\"]");
        this.attributeValueTypeDropdownOptions = protractor_1.$("[id=\"attributeType\"] > option");
        this.freeformTextAVT = protractor_1.$("option[label=\"Freeform Text\"]");
        this.floatAVT = protractor_1.$("option[label=\"Float\"]");
        this.integerAVT = protractor_1.$("option[label=\"Integer\"]");
        this.discreteListAVT = protractor_1.$("option[label=\"Discrete List\"]");
        this.booleanAVT = protractor_1.$("option[label=\"Boolean\"]");
        this.dateAVT = protractor_1.$("option[label=\"Date\"]");
        this.assetAttributeEntry = protractor_1.$$("div[class=\"ui-grid-row ng-scope\"]");
        this.assetAttributeFavorite = protractor_1.$$("div[class=\"ui-grid-row ng-scope\"] i[title=\"Favorite\"]");
        this.assetAttributeAddTagTextbox = protractor_1.$("div [id= \"SectionTags\"] input[id=\"addTag\"]");
        this.assetAttributeAddTagBtn = protractor_1.element(protractor_1.by.xpath('//div[@id="SectionTags"]//button[contains(text(), "Add Tag")]'));
        this.assetAttributeDeleteTabBtn = '//div[@id="SectionTags"]//span[contains(text(), "{value}")]/preceding-sibling::a[@title="Delete Tag"]';
        this.assetAttributeAddTagSpan = '//div[@id="SectionTags"]//span[contains(text(), "{value}")]';
        this.assetAttributeValueTextBar = protractor_1.$("#attributeValueText");
        this.assetAttributeValueIntegerBar = protractor_1.$("#attributeValueInt");
        this.assetAttributeValueFloatBar = protractor_1.$("#attributeValueFloat");
        this.assetAttributeValueBooleanCheckbox = protractor_1.element(protractor_1.by.xpath('//input[@id="attributeValueBoolean"]/..'));
        this.assetAttributeValueBooleanTrue = '//div[@title="{value}"]/ancestor::div[@class="' +
            'ui-grid-row ng-scope"]//i[@class = "fa fa-check-square"]';
        this.assetAttributeValueBooleanFalse = '//div[@title="{value}"]/ancestor::div[@class="' +
            'ui-grid-row ng-scope"]//i[@class = "fa fa-square-o"]';
        this.attbooleanChecker = '//div[@title="{value}"]/ancestor::div[@class=' +
            '"ui-grid-row ng-scope"]//div[@ng-switch-when="boolean"]';
        this.assetAttributeValueEditTrue = protractor_1.$("[class=\"ng-pristine ng-untouched ng-valid ng-not-empty\"]");
        this.assetAttributeValueEditFalse = protractor_1.$("[class=\"ng-pristine ng-untouched ng-valid ng-empty\"]");
        this.assetAttributeValueDiscreteListOptionsBar = protractor_1.$("#attributeOptions");
        this.assetAttributeValueDiscreteListDropdown = protractor_1.$("#attributeValueList");
        this.assetAttributeValueDateBar = protractor_1.$("input[ng-model=\"dpController.internalDate\"]");
        this.assetAttributeValueTimeBar = protractor_1.$("input[ng-model=\"dpController.internalTime\"]");
        this.calendarButton = protractor_1.$("div[type=\"button\"] i[class=\"fa fa-calendar\"]");
        this.discreteListValidateButton = protractor_1.$("#validateButton");
        this.discreteListValidateWarning = protractor_1.$("div[ng-hide = \"attributeVM.canOK\"]");
        this.setAttributeValueModalOkBtn = protractor_1.$("[ng-click=\"attributeVM.ok()\"]");
        this.setAttributeValueModalCancelBtn = protractor_1.$("[ng-click=\"attributeVM.cancel()\"]");
        // Blog Tab
        this.blogContentSearchBar = protractor_1.$("div[id=\"blogContentSearch\"] input");
        this.blogContentSearchBtn = protractor_1.element(protractor_1.by.xpath('//div[@id="blogContentSearch"]/button[contains(text(), "Search")]'));
        this.blogContentResetBtn = protractor_1.element(protractor_1.by.xpath('//div[@id="blogContentSearch"]/button[contains(text(), "Reset")]'));
        this.showAutoGeneratedEntriesCheckbox = protractor_1.$("input[ng-model=\"discussionVM.showAutogenEntries\"]");
        this.addNewEntryHeader = protractor_1.$("div[name=\"newBlogEntryForm\"]");
        this.blogEntryPanel = protractor_1.$("div[class=\"panel ng-scope\"]");
        this.blogEntryHeaderTitle = '//div/b[contains(text(), "{value}")]';
        this.blogEntryEditBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel-heading clearfix"]//i[@title="Edit Entry"]/..';
        this.blogEntryDeleteBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel-heading clearfix"]//i[@title="Delete Entry"]/..';
        this.addBlogPanel = protractor_1.$("div[class=\"panel-body issueTextEditor in collapse\"]");
        this.addBlogTitle = protractor_1.$("#title");
        this.addBlogBodyFrame = protractor_1.$("div[name= \"newBlogEntryForm\"] iframe");
        this.addBlogBodyTextarea = protractor_1.$("body[class=\"mce-content-body \"]");
        this.addBlogUploadFile = protractor_1.$("div[name=\"newBlogEntryForm\"] input[id=\"fileInput\"]");
        this.fileToUpload = 'D:/atx-test-automation/apps/e2e/src/test_Data/{value}';
        this.addBlogSuccessfulUploadFile = '//div[@name="newBlogEntryForm"]//a[contains(text(), "{value}")]';
        this.addBlogTagsTextbox = protractor_1.$("div[name=\"newBlogEntryForm\"] input[id=\"addTag\"]");
        this.addBlogAddTagBtn = protractor_1.element(protractor_1.by.xpath('//div[@name="newBlogEntryForm"]//button[contains(text(), "Add Tag")]'));
        this.addBlogTagsCreatedSpan = '//div[@name="newBlogEntryForm"]//span[contains(text(), "{value}")]';
        this.addBlogCancelBtn = protractor_1.$("input[name=\"Cancel\"]");
        this.addBlogSubmitBtn = protractor_1.$("input[name=\"Submit\"]");
        this.editBlogPanel = protractor_1.$("div[class=\"panel-body issueTextEditor form ng-scope\"]");
        this.editBlogBodyDiv = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]/div[@ng-if="entry.editing"]';
        this.editBlogTitle = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//input[@name="title"]';
        this.editBlogBodyFrame = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//iframe';
        this.editBlogBodyTextarea = protractor_1.$("body[class=\"mce-content-body \"]");
        this.editBlogUploadFile = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]' +
            '//input[@class="file-upload-box form-control"]';
        this.editBlogSuccessfulUploadFile = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//a[contains(text(), "{value2}")]';
        this.editBlogTagsTextbox = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//input[@id="addTag"]';
        this.editBlogAddTagBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Add Tag")]';
        this.editBlogTagsCreatedSpan = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//span[contains(text(), "{value2}")]';
        this.editBlogCancelBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Cancel")]';
        this.editBlogSaveBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Save")]';
        // Attachments tab
        this.addPhotoVideoBtn = protractor_1.element(protractor_1.by.xpath('//button[contains(text(), "Add Photo / Video")]'));
        this.addAttachmentBtn = protractor_1.element(protractor_1.by.xpath('//button[contains(text(), "Add Attachment")]'));
        this.addAttachmentModal = protractor_1.element(protractor_1.by.xpath('//h3[contains(text(), "Add Attachment")]/ancestor::div[@class= "modal-content"]'));
        this.addAttachmentFileUpload = protractor_1.$("[type=\"file\"]");
        this.attachmentCaptionTextbox = protractor_1.element(protractor_1.by.xpath('//label[contains(text(), "Caption:")]/following-sibling::input'));
        this.addTagTextbox = protractor_1.$("input[id=\"addTag\"]");
        this.addTagBtn = protractor_1.element(protractor_1.by.xpath('//button[contains(text(), "Add Tag")]'));
        this.addTagSpan = '//span[contains(text(), "{value}")]';
        this.okModalBtn = protractor_1.$("[ng-click=\"addAttachmentVM.ok()\"]");
        this.cancelModalBtn = protractor_1.$("[ng-click=\"addAttachmentVM.cancel()\"]");
        this.photoOrVideoTitle = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]';
        this.photoOrVideofavoriteBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/i';
        this.photoOrVideoEditBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/..//i[@title="Edit"]';
        this.photoOrVideoDeleteBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/..//i[@title="Delete Photo"]';
        this.attachmentFilesTitle = '//div[@class="ui-grid-canvas"]//a[contains(text(), "{value}")]';
        this.attachmentFilesFavoriteBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
            '//i[@title="Set as a Favorite"]';
        this.attachmentFilesEditBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
            '//i[@title="Edit"]';
        this.attachmentFilesDeleteBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
            '//i[@title="Delete"]';
    }
    AssetExplorer.prototype.getAttributeDetailsByName = function (attributeName) {
        return this.attributeRow.filter(function (attrRow) {
            return attrRow.$$(attributeValues)
                .get(2).getText().then(function (text) {
                return text.includes(attributeName);
            });
        }).first().$$(attributeValues);
    };
    AssetExplorer.prototype.addNewAsset = function (assetToNatigateObj, assetToCreate) {
        pages_1.assetNavigatorPane.editPhysicalTree();
        pages_1.assetNavigatorPane.selectAssetInTree(assetToNatigateObj);
        pages_1.assetNavigatorPane.addChild();
        this.inputAssetDetails(assetToCreate);
    };
    AssetExplorer.prototype.inputAssetDetails = function (assetToCreate) {
        this.assetNameTxt.click();
        helper.clearAndSendKeys(this.assetNameTxt, assetToCreate.name);
        this.assetNameTxt.click();
        helper.clearAndSendKeys(this.assetDescriptiveNameTxt, assetToCreate.descriptiveName);
        // ? modify asset type
        // add attributes
    };
    AssetExplorer.prototype.saveAssetFn = function () {
        this.saveAssetBtn.click();
        this.waitForSpinner();
    };
    AssetExplorer.prototype.waitForSpinner = function () {
        helper.waitForVisible(pages_1.assetNavigatorPane.spinner);
        helper.waitForDisappear(pages_1.assetNavigatorPane.spinner, 100000);
    };
    AssetExplorer.prototype.waitForToastMessage = function () {
        helper.waitForVisibleAndDisappear(this.toastMessage);
    };
    AssetExplorer.prototype.getToastMessage = function () {
        helper.waitForVisible(this.toastMessage);
        return this.toastMessage.getText();
    };
    AssetExplorer.prototype.afterEditVerification = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                helper.waitForVisible(this.changedAssetIndicator);
                helper.waitForDisappear(this.saveAssetBtnDisabled);
                helper.waitForElementClickable(this.saveAssetBtn, 1000);
                expect(this.undoBtn.isEnabled());
                expect(this.saveAssetBtn.isEnabled());
                expect(this.saveAllAssetsBtn.isEnabled());
                expect(this.changedAssetIndicator.isEnabled());
                helper.waitAndClick(this.saveAssetBtn);
                this.waitForSpinner();
                this.waitForToastMessage();
                return [2 /*return*/, true];
            });
        });
    };
    AssetExplorer.prototype.clickRunModeAndVerify = function () {
        helper.waitAndClick(this.runModeBtn);
        helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
        return true;
    };
    AssetExplorer.prototype.searchAsset = function (assetName) {
        helper.clearAndSendKeys(this.assetSearchBar, assetName);
        helper.waitForVisible(this.assetSearchBarSuggestions, 500000);
        helper.clickAndWaitForVisible(this.assetSearchBarSuggestions, this.addAttributeBar);
        helper.waitForVisible(this.addAttributeBar);
        protractor_1.browser.sleep(3000);
    };
    AssetExplorer.prototype.attributeLocator = function (assetAttributes) {
        var attData = protractor_1.$("div[title=\"" + assetAttributes.value + "\"]");
        helper.waitForVisible(attData);
        return true;
    };
    AssetExplorer.prototype.invalidAttributeValueLocator = function (assetAttributes) {
        switch (assetAttributes.attributeType) {
            case 0: break;
            case 1: // Imvalid Integer
                var invalidIntData = assetAttributes.invalid_value.toString().split('.', 1); // exclude decimal points
                var invalidIntData2 = invalidIntData.toString().replace(/\D+/g, ''); // remove letters
                var invalidIntElem = protractor_1.element(protractor_1.by.xpath('//div[@title="{value}"]'.replace('{value}', invalidIntData2)));
                helper.waitForVisible(invalidIntElem);
                return true;
            case 2: // Invalid Float
                var invalidFloatData = assetAttributes.invalid_value.toString().replace(/\D+/g, ''); // remove letters
                var invalidFloatData2 = invalidFloatData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
                var invalidFLoatElem = protractor_1.element(protractor_1.by.xpath('//div[@title="{value}"]'.replace('{value}', invalidFloatData2 + '.0')));
                helper.waitForVisible(invalidFLoatElem);
                return true;
            case 3: // Invalid Discrete List
                var attData = protractor_1.$("div[title=\"" + assetAttributes.invalid_value + "\"]");
                helper.waitForVisible(attData);
                return true;
            case 4:
                this.booleanAVT.click();
                break;
            case 5: // Invalid Date
                var attDateData = protractor_1.$("div[title=\"" + assetAttributes.invalid_value + "\"]");
                helper.waitForDisappear(attDateData);
                return true;
        }
    };
    AssetExplorer.prototype.addAttribute = function (assetAttributes) {
        helper.clearAndSendKeys(this.addAttributeBar, assetAttributes.name);
        helper.clickAndWaitForVisible(this.addAttributeButton, this.setAttributeValueModal);
        protractor_1.browser.sleep(1000);
        helper.clickAndWaitForVisible(this.setDetailsCaret, this.attributeValueTypeDropdown);
        helper.clickAndWaitForVisible(this.attributeValueTypeDropdown, this.attributeValueTypeDropdownOptions);
        switch (assetAttributes.attributeType) {
            case 0: // Add Freeform Text
                this.freeformTextAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueTextBar, assetAttributes.value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataFreeText = protractor_1.element(protractor_1.by.xpath('//div[@title = "' + assetAttributes.value.toString() + '"]'));
                helper.waitForVisible(attTrueDataFreeText);
                return true;
            case 1: // Add Integer
                this.integerAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueIntegerBar, assetAttributes.value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataInt = protractor_1.element(protractor_1.by.xpath('//div[@title = "' + assetAttributes.value.toString() + '"]'));
                helper.waitForVisible(attTrueDataInt);
                return true;
            case 2: // Add Float
                this.floatAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueFloatBar, assetAttributes.value.toString());
                this.setAttributeValueModalOkBtn.click();
                var assetAttValueFloat = assetAttributes.value.toString();
                var assetAttValueFloatStringed = assetAttValueFloat.substring(0, assetAttValueFloat.indexOf('.') + 2);
                var attTrueDataFloat = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttValueFloatStringed + '"]'));
                helper.waitForVisible(attTrueDataFloat);
                return true;
            case 3: // Add Discrete list
                this.discreteListAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueDiscreteListOptionsBar, assetAttributes.value.toString() + ';'
                    + assetAttributes.value2.toString() + ';'
                    + assetAttributes.value3.toString());
                this.assetAttributeValueDiscreteListDropdown.click();
                var assetAttributeValueDiscreteListDropdownOptions = protractor_1.element(protractor_1.by.xpath('//option[@label="{value}"]'
                    .replace('{value}', assetAttributes.value2.toString())));
                assetAttributeValueDiscreteListDropdownOptions.click();
                this.setAttributeValueModalOkBtn.click();
                var attTrueDataDiscreteList = protractor_1.element(protractor_1.by.xpath('//div[@title="' +
                    assetAttributes.value2.toString() + '"]'));
                helper.waitForVisible(attTrueDataDiscreteList);
                return true;
            case 4: // Add Boolean
                this.booleanAVT.click();
                if (assetAttributes.value === true) {
                    helper.waitForVisible(this.assetAttributeValueBooleanCheckbox);
                    helper.waitForElementClickable(this.assetAttributeValueBooleanCheckbox);
                    helper.waitAndClick(this.assetAttributeValueBooleanCheckbox);
                    this.setAttributeValueModalOkBtn.click();
                    helper.waitForDisappear(this.setAttributeValueModal);
                    helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(this.assetAttributeValueBooleanTrue
                        .replace('{value}', assetAttributes.name))));
                    return true;
                }
                else {
                    this.setAttributeValueModalOkBtn.click();
                    helper.waitForDisappear(this.setAttributeValueModal);
                    helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(this.assetAttributeValueBooleanFalse
                        .replace('{value}', assetAttributes.name))));
                    return true;
                }
            case 5: // Add Date
                this.dateAVT.click();
                this.calendarButton.click();
                calendar_picker_helper_1.calendarHelper.selectCalendarMonthYear(assetAttributes.dateValue);
                helper.waitForVisible(this.assetAttributeValueTimeBar);
                helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.value2.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataDate = protractor_1.element(protractor_1.by.xpath('//div[@title="' +
                    assetAttributes.name + '"]'));
                helper.waitForVisible(attTrueDataDate);
                return true;
        }
    };
    AssetExplorer.prototype.addInvalidAttribute = function (assetAttributes) {
        helper.clearAndSendKeys(this.addAttributeBar, assetAttributes.name);
        helper.clickAndWaitForVisible(this.addAttributeButton, this.setAttributeValueModal);
        protractor_1.browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        helper.clickAndWaitForVisible(this.attributeValueTypeDropdown, this.attributeValueTypeDropdownOptions);
        switch (assetAttributes.attributeType) {
            case 0: break;
            case 1: // Add Invalid Integer
                this.integerAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueIntegerBar, assetAttributes.invalid_value.toString());
                break;
            case 2: // Add Invalid Float
                this.floatAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueFloatBar, assetAttributes.invalid_value.toString());
                break;
            case 3: // Add Invalid Discrete List
                this.discreteListAVT.click();
                helper.clearAndSendKeys(this.assetAttributeValueDiscreteListOptionsBar, assetAttributes.invalid_value.toString());
                this.assetAttributeValueDiscreteListDropdown.click();
                var assetAttributeValueDiscreteListDropdownOptions = protractor_1.element(protractor_1.by.xpath('//option[@label="{value}"]'
                    .replace('{value}', assetAttributes.invalid_value.toString())));
                assetAttributeValueDiscreteListDropdownOptions.click();
                break;
            case 4:
                this.booleanAVT.click();
                break;
            case 5: // Add Invalid Date
                this.dateAVT.click();
                helper.waitForVisible(this.assetAttributeValueDateBar);
                helper.clearAndSendKeys(this.assetAttributeValueDateBar, assetAttributes.invalid_value.toString());
                helper.waitForVisible(this.assetAttributeValueTimeBar);
                helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.invalid_value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataDate = protractor_1.element(protractor_1.by.xpath('//div[@title="' +
                    assetAttributes.name + '"]'));
                helper.waitForVisible(attTrueDataDate);
                return true;
        }
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
    };
    AssetExplorer.prototype.editAttribute = function (assetAttributes) {
        switch (assetAttributes.attributeType) {
            case 0: // Freeform Text
                var editAttFreeTextButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
                    .replace('{value}', assetAttributes.value.toString()) +
                    '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
                helper.clickAndWaitForVisible(editAttFreeTextButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret);
                helper.clearAndSendKeys(this.assetAttributeValueTextBar, assetAttributes.editted_value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataFreeText = protractor_1.element(protractor_1.by.xpath('//div[@title = "' +
                    assetAttributes.editted_value.toString() + '"]'));
                helper.waitForVisible(attTrueDataFreeText);
                return true;
            case 1: // Integer
                var editAttIntButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
                    .replace('{value}', assetAttributes.value.toString()) +
                    '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
                helper.clickAndWaitForVisible(editAttIntButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret);
                helper.clearAndSendKeys(this.assetAttributeValueIntegerBar, assetAttributes.editted_value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataInt = protractor_1.element(protractor_1.by.xpath('//div[@title = "' +
                    assetAttributes.editted_value.toString() + '"]'));
                helper.waitForVisible(attTrueDataInt);
                return true;
            case 2: // Float
                var assetAttValueFloatEdit = parseFloat(assetAttributes.value.toString());
                var assetAttValueFloatEditFixed = assetAttValueFloatEdit.toFixed(1).toString();
                var assetAttValueFloatEditStringed = assetAttValueFloatEditFixed
                    .substring(0, assetAttValueFloatEditFixed
                    .indexOf('.') + 2);
                var editAttFloatButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
                    .replace('{value}', assetAttValueFloatEditStringed)
                    + '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
                helper.clickAndWaitForVisible(editAttFloatButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret);
                helper.clearAndSendKeys(this.assetAttributeValueFloatBar, assetAttributes.editted_value.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                // const assetAttValueFloatEditted = assetAttributes.editted_value.toString();
                var assetAttValueFloatEditted = parseFloat(assetAttributes.editted_value.toString());
                var assetAttValueFloatEditedFixed = assetAttValueFloatEditted.toFixed(1).toString();
                var assetAttValueFloatEdittedStringed = assetAttValueFloatEditedFixed
                    .substring(0, assetAttValueFloatEditedFixed
                    .indexOf('.') + 2);
                var attTrueDataFloat = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttValueFloatEdittedStringed + '"]'));
                helper.waitForVisible(attTrueDataFloat);
                return true;
            case 3: // Discrete List
                var editAttDiscreteListButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
                    .replace('{value}', assetAttributes.value2.toString()) +
                    '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
                helper.clickAndWaitForVisible(editAttDiscreteListButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret, 50000);
                // this.setDetailsCaret.click();
                helper.clearAndSendKeys(this.assetAttributeValueDiscreteListOptionsBar, assetAttributes.value.toString() + ';'
                    + assetAttributes.value2.toString() + ';'
                    + assetAttributes.editted_value.toString());
                helper.waitForVisible(this.discreteListValidateWarning);
                this.discreteListValidateButton.click();
                helper.waitForDisappear(this.discreteListValidateWarning);
                this.assetAttributeValueDiscreteListDropdown.click();
                var assetAttributeValueDiscreteListDropdownOptions = protractor_1.element(protractor_1.by.xpath('//option[@label="{value}"]'
                    .replace('{value}', assetAttributes.editted_value.toString())));
                assetAttributeValueDiscreteListDropdownOptions.click();
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataDiscreteList = protractor_1.$("div[title=\"" + assetAttributes.editted_value + "\"]");
                helper.waitForVisible(attTrueDataDiscreteList);
                return true;
            case 4: // Edit Boolean
                var editAttTrueButton = protractor_1.element(protractor_1.by.xpath(this.editAttributeButton
                    .replace('{value}', assetAttributes.name.toString())));
                helper.clickAndWaitForVisible(editAttTrueButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret);
                helper.waitForVisible(this.assetAttributeValueBooleanCheckbox);
                helper.waitForElementClickable(this.assetAttributeValueBooleanCheckbox);
                helper.waitAndClick(this.assetAttributeValueBooleanCheckbox);
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(this.attbooleanChecker
                    .replace('{value}', assetAttributes.name.toString()))));
                return true;
            case 5: // Edit Date
                var editAttDateButton = protractor_1.element(protractor_1.by.xpath(this.editAttributeButton
                    .replace('{value}', assetAttributes.name)));
                helper.clickAndWaitForVisible(editAttDateButton, this.setAttributeValueModal);
                protractor_1.browser.sleep(1000);
                helper.waitAndClick(this.setDetailsCaret);
                this.calendarButton.click();
                calendar_picker_helper_1.calendarHelper.selectCalendarMonthYear(assetAttributes.editted_dateValue);
                helper.waitForVisible(this.assetAttributeValueTimeBar);
                helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.editted_value2.toString());
                this.setAttributeValueModalOkBtn.click();
                helper.waitForDisappear(this.setAttributeValueModal);
                var attTrueDataDate = protractor_1.element(protractor_1.by.xpath('//div[@title="' +
                    assetAttributes.name + '"]'));
                helper.waitForVisible(attTrueDataDate);
                return true;
        }
    };
    AssetExplorer.prototype.deleteAttribute = function (assetAttributes) {
        if (assetAttributes.attributeType === 2) { // Float
            var assetAttValueFloatDelete = parseFloat(assetAttributes.editted_value.toString());
            var assetAttValueFloatDeleteFixed = assetAttValueFloatDelete.toFixed(1);
            var assetAttValueFloatDeleteStringed = assetAttValueFloatDeleteFixed
                .substring(0, assetAttValueFloatDeleteFixed
                .indexOf('.') + 2);
            var deleteAttFloatButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
                .replace('{value}', assetAttValueFloatDeleteStringed) +
                '"ui-grid-row ng-scope"]//i[@title="Delete"]'));
            deleteAttFloatButton.click();
            var attTrueDataDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttValueFloatDeleteStringed + '"]'));
            helper.waitForDisappear(attTrueDataDeleted);
            return true;
        }
        if (assetAttributes.attributeType === 4 || assetAttributes.attributeType === 5) {
            var deleteAttButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "ui-grid-row ng-scope"]//i[@title="Delete"]'
                .replace('{value}', assetAttributes.name)));
            deleteAttButton.click();
            var attTrueDataDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttributes.name + '"]'));
            helper.waitForDisappear(attTrueDataDeleted);
            return true;
        }
        else {
            var deleteAttButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "ui-grid-row ng-scope"]//i[@title="Delete"]'
                .replace('{value}', assetAttributes.editted_value.toString())));
            deleteAttButton.click();
            var attTrueDataDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttributes.editted_value + '"]'));
            helper.waitForDisappear(attTrueDataDeleted);
            return true;
        }
    };
    AssetExplorer.prototype.deleteInvalidAttribute = function (assetAttributes) {
        switch (assetAttributes.attributeType) {
            case 0: break;
            case 1: // Delete Invalid Integer
                var invalidIntData = assetAttributes.invalid_value.toString().split('.', 1);
                var invalidIntData2 = invalidIntData.toString().replace(/\D+/g, '');
                var deleteInvalidIntElem = protractor_1.element(protractor_1.by.xpath('//div[@title = "{title}"]/ancestor::div[@class= "'
                    .replace('{title}', invalidIntData2)
                    + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
                deleteInvalidIntElem.click();
                var attTrueDataIntDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + invalidIntData2 + '"]'));
                helper.waitForDisappear(attTrueDataIntDeleted);
                return true;
            case 2: // Delete Invalid Float
                var invalidFloatData = assetAttributes.invalid_value.toString().replace(/\D+/g, ''); // remove letters
                var invalidFloatData2 = invalidFloatData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
                var deleteinvalidFLoatElem = protractor_1.element(protractor_1.by.xpath('//div[@title = "{title}"]/ancestor::div[@class= "'
                    .replace('{title}', invalidFloatData2 + '.0')
                    + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
                deleteinvalidFLoatElem.click();
                var attTrueDataFloatDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + invalidFloatData2 + '"]'));
                helper.waitForDisappear(attTrueDataFloatDeleted);
                return true;
            case 3: // Delete Invalid Discrete List
                var deleteAttButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "'
                    .replace('{value}', assetAttributes.invalid_value.toString())
                    + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
                deleteAttButton.click();
                var attTrueDataDiscreteDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttributes.invalid_value + '"]'));
                helper.waitForDisappear(attTrueDataDiscreteDeleted);
                return true;
            case 4:
                this.booleanAVT.click();
                break;
            case 5:
                var deleteAttDateButton = protractor_1.element(protractor_1.by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "'
                    .replace('{value}', assetAttributes.name)
                    + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
                deleteAttDateButton.click();
                var attTrueDateDeleted = protractor_1.element(protractor_1.by.xpath('//div[@title="' + assetAttributes.name + '"]'));
                helper.waitForDisappear(attTrueDateDeleted);
                return true;
        }
    };
    AssetExplorer.prototype.getAttributesValueColumn = function (attributeName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var col, rowList, attributes, values, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getColumnID()];
                    case 1:
                        col = _b.sent();
                        rowList = protractor_1.$$("[role=\"rowgroup\"] .ui-grid-row");
                        attributes = rowList.map(function (elem, index) {
                            return elem.$$("[role=\"gridcell\"]").get(col.indexOf(attributeName)).getText();
                        });
                        values = rowList.map(function (elem, index) {
                            return elem.$$("[role=\"gridcell\"]").get(col.indexOf("Value")).getText();
                        });
                        _a = {};
                        return [4 /*yield*/, attributes];
                    case 2:
                        _a.attributes = _b.sent();
                        return [4 /*yield*/, values];
                    case 3: return [2 /*return*/, (_a.values = _b.sent(), _a)];
                }
            });
        });
    };
    AssetExplorer.prototype.getColumnID = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var columnHeaderContainer, headerType, returnVal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        columnHeaderContainer = "span.ui-grid-header-cell-label";
                        headerType = protractor_1.$$(".myGrid.attributesList [ng-repeat=\"col in colContainer.renderedColumns track by col.uid\"]");
                        return [4 /*yield*/, headerType.$$(columnHeaderContainer).map(function (p) {
                                return p.getText();
                            })];
                    case 1:
                        returnVal = _a.sent();
                        return [2 /*return*/, returnVal];
                }
            });
        });
    };
    AssetExplorer.prototype.addBlogEntry = function (blogEntry) {
        var _this = this;
        helper.waitAndClick(this.addNewEntryHeader);
        helper.waitForVisible(this.addBlogPanel);
        helper.clearAndSendKeys(this.addBlogTitle, blogEntry.title);
        this.addBlogBodyFrame.click();
        util.switchToIframe(this.addBlogBodyFrame);
        helper.clearAndSendKeys(this.addBlogBodyTextarea, blogEntry.body);
        // helper.waitForVisible(this.addBlogUploadFile);
        util.switchToMainFrame();
        util.fileUpload(this.addBlogUploadFile, this.fileToUpload.replace('{value}', blogEntry.file));
        var successfulFileUpload = protractor_1.element(protractor_1.by.xpath(this.addBlogSuccessfulUploadFile.replace('{value}', blogEntry.file)));
        helper.waitForVisible(successfulFileUpload, 900000);
        blogEntry.tags.forEach(function (value) {
            helper.clearAndSendKeys(_this.addBlogTagsTextbox, value);
            var tagsSpan = protractor_1.element(protractor_1.by.xpath(_this.addBlogTagsCreatedSpan.replace('{value}', value)));
            helper.clickAndWaitForVisible(_this.addBlogAddTagBtn, tagsSpan);
        });
        helper.waitAndClick(this.addBlogSubmitBtn);
        var blogEntryHeaderTitle = protractor_1.element(protractor_1.by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.title)));
        helper.waitForVisible(blogEntryHeaderTitle);
        protractor_1.browser.sleep(3000);
        return true;
    };
    AssetExplorer.prototype.viewBlogEntry = function (blogEntry) {
        var blogEntryHeaderTitle = protractor_1.element(protractor_1.by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.title)));
        helper.waitForVisible(blogEntryHeaderTitle);
        return true;
    };
    AssetExplorer.prototype.editBlogEntry = function (blogEntry) {
        var _this = this;
        var defaultTitle = 'Blog Entry';
        helper.waitForElementClickable(protractor_1.element(protractor_1.by.xpath(this.blogEntryEditBtn.replace('{value}', blogEntry.title))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.blogEntryEditBtn.replace('{value}', blogEntry.title))));
        helper.waitForVisible(this.editBlogPanel);
        protractor_1.element(protractor_1.by.xpath(this.editBlogTitle.replace('{value}', blogEntry.title))).clear();
        protractor_1.element(protractor_1.by.xpath(this.editBlogTitle.replace('{value}', defaultTitle))).sendKeys(blogEntry.edittedTitle);
        protractor_1.element(protractor_1.by.xpath(this.editBlogBodyFrame.replace('{value}', blogEntry.edittedTitle))).click();
        util.switchToIframe(protractor_1.element(protractor_1.by.xpath(this.editBlogBodyFrame.replace('{value}', blogEntry.edittedTitle))));
        helper.clearAndSendKeys(this.editBlogBodyTextarea, blogEntry.edittedBody);
        util.switchToMainFrame();
        util.fileUpload(protractor_1.element(protractor_1.by.xpath(this.editBlogUploadFile.replace('{value}', blogEntry.edittedTitle))), this.fileToUpload
            .replace('{value}', blogEntry.edittedFile));
        var successfullFileUpload = protractor_1.element(protractor_1.by.xpath(this.editBlogSuccessfulUploadFile
            .replace('{value}', blogEntry.edittedTitle)
            .replace('{value2}', blogEntry.edittedFile)));
        helper.waitForVisible(successfullFileUpload, 100000);
        util.scrollToView(protractor_1.element(protractor_1.by.xpath(this.editBlogTagsTextbox.replace('{value}', blogEntry.edittedTitle))));
        blogEntry.edittedTags.forEach(function (value) {
            helper.clearAndSendKeys(protractor_1.element(protractor_1.by.xpath(_this.editBlogTagsTextbox.replace('{value}', blogEntry.edittedTitle))), value);
            var tagsSpan = protractor_1.element(protractor_1.by.xpath(_this.editBlogTagsCreatedSpan
                .replace('{value}', blogEntry.edittedTitle)
                .replace('{value2}', value)));
            helper.clickAndWaitForVisible(protractor_1.element(protractor_1.by.xpath(_this.editBlogAddTagBtn
                .replace('{value}', blogEntry.edittedTitle))), tagsSpan);
        });
        protractor_1.element(protractor_1.by.xpath(this.editBlogSaveBtn.replace('{value}', blogEntry.edittedTitle))).click();
        var editBlogBody = protractor_1.element(protractor_1.by.xpath(this.editBlogBodyDiv.replace('{value}', blogEntry.edittedTitle)));
        helper.waitForDisappear(editBlogBody);
        var edittedBlogEntryHeaderTitle = protractor_1.element(protractor_1.by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.edittedTitle)));
        helper.waitForVisible(edittedBlogEntryHeaderTitle);
        protractor_1.browser.sleep(3000);
        return true;
    };
    AssetExplorer.prototype.deleteBlogEntry = function (blogEntry) {
        helper.waitForElementClickable(protractor_1.element(protractor_1.by.xpath(this.blogEntryDeleteBtn.replace('{value}', blogEntry.edittedTitle))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.blogEntryDeleteBtn.replace('{value}', blogEntry.edittedTitle))));
        protractor_1.browser.sleep(2000);
        protractor_1.browser.switchTo().alert().accept();
        protractor_1.browser.waitForAngular();
        var deletedBlogEntryHeaderTitle = protractor_1.element(protractor_1.by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.edittedTitle)));
        helper.waitForDisappear(deletedBlogEntryHeaderTitle);
        return true;
    };
    AssetExplorer.prototype.addPhotoVideo = function (attachments) {
        var _this = this;
        attachments.imageOrVideoFile.forEach(function (value) {
            helper.waitForVisible(_this.addPhotoVideoBtn);
            helper.waitAndClick(_this.addPhotoVideoBtn);
            helper.waitForVisible(_this.addAttachmentModal);
            util.fileUpload(_this.addAttachmentFileUpload, _this.fileToUpload.replace('{value}', value));
            protractor_1.browser.sleep(1000);
            helper.waitAndClick(_this.okModalBtn);
            helper.waitForDisappear(_this.addAttachmentModal, 900000);
            helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideoTitle.replace('{value}', value))));
            protractor_1.browser.sleep(1000);
        });
        return true;
    };
    AssetExplorer.prototype.starFavoritePhotoVideo = function (attachments) {
        var _this = this;
        attachments.imageOrVideoFile.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideofavoriteBtn.replace('{value}', value))));
            protractor_1.browser.sleep(2000);
        });
        return true;
    };
    AssetExplorer.prototype.editPhotoVideo = function (attachments) {
        var _this = this;
        var x = 0;
        attachments.imageOrVideoFile.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideoEditBtn.replace('{value}', value))));
            helper.waitForVisible(_this.addAttachmentModal);
            helper.clearAndSendKeys(_this.attachmentCaptionTextbox, attachments.imageOrVideoCaption[x]);
            protractor_1.browser.sleep(2000);
            helper.clearAndSendKeys(_this.addTagTextbox, attachments.tags);
            helper.clickAndWaitForVisible(_this.addTagBtn, protractor_1.element(protractor_1.by.xpath(_this.addTagSpan.replace('{value}', attachments.tags))));
            helper.waitAndClick(_this.okModalBtn);
            helper.waitForDisappear(_this.addAttachmentModal);
            helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideoTitle.replace('{value}', attachments.imageOrVideoCaption[x]))));
            x++;
            protractor_1.browser.sleep(1000);
        });
        return true;
    };
    AssetExplorer.prototype.deletePhotoVideo = function (attachments) {
        var _this = this;
        attachments.imageOrVideoFile.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideoDeleteBtn.replace('{value}', value))));
            helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(_this.photoOrVideoTitle.replace('{value}', value))));
        });
        return true;
    };
    AssetExplorer.prototype.addAttachmentFiles = function (attachments) {
        var _this = this;
        attachments.attachmentFiles.forEach(function (value) {
            helper.waitForVisible(_this.addAttachmentBtn);
            helper.waitAndClick(_this.addAttachmentBtn);
            helper.waitForVisible(_this.addAttachmentModal);
            util.fileUpload(_this.addAttachmentFileUpload, _this.fileToUpload.replace('{value}', value));
            protractor_1.browser.sleep(1000);
            helper.waitAndClick(_this.okModalBtn);
            helper.waitForDisappear(_this.addAttachmentModal, 900000);
            helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesTitle.replace('{value}', value))));
            protractor_1.browser.sleep(1000);
        });
        return true;
    };
    AssetExplorer.prototype.starFavoriteAttachmentFiles = function (attachments) {
        var _this = this;
        attachments.attachmentFiles.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesFavoriteBtn.replace('{value}', value))));
            protractor_1.browser.sleep(2000);
        });
        return true;
    };
    AssetExplorer.prototype.editAttachmentFiles = function (attachments) {
        var _this = this;
        var x = 0;
        attachments.attachmentFiles.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesEditBtn.replace('{value}', value))));
            helper.waitForVisible(_this.addAttachmentModal);
            helper.clearAndSendKeys(_this.attachmentCaptionTextbox, attachments.attachmentFilesCaption[x]);
            protractor_1.browser.sleep(2000);
            helper.clearAndSendKeys(_this.addTagTextbox, attachments.tags);
            helper.clickAndWaitForVisible(_this.addTagBtn, protractor_1.element(protractor_1.by.xpath(_this.addTagSpan.replace('{value}', attachments.tags))));
            helper.waitAndClick(_this.okModalBtn);
            helper.waitForDisappear(_this.addAttachmentModal);
            helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesTitle.replace('{value}', attachments.attachmentFilesCaption[x]))));
            x++;
            protractor_1.browser.sleep(1000);
        });
        return true;
    };
    AssetExplorer.prototype.deleteAttachmentFiles = function (attachments) {
        var _this = this;
        attachments.attachmentFiles.forEach(function (value) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesDeleteBtn.replace('{value}', value))));
            helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(_this.attachmentFilesTitle.replace('{value}', value))));
        });
        return true;
    };
    AssetExplorer.prototype.openAssetTree = function (assetTreeVar) {
        var assetTreeSplit = assetTreeVar.split('\\');
        for (var x = 0; x !== assetTreeSplit.length; x++) {
            helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeCaret.replace('{value}', assetTreeSplit[x]))));
            helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
        }
        return assetTreeSplit[assetTreeSplit.length - 1].toString();
    };
    AssetExplorer.prototype.addAsset = function (infoAssetTree) {
        helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
        helper.waitAndClick(this.editAssetTreeBtn);
        var parentTree = this.openAssetTree(infoAssetTree.assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.addAssetChild.replace('{value}', parentTree))));
        this.waitForSpinner();
        helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(this.parentAsset.replace('{value}', parentTree))));
        helper.waitForVisible(this.assetNameTxt);
        helper.clearAndSendKeys(this.assetNameTxt, infoAssetTree.assetName);
        helper.clearAndSendKeys(this.assetDescriptiveNameTxt, infoAssetTree.assetName + casual.words(3));
        return true;
    };
    AssetExplorer.prototype.moveAssetUpAndDown = function (infoAssetTree) {
        helper.waitAndClick(this.editAssetTreeBtn);
        this.openAssetTree(infoAssetTree.assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.moveUpAsset.replace('{value}', infoAssetTree.assetName))));
        this.waitForSpinner();
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.moveDownAsset.replace('{value}', infoAssetTree.assetName))));
        this.waitForSpinner();
        return true;
    };
    AssetExplorer.prototype.copyAsset = function (infoAssetTree) {
        helper.waitAndClick(this.editAssetTreeBtn);
        this.openAssetTree(infoAssetTree.copyAssetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
        util.scrollToView(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
        helper.rightClickElement(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
        helper.waitAndClick(this.rightClickMenuCopyBtn);
        return true;
    };
    AssetExplorer.prototype.pasteAsset = function (infoAssetTree) {
        helper.waitAndClick(this.editAssetTreeBtn);
        var parentTree = this.openAssetTree(infoAssetTree.pasteAssetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        util.scrollToView(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        helper.rightClickElement(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        helper.waitAndClick(this.rightClickMenuPasteBtn);
        this.waitForSpinner();
        return true;
    };
    AssetExplorer.prototype.editAsset = function (assetTree, assetName, edittedAssetName) {
        helper.waitForDisappear(this.adhocTreeDisabled);
        helper.waitAndClick(this.editAssetTreeBtn);
        this.openAssetTree(assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', assetName))));
        helper.waitForDisappear(this.disabledAssetName);
        helper.clearAndSendKeys(this.assetNameTxt, edittedAssetName);
        helper.clearAndSendKeys(this.assetDescriptiveNameTxt, edittedAssetName + ' ' + casual.words(3));
        return true;
    };
    AssetExplorer.prototype.starFavoriteAttribute = function (infoAssetTree) {
        var _this = this;
        var x = 0;
        var parentTree = this.openAssetTree(infoAssetTree.assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        this.assetAttributeEntry.each(function () {
            _this.assetAttributeFavorite.get(x).click();
            x++;
        });
        return true;
    };
    AssetExplorer.prototype.addAssetTag = function (infoAssetTree) {
        var _this = this;
        var parentTree = this.openAssetTree(infoAssetTree.assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
        infoAssetTree.assetTag.forEach(function (value) {
            helper.clearAndSendKeys(_this.assetAttributeAddTagTextbox, value);
            _this.assetAttributeAddTagBtn.click();
            helper.waitForVisible(protractor_1.element(protractor_1.by.xpath(_this.assetAttributeAddTagSpan.replace('{value}', value))));
        });
        return true;
    };
    AssetExplorer.prototype.deleteAssetTag = function (infoAssetTree) {
        var _this = this;
        infoAssetTree.assetTag.forEach(function (value) {
            protractor_1.element(protractor_1.by.xpath(_this.assetAttributeDeleteTabBtn.replace('{value}', value))).click();
            helper.waitForDisappear(protractor_1.element(protractor_1.by.xpath(_this.assetAttributeAddTagSpan.replace('{value}', value))));
        });
        return true;
    };
    AssetExplorer.prototype.deleteAsset = function (infoAssetTree) {
        helper.waitAndClick(this.editAssetTreeBtn);
        helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
        this.openAssetTree(infoAssetTree.assetTree);
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.edittedAssetName))));
        helper.waitAndClick(protractor_1.element(protractor_1.by.xpath(this.deleteAssetBtn.replace('{value}', infoAssetTree.edittedAssetName))));
        protractor_1.browser.sleep(2000);
        protractor_1.browser.switchTo().alert().accept();
        protractor_1.browser.waitForAngular();
        return true;
    };
    AssetExplorer.prototype.saveAssetChecker = function (assetTree, assetName, edittedAssetName) {
        this.editAsset(assetTree, assetName, edittedAssetName);
        helper.waitAndClick(this.runModeBtn);
        helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
        return true;
    };
    return AssetExplorer;
}());
exports.AssetExplorer = AssetExplorer;
//# sourceMappingURL=assetExplorer.po.js.map