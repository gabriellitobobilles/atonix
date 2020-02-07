/**
 * maps test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, ElementArrayFinder } from 'protractor';
import * as casual from 'casual';

const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'SEKOIA Demo Clients',
  child: ['UGM Historical Reliability Plan']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
// const newQuickSearch = generateQuickSearch();
// const modifiedQuickSearch = Object.create(newQuickSearch);
// newQuickSearch.categories.toExpect = newQuickSearch.categories.add;
// let saveAsQuickSearch: any;
const tabNames = programNavigatorPage.getTabNames();
let assetName_gbl: string;

describe('Program Navigator Maps', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
  });
  it('should be able to nagivate to maps Tab', async () => {
    user.openTab(tabNames.map);
    browser.waitForAngularEnabled();
    expect(programNavigatorPage.quickSearchBtn.isPresent()).toBeTruthy();
  });
  it('should load map', async () => {
    helper.waitForVisible(programNavigatorPage.mapLayer);
    expect(programNavigatorPage.mapLayer.isPresent()).toBeTruthy();
  });
  it('should display hover asset information on-mouseover', async () => {
    programNavigatorPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
    console.log(`HoverBox InfO: `, await $(`#hoverContainer > bv-hover-box > #bvHoverBox `).getText());
    assetName_gbl = await programNavigatorPage.hoverBoxAssetName.getText();

    console.log(`Map Elements: `);
    const mapElements = programNavigatorPage.getMapElements();
    Object.keys(mapElements).forEach(async elem => {
      console.log(`${elem}:::`, await mapElements[elem].count());
    });
  });
  it('should be able to select an asset in Map and display Info Tray', async () => {
    programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0));
    browser.sleep(2000);
    expect(programNavigatorPage.infoTrayExpanded.isPresent()).toBeTruthy();
    expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(assetName_gbl.toUpperCase());
  });
  it('should display all Info Tray Tabs', () => {
    Object.keys(programNavigatorPage.infoTrayTabHeaders).forEach(tab => {
      expect(programNavigatorPage.infoTrayTabHeaders[tab].isPresent()).toBeTruthy();
    });
  });
});
