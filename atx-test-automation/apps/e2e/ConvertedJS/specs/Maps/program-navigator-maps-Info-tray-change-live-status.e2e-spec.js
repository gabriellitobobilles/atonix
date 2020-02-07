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
var interface_1 = require("../../helpers/interface");
var user = new user_1.User();
var programNavigatorPage = new Pages.ProgramNavigator();
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var clientToUse = {
    parent: 'SEKOIA Demo Clients',
    child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022']
    // parent: automationAssetData.clientGroup,
    // child: [automationAssetData.clientName]
};
var tabNames = programNavigatorPage.getTabNames();
var assetName_gbl;
var mapHoverDetails;
var milestone = ['Not Started', 'Mitigation Plan', 'Engineering', 'Procurement',
    'Permitting', 'Construction', 'Close-out', 'Mitigation Complete'];
describe('Program Navigator Maps - Change Live Status', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.map);
        protractor_1.browser.waitForAngularEnabled();
        helper.waitForVisible(programNavigatorPage.svgCircles.get(0), 60000); // wait for the first circle
    });
    it('should be able to update Live Status', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var assetToSelect, liveStatusBefore, milestoneToSelect, result, liveStatusAfter;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util.getRandomElementFromArray(programNavigatorPage.svgCircles)];
                case 1:
                    assetToSelect = _a.sent();
                    // Zoom out and moveToAsset to hover to show hoverbox
                    programNavigatorPage.zoomOutBtn.click();
                    programNavigatorPage.mouseMoveToAsset(assetToSelect);
                    return [4 /*yield*/, programNavigatorPage.hoverBoxAssetName.getText()];
                case 2:
                    // grab details of hoverbox
                    assetName_gbl = _a.sent();
                    return [4 /*yield*/, programNavigatorPage.getMapHoverMilesStone()];
                case 3:
                    mapHoverDetails = _a.sent();
                    // select asset and go to Chart tab
                    programNavigatorPage.selectAssetFromMap(assetToSelect);
                    programNavigatorPage.infoTrayTabHeaders.chart.click();
                    return [4 /*yield*/, programNavigatorPage.getInfoTrayProjectStatus()];
                case 4:
                    liveStatusBefore = _a.sent();
                    milestoneToSelect = util.getRandomFromArray(helper.removeItemFromArrayByValue(milestone, liveStatusBefore.actual));
                    result = changeMapLiveStatus(milestoneToSelect);
                    return [4 /*yield*/, programNavigatorPage.getInfoTrayProjectStatus()];
                case 5:
                    liveStatusAfter = _a.sent();
                    expect(result.res).toBeTruthy(result.msg);
                    expect(liveStatusAfter).not.toEqual(liveStatusBefore, "Project should not be the same");
                    return [2 /*return*/];
            }
        });
    }); });
});
function changeMapLiveStatus(milestoneToSelect) {
    programNavigatorPage.infoTrayChangeStatusBtn.click();
    helper.waitForVisible(protractor_1.$(".modal-header"), 5000);
    expect(helper.getModalTitlePopUp()).toEqual("Change Live Status", "Change Live Status window title is incorrect");
    var result = programNavigatorPage.setMapLiveStatus(interface_1.MilestoneStatus["" + milestoneToSelect]);
    expect(programNavigatorPage.liveStatusSuccessMsg.getText()).toContain("status set to " + milestoneToSelect);
    programNavigatorPage.liveStatusCloseBtn.click();
    return result;
}
//# sourceMappingURL=program-navigator-maps-Info-tray-change-live-status.e2e-spec.js.map