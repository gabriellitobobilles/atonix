import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BaseModel } from '../base-model';
import { IAsset, Asset } from './asset';
import { IAppContext } from './app-context';
import { ThrowMessage, UtilFunctions } from '@AtonixWebSites/shared';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { GetAssetParameters } from './get-asset-parameters';
import { IAssetView, IAssetViews } from './iasset-view';
import { IAssetAndName } from './iasset-and-name';
import { IAttributeTypeWithOptions } from './attribute-type';
import { NgModel } from '@angular/forms';
import { IAssetAndAttributes } from './iasset-and-attributes';
import { IAssetAttachment, AttachmentSortBy } from './attachment';

@Injectable({
  providedIn: 'root'
})
export class AssetsModelService extends BaseModel {
  constructor(private http: HttpClient) {
    super('/Services/api/Assets/');
  }

  private sortAssets(assetList: IAsset[]) {
    assetList.sort((a: IAsset, b: IAsset) => {
      let result = 0;
      // tslint:disable-next-line:prefer-conditional-expression
      if (a.DisplayOrder === b.DisplayOrder) {
        result = a.AssetID > b.AssetID ? 1 : a.AssetID < b.AssetID ? -1 : 0;
      } else {
        result = a.DisplayOrder - b.DisplayOrder;
      }
      return result;
    });
    return assetList;
  }

  public getAppContexts() {
    return this.http.get<IAppContext[]>(this.GetUrl('AppContexts')).pipe(
      map(data => this.processAppContexts(data)),
      catchError(this.HandleError)
    );
  }

  public firstRootAsset(appContextID: number): Observable<IAsset> {
    return this.http
      .get<IAsset>(this.GetUrl('FirstRootAsset'), { params: { appContextID: String(appContextID) } })
      .pipe(catchError(ThrowMessage.error));
  }

  private processAppContexts(appContexts: IAppContext[]): IAppContext[] {
    // I am adding this section of code so that we can create app contexts that limit access to apps but that don't show
    // up in the app tray.  The user would have to know the address of the app to get to it.
    // This section also makes sure that the app contexts are unique.
    const acDict: { [id: string]: boolean } = {};
    const uniqueAppContexts: IAppContext[] = [];
    for (const a of appContexts) {
      if (a.Path && !acDict[a.DisplayName]) {
        uniqueAppContexts.push(a);
        acDict[a.DisplayName] = true;
      }
    }
    uniqueAppContexts.sort((a: IAppContext, b: IAppContext) => {
      return a.DisplayOrder - b.DisplayOrder;
    });
    return uniqueAppContexts;
  }

  public getAsset(parameters: GetAssetParameters): Observable<IAsset> {
    if (!parameters.assetGuid || parameters.assetGuid.length < 36) {
      return of<IAsset>();
    }
    const queryParams: HttpParams = UtilFunctions.buildQueryParams(parameters);
    return this.http
      .get<IAsset>(this.GetUrl('AssetFromGuid'), {
        params: queryParams
      })
      .pipe(catchError(ThrowMessage.error));
  }

  assetViews(assetID: string | number, applicationContext: string | number): Observable<IAssetViews> {
    if (_.isNil(assetID)) {
      return of({ Views: [], SelectedView: null });
    } else {
      const params: any = {};
      if (assetID) {
        params.assetID = String(assetID);
      }
      if (applicationContext) {
        params.applicationContext = String(applicationContext);
      }

      return this.http.get<IAssetViews>(this.GetUrl('AssetViews'), { params }).pipe(
        map(results => {
          results.Views.sort((a, b) => (a.DisplayOrder < b.DisplayOrder ? -1 : 1));
          return results;
        }),
        catchError(ThrowMessage.error)
      );
    }
  }

  autoCompleteSearch(
    search?: string,
    count?: number,
    parentID?: number,
    startAtLevel?: number,
    stopAtLevel?: number,
    appContextID?: string | number
  ): Observable<IAssetAndName[]> {
    const params = {
      search: String(search || ''),
      count: String(count || null),
      parentID: String(parentID || null),
      startAtLevel: String(startAtLevel || null),
      stopAtLevel: String(stopAtLevel || null),
      appContextID: String(appContextID)
    };

    return this.http.get<IAssetAndName[]>(this.GetUrl('AutoCompleteSearch'), { params }).pipe(catchError(ThrowMessage.error));
  }

