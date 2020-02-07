import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AssetTreeComponent } from './asset-tree.component';
import { Store, StoreModule } from '@ngrx/store';
import { assetTreeReducer, AssetTreesState } from '../../state/asset-tree.reducer';
import { ObjectUnsubscribedError, Subject } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { AssetTreeFacadeFactory } from '../../state/asset-tree.factory';
import { AssetTreeFacade } from '../../state/asset-tree.facade';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AssetTreeEffects } from '../../state/asset-tree.effects';
import { EffectsModule } from '@ngrx/effects';
import { AssetTreeNode } from '../../models/asset-tree-node';
import { IButtonInfo } from '../../models/iasset-tree-parameters';
import { InitializeAssetTreeComplete, InitializeAssetTreeStarted, SelectTree } from '../../state/asset-tree.actions';

describe('AssetTreeComponent', () => {
  let component: AssetTreeComponent;
  let fixture: ComponentFixture<AssetTreeComponent>;
  let store: Store<AssetTreesState>;
  let dispatchSpy: jasmine.Spy;
  // const unsubscribe = new Subject<void>();

  const node: AssetTreeNode = {
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

  beforeEach(async(() => {
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

  beforeEach(() => {
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(AssetTreeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('creates the facade', () => {
      fixture.detectChanges();
      expect(component.facade).toBeTruthy();
    });

    it('should not dispatch anything', () => {
      fixture.detectChanges();
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  it('should select asset on autocomplete', () => {
    fixture.detectChanges();
    const spy = spyOn(component.facade, 'selectAssetByID');
    const spyForm = spyOn(component.form, 'reset');
    component.autoCompleteSelection({ source: { value: 10 } });
    expect(spy).toHaveBeenCalledWith(10);
    expect(spyForm).toHaveBeenCalled();
  });

  it('should expand or collapse nodes', () => {
    fixture.detectChanges();
    const spy = spyOn(component.facade, 'expandNode');
    component.expandOrCollapse(node);
    expect(spy).toHaveBeenCalledWith(node);
  });

  it('should select node', () => {
    fixture.detectChanges();
    const spy = spyOn(component.facade, 'select');
    component.select(node);
    expect(spy).toHaveBeenCalledWith(node);
  });

  it('should change the selected tree', () => {
    const treeID = 'sometreeid';

    fixture.detectChanges();
    const spy = spyOn(component.facade, 'selectTree');
    component.TreeSelectionChanged({ value: treeID });
    expect(spy).toHaveBeenCalledWith(treeID);
  });

  it('should reset form on lost focus', () => {
    fixture.detectChanges();
    const spy = spyOn(component.form, 'reset');
    component.searchLostFocus();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit an event on button click', () => {
    const button: IButtonInfo = {
      id: 'a',
      class: 'b',
      tooltip: 'c',
      show: (n: AssetTreeNode) => true
    };

    fixture.detectChanges();
    const spy = spyOn(component.assetButtonClicked, 'emit');
    component.buttonClick(button, node);
    expect(spy).toHaveBeenCalledWith({ button, node });
  });

  it('selects a tree by default', () => {
    fixture.detectChanges();
    const params = { key: 'default' };
    store.dispatch(new InitializeAssetTreeStarted(params));
    store.dispatch(
      new InitializeAssetTreeComplete({
        params,
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
      })
    );
    fixture.detectChanges();
    store.dispatch(new SelectTree({ id: 'treeid', key: 'default' }));
    fixture.detectChanges();
    expect(component.form.controls['selectedTreeValue'].value).toEqual('treeid');
  });

  it('shows selected node', () => {
    fixture.detectChanges();
    const params = { key: 'default' };
    store.dispatch(new InitializeAssetTreeStarted(params));
    store.dispatch(
      new InitializeAssetTreeComplete({
        params,
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
      })
    );

    expect(component.selectedNodeID).toBeFalsy();
    component.facade.select(node);
    fixture.detectChanges();
    expect(component.selectedNodeID).toBeTruthy();
  });
});
