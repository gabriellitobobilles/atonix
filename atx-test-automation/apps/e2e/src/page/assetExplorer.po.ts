import { browser, by, $$, element, $, protractor, ElementFinder, utils } from 'protractor';
import { Utils } from '../helpers/utils';
import { IssueCreationData, AssetDetails, AssetAttributes, BlogEntry, Attachments, InfoAssetTree, SaveAndSaveAllAssets } from '../helpers/interface';
import { Helper } from '../helpers/helper';
import { assetNavigatorPane } from '../page/pages';
import * as casual from 'casual';
import { strict } from 'assert';
import { stringify } from '@angular/core/src/util';
import { calendarHelper } from '../helpers/extends/calendar-picker.helper';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
const util = new Utils();
const helper = new Helper();

const attributeValues = `div > [ng-repeat="(colRenderIndex, col) in ` +
  `colContainer.renderedColumns track by col.uid"] div.ui-grid-cell-contents`;

export class AssetExplorer {

  infoTab = $(`a[ng-click="vm.setTab('info')"]`);
  attachmentsTab = $(`a[ng-click="vm.setTab('attachments')"]`);
  blogTab = $(`a[ng-click="vm.setTab('blog')"]`);
  locationTab = $(`a[ng-click="vm.setTab('location')"]`);
  listsTab = $(`a[ng-click="vm.setTab('list')"]`);
  searchTab = $(`a[ng-click="vm.setTab('search')"]`);

  // Info Tab
  attributeRow = $$(`[ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index"]`);
  adhocTreeDisabled = $(`div[class="AdhocTree ng-isolate-scope isDisabled"]`);
  assetName = $(`#assetAbbrevId`);
  disabledAssetName = element(by.xpath('//input[@id="assetAbbrevId"] [@disabled="disabled"]'));
  public appTitle = $('.appTitle');
  editAssetTreeBtn = $(`button[title="Edit Tree"]`);
  createNewTreeBtn = $(`button[title="Create New Tree"]`);
  assetTreeCaret = '//span[contains(text(), "{value}")]/../preceding-sibling::span';
  // Info Tab - Asset Tree buttons
  assetTreeEntry = '//div[@id="paneWestContainer"]//span[contains(text(), "{value}")]/..';
  runModeBtn = $(`button[title="Run Mode"]`);
  parentAsset = '//label[contains(text(), "Parent:")]/following-sibling::span[contains(text(), "{value}")]';
  addAssetChild = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Add Child"]';
  moveUpAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Move Up"]';
  moveDownAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Move Down"]';
  deleteAssetBtn = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Delete"]';

  createSecurityRoleAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Create Security Role"]';
  configurationToolsAsset = '//span[contains(text(), "{value}")]/parent::a/following-sibling::div/i[@title="Configuration Tools"]';
  // Info Tab - Right click asset entry buttons
  rightClickMenuAddChildBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Add Child")]'));
  rightClickMenuMoveUpBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Move Up")]'));
  rightClickMenuMoveDownBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Move Down")]'));
  rightClickMenuDownloadBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Download")]'));
  rightClickMenuDeleteBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Delete")]'));
  rightClickMenuCopyBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Copy")]'));
  rightClickMenuPasteBtn = element(by.xpath('//div[@class="treeMenu"]/button[contains(text(), "Paste")]'));

  assetNameTxt = $(`#assetAbbrevId`);
  assetDescriptiveNameTxt = $(`[ng-model="vm.selectedAsset.asset.AssetDesc"]`);
  setAssetClassTypeBtn = $(`[title="Set Asset Class Type"]`);


  undoBtn = element(by.xpath('//a[contains(text(), "Undo")]'));
  undoBtnDisabled = element(by.xpath('//a[contains(text(), "Undo")] [@disabled="disabled"]'));
  saveAssetBtn = element(by.xpath('//a[contains(text(), "Save Asset")]'));
  saveAssetBtnDisabled = element(by.xpath('//a[contains(text(), "Save Asset")] [@disabled="disabled"]'));
  saveAllAssetsBtn = element(by.xpath('//a[contains(text(), "Save All Assets")]'));
  saveAllAssetsBtnDisabled = element(by.xpath('//a[contains(text(), "Save All Assets")] [@disabled="disabled"]'));

  changedAssetIndicator = $(`[class= "changedAssetTreeNode"]`);
  changedAssetIndicatorAssetName = '//span[contains(text(), "{value}")]/../../div[@class="changedAssetTreeNode"]';

  toastMessage = $(`.toast-message`);

  assetSearchBar = $(`[placeholder=Search]`);
  assetSearchBarSuggestions = $(`[ng-attr-title='{{match.label}}']`);
  assetNameHeader = $(`h1[class="ng-binding"]`);
  addAttributeBar = $(`[name="newAttribute"]`);


  addAttributeButton = $(`[ng-click="infoVM.addAttribute(infoVM.newAttributeType)"]`);
  editAttributeButton = '//div[@title = "{value}"]/ancestor::div[@class="ui-grid-row ng-scope"]//i[@title="Edit"]';

  setAttributeValueModal = $(`[class="modal-dialog "]`);
  setAttributeValueModalHeader = $(`[id="modal-title"]`);
  setDetailsCaret = element(by.xpath('//div[contains(text(), "Set Details")]/i'));
  attributeValueTypeDropdown = $(`[id= "attributeType"]`);
  attributeValueTypeDropdownOptions = $(`[id="attributeType"] > option`);
  freeformTextAVT = $(`option[label="Freeform Text"]`);
  floatAVT = $(`option[label="Float"]`);
  integerAVT = $(`option[label="Integer"]`);
  discreteListAVT = $(`option[label="Discrete List"]`);
  booleanAVT = $(`option[label="Boolean"]`);
  dateAVT = $(`option[label="Date"]`);

