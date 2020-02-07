"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var monthYearTitle = protractor_1.$("[role=\"presentation\"] thead button.uib-title");
exports.calendarHelper = {
    selectCalendarMonthYear: function (dateToSelect) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        var year = dateToSelect.getFullYear();
        var month = months[dateToSelect.getMonth()];
        var day = dateToSelect.getDate();
        exports.calendarHelper.selectYear({ year: year, month: month });
        exports.calendarHelper.selectMonth(month);
        exports.calendarHelper.selectDay(day);
    },
    selectYear: function (date) {
        monthYearTitle.getText().then(function (text) {
            if (text.split(' ')[1] !== date.year.toString()) {
                monthYearTitle.click();
                protractor_1.browser.sleep(500);
                monthYearTitle.click();
                protractor_1.browser.sleep(500); // page is using the same element for calender header
                exports.calendarHelper.getCalendarElemByTxt(date.year.toString(), '1').click();
                protractor_1.browser.sleep(500);
                exports.calendarHelper.getCalendarElemByTxt(date.month, '2').click();
                protractor_1.browser.sleep(500);
                exports.calendarHelper.selectMonth(date.month);
            }
        });
    },
    selectMonth: function (month) {
        monthYearTitle.getText().then(function (text) {
            if (text.split(' ')[0] !== month) { // check if default is same as expected
                monthYearTitle.click();
                protractor_1.browser.sleep(500);
                exports.calendarHelper.getCalendarElemByTxt(month, '3').click();
                protractor_1.browser.sleep(500);
            }
        });
        protractor_1.browser.sleep(800);
    },
    selectDay: function (dayToSelect) {
        var day = dayToSelect < 10
            ? '0' + dayToSelect : dayToSelect;
        var days = protractor_1.element.all(protractor_1.by
            .xpath("//*[@ng-repeat='dt in row']/button/span[contains(text(),'" + day + "')]"));
        days.filter(function (dayNum) {
            return dayNum.getAttribute('class').then(function (attr) {
                return !attr.includes('text-muted');
            });
        }).first().click();
    },
    getCalendarElemByTxt: function (text, str) {
        var calendarTile = protractor_1.$$("[ng-click=\"select(dt.date)\"]");
        return calendarTile.filter(function (tile) {
            return tile.getText().then(function (toSelect) {
                return toSelect === text;
            });
        }).first();
    }
};
//# sourceMappingURL=calendar-picker.helper.js.map