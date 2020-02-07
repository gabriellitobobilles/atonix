/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/*MODEL*/
import { IAccountModelUser } from '../models/iaccount-model-user';
/*SERVICE*/
import { UserInfoService } from './user-info.service';

describe('UserInfoService', () => {
  const accountUser: IAccountModelUser = {
    Email: 'test@test.com',
    FirstName: 'Atonix',
    LastName: 'Test',
    DisplayName: 'Atonix Test',
    UserName: 'atonix_test',
    IsBV: true,
    NERCCIP: true,
    ServiceAccount: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserInfoService]
    });
  });

  it('should create', inject([UserInfoService], (userInfoService: UserInfoService) => {
    expect(userInfoService).toBeTruthy();
  }));

  it('should return user info', inject(
    [UserInfoService, HttpTestingController],
    (userInfoService: UserInfoService, httpTest: HttpTestingController) => {
      let result;
      userInfoService.userInfo().subscribe((data: any) => {
        result = data;
      });

      httpTest.expectOne({ url: '/Services/api/Account/UserInfo' }).flush(accountUser);

      httpTest.verify();
      expect(result).toEqual(accountUser);
    }
  ));
});
