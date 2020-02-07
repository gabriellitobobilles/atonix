/**
 * Asset Explorer - Attribute CRUD
 */

import { User } from '../../helpers/user';
import { userObj, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, utils } from 'protractor';
import { AssetDetails, AssetAttributes, AttributeTypesEnum } from '../../helpers/interface';
import * as casual from 'casual';
import { OCT, JUN } from '@angular/material';

const user = new User();
const assetExplorerPage = new Pages.AssetExplorer();
const helper = new Helper();
const helpUtil = new Utils();
const date: Date = new Date(2006, OCT, 31);
const editted_date: Date = new Date(2017, JUN, 17);

const assetObj: AssetDetails = {
  name: 'Atonix',
  descriptiveName: 'Descriptive ' + casual.word,
  attributes: [{
    name: 'attr_' + casual.word,
    attributeType: AttributeTypesEnum['Freeform Text'],
    favorite: true
  }]
};

const assetAtt: AssetAttributes[] = [{
  name: 'Freeform Text',
  value: 'TestValue',
  editted_value: 'Editted Test Value',
  invalid_value: '3fasd3ad1.4',
  attributeType: AttributeTypesEnum['Freeform Text'],
  favorite: true
}, {
  name: 'Integer',
  value: 3321,
  editted_value: 5679,
  invalid_value: '3fasd3ad1.4',
  attributeType: AttributeTypesEnum['Integer'],
  favorite: true
}, {
  name: 'Float',
  value: 223.323,
  editted_value: 546.87,
  invalid_value: '123ff342',
  attributeType: AttributeTypesEnum['Float'],
  favorite: true
}, {
  name: 'Discrete List',
  value: 'itemOne',
  value2: 'itemTwo',
  value3: 'itemThree',
  editted_value: 'itemEditted',
  invalid_value: 'itemOne,itemTwo.itemThree:',
  attributeType: AttributeTypesEnum['Discrete List'],
  favorite: true
}, {
  name: 'Boolean',
  value: false,
  attributeType: AttributeTypesEnum['Boolean'],
  favorite: true
}, {
  name: 'Date',
  dateValue: date,
  value2: '01:59:23PM',
  editted_dateValue: editted_date,
  editted_value2: '12:02:03AM',
  invalid_value: 'thisIsAn1nvalidValue3',
  attributeType: AttributeTypesEnum['Date'],
  favorite: true
}];

describe('Asset Attribute - CRUD', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.assetExplorer);
  });
  describe('Freeform Text', () => {
    it('should be able to load Asset Explorer', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Freeform Text', () => {
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

    it('should be able to edit attribute from Asset - Freeform Text', () => {
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

    it('should be able to delete attribute from Asset - Freeform Text', () => {
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

  describe('Integer', () => {
    it('should be able to load Asset Explorer', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Integer', () => {
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

    it('should be able to edit attribute from Asset - Integer', () => {
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


    it('should be able to delete attribute from Asset - Integer', () => {
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

    it('should be able to test invalid attribute values - Integer', () => {
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

  describe('Float', () => {

    it('should be able to load Asset Explorer', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Float', () => {
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

    it('should be able to edit attribute from Asset - Float', () => {
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


    it('should be able to delete attribute from Asset - Float', () => {
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

    it('should be able to test invalid attribute values- Float', () => {
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

  describe('Discrete List', () => {

    it('should be able to load Asset Explorer - Discrete List', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Discrete List', () => {
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

    it('should be able to edit attribute from Asset - Discrete List', () => {
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


    it('should be able to delete attribute from Asset - Discrete List', () => {
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

    it('should be able to test invalid attribute values - Discrete List', () => {
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

  describe('Boolean', () => {

    it('should be able to load Asset Explorer - Boolean', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Boolean', () => {
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

    it('should be able to edit attribute from Asset - Boolean', () => {
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


    it('should be able to delete attribute from Asset - Boolean', () => {
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

  describe('Date', () => {

    it('should be able to load Asset Explorer - Date', () => {
      browser.waitForAngularEnabled();
      expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
    });

    it('should be able to add attribute to Asset - Date', () => {
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

    it('should be able to edit attribute from Asset - Date', () => {
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


    it('should be able to delete attribute from Asset - Date', () => {
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
    it('should be able to test invalid attribute values - Date', () => {
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


