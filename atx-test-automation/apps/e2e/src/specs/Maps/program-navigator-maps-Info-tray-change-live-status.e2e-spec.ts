/**
 * maps test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, $$, ElementArrayFinder, ElementFinder } from 'protractor';
import { MilestoneStatus } from '../../helpers/interface';

const user = new User();
const programNavigatorPage = new Pages.ProgramNavigator();
const helper = new Helper();
const util = new Utils();

const clientToUse = {
  parent: 'SEKOIA Demo Clients',
  child: ['UGM Historical Reliability Plan', '1A Elbert Substation', '1A-022']
  // parent: automationAssetData.clientGroup,
  // child: [automationAssetData.clientName]
};
const tabNames = programNavigatorPage.getTabNames();
let assetName_gbl: string;
let mapHoverDetails: any;
const milestone = ['Not Started', 'Mitigation Plan', 'Engineering', 'Procurement',
  'Permitting', 'Construction', 'Close-out', 'Mitigation Complete'];

describe('Program Navigator Maps - Change Live Status', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.map);
    browser.waitForAngularEnabled();
    helper.waitForVisible(programNavigatorPage.svgCircles.get(0), 60000); // wait for the first circle
  });

  it('should be able to update Live Status', async () => {
    const assetToSelect: ElementFinder = await util.getRandomElementFromArray(programNavigatorPage.svgCircles);
    // Zoom out and moveToAsset to hover to show hoverbox
    programNavigatorPage.zoomOutBtn.click();
    programNavigatorPage.mouseMoveToAsset(assetToSelect);
    // grab details of hoverbox
    assetName_gbl = await programNavigatorPage.hoverBoxAssetName.getText();
    mapHoverDetails = await programNavigatorPage.getMapHoverMilesStone();
    // select asset and go to Chart tab
    programNavigatorPage.selectAssetFromMap(assetToSelect);
    programNavigatorPage.infoTrayTabHeaders.chart.click();
    // get live status before from InfoTray > Chart tab and get random milestone to update
    const liveStatusBefore = await programNavigatorPage.getInfoTrayProjectStatus();
    const milestoneToSelect = util.getRandomFromArray(helper.removeItemFromArrayByValue(milestone, liveStatusBefore.actual));
    // change map live status and get new actual status
    const result = changeMapLiveStatus(milestoneToSelect);
    const liveStatusAfter = await programNavigatorPage.getInfoTrayProjectStatus();

    expect(result.res).toBeTruthy(result.msg);
    expect(liveStatusAfter).not.toEqual(liveStatusBefore, `Project should not be the same`);
  });
});

function changeMapLiveStatus(milestoneToSelect: string) {
  programNavigatorPage.infoTrayChangeStatusBtn.click();
  helper.waitForVisible($(`.modal-header`), 5000);
  expect(helper.getModalTitlePopUp()).toEqual(`Change Live Status`, `Change Live Status window title is incorrect`);

  const result = programNavigatorPage.setMapLiveStatus(MilestoneStatus[`${milestoneToSelect}`]);
  expect(programNavigatorPage.liveStatusSuccessMsg.getText()).toContain(`status set to ${milestoneToSelect}`);
  programNavigatorPage.liveStatusCloseBtn.click();

  return result;
}
