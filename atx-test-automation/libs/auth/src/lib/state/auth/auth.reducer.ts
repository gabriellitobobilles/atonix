import { AuthActions, AuthActionTypes } from './auth.actions';
import { AppUserAuth } from '../../models/app-user-auth';
import { RenderNodeAction } from '@angular/core/src/view/util';

export interface AuthState {
  loggedIn: boolean;
  errorMessage: string;
  message: string;
  isSoftwareToken: boolean;
  email: string;
  name: string;
  timeoutInSeconds: number;
  authState: 'login' | 'requestpw' | 'changepw' | 'initialpw' | 'mfa' | 'navigate' | 'working';
}

export const initialState: AuthState = {
  loggedIn: false,
  errorMessage: null,
  message: null,
  isSoftwareToken: false,
  email: null,
  name: null,
  timeoutInSeconds: -1,
  authState: 'login'
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginStarted: {
      return {
        ...state,
        errorMessage: null,
        email: action.payload || state.email,
        message: 'Authenticating ...',
        authState: 'working'
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return { ...state, loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' };
    }

    case AuthActionTypes.MFARequired: {
      const softwareToken = action.challenge ? true : false;

      return { ...state, loggedIn: false, errorMessage: null, message: null, isSoftwareToken: softwareToken, authState: 'mfa' };
    }

    case AuthActionTypes.LoginFailure: {
      let message = 'Login Error';
      if (action && action.payload && action.payload.code === 'UserNotFoundException') {
        message = 'Username or password not found.';
      } else if (action && action.payload && action.payload.code === 'NotAuthorizedException') {
        message = 'Check username and password.';
      }
      return { ...state, loggedIn: false, errorMessage: message, message: null, authState: 'login' };
    }
    case AuthActionTypes.LogoutComplete: {
      return { ...state, loggedIn: false, errorMessage: null, message: null, authState: 'login' };
    }

    case AuthActionTypes.InitialAuthAction: {
      return { ...state, loggedIn: action.payload, errorMessage: null, message: null, authState: 'login' };
    }

    case AuthActionTypes.ForgotPassword: {
      return { ...state, errorMessage: null, message: null, email: action.email, authState: 'requestpw' };
    }

    case AuthActionTypes.RequestPasswordCancelled: {
      return { ...state, authState: 'login' };
    }

    case AuthActionTypes.RequestPasswordComplete: {
      return { ...state, email: action.payload, authState: 'changepw' };
    }

    case AuthActionTypes.PasswordChangeRequired: {
      return { ...state, email: action.payload, authState: 'changepw' };
    }

    case AuthActionTypes.ChangePasswordCancelled: {
      return { ...state, authState: 'login' };
    }

    case AuthActionTypes.ChangePasswordComplete: {
      return { ...state, loggedIn: true, errorMessage: null, message: 'Authenticated!', authState: 'navigate' };
    }

    case AuthActionTypes.InitialPasswordRequired: {
      let message: string = null;
      if (action.result === 'NoUser') {
        message = 'Contact support@atonix.com to create an account.';
      } else if (action.result === 'UserExists') {
        message = 'Could not reset password.';
      } else if (action.result) {
        message = 'Error resetting password.';
      } else {
        message = 'A temporary password has been sent to ' + action.email;
      }

      return { ...state, email: action.email, message, authState: 'login' };
    }

    case AuthActionTypes.InitialPasswordChangeRequired: {
      return { ...state, email: action.attributes.email, name: action.attributes.name, authState: 'initialpw' };
    }

    case AuthActionTypes.InitialPasswordCancelled: {
      return { ...state, authState: 'login' };
    }

    case AuthActionTypes.GetSettingsComplete: {
      return state;
    }

    case AuthActionTypes.GetTimeoutSettingComplete: {
      return { ...state, timeoutInSeconds: action.payload };
    }

    default: {
      return state;
    }
  }
}
