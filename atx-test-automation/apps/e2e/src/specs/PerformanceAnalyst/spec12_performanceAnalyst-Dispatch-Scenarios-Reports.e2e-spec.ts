import { by, element, $, $$, browser, protractor, utils } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileType, downloadFileName } from '../../helpers/testDetails.data';

describe('19591: Performance Analyst - Dispatch -Scenarios - Reports', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let winSel, highcharts_legend_item, highcharts_legend_item_zoom;

  beforeAll((() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
    browser.manage().timeouts().setScriptTimeout(600000);
    appTitle.open();
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


  it('Step 1: Ensure scenarios can be selected from comparison chart.', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('City Of Lawrence'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Waste Water Treatment Plants (WWTP)'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .click();
    // appTitle.selectClientMain('All Clients', ['City Of Lawrence', 'Waste Water Treatment Plants (WWTP)',
    //   'Kansas River WWTP', 'Kansas River WWTP'],
    //   appName.performanceAnalyst);
    // $$('[ng-click="vm.selectView(view)"]').get(10).click();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.dispatch);
    browser.waitForAngular();
    // await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
    //   .getText()).indexOf('All Clients'));
    browser.waitForAngular();
    browser.sleep(2000);
    appTitle.trendSelector();
    // appTitle.waitingForElementTobeVisible(appTitle.chartDropDown.chartDropDownBtn);
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    browser.driver.wait(async () => {
      browser.wait(EC.visibilityOf(element.all(by.repeater('chartSummary in dispatchVM.charts')).get(2)), 10000);
      return element.all(by.repeater('chartSummary in dispatchVM.charts')).get(2);
    });
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await element.all(by.repeater('chartSummary in dispatchVM.charts')).get(2).click();
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.startDatebox.click();
    appTitle.selectTimeSlider.startDatebox.clear();
    appTitle.selectTimeSlider.startDatebox.sendKeys('07/01/2016');
    appTitle.selectTimeSlider.endDatebox.click();
    appTitle.selectTimeSlider.endDatebox.clear();
    appTitle.selectTimeSlider.endDatebox.sendKeys('12/30/2016');
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);
    $('[ng-click="dispatchVM.chooseScenarios()"]').click();
    browser.waitForAngular();

  });



  it('Step 2: Verify Clear/Cancel/Ok button feature on comparison chart.', async () => {
    /** Verify Clear/Cancel/Ok button feature on comparison chart. */

    const val1 = await element(by.model('archive.Selected')).getAttribute('class');
    await element(by.model('archive.Selected')).click();
    const val2 = await element(by.model('archive.Selected')).getAttribute('class');
    expect(val1 !== val2).toBeTruthy();
    expect(appTitle.getSelectScanariosVMClearBtn().isPresent()).toBeTruthy();
    expect(appTitle.getSelectScanariosVMCancelBtn().isPresent()).toBeTruthy();
    expect(appTitle.getSelectScanariosVMOKBtn().isPresent()).toBeTruthy();
    expect(appTitle.getSelectScanariosVMFilterBtn().isPresent()).toBeTruthy();

  });


  it('Step 3: Ensure Filter functionality on comparison chart.', async () => {
    /** Ensure Filter functionality on comparison chart. */
    appTitle.getSelectScanariosVMFilterBtn().sendKeys('test');
    expect(element(by.model('archive.Selected')).isPresent()).not.toBeTruthy();
    appTitle.getSelectScanariosVMCancelBtn().click();
    expect(element(by.model('archive.Selected')).isPresent()).not.toBeTruthy();
  });

  it('Step 4: Ensure user is able to select different modes of data (Min/Max/Average/First/Last/Sum)', async () => {
    /** Ensure user is able to select different modes of data (Min/Max/Average/First/Last/Sum) */

    const sumSelector = await ($$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]')).count();
    for (let i = 0; i <= sumSelector - 1; ++i) {
      $$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]').get(i).click();
      const sumClass = await $$('[ng-click="summarySelectorVM.$scope.summary = st.ID"]').get(i).getAttribute('class');
      expect(sumClass === 'btn ng-binding ng-scope btn-success').toBeTruthy();
    }

  });

  it('Step 5: Ensure reports can be selected from drop down list.', async () => {
    /** Ensure reports can be selected from drop down list. */

    await $('[id="chartDropdown"]').click();
    element.all(by.repeater('chartSummary in dispatchVM.charts')).get(2).click();
    browser.waitForAngular();
  });

  it('Step 6: Verify Print report feature.', async () => {
    /** Verify Print preview  */

    await appTitle.printPreview();
  });

  it('Step 7: Ensure report can be downloaded as an image, pdf, svg, jpeg. ', async () => {
    /** Ensure reports can be selected from drop down list. */

    /** Downloading Chart PNG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePNG, downloadFileType.PNG);
    /** Downloading Chart JPEG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileJPEG, downloadFileType.JPEG);
    /** Downloading Chart PDF File */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePDF, downloadFileType.PDF);
    /** Downloading Chart SVG File */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileSVG, downloadFileType.SVG);
  });


  it('Step 8: Verify edit chart feature.', async () => {

    /** Verify edit chart feature. */

    expect(appTitle.DispatchChart.EditChartBtn.first().isPresent()).toBeTruthy();
    appTitle.DispatchChart.EditChartBtn.first().click();
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    browser.waitForAngularEnabled();
    const highcharts_legend_item_2 = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(highcharts_legend_item === highcharts_legend_item_2).toBe(true, 'Legent chart should be equal');
    expect(appTitle.DispatchChart.EditChartSettingBtn.isPresent()).toBeTruthy();
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(5000);

  });

  it('Step 9: Verify edit chart settings feature.', async () => {
    /** Verify edit chart settings feature. */

    expect(appTitle.DispatchChart.EditChartSettingBtn.isPresent()).toBeTruthy();
    appTitle.DispatchChart.EditChartSettingBtn.first().click();
    browser.waitForAngular();
    expect($('[ng-submit="settingsVM.OK()"]').isPresent).toBeTruthy();
    $('[ng-click="settingsVM.OK()"]').click();
  });

  it('Step 10: Ensure open chart in new tab feature.', async () => {
    /** Ensure open chart in new tab feature. */

    expect(appTitle.DispatchChart.OpenChartInNewTabBtn.isPresent()).toBeTruthy();
    appTitle.DispatchChart.OpenChartInNewTabBtn.first().click();
    browser.sleep(3000);
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    const highcharts_legend_item_3 = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(highcharts_legend_item === highcharts_legend_item_3).toBe(true, 'Legent chart should be equal');
    expect(appTitle.DownloadOption.ChartContextMenuBtn.isPresent()).toBeTruthy();
    browser.sleep(3000);
    highcharts_legend_item_zoom = await appTitle.getNumberHighchartsVMLegendItem(0);
    highcharts_legend_item_zoom = highcharts_legend_item_zoom - 1;
    appTitle.ChartZoomOut(highcharts_legend_item_zoom);
    browser.sleep(5000);
    expect(appTitle.resetZoom.ResetZoomBtn.isPresent()).toBeTruthy();
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(5000);

  });

  it('Step 11: Verify email chart feature.', async () => {
    /** Verify email chart feature. */

    expect(appTitle.DispatchChart.EmailChartBtn.isPresent()).toBeTruthy();
    appTitle.DispatchChart.EmailChartBtn.click();
    browser.waitForAngular();
    expect(element.all(by.repeater('emailOption in emailOptions')).isPresent()).toBeTruthy();
    $('[ng-click="bvShow=false"]').click();
  });

  it('Step 12: Verify Download chart contents feature.', async () => {
    /** Verify Download chart contents feature. */

    appTitle.DispatchChart.EditChartBtn.first().click();
    browser.sleep(3000);
    winSel = await appTitle.selectWindow();
    browser.switchTo().window(winSel[1]);
    const highcharts_legend_item_4 = await appTitle.getNumberHighchartsVMLegendItem(0);
    expect(highcharts_legend_item === highcharts_legend_item_4).toBe(true, 'Legent chart should be equal');
    expect(appTitle.DispatchChart.DownloadChartContentBtn.isPresent()).toBeTruthy();
    appTitle.DownloadingCSVFile(appTitle.DownloadOption.CsvContextMenuBtn,
      appTitle.DispatchChart.DownloadCsvChartbtn, downloadFileName.downloadCSV);
    browser.sleep(1000);
    browser.close();
    await browser.switchTo().window(winSel[0]);
    browser.sleep(5000);

  });

});
