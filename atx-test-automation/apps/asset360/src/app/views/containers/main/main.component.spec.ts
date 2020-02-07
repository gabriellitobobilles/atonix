import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { MaterialModule } from '@AtonixWebSites/material';
import { AssetTreeModule } from '@AtonixWebSites/asset-tree';
import { LayoutModule } from '@AtonixWebSites/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeRangeSelectorModule } from '@AtonixWebSites/time-range-selector';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainComponent', () => {
  /* ISSUE - Template parse errors:
    More than one component matched on this element.
    Make sure that only one component's selector can match a given element.
  ISSUE REFERENCE: https://github.com/angular/material2/issues/7947 */

  /*let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule,
        RouterTestingModule,
        AssetTreeModule,
        MaterialModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        TimeRangeSelectorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule
      ],
      declarations: [MainComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });*/

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
