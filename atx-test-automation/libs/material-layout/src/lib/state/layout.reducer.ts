import { LayoutActions, LayoutActionTypes } from './layout.actions';

export interface LayoutState {
  showSidenav: boolean;
  defaultSidenavWidth: number;
  sidenavWidth: number;
}

export const initialState: LayoutState = {
  showSidenav: false,
  defaultSidenavWidth: 225,
  sidenavWidth: 225
};

export function reducer(state: LayoutState = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.CloseAssetNavigator:
      return {
        ...state,
        showSidenav: false,
        sidenavWidth: 0
      };

    case LayoutActionTypes.OpenAssetNavigator:
      return {
        ...state,
        showSidenav: true,
        sidenavWidth: state.defaultSidenavWidth
      };

    case LayoutActionTypes.SetSidenavWidth:
      return {
        ...state,
        defaultSidenavWidth: action.payload,
        sidenavWidth: action.payload
      };

    case LayoutActionTypes.ToggleAssetNavigator:
      const width = state.showSidenav ? 0 : state.defaultSidenavWidth;
      return {
        ...state,
        showSidenav: !state.showSidenav,
        sidenavWidth: width
      };

    default:
      return state;
  }
}
