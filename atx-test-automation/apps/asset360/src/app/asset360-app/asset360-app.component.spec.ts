/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
/*COMPONENT*/
import { Asset360AppComponent } from './asset360-app.component';

describe('Asset360AppComponent', () => {
  let component: Asset360AppComponent;
  let fixture: ComponentFixture<Asset360AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Asset360AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asset360AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
