import { Injectable } from '@angular/core';
import { AssetTreeFacade } from './asset-tree.facade';
import { AssetTreesState } from './asset-tree.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AssetTreeFacadeFactory {
  constructor(private store: Store<AssetTreesState>) {}

  CreateFacade(componentID: string = null): AssetTreeFacade {
    return new AssetTreeFacade(this.store, componentID);
  }
}
