import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { UserState, userReducer } from './user/user.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface AuthUserState {
  user: UserState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthUserState> = {
  user: userReducer,
  auth: authReducer
};

export const getAuthUserState = createFeatureSelector<AuthUserState>('authUser');
