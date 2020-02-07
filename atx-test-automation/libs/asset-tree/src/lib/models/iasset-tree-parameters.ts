import { AssetTreeNode } from './asset-tree-node';

export interface IButtonInfo {
  id: string;
  class: string;
  tooltip: string;
  show?: (node?: AssetTreeNode) => boolean;
}

export interface IAssetTreeParameters {
  // The selected asset can be either an asset ID, an asset GUID or the unique key for the asset
  selectedAsset?: string;

  // The selected node is only valid when the selected asset is not a unique key, it references the parent node
  // of the selected asset so that we can find the right node on the tree if an asset appears more than once.
  selectedNode?: string;

  // The selected tree is only necessary if the selected asset is not a unique key.  It indiates the
  // tree that is selected.  If it is not set and the selected asset is not a unique key this will default to the default tree.
  selectedTree?: string;

  // The app context to set the asset tree to.  Setting this to null is valid, or to the name or id of the desired app context.
  selectedAppContext?: number | string;

  // The number of assets to show in the auto complete drop down.  5 is the default
  autoCompleteCount?: number;

  // If the tree is the default and it is supposed to start from some indicated root this can create that.  We probably need to
  // remove this in favor of using adhoc trees.
  parentAssetID?: number;

  // This is useful if you want to only see assets at or below a certain level.  It uses the asset type, so you can use unit or station.
  // This does not specify the level in the hierarchy.
  startAtLevel?: number;

  // This is useful if you want to see assets to a certain level. It uses the asset type, so you can use unit or station.
  // This does not specify the level in the hierarchy.
  stopAtLevel?: number;

  // This is the ID of the asset tree.  If it is left blank the value will default to 'default'
  key?: string;

  // Set to false if you only want to show the default tree.
  showTreeSelector?: boolean;

  // This will allow you to put buttons next to the asset.
  buttons?: IButtonInfo[];
}

export interface IButtonClick {
  button: IButtonInfo;
  node: AssetTreeNode;
}
