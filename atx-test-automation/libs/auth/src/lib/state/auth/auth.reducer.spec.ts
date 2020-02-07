/*REDUCER*/
import { authReducer, initialState } from './auth.reducer';
/*ACTIONS*/
import * as actions from './auth.actions';

describe('Auth Reducer', () => {
  describe('[Auth] Login Started', () => {
    it('should toggle state', () => {
      const action = new actions.LoginStarted('test@test.com');
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: null,
        email: 'test@test.com',
        message: 'Authenticating ...',
        authState: 'working'
      });
    });
  });

  describe('[Auth] Login Success', () => {
    it('should toggle state', () => {
      const action = new actions.LoginSuccess();
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: true,
        errorMessage: null,
        message: 'Authenticated!',
        authState: 'navigate'
      });
    });
  });

  describe('[Auth] MFA Requred', () => {
    it('should toggle state', () => {
      const action = new actions.MFARequired('test');
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: false,
        errorMessage: null,
        message: null,
        isSoftwareToken: true,
        authState: 'mfa'
      });
    });
  });

  describe('[Auth] Login Failure', () => {
    it('should toggle state', () => {
      const action = new actions.LoginFailure('test');
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: false,
        errorMessage: 'Login Error',
        message: null,
        authState: 'login'
      });
    });
  });

  describe('[Auth] Logout Complete', () => {
    it('should toggle state', () => {
      const action = new actions.LogoutComplete();
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: false,
        errorMessage: null,
        message: null,
        authState: 'login'
      });
    });
  });

  describe('[Auth] Initial Auth Action', () => {
    it('should toggle state', () => {
      const action = new actions.InitialAuthAction(true);
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: true,
        errorMessage: null,
        message: null,
        authState: 'login'
      });
    });
  });

  describe('[Auth] Forgot Password', () => {
    it('should toggle state', () => {
      const action = new actions.ForgotPassword('test@test.com');
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: null,
        message: null,
        email: 'test@test.com',
        authState: 'requestpw'
      });
    });
  });

  describe('[Auth] Request Password Cancelled', () => {
    it('should toggle state', () => {
      const action = new actions.RequestPasswordCancelled(true);
      const result = authReducer(initialState, action);

      expect(result).toEqual({ ...initialState, authState: 'login' });
    });
  });

  describe('[Auth] Request Password Complete', () => {
    it('should toggle state', () => {
      const action = new actions.RequestPasswordComplete('test@test.com');
      const result = authReducer(initialState, action);

      expect(result).toEqual({ ...initialState, email: 'test@test.com', authState: 'changepw' });
    });
  });

  describe('[Auth] Password Change Required', () => {
    it('should toggle state', () => {
      const action = new actions.PasswordChangeRequired('test@test.com');
      const result = authReducer(initialState, action);

      expect(result).toEqual({ ...initialState, email: 'test@test.com', authState: 'changepw' });
    });
  });

  describe('[Auth] Change Password Cancelled', () => {
    it('should toggle state', () => {
      const action = new actions.ChangePasswordCancelled(true);
      const result = authReducer(initialState, action);

      expect(result).toEqual({ ...initialState, authState: 'login' });
    });
  });

  describe('[Auth] Change Password Complete', () => {
    it('should toggle state', () => {
      const action = new actions.ChangePasswordComplete(true);
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loggedIn: true,
        errorMessage: null,
        message: 'Authenticated!',
        authState: 'navigate'
      });
    });
  });

  describe('[Auth] Initial Password Required', () => {
    it('should toggle state', () => {
      const action = new actions.InitialPasswordRequired('test@test.com', 'UserExists');
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        email: 'test@test.com',
        message: 'Could not reset password.',
        authState: 'login'
      });
    });
  });

  describe('[Auth] Initial Password Change Required', () => {
    it('should toggle state', () => {
      const action = new actions.InitialPasswordChangeRequired({ email: 'test@test.com', name: 'Atonix Test' });
      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        email: 'test@test.com',
        name: 'Atonix Test',
        authState: 'initialpw'
      });
    });
  });

  describe('[Auth] Initial Password Cancelled', () => {
    it('should toggle state', () => {
      const action = new actions.InitialPasswordCancelled(true);
      const result = authReducer(initialState, action);

      expect(result).toEqual({ ...initialState, authState: 'login' });
    });
  });

  describe('[Auth] Get Settings Complete', () => {
    it('should toggle state', () => {
      const action = new actions.GetSettingsComplete({
        ClientID: 'test1234567891234567891234',
        PoolID: 'us-east-1_test12345'
      });
      const result = authReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
