import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssetTreeComponent } from './components/assettree/asset-tree.component';
import { AssetTreeEffects } from './state/asset-tree.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AssetTreeFacadeFactory } from './state/asset-tree.factory';
import { assetTreeReducer } from './state/asset-tree.reducer';
var AssetTreeModule = /** @class */ (function () {
    function AssetTreeModule() {
    }
    AssetTreeModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FontAwesomeModule,
                MatSelectModule,
                MatInputModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule,
                StoreModule.forFeature('assettree', assetTreeReducer),
                EffectsModule.forFeature([AssetTreeEffects])
            ],
            declarations: [AssetTreeComponent],
            exports: [AssetTreeComponent],
            providers: [AssetTreeFacadeFactory]
        })
    ], AssetTreeModule);
    return AssetTreeModule;
}());
export { AssetTreeModule };
//# sourceMappingURL=asset-tree.module.js.map