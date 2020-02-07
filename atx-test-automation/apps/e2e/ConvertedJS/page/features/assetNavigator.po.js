"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var helper_1 = require("../../helpers/helper");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var pages = require("../pages");
var helper = new helper_1.Helper();
var assetExplorerPage = new pages.AssetExplorer();
exports.assetNavigatorPane = {
    adHocModeControls: protractor_1.$(".adhoc-mode-controls"),
    adHocDropDownBtn: protractor_1.$(".adhoc-mode-controls > .dropdown"),
    editTreeBtn: protractor_1.$(".adhoc-mode-controls > [title=\"Edit Tree\"]"),
    currentlyEditingTxtLbl: protractor_1.$("[ng-show=\"treeController.isEditMode\"]"),
    spinner: protractor_1.$("[src=\"../Content/spinner.gif\"]"),
    selectedAsset: protractor_1.$("[class=\"selectedAsset\"]"),
    addChild: function () {
        exports.assetNavigatorPane.selectedAsset.$(".assetTreeButtons [title=\"Add Child\"]").click();
        assetExplorerPage.waitForSpinner();
    },
    selectAssetInTree: function (assetToNatigateObj) {
        var targetClient = helper.selectClientMain(assetToNatigateObj.parent, assetToNatigateObj.child, testDetails_data_1.appName.assetExplorer);
        protractor_1.browser.actions().mouseMove(targetClient).perform();
        return targetClient;
    },
    editPhysicalTree: function () {
        exports.assetNavigatorPane.editTreeBtn.click();
    },
    getCurrentChildArea: function () {
        return protractor_1.element(protractor_1.by
            .xpath("//div[@class=\"selectedAsset\"]/ancestor::div[@ng-repeat=\"adhocNode in node.children\"]/div[@class=\"childArea\"]"));
    }
};
//# sourceMappingURL=assetNavigator.po.js.map