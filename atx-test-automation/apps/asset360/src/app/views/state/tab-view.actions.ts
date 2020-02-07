import { Action } from '@ngrx/store';
import { IAssetViews } from '@AtonixWebSites/api';

export enum TabViewActionTypes {
  AssetViewFromId = '[TabView] Get List of Tab Views for Asset',
  AssetViewFromIdSuccess = '[TabView] Get Tab Views Success',
  AssetViewFromIdFailure = '[TabView] Get Tab Views Failure'
}

export class AssetViewFromId implements Action {
  readonly type = TabViewActionTypes.AssetViewFromId;
  constructor(public payload: { assetID: string | number; appContextID: string | number }) {}
}

export class AssetViewFromIdSuccess implements Action {
  readonly type = TabViewActionTypes.AssetViewFromIdSuccess;
  constructor(public payload: IAssetViews) {}
}

export class AssetViewFromIdFailure implements Action {
  readonly type = TabViewActionTypes.AssetViewFromIdFailure;
  constructor(public payload: string) {}
}

export type TabViewActions = AssetViewFromId | AssetViewFromIdSuccess | AssetViewFromIdFailure;
