import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AssetTreeFacadeFactory } from './asset-tree.factory';
import { assetTreeReducer } from './asset-tree.reducer';
describe('AssetTreeFacadeFactory', function () {
    var service;
    var store;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(assetTreeReducer)],
            declarations: [],
            providers: [AssetTreeFacadeFactory]
        });
    }));
    beforeEach(function () {
        store = TestBed.get(Store);
        service = TestBed.get(AssetTreeFacadeFactory);
    });
    afterEach(function () { });
    it('should create', function () {
        expect(service).toBeTruthy();
    });
    it('should create a facade', function () {
        var facade = service.CreateFacade();
        expect(facade).toBeTruthy();
    });
    it('should call the default facade default', function () {
        var facade = service.CreateFacade();
        expect(facade.getComponentID()).toEqual('default');
    });
    it('should create a facade with a name', function () {
        var facade = service.CreateFacade('somestring');
        expect(facade.getComponentID()).toEqual('somestring');
    });
});
//# sourceMappingURL=asset-tree.factory.spec.js.map