  getAssetToNodeWithSiblings(assetID: string | number, appContextID?: string | number): Observable<Asset[]> {
    const params = {
      Id: String(assetID),
      appContextID: String(appContextID)
    };

    return this.http.get<IAsset[][]>(this.GetUrl('AssetsToNodeWithSiblings'), { params }).pipe(
      map(results => {
        const assets: IAsset[] = [];
        for (const a of results) {
          for (const b of a) {
            assets.push(b);
          }
        }
        return assets;
      }),
      catchError(ThrowMessage.error)
    );
  }

  getAllStandardAttributeTypesWithOptions(): Observable<IAttributeTypeWithOptions[]> {
    return this.http.get<IAttributeTypeWithOptions[]>(this.GetUrl('StandardAttributeTypesWithOptions')).pipe(
      map(results => {
        for (const myAttribute of results) {
          this.StripOutCrap(myAttribute.AttributeType);
          for (const myOption of myAttribute.Options) {
            this.StripOutCrap(myOption);
          }
        }
        return results;
      }),
      catchError(ThrowMessage.error)
    );
  }

  getAssetAndAttributes(assetID: string | number, full: boolean = true): Observable<IAssetAndAttributes> {
    const params = {
      assetID: String(assetID),
      full: String(full)
    };

    return this.getAllStandardAttributeTypesWithOptions().pipe(
      switchMap(standards => {
        return this.http.get<IAssetAndAttributes>(this.GetUrl('AssetAndAttributes'), { params }).pipe(
          map(items => {
            if (items.AvailableAttributes) {
              for (const myAttribute of items.AvailableAttributes) {
                this.StripOutCrap(myAttribute.AttributeType);
                for (const myOption of myAttribute.Options) {
                  this.StripOutCrap(myOption);
                }
              }
            }

            items.AllAttributes = standards;
            for (const myAttribute of items.Attributes) {
              this.StripOutCrap(myAttribute);
              this.StripOutCrap(myAttribute.AttributeType);
            }
            for (const myAttachment of items.Attachments) {
              this.putFileInfoIntoAttachment(myAttachment.ContentID, myAttachment);
            }
            this.sortAttachments(items.Attachments, 'custom');
            for (const aa of items.Attachments) {
              this.convertDatesOnAssetAttachment(aa);
            }
            return items;
          })
        );
      }),
      catchError(ThrowMessage.error)
    );
  }

  private convertDatesOnAssetAttachment(aa: IAssetAttachment) {
    aa.CreateDate = new Date(aa.CreateDate);
    aa.ChangeDate = new Date(aa.ChangeDate);
  }

  public putFileInfoIntoAttachment(newFileID: string, data: IAssetAttachment) {
    data.complete = true;
    data.path = data.PreSignedURL ? decodeURIComponent(data.PreSignedURL) : '';
  }

  public sortAttachments(attachments: IAssetAttachment[], sortBy: AttachmentSortBy) {
    if (attachments && attachments.length > 1) {
      attachments.sort((a, b) => {
        let result: number;
        if (sortBy === 'custom') {
          result = a.DisplayOrder - b.DisplayOrder;
        } else if (sortBy === 'filename') {
          result = a.Title.localeCompare(b.Title);
        } else if (sortBy === 'caption') {
          result = a.Caption.localeCompare(b.Caption);
        } else if (sortBy === 'date') {
          result = a.CreateDate.getTime() - b.CreateDate.getTime();
        } else if (sortBy === 'date_reverse') {
          result = b.CreateDate.getTime() - a.CreateDate.getTime();
        }
        if (result === 0) {
          result = sortBy !== 'caption' ? a.Caption.localeCompare(b.Caption) : a.CreateDate.getTime() - b.CreateDate.getTime();

          if (result === 0) {
            result = a.AttachmentID.localeCompare(b.AttachmentID);
          }
        }
        return result;
      });
    }
  }
}
