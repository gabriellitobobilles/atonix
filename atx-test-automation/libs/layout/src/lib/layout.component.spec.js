/*ANGULAR*/
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResizableModule } from 'angular-resizable-element';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
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
var TestStore = /** @class */ (function () {
    function TestStore() {
        this.state = new BehaviorSubject(undefined);
    }
    TestStore.prototype.setState = function (data) {
        this.state.next(data);
    };
    TestStore.prototype.select = function (selector) {
        return this.state.asObservable();
    };
    TestStore.prototype.pipe = function (selector) {
        return this.state.asObservable();
    };
    TestStore.prototype.dispatch = function (action) { };
    return TestStore;
}());
export { TestStore };
describe('LayoutComponent via TriplePanelComponent', function () {
    var storeAuthUser;
    var storeLayout;
    var component;
    var fixture;
    var layoutFacade;
    var authFacade;
    var mockLayout = {
        isAssetNavigatorOpen: false,
        assetNavigatorWidth: 0,
        isTimeSelectorOpen: false,
        timeSelectorHeight: 0
    };
    var mockAuth = {
        loggedIn: true,
        errorMessage: 'This is just a Test',
        message: 'test',
        isSoftwareToken: true,
        email: 'test@test.com',
        name: 'Atonix Test',
        authState: 'login'
    };
    var mockUser = {
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
    var mockAuthUserState = { user: mockUser, auth: mockAuth };
    beforeEach(async(function () {
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
    beforeEach(function () {
        storeAuthUser = TestBed.get(Store);
        storeLayout = TestBed.get(Store);
        layoutFacade = TestBed.get(LayoutFacade);
        authFacade = TestBed.get(AuthFacade);
        fixture = TestBed.createComponent(TriplePanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should log out', function () {
        storeLayout.setState(mockLayout);
        var spy1 = spyOn(layoutFacade, 'closeAssetNavigator');
        var spy2 = spyOn(layoutFacade, 'closeTimeSelector');
        storeAuthUser.setState(mockAuthUserState);
        var spy3 = spyOn(authFacade, 'logout');
        component.logout();
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).toHaveBeenCalled();
    });
    it('should toggle time selector', function () {
        var spy = spyOn(layoutFacade, 'toggleTimeSelector');
        component.toggleTimeSelector();
        expect(spy).toHaveBeenCalled();
    });
    it('should toggle asset navigator', function () {
        var spy = spyOn(layoutFacade, 'toggleAssetNavigator');
        component.toggleAssetNavigator();
        expect(spy).toHaveBeenCalled();
    });
    it('ngOnDestroy', function () {
        component.ngOnDestroy();
        expect(component.componentActive).toEqual(false);
    });
});
//# sourceMappingURL=layout.component.spec.js.map