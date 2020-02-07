import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '@AtonixWebSites/layout';
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
import { MaterialModule } from '@AtonixWebSites/material';
import { FormSortPipe } from '../shared/pipes/sort-order';
import { reducer } from './state/workflow.reducer';
import { WorkflowEffects } from './state/workflow.effects';
import { WorkflowFacade } from './state/workflow.facade';
import { MainComponent } from './containers/main/main.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { AllowableNextStatusesComponent } from './components/drawer/allowable-next-statuses/allowable-next-statuses.component';
import { CategoryActionsComponent } from './components/drawer/category-actions/category-actions.component';
import { ActionTypeStringPipe } from './pipes/action-type-string.pipe';
import { FormRawValuePipe } from './pipes/form-raw-value.pipe';
import { AsFormArrayPipe } from './pipes/as-form-array.pipe';
import { AsFormGroupPipe } from './pipes/as-form-group.pipe';
import { ValueFromEachGroupPipe } from './pipes/value-from-each-group.pipe';
import { ExternalWebsiteComponent } from './components/external-website/external-website.component';
import { AllowableNextStatusTransposePipe } from './pipes/allowable-next-status-transpose.pipe';
import { ValueFromEachObjectPipe } from './pipes/value-from-each-object.pipe';
import { AsNumberPipe } from './pipes/as-number.pipe';
import { StatusesComponent } from './components/statuses/statuses.component';
import { CreateCategorySettingsComponent } from './components/category-settings/create-category-settings/create-category-settings.component';
import { ViewCategorySettingsComponent } from './components/category-settings/view-category-settings/view-category-settings.component';
import { WorkflowFormComponent } from './containers/workflow-form/workflow-form.component';
import { ActionFormComponent } from './components/drawer/action-form/action-form.component';
import { ActionFormAssignUserActionComponent } from './components/drawer/action-type-forms/action-form-assign-user-action/action-form-assign-user-action.component';
import { ActionFormCreateBlogEntryComponent } from './components/drawer/action-type-forms/action-form-create-blog-entry/action-form-create-blog-entry.component';
import { ActionFormCreateIssueComponent } from './components/drawer/action-type-forms/action-form-create-issue/action-form-create-issue.component';
import { ActionFormEmailDetailsComponent } from './components/drawer/action-type-forms/action-form-email-details/action-form-email-details.component';
import { ActionFormModifyAssetTagsComponent } from './components/drawer/action-type-forms/action-form-modify-asset-tags/action-form-modify-asset-tags.component';
import { ActionFormUpdateAttributeDetailsComponent } from './components/drawer/action-type-forms/action-form-update-attribute-details/action-form-update-attribute-details.component';
import { ActionFormUpdateActivityStatusComponent } from './components/drawer/action-type-forms/action-form-update-activity-status/action-form-update-activity-status.component';
import { ActionFormUpdateIssueStatusComponent } from './components/drawer/action-type-forms/action-form-update-issue-status/action-form-update-issue-status.component';
import { ActionFormUpdateMapDetailsComponent } from './components/drawer/action-type-forms/action-form-update-map-details/action-form-update-map-details.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { DisabledDirective } from '../shared/lib/disabled.directive';
import { ModalSaveCategoryComponent } from './components/modal-save-category/modal-save-category.component';
var WorkflowModule = /** @class */ (function () {
    // reminder to put a static forRoot() with all providers here:
    // https://medium.com/@chrishouse/when-to-use-angulars-forroot-method-400094a0ebb7
    function WorkflowModule() {
    }
    WorkflowModule_1 = WorkflowModule;
    WorkflowModule.forRoot = function () {
        return {
            ngModule: WorkflowModule_1,
            providers: []
        };
    };
    var WorkflowModule_1;
    WorkflowModule = WorkflowModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                FontAwesomeModule,
                ReactiveFormsModule,
                MaterialModule,
                AssetTreeModule,
                LayoutModule,
                StoreModule.forFeature('workflow', reducer),
                EffectsModule.forFeature([WorkflowEffects])
            ],
            entryComponents: [ModalDialogComponent, ModalSaveCategoryComponent],
            declarations: [
                MainComponent,
                FormSortPipe,
                CategorySelectorComponent,
                ActionFormComponent,
                ActionFormAssignUserActionComponent,
                ActionFormCreateBlogEntryComponent,
                ActionFormCreateIssueComponent,
                ActionFormEmailDetailsComponent,
                ActionFormModifyAssetTagsComponent,
                ActionFormUpdateAttributeDetailsComponent,
                ActionFormUpdateActivityStatusComponent,
                ActionFormUpdateIssueStatusComponent,
                ModalDialogComponent,
                ActionFormUpdateMapDetailsComponent,
                ActionFormModifyAssetTagsComponent,
                WorkflowFormComponent,
                CreateCategorySettingsComponent,
                StatusesComponent,
                AllowableNextStatusesComponent,
                CategoryActionsComponent,
                ViewCategorySettingsComponent,
                ActionTypeStringPipe,
                FormRawValuePipe,
                AsFormArrayPipe,
                AsFormGroupPipe,
                ValueFromEachGroupPipe,
                ExternalWebsiteComponent,
                AllowableNextStatusTransposePipe,
                ValueFromEachObjectPipe,
                DisabledDirective,
                AsNumberPipe,
                ModalSaveCategoryComponent
            ],
            providers: [WorkflowFacade],
            exports: [MainComponent, CategorySelectorComponent, ModalDialogComponent]
        })
        // reminder to put a static forRoot() with all providers here:
        // https://medium.com/@chrishouse/when-to-use-angulars-forroot-method-400094a0ebb7
    ], WorkflowModule);
    return WorkflowModule;
}());
export { WorkflowModule };
//# sourceMappingURL=workflow.module.js.map