export var AssetTreeActionTypes;
(function (AssetTreeActionTypes) {
    AssetTreeActionTypes["InitializeAssetTree"] = "[AssetTree] Initialize Asset Tree";
    AssetTreeActionTypes["InitializeAssetTreeStarted"] = "[AssetTree] Initialize Asset Tree Started";
    AssetTreeActionTypes["InitializeAssetTreeComplete"] = "[AssetTree] Initialize Asset Tree Complete";
    AssetTreeActionTypes["GetChildNodes"] = "[AssetTree] Get Child Nodes";
    AssetTreeActionTypes["ChildNodesRetrieved"] = "[AssetTree] Child Nodes Retrieved";
    AssetTreeActionTypes["AssetTreeRetrievalError"] = "[AssetTree] Asset Tree Retrieval Error";
    AssetTreeActionTypes["ExpandNode"] = "[AssetTree] Expand Node";
    AssetTreeActionTypes["ExpandNodeStarted"] = "[AssetTree] Expand Node Started";
    AssetTreeActionTypes["ExpandNodeComplete"] = "[AssetTree] Expand Node Complete";
    AssetTreeActionTypes["SelectNode"] = "[AssetTree] Select Node";
    AssetTreeActionTypes["SelectTree"] = "[AssetTree] Select Tree";
    AssetTreeActionTypes["AutoCompleteSearch"] = "[AssetTree] Auto Complete Search";
    AssetTreeActionTypes["AutoCompleteSearchStarted"] = "[AssetTree] Auto Complete Search Started";
    AssetTreeActionTypes["AutoCompleteSearchSuccess"] = "[AssetTree] Auto Complete Search Success";
    AssetTreeActionTypes["SelectAssetByID"] = "[AssetTree] Select Asset By ID";
    AssetTreeActionTypes["SelectAssetByIDSuccess"] = "[AssetTree] Select Asset By ID Success";
    AssetTreeActionTypes["TreeNotInitializedError"] = "[AssetTree] Tree Not Initialized";
})(AssetTreeActionTypes || (AssetTreeActionTypes = {}));
var InitializeAssetTree = /** @class */ (function () {
    function InitializeAssetTree(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.InitializeAssetTree;
    }
    return InitializeAssetTree;
}());
export { InitializeAssetTree };
var InitializeAssetTreeStarted = /** @class */ (function () {
    function InitializeAssetTreeStarted(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.InitializeAssetTreeStarted;
    }
    return InitializeAssetTreeStarted;
}());
export { InitializeAssetTreeStarted };
var InitializeAssetTreeComplete = /** @class */ (function () {
    function InitializeAssetTreeComplete(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.InitializeAssetTreeComplete;
    }
    return InitializeAssetTreeComplete;
}());
export { InitializeAssetTreeComplete };
var GetChildNodes = /** @class */ (function () {
    function GetChildNodes(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.GetChildNodes;
    }
    return GetChildNodes;
}());
export { GetChildNodes };
var ChildNodesRetrieved = /** @class */ (function () {
    function ChildNodesRetrieved(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.ChildNodesRetrieved;
    }
    return ChildNodesRetrieved;
}());
export { ChildNodesRetrieved };
var AssetTreeRetrievalError = /** @class */ (function () {
    function AssetTreeRetrievalError(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.AssetTreeRetrievalError;
    }
    return AssetTreeRetrievalError;
}());
export { AssetTreeRetrievalError };
var SelectNode = /** @class */ (function () {
    function SelectNode(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.SelectNode;
    }
    return SelectNode;
}());
export { SelectNode };
var SelectAssetByID = /** @class */ (function () {
    function SelectAssetByID(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.SelectAssetByID;
    }
    return SelectAssetByID;
}());
export { SelectAssetByID };
var SelectAssetByIDSuccess = /** @class */ (function () {
    function SelectAssetByIDSuccess(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.SelectAssetByIDSuccess;
    }
    return SelectAssetByIDSuccess;
}());
export { SelectAssetByIDSuccess };
var ExpandNode = /** @class */ (function () {
    function ExpandNode(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.ExpandNode;
    }
    return ExpandNode;
}());
export { ExpandNode };
var ExpandNodeStarted = /** @class */ (function () {
    function ExpandNodeStarted(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.ExpandNodeStarted;
    }
    return ExpandNodeStarted;
}());
export { ExpandNodeStarted };
var ExpandNodeComplete = /** @class */ (function () {
    function ExpandNodeComplete(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.ExpandNodeComplete;
    }
    return ExpandNodeComplete;
}());
export { ExpandNodeComplete };
var SelectTree = /** @class */ (function () {
    function SelectTree(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.SelectTree;
    }
    return SelectTree;
}());
export { SelectTree };
var AutoCompleteSearch = /** @class */ (function () {
    function AutoCompleteSearch(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.AutoCompleteSearch;
    }
    return AutoCompleteSearch;
}());
export { AutoCompleteSearch };
var AutoCompleteSearchStarted = /** @class */ (function () {
    function AutoCompleteSearchStarted(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.AutoCompleteSearchStarted;
    }
    return AutoCompleteSearchStarted;
}());
export { AutoCompleteSearchStarted };
var AutoCompleteSearchSuccess = /** @class */ (function () {
    function AutoCompleteSearchSuccess(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.AutoCompleteSearchSuccess;
    }
    return AutoCompleteSearchSuccess;
}());
export { AutoCompleteSearchSuccess };
var TreeNotInitialized = /** @class */ (function () {
    function TreeNotInitialized(payload) {
        this.payload = payload;
        this.type = AssetTreeActionTypes.TreeNotInitializedError;
    }
    return TreeNotInitialized;
}());
export { TreeNotInitialized };
//# sourceMappingURL=asset-tree.actions.js.map