import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AssetTreeFacade, AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { LayoutFacade } from '@AtonixWebSites/layout';
import { WorkflowFacade } from '../../state/workflow.facade';
import { WorkflowFormState } from '../../model/form-edit-state';
import * as _ from 'lodash';

@Component({
  selector: 'atx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit, OnDestroy {
  showSidenav$: Observable<boolean>;
  sidenavWidth$: Observable<number>;
  errorMessage: string;
  selectedAssetGuid: string | null = null;
  componentActive = true;
  hasPermission = false;
  loadingPermission$: Observable<boolean>;

  formState = WorkflowFormState.Viewing;

  private assetTreeFacade: AssetTreeFacade;

  constructor(
    private assetTreeFacadeFactory: AssetTreeFacadeFactory,
    private workflowFacade: WorkflowFacade,
    private activatedRoute: ActivatedRoute,
    private layoutFacade: LayoutFacade,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
  }

  ngOnInit() {
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
    this.workflowFacade.canConfigureWorkflow$.pipe(takeWhile(() => this.componentActive)).subscribe(canAccess => {
      if (!_.isNil(canAccess)) {
        this.hasPermission = canAccess;
      }
    });

    // This will allow the workflow editor to refresh the page and retrieve the same node.  It is not intended to be used for
    // anything else.  The URL is not the user interface.  We are not watching it to respond to changes.  It simply reflects the
    // state of the application so that we can get back to that same state.  In this case it is only reflecting the selected asset.
    this.assetTreeFacade.selectedAssetTreeNodeID$.pipe(takeWhile(() => this.componentActive)).subscribe(uniqueID => {
      if (uniqueID) {
        const queryParams: Params = { ...this.activatedRoute.snapshot.queryParams };
        queryParams['asset'] = uniqueID;
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams, replaceUrl: true });
      }
    });

    // Here we are grabbing the currently selected asset GUID for use in calls.  When this changes the user interface changes to reflect
    // the change.  We don't do this on a change of key because it could happen that the key changes but not the GUID, such as
    // when you click between two non-asset nodes on an ad-hoc tree.
    this.assetTreeFacade.selectedAssetGuid$.pipe(takeWhile(() => this.componentActive)).subscribe(guid => {
      if (_.isNil(guid)) {
        this.selectedAssetGuid = null;
        this.workflowFacade.clearWorkflow();
      } else {
        this.selectedAssetGuid = guid;
        this.workflowFacade.loadIssueCategoryTypes(guid);
        this.workflowFacade.loadMapsForAsset(guid);
      }
    });

    this.showSidenav$ = this.layoutFacade.isAssetNavigatorOpened$;
    this.sidenavWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
    this.loadingPermission$ = this.workflowFacade.isLoadingPermission$;
    this.workflowFacade.errorMessage$.pipe(takeWhile(() => this.componentActive)).subscribe(msg => {
      if (!_.isNil(msg)) {
        this.errorMessage = msg;
      }
    });
  }

  ngAfterContentInit() {
    this.layoutFacade.openAssetNavigator();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
