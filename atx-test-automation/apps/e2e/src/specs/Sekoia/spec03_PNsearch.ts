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

describe('asset360 sekoia page app and select a specific asset', function () {
    var page;
    page = new AngularPage();

    it('should see SEKOIA page', ()=> {
        user.logIn(userObj)
        console.log('Step 40');
        var EC = protractor.ExpectedConditions;
        page.menuapps.click();
        browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        browser.waitForAngular();
        page.sekoiaapp.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 10000);
    }); 

    it('should click search navigator then enter sekoia 1A Automation Substation', ()=> {
        console.log('Step 41');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        page.searchasset.sendKeys('1A Automation Substation');
        browser.sleep(6000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]','1A Automation Substation'))), 10000);
    }); 
});
describe('sekoia search standard tab', function () {
    var page;
    page = new AngularPage();
     it('should click on sekoia search tab', async()=> {
        console.log('Step 42');
        var EC = protractor.ExpectedConditions;
        browser.sleep(6000);
        await page.sekiosearchtab.click();
        browser.wait(EC.presenceOf(element(by.cssContainingText('.btn.btn-default.btn-sm','Search tips'))), 10000);
    });

    it('should click on sekoia tips', ()=> {
        console.log('Step 43');
        var EC = protractor.ExpectedConditions;
        browser.sleep(6000);
        page.sekoisearchtips.click();
        browser.wait(EC.presenceOf(element(by.css('Search Tips:'))), 30000);
    });
    it('should click on new search input text and then click save icon', ()=> {
        console.log('Step 44');
        var EC = protractor.ExpectedConditions;
        browser.sleep(6000);
        page.searchtxtboxtab.sendKeys('asset = *t');
        browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="tagSearchVM.saveQuickSearch(tagSearchVM.selectedQuickSearch)"]'))), 10000);
        page.sekoisaveicon.click();
        browser.wait(EC.presenceOf(element(by.css('.modal-title'))), 10000);
    });

    it('should enter title name for search and then click ok button', async()=> {
        console.log('Step 45');
        var EC = protractor.ExpectedConditions;
        browser.sleep(6000);
        page.sekioqksavetbox.sendKeys('quicksearch testing');
        browser.wait(EC.presenceOf(element(by.css('.form-control.ng-valid.ng-not-empty.ng-dirty.ng-valid-parse.ng-touched'))), 10000);
        page.sekoimakepublc.click();
        //browser.wait(EC.presenceOf(element(by.cssContainingText('.ng-valid.ng-not-empty.ng-dirty.ng-valid-parse.ng-touched','Make Public'))), 10000);
        await page.sekoiaddcatgry.click();
        page.sekoiaddcatgry.sendKeys('test03');
        browser.sleep(5000);
        page.addsearchcat.click();
        browser.sleep(5000);
        browser.wait(EC.elementToBeClickable(page.sekoiqksaveok), 10000);
        await page.sekoiqksaveok.click();
        browser.wait(EC.invisibilityOf(element(by.className('modal-title'))), 8000);
    });
    it('should click again save button then enter title name for search and then click ok button', async()=> {
        console.log('Step 46');
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(page.sekoisaveicon), 10000);
        page.sekoisaveicon.click();
        browser.wait(EC.presenceOf(element(by.cssContainingText('.modal-title','Save a quick search'))), 10000);
        page.sekioqksavetbox.sendKeys('another quicksearch');
        browser.sleep(5000);
        await page.choosecatgries2.click();
        browser.sleep(5000);
        await page.sekoiqksaveok.click();
        browser.wait(EC.invisibilityOf(element(by.css('.modal-title'))), 8000);
    });
    it('should click on dropdown arrow on new search button, then select newly saved', ()=> {
        console.log('Step 47');
        browser.sleep(6000);
        page.searchdropdown.click();
        browser.sleep(2500);
        page.searchdrpdwnQS.click();
        browser.sleep(5000);
    });
    it('should click on dropdown arrow on new search button, then select and delete public', async()=> {
        console.log('Step 48');
        var EC = protractor.ExpectedConditions;  
        browser.sleep(20000);
        page.searchdropdown.click();
        browser.sleep(2500);
        browser.actions().mouseMove(page.searchdelete3).click().perform();
        await browser.wait(async () => await browser.element(by.cssContainingText('.overlayContainer','[style="display: none;"]')).isPresent);
        browser.sleep(20000);
    });
    it('should click on dropdown arrow on new search button, then select and delete private', async()=> {
        console.log('Step 49');
        browser.sleep(20000);
        page.searchdropdown.click();
        browser.sleep(2500);
        browser.actions().mouseMove(page.searchdelete3).click().perform()
        await browser.wait(async () => await browser.element(by.cssContainingText('.overlayContainer','[style="display: none;"]')).isPresent); 
        browser.sleep(20000);
    });
    it('should click on search tip to remove then new search on search tab', async()=> {
        console.log('Step 50');
        var EC = protractor.ExpectedConditions;    
        page.sekoisearchtips.click(); 
        browser.sleep(20000);
        page.searchtxtboxtab.clear();
        page.searchtxtboxtab.sendKeys('test');
        browser.sleep(5000);
        page.sekoiserchbtn.click();
        browser.sleep(40000);
        browser.wait(EC.invisibilityOf(element(by.cssContainingText('[class="overlayContainer"]','[style="display: none;"]'))), 40000);
    }); 
}); 
 describe('sekoia search result', function () {
    var page;
    page = new AngularPage();
    const downloadFileName = {
        //FileLast: '*.xlsx',
        //FileXLSX: FileFirst + '*.xlsx',
        FileXLSX: 'SearchResultsExport' + '.xlsx',
       }
    it('should click search textbox, clear, and search all on Coal Station 1', async()=> {
        console.log('Step 51');
        var EC = protractor.ExpectedConditions;     
        browser.sleep(20000);
        page.searchtxtboxtab.clear();
        page.searchtxtboxtab.sendKeys('tag=*');
        browser.sleep(5000);
        page.sekoiserchbtn.click();
        browser.sleep(40000);
        await browser.wait(EC.invisibilityOf(element(by.cssContainingText('[class="progress-bar"]','Retrieving Data...'))), 160000);
    });
    it('should click collapse up on result', async()=> {
        console.log('Step 52');
        var EC = protractor.ExpectedConditions;     
        browser.sleep(10000);
        browser.actions().mouseMove(page.srchAssetgClps).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.srchAtachmntgClps).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.srchPhotosgClps).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.srchAsetIsuesgClps).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.srchDiscusEntrygClps).click().perform()
        browser.sleep(2500);
        browser.actions().mouseMove(page.srchCFAuditEntrygClps).click().perform()
        browser.sleep(2500);
        browser.wait(EC.invisibilityOf(element(by.cssContainingText('[class="overlayContainer"]','[style="display: none;"]'))), 40000);
    });
    it('should click search export button', async()=> {
        console.log('Step 53');
        var EC = protractor.ExpectedConditions; 
        //page.deleteAlreadyDownloadedFiles(downloadFileName.FileXLSX)  
        browser.actions().mouseMove(page.srchToogleBtn).click().perform();  
        browser.actions().mouseMove(page.exportsrchresbtn).click().perform();
        browser.sleep(25000);
        //page.verifyFileInDownloadsFolder(downloadFileName.FileXLSX);

/*         var glob = require("glob");
        var filePattern = '*.xlsx';
        browser.driver.wait (function () {
        var filesArray = glob.sync(filePattern);
        if (typeof filesArray !== 'undefined' && filesArray.length > 0) {
        // this check is necessary because `glob.sync` can return
        // an empty list, which will be considered as a valid output
        // making the wait to end.
            return filesArray;
            }
        }, 10000).then(function (filesArray) {
        var downloadFileName = filesArray[0];
        // now we have the filename and can do whatever we want
        console.log('File download was successful');
        });
 */
        console.log('Excel downloading');
        browser.wait(EC.invisibilityOf(element(by.cssContainingText('[class="overlayContainer"]','[style="display: none;"]'))), 40000);
    });
}); 
