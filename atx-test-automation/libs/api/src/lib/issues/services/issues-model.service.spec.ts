/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
/*SERVICE*/
import { IssuesModelService } from '@AtonixWebSites/api';

describe('IssuesModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [IssuesModelService] });
  });

  it('should be created', inject([IssuesModelService], (issuesModelService: IssuesModelService) => {
    expect(issuesModelService).toBeTruthy();
  }));

  it('should count issues and alerts', inject(
    [IssuesModelService, HttpTestingController],
    (issuesModelService: IssuesModelService, httpTest: HttpTestingController) => {
      let result;
      issuesModelService.countIssuesAndAlerts({ appContext: 'test', assetID: '1' }).subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return req.urlWithParams === '/Services/api/Issues/CountIssuesAndAlerts?appContext=test&assetID=1';
        })
        .flush('test');

      httpTest.verify();
      expect(result).toEqual('test');
    }
  ));
});
