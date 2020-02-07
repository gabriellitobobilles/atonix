/*ANGULAR*/
import { BehaviorSubject } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*FACADE*/
import { LayoutFacade } from './layout.facade';
/*ACTIONS*/
import * as actions from './layout.actions';
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
describe('Layout Facade', function () {
    var store;
    var initialState = {
        isAssetNavigatorOpen: false,
        assetNavigatorWidth: 0,
        isTimeSelectorOpen: false,
        timeSelectorHeight: 0
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            providers: [
                LayoutFacade,
                { provide: Store, useClass: TestStore } // use test store instead of ngrx store
            ]
        }).compileComponents();
    }));
    beforeEach(inject([Store], function (testStore) {
        store = testStore; // save store reference for use in tests
        store.setState(initialState); // set default state
    }));
    it('should create', inject([LayoutFacade], function (layoutFacade) {
        expect(layoutFacade).toBeTruthy();
    }));
    it('should set asset navigator width', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.setAssetNavigatorWidth(275);
        expect(spy).toHaveBeenCalledWith(new actions.SetAssetNavigatorWidth(275));
    }));
    it('should set time selector height', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.setTimeSelectorHeight(7);
        expect(spy).toHaveBeenCalledWith(new actions.SetTimeSelectorHeight(7));
    }));
    it('should open asset navigator', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.openAssetNavigator();
        expect(spy).toHaveBeenCalledWith(new actions.OpenAssetNavigator());
    }));
    it('should open time selector', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.openTimeSelector();
        expect(spy).toHaveBeenCalledWith(new actions.OpenTimeSelector());
    }));
    it('should toggle asset navigator', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.toggleAssetNavigator();
        expect(spy).toHaveBeenCalledWith(new actions.ToggleAssetNavigator());
    }));
    it('should toggle time selector', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.toggleTimeSelector();
        expect(spy).toHaveBeenCalledWith(new actions.ToggleTimeSelector());
    }));
    it('should close asset navigator', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.closeAssetNavigator();
        expect(spy).toHaveBeenCalledWith(new actions.CloseAssetNavigator());
    }));
    it('should close time selector', inject([LayoutFacade], function (layoutFacade) {
        var spy = spyOn(store, 'dispatch');
        layoutFacade.closeTimeSelector();
        expect(spy).toHaveBeenCalledWith(new actions.CloseTimeSelector());
    }));
});
//# sourceMappingURL=layout.facade.spec.js.map