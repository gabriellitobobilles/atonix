export var RouterActionTypes;
(function (RouterActionTypes) {
    RouterActionTypes["GoToRoute"] = "[NGRX-Router] Go To Route";
    RouterActionTypes["GoBack"] = "[NGRX-Router] Go Back";
    RouterActionTypes["GoForward"] = "[NGRX-Router] Go Forward";
})(RouterActionTypes || (RouterActionTypes = {}));
var GotoRoute = /** @class */ (function () {
    function GotoRoute(payload) {
        this.payload = payload;
        this.type = RouterActionTypes.GoToRoute;
    }
    return GotoRoute;
}());
export { GotoRoute };
var GoBack = /** @class */ (function () {
    function GoBack() {
        this.type = RouterActionTypes.GoBack;
    }
    return GoBack;
}());
export { GoBack };
var GoForward = /** @class */ (function () {
    function GoForward() {
        this.type = RouterActionTypes.GoForward;
    }
    return GoForward;
}());
export { GoForward };
//# sourceMappingURL=router.actions.js.map