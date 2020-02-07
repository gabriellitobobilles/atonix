import { Injectable } from '@angular/core';
import { BaseModel } from '../../base-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UtilFunctions, ThrowMessage } from '@AtonixWebSites/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountModelService extends BaseModel {
  constructor(private http: HttpClient) {
    super('/Services/api/Account/');
  }

  public userAuthenticated() {
    return this.http.get<boolean>(this.GetUrl('UserAuthenticated')).pipe(catchError(ThrowMessage.error));
  }
}
