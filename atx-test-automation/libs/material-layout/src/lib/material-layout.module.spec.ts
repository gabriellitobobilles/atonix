import { async, TestBed } from '@angular/core/testing';
import { MaterialLayoutModule } from './material-layout.module';
import { AuthModule } from '@AtonixWebSites/auth';
import { MaterialModule } from '@AtonixWebSites/material';

describe('MaterialLayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialLayoutModule, AuthModule, MaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MaterialLayoutModule).toBeDefined();
  });
});
