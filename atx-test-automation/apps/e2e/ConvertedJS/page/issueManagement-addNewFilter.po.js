"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var utils_1 = require("../helpers/utils");
var helper_1 = require("../helpers/helper");
var testDetails_data_1 = require("../helpers/testDetails.data");
var util = new utils_1.Utils();
var helper = new helper_1.Helper();
var AddNewFilterForm = /** @class */ (function () {
    function AddNewFilterForm() {
        this.addNewFilterBtn = protractor_1.$("div.filterAdd a[ng-click=\"issuesVM.addFilter()\"]");
        this.monthYearTitle = protractor_1.$("[role=\"presentation\"] thead button.uib-title");
        this.filterForm = {
            id: { name: 'id', type: testDetails_data_1.elementType.textField },
            title: { name: 'title', type: testDetails_data_1.elementType.textField },
            impactCostLow: { name: 'impactCostLow', type: testDetails_data_1.elementType.textField },
            impactCostHigh: { name: 'impactCostHigh', type: testDetails_data_1.elementType.textField },
            activityStatus: { name: 'activityStatus', type: testDetails_data_1.elementType.listBox },
            resolutionStatus: { name: 'resolutionStatus', type: testDetails_data_1.elementType.listBox },
            startDate: { name: 'startDate', type: testDetails_data_1.elementType.textField },
            endDate: { name: 'endDate', type: testDetails_data_1.elementType.textField },
            changedBy: { name: 'changedBy', type: testDetails_data_1.elementType.textField },
            changeStartDate: { name: 'changeStartDate', type: testDetails_data_1.elementType.textField },
            changeEndDate: { name: 'changeEndDate', type: testDetails_data_1.elementType.textField },
            closeStartDate: { name: 'closeStartDate', type: testDetails_data_1.elementType.textField },
            closeEndDate: { name: 'closeEndDate', type: testDetails_data_1.elementType.textField },
            assignedTo: { name: 'assignedTo', type: testDetails_data_1.elementType.textField },
            keyword: { name: 'keyword', type: testDetails_data_1.elementType.textField },
            openDurationLow: { name: 'openDurationLow', type: testDetails_data_1.elementType.textField },
            openDurationHigh: { name: 'openDurationHigh', type: testDetails_data_1.elementType.textField },
            priority: { name: 'priority', type: testDetails_data_1.elementType.textField },
            scorecard: { name: 'scorecard', type: testDetails_data_1.elementType.dropDown },
            issueCategoryType: { name: 'issueCategoryType', type: testDetails_data_1.elementType.listBox },
            issueTypeID: { name: 'issueTypeID', type: testDetails_data_1.elementType.listBox },
        };
        this.saveBtn = protractor_1.$("[ng-click=\"issuesVM.saveFilter()\"]");
        this.cancelBtn = protractor_1.$("[ng-click=\"issuesVM.cancelFilter()\"]");
    }
    AddNewFilterForm.prototype.addNewFilter = function (filterObj) {
        var _this = this;
        protractor_1.browser.sleep(1000);
        helper.waitAndClick(this.addNewFilterBtn, 5000);
        helper.waitForVisible(protractor_1.$(".filterEditor.panel"));
        Object.keys(filterObj).forEach(function (key) {
            console.log("key:::", key);
            console.log("this.filterForm[key]", _this.filterForm[key]);
            if (_this.filterForm[key].type === testDetails_data_1.elementType.textField) {
                helper.clearAndSendKeys(_this.getFilterFieldElem(_this.filterForm[key].name), filterObj[key]);
            }
            else if (_this.filterForm[key].type === testDetails_data_1.elementType.listBox) {
                protractor_1.browser.actions().keyDown(protractor_1.protractor.Key.CONTROL).perform();
                filterObj[key].forEach(function (item) {
                    _this.getFilterFieldElem(_this.filterForm[key].name)
                        .$("[label=\"" + item + "\"]").isPresent().then(function (isPresent) {
                        isPresent ? _this.selectMultiple(_this.getFilterFieldElem(_this.filterForm[key].name).$("[label=\"" + item + "\"]"))
                            : _this.selectMultiple(_this.getFilterFieldElem(_this.filterForm[key].name).$("[value=\"" + item + "\"]"));
                    });
                    protractor_1.browser.sleep(1500);
                });
                protractor_1.browser.actions().keyUp(protractor_1.protractor.Key.CONTROL).perform();
            }
            else if (_this.filterForm[key].type === testDetails_data_1.elementType.dropDown) {
                _this.getFilterFieldElem(_this.filterForm[key].name).$("[value=\"" + filterObj[key] + "\"]").click();
            }
        });
        // browser.sleep(20000);
        this.saveBtn.click();
        protractor_1.browser.sleep(2000);
    };
    AddNewFilterForm.prototype.getFilterFieldElem = function (filterStr) {
        return protractor_1.$("[ng-model=\"issuesVM.tempFilterParameters." + filterStr + "\"]");
    };
    // addNewFilter(filterObj: any) {
    //   browser.sleep(1000);
    //   helper.waitAndClick(this.addNewFilterBtn, 5000);
    //   // this.addNewFilterBtn.click();
    //   helper.waitForVisible($(`.filterEditor.panel`));
    //   Object.keys(filterObj).forEach(key => {
    //     if (key.endsWith('Txt')) {
    //       helper.clearAndSendKeys(this.filterForm[key], filterObj[key]);
    //     } else if (key.endsWith('List')) {
    //       browser.actions().keyDown(protractor.Key.CONTROL).perform();
    //       filterObj[key].forEach(item => {
    //         this.selectMultiple(this.filterForm[key].$(`[label="${item}"]`));
    //         browser.sleep(1500);
    //       });
    //       browser.actions().keyUp(protractor.Key.CONTROL).perform();
    //     }
    //   });
    //   this.saveBtn.click();
    //   browser.sleep(2000);
    // }
    AddNewFilterForm.prototype.selectMultiple = function (elem) {
        protractor_1.browser.actions()
            .mouseMove(elem)
            .click()
            .perform();
    };
    AddNewFilterForm.prototype.selectFullDateFromCalendar = function (date, dateCalendarElem) {
        // use this to select specific date in the calender.
        // helper.waitForVisible($(`.filterEditor.panel`));
        this.getCalendarButton(dateCalendarElem).click();
        // this.selectCalendarMonthYear(date);
        helper.selectCalendarMonthYear(date);
        protractor_1.browser.sleep(800);
    };
    AddNewFilterForm.prototype.selectCalendarMonthYear = function (dateToSelect) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        var year = dateToSelect.getFullYear();
        var month = months[dateToSelect.getMonth()];
        var day = dateToSelect.getDate();
        this.selectYear({ year: year, month: month });
        this.selectMonth(month);
        this.selectDay(day);
    };
    AddNewFilterForm.prototype.selectYear = function (date) {
        var _this = this;
        this.monthYearTitle.getText().then(function (text) {
            if (text.split(' ')[1] !== date.year.toString()) {
                _this.monthYearTitle.click();
                protractor_1.browser.sleep(500);
                _this.monthYearTitle.click();
                protractor_1.browser.sleep(500); // page is using the same element for calender header
                _this.getCalendarElemByTxt(date.year.toString(), '1').click();
                protractor_1.browser.sleep(500);
                _this.getCalendarElemByTxt(date.month, '2').click();
                protractor_1.browser.sleep(500);
                _this.selectMonth(date.month);
            }
        });
    };
    AddNewFilterForm.prototype.selectMonth = function (month) {
        var _this = this;
        this.monthYearTitle.getText().then(function (text) {
            if (text.split(' ')[0] !== month) { // check if default is same as expected
                _this.monthYearTitle.click();
                protractor_1.browser.sleep(500);
                _this.getCalendarElemByTxt(month, '3').click();
                protractor_1.browser.sleep(500);
            }
        });
        protractor_1.browser.sleep(800);
    };
    AddNewFilterForm.prototype.selectDay = function (dayToSelect) {
        var day = dayToSelect < 10
            ? '0' + dayToSelect : dayToSelect;
        var days = protractor_1.element.all(protractor_1.by
            .xpath("//*[@ng-repeat='dt in row']/button/span[contains(text(),'" + day + "')]"));
        days.filter(function (dayNum) {
            return dayNum.getAttribute('class').then(function (attr) {
                return !attr.includes('text-muted');
            });
        }).first().click();
    };
    AddNewFilterForm.prototype.getCalendarElemByTxt = function (text, str) {
        var calendarTile = protractor_1.$$("[ng-click=\"select(dt.date)\"]");
        return calendarTile.filter(function (tile) {
            return tile.getText().then(function (toSelect) {
                return toSelect === text;
            });
        }).first();
    };
    AddNewFilterForm.prototype.getCalendarButton = function (dateCalendar) {
        return protractor_1.$("[ng-click=\"issuesVM.showDatePicker($event,'" + dateCalendar + "')\"]");
    };
    return AddNewFilterForm;
}());
exports.AddNewFilterForm = AddNewFilterForm;
//# sourceMappingURL=issueManagement-addNewFilter.po.js.map