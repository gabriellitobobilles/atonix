import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { getRouterState } from './router.interfaces';
import { GotoRoute } from './router.actions';
import { RouterParameters } from '../models/router-parameters';

@Injectable()
export class RouterFacade {
  routerState$ = this.store.pipe(select(getRouterState));

  gotoRoute(routerParameters: RouterParameters) {
    this.store.dispatch(new GotoRoute(routerParameters));
  }
  constructor(private store: Store<RouterState>) {}
}
