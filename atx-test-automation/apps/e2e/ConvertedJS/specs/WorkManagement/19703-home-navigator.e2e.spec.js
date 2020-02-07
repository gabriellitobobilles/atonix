"use strict";
/**
 * Test Case: 19680
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19680
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var user_1 = require("../../helpers/user");
var testDetails_data_1 = require("../../helpers/testDetails.data");
var protractor_1 = require("protractor");
var utils_1 = require("../../helpers/utils");
var helper_1 = require("../../helpers/helper");
var pages_1 = require("../../page/pages");
var util = new utils_1.Utils();
var user = new user_1.User();
var helper = new helper_1.Helper();
describe('Work Management - App Navigation', function () {
    beforeAll(function () {
        user.logIn(testDetails_data_1.userObj);
        user.goToWorkManagement();
    });
    Object.keys(testDetails_data_1.appName).forEach(function (app) {
        it("should be able to navigate to " + testDetails_data_1.appName[app], function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                user.navigateToApp(testDetails_data_1.appName[app]);
                expect((new pages_1.HomePage).appTitle.getText()).toContain(testDetails_data_1.appName[app].toUpperCase());
                expect(protractor_1.browser.getTitle()).toEqual(helper.getTrueTitle(testDetails_data_1.appName[app]));
                if (testDetails_data_1.appName[app] === testDetails_data_1.appName.arcFlash) {
                    protractor_1.browser.close();
                    util.getWindowHandles().then(function (handle) {
                        protractor_1.browser.switchTo().window(handle[0]);
                    });
                }
                else {
                    user.navigateToApp(testDetails_data_1.appName.issuesManagement);
                }
                protractor_1.browser.sleep(2000);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=19703-home-navigator.e2e.spec.js.map