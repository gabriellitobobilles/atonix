"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var path = require("path");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * returns an array of window handle
     */
    Utils.prototype.getWindowHandles = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var winHandles;
            return tslib_1.__generator(this, function (_a) {
                winHandles = protractor_1.browser.getAllWindowHandles();
                return [2 /*return*/, winHandles];
            });
        });
    };
    Utils.prototype.textIncludes = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var textToCompare;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, param];
                    case 1:
                        textToCompare = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description - Use this fn to click an item in the asset navigator since simple .click() doesn't work
     * @param elem - elementQuery || protractor element object
     */
    Utils.prototype.mouseMoveClickPerform = function (elem) {
        protractor_1.browser.actions().mouseMove(elem).click().perform();
    };
    Utils.prototype.doubleClick = function (elem) {
        protractor_1.browser.actions().mouseMove(elem).doubleClick().perform();
    };
    Utils.prototype.switchToIframe = function (iFrameID) {
        protractor_1.browser.switchTo().frame(iFrameID.getWebElement());
    };
    Utils.prototype.switchToMainFrame = function () {
        protractor_1.browser.switchTo().defaultContent();
    };
    Utils.prototype.fileUpload = function (elem, filePath) {
        var absolutePath = path.resolve(filePath);
        elem.sendKeys(absolutePath);
    };
    Utils.prototype.getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    Utils.prototype.getRandomElementFromArray = function (elemArr) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var randomNum, _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = Math).floor;
                        _c = Math.random();
                        return [4 /*yield*/, elemArr.count()];
                    case 1:
                        randomNum = _b.apply(_a, [_c * (_d.sent())]);
                        return [2 /*return*/, elemArr.get(randomNum)];
                }
            });
        });
    };
    /**
     * Returns an array of randomized value from an array
     * @param arr - array
     * @param count - number of random items
     */
    Utils.prototype.getRandomFromArrayMultiple = function (arr, count) {
        if (count === void 0) { count = 1; }
        var temp = [];
        var arrTemp = arr;
        for (var index = 0; index < count; index++) {
            temp.push(arrTemp[Math.floor(Math.random() * arrTemp.length)]);
            arrTemp = arrTemp.filter(function (value) { return !temp.includes(value); });
        }
        return temp;
    };
    Utils.prototype.scrollToView = function (elem) {
        protractor_1.browser.executeScript('arguments[0].scrollIntoView(true)', elem.getWebElement());
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map