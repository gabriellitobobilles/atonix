/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
/*MODULE*/
import { LayoutModule } from './layout.module';

describe('LayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LayoutModule).toBeDefined();
  });
});
