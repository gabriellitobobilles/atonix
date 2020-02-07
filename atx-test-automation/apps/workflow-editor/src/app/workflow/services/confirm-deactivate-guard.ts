import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanDeactivateComponent } from '@AtonixWebSites/shared';
import * as _ from 'lodash';
import { AuthFacade } from '@AtonixWebSites/auth';
import { of, Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ConfirmDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  constructor(private authFacade: AuthFacade) {}

  canDeactivate(target: CanDeactivateComponent): Observable<boolean> {
    if (_.isNil(target)) {
      return of(true);
    }
    if (target.canDeactivate === true) {
      return of(true);
    }

    return this.authFacade.loggedIn$.pipe(
      take(1),
      switchMap((loggedIn, __) => {
        if (loggedIn) {
          return of(window.confirm('Do you really want to cancel?'));
        } else {
          return of(true);
        }
      })
    );
  }
}
