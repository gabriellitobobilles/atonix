import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetTreeFacadeFactory } from '@AtonixWebSites/asset-tree';
import { TimeRangeSelectorFacade } from '@AtonixWebSites/time-range-selector';
import { takeWhile, map } from 'rxjs/operators';
import { LayoutFacade } from '@AtonixWebSites/layout';
import { UserFacade } from '@AtonixWebSites/auth';
import * as _ from 'lodash';
import { TabViewFacade } from '../../state/tab-view.facade';
var MainComponent = /** @class */ (function () {
    function MainComponent(layoutFacade, assetTreeFacadeFactory, timeRangeFacade, userFacade, tabViewFacade, router, activatedRoute) {
        this.layoutFacade = layoutFacade;
        this.timeRangeFacade = timeRangeFacade;
        this.userFacade = userFacade;
        this.tabViewFacade = tabViewFacade;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.selectedView = -1;
        this.componentActive = true;
        this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade();
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        var routeParameters = this.getRouteParameters();
        var ac = routeParameters.ac;
        if (ac) {
            this.userFacade.appLoaded(decodeURIComponent(ac));
        }
        else {
            this.userFacade.appLoaded('Asset 360');
        }
        var startTime = routeParameters.start;
        var endTime = routeParameters.end;
        var ind = routeParameters.ind;
        if ((startTime && endTime) || ind) {
            var newStart = startTime ? new Date(parseInt(startTime, 10)) : undefined;
            var newEnd = endTime ? new Date(parseInt(endTime, 10)) : undefined;
            var newInd = ind ? new Date(parseInt(ind, 10)) : undefined;
            this.timeRangeFacade.configureTimeRangeSelector(newStart, newEnd, newInd);
        }
        this.selectedAppContext$ = this.userFacade.selectedAppContext$;
        this.selectedAssetGUID$ = this.assetTreeFacade.selectedAssetGuid$;
        this.selectedAssetTreeNode$ = this.assetTreeFacade.selectedAssetTreeNode$;
        this.assetViews$ = this.tabViewFacade.assetViews$;
        this.tabViewPending$ = this.tabViewFacade.tabViewPending$;
        // The purpose of this is to make the asset tree reload whenever the app context changes.
        this.selectedAppContext$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (newAppContext) {
            if (newAppContext) {
                var myRouteParams = _this.getRouteParameters();
                _this.assetTreeFacade.initialize({
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
        this.urlState$ = combineLatest(this.userFacade.selectedAppContext$, this.timeRangeFacade.selection$, this.selectedAssetTreeNode$).pipe(takeWhile(function () { return _this.componentActive; }), map(function (_a) {
            var appContext = _a[0], timeRange = _a[1], assetTreeNode = _a[2];
            return { appContext: appContext, timeRange: timeRange, assetTreeNode: assetTreeNode };
        }));
        this.urlState$.subscribe(function (values) {
            var queryParams = tslib_1.__assign({}, _this.activatedRoute.snapshot.queryParams);
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
            _this.router.navigate([], { relativeTo: _this.activatedRoute, queryParams: queryParams, replaceUrl: true });
        });
        this.currentState$ = combineLatest(this.selectedAssetGUID$, this.selectedAppContext$).pipe(takeWhile(function () { return _this.componentActive; }), map(function (_a) {
            var selectedAssetGUID = _a[0], appContext = _a[1];
            return { selectedAssetGUID: selectedAssetGUID, appContext: appContext };
        }));
        this.currentTabs$ = combineLatest(this.tabViewFacade.assetViews$, this.tabViewFacade.defaultView$).pipe(takeWhile(function () { return _this.componentActive; }), map(function (_a) {
            var assetViews = _a[0], defaultView = _a[1];
            return { assetViews: assetViews, defaultView: defaultView };
        }));
        this.assetNavigatorWidth$ = this.layoutFacade.currentAssetNavigatorWidth$;
        this.changeTabsDynamically();
        this.updateTabState();
    };
    MainComponent.prototype.changeTabsDynamically = function () {
        var _this = this;
        this.currentState$.subscribe(function (_a) {
            var selectedAssetGUID = _a.selectedAssetGUID, appContext = _a.appContext;
            if (!_.isNil(appContext) && !_.isNil(selectedAssetGUID)) {
                _this.tabViewFacade.getAssetViews(selectedAssetGUID, appContext.DisplayName);
            }
        });
    };
    MainComponent.prototype.updateTabState = function () {
        var _this = this;
        this.currentTabs$.subscribe(function (_a) {
            var assetViews = _a.assetViews, defaultView = _a.defaultView;
            var state = _this.router.routerState.snapshot.url;
            var currentView = _.findLast(state.split('?')[0].split('/'));
            var viewIndex = assetViews.findIndex(function (x) { return x.Path === currentView; });
            if (defaultView > -1 && defaultView !== _this.selectedView) {
                if (currentView !== _this.activatedRoute.snapshot.routeConfig.path && viewIndex > -1) {
                    // they have picked a route and route is still valid
                    _this.navigateTo(assetViews, assetViews[viewIndex].ViewID);
                }
                else {
                    _this.navigateTo(assetViews, defaultView);
                }
            }
            else {
                if (defaultView > -1 && viewIndex < 0) {
                    // index is the same, but tabs have changed
                    _this.navigateTo(assetViews, defaultView);
                }
            }
        });
    };
    MainComponent.prototype.navigateTo = function (assetViews, newViewID) {
        var selectedIndex = assetViews.findIndex(function (asset) { return asset.ViewID === newViewID; });
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }
        if (assetViews.length > 0) {
            this.router.navigate(['views', assetViews[selectedIndex].Path], { queryParamsHandling: 'preserve' });
            this.selectedView = selectedIndex;
        }
    };
    MainComponent.prototype.setActiveLink = function (tabIndex) {
        tabIndex = Number(tabIndex);
        this.selectedView = tabIndex;
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    MainComponent.prototype.getRouteParameters = function () {
        var myRoute = this.activatedRoute.snapshot;
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
    };
    MainComponent.prototype.buttonClicked = function ($event) {
        console.log('Button Clicked');
    };
    MainComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [LayoutFacade,
            AssetTreeFacadeFactory,
            TimeRangeSelectorFacade,
            UserFacade,
            TabViewFacade,
            Router,
            ActivatedRoute])
    ], MainComponent);
    return MainComponent;
}());
export { MainComponent };
//# sourceMappingURL=main.component.js.map