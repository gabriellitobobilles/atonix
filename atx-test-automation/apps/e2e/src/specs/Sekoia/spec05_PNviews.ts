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
        console.log('Step 54');
        var EC = protractor.ExpectedConditions;
        page.menuapps.click();
        browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        browser.waitForAngular();
        page.sekoiaapp.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 10000);
    }); 

    it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', ()=> {
        console.log('Step 55');
        browser.waitForAngular();
        page.searchasset.sendKeys('UGM Historical Reliability Plan');
        browser.sleep(5000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(5000);
    }); 
});
describe('sekoia view tab', function () {
    var page;
    page = new AngularPage();
    it('should click on sekoia view tab', async()=> {
        console.log('Step 56');
        browser.waitForAngular();
        browser.sleep(20000);
        await browser.actions().mouseMove(page.sviewtab).click().perform()
        browser.sleep(5000);
    });
    it('should click searchbox then search Eastern PC1', ()=> {
        console.log('Step 57s');
        browser.waitForAngular();
        browser.sleep(2500);
        page.searchasset3.sendKeys('Eastern PC1');
        browser.waitForAngular();
        browser.sleep(2500);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(5000);
    }); 

});