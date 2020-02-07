import { browser, by, $, $$, element, ElementFinder, protractor } from 'protractor';

const monthYearTitle = $(`[role="presentation"] thead button.uib-title`);

export const calendarHelper = {

  selectCalendarMonthYear: (dateToSelect: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    const year = dateToSelect.getFullYear();
    const month = months[dateToSelect.getMonth()];
    const day = dateToSelect.getDate();

    calendarHelper.selectYear({ year, month });
    calendarHelper.selectMonth(month);
    calendarHelper.selectDay(day);
  },

  selectYear: (date) => {
    monthYearTitle.getText().then(text => {
      if (text.split(' ')[1] !== date.year.toString()) {
        monthYearTitle.click(); browser.sleep(500);
        monthYearTitle.click(); browser.sleep(500); // page is using the same element for calender header
        calendarHelper.getCalendarElemByTxt(date.year.toString(), '1').click(); browser.sleep(500);
        calendarHelper.getCalendarElemByTxt(date.month, '2').click(); browser.sleep(500);
        calendarHelper.selectMonth(date.month);
      }
    });
  },

  selectMonth(month) {
    monthYearTitle.getText().then(text => {
      if (text.split(' ')[0] !== month) { // check if default is same as expected
        monthYearTitle.click(); browser.sleep(500);
        calendarHelper.getCalendarElemByTxt(month, '3').click(); browser.sleep(500);
      }
    });
    browser.sleep(800);
  },

  selectDay(dayToSelect) {
    const day = dayToSelect < 10
      ? '0' + dayToSelect : dayToSelect;

    const days = element.all(by
      .xpath(`//*[@ng-repeat=\'dt in row\']/button/span[contains(text(),\'${day}\')]`));

    days.filter(dayNum => {
      return dayNum.getAttribute('class').then(attr => {
        return !attr.includes('text-muted');
      });
    }).first().click();
  },

  getCalendarElemByTxt(text: string, str: string) {
    const calendarTile = $$(`[ng-click="select(dt.date)"]`);
    return calendarTile.filter(tile => {
      return tile.getText().then(toSelect => {
        return toSelect === text;
      });
    }).first();
  }

};
