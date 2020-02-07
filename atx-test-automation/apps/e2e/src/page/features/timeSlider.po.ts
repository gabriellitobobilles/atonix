import { browser, by, $$, $, element, ElementFinder, utils, ElementArrayFinder } from 'protractor';
import { Helper } from '../../helpers/helper';
import { protractor } from 'protractor/built/ptor';
import { ProgramNavigator } from '../programNavigator.po';


const helper = new Helper();

export class TimeSliderPage {

  calendarSliderBtn = $(`#calendarPopupButtonIndicator .fa-calendar`);
  calendarSliderPopUpBtn = $(`[ng-click="trVM.popupConfigurationIndicator.openStart($event)"]`);
  calendarSliderOKBtn = $(`#indicatorPopup [type="submit"]`);
  calendarSliderApplyBtn = $(`#indicatorPopup [ng-click="trVM.applyPopup()"]`);
  calendarSliderCancelBtn = $(`#indicatorPopup [ng-click="trVM.cancelPopup()"]`);
  progressBar = $(`.overlayContent .progress-bar`);
  sliderIndicator = $(`#navIndicatorHandle`);
  sliderDate = $(`#navIndicatorDate`);


  selectDateFromCalendar(date: Date) {
    this.calendarSliderBtn.click();
    this.calendarSliderPopUpBtn.click();
    helper.selectCalendarMonthYear(date);
    this.calendarSliderApplyBtn.click();
    this.calendarSliderOKBtn.click();
    browser.sleep(3000);
  }

  getSliderDateValue() {
    browser.actions().mouseMove(this.sliderIndicator).perform();
    return this.sliderDate.getText();
  }

}
