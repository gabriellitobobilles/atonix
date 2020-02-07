import { ElementFinder, by, element, $, $$, browser, protractor } from 'protractor';
import { downloadFileType, downloadFileName } from '../../helpers/testDetails.data';
import { helper } from '../../page/performanceHelper.po';
import * as validator from '../../page/performanceAlertConstants';

describe('19607: Data Explorer - Hamburger (Chart Context) menu', () => {

  const appTitle = new helper();
  const EC = protractor.ExpectedConditions;
  // tslint:disable-next-line:one-variable-per-declaration
  let win;

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

  it('Step 1: Verify Print report feature.', async () => {

    appTitle.clickAppMenu();
    appTitle.checkPerformanceAppIcon();
    appTitle.clickPerformanceAnalysApp(validator.AppName.dataExplorer);
    browser.waitForAngular();
    browser.driver.sleep(3000);

    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetNodeTree
      .getText()).indexOf('All Clients'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('City Of Lawrence'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Waste Water Treatment Plants (WWTP)'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    // tslint:disable-next-line:max-line-length
    await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.get((await appTitle.dataExplorerNavElemSelector.assetChildNodeTree.getText()).indexOf('Kansas River WWTP'))
      .$('[class="arrow-cursor fa fa-caret-right"]').click();
    await appTitle.dataExplorerNavElemSelector.assetTree.get((await appTitle.dataExplorerNavElemSelector.assetTree
      .getText()).indexOf('Delayed KRWWTP LIMS Data'))
      .click();

    appTitle.atonixTrendButtons.trenZoombtn.click();
    win = await appTitle.selectWindow();
    await browser.switchTo().window(win[1]);
    await appTitle.printPreview();
    browser.sleep(2000);
    browser.close();
    await browser.switchTo().window(win[0]);



  });


  it('step 2: Save as different file types', async () => {

    /** Ensure reports can be selected from drop down list. */

    /** Downloading Chart PDF File */
    await appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePDF, downloadFileType.pdf);
    /** Downloading Chart JPEG Image */
    await appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileJPEG, downloadFileType.jpeg);
    /** Downloading Chart SVG File */
    await appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FileSVG, downloadFileType.svg);
    /** Downloading Chart PNG Image */
    await appTitle.DownloadingChartPNGImage(appTitle.DownloadOption.ChartContextMenuBtn,
      appTitle.DownloadOption.DownLoadListOption, downloadFileName.FilePNG, downloadFileType.png);


  });


});
