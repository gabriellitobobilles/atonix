import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import * as _ from 'lodash';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AssetTreesState, assetTreeReducer, ComponentInstanceState } from './asset-tree.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AssetTreeEffects } from './asset-tree.effects';

import { treesDict, error } from './asset-tree.selectors';

import * as fromActions from './asset-tree.actions';
import { takeWhile } from 'rxjs/operators';
import { AssetsModelService, UiconfigModelService, IAdHocTree, IAdHocNode } from '@AtonixWebSites/api';
import { of, throwError } from 'rxjs';

describe('AssetTreeEffects', () => {
  const tree1: IAdHocTree = {
    TreeId: 'id1',
    TreeName: 'name1',
    Global: true,
    AllApp: true,
    IsPrivate: false,
    CreatedBy: 'jcb',
    ChangedBy: 'jcb',
    CreateDate: new Date(),
    ChangeDate: new Date(),
    AdHocTreeToAppContextMaps: [],
    IsEditable: false,
    AdHocTreeToClientMaps: [],
    IsSearchable: true,
    IsDefaultTree: true,
    Categories: [],
    AdHocTreeToCategoryMaps: []
  };
  const tree2: IAdHocTree = {
    TreeId: 'id2',
    TreeName: 'name2',
    Global: true,
    AllApp: true,
    IsPrivate: false,
    CreatedBy: 'jcb',
    ChangedBy: 'jcb',
    CreateDate: new Date(),
    ChangeDate: new Date(),
    AdHocTreeToAppContextMaps: [],
    IsEditable: false,
    AdHocTreeToClientMaps: [],
    IsSearchable: true,
    IsDefaultTree: true,
    Categories: [],
    AdHocTreeToCategoryMaps: []
  };
  const node1: IAdHocNode = {
    NodeId: 'ast1',
    TreeId: 'id1',
    NodeAbbrev: 'node1',
    NodeDesc: 'node1',
    ParentNodeId: null,
    NodeTypeId: 2,
    DisplayOrder: 1,
    CreatedBy: 'jcb',
    ChangedBy: 'jcb',
    AssetId: 13,
    AssetNodeBehaviorId: 4,
    CriteriaObjectIncludeAncestors: false,
    Asset: {
      AssetID: 13,
      AssetAbbrev: 'ast1',
      AssetDesc: 'ast1',
      AssetClassTypeID: 1,
      DisplayOrder: 1,
      CreatedBy: 'jcb',
      ChangedBy: 'jcb',
      CreateDate: new Date(),
      ChangeDate: new Date(),
      GlobalId: 'ast1',
      IsHidden: false,
      Track: true,
      AssetClassType: null,
      AssetType: null,
      NumChildren: 1,
      IsTheOwner: false,
      AttributeCategories: [],
      AttachmentCategories: []
    },
    Criteria: null,
    ContainerChildrenCount: 1,
    ParentUniqueKey: null,
    UniqueKey: 'node1',
    AssetGuid: 'ast1',
    ReferencedBy: '',
    HasChildren: true
  };
  const node2: IAdHocNode = {
    NodeId: 'ast2',
    TreeId: 'id1',
    NodeAbbrev: 'node2',
    NodeDesc: 'node2',
    ParentNodeId: 'ast1',
    NodeTypeId: 4,
    DisplayOrder: 1,
    CreatedBy: 'jcb',
    ChangedBy: 'jcb',
    AssetId: 14,
    AssetNodeBehaviorId: 4,
    CriteriaObjectIncludeAncestors: false,
    Asset: {
      AssetID: 14,
      AssetAbbrev: 'ast2',
      AssetDesc: 'ast2',
      AssetClassTypeID: 2,
      DisplayOrder: 2,
      CreatedBy: 'jcb',
      ChangedBy: 'jcb',
      CreateDate: new Date(),
      ChangeDate: new Date(),
      GlobalId: 'ast2',
      IsHidden: false,
      Track: true,
      AssetClassType: null,
      AssetType: null,
      NumChildren: 0,
      IsTheOwner: false,
      AttributeCategories: [],
      AttachmentCategories: []
    },
    Criteria: null,
    ContainerChildrenCount: 0,
    ParentUniqueKey: 'node1',
    UniqueKey: 'node2',
    AssetGuid: 'ast2',
    ReferencedBy: '',
    HasChildren: true
  };

  let store: Store<AssetTreesState>;
  let cancel: any;
  let assetModelService: AssetsModelService;
  let uiConfigModelService: UiconfigModelService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('assettree', assetTreeReducer),
        EffectsModule.forFeature([AssetTreeEffects])
      ],
      declarations: [],
      providers: []
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    assetModelService = TestBed.get(AssetsModelService);
    uiConfigModelService = TestBed.get(UiconfigModelService);
    cancel = {};
  });

  afterEach(() => {
    cancel = null;
  });

  it('initializes the asset tree', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3
      })
    );

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
  });

  it('handles initialization error', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(throwError('SOME ERROR'));

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    let err: string;
    store
      .pipe(error)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        err = n;
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3,
        stopAtLevel: 4
      })
    );

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);

    expect(err).toEqual('SOME ERROR');
  });

  it('expands a node', () => {
    const spy1 = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    const spy2 = spyOn(uiConfigModelService, 'assetTreeChildren').and.returnValue(
      of([
        {
          NodeId: 'ast3',
          TreeId: 'id1',
          NodeAbbrev: 'node3',
          NodeDesc: 'node3',
          ParentNodeId: 'ast2',
          NodeTypeId: 2,
          DisplayOrder: 1,
          CreatedBy: 'jcb',
          ChangedBy: 'jcb',
          AssetId: 15,
          AssetNodeBehaviorId: 2,
          CriteriaObjectIncludeAncestors: false,
          Asset: {
            AssetID: 15,
            AssetAbbrev: 'ast3',
            AssetDesc: 'ast3',
            AssetClassTypeID: 1,
            DisplayOrder: 1,
            CreatedBy: 'jcb',
            ChangedBy: 'jcb',
            CreateDate: new Date(),
            ChangeDate: new Date(),
            GlobalId: 'ast3',
            IsHidden: false,
            Track: true,
            AssetClassType: null,
            AssetType: null,
            NumChildren: 1,
            IsTheOwner: false,
            AttributeCategories: [],
            AttachmentCategories: []
          },
          Criteria: null,
          ContainerChildrenCount: 0,
          ParentUniqueKey: 'node2',
          UniqueKey: 'node3',
          AssetGuid: 'ast3',
          ReferencedBy: '',
          HasChildren: true
        },
        {
          NodeId: 'ast4',
          TreeId: 'id1',
          NodeAbbrev: 'node4',
          NodeDesc: 'node4',
          ParentNodeId: 'ast2',
          NodeTypeId: 4,
          DisplayOrder: 1,
          CreatedBy: 'jcb',
          ChangedBy: 'jcb',
          AssetId: 16,
          AssetNodeBehaviorId: 4,
          CriteriaObjectIncludeAncestors: false,
          Asset: {
            AssetID: 16,
            AssetAbbrev: 'ast4',
            AssetDesc: 'ast4',
            AssetClassTypeID: 2,
            DisplayOrder: 3,
            CreatedBy: 'jcb',
            ChangedBy: 'jcb',
            CreateDate: new Date(),
            ChangeDate: new Date(),
            GlobalId: 'ast4',
            IsHidden: false,
            Track: true,
            AssetClassType: null,
            AssetType: {
              AssetTypeID: 4
            },
            NumChildren: 0,
            IsTheOwner: false,
            AttributeCategories: [],
            AttachmentCategories: []
          },
          Criteria: null,
          ContainerChildrenCount: 0,
          ParentUniqueKey: 'node2',
          UniqueKey: 'node4',
          AssetGuid: 'ast4',
          ReferencedBy: '',
          HasChildren: false
        }
      ])
    );

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3,
        stopAtLevel: 4
      })
    );

    const myNodeId = _.find(tree.ids, (n: string) => tree.entities[n].NodeId === node2.NodeId);
    const myNode = tree.entities[String(myNodeId)];

    expect(tree.entities[node2.UniqueKey].Expanded).toEqual(false);

    store.dispatch(new fromActions.ExpandNode({ node: myNode, key: 'key' }));

    expect(spy1).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalledWith(myNode.UniqueKey, 'd');

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(tree.ids.length).toEqual(4);
    expect(tree.entities[node2.UniqueKey].Expanded).toEqual(true);
  });

  it('expands a node with errors', () => {
    const spy1 = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    const spy2 = spyOn(uiConfigModelService, 'assetTreeChildren').and.returnValue(throwError('SOME ERROR'));

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    let err: string;
    store
      .pipe(error)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        err = n;
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3,
        stopAtLevel: 4
      })
    );

    const myNodeId = _.find(tree.ids, (n: string) => tree.entities[n].NodeId === node2.NodeId);
    const myNode = tree.entities[String(myNodeId)];

    expect(tree.entities[node2.UniqueKey].Expanded).toEqual(false);

    store.dispatch(new fromActions.ExpandNode({ node: myNode, key: 'key' }));

    expect(err).toEqual('SOME ERROR');

    expect(spy1).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalledWith(myNode.UniqueKey, 'd');

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(tree.ids.length).toEqual(2);
  });

  it('gets autocomplete results', fakeAsync(() => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    const spy2 = spyOn(assetModelService, 'autoCompleteSearch').and.returnValue(
      of([
        {
          AssetDesc: 'd1',
          AssetAbbrev: 'abv1',
          AssetID: 15
        }
      ])
    );

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3,
        stopAtLevel: 4,
        autoCompleteCount: 9
      })
    );

    store.dispatch(new fromActions.AutoCompleteSearch({ search: 'search1', key: 'key' }));
    tick(1100);

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalledWith('search1', 9, 1, 3, 4, 'd');
    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(tree.autoCompleteSearch).toEqual('search1');
    expect(tree.autoCompleteAssets.length).toEqual(1);
    expect(tree.autoCompletePending).toEqual(false);
  }));

  it('gets autocomplete results with errors', fakeAsync(() => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    const spy2 = spyOn(assetModelService, 'autoCompleteSearch').and.returnValue(throwError('SOME ERROR'));

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    let err: string;
    store
      .pipe(error)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        err = n;
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3,
        stopAtLevel: 4,
        autoCompleteCount: 9
      })
    );

    store.dispatch(new fromActions.AutoCompleteSearch({ search: 'search1', key: 'key' }));
    tick(1100);

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalledWith('search1', 9, 1, 3, 4, 'd');
    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(err).toEqual('SOME ERROR');
  }));

  it('selects an asset by id', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    const spy2 = spyOn(uiConfigModelService, 'deepAsset').and.returnValue(
      of([
        {
          NodeId: 'ast3',
          TreeId: 'id1',
          NodeAbbrev: 'node3',
          NodeDesc: 'node3',
          ParentNodeId: 'ast2',
          NodeTypeId: 2,
          DisplayOrder: 1,
          CreatedBy: 'jcb',
          ChangedBy: 'jcb',
          AssetId: 15,
          AssetNodeBehaviorId: 2,
          CriteriaObjectIncludeAncestors: false,
          Asset: {
            AssetID: 15,
            AssetAbbrev: 'ast3',
            AssetDesc: 'ast3',
            AssetClassTypeID: 1,
            DisplayOrder: 1,
            CreatedBy: 'jcb',
            ChangedBy: 'jcb',
            CreateDate: new Date(),
            ChangeDate: new Date(),
            GlobalId: 'ast3',
            IsHidden: false,
            Track: true,
            AssetClassType: null,
            AssetType: null,
            NumChildren: 1,
            IsTheOwner: false,
            AttributeCategories: [],
            AttachmentCategories: []
          },
          Criteria: null,
          ContainerChildrenCount: 0,
          ParentUniqueKey: 'node2',
          UniqueKey: 'node3',
          AssetGuid: 'ast3',
          ReferencedBy: '',
          HasChildren: true
        },
        {
          NodeId: 'ast4',
          TreeId: 'id1',
          NodeAbbrev: 'node4',
          NodeDesc: 'node4',
          ParentNodeId: 'ast2',
          NodeTypeId: 4,
          DisplayOrder: 1,
          CreatedBy: 'jcb',
          ChangedBy: 'jcb',
          AssetId: 16,
          AssetNodeBehaviorId: 4,
          CriteriaObjectIncludeAncestors: false,
          Asset: {
            AssetID: 16,
            AssetAbbrev: 'ast4',
            AssetDesc: 'ast4',
            AssetClassTypeID: 2,
            DisplayOrder: 3,
            CreatedBy: 'jcb',
            ChangedBy: 'jcb',
            CreateDate: new Date(),
            ChangeDate: new Date(),
            GlobalId: 'ast4',
            IsHidden: false,
            Track: true,
            AssetClassType: null,
            AssetType: {
              AssetTypeID: 4
            },
            NumChildren: 0,
            IsTheOwner: false,
            AttributeCategories: [],
            AttachmentCategories: []
          },
          Criteria: null,
          ContainerChildrenCount: 0,
          ParentUniqueKey: 'node2',
          UniqueKey: 'node4',
          AssetGuid: 'ast4',
          ReferencedBy: '',
          HasChildren: false
        }
      ])
    );

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3
      })
    );

    store.dispatch(
      new fromActions.SelectAssetByID({
        id: 16,
        key: 'key'
      })
    );

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalledWith('a', '16', 'd');

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(tree.entities[tree.selectedNodeID].NodeId).toEqual('ast4');
  });

  it('deselects nodes', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );
    const spy2 = spyOn(uiConfigModelService, 'deepAsset');

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3
      })
    );

    store.dispatch(
      new fromActions.SelectAssetByID({
        key: 'key'
      })
    );

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).not.toHaveBeenCalled();

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(tree.selectedNodeID).toBeNull();
  });

  it('selects nodes with errors', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );
    const spy2 = spyOn(uiConfigModelService, 'deepAsset').and.returnValue(throwError('SOME ERROR'));

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    let err: string;
    store
      .pipe(error)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        err = n;
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3
      })
    );

    store.dispatch(
      new fromActions.SelectAssetByID({
        key: 'key',
        id: 16
      })
    );

    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);
    expect(spy2).toHaveBeenCalled();

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual('a');
    expect(err).toEqual('SOME ERROR');
  });

  it('switches the selected asset tree', () => {
    const spy = spyOn(uiConfigModelService, 'initializeTree').and.returnValue(
      of({ trees: [tree1, tree2], assets: [node1, node2] })
    );

    let tree: ComponentInstanceState;
    store
      .pipe(treesDict)
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        tree = n['key'];
      });

    store.dispatch(
      new fromActions.InitializeAssetTree({
        key: 'key',
        selectedTree: 'a',
        parentAssetID: 1,
        selectedNode: 'b',
        selectedAsset: 'c',
        selectedAppContext: 'd',
        startAtLevel: 3
      })
    );

    store.dispatch(new fromActions.SelectTree({ id: tree2.TreeId, key: 'key' }));

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('a', 1, 'b', 'c', 'd', 3);

    expect(tree).toBeTruthy();
    expect(tree.selectedTree).toEqual(tree2.TreeId);
  });
});
