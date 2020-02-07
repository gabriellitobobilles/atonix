import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
import {AngularPage} from '../../page/page_PNsekoia'
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user'


const user = new User()
const userObj = {
    email: 'AtonixQATeam@BlackandVeatch.onmicrosoft.com',
    password: 'Passw0rd1!',
  }

describe('asset360 sekoia page app and select specific asset', function () {
    var page;
    page = new AngularPage();

    it('should see SEKOIA page', ()=> {
        user.logIn(userObj)
        console.log('Step 56');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        page.menuapps.click();
        browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        page.sekoiaapp.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 50000);
    }); 
    it('should click on the keep and open panel feature', async()=> {
        console.log('Step 57');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        await browser.actions().mouseMove(page.hidepanel).click().perform();
        browser.sleep(5000);
        await browser.actions().mouseMove(page.openpanel).click().perform();
    });
    it('should click search navigator then enter sekoia UGM Historical Reliability Plan', ()=> {
        console.log('Step 58');
        var EC = protractor.ExpectedConditions;
        browser.actions().mouseMove(page.assetnavi3).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.assetnavixp3).click().perform()
        browser.actions().mouseMove(page.assetnaviUGM).click().perform()
        browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]','UGM Historical Reliability Plan'))), 10000);
        browser.waitForAngular();
    }); 
});
describe('sekoia trends tab', function () {
    var page;
    page = new AngularPage();
    const downloadFileName = {
        FilePNG: 'chart.png',
        FileJPEG: 'chart.jpg',
        FilePDF: 'chart.pdf',
        FileSVG: 'chart.svg',
        FileCSV: 'chart.csv',
        FilePRcsv: 'Pole Replacement.csv'
       }

    it('should click on download table and chart content', ()=> {
        console.log('Step 59');
        var EC = protractor.ExpectedConditions;
        page.deleteAlreadyDownloadedFiles(downloadFileName.FileCSV);
        page.deleteAlreadyDownloadedFiles(downloadFileName.FilePRcsv);
        browser.sleep(6000);
        console.log('delete old CSV files');
        browser.actions().mouseMove(page.dltableBtn).click().perform();
        browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
        browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
        browser.actions().mouseMove(page.dlchartcBtn).click().perform();
        browser.sleep(6000);
    });
   
    it('should click on download table and chart content', ()=> {
        console.log('Step 60');
        var EC = protractor.ExpectedConditions;
        page.verifyFileInDownloadsFolder(downloadFileName.FilePRcsv);
        page.verifyFileInDownloadsFolder(downloadFileName.FileCSV);
    });
    it('should click on chart menu and download images', async()=> {
        console.log('Step 61');
        var EC = protractor.ExpectedConditions;
        var i:number; 
        var itm = 1;
        browser.sleep(8000);
        page.deleteAlreadyDownloadedFiles(downloadFileName.FilePNG)
        page.deleteAlreadyDownloadedFiles(downloadFileName.FileJPEG)
        page.deleteAlreadyDownloadedFiles(downloadFileName.FilePDF)
        page.deleteAlreadyDownloadedFiles(downloadFileName.FileSVG)
        console.log('Previous downloaded files deleted');
        for(i = 3; i>=0; i--) {
            await browser.actions().mouseMove(element(by.className('highcharts-button-symbol'))).click().perform();
            browser.sleep(4000);
            await browser.actions().mouseMove(element.all(by.className('highcharts-menu-item')).get(itm)).click().perform();
            browser.sleep(6000);
            itm++;
            if(itm == 3) { 
                page.verifyFileInDownloadsFolder(downloadFileName.FilePNG);
                console.log('PNG downloading');
             } else if (itm == 2) { 
                page.verifyFileInDownloadsFolder(downloadFileName.FileJPEG);
                console.log('JPEG downloading');
             } else if (itm == 1) { 
                page.verifyFileInDownloadsFolder(downloadFileName.FilePDF);
                console.log('PDF downloading');
             }  else { 
                page.verifyFileInDownloadsFolder(downloadFileName.FileSVG);
                console.log('SVG downloading');
             }
        }
    });

});