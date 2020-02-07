import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BaseModel } from '../base-model';
import { IDateRange } from './idate-range';
import { ICriteria } from './criteria';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { strictEqual } from 'assert';
import { IAdHocTree } from './iad-hoc-tree';
import { IAdHocNode } from './iad-hoc-node';

@Injectable({
  providedIn: 'root'
})
export class UiconfigModelService extends BaseModel {
  constructor(private http: HttpClient) {
    super('/Services/api/UIConfig/');
  }

  public getAsset360Logo() {
    return this.http.get<string>(this.GetUrl('Asset360Logo')).pipe(
      map(mydata => {
        const data = mydata.replace(/"/g, '');
      }),
      catchError(this.HandleError)
    );
  }

  public getTimeRangeDateRangeFromCriteria(criteriaFilterid: number, startDate: Date, endDate: Date) {
    const params = {
      criteriaFilterid: String(criteriaFilterid),
      startDate: null,
      endDate: null
    };

    if (startDate && startDate.toISOString) {
      params.startDate = startDate.toISOString();
    }
    if (endDate && endDate.toISOString) {
      params.endDate = endDate.toISOString();
    }

    return this.http
      .get<IDateRange>(this.GetUrl('TimeSelectorGetDateRangeFromCriteria'), {
        params
      })
      .pipe(catchError(this.HandleError));
  }

  public getCriteriaObjectListCategory(categoryID: number, appContextID: number = null, tabID: number = null) {
    const params = { categoryID: String(categoryID) };
    if (appContextID !== null) {
      params['appContextID'] = String(appContextID);
    }
    if (tabID !== null) {
      params['tabID'] = String(tabID);
    }

    return this.http
      .get<ICriteria[]>(this.GetUrl('TimeSelectorCategoryCriteria'), {
        params
      })
      .pipe(catchError(this.HandleError));
  }

  public initializeTree(
    treeID: string | number,
    parentID: string | number,
    nodeID: string | number,
    assetID: string | number,
    appContextID: string | number,
    startAtLevel: number
  ) {
    const params: any = {};
    if (!_.isNil(treeID)) {
      params.treeID = String(treeID);
    }
    if (!_.isNil(parentID)) {
      params.parentID = String(parentID);
    }
    if (!_.isNil(nodeID)) {
      params.nodeID = String(nodeID);
    }
    if (!_.isNil(assetID)) {
      params.assetID = String(assetID);
    }
    if (!_.isNil(appContextID)) {
      params.appContextID = String(appContextID);
    }
    if (!_.isNil(startAtLevel)) {
      params.startAtLevel = String(startAtLevel);
    }

    return this.http.get<{ m_Item1: IAdHocTree[]; m_Item2: IAdHocNode[] }>(this.GetUrl('LoadNodeFromKey'), { params }).pipe(
      map(result => {
        return { trees: result.m_Item1, assets: result.m_Item2 };
      }),
      catchError(this.HandleError)
    );
  }

  public deepAsset(treeID: string, assetID: string, appContext: string) {
    const params = {
      treeID,
      assetID,
      appContext
    };

    return this.http.get<IAdHocNode[]>(this.GetUrl('DeepAsset'), { params }).pipe(catchError(this.HandleError));
  }

  public assetTreeChildren(key: string, appContext: string) {
    const params = {
      key,
      appContext
    };

    return this.http.get<IAdHocNode[]>(this.GetUrl('Children'), { params }).pipe(catchError(this.HandleError));
  }
}
