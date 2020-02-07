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
var tabNames = programNavigatorPage.getTabNames();
var assetName_gbl;
var mapHoverDetails;
var hoverBoxDetails;
describe('Program Navigator Maps - Info Tray', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.navigateToApp(testDetails_data_1.appName.programNavigator);
        helper.selectClientMain(clientToUse.parent, clientToUse.child, testDetails_data_1.appName.programNavigator);
        user.openTab(tabNames.map);
        protractor_1.browser.waitForAngularEnabled();
        helper.waitForVisible(programNavigatorPage.svgCircles.get(0)); // wait for the first circle
    });
    it('should display hover asset information on-mouseover', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, milestone, mapSchedule;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    programNavigatorPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
                    return [4 /*yield*/, programNavigatorPage.hoverBoxAssetName.getText()];
                case 1:
                    assetName_gbl = _b.sent();
                    return [4 /*yield*/, programNavigatorPage.getMapHoverMilesStone()];
                case 2:
                    mapHoverDetails = _b.sent();
                    _a = splitStringNextLine;
                    return [4 /*yield*/, programNavigatorPage.hoverAssetBox.getText()];
                case 3:
                    hoverBoxDetails = _a.apply(void 0, [_b.sent()]);
                    milestone = ['Not Started', 'Mitigation Plan', 'Engineering', 'Procurement',
                        'Permitting', 'Construction', 'Close-out', 'Mitigation Complete'];
                    return [4 /*yield*/, programNavigatorPage.hoverBoxMilestoneTable.getText()];
                case 4:
                    mapSchedule = _b.sent();
                    milestone.forEach(function (schedule) {
                        expect(mapSchedule).toContain(schedule);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('display correct milestone in Chart Tab and Info Tray', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var infoTrayMilestone, actualStatusHover, planStatusHover, infoTrayProjectStatus;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0));
                    protractor_1.browser.sleep(2000);
                    expect(programNavigatorPage.infoTrayExpanded.isPresent()).toBeTruthy();
                    expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(assetName_gbl.toUpperCase());
                    programNavigatorPage.infoTrayTabHeaders.chart.click();
                    return [4 /*yield*/, programNavigatorPage.getMapInfoTrayChart()];
                case 1:
                    infoTrayMilestone = _a.sent();
                    expect(mapHoverDetails).toEqual(infoTrayMilestone);
                    actualStatusHover = hoverBoxDetails[2];
                    planStatusHover = hoverBoxDetails[3];
                    return [4 /*yield*/, programNavigatorPage.getInfoTrayProjectStatus()];
                case 2:
                    infoTrayProjectStatus = _a.sent();
                    expect(actualStatusHover).toEqual("Actual: " + infoTrayProjectStatus.actual, "Actual hover and infoTray does not match");
                    expect(planStatusHover).toEqual("Plan: " + infoTrayProjectStatus.plan, "Plan hover and infoTray does not match");
                    expect(mapHoverDetails).toEqual(infoTrayMilestone, "Milesone from hoverbox and info tray does not match");
                    expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(hoverBoxDetails[0].toUpperCase(), "InfoTray Asset Name: " + programNavigatorPage.infoTrayAssetName.getText() + " " +
                        ("is not equal to hoverbox " + hoverBoxDetails[0].toUpperCase()));
                    return [2 /*return*/];
            }
        });
    }); });
});
function splitStringNextLine(str) {
    return str.split(/\n/);
}
//# sourceMappingURL=program-navigator-maps-Info-tray.e2e-spec.js.map