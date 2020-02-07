import { Injectable } from '@angular/core';
import { Store, select, createSelector, Action } from '@ngrx/store';
import { AssetTreesState } from './asset-tree.reducer';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { tap, map, exhaustMap, catchError, switchMap, concatMap, withLatestFrom, debounceTime } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import * as _ from 'lodash';

import {
  AssetTreeRetrievalError,
  AssetTreeActionTypes,
  ExpandNode,
  ExpandNodeStarted,
  ExpandNodeComplete,
  InitializeAssetTreeComplete,
  InitializeAssetTreeStarted,
  InitializeAssetTree,
  AutoCompleteSearch,
  AutoCompleteSearchSuccess,
  AutoCompleteSearchStarted,
  SelectAssetByID,
  SelectNode,
  SelectAssetByIDSuccess,
  SelectTree,
  TreeNotInitialized
} from './asset-tree.actions';

import { AssetTreeNode } from '../models/asset-tree-node';
import { AssetsModelService, UiconfigModelService } from '@AtonixWebSites/api';
import { treeSettings, treesDict, getSelectedAssetGuid } from './asset-tree.selectors';
import { IAssetTreeParameters } from '../models/iasset-tree-parameters';

// See GrantResourceOwnerCredentials
@Injectable()
export class AssetTreeEffects {
  constructor(
    private actions$: Actions,
    private assetModelService: AssetsModelService,
    private uiConfigModelService: UiconfigModelService,
    private store: Store<AssetTreesState>
  ) {}

  @Effect()
  initializeTree$ = this.actions$.pipe(ofType(AssetTreeActionTypes.InitializeAssetTree)).pipe(
    map((action: InitializeAssetTree) => action.payload),
    tap(params => {
      this.store.dispatch(new InitializeAssetTreeStarted(params));
    }),
    switchMap(params => {
      return this.uiConfigModelService
        .initializeTree(
          params.selectedTree,
          params.parentAssetID,
          params.selectedNode,
          params.selectedAsset,
          params.selectedAppContext,
          params.startAtLevel
        )
        .pipe(
          map(result => new InitializeAssetTreeComplete({ params, trees: result.trees, assets: result.assets })),
          catchError(error => of(new AssetTreeRetrievalError(error)))
        );
    })
  );

  @Effect()
  expandNode$ = this.actions$.pipe(
    ofType(AssetTreeActionTypes.ExpandNode),
    map((action: ExpandNode) => action),
    tap(action => {
      this.store.dispatch(new ExpandNodeStarted(action.payload));
    }),
    withLatestFrom(this.store.pipe(treeSettings)),
    switchMap(([action, settings]) => {
      const node: Update<AssetTreeNode> = {
        id: action.payload.node.UniqueKey,
        changes: {
          Expanded: !action.payload.node.Expanded,
          Retrieved: true
        }
      };
      if (action.payload.node.Retrieved) {
        return of(new ExpandNodeComplete({ node, children: null, key: action.payload.key }));
      } else {
        return this.uiConfigModelService
          .assetTreeChildren(action.payload.node.UniqueKey, String(settings[action.payload.key || 'default'].appContext))
          .pipe(
            map(assets => {
              return new ExpandNodeComplete({ node, children: assets, key: action.payload.key });
            }),
            catchError(error => of(new AssetTreeRetrievalError(error)))
          );
      }
    })
  );

  @Effect()
  autoComplete$ = this.actions$.pipe(
    ofType(AssetTreeActionTypes.AutoCompleteSearch),
    tap((action: AutoCompleteSearch) => {
      if (action.payload.search && action.payload.search.length > 2) {
        this.store.dispatch(new AutoCompleteSearchStarted(action.payload));
      }
    }),
    debounceTime(1000),
    withLatestFrom(this.store.pipe(treeSettings)),
    switchMap(([action, settings]) => {
      if (action.payload.search && action.payload.search.length > 2 && settings[action.payload.key]) {
        return this.assetModelService
          .autoCompleteSearch(
            action.payload.search,
            settings[action.payload.key].autoCompleteCount,
            settings[action.payload.key].parentID,
            settings[action.payload.key].startAtLevel,
            settings[action.payload.key].stopAtLevel,
            settings[action.payload.key].appContext
          )
          .pipe(
            map(assets => new AutoCompleteSearchSuccess({ assets, key: action.payload.key, search: action.payload.search })),
            catchError(error => of(new AssetTreeRetrievalError(error)))
          );
      } else {
        return of(new AutoCompleteSearchSuccess({ assets: [], key: action.payload.key, search: action.payload.search }));
      }
    })
  );

  @Effect()
  selectAssetByID$ = this.actions$.pipe(
    ofType(AssetTreeActionTypes.SelectAssetByID),
    map((action: SelectAssetByID) => action.payload),
    withLatestFrom(this.store.pipe(treesDict)),
    switchMap(([payload, trees]) => {
      const tree = trees[payload.key || 'default'];

      if (tree) {
        const appContext = tree.appContext;
        const nodeID = _.find(tree.ids, (id: string) => {
          return tree.entities[id].AssetId === payload.id || tree.entities[id].AssetGuid === payload.guid;
        });

        if (!payload.id && !payload.guid) {
          // Deselect the node.
          return of<Action>(new SelectNode({ node: null, key: payload.key }));
        } else if (nodeID) {
          return of<Action>(new SelectNode({ node: tree.entities[String(nodeID)], key: payload.key }));
        } else {
          // In this case the node is not already in the tree and we need to retrieve it
          return this.uiConfigModelService
            .deepAsset(tree.selectedTree, String(payload.id || payload.guid), String(appContext))
            .pipe(
              map(assets => {
                return new SelectAssetByIDSuccess({
                  assets,
                  key: payload.key,
                  id: payload.id,
                  guid: payload.guid
                });
              }),
              catchError(error => of<Action>(new AssetTreeRetrievalError(error)))
            );
        }
      } else {
        // This is a null action that will only happen if an asset is selected before the tree is initialized
        return of<Action>(new TreeNotInitialized(payload.key));
      }
    })
  );

  @Effect()
  selectTree$ = this.actions$.pipe(
    ofType(AssetTreeActionTypes.SelectTree),
    map((action: SelectTree) => action),
    withLatestFrom(this.store.pipe(treesDict)),
    map(([action, trees]) => {
      const myState = trees[action.payload.key || 'default'];
      // let selectedAsset: string;
      let appContext: string | number;
      let startAtLevel: number;
      let stopAtLevel: number;
      let parentAssetID: number;
      if (myState) {
        // selectedAsset = myState.selectedNodeID;
        appContext = myState.appContext;
        startAtLevel = myState.startAtLevel;
        stopAtLevel = myState.stopAtLevel;
        parentAssetID = myState.parentID;
      }

      const params: IAssetTreeParameters = {
        // selectedAsset,
        selectedTree: action.payload.id,
        selectedAppContext: appContext,
        parentAssetID,
        startAtLevel,
        stopAtLevel,
        key: action.payload.key
      };
      return params;
    }),
    tap(params => {
      this.store.dispatch(new InitializeAssetTreeStarted(params));
    }),
    switchMap(params => {
      return this.uiConfigModelService
        .initializeTree(
          params.selectedTree,
          params.parentAssetID,
          params.selectedNode,
          params.selectedAsset,
          params.selectedAppContext,
          params.startAtLevel
        )
        .pipe(
          map(result => new InitializeAssetTreeComplete({ params, trees: result.trees, assets: result.assets })),
          catchError(error => of(new AssetTreeRetrievalError(error)))
        );
    })
  );
}
