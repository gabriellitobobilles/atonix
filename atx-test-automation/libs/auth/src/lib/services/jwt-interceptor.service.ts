import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError as observableThrowError, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take, map, flatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  // Modified from https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('Anonymous')) {
      return next.handle(req);
    } else {
      return this.authService
        .GetToken()
        .pipe(flatMap(n => next.handle(this.addToken(req, n))))
        .pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              switch ((error as HttpErrorResponse).status) {
                case 400:
                  return this.handle400Error(error);
                case 401:
                  // This means the token needs to be refreshed
                  return this.handle401Error(req, next);
                default:
                  return observableThrowError(error);
              }
            } else {
              return observableThrowError(error);
            }
          })
        );
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return observableThrowError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.GetToken(true).pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }),
        catchError(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        })
      );
    }
  }

  logoutUser() {
    this.authService.LogOut();
    return throwError('Http Error');
  }
}
