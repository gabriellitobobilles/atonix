import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.reducer';

const getLayoutState = createFeatureSelector<LayoutState>('layout');
export const getIsAssetNavigatorOpen = createSelector(
  getLayoutState,
  state => state.isAssetNavigatorOpen
);
export const getAssetNavigatorWidth = createSelector(
  getLayoutState,
  state => state.assetNavigatorWidth
);
export const getIsTimeSelectorOpen = createSelector(
  getLayoutState,
  state => state.isTimeSelectorOpen
);
export const getTimeSelectorHeight = createSelector(
  getLayoutState,
  state => state.timeSelectorHeight
);
export const getCurrentAssetNavigatorWidth = createSelector(
  getLayoutState,
  state => {
    if (state.isAssetNavigatorOpen) {
      return state.assetNavigatorWidth;
    }
    return 0;
  }
);

export const getMainPanelBottom = createSelector(
  getLayoutState,
  state => {
    if (state.isTimeSelectorOpen) {
      return state.timeSelectorHeight;
    }
    return 0;
  }
);

export const layoutQuery = {
  getIsAssetNavigatorOpen,
  getCurrentAssetNavigatorWidth,
  getAssetNavigatorWidth,
  getIsTimeSelectorOpen,
  getTimeSelectorHeight,
  getMainPanelBottom
};
