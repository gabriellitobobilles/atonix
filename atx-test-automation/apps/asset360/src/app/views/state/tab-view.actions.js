export var TabViewActionTypes;
(function (TabViewActionTypes) {
    TabViewActionTypes["AssetViewFromId"] = "[TabView] Get List of Tab Views for Asset";
    TabViewActionTypes["AssetViewFromIdSuccess"] = "[TabView] Get Tab Views Success";
    TabViewActionTypes["AssetViewFromIdFailure"] = "[TabView] Get Tab Views Failure";
})(TabViewActionTypes || (TabViewActionTypes = {}));
var AssetViewFromId = /** @class */ (function () {
    function AssetViewFromId(payload) {
        this.payload = payload;
        this.type = TabViewActionTypes.AssetViewFromId;
    }
    return AssetViewFromId;
}());
export { AssetViewFromId };
var AssetViewFromIdSuccess = /** @class */ (function () {
    function AssetViewFromIdSuccess(payload) {
        this.payload = payload;
        this.type = TabViewActionTypes.AssetViewFromIdSuccess;
    }
    return AssetViewFromIdSuccess;
}());
export { AssetViewFromIdSuccess };
var AssetViewFromIdFailure = /** @class */ (function () {
    function AssetViewFromIdFailure(payload) {
        this.payload = payload;
        this.type = TabViewActionTypes.AssetViewFromIdFailure;
    }
    return AssetViewFromIdFailure;
}());
export { AssetViewFromIdFailure };
//# sourceMappingURL=tab-view.actions.js.map