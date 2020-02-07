import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { createSelector, createFeatureSelector, select } from '@ngrx/store';
export var getAssetTreesState = createFeatureSelector('assettree');
export var assetTreeQuery = {};
// This method processes the state into a flat list of assets.
// It is just a helper method to getNodes and shouldn't have any side effects or require any
// outside information.
function addChildren(asset, assets, result, level) {
    var children = _.filter(assets, function (a) { return a.ParentUniqueKey === asset.UniqueKey; });
    if (children.length > 0) {
        children[0] = tslib_1.__assign({}, children[0], { First: true });
        children[children.length - 1] = tslib_1.__assign({}, children[children.length - 1], { Last: true });
    }
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var c = children_1[_i];
        // c.Level = level + 1;
        result.push(tslib_1.__assign({}, c, { Level: level + 1 }));
        if (c.Expanded) {
            // Recursive call to a static method.
            addChildren(c, assets, result, level + 1);
        }
    }
}
// Returns a flat list of the asset tree nodes used for rendering.
export function getNodes(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var result = [];
        var tree = state.entities[key];
        if (tree) {
            var rootNodes = _.map(tree.rootNodes, function (n) { return tree.entities[String(n)]; });
            if (rootNodes.length > 0) {
                rootNodes[0] = tslib_1.__assign({}, rootNodes[0], { First: true });
                rootNodes[rootNodes.length - 1] = tslib_1.__assign({}, rootNodes[rootNodes.length - 1], { Last: true });
            }
            var allNodes = [];
            for (var _i = 0, _a = tree.ids; _i < _a.length; _i++) {
                var n = _a[_i];
                allNodes.push(tree.entities[n]);
            }
            for (var _b = 0, rootNodes_1 = rootNodes; _b < rootNodes_1.length; _b++) {
                var rootNode = rootNodes_1[_b];
                result.push(tslib_1.__assign({}, rootNode, { Level: 0 }));
                if (rootNode.Expanded) {
                    addChildren(rootNode, allNodes, result, 0);
                }
            }
        }
        return result;
    }));
}
// Returns the asset tree node that is currently selected.  This style
// will not work for multi-select, so it will need to be changed if we
// ever start using that feature.
export function getSelectedNode(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var result = null;
        var tree = state.entities[key];
        if (tree) {
            result = tree.entities[tree.selectedNodeID] || null;
        }
        return result;
    }));
}
export function getSelectedAssetGuid(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var result = null;
        var tree = state.entities[key];
        if (tree) {
            var asset = tree.entities[tree.selectedNodeID];
            result = asset ? asset.AssetGuid : null;
        }
        return result;
    }));
}
export function getSelectedNodeID(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var result = null;
        var tree = state.entities[key];
        if (tree) {
            result = tree.selectedNodeID;
        }
        return result;
    }));
}
export function getSelectedAssetID(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var result = null;
        var tree = state.entities[key];
        if (tree) {
            var asset = tree.entities[tree.selectedNodeID];
            result = asset ? asset.AssetId : null;
        }
        return result;
    }));
}
export function getAllTrees(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.trees : [];
    }));
}
export function getSelectedTree(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? _.find(tree.trees, function (t) { return t.TreeId === tree.selectedTree; }) : null;
    }));
}
export function getAutoCompleteAssets(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.autoCompleteAssets : null;
    }));
}
export function getAutoCompleteSearch(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.autoCompleteSearch : null;
    }));
}
export function getAutoCompletePending(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.autoCompletePending : false;
    }));
}
export function getShowTreeSelector(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.showTreeSelector : true;
    }));
}
export function getButtons(key) {
    return select(createSelector(getAssetTreesState, function (state) {
        var tree = state.entities[key];
        return tree ? tree.buttons : null;
    }));
}
export var error = select(createSelector(getAssetTreesState, function (state) { return state.error; }));
export var treesDict = select(createSelector(getAssetTreesState, function (state) { return state.entities; }));
export var treeSettings = select(createSelector(getAssetTreesState, function (state) {
    var result = {};
    for (var _i = 0, _a = state.ids; _i < _a.length; _i++) {
        var id = _a[_i];
        var e = state.entities[id];
        result[id] = {
            appContext: e.appContext,
            autoCompleteCount: e.autoCompleteCount,
            parentID: e.parentID,
            startAtLevel: e.startAtLevel,
            stopAtLevel: e.stopAtLevel
        };
    }
    return result;
}));
//# sourceMappingURL=asset-tree.selectors.js.map