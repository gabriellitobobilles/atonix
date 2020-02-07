
import { browser, protractor, ElementFinder, ElementArrayFinder } from 'protractor';
import * as path from 'path';

export class Utils {
  /**
   * returns an array of window handle
   */
  async getWindowHandles() {
    const winHandles = browser.getAllWindowHandles();
    return winHandles;
  }

  async textIncludes(param) {
    const textToCompare = await param;
  }

  /**
   * @description - Use this fn to click an item in the asset navigator since simple .click() doesn't work
   * @param elem - elementQuery || protractor element object
   */
  mouseMoveClickPerform(elem: ElementFinder) {
    browser.actions().mouseMove(elem).click().perform();
  }

  doubleClick(elem: ElementFinder) {
    browser.actions().mouseMove(elem).doubleClick().perform();
  }

  switchToIframe(iFrameID: ElementFinder) {
    browser.switchTo().frame(iFrameID.getWebElement());
  }

  switchToMainFrame() {
    browser.switchTo().defaultContent();
  }

  fileUpload(elem: ElementFinder, filePath: string) {
    const absolutePath = path.resolve(filePath);
    elem.sendKeys(absolutePath);
  }

  getRandomFromArray(arr: any) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async getRandomElementFromArray(elemArr: ElementArrayFinder) {
    const randomNum = Math.floor(Math.random() * await elemArr.count());
    return elemArr.get(randomNum);
  }

  /**
   * Returns an array of randomized value from an array
   * @param arr - array
   * @param count - number of random items
   */
  getRandomFromArrayMultiple(arr: any, count = 1) {
    const temp = [];
    let arrTemp = arr;
    for (let index = 0; index < count; index++) {
      temp.push(arrTemp[Math.floor(Math.random() * arrTemp.length)]);
      arrTemp = arrTemp.filter(value => !temp.includes(value));
    }
    return temp;
  }
  scrollToView(elem: ElementFinder) {
    browser.executeScript('arguments[0].scrollIntoView(true)',
      elem.getWebElement());
  }

}
