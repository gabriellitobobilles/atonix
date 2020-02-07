import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AssetTreesState, assetTreeReducer } from './asset-tree.reducer';
import { AssetTreeNode } from '../models/asset-tree-node';
import {
  InitializeAssetTreeStarted,
  InitializeAssetTreeComplete,
  AutoCompleteSearchStarted,
  AutoCompleteSearchSuccess
} from './asset-tree.actions';
import { IAdHocTree, IAssetAndName, IAdHocNode } from '@AtonixWebSites/api';
import { getNodes } from './asset-tree.selectors';
import { takeWhile } from 'rxjs/operators';

describe('AssetTreeFacade', () => {
  let store: Store<AssetTreesState>;
  let cancel: any;
  const tree: IAdHocTree = {
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
  const node1: IAdHocNode = {
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
    ParentUniqueKey: null,
    UniqueKey: 'SOMEUNIQUEKEY',
    AssetGuid: 'SOMEGUID',
    ReferencedBy: null,
    HasChildren: true
  };
  const node2: IAdHocNode = {
    NodeId: 'anodeid',
    TreeId: 'treeid',
    NodeAbbrev: 'ast',
    NodeDesc: 'astdesc',
    NodeTypeId: 4,
    DisplayOrder: 11,
    CreatedBy: 'jcb',
    ChangedBy: 'jcb',
    CriteriaObjectIncludeAncestors: false,
    Asset: {
      AssetID: 13,
      AssetAbbrev: 'abb',
      AssetDesc: 'adesc',
      AssetClassTypeID: 10,
      DisplayOrder: 20,
      CreatedBy: '',
      ChangedBy: '',
      CreateDate: new Date(),
      ChangeDate: new Date(),
      GlobalId: 'ASSETGUID',
      IsHidden: false,
      Track: true,
      AssetClassType: null,
      AssetType: null,
      NumChildren: 0,
      IsTheOwner: false,
      AttributeCategories: [],
      AttachmentCategories: []
    },
    AssetId: 13,
    Criteria: null,
    ContainerChildrenCount: 2,
    ParentUniqueKey: 'SOMEUNIQUEKEY',
    UniqueKey: 'ASSETUNIQUEKEY',
    AssetGuid: 'ASSETGUID',
    ReferencedBy: null,
    HasChildren: true
  };
  const node3: IAdHocNode = {
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
    ParentUniqueKey: 'ASSETUNIQUEKEY',
    UniqueKey: 'ASSETUNIQUEKEY2',
    AssetGuid: 'ast3',
    ReferencedBy: '',
    HasChildren: true
  };
  const node4: IAdHocNode = {
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
        AssetTypeAbbrev: 'aaa',
        AssetTypeDesc: 'aaa',
        AssetTypeID: 4
      },
      NumChildren: 0,
      IsTheOwner: false,
      AttributeCategories: [],
      AttachmentCategories: []
    },
    Criteria: null,
    ContainerChildrenCount: 0,
    ParentUniqueKey: 'ASSETUNIQUEKEY2',
    UniqueKey: 'ASSETUNIQUEKEY3',
    AssetGuid: 'ast4',
    ReferencedBy: '',
    HasChildren: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot([]), StoreModule.forFeature('assettree', assetTreeReducer)],
      declarations: [],
      providers: []
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    cancel = {};
  });

  afterEach(() => {
    cancel = null;
  });

  it('gets Nodes', () => {
    let nodes: AssetTreeNode[];
    store
      .pipe(getNodes('key'))
      .pipe(takeWhile(n => cancel))
      .subscribe(n => {
        nodes = n;
      });

    const params = {
      selectedAppContext: 'a',
      key: 'key',
      selectedAsset: node4.UniqueKey
    };

    store.dispatch(new InitializeAssetTreeStarted(params));

    store.dispatch(
      new InitializeAssetTreeComplete({
        params,
        trees: [tree],
        assets: [node1, node2, node3, node4]
      })
    );

    expect(nodes.length).toEqual(4);
  });
});
