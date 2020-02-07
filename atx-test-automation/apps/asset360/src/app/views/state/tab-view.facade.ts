import { TabViewState } from './tab-view.reducer';
import { Store, select } from '@ngrx/store';
import { tabViewQuery } from './tab-view.selector';
import { AssetViewFromId, AssetViewFromIdFailure } from './tab-view.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class TabViewFacade {
  constructor(private store: Store<TabViewState>) {}

  tabViewErrorMessage$ = this.store.pipe(select(tabViewQuery.tabViewErrorMessage));
  assetViews$ = this.store.pipe(select(tabViewQuery.getAssetViews));
  defaultView$ = this.store.pipe(select(tabViewQuery.getDefaultView));
  tabViewPending$ = this.store.pipe(select(tabViewQuery.getTabViewPending));

  getAssetViews(assetID: string | number, appContextID: string | number) {
    this.store.dispatch(new AssetViewFromId({ assetID, appContextID }));
  }

  setAssetError(parameters: string) {
    this.store.dispatch(new AssetViewFromIdFailure(parameters));
  }
}
