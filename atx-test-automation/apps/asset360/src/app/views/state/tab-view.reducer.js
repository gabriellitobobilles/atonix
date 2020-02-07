import * as tslib_1 from "tslib";
import { TabViewActionTypes } from './tab-view.actions';
var initialState = {
    assetViews: [],
    defaultView: -1,
    tabViewErrorMessage: '',
    tabViewPending: true
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case TabViewActionTypes.AssetViewFromIdSuccess:
            return tslib_1.__assign({}, state, { defaultView: action.payload.SelectedView, assetViews: action.payload.Views, tabViewErrorMessage: '', tabViewPending: false });
        case TabViewActionTypes.AssetViewFromIdFailure:
            return tslib_1.__assign({}, state, { tabViewErrorMessage: action.payload, tabViewPending: true });
        default:
            return state;
    }
}
//# sourceMappingURL=tab-view.reducer.js.map