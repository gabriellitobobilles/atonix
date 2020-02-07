/*ANGULAR*/
import { BehaviorSubject, Observable } from 'rxjs';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
/*REDUCER*/
import { LayoutState } from './layout.reducer';
/*FACADE*/
import { LayoutFacade } from './layout.facade';
/*ACTIONS*/
import * as actions from './layout.actions';

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

describe('Layout Facade', () => {
  let store: TestStore<LayoutState>;

  const initialState: LayoutState = {
    isAssetNavigatorOpen: false,
    assetNavigatorWidth: 0,
    isTimeSelectorOpen: false,
    timeSelectorHeight: 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutFacade,
        { provide: Store, useClass: TestStore } // use test store instead of ngrx store
      ]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<LayoutState>) => {
    store = testStore; // save store reference for use in tests
    store.setState(initialState); // set default state
  }));

  it('should create', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    expect(layoutFacade).toBeTruthy();
  }));

  it('should set asset navigator width', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.setAssetNavigatorWidth(275);
    expect(spy).toHaveBeenCalledWith(new actions.SetAssetNavigatorWidth(275));
  }));

  it('should set time selector height', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.setTimeSelectorHeight(7);
    expect(spy).toHaveBeenCalledWith(new actions.SetTimeSelectorHeight(7));
  }));

  it('should open asset navigator', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.openAssetNavigator();
    expect(spy).toHaveBeenCalledWith(new actions.OpenAssetNavigator());
  }));

  it('should open time selector', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.openTimeSelector();
    expect(spy).toHaveBeenCalledWith(new actions.OpenTimeSelector());
  }));

  it('should toggle asset navigator', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.toggleAssetNavigator();
    expect(spy).toHaveBeenCalledWith(new actions.ToggleAssetNavigator());
  }));

  it('should toggle time selector', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.toggleTimeSelector();
    expect(spy).toHaveBeenCalledWith(new actions.ToggleTimeSelector());
  }));

  it('should close asset navigator', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.closeAssetNavigator();
    expect(spy).toHaveBeenCalledWith(new actions.CloseAssetNavigator());
  }));

  it('should close time selector', inject([LayoutFacade], (layoutFacade: LayoutFacade) => {
    const spy = spyOn(store, 'dispatch');
    layoutFacade.closeTimeSelector();
    expect(spy).toHaveBeenCalledWith(new actions.CloseTimeSelector());
  }));
});
