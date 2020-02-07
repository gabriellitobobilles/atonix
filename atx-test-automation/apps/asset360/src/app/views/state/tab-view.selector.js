import { createFeatureSelector, createSelector } from '@ngrx/store';
var getTabViewState = createFeatureSelector('tabview');
export var tabViewErrorMessage = createSelector(getTabViewState, function (state) { return state.tabViewErrorMessage; });
export var getAssetViews = createSelector(getTabViewState, function (state) { return state.assetViews; });
export var getDefaultView = createSelector(getTabViewState, function (state) { return state.defaultView; });
export var getTabViewPending = createSelector(getTabViewState, function (state) { return state.tabViewPending; });
export var tabViewQuery = {
    tabViewErrorMessage: tabViewErrorMessage,
    getAssetViews: getAssetViews,
    getDefaultView: getDefaultView,
    getTabViewPending: getTabViewPending
};
//# sourceMappingURL=tab-view.selector.js.map