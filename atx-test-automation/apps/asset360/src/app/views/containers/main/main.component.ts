import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IAssetView, IAppContext } from '@AtonixWebSites/api';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetTreeFacadeFactory, AssetTreeNode, AssetTreeFacade, IButtonInfo, IButtonClick } from '@AtonixWebSites/asset-tree';
import { TimeRangeSelectorFacade, ITimeRangeSelection } from '@AtonixWebSites/time-range-selector';
import { takeWhile, map } from 'rxjs/operators';
import { LayoutFacade } from '@AtonixWebSites/layout';
import { UserFacade } from '@AtonixWebSites/auth';
import * as _ from 'lodash';
import { TabViewFacade } from '../../state/tab-view.facade';

@Component({
  selector: 'atx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  assetViews$: Observable<IAssetView[]>;
  selectedAssetGUID$: Observable<string>;
  selectedAssetTreeNode$: Observable<AssetTreeNode>;
  assetButtonClicked$: Observable<IButtonClick>;
  selectedView = -1;
  tabViewPending$: Observable<boolean>;
  selectedAppContext$: Observable<IAppContext>;

  assetNavigatorWidth$: Observable<number>;
  urlState$: Observable<{
    appContext: IAppContext;
    timeRange: ITimeRangeSelection;
    assetTreeNode: AssetTreeNode;
  }>;
  currentState$: Observable<{
    selectedAssetGUID: string;
    appContext: IAppContext;
  }>;
  currentTabs$: Observable<{
    assetViews: IAssetView[];
    defaultView: number;
  }>;
  componentActive = true;
  assetTreeFacade: AssetTreeFacade;

  constructor(
    private layoutFacade: LayoutFacade,
    assetTreeFacadeFactory: AssetTreeFacadeFactory,
    private timeRangeFacade: TimeRangeSelectorFacade,
    private userFacade: UserFacade,
    private tabViewFacade: TabViewFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
  }

  ngOnInit() {
    const routeParameters = this.getRouteParameters();

    const ac = routeParameters.ac;
    if (ac) {
      this.userFacade.appLoaded(decodeURIComponent(ac));
    } else {
      this.userFacade.appLoaded('Asset 360');
    }

    const startTime: string = routeParameters.start;
    const endTime: string = routeParameters.end;
    const ind: string = routeParameters.ind;

    if ((startTime && endTime) || ind) {
      const newStart: Date = startTime ? new Date(parseInt(startTime, 10)) : undefined;
      const newEnd: Date = endTime ? new Date(parseInt(endTime, 10)) : undefined;
      const newInd: Date = ind ? new Date(parseInt(ind, 10)) : undefined;

      this.timeRangeFacade.configureTimeRangeSelector(newStart, newEnd, newInd);
    }

    this.selectedAppContext$ = this.userFacade.selectedAppContext$;
    this.selectedAssetGUID$ = this.assetTreeFacade.selectedAssetGuid$;
    this.selectedAssetTreeNode$ = this.assetTreeFacade.selectedAssetTreeNode$;

    this.assetViews$ = this.tabViewFacade.assetViews$;
    this.tabViewPending$ = this.tabViewFacade.tabViewPending$;

    // The purpose of this is to make the asset tree reload whenever the app context changes.
    this.selectedAppContext$.pipe(takeWhile(() => this.componentActive)).subscribe(newAppContext => {
      if (newAppContext) {
        const myRouteParams = this.getRouteParameters();

        this.assetTreeFacade.initialize({
          selectedAppContext: newAppContext.AppContextID,
          selectedAsset: myRouteParams.asset
          // For testing ...
          // startAtLevel: 2
          // stopAtLevel: 3
          // showTreeSelector: true,
          // selectedTree: 'ac222c39-f458-43dc-be8b-f8ac5344fb26'
          // buttons: [
          //   {
          //     id: 'Up',
          //     tooltip: 'Move Up',
          //     class: 'up-button',
          //     show: (node?: AssetTreeNode) => {
          //       return !node.First && !_.isNil(node.Asset);
          //     }
          //   },
          //   {
          //     id: 'Info',
          //     tooltip: 'Info',
          //     class: 'info-button',
          //     show: (node?: AssetTreeNode) => {
          //       return !_.isNil(node.Asset);
          //     }
          //   },
          //   {
          //     id: 'Down',
          //     tooltip: 'Move Down',
          //     class: 'down-button',
          //     show: (node?: AssetTreeNode) => {
          //       return !node.Last && !_.isNil(node.Asset);
          //     }
          //   }
          // ]
        });
      }
    });

    this.urlState$ = combineLatest(
      this.userFacade.selectedAppContext$,
      this.timeRangeFacade.selection$,
      this.selectedAssetTreeNode$
    ).pipe(
      takeWhile(() => this.componentActive),
      map(([appContext, timeRange, assetTreeNode]) => {
        return { appContext, timeRange, assetTreeNode };
      })
    );

    this.urlState$.subscribe(values => {
      const queryParams = { ...this.activatedRoute.snapshot.queryParams };
      if (values.assetTreeNode) {
        queryParams.asset = values.assetTreeNode.UniqueKey;
      }
      if (values.appContext) {
        queryParams.ac = encodeURIComponent(values.appContext.DisplayName);
      }
      if (values.timeRange) {
        if (values.timeRange.startDate) {
          queryParams.start = values.timeRange.startDate.getTime();
        }
        if (values.timeRange.endDate) {
          queryParams.end = values.timeRange.endDate.getTime();
        }
        if (values.timeRange.indicator) {
          queryParams.ind = values.timeRange.indicator.getTime();
        }
      }
      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams, replaceUrl: true });
    });

    this.currentState$ = combineLatest(this.selectedAssetGUID$, this.selectedAppContext$).pipe(
      takeWhile(() => this.componentActive),
      map(([selectedAssetGUID, appContext]) => {
        return { selectedAssetGUID, appContext };
      })
    );

    this.currentTabs$ = combineLatest(this.tabViewFacade.assetViews$, this.tabViewFacade.defaultView$).pipe(
      takeWhile(() => this.componentActive),
      map(([assetViews, defaultView]) => {
        return { assetViews, defaultView };
      })
    );

    this.assetNavigatorWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
    this.changeTabsDynamically();
    this.updateTabState();
  }

  changeTabsDynamically() {
    this.currentState$.subscribe(({ selectedAssetGUID, appContext }) => {
      if (!_.isNil(appContext) && !_.isNil(selectedAssetGUID)) {
        this.tabViewFacade.getAssetViews(selectedAssetGUID, appContext.DisplayName);
      }
    });
  }

  updateTabState() {
    this.currentTabs$.subscribe(({ assetViews, defaultView }) => {
      const state = this.router.routerState.snapshot.url;
      const currentView = _.findLast(state.split('?')[0].split('/'));
      const viewIndex = assetViews.findIndex(x => x.Path === currentView);
      if (defaultView > -1 && defaultView !== this.selectedView) {
        if (currentView !== this.activatedRoute.snapshot.routeConfig.path && viewIndex > -1) {
          // they have picked a route and route is still valid
          this.navigateTo(assetViews, assetViews[viewIndex].ViewID);
        } else {
          this.navigateTo(assetViews, defaultView);
        }
      } else {
        if (defaultView > -1 && viewIndex < 0) {
          // index is the same, but tabs have changed
          this.navigateTo(assetViews, defaultView);
        }
      }
    });
  }

  navigateTo(assetViews: IAssetView[], newViewID: number) {
    let selectedIndex = assetViews.findIndex(asset => asset.ViewID === newViewID);
    if (selectedIndex < 0) {
      selectedIndex = 0;
    }
    if (assetViews.length > 0) {
      this.router.navigate(['views', assetViews[selectedIndex].Path], { queryParamsHandling: 'preserve' });
      this.selectedView = selectedIndex;
    }
  }

  setActiveLink(tabIndex: number) {
    tabIndex = Number(tabIndex);
    this.selectedView = tabIndex;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  getRouteParameters() {
    let myRoute = this.activatedRoute.snapshot;
    while (myRoute.children && myRoute.children.length > 0) {
      myRoute = myRoute.children[0];
    }

    return {
      start: myRoute.queryParams.start,
      end: myRoute.queryParams.end,
      ac: myRoute.queryParams.ac,
      ind: myRoute.queryParams.ind,
      asset: myRoute.queryParams.asset
    };
  }

  buttonClicked($event: IButtonClick) {
    console.log('Button Clicked');
  }
}
