import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as tabViewActions from './tab-view.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetsModelService } from '@AtonixWebSites/api';

@Injectable()
export class TabViewEffects {
  constructor(private actions$: Actions, private assetModelService: AssetsModelService) {}

  @Effect()
  assetViews$ = this.actions$.pipe(ofType(tabViewActions.TabViewActionTypes.AssetViewFromId)).pipe(
    switchMap((action: tabViewActions.AssetViewFromId) => {
      return this.assetModelService.assetViews(action.payload.assetID, action.payload.appContextID).pipe(
        map(asset => new tabViewActions.AssetViewFromIdSuccess(asset)),
        catchError(error => of(new tabViewActions.AssetViewFromIdFailure(error)))
      );
    })
  );
}
