import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TabViewState } from './tab-view.reducer';

const getTabViewState = createFeatureSelector<TabViewState>('tabview');

export const tabViewErrorMessage = createSelector(
  getTabViewState,
  state => state.tabViewErrorMessage
);
export const getAssetViews = createSelector(
  getTabViewState,
  state => state.assetViews
);
export const getDefaultView = createSelector(
  getTabViewState,
  state => state.defaultView
);
export const getTabViewPending = createSelector(
  getTabViewState,
  state => state.tabViewPending
);

export const tabViewQuery = {
  tabViewErrorMessage,
  getAssetViews,
  getDefaultView,
  getTabViewPending
};
