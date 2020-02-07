import * as tslib_1 from "tslib";
import * as _ from 'lodash';
export function TurnAdHocNodeIntoTreeNode(node, stopAtLevel) {
    // const children = _.map(assets, n => {
    //   // If this asset is a child of an asset linked node that is only supposed to retrieve its children it needs
    //   // to have its HasChildren and Retrieved flags set.
    //   const newNode = new AssetTreeNode(n);
    //   if (action.payload.node.NodeTypeId === 2 && action.payload.node.AssetNodeBehaviorId === 2) {
    //     newNode.HasChildren = false;
    //     newNode.Retrieved = true;
    //     newNode.Symbol = 'nothing';
    //   }
    //   return newNode;
    // });
    var hasChildren = node.HasChildren;
    var retrieved = false;
    var symbol = hasChildren ? 'collapsed' : 'nothing';
    // If this is an assetlinked node with the behavior of children or descendants we want it to look collapsed,
    // even if the has children flag is false.
    if (node.NodeTypeId === 2 && (node.AssetNodeBehaviorId === 2 || node.AssetNodeBehaviorId === 3)) {
        symbol = 'collapsed';
    }
    else if (node.NodeTypeId === 4 && !node.HasChildren) {
        hasChildren = false;
        retrieved = true;
        symbol = 'nothing';
    }
    // In this situation we want to treat all nodes at or below the stop at level as leaf nodes.
    if (!_.isNil(stopAtLevel)) {
        if (node && node.Asset && node.Asset.AssetType && node.Asset.AssetType.AssetTypeID >= stopAtLevel) {
            hasChildren = false;
            retrieved = true;
            symbol = 'nothing';
        }
    }
    var result = tslib_1.__assign({}, node, { Expanded: false, Retrieved: retrieved, Level: 0, Symbol: symbol, HasChildren: hasChildren, First: false, Last: false });
    return result;
}
//# sourceMappingURL=asset-tree-node.js.map