import { AuthState } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuthUserState, AuthUserState } from '..';

export const getAuth = createSelector(
  getAuthUserState,
  (state: AuthUserState) => state.auth
);
export const getAuthState = createSelector(
  getAuth,
  (authState: AuthState) => authState.authState
);
export const getErrorMessage = createSelector(
  getAuth,
  (authState: AuthState) => authState.errorMessage
);
export const getMessage = createSelector(
  getAuth,
  (authState: AuthState) => authState.message
);
export const getIsSoftwareToken = createSelector(
  getAuth,
  (authState: AuthState) => authState.isSoftwareToken
);
export const getLoggedIn = createSelector(
  getAuth,
  (authState: AuthState) => authState.loggedIn
);
export const getEmail = createSelector(
  getAuth,
  (authState: AuthState) => authState.email
);
export const getName = createSelector(
  getAuth,
  (authState: AuthState) => authState.name
);

export const getTimeoutInSeconds = createSelector(
  getAuth,
  (authState: AuthState) => authState.timeoutInSeconds
);

export const getAuthUser = createSelector(
  getAuth,
  (authState: AuthState) => {
    if (authState.loggedIn) {
      return null;
    } else {
      return null;
    }
  }
);

export const authQuery = {
  getAuth,
  getErrorMessage,
  getLoggedIn,
  getAuthState,
  getAuthUser,
  getTimeoutInSeconds,
  getMessage,
  getIsSoftwareToken,
  getEmail,
  getName
};
