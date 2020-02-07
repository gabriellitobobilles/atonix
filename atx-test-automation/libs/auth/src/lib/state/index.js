import { createFeatureSelector } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { authReducer } from './auth/auth.reducer';
export var reducers = {
    user: userReducer,
    auth: authReducer
};
export var getAuthUserState = createFeatureSelector('authUser');
//# sourceMappingURL=index.js.map