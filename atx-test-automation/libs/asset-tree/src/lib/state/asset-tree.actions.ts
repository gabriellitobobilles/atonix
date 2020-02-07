import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AssetTreeNode } from '../models/asset-tree-node';
import { IAdHocTree, IAdHocNode, IAssetAndName } from '@AtonixWebSites/api';
import { IAssetTreeParameters } from '../models/iasset-tree-parameters';

export enum AssetTreeActionTypes {
  InitializeAssetTree = '[AssetTree] Initialize Asset Tree',
  InitializeAssetTreeStarted = '[AssetTree] Initialize Asset Tree Started',
  InitializeAssetTreeComplete = '[AssetTree] Initialize Asset Tree Complete',
  GetChildNodes = '[AssetTree] Get Child Nodes',
  ChildNodesRetrieved = '[AssetTree] Child Nodes Retrieved',
  AssetTreeRetrievalError = '[AssetTree] Asset Tree Retrieval Error',
  ExpandNode = '[AssetTree] Expand Node',
  ExpandNodeStarted = '[AssetTree] Expand Node Started',
  ExpandNodeComplete = '[AssetTree] Expand Node Complete',
  SelectNode = '[AssetTree] Select Node',
  SelectTree = '[AssetTree] Select Tree',
  AutoCompleteSearch = '[AssetTree] Auto Complete Search',
  AutoCompleteSearchStarted = '[AssetTree] Auto Complete Search Started',
  AutoCompleteSearchSuccess = '[AssetTree] Auto Complete Search Success',
  SelectAssetByID = '[AssetTree] Select Asset By ID',
  SelectAssetByIDSuccess = '[AssetTree] Select Asset By ID Success',
  TreeNotInitializedError = '[AssetTree] Tree Not Initialized'
}

export class InitializeAssetTree implements Action {
  readonly type = AssetTreeActionTypes.InitializeAssetTree;
  constructor(public payload?: IAssetTreeParameters) {}
}

export class InitializeAssetTreeStarted implements Action {
  readonly type = AssetTreeActionTypes.InitializeAssetTreeStarted;
  constructor(public payload: IAssetTreeParameters) {}
}

export class InitializeAssetTreeComplete implements Action {
  readonly type = AssetTreeActionTypes.InitializeAssetTreeComplete;
  constructor(public payload: { params: IAssetTreeParameters; trees: IAdHocTree[]; assets: IAdHocNode[] }) {}
}

export class GetChildNodes implements Action {
  readonly type = AssetTreeActionTypes.GetChildNodes;
  constructor(public payload?: string) {}
}
export class ChildNodesRetrieved implements Action {
  readonly type = AssetTreeActionTypes.ChildNodesRetrieved;
  constructor(public payload: AssetTreeNode[]) {}
}

export class AssetTreeRetrievalError implements Action {
  readonly type = AssetTreeActionTypes.AssetTreeRetrievalError;
  constructor(public payload?: any) {}
}

export class SelectNode implements Action {
  readonly type = AssetTreeActionTypes.SelectNode;
  constructor(public payload: { node: AssetTreeNode; key?: string }) {}
}

export class SelectAssetByID implements Action {
  readonly type = AssetTreeActionTypes.SelectAssetByID;
  constructor(public payload: { id?: number; guid?: string; key?: string }) {}
}

export class SelectAssetByIDSuccess implements Action {
  readonly type = AssetTreeActionTypes.SelectAssetByIDSuccess;
  constructor(public payload: { id?: number; guid?: string; key?: string; assets: IAdHocNode[] }) {}
}

export class ExpandNode implements Action {
  readonly type = AssetTreeActionTypes.ExpandNode;
  constructor(public payload: { node: AssetTreeNode; key?: string }) {}
}

export class ExpandNodeStarted implements Action {
  readonly type = AssetTreeActionTypes.ExpandNodeStarted;
  constructor(public payload: { node: AssetTreeNode; key?: string }) {}
}

export class ExpandNodeComplete implements Action {
  readonly type = AssetTreeActionTypes.ExpandNodeComplete;
  constructor(public payload: { node: Update<AssetTreeNode>; children?: IAdHocNode[]; key?: string }) {}
}

export class SelectTree implements Action {
  readonly type = AssetTreeActionTypes.SelectTree;
  constructor(public payload: { id: string; key?: string }) {}
}

export class AutoCompleteSearch implements Action {
  readonly type = AssetTreeActionTypes.AutoCompleteSearch;
  constructor(public payload: { search: string; key?: string }) {}
}

export class AutoCompleteSearchStarted implements Action {
  readonly type = AssetTreeActionTypes.AutoCompleteSearchStarted;
  constructor(public payload: { search: string; key?: string }) {}
}

export class AutoCompleteSearchSuccess implements Action {
  readonly type = AssetTreeActionTypes.AutoCompleteSearchSuccess;
  constructor(public payload: { assets: IAssetAndName[]; search: string; key?: string }) {}
}

export class TreeNotInitialized implements Action {
  readonly type = AssetTreeActionTypes.TreeNotInitializedError;
  constructor(public payload: string) {}
}

export type AssetTreeActions =
  | GetChildNodes
  | ChildNodesRetrieved
  | AssetTreeRetrievalError
  | ExpandNode
  | ExpandNodeStarted
  | ExpandNodeComplete
  | SelectNode
  | InitializeAssetTree
  | InitializeAssetTreeStarted
  | InitializeAssetTreeComplete
  | SelectTree
  | AutoCompleteSearch
  | AutoCompleteSearchStarted
  | AutoCompleteSearchSuccess
  | SelectAssetByID
  | SelectAssetByIDSuccess
  | TreeNotInitialized;
