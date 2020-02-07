export var LayoutActionTypes;
(function (LayoutActionTypes) {
    LayoutActionTypes["SetAssetNavigatorWidth"] = "[atxLayout] Set Asset Navigator Width";
    LayoutActionTypes["SetTimeSelectorHeight"] = "[atxLayout] Set Time Selector Height";
    LayoutActionTypes["OpenAssetNavigator"] = "[atxLayout] Open Asset Navigator";
    LayoutActionTypes["OpenTimeSelector"] = "[atxLayout] Open Time Selector";
    LayoutActionTypes["ToggleAssetNavigator"] = "[atxLayout] Toggle Asset Navigator";
    LayoutActionTypes["ToggleTimeSelector"] = "[atxLayout] Toggle Time Selector";
    LayoutActionTypes["CloseAssetNavigator"] = "[atxLayout] Close Asset Navigator";
    LayoutActionTypes["CloseTimeSelector"] = "[atxLayout] Close Time Selector";
})(LayoutActionTypes || (LayoutActionTypes = {}));
var SetAssetNavigatorWidth = /** @class */ (function () {
    function SetAssetNavigatorWidth(payload) {
        this.payload = payload;
        this.type = LayoutActionTypes.SetAssetNavigatorWidth;
    }
    return SetAssetNavigatorWidth;
}());
export { SetAssetNavigatorWidth };
var SetTimeSelectorHeight = /** @class */ (function () {
    function SetTimeSelectorHeight(payload) {
        this.payload = payload;
        this.type = LayoutActionTypes.SetTimeSelectorHeight;
    }
    return SetTimeSelectorHeight;
}());
export { SetTimeSelectorHeight };
var OpenAssetNavigator = /** @class */ (function () {
    function OpenAssetNavigator() {
        this.type = LayoutActionTypes.OpenAssetNavigator;
    }
    return OpenAssetNavigator;
}());
export { OpenAssetNavigator };
var OpenTimeSelector = /** @class */ (function () {
    function OpenTimeSelector() {
        this.type = LayoutActionTypes.OpenTimeSelector;
    }
    return OpenTimeSelector;
}());
export { OpenTimeSelector };
var ToggleAssetNavigator = /** @class */ (function () {
    function ToggleAssetNavigator() {
        this.type = LayoutActionTypes.ToggleAssetNavigator;
    }
    return ToggleAssetNavigator;
}());
export { ToggleAssetNavigator };
var ToggleTimeSelector = /** @class */ (function () {
    function ToggleTimeSelector() {
        this.type = LayoutActionTypes.ToggleTimeSelector;
    }
    return ToggleTimeSelector;
}());
export { ToggleTimeSelector };
var CloseAssetNavigator = /** @class */ (function () {
    function CloseAssetNavigator() {
        this.type = LayoutActionTypes.CloseAssetNavigator;
    }
    return CloseAssetNavigator;
}());
export { CloseAssetNavigator };
var CloseTimeSelector = /** @class */ (function () {
    function CloseTimeSelector() {
        this.type = LayoutActionTypes.CloseTimeSelector;
    }
    return CloseTimeSelector;
}());
export { CloseTimeSelector };
//# sourceMappingURL=layout.actions.js.map