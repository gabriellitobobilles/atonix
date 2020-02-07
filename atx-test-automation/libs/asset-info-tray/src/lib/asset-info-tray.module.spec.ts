import { async, TestBed } from '@angular/core/testing';
import { AssetInfoTrayModule } from './asset-info-tray.module';

describe('AssetInfoTrayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AssetInfoTrayModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AssetInfoTrayModule).toBeDefined();
  });
});
