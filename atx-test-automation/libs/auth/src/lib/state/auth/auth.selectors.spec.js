/*SELECTORS*/
import { authQuery } from './auth.selectors';
describe('Auth Selectors', function () {
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
        it('should provide auth object', function () {
            var selected = authQuery.getAuth(mockAuthUserState);
            expect(selected).toEqual(mockAuth);
        });
    });
    describe('getAuthState', function () {
        it('should provide value of authState', function () {
            var selected = authQuery.getAuthState(mockAuthUserState);
            expect(selected).toBe(mockAuth.authState);
        });
    });
    describe('getErrorMessage', function () {
        it('should provide value of errorMessage found in auth', function () {
            var selected = authQuery.getErrorMessage(mockAuthUserState);
            expect(selected).toBe(mockAuth.errorMessage);
        });
    });
    describe('getMessage', function () {
        it('should provide value of message', function () {
            var selected = authQuery.getMessage(mockAuthUserState);
            expect(selected).toBe(mockAuth.message);
        });
    });
    describe('getIsSoftwareToken', function () {
        it('should provide value of isSoftwareToken', function () {
            var selected = authQuery.getIsSoftwareToken(mockAuthUserState);
            expect(selected).toBe(mockAuth.isSoftwareToken);
        });
    });
    describe('getLoggedIn', function () {
        it('should provide value of loggedIn', function () {
            var selected = authQuery.getLoggedIn(mockAuthUserState);
            expect(selected).toBe(mockAuth.loggedIn);
        });
    });
    describe('getEmail', function () {
        it('should provide value of email', function () {
            var selected = authQuery.getEmail(mockAuthUserState);
            expect(selected).toBe(mockAuth.email);
        });
    });
    describe('getName', function () {
        it('should provide value of name', function () {
            var selected = authQuery.getName(mockAuthUserState);
            expect(selected).toBe(mockAuth.name);
        });
    });
    describe('getAuthUser', function () {
        it('should provide null if value of authState is login', function () {
            var selected = authQuery.getAuthUser(mockAuthUserState);
            expect(selected).toBeNull();
        });
    });
});
//# sourceMappingURL=auth.selectors.spec.js.map