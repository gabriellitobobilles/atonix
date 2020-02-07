import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Store, select, createSelector } from '@ngrx/store';
import { AssetTreesState } from './asset-tree.reducer';

import { IAssetTreeParameters, IButtonInfo, IButtonClick } from '../models/iasset-tree-parameters';
import {
  ExpandNode,
  SelectNode,
  InitializeAssetTree,
  SelectTree,
  AutoCompleteSearch,
  SelectAssetByID
} from './asset-tree.actions';
import { AssetTreeNode } from '../models/asset-tree-node';
import * as allSelectors from './asset-tree.selectors';
import { Observable, of, Subject } from 'rxjs';
import { IAdHocTree, IAssetAndName } from '@AtonixWebSites/api';

export class AssetTreeFacade {
  nodes$: Observable<AssetTreeNode[]>;
  selectedAssetTreeNode$: Observable<AssetTreeNode>;
  selectedAssetTreeNodeID$: Observable<string>;
  selectedAssetGuid$: Observable<string>;
  selectedAssetID$: Observable<number>;
  allTrees$: Observable<IAdHocTree[]>;
  selectedTree$: Observable<IAdHocTree>;
  autoCompleteAssets$: Observable<IAssetAndName[]>;
  autoCompleteSearch$: Observable<string>;
  autoCompletePending$: Observable<boolean>;
  showTreeSelector$: Observable<boolean>;
  buttons$: Observable<IButtonInfo[]>;
  constructor(private store: Store<AssetTreesState>, private componentID?: string) {
    if (_.isNil(componentID)) {
      this.componentID = 'default';
    }
    this.nodes$ = this.store.pipe(allSelectors.getNodes(this.componentID));
    this.selectedAssetTreeNode$ = this.store.pipe(allSelectors.getSelectedNode(this.componentID));
    this.selectedAssetTreeNodeID$ = this.store.pipe(allSelectors.getSelectedNodeID(this.componentID));
    this.selectedAssetGuid$ = this.store.pipe(allSelectors.getSelectedAssetGuid(this.componentID));
    this.selectedAssetID$ = this.store.pipe(allSelectors.getSelectedAssetID(this.componentID));
    this.allTrees$ = this.store.pipe(allSelectors.getAllTrees(this.componentID));
    this.selectedTree$ = this.store.pipe(allSelectors.getSelectedTree(this.componentID));
    this.autoCompleteAssets$ = this.store.pipe(allSelectors.getAutoCompleteAssets(this.componentID));
    this.autoCompleteSearch$ = this.store.pipe(allSelectors.getAutoCompleteSearch(this.componentID));
    this.autoCompletePending$ = this.store.pipe(allSelectors.getAutoCompletePending(this.componentID));
    this.showTreeSelector$ = this.store.pipe(allSelectors.getShowTreeSelector(this.componentID));
    this.buttons$ = this.store.pipe(allSelectors.getButtons(this.componentID));
  }

  getComponentID() {
    return this.componentID;
  }

  initialize(params: IAssetTreeParameters) {
    params.key = this.componentID;
    this.store.dispatch(new InitializeAssetTree(params));
  }

  expandNode(node: AssetTreeNode) {
    this.store.dispatch(new ExpandNode({ node, key: this.componentID }));
  }

  select(node: AssetTreeNode) {
    this.store.dispatch(new SelectNode({ node, key: this.componentID }));
  }

  selectTree(id: string) {
    this.store.dispatch(new SelectTree({ id, key: this.componentID }));
  }

  selectAssetByID(id: number) {
    this.store.dispatch(new SelectAssetByID({ id, key: this.componentID }));
  }

  selectAssetByGUID(guid: string) {
    this.store.dispatch(new SelectAssetByID({ guid, key: this.componentID }));
  }

  autoCompleteSearch(search: string) {
    this.store.dispatch(new AutoCompleteSearch({ search, key: this.componentID }));
  }
}
