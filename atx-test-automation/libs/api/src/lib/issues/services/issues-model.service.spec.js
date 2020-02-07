/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/*SERVICE*/
import { IssuesModelService } from '@AtonixWebSites/api';
describe('IssuesModelService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [IssuesModelService] });
    });
    it('should be created', inject([IssuesModelService], function (issuesModelService) {
        expect(issuesModelService).toBeTruthy();
    }));
    it('should count issues and alerts', inject([IssuesModelService, HttpTestingController], function (issuesModelService, httpTest) {
        var result;
        issuesModelService.countIssuesAndAlerts({ appContext: 'test', assetID: '1' }).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/Issues/CountIssuesAndAlerts?appContext=test&assetID=1';
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
});
//# sourceMappingURL=issues-model.service.spec.js.map