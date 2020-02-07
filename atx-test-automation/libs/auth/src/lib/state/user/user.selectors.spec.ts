/*SELECTORS*/
import { userQuery } from './user.selectors';

describe('User Selectors', () => {
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
    it('should provide accountModelUser object', () => {
      const selected = userQuery.getUser(mockAuthUserState);
      expect(selected).toBe(mockUser.accountModelUser);
    });
  });

  describe('getErrorMessage', () => {
    it('should provide value of errormessage found in user', () => {
      const selected = userQuery.getErrorMessage(mockAuthUserState);
      expect(selected).toBe(mockUser.errorMessage);
    });
  });

  describe('getAppContexts', () => {
    it('should provide value of appContexts', () => {
      const selected = userQuery.getAppContexts(mockAuthUserState);
      expect(selected).toBeNull();
    });
  });

  describe('getLightTheme', () => {
    it('should provide value of lightTheme', () => {
      const selected = userQuery.getLightTheme(mockAuthUserState);
      expect(selected).toBe(mockUser.lightTheme);
    });
  });

  describe('getSelectedAppContextID', () => {
    it('should provide null as value', () => {
      const selected = userQuery.getSelectedAppContextID(mockAuthUserState);
      expect(selected).toBeNull();
    });
  });

  describe('getSelectedAppContext', () => {
    it('should provide null as value', () => {
      const selected = userQuery.getSelectedAppContext(mockAuthUserState);
      expect(selected).toBeNull();
    });
  });

  describe('getAppContextsForApp', () => {
    it('should provide value of appContextsForApp', () => {
      const selected = userQuery.getAppContextsForApp(mockAuthUserState);
      expect(selected).toBe(mockUser.appContextsForApp);
    });
  });
});
