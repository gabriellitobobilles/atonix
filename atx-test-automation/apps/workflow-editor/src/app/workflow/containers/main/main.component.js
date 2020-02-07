import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { LayoutFacade } from '@AtonixWebSites/layout';
import { WorkflowFacade } from '../../state/workflow.facade';
import { WorkflowFormState } from '../../model/form-edit-state';
import * as _ from 'lodash';
var MainComponent = /** @class */ (function () {
    function MainComponent(assetTreeFacadeFactory, workflowFacade, activatedRoute, layoutFacade, router, dialog) {
        this.assetTreeFacadeFactory = assetTreeFacadeFactory;
        this.workflowFacade = workflowFacade;
        this.activatedRoute = activatedRoute;
        this.layoutFacade = layoutFacade;
        this.router = router;
        this.dialog = dialog;
        this.selectedAssetGuid = null;
        this.componentActive = true;
        this.hasPermission = false;
        this.formState = WorkflowFormState.Viewing;
        this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        // The asset tree facade must be initialized before the asset tree facade is used.  This call must be before
        // the observables are subscribed to or they won't exist.
        // If the selected asset is an integer or guid it will select that asset in the default tree.  If it is a key
        // it will send the key to the server and selected the inticated tree and asset.
        this.assetTreeFacade.initialize({
            selectedAsset: this.activatedRoute.snapshot.queryParams['asset'],
            selectedAppContext: 51,
            showTreeSelector: false
        });
        this.workflowFacade.canConfigureWorkflow();
        this.workflowFacade.canConfigureWorkflow$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (canAccess) {
            if (!_.isNil(canAccess)) {
                _this.hasPermission = canAccess;
            }
        });
        // This will allow the workflow editor to refresh the page and retrieve the same node.  It is not intended to be used for
        // anything else.  The URL is not the user interface.  We are not watching it to respond to changes.  It simply reflects the
        // state of the application so that we can get back to that same state.  In this case it is only reflecting the selected asset.
        this.assetTreeFacade.selectedAssetTreeNodeID$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (uniqueID) {
            if (uniqueID) {
                var queryParams = tslib_1.__assign({}, _this.activatedRoute.snapshot.queryParams);
                queryParams['asset'] = uniqueID;
                _this.router.navigate([], { relativeTo: _this.activatedRoute, queryParams: queryParams, replaceUrl: true });
            }
        });
        // Here we are grabbing the currently selected asset GUID for use in calls.  When this changes the user interface changes to reflect
        // the change.  We don't do this on a change of key because it could happen that the key changes but not the GUID, such as
        // when you click between two non-asset nodes on an ad-hoc tree.
        this.assetTreeFacade.selectedAssetGuid$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (guid) {
            if (_.isNil(guid)) {
                _this.selectedAssetGuid = null;
                _this.workflowFacade.clearWorkflow();
            }
            else {
                _this.selectedAssetGuid = guid;
                _this.workflowFacade.loadIssueCategoryTypes(guid);
                _this.workflowFacade.loadMapsForAsset(guid);
            }
        });
        this.showSidenav$ = this.layoutFacade.isAssetNavigatorOpened$;
        this.sidenavWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
        this.loadingPermission$ = this.workflowFacade.isLoadingPermission$;
        this.workflowFacade.errorMessage$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (msg) {
            if (!_.isNil(msg)) {
                _this.errorMessage = msg;
            }
        });
    };
    MainComponent.prototype.ngAfterContentInit = function () {
        this.layoutFacade.openAssetNavigator();
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    MainComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AssetTreeFacadeFactory,
            WorkflowFacade,
            ActivatedRoute,
            LayoutFacade,
            Router,
            MatDialog])
    ], MainComponent);
    return MainComponent;
}());
export { MainComponent };
//# sourceMappingURL=main.component.js.map