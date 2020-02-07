import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
import { AssetExplorer } from '../../page/assetExplorer.po';
import { Transform } from 'stream';
import { async } from 'q';
import * as Pages from '../../page/pages';
import { AssetDetails, AttributeTypesEnum, SaveAndSaveAllAssets } from '../../helpers/interface';
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

const saveAndSaveAll: SaveAndSaveAllAssets = {
  assetTree: 'nD Test Client\\Atonix',
  firstAsset: ['Automation Test Asset 1', 'Editted Protractor Test 1'],
  secondAsset: ['Automation Test Asset 2', 'Editted Protractor Test 2'],
  thirdAsset: ['Automation Test Asset 3', 'Editted Protractor Test 3'],
};


describe('Asset Explorer - Save Asset and Save All Assets', () => {

  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.assetExplorer);
  });

  it('Ensure "Save Asset" button\'s functionality', () => {
    browser.waitForAngularEnabled();
    expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.firstAsset[0], saveAndSaveAll.firstAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.firstAsset[0]))).isPresent);

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.secondAsset[0], saveAndSaveAll.secondAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.secondAsset[0]))).isPresent);

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.thirdAsset[0], saveAndSaveAll.thirdAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.thirdAsset[0]))).isPresent);

    assetExplorerPage.searchAsset(saveAndSaveAll.secondAsset[0]);

    helper.waitForDisappear(assetExplorerPage.saveAssetBtnDisabled);
    helper.waitAndClick(assetExplorerPage.saveAssetBtn);

    expect(helper.waitForDisappear(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.secondAsset[0])))));
  });

  it('Ensure "Save Asset" button\'s functionality', () => {
    browser.waitForAngularEnabled();
    expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.firstAsset[0], saveAndSaveAll.firstAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.firstAsset[0]))).isPresent);

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.secondAsset[0], saveAndSaveAll.secondAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.secondAsset[0]))).isPresent);

    expect(assetExplorerPage.saveAssetChecker(saveAndSaveAll.assetTree,
      saveAndSaveAll.thirdAsset[0], saveAndSaveAll.thirdAsset[0])).toBeTruthy();
    expect(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.thirdAsset[0]))).isPresent);

    assetExplorerPage.searchAsset(saveAndSaveAll.secondAsset[0]);

    helper.waitForDisappear(assetExplorerPage.saveAllAssetsBtnDisabled);
    helper.waitAndClick(assetExplorerPage.saveAllAssetsBtn);

    expect(helper.waitForDisappear(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.firstAsset[0])))));
    expect(helper.waitForDisappear(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.secondAsset[0])))));
    expect(helper.waitForDisappear(element(by.xpath(assetExplorerPage.changedAssetIndicatorAssetName
      .replace('{value}', saveAndSaveAll.thirdAsset[0])))));
  });
});
