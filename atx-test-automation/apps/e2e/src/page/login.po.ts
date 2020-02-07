import { browser, by, $, element } from 'protractor';
import { Helper } from '../helpers/helper';

const helper = new Helper();

export class LoginPage {

  userEmail = browser.element(by.model('vm.Email'));
  userPassword = browser.element(by.model('vm.Password'));
  signInBtn = browser.element(by.id('inputSubmitLogin'));
  // navBarRight = element(by.className('bv-navbar-right'))

  inputUserEmail(email) {
    helper.clearAndSendKeys(this.userEmail, email);
    // this.userEmail.sendKeys(userObj.email);
  }

  inputUserPassword(password) {
    helper.clearAndSendKeys(this.userPassword, password);
    // this.userPassword.sendKeys(userObj.password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  // getNavBarRight() {
  //   return this.navBarRight
  // }
}
