/**
 * Test Case: 19680
 * TFS link: https://tfs.asset360.com/tfs/DefaultCollection/SII/_workitems?id=19680
 */

import { User } from '../../helpers/user';
import { userObj, appName } from '../../helpers/testDetails.data';
import { browser } from 'protractor';
import { Utils } from '../../helpers/utils';
import { Helper } from '../../helpers/helper';
import { HomePage } from '../../page/pages';

const util = new Utils();
const user = new User();
const helper = new Helper();

describe('Issues Management - App Navigation', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.goToIssueManagement();
  });

  Object.keys(appName).forEach(app => {
    it(`should be able to navigate to ${appName[app]}`, async () => {
      user.navigateToApp(appName[app]);
      expect((new HomePage).appTitle.getText()).toContain(appName[app].toUpperCase());
      expect(browser.getTitle()).toEqual(helper.getTrueTitle(appName[app]));

      if (appName[app] === appName.arcFlash) {
        browser.close();
        util.getWindowHandles().then(handle => {
          browser.switchTo().window(handle[0]);
        });
      } else {
        user.navigateToApp(appName.issuesManagement);
      }
    });
  });
});

