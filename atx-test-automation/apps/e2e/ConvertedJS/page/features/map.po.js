"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var helper_1 = require("../../helpers/helper");
var helper = new helper_1.Helper();
var MapPage = /** @class */ (function () {
    function MapPage() {
        this.mapLayer = protractor_1.$("#geoSpa_layers > svg");
        this.mapSpinner = protractor_1.$(".mapLoadingSpinner > span.fa-spinner");
        this.quickSearchBtn = protractor_1.$("#quicksearchpopup > .btn-group > button");
        this.filterBtn = protractor_1.$("#quicksearchpopup #filterToggle");
        this.searchFilterTxt = protractor_1.$("[ng-model=\"tagSearchPopupVM.searchText\"]");
        this.searchBtn = protractor_1.$(".mapFilter form > #tagSearchPopup div > button[type=\"submit\"]");
        // Info Tray
        this.infoTray = protractor_1.$(".attribute-tray-right-popup");
        this.infoTrayExpanded = protractor_1.$(".attribute-tray-right-popup.expanded");
        this.infoTrayAssetName = protractor_1.$(".trayTitle");
        this.infoTrayRefreshBtn = protractor_1.$(".attribute-tray-right-popup.expanded .fa-refresh");
        this.infoTrayCloseBtn = protractor_1.$(".attribute-tray-right-popup.expanded .fa-close");
        this.infoTrayTabHeaders = {
            chart: protractor_1.$(".attributeTab > .fa-line-chart"),
            info: protractor_1.$(".attributeTab > .fa-info-circle"),
            attachments: protractor_1.$(".attributeTab > .fa-paperclip"),
            discussion: protractor_1.$(".attributeTab > .fa-comment-o"),
            tags: protractor_1.$(".attributeTab > .fa-tag"),
        };
        this.infoTrayTabContents = {
            chart: protractor_1.$("[ng-show=\"aitVM.selectedTab === 'charts'\"]"),
            info: protractor_1.$("#infoTab"),
            attachments: protractor_1.$("[ng-show=\"aitVM.selectedTab === 'attachments'\"]"),
            discussion: protractor_1.$("[ng-show=\"aitVM.selectedTab === 'discussion'\"]"),
            tags: protractor_1.$("[ng-show=\"aitVM.selectedTab === 'tags'\"]"),
        };
        // this is for Project Status Actual and Project Status Plan
        this.infoTrayProjectStatus = protractor_1.$("[ng-show=\"aitVM.selectedTab === 'charts'\"] [ng-if=\"aitVM.showStatus\"]");
        this.infoTrayChangeStatusBtn = protractor_1.$("[ng-click=\"aitVM.changeStatus()\"]");
        // Hover Box and asset info when mouseover on Assets in map
        this.hoverAssetBox = protractor_1.$("#hoverContainer");
        this.hoverBoxAssetName = protractor_1.$$("#bvHoverBox > div").get(0);
        // SVG elements in maps
        this.svgCircles = protractor_1.$$("#geoSpa_layers > svg > g > circle");
        this.svgPath = protractor_1.element.all(protractor_1.by.xpath("//div[@id=\"geoSpa_layers\"]/*[local-name()='svg']/*[contains(@id,'features_layer')]/*[local-name()='path']"));
        this.zoomInBtn = protractor_1.$("#geoSpa_zoom_slider > [title=\"Zoom In\"]");
        this.zoomOutBtn = protractor_1.$("#geoSpa_zoom_slider > [title=\"Zoom Out\"]");
    }
    /**
     *
     * @param tab infoTrayTabs property in mapPage
     * @example selectInfoTrayTabs(this.infoTrayTabs.chart)
     */
    MapPage.prototype.selectInfoTrayTabs = function (tab) {
        tab.click();
    };
    /**
     * selects / clicks the asset in the map
     * @param assetElem Element of the asset to be selected
     * @example
     * const assetElement = maps.svgCircles.get(1)
     * maps.selectAssetFromMap(assetElement)
     */
    MapPage.prototype.selectAssetFromMap = function (assetElem) {
        protractor_1.browser.actions().click(assetElem.getWebElement()).perform();
        helper.waitForVisible(this.infoTrayExpanded);
        protractor_1.browser.sleep(1000);
    };
    /**
     * does a mouseover on an asset in maps and waits for the hover box
     * @param assetElem Element of the asset to be selected
     */
    MapPage.prototype.mouseMoveToAsset = function (assetElem) {
        helper.waitForVisible(assetElem, 10000);
        protractor_1.browser.actions().mouseMove(assetElem.getWebElement()).perform();
        helper.waitForVisible(this.hoverAssetBox);
        // helper.waitForVisible(this.hoverBoxMilestoneTable);
    };
    /**
     * returns circle and path elements in maps
     */
    MapPage.prototype.getMapElements = function () {
        return {
            circles: this.svgCircles,
            paths: this.svgPath
        };
    };
    MapPage.prototype.getMilestoneFn = function (elem, type) {
        helper.waitForVisible(elem.$$("[ng-repeat=\"milestone in hvrvm.assetMilestonesAndDates\"]").get(0));
        return elem.$$("[ng-repeat=\"milestone in hvrvm.assetMilestonesAndDates\"]").map(function (milestone) {
            return {
                milestoneName: milestone.$$("td").get(0).getText(),
                actual: milestone.$$("td").get(1).getText(),
                planned: milestone.$$("td").get(2).getText(),
            };
        });
    };
    MapPage.prototype.getInfoTrayContentByTab = function (tabElem) {
        if (tabElem === this.infoTrayTabContents.chart) {
            return this.infoTrayTabContents.chart.getText();
        }
        else if (tabElem === this.infoTrayTabContents.info) {
            return "Info. Some code goes here";
        }
        else if (tabElem === this.infoTrayTabContents.attachments) {
            return "Attachments. Some code goes here";
        }
    };
    MapPage.prototype.getHoverDetails = function () {
    };
    return MapPage;
}());
exports.MapPage = MapPage;
//# sourceMappingURL=map.po.js.map