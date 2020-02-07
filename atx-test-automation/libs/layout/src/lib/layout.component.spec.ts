/*ANGULAR*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResizableModule } from 'angular-resizable-element';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable } from 'rxjs';
/*COMPONENTS*/
import { NavbarComponent } from './navbar/navbar.component';
import { TriplePanelComponent } from './triple-panel/triple-panel.component';
/*SERVICE*/
import { AppOverlayService } from './app-overlay/app-overlay-service';
/*MODULES*/
import { MaterialModule } from '@AtonixWebSites/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/*FACADE*/
import { UserFacade, AuthFacade } from '@AtonixWebSites/auth';
import { LayoutFacade } from './state/layout.facade';
import { RouterFacade } from '@AtonixWebSites/ngrx-router';
/*STATES*/
import { LayoutState } from './state/layout.reducer';
import { AuthUserState } from '../../../auth/src/lib/state';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { AuthState } from '../../../auth/src/lib/state/auth/auth.reducer';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { UserState } from '../../../auth/src/lib/state/user/user.reducer';

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  pipe(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}

describe('LayoutComponent via TriplePanelComponent', () => {
  let storeAuthUser: TestStore<AuthUserState>;
  let storeLayout: TestStore<LayoutState>;
  let component: TriplePanelComponent;
  let fixture: ComponentFixture<TriplePanelComponent>;
  let layoutFacade: LayoutFacade;
  let authFacade: AuthFacade;

  const mockLayout: LayoutState = {
    isAssetNavigatorOpen: false,
    assetNavigatorWidth: 0,
    isTimeSelectorOpen: false,
    timeSelectorHeight: 0
  };

  const mockAuth: AuthState = {
    loggedIn: true,
    errorMessage: 'This is just a Test',
    message: 'test',
    isSoftwareToken: true,
    email: 'test@test.com',
    name: 'Atonix Test',
    authState: 'login'
  };

  const mockUser: UserState = {
    accountModelUser: {
      Email: 'test@test.com',
      FirstName: 'test',
      LastName: 'test',
      DisplayName: 'test',
      UserName: 'test',
      IsBV: true,
      NERCCIP: true,
      ServiceAccount: true
    },
    appContexts: null,
    selectedAppContext: 1,
    appContextsForApp: [1, 2, 3],
    errorMessage: 'test',
    lightTheme: true
  };

  const mockAuthUserState: AuthUserState = { user: mockUser, auth: mockAuth };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        ResizableModule,
        FontAwesomeModule,
        NoopAnimationsModule
      ],
      providers: [
        LayoutFacade,
        UserFacade,
        AppOverlayService,
        Actions,
        RouterFacade,
        AuthFacade,
        { provide: Store, useClass: TestStore }
      ],
      declarations: [TriplePanelComponent, NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    storeAuthUser = TestBed.get(Store);
    storeLayout = TestBed.get(Store);
    layoutFacade = TestBed.get(LayoutFacade);
    authFacade = TestBed.get(AuthFacade);

    fixture = TestBed.createComponent(TriplePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    storeLayout.setState(mockLayout);
    const spy1 = spyOn(layoutFacade, 'closeAssetNavigator');
    const spy2 = spyOn(layoutFacade, 'closeTimeSelector');
    storeAuthUser.setState(mockAuthUserState);
    const spy3 = spyOn(authFacade, 'logout');
    component.logout();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should toggle time selector', () => {
    const spy = spyOn(layoutFacade, 'toggleTimeSelector');
    component.toggleTimeSelector();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle asset navigator', () => {
    const spy = spyOn(layoutFacade, 'toggleAssetNavigator');
    component.toggleAssetNavigator();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.componentActive).toEqual(false);
  });
});
