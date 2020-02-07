import { Injectable } from '@angular/core';
import { LayoutState } from './layout.reducer';
import { Store, select } from '@ngrx/store';
import { layoutQuery } from './layout.selectors';
import * as actions from './layout.actions';

@Injectable()
export class LayoutFacade {
  constructor(private store: Store<LayoutState>) {}

  setAssetNavigatorWidth(width: number) {
    this.store.dispatch(new actions.SetAssetNavigatorWidth(width));
  }

  setTimeSelectorHeight(height: number) {
    this.store.dispatch(new actions.SetTimeSelectorHeight(height));
  }

  openAssetNavigator() {
    this.store.dispatch(new actions.OpenAssetNavigator());
  }

  openTimeSelector() {
    this.store.dispatch(new actions.OpenTimeSelector());
  }

  toggleAssetNavigator() {
    this.store.dispatch(new actions.ToggleAssetNavigator());
  }

  toggleTimeSelector() {
    this.store.dispatch(new actions.ToggleTimeSelector());
  }

  closeAssetNavigator() {
    this.store.dispatch(new actions.CloseAssetNavigator());
  }

  closeTimeSelector() {
    this.store.dispatch(new actions.CloseTimeSelector());
  }

  isAssetNavigatorOpened$ = this.store.pipe(select(layoutQuery.getIsAssetNavigatorOpen));
  currentAssetNavigatorWidth$ = this.store.pipe(select(layoutQuery.getCurrentAssetNavigatorWidth));
  isTimeSelectorOpened$ = this.store.pipe(select(layoutQuery.getIsTimeSelectorOpen));
  timeSelectorHeight$ = this.store.pipe(select(layoutQuery.getTimeSelectorHeight));
  getMainPanelBottom$ = this.store.pipe(select(layoutQuery.getMainPanelBottom));
}
