import { IAssetView } from '@AtonixWebSites/api';
import { TabViewActions, TabViewActionTypes } from './tab-view.actions';

export interface TabViewState {
  assetViews: IAssetView[];
  defaultView: number;
  tabViewErrorMessage: string;
  tabViewPending: boolean;
}

const initialState: TabViewState = {
  assetViews: [],
  defaultView: -1,
  tabViewErrorMessage: '',
  tabViewPending: true
};

export function reducer(state = initialState, action: TabViewActions): TabViewState {
  switch (action.type) {
    case TabViewActionTypes.AssetViewFromIdSuccess:
      return {
        ...state,
        defaultView: action.payload.SelectedView,
        assetViews: action.payload.Views,
        tabViewErrorMessage: '',
        tabViewPending: false
      };

    case TabViewActionTypes.AssetViewFromIdFailure:
      return {
        ...state,
        tabViewErrorMessage: action.payload,
        tabViewPending: true
      };

    default:
      return state;
  }
}
