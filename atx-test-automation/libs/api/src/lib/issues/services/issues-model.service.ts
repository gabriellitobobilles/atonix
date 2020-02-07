import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CountIssueAndAlertsParameters } from '../models/count-issue-and-alerts-parameters';
import { UtilFunctions, ThrowMessage } from '@AtonixWebSites/shared';
import { IIssuesAndAlerts } from '../models/issues-and-alerts';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssuesModelService extends BaseModel {
  constructor(private http: HttpClient) {
    super('/Services/api/Issues/');
  }

  public countIssuesAndAlerts(parameters: CountIssueAndAlertsParameters) {
    const queryParams: HttpParams = UtilFunctions.buildQueryParams(parameters);
    queryParams['appContext'] = parameters.appContext.split(' ').join('+');
    return this.http
      .get<IIssuesAndAlerts[]>(this.GetUrl('CountIssuesAndAlerts'), {
        params: queryParams
      })
      .pipe(catchError(ThrowMessage.error));
  }
}
