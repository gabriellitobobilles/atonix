import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19594: Performance Analyst - Map', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let categoryName, categoryList, priorClearFilter, afterClearFilter, slider;

  beforeAll((() => {

    const EC = protractor.ExpectedConditions;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    appTitle.fillLoginForm();
    appTitle.confirmLogin();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);

  }));


  it('Step 1: Ensure map is loading.', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('Demo Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Coal Plants'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern Station'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1'))
      .click();

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    browser.waitForAngular();
    browser.driver.wait(async () => {
      browser.wait(protractor.ExpectedConditions.visibilityOf(appTitle.PAMap.Rastemap), 10000);
      return appTitle.PAMap.Rastemap;
    });
    expect(appTitle.PAMap.Rastemap.isDisplayed()).toBe(true);
    browser.waitForAngular();
    browser.sleep(3000);

  });

  it('Step 2: Verify Raster map. Make sure it should not take more than 10 seconds.', async () => {

    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 0);
    // browser.waitForAngular();
    browser.sleep(3000);
    expect(appTitle.PAMap.Rastemap.isPresent()).toBe(true, 'Map was not loaded successfully');

  });

  it('Step 3: Verify GeoVis map.', async () => {


    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 2);
    browser.waitForAngular();
    expect(appTitle.PAMap.GeoVismap.isPresent()).toBe(true, 'Map was not loaded successfully');


  });

  it('Step 4: Verify GeoSpa map.', async () => {

    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('SEKOIA Demo Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('UGM Historical Reliability Plan'))
      .click();

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 1);
    browser.waitForAngular();
    expect(appTitle.PAMap.GeoSpaMap.isPresent()).toBe(true, 'Map was not loaded successfully');


  });

  it('Step 5: Ensure user is able to select different maps from drop down list.', async () => {

    browser.waitForAngular();
    appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, 0);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.PAMap.selectDiffmap.$('option:checked').getText()).toEqual(validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan[1]);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 1; dx < validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan.length; dx++) {
      // tslint:disable-next-line:max-line-length
      appTitle.selectDropdownbyNum(appTitle.PAMap.selectDiffmap, dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
      // tslint:disable-next-line:max-line-length
      expect(await appTitle.PAMap.selectDiffmap.$('option:checked').getText()).toEqual(validator.mapDropDown.SEKOIADemoClients_UGMHistoricalReliabilityPlan[dx]); // this test passes in chrome but fails in phantomjs
    }
    browser.waitForAngular();
  });

  it('Step 6: Ensure multi select & single select of asset on map is working.', async () => {

    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetTreeController.get((await appTitle.dataExplorerNavElemSelector.assetTreeController
      .getText()).indexOf('All Clients'))
      .click();

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    browser.sleep(3000);
    // ** Ensure single select of asset on may is working */
    browser.actions().click(appTitle.PAMap.mapCircle.get(3)).perform();
    expect(await appTitle.PAMap.mapAttrTrayXpanded.isPresent()).toBe(true, 'single select of asset on map is not working');
    expect(await appTitle.PAMap.mapAttrTrayTabSelected.isPresent()).toBe(true, 'single select of asset on map is not working');

    // ** Ensure multiple select of asset on may is working */
    browser.actions().click(appTitle.PAMap.multiSelectBtn).perform();
    for (let x = 4; x <= 7; x++) {

      browser.actions().click(appTitle.PAMap.mapCircle.get(x)).perform();
    }
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.PAMap.mapAttrTrayXpanded.isPresent()).toBe(true, 'multiple select of asset on map is not working');
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.PAMap.mapAttrTrayHidden.isPresent()).toBe(true, 'multiple select of asset on map is not working');


  });

  it('Step 7: Ensure apply simple filter feature.', async () => {

    browser.waitForAngular();
    appTitle.PAMap.clearAsset.click();
    browser.actions().mouseMove(appTitle.PAMap.mapCircle.get(3)).perform();
    const assetNameMap = await appTitle.PAMap.mapAssetHover.$$('[class="ng-binding"]').first().getText();
    appTitle.PAMap.mapFilterBtn.click();
    appTitle.PAMap.mapAssetSearchBox.clear();
    appTitle.PAMap.mapAssetSearchBox.sendKeys('asset=' + assetNameMap + '*');
    appTitle.PAMap.mapAssetSearchBtn.click();
    browser.actions().click(appTitle.PAMap.mapCircle.get(0)).perform();
    expect(await appTitle.PAMap.mapAttrTrayXpanded.isPresent()).toBe(true, 'single select of asset on map is not working');
    expect(await appTitle.PAMap.mapAttrTrayTabSelected.isPresent()).toBe(true, 'single select of asset on map is not working');
    browser.waitForAngular();
  });

  it('Step 8: Ensure user is able to save a new search in map.', async () => {

    browser.waitForAngular();
    appTitle.PAMap.clearAsset.click();
    appTitle.PAMap.saveSearchAsset.click();
    expect(appTitle.PAMap.assetCategoryTextbox.isPresent()).toBe(true, 'Save Quick Modal does not show');
    expect(appTitle.PAMap.quickSearchSavebtn.isPresent()).toBe(true, 'Save Quick Modal does not show');

    browser.waitForAngular();
  });

  it('Step 9: Ensure save new search with adding a category.', async () => {

    browser.waitForAngular();
    categoryName = appTitle.makeid(11);
    appTitle.PAMap.assetCategoryTextbox.clear();
    appTitle.PAMap.assetCategoryTextbox.sendKeys(categoryName);
    appTitle.PAMap.categoryAddBtn.click();
    appTitle.PAMap.saveQuickSearchVmName.clear();
    appTitle.PAMap.saveQuickSearchVmName.sendKeys(appTitle.makeid(11));
    browser.sleep(2000);
    categoryList = await appTitle.PAMap.expandCategoryPane.getText();
    // console.log(categoryList.indexOf(categoryName));
    // console.log(await appTitle.PAMap.expandCategoryPane.get(await categoryList.indexOf(categoryName)));
    expect(categoryList.indexOf(categoryName) > -1).toBe(true, 'category was not added');
    expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(false, 'Public caterogy is not default');
    browser.waitForAngular();
  });

  it('Step 10: Ensure Public & private new search save feature.', async () => {

    browser.waitForAngular();
    appTitle.PAMap.saveQuickSearchVmisPublic.click();
    expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(true, 'Unable to make caterogy private');
    appTitle.PAMap.saveQuickSearchVmisPublic.click();
    expect(appTitle.PAMap.saveQuickSearchVmisPublic.isSelected()).toBe(false, 'Unable to make caterogy public');
    browser.waitForAngular();

  });

  it('Step 11: Ensure Clear feature in apply filter.', async () => {

    browser.waitForAngular();
    appTitle.PAMap.saveQuickSearchVmOKBtn.click();
    priorClearFilter = await appTitle.PAMap.mapCircle.count();
    browser.waitForAngular();
    appTitle.PAMap.clearSearchBtn.click();
    browser.waitForAngular();
    afterClearFilter = await appTitle.PAMap.mapCircle.count();
    expect(priorClearFilter !== afterClearFilter).toBe(true, 'clearing filter was not work');
  });

  it('Step 12: Verify advanced filter feature.', async () => {

    browser.waitForAngular();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('UGM Historical Reliability Plan'))
      .click();
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    browser.waitForAngular();
    // appTitle.PAMap.mapFilterBtn.click();
    appTitle.PAMap.advancedSettings.click();
    expect(appTitle.PAMap.advanceSettingMap.isDisplayed()).toBe(true, 'advance search was not working');
  });

  it('Step 13: Verify base maps.', async () => {

    browser.waitForAngular();
    appTitle.PAMap.mapFilterBtn.click();
    browser.actions().mouseMove(appTitle.PAMap.basemapWrapTriggerTab.first()).perform();

    for (let map = 0; map <= await appTitle.PAMap.basemapWrapImageBtn.count() - 1; map++) {
      browser.waitForAngular();
      appTitle.PAMap.basemapWrapImageBtn.get(map).click();
      browser.waitForAngular();
      browser.driver.sleep(2000);
      // tslint:disable-next-line:max-line-length
      expect(await $('[id="geoSpa"]').getAttribute('data-basemap') === validator.basemapWrap[map]).toBe(true, 'Map does not match with the expected map name');

    }


  });

  it('Step 14: Ensure map is loading with respect to time slider.', async () => {

    browser.waitForAngular();
    slider = element(by.id('navIndicatorHandle'));

    browser.actions().dragAndDrop(
      slider,
      { x: 100, y: 0 }
    ).mouseUp().perform();
    browser.waitForAngular();

    const target = $('[id="navIndicatorDate"]');
    const elem = $('[id="navIndicatorHandle"]');
    await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
    // browser.driver.sleep(200000);

  });

  it('Step 15: Ensure Jump to feature.', async () => {

    browser.waitForAngular();
    const presentDate = await $('[id="navIndicatorDate"]').getAttribute('textContent');
    $('#quicksearch > div.btn-group.dropup > button').click();
    browser.driver.sleep(2000);
    expect($('[class="btn-group dropup open"]').isDisplayed()).toBe(true, 'Jump to feature is not working');
    await $$('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]').get((await $$('[ng-click="trVM.SelectTimeRangeCriteria(c.CoDFID)"]')
      .getText()).indexOf('Last Month'))
      .click();
    browser.driver.sleep(2000);
    const afterDate = await $('[id="navIndicatorDate"]').getAttribute('textContent');
    expect(presentDate !== afterDate).toBe(true, 'Jump feature is not working');
    browser.waitForAngular();

  });

  it('Step 16: Verify zoom in & zoom out feature.', async () => {

    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetTreeController.get((await appTitle.dataExplorerNavElemSelector.assetTreeController
      .getText()).indexOf('All Clients'))
      .click();

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.map);
    browser.sleep(3000);
    await appTitle.verifyZoomInAndZoomOutInMap();


  });

});
