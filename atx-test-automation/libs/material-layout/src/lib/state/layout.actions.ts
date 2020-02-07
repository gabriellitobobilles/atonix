import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenAssetNavigator = '[Layout] Open Asset Navigator',
  CloseAssetNavigator = '[Layout] Close Asset Navigator',
  ToggleAssetNavigator = '[Layout] Toggle Asset Navigator',
  SetSidenavWidth = '[Layout] Set Sidenav Width'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenAssetNavigator;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseAssetNavigator;
}

export class ToggleAssetNavigator implements Action {
  readonly type = LayoutActionTypes.ToggleAssetNavigator;
}

export class SetSidenavWidth implements Action {
  readonly type = LayoutActionTypes.SetSidenavWidth;
  constructor(public payload: number) {}
}

export type LayoutActions = OpenSidenav | CloseSidenav | ToggleAssetNavigator | SetSidenavWidth;
