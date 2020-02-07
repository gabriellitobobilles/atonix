import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
import { AssetExplorer } from '../../page/assetExplorer.po';
import { Transform } from 'stream';
import { async } from 'q';
import * as Pages from '../../page/pages';
import { AssetDetails, AttributeTypesEnum, InfoAssetTree } from '../../helpers/interface';
import { User } from '../../helpers/user';
import { Helper } from '../../helpers/helper';
import * as casual from 'casual';
import { userObj, appName } from '../../helpers/testDetails.data';

const user = new User();
const helper = new Helper();
const assetExplorerPage = new Pages.AssetExplorer();

const assetObj: AssetDetails = {
  name: 'Atonix',
  descriptiveName: 'Descriptive ' + casual.word,
  attributes: [{
    name: 'attr_' + casual.word,
    attributeType: AttributeTypesEnum['Freeform Text'],
    favorite: true
  }]
};

const infoAssetTree: InfoAssetTree = {
  assetName: 'Test Automation Asset',
  assetTree: 'nD Test Client\\Atonix',
  copyAssetTree: 'nD Test Client\\Atonix',
  pasteAssetTree: 'Demo Clients\\Test Asset',
  edittedAssetName: 'Editted Test Automation',
  assetTag: ['Automation', 'Protractor', 'Testing']
};


describe('Asset Explorer - Info', () => {

  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.assetExplorer);
  });

  it('should be able to load Asset Explorer', () => {
    browser.waitForAngularEnabled();
    expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
  });

  it('Ensure assets can be added to the asset tree at multiple levels', () => {
    expect(assetExplorerPage.addAsset(infoAssetTree)).toBeTruthy();
    expect(assetExplorerPage.afterEditVerification()).toBeTruthy();
    helper.waitAndClick(assetExplorerPage.runModeBtn);
    helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
    assetExplorerPage.searchAsset(infoAssetTree.assetName);
    expect(assetExplorerPage.assetNameTxt.getAttribute('value')).toMatch(infoAssetTree.assetName);
  });

  it('Ensure assets can be moved up/down the asset tree (reorder)', () => {
    expect(assetExplorerPage.moveAssetUpAndDown(infoAssetTree)).toBeTruthy();
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
  });

  it('Ensure a copy and paste of assets can be performed at different levels', () => {
    expect(assetExplorerPage.copyAsset(infoAssetTree)).toBeTruthy();
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    expect(assetExplorerPage.pasteAsset(infoAssetTree)).toBeTruthy();
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
  });

  it('Ensure edits can be made to assets and changes are shown (i.e. renaming)', () => {
    expect(assetExplorerPage.editAsset(infoAssetTree.assetTree,
      infoAssetTree.assetName,
      infoAssetTree.edittedAssetName)).toBeTruthy();
    assetExplorerPage.afterEditVerification();
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    assetExplorerPage.searchAsset(infoAssetTree.edittedAssetName);
    expect(assetExplorerPage.assetNameTxt.getAttribute('value')).toMatch(infoAssetTree.edittedAssetName);

  });

  it('Ensure an attribute can be starred as a favorite', () => {
    expect(assetExplorerPage.starFavoriteAttribute(infoAssetTree)).toBeTruthy();
    assetExplorerPage.afterEditVerification();
    helper.waitAndClick(assetExplorerPage.editAssetTreeBtn);
    helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
  });

  it('Ensure a tag can be added to an asset and can be deleted', () => {
    expect(assetExplorerPage.addAssetTag(infoAssetTree)).toBeTruthy();
    assetExplorerPage.afterEditVerification();
    expect(assetExplorerPage.deleteAssetTag(infoAssetTree)).toBeTruthy();
    assetExplorerPage.afterEditVerification();
    helper.waitAndClick(assetExplorerPage.editAssetTreeBtn);
    helper.waitForVisibleAndDisappear(assetExplorerPage.adhocTreeDisabled);
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
  });

  it('Ensure an asset can be deleted', () => {
    expect(assetExplorerPage.deleteAsset(infoAssetTree)).toBeTruthy();
    assetExplorerPage.waitForSpinner();
    assetExplorerPage.waitForToastMessage();
    expect(assetExplorerPage.clickRunModeAndVerify()).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.assetTreeEntry
      .replace('{value}', infoAssetTree.edittedAssetName)))
      .isPresent())
      .toBe(false);
  });
});
