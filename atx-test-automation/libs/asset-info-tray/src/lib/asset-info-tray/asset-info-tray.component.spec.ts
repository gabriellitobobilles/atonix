import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoTrayComponent } from './asset-info-tray.component';

describe('AssetInfoTrayComponent', () => {
  let component: AssetInfoTrayComponent;
  let fixture: ComponentFixture<AssetInfoTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInfoTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInfoTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