  assetAttributeEntry = $$(`div[class="ui-grid-row ng-scope"]`);
  assetAttributeFavorite = $$(`div[class="ui-grid-row ng-scope"] i[title="Favorite"]`);
  assetAttributeAddTagTextbox = $(`div [id= "SectionTags"] input[id="addTag"]`);
  assetAttributeAddTagBtn = element(by.xpath('//div[@id="SectionTags"]//button[contains(text(), "Add Tag")]'));
  assetAttributeDeleteTabBtn = '//div[@id="SectionTags"]//span[contains(text(), "{value}")]/preceding-sibling::a[@title="Delete Tag"]';
  assetAttributeAddTagSpan = '//div[@id="SectionTags"]//span[contains(text(), "{value}")]';
  assetAttributeValueTextBar = $(`#attributeValueText`);
  assetAttributeValueIntegerBar = $(`#attributeValueInt`);
  assetAttributeValueFloatBar = $(`#attributeValueFloat`);
  assetAttributeValueBooleanCheckbox = element(by.xpath('//input[@id="attributeValueBoolean"]/..'));
  assetAttributeValueBooleanTrue = '//div[@title="{value}"]/ancestor::div[@class="' +
    'ui-grid-row ng-scope"]//i[@class = "fa fa-check-square"]';
  assetAttributeValueBooleanFalse = '//div[@title="{value}"]/ancestor::div[@class="' +
    'ui-grid-row ng-scope"]//i[@class = "fa fa-square-o"]';
  attbooleanChecker = '//div[@title="{value}"]/ancestor::div[@class=' +
    '"ui-grid-row ng-scope"]//div[@ng-switch-when="boolean"]';
  assetAttributeValueEditTrue = $(`[class="ng-pristine ng-untouched ng-valid ng-not-empty"]`);
  assetAttributeValueEditFalse = $(`[class="ng-pristine ng-untouched ng-valid ng-empty"]`);
  assetAttributeValueDiscreteListOptionsBar = $(`#attributeOptions`);
  assetAttributeValueDiscreteListDropdown = $(`#attributeValueList`);
  assetAttributeValueDateBar = $(`input[ng-model="dpController.internalDate"]`);
  assetAttributeValueTimeBar = $(`input[ng-model="dpController.internalTime"]`);
  calendarButton = $(`div[type="button"] i[class="fa fa-calendar"]`);

  discreteListValidateButton = $(`#validateButton`);
  discreteListValidateWarning = $(`div[ng-hide = "attributeVM.canOK"]`);
  setAttributeValueModalOkBtn = $(`[ng-click="attributeVM.ok()"]`);
  setAttributeValueModalCancelBtn = $(`[ng-click="attributeVM.cancel()"]`);

  // Blog Tab
  blogContentSearchBar = $(`div[id="blogContentSearch"] input`);
  blogContentSearchBtn = element(by.xpath('//div[@id="blogContentSearch"]/button[contains(text(), "Search")]'));
  blogContentResetBtn = element(by.xpath('//div[@id="blogContentSearch"]/button[contains(text(), "Reset")]'));
  showAutoGeneratedEntriesCheckbox = $(`input[ng-model="discussionVM.showAutogenEntries"]`);
  addNewEntryHeader = $(`div[name="newBlogEntryForm"]`);
  blogEntryPanel = $(`div[class="panel ng-scope"]`);
  blogEntryHeaderTitle = '//div/b[contains(text(), "{value}")]';
  blogEntryEditBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel-heading clearfix"]//i[@title="Edit Entry"]/..';
  blogEntryDeleteBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel-heading clearfix"]//i[@title="Delete Entry"]/..';

  addBlogPanel = $(`div[class="panel-body issueTextEditor in collapse"]`);
  addBlogTitle = $(`#title`);
  addBlogBodyFrame = $(`div[name= "newBlogEntryForm"] iframe`);
  addBlogBodyTextarea = $(`body[class="mce-content-body "]`);
  addBlogUploadFile = $(`div[name="newBlogEntryForm"] input[id="fileInput"]`);
  fileToUpload = 'D:/atx-test-automation/apps/e2e/src/test_Data/{value}';
  addBlogSuccessfulUploadFile = '//div[@name="newBlogEntryForm"]//a[contains(text(), "{value}")]';
  addBlogTagsTextbox = $(`div[name="newBlogEntryForm"] input[id="addTag"]`);
  addBlogAddTagBtn = element(by.xpath('//div[@name="newBlogEntryForm"]//button[contains(text(), "Add Tag")]'));
  addBlogTagsCreatedSpan = '//div[@name="newBlogEntryForm"]//span[contains(text(), "{value}")]';
  addBlogCancelBtn = $(`input[name="Cancel"]`);
  addBlogSubmitBtn = $(`input[name="Submit"]`);

