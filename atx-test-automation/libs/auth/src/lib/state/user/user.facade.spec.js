/*ANGULAR*/
import { BehaviorSubject } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*FACADE*/
import { UserFacade } from './user.facade';
/*ACTIONS*/
import * as actions from './user.actions';
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
describe('User Facade', function () {
    var store;
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
            providers: [
                UserFacade,
                { provide: Store, useClass: TestStore } // use test store instead of ngrx store
            ]
        }).compileComponents();
    }));
    beforeEach(inject([Store], function (testStore) {
        store = testStore; // save store reference for use in tests
        store.setState(mockAuthUserState); // set default state
    }));
    it('should create', inject([UserFacade], function (userFacade) {
        expect(userFacade).toBeTruthy();
    }));
    it('should load App Contexts', inject([UserFacade], function (userFacade) {
        var spy = spyOn(store, 'dispatch');
        userFacade.loadAppContexts();
        expect(spy).toHaveBeenCalledWith(new actions.LoadAppContext());
    }));
    it('should set App Context', inject([UserFacade], function (userFacade) {
        var spy = spyOn(store, 'dispatch');
        userFacade.setAppContext(1);
        expect(spy).toHaveBeenCalledWith(new actions.SetAppContext(1));
    }));
    it('should clear User', inject([UserFacade], function (userFacade) {
        var spy = spyOn(store, 'dispatch');
        userFacade.clearUser();
        expect(spy).toHaveBeenCalledWith(new actions.ClearUser());
    }));
    it('should load User Info', inject([UserFacade], function (userFacade) {
        var spy = spyOn(store, 'dispatch');
        userFacade.loadUserInfo();
        expect(spy).toHaveBeenCalledWith(new actions.LoadUserInfo());
    }));
    it('should app Loaded', inject([UserFacade], function (userFacade) {
        var spy = spyOn(store, 'dispatch');
        userFacade.appLoaded(1);
        expect(spy).toHaveBeenCalledWith(new actions.SetAppContextSuccess(1));
    }));
});
//# sourceMappingURL=user.facade.spec.js.map