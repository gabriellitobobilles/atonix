import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { faCaretRight, faCaretDown, faSpinner, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { AssetTreeFacadeFactory } from '../../state/asset-tree.factory';
import { FormGroup, FormControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
var AssetTreeComponent = /** @class */ (function () {
    function AssetTreeComponent(facadeFactory) {
        this.facadeFactory = facadeFactory;
        this.nodeSelected = new EventEmitter();
        this.assetButtonClicked = new EventEmitter();
        this.faCaretRight = faCaretRight;
        this.faCaretDown = faCaretDown;
        this.faSpinner = faSpinner;
        this.faDotCircle = faDotCircle;
        this.componentActive = true;
        this.form = new FormGroup({
            selectedTreeValue: new FormControl(''),
            assetAutoComplete: new FormControl('')
        });
    }
    AssetTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facade = this.facadeFactory.CreateFacade(this.key);
        this.nodes$ = this.facade.nodes$;
        this.selectedNode$ = this.facade.selectedAssetTreeNode$;
        this.trees$ = this.facade.allTrees$;
        this.selectedTree$ = this.facade.selectedTree$;
        this.selectedTree$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (s) {
            _this.form.patchValue({ selectedTreeValue: s ? s.TreeId : null });
        });
        this.autoCompleteAssets$ = this.facade.autoCompleteAssets$;
        this.autoCompleteSearch$ = this.facade.autoCompleteSearch$;
        this.autoCompletePending$ = this.facade.autoCompletePending$;
        this.showTreeSelector$ = this.facade.showTreeSelector$;
        this.selectedNode$.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (n) {
            _this.nodeSelected.emit(n);
            if (n) {
                _this.selectedNodeID = n.UniqueKey;
            }
        });
        this.buttons$ = this.facade.buttons$;
        this.form.valueChanges.pipe(takeWhile(function () { return _this.componentActive; })).subscribe(function (value) {
            _this.facade.autoCompleteSearch(value.assetAutoComplete);
        });
    };
    AssetTreeComponent.prototype.autoCompleteSelection = function ($event) {
        if (this.autocompletecontrol && this.autocompletecontrol.nativeElement && this.autocompletecontrol.nativeElement.blur) {
            this.autocompletecontrol.nativeElement.blur();
        }
        this.form.reset({
            assetAutoComplete: '',
            selectedTreeValue: this.form.value.selectedTreeValue
        });
        this.facade.selectAssetByID($event.source.value);
    };
    AssetTreeComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    AssetTreeComponent.prototype.expandOrCollapse = function (node) {
        this.facade.expandNode(node);
    };
    AssetTreeComponent.prototype.select = function (node) {
        this.facade.select(node);
    };
    AssetTreeComponent.prototype.TreeSelectionChanged = function ($event) {
        if ($event.value) {
            this.facade.selectTree($event.value);
        }
    };
    AssetTreeComponent.prototype.searchLostFocus = function () {
        this.form.reset({
            assetAutoComplete: '',
            selectedTreeValue: this.form.value.selectedTreeValue
        });
    };
    AssetTreeComponent.prototype.buttonClick = function (button, node) {
        this.assetButtonClicked.emit({ button: button, node: node });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AssetTreeComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AssetTreeComponent.prototype, "nodeSelected", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AssetTreeComponent.prototype, "assetButtonClicked", void 0);
    tslib_1.__decorate([
        ViewChild('autocomplete'),
        tslib_1.__metadata("design:type", Object)
    ], AssetTreeComponent.prototype, "autocompletecontrol", void 0);
    AssetTreeComponent = tslib_1.__decorate([
        Component({
            selector: 'atx-assettree',
            templateUrl: './asset-tree.component.html',
            styleUrls: ['./asset-tree.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AssetTreeFacadeFactory])
    ], AssetTreeComponent);
    return AssetTreeComponent;
}());
export { AssetTreeComponent };
//# sourceMappingURL=asset-tree.component.js.map