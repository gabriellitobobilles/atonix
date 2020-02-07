import { by, element, $, $$, browser, protractor, utils } from 'protractor';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';


describe('19592: Performance Analyst - Summary - Donuts', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let highcharts_legend_item, highcharts_legend;



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

  it('Step 1: Verify Donut for All Clients->City of Lawrence->Waste Water Treatment Plants->WWTP->WWTP', async () => {


    browser.wait(EC.elementToBeClickable(appTitle.getAllAppsMenuIcon()));
    expect(appTitle.getAllAppsMenuIcon().isPresent()).toBeTruthy();
    browser.driver.sleep(5000);
    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.performanceAnalyst);
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    browser.waitForAngular();
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'));
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

    browser.waitForAngular();
    appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    browser.waitForAngular();
    browser.waitForAngular();
    browser.sleep(2000);
    // tslint:disable-next-line:no-shadowed-variable
    browser.actions().mouseMove(element.all(by.css('path.highcharts-point.highcharts-color-0')).get(0)).perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf($('.highcharts-tooltip')));
    browser.wait(async () => $('.highcharts-tooltip'));
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-const
    let name = await $('.highcharts-tooltip').element(by.tagName('text')).$$('tspan').get(0).getText();
    browser.actions().click().perform();
    browser.sleep(3000);
    browser.wait(EC.presenceOf(browser.element(by.css('.arrow-cursor.selectedAsset'))));
    browser.wait(async () => browser.element(by.css('.arrow-cursor.selectedAsset')));
    browser.actions().mouseMove(element(by.css('.arrow-cursor.selectedAsset'))).perform();
    browser.sleep(2000);
    // tslint:disable-next-line:prefer-const
    let val = await $('.arrow-cursor.selectedAsset').element(by.model('asset.Asset')).$('.ng-binding').getText();
    console.log('the val of value is: ' + val);
    console.log('the name of value is: ' + name);
    expect(name === val).toBe(true);
    const assetLanding = await appTitle.dataExplorerNavElemSelector.assetTreeController.getText();
    // tslint:disable-next-line:max-line-length
    appTitle.dataExplorerNavElemSelector.assetTreeController.get(assetLanding.indexOf('Kansas River WWTP') + 2)
      .click();
    browser.waitForAngular();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(4);
    highcharts_legend = await appTitle.getListHighchartsVMLegendItem(4);

    if (highcharts_legend.indexOf('\nUser Notes') > 1 || highcharts_legend.indexOf('\nAll Annotations') > 1) {
      for (let i = 0; i <= highcharts_legend_item - 3; ++i) {

        $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
        // tslint:disable-next-line:max-line-length
        expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
      }

    } else {
      for (let i = 0; i <= highcharts_legend_item - 1; ++i) {
        $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
        // tslint:disable-next-line:max-line-length
        expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
      }

    }

    expect($('g.highcharts-shadow')).toBeTruthy();
    expect(await $$('text.highcharts-title').first().getText()).toBe('by Asset');
    expect(await $$('text.highcharts-title').get(1).getText()).toBe('by Source');
    expect(await $$('text.highcharts-title').get(2).getText()).toBe('by Asset');
    expect(await $$('text.highcharts-title').get(3).getText()).toBe('by Source');

  });



  it('Step 2: Verify Donut for All Clients->Omaha MUD->Florence WTP', async () => {
    /** Verify Clear/Cancel/Ok button feature on comparison chart. */

    // tslint:disable-next-line:max-line-length
    const assetLanding1 = await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText();
    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding1.indexOf('Omaha MUD'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    // await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Water Treatment Plants'))
    //   .click();
    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding1.indexOf('Water Treatment Plants'))
      .click();

    $$('[ng-click="vm.selectView(view)"]').get(0).click();
    browser.waitForAngular();
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.calendarIconStart.click();
    const dateStart = new Date('07/01/2016');
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.selectTimeSlider.calendarIconEnd.click();
    const dateEnd = new Date('12/30/2016');
    appTitle.selectCalendarMonthYear(dateEnd);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);


  });

  // tslint:disable-next-line:max-line-length
  it('Step 3: Verify the donuts along with its charts, data for All Clients->Omaha MUD->Water Treatment Plants->Florence WTP with Time frame -Q3-Q4-2016', async () => {
    /** Ensure Filter functionality on comparison chart. */

    const assetLanding2 = await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText();
    // tslint:disable-next-line:max-line-length
    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding2.indexOf('Water Treatment Plants'))
      .$('[class="fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get(assetLanding2.indexOf('Florence WTP'))
      .click();

    $$('[ng-click="vm.selectView(view)"]').first().click();
    appTitle.trendSelector();
    // browser.driver.wait(async () => {
    //   browser.wait(EC.visibilityOf(appTitle.chartDropDown.chartDropDownBtn), 10000);
    //   return appTitle.chartDropDown.chartDropDownBtn;
    // });
    // appTitle.chartDropDown.chartDropDownBtn.click();
    browser.sleep(3000);
    browser.waitForAngular();
    await element.all(by.repeater('chartSummary in chartVM.charts')).get(3).click();
    browser.waitForAngular();
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.calendarIconStart.click();
    const dateStart = new Date('07/01/2016');
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.selectTimeSlider.calendarIconEnd.click();
    const dateEnd = new Date('12/30/2016');
    appTitle.selectCalendarMonthYear(dateEnd);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();
    $$('[ng-click="vm.selectView(view)"]').first().click();
    highcharts_legend_item = await appTitle.getNumberHighchartsVMLegendItem(0);


    for (let i = 0; i <= highcharts_legend_item - 1; ++i) {
      $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '').click();
      // tslint:disable-next-line:max-line-length
      expect($('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + i + '.highcharts-legend-item-hidden').isPresent()).toBe(true, 'Selected highchart legend item should be hidden');
    }
    expect($('g.highcharts-shadow')).toBeTruthy();

    expect(await $$('text.highcharts-title').first().getText()).not.toEqual(null);
    expect(await $$('text.highcharts-title').get(1).getText()).not.toEqual(null);
    expect(await $$('text.highcharts-title').get(2).getText()).not.toEqual(null);
    expect(await $$('text.highcharts-title').get(3).getText()).not.toEqual(null);
  });

  it('Step 4: Ensure add annotation feature of trends.', async () => {

    const assetLanding3 = await appTitle.dataExplorerNavElemSelector.assetTreeController
      .getText();
    await appTitle.dataExplorerNavElemSelector.assetTreeController.get(assetLanding3.indexOf('All Clients'))
      .click();

    // $$('[ng-click="vm.selectView(view)"]').first().click();
    await appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    // ** Setting  Date Range on the calendar*/
    appTitle.selectTimeSlider.calendarIcon.click();
    appTitle.selectTimeSlider.calendarIconStart.click();
    const dateStart = new Date(new Date().setDate(new Date().getDate() - 30));
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.selectTimeSlider.calendarIconEnd.click();
    const dateEnd = new Date(new Date().setDate(new Date().getDate()));
    appTitle.selectCalendarMonthYear(dateEnd);
    appTitle.selectTimeSlider.calendarApplybtn.first().click();
    appTitle.selectTimeSlider.calendarOKBtn.first().click();
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    // $$('[ng-click="vm.selectView(view)"]').first().click();
    await appTitle.clickPerformanceViewsTab(validator.PerformanceTabName.summary);
    browser.sleep(3000);
    appTitle.trendSelector();
    // await appTitle.chartDropDown.chartDropDownBtn.click();
    // await browser.actions().mouseMove(element.all(by.css('.dropdown-menu')).first()).perform();
    await appTitle.selectingPerformanceAnalystTrends('ALL BCP FILTER DP');
    // await element.all(by.repeater('chartSummary in chartVM.charts')).get(2).click();
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));


    // ** Create annotation */
    browser.sleep(3000);
    appTitle.atonixTrendButtons.annotationBtn.first().click();
    appTitle.annotationModal.annotationNotes.sendKeys('Test Annotation');
    appTitle.annotationModal.annotationCalendarIcon.click();
    // const annotationDate = new Date('12/24/2016');
    const annotationDate = new Date(new Date().setDate(new Date().getDate() - 3));
    appTitle.selectCalendarMonthYear(annotationDate);
    appTitle.annotationModal.editAnnotationOkbtn.click();
    browser.sleep(3000);
    const trendIndex = await appTitle.getListHighchartsVMLegendItem(3);
    for (let x = 0; x <= trendIndex.length - 3; x++) {

      await $('g.highcharts-legend-item.highcharts-line-series.highcharts-color-undefined.highcharts-series-' + x + '').click();
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

  it('Step 5: Ensure edit annotation feature of trends.', async () => {

    for (let x = 0; x <= await $$('[class="highcharts-grid highcharts-yaxis-grid "]').count() - 1; x++) {

      // tslint:disable-next-line:max-line-length
      browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
      if (await $('.highcharts-point-hover').isPresent()) {
        browser.sleep(2000);
        expect($('.highcharts-point-hover').isPresent()).toBeTruthy();
        break;
      }

    }
    $('.highcharts-point-hover').click();
    // $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
    appTitle.annotation.editAnnotation.click();
    expect(appTitle.annotationModal.annotationNotes.isPresent()).toBe(true, 'edit annotatoion modal does not exist');
    appTitle.annotationModal.annotationCalendarIcon.click();
    // const dateStart = new Date('12/20/2016');
    const dateStart = new Date(new Date().setDate(new Date().getDate() - 3));
    appTitle.selectCalendarMonthYear(dateStart);
    appTitle.annotationModal.annotationNotes.clear();
    appTitle.annotationModal.annotationNotes.sendKeys('test2');
    appTitle.annotationModal.editAnnotationOkbtn.click();

  });

  it('Step 6: Ensure delete annotation feature of trends.', async () => {


    // ** delete  annotation */
    browser.waitForAngular();
    browser.wait(EC.stalenessOf($('[class="chart-warning"]')));
    for (let x = 0; x <= await $$('[class="highcharts-grid highcharts-yaxis-grid "]').count() - 1; x++) {

      // tslint:disable-next-line:max-line-length
      browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
      if (await $('.highcharts-point-hover').isPresent()) {
        browser.sleep(2000);
        expect($('.highcharts-point-hover').isPresent()).toBeTruthy();
        break;
      }

    }
    browser.sleep(2000);
    $('.highcharts-point-hover').click();
    // $('[class="highcharts-point highcharts-negative highcharts-point-hover"]').click();
    appTitle.annotation.deleteAnnotation.click();

    // ** Hovering Annotation */
    for (let x = 0; x <= await $$('[class="highcharts-grid highcharts-yaxis-grid "]').count() - 1; x++) {

      // tslint:disable-next-line:max-line-length
      browser.driver.actions().mouseMove($$('[class="highcharts-grid highcharts-yaxis-grid "]').get(x).getWebElement()).perform();
      if (!await $('.highcharts-point-hover').isPresent()) {
        browser.sleep(2000);
        expect($('.highcharts-point-hover').isPresent()).toBe(false, 'Annotation was not successfully deleted');
        break;
      }

    }


  });

});
