import { createFeatureSelector, createSelector } from '@ngrx/store';
var getLayoutState = createFeatureSelector('layout');
export var getIsAssetNavigatorOpen = createSelector(getLayoutState, function (state) { return state.isAssetNavigatorOpen; });
export var getAssetNavigatorWidth = createSelector(getLayoutState, function (state) { return state.assetNavigatorWidth; });
export var getIsTimeSelectorOpen = createSelector(getLayoutState, function (state) { return state.isTimeSelectorOpen; });
export var getTimeSelectorHeight = createSelector(getLayoutState, function (state) { return state.timeSelectorHeight; });
export var getCurrentAssetNavigatorWidth = createSelector(getLayoutState, function (state) {
    if (state.isAssetNavigatorOpen) {
        return state.assetNavigatorWidth;
    }
    return 0;
});
export var getMainPanelBottom = createSelector(getLayoutState, function (state) {
    if (state.isTimeSelectorOpen) {
        return state.timeSelectorHeight;
    }
    return 0;
});
export var layoutQuery = {
    getIsAssetNavigatorOpen: getIsAssetNavigatorOpen,
    getCurrentAssetNavigatorWidth: getCurrentAssetNavigatorWidth,
    getAssetNavigatorWidth: getAssetNavigatorWidth,
    getIsTimeSelectorOpen: getIsTimeSelectorOpen,
    getTimeSelectorHeight: getTimeSelectorHeight,
    getMainPanelBottom: getMainPanelBottom
};
//# sourceMappingURL=layout.selectors.js.map