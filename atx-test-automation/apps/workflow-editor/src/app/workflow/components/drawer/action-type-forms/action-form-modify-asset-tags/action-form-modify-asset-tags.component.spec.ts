import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormModifyAssetTagsComponent } from './action-form-modify-asset-tags.component';

describe('ActionFormModifyAssetTagsComponent', () => {
  let component: ActionFormModifyAssetTagsComponent;
  let fixture: ComponentFixture<ActionFormModifyAssetTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormModifyAssetTagsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormModifyAssetTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
