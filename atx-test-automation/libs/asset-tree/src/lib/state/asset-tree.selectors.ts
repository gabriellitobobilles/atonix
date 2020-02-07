import * as _ from 'lodash';
import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { AssetTreesState } from './asset-tree.reducer';
import { AssetTreeNode } from '../models/asset-tree-node';
import { IAdHocTree } from '@AtonixWebSites/api';

export const getAssetTreesState = createFeatureSelector<AssetTreesState>('assettree');

export const assetTreeQuery = {};

// This method processes the state into a flat list of assets.
// It is just a helper method to getNodes and shouldn't have any side effects or require any
// outside information.
function addChildren(asset: AssetTreeNode, assets: AssetTreeNode[], result: any[], level: number) {
  const children: AssetTreeNode[] = _.filter(assets, a => a.ParentUniqueKey === asset.UniqueKey);

  if (children.length > 0) {
    children[0] = { ...children[0], First: true };
    children[children.length - 1] = { ...children[children.length - 1], Last: true };
  }

  for (const c of children) {
    // c.Level = level + 1;
    result.push({ ...c, Level: level + 1 });
    if (c.Expanded) {
      // Recursive call to a static method.
      addChildren(c, assets, result, level + 1);
    }
  }
}

// Returns a flat list of the asset tree nodes used for rendering.
export function getNodes(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const result: any[] = [];
        const tree = state.entities[key];
        if (tree) {
          const rootNodes = _.map(tree.rootNodes, n => tree.entities[String(n)]);
          if (rootNodes.length > 0) {
            rootNodes[0] = { ...rootNodes[0], First: true };
            rootNodes[rootNodes.length - 1] = { ...rootNodes[rootNodes.length - 1], Last: true };
          }

          const allNodes: AssetTreeNode[] = [];
          for (const n of tree.ids) {
            allNodes.push(tree.entities[n]);
          }

          for (const rootNode of rootNodes) {
            result.push({ ...rootNode, Level: 0 });
            if (rootNode.Expanded) {
              addChildren(rootNode, allNodes, result, 0);
            }
          }
        }

        return result;
      }
    )
  );
}

// Returns the asset tree node that is currently selected.  This style
// will not work for multi-select, so it will need to be changed if we
// ever start using that feature.
export function getSelectedNode(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        let result: AssetTreeNode = null;
        const tree = state.entities[key];
        if (tree) {
          result = tree.entities[tree.selectedNodeID] || null;
        }
        return result;
      }
    )
  );
}

export function getSelectedAssetGuid(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        let result: string = null;
        const tree = state.entities[key];
        if (tree) {
          const asset = tree.entities[tree.selectedNodeID];
          result = asset ? asset.AssetGuid : null;
        }
        return result;
      }
    )
  );
}

export function getSelectedNodeID(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        let result: string = null;
        const tree = state.entities[key];
        if (tree) {
          result = tree.selectedNodeID;
        }
        return result;
      }
    )
  );
}

export function getSelectedAssetID(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        let result: number = null;
        const tree = state.entities[key];
        if (tree) {
          const asset = tree.entities[tree.selectedNodeID];
          result = asset ? asset.AssetId : null;
        }
        return result;
      }
    )
  );
}

export function getAllTrees(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.trees : [];
      }
    )
  );
}

export function getSelectedTree(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? _.find(tree.trees, (t: IAdHocTree) => t.TreeId === tree.selectedTree) : null;
      }
    )
  );
}

export function getAutoCompleteAssets(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.autoCompleteAssets : null;
      }
    )
  );
}

export function getAutoCompleteSearch(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.autoCompleteSearch : null;
      }
    )
  );
}

export function getAutoCompletePending(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.autoCompletePending : false;
      }
    )
  );
}

export function getShowTreeSelector(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.showTreeSelector : true;
      }
    )
  );
}

export function getButtons(key: string) {
  return select(
    createSelector(
      getAssetTreesState,
      state => {
        const tree = state.entities[key];
        return tree ? tree.buttons : null;
      }
    )
  );
}

export const error = select(
  createSelector(
    getAssetTreesState,
    state => state.error
  )
);

export const treesDict = select(
  createSelector(
    getAssetTreesState,
    state => state.entities
  )
);

export const treeSettings = select(
  createSelector(
    getAssetTreesState,
    state => {
      const result: {
        [id: string]: {
          appContext: string | number;
          autoCompleteCount: number;
          parentID: number;
          startAtLevel: number;
          stopAtLevel: number;
        };
      } = {};
      for (const id of state.ids) {
        const e = state.entities[id];
        result[id] = {
          appContext: e.appContext,
          autoCompleteCount: e.autoCompleteCount,
          parentID: e.parentID,
          startAtLevel: e.startAtLevel,
          stopAtLevel: e.stopAtLevel
        };
      }
      return result;
    }
  )
);
