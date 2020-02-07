import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilFunctions, ThrowMessage } from '@AtonixWebSites/shared';
import { catchError } from 'rxjs/operators';
import { IGeoSpaDropdownItem } from '../models/geospa-dropdown';
import { IStatesForLayer } from '../models/states-for-layer';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs';
import { IGeoSpa } from '../models/geospa';

@Injectable({
  providedIn: 'root'
})
export class GeospaModelService extends BaseModel {
  constructor(private http: HttpClient) {
    super('/Services/api/GeoSpa/');
  }

  private GeoSpaDictionaryKey(assetID?: string | number, nodeID?: string) {
    return (assetID || '') + ':' + (nodeID || '');
  }

  public getGeoSpas(
    assetGuid: string,
    nodeGuid?: string,
    includeAncestors?: boolean,
    includeGeoSpa?: boolean,
    includeGeoVis?: boolean,
    includeRaster?: boolean,
    include3D?: boolean
  ): Observable<IGeoSpa[]> {
    const params = {
      assetID: String(assetGuid),
      nodeGuid: String(nodeGuid),
      includeGeoSpa: String(includeGeoSpa),
      includeGeoVis: String(includeGeoVis),
      includeRaster: String(includeRaster),
      includeAncestors: String(includeAncestors),
      include3D: String(include3D)
    };
    return this.http.get<IGeoSpa[]>(this.GetUrl('GeoSpas'), { params }).pipe(catchError(ThrowMessage.error));
  }

  public getGeospaDropdownItems(
    assetGuid: string,
    includeGeoSpa?: boolean,
    includeGeoVis?: boolean,
    includeRaster?: boolean,
    include3D?: boolean
  ): Observable<any> {
    const params = {
      assetGuid: String(assetGuid),
      includeGeoSpa: String(includeGeoSpa),
      includeGeoVis: String(includeGeoVis),
      includeRaster: String(includeRaster),
      include3D: String(include3D)
    };

    return this.http.get<IGeoSpaDropdownItem>(this.GetUrl('DropdownItems'), { params }).pipe(catchError(ThrowMessage.error));
  }

  public getAssetsOnMap(mapID: number, assetID?: string, nodeID?: string): Observable<IStatesForLayer[]> {
    const params = { mapID: String(mapID), assetID, nodeID };

    return this.http.post<IStatesForLayer[]>(this.GetUrl('AssetsOnMap'), null, { params }).pipe(catchError(ThrowMessage.error));
  }
}
