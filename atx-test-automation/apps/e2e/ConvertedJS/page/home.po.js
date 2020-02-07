"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var HomePage = /** @class */ (function () {
    function HomePage() {
        this.navBarRight = protractor_1.element(protractor_1.by.className('bv-navbar-right'));
        this.menuButton = protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        this.menuHolder = protractor_1.element(protractor_1.by.className('.acDropdown.animate-slide'));
        this.appTitle = protractor_1.$('.appTitle');
    }
    HomePage.prototype.getNavBarRight = function () {
        return this.navBarRight;
    };
    HomePage.prototype.getAppFromMenu = function (appName) {
        // return element.all(by.cssContainingText('.ACDisplayName.ng-binding', appName))
        return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts'))
            .filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === appName;
            });
        }).first();
    };
    HomePage.prototype.selectAppFromMenu = function (appName) {
        this.menuButton.click();
        protractor_1.browser.sleep(1000);
        var appToSelectElem = this.getAppFromMenu(appName);
        appToSelectElem.click();
        protractor_1.browser.sleep(3000);
    };
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=home.po.js.map