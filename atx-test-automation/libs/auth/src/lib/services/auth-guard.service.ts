import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthFacade } from '../state/auth/auth.facade';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private authFacade: AuthFacade) {}

  canActivate(): Observable<boolean> {
    return this.auth.IsLoggedIn$().pipe(
      map(loggedIn => {
        if (!loggedIn) {
          this.authFacade.loginRedirect();
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
