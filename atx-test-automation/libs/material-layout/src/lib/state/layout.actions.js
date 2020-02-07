export var LayoutActionTypes;
(function (LayoutActionTypes) {
    LayoutActionTypes["OpenAssetNavigator"] = "[Layout] Open Asset Navigator";
    LayoutActionTypes["CloseAssetNavigator"] = "[Layout] Close Asset Navigator";
    LayoutActionTypes["ToggleAssetNavigator"] = "[Layout] Toggle Asset Navigator";
    LayoutActionTypes["SetSidenavWidth"] = "[Layout] Set Sidenav Width";
})(LayoutActionTypes || (LayoutActionTypes = {}));
var OpenSidenav = /** @class */ (function () {
    function OpenSidenav() {
        this.type = LayoutActionTypes.OpenAssetNavigator;
    }
    return OpenSidenav;
}());
export { OpenSidenav };
var CloseSidenav = /** @class */ (function () {
    function CloseSidenav() {
        this.type = LayoutActionTypes.CloseAssetNavigator;
    }
    return CloseSidenav;
}());
export { CloseSidenav };
var ToggleAssetNavigator = /** @class */ (function () {
    function ToggleAssetNavigator() {
        this.type = LayoutActionTypes.ToggleAssetNavigator;
    }
    return ToggleAssetNavigator;
}());
export { ToggleAssetNavigator };
var SetSidenavWidth = /** @class */ (function () {
    function SetSidenavWidth(payload) {
        this.payload = payload;
        this.type = LayoutActionTypes.SetSidenavWidth;
    }
    return SetSidenavWidth;
}());
export { SetSidenavWidth };
//# sourceMappingURL=layout.actions.js.map