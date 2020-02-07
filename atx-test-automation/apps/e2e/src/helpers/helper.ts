
import { browser, protractor, element, by, $$, $, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../helpers/utils';
import { appName } from './testDetails.data';
import * as path from 'path';
import * as fs from 'fs';
import { calendarHelper } from './extends/calendar-picker.helper';

const until = protractor.ExpectedConditions;
const util = new Utils();

const assetsList = $$(`[class='assetTreeNode adhocTreeNode ng-star-inserted']  > div > span`);
const downloadsPath = path.resolve(__dirname, '../../src/test_Data/DownloadFiles');

const assetNavList1 = {
  appNames: [appName.assetExplorer, appName.programNavigator, appName.riskAssessment],
  parentSelector: `[ng-repeat="adhocNode in treeController.rootNodes"]`,
  parentClickable: `div > span.arrow-cursor.fa`,
  childSelector: `div > a > span`,
  childExpand: `div > span.fa`,
  childNode: `[ng-repeat="adhocNode in node.children"]`,
};

const assetNavList2 = {
  appNames: [appName.issuesManagement, appName.performanceAnalyst],
  parentSelector: `[ng-repeat="assetNode in treeController.rootAssets"]`,
  parentClickable: `div.arrow-cursor > span.fa`,
  childSelector: `div > a > span`,
  childExpand: `div > span.fa`,
  childNode: `[ng-repeat="assetNode in asset.children"]`,
};

export class Helper {
  waitForVisible(elem: ElementFinder, ms = 30000) {
    browser.wait(until.visibilityOf(elem), ms);
  }
  waitForDisappear(elem: ElementFinder, ms = 30000) {
    browser.wait(until.not(until.visibilityOf(elem)), ms);
  }
  waitTitleContains(param: any, ms = 30000) {
    browser.wait(until.titleContains(param), ms);
  }
  waitAndClick(elem: ElementFinder, ms = 3000) {
    this.waitForVisible(elem, ms);
    elem.click();
  }
  waitForElementClickable(elem: ElementFinder, ms = 20000) {
    browser.wait(until.elementToBeClickable(elem), ms);
  }
  waitForAlert(ms = 10000) {
    browser.wait(until.alertIsPresent(), ms);
  }
  waitForVisibleAndDisappear(elem: ElementFinder, ms = 10000) {
    this.waitForVisible(elem, ms);
    this.waitForDisappear(elem, ms);
  }
  waitForVisibleAndMouseMove(elem: ElementFinder, ms = 10000) {
    this.waitForVisible(elem, ms);
    browser.actions().mouseMove(elem).perform();
  }
  /**
   * Use to select a client from the asset navigator.
   * @param parentName - Client parent group the client is part of (eg: All Clients, Demo Clients, etc)
   * @param clientName - Client name to select
   */
  selectClient(parentName: string, clientName: string) {
    browser.sleep(1000);
    this.selectClientGroup(parentName);
    this.selectClientFromList(clientName);
    browser.sleep(1500);
  }
  /** @description - Selects and expands client group */
  selectClientGroup(parentName: string) {
    const clientToSelect = this.getParentClientsList(parentName);
    util.mouseMoveClickPerform(clientToSelect.$(`div > fa-icon`));
  }
  /** @description - function used to get element from Client Parent group.  */
  getParentClientsList(parentName: string) {
    return $$(`.assetTreeNode.adhocTreeNode.top-level`).filter(function (parent, index) {
      return parent.$(`div > span`).getText().then(function (text) {
        return text === parentName;
      });
    }).first();
  }
  /** @description - selects client from list */
  selectClientFromList(clientName: string) {
    browser.sleep(3000);
    assetsList.filter(function (client) {
      return client.getText().then(function (text) {
        return text === clientName;
      });
    }).first().click();
  }

  getTextsfromArrayElement(arrElem: any) {

  }

  getElementByContainingTextAll(css: string, text: string) {
    return element.all(by.cssContainingText(css, text));
  }
  getElementByContainingText(css: string, text: string) {
    return element(by.cssContainingText(css, text));
  }

  selectFromListBoxOverlayByName(option: string) {
    $$(`mat-option > span`).filter(function (elem) {
      return elem.getText().then(function (text) {
        return text.trim() === option;
      });
    }).first().click();
  }

  clearAndSendKeys(elem: ElementFinder, str: string) {
    elem.clear();
    browser.sleep(300);
    elem.sendKeys(str);
  }

  /**
   * Use to select a client from the asset navigator.
   * @param parentName - Client parent group the client is part of (eg: All Clients, Demo Clients, etc)
   * @param clientName - Client name to select
   */
  selectClientOLD(parentName: string, clientName: string) {
    browser.sleep(2000);
    this.selectClientGroupOLD(parentName);
    this.selectClientFromListOLD(clientName);
    browser.sleep(1500);
  }

  /** @description - Selects and expands client group */
  selectClientGroupOLD(parentName: string) {
    const clientToSelect = this.getParentClientsListOLD(parentName);
    util.mouseMoveClickPerform(clientToSelect.$(`div.arrow-cursor > span.fa`));
  }

  /** @description - function used to get element from Client Parent group.  */
  getParentClientsListOLD(parentName: string) {
    const parentList = $$(`[ng-repeat="assetNode in treeController.rootAssets"]`);

    this.waitForVisible(parentList.first());
    return parentList
      .filter(function (parent, index) {
        return parent.$(`div> a > span`).getText().then(function (text) {
          return text === parentName;
        });
      }).first();
  }

  /** @description - selects client from list */
  selectClientFromListOLD(clientName: string) {
    const assets = $$(`[ng-repeat="assetNode in asset.children"]  > div > a > span`);
    browser.sleep(3000);
    assets.filter(function (client) {
      return client.getText().then(function (text) {
        return text === clientName;
      });
    }).first().click();
  }

  // ================ Asset Explorer ===========
  selectClientOLD2(parentName: string, clientName: string) {
    browser.sleep(2000);
    this.selectClientGroupOLD2(parentName);
    this.selectClientFromListOLD2(clientName);
    browser.sleep(1500);
  }

  /** @description - Selects and expands client group */
  selectClientGroupOLD2(parentName: string) {
    const clientToSelect = this.getParentClientsListOLD2(parentName);
    util.mouseMoveClickPerform(clientToSelect.$(`div > span.arrow-cursor.fa`));
  }

  /** @description - selects client from list */
  selectClientFromListOLD2(clientName: string) {
    const assets = $$(`[ng-repeat="adhocNode in node.children"]  > div > a > span`);
    browser.sleep(3000);
    assets.filter(function (client) {
      return client.getText().then(function (text) {
        return text === clientName;
      });
    }).first().click();
  }

  getParentClientsListOLD2(parentName: string) {
    const parentList = $$(`[ng-repeat="adhocNode in treeController.rootNodes"]`);
    this.waitForVisible(parentList.first());
    return parentList
      .filter(function (parent, index) {
        return parent.$(`div> a > span`).getText().then(function (text) {
          return text === parentName;
        });
      }).first();
  }
  // ================ END of Asset Explorer ===========

  // ================ Main Navigator Helper ===========
  /**
   * Used to navigate through the asset navigator pane
   * @param parentName main Parent asset
   * @param clientName array of child asset until target  asset
   * @param appNameStr import appName in testDetails.data.ts
   */
  selectClientMain(parentName: string, clientName: string[], appNameStr: appName): ElementFinder {
    browser.sleep(3000);
    this.selectClientGroupMain(parentName, appNameStr);
    const targetClient = this.selectClientFromListMain(clientName, appNameStr);
    browser.sleep(1500);
    browser.waitForAngularEnabled();
    browser.sleep(1500);
    return targetClient;
  }

  /** @description - Selects and expands client group */
  selectClientGroupMain(parentName: string, appNameStr: appName) {
    const clientToSelect = this.getParentClientsListMain(parentName, appNameStr);
    const selector = this.getNavListSelectors(appNameStr);

    util.mouseMoveClickPerform(clientToSelect.$(selector.parentClickable));
  }

  selectClientFromListMain(clientName: string[], appNameStr: appName): ElementFinder {
    const childArea = $$(`[class="childArea"]`);
    const selector = this.getNavListSelectors(appNameStr);
    browser.sleep(1000);
    let targetClient: ElementFinder;
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
    const temp = selector.childNode;
    for (let idx = 0; idx < clientName.length; idx++) {
      browser.sleep(2000);
      const childAsset = childArea.get(idx).element(by.xpath(
        `//div[@${temp.slice(1, -1)}]/div/a/span[(text()="${clientName[idx]}")]/ancestor::div[@${temp.slice(1, -1)}][1]`));

      this.checkAlert().then(alert => {
        if (alert) { this.getAlert().accept(); }
      });

      if (idx < clientName.length - 1) {
        this.waitAndClick(childAsset.$(selector.childExpand), 8000);
        // childAsset.$(selector.childExpand).click();
      } else {
        targetClient = childAsset.$(selector.childSelector);
        this.waitAndClick(targetClient, 8000);
        // targetClient.click();
      }
    }
    return targetClient;
  }

  getParentClientsListMain(parentName: string, appNameStr: appName) {
    const selector = this.getNavListSelectors(appNameStr);
    const parentList = $$(selector.parentSelector);
    this.waitForVisible(parentList.first());
    return parentList
      .filter((parent, index) => {
        return parent.$(`div> a > span`).getText().then((text) => {
          return text === parentName;
        });
      }).first();
  }
  // ================ END of Main Navigator Helper ===========
  clickAndSleep(elem: ElementFinder, ms = 1000) {
    elem.click(); browser.sleep(ms);
  }

  private getNavListSelectors(appNameStr: appName) {
    let selector;
    if (assetNavList1.appNames.includes(appNameStr)) {
      selector = assetNavList1;
    }
    if (assetNavList2.appNames.includes(appNameStr)) {
      selector = assetNavList2;
    }

    return selector;
  }

  /**
   * check if File is downloaded
   * @param fileName - filename to check
   * @param ms - optional. Default is 20 seconds
   */
  async checkDownloads(fileName: string, ms = 20000) {
    console.log('Getting download path ', downloadsPath);
    const filePath = (downloadsPath + '\\' + fileName);
    console.log('Checking file: ', filePath);
    await browser.wait(() => fs.existsSync(filePath), ms);
    return fs.existsSync(filePath);
  }

  public getAppFromMenu(appNameStr: string) {
    // return element.all(by.cssContainingText('.ACDisplayName.ng-binding', appName))
    return element.all(by.repeater('ac in navBarVM.appContexts'))
      .filter((elem) => {
        return elem.getText().then((text) => {
          return text === appNameStr;
        });
      }).first();
  }

  public selectAppFromMenu(appNameStr: string) {
    const homeMenuBtn = element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
    homeMenuBtn.click();
    browser.sleep(1000);

    const appToSelectElem = this.getAppFromMenu(appNameStr);
    appToSelectElem.click();

    browser.sleep(3000);
  }

  getTrueTitle(appNameStr: string) {
    let appNameSub = (appNameStr === appName.performanceAnalyst) || (appNameStr === appName.asset360)
      || (appNameStr === appName.adaptivePlanning) || (appNameStr === appName.airPermit)
      ? 'ASSET360' : appNameStr;

    appNameSub = appNameStr === appName.arcFlash ? 'ArcFlash' : appNameSub;

    return appNameSub;
  }

  selectCalendarMonthYear(dateToSelect: Date) {
    calendarHelper.selectCalendarMonthYear(dateToSelect);
  }

  selectCheckBox(elem: ElementFinder, select: boolean) {
    elem.getAttribute('class').then(attr => {
      if (attr.includes('ng-empty') && select) {
        elem.click();
      } else if (attr.includes('ng-not-empty') && !select) {
        elem.click();
      }
    });
  }
  /**
   *
   * @param arr Should be an array
   * @param toRemove Should be an array
   */
  removeItemFromArrayByValue(arr: any, toRemove: any) {
    // return arr.filter(item => item !== value);
    return arr.filter(value => !toRemove.includes(value));
  }

  /**
   * returns Date object
   * @param date 'YYYY-MM-YY'
   * @param time 'HH:MM:SS'
   */
  formatDateTime(date, time) {
    const d = new Date(date);
    const t = time.split(':');
    d.setHours(t[0], t[1]);
    return d;
  }

  formatDateTimeAddZero(dateTime, plusOne = true) {
    return plusOne ? (dateTime < 10 ? ('0' + (dateTime + 1)) : dateTime + 1)
      : (dateTime < 10 ? ('0' + (dateTime)) : dateTime);
  }

  formatDateTimeToAssert(dateTime: Date) {
    return (dateTime.getMonth() + 1) + '/' + dateTime.getDate() + '/' + dateTime.getFullYear()
      + ', ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':00'
      + ' ' + (dateTime.getHours() >= 12 ? 'PM' : 'AM');
  }

  getAlertMsg() {
    return browser.switchTo().alert().then((alert) => {
      return alert.getText().then(text => {
        return text;
      });
    });
  }
  getAlert() {
    return browser.switchTo().alert();
  }
  /**
   * returns the alert() object if present. Returns false if no alerts found
   */
  checkAlert() {
    return browser.driver.switchTo().alert()
      .catch(e => e.name === 'NoSuchAlertError' ? false : true);
  }
  /**
   * this waits for Modal pop up to appear and returns the modal title as `Promise<string>`
   */
  getModalTitlePopUp() {
    this.waitForVisible($(`.modal-header`), 5000);
    return $(`#modal-title`).getText();
  }

  clickAndWaitForVisible(elemToClick: ElementFinder, elemToWait: ElementFinder, ms = 5000) {
    elemToClick.click();
    this.waitForVisible(elemToWait, ms);
  }

  getSelectedFromDropdown(dropDownList: ElementFinder, optionElementSelector = `option`): ElementArrayFinder {
    return dropDownList.$$(optionElementSelector).filter(option => option.isSelected());
  }

  getToastMessage() {
    const toastContainer = $(`.toast-container`);
    this.waitForVisible(toastContainer);
    const toastMessage = toastContainer.$(`.toast-title`).getText();
    this.closeToastMessage();
    return toastMessage;
  }

  closeToastMessage() {
    const toastContainer = $(`.toast-container`);
    this.waitForVisible(toastContainer);
    $(`.toast-container button`).click();
  }
  /**
   * Right clicks element
   * @param elemToClick
   */
  rightClickElement(elemToClick: ElementFinder) {
    browser.actions().click(elemToClick,
      protractor.Button.RIGHT).perform();
  }
}
