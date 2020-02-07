import { IAccountModelUser } from '../../models/iaccount-model-user';
import { UserActions, UserActionTypes } from './user.actions';
import { IAppContext } from '@AtonixWebSites/api';

export interface UserState {
  accountModelUser: IAccountModelUser;
  appContexts: IAppContext[];
  selectedAppContext: number | string;
  appContextsForApp: number[];
  errorMessage: string;
  lightTheme: boolean;
}

export const initialState: UserState = {
  accountModelUser: null,
  appContexts: null,
  selectedAppContext: null,
  appContextsForApp: [],
  errorMessage: '',
  lightTheme: false
};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.UserInfoLoaded: {
      return {
        ...state,
        errorMessage: '',
        accountModelUser: action.payload
      };
    }
    case UserActionTypes.UserInfoFail: {
      return {
        ...state,
        errorMessage: action.payload,
        accountModelUser: null
      };
    }
    case UserActionTypes.AppContextLoaded: {
      return {
        ...state,
        errorMessage: '',
        appContexts: action.payload
      };
    }
    case UserActionTypes.AppContextFail: {
      return {
        ...state,
        errorMessage: action.payload,
        appContexts: null
      };
    }
    case UserActionTypes.ClearUser: {
      return {
        ...state,
        appContexts: null,
        accountModelUser: null,
        errorMessage: ''
      };
    }
    case UserActionTypes.SetAppContextSuccess: {
      return {
        ...state,
        selectedAppContext: action.payload
      };
    }
    case UserActionTypes.SetInitialAppContext: {
      return {
        ...state,
        selectedAppContext: action.payload.appContext,
        appContextsForApp: action.payload.permittedAppContexts
      };
    }
    default: {
      return state;
    }
  }
}
