/**
 * maps test for Program Navigator
 */

import { User } from '../../helpers/user';
import { appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, ElementArrayFinder, element, by, $$, ElementFinder } from 'protractor';
import { AssetDetails, AttributeTypesEnum } from '../../helpers/interface';
import * as casual from 'casual';

const user = new User();
const assetExplorerPage = new Pages.AssetExplorer();
const assetNavigatorPane = Pages.assetNavigatorPane;
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'Demo Clients',
  child: ['Test Asset']
};
const assetObj: AssetDetails = {
  name: 'Test Asset ' + casual.word,
  descriptiveName: 'Descriptive ' + casual.word,
  attributes: [{
    name: 'attr_' + casual.word,
    attributeType: AttributeTypesEnum['Freeform Text'],
    favorite: true
  }]
};

describe('Asset Explorer', () => {
  beforeAll(async () => {
    user.logIn({ email: 'nino@test.com', password: '@Password1' });
    user.navigateToApp(appName.assetExplorer);
  });
  it('should be able to load Asset Explorer', async () => {
    browser.waitForAngularEnabled();
    expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
  });
  it('Ad Hoc controls should NOT be present', async () => {
    expect(assetNavigatorPane.adHocDropDownBtn.isPresent()).toBeTruthy();
    expect(assetNavigatorPane.adHocDropDownBtn.isDisplayed()).toBeFalsy();
  });
  it('should be able to Enable Edit mode physical Tree', async () => {
    expect(assetNavigatorPane.editTreeBtn.isDisplayed()).toBeTruthy();
    assetNavigatorPane.editPhysicalTree();
    expect(assetNavigatorPane.currentlyEditingTxtLbl.isDisplayed()).toBeTruthy();
    expect(assetNavigatorPane.currentlyEditingTxtLbl.getText()).toContain('CURRENTLY EDITING');
  });
  it('should be able to ADD NEW ASSET', async () => {
    addNewAssetFn();
    expect(assetExplorerPage.getToastMessage()).toContain('Changes Saved');
    expect(assetNavigatorPane.getCurrentChildArea().getText()).toContain(assetObj.name);
  });
});

function addNewAssetFn() {
  assetNavigatorPane.selectAssetInTree(clientToUse);
  assetNavigatorPane.addChild();
  assetExplorerPage.inputAssetDetails(assetObj);
  assetExplorerPage.saveAssetFn();
}
