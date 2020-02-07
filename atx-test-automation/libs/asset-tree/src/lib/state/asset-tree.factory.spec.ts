import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AssetTreeFacadeFactory } from './asset-tree.factory';
import { AssetTreesState, assetTreeReducer } from './asset-tree.reducer';

describe('AssetTreeFacadeFactory', () => {
  let service: AssetTreeFacadeFactory;
  let store: Store<AssetTreesState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(assetTreeReducer)],
      declarations: [],
      providers: [AssetTreeFacadeFactory]
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(AssetTreeFacadeFactory);
  });

  afterEach(() => {});

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create a facade', () => {
    const facade = service.CreateFacade();
    expect(facade).toBeTruthy();
  });

  it('should call the default facade default', () => {
    const facade = service.CreateFacade();
    expect(facade.getComponentID()).toEqual('default');
  });

  it('should create a facade with a name', () => {
    const facade = service.CreateFacade('somestring');
    expect(facade.getComponentID()).toEqual('somestring');
  });
});
