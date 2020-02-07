import * as tslib_1 from "tslib";
import { LayoutActionTypes } from './layout.actions';
export var initialState = {
    showSidenav: false,
    defaultSidenavWidth: 225,
    sidenavWidth: 225
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case LayoutActionTypes.CloseAssetNavigator:
            return tslib_1.__assign({}, state, { showSidenav: false, sidenavWidth: 0 });
        case LayoutActionTypes.OpenAssetNavigator:
            return tslib_1.__assign({}, state, { showSidenav: true, sidenavWidth: state.defaultSidenavWidth });
        case LayoutActionTypes.SetSidenavWidth:
            return tslib_1.__assign({}, state, { defaultSidenavWidth: action.payload, sidenavWidth: action.payload });
        case LayoutActionTypes.ToggleAssetNavigator:
            var width = state.showSidenav ? 0 : state.defaultSidenavWidth;
            return tslib_1.__assign({}, state, { showSidenav: !state.showSidenav, sidenavWidth: width });
        default:
            return state;
    }
}
//# sourceMappingURL=layout.reducer.js.map