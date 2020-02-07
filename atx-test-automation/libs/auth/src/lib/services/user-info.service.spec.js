/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/*SERVICE*/
import { UserInfoService } from './user-info.service';
describe('UserInfoService', function () {
    var accountUser = {
        Email: 'test@test.com',
        FirstName: 'Atonix',
        LastName: 'Test',
        DisplayName: 'Atonix Test',
        UserName: 'atonix_test',
        IsBV: true,
        NERCCIP: true,
        ServiceAccount: true
    };
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserInfoService]
        });
    });
    it('should create', inject([UserInfoService], function (userInfoService) {
        expect(userInfoService).toBeTruthy();
    }));
    it('should return user info', inject([UserInfoService, HttpTestingController], function (userInfoService, httpTest) {
        var result;
        userInfoService.userInfo().subscribe(function (data) {
            result = data;
        });
        httpTest.expectOne({ url: '/Services/api/Account/UserInfo' }).flush(accountUser);
        httpTest.verify();
        expect(result).toEqual(accountUser);
    }));
});
//# sourceMappingURL=user-info.service.spec.js.map