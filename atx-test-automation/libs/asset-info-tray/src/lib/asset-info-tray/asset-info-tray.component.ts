import { Component, OnInit, Inject } from '@angular/core';
import { CONTAINER_DATA, IContainerData } from '../asset-info-tray-injector';
import { AssetsModelService, IAssetAndAttributes } from '@AtonixWebSites/api';
import { AssetInfoTrayService } from '../asset-info-tray.service';
import { take } from 'rxjs/operators';

import { faWindowClose, faRecycle, faCaretRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'atx-asset-info-tray',
  templateUrl: './asset-info-tray.component.html',
  styleUrls: ['./asset-info-tray.component.scss']
})
export class AssetInfoTrayComponent implements OnInit {
  public assetID: string;
  public assetAndAttributes: IAssetAndAttributes;

  public faClose = faWindowClose;
  public faRefresh = faRecycle;

  public trayTitle: string;
  public showRefreshButton = true;
  public showCloseButton = true;
  public selectedImage: any;
  public issuesCount = 0;
  public attributes = [];
  public attachments = [];
  public ReasonsWhyOnTheFlyTrendsAreHid = true;

  constructor(
    @Inject(CONTAINER_DATA) public data: IContainerData,
    private assetsModel: AssetsModelService,
    private service: AssetInfoTrayService
  ) {}

  ngOnInit() {
    this.assetID = this.data.id;
    this.assetsModel
      .getAssetAndAttributes(this.data.id, true)
      .pipe(take(1))
      .subscribe(a => {
        this.assetAndAttributes = a;
      });
  }

  refresh() {}
  close() {
    this.service.close();
  }
  popupAttachment(attachment) {}
  carousel() {}
  imageCaption() {
    return 'caption';
  }
}
