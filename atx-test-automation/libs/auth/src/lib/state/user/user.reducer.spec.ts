/*REDUCER*/
import { userReducer, initialState } from './user.reducer';
/*ACTIONS*/
import * as actions from './user.actions';

describe('User Reducer', () => {
  describe('[User] User Info Loaded', () => {
    it('should toggle state', () => {
      const mockAccountModel = {
        Email: 'test@test.com',
        FirstName: 'Atonix',
        LastName: 'Test',
        DisplayName: 'Atonix Test',
        UserName: 'atonixTest',
        IsBV: true,
        NERCCIP: true,
        ServiceAccount: true
      };
      const action = new actions.UserInfoLoaded(mockAccountModel);
      const result = userReducer(initialState, action);

      expect(result).toEqual({ ...initialState, errorMessage: '', accountModelUser: mockAccountModel });
    });
  });

  describe('[User] User Info Fail', () => {
    it('should toggle state', () => {
      const mockErrorMessage = 'This is just a test!';
      const action = new actions.UserInfoFail(mockErrorMessage);
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        errorMessage: mockErrorMessage,
        accountModelUser: null
      });
    });
  });

  describe('[User] App Context Loaded', () => {
    it('should toggle state', () => {
      const mockAppContext = [
        {
          AppContextID: 1,
          Name: 'Atonix Test',
          Icon: 'testIcon',
          DisplayName: 'Atonix Test',
          DisplayOrder: 1,
          SecurityResourceID: 2,
          Path: 'testPath',
          OpenInNew: true,
          StopAtLevel: 3,
          ShowFuture: true,
          Tabs: null,
          TimeRange: 'test',
          TimeSelection: 'test',
          Locale: 'test',
          StartAsset: 4,
          Refresh: 5
        }
      ];
      const action = new actions.AppContextLoaded(mockAppContext);
      const result = userReducer(initialState, action);

      expect(result).toEqual({ ...initialState, errorMessage: '', appContexts: mockAppContext });
    });
  });

  describe('[User] App Context Fail', () => {
    it('should toggle state', () => {
      const mockErrorMessage = 'This is just a test!';
      const action = new actions.AppContextFail(mockErrorMessage);
      const result = userReducer(initialState, action);

      expect(result).toEqual({ ...initialState, errorMessage: mockErrorMessage, appContexts: null });
    });
  });

  describe('[User] Clear User', () => {
    it('should toggle state', () => {
      const action = new actions.ClearUser();
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        appContexts: null,
        accountModelUser: null,
        errorMessage: ''
      });
    });
  });

  describe('[User] Set App Context Success', () => {
    it('should toggle state', () => {
      const action = new actions.SetAppContextSuccess(1);
      const result = userReducer(initialState, action);

      expect(result).toEqual({ ...initialState, selectedAppContext: 1 });
    });
  });

  describe('[User] Set Initial App Context', () => {
    it('should toggle state', () => {
      const mockAuthConfig = { appContext: 1, permittedAppContexts: [1, 2, 3] };
      const action = new actions.SetInitialAppContext(mockAuthConfig);
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        selectedAppContext: mockAuthConfig.appContext,
        appContextsForApp: mockAuthConfig.permittedAppContexts
      });
    });
  });
});
