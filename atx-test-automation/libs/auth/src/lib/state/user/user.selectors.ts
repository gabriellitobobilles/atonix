import { createSelector } from '@ngrx/store';
import { getAuthUserState, AuthUserState } from '..';
import { UserState } from './user.reducer';
import { IAppContext } from '@AtonixWebSites/api';

export const getUserState = createSelector(
  getAuthUserState,
  (state: AuthUserState) => state.user
);
export const getUser = createSelector(
  getUserState,
  (userState: UserState) => userState.accountModelUser
);
export const getErrorMessage = createSelector(
  getUserState,
  (userState: UserState) => userState.errorMessage
);
export const getAppContexts = createSelector(
  getUserState,
  (userState: UserState) => userState.appContexts
);
export const getLightTheme = createSelector(
  getUserState,
  (userState: UserState) => userState.lightTheme
);
export const getSelectedAppContextID = createSelector(
  getUserState,
  (userState: UserState) => {
    let result: number = null;
    if (userState.appContexts) {
      const selectedAC = userState.appContexts.find(ac => {
        return ac.DisplayName === userState.selectedAppContext || ac.AppContextID === userState.selectedAppContext;
      });
      result = selectedAC ? selectedAC.AppContextID : null;
    }
    return result;
  }
);
export const getSelectedAppContext = createSelector(
  getUserState,
  (userState: UserState) => {
    let result: IAppContext = null;
    if (userState.appContexts) {
      result = userState.appContexts.find(ac => {
        return ac.DisplayName === userState.selectedAppContext || ac.AppContextID === userState.selectedAppContext;
      });
    }
    return result;
  }
);
export const getAppContextsForApp = createSelector(
  getUserState,
  (userState: UserState) => userState.appContextsForApp
);

export const userQuery = {
  getAppContexts,
  getUser,
  getErrorMessage,
  getSelectedAppContextID,
  getSelectedAppContext,
  getAppContextsForApp,
  getLightTheme
};
