import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AssetTreeFacadeFactory } from './asset-tree.factory';
import { AssetTreesState, assetTreeReducer } from './asset-tree.reducer';
import { AssetTreeNode } from '../models/asset-tree-node';
import {
  InitializeAssetTreeStarted,
  InitializeAssetTreeComplete,
  AutoCompleteSearchStarted,
  AutoCompleteSearchSuccess
} from './asset-tree.actions';
import { EffectsModule } from '@ngrx/effects';
import { AssetTreeEffects } from './asset-tree.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IAdHocTree, IAssetAndName } from '@AtonixWebSites/api';
import { IButtonInfo } from '../models/iasset-tree-parameters';

describe('AssetTreeFacade', () => {
  let service: AssetTreeFacadeFactory;
  let store: Store<AssetTreesState>;
  let cancel: any;
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
    ParentUniqueKey: null,
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
  const assetNode: AssetTreeNode = {
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
    HasChildren: true,
    Expanded: false,
    Retrieved: true,
    Level: 3,
    Symbol: 'nothing',
    First: false,
    Last: false
  };

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
      providers: [AssetTreeFacadeFactory]
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(AssetTreeFacadeFactory);
    cancel = {};
  });

  afterEach(() => {
    cancel = null;
  });

  it('constructs with default name', () => {
    const facade = service.CreateFacade();
    expect(facade.getComponentID()).toEqual('default');
  });

  it('constructs with custom name', () => {
    const facade = service.CreateFacade('custom');
    expect(facade.getComponentID()).toEqual('custom');
  });

  it('should initialize the default tree', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.initialize({});

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should initialize a tree with a name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.initialize({});

    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should expand a node', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.expandNode(node);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.node).toEqual(node);
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should expand a node with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.expandNode(node);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.node).toEqual(node);
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should select a node', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.select(node);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.node).toEqual(node);
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should select a node with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.select(node);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.node).toEqual(node);
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should select a tree', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.selectTree('treeid');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.id).toEqual('treeid');
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should select a tree with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.selectTree('treeid');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.id).toEqual('treeid');
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should select an asset by id', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.selectAssetByID(5);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.id).toEqual(5);
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should select an asset by id with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.selectAssetByID(6);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.id).toEqual(6);
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should select an asset by guid', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.selectAssetByGUID('myguid');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.guid).toEqual('myguid');
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should select an asset by guid with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.selectAssetByGUID('myguid2');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.guid).toEqual('myguid2');
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  it('should register an autcomplete search', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade();
    facade.autoCompleteSearch('searchstring');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.search).toEqual('searchstring');
    expect(spy.mock.calls[0][0].payload.key).toEqual('default');
  });

  it('should register an autcomplete search with a custom name', () => {
    const spy = jest.spyOn(store, 'dispatch');

    const facade = service.CreateFacade('somestring');
    facade.autoCompleteSearch('searchstring');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].payload.search).toEqual('searchstring');
    expect(spy.mock.calls[0][0].payload.key).toEqual('somestring');
  });

  // These selectors should be thoroughly tested in testing the asset-tree.selectors.ts file, but
  // the tests here are necessary to make sure the right asset tree is getting messages.
  it('should get a list of nodes', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let nodesList: AssetTreeNode[];
    let namedNodesList: AssetTreeNode[];
    facade.nodes$.subscribe(n => {
      nodesList = n;
    });

    namedFacade.nodes$.subscribe(n => {
      namedNodesList = n;
    });
    expect(nodesList).toEqual([]);
    expect(namedNodesList).toEqual([]);

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

    expect(nodesList.length).toEqual(1);
    expect(namedNodesList).toEqual([]);
  });

  it('should get the selected node', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let selectedNode: AssetTreeNode;
    facade.selectedAssetTreeNode$.subscribe(n => {
      selectedNode = n;
    });

    let namedSelectedNode: AssetTreeNode;
    namedFacade.selectedAssetTreeNode$.subscribe(n => {
      namedSelectedNode = n;
    });
    expect(selectedNode).toBeNull();
    expect(namedSelectedNode).toBeNull();

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
        assets: [node, assetNode]
      })
    );
    facade.selectAssetByID(13);

    expect(selectedNode.UniqueKey).toEqual(assetNode.UniqueKey);
    expect(namedSelectedNode).toEqual(null);
  });

  it('should get the selected asset Ids', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let selectedGuid: string;
    let selectedId: number;
    let selectedNodeId: string;
    facade.selectedAssetGuid$.subscribe(n => {
      selectedGuid = n;
    });
    facade.selectedAssetID$.subscribe(n => {
      selectedId = n;
    });
    facade.selectedAssetTreeNodeID$.subscribe(n => {
      selectedNodeId = n;
    });

    let namedSelectedGuid: string;
    let namedSelectedId: number;
    let namedSelectedNodeId: string;
    namedFacade.selectedAssetGuid$.subscribe(n => {
      namedSelectedGuid = n;
    });
    namedFacade.selectedAssetID$.subscribe(n => {
      namedSelectedId = n;
    });
    namedFacade.selectedAssetTreeNodeID$.subscribe(n => {
      namedSelectedNodeId = n;
    });
    expect(selectedGuid).toBeNull();
    expect(namedSelectedGuid).toBeNull();
    expect(selectedNodeId).toBeNull();
    expect(selectedId).toBeNull();
    expect(namedSelectedId).toBeNull();
    expect(namedSelectedNodeId).toBeNull();

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
        assets: [node, assetNode]
      })
    );
    facade.selectAssetByID(13);

    expect(selectedGuid).toEqual(assetNode.AssetGuid);
    expect(selectedId).toEqual(assetNode.AssetId);
    expect(selectedNodeId).toEqual(assetNode.UniqueKey);
    expect(namedSelectedGuid).toBeNull();
    expect(namedSelectedId).toBeNull();
    expect(namedSelectedNodeId).toBeNull();
  });

  it('should get a list of trees', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let treesList: IAdHocTree[];
    let namedTreesList: IAdHocTree[];
    let selectedTree: IAdHocTree;
    let namedSelectedTree: IAdHocTree;
    facade.allTrees$.subscribe(n => {
      treesList = n;
    });
    facade.selectedTree$.subscribe(n => {
      selectedTree = n;
    });

    namedFacade.allTrees$.subscribe(n => {
      namedTreesList = n;
    });
    namedFacade.selectedTree$.subscribe(n => {
      namedSelectedTree = n;
    });
    expect(treesList).toEqual([]);
    expect(namedTreesList).toEqual([]);
    expect(selectedTree).toBeNull();
    expect(namedSelectedTree).toBeNull();

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
          },
          {
            TreeId: 'treeid2',
            TreeName: 'treename2',
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

    expect(treesList.length).toEqual(2);
    expect(namedTreesList).toEqual([]);
    expect(selectedTree.TreeId).toEqual('treeid');
    expect(namedSelectedTree).toBeNull();
  });

  it('should get tree info', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let showTreeSelector: boolean;
    let buttons: IButtonInfo[];
    facade.showTreeSelector$.subscribe(n => {
      showTreeSelector = n;
    });
    facade.buttons$.subscribe(n => {
      buttons = n;
    });

    let namedShowTreeSelector: boolean;
    let namedButtons: IButtonInfo[];
    namedFacade.showTreeSelector$.subscribe(n => {
      namedShowTreeSelector = n;
    });
    namedFacade.buttons$.subscribe(n => {
      namedButtons = n;
    });
    expect(showTreeSelector).toEqual(true);
    expect(buttons).toBeNull();
    expect(namedShowTreeSelector).toEqual(true);
    expect(namedButtons).toBeNull();

    const params = {
      key: 'default',
      showTreeSelector: false,
      buttons: [
        {
          id: 'buttonid',
          class: 'buttonclass',
          tooltip: 'buttontooltip',
          show: (n: AssetTreeNode) => {
            return true;
          }
        }
      ]
    };
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
        assets: [node, assetNode]
      })
    );

    expect(showTreeSelector).toEqual(false);
    expect(buttons.length).toEqual(1);
    expect(namedShowTreeSelector).toEqual(true);
    expect(namedButtons).toBeNull();
  });

  it('should get autocomplete', () => {
    const facade = service.CreateFacade();
    const namedFacade = service.CreateFacade('somestring');

    let autoCompleteAssets: IAssetAndName[];
    let autoCompleteSearch: string;
    let autoCompletePending: boolean;

    facade.autoCompleteAssets$.subscribe(n => {
      autoCompleteAssets = n;
    });
    facade.autoCompleteSearch$.subscribe(n => {
      autoCompleteSearch = n;
    });
    facade.autoCompletePending$.subscribe(n => {
      autoCompletePending = n;
    });

    let namedAutoCompleteAssets: IAssetAndName[];
    let namedAutoCompleteSearch: string;
    let namedAutoCompletePending: boolean;

    namedFacade.autoCompleteAssets$.subscribe(n => {
      namedAutoCompleteAssets = n;
    });
    namedFacade.autoCompleteSearch$.subscribe(n => {
      namedAutoCompleteSearch = n;
    });
    namedFacade.autoCompletePending$.subscribe(n => {
      namedAutoCompletePending = n;
    });

    expect(autoCompleteAssets).toBeNull();
    expect(autoCompleteSearch).toBeNull();
    expect(autoCompletePending).toEqual(false);
    expect(namedAutoCompleteAssets).toBeNull();
    expect(namedAutoCompleteSearch).toBeNull();
    expect(namedAutoCompletePending).toEqual(false);

    const params = {
      key: 'default'
    };
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
        assets: [node, assetNode]
      })
    );

    store.dispatch(
      new AutoCompleteSearchStarted({
        search: 'aaa',
        key: 'default'
      })
    );

    expect(autoCompleteAssets).toBeNull();
    expect(autoCompleteSearch).toEqual('aaa');
    expect(autoCompletePending).toEqual(true);
    expect(namedAutoCompleteAssets).toBeNull();
    expect(namedAutoCompleteSearch).toBeNull();
    expect(namedAutoCompletePending).toEqual(false);

    store.dispatch(
      new AutoCompleteSearchSuccess({
        assets: [
          {
            AssetDesc: '1',
            AssetAbbrev: '1',
            AssetID: 1
          },
          {
            AssetDesc: '2',
            AssetAbbrev: '2',
            AssetID: 2
          },
          {
            AssetDesc: '3',
            AssetAbbrev: '3',
            AssetID: 3
          }
        ],
        search: 'aaa',
        key: 'default'
      })
    );

    expect(autoCompleteAssets.length).toEqual(3);
    expect(autoCompleteSearch).toEqual('aaa');
    expect(autoCompletePending).toEqual(false);
    expect(namedAutoCompleteAssets).toBeNull();
    expect(namedAutoCompleteSearch).toBeNull();
    expect(namedAutoCompletePending).toEqual(false);
  });
});
