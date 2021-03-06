/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
/*SERVICE*/
import { UiconfigModelService } from './uiconfig-model.service';
describe('UiconfigService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CommonModule],
            providers: [UiconfigModelService]
        });
    });
    it('should be created', inject([UiconfigModelService], function (service) {
        expect(service).toBeTruthy();
    }));
    it('should get time range date range from criteria', inject([UiconfigModelService, HttpTestingController], function (uiconfigModelService, httpTest) {
        var result;
        uiconfigModelService
            .getTimeRangeDateRangeFromCriteria(1, new Date('2019/1/16'), new Date('2019/1/16'))
            .subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return (req.urlWithParams ===
                // tslint:disable-next-line:max-line-length
                '/Services/api/UIConfig/TimeSelectorGetDateRangeFromCriteria?criteriaFilterid=1&startDate=2019-01-15T16:00:00.000Z&endDate=2019-01-15T16:00:00.000Z');
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should get criteria object list category', inject([UiconfigModelService, HttpTestingController], function (uiconfigModelService, httpTest) {
        var result;
        uiconfigModelService.getCriteriaObjectListCategory(1, 2, 3).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/UIConfig/TimeSelectorCategoryCriteria?categoryID=1&appContextID=2&tabID=3';
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should initialize tree', inject([UiconfigModelService, HttpTestingController], function (uiconfigModelService, httpTest) {
        var result;
        uiconfigModelService.initializeTree(1, 2, 3, 4, 5, 6).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return (req.urlWithParams ===
                '/Services/api/UIConfig/LoadNodeFromKey?treeID=1&parentID=2&nodeID=3&assetID=4&appContextID=5&startAtLevel=6');
        })
            .flush({ m_Item1: 'test', m_Item2: 'test' });
        httpTest.verify();
        expect(result).toEqual({ assets: 'test', trees: 'test' });
    }));
    it('should get deep asset', inject([UiconfigModelService, HttpTestingController], function (uiconfigModelService, httpTest) {
        var result;
        uiconfigModelService.deepAsset('1', '2', '3').subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/UIConfig/DeepAsset?treeID=1&assetID=2&appContext=3';
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should get asset tree children', inject([UiconfigModelService, HttpTestingController], function (uiconfigModelService, httpTest) {
        var result;
        uiconfigModelService.assetTreeChildren('1', '2').subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/UIConfig/Children?key=1&appContext=2';
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
});
//# sourceMappingURL=uiconfig-model.service.spec.js.map