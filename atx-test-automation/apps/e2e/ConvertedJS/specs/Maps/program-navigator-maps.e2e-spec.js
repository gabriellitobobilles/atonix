"use strict";
/**
 * maps test for Program Navigator
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var Pages = require("../../page/pages");
var helper_1 = require("../../helpers/helper");
var utils_1 = require("../../helpers/utils");
var protractor_1 = require("protractor");
var user = new user_1.User();
var programNavigatorPage = new Pages.ProgramNavigator();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    parent: 'SEKOIA Demo Clients',
    child: ['UGM Historical Reliability Plan']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
// const newQuickSearch = generateQuickSearch();
// const modifiedQuickSearch = Object.create(newQuickSearch);
// newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
// let saveAsQuickSearch: any;
var tabNames = programNavigatorPage.getTabNames();
var assetName_gbl;
describe('Program Navigator Maps', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
    });
    it('should be able to nagivate to maps Tab', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            user.openTab(tabNames.map);
            protractor_1.browser.waitForAngularEnabled();
            expect(programNavigatorPage.quickSearchBtn.isPresent()).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('should load map', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            helper.waitForVisible(programNavigatorPage.mapLayer);
            expect(programNavigatorPage.mapLayer.isPresent()).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('should display hover asset information on-mouseover', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, mapElements;
        var _this = this;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    programNavigatorPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
                    _b = (_a = console).log;
                    _c = ["HoverBox InfO: "];
                    return [4 /*yield*/, protractor_1.$("#hoverContainer > bv-hover-box > #bvHoverBox ").getText()];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [4 /*yield*/, programNavigatorPage.hoverBoxAssetName.getText()];
                case 2:
                    assetName_gbl = _d.sent();
                    console.log("Map Elements: ");
                    mapElements = programNavigatorPage.getMapElements();
                    Object.keys(mapElements).forEach(function (elem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c;
                        return tslib_1.__generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = console).log;
                                    _c = [elem + ":::"];
                                    return [4 /*yield*/, mapElements[elem].count()];
                                case 1:
                                    _b.apply(_a, _c.concat([_d.sent()]));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to select an asset in Map and display Info Tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0));
            protractor_1.browser.sleep(2000);
            expect(programNavigatorPage.infoTrayExpanded.isPresent()).toBeTruthy();
            expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(assetName_gbl.toUpperCase());
            return [2 /*return*/];
        });
    }); });
    it('should display all Info Tray Tabs', function () {
        Object.keys(programNavigatorPage.infoTrayTabHeaders).forEach(function (tab) {
            expect(programNavigatorPage.infoTrayTabHeaders[tab].isPresent()).toBeTruthy();
        });
    });
});
//# sourceMappingURL=program-navigator-maps.e2e-spec.js.map