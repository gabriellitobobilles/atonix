import * as tslib_1 from "tslib";
/*REDUCER*/
import { userReducer, initialState } from './user.reducer';
/*ACTIONS*/
import * as actions from './user.actions';
describe('User Reducer', function () {
    describe('[User] User Info Loaded', function () {
        it('should toggle state', function () {
            var mockAccountModel = {
                Email: 'test@test.com',
                FirstName: 'Atonix',
                LastName: 'Test',
                DisplayName: 'Atonix Test',
                UserName: 'atonixTest',
                IsBV: true,
                NERCCIP: true,
                ServiceAccount: true
            };
            var action = new actions.UserInfoLoaded(mockAccountModel);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: '', accountModelUser: mockAccountModel }));
        });
    });
    describe('[User] User Info Fail', function () {
        it('should toggle state', function () {
            var mockErrorMessage = 'This is just a test!';
            var action = new actions.UserInfoFail(mockErrorMessage);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: mockErrorMessage, accountModelUser: null }));
        });
    });
    describe('[User] App Context Loaded', function () {
        it('should toggle state', function () {
            var mockAppContext = [
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
            var action = new actions.AppContextLoaded(mockAppContext);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: '', appContexts: mockAppContext }));
        });
    });
    describe('[User] App Context Fail', function () {
        it('should toggle state', function () {
            var mockErrorMessage = 'This is just a test!';
            var action = new actions.AppContextFail(mockErrorMessage);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { errorMessage: mockErrorMessage, appContexts: null }));
        });
    });
    describe('[User] Clear User', function () {
        it('should toggle state', function () {
            var action = new actions.ClearUser();
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { appContexts: null, accountModelUser: null, errorMessage: '' }));
        });
    });
    describe('[User] Set App Context Success', function () {
        it('should toggle state', function () {
            var action = new actions.SetAppContextSuccess(1);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { selectedAppContext: 1 }));
        });
    });
    describe('[User] Set Initial App Context', function () {
        it('should toggle state', function () {
            var mockAuthConfig = { appContext: 1, permittedAppContexts: [1, 2, 3] };
            var action = new actions.SetInitialAppContext(mockAuthConfig);
            var result = userReducer(initialState, action);
            expect(result).toEqual(tslib_1.__assign({}, initialState, { selectedAppContext: mockAuthConfig.appContext, appContextsForApp: mockAuthConfig.permittedAppContexts }));
        });
    });
});
//# sourceMappingURL=user.reducer.spec.js.map