"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../helpers/user");
var pages_1 = require("../page/pages");
var user = new User.User();
var homePage = new pages_1.HomePage();
var userObj = {
    email: 'emailAddress@fullscale.io',
    password: 'passwordHere',
};
describe('Login ', function () {
    beforeAll(function () {
        user.logIn(userObj);
    });
    it('should be able to log in', function () {
        expect(homePage.navBarRight.isPresent()).toBeTruthy();
    });
});
//# sourceMappingURL=login.spec.js.map