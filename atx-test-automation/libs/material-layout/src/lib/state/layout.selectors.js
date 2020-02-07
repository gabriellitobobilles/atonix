import { createFeatureSelector, createSelector } from '@ngrx/store';
var getLayoutState = createFeatureSelector('layout');
export var getShowSideNav = createSelector(getLayoutState, function (state) { return state.showSidenav; });
export var getSidenavWidth = createSelector(getLayoutState, function (state) { return state.sidenavWidth; });
export var layoutQuery = {
    getShowSideNav: getShowSideNav,
    getSidenavWidth: getSidenavWidth
};
//# sourceMappingURL=layout.selectors.js.map