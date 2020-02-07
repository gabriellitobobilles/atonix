import * as _ from 'lodash';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { AssetTreeActions, AssetTreeActionTypes } from './asset-tree.actions';
import { AssetTreeNode, TurnAdHocNodeIntoTreeNode } from '../models/asset-tree-node';
import { IAdHocTree, IAssetAndName, IAsset, IAdHocNode } from '@AtonixWebSites/api';
import { IButtonInfo } from '../models/iasset-tree-parameters';

// This is the structure governing a single instance of the Asset Tree Component
// It contains a list of possible adhoc trees and one adhoc tree that is selected
// It will contain the nodes/assets for the selected adhoc tree only.  If the adhoc tree
// is changed it will need to go get new content for that tree.
export interface ComponentInstanceState extends EntityState<AssetTreeNode> {
  rootNodes: string[];
  selectedNodeID: string;
  appContext: number | string;
  errorMessage: string;
  loading: boolean;
  trees: IAdHocTree[];
  selectedTree: string;
  id: string;
  autoCompleteAssets: IAssetAndName[];
  autoCompleteSearch: string;
  autoCompletePending: boolean;
  autoCompleteCount: number;
  parentID: number;
  startAtLevel: number;
  stopAtLevel: number;
  showTreeSelector: boolean;
  buttons: IButtonInfo[];
}

// This is the state that includes a list of all instances of this component.  The
// actions need to know which instance of the component they are intended to talk.
// Once the component state is found it acts just like any other action acting on that
// component's state.
export interface AssetTreesState extends EntityState<ComponentInstanceState> {
  error?: string;
}

function compareNodes(a: AssetTreeNode, b: AssetTreeNode) {
  if (a.DisplayOrder === b.DisplayOrder) {
    if (a.NodeDesc < b.NodeDesc) {
      return -1;
    } else if (a.NodeDesc > b.NodeDesc) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return a.DisplayOrder - b.DisplayOrder;
  }
}

// The asset adapter is used to manipulate the assets in a single adhoc tree
export const assetAdapter: EntityAdapter<AssetTreeNode> = createEntityAdapter<AssetTreeNode>({
  selectId: asset => asset.UniqueKey,
  sortComparer: compareNodes
});

// The tree adapter is used to manipulate the list of components
export const treeAdapter: EntityAdapter<ComponentInstanceState> = createEntityAdapter<ComponentInstanceState>({
  selectId: tree => tree.id
});

// Get the initial state, which is an empty list of component states
export const initialState: AssetTreesState = treeAdapter.getInitialState();

// This function goes through the tree state and calculates the changes necessary to
// select a node.  It needs to make sure all nodes above the selected node are expanded
// and retrieved.  It could potentially create many asset updates.
function getUpdatesToSelectNode(tree: ComponentInstanceState): Array<Update<AssetTreeNode>> {
  const updates: Array<Update<AssetTreeNode>> = [];

  let lcv = tree.entities[tree.selectedNodeID];
  if (lcv) {
    lcv = tree.entities[lcv.ParentUniqueKey];
    while (lcv) {
      updates.push({ id: lcv.UniqueKey, changes: { Expanded: true, Retrieved: true, Symbol: 'expanded' } });
      lcv = tree.entities[lcv.ParentUniqueKey];
    }
  }

  return updates;
}

function hasChildren(tree: ComponentInstanceState, id: string) {
  const result = _.find(tree.ids, (n: string) => tree.entities[n].ParentUniqueKey === id);
  if (result) {
    return true;
  } else {
    return false;
  }
}

// Get the component state by ID.
function getComponentInstance(state: AssetTreesState, key: string): ComponentInstanceState {
  return state.entities[key || 'default'];
}

// Update the state with the newly created component state.
function setComponentInstance(state: AssetTreesState, componentInstance: ComponentInstanceState): AssetTreesState {
  if (componentInstance) {
    return treeAdapter.upsertOne(componentInstance, { ...state });
  }
  return state;
}

