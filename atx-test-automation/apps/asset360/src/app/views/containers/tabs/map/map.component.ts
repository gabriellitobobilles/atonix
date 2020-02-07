import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeRangeSelectorFacade } from '@AtonixWebSites/time-range-selector';
import { Observable } from 'rxjs';
import { AssetTreeFacadeFactory, AssetTreeFacade, AssetTreeNode } from '@AtonixWebSites/asset-tree';
import { AssetInfoTrayService } from '@AtonixWebSites/asset-info-tray';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'atx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  startDate$: Observable<Date>;
  endDate$: Observable<Date>;
  indicator$: Observable<Date>;
  assetTreeFacade: AssetTreeFacade;
  appAssetTreeFacade: AssetTreeFacade;
  selectedAssetGuid$: Observable<string>;
  selectedAssetID$: Observable<number>;
  selectedAsset: string;
  killer = true;

  constructor(
    private timeRangeFacade: TimeRangeSelectorFacade,
    assetTreeFacadeFactory: AssetTreeFacadeFactory,
    private assetInfoTrayService: AssetInfoTrayService
  ) {
    this.assetTreeFacade = assetTreeFacadeFactory.CreateFacade('maptab');
    this.appAssetTreeFacade = assetTreeFacadeFactory.CreateFacade();
    this.startDate$ = timeRangeFacade.startDate$;
    this.endDate$ = timeRangeFacade.endDate$;
    this.indicator$ = timeRangeFacade.indicator$;
  }

  ngOnInit() {
    this.assetTreeFacade.initialize({});
    this.selectedAssetGuid$ = this.assetTreeFacade.selectedAssetGuid$;
    this.selectedAssetID$ = this.assetTreeFacade.selectedAssetID$;

    this.selectedAssetID$
      .pipe(
        takeWhile(() => {
          return this.killer;
        })
      )
      .subscribe(n => {
        this.selectedAsset = String(n);
      });
  }

  ngOnDestroy(): void {
    this.killer = false;
  }

  Indicator(newState: boolean) {
    if (newState) {
      this.timeRangeFacade.configureTimeRangeSelector(undefined, undefined, new Date());
    } else {
      this.timeRangeFacade.configureTimeRangeSelector(undefined, undefined, null);
    }
  }

  Range(newState: boolean) {
    if (newState) {
      this.timeRangeFacade.configureTimeRangeSelector(new Date(2018, 6, 1), new Date(2018, 7, 1));
    } else {
      this.timeRangeFacade.configureTimeRangeSelector(null, null);
    }
  }

  SetAsset() {
    this.appAssetTreeFacade.selectAssetByGUID(this.selectedAsset);
  }

  NodeSelected(newNode: AssetTreeNode) {
    if (newNode && newNode.Asset) {
      this.appAssetTreeFacade.selectAssetByGUID(newNode.Asset.GlobalId);
    }
  }

  AssetInfoTray(asset: string) {
    this.assetInfoTrayService.show(asset);
  }
}
