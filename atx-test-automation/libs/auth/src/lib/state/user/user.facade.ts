import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from './user.reducer';
import { userQuery } from './user.selectors';
import { LoadUserInfo, LoadAppContext, ClearUser, SetAppContext, SetAppContextSuccess } from './user.actions';

@Injectable()
export class UserFacade {
  constructor(private store: Store<UserState>) {}

  accountModelUser$ = this.store.pipe(select(userQuery.getUser));
  errorMessage$ = this.store.pipe(select(userQuery.getErrorMessage));
  appContexts$ = this.store.pipe(select(userQuery.getAppContexts));
  selectedAppContextID$ = this.store.pipe(select(userQuery.getSelectedAppContextID));
  selectedAppContext$ = this.store.pipe(select(userQuery.getSelectedAppContext));
  lightTheme$ = this.store.pipe(select(userQuery.getLightTheme));

  loadAppContexts() {
    this.store.dispatch(new LoadAppContext());
  }

  setAppContext(appContextId: number) {
    this.store.dispatch(new SetAppContext(appContextId));
  }

  clearUser() {
    this.store.dispatch(new ClearUser());
  }

  loadUserInfo() {
    this.store.dispatch(new LoadUserInfo());
  }

  appLoaded(appContextID: string | number) {
    this.store.dispatch(new SetAppContextSuccess(appContextID));
  }
}