  editBlogPanel = $(`div[class="panel-body issueTextEditor form ng-scope"]`);
  editBlogBodyDiv = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]/div[@ng-if="entry.editing"]';
  editBlogTitle = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//input[@name="title"]';
  editBlogBodyFrame = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//iframe';
  editBlogBodyTextarea = $(`body[class="mce-content-body "]`);
  editBlogUploadFile = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]' +
    '//input[@class="file-upload-box form-control"]';
  editBlogSuccessfulUploadFile = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//a[contains(text(), "{value2}")]';
  editBlogTagsTextbox = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//input[@id="addTag"]';
  editBlogAddTagBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Add Tag")]';
  editBlogTagsCreatedSpan = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//span[contains(text(), "{value2}")]';
  editBlogCancelBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Cancel")]';
  editBlogSaveBtn = '//b[contains(text(), "{value}")]/ancestor::div[@class="panel ng-scope"]//button[contains(text(), "Save")]';

  // Attachments tab
  addPhotoVideoBtn = element(by.xpath('//button[contains(text(), "Add Photo / Video")]'));
  addAttachmentBtn = element(by.xpath('//button[contains(text(), "Add Attachment")]'));
  addAttachmentModal = element(by.xpath('//h3[contains(text(), "Add Attachment")]/ancestor::div[@class= "modal-content"]'));
  addAttachmentFileUpload = $(`[type="file"]`);
  attachmentCaptionTextbox = element(by.xpath('//label[contains(text(), "Caption:")]/following-sibling::input'));
  addTagTextbox = $(`input[id="addTag"]`);
  addTagBtn = element(by.xpath('//button[contains(text(), "Add Tag")]'));
  addTagSpan = '//span[contains(text(), "{value}")]';
  okModalBtn = $(`[ng-click="addAttachmentVM.ok()"]`);
  cancelModalBtn = $(`[ng-click="addAttachmentVM.cancel()"]`);

  photoOrVideoTitle = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]';
  photoOrVideofavoriteBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/i';
  photoOrVideoEditBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/..//i[@title="Edit"]';
  photoOrVideoDeleteBtn = '//div[@class="photoCaption ng-binding" and contains(., "{value}")]/..//i[@title="Delete Photo"]';

  attachmentFilesTitle = '//div[@class="ui-grid-canvas"]//a[contains(text(), "{value}")]';
  attachmentFilesFavoriteBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
    '//i[@title="Set as a Favorite"]';
  attachmentFilesEditBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
    '//i[@title="Edit"]';
  attachmentFilesDeleteBtn = '//a[contains(text(), "{value}")]/ancestor::div[@class="ui-grid-row ng-scope ui-grid-tree-header-row"]' +
    '//i[@title="Delete"]';


  getAttributeDetailsByName(attributeName: string) {
    return this.attributeRow.filter((attrRow) => {
      return attrRow.$$(attributeValues)
        .get(2).getText().then((text) => {
          return text.includes(attributeName);
        });
    }).first().$$(attributeValues);
  }

  addNewAsset(assetToNatigateObj, assetToCreate: AssetDetails) {
    assetNavigatorPane.editPhysicalTree();
    assetNavigatorPane.selectAssetInTree(assetToNatigateObj);
    assetNavigatorPane.addChild();
    this.inputAssetDetails(assetToCreate);
  }

  inputAssetDetails(assetToCreate: AssetDetails) {
    this.assetNameTxt.click();
    helper.clearAndSendKeys(this.assetNameTxt, assetToCreate.name);
    this.assetNameTxt.click();
    helper.clearAndSendKeys(this.assetDescriptiveNameTxt, assetToCreate.descriptiveName);
    // ? modify asset type
    // add attributes
  }

  saveAssetFn() {
    this.saveAssetBtn.click();
    this.waitForSpinner();
  }

  waitForSpinner() {
    helper.waitForVisible(assetNavigatorPane.spinner);
    helper.waitForDisappear(assetNavigatorPane.spinner, 100000);
  }
  waitForToastMessage() {
    helper.waitForVisibleAndDisappear(this.toastMessage);
  }

  getToastMessage() {
    helper.waitForVisible(this.toastMessage);
    return this.toastMessage.getText();
  }

  async afterEditVerification() {
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
    return true;
  }

  clickRunModeAndVerify() {
    helper.waitAndClick(this.runModeBtn);
    helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
    return true;
  }

  searchAsset(assetName: string) {
    helper.clearAndSendKeys(this.assetSearchBar, assetName);
    helper.waitForVisible(this.assetSearchBarSuggestions, 500000);
    helper.clickAndWaitForVisible(this.assetSearchBarSuggestions, this.addAttributeBar);
    helper.waitForVisible(this.addAttributeBar);
    browser.sleep(3000);
  }

  attributeLocator(assetAttributes: AssetAttributes) {
    const attData = $(`div[title="${assetAttributes.value}"]`);
    helper.waitForVisible(attData);
    return true;
  }

  invalidAttributeValueLocator(assetAttributes: AssetAttributes) {
    switch (assetAttributes.attributeType) {
      case 0: break;
      case 1: // Imvalid Integer
        const invalidIntData = assetAttributes.invalid_value.toString().split('.', 1); // exclude decimal points
        const invalidIntData2 = invalidIntData.toString().replace(/\D+/g, ''); // remove letters
        const invalidIntElem = element(by.xpath('//div[@title="{value}"]'.replace('{value}', invalidIntData2)));
        helper.waitForVisible(invalidIntElem);
        return true;
      case 2: // Invalid Float
        const invalidFloatData = assetAttributes.invalid_value.toString().replace(/\D+/g, ''); // remove letters
        const invalidFloatData2 = invalidFloatData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
        const invalidFLoatElem = element(by.xpath('//div[@title="{value}"]'.replace('{value}', invalidFloatData2 + '.0')));
        helper.waitForVisible(invalidFLoatElem);
        return true;
      case 3: // Invalid Discrete List
        const attData = $(`div[title="${assetAttributes.invalid_value}"]`);
        helper.waitForVisible(attData);
        return true;
      case 4: this.booleanAVT.click(); break;
      case 5: // Invalid Date
        const attDateData = $(`div[title="${assetAttributes.invalid_value}"]`);
        helper.waitForDisappear(attDateData);
        return true;
    }
  }

  addAttribute(assetAttributes: AssetAttributes) {
    helper.clearAndSendKeys(this.addAttributeBar, assetAttributes.name);
    helper.clickAndWaitForVisible(this.addAttributeButton, this.setAttributeValueModal); browser.sleep(1000);
    helper.clickAndWaitForVisible(this.setDetailsCaret, this.attributeValueTypeDropdown);
    helper.clickAndWaitForVisible(this.attributeValueTypeDropdown, this.attributeValueTypeDropdownOptions);
    switch (assetAttributes.attributeType) {
      case 0: // Add Freeform Text
        this.freeformTextAVT.click();
        helper.clearAndSendKeys(this.assetAttributeValueTextBar, assetAttributes.value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataFreeText = element(by.xpath('//div[@title = "' + assetAttributes.value.toString() + '"]'));
        helper.waitForVisible(attTrueDataFreeText);
        return true;
      case 1: // Add Integer
        this.integerAVT.click();
        helper.clearAndSendKeys(this.assetAttributeValueIntegerBar, assetAttributes.value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataInt = element(by.xpath('//div[@title = "' + assetAttributes.value.toString() + '"]'));
        helper.waitForVisible(attTrueDataInt);
        return true;
      case 2: // Add Float
        this.floatAVT.click();
        helper.clearAndSendKeys(this.assetAttributeValueFloatBar, assetAttributes.value.toString());
        this.setAttributeValueModalOkBtn.click();
        const assetAttValueFloat = assetAttributes.value.toString();
        const assetAttValueFloatStringed = assetAttValueFloat.substring(0,
          assetAttValueFloat.indexOf('.') + 2);
        const attTrueDataFloat = element(by.xpath('//div[@title="' + assetAttValueFloatStringed + '"]'));
        helper.waitForVisible(attTrueDataFloat);
        return true;
      case 3: // Add Discrete list
        this.discreteListAVT.click();
        helper.clearAndSendKeys(this.assetAttributeValueDiscreteListOptionsBar,
          assetAttributes.value.toString() + ';'
          + assetAttributes.value2.toString() + ';'
          + assetAttributes.value3.toString());
        this.assetAttributeValueDiscreteListDropdown.click();
        const assetAttributeValueDiscreteListDropdownOptions = element(by.xpath('//option[@label="{value}"]'
          .replace('{value}', assetAttributes.value2.toString())));
        assetAttributeValueDiscreteListDropdownOptions.click();
        this.setAttributeValueModalOkBtn.click();
        const attTrueDataDiscreteList = element(by.xpath('//div[@title="' +
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
          helper.waitForVisible(element(by.xpath(this.assetAttributeValueBooleanTrue
            .replace('{value}', assetAttributes.name))));
          return true;
        } else {
          this.setAttributeValueModalOkBtn.click();
          helper.waitForDisappear(this.setAttributeValueModal);
          helper.waitForVisible(element(by.xpath(this.assetAttributeValueBooleanFalse
            .replace('{value}', assetAttributes.name))));
          return true;
        }
      case 5: // Add Date
        this.dateAVT.click();
        this.calendarButton.click();
        calendarHelper.selectCalendarMonthYear(assetAttributes.dateValue);
        helper.waitForVisible(this.assetAttributeValueTimeBar);
        helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.value2.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataDate = element(by.xpath('//div[@title="' +
          assetAttributes.name + '"]'));
        helper.waitForVisible(attTrueDataDate);
        return true;
    }
  }

  addInvalidAttribute(assetAttributes: AssetAttributes) {
    helper.clearAndSendKeys(this.addAttributeBar, assetAttributes.name);
    helper.clickAndWaitForVisible(this.addAttributeButton, this.setAttributeValueModal); browser.sleep(1000);
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
        const assetAttributeValueDiscreteListDropdownOptions = element(by.xpath('//option[@label="{value}"]'
          .replace('{value}', assetAttributes.invalid_value.toString())));
        assetAttributeValueDiscreteListDropdownOptions.click();
        break;
      case 4: this.booleanAVT.click(); break;
      case 5: // Add Invalid Date
        this.dateAVT.click();
        helper.waitForVisible(this.assetAttributeValueDateBar);
        helper.clearAndSendKeys(this.assetAttributeValueDateBar, assetAttributes.invalid_value.toString());
        helper.waitForVisible(this.assetAttributeValueTimeBar);
        helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.invalid_value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataDate = element(by.xpath('//div[@title="' +
          assetAttributes.name + '"]'));
        helper.waitForVisible(attTrueDataDate);
        return true;
    }
    this.setAttributeValueModalOkBtn.click();
    helper.waitForDisappear(this.setAttributeValueModal);
  }

  editAttribute(assetAttributes: AssetAttributes) {
    switch (assetAttributes.attributeType) {
      case 0: // Freeform Text
        const editAttFreeTextButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
          .replace('{value}', assetAttributes.value.toString()) +
          '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
        helper.clickAndWaitForVisible(editAttFreeTextButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        helper.clearAndSendKeys(this.assetAttributeValueTextBar, assetAttributes.editted_value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataFreeText = element(by.xpath('//div[@title = "' +
          assetAttributes.editted_value.toString() + '"]'));
        helper.waitForVisible(attTrueDataFreeText);
        return true;
      case 1: // Integer
        const editAttIntButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
          .replace('{value}', assetAttributes.value.toString()) +
          '"ui-grid-row ng-scope"]//i[@title="Edit"]'));
        helper.clickAndWaitForVisible(editAttIntButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        helper.clearAndSendKeys(this.assetAttributeValueIntegerBar, assetAttributes.editted_value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataInt = element(by.xpath('//div[@title = "' +
          assetAttributes.editted_value.toString() + '"]'));
        helper.waitForVisible(attTrueDataInt);
        return true;
      case 2: // Float
        const assetAttValueFloatEdit = parseFloat(assetAttributes.value.toString());
        const assetAttValueFloatEditFixed = assetAttValueFloatEdit.toFixed(1).toString();
        const assetAttValueFloatEditStringed = assetAttValueFloatEditFixed
          .substring(0, assetAttValueFloatEditFixed
            .indexOf('.') + 2);
        const editAttFloatButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
          .replace('{value}', assetAttValueFloatEditStringed)
          + '"ui-grid-row ng-scope"]//i[@title="Edit"]'
        ));
        helper.clickAndWaitForVisible(editAttFloatButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        helper.clearAndSendKeys(this.assetAttributeValueFloatBar, assetAttributes.editted_value.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        // const assetAttValueFloatEditted = assetAttributes.editted_value.toString();
        const assetAttValueFloatEditted = parseFloat(assetAttributes.editted_value.toString());
        const assetAttValueFloatEditedFixed = assetAttValueFloatEditted.toFixed(1).toString();
        const assetAttValueFloatEdittedStringed = assetAttValueFloatEditedFixed
          .substring(0, assetAttValueFloatEditedFixed
            .indexOf('.') + 2);
        const attTrueDataFloat = element(by.xpath('//div[@title="' + assetAttValueFloatEdittedStringed + '"]'));
        helper.waitForVisible(attTrueDataFloat);
        return true;
      case 3: // Discrete List
        const editAttDiscreteListButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
          .replace('{value}', assetAttributes.value2.toString()) +
          '"ui-grid-row ng-scope"]//i[@title="Edit"]'
        ));
        helper.clickAndWaitForVisible(editAttDiscreteListButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret, 50000);
        // this.setDetailsCaret.click();
        helper.clearAndSendKeys(this.assetAttributeValueDiscreteListOptionsBar,
          assetAttributes.value.toString() + ';'
          + assetAttributes.value2.toString() + ';'
          + assetAttributes.editted_value.toString()
        );
        helper.waitForVisible(this.discreteListValidateWarning);
        this.discreteListValidateButton.click();
        helper.waitForDisappear(this.discreteListValidateWarning);
        this.assetAttributeValueDiscreteListDropdown.click();
        const assetAttributeValueDiscreteListDropdownOptions = element(by.xpath('//option[@label="{value}"]'
          .replace('{value}', assetAttributes.editted_value.toString())));
        assetAttributeValueDiscreteListDropdownOptions.click();
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataDiscreteList = $(`div[title="${assetAttributes.editted_value}"]`);
        helper.waitForVisible(attTrueDataDiscreteList);
        return true;
      case 4: // Edit Boolean
        const editAttTrueButton = element(by.xpath(this.editAttributeButton
          .replace('{value}', assetAttributes.name.toString())));
        helper.clickAndWaitForVisible(editAttTrueButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        helper.waitForVisible(this.assetAttributeValueBooleanCheckbox);
        helper.waitForElementClickable(this.assetAttributeValueBooleanCheckbox);
        helper.waitAndClick(this.assetAttributeValueBooleanCheckbox);
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        helper.waitForVisible(element(by.xpath(this.attbooleanChecker
          .replace('{value}', assetAttributes.name.toString()))));
        return true;
      case 5: // Edit Date
        const editAttDateButton = element(by.xpath(this.editAttributeButton
          .replace('{value}', assetAttributes.name)));
        helper.clickAndWaitForVisible(editAttDateButton, this.setAttributeValueModal); browser.sleep(1000);
        helper.waitAndClick(this.setDetailsCaret);
        this.calendarButton.click();
        calendarHelper.selectCalendarMonthYear(assetAttributes.editted_dateValue);
        helper.waitForVisible(this.assetAttributeValueTimeBar);
        helper.clearAndSendKeys(this.assetAttributeValueTimeBar, assetAttributes.editted_value2.toString());
        this.setAttributeValueModalOkBtn.click();
        helper.waitForDisappear(this.setAttributeValueModal);
        const attTrueDataDate = element(by.xpath('//div[@title="' +
          assetAttributes.name + '"]'));
        helper.waitForVisible(attTrueDataDate);
        return true;
    }
  }

  deleteAttribute(assetAttributes: AssetAttributes) {
    if (assetAttributes.attributeType === 2) { // Float
      const assetAttValueFloatDelete = parseFloat(assetAttributes.editted_value.toString());
      const assetAttValueFloatDeleteFixed = assetAttValueFloatDelete.toFixed(1);
      const assetAttValueFloatDeleteStringed = assetAttValueFloatDeleteFixed
        .substring(0, assetAttValueFloatDeleteFixed
          .indexOf('.') + 2);
      const deleteAttFloatButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= '
        .replace('{value}', assetAttValueFloatDeleteStringed) +
        '"ui-grid-row ng-scope"]//i[@title="Delete"]'
      ));
      deleteAttFloatButton.click();
      const attTrueDataDeleted = element(by.xpath('//div[@title="' + assetAttValueFloatDeleteStringed + '"]'));
      helper.waitForDisappear(attTrueDataDeleted);
      return true;
    } if (assetAttributes.attributeType === 4 || assetAttributes.attributeType === 5) {
      const deleteAttButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "ui-grid-row ng-scope"]//i[@title="Delete"]'
        .replace('{value}', assetAttributes.name)));
      deleteAttButton.click();
      const attTrueDataDeleted = element(by.xpath('//div[@title="' + assetAttributes.name + '"]'));
      helper.waitForDisappear(attTrueDataDeleted);
      return true;
    } else {
      const deleteAttButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "ui-grid-row ng-scope"]//i[@title="Delete"]'
        .replace('{value}', assetAttributes.editted_value.toString())));
      deleteAttButton.click();
      const attTrueDataDeleted = element(by.xpath('//div[@title="' + assetAttributes.editted_value + '"]'));
      helper.waitForDisappear(attTrueDataDeleted);
      return true;
    }
  }

  deleteInvalidAttribute(assetAttributes: AssetAttributes) {
    switch (assetAttributes.attributeType) {
      case 0: break;

      case 1: // Delete Invalid Integer
        const invalidIntData = assetAttributes.invalid_value.toString().split('.', 1);
        const invalidIntData2 = invalidIntData.toString().replace(/\D+/g, '');
        const deleteInvalidIntElem = element(by.xpath('//div[@title = "{title}"]/ancestor::div[@class= "'
          .replace('{title}', invalidIntData2)
          + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
        deleteInvalidIntElem.click();
        const attTrueDataIntDeleted = element(by.xpath('//div[@title="' + invalidIntData2 + '"]'));
        helper.waitForDisappear(attTrueDataIntDeleted);
        return true;
      case 2: // Delete Invalid Float
        const invalidFloatData = assetAttributes.invalid_value.toString().replace(/\D+/g, ''); // remove letters
        const invalidFloatData2 = invalidFloatData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
        const deleteinvalidFLoatElem = element(by.xpath('//div[@title = "{title}"]/ancestor::div[@class= "'
          .replace('{title}', invalidFloatData2 + '.0')
          + 'ui-grid-row ng-scope"]//i[@title="Delete"]'));
        deleteinvalidFLoatElem.click();
        const attTrueDataFloatDeleted = element(by.xpath('//div[@title="' + invalidFloatData2 + '"]'));
        helper.waitForDisappear(attTrueDataFloatDeleted);
        return true;
      case 3: // Delete Invalid Discrete List
        const deleteAttButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "'
          .replace('{value}', assetAttributes.invalid_value.toString())
          + 'ui-grid-row ng-scope"]//i[@title="Delete"]'
        ));
        deleteAttButton.click();
        const attTrueDataDiscreteDeleted = element(by.xpath('//div[@title="' + assetAttributes.invalid_value + '"]'));
        helper.waitForDisappear(attTrueDataDiscreteDeleted);
        return true;
      case 4: this.booleanAVT.click(); break;
      case 5: const deleteAttDateButton = element(by.xpath('//div[@title = "{value}"]/ancestor::div[@class= "'
        .replace('{value}', assetAttributes.name)
        + 'ui-grid-row ng-scope"]//i[@title="Delete"]'
      ));
        deleteAttDateButton.click();
        const attTrueDateDeleted = element(by.xpath('//div[@title="' + assetAttributes.name + '"]'));
        helper.waitForDisappear(attTrueDateDeleted);
        return true;
    }
  }

  async getAttributesValueColumn(attributeName: string) {
    const col = await this.getColumnID();
    const rowList = $$(`[role="rowgroup"] .ui-grid-row`);

    // return rowList.map((elem, index) => {
    //   return elem.$$(`[role="gridcell"]`).get(col.indexOf(attributeName)).getText();
    // });
    const attributes = rowList.map((elem, index) => {
      return elem.$$(`[role="gridcell"]`).get(col.indexOf(attributeName)).getText();
    });

    const values = rowList.map((elem, index) => {
      return elem.$$(`[role="gridcell"]`).get(col.indexOf(`Value`)).getText();
    });

    return { attributes: await attributes, values: await values };
  }

  private async getColumnID() {
    const columnHeaderContainer = `span.ui-grid-header-cell-label`;
    const headerType = $$(`.myGrid.attributesList [ng-repeat="col in colContainer.renderedColumns track by col.uid"]`);

    const returnVal = await headerType.$$(columnHeaderContainer).map(p => {
      return p.getText();
    });
    return returnVal;
  }

  addBlogEntry(blogEntry: BlogEntry) {
    helper.waitAndClick(this.addNewEntryHeader);
    helper.waitForVisible(this.addBlogPanel);
    helper.clearAndSendKeys(this.addBlogTitle, blogEntry.title);
    this.addBlogBodyFrame.click();
    util.switchToIframe(this.addBlogBodyFrame);
    helper.clearAndSendKeys(this.addBlogBodyTextarea, blogEntry.body);
    // helper.waitForVisible(this.addBlogUploadFile);
    util.switchToMainFrame();
    util.fileUpload(this.addBlogUploadFile, this.fileToUpload.replace('{value}', blogEntry.file));
    const successfulFileUpload = element(by.xpath(this.addBlogSuccessfulUploadFile.replace('{value}', blogEntry.file)));
    helper.waitForVisible(successfulFileUpload, 900000);
    blogEntry.tags.forEach((value) => {
      helper.clearAndSendKeys(this.addBlogTagsTextbox, value);
      const tagsSpan = element(by.xpath(this.addBlogTagsCreatedSpan.replace('{value}', value)));
      helper.clickAndWaitForVisible(this.addBlogAddTagBtn, tagsSpan);
    });
    helper.waitAndClick(this.addBlogSubmitBtn);
    const blogEntryHeaderTitle = element(by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.title)));
    helper.waitForVisible(blogEntryHeaderTitle);
    browser.sleep(3000);
    return true;
  }

  viewBlogEntry(blogEntry: BlogEntry) {
    const blogEntryHeaderTitle = element(by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.title)));
    helper.waitForVisible(blogEntryHeaderTitle);
    return true;
  }

  editBlogEntry(blogEntry: BlogEntry) {
    const defaultTitle = 'Blog Entry';
    helper.waitForElementClickable(element(by.xpath(this.blogEntryEditBtn.replace('{value}', blogEntry.title))));
    helper.waitAndClick(element(by.xpath(this.blogEntryEditBtn.replace('{value}', blogEntry.title))));
    helper.waitForVisible(this.editBlogPanel);
    element(by.xpath(this.editBlogTitle.replace('{value}', blogEntry.title))).clear();
    element(by.xpath(this.editBlogTitle.replace('{value}', defaultTitle))).sendKeys(blogEntry.edittedTitle);
    element(by.xpath(this.editBlogBodyFrame.replace('{value}', blogEntry.edittedTitle))).click();
    util.switchToIframe(element(by.xpath(this.editBlogBodyFrame.replace('{value}', blogEntry.edittedTitle))));
    helper.clearAndSendKeys(this.editBlogBodyTextarea, blogEntry.edittedBody);
    util.switchToMainFrame();
    util.fileUpload(element(by.xpath(this.editBlogUploadFile.replace('{value}', blogEntry.edittedTitle))), this.fileToUpload
      .replace('{value}', blogEntry.edittedFile));
    const successfullFileUpload = element(by.xpath(this.editBlogSuccessfulUploadFile
      .replace('{value}', blogEntry.edittedTitle)
      .replace('{value2}', blogEntry.edittedFile)));
    helper.waitForVisible(successfullFileUpload, 100000);
    util.scrollToView(element(by.xpath(this.editBlogTagsTextbox.replace('{value}', blogEntry.edittedTitle))));
    blogEntry.edittedTags.forEach((value) => {
      helper.clearAndSendKeys(element(by.xpath(this.editBlogTagsTextbox.replace('{value}', blogEntry.edittedTitle))), value);
      const tagsSpan = element(by.xpath(this.editBlogTagsCreatedSpan
        .replace('{value}', blogEntry.edittedTitle)
        .replace('{value2}', value)));
      helper.clickAndWaitForVisible(element(by.xpath(this.editBlogAddTagBtn
        .replace('{value}', blogEntry.edittedTitle))), tagsSpan);
    });
    element(by.xpath(this.editBlogSaveBtn.replace('{value}', blogEntry.edittedTitle))).click();
    const editBlogBody = element(by.xpath(this.editBlogBodyDiv.replace('{value}', blogEntry.edittedTitle)));
    helper.waitForDisappear(editBlogBody);
    const edittedBlogEntryHeaderTitle = element(by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.edittedTitle)));
    helper.waitForVisible(edittedBlogEntryHeaderTitle);
    browser.sleep(3000);
    return true;
  }

  deleteBlogEntry(blogEntry: BlogEntry) {
    helper.waitForElementClickable(element(by.xpath(this.blogEntryDeleteBtn.replace('{value}', blogEntry.edittedTitle))));
    helper.waitAndClick(element(by.xpath(this.blogEntryDeleteBtn.replace('{value}', blogEntry.edittedTitle))));
    browser.sleep(2000);
    browser.switchTo().alert().accept();
    browser.waitForAngular();
    const deletedBlogEntryHeaderTitle = element(by.xpath(this.blogEntryHeaderTitle.replace('{value}', blogEntry.edittedTitle)));
    helper.waitForDisappear(deletedBlogEntryHeaderTitle);
    return true;
  }

  addPhotoVideo(attachments: Attachments) {
    attachments.imageOrVideoFile.forEach((value) => {
      helper.waitForVisible(this.addPhotoVideoBtn);
      helper.waitAndClick(this.addPhotoVideoBtn);
      helper.waitForVisible(this.addAttachmentModal);
      util.fileUpload(this.addAttachmentFileUpload,
        this.fileToUpload.replace('{value}', value));
      browser.sleep(1000);
      helper.waitAndClick(this.okModalBtn);
      helper.waitForDisappear(this.addAttachmentModal, 900000);
      helper.waitForVisible(element(by.xpath(this.photoOrVideoTitle.replace('{value}', value))));
      browser.sleep(1000);
    });
    return true;
  }

  starFavoritePhotoVideo(attachments: Attachments) {
    attachments.imageOrVideoFile.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.photoOrVideofavoriteBtn.replace('{value}', value))));
      browser.sleep(2000);
    });
    return true;
  }

  editPhotoVideo(attachments: Attachments) {
    let x = 0;
    attachments.imageOrVideoFile.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.photoOrVideoEditBtn.replace('{value}', value))));
      helper.waitForVisible(this.addAttachmentModal);
      helper.clearAndSendKeys(this.attachmentCaptionTextbox, attachments.imageOrVideoCaption[x]);
      browser.sleep(2000);
      helper.clearAndSendKeys(this.addTagTextbox, attachments.tags);
      helper.clickAndWaitForVisible(this.addTagBtn, element(by.xpath(this.addTagSpan.replace('{value}', attachments.tags))));
      helper.waitAndClick(this.okModalBtn);
      helper.waitForDisappear(this.addAttachmentModal);
      helper.waitForVisible(element(by.xpath(this.photoOrVideoTitle.replace('{value}', attachments.imageOrVideoCaption[x]))));
      x++;
      browser.sleep(1000);
    });
    return true;
  }

  deletePhotoVideo(attachments: Attachments) {
    attachments.imageOrVideoFile.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.photoOrVideoDeleteBtn.replace('{value}', value))));
      helper.waitForDisappear(element(by.xpath(this.photoOrVideoTitle.replace('{value}', value))));
    });
    return true;
  }

  addAttachmentFiles(attachments: Attachments) {
    attachments.attachmentFiles.forEach((value) => {
      helper.waitForVisible(this.addAttachmentBtn);
      helper.waitAndClick(this.addAttachmentBtn);
      helper.waitForVisible(this.addAttachmentModal);
      util.fileUpload(this.addAttachmentFileUpload,
        this.fileToUpload.replace('{value}', value));
      browser.sleep(1000);
      helper.waitAndClick(this.okModalBtn);
      helper.waitForDisappear(this.addAttachmentModal, 900000);
      helper.waitForVisible(element(by.xpath(this.attachmentFilesTitle.replace('{value}', value))));
      browser.sleep(1000);
    });
    return true;
  }

  starFavoriteAttachmentFiles(attachments: Attachments) {
    attachments.attachmentFiles.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.attachmentFilesFavoriteBtn.replace('{value}', value))));
      browser.sleep(2000);
    });
    return true;
  }

  editAttachmentFiles(attachments: Attachments) {
    let x = 0;
    attachments.attachmentFiles.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.attachmentFilesEditBtn.replace('{value}', value))));
      helper.waitForVisible(this.addAttachmentModal);
      helper.clearAndSendKeys(this.attachmentCaptionTextbox, attachments.attachmentFilesCaption[x]);
      browser.sleep(2000);
      helper.clearAndSendKeys(this.addTagTextbox, attachments.tags);
      helper.clickAndWaitForVisible(this.addTagBtn, element(by.xpath(this.addTagSpan.replace('{value}', attachments.tags))));
      helper.waitAndClick(this.okModalBtn);
      helper.waitForDisappear(this.addAttachmentModal);
      helper.waitForVisible(element(by.xpath(this.attachmentFilesTitle.replace('{value}', attachments.attachmentFilesCaption[x]))));
      x++;
      browser.sleep(1000);
    });
    return true;
  }

  deleteAttachmentFiles(attachments: Attachments) {
    attachments.attachmentFiles.forEach((value) => {
      helper.waitAndClick(element(by.xpath(this.attachmentFilesDeleteBtn.replace('{value}', value))));
      helper.waitForDisappear(element(by.xpath(this.attachmentFilesTitle.replace('{value}', value))));
    });
    return true;
  }

  openAssetTree(assetTreeVar: string) {
    const assetTreeSplit = assetTreeVar.split('\\');
    for (let x = 0; x !== assetTreeSplit.length; x++) {
      helper.waitAndClick(element(by.xpath(this.assetTreeCaret.replace('{value}', assetTreeSplit[x]))));
      helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
    }
    return assetTreeSplit[assetTreeSplit.length - 1].toString();
  }

  addAsset(infoAssetTree: InfoAssetTree) {
    helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
    helper.waitAndClick(this.editAssetTreeBtn);
    const parentTree = this.openAssetTree(infoAssetTree.assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    helper.waitAndClick(element(by.xpath(this.addAssetChild.replace('{value}', parentTree))));
    this.waitForSpinner();
    helper.waitForVisible(element(by.xpath(this.parentAsset.replace('{value}', parentTree))));

    helper.waitForVisible(this.assetNameTxt);
    helper.clearAndSendKeys(this.assetNameTxt, infoAssetTree.assetName);
    helper.clearAndSendKeys(this.assetDescriptiveNameTxt, infoAssetTree.assetName + casual.words(3));
    return true;
  }

  moveAssetUpAndDown(infoAssetTree: InfoAssetTree) {
    helper.waitAndClick(this.editAssetTreeBtn);
    this.openAssetTree(infoAssetTree.assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
    helper.waitAndClick(element(by.xpath(this.moveUpAsset.replace('{value}', infoAssetTree.assetName))));
    this.waitForSpinner();
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
    helper.waitAndClick(element(by.xpath(this.moveDownAsset.replace('{value}', infoAssetTree.assetName))));
    this.waitForSpinner();


    return true;
  }

  copyAsset(infoAssetTree: InfoAssetTree) {
    helper.waitAndClick(this.editAssetTreeBtn);
    this.openAssetTree(infoAssetTree.copyAssetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
    util.scrollToView(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
    helper.rightClickElement(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.assetName))));
    helper.waitAndClick(this.rightClickMenuCopyBtn);
    return true;
  }

  pasteAsset(infoAssetTree: InfoAssetTree) {
    helper.waitAndClick(this.editAssetTreeBtn);
    const parentTree = this.openAssetTree(infoAssetTree.pasteAssetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    util.scrollToView(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    helper.rightClickElement(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    helper.waitAndClick(this.rightClickMenuPasteBtn);
    this.waitForSpinner();
    return true;
  }

  editAsset(assetTree: string, assetName: string, edittedAssetName: string) {
    helper.waitForDisappear(this.adhocTreeDisabled);
    helper.waitAndClick(this.editAssetTreeBtn);
    this.openAssetTree(assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', assetName))));
    helper.waitForDisappear(this.disabledAssetName);
    helper.clearAndSendKeys(this.assetNameTxt, edittedAssetName);
    helper.clearAndSendKeys(this.assetDescriptiveNameTxt, edittedAssetName + ' ' + casual.words(3));

    return true;
  }

  starFavoriteAttribute(infoAssetTree: InfoAssetTree) {
    let x = 0;
    const parentTree = this.openAssetTree(infoAssetTree.assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    this.assetAttributeEntry.each(() => {
      this.assetAttributeFavorite.get(x).click();
      x++;
    });
    return true;
  }

  addAssetTag(infoAssetTree: InfoAssetTree) {
    const parentTree = this.openAssetTree(infoAssetTree.assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', parentTree))));
    infoAssetTree.assetTag.forEach((value) => {
      helper.clearAndSendKeys(this.assetAttributeAddTagTextbox, value);
      this.assetAttributeAddTagBtn.click();
      helper.waitForVisible(element(by.xpath(this.assetAttributeAddTagSpan.replace('{value}', value))));
    });
    return true;
  }

  deleteAssetTag(infoAssetTree: InfoAssetTree) {
    infoAssetTree.assetTag.forEach((value) => {
      element(by.xpath(this.assetAttributeDeleteTabBtn.replace('{value}', value))).click();
      helper.waitForDisappear(element(by.xpath(this.assetAttributeAddTagSpan.replace('{value}', value))));
    });
    return true;
  }

  deleteAsset(infoAssetTree: InfoAssetTree) {
    helper.waitAndClick(this.editAssetTreeBtn);
    helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
    this.openAssetTree(infoAssetTree.assetTree);
    helper.waitAndClick(element(by.xpath(this.assetTreeEntry.replace('{value}', infoAssetTree.edittedAssetName))));
    helper.waitAndClick(element(by.xpath(this.deleteAssetBtn.replace('{value}', infoAssetTree.edittedAssetName))));
    browser.sleep(2000);
    browser.switchTo().alert().accept();
    browser.waitForAngular();
    return true;
  }

  saveAssetChecker(assetTree: string, assetName: string, edittedAssetName: string) {
    this.editAsset(assetTree, assetName, edittedAssetName);
    helper.waitAndClick(this.runModeBtn);
    helper.waitForVisibleAndDisappear(this.adhocTreeDisabled);
    return true;
  }
}
