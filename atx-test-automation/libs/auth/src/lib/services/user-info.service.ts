import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccountModelUser } from '../models/iaccount-model-user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { ThrowMessage } from '@AtonixWebSites/shared';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClient) {}

  userInfo(): Observable<IAccountModelUser> {
    return this.http
      .get<IAccountModelUser>(`${environment.baseUrl}/Services/api/Account/UserInfo`)
      .pipe(catchError(ThrowMessage.error));
  }
}
