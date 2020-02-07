import * as tslib_1 from "tslib";
import { LayoutActionTypes } from './layout.actions';
var initialState = {
    isAssetNavigatorOpen: true,
    assetNavigatorWidth: 225,
    isTimeSelectorOpen: true,
    timeSelectorHeight: 75
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case LayoutActionTypes.SetAssetNavigatorWidth:
            return tslib_1.__assign({}, state, { assetNavigatorWidth: action.payload });
        case LayoutActionTypes.SetTimeSelectorHeight:
            return tslib_1.__assign({}, state, { timeSelectorHeight: action.payload });
        case LayoutActionTypes.OpenAssetNavigator:
            return tslib_1.__assign({}, state, { isAssetNavigatorOpen: true });
        case LayoutActionTypes.OpenTimeSelector:
            return tslib_1.__assign({}, state, { isTimeSelectorOpen: true });
        case LayoutActionTypes.ToggleAssetNavigator:
            var width = state.isAssetNavigatorOpen ? 0 : state.assetNavigatorWidth;
            return tslib_1.__assign({}, state, { isAssetNavigatorOpen: !state.isAssetNavigatorOpen });
        case LayoutActionTypes.ToggleTimeSelector:
            return tslib_1.__assign({}, state, { isTimeSelectorOpen: !state.isTimeSelectorOpen });
        case LayoutActionTypes.CloseAssetNavigator:
            return tslib_1.__assign({}, state, { isAssetNavigatorOpen: false });
        case LayoutActionTypes.CloseTimeSelector:
            return tslib_1.__assign({}, state, { isTimeSelectorOpen: false });
        default:
            return state;
    }
}
//# sourceMappingURL=layout.reducer.js.map