"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var issueSnapshot_po_1 = require("./issueSnapshot.po");
var helper_1 = require("../helpers/helper");
var protractor_1 = require("protractor");
var helper = new helper_1.Helper();
var FillIssueForm = /** @class */ (function (_super) {
    tslib_1.__extends(FillIssueForm, _super);
    function FillIssueForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FillIssueForm.prototype.fillIssue = function (issueData, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var issueInfo, deleteBtn;
            return tslib_1.__generator(this, function (_a) {
                issueInfo = issueData.issueInfo;
                deleteBtn = (type === 'IM') ? this.deleteIssueBtn : this.deleteItemBtn;
                helper.clearAndSendKeys(this.issueNameTxt, issueInfo.name); // issueName
                this.priorityDropdown.$("[label=\"" + issueInfo.priority + "\"]").click();
                // NEED LOGIC FOR SHOW ON SCORECARD. IF it's selected or what... yeah!
                this.setIssueStatus(issueData.issueInfo.status);
                this.summaryPane.shortSummaryTxt.sendKeys(issueInfo.shortSummary);
                // Commented first because this is not set yet in Data passed by spec.
                // add later.
                //
                // issueData.details.tags.forEach(tag => {
                //   this.detailsPane.tagInput.sendKeys(tag);
                //   this.detailsPane.tagAddBtn.click();
                // });
                protractor_1.browser.sleep(2000);
                return [2 /*return*/];
            });
        });
    };
    return FillIssueForm;
}(issueSnapshot_po_1.IssueSnapshot));
exports.FillIssueForm = FillIssueForm;
//# sourceMappingURL=issueSnapshot.task.fillIssueForm.js.map