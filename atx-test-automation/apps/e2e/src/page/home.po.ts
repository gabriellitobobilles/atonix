import { browser, by, $, element } from 'protractor';

export class HomePage {

  public navBarRight = element(by.className('bv-navbar-right'));
  public menuButton = element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'));
  public menuHolder = element(by.className('.acDropdown.animate-slide'));
  public appTitle = $('.appTitle');

  public getNavBarRight() {
    return this.navBarRight;
  }

  public getAppFromMenu(appName: string) {
    // return element.all(by.cssContainingText('.ACDisplayName.ng-binding', appName))
    return element.all(by.repeater('ac in navBarVM.appContexts'))
      .filter((elem) => {
        return elem.getText().then((text) => {
          return text === appName;
        });
      }).first();
  }

  public selectAppFromMenu(appName: string) {
    this.menuButton.click();
    browser.sleep(1000);

    const appToSelectElem = this.getAppFromMenu(appName);
    appToSelectElem.click();

    browser.sleep(3000);
  }



}
