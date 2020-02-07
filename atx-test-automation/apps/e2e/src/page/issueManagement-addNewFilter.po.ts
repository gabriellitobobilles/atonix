import { browser, by, $, $$, element, ElementFinder, protractor } from 'protractor';
import { Utils } from '../helpers/utils';
import { Helper } from '../helpers/helper';
import { elementType } from '../helpers/testDetails.data';

const util = new Utils();
const helper = new Helper();


export class AddNewFilterForm {

  addNewFilterBtn = $(`div.filterAdd a[ng-click="issuesVM.addFilter()"]`);
  monthYearTitle = $(`[role="presentation"] thead button.uib-title`);

  filterForm = {
    id: { name: 'id', type: elementType.textField },
    title: { name: 'title', type: elementType.textField },
    impactCostLow: { name: 'impactCostLow', type: elementType.textField },
    impactCostHigh: { name: 'impactCostHigh', type: elementType.textField },
    activityStatus: { name: 'activityStatus', type: elementType.listBox },
    resolutionStatus: { name: 'resolutionStatus', type: elementType.listBox },
    startDate: { name: 'startDate', type: elementType.textField },
    endDate: { name: 'endDate', type: elementType.textField },
    changedBy: { name: 'changedBy', type: elementType.textField },
    changeStartDate: { name: 'changeStartDate', type: elementType.textField },
    changeEndDate: { name: 'changeEndDate', type: elementType.textField },
    closeStartDate: { name: 'closeStartDate', type: elementType.textField },
    closeEndDate: { name: 'closeEndDate', type: elementType.textField },
    assignedTo: { name: 'assignedTo', type: elementType.textField },
    keyword: { name: 'keyword', type: elementType.textField },
    openDurationLow: { name: 'openDurationLow', type: elementType.textField },
    openDurationHigh: { name: 'openDurationHigh', type: elementType.textField },
    priority: { name: 'priority', type: elementType.textField },
    scorecard: { name: 'scorecard', type: elementType.dropDown },
    issueCategoryType: { name: 'issueCategoryType', type: elementType.listBox },
    issueTypeID: { name: 'issueTypeID', type: elementType.listBox },
  };

  saveBtn = $(`[ng-click="issuesVM.saveFilter()"]`);
  cancelBtn = $(`[ng-click="issuesVM.cancelFilter()"]`);

  addNewFilter(filterObj: any) {
    browser.sleep(1000);
    helper.waitAndClick(this.addNewFilterBtn, 5000);
    helper.waitForVisible($(`.filterEditor.panel`));

    Object.keys(filterObj).forEach(key => {
      console.log(`key:::`, key);
      console.log(`this.filterForm[key]`, this.filterForm[key]);
      if (this.filterForm[key].type === elementType.textField) {
        helper.clearAndSendKeys(this.getFilterFieldElem(this.filterForm[key].name), filterObj[key]);
      } else if (this.filterForm[key].type === elementType.listBox) {
        browser.actions().keyDown(protractor.Key.CONTROL).perform();
        filterObj[key].forEach(item => {
          this.getFilterFieldElem(this.filterForm[key].name)
            .$(`[label="${item}"]`).isPresent().then((isPresent) => {
              isPresent ? this.selectMultiple(this.getFilterFieldElem(this.filterForm[key].name).$(`[label="${item}"]`))
                : this.selectMultiple(this.getFilterFieldElem(this.filterForm[key].name).$(`[value="${item}"]`));
            });
          browser.sleep(1500);
        });
        browser.actions().keyUp(protractor.Key.CONTROL).perform();
      } else if (this.filterForm[key].type === elementType.dropDown) {
        this.getFilterFieldElem(this.filterForm[key].name).$(`[value="${filterObj[key]}"]`).click();
      }
    });
    // browser.sleep(20000);
    this.saveBtn.click();
    browser.sleep(2000);
  }

  getFilterFieldElem(filterStr: string) {
    return $(`[ng-model="issuesVM.tempFilterParameters.${filterStr}"]`);
  }

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

  selectMultiple(elem: ElementFinder) {
    browser.actions()
      .mouseMove(elem)
      .click()
      .perform();
  }

  selectFullDateFromCalendar(date: Date, dateCalendarElem: string) {
    // use this to select specific date in the calender.
    // helper.waitForVisible($(`.filterEditor.panel`));
    this.getCalendarButton(dateCalendarElem).click();
    // this.selectCalendarMonthYear(date);
    helper.selectCalendarMonthYear(date);
    browser.sleep(800);
  }

  selectCalendarMonthYear(dateToSelect: Date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    const year = dateToSelect.getFullYear();
    const month = months[dateToSelect.getMonth()];
    const day = dateToSelect.getDate();

    this.selectYear({ year, month });
    this.selectMonth(month);
    this.selectDay(day);
  }

  private selectYear(date) {
    this.monthYearTitle.getText().then(text => {
      if (text.split(' ')[1] !== date.year.toString()) {
        this.monthYearTitle.click(); browser.sleep(500);
        this.monthYearTitle.click(); browser.sleep(500); // page is using the same element for calender header
        this.getCalendarElemByTxt(date.year.toString(), '1').click(); browser.sleep(500);
        this.getCalendarElemByTxt(date.month, '2').click(); browser.sleep(500);
        this.selectMonth(date.month);
      }
    });
  }

  private selectMonth(month) {
    this.monthYearTitle.getText().then(text => {
      if (text.split(' ')[0] !== month) { // check if default is same as expected
        this.monthYearTitle.click(); browser.sleep(500);
        this.getCalendarElemByTxt(month, '3').click(); browser.sleep(500);
      }
    });
    browser.sleep(800);
  }

  private selectDay(dayToSelect) {
    const day = dayToSelect < 10
      ? '0' + dayToSelect : dayToSelect;

    const days = element.all(by
      .xpath(`//*[@ng-repeat=\'dt in row\']/button/span[contains(text(),\'${day}\')]`));

    days.filter(dayNum => {
      return dayNum.getAttribute('class').then(attr => {
        return !attr.includes('text-muted');
      });
    }).first().click();
  }

  getCalendarElemByTxt(text: string, str: string) {
    const calendarTile = $$(`[ng-click="select(dt.date)"]`);
    return calendarTile.filter(tile => {
      return tile.getText().then(toSelect => {
        return toSelect === text;
      });
    }).first();
  }

  private getCalendarButton(dateCalendar: string) {
    return $(`[ng-click="issuesVM.showDatePicker($event,'${dateCalendar}')"]`);
  }
}
