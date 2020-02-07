"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var utils_1 = require("../helpers/utils");
var testDetails_data_1 = require("./testDetails.data");
var path = require("path");
var fs = require("fs");
var calendar_picker_helper_1 = require("./extends/calendar-picker.helper");
var until = protractor_1.protractor.ExpectedConditions;
var util = new utils_1.Utils();
var assetsList = protractor_1.$$("[class='assetTreeNode adhocTreeNode ng-star-inserted']  > div > span");
var downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');
var assetNavList1 = {
    appNames: [testDetails_data_1.appName.assetExplorer, testDetails_data_1.appName.programNavigator, testDetails_data_1.appName.riskAssessment],
    parentSelector: "[ng-repeat=\"adhocNode in treeController.rootNodes\"]",
    parentClickable: "div > span.arrow-cursor.fa",
    childSelector: "div > a > span",
    childExpand: "div > span.fa",
    childNode: "[ng-repeat=\"adhocNode in node.children\"]",
};
var assetNavList2 = {
    appNames: [testDetails_data_1.appName.issuesManagement, testDetails_data_1.appName.performanceAnalyst],
    parentSelector: "[ng-repeat=\"assetNode in treeController.rootAssets\"]",
    parentClickable: "div.arrow-cursor > span.fa",
    childSelector: "div > a > span",
    childExpand: "div > span.fa",
    childNode: "[ng-repeat=\"assetNode in asset.children\"]",
};
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.prototype.waitForVisible = function (elem, ms) {
        if (ms === void 0) { ms = 30000; }
        protractor_1.browser.wait(until.visibilityOf(elem), ms);
    };
    Helper.prototype.waitForDisappear = function (elem, ms) {
        if (ms === void 0) { ms = 30000; }
        protractor_1.browser.wait(until.not(until.visibilityOf(elem)), ms);
    };
    Helper.prototype.waitTitleContains = function (param, ms) {
        if (ms === void 0) { ms = 30000; }
        protractor_1.browser.wait(until.titleContains(param), ms);
    };
    Helper.prototype.waitAndClick = function (elem, ms) {
        if (ms === void 0) { ms = 3000; }
        this.waitForVisible(elem, ms);
        elem.click();
    };
    Helper.prototype.waitForElementClickable = function (elem, ms) {
        if (ms === void 0) { ms = 20000; }
        protractor_1.browser.wait(until.elementToBeClickable(elem), ms);
    };
    Helper.prototype.waitForAlert = function (ms) {
        if (ms === void 0) { ms = 10000; }
        protractor_1.browser.wait(until.alertIsPresent(), ms);
    };
    Helper.prototype.waitForVisibleAndDisappear = function (elem, ms) {
        if (ms === void 0) { ms = 10000; }
        this.waitForVisible(elem, ms);
        this.waitForDisappear(elem, ms);
    };
    Helper.prototype.waitForVisibleAndMouseMove = function (elem, ms) {
        if (ms === void 0) { ms = 10000; }
        this.waitForVisible(elem, ms);
        protractor_1.browser.actions().mouseMove(elem).perform();
    };
    /**
     * Use to select a client from the asset navigator.
     * @param parentName - Client parent group the client is part of (eg: All Clients, Demo Clients, etc)
     * @param clientName - Client name to select
     */
    Helper.prototype.selectClient = function (parentName, clientName) {
        protractor_1.browser.sleep(1000);
        this.selectClientGroup(parentName);
        this.selectClientFromList(clientName);
        protractor_1.browser.sleep(1500);
    };
    /** @description - Selects and expands client group */
    Helper.prototype.selectClientGroup = function (parentName) {
        var clientToSelect = this.getParentClientsList(parentName);
        util.mouseMoveClickPerform(clientToSelect.$("div > fa-icon"));
    };
    /** @description - function used to get element from Client Parent group.  */
    Helper.prototype.getParentClientsList = function (parentName) {
        return protractor_1.$$(".assetTreeNode.adhocTreeNode.top-level").filter(function (parent, index) {
            return parent.$("div > span").getText().then(function (text) {
                return text === parentName;
            });
        }).first();
    };
    /** @description - selects client from list */
    Helper.prototype.selectClientFromList = function (clientName) {
        protractor_1.browser.sleep(3000);
        assetsList.filter(function (client) {
            return client.getText().then(function (text) {
                return text === clientName;
            });
        }).first().click();
    };
    Helper.prototype.getTextsfromArrayElement = function (arrElem) {
    };
    Helper.prototype.getElementByContainingTextAll = function (css, text) {
        return protractor_1.element.all(protractor_1.by.cssContainingText(css, text));
    };
    Helper.prototype.getElementByContainingText = function (css, text) {
        return protractor_1.element(protractor_1.by.cssContainingText(css, text));
    };
    Helper.prototype.selectFromListBoxOverlayByName = function (option) {
        protractor_1.$$("mat-option > span").filter(function (elem) {
            return elem.getText().then(function (text) {
                return text.trim() === option;
            });
        }).first().click();
    };
    Helper.prototype.clearAndSendKeys = function (elem, str) {
        elem.clear();
        protractor_1.browser.sleep(300);
        elem.sendKeys(str);
    };
    /**
     * Use to select a client from the asset navigator.
     * @param parentName - Client parent group the client is part of (eg: All Clients, Demo Clients, etc)
     * @param clientName - Client name to select
     */
    Helper.prototype.selectClientOLD = function (parentName, clientName) {
        protractor_1.browser.sleep(2000);
        this.selectClientGroupOLD(parentName);
        this.selectClientFromListOLD(clientName);
        protractor_1.browser.sleep(1500);
    };
    /** @description - Selects and expands client group */
    Helper.prototype.selectClientGroupOLD = function (parentName) {
        var clientToSelect = this.getParentClientsListOLD(parentName);
        util.mouseMoveClickPerform(clientToSelect.$("div.arrow-cursor > span.fa"));
    };
    /** @description - function used to get element from Client Parent group.  */
    Helper.prototype.getParentClientsListOLD = function (parentName) {
        var parentList = protractor_1.$$("[ng-repeat=\"assetNode in treeController.rootAssets\"]");
        this.waitForVisible(parentList.first());
        return parentList
            .filter(function (parent, index) {
            return parent.$("div> a > span").getText().then(function (text) {
                return text === parentName;
            });
        }).first();
    };
    /** @description - selects client from list */
    Helper.prototype.selectClientFromListOLD = function (clientName) {
        var assets = protractor_1.$$("[ng-repeat=\"assetNode in asset.children\"]  > div > a > span");
        protractor_1.browser.sleep(3000);
        assets.filter(function (client) {
            return client.getText().then(function (text) {
                return text === clientName;
            });
        }).first().click();
    };
    // ================ Asset Explorer ===========
    Helper.prototype.selectClientOLD2 = function (parentName, clientName) {
        protractor_1.browser.sleep(2000);
        this.selectClientGroupOLD2(parentName);
        this.selectClientFromListOLD2(clientName);
        protractor_1.browser.sleep(1500);
    };
    /** @description - Selects and expands client group */
    Helper.prototype.selectClientGroupOLD2 = function (parentName) {
        var clientToSelect = this.getParentClientsListOLD2(parentName);
        util.mouseMoveClickPerform(clientToSelect.$("div > span.arrow-cursor.fa"));
    };
    /** @description - selects client from list */
    Helper.prototype.selectClientFromListOLD2 = function (clientName) {
        var assets = protractor_1.$$("[ng-repeat=\"adhocNode in node.children\"]  > div > a > span");
        protractor_1.browser.sleep(3000);
        assets.filter(function (client) {
            return client.getText().then(function (text) {
                return text === clientName;
            });
        }).first().click();
    };
    Helper.prototype.getParentClientsListOLD2 = function (parentName) {
        var parentList = protractor_1.$$("[ng-repeat=\"adhocNode in treeController.rootNodes\"]");
        this.waitForVisible(parentList.first());
        return parentList
            .filter(function (parent, index) {
            return parent.$("div> a > span").getText().then(function (text) {
                return text === parentName;
            });
        }).first();
    };
    // ================ END of Asset Explorer ===========
    // ================ Main Navigator Helper ===========
    /**
     * Used to navigate through the asset navigator pane
     * @param parentName main Parent asset
     * @param clientName array of child asset until target  asset
     * @param appNameStr import appName in testDetails.data.ts
     */
    Helper.prototype.selectClientMain = function (parentName, clientName, appNameStr) {
        protractor_1.browser.sleep(3000);
        this.selectClientGroupMain(parentName, appNameStr);
        var targetClient = this.selectClientFromListMain(clientName, appNameStr);
        protractor_1.browser.sleep(1500);
        protractor_1.browser.waitForAngularEnabled();
        protractor_1.browser.sleep(1500);
        return targetClient;
    };
    /** @description - Selects and expands client group */
    Helper.prototype.selectClientGroupMain = function (parentName, appNameStr) {
        var clientToSelect = this.getParentClientsListMain(parentName, appNameStr);
        var selector = this.getNavListSelectors(appNameStr);
        util.mouseMoveClickPerform(clientToSelect.$(selector.parentClickable));
    };
    Helper.prototype.selectClientFromListMain = function (clientName, appNameStr) {
        var _this = this;
        var childArea = protractor_1.$$("[class=\"childArea\"]");
        var selector = this.getNavListSelectors(appNameStr);
        protractor_1.browser.sleep(1000);
        var targetClient;
        /** OLD Navigator implementation. Commenting this for reference */
        // for (let idx = 0; idx < clientName.length; idx++) {
        //   const childAsset = childArea.get(idx).$$(selector.childNode).filter((child) => {
        //     return child.$(selector.childSelector).getText().then((text) => {
        //       // return text.includes(clientName[idx]);
        //       // console.log(`Text: `, text);
        //       // console.log(`clientName: `, clientName[idx]);
        //       return text === clientName[idx];
        //     });
        //   }).first();
        //   browser.sleep(1500);
        //   if (idx < clientName.length - 1) {
        //     this.waitAndClick(childAsset.$(selector.childExpand), 8000);
        //     // childAsset.$(selector.childExpand).click();
        //   } else {
        //     targetClient = childAsset.$(selector.childSelector);
        //     this.waitAndClick(targetClient, 8000);
        //     // targetClient.click();
        //   }
        // }
        // New navigation using xpath for faster navigation
        var temp = selector.childNode;
        for (var idx = 0; idx < clientName.length; idx++) {
            protractor_1.browser.sleep(2000);
            var childAsset = childArea.get(idx).element(protractor_1.by.xpath("//div[@" + temp.slice(1, -1) + "]/div/a/span[(text()=\"" + clientName[idx] + "\")]/ancestor::div[@" + temp.slice(1, -1) + "][1]"));
            this.checkAlert().then(function (alert) {
                if (alert) {
                    _this.getAlert().accept();
                }
            });
            if (idx < clientName.length - 1) {
                this.waitAndClick(childAsset.$(selector.childExpand), 8000);
                // childAsset.$(selector.childExpand).click();
            }
            else {
                targetClient = childAsset.$(selector.childSelector);
                this.waitAndClick(targetClient, 8000);
                // targetClient.click();
            }
        }
        return targetClient;
    };
    Helper.prototype.getParentClientsListMain = function (parentName, appNameStr) {
        var selector = this.getNavListSelectors(appNameStr);
        var parentList = protractor_1.$$(selector.parentSelector);
        this.waitForVisible(parentList.first());
        return parentList
            .filter(function (parent, index) {
            return parent.$("div> a > span").getText().then(function (text) {
                return text === parentName;
            });
        }).first();
    };
    // ================ END of Main Navigator Helper ===========
    Helper.prototype.clickAndSleep = function (elem, ms) {
        if (ms === void 0) { ms = 1000; }
        elem.click();
        protractor_1.browser.sleep(ms);
    };
    Helper.prototype.getNavListSelectors = function (appNameStr) {
        var selector;
        if (assetNavList1.appNames.includes(appNameStr)) {
            selector = assetNavList1;
        }
        if (assetNavList2.appNames.includes(appNameStr)) {
            selector = assetNavList2;
        }
        return selector;
    };
    /**
     * check if File is downloaded
     * @param fileName - filename to check
     * @param ms - optional. Default is 20 seconds
     */
    Helper.prototype.checkDownloads = function (fileName, ms) {
        if (ms === void 0) { ms = 20000; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Getting download path ', downloadsPath);
                        filePath = (downloadsPath + '\\' + fileName);
                        console.log('Checking file: ', filePath);
                        return [4 /*yield*/, protractor_1.browser.wait(function () { return fs.existsSync(filePath); }, ms)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, fs.existsSync(filePath)];
                }
            });
        });
    };
    Helper.prototype.getAppFromMenu = function (appNameStr) {
        // return element.all(by.cssContainingText('.ACDisplayName.ng-binding', appName))
        return protractor_1.element.all(protractor_1.by.repeater('ac in navBarVM.appContexts'))
            .filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === appNameStr;
            });
        }).first();
    };
    Helper.prototype.selectAppFromMenu = function (appNameStr) {
        var homeMenuBtn = protractor_1.element(protractor_1.by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
        homeMenuBtn.click();
        protractor_1.browser.sleep(1000);
        var appToSelectElem = this.getAppFromMenu(appNameStr);
        appToSelectElem.click();
        protractor_1.browser.sleep(3000);
    };
    Helper.prototype.getTrueTitle = function (appNameStr) {
        var appNameSub = (appNameStr === testDetails_data_1.appName.performanceAnalyst) || (appNameStr === testDetails_data_1.appName.asset360)
            || (appNameStr === testDetails_data_1.appName.adaptivePlanning) || (appNameStr === testDetails_data_1.appName.airPermit)
            ? 'ASSET360' : appNameStr;
        appNameSub = appNameStr === testDetails_data_1.appName.arcFlash ? 'ArcFlash' : appNameSub;
        return appNameSub;
    };
    Helper.prototype.selectCalendarMonthYear = function (dateToSelect) {
        calendar_picker_helper_1.calendarHelper.selectCalendarMonthYear(dateToSelect);
    };
    Helper.prototype.selectCheckBox = function (elem, select) {
        elem.getAttribute('class').then(function (attr) {
            if (attr.includes('ng-empty') && select) {
                elem.click();
            }
            else if (attr.includes('ng-not-empty') && !select) {
                elem.click();
            }
        });
    };
    /**
     *
     * @param arr Should be an array
     * @param toRemove Should be an array
     */
    Helper.prototype.removeItemFromArrayByValue = function (arr, toRemove) {
        // return arr.filter(item => item !== value);
        return arr.filter(function (value) { return !toRemove.includes(value); });
    };
    /**
     * returns Date object
     * @param date 'YYYY-MM-YY'
     * @param time 'HH:MM:SS'
     */
    Helper.prototype.formatDateTime = function (date, time) {
        var d = new Date(date);
        var t = time.split(':');
        d.setHours(t[0], t[1]);
        return d;
    };
    Helper.prototype.formatDateTimeAddZero = function (dateTime, plusOne) {
        if (plusOne === void 0) { plusOne = true; }
        return plusOne ? (dateTime < 10 ? ('0' + (dateTime + 1)) : dateTime + 1)
            : (dateTime < 10 ? ('0' + (dateTime)) : dateTime);
    };
    Helper.prototype.formatDateTimeToAssert = function (dateTime) {
        return (dateTime.getMonth() + 1) + '/' + dateTime.getDate() + '/' + dateTime.getFullYear()
            + ', ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':00'
            + ' ' + (dateTime.getHours() >= 12 ? 'PM' : 'AM');
    };
    Helper.prototype.getAlertMsg = function () {
        return protractor_1.browser.switchTo().alert().then(function (alert) {
            return alert.getText().then(function (text) {
                return text;
            });
        });
    };
    Helper.prototype.getAlert = function () {
        return protractor_1.browser.switchTo().alert();
    };
    /**
     * returns the alert() object if present. Returns false if no alerts found
     */
    Helper.prototype.checkAlert = function () {
        return protractor_1.browser.driver.switchTo().alert()
            .catch(function (e) { return e.name === 'NoSuchAlertError' ? false : true; });
    };
    /**
     * this waits for Modal pop up to appear and returns the modal title as `Promise<string>`
     */
    Helper.prototype.getModalTitlePopUp = function () {
        this.waitForVisible(protractor_1.$(".modal-header"), 5000);
        return protractor_1.$("#modal-title").getText();
    };
    Helper.prototype.clickAndWaitForVisible = function (elemToClick, elemToWait, ms) {
        if (ms === void 0) { ms = 5000; }
        elemToClick.click();
        this.waitForVisible(elemToWait, ms);
    };
    Helper.prototype.getSelectedFromDropdown = function (dropDownList, optionElementSelector) {
        if (optionElementSelector === void 0) { optionElementSelector = "option"; }
        return dropDownList.$$(optionElementSelector).filter(function (option) { return option.isSelected(); });
    };
    Helper.prototype.getToastMessage = function () {
        var toastContainer = protractor_1.$(".toast-container");
        this.waitForVisible(toastContainer);
        var toastMessage = toastContainer.$(".toast-title").getText();
        this.closeToastMessage();
        return toastMessage;
    };
    Helper.prototype.closeToastMessage = function () {
        var toastContainer = protractor_1.$(".toast-container");
        this.waitForVisible(toastContainer);
        protractor_1.$(".toast-container button").click();
    };
    /**
     * Right clicks element
     * @param elemToClick
     */
    Helper.prototype.rightClickElement = function (elemToClick) {
        protractor_1.browser.actions().click(elemToClick, protractor_1.protractor.Button.RIGHT).perform();
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map