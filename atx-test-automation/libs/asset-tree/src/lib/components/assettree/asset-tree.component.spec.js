import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssetTreeComponent } from './asset-tree.component';
import { Store, StoreModule } from '@ngrx/store';
import { assetTreeReducer } from '../../state/asset-tree.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { AssetTreeFacadeFactory } from '../../state/asset-tree.factory';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AssetTreeEffects } from '../../state/asset-tree.effects';
import { EffectsModule } from '@ngrx/effects';
import { InitializeAssetTreeComplete, InitializeAssetTreeStarted, SelectTree } from '../../state/asset-tree.actions';
describe('AssetTreeComponent', function () {
    var component;
    var fixture;
    var store;
    var dispatchSpy;
    // const unsubscribe = new Subject<void>();
    var node = {
        NodeId: 'nodeid',
        TreeId: 'treeid',
        NodeAbbrev: 'abb',
        NodeDesc: 'desc',
        NodeTypeId: 2,
        DisplayOrder: 10,
        CreatedBy: 'jcb',
        ChangedBy: 'jcb',
        CriteriaObjectIncludeAncestors: false,
        Asset: null,
        Criteria: null,
        ContainerChildrenCount: 2,
        ParentUniqueKey: 'SOMEUNIQUEPARENTKEY',
        UniqueKey: 'SOMEUNIQUEKEY',
        AssetGuid: 'SOMEGUID',
        ReferencedBy: null,
        HasChildren: true,
        Expanded: false,
        Retrieved: true,
        Level: 2,
        Symbol: 'nothing',
        First: false,
        Last: false
    };
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                FontAwesomeModule,
                MatSelectModule,
                MatInputModule,
                MatAutocompleteModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                StoreModule.forFeature('assettree', assetTreeReducer),
                EffectsModule.forFeature([AssetTreeEffects])
            ],
            declarations: [AssetTreeComponent],
            providers: [AssetTreeFacadeFactory]
        }).compileComponents();
    }));
    beforeEach(function () {
        store = TestBed.get(Store);
        dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(AssetTreeComponent);
        component = fixture.componentInstance;
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    describe('ngOnInit()', function () {
        it('creates the facade', function () {
            fixture.detectChanges();
            expect(component.facade).toBeTruthy();
        });
        it('should not dispatch anything', function () {
            fixture.detectChanges();
            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });
    it('should select asset on autocomplete', function () {
        fixture.detectChanges();
        var spy = spyOn(component.facade, 'selectAssetByID');
        var spyForm = spyOn(component.form, 'reset');
        component.autoCompleteSelection({ source: { value: 10 } });
        expect(spy).toHaveBeenCalledWith(10);
        expect(spyForm).toHaveBeenCalled();
    });
    it('should expand or collapse nodes', function () {
        fixture.detectChanges();
        var spy = spyOn(component.facade, 'expandNode');
        component.expandOrCollapse(node);
        expect(spy).toHaveBeenCalledWith(node);
    });
    it('should select node', function () {
        fixture.detectChanges();
        var spy = spyOn(component.facade, 'select');
        component.select(node);
        expect(spy).toHaveBeenCalledWith(node);
    });
    it('should change the selected tree', function () {
        var treeID = 'sometreeid';
        fixture.detectChanges();
        var spy = spyOn(component.facade, 'selectTree');
        component.TreeSelectionChanged({ value: treeID });
        expect(spy).toHaveBeenCalledWith(treeID);
    });
    it('should reset form on lost focus', function () {
        fixture.detectChanges();
        var spy = spyOn(component.form, 'reset');
        component.searchLostFocus();
        expect(spy).toHaveBeenCalled();
    });
    it('should emit an event on button click', function () {
        var button = {
            id: 'a',
            class: 'b',
            tooltip: 'c',
            show: function (n) { return true; }
        };
        fixture.detectChanges();
        var spy = spyOn(component.assetButtonClicked, 'emit');
        component.buttonClick(button, node);
        expect(spy).toHaveBeenCalledWith({ button: button, node: node });
    });
    it('selects a tree by default', function () {
        fixture.detectChanges();
        var params = { key: 'default' };
        store.dispatch(new InitializeAssetTreeStarted(params));
        store.dispatch(new InitializeAssetTreeComplete({
            params: params,
            trees: [
                {
                    TreeId: 'treeid',
                    TreeName: 'treename',
                    Global: true,
                    AllApp: true,
                    IsPrivate: false,
                    CreatedBy: 'created',
                    ChangedBy: 'changed',
                    CreateDate: new Date(),
                    ChangeDate: new Date(),
                    AdHocTreeToAppContextMaps: [],
                    IsEditable: true,
                    AdHocTreeToClientMaps: [],
                    IsSearchable: true,
                    IsDefaultTree: true,
                    Categories: [],
                    AdHocTreeToCategoryMaps: []
                }
            ],
            assets: [node]
        }));
        fixture.detectChanges();
        store.dispatch(new SelectTree({ id: 'treeid', key: 'default' }));
        fixture.detectChanges();
        expect(component.form.controls['selectedTreeValue'].value).toEqual('treeid');
    });
    it('shows selected node', function () {
        fixture.detectChanges();
        var params = { key: 'default' };
        store.dispatch(new InitializeAssetTreeStarted(params));
        store.dispatch(new InitializeAssetTreeComplete({
            params: params,
            trees: [
                {
                    TreeId: 'treeid',
                    TreeName: 'treename',
                    Global: true,
                    AllApp: true,
                    IsPrivate: false,
                    CreatedBy: 'created',
                    ChangedBy: 'changed',
                    CreateDate: new Date(),
                    ChangeDate: new Date(),
                    AdHocTreeToAppContextMaps: [],
                    IsEditable: true,
                    AdHocTreeToClientMaps: [],
                    IsSearchable: true,
                    IsDefaultTree: true,
                    Categories: [],
                    AdHocTreeToCategoryMaps: []
                }
            ],
            assets: [node]
        }));
        expect(component.selectedNodeID).toBeFalsy();
        component.facade.select(node);
        fixture.detectChanges();
        expect(component.selectedNodeID).toBeTruthy();
    });
});
//# sourceMappingURL=asset-tree.component.spec.js.map