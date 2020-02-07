/**
 * maps test for Program Navigator
 */

import { User } from '../../helpers/user';
import { userObj, appName, automationAssetData } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Helper } from '../../helpers/helper';
import { Utils } from '../../helpers/utils';
import { browser, $, ElementArrayFinder } from 'protractor';

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
const tabNames = programNavigatorPage.getTabNames();
let assetName_gbl: string;

let mapHoverDetails: any;
let hoverBoxDetails: string[];
describe('Program Navigator Maps - Info Tray', () => {
  beforeAll(() => {
    user.logIn(userObj);
    user.navigateToApp(appName.programNavigator);
    helper.selectClientMain(clientToUse.parent, clientToUse.child, appName.programNavigator);
    user.openTab(tabNames.map);
    browser.waitForAngularEnabled();
    helper.waitForVisible(programNavigatorPage.svgCircles.get(0)); // wait for the first circle
  });
  it('should display hover asset information on-mouseover', async () => {
    programNavigatorPage.mouseMoveToAsset(programNavigatorPage.svgCircles.get(0));
    assetName_gbl = await programNavigatorPage.hoverBoxAssetName.getText();
    mapHoverDetails = await programNavigatorPage.getMapHoverMilesStone();
    hoverBoxDetails = splitStringNextLine(await programNavigatorPage.hoverAssetBox.getText());

    const milestone = ['Not Started', 'Mitigation Plan', 'Engineering', 'Procurement',
      'Permitting', 'Construction', 'Close-out', 'Mitigation Complete'];
    const mapSchedule = await programNavigatorPage.hoverBoxMilestoneTable.getText();
    milestone.forEach(schedule => {
      expect(mapSchedule).toContain(schedule);
    });
  });

  it('display correct milestone in Chart Tab and Info Tray', async () => {
    programNavigatorPage.selectAssetFromMap(programNavigatorPage.svgCircles.get(0)); browser.sleep(2000);

    expect(programNavigatorPage.infoTrayExpanded.isPresent()).toBeTruthy();
    expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(assetName_gbl.toUpperCase());

    programNavigatorPage.infoTrayTabHeaders.chart.click();
    const infoTrayMilestone = await programNavigatorPage.getMapInfoTrayChart();

    expect(mapHoverDetails).toEqual(infoTrayMilestone);
    const actualStatusHover = hoverBoxDetails[2];
    const planStatusHover = hoverBoxDetails[3];
    const infoTrayProjectStatus = await programNavigatorPage.getInfoTrayProjectStatus();

    expect(actualStatusHover).toEqual(`Actual: ${infoTrayProjectStatus.actual}`, `Actual hover and infoTray does not match`);
    expect(planStatusHover).toEqual(`Plan: ${infoTrayProjectStatus.plan}`, `Plan hover and infoTray does not match`);
    expect(mapHoverDetails).toEqual(infoTrayMilestone, `Milesone from hoverbox and info tray does not match`);
    expect(programNavigatorPage.infoTrayAssetName.getText()).toEqual(hoverBoxDetails[0].toUpperCase(),
      `InfoTray Asset Name: ${programNavigatorPage.infoTrayAssetName.getText()} ` +
      `is not equal to hoverbox ${hoverBoxDetails[0].toUpperCase()}`);
  });
});


function splitStringNextLine(str: string) {
  return str.split(/\n/);
}
