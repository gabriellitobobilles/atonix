import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SetAssetNavigatorWidth = '[atxLayout] Set Asset Navigator Width',
  SetTimeSelectorHeight = '[atxLayout] Set Time Selector Height',
  OpenAssetNavigator = '[atxLayout] Open Asset Navigator',
  OpenTimeSelector = '[atxLayout] Open Time Selector',
  ToggleAssetNavigator = '[atxLayout] Toggle Asset Navigator',
  ToggleTimeSelector = '[atxLayout] Toggle Time Selector',
  CloseAssetNavigator = '[atxLayout] Close Asset Navigator',
  CloseTimeSelector = '[atxLayout] Close Time Selector'
}

export class SetAssetNavigatorWidth implements Action {
  readonly type = LayoutActionTypes.SetAssetNavigatorWidth;
  constructor(public payload: number) {}
}

export class SetTimeSelectorHeight implements Action {
  readonly type = LayoutActionTypes.SetTimeSelectorHeight;
  constructor(public payload: number) {}
}

export class OpenAssetNavigator implements Action {
  readonly type = LayoutActionTypes.OpenAssetNavigator;
}

export class OpenTimeSelector implements Action {
  readonly type = LayoutActionTypes.OpenTimeSelector;
}

export class ToggleAssetNavigator implements Action {
  readonly type = LayoutActionTypes.ToggleAssetNavigator;
}

export class ToggleTimeSelector implements Action {
  readonly type = LayoutActionTypes.ToggleTimeSelector;
}

export class CloseAssetNavigator implements Action {
  readonly type = LayoutActionTypes.CloseAssetNavigator;
}

export class CloseTimeSelector implements Action {
  readonly type = LayoutActionTypes.CloseTimeSelector;
}

export type LayoutActions =
  | SetAssetNavigatorWidth
  | SetTimeSelectorHeight
  | OpenAssetNavigator
  | OpenTimeSelector
  | ToggleAssetNavigator
  | ToggleTimeSelector
  | CloseAssetNavigator
  | CloseTimeSelector;
