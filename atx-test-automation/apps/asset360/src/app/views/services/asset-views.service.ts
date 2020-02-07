import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { IAssetViews } from '../models/iasset-views';
import { ThrowMessage } from '@AtonixWebSites/shared';
import { IAssetViewParameters } from '../models/iasset-views-parameters';

@Injectable({
  providedIn: 'root'
})
export class AssetViewsService {
  constructor(private http: HttpClient) {}

  assetViews(viewParameters: IAssetViewParameters): Observable<IAssetViews> {
    return this.http
      .get<IAssetViews>(
        `${environment.baseUrl}/Services/api/Assets/AssetViews?applicationContext=${viewParameters.applicationContext}&assetID=${
          viewParameters.assetId
        }`
      )
      .pipe(
        tap(results => {
          results.Views.sort((a, b) => (a.DisplayOrder < b.DisplayOrder ? -1 : 1));
        }),
        catchError(ThrowMessage.error)
      );
  }
}
