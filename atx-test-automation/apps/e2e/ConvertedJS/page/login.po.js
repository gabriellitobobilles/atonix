"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var helper_1 = require("../helpers/helper");
var helper = new helper_1.Helper();
var LoginPage = /** @class */ (function () {
    function LoginPage() {
        this.userEmail = protractor_1.browser.element(protractor_1.by.model('vm.Email'));
        this.userPassword = protractor_1.browser.element(protractor_1.by.model('vm.Password'));
        this.signInBtn = protractor_1.browser.element(protractor_1.by.id('inputSubmitLogin'));
        // getNavBarRight() {
        //   return this.navBarRight
        // }
    }
    // navBarRight = element(by.className('bv-navbar-right'))
    LoginPage.prototype.inputUserEmail = function (email) {
        helper.clearAndSendKeys(this.userEmail, email);
        // this.userEmail.sendKeys(userObj.email);
    };
    LoginPage.prototype.inputUserPassword = function (password) {
        helper.clearAndSendKeys(this.userPassword, password);
        // this.userPassword.sendKeys(userObj.password);
    };
    LoginPage.prototype.clickSignInBtn = function () {
        this.signInBtn.click();
    };
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.po.js.map