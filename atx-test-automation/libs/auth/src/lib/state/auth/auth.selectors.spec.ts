/*SELECTORS*/
import { authQuery } from './auth.selectors';

describe('Auth Selectors', () => {
  const mockAuth = {
    loggedIn: true,
    errorMessage: 'This is just a Test',
    message: 'test',
    isSoftwareToken: true,
    email: 'test@test.com',
    name: 'Atonix Test',
    authState: 'login'
  };

  const mockUser = {
    accountModelUser: {
      Email: 'test@test.com',
      FirstName: 'test',
      LastName: 'test',
      DisplayName: 'test',
      UserName: 'test',
      IsBV: true,
      NERCCIP: true,
      ServiceAccount: true
    },
    appContexts: null,
    selectedAppContext: 1,
    appContextsForApp: [1, 2, 3],
    errorMessage: 'test',
    lightTheme: true
  };

  const mockAuthUserState = { authUser: { user: mockUser, auth: mockAuth } };

  describe('getAuth', () => {
    it('should provide auth object', () => {
      const selected = authQuery.getAuth(mockAuthUserState);
      expect(selected).toEqual(mockAuth);
    });
  });

  describe('getAuthState', () => {
    it('should provide value of authState', () => {
      const selected = authQuery.getAuthState(mockAuthUserState);
      expect(selected).toBe(mockAuth.authState);
    });
  });

  describe('getErrorMessage', () => {
    it('should provide value of errorMessage found in auth', () => {
      const selected = authQuery.getErrorMessage(mockAuthUserState);
      expect(selected).toBe(mockAuth.errorMessage);
    });
  });

  describe('getMessage', () => {
    it('should provide value of message', () => {
      const selected = authQuery.getMessage(mockAuthUserState);
      expect(selected).toBe(mockAuth.message);
    });
  });

  describe('getIsSoftwareToken', () => {
    it('should provide value of isSoftwareToken', () => {
      const selected = authQuery.getIsSoftwareToken(mockAuthUserState);
      expect(selected).toBe(mockAuth.isSoftwareToken);
    });
  });

  describe('getLoggedIn', () => {
    it('should provide value of loggedIn', () => {
      const selected = authQuery.getLoggedIn(mockAuthUserState);
      expect(selected).toBe(mockAuth.loggedIn);
    });
  });

  describe('getEmail', () => {
    it('should provide value of email', () => {
      const selected = authQuery.getEmail(mockAuthUserState);
      expect(selected).toBe(mockAuth.email);
    });
  });

  describe('getName', () => {
    it('should provide value of name', () => {
      const selected = authQuery.getName(mockAuthUserState);
      expect(selected).toBe(mockAuth.name);
    });
  });

  describe('getAuthUser', () => {
    it('should provide null if value of authState is login', () => {
      const selected = authQuery.getAuthUser(mockAuthUserState);
      expect(selected).toBeNull();
    });
  });
});
