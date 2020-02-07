import { by, element, $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('19601: Data Explorer - Home', () => {

  const appTitle = new helper();
  // tslint:disable-next-line:one-variable-per-declaration
  let trendIndex, trendIndex2, val2;
  const axes = ['Saab', 'Volvo'];
  const EC = protractor.ExpectedConditions;

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

  it('step 1: Verify app auto scale', async () => {
    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();


    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('nD Test Client'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('nD Test StationGroup'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('nD Test Station'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetTree
      .get((await appTitle.dataExplorerNavElemSelector.assetTree.getText()).indexOf('nD Test Eastern PC3'))
      .click();
    browser.waitForAngular();
    browser.sleep(2000);


    browser.actions().keyDown(protractor.Key.CONTROL).sendKeys(protractor.Key.SUBTRACT).keyUp(protractor.Key.CONTROL).perform();
    for (let i = 100; i >= 30; i = i - 10) {
      browser.executeScript('document.body.style.zoom=\'' + i + '%\'');
      browser.sleep(3000);
    }

    protractor.browser.sleep(5000);

    for (let x = 30; x <= 100; x = x + 10) {
      browser.executeScript('document.body.style.zoom=\'' + x + '%\'');
      browser.sleep(1000);
    }
    browser.sleep(5000);

  });

  it('step 2: Any nested scroll bars from previous test', async () => {

    expect($('[id="CEChartContainer"]').isPresent()).toBe(true, 'double scroll is present');

  });

  it('step 3: Verify the Customize series name feature for New Chart & New Grouped Series chart', async () => {


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


    /** Create new Chart trend */
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartBtn.click();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys('GabrielTest');
    appTitle.atonixSaveTrendDefinition.saveBtn.click();
    trendIndex = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    val2 = await $$('[ng-repeat="chartSummary in trends"]').getText();
    expect(val2.indexOf('GabrielTest (' + trendIndex + ')') >= 0).toBe(true, 'Your not successfully created a Trend');
    expect($$('i.fa.fa-trash-o').get(val2.indexOf('GabrielTest (' + trendIndex + ')'))
      .isPresent()).toBe(true, 'Delete icon is not present');
    await element.all(by.repeater('chartSummary in trends')).get(val2.indexOf('GabrielTest (' + trendIndex + ')')).click();

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

    appTitle.atonixTrendButtons.EditChartSettingBtn.first().click();
    await element(by.linkText('Series')).click();
    $$('[ng-model="s.DisplayText"]').first().clear();
    $$('[ng-model="s.DisplayText"]').first().sendKeys(axes[0]);
    $$('[ng-model="s.DisplayText"]').last().clear();
    $$('[ng-model="s.DisplayText"]').last().sendKeys(axes[1]);
    $('[ng-click="settingsVM.OK()"]').click();
    browser.waitForAngular();
    const highcharts_legend_item = await appTitle.getListHighchartsVMLegendItem(0);
    // console.log(highcharts_legend_item);
    expect(highcharts_legend_item.indexOf(axes[0]) >= 0).toBe(true, 'Customize series name was not created');
    expect(highcharts_legend_item.indexOf(axes[1]) >= 0).toBe(true, 'Customize series name was not created');
    browser.waitForAngular();
    // browser.refresh();
    trendIndex2 = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.trendSelector();
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    appTitle.deletingDataExplorerTrends('GabrielTest');

  });

  it('step 4: Ensure user is able to group the series for a custom group type.', async () => {

    /** Create new Chart trend */
    appTitle.atonixTrendButtons.nameDropdown.click();
    appTitle.atonixCreateCharts.createNewChartGroupBtn.click();
    appTitle.atonixTrendButtons.saveBtn.click();
    appTitle.atonixSaveTrendDefinition.titleTrend.clear();
    appTitle.atonixSaveTrendDefinition.titleTrend.sendKeys('GabrielTest');
    appTitle.atonixSaveTrendDefinition.saveBtn.click();

    // ** Check if the trend is created and select it */
    appTitle.trendSelector();
    // appTitle.chartDropDown.chartDropDownBtn.click();
    await appTitle.selectingDataExplorerTrends('GabrielTest');

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
    appTitle.chartSettingTab.save.click();
    browser.refresh();
    // trendIndex2 = await appTitle.getNumberHighchartsVMLegendItem(0);
    appTitle.trendSelector();
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    // ** Deleted Created Trend */
    appTitle.deletingDataExplorerTrends('GabrielTest');

  });

});
