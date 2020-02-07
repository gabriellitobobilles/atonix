import * as _ from 'lodash';
import { ExpandNode, SelectNode, InitializeAssetTree, SelectTree, AutoCompleteSearch, SelectAssetByID } from './asset-tree.actions';
import * as allSelectors from './asset-tree.selectors';
var AssetTreeFacade = /** @class */ (function () {
    function AssetTreeFacade(store, componentID) {
        this.store = store;
        this.componentID = componentID;
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
    AssetTreeFacade.prototype.getComponentID = function () {
        return this.componentID;
    };
    AssetTreeFacade.prototype.initialize = function (params) {
        params.key = this.componentID;
        this.store.dispatch(new InitializeAssetTree(params));
    };
    AssetTreeFacade.prototype.expandNode = function (node) {
        this.store.dispatch(new ExpandNode({ node: node, key: this.componentID }));
    };
    AssetTreeFacade.prototype.select = function (node) {
        this.store.dispatch(new SelectNode({ node: node, key: this.componentID }));
    };
    AssetTreeFacade.prototype.selectTree = function (id) {
        this.store.dispatch(new SelectTree({ id: id, key: this.componentID }));
    };
    AssetTreeFacade.prototype.selectAssetByID = function (id) {
        this.store.dispatch(new SelectAssetByID({ id: id, key: this.componentID }));
    };
    AssetTreeFacade.prototype.selectAssetByGUID = function (guid) {
        this.store.dispatch(new SelectAssetByID({ guid: guid, key: this.componentID }));
    };
    AssetTreeFacade.prototype.autoCompleteSearch = function (search) {
        this.store.dispatch(new AutoCompleteSearch({ search: search, key: this.componentID }));
    };
    return AssetTreeFacade;
}());
export { AssetTreeFacade };
//# sourceMappingURL=asset-tree.facade.js.map