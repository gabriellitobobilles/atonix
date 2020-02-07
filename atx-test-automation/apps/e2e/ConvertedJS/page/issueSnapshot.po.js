"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var protractor_1 = require("protractor");
var helper_1 = require("../helpers/helper");
var utils_1 = require("../helpers/utils");
var helper = new helper_1.Helper();
var util = new utils_1.Utils();
var IssueSnapshot = /** @class */ (function () {
    function IssueSnapshot() {
        this.modalHeader = protractor_1.$(".modal-header");
        this.issueClassDropdown = protractor_1.$("[ng-model=\"baseVM.newClass\"]");
        this.issueCategoryDropdown = protractor_1.$("[ng-model=\"baseVM.newCategory\"]");
        this.createNewIssueBtn = protractor_1.$("[ng-click=\"baseVM.createNewIssue(baseVM.newCategory)\"]");
        // top right buttons
        this.saveIssueBtn = protractor_1.$("[title=\"Save Changes\"]");
        this.deleteIssueBtn = protractor_1.$("[title=\"Delete Issue\"]");
        this.deleteItemBtn = protractor_1.$("[title=\"Delete Item\"]");
        // General - Left panel
        this.generalContainer = protractor_1.$(".ui-layout-rounded");
        this.leftPanel = this.generalContainer.$(".container-fluid > div.row > div:nth-child(1)");
        this.assetName = this.leftPanel.$("b.uppercase");
        this.issueNumber = this.leftPanel.$("b[ng-if=\"baseVM.issue.AssetIssueID != -1\"]");
        this.generalInfoLabel = this.generalContainer.$("b.tab-label");
        this.issueNameTxt = this.generalContainer.$("[ng-model=\"baseVM.issue.IssueTitle\"]");
        this.priorityDropdown = this.generalContainer.$("[ng-model=\"baseVM.issue.Priority\"]");
        this.showOnScorecardCheckbox = this.generalContainer.$("[ng-model=\"baseVM.issue.Scorecard\"]");
        // General - Center panel
        this.centerPanel = protractor_1.$(".container-fluid > div.row > div:nth-child(2)");
        this.issueClassNameLabel = this.centerPanel.$$("div.row span.ng-binding").get(0);
        this.categoryLabel = this.centerPanel.$$("div.row span.ng-binding").get(1);
        this.issueStatusDropdown = protractor_1.$("[ng-model=\"baseVM.issue.ActivityStatusID\"]");
        this.resolutionStatusDropdown = protractor_1.$("[ng-model=\"baseVM.issue.ResolutionStatusID\"]");
        // General - Right panel
        // Summary Panel
        this.summaryPane = {
            shortSummaryTxt: protractor_1.$('#shortSummary'),
            saveShortSummary: protractor_1.$("[ng-click=\"baseVM.saveShortSummary()\"]"),
            issueSummaryEditBtn: protractor_1.$("[title=\"Edit\"]"),
            issueSummaryFileImport: protractor_1.$("#issueSummaryFileInput"),
            issueSummaryContentDisplay: protractor_1.$("[class=\"panel-body issueTextEditor\"]"),
            issueSummaryContentiFrame: protractor_1.$("#mceIssueSummary_ifr"),
            issueSummaryContentTxtArea: protractor_1.$("[data-id=\"mceIssueSummary\"]"),
            saveIssueSmmary: protractor_1.$("[ng-click=\"baseVM.saveSummary()\"]"),
        };
        this.detailsPane = {
            tagInput: protractor_1.$("div[id=\"issueTagsDiv\"] #addTag"),
            tagAddBtn: protractor_1.$("div[id=\"issueTagsDiv\"] button")
        };
        // Email Pop up
        this.emailPopUpModal = protractor_1.$("[name=\"editEmailForm\"]");
        this.emailPopUpActionName = protractor_1.$$("[name=\"editEmailForm\"] .form-group .data-tag").get(0);
        this.emailPopUpRecipients = protractor_1.$("[name=\"editEmailForm\"] [name=\"recipients\"]");
        this.emailPopUpSubject = protractor_1.$("[name=\"editEmailForm\"] [name=\"subject\"]");
        this.emailSendBtn = protractor_1.$("[ng-click=\"editEmailVM.SendEmail()\"]");
        this.emailCancelBtn = protractor_1.$("[ng-click=\"editEmailVM.Cancel()\"]");
        this.toastSuccess = protractor_1.$(".toast-success");
        this.toastMessage = protractor_1.$(".toast-message");
        this.toastCloseBtn = protractor_1.$(".toast-close-button");
        this.overlay = protractor_1.$("[ng-show=\"baseVM.saving\"]");
        // Discussion
        this.showAutoGenEntries = protractor_1.$("[ng-model=\"discussionVM.showAutogenEntries\"]");
        this.discussionEntries = protractor_1.$$("[ng-repeat=\"entry in discussionVM.discussion.Entries | orderBy : '-CreateDateZ.getTime()'\"]");
        this.emailPopUpIframe = protractor_1.$("[name=\"editEmailForm\"] iframe");
        this.emailPopUpBody = protractor_1.$("p");
    }
    // can be refractored commented for Screenplay pattern
    IssueSnapshot.prototype.createNewIssue = function (issueData) {
        this.issueClassDropdown.$("[label=\"" + issueData.issueClass + "\"]").click();
        helper.waitAndClick(this.issueCategoryDropdown.$("[label=\"" + issueData.issueCategory + "\"]"));
        // helper.waitAndClick(this.issueCategoryDropdown.$(`[label="architecto_15477221197161"]`))
        this.createNewIssueBtn.click();
        helper.waitForDisappear(protractor_1.$(".modal-content"));
        protractor_1.browser.sleep(3000);
        this.fillIssueForm(issueData);
        helper.waitForVisible(this.issueNumber);
        return this.issueNumber.getText();
    };
    IssueSnapshot.prototype.getCategoryOptions = function () {
        return this.issueCategoryDropdown.$$("option");
    };
    // can be refractored commented for Screenplay pattern
    IssueSnapshot.prototype.fillIssueForm = function (issueData) {
        var issueInfo = issueData.issueInfo;
        helper.clearAndSendKeys(this.issueNameTxt, issueInfo.name);
        this.priorityDropdown.$("[label=\"" + issueInfo.priority + "\"]").click();
        // NEED LOGIC FOR SHOW ON SCORECARD. IF it's selected or what... yeah!
        this.setIssueStatus(issueData.issueInfo.status);
        this.summaryPane.shortSummaryTxt.sendKeys(issueInfo.shortSummary);
        this.saveIssueBtn.click();
        protractor_1.browser.sleep(2000);
        helper.waitForVisible(this.deleteIssueBtn);
        protractor_1.browser.sleep(1000);
    };
    /**
     * @param prio  'Low', 'Medium', 'High', 'Critical'
     */
    IssueSnapshot.prototype.setIssuePriority = function (prio) {
        this.priorityDropdown.$("[value=\"" + prio + "\"]").click();
    };
    /**
     * @param status Open | Closed
     */
    IssueSnapshot.prototype.setIssueStatus = function (status) {
        this.issueStatusDropdown.$("[label=\"" + status + "\"]").click();
    };
    /**
     * returns array of options in Resolution Status drop down
     */
    IssueSnapshot.prototype.getResolutionStatus = function () {
        return this.resolutionStatusDropdown.$$("option");
    };
    /**
     * @returns string of selected resolution status
     */
    IssueSnapshot.prototype.getSelectedResolutionStatus = function () {
        return this.resolutionStatusDropdown.$(" option[selected=\"selected\"]").getText();
    };
    IssueSnapshot.prototype.setResolutionStatus = function (resolutionName) {
        this.resolutionStatusDropdown.$("[label=\"" + resolutionName + "\"]").click();
    };
    IssueSnapshot.prototype.waitForOverlay = function () {
        helper.waitForVisibleAndDisappear(this.overlay);
    };
    IssueSnapshot.prototype.getAllDiscussionEntryDetailsElem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var discussionEntriesElem, entries, totalDiscussion, idx;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        discussionEntriesElem = protractor_1.$$("[ng-repeat=\"entry in discussionVM.discussion.Entries | orderBy : '-CreateDateZ.getTime()'\"] ");
                        entries = [];
                        return [4 /*yield*/, discussionEntriesElem.count()];
                    case 1:
                        totalDiscussion = _a.sent();
                        for (idx = 0; idx <= totalDiscussion - 1; idx++) {
                            entries.push({
                                header: this.getDiscussionHeader(discussionEntriesElem.get(idx)),
                                body: this.getDiscussionBody(discussionEntriesElem.get(idx)),
                                footer: this.getDiscussionFooter(discussionEntriesElem.get(idx))
                            });
                        }
                        return [2 /*return*/, entries];
                }
            });
        });
    };
    IssueSnapshot.prototype.getDiscussionHeader = function (discussionElem) {
        var panelHeader = discussionElem.$(".panel-heading");
        /** might need to break down to 'Action', 'from', 'date'
         * Ex:
         * header: {
         *  action: string,
         *  from: string,
         *  date: string
         * }
         */
        return panelHeader.getText();
    };
    IssueSnapshot.prototype.getDiscussionBody = function (discussionElem) {
        var panelBody = discussionElem.$$(".panel-body.issueTextEditor [ng-bind-html=\"entry.SafeContent\"] p");
        // might need to create object later body: {}
        return panelBody.getText();
    };
    IssueSnapshot.prototype.getDiscussionFooter = function (discussionElem) {
        var panelFooter = discussionElem.$(".panel-footer");
        return panelFooter.getText();
    };
    IssueSnapshot.prototype.getToastMessage = function () {
        helper.waitForVisible(this.toastMessage);
        var toastMessage = this.toastMessage.getText();
        this.toastCloseBtn.click();
        helper.waitForDisappear(this.toastMessage);
        return toastMessage;
    };
    IssueSnapshot.prototype.getEmailPopUpDetails = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.emailPopUpActionName.getText()];
                    case 1:
                        _a.actionName = _b.sent();
                        return [4 /*yield*/, this.emailPopUpRecipients.getAttribute('value')];
                    case 2:
                        _a.recipients = _b.sent();
                        return [4 /*yield*/, this.emailPopUpSubject.getAttribute('value')];
                    case 3:
                        _a.subject = _b.sent();
                        return [4 /*yield*/, this.getEmailPopUpBody()];
                    case 4: return [2 /*return*/, (_a.body = _b.sent(),
                            _a)];
                }
            });
        });
    };
    IssueSnapshot.prototype.getEmailPopUpBody = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util.switchToIframe(this.emailPopUpIframe);
                        return [4 /*yield*/, this.emailPopUpBody.getText()];
                    case 1:
                        body = _a.sent();
                        util.switchToMainFrame();
                        return [2 /*return*/, body.split(/\n/)];
                }
            });
        });
    };
    IssueSnapshot.prototype.getAttachments = function () {
        return protractor_1.$$(".entryAttachments > div[ng-repeat=\"file in editEmailVM.emailOverride.EmailAttachments\"]");
    };
    IssueSnapshot.prototype.getAttachmentByName = function (name) {
        return protractor_1.element(protractor_1.by.xpath("//div[@ng-repeat=\"file in editEmailVM.emailOverride.EmailAttachments\"]//a[text()=\"File:" + name + "\"]"));
    };
    IssueSnapshot.prototype.getAttachmentsFileName = function () {
        return this.getAttachments().map(function (fileNames) {
            return fileNames.getText();
        });
    };
    return IssueSnapshot;
}());
exports.IssueSnapshot = IssueSnapshot;
//# sourceMappingURL=issueSnapshot.po.js.map