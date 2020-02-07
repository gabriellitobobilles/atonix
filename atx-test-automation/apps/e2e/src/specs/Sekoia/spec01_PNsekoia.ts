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

describe('asset360 sekoia page app', function () {
    var page;
    page = new AngularPage();

    it('should see SEKOIA page', ()=> {
        user.logIn(userObj)
        console.log('Step 3');
        var EC = protractor.ExpectedConditions;
        page.menuapps.click();
        browser.wait(EC.presenceOf(element(by.css('[ng-click="navBarVM.clickShowAppContextBox()"]'))), 9000);
        browser.waitForAngular();
        page.sekoiaapp.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.model('typeaheadVM.customSelected'))), 10000);
    }); 
});

describe('sekoia demo client > UGM Historical Reliability asset navigator', function () {
    var page;
    page = new AngularPage();
    
    it('should click on sekoia demo client and expand its assets', ()=> {
        console.log('Step 4');
        var EC = protractor.ExpectedConditions;
        browser.actions().mouseMove(page.assetnavi3).click().perform();
        browser.sleep(2500);
        browser.actions().mouseMove(page.assetnavixp3).click().perform();
        browser.actions().mouseMove(page.assetnaviUGM).click().perform();
        browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]','UGM Historical Reliability Plan'))), 10000);
        browser.waitForAngular();
    });

     it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', ()=> {
        console.log('Step 5');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        page.searchasset.sendKeys('UGM Historical Reliability Plan');
        browser.sleep(5000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(5000);
        browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]','UGM Historical Reliability Plan'))), 10000);
    }); 
 
});
 describe('asset360 sekoia asset navigator functionalities and cancel adhoc tree', function () {
    var page;
    page = new AngularPage();

    it('should click sekoia add button asset navigator', ()=> {
        console.log('Step 6');
        var EC = protractor.ExpectedConditions;
        browser.sleep(10000);
        browser.waitForAngular();
        browser.actions().mouseMove(page.assetaddnav).click().perform()
        browser.wait(EC.presenceOf(element(by.className('modal-title'))), 10000);
    });
    it('should input text in Tree Name on New Adhoc Tree', ()=> {
        console.log('Step 7');
        var EC = protractor.ExpectedConditions;
        browser.sleep(5000);
        page.addhoctreename.sendKeys('TreeName test1');
        browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
    });
    
    it('should add click checkbox on new ad hoc tree', ()=> {
        console.log('Step 8');
        var EC = protractor.ExpectedConditions;
        page.cboxassoclent1.click();
        page.cboxassoapp1.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.className('ng-valid ng-dirty ng-valid-parse ng-touched ng-not-empty'))), 10000);
    });
    it('should click dropdown add category on new ad hoc tree', ()=> {
        console.log('Step 9');
        var EC = protractor.ExpectedConditions;
        page.addcategoryahdd.click();
        browser.sleep(5000);
        page.pickddaddcat1.click();
        browser.waitForAngular();
        browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
        
    });
    it('should click cancel button on add hoc tree pop-up', ()=> {
        console.log('Step 10');
        var EC = protractor.ExpectedConditions;
        page.canceladdhoc.click();
        browser.waitForAngular();
        browser.wait(EC.invisibilityOf(element(by.className('modal-title'))), 8000);
    });
});
describe('asset360 sekoia asset navigator functionalities and save adhoc tree', function () {
        var page;
        page = new AngularPage();
    it('should click sekoia add button asset navigator', ()=> {
        console.log('Step 11');
        var EC = protractor.ExpectedConditions;
        browser.sleep(10000);
        browser.waitForAngular();
        browser.actions().mouseMove(page.assetaddnav).click().perform()
        browser.sleep(10000);
        browser.waitForAngular();
    });
    it('should enter adhoc treename', ()=> {
        console.log('Step 12');
        var EC = protractor.ExpectedConditions;
        browser.sleep(5000);
        page.addhoctreename.sendKeys('TreeName test1');
        browser.waitForAngular();
        //browser.sleep(5000);
        browser.wait(EC.elementToBeClickable(element(by.css('[ng-click="saveAHTVM.save()"]'))), 250000);
    });
    
    it('should add click checkbox on new ad hoc tree', ()=> {
        console.log('Step 13');
        var EC = protractor.ExpectedConditions;
        page.cboxassoclent1.click();
        page.cboxassoapp1.click();
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.className('ng-valid ng-dirty ng-valid-parse ng-touched ng-not-empty'))), 10000);
    });
    it('should click dropdown add category on new ad hoc tree', ()=> {
        console.log('Step 14');
        var EC = protractor.ExpectedConditions;
        page.addcategoryahdd.click();
        browser.sleep(5000);
        page.pickddaddcat1.click();
        browser.waitForAngular();
        browser.sleep(5000);
    });
    it('should click add button on add hoc tree pop-up', ()=> {
        console.log('Step 15');
        var EC = protractor.ExpectedConditions;
        page.saveaddhoc.click();
        browser.waitForAngular();
        browser.wait(EC.invisibilityOf(element(by.className('modal-title'))), 8000);
    });
});
describe('asset360 sekoia asset navigator functionalities and edit and delete adhoc tree', function () {
    var page;
    page = new AngularPage();
    it('should click sekoia edit button asset navigator', ()=> {
        console.log('Step 16');
        var EC = protractor.ExpectedConditions;
        browser.sleep(8000);
        browser.waitForAngular();
        browser.actions().mouseMove(page.editaddhocbtn).click().perform()
        //browser.sleep(5000);
        browser.waitForAngular();
        browser.wait(EC.presenceOf(element(by.className('bg-info'))), 10000);
    });
    it('should click sekoia hover mouse on treename navigator', ()=> {
        console.log('Step 17');
        var EC = protractor.ExpectedConditions;
        browser.sleep(8000);
        browser.waitForAngular();
        browser.actions().mouseMove(page.treenameline1).click().perform()
        browser.actions().mouseMove(page.deladdhocbtn).click().perform()
        browser.sleep(5000);
        browser.switchTo().alert().accept();
        browser.waitForAngular();
    });
    it('should click sekoia run mode navigator', ()=> {
        console.log('Step 18');
        var EC = protractor.ExpectedConditions;
        browser.sleep(8000);
        browser.waitForAngular();
        browser.actions().mouseMove(page.runaddhocbtn).click().perform();
        browser.waitForAngular();
        browser.wait(EC.invisibilityOf(element(by.className('bg-info'))), 8000);
    });
});
describe('sekoia demo client > UGM Historical Reliability asset navigator', function () {
    var page;
    page = new AngularPage();

     it('should click search navigator then enter sekoia demo client>UGM Historical Reliability', ()=> {
        console.log('Step 19');
        var EC = protractor.ExpectedConditions;
        browser.waitForAngular();
        page.searchasset3.sendKeys('UGM Historical Reliability Plan');
        browser.sleep(5000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.wait(EC.presenceOf(element(by.cssContainingText('[ng-click="treeController.click(node)"]','UGM Historical Reliability Plan'))), 10000);
    }); 
 
}); 
describe('asset360 sekoia timeslider feature', function () {
    var page;
    page = new AngularPage();
 
    it('should click jumpTo button', ()=> {
        console.log('Step 20');
        var EC = protractor.ExpectedConditions;
        page.jumptobtn.click();
        page.jmplastqtr.click();
        browser.sleep(5000);
    });

    it('should click time slider then slide it to the left', async()=> {
        //browser.waitForAngular();
        const EC = protractor.ExpectedConditions;
        const ylwCircle = element(by.id('navIndicatorHandle')); 
        const datetext = element(by.id('navIndicatorDate')); 
        const yCircle = element(by.id('navIndicator'));
        console.log('Step 22');
        browser.waitForAngular();
        browser.sleep(10000);
        //browser.wait(EC.presenceOf(ylwCircle), 10000).then() => { 
        browser.actions().mouseMove(ylwCircle).click().perform()
        browser.actions().mouseDown(ylwCircle).mouseMove({x: -100, y: 0}).mouseUp().perform(); 
        await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
        await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
        //browser.sleep(12000);
    });
    it('should click time slider then slide it to the right', async()=> {
        browser.waitForAngular();
        const EC = protractor.ExpectedConditions;
        const ylwCircle = element(by.id('navIndicatorHandle')); 
        const datetext = element(by.id('navIndicatorDate')); 
        const yCircle = element(by.id('navIndicator'));
        console.log('Step 23');
        browser.waitForAngular();
        browser.sleep(10000);
        browser.actions().mouseMove(ylwCircle).click().perform()
        browser.actions().mouseDown(ylwCircle).mouseMove({x: 250, y: 0}).mouseUp().perform(); 
        await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
        await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
    });
});
describe('asset360 sekoia asset JumpTo feature', function () {
    var page;
    page = new AngularPage();

    it('should click last year, then click again jumpTo button', async() => {
        console.log('Step 24');
        browser.sleep(10000);
        var EC = protractor.ExpectedConditions;      
        page.jumptobtn.click();
        browser.sleep(1000);
        page.jmplastyr.click();
        await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
    });
    
   
    it('should click last month, then click again jumpTo button', async()=> {
        console.log('Step 25');
        var EC = protractor.ExpectedConditions;  
        page.jumptobtn.click();
        browser.sleep(1000);
        page.jmplastmonth.click();
        await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
        await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
    });
    it('should click tomorrow, then click again jumpTo button', async()=> {
        console.log('Step 26');
        var EC = protractor.ExpectedConditions; 
        page.jumptobtn.click();
        page.jmptomorrow.click();
        await browser.wait(async () => await browser.element(by.css('.tableLoadingSpinner.ng-hide')).isPresent);
        await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
    });
    it('should click Now, then click again jumpTo button', async()=> {
        console.log('Step 27');
        var EC = protractor.ExpectedConditions; 
        page.jumptobtn.click();
        page.jmpnow.click();
        await browser.wait(EC.presenceOf(element(by.className('highcharts-shadow'))), 15000);
    });
});

describe('Sekoia Summarize Map Data dropdown select', function () {
    var page;
    page = new AngularPage();
    it('should click dropdown, then select map dropdown', async() => {
        browser.sleep(8000);
        browser.waitForAngular();
        console.log('Step 28');
        var EC = protractor.ExpectedConditions;
        var i:number; 
        browser.sleep(10000);
        await browser.wait(EC.elementToBeClickable(page.mapdrpdown), 250000);
        //for(i = 7; i>=1; i--) {
        for(i = 4; i>=1; i--) {
            await browser.actions().mouseMove(page.mapdrpdown).click().perform()
            browser.sleep(5000);
            browser.actions().sendKeys(protractor.Key.DOWN).perform();
            browser.sleep(2500);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(15000);
        }
    });
    it('should click dropdown, then select map dropdown go to first option', async() => {
        browser.sleep(5000);
        browser.waitForAngular();
        console.log('Step 29');
        var EC = protractor.ExpectedConditions;
        var i:number; 
        await browser.wait(EC.elementToBeClickable(page.mapdrpdown), 250000);
        await browser.actions().mouseMove(page.mapdrpdown).click().perform()
        browser.sleep(5000);
        //for(i = 7; i>=1; i--) {
        for(i = 4; i>=1; i--) {  
            browser.actions().sendKeys(protractor.Key.UP).perform();
            browser.sleep(1000);
        }
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
});







