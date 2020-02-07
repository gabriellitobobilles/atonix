import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, catchError, switchMap, withLatestFrom, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
import { AssetTreeRetrievalError, AssetTreeActionTypes, ExpandNodeStarted, ExpandNodeComplete, InitializeAssetTreeComplete, InitializeAssetTreeStarted, AutoCompleteSearchSuccess, AutoCompleteSearchStarted, SelectNode, SelectAssetByIDSuccess, TreeNotInitialized } from './asset-tree.actions';
import { AssetsModelService, UiconfigModelService } from '@AtonixWebSites/api';
import { treeSettings, treesDict } from './asset-tree.selectors';
// See GrantResourceOwnerCredentials
var AssetTreeEffects = /** @class */ (function () {
    function AssetTreeEffects(actions$, assetModelService, uiConfigModelService, store) {
        var _this = this;
        this.actions$ = actions$;
        this.assetModelService = assetModelService;
        this.uiConfigModelService = uiConfigModelService;
        this.store = store;
        this.initializeTree$ = this.actions$.pipe(ofType(AssetTreeActionTypes.InitializeAssetTree)).pipe(map(function (action) { return action.payload; }), tap(function (params) {
            _this.store.dispatch(new InitializeAssetTreeStarted(params));
        }), switchMap(function (params) {
            return _this.uiConfigModelService
                .initializeTree(params.selectedTree, params.parentAssetID, params.selectedNode, params.selectedAsset, params.selectedAppContext, params.startAtLevel)
                .pipe(map(function (result) { return new InitializeAssetTreeComplete({ params: params, trees: result.trees, assets: result.assets }); }), catchError(function (error) { return of(new AssetTreeRetrievalError(error)); }));
        }));
        this.expandNode$ = this.actions$.pipe(ofType(AssetTreeActionTypes.ExpandNode), map(function (action) { return action; }), tap(function (action) {
            _this.store.dispatch(new ExpandNodeStarted(action.payload));
        }), withLatestFrom(this.store.pipe(treeSettings)), switchMap(function (_a) {
            var action = _a[0], settings = _a[1];
            var node = {
                id: action.payload.node.UniqueKey,
                changes: {
                    Expanded: !action.payload.node.Expanded,
                    Retrieved: true
                }
            };
            if (action.payload.node.Retrieved) {
                return of(new ExpandNodeComplete({ node: node, children: null, key: action.payload.key }));
            }
            else {
                return _this.uiConfigModelService
                    .assetTreeChildren(action.payload.node.UniqueKey, String(settings[action.payload.key || 'default'].appContext))
                    .pipe(map(function (assets) {
                    return new ExpandNodeComplete({ node: node, children: assets, key: action.payload.key });
                }), catchError(function (error) { return of(new AssetTreeRetrievalError(error)); }));
            }
        }));
        this.autoComplete$ = this.actions$.pipe(ofType(AssetTreeActionTypes.AutoCompleteSearch), tap(function (action) {
            if (action.payload.search && action.payload.search.length > 2) {
                _this.store.dispatch(new AutoCompleteSearchStarted(action.payload));
            }
        }), debounceTime(1000), withLatestFrom(this.store.pipe(treeSettings)), switchMap(function (_a) {
            var action = _a[0], settings = _a[1];
            if (action.payload.search && action.payload.search.length > 2 && settings[action.payload.key]) {
                return _this.assetModelService
                    .autoCompleteSearch(action.payload.search, settings[action.payload.key].autoCompleteCount, settings[action.payload.key].parentID, settings[action.payload.key].startAtLevel, settings[action.payload.key].stopAtLevel, settings[action.payload.key].appContext)
                    .pipe(map(function (assets) { return new AutoCompleteSearchSuccess({ assets: assets, key: action.payload.key, search: action.payload.search }); }), catchError(function (error) { return of(new AssetTreeRetrievalError(error)); }));
            }
            else {
                return of(new AutoCompleteSearchSuccess({ assets: [], key: action.payload.key, search: action.payload.search }));
            }
        }));
        this.selectAssetByID$ = this.actions$.pipe(ofType(AssetTreeActionTypes.SelectAssetByID), map(function (action) { return action.payload; }), withLatestFrom(this.store.pipe(treesDict)), switchMap(function (_a) {
            var payload = _a[0], trees = _a[1];
            var tree = trees[payload.key || 'default'];
            if (tree) {
                var appContext = tree.appContext;
                var nodeID = _.find(tree.ids, function (id) {
                    return tree.entities[id].AssetId === payload.id || tree.entities[id].AssetGuid === payload.guid;
                });
                if (!payload.id && !payload.guid) {
                    // Deselect the node.
                    return of(new SelectNode({ node: null, key: payload.key }));
                }
                else if (nodeID) {
                    return of(new SelectNode({ node: tree.entities[String(nodeID)], key: payload.key }));
                }
                else {
                    // In this case the node is not already in the tree and we need to retrieve it
                    return _this.uiConfigModelService
                        .deepAsset(tree.selectedTree, String(payload.id || payload.guid), String(appContext))
                        .pipe(map(function (assets) {
                        return new SelectAssetByIDSuccess({
                            assets: assets,
                            key: payload.key,
                            id: payload.id,
                            guid: payload.guid
                        });
                    }), catchError(function (error) { return of(new AssetTreeRetrievalError(error)); }));
                }
            }
            else {
                // This is a null action that will only happen if an asset is selected before the tree is initialized
                return of(new TreeNotInitialized(payload.key));
            }
        }));
        this.selectTree$ = this.actions$.pipe(ofType(AssetTreeActionTypes.SelectTree), map(function (action) { return action; }), withLatestFrom(this.store.pipe(treesDict)), map(function (_a) {
            var action = _a[0], trees = _a[1];
            var myState = trees[action.payload.key || 'default'];
            // let selectedAsset: string;
            var appContext;
            var startAtLevel;
            var stopAtLevel;
            var parentAssetID;
            if (myState) {
                // selectedAsset = myState.selectedNodeID;
                appContext = myState.appContext;
                startAtLevel = myState.startAtLevel;
                stopAtLevel = myState.stopAtLevel;
                parentAssetID = myState.parentID;
            }
            var params = {
                // selectedAsset,
                selectedTree: action.payload.id,
                selectedAppContext: appContext,
                parentAssetID: parentAssetID,
                startAtLevel: startAtLevel,
                stopAtLevel: stopAtLevel,
                key: action.payload.key
            };
            return params;
        }), tap(function (params) {
            _this.store.dispatch(new InitializeAssetTreeStarted(params));
        }), switchMap(function (params) {
            return _this.uiConfigModelService
                .initializeTree(params.selectedTree, params.parentAssetID, params.selectedNode, params.selectedAsset, params.selectedAppContext, params.startAtLevel)
                .pipe(map(function (result) { return new InitializeAssetTreeComplete({ params: params, trees: result.trees, assets: result.assets }); }), catchError(function (error) { return of(new AssetTreeRetrievalError(error)); }));
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeEffects.prototype, "initializeTree$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeEffects.prototype, "expandNode$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeEffects.prototype, "autoComplete$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeEffects.prototype, "selectAssetByID$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeEffects.prototype, "selectTree$", void 0);
    AssetTreeEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            AssetsModelService,
            UiconfigModelService,
            Store])
    ], AssetTreeEffects);
    return AssetTreeEffects;
}());
export { AssetTreeEffects };
//# sourceMappingURL=asset-tree.effects.js.map