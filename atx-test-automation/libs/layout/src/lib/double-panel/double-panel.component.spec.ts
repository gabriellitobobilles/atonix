/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResizableModule } from 'angular-resizable-element';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
/*COMPONENTS*/
import { DoublePanelComponent } from './double-panel.component';
import { NavbarComponent } from '../navbar/navbar.component';
/*SERVICE*/
import { AppOverlayService } from '../app-overlay/app-overlay-service';
/*MODULE*/
import { MaterialModule } from '@AtonixWebSites/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/*REDUCER*/
import { reducer } from '../state/layout.reducer';
/*FACADE*/
import { UserFacade, AuthFacade } from '@AtonixWebSites/auth';
import { LayoutFacade } from '../state/layout.facade';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';

describe('DoublePanelComponent', () => {
  let component: DoublePanelComponent;
  let fixture: ComponentFixture<DoublePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        ResizableModule,
        FontAwesomeModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('layout', reducer)
      ],
      providers: [LayoutFacade, UserFacade, AppOverlayService, Actions, RouterFacade, AuthFacade],
      declarations: [DoublePanelComponent, NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
