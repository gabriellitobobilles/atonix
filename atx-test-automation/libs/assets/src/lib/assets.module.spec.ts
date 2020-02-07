import { async, TestBed } from '@angular/core/testing';
import { AssetsModule } from './assets.module';

describe('AssetsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AssetsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AssetsModule).toBeDefined();
  });
});
