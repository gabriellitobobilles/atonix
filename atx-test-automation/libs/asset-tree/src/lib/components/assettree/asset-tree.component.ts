import * as _ from 'lodash';

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { faCaretRight, faCaretDown, faSpinner, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { AssetTreeNode } from '../../models/asset-tree-node';
import { AssetTreeFacade } from '../../state/asset-tree.facade';
import { AssetTreeFacadeFactory } from '../../state/asset-tree.factory';
import { Observable } from 'rxjs';
import { IAdHocTree, IAssetAndName } from '@AtonixWebSites/api';
import { FormGroup, FormControl } from '@angular/forms';
import { IButtonInfo, IButtonClick } from '../../models/iasset-tree-parameters';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'atx-assettree',
  templateUrl: './asset-tree.component.html',
  styleUrls: ['./asset-tree.component.scss']
})
export class AssetTreeComponent implements OnInit, OnDestroy {
  @Input() key?: string;
  @Output() nodeSelected: EventEmitter<AssetTreeNode> = new EventEmitter<AssetTreeNode>();
  @Output() assetButtonClicked: EventEmitter<IButtonClick> = new EventEmitter<IButtonClick>();
  @ViewChild('autocomplete') autocompletecontrol;

  facade: AssetTreeFacade;

  trees$: Observable<IAdHocTree[]>;
  selectedTree$: Observable<IAdHocTree>;

  nodes$: Observable<AssetTreeNode[]>;
  selectedNode$: Observable<AssetTreeNode>;
  selectedNodeID: string;

  autoCompleteAssets$: Observable<IAssetAndName[]>;
  autoCompleteSearch$: Observable<string>;
  autoCompletePending$: Observable<boolean>;

  showTreeSelector$: Observable<boolean>;
  buttons$: Observable<IButtonInfo[]>;

  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faSpinner = faSpinner;
  faDotCircle = faDotCircle;

  componentActive = true;

  constructor(private facadeFactory: AssetTreeFacadeFactory) {}

  public form = new FormGroup({
    selectedTreeValue: new FormControl(''),
    assetAutoComplete: new FormControl('')
  });

  ngOnInit() {
    this.facade = this.facadeFactory.CreateFacade(this.key);
    this.nodes$ = this.facade.nodes$;
    this.selectedNode$ = this.facade.selectedAssetTreeNode$;
    this.trees$ = this.facade.allTrees$;
    this.selectedTree$ = this.facade.selectedTree$;
    this.selectedTree$.pipe(takeWhile(() => this.componentActive)).subscribe(s => {
      this.form.patchValue({ selectedTreeValue: s ? s.TreeId : null });
    });

    this.autoCompleteAssets$ = this.facade.autoCompleteAssets$;
    this.autoCompleteSearch$ = this.facade.autoCompleteSearch$;
    this.autoCompletePending$ = this.facade.autoCompletePending$;
    this.showTreeSelector$ = this.facade.showTreeSelector$;
    this.selectedNode$.pipe(takeWhile(() => this.componentActive)).subscribe(n => {
      this.nodeSelected.emit(n);
      if (n) {
        this.selectedNodeID = n.UniqueKey;
      }
    });
    this.buttons$ = this.facade.buttons$;

    this.form.valueChanges.pipe(takeWhile(() => this.componentActive)).subscribe((value: { assetAutoComplete: string }) => {
      this.facade.autoCompleteSearch(value.assetAutoComplete);
    });
  }

  autoCompleteSelection($event) {
    if (this.autocompletecontrol && this.autocompletecontrol.nativeElement && this.autocompletecontrol.nativeElement.blur) {
      this.autocompletecontrol.nativeElement.blur();
    }

    this.form.reset({
      assetAutoComplete: '',
      selectedTreeValue: this.form.value.selectedTreeValue
    });

    this.facade.selectAssetByID($event.source.value);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  expandOrCollapse(node: AssetTreeNode) {
    this.facade.expandNode(node);
  }

  select(node: AssetTreeNode) {
    this.facade.select(node);
  }

  TreeSelectionChanged($event) {
    if ($event.value) {
      this.facade.selectTree($event.value);
    }
  }

  searchLostFocus() {
    this.form.reset({
      assetAutoComplete: '',
      selectedTreeValue: this.form.value.selectedTreeValue
    });
  }

  buttonClick(button: IButtonInfo, node: AssetTreeNode) {
    this.assetButtonClicked.emit({ button, node });
  }
}
