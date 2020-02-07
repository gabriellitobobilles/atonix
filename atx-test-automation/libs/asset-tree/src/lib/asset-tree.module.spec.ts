import { async, TestBed } from '@angular/core/testing';
import { AssetTreeModule } from './asset-tree.module';

describe('AssetTreeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AssetTreeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AssetTreeModule).toBeDefined();
  });
});
