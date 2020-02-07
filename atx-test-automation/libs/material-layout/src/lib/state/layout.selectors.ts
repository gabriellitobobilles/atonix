import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.reducer';

const getLayoutState = createFeatureSelector<LayoutState>('layout');
export const getShowSideNav = createSelector(
  getLayoutState,
  state => state.showSidenav
);
export const getSidenavWidth = createSelector(
  getLayoutState,
  state => state.sidenavWidth
);

export const layoutQuery = {
  getShowSideNav,
  getSidenavWidth
};
