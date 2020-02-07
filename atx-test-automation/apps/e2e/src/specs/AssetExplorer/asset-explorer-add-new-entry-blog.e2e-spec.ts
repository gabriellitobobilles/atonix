import { ElementFinder, browser, $, $$, by, element, protractor } from 'protractor';
import { AssetExplorer } from '../../page/assetExplorer.po';
import { userObj, appName } from '../../helpers/testDetails.data';
import * as Pages from '../../page/pages';
import { Transform } from 'stream';
import { async } from 'q';
import { User } from '../../helpers/user';
import { Helper } from '../../helpers/helper';
import { BlogEntry, AssetDetails, AttributeTypesEnum } from '../../helpers/interface';
import * as casual from 'casual';

const user = new User();
const helper = new Helper();
const assetExplorerPage = new Pages.AssetExplorer();

const assetObj: AssetDetails = {
  name: 'Atonix',
  descriptiveName: 'Descriptive ' + casual.word,
  attributes: [{
    name: 'attr_' + casual.word,
    attributeType: AttributeTypesEnum['Freeform Text'],
    favorite: true
  }]
};

const blogEntry: BlogEntry = {
  title: 'Test Title',
  body: 'This is a test body',
  tags: ['test', 'blog', 'entry'],
  file: 'tester.gif',
  edittedTitle: 'TestEdit',
  edittedBody: 'Body is now editted',
  edittedTags: ['editted', 'testing'],
  edittedFile: 'smiley1.jpg'
};

describe('Asset Explorer - Blog - Add New Entry', () => {
  beforeAll(async () => {
    user.logIn(userObj);
    user.navigateToApp(appName.assetExplorer);
  });

  it('should be able to load Asset Explorer', () => {
    browser.waitForAngularEnabled();
    expect(assetExplorerPage.appTitle.getText()).toContain('Asset Explorer'.toUpperCase());
  });

  it('Ensure Add New Blog Entry functionality', () => {
    assetExplorerPage.searchAsset(assetObj.name);
    helper.waitAndClick(assetExplorerPage.blogTab);
    expect(assetExplorerPage.blogContentSearchBar);
    expect(assetExplorerPage.addNewEntryHeader.isPresent);
  });

  it('Ensure user should be able to add entry (Title, Tags & File attachments)', () => {
    expect(assetExplorerPage.addBlogEntry(blogEntry)).toBeTruthy();
  });

  it('Ensure Edit, View & Format functionality inside the document entry.', () => {
    expect(assetExplorerPage.viewBlogEntry(blogEntry)).toBeTruthy();
    expect(assetExplorerPage.editBlogEntry(blogEntry)).toBeTruthy();
  });

  it('Ensure Blog entries are able to be deleted (delete permissions)', () => {
    expect(assetExplorerPage.deleteBlogEntry(blogEntry)).toBeTruthy();
  });





});
