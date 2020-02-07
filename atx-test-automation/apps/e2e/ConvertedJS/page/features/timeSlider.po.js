"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var helper_1 = require("../../helpers/helper");
var helper = new helper_1.Helper();
var TimeSliderPage = /** @class */ (function () {
    function TimeSliderPage() {
        this.calendarSliderBtn = protractor_1.$("#calendarPopupButtonIndicator .fa-calendar");
        this.calendarSliderPopUpBtn = protractor_1.$("[ng-click=\"trVM.popupConfigurationIndicator.openStart($event)\"]");
        this.calendarSliderOKBtn = protractor_1.$("#indicatorPopup [type=\"submit\"]");
        this.calendarSliderApplyBtn = protractor_1.$("#indicatorPopup [ng-click=\"trVM.applyPopup()\"]");
        this.calendarSliderCancelBtn = protractor_1.$("#indicatorPopup [ng-click=\"trVM.cancelPopup()\"]");
        this.progressBar = protractor_1.$(".overlayContent .progress-bar");
        this.sliderIndicator = protractor_1.$("#navIndicatorHandle");
        this.sliderDate = protractor_1.$("#navIndicatorDate");
    }
    TimeSliderPage.prototype.selectDateFromCalendar = function (date) {
        this.calendarSliderBtn.click();
        this.calendarSliderPopUpBtn.click();
        helper.selectCalendarMonthYear(date);
        this.calendarSliderApplyBtn.click();
        this.calendarSliderOKBtn.click();
        protractor_1.browser.sleep(3000);
    };
    TimeSliderPage.prototype.getSliderDateValue = function () {
        protractor_1.browser.actions().mouseMove(this.sliderIndicator).perform();
        return this.sliderDate.getText();
    };
    return TimeSliderPage;
}());
exports.TimeSliderPage = TimeSliderPage;
//# sourceMappingURL=timeSlider.po.js.map