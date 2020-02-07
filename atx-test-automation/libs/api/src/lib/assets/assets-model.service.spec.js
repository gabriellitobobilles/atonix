/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/*SERVICE*/
import { AssetsModelService } from './assets-model.service';
describe('AssetsModelService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AssetsModelService]
        });
    });
    it('should be created', inject([AssetsModelService], function (service) {
        expect(service).toBeTruthy();
    }));
    it('should return App Contexts', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        var appContext = {
            AppContextID: 1,
            Name: 'atonixTest',
            Icon: 'test',
            DisplayName: 'Atonix Test',
            DisplayOrder: 2,
            SecurityResourceID: 3,
            Path: null,
            OpenInNew: true,
            StopAtLevel: 4,
            ShowFuture: true,
            Tabs: null,
            TimeRange: null,
            TimeSelection: null,
            Locale: null,
            StartAsset: 5,
            Refresh: 6
        };
        assetsModelService.getAppContexts().subscribe(function (data) {
            result = data;
        });
        httpTest.expectOne({ url: '/Services/api/Assets/AppContexts' }).flush(appContext);
        httpTest.verify();
        expect(result).toEqual([]);
    }));
    it('should return first root asset', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService.firstRootAsset(1).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/Assets/FirstRootAsset?appContextID=1';
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should return asset', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService
            .getAsset({ assetGuid: '123456789012345678901234567890123456', appContextID: 1 })
            .subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return (req.urlWithParams ===
                '/Services/api/Assets/AssetFromGuid?assetGuid=123456789012345678901234567890123456&appContextID=1');
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should return asset Views', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService.assetViews(1, 2).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/Assets/AssetViews?assetID=1&applicationContext=2';
        })
            .flush({ Views: [{ DisplayOrder: 2 }, { DisplayOrder: 1 }] });
        httpTest.verify();
        expect(result).toEqual({ Views: [{ DisplayOrder: 1 }, { DisplayOrder: 2 }] });
    }));
    it('should trigger auto complete in search', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService.autoCompleteSearch('atonixTest', null, null, null, null, null).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return (req.urlWithParams ===
                // tslint:disable-next-line:max-line-length
                '/Services/api/Assets/AutoCompleteSearch?search=atonixTest&count=null&parentID=null&startAtLevel=null&stopAtLevel=null&appContextID=null');
        })
            .flush('test');
        httpTest.verify();
        expect(result).toEqual('test');
    }));
    it('should return asset to node with siblings', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService.getAssetToNodeWithSiblings(1, 2).subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/Assets/AssetsToNodeWithSiblings?Id=1&appContextID=2';
        })
            .flush([[1, 2, 3], [11, 22, 33], [111, 222, 333]]);
        httpTest.verify();
        expect(result).toEqual([1, 2, 3, 11, 22, 33, 111, 222, 333]);
    }));
    it('should return all standard attribute types with options', inject([AssetsModelService, HttpTestingController], function (assetsModelService, httpTest) {
        var result;
        assetsModelService.getAllStandardAttributeTypesWithOptions().subscribe(function (data) {
            result = data;
        });
        httpTest
            .expectOne(function (req) {
            return req.urlWithParams === '/Services/api/Assets/StandardAttributeTypesWithOptions';
        })
            .flush({ AttributeType: 'number', Options: [1, 2, 3] });
        httpTest.verify();
        expect(result).toEqual({ AttributeType: 'number', Options: [1, 2, 3] });
    }));
});
//# sourceMappingURL=assets-model.service.spec.js.map