import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ThrowMessage } from '@AtonixWebSites/shared';
var WorkflowService = /** @class */ (function () {
    function WorkflowService(http) {
        this.http = http;
    }
    WorkflowService.prototype.canConfigureWorkflow = function () {
        return this.http
            .get(environment.baseUrl + "/Services/api/Authorization/CanConfigureWorkflow")
            .pipe(catchError(ThrowMessage.error));
    };
    WorkflowService.prototype.issueWarnings = function (assetIssueCategoryTypeID) {
        return this.http.get(environment.baseUrl + "/Services/api/Issues/AssetIssueByCategoryTypeID?assetIssueCategoryTypeID=" + assetIssueCategoryTypeID);
    };
    WorkflowService.prototype.resolutionAndIssueStatuses = function (assetIssueCategoryTypeID) {
        return this.http
            .get(environment.baseUrl + "/Services/api/Issues/ResolutionAndIssueStatuses?assetIssueCategoryTypeID=" + assetIssueCategoryTypeID)
            .pipe(tap(function (results) {
            results.ResolutionStatuses.sort(function (leftSide, rightSide) {
                if (+leftSide.DisplayOrder < +rightSide.DisplayOrder) {
                    return -1;
                }
                if (+leftSide.DisplayOrder > +rightSide.DisplayOrder) {
                    return 1;
                }
                return 0;
            });
        }));
    };
    WorkflowService.prototype.issueCategoryTypes = function (guid) {
        return this.http
            .get(environment.baseUrl + "/Services/api/Issues/ClassAndCategories?guid=" + guid)
            .pipe(catchError(ThrowMessage.error));
    };
    WorkflowService.prototype.saveCategory = function (newCategory) {
        return this.http.post(environment.baseUrl + "/Services/api/Issues/SaveIssueCategory", newCategory);
    };
    WorkflowService.prototype.saveWorkflowAction = function (action) {
        return this.http
            .post(environment.baseUrl + "/Services/api/Issues/SaveWorkflowAction", action)
            .pipe(catchError(ThrowMessage.error));
    };
    WorkflowService.prototype.deleteCategory = function (selectedCategoryTypeID) {
        return this.http.delete(environment.baseUrl + "/Services/api/Issues/IssueCategory/" + selectedCategoryTypeID);
    };
    WorkflowService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], WorkflowService);
    return WorkflowService;
}());
export { WorkflowService };
//# sourceMappingURL=workflow.service.js.map