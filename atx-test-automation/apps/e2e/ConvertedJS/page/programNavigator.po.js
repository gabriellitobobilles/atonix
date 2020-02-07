"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var map_po_1 = require("../page/features/map.po");
var helper_1 = require("../helpers/helper");
var interface_1 = require("../helpers/interface");
var helper = new helper_1.Helper();
var ProgramNavigator = /** @class */ (function (_super) {
    tslib_1.__extends(ProgramNavigator, _super);
    function ProgramNavigator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spinnerImg = protractor_1.$("[id=\"spinner\"]");
        _this.tabElements = protractor_1.$$("[ng-repeat=\"tab in vm.tabs\"] > a"); // or $$(`[role="tab"]`)
        // Map
        _this.hoverBoxMilestoneTable = protractor_1.$("#bvHoverBox > .scheduleTable");
        _this.hoverScheduleRepeater = protractor_1.$$("#hoverContainer [ng-repeat=\"milestone in hvrvm.assetMilestonesAndDates\"]");
        _this.milestoneRepeaterSelector = "[ng-repeat=\"milestone in hvrvm.assetMilestonesAndDates\"]";
        // Change Live Status Modal
        _this.liveStatusDetails = protractor_1.$("[ng-repeat=\"pds in csVM.collations.processDataStatuses\"]");
        _this.changeStatusDropDown = protractor_1.$("[ng-model=\"pds.nowStatus\"]");
        _this.liveSatatusSpinner = protractor_1.$("[ng-show=\"pds.saving\"] > .fa-spinner");
        _this.liveStatusCloseBtn = protractor_1.$("[ng-click=\"csVM.close()\"]");
        _this.liveStatusSuccessMsg = protractor_1.$(".modal-content").element(protractor_1.by.cssContainingText("span", "status set to"));
        return _this;
    }
    ProgramNavigator.prototype.getTabNames = function () {
        return {
            // info: 'Info',
            // attachments: 'Attachments',
            // blog: 'Blog',
            // location: 'Location',
            summary: 'Summary',
            map: 'Map',
            trends: 'Trends',
            views: 'Views',
            lists: 'Lists',
            search: 'Search'
        };
    };
    ProgramNavigator.prototype.getTabElementByName = function (tabName) {
        return this.tabElements.filter(function (tab) {
            return tab.getText().then(function (text) {
                return text === tabName;
            });
        }).first();
    };
    ProgramNavigator.prototype.openTab = function (tabName) {
        this.getTabElementByName(tabName).click();
    };
    ProgramNavigator.prototype.getMapInfoTrayChart = function () {
        return this.getMapMilestoneFn(this.infoTrayTabContents.chart);
    };
    ProgramNavigator.prototype.getMapHoverMilesStone = function () {
        return this.getMapMilestoneFn(this.hoverAssetBox);
    };
    ProgramNavigator.prototype.getMapMilestoneFn = function (elem) {
        helper.waitForVisible(elem.$$(this.milestoneRepeaterSelector).get(0));
        return elem.$$(this.milestoneRepeaterSelector).map(function (milestone) {
            return {
                milestoneName: milestone.$$("td").get(0).getText(),
                actual: milestone.$$("td").get(1).getText(),
                planned: milestone.$$("td").get(2).getText(),
            };
        });
    };
    /**
     * used to set the live status in Change Live Status window in Maps
     * @param status {string} - `MilestoneStatus` enum.
     * @returns obj {res: boolean, msg: string}
     */
    ProgramNavigator.prototype.setMapLiveStatus = function (status) {
        this.changeStatusDropDown.$("[label=\"" + interface_1.MilestoneStatus[status] + "\"]").click();
        var setBtn = protractor_1.$("[ng-click=\"csVM.ok(pds)\"]");
        helper.waitAndClick(setBtn, 1500);
        helper.waitForVisible(this.liveSatatusSpinner, 5000);
        helper.waitForDisappear(this.liveSatatusSpinner);
        var successCheckIcon = protractor_1.$$(".fa-check").get(0);
        if (!successCheckIcon.isDisplayed() || !this.liveStatusSuccessMsg.isDisplayed()) {
            return {
                res: false, msg: "Asset: " + this.getAssetChangeLiveStatusWindow() + " change Live status not successfully failed"
            };
        }
        return {
            res: true,
            msg: 'success'
        };
    };
    /**
     * open Change Live Status window, sets Live status, close window
     * @param status MilestoneStatue
     */
    ProgramNavigator.prototype.updateMapLiveStatus = function (status) {
        this.infoTrayChangeStatusBtn.click();
        helper.waitForVisible(protractor_1.$(".modal-header"), 5000);
        this.setMapLiveStatus(interface_1.MilestoneStatus["" + status]);
        this.liveStatusCloseBtn.click();
    };
    ProgramNavigator.prototype.getAssetChangeLiveStatusWindow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var details;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.liveStatusDetails.getText()];
                    case 1:
                        details = _a.sent();
                        return [2 /*return*/, details.split(/\n/).filter(function (detail) { return detail.includes('Asset:'); })[0]];
                }
            });
        });
    };
    /**
     * gets the actual and plan status of the project.
     * @returns {obj} `{actual: string, plan: string}`
     */
    ProgramNavigator.prototype.getInfoTrayProjectStatus = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var projectStatus;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.infoTrayProjectStatus.getText()];
                    case 1:
                        projectStatus = _a.sent();
                        return [2 /*return*/, {
                                actual: projectStatus.split(/\n/)[1],
                                plan: projectStatus.split(/\n/)[3]
                            }];
                }
            });
        });
    };
    return ProgramNavigator;
}(map_po_1.MapPage));
exports.ProgramNavigator = ProgramNavigator;
//# sourceMappingURL=programNavigator.po.js.map