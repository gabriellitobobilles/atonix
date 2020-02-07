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
        console.log('Step 51');
        var EC = protractor.ExpectedConditions;
        page.menuapps.click();
        browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        browser.waitForAngular();
        page.sekoiaapp.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 10000);
    }); 

    it('should click search navigator then enter sekoia 1A Automation Substation', ()=> {
        console.log('Step 52');
        browser.waitForAngular();
        page.searchasset.sendKeys('1A Automation Substation');
        browser.sleep(5000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(5000);
    }); 
});
describe('sekoia list tab', function () {
    var page;
    page = new AngularPage();
    it('should click on sekoia list tab', async()=> {
        console.log('Step 53');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        //browser.sleep(20000);
        await browser.actions().mouseMove(page.slisttab).click().perform()
        await browser.wait(EC.presenceOf(element(by.className('ui-grid-header-cell-label'))), 25000);
        browser.sleep(5000);
    });
    it('should click searchbox then search UGM Historical Reliability Plan', async()=> {
        console.log('Step 54s');
        await page.searchasset3.sendKeys('UGM Historical Reliability Plan');
        browser.waitForAngular();
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(5000);
    });


    it('should click UseMap dropdown and select', async()=> {
        console.log('Step 55');
        browser.sleep(5000);
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        var i:number; 

        for(i = 4; i>=1; i--) {
            await browser.wait(EC.elementToBeClickable(page.slistdrpdwn), 250000);
            await browser.actions().mouseMove(page.slistdrpdwn).click().perform()
            browser.sleep(5000);
            browser.actions().sendKeys(protractor.Key.DOWN).perform();
            browser.sleep(2500);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(25000);
            //await browser.wait(async () => await browser.element(by.id('spinner')).isPresent);
            //await browser.wait(EC.invisibilityOf(element(by.id('spinner'))), 160000);
            //await browser.wait((EC.presenceOf(element(by.className('fa fa-spinner fa-2x fa-pulse ng-hide')))), 250000);
            ////await browser.wait(EC.invisibilityOf(element(by.cssContainingText('fa fa-spinner fa-2x fa-pulse', '#spinner'))), 50000);
            //await browser.wait(async () => await browser.element(by.className('fa fa-spinner fa-2x fa-pulse')).isPresent);
        }
    }); 
});