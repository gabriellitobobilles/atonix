import { browser, by, $$, $, element, ElementFinder, utils, ElementArrayFinder } from 'protractor';
import { Helper } from '../../helpers/helper';
import { protractor } from 'protractor/built/ptor';
import { appName } from '../../helpers/testDetails.data';
import * as pages from '../pages';

const helper = new Helper();
const assetExplorerPage = new pages.AssetExplorer();


export const assetNavigatorPane = {
  adHocModeControls: $(`.adhoc-mode-controls`),
  adHocDropDownBtn: $(`.adhoc-mode-controls > .dropdown`),
  editTreeBtn: $(`.adhoc-mode-controls > [title="Edit Tree"]`),
  currentlyEditingTxtLbl: $(`[ng-show="treeController.isEditMode"]`),
  spinner: $(`[src="../Content/spinner.gif"]`),
  selectedAsset: $(`[class="selectedAsset"]`),

  addChild() {
    assetNavigatorPane.selectedAsset.$(`.assetTreeButtons [title="Add Child"]`).click();
    assetExplorerPage.waitForSpinner();
  },

  selectAssetInTree(assetToNatigateObj): ElementFinder {
    const targetClient = helper.selectClientMain(assetToNatigateObj.parent, assetToNatigateObj.child, appName.assetExplorer);
    browser.actions().mouseMove(targetClient).perform();
    return targetClient;
  },

  editPhysicalTree() {
    assetNavigatorPane.editTreeBtn.click();
  },

  getCurrentChildArea(): ElementFinder {
    return element(by
      .xpath(`//div[@class="selectedAsset"]/ancestor::div[@ng-repeat="adhocNode in node.children"]/div[@class="childArea"]`));
  }

};
