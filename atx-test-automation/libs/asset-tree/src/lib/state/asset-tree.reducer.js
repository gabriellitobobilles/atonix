import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { createEntityAdapter } from '@ngrx/entity';
import { AssetTreeActionTypes } from './asset-tree.actions';
import { TurnAdHocNodeIntoTreeNode } from '../models/asset-tree-node';
function compareNodes(a, b) {
    if (a.DisplayOrder === b.DisplayOrder) {
        if (a.NodeDesc < b.NodeDesc) {
            return -1;
        }
        else if (a.NodeDesc > b.NodeDesc) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        return a.DisplayOrder - b.DisplayOrder;
    }
}
// The asset adapter is used to manipulate the assets in a single adhoc tree
export var assetAdapter = createEntityAdapter({
    selectId: function (asset) { return asset.UniqueKey; },
    sortComparer: compareNodes
});
// The tree adapter is used to manipulate the list of components
export var treeAdapter = createEntityAdapter({
    selectId: function (tree) { return tree.id; }
});
// Get the initial state, which is an empty list of component states
export var initialState = treeAdapter.getInitialState();
// This function goes through the tree state and calculates the changes necessary to
// select a node.  It needs to make sure all nodes above the selected node are expanded
// and retrieved.  It could potentially create many asset updates.
function getUpdatesToSelectNode(tree) {
    var updates = [];
    var lcv = tree.entities[tree.selectedNodeID];
    if (lcv) {
        lcv = tree.entities[lcv.ParentUniqueKey];
        while (lcv) {
            updates.push({ id: lcv.UniqueKey, changes: { Expanded: true, Retrieved: true, Symbol: 'expanded' } });
            lcv = tree.entities[lcv.ParentUniqueKey];
        }
    }
    return updates;
}
function hasChildren(tree, id) {
    var result = _.find(tree.ids, function (n) { return tree.entities[n].ParentUniqueKey === id; });
    if (result) {
        return true;
    }
    else {
        return false;
    }
}
// Get the component state by ID.
function getComponentInstance(state, key) {
    return state.entities[key || 'default'];
}
// Update the state with the newly created component state.
function setComponentInstance(state, componentInstance) {
    if (componentInstance) {
        return treeAdapter.upsertOne(componentInstance, tslib_1.__assign({}, state));
    }
    return state;
}
// The reducer function that handles all actions.
export function assetTreeReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AssetTreeActionTypes.InitializeAssetTreeStarted: {
            // InitializeAssetTreeStarted is where we make sure a tree exists in the system.
            // It initially has no real content because it is waiting for the result of the
            // initial call to the server where the adhoc trees and the contents of the selected tree
            // are retrieved.
            var componentInstance = getComponentInstance(state, action.payload.key);
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
            }
            else {
                // The tree already existed so we want to reset it to defaults, clearing out all content
                componentInstance = assetAdapter.removeAll(tslib_1.__assign({}, componentInstance, { rootNodes: [], selectedNodeID: action.payload.selectedAsset, appContext: action.payload.selectedAppContext, errorMessage: null, loading: true, autoCompleteCount: _.isNil(action.payload.autoCompleteCount)
                        ? componentInstance.autoCompleteCount
                        : action.payload.autoCompleteCount, parentID: _.isNil(action.payload.parentAssetID) ? componentInstance.parentID : action.payload.parentAssetID, startAtLevel: _.isNil(action.payload.startAtLevel) ? componentInstance.startAtLevel : action.payload.startAtLevel, stopAtLevel: _.isNil(action.payload.stopAtLevel) ? componentInstance.stopAtLevel : action.payload.stopAtLevel, showTreeSelector: _.isNil(action.payload.showTreeSelector)
                        ? componentInstance.showTreeSelector
                        : action.payload.showTreeSelector }));
            }
            return setComponentInstance(state, componentInstance);
        }
        // Here the content of the adhoc trees for this app context are set.
        // It needs to set a single tree as the selected tree and add its nodes.
        // It also needs to select the selected node if one exists.
        case AssetTreeActionTypes.InitializeAssetTreeComplete: {
            var componentInstance_1 = getComponentInstance(state, action.payload.params.key);
            // We have been given a list of all the trees for the drop down.  We need to figure out which
            // one is selected.  That should be based on either the tree that was selected, the nodes that were returned, or the
            // tree marked as default.
            var selectedTree = null;
            if (action.payload.params.selectedTree) {
                selectedTree = action.payload.params.selectedTree;
            }
            else if (action.payload.assets && action.payload.assets.length > 0) {
                selectedTree = action.payload.assets[0].TreeId;
            }
            else if (action.payload.trees && action.payload.trees.length > 0) {
                selectedTree = (_.find(action.payload.trees, function (t) { return t.IsDefaultTree; }) || action.payload.trees[0]).TreeId;
            }
            // Here we look for the node that was selected.  If the user looked for a node based on the unique key
            // this is easy.  If they looked for a node based on an asset id or guid we need to check the included asset
            // to find the selected node.
            var selectedNode = null;
            if (action.payload.params.selectedAsset) {
                selectedNode = _.find(action.payload.assets, function (asset) {
                    if (asset.UniqueKey === action.payload.params.selectedAsset) {
                        return true;
                    }
                    else if (asset.Asset) {
                        if (asset.Asset.GlobalId === action.payload.params.selectedAsset ||
                            String(asset.Asset.AssetID) === action.payload.params.selectedAsset) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            if (componentInstance_1) {
                // The root assets will be where the generation of the tree starts.  The routine will start at the roots and
                // find the descendants.  On the initial load all non-derived nodes should be returned. That means
                // any node without a parent is a root.
                var rootNodes = action.payload.assets.filter(function (n) { return !n.ParentUniqueKey; }).map(function (n) { return n.UniqueKey; });
                // If a node is in the list of parent nodes then it must be retrieved already.
                var retrievedNodes = _.uniq(action.payload.assets.map(function (n) { return n.ParentUniqueKey; }));
                var retrievedNodesUpdates = [];
                for (var _i = 0, retrievedNodes_1 = retrievedNodes; _i < retrievedNodes_1.length; _i++) {
                    var n = retrievedNodes_1[_i];
                    if (n) {
                        retrievedNodesUpdates.push({ id: n, changes: { Retrieved: true } });
                    }
                }
                // Now add all of the assets and the available trees and the selected items to the component instance.
                componentInstance_1 = assetAdapter.addAll(action.payload.assets.map(function (a) { return TurnAdHocNodeIntoTreeNode(a, componentInstance_1.stopAtLevel); }), tslib_1.__assign({}, componentInstance_1, { rootNodes: rootNodes, errorMessage: null, trees: action.payload.trees, selectedTree: selectedTree, selectedNodeID: selectedNode ? selectedNode.UniqueKey : componentInstance_1.selectedNodeID, loading: false }));
                componentInstance_1 = assetAdapter.updateMany(retrievedNodesUpdates, componentInstance_1);
                // This method will set the assets above the selected asset to expanded.
                componentInstance_1 = assetAdapter.updateMany(getUpdatesToSelectNode(componentInstance_1), componentInstance_1);
                return setComponentInstance(state, componentInstance_1);
            }
            return state;
        }
        case AssetTreeActionTypes.ExpandNodeStarted: {
            var componentInstance = getComponentInstance(state, action.payload.key);
            if (componentInstance) {
                // Here we set the asset to loading.  The asset is an Update object
                // that simply has the ID of the asset and the value of whether it should be expanded or collapsed.
                var update = {
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
            var componentInstance_2 = getComponentInstance(state, action.payload.key);
            if (componentInstance_2) {
                // If there are children then put them in the store.
                if (action.payload.children) {
                    componentInstance_2 = assetAdapter.addMany(action.payload.children.map(function (n) { return TurnAdHocNodeIntoTreeNode(n, componentInstance_2.stopAtLevel); }), componentInstance_2);
                }
                // Here we want the node to appear to be expanded or collapsed if it has children
                // It the node has been retrieved and has no children it should appear with no symbol.
                var update = action.payload.node;
                if (hasChildren(componentInstance_2, String(action.payload.node.id))) {
                    var s = update.changes.Expanded ? 'expanded' : 'collapsed';
                    update = tslib_1.__assign({}, update, { changes: tslib_1.__assign({}, update.changes, { Symbol: s }) });
                }
                else {
                    update = tslib_1.__assign({}, update, { changes: tslib_1.__assign({}, update.changes, { Symbol: 'nothing', HasChildren: false }) });
                }
                // Here we actually set the asset to expanded or collapsed.  The asset is an Update object
                // that simply has the ID of the asset and the value of whether it should be expanded or collapsed.
                componentInstance_2 = assetAdapter.updateOne(update, componentInstance_2);
                return setComponentInstance(state, componentInstance_2);
            }
            return state;
        }
        // The selected asset is set by keeping a reference to the selected asset ID.  This will need to be changed if we ever do
        // a multi-select type of thing.
        case AssetTreeActionTypes.SelectNode: {
            var k = action.payload.key || 'default';
            var update = action.payload.node
                ? { id: k, changes: { selectedNodeID: action.payload.node.UniqueKey } }
                : { id: k, changes: { selectedNodeID: null } };
            return treeAdapter.updateOne(update, state);
        }
        // The auto-complete should probably be its own component, but I am starting simple for now.
        // The started event sets the spinner visible so people know a search is happening.
        case AssetTreeActionTypes.AutoCompleteSearchStarted: {
            var k = action.payload.key || 'default';
            var update = {
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
            var k = action.payload.key || 'default';
            var update = {
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
            var componentInstance = getComponentInstance(state, action.payload.key);
            if (componentInstance) {
                // The assets is a list of assets that represent ancestors of the selected asset.
                // If the selected asset is deep it needs to have all of its ancestors added to the
                // list of assets.  We can then select the asset by setting the selected asset field
                var assets = action.payload.assets;
                var selectedAsset = _.find(assets, function (a) {
                    return a.AssetId === action.payload.id || a.AssetGuid === action.payload.guid;
                });
                var assetsToAdd = [];
                for (var _a = 0, assets_1 = assets; _a < assets_1.length; _a++) {
                    var a = assets_1[_a];
                    if (!componentInstance.entities[a.UniqueKey]) {
                        assetsToAdd.push(TurnAdHocNodeIntoTreeNode(a, componentInstance.stopAtLevel));
                    }
                }
                // Add the new assets to the state and set the selected asset.
                componentInstance = assetAdapter.addMany(assetsToAdd, tslib_1.__assign({}, componentInstance, { selectedNodeID: selectedAsset.UniqueKey }));
                // This method will set the assets above the selected asset to expanded.
                componentInstance = assetAdapter.updateMany(getUpdatesToSelectNode(componentInstance), componentInstance);
                return setComponentInstance(state, componentInstance);
            }
            return state;
        }
        case AssetTreeActionTypes.AssetTreeRetrievalError: {
            return tslib_1.__assign({}, state, { error: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=asset-tree.reducer.js.map