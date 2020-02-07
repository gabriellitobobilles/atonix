import { Injectable } from '@angular/core';
import { LayoutState } from './layout.reducer';
import { Store, select } from '@ngrx/store';
import { layoutQuery } from './layout.selectors';
import { SetSidenavWidth, OpenSidenav, ToggleAssetNavigator, CloseSidenav } from './layout.actions';

@Injectable()
export class LayoutFacade {
  constructor(private store: Store<LayoutState>) {}

  setSideNavWidth(width: number) {
    this.store.dispatch(new SetSidenavWidth(width));
  }

  openSidenav() {
    this.store.dispatch(new OpenSidenav());
  }

  toggleAssetNavigator() {
    this.store.dispatch(new ToggleAssetNavigator());
  }

  closeSideNav() {
    this.store.dispatch(new CloseSidenav());
  }

  showSideNav$ = this.store.pipe(select(layoutQuery.getShowSideNav));
  sidenavWidth$ = this.store.pipe(select(layoutQuery.getSidenavWidth));
}
