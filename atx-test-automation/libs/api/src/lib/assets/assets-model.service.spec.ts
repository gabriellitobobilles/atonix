/*ANGULAR*/
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
/*SERVICE*/
import { AssetsModelService } from './assets-model.service';

describe('AssetsModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssetsModelService]
    });
  });

  it('should be created', inject([AssetsModelService], (service: AssetsModelService) => {
    expect(service).toBeTruthy();
  }));

  it('should return App Contexts', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      const appContext = {
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
      assetsModelService.getAppContexts().subscribe((data: any) => {
        result = data;
      });

      httpTest.expectOne({ url: '/Services/api/Assets/AppContexts' }).flush(appContext);

      httpTest.verify();
      expect(result).toEqual([]);
    }
  ));

  it('should return first root asset', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService.firstRootAsset(1).subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return req.urlWithParams === '/Services/api/Assets/FirstRootAsset?appContextID=1';
        })
        .flush('test');

      httpTest.verify();
      expect(result).toEqual('test');
    }
  ));

  it('should return asset', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService
        .getAsset({ assetGuid: '123456789012345678901234567890123456', appContextID: 1 })
        .subscribe((data: any) => {
          result = data;
        });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return (
            req.urlWithParams ===
            '/Services/api/Assets/AssetFromGuid?assetGuid=123456789012345678901234567890123456&appContextID=1'
          );
        })
        .flush('test');

      httpTest.verify();
      expect(result).toEqual('test');
    }
  ));

  it('should return asset Views', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService.assetViews(1, 2).subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return req.urlWithParams === '/Services/api/Assets/AssetViews?assetID=1&applicationContext=2';
        })
        .flush({ Views: [{ DisplayOrder: 2 }, { DisplayOrder: 1 }] });

      httpTest.verify();
      expect(result).toEqual({ Views: [{ DisplayOrder: 1 }, { DisplayOrder: 2 }] });
    }
  ));

  it('should trigger auto complete in search', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService.autoCompleteSearch('atonixTest', null, null, null, null, null).subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return (
            req.urlWithParams ===
            // tslint:disable-next-line:max-line-length
            '/Services/api/Assets/AutoCompleteSearch?search=atonixTest&count=null&parentID=null&startAtLevel=null&stopAtLevel=null&appContextID=null'
          );
        })
        .flush('test');

      httpTest.verify();
      expect(result).toEqual('test');
    }
  ));

  it('should return asset to node with siblings', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService.getAssetToNodeWithSiblings(1, 2).subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return req.urlWithParams === '/Services/api/Assets/AssetsToNodeWithSiblings?Id=1&appContextID=2';
        })
        .flush([[1, 2, 3], [11, 22, 33], [111, 222, 333]]);

      httpTest.verify();
      expect(result).toEqual([1, 2, 3, 11, 22, 33, 111, 222, 333]);
    }
  ));

  it('should return all standard attribute types with options', inject(
    [AssetsModelService, HttpTestingController],
    (assetsModelService: AssetsModelService, httpTest: HttpTestingController) => {
      let result;
      assetsModelService.getAllStandardAttributeTypesWithOptions().subscribe((data: any) => {
        result = data;
      });

      httpTest
        .expectOne((req: HttpRequest<any>) => {
          return req.urlWithParams === '/Services/api/Assets/StandardAttributeTypesWithOptions';
        })
        .flush({ AttributeType: 'number', Options: [1, 2, 3] });

      httpTest.verify();
      expect(result).toEqual({ AttributeType: 'number', Options: [1, 2, 3] });
    }
  ));
});
