/*STATES*/
import * as actions from './layout.actions';
import { reducer, LayoutState } from './layout.reducer';

describe('Layout Reducer', () => {
  const initialState: LayoutState = {
    isAssetNavigatorOpen: true,
    assetNavigatorWidth: 225,
    isTimeSelectorOpen: true,
    timeSelectorHeight: 75
  };

  describe('[atxLayout] Set Asset Navigator Width', () => {
    it('should toggle state', () => {
      const action = new actions.SetAssetNavigatorWidth(1);
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, assetNavigatorWidth: 1 });
    });
  });

  describe('[atxLayout] Set Time Selector Height', () => {
    it('should toggle state', () => {
      const action = new actions.SetTimeSelectorHeight(1);
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, timeSelectorHeight: 1 });
    });
  });

  describe('[atxLayout] Open Asset Navigator', () => {
    it('should toggle state', () => {
      const action = new actions.OpenAssetNavigator();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isAssetNavigatorOpen: true });
    });
  });

  describe('[atxLayout] Open Time Selector', () => {
    it('should toggle state', () => {
      const action = new actions.OpenTimeSelector();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isTimeSelectorOpen: true });
    });
  });

  describe('[atxLayout] Toggle Asset Navigator', () => {
    it('should toggle state', () => {
      const action = new actions.ToggleAssetNavigator();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isAssetNavigatorOpen: false });
    });
  });

  describe('[atxLayout] Toggle Time Selector', () => {
    it('should toggle state', () => {
      const action = new actions.ToggleTimeSelector();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isTimeSelectorOpen: false });
    });
  });

  describe('[atxLayout] Close Asset Navigator', () => {
    it('should toggle state', () => {
      const action = new actions.CloseAssetNavigator();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isAssetNavigatorOpen: false });
    });
  });

  describe('[atxLayout] Close Time Selector', () => {
    it('should toggle state', () => {
      const action = new actions.CloseTimeSelector();
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, isTimeSelectorOpen: false });
    });
  });
});
