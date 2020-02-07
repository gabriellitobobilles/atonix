/*SELECTORS*/
import { userQuery } from './user.selectors';
describe('User Selectors', function () {
    var mockAuth = {
        loggedIn: true,
        errorMessage: 'This is just a Test',
        message: 'test',
        isSoftwareToken: true,
        email: 'test@test.com',
        name: 'Atonix Test',
        authState: 'login'
    };
    var mockUser = {
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
    var mockAuthUserState = { authUser: { user: mockUser, auth: mockAuth } };
    describe('getAuth', function () {
        it('should provide accountModelUser object', function () {
            var selected = userQuery.getUser(mockAuthUserState);
            expect(selected).toBe(mockUser.accountModelUser);
        });
    });
    describe('getErrorMessage', function () {
        it('should provide value of errormessage found in user', function () {
            var selected = userQuery.getErrorMessage(mockAuthUserState);
            expect(selected).toBe(mockUser.errorMessage);
        });
    });
    describe('getAppContexts', function () {
        it('should provide value of appContexts', function () {
            var selected = userQuery.getAppContexts(mockAuthUserState);
            expect(selected).toBeNull();
        });
    });
    describe('getLightTheme', function () {
        it('should provide value of lightTheme', function () {
            var selected = userQuery.getLightTheme(mockAuthUserState);
            expect(selected).toBe(mockUser.lightTheme);
        });
    });
    describe('getSelectedAppContextID', function () {
        it('should provide null as value', function () {
            var selected = userQuery.getSelectedAppContextID(mockAuthUserState);
            expect(selected).toBeNull();
        });
    });
    describe('getSelectedAppContext', function () {
        it('should provide null as value', function () {
            var selected = userQuery.getSelectedAppContext(mockAuthUserState);
            expect(selected).toBeNull();
        });
    });
    describe('getAppContextsForApp', function () {
        it('should provide value of appContextsForApp', function () {
            var selected = userQuery.getAppContextsForApp(mockAuthUserState);
            expect(selected).toBe(mockUser.appContextsForApp);
        });
    });
});
//# sourceMappingURL=user.selectors.spec.js.map