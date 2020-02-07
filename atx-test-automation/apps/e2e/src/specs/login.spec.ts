import * as User from '../helpers/user'
import {HomePage} from '../page/pages'


const user = new User.User()
const homePage = new HomePage()

const userObj = {
    email: 'emailAddress@fullscale.io',
    password: 'passwordHere',
}

describe('Login ',()=> {
    beforeAll(()=> {
        user.logIn(userObj)
    })
    it('should be able to log in', ()=> {
        expect(homePage.navBarRight.isPresent()).toBeTruthy();
    });
});