/*STATES*/
import { layoutQuery } from './layout.selectors';
import { LayoutState } from './layout.reducer';

describe('Layout Selectors', () => {
  const mockLayoutState: LayoutState = {
    isAssetNavigatorOpen: true,
    assetNavigatorWidth: 225,
    isTimeSelectorOpen: true,
    timeSelectorHeight: 75
  };

  const mockLayout = { layout: mockLayoutState };

  describe('getIsAssetNavigatorOpen', () => {
    it('should provide value of isAssetNavigatorOpen', () => {
      const selected = layoutQuery.getIsAssetNavigatorOpen(mockLayout);
      expect(selected).toBe(mockLayoutState.isAssetNavigatorOpen);
    });
  });

  describe('getAssetNavigatorWidth', () => {
    it('should provide value of assetNavigatorWidth', () => {
      const selected = layoutQuery.getAssetNavigatorWidth(mockLayout);
      expect(selected).toBe(mockLayoutState.assetNavigatorWidth);
    });
  });

  describe('getIsTimeSelectorOpen', () => {
    it('should provide value of isTimeSelectorOpen', () => {
      const selected = layoutQuery.getIsTimeSelectorOpen(mockLayout);
      expect(selected).toBe(mockLayoutState.isTimeSelectorOpen);
    });
  });

  describe('getTimeSelectorHeight', () => {
    it('should provide value of timeSelectorHeight', () => {
      const selected = layoutQuery.getTimeSelectorHeight(mockLayout);
      expect(selected).toBe(mockLayoutState.timeSelectorHeight);
    });
  });

  describe('getCurrentAssetNavigatorWidth', () => {
    it('should provide value of assetNavigatorWidth', () => {
      const selected = layoutQuery.getCurrentAssetNavigatorWidth(mockLayout);
      expect(selected).toBe(mockLayoutState.assetNavigatorWidth);
    });
  });

  describe('getMainPanelBottom', () => {
    it('should provide value of timeSelectorHeight', () => {
      const selected = layoutQuery.getMainPanelBottom(mockLayout);
      expect(selected).toBe(mockLayoutState.timeSelectorHeight);
    });
  });
});
