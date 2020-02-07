import { $, $$, browser, protractor } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';
import { downloadFileType, downloadFileName } from '../../helpers/testDetails.data';

describe('19590: Performance Analyst - Report', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;

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


  it('Step 1: Ensure report can be selected from drop down list.', async () => {


    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'));
    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.sleep(5000);
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('City Of Lawrence'))
      .click();
    // appTitle.selectClientMain('All Clients', ['City Of Lawrence'],
    //   appName.performanceAnalyst);
    // $$('[ng-click="vm.selectView(view)"]').get(9).click();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.report);
    browser.waitForAngular();
    browser.sleep(5000);
    browser.actions().mouseMove($('[ng-model="reportViewerVM.selectedReport"]')).perform();
    appTitle.selectDropdownbyNum($('[ng-model="reportViewerVM.selectedReport"]'), 2);
    expect($('[ng-model="reportViewerVM.selectedReport"]').$('option:checked').getText()).toEqual('Sarah Test');
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    // await element.all(by.tagName('option')).then((options) => {
    //   options[2].click();
    // });

  });

  it('Step 2: Verify Print feature of different sections of report', async () => {
    await appTitle.DownloadOption.ChartContextMenuBtn.click();

    const printButton = await $$('[class="highcharts-menu-item"]').first();
    const result = await browser.executeAsyncScript((elm, callback) => {
      function listener() {
        callback(true);
      }

      window.print = listener;
      elm.click();
    }, printButton.getWebElement());
    browser.sleep(3000);
    expect(result).toBe(true, 'Print preview should be present');
    browser.sleep(3000);
  });

  it('Step 3: Verify download feature of different sections of report.', async () => {
    /** Downloading Chart PNG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePNG, downloadFileType.PNG);
    /** Downloading Chart JPEG Image */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileJPEG, downloadFileType.JPEG);
    /** Downloading Chart PDF File */
    appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePDF, downloadFileType.PDF);

    // element(by.tagName('select.form-control.ng-valid.ng-not-empty.ng-dirty.ng-touched')).click();


  });

  it('Step 4: Ensure add annotation feature of trends.', async () => {
    /** Adding Annotation with specified date */

    // ** Create annotation */
    browser.sleep(3000);
    $$('[ng-click="buttonsVM.Annotation()"]').last().click();
    appTitle.annotationModal.annotationNotes.sendKeys('Test Annotation');
    appTitle.annotationModal.annotationCalendarIcon.click();
    const annotationDate = new Date(new Date().setDate(new Date().getDate() - 3));
    appTitle.selectCalendarMonthYear(annotationDate);
    appTitle.annotationModal.editAnnotationOkbtn.click();
    browser.sleep(3000);
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(0);
    for (let x = 0; x <= trendIndex.length - 3; x++) {

      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');

    }

    // ** Hovering Annotation */
    for (let x = 0; x <= await $$('[class="highcharts-grid highcharts-yaxis-grid "]').count() - 1; x++) {

      // tslint:disable-next-line:max-line-length
      browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
      if (await $('.highcharts-point-hover').isPresent()) {
        browser.sleep(2000);
        expect($('.highcharts-point-hover').isPresent()).toBeTruthy();
        break;
      }

    }



  });

  xit('Step 5: Ensure edit annotation feature of trends.', async () => {


    // ** edit  annotation */
    browser.sleep(3000);
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(0);
    for (let x = 0; x <= trendIndex.length - 3; x++) {

      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');

    }

    await browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform();
    browser.sleep(2000);
    $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
    appTitle.annotation.editAnnotation.click();
    expect(appTitle.annotationModal.annotationNotes.isPresent()).toBe(true, 'edit annotatoion modal does not exist');
    appTitle.annotationModal.annotationCalendarIcon.click();
    const dateStart = new Date('06/05/2019');
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.annotationModal.annotationNotes.clear();
    appTitle.annotationModal.annotationNotes.sendKeys('test2');
    appTitle.annotationModal.editAnnotationOkbtn.click();

    browser.sleep(10000);

  });

  xit('Step 6: Ensure delete annotation feature of trends.', async () => {


    // ** edit  annotation */
    browser.sleep(3000);
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(0);
    for (let x = 0; x <= trendIndex.length - 3; x++) {

      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');

    }

    await browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform();
    browser.sleep(2000);
    $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
    appTitle.annotation.deleteAnnotation.click();

    for (let x = 0; x <= trendIndex.length - 3; x++) {

      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');

    }
    // ** Hovering Annotation */
    await browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').first().getWebElement()).perform();
    browser.sleep(2000);
    // tslint:disable-next-line:max-line-length
    expect($('[class="highcharts-point highcharts-negative highcharts-point-hover"]').isPresent()).toBe(false, 'Annotation was not deleted');
    browser.sleep(10000);

  });


});

