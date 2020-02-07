import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpToListComponent } from './jump-to-list.component';

describe('JumpToListComponent', () => {
  let component: JumpToListComponent;
  let fixture: ComponentFixture<JumpToListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JumpToListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
