import { ElementFinder, by, element, $, $$, browser, protractor, ElementArrayFinder } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
// tslint:disable-next-line:max-line-length
describe('19612: Data Explorer - Advanced Chart', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let trendName, measurementName;
  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:max-line-length


  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });

    browser.driver.manage().window().getSize().then((size) => {
      console.log(' BROWSER SIZE ' + JSON.stringify(size));
    });
    appTitle.fillLoginForm();
    appTitle.confirmLogin();
    browser.waitForAngular();
    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);

  }));


  it('Step 1:  Ensure Advanced chart can be selected from Add chart list.', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    browser.sleep(2000);

    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('Demo Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Coal Plants'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Eastern PC1'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('Eastern PC1'))
      .click();
    browser.waitForAngular();
    browser.sleep(2000);

    trendName = appTitle.makeid(11);
    await appTitle.atonixTrendButtons.nameDropdown.click();
    await appTitle.atonixCreateCharts.createNewChartGroupBtn.click();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys(trendName);
    appTitle.atonixSaveTrendDefinition.saveBtn.click();

    // ** Add variable and do drag and drop*/
    browser.sleep(2000);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 0; dx < validator.getTagList.length; dx++) {
      for (let x = 0; x <= await $$('[class="highcharts-container "]').count() - 4; x++) {
        const target = $$('[class="highcharts-container "]').first();
        // tslint:disable-next-line:max-line-length
        const elem = await element(by.cssContainingText('.draggableAsset.ng-pristine.ng-untouched.ng-valid.ng-binding.ng-scope.ui-draggable.ui-draggable-handle.ng-not-empty', validator.getTagList[dx]));
        await browser.driver.actions().dragAndDrop(elem, target).mouseUp().perform();
      }

    }

    browser.sleep(2000);
    await appTitle.atonixTrendButtons.saveBtn.click();
    await appTitle.atonixSaveTrendDefinition.saveBtn.click();
    appTitle.trendSelector();
    appTitle.selectingDataExplorerTrends(trendName);


  });

  it('Step 2:  On series tab verify the group by feature.', async () => {


    // ** Checking Group Type option */
    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.chartSettingTab.series.click();
    // await $('[ng-model="settingsVM.GroupType"]').click();
    const cnt = await $('[ng-model="settingsVM.GroupType"]').$$('option').count();
    for (let dx = cnt - 1; dx >= 0; --dx) {
      await $('[ng-model="settingsVM.GroupType"]').$$('option').get(dx).click();
      browser.sleep(1000);
      if (await $('[class="form-group ng-hide"]').isPresent() === false) {
        const cntx = await $('[ng-model="settingsVM.TimeDivision"]').$$('option').count();
        for (let dy = cntx - 1; dy >= 0; --dy) {
          await $('[ng-model="settingsVM.TimeDivision"]').$$('option').get(dy).click();
          browser.sleep(1000);
        }

      }
    }
    // appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
  });


  it('Step 3: Ensure user is able to select Display as options & create a chart accordingly.', async () => {

    validator.chartSetting.GroupSeriesChart.displayAs.forEach(async (item, index) => {

      appTitle.selectDropdownbyNum(appTitle.chartSettingTab.chartType, index);
      expect(await appTitle.chartSettingTab.chartType.$('option:checked').getText()).toEqual(item);

    });
    browser.waitForAngular();
  });

  it('Step 4: Verfiy the Chart type feature.', async () => {

    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.measurementType.first(), 0);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.chartSettingTab.measurementType.first().$('option:checked').getText()).toEqual(validator.chartSetting.GroupSeriesChart.chartType[2]);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 1; dx < validator.chartSetting.GroupSeriesChart.chartType.length; dx++) {
      // tslint:disable-next-line:max-line-length
      appTitle.selectDropdownbyNum(appTitle.chartSettingTab.measurementType.first(), dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
      // tslint:disable-next-line:max-line-length
      expect(await appTitle.chartSettingTab.measurementType.first().$('option:checked').getText()).toEqual(validator.chartSetting.GroupSeriesChart.chartType[dx]); // this test passes in chrome but fails in phantomjs
    }
    browser.waitForAngular();

  });

  it('Step 5: Ensure Add Measurement.', async () => {

    appTitle.selectDropdownbyNum($('[ng-model="settingsVM.GroupType"]'), 1);
    measurementName = appTitle.makeid(11);
    browser.actions().mouseMove(appTitle.chartSettingTab.addMeasurement).perform();
    appTitle.chartSettingTab.addMeasurement.click();
    appTitle.chartSettingTab.measurementName.last().click();
    appTitle.chartSettingTab.measurementName.last().sendKeys(measurementName);
    await browser.actions().mouseMove(appTitle.chartSettingTab.save).perform();
    await appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.chartSettingTab.series.click();
    // tslint:disable-next-line:max-line-length
    expect(validator.getTagList.length !== await appTitle.chartSettingTab.measurementName.count()).toBe(true, 'new measurement was not save successfully');

  });

  it('Step 6: Ensure Chart filter Advanced options', async () => {

    validator.months.forEach(async (item) => {

      // tslint:disable-next-line:max-line-length
      await $('[ng-click="settingsVM.trendDefinition.Filter.exclude' + item + ' = !settingsVM.trendDefinition.Filter.exclude' + item + '"]').click();
      expect($$('[class="fa fa-stack-2x fa-ban"]').isPresent()).toEqual(true, 'Chart Filter was not working correctly');
      browser.sleep(1000);
    });


    validator.days.forEach(async (item) => {

      // tslint:disable-next-line:max-line-length
      await $('[ng-click="settingsVM.trendDefinition.Filter.exclude' + item + ' = !settingsVM.trendDefinition.Filter.exclude' + item + '"]').click();
      expect($$('[class="fa fa-stack-2x fa-ban"]').isPresent()).toEqual(true, 'Chart Filter was not working correctly');
      browser.sleep(1000);
    });

    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();

  });

  it('Step 7: Verify Series settings', async () => {

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.chartSettingTab.series.click();

    for (let dx = 0; dx < await appTitle.chartSettingTab.measurementSetting.count(); dx++) {

      await appTitle.chartSettingTab.measurementSetting.get(dx).click();

    }

    // tslint:disable-next-line:max-line-length
    expect(await appTitle.chartSettingTab.measurementConfig.count() === await appTitle.chartSettingTab.measurementSetting.count()).toBe(true);

  });


  it('Step 8: Ensure series filter', async () => {

    for (let dx = 0; dx < await appTitle.chartSettingTab.seriesFilter.count(); dx++) {

      await appTitle.chartSettingTab.seriesFilter.get(dx).click();

    }

    expect(await appTitle.chartSettingTab.seriesFilterConfig.count() === await appTitle.chartSettingTab.seriesFilter.count()).toBe(true);

  });


  it('Step 9: Verify delete measurement.', async () => {

    await appTitle.chartSettingTab.deleteMeasurement.last().click();
    // tslint:disable-next-line:max-line-length
    expect(validator.getTagList.length === await appTitle.chartSettingTab.deleteMeasurement.count()).toBe(true, 'Measurement was not deleted successfully');

  });

  it('Step 10: Ensure user is able to select Data Retrieval Method.', async () => {

    validator.dataRetrieval.forEach(async (item, index) => {

      // tslint:disable-next-line:max-line-length
      appTitle.selectDropdownbyNum(appTitle.chartSettingTab.trendDataRetrieval.first(), index); // sets the drop down to the first index which has the string text of Eye Infection/Problem
      // tslint:disable-next-line:max-line-length
      expect(await appTitle.chartSettingTab.trendDataRetrieval.first().$('option:checked').getText()).toEqual(item); // this test passes in chrome but fails in phantomjs

      browser.sleep(1000);
    });

  });


  it('Step 11: Verify Add Pin feature', async () => {

    const pinName = appTitle.makeid(11);
    appTitle.chartSettingTab.pin.click();
    appTitle.dataExplorerNavElemSelector.addPins.click();
    appTitle.DispatchChart.pinName.last().click();
    appTitle.DispatchChart.pinName.last().clear();
    appTitle.DispatchChart.pinName.last().sendKeys(pinName);
    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.pinType.last(), 2);
    expect(await appTitle.chartSettingTab.pinType.last().$('option:checked').getText()).toEqual('Last 30 Minutes (Selected)');
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).toBe(true, 'pins was not created successfully');

  });

  it('Step 12: Ensure user is able to add different types of pins.', async () => {

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    appTitle.chartSettingTab.pin.click();

    appTitle.selectDropdownbyNum(appTitle.chartSettingTab.criteriaObjectId.first(), 0);
    // tslint:disable-next-line:max-line-length
    expect(await appTitle.chartSettingTab.criteriaObjectId.first().$('option:checked').getText()).toEqual(validator.pinsType[2]);
    // tslint:disable-next-line:prefer-for-of
    for (let dx = 1; dx < validator.pinsType.length; dx++) {
      // tslint:disable-next-line:max-line-length
      appTitle.selectDropdownbyNum(appTitle.chartSettingTab.criteriaObjectId.first(), dx); // sets the drop down to the first index which has the string text of Eye Infection/Problem
      // tslint:disable-next-line:max-line-length
      expect(await appTitle.chartSettingTab.criteriaObjectId.first().$('option:checked').getText()).toEqual(validator.pinsType[dx]); // this test passes in chrome but fails in phantomjs
    }
    browser.waitForAngular();

  });

  it('Step 13: Ensure hide pin.', async () => {

    appTitle.chartSettingTab.hidePin.last().click();
    const alert = await appTitle.chartSettingTab.hidePin.getAttribute('class');
    expect($('[class="' + await appTitle.chartSettingTab.hidePin.getAttribute('class') + '"]').isPresent()).toBe(true, 'Pin was not hide');

  });

  it('Step 14: Ensure delete pin.', async () => {

    appTitle.chartSettingTab.removePin.last().click();
    expect(appTitle.DispatchChart.pinName.isPresent()).not.toBe(true, 'Pin was not removed');
    appTitle.chartSettingTab.save.click();
    browser.waitForAngular();
    expect(appTitle.dataExplorerNavElemSelector.pins.isPresent()).not.toBe(true, 'Pin was not removed');
    appTitle.trendSelector();
    appTitle.deletingDataExplorerTrends(trendName);

  });
});


