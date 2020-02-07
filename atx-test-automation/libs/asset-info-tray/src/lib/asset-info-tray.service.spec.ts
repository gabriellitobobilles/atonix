import { TestBed } from '@angular/core/testing';

import { AssetInfoTrayService } from './asset-info-tray.service';

describe('AssetInfoTrayServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetInfoTrayService = TestBed.get(AssetInfoTrayService);
    expect(service).toBeTruthy();
  });
});