// The reducer function that handles all actions.
export function assetTreeReducer(state = initialState, action: AssetTreeActions): AssetTreesState {
  switch (action.type) {
    case AssetTreeActionTypes.InitializeAssetTreeStarted: {
      // InitializeAssetTreeStarted is where we make sure a tree exists in the system.
      // It initially has no real content because it is waiting for the result of the
      // initial call to the server where the adhoc trees and the contents of the selected tree
      // are retrieved.
      let componentInstance = getComponentInstance(state, action.payload.key);
      if (!componentInstance) {
        componentInstance = assetAdapter.getInitialState({
          rootNodes: [],
          selectedNodeID: action.payload.selectedAsset,
          appContext: action.payload.selectedAppContext,
          errorMessage: null,
          loading: true,
          trees: null,
          selectedTree: _.isNil(action.payload.selectedTree) ? null : action.payload.selectedTree,
          id: action.payload.key || 'default',
          autoCompleteAssets: null,
          autoCompleteSearch: '',
          autoCompletePending: false,
          autoCompleteCount: _.isNil(action.payload.autoCompleteCount) ? 5 : action.payload.autoCompleteCount,
          parentID: _.isNil(action.payload.parentAssetID) ? null : action.payload.parentAssetID,
          startAtLevel: _.isNil(action.payload.startAtLevel) ? null : action.payload.startAtLevel,
          stopAtLevel: _.isNil(action.payload.stopAtLevel) ? null : action.payload.stopAtLevel,
          showTreeSelector: _.isNil(action.payload.showTreeSelector) ? true : action.payload.showTreeSelector,
          buttons: action.payload.buttons || null
        });
      } else {
        // The tree already existed so we want to reset it to defaults, clearing out all content
        componentInstance = assetAdapter.removeAll({
          ...componentInstance,
          rootNodes: [],
          selectedNodeID: action.payload.selectedAsset,
          appContext: action.payload.selectedAppContext,
          errorMessage: null,
          loading: true,
          autoCompleteCount: _.isNil(action.payload.autoCompleteCount)
            ? componentInstance.autoCompleteCount
            : action.payload.autoCompleteCount,
          parentID: _.isNil(action.payload.parentAssetID) ? componentInstance.parentID : action.payload.parentAssetID,
          startAtLevel: _.isNil(action.payload.startAtLevel) ? componentInstance.startAtLevel : action.payload.startAtLevel,
          stopAtLevel: _.isNil(action.payload.stopAtLevel) ? componentInstance.stopAtLevel : action.payload.stopAtLevel,
          showTreeSelector: _.isNil(action.payload.showTreeSelector)
            ? componentInstance.showTreeSelector
            : action.payload.showTreeSelector
        });
      }
      return setComponentInstance(state, componentInstance);
    }

    // Here the content of the adhoc trees for this app context are set.
    // It needs to set a single tree as the selected tree and add its nodes.
    // It also needs to select the selected node if one exists.
    case AssetTreeActionTypes.InitializeAssetTreeComplete: {
      let componentInstance = getComponentInstance(state, action.payload.params.key);

      // We have been given a list of all the trees for the drop down.  We need to figure out which
      // one is selected.  That should be based on either the tree that was selected, the nodes that were returned, or the
      // tree marked as default.
      let selectedTree: string = null;
      if (action.payload.params.selectedTree) {
        selectedTree = action.payload.params.selectedTree;
      } else if (action.payload.assets && action.payload.assets.length > 0) {
        selectedTree = action.payload.assets[0].TreeId;
      } else if (action.payload.trees && action.payload.trees.length > 0) {
        selectedTree = (_.find(action.payload.trees, t => t.IsDefaultTree) || action.payload.trees[0]).TreeId;
      }

      // Here we look for the node that was selected.  If the user looked for a node based on the unique key
      // this is easy.  If they looked for a node based on an asset id or guid we need to check the included asset
      // to find the selected node.
      let selectedNode: IAdHocNode = null;
      if (action.payload.params.selectedAsset) {
        selectedNode = _.find(action.payload.assets, (asset: IAdHocNode) => {
          if (asset.UniqueKey === action.payload.params.selectedAsset) {
            return true;
          } else if (asset.Asset) {
            if (
              asset.Asset.GlobalId === action.payload.params.selectedAsset ||
              String(asset.Asset.AssetID) === action.payload.params.selectedAsset
            ) {
              return true;
            }
          }
          return false;
        });
      }

      if (componentInstance) {
        // The root assets will be where the generation of the tree starts.  The routine will start at the roots and
        // find the descendants.  On the initial load all non-derived nodes should be returned. That means
        // any node without a parent is a root.
        const rootNodes: string[] = action.payload.assets.filter(n => !n.ParentUniqueKey).map(n => n.UniqueKey);

        // If a node is in the list of parent nodes then it must be retrieved already.
        const retrievedNodes: string[] = _.uniq(action.payload.assets.map(n => n.ParentUniqueKey));
        const retrievedNodesUpdates: Array<Update<AssetTreeNode>> = [];
        for (const n of retrievedNodes) {
          if (n) {
            retrievedNodesUpdates.push({ id: n, changes: { Retrieved: true } });
          }
        }

        // Now add all of the assets and the available trees and the selected items to the component instance.
        componentInstance = assetAdapter.addAll(
          action.payload.assets.map(a => TurnAdHocNodeIntoTreeNode(a, componentInstance.stopAtLevel)),
          {
            ...componentInstance,
            rootNodes,
            errorMessage: null,
            trees: action.payload.trees,
            selectedTree,
            selectedNodeID: selectedNode ? selectedNode.UniqueKey : componentInstance.selectedNodeID,
            loading: false
          }
        );

        componentInstance = assetAdapter.updateMany(retrievedNodesUpdates, componentInstance);

        // This method will set the assets above the selected asset to expanded.
        componentInstance = assetAdapter.updateMany(getUpdatesToSelectNode(componentInstance), componentInstance);
        return setComponentInstance(state, componentInstance);
      }

      return state;
    }

    case AssetTreeActionTypes.ExpandNodeStarted: {
      let componentInstance = getComponentInstance(state, action.payload.key);

      if (componentInstance) {
        // Here we set the asset to loading.  The asset is an Update object
        // that simply has the ID of the asset and the value of whether it should be expanded or collapsed.
        const update: Update<AssetTreeNode> = {
          id: action.payload.node.UniqueKey,
          changes: {
            Symbol: 'loading'
          }
        };

        componentInstance = assetAdapter.updateOne(update, componentInstance);
        return setComponentInstance(state, componentInstance);
      }

      return state;
    }

    // Here we have expanded an asset.  If the children of the asset need to be loaded they are included in the
    // payload.  Otherwise the asset simply needs to be expanded.
    case AssetTreeActionTypes.ExpandNodeComplete: {
      let componentInstance = getComponentInstance(state, action.payload.key);

      if (componentInstance) {
        // If there are children then put them in the store.
        if (action.payload.children) {
          componentInstance = assetAdapter.addMany(
            action.payload.children.map(n => TurnAdHocNodeIntoTreeNode(n, componentInstance.stopAtLevel)),
            componentInstance
          );
        }

        // Here we want the node to appear to be expanded or collapsed if it has children
        // It the node has been retrieved and has no children it should appear with no symbol.
        let update = action.payload.node;
        if (hasChildren(componentInstance, String(action.payload.node.id))) {
          const s = update.changes.Expanded ? 'expanded' : 'collapsed';
          update = { ...update, changes: { ...update.changes, Symbol: s } };
        } else {
          update = { ...update, changes: { ...update.changes, Symbol: 'nothing', HasChildren: false } };
        }

        // Here we actually set the asset to expanded or collapsed.  The asset is an Update object
        // that simply has the ID of the asset and the value of whether it should be expanded or collapsed.
        componentInstance = assetAdapter.updateOne(update, componentInstance);
        return setComponentInstance(state, componentInstance);
      }
      return state;
    }

    // The selected asset is set by keeping a reference to the selected asset ID.  This will need to be changed if we ever do
    // a multi-select type of thing.
    case AssetTreeActionTypes.SelectNode: {
      const k = action.payload.key || 'default';
      const update: Update<ComponentInstanceState> = action.payload.node
        ? { id: k, changes: { selectedNodeID: action.payload.node.UniqueKey } }
        : { id: k, changes: { selectedNodeID: null } };

      return treeAdapter.updateOne(update, state);
    }

    // The auto-complete should probably be its own component, but I am starting simple for now.
    // The started event sets the spinner visible so people know a search is happening.
    case AssetTreeActionTypes.AutoCompleteSearchStarted: {
      const k = action.payload.key || 'default';
      const update: Update<ComponentInstanceState> = {
        id: k,
        changes: {
          autoCompletePending: true,
          autoCompleteSearch: action.payload.search
        }
      };
      return treeAdapter.updateOne(update, state);
    }

    // Here we have a set of items that match the auto-complete search string.
    case AssetTreeActionTypes.AutoCompleteSearchSuccess: {
      const k = action.payload.key || 'default';
      const update: Update<ComponentInstanceState> = {
        id: k,
        changes: {
          autoCompletePending: false,
          autoCompleteAssets: action.payload.assets,
          autoCompleteSearch: action.payload.search
        }
      };
      return treeAdapter.updateOne(update, state);
    }

    // This method will find an asset by its integer ID and select it.
    //
    case AssetTreeActionTypes.SelectAssetByIDSuccess: {
      let componentInstance = getComponentInstance(state, action.payload.key);
      if (componentInstance) {
        // The assets is a list of assets that represent ancestors of the selected asset.
        // If the selected asset is deep it needs to have all of its ancestors added to the
        // list of assets.  We can then select the asset by setting the selected asset field
        const assets = action.payload.assets;
        const selectedAsset = _.find(assets, (a: AssetTreeNode) => {
          return a.AssetId === action.payload.id || a.AssetGuid === action.payload.guid;
        });

        const assetsToAdd: AssetTreeNode[] = [];
        for (const a of assets) {
          if (!componentInstance.entities[a.UniqueKey]) {
            assetsToAdd.push(TurnAdHocNodeIntoTreeNode(a, componentInstance.stopAtLevel));
          }
        }

        // Add the new assets to the state and set the selected asset.
        componentInstance = assetAdapter.addMany(assetsToAdd, {
          ...componentInstance,
          selectedNodeID: selectedAsset.UniqueKey
        });

        // This method will set the assets above the selected asset to expanded.
        componentInstance = assetAdapter.updateMany(getUpdatesToSelectNode(componentInstance), componentInstance);

        return setComponentInstance(state, componentInstance);
      }
      return state;
    }

    case AssetTreeActionTypes.AssetTreeRetrievalError: {
      return { ...state, error: action.payload };
    }

    default: {
      return state;
    }
  }
}
