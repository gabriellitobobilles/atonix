import { LayoutActions, LayoutActionTypes } from './layout.actions';

export interface LayoutState {
  isAssetNavigatorOpen: boolean;
  assetNavigatorWidth: number;
  isTimeSelectorOpen: boolean;
  timeSelectorHeight: number;
}

const initialState: LayoutState = {
  isAssetNavigatorOpen: true,
  assetNavigatorWidth: 225,
  isTimeSelectorOpen: true,
  timeSelectorHeight: 75
};

export function reducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.SetAssetNavigatorWidth:
      return {
        ...state,
        assetNavigatorWidth: action.payload
      };

    case LayoutActionTypes.SetTimeSelectorHeight:
      return {
        ...state,
        timeSelectorHeight: action.payload
      };

    case LayoutActionTypes.OpenAssetNavigator:
      return {
        ...state,
        isAssetNavigatorOpen: true
      };

    case LayoutActionTypes.OpenTimeSelector:
      return {
        ...state,
        isTimeSelectorOpen: true
      };

    case LayoutActionTypes.ToggleAssetNavigator:
      const width = state.isAssetNavigatorOpen ? 0 : state.assetNavigatorWidth;
      return {
        ...state,
        isAssetNavigatorOpen: !state.isAssetNavigatorOpen
      };

    case LayoutActionTypes.ToggleTimeSelector:
      return {
        ...state,
        isTimeSelectorOpen: !state.isTimeSelectorOpen
      };

    case LayoutActionTypes.CloseAssetNavigator:
      return {
        ...state,
        isAssetNavigatorOpen: false
      };

    case LayoutActionTypes.CloseTimeSelector:
      return {
        ...state,
        isTimeSelectorOpen: false
      };

    default:
      return state;
  }
}
