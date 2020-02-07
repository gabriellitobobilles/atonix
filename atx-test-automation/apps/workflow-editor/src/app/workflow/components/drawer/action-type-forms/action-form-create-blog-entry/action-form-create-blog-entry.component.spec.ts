import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormCreateBlogEntryComponent } from './action-form-create-blog-entry.component';

describe('ActionFormCreateBlogEntryComponent', () => {
  let component: ActionFormCreateBlogEntryComponent;
  let fixture: ComponentFixture<ActionFormCreateBlogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormCreateBlogEntryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFormCreateBlogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
