export var RootActionTypes;
(function (RootActionTypes) {
    RootActionTypes["LOGOUT"] = "[Auth] LOGOUT";
})(RootActionTypes || (RootActionTypes = {}));
var LOGOUT = /** @class */ (function () {
    function LOGOUT() {
        this.type = RootActionTypes.LOGOUT;
    }
    return LOGOUT;
}());
export { LOGOUT };
export function clearAllState(reducer) {
    return function (state, action) {
        if (action.type === RootActionTypes.LOGOUT) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
//# sourceMappingURL=index.js.map