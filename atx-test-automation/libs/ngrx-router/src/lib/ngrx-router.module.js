import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './state/router.effects';
import { CustomRouterStateSerializer } from './state/custom-serializer';
import { RouterFacade } from './state/router.facade';
var NgrxRouterModule = /** @class */ (function () {
    function NgrxRouterModule() {
    }
    NgrxRouterModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                StoreModule.forFeature('router', routerReducer),
                EffectsModule.forFeature([RouterEffects]),
                StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
            ],
            providers: [RouterEffects, RouterFacade, [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }]]
        })
    ], NgrxRouterModule);
    return NgrxRouterModule;
}());
export { NgrxRouterModule };
//# sourceMappingURL=ngrx-router.module.js.map